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
  description: object;
  specs: {
    loa: number;
    lwl?: number;
    beam?: number;
    draft?: number;
    displacement?: number;
  };
  rigging: {
    rigType?: string;
    sails?: SailType[];
    condition?: string;
  };
  engine: {
    included: boolean;
    make?: string;
    model?: string;
    year?: number;
    horsepower?: number;
    hours?: number;
    type?: 'inboard' | 'outboard';
    fuel?: 'diesel' | 'gasoline';
  };
}
