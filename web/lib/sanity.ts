// Sanity.io client-side things

import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './sanity.server'

const imgUrlBuilder = createImageUrlBuilder(sanityClient);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
 export const urlFor = (source: SanityImageSource) => imgUrlBuilder.image(source)

 // Set up the live preview subscription hook
//  export const usePreviewSubscription = createPreviewSubscriptionHook(config)
 
 // Set up Portable Text serialization
//  export const PortableText = createPortableTextComponent({
//    ...config,
//    // Serializers passed to @sanity/block-content-to-react
//    // (https://github.com/sanity-io/block-content-to-react)
//    serializers: {},
//  })
