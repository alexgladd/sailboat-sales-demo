// Sanity.io server-side things

import SanityClient from '@sanity/client'
import { config } from './sanity.config'

export const sanityClient = SanityClient(config);
