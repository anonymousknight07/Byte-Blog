'use client';

import { useEffect } from 'react';
import { PortableText } from "@portabletext/react";
import { RichText } from "./RichText";
import { loadFont } from '@/lib/font';

interface PostContentProps {
  body: any;
  fontStyle: {
    fontUrl: string;
    fontFamily: string;
  };
}

const PostContent = ({ body, fontStyle }: PostContentProps) => {
  useEffect(() => {
    if (fontStyle?.fontUrl) {
      loadFont(fontStyle.fontUrl);
    }
  }, [fontStyle]);

  return (
    <article 
      className="prose prose-lg max-w-none dark:prose-invert"
      style={{ 
        fontFamily: fontStyle?.fontFamily || 'inherit'
      }}
    >
      <PortableText value={body} components={RichText} />
    </article>
  );
};

export default PostContent;