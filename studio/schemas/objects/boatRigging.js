export default {
  title: 'Boat Rigging',
  name: 'boatRigging',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
    columns: 2,
  },
  fields: [
    {
      title: 'Rig Type',
      name: 'rigType',
      type: 'string',
      description: 'Select the closest match',
      options: {
        list: [
          'Sloop',
          'Gaff Sloop',
          'Cutter',
          'Catboat',
          'Ketch',
          'Yawl',
        ],
      },
    },
    {
      title: 'Included Sails',
      name: 'sails',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Check all sails included',
      options: {
        list: [
          {title: 'Staysail', value: 'staysail'},
          {title: 'Jib', value: 'jib'},
          {title: 'Genoa', value: 'genoa'},
          {title: 'Code zero', value: 'codezero'},
          {title: 'Gennaker', value: 'gennaker'},
          {title: 'Spinnaker', value: 'spinnaker'},
          {title: 'Mainsail', value: 'main'},
          {title: 'Mizzen', value: 'mizzen'},
        ],
      },
    },
    {
      title: 'Sail & Line Conditions',
      name: 'condition',
      type: 'text',
      description: 'Comment on the condition of sails and lines',
      rows: 5,
    },
    {
      title: 'Other Gear',
      name: 'other',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., whisker pole, spinnaker gear, etc.',
      options: {
        sortable: false,
        layout: 'tags',
      }
    },
  ],
}
