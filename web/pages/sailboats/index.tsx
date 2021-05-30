import React from 'react'
import { GetStaticProps } from 'next'
import orderBy from 'lodash/orderBy'
import Layout from '../../components/Layout'
import { sanityClient } from '../../lib/sanity.server'
import { allSailboatsForSale, featuredSailboatsForSale } from '../../lib/queries'
import SailboatCard from '../../components/SailboatCard'
import Select from '../../components/Select'
import type { SelectOptions } from '../../components/Select'
import { BoatOrder } from '../../lib/constants'
import type { SailboatDocument } from '../../lib/types';
import FeaturedBoats from '../../components/FeaturedBoats'

type InventoryProps = {
  featured: SailboatDocument[];
  boats: SailboatDocument[];
}

const sortOptions: SelectOptions = [
  {key: BoatOrder.newest, label: 'Newest'},
  {key: BoatOrder.loaAsc, label: 'LOA ↑'},
  {key: BoatOrder.loaDesc, label: 'LOA ↓'},
  {key: BoatOrder.priceAsc, label: 'Price ↑'},
  {key: BoatOrder.priceDesc, label: 'Price ↓'},
  {key: BoatOrder.yearAsc, label: 'Year ↑'},
  {key: BoatOrder.yearDesc, label: 'Year ↓'},
];

export default function Inventory({ featured, boats }: InventoryProps) {
  const [sort, setSort] = React.useState(sortOptions[0]);

  const sortParams = ['name'];
  const sortOrders: ('asc' | 'desc')[] = ['asc'];

  switch (sort.key) {
    case BoatOrder.newest:
      sortParams.unshift('_createdAt');
      sortOrders.unshift('desc');
      break;

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
        <FeaturedBoats boats={featured} />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-3xl text-yellow-900 tracking-wide font-medium">Sailboats for sale</h1>
          <div className="relative w-48 mt-6 sm:mt-0">
            <Select label="Order by" value={sort} options={sortOptions} onChange={setSort} />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredBoats = await sanityClient.fetch<SailboatDocument[]>(featuredSailboatsForSale);
  const allBoats = await sanityClient.fetch<SailboatDocument[]>(allSailboatsForSale);

  return {
    props: {
      featured: featuredBoats,
      boats: allBoats,
    }
  };
}
