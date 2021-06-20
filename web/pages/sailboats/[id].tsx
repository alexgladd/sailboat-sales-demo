import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sortBy } from 'lodash';
import Layout from '../../components/Layout';
import { SailboatDocument } from '../../lib/types';
import { sanityClient } from '../../lib/sanity.server';
import { allSailboatIdsForSale, sailboatById } from '../../lib/queries';
import SanityImage from '../../components/SanityImage';
import Button from '../../components/Button';
import { Mail } from '../../components/Icons';
import { Path } from '../../lib/constants';
import { LeftRight, LeftRightItem } from '../../components/LeftRight';

const H2: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className = ''}) => (
  <h2 className={`mb-2 text-2xl lg:text-3xl text-yellow-900 font-bold tracking-wide ${className}`}>
    { children }
  </h2>
)

type SailboatDetailsProps = {
  boat: SailboatDocument;
}

export default function SailboatDetails({ boat }: SailboatDetailsProps) {
  const boatSails = sortBy(boat.rigging.sails);

  return (
    <Layout pageTitle={`For sale: ${boat.year} ${boat.make} ${boat.model}`}>
      <main>
        <section className="-mx-2 sm:-mx-4">
          <div className="relative h-72 sm:h-96 xl:h-[30rem] overflow-hidden bg-gray-50">
            <SanityImage src={boat.photos[0]} priority layout="fill" objectFit="cover" />
          </div>
        </section>
        <header className="-mx-2 sm:-mx-4 p-2 sm:p-4 sticky top-14 lg:top-16 inset-x-0 bg-yellow-50 border-yellow-200 border-b-2">
          <div className="container mx-auto flex flex-col sm:flex-row items-center sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
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
        <section className="container m-auto py-2 sm:py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <aside className="p-2 sm:p-4 rounded bg-yellow-50 space-y-6">
            <div>
              <H2>Specifications</H2>
              <LeftRight>
                <LeftRightItem left="LOA:" right={`${boat.specs.loa.toLocaleString('en-US')} ft`} />
                {boat.specs.lwl && <LeftRightItem left="LOA:" right={`${boat.specs.lwl.toLocaleString('en-US')} ft`}/>}
                {boat.specs.beam && <LeftRightItem left="LWL:" right={`${boat.specs.beam.toLocaleString('en-US')} ft`}/>}
                {boat.specs.draft && <LeftRightItem left="Draft:" right={`${boat.specs.draft.toLocaleString('en-US')} ft`}/>}
                {boat.specs.displacement && <LeftRightItem left="Displacement:" right={`${boat.specs.displacement.toLocaleString('en-US')} lbs`}/>}
              </LeftRight>
            </div>
            <div>
              <H2>Rigging</H2>
              <LeftRight>
                <LeftRightItem left="Rig type:" right={boat.rigging.rigType} />
                <LeftRightItem left="Sails:" right={boatSails.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')} />
                <LeftRightItem left="Sail notes:" right={boat.rigging.condition} />
              </LeftRight>
            </div>
          </aside>
          <article className="p-2 sm:p-4 rounded bg-yellow-50 md:col-span-2">
            <H2>Photos</H2>
          </article>
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
