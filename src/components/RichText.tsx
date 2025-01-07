import { urlFor } from "@/lib/createClient";
import Image from "next/image";
import Link from "next/link";
import CodeBlock from "./CodeBlock";

export const RichText = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="flex items-center justify-center my-8">
          <Image
            src={urlFor(value).url()}
            alt="Post image"
            width={700}
            height={700}
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <CodeBlock
          code={value.code}
          language={value.language}
        />
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-6 md:ml-10 py-4 list-disc space-y-3 text-gray-800 dark:text-gray-200">{children}</ul>
    ),
  },
  number: ({ children }: any) => (
    <ol className="ml-6 md:ml-10 py-4 list-decimal space-y-3 text-gray-800 dark:text-gray-200">{children}</ol>
  ),
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-8 text-gray-900 dark:text-white">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold my-5 md:my-7 text-gray-900 dark:text-white">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold my-4 md:my-6 text-gray-900 dark:text-white">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-bold my-4 md:my-5 text-gray-900 dark:text-white">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700 dark:text-gray-300 font-[var(--font-style)]">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#251e56] pl-4 md:pl-6 py-4 my-6 bg-gray-50 dark:bg-gray-800 rounded-r-lg italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-[#251e56] dark:text-[#8b94ff] underline hover:text-[#773f25] dark:hover:text-[#ff9f7a] transition-colors duration-200"
          target={!value.href.startsWith("/") ? "_blank" : undefined}
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
  },
};