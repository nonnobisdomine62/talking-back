import Link from 'next/link';
import styles from '../styles/BookList.module.css';

export default function BookList({ books }) {
  return (
    <div className={styles.bookList}>
      {books.map((book, idx) => (
        <div className={styles.bookCard} key={idx}>
          <h2>{book.title}</h2>
          <Link href={`/book/${idx}`}>Browse Items →</Link>
        </div>
      ))}
    </div>
  );
}
