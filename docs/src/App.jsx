import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Code, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  Zap,
  Key,
  Globe,
  Clock,
  Calendar,
  Database,
  ArrowRight,
  Play
} from 'lucide-react'
import './App.css'

const API_BASE_URL = 'https://4nghki1c630w.manus.space'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const testEndpoint = async (endpoint, method = 'GET', body = null) => {
    if (!apiKey) {
      setTestResult({ error: 'Please enter an API key first' })
      return
    }

    setLoading(true)
    setTestResult(null)

    try {
      const options = {
        method,
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
      const data = await response.json()
      
      setTestResult({
        status: response.status,
        data: data,
        success: response.ok
      })
    } catch (err) {
      setTestResult({
        error: 'Network error: ' + err.message,
        success: false
      })
    } finally {
      setLoading(false)
    }
  }

  const endpoints = [
    {
      category: 'Authentication',
      items: [
        {
          method: 'POST',
          path: '/api/auth/create-key',
          description: 'Create a new API key',
          params: [
            { name: 'email', type: 'string', required: true, description: 'Your email address' },
            { name: 'plan', type: 'string', required: true, description: 'starter, professional, or enterprise' }
          ],
          example: {
            request: {
              email: 'user@example.com',
              plan: 'starter'
            },
            response: {
              api_key: 'your-api-key-here',
              plan: 'starter',
              rate_limit: 1000,
              created_at: '2025-06-08T08:00:00Z'
            }
          }
        },
        {
          method: 'GET',
          path: '/api/auth/verify',
          description: 'Verify API key and get account info',
          headers: [
            { name: 'X-API-Key', required: true, description: 'Your API key' }
          ],
          example: {
            response: {
              valid: true,
              plan: 'starter',
              rate_limit: 1000,
              usage_this_month: 45
            }
          }
        }
      ]
    },
    {
      category: 'Conversion',
      items: [
        {
          method: 'GET',
          path: '/api/convert/epoch-to-date',
          description: 'Convert epoch timestamp to human-readable date',
          params: [
            { name: 'timestamp', type: 'integer', required: true, description: 'Unix timestamp' },
            { name: 'format', type: 'string', required: false, description: 'Output format (iso, rfc, custom)' },
            { name: 'timezone', type: 'string', required: false, description: 'Target timezone (default: UTC)' }
          ],
          example: {
            request: '?timestamp=1749364663&format=iso&timezone=America/New_York',
            response: {
              timestamp: 1749364663,
              date: '2025-06-08T04:37:43-04:00',
              iso_week: 23,
              day_of_year: 159,
              timezone: 'America/New_York',
              formatted: '2025-06-08 04:37:43 EDT'
            }
          },
          testable: true,
          testEndpoint: '/api/convert/epoch-to-date?timestamp=1749364663&format=iso'
        },
        {
          method: 'GET',
          path: '/api/convert/date-to-epoch',
          description: 'Convert date to Unix timestamp',
          params: [
            { name: 'date', type: 'string', required: true, description: 'Date in ISO format' },
            { name: 'timezone', type: 'string', required: false, description: 'Source timezone (default: UTC)' }
          ],
          example: {
            request: '?date=2025-06-08T08:37:43&timezone=UTC',
            response: {
              date: '2025-06-08T08:37:43+00:00',
              timestamp: 1749364663,
              iso_week: 23,
              day_of_year: 159,
              timezone: 'UTC'
            }
          },
          testable: true,
          testEndpoint: '/api/convert/date-to-epoch?date=2025-06-08T08:37:43'
        },
        {
          method: 'POST',
          path: '/api/convert/batch',
          description: 'Convert multiple timestamps or dates in one request',
          params: [
            { name: 'items', type: 'array', required: true, description: 'Array of timestamps or dates to convert' },
            { name: 'input_type', type: 'string', required: true, description: 'epoch or date' },
            { name: 'output_format', type: 'string', required: false, description: 'Output format' }
          ],
          example: {
            request: {
              items: [1749364663, 1749364723, 1749364783],
              input_type: 'epoch',
              output_format: 'iso'
            },
            response: {
              results: [
                { input: 1749364663, output: '2025-06-08T08:37:43+00:00', iso_week: 23 },
                { input: 1749364723, output: '2025-06-08T08:38:43+00:00', iso_week: 23 },
                { input: 1749364783, output: '2025-06-08T08:39:43+00:00', iso_week: 23 }
              ],
              total_processed: 3
            }
          }
        }
      ]
    },
    {
      category: 'Utilities',
      items: [
        {
          method: 'GET',
          path: '/api/current-timestamp',
          description: 'Get current Unix timestamp',
          example: {
            response: {
              timestamp: 1749364663,
              iso_date: '2025-06-08T08:37:43+00:00',
              iso_week: 23,
              day_of_year: 159
            }
          },
          testable: true,
          testEndpoint: '/api/current-timestamp'
        },
        {
          method: 'GET',
          path: '/api/week-number',
          description: 'Get ISO week number for a specific date',
          params: [
            { name: 'date', type: 'string', required: true, description: 'Date in ISO format' }
          ],
          example: {
            request: '?date=2025-06-08',
            response: {
              date: '2025-06-08',
              iso_week: 23,
              week_year: 2025,
              day_of_week: 7,
              day_of_year: 159
            }
          },
          testable: true,
          testEndpoint: '/api/week-number?date=2025-06-08'
        },
        {
          method: 'GET',
          path: '/api/formats',
          description: 'List all available date formats',
          example: {
            response: {
              formats: [
                { name: 'iso', description: 'ISO 8601 format', example: '2025-06-08T08:37:43+00:00' },
                { name: 'rfc', description: 'RFC 2822 format', example: 'Sun, 08 Jun 2025 08:37:43 +0000' },
                { name: 'unix', description: 'Unix timestamp', example: '1749364663' }
              ]
            }
          },
          testable: true,
          testEndpoint: '/api/formats'
        }
      ]
    },
    {
      category: 'Account',
      items: [
        {
          method: 'GET',
          path: '/api/account/usage',
          description: 'Get current usage statistics',
          headers: [
            { name: 'X-API-Key', required: true, description: 'Your API key' }
          ],
          example: {
            response: {
              plan: 'starter',
              rate_limit: 1000,
              usage_this_month: 45,
              usage_today: 12,
              remaining_calls: 955,
              reset_date: '2025-07-01T00:00:00Z'
            }
          },
          testable: true,
          testEndpoint: '/api/account/usage'
        }
      ]
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: 5,
      calls: '1,000',
      features: ['Basic conversion endpoints', 'Email support', 'Standard rate limits']
    },
    {
      name: 'Professional',
      price: 15,
      calls: '10,000',
      features: ['All endpoints', 'Batch conversion', 'Priority support', 'Higher rate limits']
    },
    {
      name: 'Enterprise',
      price: 50,
      calls: '100,000',
      features: ['Unlimited batch', 'Phone support', 'SLA guarantee', 'Custom integrations']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Epoch Converter API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Professional Unix timestamp conversion API with rate limiting and authentication
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="https://sdchsfyk.manus.space" target="_blank">
                <Key className="h-4 w-4 mr-2" />
                Get API Key
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://epochtimeconverter.org" target="_blank">
                <Globe className="h-4 w-4 mr-2" />
                Try Web Version
              </a>
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get started with the Epoch Converter API in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold mb-2">Get API Key</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up and get your API key from the dashboard
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-semibold mb-2">Make Request</h3>
                <p className="text-sm text-muted-foreground">
                  Include your API key in the X-API-Key header
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold mb-2">Get Response</h3>
                <p className="text-sm text-muted-foreground">
                  Receive JSON response with converted timestamps
                </p>
              </div>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="mb-2 text-gray-400"># Example API call</div>
              <div>curl -H "X-API-Key: YOUR_API_KEY" \\</div>
              <div className="ml-4">{API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663</div>
            </div>
          </CardContent>
        </Card>

        {/* API Tester */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              API Tester
            </CardTitle>
            <CardDescription>
              Test API endpoints directly from this documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key to test endpoints"
              />
            </div>
            
            {testResult && (
              <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription>
                  <div className="font-mono text-sm">
                    <div className="mb-2">
                      <Badge variant={testResult.success ? "default" : "destructive"}>
                        {testResult.status || 'Error'}
                      </Badge>
                    </div>
                    <pre className="whitespace-pre-wrap">
                      {testResult.error || JSON.stringify(testResult.data, null, 2)}
                    </pre>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* API Documentation */}
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-6">
            {endpoints.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.items.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                        {endpoint.testable && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => testEndpoint(endpoint.testEndpoint)}
                            disabled={loading || !apiKey}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{endpoint.description}</p>

                      {/* Parameters */}
                      {endpoint.params && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="space-y-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <div key={paramIndex} className="flex items-center gap-2 text-sm">
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {param.name}
                                </code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                                {param.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    required
                                  </Badge>
                                )}
                                <span className="text-muted-foreground">{param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Headers */}
                      {endpoint.headers && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Headers</h4>
                          <div className="space-y-2">
                            {endpoint.headers.map((header, headerIndex) => (
                              <div key={headerIndex} className="flex items-center gap-2 text-sm">
                                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {header.name}
                                </code>
                                {header.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    required
                                  </Badge>
                                )}
                                <span className="text-muted-foreground">{header.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Example */}
                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <div className="space-y-3">
                          {endpoint.example.request && (
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Request:</div>
                              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm relative">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="absolute top-2 right-2 h-6 w-6 p-0"
                                  onClick={() => copyToClipboard(
                                    typeof endpoint.example.request === 'string' 
                                      ? endpoint.example.request 
                                      : JSON.stringify(endpoint.example.request, null, 2),
                                    `request-${categoryIndex}-${endpointIndex}`
                                  )}
                                >
                                  {copied === `request-${categoryIndex}-${endpointIndex}` ? 
                                    <CheckCircle className="h-3 w-3" /> : 
                                    <Copy className="h-3 w-3" />
                                  }
                                </Button>
                                <pre className="whitespace-pre-wrap">
                                  {typeof endpoint.example.request === 'string' 
                                    ? endpoint.example.request 
                                    : JSON.stringify(endpoint.example.request, null, 2)
                                  }
                                </pre>
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Response:</div>
                            <div className="bg-gray-900 text-blue-400 p-3 rounded font-mono text-sm relative">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2 h-6 w-6 p-0"
                                onClick={() => copyToClipboard(
                                  JSON.stringify(endpoint.example.response, null, 2),
                                  `response-${categoryIndex}-${endpointIndex}`
                                )}
                              >
                                {copied === `response-${categoryIndex}-${endpointIndex}` ? 
                                  <CheckCircle className="h-3 w-3" /> : 
                                  <Copy className="h-3 w-3" />
                                }
                              </Button>
                              <pre className="whitespace-pre-wrap">
                                {JSON.stringify(endpoint.example.response, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.calls}</div>
                      <div className="text-sm text-muted-foreground">API calls per month</div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" asChild>
                      <a href="https://sdchsfyk.manus.space" target="_blank">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* JavaScript Example */}
              <Card>
                <CardHeader>
                  <CardTitle>JavaScript / Node.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => copyToClipboard(`const response = await fetch('${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663', {
  headers: {
    'X-API-Key': 'your-api-key-here'
  }
});

const data = await response.json();
console.log(data);`, 'js-example')}
                    >
                      {copied === 'js-example' ? 
                        <CheckCircle className="h-3 w-3" /> : 
                        <Copy className="h-3 w-3" />
                      }
                    </Button>
                    <pre className="whitespace-pre-wrap">{`const response = await fetch('${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663', {
  headers: {
    'X-API-Key': 'your-api-key-here'
  }
});

const data = await response.json();
console.log(data);`}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Python Example */}
              <Card>
                <CardHeader>
                  <CardTitle>Python</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => copyToClipboard(`import requests

headers = {
    'X-API-Key': 'your-api-key-here'
}

response = requests.get(
    '${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663',
    headers=headers
)

data = response.json()
print(data)`, 'python-example')}
                    >
                      {copied === 'python-example' ? 
                        <CheckCircle className="h-3 w-3" /> : 
                        <Copy className="h-3 w-3" />
                      }
                    </Button>
                    <pre className="whitespace-pre-wrap">{`import requests

headers = {
    'X-API-Key': 'your-api-key-here'
}

response = requests.get(
    '${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663',
    headers=headers
)

data = response.json()
print(data)`}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* cURL Example */}
              <Card>
                <CardHeader>
                  <CardTitle>cURL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => copyToClipboard(`curl -H "X-API-Key: your-api-key-here" \\
  "${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663"`, 'curl-example')}
                    >
                      {copied === 'curl-example' ? 
                        <CheckCircle className="h-3 w-3" /> : 
                        <Copy className="h-3 w-3" />
                      }
                    </Button>
                    <pre className="whitespace-pre-wrap">{`curl -H "X-API-Key: your-api-key-here" \\
  "${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663"`}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* PHP Example */}
              <Card>
                <CardHeader>
                  <CardTitle>PHP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm relative">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => copyToClipboard(`<?php
$headers = [
    'X-API-Key: your-api-key-here'
];

$context = stream_context_create([
    'http' => [
        'header' => implode("\\r\\n", $headers)
    ]
]);

$response = file_get_contents(
    '${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663',
    false,
    $context
);

$data = json_decode($response, true);
print_r($data);
?>`, 'php-example')}
                    >
                      {copied === 'php-example' ? 
                        <CheckCircle className="h-3 w-3" /> : 
                        <Copy className="h-3 w-3" />
                      }
                    </Button>
                    <pre className="whitespace-pre-wrap">{`<?php
$headers = [
    'X-API-Key: your-api-key-here'
];

$context = stream_context_create([
    'http' => [
        'header' => implode("\\r\\n", $headers)
    ]
]);

$response = file_get_contents(
    '${API_BASE_URL}/api/convert/epoch-to-date?timestamp=1749364663',
    false,
    $context
);

$data = json_decode($response, true);
print_r($data);
?>`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>
            Need help? Contact us at{' '}
            <a href="mailto:support@epochtimeconverter.org" className="text-blue-600 hover:underline">
              support@epochtimeconverter.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

