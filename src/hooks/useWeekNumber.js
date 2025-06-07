// Custom React hooks for week number functionality
import { useState, useEffect, useCallback } from 'react';
import { getCurrentWeekInfo, getWeeksInYear, getDayOfYear, getYearInfo, getWeekNumberForDate } from '../utils/weekUtils';

/**
 * Hook for managing current week information with live updates
 */
export function useCurrentWeek(updateInterval = 60000) { // Update every minute
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekInfo());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeek(getCurrentWeekInfo());
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);
  
  return currentWeek;
}

/**
 * Hook for managing day of year information
 */
export function useDayOfYear(updateInterval = 60000) {
  const [dayInfo, setDayInfo] = useState(getDayOfYear());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDayInfo(getDayOfYear());
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);
  
  return dayInfo;
}

/**
 * Hook for managing weeks in year functionality
 */
export function useWeeksInYear() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [weeks, setWeeks] = useState([]);
  const [yearInfo, setYearInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const loadWeeksForYear = useCallback(async (year) => {
    setLoading(true);
    try {
      // Simulate async operation for large datasets
      const weeksData = getWeeksInYear(year);
      const yearData = getYearInfo(year);
      
      setWeeks(weeksData);
      setYearInfo(yearData);
    } catch (error) {
      console.error('Error loading weeks for year:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadWeeksForYear(selectedYear);
  }, [selectedYear, loadWeeksForYear]);
  
  const changeYear = useCallback((year) => {
    setSelectedYear(year);
  }, []);
  
  return {
    selectedYear,
    weeks,
    yearInfo,
    loading,
    changeYear
  };
}

/**
 * Hook for week number lookup functionality
 */
export function useWeekLookup() {
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const lookupWeek = useCallback(() => {
    if (!dateInput.trim()) {
      setError('Please enter a date');
      setResult(null);
      return;
    }
    
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setError('Invalid date format');
        setResult(null);
        return;
      }
      
      const weekInfo = getWeekNumberForDate(date);
      setResult(weekInfo);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  }, [dateInput]);
  
  return {
    dateInput,
    setDateInput,
    result,
    error,
    lookupWeek
  };
}

