export default {
  title: 'Boat Engine',
  name: 'boatEngine',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
    columns: 2,
  },
  fields: [
    {
      title: 'Included?',
      name: 'included',
      type: 'boolean',
      description: 'Does the boat include an engine?',
      initialValue: true,
      validation: Rule => Rule.required().error('Must specify if an engine is included!'),
    },
    {
      title: 'Make',
      name: 'make',
      type: 'string',
      description: 'Original manufacturer',
    },
    {
      title: 'Model',
      name: 'model',
      type: 'string',
      description: 'Engine model, if known',
    },
    {
      title: 'Year',
      name: 'year',
      type: 'number',
      description: 'Year manufactured',
      validation: Rule => Rule.min(1900).max(2021).error('Year must be between 1900 and 2021'),
    },
    {
      title: 'Horsepower',
      name: 'horsepower',
      type: 'number',
      description: 'Engine output',
      validation: Rule => Rule.min(1).error('Horsepower must be greater than zero'),
    },
    {
      title: 'Hours',
      name: 'hours',
      type: 'number',
      description: 'Lifetime engine hours',
      validation: Rule => Rule.min(1).error('Engine hours must be greater than zero'),
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      description: 'Choose engine type',
      options: {
        layout: 'radio',
        list: [
          { title: 'Inboard', value: 'inboard' },
          { title: 'Outboard', value: 'outboard' },
        ],
      },
    },
    {
      title: 'Fuel',
      name: 'fuel',
      type: 'string',
      description: 'Choose engine fuel',
      options: {
        layout: 'radio',
        list: [
          { title: 'Diesel', value: 'diesel' },
          { title: 'Gasoline', value: 'gasoline' },
        ],
      },
    },
  ],
}
