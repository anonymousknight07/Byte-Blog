import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the commenter (optional)",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email for comment management (optional)",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "commentId",
      title: "Comment ID",
      type: "string",
      description: "Unique identifier for comment management",
    }),
  ],
});