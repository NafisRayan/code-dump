// pages/contact.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
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
        <h1 style={{ fontSize: '28px', marginBottom: '30%' }}>Contact Us</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          This is the contact us page. Reach out to us!
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

export default ContactPage;