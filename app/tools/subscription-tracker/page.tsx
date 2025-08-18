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
  CreditCard
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

export default function SubscriptionTrackerPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      name: 'Netflix',
      provider: 'Netflix Inc.',
      category: 'streaming',
      amount: 15.99,
      billingCycle: 'monthly',
      nextBillingDate: '2024-02-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Spotify Premium',
      provider: 'Spotify',
      category: 'streaming',
      amount: 9.99,
      billingCycle: 'monthly',
      nextBillingDate: '2024-02-05',
      status: 'active'
    },
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      provider: 'Adobe',
      category: 'software',
      amount: 54.99,
      billingCycle: 'monthly',
      nextBillingDate: '2024-02-10',
      status: 'active'
    }
  ])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'tracker' | 'analytics'>('tracker')

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
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'bank_statement')
      
      const response = await fetch('https://subscription-tracker-parser-production.up.railway.app/parse', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const error = await response.json()
        console.error('API Error:', error)
        throw new Error(error.error || 'Failed to parse PDF')
      }
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (result.success && result.data?.subscriptions?.length > 0) {
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
          status: 'active'
        }))
        
        setSubscriptions([...subscriptions, ...newSubs])
        setShowUploadModal(false)
        
        toast.success(
          `Found ${result.data.subscriptions.length} subscriptions! ${newSubs.length} new ones added.`,
          { id: toastId }
        )
        
        // Show summary
        if (result.data.summary) {
          toast.success(
            `Monthly total: $${result.data.summary.total_monthly.toFixed(2)}`,
            { duration: 5000 }
          )
        }
      } else {
        console.log('No subscriptions found or success=false:', result)
        toast.error('No subscriptions found in this statement', { id: toastId })
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to analyze bank statement', { id: toastId })
    }
  }

  return (
    <div className="container-wide py-8">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="h1 mb-2">Subscription Tracker</h1>
          <p className="text-slate-400">Manage and optimize your recurring expenses</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn btn-secondary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Statement
          </button>
          <button
            onClick={() => setShowAddModal(true)}
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
              <p className="text-slate-500 mb-4">No subscriptions added yet</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                Add your first subscription
              </button>
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
      ) : (
        <div className="card-surface p-8 text-center">
          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="h3 mb-2">Analytics Coming Soon</h3>
          <p className="text-slate-400">Detailed spending insights and trends will be available here</p>
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
                Upload your bank statement PDF and we'll automatically detect all your subscriptions.
              </p>
              
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-300 mb-2">Drag and drop your PDF here</p>
                <p className="text-sm text-slate-500 mb-4">or</p>
                <label className="btn btn-primary cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
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
                  <li>• Most major banks supported</li>
                  <li>• Automatic subscription detection</li>
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
    </div>
  )
}