import { groq } from "next-sanity";
import { Post } from "../../../../../types";
import { client, urlFor } from "@/lib/createClient";
import Container from "@/components/Container";
import Image from "next/image";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";
import { FaTwitter } from "react-icons/fa6";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: Post = await client.fetch(query, { slug });
  
  const defaultAuthorImage = "https://cdn.sanity.io/images/mnzfyx37/production/b41d3b494d876249a9e145a6f2b9a1e21b26e485-500x500.png";

  return (
    <Container className="mb-10">
      <div className="flex items-center mb-10">
        <div className="w-full md:w-2/3">
          {post?.mainImage && (
            <Image
              src={urlFor(post.mainImage).url()}
              width={500}
              height={500}
              alt="main image"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5 px-4">
          <Image
            src={post?.author?.image ? urlFor(post.author.image).url() : defaultAuthorImage}
            width={200}
            height={200}
            alt="author image"
            className="w-32 h-32 rounded-full object-cover"
          />
          <p className="text-3xl text-[#5442ae] font-semibold">
            {post?.author?.name || 'Anonymous'}
          </p>
          <p className="text-center tracking-wide text-sm">
            {post?.author?.description || 'No description available'}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={"https://github.com/anonymousknight07"}
              target="blank"
              className="w-10 h-10 bg-red-600 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
             
              <FaGithub />
            </Link>
            <Link
              href={"https://www.instagram.com/akshat___pandey07/"}
              target="blank"
              className="w-10 h-10 bg-[#3e5b98] text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
            <FaInstagram />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/akshatpandey07/"}
              target="blank"
              className="w-10 h-10 bg-blue-500 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaLinkedin />
            </Link>
            <Link
              href={"https://x.com/akshath_pandey"}
              target="blank"
              className="w-10 h-10 bg-black text-white text-xl rounded-full flex items-center justify-center hover:bg-[#56535355] duration-200"
            >
             
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <PortableText value={post?.body} components={RichText} />
      </div>
    </Container>
  );
};

export default SlugPage;