import React, { useState } from 'react';
import Link from 'next/link';
import { Path } from '../lib/constants';
import type { SailboatDocument } from '../lib/types';
import { ArrowCircleRight, ArrowHeadLeft, ArrowHeadRight, Star } from './Icons';
import SanityImage from './SanityImage';

type FeaturedSlideProps = {
  boat: SailboatDocument;
  offLeft: boolean;
  offRight: boolean;
}

function FeaturedSlide({ boat, offLeft, offRight }: FeaturedSlideProps) {
  return (
    <div className={`absolute inset-0 transform transition-featured duration-[250ms] ${!offLeft && !offRight && 'opacity-100 translate-x-0'} ${offLeft && 'translate-x-[-100vw] opacity-0'} ${offRight && 'translate-x-[100vw] opacity-0'}`}>
      <SanityImage src={boat.photos[0]} priority layout="fill" objectFit="cover" />
      <div className="absolute m-2 sm:m-4">
        <div className="p-2 flex rounded bg-yellow-50 bg-opacity-75 shadow-lg">
          <div className="text-yellow-600 py-1 mr-2">
            <Star sizeStyles="w-8 h-8" />
          </div>
          <div>
            <Link href={`${Path.sailboats}/${boat._id}`}>
              <a className="block text-4xl xl:text-5xl rounded text-yellow-900 font-medium italic tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-600">
                {boat.name}
              </a>
            </Link>
            <div className="text-yellow-800 text-lg xl:text-xl xl:mt-1 font-medium">{boat.year} {boat.make} {boat.model}</div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 m-2 sm:m-4">
        <Link href={`${Path.sailboats}/${boat._id}`}>
          <a className="flex py-2 px-4 rounded text-white text-xl xl:text-2xl font-medium bg-yellow-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-colors hover:bg-yellow-600">
            <span className="block mr-2">${boat.askingPrice.toLocaleString('en-US')}</span>
            <ArrowCircleRight sizeStyles="w-7 h-7 xl:w-8 xl:h-8" />
          </a>
        </Link>
      </div>
    </div>
  );
}

const ControlButton: React.FC<{
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ disabled = false, onClick, children }) => (
  <button type="button" onClick={onClick} className={`${disabled && 'invisible'} w-12 h-12 text-yellow-900 bg-yellow-50 bg-opacity-75 rounded pointer-events-auto focus:outline-none focus:ring-2 focus:ring-yellow-600`}>
    { children }
  </button>
)

type FeaturedBoatsProps = {
  boats: SailboatDocument[];
}

export default function FeaturedBoats({ boats }: FeaturedBoatsProps) {
  const [idx, setIdx] = useState(0);

  return (
    <section id="featured" className="-mx-2 sm:-mx-4">
      <div className="relative h-72 sm:h-96 xl:h-[30rem] overflow-hidden">
        {boats.map((boat, i) => <FeaturedSlide key={boat._id} boat={boat} offLeft={idx > i} offRight={idx < i} />)}
        <div id="featured-controls" className="absolute inset-0 m-2 sm:m-4 flex justify-between items-center pointer-events-none">
          <ControlButton disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            <ArrowHeadLeft sizeStyles="w-10 h-10" extraStyles="m-1" />
          </ControlButton>
          <ControlButton disabled={idx === boats.length - 1} onClick={() => setIdx(idx + 1)}>
            <ArrowHeadRight sizeStyles="w-10 h-10" extraStyles="m-1" />
          </ControlButton>
        </div>
      </div>
    </section>
  );
}
