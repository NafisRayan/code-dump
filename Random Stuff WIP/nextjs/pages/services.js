// pages/services.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <>
      <Head>
        {/* Head content */}
      </Head>
      <Header />
      <main style={{ 
          backgroundColor: '#000', 
          color: '#fff', 
          padding: '20px',
          backgroundImage: "url('https://wallpaperaccess.com/full/4167709.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center"
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '30%' }}>Our Services</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.5' }}>
          This is the services page. Explore our offerings and choose what suits you best.
        </p>
        <style jsx>{`
          h1, p {
            color: #fff; /* White */
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;