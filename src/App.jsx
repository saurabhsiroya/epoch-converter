import React from 'react';
import { Clock, Calendar, Code, Sun, Moon, Copy, Check, CalendarDays, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCurrentEpoch, useEpochToDate, useDateToEpoch, useTheme } from './hooks/useEpochConverter';
import { useCurrentWeek, useDayOfYear, useWeeksInYear, useWeekLookup } from './hooks/useWeekNumber';
import { convertTimeUnits, getEpochDates } from './utils/epochUtils';
import { programmingExamples, timeConversions, epochInfo } from './data/programmingExamples';
import { weekNumberExamples, weekInfo } from './data/weekExamples';
import './App.css';

function App() {
  const currentEpoch = useCurrentEpoch();
  const { isDark, toggleTheme } = useTheme();
  const epochToDateHook = useEpochToDate();
  const dateToEpochHook = useDateToEpoch();
  const currentWeek = useCurrentWeek();
  const dayOfYear = useDayOfYear();
  const { selectedYear, weeks, yearInfo, loading, changeYear } = useWeeksInYear();
  const weekLookup = useWeekLookup();
  const [copiedCode, setCopiedCode] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState('javascript');
  const [selectedWeekLanguage, setSelectedWeekLanguage] = React.useState('javascript');

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentDate = new Date();
  const epochDates = getEpochDates(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Epoch Converter</h1>
                <p className="text-sm text-muted-foreground">Unix Timestamp & Week Number Converter</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Unix Epoch</p>
                <p className="text-lg font-mono font-bold">{currentEpoch}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Time Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Week */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5" />
                <span>Current Week</span>
              </CardTitle>
              <CardDescription>ISO week number and date range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Week {currentWeek.weekNumber}</div>
                <div className="text-sm text-muted-foreground">of {currentWeek.year}</div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{currentWeek.dateRange}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentWeek.weekStartFormatted} to {currentWeek.weekEndFormatted}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Day of Year */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hash className="h-5 w-5" />
                <span>Day of Year</span>
              </CardTitle>
              <CardDescription>Current day number in the year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{dayOfYear.dayNumber}</div>
                <div className="text-sm text-muted-foreground">of {dayOfYear.totalDays} days</div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${dayOfYear.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {dayOfYear.percentage}% of the year completed
              </p>
            </CardContent>
          </Card>

          {/* Year Information */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Year {currentWeek.year}</span>
              </CardTitle>
              <CardDescription>Year statistics and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Days</span>
                <Badge variant="secondary">{dayOfYear.totalDays}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Weeks</span>
                <Badge variant="secondary">{yearInfo?.totalWeeks || 52}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Leap Year</span>
                <Badge variant={yearInfo?.isLeapYear ? "default" : "outline"}>
                  {yearInfo?.isLeapYear ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Converters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Epoch to Date */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Epoch to Human Date</span>
              </CardTitle>
              <CardDescription>
                Convert Unix timestamp to human-readable date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Input
                    placeholder="Enter timestamp (e.g., 1704067200)"
                    value={epochToDateHook.input}
                    onChange={(e) => epochToDateHook.setInput(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports: 10-digit (seconds), 13-digit (milliseconds), 16-digit (microseconds)
                  </p>
                </div>
                <Select value={epochToDateHook.format} onValueChange={epochToDateHook.setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="seconds">Seconds (10 digits)</SelectItem>
                    <SelectItem value="milliseconds">Milliseconds (13 digits)</SelectItem>
                    <SelectItem value="microseconds">Microseconds (16 digits)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={epochToDateHook.convert} className="w-full">
                Convert to Date
              </Button>
              {epochToDateHook.error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{epochToDateHook.error}</p>
                </div>
              )}
              {epochToDateHook.result && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="font-mono text-sm">{epochToDateHook.result}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date to Epoch */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Date to Epoch</span>
              </CardTitle>
              <CardDescription>
                Convert human-readable date to Unix timestamp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Input
                    placeholder="Enter date (e.g., 2024-01-01 or Jan 1, 2024)"
                    value={dateToEpochHook.dateInput}
                    onChange={(e) => dateToEpochHook.setDateInput(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formats: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, Jan 1 2024, January 1, 2024
                  </p>
                </div>
                <Select value={dateToEpochHook.outputFormat} onValueChange={dateToEpochHook.setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="milliseconds">Milliseconds</SelectItem>
                    <SelectItem value="microseconds">Microseconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={dateToEpochHook.convert} className="w-full">
                Convert to Epoch
              </Button>
              {dateToEpochHook.error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{dateToEpochHook.error}</p>
                </div>
              )}
              {dateToEpochHook.result && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="font-mono text-sm">{dateToEpochHook.result}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Week Number Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Week Lookup */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5" />
                <span>Date to Week Number</span>
              </CardTitle>
              <CardDescription>
                Find the ISO week number for any date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Input
                  placeholder="Enter date (e.g., 2024-06-07)"
                  value={weekLookup.dateInput}
                  onChange={(e) => weekLookup.setDateInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Formats: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY, Jan 1 2024, January 1, 2024
                </p>
              </div>
              <Button onClick={weekLookup.lookupWeek} className="w-full">
                Get Week Number
              </Button>
              {weekLookup.error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{weekLookup.error}</p>
                </div>
              )}
              {weekLookup.result && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm font-medium">Week {weekLookup.result.weekNumber} of {weekLookup.result.year}</p>
                  <p className="text-xs text-muted-foreground mt-1">{weekLookup.result.dateRange}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weeks in Year */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Weeks in Year</span>
              </CardTitle>
              <CardDescription>
                View all ISO weeks for a specific year
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedYear.toString()} onValueChange={(value) => changeYear(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => {
                    const year = new Date().getFullYear() - 5 + i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
              {yearInfo && (
                <div className="text-sm space-y-1">
                  <p><strong>{yearInfo.totalWeeks} weeks</strong> in {selectedYear}</p>
                  <p className="text-muted-foreground">
                    {yearInfo.isLeapYear ? 'Leap year' : 'Regular year'} • {yearInfo.totalDays} days
                  </p>
                </div>
              )}

              <ScrollArea className="h-64 w-full border rounded-md p-2">
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading weeks...</p>
                ) : (
                  <div className="space-y-1">
                    {weeks.map((week) => (
                      <div key={week.weekNumber} className="flex justify-between items-center text-xs py-1 border-b border-border/30 last:border-0">
                        <span className="font-medium">Week {week.weekNumber}</span>
                        <span className="text-muted-foreground">{week.dateRange}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Time Reference and Epoch Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Conversions */}
          <Card>
            <CardHeader>
              <CardTitle>Time Reference</CardTitle>
              <CardDescription>Common time intervals in seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeConversions.map((conversion, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm">{conversion.unit}</span>
                    <Badge variant="secondary" className="font-mono">
                      {conversion.seconds.toLocaleString()} sec
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Epoch Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Epoch Dates for Today</CardTitle>
              <CardDescription>Start and end timestamps for current periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm">Start of Day</span>
                  <Badge variant="outline" className="font-mono">{epochDates.startOfDay}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm">End of Day</span>
                  <Badge variant="outline" className="font-mono">{epochDates.endOfDay}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm">Start of Month</span>
                  <Badge variant="outline" className="font-mono">{epochDates.startOfMonth}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm">End of Month</span>
                  <Badge variant="outline" className="font-mono">{epochDates.endOfMonth}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm">Start of Year</span>
                  <Badge variant="outline" className="font-mono">{epochDates.startOfYear}</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">End of Year</span>
                  <Badge variant="outline" className="font-mono">{epochDates.endOfYear}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programming Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Programming Examples</span>
            </CardTitle>
            <CardDescription>
              Code snippets for working with epoch time and week numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="epoch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="epoch">Epoch Time</TabsTrigger>
                <TabsTrigger value="weeks">Week Numbers</TabsTrigger>
              </TabsList>
              
              {/* Epoch Examples */}
              <TabsContent value="epoch" className="space-y-4">
                <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-6 mb-6">
                    {Object.entries(programmingExamples).slice(0, 6).map(([key, lang]) => (
                      <TabsTrigger key={key} value={key} className="text-xs">
                        {lang.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(programmingExamples).map(([key, lang]) => (
                    <TabsContent key={key} value={key} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Get Current Epoch */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Get Current Epoch</h4>
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              <code>{lang.getCurrentEpoch}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard(lang.getCurrentEpoch, `${key}-current`)}
                            >
                              {copiedCode === `${key}-current` ? 
                                <Check className="h-3 w-3" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>

                        {/* Date to Epoch */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Date to Epoch</h4>
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              <code>{lang.dateToEpoch}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard(lang.dateToEpoch, `${key}-date`)}
                            >
                              {copiedCode === `${key}-date` ? 
                                <Check className="h-3 w-3" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>

                        {/* Epoch to Date */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Epoch to Date</h4>
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              <code>{lang.epochToDate}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard(lang.epochToDate, `${key}-epoch`)}
                            >
                              {copiedCode === `${key}-epoch` ? 
                                <Check className="h-3 w-3" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>

              {/* Week Number Examples */}
              <TabsContent value="weeks" className="space-y-4">
                <Tabs value={selectedWeekLanguage} onValueChange={setSelectedWeekLanguage}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-6 mb-6">
                    {Object.entries(weekNumberExamples).slice(0, 6).map(([key, lang]) => (
                      <TabsTrigger key={key} value={key} className="text-xs">
                        {lang.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(weekNumberExamples).map(([key, lang]) => (
                    <TabsContent key={key} value={key} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Get Current Week */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Get Current Week</h4>
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              <code>{lang.getCurrentWeek}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard(lang.getCurrentWeek, `${key}-week-current`)}
                            >
                              {copiedCode === `${key}-week-current` ? 
                                <Check className="h-3 w-3" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>

                        {/* Get Week from Date */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Get Week from Date</h4>
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                              <code>{lang.getWeekFromDate}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => copyToClipboard(lang.getWeekFromDate, `${key}-week-date`)}
                            >
                              {copiedCode === `${key}-week-date` ? 
                                <Check className="h-3 w-3" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Educational Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unix Epoch Info */}
          <Card>
            <CardHeader>
              <CardTitle>What is Unix Epoch?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{epochInfo.definition}</p>
              
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <h4 className="font-semibold text-sm mb-2">Year 2038 Problem (Y2038)</h4>
                <p className="text-sm leading-relaxed">{epochInfo.y2038Problem}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Limitations</h4>
                <ul className="text-sm space-y-1">
                  {epochInfo.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Week Number Info */}
          <Card>
            <CardHeader>
              <CardTitle>ISO Week Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{weekInfo.isoStandard}</p>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                <h4 className="font-semibold text-sm mb-2">Week Definition</h4>
                <p className="text-sm leading-relaxed">{weekInfo.weekDefinition}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">First Week Rule</h4>
                <p className="text-sm leading-relaxed">{weekInfo.firstWeekRule}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Week Numbering</h4>
                <p className="text-sm leading-relaxed">{weekInfo.weekNumbering}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Built with React, Tailwind CSS, and shadcn/ui</p>
            <p className="mt-2">A modern epoch converter with week number functionality</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

