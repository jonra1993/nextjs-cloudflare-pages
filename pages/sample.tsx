import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AdaptiveCardsSampleWithNoSSR = dynamic(
  () => import('../components/adaptive-card'),
  { 
    ssr: false,
  }
);

const IndexPage = () => {

  return (
    <main>
      <Head>
        <title>Sample</title>
      </Head>
      <AdaptiveCardsSampleWithNoSSR />
    </main>
  );

  
};

export default IndexPage;
