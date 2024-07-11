// File: pages/index.js

import Header from '../components/Header'; // Adjust the path as necessary
import Footer from '../components/Footer'; // Adjust the path as necessary
import styles from './page.module.css'; // Assuming you have a CSS module for styling

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Welcome to Our Website</h1>
          <p>This is a simple homepage.</p>
          {/* Add more content as needed */}
        </div>
      </main>
      <Footer />
    </div>
  );
}