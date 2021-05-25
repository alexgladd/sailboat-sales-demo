import React from 'react'
import Image, { ImageLoader, ImageProps } from 'next/image'
import { urlFor } from '../lib/sanity'
import { SanityImageHotspot, SanityImageCrop, SanityImageObject } from '@sanity/image-url/lib/types/types';

const sanityLoader: ImageLoader = ({src, width, quality}) => {
  const sanityUrl = urlFor(src).auto('format').fit('max');

  if (width) sanityUrl.width(width);
  if (quality) sanityUrl.quality(quality);

  return sanityUrl.url() || '';
}

type SanityImageProps = {
  src: SanityImageObject;
  quality?: number | string;
  priority?: boolean;
  loading?: ImageProps['loading'];
  objectFit?: ImageProps['objectFit'];
  objectPosition?: ImageProps['objectPosition'];
} & (
  | {
    layout: 'fill';
    width?: never;
    height?: never;
  }
  | {
    layout?: 'fixed' | 'intrinsic' | 'responsive';
    width: number | string;
    height: number | string;
  }
)

const SanityImage: React.FC<SanityImageProps> = ({ src, ...props }) => (
  <Image
    {...props}
    src={src.asset._ref || ''}
    loader={sanityLoader}
  />
)

export default SanityImage;
