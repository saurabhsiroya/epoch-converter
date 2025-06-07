// Programming language examples data
export const programmingExamples = {
  javascript: {
    name: 'JavaScript',
    getCurrentEpoch: `Math.floor(new Date().getTime() / 1000)`,
    dateToEpoch: `Math.floor(new Date('2024-01-01').getTime() / 1000)`,
    epochToDate: `new Date(1704067200 * 1000).toISOString()`
  },
  python: {
    name: 'Python',
    getCurrentEpoch: `import time; time.time()`,
    dateToEpoch: `import calendar, time; calendar.timegm(time.strptime('2024-01-01 00:00:00', '%Y-%m-%d %H:%M:%S'))`,
    epochToDate: `import time; time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(1704067200))`
  },
  php: {
    name: 'PHP',
    getCurrentEpoch: `time()`,
    dateToEpoch: `strtotime("2024-01-01 00:00:00")`,
    epochToDate: `date('Y-m-d H:i:s', 1704067200)`
  },
  java: {
    name: 'Java',
    getCurrentEpoch: `long epoch = System.currentTimeMillis() / 1000;`,
    dateToEpoch: `new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse("2024-01-01 00:00:00").getTime() / 1000`,
    epochToDate: `new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(1704067200L * 1000))`
  },
  csharp: {
    name: 'C#',
    getCurrentEpoch: `DateTimeOffset.Now.ToUnixTimeSeconds()`,
    dateToEpoch: `new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero).ToUnixTimeSeconds()`,
    epochToDate: `DateTimeOffset.FromUnixTimeSeconds(1704067200).ToString("yyyy-MM-dd HH:mm:ss")`
  },
  ruby: {
    name: 'Ruby',
    getCurrentEpoch: `Time.now.to_i`,
    dateToEpoch: `Time.parse("2024-01-01 00:00:00").to_i`,
    epochToDate: `Time.at(1704067200).strftime("%Y-%m-%d %H:%M:%S")`
  },
  go: {
    name: 'Go',
    getCurrentEpoch: `time.Now().Unix()`,
    dateToEpoch: `time.Parse("2006-01-02 15:04:05", "2024-01-01 00:00:00").Unix()`,
    epochToDate: `time.Unix(1704067200, 0).Format("2006-01-02 15:04:05")`
  },
  rust: {
    name: 'Rust',
    getCurrentEpoch: `SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()`,
    dateToEpoch: `// Use chrono crate for date parsing`,
    epochToDate: `// Use chrono crate: DateTime::from_timestamp(1704067200, 0)`
  },
  perl: {
    name: 'Perl',
    getCurrentEpoch: `time`,
    dateToEpoch: `use Time::Local; timelocal(0, 0, 0, 1, 0, 2024)`,
    epochToDate: `scalar localtime(1704067200)`
  },
  mysql: {
    name: 'MySQL',
    getCurrentEpoch: `SELECT UNIX_TIMESTAMP(NOW())`,
    dateToEpoch: `SELECT UNIX_TIMESTAMP('2024-01-01 00:00:00')`,
    epochToDate: `SELECT FROM_UNIXTIME(1704067200)`
  },
  postgresql: {
    name: 'PostgreSQL',
    getCurrentEpoch: `SELECT EXTRACT(EPOCH FROM NOW())`,
    dateToEpoch: `SELECT EXTRACT(EPOCH FROM TIMESTAMP '2024-01-01 00:00:00')`,
    epochToDate: `SELECT TO_TIMESTAMP(1704067200)`
  },
  shell: {
    name: 'Unix/Linux Shell',
    getCurrentEpoch: `date +%s`,
    dateToEpoch: `date +%s -d "2024-01-01 00:00:00"`,
    epochToDate: `date -d @1704067200`
  }
};

// Time conversion reference data
export const timeConversions = [
  { unit: '1 second', seconds: 1 },
  { unit: '1 minute', seconds: 60 },
  { unit: '1 hour', seconds: 3600 },
  { unit: '1 day', seconds: 86400 },
  { unit: '1 week', seconds: 604800 },
  { unit: '1 month (30.44 days)', seconds: 2629743 },
  { unit: '1 year (365.24 days)', seconds: 31556926 }
];

// Educational content about Unix epoch
export const epochInfo = {
  definition: "The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).",
  y2038Problem: "Some systems store epoch dates as a signed 32-bit integer, which might cause problems on January 19, 2038 (known as the Year 2038 problem or Y2038). The maximum value for a signed 32-bit integer is 2,147,483,647, which corresponds to 03:14:07 UTC on 19 January 2038.",
  limitations: [
    "JavaScript does not support leap seconds",
    "Some browsers use current DST rules for all dates in history",
    "The converter relies on the user's computer date and time settings"
  ]
};

