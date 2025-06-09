import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

import PropTypes from 'prop-types';
export default function Navbar({ theme, setTheme }) {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brandGroup} aria-label="Talking Back Home">
        <span className={styles.brand}>✠ Talking Back</span>
        <span className={styles.subtitle}>Catholic Spiritual Warfare</span>
      </Link>
      <div className={styles.right}>
        <button
          className={styles.themeToggle}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
        <a
          href="https://github.com/nonnobisdomine62/talking-back"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
          aria-label="GitHub Repository"
        >
          <img src="/github.svg" alt="GitHub" />
        </a>
      </div>
    </nav>
  );
}
