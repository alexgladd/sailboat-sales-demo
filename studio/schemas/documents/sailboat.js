export default {
  title: 'Sailboat',
  name: 'sailboat',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'Current name of the boat',
      validation: Rule => Rule.required().error('Name is required!'),
    },
    {
      title: 'Make',
      name: 'make',
      type: 'string',
      description: 'Manufacturer of the boat',
      validation: Rule => Rule.required().error('Make is required!'),
    },
    {
      title: 'Model',
      name: 'model',
      type: 'string',
      description: "Manufacturer's model name for the boat",
      validation: Rule => Rule.required().error('Model is required!'),
    },
    {
      title: 'Year',
      name: 'year',
      type: 'number',
      description: 'When the boat was manufactured',
      validation: Rule => Rule.required().min(1900).max(2021).error('Year must be between 1900 and 2021'),
    },
    {
      title: 'Asking Price',
      name: 'askingPrice',
      type: 'number',
      description: 'Shown to prospective buyers, in dollars',
      validation: Rule => Rule.required().min(0).integer().error('Asking price must be an integer greater than zero'),

    },
    {
      title: 'Sold!',
      name: 'sold',
      type: 'boolean',
      description: 'Check to remove from public display',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      title: 'Photos',
      name: 'photos',
      type: 'array',
      of: [{type: 'galleryPhoto'}],
      description: 'Recommend at least 4-6 photos; the first photo will be featured',
      options: {
        layout: 'grid',
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'simpleBlockContent',
      description: 'Describe why buyers would love this boat',
      validation: Rule => Rule.required().error('Description is required!'),
    },
    {
      title: 'Specifications',
      name: 'specs',
      type: 'boatSpecs',
      description: 'The more you can fill out, the better',
    },
    {
      title: 'Rigging',
      name: 'rigging',
      type: 'boatRigging',
      description: 'Tell potential buyers about the rig',
    },
  ],
  preview: {
    select: {
      name: 'name',
      make: 'make',
      model: 'model',
      year: 'year',
      price: 'askingPrice',
      photo: 'photos.0',
    },
    prepare: ({name, make, model, year, price, photo}) => ({
      title: name,
      subtitle: make && model && year && price ? `${year} ${make} ${model} - $${price.toLocaleString()}` : '',
      media: photo ? photo : undefined,
    }),
  },
}
