import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text in tweet',
      type: 'string',
      options: {
       maxLength: 400
      }
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'Block the tweet from being displayed',
      type: 'boolean',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'image',
      title: 'Tweet image',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'text',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
