// File: pages/services.js

import Head from 'next/head';
import Header from '../components/Header'; // Adjusted path
import Footer from '../components/Footer'; // Adjusted path

export default function Services() {
  return (
    <div>
      <Head>
        <title>Services | My Next.js App</title>
        <meta name="description" content="Check out our services." />
      </Head>
      <Header />
      <main>
        <h1>Our Services</h1>
        <p>This is the services page.</p>
      </main>
      <Footer />
    </div>
  );
}