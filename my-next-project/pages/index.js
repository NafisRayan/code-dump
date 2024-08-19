// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
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
        <h1 style={{ fontSize: '48px', marginBottom: '30%' }}>Welcome to Our Website!</h1>
        <p style={{ fontSize: '24px', lineHeight: '1.5' }}>
          This is the home page. Explore our services and learn more about us.
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

export default HomePage;