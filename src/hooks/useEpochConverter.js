// Custom React hooks for epoch converter functionality
import { useState, useEffect, useCallback } from 'react';
import { getCurrentEpoch, epochToDate, dateToEpoch, validateTimestamp } from '../utils/epochUtils';

/**
 * Hook for managing current epoch time with live updates
 */
export function useCurrentEpoch(updateInterval = 1000) {
  const [currentEpoch, setCurrentEpoch] = useState(getCurrentEpoch());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(getCurrentEpoch());
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);
  
  return currentEpoch;
}

/**
 * Hook for epoch to date conversion with validation
 */
export function useEpochToDate() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [format, setFormat] = useState('auto');
  
  const convert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter a timestamp');
      setResult('');
      return;
    }
    
    try {
      const validation = validateTimestamp(input);
      if (!validation.valid) {
        setError(validation.error);
        setResult('');
        return;
      }
      
      const formatToUse = format === 'auto' ? validation.detectedFormat : format;
      const converted = epochToDate(input, formatToUse, 'PPpp');
      setResult(converted);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  }, [input, format]);
  
  return {
    input,
    setInput,
    result,
    error,
    format,
    setFormat,
    convert
  };
}

/**
 * Hook for date to epoch conversion
 */
export function useDateToEpoch() {
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [outputFormat, setOutputFormat] = useState('seconds');
  
  const convert = useCallback(() => {
    if (!dateInput.trim()) {
      setError('Please enter a date');
      setResult('');
      return;
    }
    
    try {
      const converted = dateToEpoch(dateInput, outputFormat);
      setResult(converted.toString());
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  }, [dateInput, outputFormat]);
  
  return {
    dateInput,
    setDateInput,
    result,
    error,
    outputFormat,
    setOutputFormat,
    convert
  };
}

/**
 * Hook for managing theme (dark/light mode)
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);
  
  return { isDark, toggleTheme };
}

