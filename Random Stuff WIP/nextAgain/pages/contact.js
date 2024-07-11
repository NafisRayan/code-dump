// File: pages/contact.js

import Head from 'next/head';
import Header from '../components/Header'; // Adjusted path
import Footer from '../components/Footer'; // Adjusted path

export default function ContactUs() {
  return (
    <div>
      <Head>
        <title>Contact Us | My Next.js App</title>
        <meta name="description" content="Get in touch with us." />
      </Head>
      <Header />
      <main>
        <h1>Contact Us</h1>
        <p>This is the contact us page.</p>
      </main>
      <Footer />
    </div>
  );
}