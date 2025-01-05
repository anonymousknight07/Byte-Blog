import { defineField, defineType } from "sanity";

export default defineType({
  name: 'fontStyle',
  title: 'Font Style',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'fontUrl',
      title: 'Font URL',
      type: 'url',
      validation: Rule => Rule.required(),
      description: 'Enter the Google Fonts URL or other web font URL'
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Enter the font-family name to use in CSS (e.g., "Roboto" or "Playfair Display")'
    }),
    defineField({
      name: 'preview',
      title: 'Preview Text',
      type: 'string',
      initialValue: 'The quick brown fox jumps over the lazy dog'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'fontFamily'
    }
  }
});