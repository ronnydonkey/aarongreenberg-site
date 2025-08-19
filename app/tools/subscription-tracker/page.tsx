'use client'

import { useState } from 'react'
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
  CheckCircle2
} from 'lucide-react'
import toast from 'react-hot-toast'

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
    name: 'StreamFlix Plus',
    provider: 'StreamFlix',
    category: 'streaming',
    amount: 17.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-15',
    status: 'active'
  },
  {
    id: 'demo-2',
    name: 'CloudStorage Pro',
    provider: 'CloudStorage Inc',
    category: 'software',
    amount: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-20',
    status: 'active'
  },
  {
    id: 'demo-3',
    name: 'NewsDigest Premium',
    provider: 'NewsDigest',
    category: 'other',
    amount: 149.00,
    billingCycle: 'annual',
    nextBillingDate: '2024-08-01',
    status: 'active'
  },
  {
    id: 'demo-4',
    name: 'FitnessPro Gym',
    provider: 'FitnessPro',
    category: 'fitness',
    amount: 49.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-05',
    status: 'active'
  }
]

const demoTransactions = [
  { date: '2024-01-15', description: 'STREAMFLIX PLUS MONTHLY', amount: 17.99, merchant: 'StreamFlix' },
  { date: '2024-01-14', description: 'GROCERY MART #4521', amount: 127.83, merchant: 'Grocery Mart' },
  { date: '2024-01-12', description: 'CLOUDSTORAGE PRO SUBSCRIPTION', amount: 9.99, merchant: 'CloudStorage' },
  { date: '2024-01-10', description: 'COFFEE HOUSE', amount: 5.47, merchant: 'Coffee House' },
  { date: '2024-01-08', description: 'FITNESSPRO GYM MONTHLY', amount: 49.99, merchant: 'FitnessPro' },
  { date: '2024-01-05', description: 'STREAMFLIX PLUS MONTHLY', amount: 17.99, merchant: 'StreamFlix' },
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
    const newSub: Subscription = {
      id: Date.now().toString(),
      ...data,
      status: 'active'
    }
    setSubscriptions([...subscriptions, newSub])
    setShowAddModal(false)
    toast.success('Subscription added successfully')
  }

  const handleFileUpload = async (file: File) => {
    const toastId = toast.loading('Analyzing bank statement...')
    
    console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'bank_statement')
      
      console.log('Calling API endpoint: /api/subscription-tracker/parse')
      const response = await fetch('/api/subscription-tracker/parse', {
        method: 'POST',
        body: formData
      })
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const error = await response.json()
        console.error('API Error:', error)
        throw new Error(error.error || 'Failed to parse PDF')
      }
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (result.success) {
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
      // Check if it's the CSV not allowed error
      if (error?.message?.includes('Only PDF') || (file.name.toLowerCase().endsWith('.csv') && error?.message?.includes('allowed'))) {
        toast.error(
          'CSV support is coming soon! For now, please use PDF bank statements. The parser is being updated to support CSV files.',
          { id: toastId, duration: 6000 }
        )
      } else {
        toast.error(error instanceof Error ? error.message : 'Failed to analyze bank statement', { id: toastId })
      }
    }
  }

  return (
    <div className="container-wide py-8">
      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="font-medium text-yellow-200">Demo Mode</p>
                <p className="text-sm text-yellow-300/80">You're viewing sample data. Sign up to analyze your real bank statements securely.</p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="btn btn-primary btn-sm"
            >
              Sign Up for Full Version
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="h1 mb-2">Subscription Tracker</h1>
          <p className="text-slate-400">Manage and optimize your recurring expenses</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => isDemo ? setShowUpgradeModal(true) : setShowUploadModal(true)}
            className="btn btn-secondary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Statement
          </button>
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
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Monthly Spend</p>
              <p className="metric-value">${totalMonthly.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Active Subscriptions</p>
              <p className="metric-value">{activeCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Annual Projection</p>
              <p className="metric-value">${annualProjection.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">Potential Savings</p>
              <p className="metric-value">$0.00</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-4 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('tracker')}
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
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-6 hover:bg-slate-900/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${getCategoryColor(sub.category)} flex items-center justify-center text-white font-bold`}>
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
                      <p className="font-semibold text-slate-50">
                        ${sub.amount.toFixed(2)}
                        <span className="text-sm text-slate-400">/{sub.billingCycle}</span>
                      </p>
                      <p className="text-sm text-slate-400">
                        Next bill: {new Date(sub.nextBillingDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'analytics' ? (
        <div className="card-surface p-8 text-center">
          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="h3 mb-2">Analytics Coming Soon</h3>
          <p className="text-slate-400">Detailed spending insights and trends will be available here</p>
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
              <h3 className="font-semibold text-purple-400 mb-4">Detected Subscriptions</h3>
              <div className="space-y-3">
                {possibleSubscriptions.map((sub, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
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
              
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
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
              <h2 className="h3">Upgrade to Full Version</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
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
                <h3 className="text-xl font-semibold mb-2">Secure Your Financial Data</h3>
                <p className="text-slate-400">
                  Get full access with bank-level security and data encryption
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Bank-Level Encryption</p>
                    <p className="text-sm text-slate-400">Your data is encrypted at rest and in transit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Private & Secure</p>
                    <p className="text-sm text-slate-400">Only you can access your financial data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Full Features</p>
                    <p className="text-sm text-slate-400">Import unlimited statements, export reports, and more</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium">Full Access</span>
                  <span className="text-2xl font-bold text-primary">Free</span>
                </div>
                <p className="text-sm text-slate-400">During beta - no credit card required</p>
              </div>

              <a
                href="https://app.subscriptiontracker.ai/signup"
                className="btn btn-primary w-full mb-3"
              >
                <Lock className="w-4 h-4 mr-2" />
                Create Secure Account
              </a>
              
              <p className="text-xs text-center text-slate-500">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}