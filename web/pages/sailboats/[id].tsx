import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { SailboatDocument } from '../../lib/types';
import { sanityClient } from '../../lib/sanity.server';
import { allSailboatIdsForSale, sailboatById } from '../../lib/queries';
import SanityImage from '../../components/SanityImage';
import Button from '../../components/Button';
import { Mail } from '../../components/Icons';
import { Path } from '../../lib/constants';

type SailboatDetailsProps = {
  boat: SailboatDocument;
}

export default function SailboatDetails({ boat }: SailboatDetailsProps) {
  return (
    <Layout pageTitle={`For sale: ${boat.year} ${boat.make} ${boat.model}`}>
      <main>
        <section className="-mx-2 sm:-mx-4">
          <div className="relative h-72 sm:h-96 xl:h-[30rem] overflow-hidden bg-gray-50">
            <SanityImage src={boat.photos[0]} priority layout="fill" objectFit="cover" />
          </div>
        </section>
        <header className="-mx-2 sm:-mx-4 p-2 sm:p-4 sticky top-14 lg:top-16 inset-x-0 bg-yellow-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4">
            <h1 className="text-4xl xl:text-5xl text-yellow-900 font-bold italic tracking-wide">
              {boat.name}
            </h1>
            <div className="sm:flex-grow text-lg lg:text-2xl text-yellow-800 font-bold tracking-wide">
              {boat.year} {boat.make} {boat.model}
            </div>
            <div className="text-lg lg:text-2xl font-bold tracking-wide text-yellow-700">
              ${boat.askingPrice.toLocaleString('en-US')}
            </div>
            <Button link href={`${Path.contact}?b=${boat._id}`} className="flex justify-center w-full sm:w-auto">
              <Mail extraStyles="inline" />
              <div className="sm:hidden md:block ml-2">Inquire</div>
            </Button>
          </div>
        </header>
        <section className="container m-auto space-y-8">
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
          <div className="w-64 h-48 mx-auto my-4 px-6 py-4 bg-yellow-200">LOREM IPSUM</div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const sailboats = await sanityClient.fetch<SailboatDocument[]>(sailboatById, { id: params.id });

  if (!sailboats || sailboats.length < 1) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        boat: sailboats[0],
      }
    };
  }
}

type SailboatId = {
  _id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sailboatIds = await sanityClient.fetch<SailboatId[]>(allSailboatIdsForSale);
  const paths = sailboatIds.map(s => ({ params: { id: s._id } }));
  return {
    paths,
    fallback: false,
  };
}
