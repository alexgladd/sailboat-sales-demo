import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'

export default function Inventory() {
  return (
    <Layout pageTitle="Sailboats for Sale">
      <div className="p-6 max-w-sm mx-auto my-4 bg-yellow-300 rounded-lg shadow-md flex justify-center">
        Inventory!
      </div>
    </Layout>
  )
}
