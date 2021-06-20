import React, { useState } from 'react';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { H2 } from './Headings';
import SanityImage from './SanityImage';

const FullImage: React.FC<{ onClose: () => void; img: SanityImageObject; }> = ({ onClose, img }) => (
  <div className="fixed inset-0 p-2 sm:p-4 flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 z-[100]" onClick={onClose}>
    <div className="relative w-full h-full">
      <SanityImage
        priority
        src={img}
        layout="fill"
        objectFit="contain" />
    </div>
    <div className="mt-4 px-4 py-2 rounded-md text-lg font-medium tracking-wide text-yellow-50 bg-gray-900">
      Click/tap anywhere to close
    </div>
  </div>
)

type GalleryProps = {
  heading?: string;
  photos: SanityImageObject[];
}

export default function Gallery({ heading = 'Photos', photos }: GalleryProps) {
  const [fullImg, setFullImg] = useState<SanityImageObject | null>(null);
  
  return (
    <section id="gallery">
      <H2>{ heading }</H2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
        {photos.map(p => (
          <div
            onClick={() => setFullImg(p)}
            className="relative h-60 rounded-lg overflow-hidden transform transition-button hover:scale-105 hover:shadow-md hover:cursor-pointer" key={p.asset._ref}>
            <SanityImage src={p} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>

      {fullImg && <FullImage img={fullImg} onClose={() => setFullImg(null)} />}
    </section>
  );
}
