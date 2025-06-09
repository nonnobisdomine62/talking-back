import Link from 'next/link';
import styles from '../styles/ItemCard.module.css';

export default function ItemCard({ item, bookId, itemId }) {
  return (
    <Link href={`/book/${bookId}/item/${itemId}`} legacyBehavior>
      <div className={styles.itemCard} style={{background: 'var(--color-bg)', color: 'var(--color-text)'}}>
        <h3 style={{color: 'var(--color-text)'}}>Item {item.id}</h3>
        <div className={styles.text} style={{color: 'var(--color-text)'}}>{item.text}</div>
        {item.verse && (
          <pre className={styles.verse} style={{background: 'var(--color-accent-bg)', color: 'var(--color-text)'}}>{item.verse}</pre>
        )}
        {item.citation && (
          <div className={styles.citation} style={{color: 'var(--color-text)'}}>{item.citation}</div>
        )}
      </div>
    </Link>
  );
}
