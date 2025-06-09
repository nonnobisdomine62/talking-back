import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    const theme = window.localStorage.getItem('theme');
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    }
  }, []);
  return null;
}
