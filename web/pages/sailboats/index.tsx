import { GetStaticProps } from 'next'
import { SanityDocument } from '@sanity/client'
import Layout from '../../components/Layout'
import { sanityClient } from '../../lib/sanity.server'
import { allSailboatsForSale } from '../../lib/queries'
import SailboatCard from '../../components/SailboatCard'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

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

export default function Inventory({ boats }: InventoryProps) {
  return (
    <Layout pageTitle="Sailboats for Sale">
      <main className="space-y-8">
        <div>
          <h1 className="text-2xl">Featured Sailboats</h1>
        </div>

        <div className="flex justify-between items-end">
          <h1 className="text-2xl">Sailboats for sale</h1>
          <div>
            Order by:
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        { boats.map(boat => (
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
