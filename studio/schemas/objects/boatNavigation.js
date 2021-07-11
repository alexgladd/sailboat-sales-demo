export default {
  title: 'Boat Navigation',
  name: 'boatNavigation',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
    columns: 2,
  },
  fields: [
    {
      title: 'Steering',
      name: 'steering',
      type: 'string',
      description: 'How is the boat steered?',
      options: {
        layout: 'radio',
        list: [
          { title: 'Tiller', value: 'tiller' },
          { title: 'Wheel', value: 'wheel' },
        ],
      },
    },
    {
      title: 'Instruments',
      name: 'instruments',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sailing and navigation instruments',
      options: {
        sortable: false,
        list: [
          { title: 'Wind speed', value: 'wind-spd' },
          { title: 'Wind direction', value: 'wind-dir' },
          { title: 'Speed (water)', value: 'speed' },
          { title: 'Depth', value: 'depth' },
          { title: 'Water temp', value: 'water-temp' },
          { title: 'GPS', value: 'gps' },
        ],
      },
    },
    {
      title: 'Instrument Displays',
      name: 'instrumentDisplays',
      type: 'number',
      description: 'Number of instrument displays',
      initialValue: 0,
      validation: Rule => Rule.min(0),
    },
    {
      title: 'Chartplotter',
      name: 'chartplotter',
      type: 'boolean',
      description: 'Does the boat have a chartplotter?',
      initialValue: false,
    },
  ],
}
