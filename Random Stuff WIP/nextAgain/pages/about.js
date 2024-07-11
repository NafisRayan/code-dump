// File: pages/about.js

import Head from 'next/head';
import Header from '../components/Header'; // Adjusted path
import Footer from '../components/Footer'; // Adjusted path

export default function AboutUs() {
  return (
    <div>
      <Head>
        <title>About Us | My Next.js App</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <Header />
      <main>
        <h1>About Us</h1>
        <p>This is the about us page.</p>
      </main>
      <Footer />
    </div>
  );
}