import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import ThemeScript from '../components/ThemeScript';

const gothicTheme = {
  font: 'Gothic, serif',
  background: '#18141a',
  color: '#f8f6f2',
  accent: '#a8893c',
  border: '#3d2c44',
  card: '#23202b',
};

const lightTheme = {
  font: 'Gothic, serif',
  background: '#f8f6f2',
  color: '#1a161b',
  accent: '#a8893c',
  border: '#d6c7a1',
  card: '#fffdfa',
};

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark');

  // Hydrate theme from localStorage or system preference
  useEffect(() => {
    let stored = window.localStorage.getItem('theme');
    if (!stored) {
      stored = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    setTheme(stored);
    document.body.setAttribute('data-theme', stored);
  }, []);

  // Update <body> and localStorage on theme change
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const themeObj = theme === 'dark' ? gothicTheme : lightTheme;
  return (
    <ThemeProvider theme={themeObj}>
      <ThemeScript />
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </ThemeProvider>
  );
}
