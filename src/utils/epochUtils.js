// Utility functions for epoch time conversion
import { format, fromUnixTime, getUnixTime, parseISO, isValid } from 'date-fns';

/**
 * Convert epoch timestamp to human-readable date
 * @param {number|string} timestamp - Unix timestamp
 * @param {string} timestampFormat - 'seconds', 'milliseconds', or 'microseconds'
 * @param {string} outputFormat - Date format string
 * @returns {string} Formatted date string
 */
export function epochToDate(timestamp, timestampFormat = 'seconds', outputFormat = 'PPpp') {
  try {
    let epochSeconds;
    const num = Number(timestamp);
    
    if (isNaN(num)) {
      throw new Error('Invalid timestamp');
    }
    
    switch (timestampFormat) {
      case 'seconds':
        epochSeconds = num;
        break;
      case 'milliseconds':
        epochSeconds = num / 1000;
        break;
      case 'microseconds':
        epochSeconds = num / 1000000;
        break;
      default:
        // Auto-detect based on length
        const str = num.toString();
        if (str.length === 10) {
          epochSeconds = num;
        } else if (str.length === 13) {
          epochSeconds = num / 1000;
        } else if (str.length === 16) {
          epochSeconds = num / 1000000;
        } else {
          epochSeconds = num;
        }
    }
    
    const date = fromUnixTime(epochSeconds);
    return format(date, outputFormat);
  } catch (error) {
    throw new Error(`Failed to convert epoch to date: ${error.message}`);
  }
}

/**
 * Convert human-readable date to epoch timestamp
 * @param {Date|string} date - Date object or date string
 * @param {string} outputFormat - 'seconds', 'milliseconds', or 'microseconds'
 * @returns {number} Unix timestamp
 */
export function dateToEpoch(date, outputFormat = 'seconds') {
  try {
    let dateObj;
    
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      // Try parsing ISO string first
      dateObj = parseISO(date);
      if (!isValid(dateObj)) {
        // Fallback to Date constructor
        dateObj = new Date(date);
      }
    } else {
      throw new Error('Invalid date input');
    }
    
    if (!isValid(dateObj)) {
      throw new Error('Invalid date');
    }
    
    const epochSeconds = getUnixTime(dateObj);
    
    switch (outputFormat) {
      case 'seconds':
        return epochSeconds;
      case 'milliseconds':
        return epochSeconds * 1000;
      case 'microseconds':
        return epochSeconds * 1000000;
      default:
        return epochSeconds;
    }
  } catch (error) {
    throw new Error(`Failed to convert date to epoch: ${error.message}`);
  }
}

/**
 * Get current epoch timestamp
 * @param {string} format - 'seconds', 'milliseconds', or 'microseconds'
 * @returns {number} Current Unix timestamp
 */
export function getCurrentEpoch(format = 'seconds') {
  const now = new Date();
  return dateToEpoch(now, format);
}

/**
 * Parse natural language date string
 * @param {string} dateString - Natural language date
 * @returns {Date} Parsed date object
 */
export function parseStringDate(dateString) {
  try {
    // Try various parsing methods
    let date = parseISO(dateString);
    if (isValid(date)) return date;
    
    date = new Date(dateString);
    if (isValid(date)) return date;
    
    throw new Error('Unable to parse date string');
  } catch (error) {
    throw new Error(`Failed to parse date string: ${error.message}`);
  }
}

/**
 * Convert seconds to human-readable time units
 * @param {number} seconds - Number of seconds
 * @returns {object} Object with days, hours, minutes, seconds
 */
export function convertTimeUnits(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return {
    days,
    hours,
    minutes,
    seconds: remainingSeconds,
    formatted: `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`
  };
}

/**
 * Get epoch timestamps for start and end of periods
 * @param {Date} date - Reference date
 * @returns {object} Object with start/end timestamps for various periods
 */
export function getEpochDates(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  return {
    startOfDay: getUnixTime(new Date(year, month, day, 0, 0, 0)),
    endOfDay: getUnixTime(new Date(year, month, day, 23, 59, 59)),
    startOfMonth: getUnixTime(new Date(year, month, 1, 0, 0, 0)),
    endOfMonth: getUnixTime(new Date(year, month + 1, 0, 23, 59, 59)),
    startOfYear: getUnixTime(new Date(year, 0, 1, 0, 0, 0)),
    endOfYear: getUnixTime(new Date(year, 11, 31, 23, 59, 59))
  };
}

/**
 * Validate timestamp format
 * @param {string|number} timestamp - Timestamp to validate
 * @returns {object} Validation result with detected format
 */
export function validateTimestamp(timestamp) {
  const num = Number(timestamp);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Not a valid number' };
  }
  
  const str = num.toString();
  let detectedFormat = 'unknown';
  
  if (str.length === 10) {
    detectedFormat = 'seconds';
  } else if (str.length === 13) {
    detectedFormat = 'milliseconds';
  } else if (str.length === 16) {
    detectedFormat = 'microseconds';
  }
  
  // Check if the timestamp is reasonable (between 1970 and 2100)
  const epochSeconds = detectedFormat === 'seconds' ? num : 
                      detectedFormat === 'milliseconds' ? num / 1000 :
                      detectedFormat === 'microseconds' ? num / 1000000 : num;
  
  const minEpoch = 0; // 1970-01-01
  const maxEpoch = 4102444800; // 2100-01-01
  
  if (epochSeconds < minEpoch || epochSeconds > maxEpoch) {
    return { 
      valid: false, 
      error: 'Timestamp out of reasonable range (1970-2100)',
      detectedFormat 
    };
  }
  
  return { 
    valid: true, 
    detectedFormat,
    epochSeconds 
  };
}

