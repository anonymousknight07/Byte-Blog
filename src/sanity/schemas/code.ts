import { defineType } from 'sanity';

export default defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'PHP', value: 'php' },
          { title: 'Swift', value: 'swift' },
          { title: 'Go', value: 'go' },
          { title: 'Shell', value: 'shell' },
          { title: 'SQL', value: 'sql' },
          { title: 'JSON', value: 'json' },
          { title: 'XML', value: 'xml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'YAML', value: 'yaml' },
        ],
      },
    },
  ],
});