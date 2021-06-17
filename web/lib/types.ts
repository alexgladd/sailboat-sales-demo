import { SanityDocument } from '@sanity/client'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

type SailType = 'staysail' | 'jib' | 'genoa' | 'codezero' | 'gennaker' | 'spinnaker' | 'main' | 'mizzen';

export type SailboatDocument = SanityDocument & {
  name: string;
  make: string;
  model: string;
  year: number;
  askingPrice: number;
  photos: SanityImageObject[];
  specs: {
    loa: number;
    lwl?: number;
    beam?: number;
    draft?: number;
    displacement?: number;
  };
  rigging: {
    rigType: string;
    sails: SailType[];
    condition: string;
  }
}
