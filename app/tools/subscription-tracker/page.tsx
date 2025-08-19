'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Upload, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  X,
  BarChart3,
  CreditCard,
  Lock,
  Shield,
  CheckCircle2,
  HelpCircle,
  Info,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAnalytics, ANALYTICS_EVENTS } from '@/hooks/useAnalytics'

interface Subscription {
  id: string
  name: string
  provider: string
  category: string
  amount: number
  billingCycle: string
  nextBillingDate: string
  status: string
}

// Demo data
const demoSubscriptions: Subscription[] = [
  {
    id: 'demo-1',
    name: 'Claude Pro',
    provider: 'Anthropic',
    category: 'software',
    amount: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-15',
    status: 'active'
  },
  {
    id: 'demo-2',
    name: 'ChatGPT Plus',
    provider: 'OpenAI',
    category: 'software',
    amount: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-20',
    status: 'active'
  },
  {
    id: 'demo-3',
    name: 'Perplexity Pro',
    provider: 'Perplexity AI',
    category: 'software',
    amount: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-08',
    status: 'active'
  },
  {
    id: 'demo-4',
    name: 'Lovable.dev',
    provider: 'Lovable',
    category: 'software',
    amount: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-12',
    status: 'active'
  },
  {
    id: 'demo-5',
    name: 'GitHub Copilot',
    provider: 'GitHub',
    category: 'software',
    amount: 19.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-25',
    status: 'active'
  },
  {
    id: 'demo-6',
    name: 'Midjourney',
    provider: 'Midjourney Inc',
    category: 'software',
    amount: 30.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-10',
    status: 'active'
  },
  {
    id: 'demo-7',
    name: 'Google One AI Premium',
    provider: 'Google',
    category: 'software',
    amount: 19.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-18',
    status: 'active'
  },
  {
    id: 'demo-8',
    name: 'Cursor Pro',
    provider: 'Cursor',
    category: 'software',
    amount: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-22',
    status: 'active'
  }
]

const demoTransactions = [
  { date: '2024-01-20', description: 'CHATGPT PLUS OPENAI.COM', amount: 20.00, merchant: 'OpenAI' },
  { date: '2024-01-15', description: 'CLAUDE PRO ANTHROPIC', amount: 20.00, merchant: 'Anthropic' },
  { date: '2024-01-14', description: 'GROCERY MART #4521', amount: 127.83, merchant: 'Grocery Mart' },
  { date: '2024-01-12', description: 'LOVABLE.DEV SUBSCRIPTION', amount: 20.00, merchant: 'Lovable' },
  { date: '2024-01-10', description: 'MIDJOURNEY SUBSCRIPTION', amount: 30.00, merchant: 'Midjourney' },
  { date: '2024-01-08', description: 'PERPLEXITY PRO AI', amount: 20.00, merchant: 'Perplexity' },
  { date: '2024-01-05', description: 'GITHUB COPILOT', amount: 19.00, merchant: 'GitHub' },
]

