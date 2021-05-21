export default {
  title: 'Gallery Photo',
  name: 'galleryPhoto',
  type: 'image',
  options: {
    metadata: ['palette', 'lqip'],
    hotspot: true,
    storeOriginalFilename: false,
  },
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      description: 'Optional text to describe the photo',
      options: {
        isHighlighted: true,
      },
    },
  ],
}
