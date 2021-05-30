import Layout from '../components/Layout';
import { GetStaticProps } from 'next';
import { sanityClient } from '../lib/sanity.server';
import { SailboatDocument } from '../lib/types';
import { featuredSailboatsForSale } from '../lib/queries';
import FeaturedBoats from '../components/FeaturedBoats';

type HomeProps = {
  featured: SailboatDocument[];
}

export default function Home({ featured }: HomeProps) {
  return (
    <Layout pageTitle="Home">
      <main className="space-y-8">
        <FeaturedBoats boats={featured} />
        <div className="p-6 max-w-sm mx-auto bg-yellow-300 rounded-lg shadow-md flex justify-center">
          Homepage!
        </div>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredBoats = await sanityClient.fetch<SailboatDocument[]>(featuredSailboatsForSale);

  return {
    props: {
      featured: featuredBoats,
    }
  };
}
