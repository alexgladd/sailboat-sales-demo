import React from 'react';
import Head from 'next/head';
import Meta from './Meta';
import Navbar from './Navbar';

type LayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
}

const SITE_TITLE = 'Sailboat Sales Demo';

export default function Layout({ pageTitle, children }: LayoutProps) {
  return (
    <>
      <Meta />
      <Head>
        <title>{pageTitle ? `${SITE_TITLE} - ${pageTitle}` : SITE_TITLE}</title>
      </Head>
      <Navbar />
      <div id="main-container" className="my-14 lg:my-16 px-2 sm:px-4">
        {children}
      </div>
    </>
  );
}
