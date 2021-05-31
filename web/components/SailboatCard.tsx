import React from 'react'
import Link from 'next/link'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import SanityImage from './SanityImage'
import { Path } from '../lib/constants'

type SailboatCardProps = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  askingPrice: number;
  photo: SanityImageObject;
}

export default function SailboatCard(props: SailboatCardProps) {
  return (
    <Link href={`${Path.sailboats}/${props.id}`}><a>
      <div className="rounded-xl shadow-md overflow-hidden bg-gray-50 transform transition-button hover:scale-105 hover:shadow-lg">
        <div className="relative h-60">
          <SanityImage src={props.photo} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4 space-y-2">
          <h1 className="text-xl xl:text-2xl font-bold tracking-wide text-yellow-900">{props.name}</h1>
          <div className="flex justify-between items-baseline">
            <div className="text-gray-500 font-medium xl:text-lg">
              {`${props.year} ${props.make} ${props.model}`}
            </div>
            <div className="py-2 px-4 font-bold text-white xl:text-lg bg-yellow-600 rounded-xl">
              {`$${props.askingPrice.toLocaleString('en-US')}`}
            </div>
          </div>
        </div>
      </div>
      </a></Link>
  );
}
