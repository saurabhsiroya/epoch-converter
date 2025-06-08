import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Key, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Zap,
  Users,
  Calendar
} from 'lucide-react'
import './App.css'

const API_BASE_URL = 'https://4nghki1c630w.manus.space'

function App() {
  const [user, setUser] = useState(null)
  const [apiKeys, setApiKeys] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [usage, setUsage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('starter')

  // Subscription plans
  const plans = {
    starter: {
      name: 'Starter Plan',
      price: 5,
      calls: 1000,
      features: ['1,000 API calls/month', 'Basic conversion endpoints', 'Email support']
    },
    professional: {
      name: 'Professional Plan', 
      price: 15,
      calls: 10000,
      features: ['10,000 API calls/month', 'All endpoints', 'Batch conversion', 'Priority support']
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: 50,
      calls: 100000,
      features: ['100,000 API calls/month', 'Unlimited batch', 'Phone support', 'SLA guarantee']
    }
  }

  const createUser = async () => {
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/subscription/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name })
      })

      const data = await response.json()
      
      if (response.ok) {
        setUser(data)
        setSuccess('Account created successfully!')
        localStorage.setItem('epochConverter_userId', data.user_id)
      } else {
        setError(data.error || 'Failed to create account')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const createCheckoutSession = async (plan) => {
    if (!user) {
      setError('Please create an account first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/subscription/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: user.user_id, 
          plan: plan 
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        // Redirect to Stripe checkout
        window.location.href = data.checkout_url
      } else {
        setError(data.error || 'Failed to create checkout session')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateApiKey = async () => {
    if (!user) {
      setError('Please create an account first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/create-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email, 
          plan: subscription?.current_plan || 'starter'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setApiKeys([...apiKeys, data])
        setSuccess('API key generated successfully!')
      } else {
        setError(data.error || 'Failed to generate API key')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setSuccess('Copied to clipboard!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const loadUserData = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subscription/user/${userId}/subscription`)
      if (response.ok) {
        const data = await response.json()
        setSubscription(data)
      }
    } catch (err) {
      console.error('Failed to load user data:', err)
    }
  }

  useEffect(() => {
    const savedUserId = localStorage.getItem('epochConverter_userId')
    if (savedUserId) {
      setUser({ user_id: savedUserId })
      loadUserData(savedUserId)
    }
  }, [])

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 5000)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Epoch Converter API Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your API keys, subscription, and usage analytics
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {!user ? (
          /* Account Creation */
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Create Account
              </CardTitle>
              <CardDescription>
                Get started with the Epoch Converter API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>
              <Button 
                onClick={createUser} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Main Dashboard */
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscription?.current_plan ? plans[subscription.current_plan]?.name : 'Free'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {subscription?.current_plan ? 
                        `$${plans[subscription.current_plan]?.price}/month` : 
                        'No active subscription'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Keys</CardTitle>
                    <Key className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{apiKeys.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Active API keys
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {subscription?.current_plan ? 
                        `${plans[subscription.current_plan]?.calls.toLocaleString()}` : 
                        '0'
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      API calls per month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Get started with your API integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={generateApiKey} disabled={loading}>
                      <Key className="h-4 w-4 mr-2" />
                      Generate API Key
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://epochtimeconverter.org/api-docs" target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Documentation
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Keys Tab */}
            <TabsContent value="api-keys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys
                  </CardTitle>
                  <CardDescription>
                    Manage your API keys for accessing the Epoch Converter API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateApiKey} disabled={loading}>
                    Generate New API Key
                  </Button>
                  
                  {apiKeys.length > 0 ? (
                    <div className="space-y-3">
                      {apiKeys.map((key, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {key.api_key}
                            </code>
                            <div className="text-sm text-muted-foreground mt-1">
                              Plan: {key.plan} • Rate limit: {plans[key.plan]?.calls.toLocaleString()} calls/month
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(key.api_key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No API keys generated yet. Create your first API key to get started.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(plans).map(([planKey, plan]) => (
                  <Card key={planKey} className={`relative ${subscription?.current_plan === planKey ? 'ring-2 ring-blue-500' : ''}`}>
                    {subscription?.current_plan === planKey && (
                      <Badge className="absolute -top-2 left-4 bg-blue-500">
                        Current Plan
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {subscription?.current_plan !== planKey && (
                        <Button 
                          onClick={() => createCheckoutSession(planKey)}
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? 'Processing...' : 'Subscribe'}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {subscription?.subscription_status === 'active' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Billing Management
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription and billing details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Status:</span>
                          <Badge variant="outline" className="ml-2">
                            {subscription.subscription_status}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Plan:</span>
                          <span className="ml-2">{plans[subscription.current_plan]?.name}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Manage Billing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    API Usage Analytics
                  </CardTitle>
                  <CardDescription>
                    Monitor your API usage and performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subscription?.current_plan ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Monthly Usage</span>
                          <span>0 / {plans[subscription.current_plan]?.calls.toLocaleString()} calls</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold">0</div>
                          <div className="text-sm text-muted-foreground">Calls Today</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold">0</div>
                          <div className="text-sm text-muted-foreground">Calls This Week</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold">0</div>
                          <div className="text-sm text-muted-foreground">Calls This Month</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
                      <p className="text-muted-foreground mb-4">
                        Subscribe to a plan to start tracking your API usage
                      </p>
                      <Button onClick={() => document.querySelector('[value="subscription"]').click()}>
                        View Plans
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

export default App

