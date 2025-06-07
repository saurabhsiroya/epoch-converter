// Programming language examples for week number calculations
export const weekNumberExamples = {
  excel: {
    name: 'Excel/LibreOffice Calc',
    getCurrentWeek: `=ISOWEEKNUM(TODAY())`,
    getWeekFromDate: `=ISOWEEKNUM(A1)`,
    alternativeFormula: `=WEEKNUM(TODAY(),21)`
  },
  googlesheets: {
    name: 'Google Sheets',
    getCurrentWeek: `=WEEKNUM(TODAY();21)`,
    getWeekFromDate: `=WEEKNUM(A1;21)`,
    isoWeekNum: `=ISOWEEKNUM(TODAY())`
  },
  javascript: {
    name: 'JavaScript',
    getCurrentWeek: `
// Using date-fns library
import { getWeek } from 'date-fns';
const weekNumber = getWeek(new Date(), { weekStartsOn: 1 });

// Native JavaScript (ISO week)
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}`,
    getWeekFromDate: `getISOWeek(new Date('2024-06-07'))`
  },
  python: {
    name: 'Python',
    getCurrentWeek: `
import datetime
# Get current ISO week number
current_week = datetime.date.today().isocalendar()[1]

# Alternative using strftime
import time
week_num = int(time.strftime("%V"))`,
    getWeekFromDate: `
date = datetime.date(2024, 6, 7)
week_number = date.isocalendar()[1]
year = date.isocalendar()[0]`
  },
  php: {
    name: 'PHP',
    getCurrentWeek: `
// Current ISO week number
$week = date("W");

// From specific date
$week = date("W", strtotime("2024-06-07"));

// Using DateTime class
$date = new DateTime();
$week = $date->format("W");`,
    getWeekFromDate: `
$date = new DateTime("2024-06-07");
$week = $date->format("W");
$year = $date->format("o"); // ISO year`
  },
  java: {
    name: 'Java',
    getCurrentWeek: `
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

// Current ISO week
LocalDate date = LocalDate.now();
WeekFields weekFields = WeekFields.of(Locale.getDefault());
int weekNumber = date.get(weekFields.weekOfWeekBasedYear());

// Alternative using Calendar (deprecated but still used)
Calendar cal = Calendar.getInstance();
int week = cal.get(Calendar.WEEK_OF_YEAR);`,
    getWeekFromDate: `
LocalDate date = LocalDate.of(2024, 6, 7);
int weekNumber = date.get(weekFields.weekOfWeekBasedYear());`
  },
  csharp: {
    name: 'C#',
    getCurrentWeek: `
using System;
using System.Globalization;

// Current ISO week number
DateTime date = DateTime.Now;
Calendar cal = CultureInfo.InvariantCulture.Calendar;
int week = cal.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

// Using ISOWeek class (.NET Core 3.0+)
int isoWeek = ISOWeek.GetWeekOfYear(DateTime.Now);`,
    getWeekFromDate: `
DateTime date = new DateTime(2024, 6, 7);
int week = ISOWeek.GetWeekOfYear(date);`
  },
  perl: {
    name: 'Perl',
    getCurrentWeek: `
use POSIX qw(strftime);
# Current ISO week number
my $week = strftime("%V", gmtime time);

# From specific date
use Time::Local;
my $time = timelocal(0, 0, 0, 7, 5, 2024); # June 7, 2024
my $week = strftime("%V", gmtime $time);`,
    getWeekFromDate: `
use Date::Calc qw(Week_of_Year);
my ($week, $year) = Week_of_Year(2024, 6, 7);`
  },
  shell: {
    name: 'Unix/Linux Shell',
    getCurrentWeek: `
# Current ISO week number
date +%V

# From specific date
date -d "2024-06-07" +%V

# Get week and year
date +"%V %G"`,
    getWeekFromDate: `
# Week number for specific date
date -d "June 7, 2024" +%V

# ISO week-numbering year
date -d "2024-06-07" +%G`
  },
  powershell: {
    name: 'PowerShell',
    getCurrentWeek: `
# Current ISO week number
Get-Date -UFormat %V

# From specific date
Get-Date "2024-06-07" -UFormat %V

# Using .NET methods
[System.Globalization.ISOWeek]::GetWeekOfYear((Get-Date))`,
    getWeekFromDate: `
$date = Get-Date "2024-06-07"
[System.Globalization.ISOWeek]::GetWeekOfYear($date)`
  },
  lua: {
    name: 'Lua',
    getCurrentWeek: `
-- Current ISO week number
local week = os.date("%V")

-- From timestamp
local timestamp = os.time({year=2024, month=6, day=7})
local week = os.date("%V", timestamp)`,
    getWeekFromDate: `
local date = {year=2024, month=6, day=7}
local timestamp = os.time(date)
local week = os.date("%V", timestamp)`
  },
  ruby: {
    name: 'Ruby',
    getCurrentWeek: `
# Current ISO week number
require 'date'
week = Date.today.cweek

# Alternative using strftime
week = Time.now.strftime("%V").to_i`,
    getWeekFromDate: `
date = Date.new(2024, 6, 7)
week = date.cweek
year = date.cwyear # ISO week-numbering year`
  },
  go: {
    name: 'Go',
    getCurrentWeek: `
package main

import (
    "fmt"
    "time"
)

func getISOWeek(t time.Time) (int, int) {
    year, week := t.ISOWeek()
    return year, week
}

func main() {
    year, week := time.Now().ISOWeek()
    fmt.Printf("Week %d of year %d\\n", week, year)
}`,
    getWeekFromDate: `
date := time.Date(2024, 6, 7, 0, 0, 0, 0, time.UTC)
year, week := date.ISOWeek()`
  }
};

// Additional week-related reference data
export const weekInfo = {
  isoStandard: "ISO-8601 standard: Weeks start on Monday, and the first week of the year is the one that contains the first Thursday of the year.",
  weekDefinition: "A week is defined as a seven-day period starting on Monday and ending on Sunday.",
  firstWeekRule: "The first week of the year is the week that contains January 4th, or equivalently, the week that contains the first Thursday of January.",
  weekNumbering: "Week numbers range from 1 to 52 or 53, depending on the year. Years with 53 weeks occur when January 1st falls on a Thursday, or when it's a leap year and January 1st falls on a Wednesday."
};

