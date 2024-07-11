// pages/about.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
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
        <h1 style={{ fontSize: '36px', marginBottom: '30%' }}>About Us</h1>
        <p style={{ fontSize: '20px', lineHeight: '1.5' }}>
          This is the about us page. We are a company dedicated to providing excellent services.
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

export default AboutPage;