export default {
  title: 'Boat Specs',
  name: 'boatSpecs',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
    columns: 3,
  },
  fields: [
    {
      title: 'LOA',
      name: 'loa',
      type: 'number',
      description: 'In feet',
      validation: Rule => Rule.min(0),
    },
    {
      title: 'LWL',
      name: 'lwl',
      type: 'number',
      description: 'In feet',
      validation: Rule => Rule.min(0),
    },
    {
      title: 'Beam',
      name: 'beam',
      type: 'number',
      description: 'In feet',
      validation: Rule => Rule.min(0),
    },
    {
      title: 'Draft',
      name: 'draft',
      type: 'number',
      description: 'In feet',
      validation: Rule => Rule.min(0),
    },
    {
      title: 'Displacement',
      name: 'displacement',
      type: 'number',
      description: 'In pounds',
      validation: Rule => Rule.min(0),
    },
  ],
}
