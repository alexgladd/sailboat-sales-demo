import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { sortBy } from 'lodash';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../../components/Layout';
import { SailboatDocument } from '../../lib/types';
import { sanityClient } from '../../lib/sanity.server';
import { allSailboatIdsForSale, sailboatById } from '../../lib/queries';
import SanityImage from '../../components/SanityImage';
import Button from '../../components/Button';
import { Mail } from '../../components/Icons';
import { Path } from '../../lib/constants';
import { LeftRight, LeftRightItem } from '../../components/LeftRight';
import { H2 } from '../../components/Headings';
import Gallery from '../../components/Gallery';



type SailboatDetailsProps = {
  boat: SailboatDocument;
}

export default function SailboatDetails({ boat }: SailboatDetailsProps) {
  const boatSails = sortBy(boat.rigging.sails);

  return (
    <Layout pageTitle={`For sale: ${boat.year} ${boat.make} ${boat.model}`}>
      <main>
        <section id="hero" className="-mx-2 sm:-mx-4">
          <div className="relative h-72 sm:h-96 xl:h-[30rem] overflow-hidden bg-gray-50">
            <SanityImage src={boat.photos[0]} priority layout="fill" objectFit="cover" />
          </div>
        </section>
        <header className="-mx-2 sm:-mx-4 p-2 sm:p-4 sticky top-14 lg:top-16 inset-x-0 bg-yellow-50 border-yellow-200 border-b-2 z-40">
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
          <aside className="p-2 sm:p-4 rounded bg-yellow-50 space-y-6 text-base lg:text-lg">
            <div>
              <H2>Specifications</H2>
              <LeftRight>
                <LeftRightItem left="LOA:" right={`${boat.specs.loa.toLocaleString('en-US')} ft`} />
                {boat.specs.lwl && <LeftRightItem left="LWL:" right={`${boat.specs.lwl.toLocaleString('en-US')} ft`}/>}
                {boat.specs.beam && <LeftRightItem left="Beam:" right={`${boat.specs.beam.toLocaleString('en-US')} ft`}/>}
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
            <div>
              <H2>Engine</H2>
              {boat.engine?.included ?
              <LeftRight>
                {(boat.engine.make || boat.engine.model) && <LeftRightItem left="Make/model:" right={`${boat.engine.make ? boat.engine.make : ''} ${boat.engine.model ? boat.engine.model : ''}`.trim()}/>}
                {boat.engine.year && <LeftRightItem left="Year:" right={boat.engine.year.toString()}/>}
                {boat.engine.horsepower && <LeftRightItem left="HP:" right={boat.engine.horsepower.toLocaleString('en-US')}/>}
                {boat.engine.hours && <LeftRightItem left="Hours:" right={boat.engine.hours.toLocaleString('en-US')}/>}
                {boat.engine.type && <LeftRightItem left="Type:" right={boat.engine.type.charAt(0).toUpperCase() + boat.engine.type.slice(1)}/>}
                {boat.engine.fuel && <LeftRightItem left="Fuel:" right={boat.engine.fuel.charAt(0).toUpperCase() + boat.engine.fuel.slice(1)}/>}
              </LeftRight>
              :
              <p className="font-bold">None</p>
              }
            </div>
          </aside>
          <article className="p-2 sm:p-4 rounded bg-yellow-50 md:col-span-2 space-y-8">
            <section id="gallery">
              <H2>Photos</H2>
              <Gallery photos={boat.photos} />
            </section>
            <section id="description" className="block-content lg:block-content-lg">
              <H2>Description</H2>
              <BlockContent blocks={boat.description} />
            </section>
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
