export default {
  title: 'Boat Power',
  name: 'boatPower',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
    columns: 2,
  },
  fields: [
    {
      title: 'Power Systems',
      name: 'systems',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Types of power on the boat',
      options: {
        sortable: false,
        list: [
          { title: '12v DC', value: 'dc-12v' },
          { title: '24v DC', value: 'dc-24v' },
          { title: '120v AC', value: 'ac-120v' },
          { title: '240v AC', value: 'ac-240v' },
        ],
      }
    },
    {
      title: 'Batteries',
      name: 'batteries',
      type: 'number',
      description: 'Number of batteries',
      validation: Rule => Rule.min(0),
    },
    {
      title: 'Battery Type',
      name: 'batteryType',
      type: 'string',
      description: 'Chemistry and variant',
      options: {
        list: [
          { title: 'Lead acid / Flooded', value: 'lead-acid-flooded' },
          { title: 'Lead acid / AGM', value: 'lead-acid-agm' },
          { title: 'Lead acid / Gel', value: 'lead-acid-gel' },
          { title: 'Lithium / LiFePO4', value: 'lithium-lifepo4' },
          { title: 'Lithium / LiMNC', value: 'lithium-limnc' },
        ],
      },
    },
    {
      title: 'Battery Capacity',
      name: 'batteryCapacity',
      type: 'number',
      description: 'Total, in amp-hours (AH)',
      validation: Rule => Rule.min(1),
    },
    {
      title: 'Charging',
      name: 'charging',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'How the batteries are charged',
      options: {
        sortable: false,
        list: [
          { title: 'Alternator', value: 'alternator' },
          { title: 'Shore power', value: 'shore power' },
          { title: 'Solar', value: 'solar' },
          { title: 'Wind', value: 'wind' },
          { title: 'Hydro', value: 'hydro' },
        ],
      }
    },
    {
      title: 'Other Gear',
      name: 'other',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g., BMS, inverter, etc.',
      validation: Rule => Rule.unique(),
      options: {
        sortable: false,
        layout: 'tags',
      }
    },
  ],
}
