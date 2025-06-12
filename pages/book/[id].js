import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback } from 'react';
import Navbar from '../../components/Navbar';
import ItemCard from '../../components/ItemCard';
import styles from '../../styles/Book.module.css';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'talking-back.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileContents);
  const paths = books.map((_, idx) => ({ params: { id: idx.toString() } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'talking-back.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileContents);
  const book = books[params.id];
  return { props: { book, id: params.id } };
}

export default function BookPage({ book, id, theme, setTheme }) {
  const router = useRouter();
  
  // Handle random item selection from current book
  const handleRandomItem = useCallback(() => {
    if (book.items.length === 0) return;
    const randomItemId = Math.floor(Math.random() * book.items.length);
    router.push(`/book/${id}/item/${randomItemId}`);
  }, [book.items, id]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{book.title} | Talking Back</title>
      </Head>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.homeBtn}>← Home</Link>
          <button 
            onClick={handleRandomItem} 
            className={styles.randomButton}
            aria-label={`Select a random item from ${book.title}`}
          >
            🎲 Random Item
          </button>
        </div>
        <h1 className={styles.title}>{book.title}</h1>
        <div className={styles.items}>
          {book.items.map((item, idx) => (
            <ItemCard key={idx} item={item} bookId={id} itemId={idx} />
          ))}
        </div>
      </main>
    </div>
  );
}
