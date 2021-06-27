export default {
  title: 'Simple Block Content',
  name: 'simpleBlockContent',
  type: 'array',
  of: [{
    type: 'block',
    styles: [
      { title: 'Heading', value: 'h3' },
    ],
    lists: [
      { title: 'Numbered', value: 'number' },
      { title: 'Bulleted', value: 'bullet' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
      ],
    },
  }],
}
