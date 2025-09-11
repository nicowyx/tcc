import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useBodyTheme = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? '' : 'light';
  }, [isDarkMode]);
};