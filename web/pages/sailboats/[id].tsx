import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { SailboatDocument } from '../../lib/types';
import { sanityClient } from '../../lib/sanity.server';
import { allSailboatIdsForSale, sailboatById } from '../../lib/queries';
import SanityImage from '../../components/SanityImage';

type SailboatDetailsProps = {
  boat: SailboatDocument;
}

export default function SailboatDetails({ boat }: SailboatDetailsProps) {
  return (
    <Layout pageTitle={`For sale: ${boat.year} ${boat.make} ${boat.model}`}>
      <main className="space-y-8">
        <section className="-mx-2 sm:-mx-4">
          <div className="relative h-72 sm:h-96 xl:h-[30rem] overflow-hidden bg-gray-50">
            <SanityImage src={boat.photos[0]} priority layout="fill" objectFit="cover" />
          </div>
        </section>
        <div className="mt-4 p-4 max-w-md mx-auto bg-yellow-300 rounded-lg shadow-lg">
          {`${boat.name}: ${boat.year} ${boat.make} ${boat.model}`}
        </div>
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
