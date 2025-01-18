import BlogContent from "@/components/BlogContent";
import Hero from "@/components/Hero";
import { client } from "@/lib/createClient";
import { groq } from "next-sanity";

export const revalidate = 30;

const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

const categoryQuery = groq`*[_type == 'post' && references($categoryId)]{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

// Query to get category details
const getCategoryQuery = groq`*[_type == 'category' && _id == $categoryId][0]`;

export default async function Home({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;
  
  // Fetch posts and category info if category is selected
  const [posts, categoryInfo] = await Promise.all([
    category 
      ? client.fetch(categoryQuery, { categoryId: category })
      : client.fetch(query),
    category
      ? client.fetch(getCategoryQuery, { categoryId: category })
      : Promise.resolve(null)
  ]);

  return (
    <main>
      <Hero />
      <BlogContent posts={posts} activeCategory={categoryInfo} />
    </main>
  );
}