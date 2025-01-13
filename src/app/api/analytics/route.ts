import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { headers } from 'next/headers';
import { client as sanityClient } from '@/lib/createClient';

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const { country, city, path } = await request.json();

    // Extract post ID from path if it's a blog post
    const postPath = path.match(/\/post\/([^\/]+)/);
    let postId = null;
    let postTitle = null;

    if (postPath) {
      const slug = postPath[1];
      const post = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          _id,
          title
        }`,
        { slug }
      );
      if (post) {
        postId = post._id;
        postTitle = post.title;
      }
    }

    const mongoClient = await clientPromise;
    const db = mongoClient.db("blog");
    
    await db.collection("visits").insertOne({
      timestamp: new Date(),
      country,
      city,
      path,
      postId,
      postTitle,
      userAgent
    });

    return NextResponse.json({ message: 'Visit recorded' });
  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json(
      { message: 'Failed to record visit' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("blog");
    
    // Overall country statistics
    const countryStats = await db.collection("visits").aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          country: "$_id",
          count: 1,
          _id: 0,
          percentage: {
            $multiply: [
              { $divide: ["$count", { $sum: "$count" }] },
              100
            ]
          }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();

    // Per-post statistics
    const postStats = await db.collection("visits").aggregate([
      {
        $match: {
          postId: { $ne: null }
        }
      },
      {
        $group: {
          _id: {
            postId: "$postId",
            postTitle: "$postTitle",
            country: "$country"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            postId: "$_id.postId",
            postTitle: "$_id.postTitle"
          },
          totalVisits: { $sum: "$count" },
          countries: {
            $push: {
              country: "$_id.country",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          postId: "$_id.postId",
          postTitle: "$_id.postTitle",
          totalVisits: 1,
          countries: {
            $map: {
              input: "$countries",
              as: "country",
              in: {
                country: "$$country.country",
                count: "$$country.count",
                percentage: {
                  $multiply: [
                    { $divide: ["$$country.count", "$totalVisits"] },
                    100
                  ]
                }
              }
            }
          }
        }
      },
      { $sort: { totalVisits: -1 } }
    ]).toArray();

    return NextResponse.json({
      overall: countryStats,
      posts: postStats
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}