export default function SubscriptionTrackerPage() {
  const [isDemo, setIsDemo] = useState(true)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(demoSubscriptions)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'tracker' | 'analytics' | 'review'>('tracker')
  const [importedTransactions, setImportedTransactions] = useState<any[]>(demoTransactions)
  const [possibleSubscriptions, setPossibleSubscriptions] = useState<any[]>([])
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  
  const { track } = useAnalytics()

  // Calculate metrics
  const totalMonthly = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => {
      let monthlyAmount = sub.amount
      if (sub.billingCycle === 'annual') monthlyAmount = sub.amount / 12
      return sum + monthlyAmount
    }, 0)

  const activeCount = subscriptions.filter(s => s.status === 'active').length
  const annualProjection = totalMonthly * 12

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      streaming: 'bg-red-500',
      software: 'bg-blue-500',
      fitness: 'bg-orange-500',
      finance: 'bg-green-500',
      other: 'bg-slate-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const handleAddSubscription = (data: any) => {
    // Validate data
    if (!data.name || data.name.trim().length < 2) {
      toast.error('Please enter a valid subscription name')
      return
    }
    
    if (data.amount <= 0 || isNaN(data.amount)) {
      toast.error('Please enter a valid amount')
      return
    }
    
    // Check for duplicates
    const isDuplicate = subscriptions.some(
      sub => sub.name.toLowerCase() === data.name.trim().toLowerCase()
    )
    
    if (isDuplicate) {
      toast.error('This subscription already exists')
      return
    }
    
    const newSub: Subscription = {
      id: Date.now().toString(),
      name: data.name.trim(),
      provider: data.provider?.trim() || data.name.trim(),
      category: data.category,
      amount: parseFloat(data.amount),
      billingCycle: data.billingCycle,
      nextBillingDate: data.nextBillingDate,
      status: 'active'
    }
    
    setSubscriptions([...subscriptions, newSub])
    setShowAddModal(false)
    toast.success('Subscription added successfully!')
    
    track({
      event: ANALYTICS_EVENTS.SUBSCRIPTION_ADDED,
      tool: 'subscription-tracker',
      properties: {
        category: data.category,
        billingCycle: data.billingCycle,
        isDemo
      }
    })
    
    // If demo mode, suggest trying upload
    if (isDemo && subscriptions.length === demoSubscriptions.length) {
      setTimeout(() => {
        toast('Try uploading a bank statement to find more!', {
          icon: '💡',
          duration: 4000
        })
      }, 1500)
    }
  }

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: waitlistEmail,
          tool: 'subscription-tracker',
          source: 'demo'
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('You\'re on the list! We\'ll notify you when the secure version launches.')
        setShowUpgradeModal(false)
        setWaitlistEmail('')
        
        track({
          event: ANALYTICS_EVENTS.WAITLIST_JOINED,
          tool: 'subscription-tracker',
          properties: {
            source: 'demo'
          }
        })
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    // Validate file type
    const validTypes = ['application/pdf', 'text/csv']
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.csv')) {
      toast.error('Please upload a PDF or CSV file')
      return
    }

    setIsUploading(true)
    setUploadProgress(20)
    const toastId = toast.loading('Analyzing bank statement...')
    
    track({
      event: ANALYTICS_EVENTS.FILE_UPLOAD_STARTED,
      tool: 'subscription-tracker',
      properties: {
        fileType: file.type,
        fileSize: file.size,
        isDemo
      }
    })
    
    console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size)
    
    try {
      setUploadProgress(40)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'bank_statement')
      
      console.log('Calling API endpoint: /api/subscription-tracker/parse')
      const response = await fetch('/api/subscription-tracker/parse', {
        method: 'POST',
        body: formData
      })
      setUploadProgress(60)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const error = await response.json()
        console.error('API Error:', error)
        throw new Error(error.error || 'Failed to parse PDF')
      }
      
      const result = await response.json()
      console.log('API Response:', result)
      setUploadProgress(80)
      
      if (result.success) {
        setUploadProgress(100)
        // Store all transactions for review
        if (result.data?.transactions) {
          console.log('Setting transactions:', result.data.transactions)
          setImportedTransactions(result.data.transactions)
        } else {
          console.log('No transactions in response:', result.data)
        }
        
        if (result.data?.subscriptions?.length > 0) {
          // Store possible subscriptions for review
          setPossibleSubscriptions(result.data.subscriptions)
          
          // Add new subscriptions (avoiding duplicates)
          const existingNames = subscriptions.map(s => s.name.toLowerCase())
          const newSubs = result.data.subscriptions.filter(
            (sub: any) => !existingNames.includes(sub.name.toLowerCase())
          ).map((sub: any) => ({
            id: Date.now().toString() + Math.random(),
            name: sub.name,
            provider: sub.name,
            category: sub.category || 'other',
            amount: sub.amount,
            billingCycle: sub.frequency === 'annual' ? 'annual' : 'monthly',
            nextBillingDate: sub.date,
            status: 'active',
            confidence: sub.confidence || 'medium'
          }))
          
          setShowUploadModal(false)
          setActiveTab('review')  // Switch to review tab
          
          toast.success(
            `Analyzed ${result.data.summary.transactions_analyzed} transactions. Found ${result.data.subscriptions.length} possible subscriptions.`,
            { id: toastId, duration: 5000 }
          )
          
          track({
            event: ANALYTICS_EVENTS.FILE_UPLOAD_SUCCESS,
            tool: 'subscription-tracker',
            properties: {
              transactionsAnalyzed: result.data.summary.transactions_analyzed,
              subscriptionsFound: result.data.subscriptions.length,
              isDemo
            }
          })
        } else {
          // Even if no subscriptions found, show transactions for review
          setShowUploadModal(false)
          setActiveTab('review')
          toast.success(
            `Analyzed ${result.data?.summary?.transactions_analyzed || 0} transactions. Review them to find subscriptions.`,
            { id: toastId }
          )
        }
      } else {
        console.log('Failed to parse:', result)
        toast.error('Failed to parse bank statement', { id: toastId })
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      setIsUploading(false)
      setUploadProgress(0)
      // Check if it's the CSV not allowed error
      if (error?.message?.includes('Only PDF') || (file.name.toLowerCase().endsWith('.csv') && error?.message?.includes('allowed'))) {
        toast.error(
          'CSV support is coming soon! For now, please use PDF bank statements. The parser is being updated to support CSV files.',
          { id: toastId, duration: 6000 }
        )
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to analyze bank statement', { id: toastId })
      }
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }

  // Show onboarding tooltip on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('subscription-tracker-visited')
    if (!hasVisited && isDemo) {
      setTimeout(() => {
        setShowTooltip('onboarding')
        localStorage.setItem('subscription-tracker-visited', 'true')
        setTimeout(() => setShowTooltip(null), 5000)
      }, 1000)
      
      // Track demo started
      track({
        event: ANALYTICS_EVENTS.DEMO_STARTED,
        tool: 'subscription-tracker',
        properties: {
          subscriptionsShown: demoSubscriptions.length
        }
      })
    }
  }, [isDemo, track])

  return (
    <div className="container-wide py-8">
      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="font-medium text-purple-200">Demo Mode - Try It Out!</p>
                <p className="text-sm text-purple-300/80">Explore with sample AI subscription data. Upload your statement to see the magic.</p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="btn btn-primary btn-sm group"
            >
              <Lock className="w-3 h-3 mr-1 group-hover:rotate-12 transition-transform" />
              Get Full Access
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="h1 mb-2 flex items-center gap-3">
            Subscription Tracker
            {isFirstVisit && (
              <span className="text-sm font-normal px-3 py-1 bg-green-500/20 text-green-400 rounded-full animate-pulse">
                New!
              </span>
            )}
          </h1>
          <p className="text-slate-400">Discover hidden subscriptions and optimize your spending</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => isDemo ? setShowUpgradeModal(true) : setShowUploadModal(true)}
              className="btn btn-secondary relative"
              onMouseEnter={() => setShowTooltip('upload')}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Statement
            </button>
            {showTooltip === 'upload' && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-800 text-sm text-slate-200 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                Upload PDF or CSV bank statements
              </div>
            )}
            {showTooltip === 'onboarding' && (
              <div className="absolute top-full mt-2 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-3 rounded-lg shadow-xl max-w-xs z-20 animate-bounce">
                <div className="absolute -top-2 right-8 w-4 h-4 bg-purple-600 rotate-45" />
                <p className="font-semibold mb-1">👋 Welcome to Subscription Tracker!</p>
                <p className="text-xs opacity-90">Start by uploading a bank statement to discover all your hidden subscriptions.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => isDemo ? setShowUpgradeModal(true) : setShowAddModal(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subscription
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="metric-card group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label flex items-center gap-1">
                Monthly Spend
                <Info className="w-3 h-3 opacity-50" />
              </p>
              <p className="metric-value font-mono">${totalMonthly.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">All active subscriptions</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Active Subscriptions</p>
              <p className="metric-value font-mono">{activeCount}</p>
              <p className="text-xs text-slate-500 mt-1">{activeCount === 1 ? 'subscription' : 'subscriptions'} found</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Annual Projection</p>
              <p className="metric-value font-mono">${annualProjection.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mt-1">Based on monthly costs</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card group hover:scale-[1.02] transition-transform relative overflow-hidden">
          <div className="absolute -top-1 -right-8 px-3 py-1 bg-red-500 text-white text-xs font-bold transform rotate-45">
            BETA
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Potential Savings</p>
              <p className="metric-value font-mono text-amber-400">$480.00</p>
              <p className="text-xs text-slate-500 mt-1">Pick 1 AI assistant</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-4 border-b border-slate-800">
        <button
          onClick={() => {
            setActiveTab('tracker')
            track({ event: ANALYTICS_EVENTS.TAB_SWITCHED, tool: 'subscription-tracker', properties: { tab: 'tracker' } })
          }}
          className={`pb-3 px-1 font-medium transition-colors ${
            activeTab === 'tracker'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 px-1 font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`pb-3 px-1 font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'review'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          Review Transactions
          {importedTransactions.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded-full">
              {importedTransactions.length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'tracker' ? (
        <div className="card-surface">
          <div className="p-6 border-b border-slate-800">
            <h2 className="h2">Your Subscriptions</h2>
          </div>
          
          {subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 mb-4">No subscriptions tracked yet</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="btn btn-primary"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Bank Statement
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-secondary"
                >
                  Add Manually
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {subscriptions.map((sub, index) => {
                const daysUntilBilling = Math.ceil((new Date(sub.nextBillingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                const isUpcoming = daysUntilBilling <= 7 && daysUntilBilling >= 0
                
                return (
                  <div 
                    key={sub.id} 
                    className="p-6 hover:bg-slate-900/40 transition group relative"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {isUpcoming && (
                      <div className="absolute top-6 right-6 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                        Bills in {daysUntilBilling} {daysUntilBilling === 1 ? 'day' : 'days'}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${getCategoryColor(sub.category)} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform`}>
                          {sub.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-50">{sub.name}</h3>
                          <p className="text-sm text-slate-400">
                            {sub.provider} • {sub.billingCycle}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-50 font-mono">
                          ${sub.amount.toFixed(2)}
                          <span className="text-sm text-slate-400 font-sans">/{sub.billingCycle === 'annual' ? 'year' : 'mo'}</span>
                        </p>
                        <p className="text-sm text-slate-400">
                          Next: {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quick actions on hover */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button 
                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        onClick={() => {
                          setSubscriptions(subscriptions.filter(s => s.id !== sub.id))
                          toast.success(`Removed ${sub.name}`)
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="space-y-6">
          {/* Spending Over Time Chart */}
          <div className="card-surface">
            <div className="p-6 border-b border-slate-800">
              <h3 className="font-semibold text-slate-50">Monthly Spending Trend</h3>
              <p className="text-sm text-slate-400 mt-1">Your subscription costs over the last 6 months</p>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-end justify-between gap-2">
                {[
                  { month: 'Aug', amount: 59.00 },
                  { month: 'Sep', amount: 79.00 },
                  { month: 'Oct', amount: 119.00 },
                  { month: 'Nov', amount: 139.00 },
                  { month: 'Dec', amount: 148.99 },
                  { month: 'Jan', amount: 168.99 }
                ].map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-700 rounded-t-lg relative" style={{
                      height: `${(data.amount / 300) * 100}%`
                    }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
                        ${data.amount}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-surface">
              <div className="p-6 border-b border-slate-800">
                <h3 className="font-semibold text-slate-50">Spending by Category</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { category: 'AI Assistants', amount: 80.00, percentage: 47, color: 'bg-blue-500' },
                  { category: 'Dev Tools', amount: 39.00, percentage: 23, color: 'bg-green-500' },
                  { category: 'Image Generation', amount: 30.00, percentage: 18, color: 'bg-purple-500' },
                  { category: 'Research', amount: 19.99, percentage: 12, color: 'bg-orange-500' }
                ].map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-medium">{cat.category}</span>
                      <span className="text-sm text-slate-400">${cat.amount}/mo</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${cat.color} transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface">
              <div className="p-6 border-b border-slate-800">
                <h3 className="font-semibold text-slate-50">Key Insights</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-slate-50">AI tool spend exploding</p>
                    <p className="text-sm text-slate-400">Added 5 new AI subscriptions in last 3 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-slate-50">Overlapping AI assistants</p>
                    <p className="text-sm text-slate-400">Claude, ChatGPT, and Perplexity have similar features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="font-medium text-slate-50">Potential savings: $480/year</p>
                    <p className="text-sm text-slate-400">Pick one AI assistant, save $40/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Renewals */}
          <div className="card-surface">
            <div className="p-6 border-b border-slate-800">
              <h3 className="font-semibold text-slate-50">Upcoming Renewals</h3>
              <p className="text-sm text-slate-400 mt-1">Next 30 days</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {subscriptions
                  .filter(sub => sub.status === 'active')
                  .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
                  .slice(0, 3)
                  .map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-sm text-slate-400">
                          {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">${sub.amount}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Review Transactions Tab
        <div className="card-surface">
          <div className="p-6 border-b border-slate-800">
            <h2 className="h2">Review Imported Transactions</h2>
            <p className="text-sm text-slate-400 mt-2">
              {importedTransactions.length > 0 
                ? `${importedTransactions.length} transactions imported. Review to find additional subscriptions.`
                : 'Import a bank statement to review transactions'}
            </p>
          </div>
          
          {possibleSubscriptions.length > 0 && (
            <div className="p-6 border-b border-slate-800 bg-purple-500/5">
              <h3 className="font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI-Detected Subscriptions
              </h3>
              <div className="space-y-3">
                {possibleSubscriptions.map((sub, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div>
                      <p className="font-medium text-slate-50">{sub.name}</p>
                      <p className="text-sm text-slate-400">
                        ${sub.amount.toFixed(2)} {sub.frequency} • {sub.category}
                        {sub.confidence && (
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                            sub.confidence === 'high' ? 'bg-green-500/20 text-green-400' :
                            sub.confidence === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {sub.confidence} confidence
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newSub = {
                          id: Date.now().toString(),
                          name: sub.name,
                          provider: sub.name,
                          category: sub.category || 'other',
                          amount: sub.amount,
                          billingCycle: sub.frequency === 'annual' ? 'annual' : 'monthly',
                          nextBillingDate: sub.date || new Date().toISOString().split('T')[0],
                          status: 'active'
                        }
                        setSubscriptions([...subscriptions, newSub])
                        setPossibleSubscriptions(possibleSubscriptions.filter((_, i) => i !== idx))
                        toast.success(`Added ${sub.name} to subscriptions`)
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Add to Tracker
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {importedTransactions.length > 0 ? (
            <div className="p-6">
              <h3 className="font-semibold text-slate-50 mb-4">All Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 pr-4">Description</th>
                      <th className="pb-3 pr-4 text-right">Amount</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {importedTransactions.map((transaction, idx) => (
                      <tr key={`trans-${idx}`} className="border-b border-slate-900 hover:bg-slate-900/30">
                        <td className="py-3 pr-4 text-slate-400">
                          {transaction.date || 'N/A'}
                        </td>
                        <td className="py-3 pr-4 text-slate-200">
                          {transaction.description || transaction.merchant || 'Unknown'}
                        </td>
                        <td className="py-3 pr-4 text-right text-slate-200">
                          ${typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : '0.00'}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => {
                              const desc = (transaction.description || '').toLowerCase()
                              const merchantName = desc.split(' ').slice(0, 2).map(
                                (w: string) => w.charAt(0).toUpperCase() + w.slice(1)
                              ).join(' ')
                              
                              const newSub = {
                                id: Date.now().toString(),
                                name: merchantName || 'Unknown',
                                provider: merchantName || 'Unknown',
                                category: 'other',
                                amount: Math.abs(transaction.amount || 0),
                                billingCycle: 'monthly',
                                nextBillingDate: transaction.date || new Date().toISOString().split('T')[0],
                                status: 'active'
                              }
                              setSubscriptions([...subscriptions, newSub])
                              toast.success(`Added ${newSub.name} as subscription`)
                            }}
                            className="text-purple-400 hover:text-purple-300 text-sm"
                          >
                            Mark as Subscription
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No transactions to review</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn btn-primary"
              >
                Import Bank Statement
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload Statement Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-surface max-w-md w-full">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="h3">Import Bank Statement</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-slate-400 mb-6">
                Upload your bank statement (PDF or CSV) and we'll automatically detect subscriptions and show all transactions for review.
              </p>
              
              <div 
                className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center relative"
                onDragOver={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.add('border-purple-500', 'bg-purple-500/5')
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/5')
                }}
                onDrop={async (e) => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/5')
                  const file = e.dataTransfer.files?.[0]
                  if (file) {
                    await handleFileUpload(file)
                  }
                }}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 relative mx-auto">
                      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                      <div 
                        className="absolute inset-0 border-4 border-purple-500 rounded-full transition-all duration-300"
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${uploadProgress > 25 ? '100% 0%' : `${50 + uploadProgress * 2}% 0%`}, ${uploadProgress > 25 ? (uploadProgress > 50 ? '100% 100%' : `100% ${(uploadProgress - 25) * 4}%`) : '50% 50%'}, ${uploadProgress > 50 ? (uploadProgress > 75 ? '0% 100%' : `${100 - (uploadProgress - 50) * 4}% 100%`) : '50% 50%'}, ${uploadProgress > 75 ? `0% ${100 - (uploadProgress - 75) * 4}%` : '50% 50%'}, 50% 50%)`
                        }}
                      ></div>
                    </div>
                    <p className="text-slate-300">Processing your bank statement...</p>
                    <p className="text-sm text-slate-500">{uploadProgress}%</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2">Drag and drop your PDF or CSV here</p>
                    <p className="text-sm text-slate-500 mb-4">or</p>
                    <label className="btn btn-primary cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.csv"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            await handleFileUpload(file)
                          }
                        }}
                      />
                      Browse Files
                    </label>
                  </>
                )}
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-sm text-slate-400">Supported formats:</p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• PDF bank statements</li>
                  <li>• CSV transaction exports</li>
                  <li>• Most major banks supported</li>
                  <li>• Automatic subscription detection</li>
                  <li>• Manual review of all transactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-surface max-w-md w-full">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="h3">Add Subscription</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddSubscription({
                name: formData.get('name'),
                provider: formData.get('provider'),
                category: formData.get('category'),
                amount: parseFloat(formData.get('amount') as string),
                billingCycle: formData.get('billingCycle'),
                nextBillingDate: formData.get('nextBillingDate')
              })
            }} className="p-6 space-y-4">
              <div>
                <label className="label">Subscription Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input w-full"
                  placeholder="e.g., Netflix"
                />
              </div>
              
              <div>
                <label className="label">Provider</label>
                <input
                  type="text"
                  name="provider"
                  className="input w-full"
                  placeholder="e.g., Netflix Inc."
                />
              </div>
              
              <div>
                <label className="label">Category *</label>
                <select name="category" required className="select w-full">
                  <option value="streaming">Streaming</option>
                  <option value="software">Software</option>
                  <option value="fitness">Fitness</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    required
                    className="input w-full"
                    placeholder="9.99"
                  />
                </div>
                
                <div>
                  <label className="label">Billing Cycle *</label>
                  <select name="billingCycle" required className="select w-full">
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="label">Next Billing Date *</label>
                <input
                  type="date"
                  name="nextBillingDate"
                  required
                  className="input w-full"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Add Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-surface max-w-md w-full">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="h3">Join the Waitlist</h2>
              <button
                onClick={() => {
                  setShowUpgradeModal(false)
                  setWaitlistEmail('')
                }}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Early Access</h3>
                <p className="text-slate-400">
                  Be first to know when the secure version launches
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Bank-Level Security</p>
                    <p className="text-sm text-slate-400">Your financial data encrypted and private</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Early Bird Pricing</p>
                    <p className="text-sm text-slate-400">50% off for waitlist members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">7-Day Free Trial</p>
                    <p className="text-sm text-slate-400">Cancel anytime, no questions asked</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleWaitlistSignup} className="space-y-4">
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input w-full"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-center text-slate-500 mt-4">
                No spam. We'll only email about Subscription Tracker updates.
              </p>
              <p className="text-xs text-center text-slate-500 mt-2">
                By joining, you agree to our{' '}
                <Link href="/terms" className="text-blue-500 hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}