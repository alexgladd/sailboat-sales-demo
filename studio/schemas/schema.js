// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// objects
import simpleBlockContent from './objects/simpleBlockContent'
import galleryPhoto from './objects/galleryPhoto'
import boatSpecs from './objects/boatSpecs'
import boatRigging from './objects/boatRigging'

// documents
import newsItem from './documents/newsItem'
import sailboat from './documents/sailboat'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'sailboatsales',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    simpleBlockContent,
    galleryPhoto,
    boatSpecs,
    boatRigging,
    newsItem,
    sailboat,
  ]),
})
