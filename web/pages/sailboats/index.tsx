import React from 'react'
import { GetStaticProps } from 'next'
import { SanityDocument } from '@sanity/client'
import orderBy from 'lodash/orderBy'
import Layout from '../../components/Layout'
import { sanityClient } from '../../lib/sanity.server'
import { allSailboatsForSale } from '../../lib/queries'
import SailboatCard from '../../components/SailboatCard'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import Select from '../../components/Select'
import type { SelectOptions } from '../../components/Select'
import { BoatOrder } from '../../lib/constants'

type InventoryProps = {
  boats: (SanityDocument & {
    name: string;
    make: string;
    model: string;
    year: number;
    askingPrice: number;
    photos: SanityImageObject[];
  })[];
}

const sortOptions: SelectOptions = [
  {key: BoatOrder.loaAsc, label: 'LOA ↑'},
  {key: BoatOrder.loaDesc, label: 'LOA ↓'},
  {key: BoatOrder.priceAsc, label: 'Price ↑'},
  {key: BoatOrder.priceDesc, label: 'Price ↓'},
  {key: BoatOrder.yearAsc, label: 'Year ↑'},
  {key: BoatOrder.yearDesc, label: 'Year ↓'},
];

export default function Inventory({ boats }: InventoryProps) {
  const [sort, setSort] = React.useState(sortOptions[0]);

  const sortParams = ['_createdAd'];
  const sortOrders: ('asc' | 'desc')[] = ['asc'];

  switch (sort.key) {
    case BoatOrder.loaAsc:
      sortParams.unshift('specs.loa');
      sortOrders.unshift('asc');
      break;
    
    case BoatOrder.loaDesc:
      sortParams.unshift('specs.loa');
      sortOrders.unshift('desc');
      break;
    
    case BoatOrder.priceAsc:
      sortParams.unshift('askingPrice');
      sortOrders.unshift('asc');
      break;
    
    case BoatOrder.priceDesc:
      sortParams.unshift('askingPrice');
      sortOrders.unshift('desc');
      break;
    
    case BoatOrder.yearAsc:
      sortParams.unshift('year');
      sortOrders.unshift('asc');
      break;
    
    case BoatOrder.yearDesc:
      sortParams.unshift('year');
      sortOrders.unshift('desc');
      break;
  }

  const sortedBoats = orderBy(boats, sortParams, sortOrders);

  return (
    <Layout pageTitle="Sailboats for Sale">
      <main className="space-y-8">
        <div>
          <h1 className="text-2xl">Featured Sailboats</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <h1 className="text-2xl">Sailboats for sale</h1>
          <div className="relative w-44 self-center sm:self-auto mt-8 sm:mt-0">
            <Select label="Order by" value={sort} options={sortOptions} onChange={setSort} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        { sortedBoats.map(boat => (
          <SailboatCard
            key={boat._id}
            id={boat._id}
            name={boat.name}
            make={boat.make}
            model={boat.model}
            year={boat.year}
            askingPrice={boat.askingPrice}
            photo={boat.photos[0]} />
        ))}
        </div>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const boats = await sanityClient.fetch<SanityDocument[]>(allSailboatsForSale);

  // console.log('INVENTORY static props', boats);

  return {
    props: {
      boats,
    }
  };
}
