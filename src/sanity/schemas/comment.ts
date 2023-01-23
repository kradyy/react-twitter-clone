import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'tweet',
      title: 'Tweet',
      description: 'Reference to the tweet',
      type: "reference",
      to: {type: 'tweet'},
    }),
  ],
  preview: {
    select: {
      title: 'comment',
      media: 'image',
    },
  },
})
