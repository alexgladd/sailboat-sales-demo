import React from 'react'
import Image, { ImageLoader, ImageProps } from 'next/image'
import { urlFor } from '../lib/sanity'
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

const sanityLoader: ImageLoader = ({src, width, quality}) => {
  const sanitySrc = JSON.parse(src);
  let sanityUrl = urlFor(sanitySrc).auto('format').fit('max');

  if (width) sanityUrl = sanityUrl.width(width);
  if (quality) sanityUrl = sanityUrl.quality(quality);

  return sanityUrl.url() || '';
}

type SanityImageProps = {
  src: SanityImageObject;
  quality?: number | string;
  priority?: boolean;
  loading?: ImageProps['loading'];
  objectFit?: ImageProps['objectFit'];
  objectPosition?: ImageProps['objectPosition'];
  sizes?: ImageProps['sizes'];
  className?: ImageProps['className'];
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
    src={JSON.stringify(src) || ''}
    loader={sanityLoader}
  />
)

export default SanityImage;
