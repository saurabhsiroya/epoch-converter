// Week number utility functions following ISO-8601 standard
import { format, startOfWeek, endOfWeek, getWeek, getYear, startOfYear, endOfYear, addWeeks, differenceInDays, isLeapYear as isLeapYearFns, addDays, getISOWeek, getISOWeekYear as getISOWeekYearFns } from 'date-fns';

/**
 * Get current ISO week number and related information
 * @returns {object} Current week information
 */
export function getCurrentWeekInfo() {
  const now = new Date();
  const weekNumber = getISOWeek(now);
  const isoYear = getISOWeekYearFns(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  
  return {
    weekNumber,
    year: isoYear,
    weekStart,
    weekEnd,
    weekStartFormatted: format(weekStart, 'EEEE, MMMM d, yyyy'),
    weekEndFormatted: format(weekEnd, 'EEEE, MMMM d, yyyy'),
    dateRange: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
  };
}

/**
 * Get date range for a specific week in a year
 * @param {number} year - ISO week-numbering year
 * @param {number} weekNumber - ISO week number
 * @returns {object} Week date range information
 */
export function getWeekDateRange(year, weekNumber) {
  // Get January 4th of the given year (always in week 1)
  const jan4 = new Date(year, 0, 4);
  // Find the Monday of week 1
  const week1Start = startOfWeek(jan4, { weekStartsOn: 1 });
  
  // Calculate the start of the requested week
  const weekStart = addWeeks(week1Start, weekNumber - 1);
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
  
  return {
    weekNumber,
    year,
    weekStart,
    weekEnd,
    weekStartFormatted: format(weekStart, 'EEEE, MMMM d, yyyy'),
    weekEndFormatted: format(weekEnd, 'EEEE, MMMM d, yyyy'),
    dateRange: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
  };
}

/**
 * Get all weeks in a year with their date ranges
 * @param {number} year - Year to get weeks for
 * @returns {array} Array of week objects
 */
export function getWeeksInYear(year) {
  const weeks = [];
  const totalWeeks = getWeeksInYearCount(year);
  
  for (let weekNum = 1; weekNum <= totalWeeks; weekNum++) {
    weeks.push(getWeekDateRange(year, weekNum));
  }
  
  return weeks;
}

/**
 * Get the number of weeks in a year (52 or 53)
 * @param {number} year - Year
 * @returns {number} Number of weeks in the year
 */
export function getWeeksInYearCount(year) {
  // A year has 53 weeks if January 1st is a Thursday or if it's a leap year and January 1st is a Wednesday
  const jan1 = new Date(year, 0, 1);
  const jan1Day = jan1.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Convert to ISO day (1 = Monday, 7 = Sunday)
  const jan1ISODay = jan1Day === 0 ? 7 : jan1Day;
  
  const isLeap = isLeapYearFns(jan1);
  
  // Year has 53 weeks if:
  // - January 1st is a Thursday (ISO day 4), OR
  // - It's a leap year and January 1st is a Wednesday (ISO day 3)
  if (jan1ISODay === 4 || (isLeap && jan1ISODay === 3)) {
    return 53;
  }
  
  return 52;
}

/**
 * Get current day of year
 * @param {Date} date - Date to calculate (defaults to today)
 * @returns {object} Day of year information
 */
export function getDayOfYear(date = new Date()) {
  const yearStart = startOfYear(date);
  const dayNumber = differenceInDays(date, yearStart) + 1;
  const totalDays = isLeapYearFns(date) ? 366 : 365;
  
  return {
    dayNumber,
    totalDays,
    formatted: `Day ${dayNumber} of ${totalDays}`,
    percentage: Math.round((dayNumber / totalDays) * 100)
  };
}

/**
 * Get comprehensive year information
 * @param {number} year - Year to analyze
 * @returns {object} Year information
 */
export function getYearInfo(year) {
  const isLeap = isLeapYearFns(new Date(year, 0, 1));
  const totalDays = isLeap ? 366 : 365;
  const totalWeeks = getWeeksInYearCount(year);
  
  return {
    year,
    isLeapYear: isLeap,
    totalDays,
    totalWeeks,
    yearStart: startOfYear(new Date(year, 0, 1)),
    yearEnd: endOfYear(new Date(year, 0, 1))
  };
}

/**
 * Get week number for a specific date
 * @param {Date} date - Date to get week number for
 * @returns {object} Week information for the date
 */
export function getWeekNumberForDate(date) {
  const weekNumber = getISOWeek(date);
  const isoYear = getISOWeekYearFns(date);
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  
  return {
    date,
    weekNumber,
    year: isoYear,
    weekStart,
    weekEnd,
    dateRange: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
  };
}

/**
 * Convert week number to epoch timestamps
 * @param {number} year - Year
 * @param {number} weekNumber - Week number
 * @returns {object} Epoch timestamps for week start and end
 */
export function weekToEpoch(year, weekNumber) {
  const weekInfo = getWeekDateRange(year, weekNumber);
  
  return {
    weekNumber,
    year,
    startEpoch: Math.floor(weekInfo.weekStart.getTime() / 1000),
    endEpoch: Math.floor(weekInfo.weekEnd.getTime() / 1000),
    startEpochMs: weekInfo.weekStart.getTime(),
    endEpochMs: weekInfo.weekEnd.getTime()
  };
}

/**
 * Get week number from epoch timestamp
 * @param {number} epochTimestamp - Unix timestamp
 * @returns {object} Week information for the timestamp
 */
export function epochToWeek(epochTimestamp) {
  const date = new Date(epochTimestamp * 1000);
  return getWeekNumberForDate(date);
}

