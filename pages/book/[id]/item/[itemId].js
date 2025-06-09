import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../../../components/Navbar';
import styles from '../../../../styles/Item.module.css';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'talking-back.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileContents);
  let paths = [];
  books.forEach((book, bookIdx) => {
    book.items.forEach((item, itemIdx) => {
      paths.push({ params: { id: bookIdx.toString(), itemId: itemIdx.toString() } });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'talking-back.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileContents);
  const book = books[params.id];
  const item = book.items[params.itemId];
  return { props: { book, item, bookId: params.id, itemId: params.itemId } };
}

export default function ItemPage({ book, item, bookId, itemId, theme, setTheme }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Item {item.id} | {book.title} | Talking Back</title>
      </Head>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className={styles.main}>
        <h1 className={styles.title}>{book.title}</h1>
        <h2 className={styles.itemTitle}>Item {item.id}</h2>
        <div className={styles.text}>{item.text}</div>
        {item.verse && (
          <pre className={styles.verse} style={{background: 'var(--color-accent-bg)', color: 'var(--color-text)'}}>{item.verse}</pre>
        )}
        {item.citation && <div className={styles.citation}>{item.citation}</div>}
        <button className={styles.backBtn} onClick={() => router.back()}>← Back</button>
      </main>
    </div>
  );
}
