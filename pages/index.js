import Head from 'next/head';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import SiteSearch from '../components/SiteSearch';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'talking-back.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileContents);
  return { props: { books } };
}

import PropTypes from 'prop-types';
export default function Home({ books, theme, setTheme }) {
  const router = useRouter();
  // Flatten all items for search
  const allItems = books.flatMap((book, bookIdx) =>
    book.items.map(item => ({ ...item, bookTitle: book.title, bookIdx }))
  );
  // On selecting a search result, navigate to the item page
  const handleResultSelect = (result) => {
    router.push(`/book/${result.bookIdx}/item/${books[result.bookIdx].items.findIndex(i => i.id === result.id)}`);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Talking Back: Catholic Spiritual Warfare</title>
        <meta name="description" content="Talking Back is a monastic handbook for combating demons, featuring spiritual wisdom from Evagrius of Pontus. Catholic spiritual warfare resources, search, and study." />
        <meta name="description" content="A gothic medieval handbook for combating demons" />
        <link rel="icon" href="/github.svg" />
      </Head>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className={styles.main}>
        <h1 className={styles.title}>Talking Back</h1>
        <p className={styles.subtitle}>
          A Monastic Handbook for Combating Demons<br />
          <span className={styles.byline}>from the book by Evagrius of Pontus, trans. David Brakke</span>
        </p>
        <div className={styles.searchSection}>
          <div className={styles.searchLabel}>
            <span>🔎 Sitewide Search</span>
          </div>
          <SiteSearch data={books} onResultSelect={handleResultSelect} />
        </div>
        <BookList books={books} />
      </main>
    </div>
  );
}
