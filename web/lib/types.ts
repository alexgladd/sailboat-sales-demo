import { SanityDocument } from '@sanity/client'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type SailboatDocument = SanityDocument & {
  name: string;
  make: string;
  model: string;
  year: number;
  askingPrice: number;
  photos: SanityImageObject[];
}
