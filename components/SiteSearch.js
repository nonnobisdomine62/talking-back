import React, { useState } from 'react';
import styles from './SiteSearch.module.css';

import PropTypes from 'prop-types';
export default function SiteSearch({ data, onResultSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(false);
  const [highlight, setHighlight] = useState(-1); // For keyboard navigation

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const lower = value.toLowerCase();
      const matches = [];
      data.forEach((book, bookIdx) => {
        book.items.forEach((item) => {
          if (
            item.text.toLowerCase().includes(lower) ||
            item.verse.toLowerCase().includes(lower) ||
            item.citation.toLowerCase().includes(lower)
          ) {
            matches.push({
              ...item,
              bookTitle: book.title,
              bookIdx,
            });
          }
        });
      });
      setResults(matches);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result) => {
    setQuery('');
    setResults([]);
    setActive(false);
    if (onResultSelect) onResultSelect(result);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e) => {
    if (!active || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h < results.slice(0, 10).length - 1 ? h + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h > 0 ? h - 1 : results.slice(0, 10).length - 1));
    } else if (e.key === 'Enter') {
      if (highlight >= 0 && highlight < results.slice(0, 10).length) {
        handleResultClick(results[highlight]);
      }
    } else if (e.key === 'Escape') {
      setActive(false);
    }
  };

  return (
    <div className={styles.siteSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search all books..."
        value={query}
        onChange={handleInput}
        onFocus={() => setActive(true)}
        onBlur={() => setTimeout(() => setActive(false), 120)}
        onKeyDown={handleKeyDown}
        aria-label="Sitewide search"
        aria-autocomplete="list"
        aria-controls="search-results-list"
        aria-activedescendant={highlight >= 0 ? `search-result-${highlight}` : undefined}
        role="combobox"
        aria-expanded={active && results.length > 0}
      />
      {active && results.length > 0 && (
        <ul
          className={styles.results}
          id="search-results-list"
          role="listbox"
        >
          {results.slice(0, 10).map((result, i) => (
            <li
              key={result.id + result.bookTitle}
              id={`search-result-${i}`}
              className={styles.resultItem + (highlight === i ? ' ' + styles.active : '')}
              onMouseDown={() => handleResultClick(result)}
              role="option"
              aria-selected={highlight === i}
            >
              <span className={styles.resultBook}>{result.bookTitle.replace(/\n.*/, '')}</span>
              <span className={styles.resultId}>#{result.id}</span>
              <span className={styles.resultText}>{result.text.slice(0, 60)}...</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
