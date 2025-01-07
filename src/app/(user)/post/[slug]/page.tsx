import { groq } from "next-sanity";
import { Post } from "../../../../../types";
import { client, urlFor } from "@/lib/createClient";
import Container from "@/components/Container";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/RichText";
import PostContent from "@/components/PostContent";

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
    author->,
    fontStyle->{
      fontUrl,
      fontFamily
    }
  }`;
  const post: Post = await client.fetch(query, { slug });
  
  const defaultAuthorImage = "https://cdn.sanity.io/images/mnzfyx37/production/b41d3b494d876249a9e145a6f2b9a1e21b26e485-500x500.png";

  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-8 md:mb-12">
          <div className="w-full md:w-2/3">
            {post?.mainImage && (
              <Image
                src={urlFor(post.mainImage).url()}
                width={800}
                height={500}
                alt={post.title}
                className="rounded-lg shadow-md object-cover w-full aspect-video"
                priority
              />
            )}
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col items-center gap-6">
            <Image
              src={post?.author?.image ? urlFor(post.author.image).url() : defaultAuthorImage}
              width={120}
              height={120}
              alt={post.author?.name || 'Author'}
              className="rounded-full object-cover shadow-md"
            />
            <h2 className="text-2xl font-bold text-[#251e56] dark:text-[#8b94ff]">
              {post?.author?.name || 'Anonymous'}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300">
              {post?.author?.description || 'No description available'}
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/anonymousknight07" icon={FaGithub} />
              <SocialLink href="https://www.instagram.com/akshat___pandey07/" icon={FaInstagram} />
              <SocialLink href="https://www.linkedin.com/in/akshatpandey07/" icon={FaLinkedin} />
              <SocialLink href="https://x.com/akshath_pandey" icon={FaTwitter} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
          {post.title}
        </h1>
        
        <PostContent body={post.body} fontStyle={post.fontStyle} />
      </div>
    </Container>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#251e56] text-white hover:bg-[#773f25] dark:bg-[#8b94ff] dark:hover:bg-[#ff9f7a] transition-colors duration-200"
  >
    <Icon className="w-5 h-5" />
  </Link>
);

export default SlugPage;