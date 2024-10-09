"use client"
import React from 'react'
import Head from 'next/head'
import Card from '@/components/Card';

const Home = () => {
  return (
      <div className="container mx-auto p-4">
          <Head>
              <title>90 Ball Bingo</title>
              <meta name="description" content="90 Ball Bingo Card Generator" />
          </Head>
          <Card />
      </div>
  );
};

export default Home;