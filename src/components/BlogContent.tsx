import Link from "next/link";
import { Post } from "../../types";
import Container from "./Container";
import Image from "next/image";
import { urlFor } from "@/lib/createClient";

interface Props {
  posts: Post[];
}

const BlogContent = ({ posts }: Props) => {
  const defaultAuthorImage = "https://cdn.sanity.io/images/mnzfyx37/production/b41d3b494d876249a9e145a6f2b9a1e21b26e485-500x500.png"; // Using your existing logo as fallback

  return (
    <Container className="bg-gray-100 py-6 sm:py-10 md:py-20 px-4 md:px-10 flex flex-col gap-6 sm:gap-10">
      {posts.map((post) => (
        <Link
          href={{
            pathname: `/post/${post?.slug?.current}`,
            query: { slug: post?.slug?.current },
          }}
          key={post?._id}
        >
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 bg-white rounded-md hover:shadow-md duration-200">
            <div className="w-full md:w-3/5 group overflow-hidden rounded-t-md md:rounded-l-md md:rounded-tr-none relative aspect-video md:aspect-[16/12]">
              {post?.mainImage && (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt="blog post image"
                  fill
                  className="object-cover group-hover:scale-105 duration-500"
                />
              )}
              <div className="absolute top-0 left-0 bg-black/20 w-full h-full group-hover:hidden duration-200" />
              <div className="absolute hidden group-hover:inline-flex bottom-0 left-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-3 sm:p-5 justify-center duration-200">
                <p className="text-sm sm:text-base md:text-lg font-semibold">Click to Read</p>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col justify-between p-4 sm:p-6 lg:p-10">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-5">
                <div className="flex flex-wrap gap-2">
                  {post?.categories?.length > 0 && post.categories.map((item) => (
                    <p
                      key={item?._id}
                      className="text-xs uppercase text-[#251e56] font-semibold"
                    >
                      {item?.title}
                    </p>
                  ))}
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold hover:text-[#773f25] duration-200 cursor-pointer">
                  {post?.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-500">{post?.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 md:mt-0">
                <p className="text-xs md:text-sm font-semibold text-gray-500">
                  {new Date(post?._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={post?.author?.image ? urlFor(post.author.image).url() : defaultAuthorImage}
                    width={40}
                    height={40}
                    alt="author image"
                    className="rounded-full object-cover w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                  />
                  <p className="text-xs md:text-sm font-medium">{post?.author?.name || 'Anonymous'}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Container>
  );
};

export default BlogContent;