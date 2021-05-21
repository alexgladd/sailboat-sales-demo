export default {
  title: 'News Item',
  name: 'newsItem',
  type: 'document',
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'string',
      description: 'Headlines should be catchy, descriptive, and not too long',
      validation: Rule => Rule.required().max(50).error('Headline of max 50 chars is required!'),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Used to create the path to the newsitem',
      validation: Rule => Rule.required().max(96).error('Slug of max 96 chars is required!'),
      options: {
        source: 'headline',
        maxLength: 96,
      }
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      description: 'Canonical date for the new item',
      validation: Rule => Rule.required().error('Date is required!'),
    },
    {
      title: 'Body',
      name: 'body',
      type: 'simpleBlockContent',
      description: 'Body text for the news item',
      validation: Rule => Rule.required().error('Body content is required!'),
    },
  ],
  preview: {
    select: {
      headline: 'headline',
      date: 'date',
      slug: 'slug',
    },
    prepare: ({headline, date, slug}) => ({
      title: headline,
      subtitle: `/news/${date}-${slug.current}`,
    }),
  },
}
