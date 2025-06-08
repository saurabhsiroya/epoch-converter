import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Unix timestamp and epoch time?",
    answer: "Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It's a standard way to represent time in computer systems and programming. This date is known as the Unix epoch and serves as a universal reference point for time calculations across different systems and programming languages."
  },
  {
    question: "How do I convert Unix timestamp to human readable date?",
    answer: "Use our timestamp converter tool above. Simply enter your Unix timestamp (in seconds or milliseconds) and click convert. The tool automatically detects whether your timestamp is in seconds (10 digits) or milliseconds (13 digits) format and shows you the date in multiple formats including local time, UTC, ISO format, and relative time."
  },
  {
    question: "What's the difference between seconds and milliseconds timestamp?",
    answer: "Unix timestamps can be in seconds (typically 10 digits like 1672531200) or milliseconds (typically 13 digits like 1672531200000). Seconds format counts seconds since epoch and is commonly used in Unix systems and databases. Milliseconds format is more precise and includes milliseconds, often used in JavaScript and modern APIs. Our tool automatically detects and handles both formats."
  },
  {
    question: "How do I get the current Unix timestamp?",
    answer: "The current Unix timestamp is displayed at the top of this page and updates every second in real-time. You can copy it directly by clicking the copy button, or use the preset buttons in our converters to insert the current timestamp. In programming: JavaScript uses Date.now()/1000, Python uses time.time(), PHP uses time(), and most databases have NOW() functions."
  },
  {
    question: "Can I convert dates to Unix timestamps?",
    answer: "Yes! Use our Date to Unix Timestamp converter. Enter any date and optionally a time, select your timezone (local or UTC), and get the corresponding Unix timestamp in both seconds and milliseconds. The tool supports various date formats and provides comprehensive output including ISO format and UTC string."
  },
  {
    question: "What is the batch converter used for?",
    answer: "The batch converter allows you to convert multiple timestamps or dates at once, saving time when processing large datasets. Simply paste your data (one timestamp or date per line) and convert them all simultaneously. You can switch between timestamp-to-date and date-to-timestamp modes, and download the results as a CSV file for further analysis or import into other tools."
  },
  {
    question: "Why do developers use Unix timestamps?",
    answer: "Unix timestamps are timezone-independent, making them perfect for global applications. They're easy to store in databases as integers, simple to compare and sort chronologically, universally supported across programming languages, and efficient for calculations. They eliminate timezone confusion in distributed systems and APIs, making them the standard for backend systems, databases, and API communications."
  },
  {
    question: "What timezone is used for conversions?",
    answer: "By default, conversions display in your local timezone as detected by your browser. For the date-to-timestamp converter, you can explicitly choose between local time and UTC. The timezone converter shows the same timestamp across multiple popular timezones simultaneously. All timestamps are internally stored as UTC and converted for display purposes."
  },
  {
    question: "Can I convert very old or future dates?",
    answer: "Yes! Our converter supports a wide range of dates, from historical dates (before 1970, which result in negative timestamps) to far future dates. However, be aware that some systems have limitations: 32-bit systems face the Year 2038 problem, and extremely old dates may have calendar system differences. JavaScript safely handles dates from 1970 to approximately 275,760 years in the future."
  },
  {
    question: "What programming languages work with Unix timestamps?",
    answer: "Virtually all modern programming languages support Unix timestamps: JavaScript (Date.now(), new Date()), Python (time.time(), datetime), PHP (time(), date()), Java (System.currentTimeMillis()), C# (DateTimeOffset.ToUnixTimeSeconds()), Go (time.Now().Unix()), Ruby (Time.now.to_i), and many more. Each language provides built-in functions for timestamp conversion and manipulation."
  },
  {
    question: "How do I handle milliseconds vs seconds in my code?",
    answer: "Most Unix systems use seconds, but JavaScript and some APIs use milliseconds. To convert: seconds to milliseconds (multiply by 1000), milliseconds to seconds (divide by 1000). Our tool automatically detects the format based on digit count. In code, always check your API documentation to confirm the expected format and convert accordingly."
  },
  {
    question: "What's the difference between Unix time and ISO 8601?",
    answer: "Unix timestamp is a single number representing seconds since epoch (e.g., 1672531200), while ISO 8601 is a human-readable string format (e.g., 2023-01-01T00:00:00Z). Unix timestamps are better for storage and calculations, while ISO 8601 is better for human readability and data exchange. Both represent the same moment in time but serve different purposes."
  },
  {
    question: "How do I debug timestamp issues in my application?",
    answer: "Common timestamp issues include timezone confusion, seconds vs milliseconds mismatches, and daylight saving time problems. Use our converter to verify your timestamps, check if your timestamps are in the expected format (seconds/milliseconds), ensure consistent timezone handling throughout your application, and always store timestamps in UTC when possible."
  },
  {
    question: "Is this epoch converter free to use?",
    answer: "Yes, this Unix timestamp converter is completely free to use with no limitations. No registration required, no limits on conversions, all features available at no cost, works offline after initial load, and no ads or premium features. We built this tool for the developer community and it will always remain free and open for everyone."
  },
  {
    question: "Can I use this tool for database timestamp conversion?",
    answer: "Absolutely! This tool is perfect for database work. Many databases store timestamps as Unix timestamps (integers) for efficiency. Use our converter to verify database timestamps, convert between different timestamp formats before database insertion, debug timestamp-related queries, and validate data migration results. Supports all major database timestamp formats."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Open first item by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Frequently Asked Questions About Unix Timestamps
      </h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-white pr-4">{item.question}</h3>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Professional Unix Timestamp Conversion Tool</h3>
        <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
          Our comprehensive epoch time converter supports all common use cases including current timestamp generation, 
          historical date conversion, timezone handling, batch processing, and multiple output formats. Perfect for developers, 
          data analysts, system administrators, DevOps engineers, and anyone working with time-based data across different 
          systems, databases, and programming languages. Built by developers, for developers.
        </p>
      </div>
    </section>
  );
};

export default FAQ;