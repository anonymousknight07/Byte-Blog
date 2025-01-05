import {defineType, defineArrayMember} from 'sanity'

interface Style {
  title: string;
  value: string;
}

interface List {
  title: string;
  value: string;
}

interface Decorator {
  title: string;
  value: string;
}

interface AnnotationField {
  title: string;
  name: string;
  type: string;
  validation?: (Rule: any) => any;
  initialValue?: boolean;
  to?: { type: string }[];
}

interface Annotation {
  title: string;
  name: string;
  type: string;
  fields: AnnotationField[];
}

interface BlockContent {
  title: string;
  name: string;
  type: string;
  of: Array<{
    title: string;
    type: string;
    styles: Style[];
    lists: List[];
    marks: {
      decorators: Decorator[];
      annotations: Annotation[];
    };
  } | {
    type: string;
    options: { hotspot: boolean };
  }>;
}

const blockContent: BlockContent = {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'post' },
                  { type: 'author' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: {hotspot: true},
    },
  ],
};

export default defineType(blockContent);