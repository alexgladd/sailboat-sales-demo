const slug = require('slug');
slug.defaults.mode = 'rfc3986';

function sailboatSlugSource(doc) {
  const idPart = doc._id.replace('drafts.', '').split('-')[0];
  return `${doc.year}-${doc.make}-${doc.model}-${idPart}`;
}

function sailboatSlugify(input) {
  return slug(input);
}

export default {
  title: 'Sailboat',
  name: 'sailboat',
  type: 'document',
  fieldsets: [
    {
      title: 'Display Options',
      name: 'displayOptions',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'Required Info',
      name: 'basicData',
      options: {
        collapsible: false,
        columns: 2,
      },
    }
  ],
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
      fieldset: 'basicData',
    },
    {
      title: 'Model',
      name: 'model',
      type: 'string',
      description: "Manufacturer's model name for the boat",
      validation: Rule => Rule.required().error('Model is required!'),
      fieldset: 'basicData',
    },
    {
      title: 'Year',
      name: 'year',
      type: 'number',
      description: 'When the boat was manufactured',
      validation: Rule => Rule.required().min(1900).max(2021).error('Year must be between 1900 and 2021'),
      fieldset: 'basicData',
    },
    {
      title: 'Asking Price',
      name: 'askingPrice',
      type: 'number',
      description: 'Shown to prospective buyers, in dollars',
      validation: Rule => Rule.required().min(1).integer().error('Asking price must be an integer greater than zero'),
      fieldset: 'basicData',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Click generate to create a unique URL path',
      validation: Rule => Rule.required(),
      options: {
        source: sailboatSlugSource,
        slugify: sailboatSlugify,
      },
    },
    {
      title: 'Featured',
      name: 'featured',
      type: 'boolean',
      description: '1-3 featured boats will be displayed prominently',
      initialValue: false,
      fieldset: 'displayOptions',
      options: {
        layout: 'checkbox',
      }
    },
    {
      title: 'Sold!',
      name: 'sold',
      type: 'boolean',
      description: 'Check to remove from public display',
      initialValue: false,
      fieldset: 'displayOptions',
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
      description: 'Why buyers would love this boat?',
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
    {
      title: 'Engine',
      name: 'engine',
      type: 'boatEngine',
      description: 'Buyers want to know engine details!',
    },
    {
      title: 'Navigation',
      name: 'navigation',
      type: 'boatNavigation',
      description: 'Tell buyers about steering and instruments',
    },
    {
      title: 'Power',
      name: 'power',
      type: 'boatPower',
      description: 'Tell buyers about batteries and power',
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
