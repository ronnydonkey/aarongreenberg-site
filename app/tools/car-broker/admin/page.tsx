'use client'

import { useState } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Car,
  DollarSign,
  Calendar,
  Search
} from 'lucide-react'
import toast from 'react-hot-toast'

// This would come from a database in production
const mockDealsData = [
  {
    id: '1',
    make: 'BMW',
    model: 'i4 eDrive40',
    year: 2024,
    category: 'ev',
    vin: '',
    msrp: 71400,
    negotiatedPrice: 61200,
    monthlyPayment: 649,
    dueAtSigning: 3500,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 500,
    features: ['Premium Package', 'Driving Assistance Pro', 'Parking Assistance'],
    availableColors: ['Alpine White', 'Black Sapphire', 'Brooklyn Grey'],
    dealExpires: '2024-02-01',
    inventory: 3,
    status: 'active',
    savings: 10200
  }
]

interface DealForm {
  make: string
  model: string
  year: number
  category: string
  vin: string
  msrp: number
  negotiatedPrice: number
  monthlyPayment: number
  dueAtSigning: number
  leaseTerm: number
  milesPerYear: number
  brokerFee: number
  features: string[]
  availableColors: string[]
  dealExpires: string
  inventory: number
  status: 'active' | 'pending' | 'expired'
}

export default function CarBrokerAdminPage() {
  const [deals, setDeals] = useState(mockDealsData)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDeal, setEditingDeal] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState<DealForm>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'sedan',
    vin: '',
    msrp: 0,
    negotiatedPrice: 0,
    monthlyPayment: 0,
    dueAtSigning: 0,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 500,
    features: [],
    availableColors: [],
    dealExpires: '',
    inventory: 1,
    status: 'active'
  })

  const handleVinLookup = async () => {
    if (!formData.vin) {
      toast.error('Please enter a VIN')
      return
    }

    toast.loading('Looking up VIN...')
    
    // Simulate VIN lookup
    setTimeout(() => {
      // In production, this would call a real VIN API
      setFormData({
        ...formData,
        make: 'BMW',
        model: 'X3 xDrive30i',
        year: 2024,
        category: 'suv',
        msrp: 48900
      })
      toast.success('Vehicle details loaded!')
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingDeal) {
      // Update existing deal
      setDeals(deals.map(deal => 
        deal.id === editingDeal.id 
          ? { ...formData, id: deal.id, savings: formData.msrp - formData.negotiatedPrice }
          : deal
      ))
      toast.success('Deal updated successfully!')
    } else {
      // Add new deal
      const newDeal = {
        ...formData,
        id: Date.now().toString(),
        savings: formData.msrp - formData.negotiatedPrice
      }
      setDeals([...deals, newDeal])
      toast.success('Deal added successfully!')
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'sedan',
      vin: '',
      msrp: 0,
      negotiatedPrice: 0,
      monthlyPayment: 0,
      dueAtSigning: 0,
      leaseTerm: 36,
      milesPerYear: 10000,
      brokerFee: 500,
      features: [],
      availableColors: [],
      dealExpires: '',
      inventory: 1,
      status: 'active'
    })
    setEditingDeal(null)
    setShowAddModal(false)
  }

  const handleEdit = (deal: any) => {
    setFormData(deal)
    setEditingDeal(deal)
    setShowAddModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(deal => deal.id !== id))
      toast.success('Deal deleted')
    }
  }

  const filteredDeals = deals.filter(deal => 
    deal.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.model.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container-wide py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="h1 mb-2">Car Broker Admin</h1>
          <p className="text-secondary">Manage your hot deals and inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Deal
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
          </div>
        </div>
        <div className="metric-card">
          <p className="metric-label">Active Deals</p>
          <p className="metric-value">{deals.filter(d => d.status === 'active').length}</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Total Inventory</p>
          <p className="metric-value">{deals.reduce((sum, d) => sum + d.inventory, 0)}</p>
        </div>
      </div>

      {/* Deals Table */}
      <div className="card-surface">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-default">
                <th className="text-left p-4">Vehicle</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Monthly</th>
                <th className="text-left p-4">Savings</th>
                <th className="text-left p-4">Inventory</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-default hover:bg-elevated">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{deal.year} {deal.make} {deal.model}</p>
                      <p className="text-sm text-muted">Expires: {new Date(deal.dealExpires).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize badge badge-secondary">{deal.category}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-mono">${deal.monthlyPayment}/mo</p>
                    <p className="text-sm text-muted">${deal.dueAtSigning} down</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-green-600">${(deal.savings || 0).toLocaleString()}</p>
                  </td>
                  <td className="p-4">{deal.inventory}</td>
                  <td className="p-4">
                    <span className={`badge ${
                      deal.status === 'active' ? 'badge-success' : 
                      deal.status === 'pending' ? 'badge-warning' : 
                      'badge-error'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(deal)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-surface max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-default flex items-center justify-between">
              <h2 className="h3">{editingDeal ? 'Edit Deal' : 'Add New Deal'}</h2>
              <button
                onClick={resetForm}
                className="text-muted hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* VIN Lookup */}
              <div>
                <label className="label">VIN Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.vin}
                    onChange={(e) => setFormData({...formData, vin: e.target.value})}
                    className="input flex-1"
                    placeholder="Enter VIN to auto-populate details"
                  />
                  <button
                    type="button"
                    onClick={handleVinLookup}
                    className="btn btn-secondary"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Lookup
                  </button>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="label">Make *</label>
                  <input
                    type="text"
                    required
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    className="input w-full"
                    placeholder="BMW"
                  />
                </div>
                <div>
                  <label className="label">Model *</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="input w-full"
                    placeholder="X3 xDrive30i"
                  />
                </div>
                <div>
                  <label className="label">Year *</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="input w-full"
                  />
                </div>
              </div>

              {/* Category and Status */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="select w-full"
                  >
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="ev">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="select w-full"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="font-semibold">Pricing Details</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="label">MSRP *</label>
                    <input
                      type="number"
                      required
                      value={formData.msrp}
                      onChange={(e) => setFormData({...formData, msrp: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Negotiated Price *</label>
                    <input
                      type="number"
                      required
                      value={formData.negotiatedPrice}
                      onChange={(e) => setFormData({...formData, negotiatedPrice: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Broker Fee</label>
                    <input
                      type="number"
                      value={formData.brokerFee}
                      onChange={(e) => setFormData({...formData, brokerFee: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Lease Terms */}
              <div className="space-y-4">
                <h3 className="font-semibold">Lease Terms</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="label">Monthly Payment *</label>
                    <input
                      type="number"
                      required
                      value={formData.monthlyPayment}
                      onChange={(e) => setFormData({...formData, monthlyPayment: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Due at Signing *</label>
                    <input
                      type="number"
                      required
                      value={formData.dueAtSigning}
                      onChange={(e) => setFormData({...formData, dueAtSigning: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Term (months)</label>
                    <input
                      type="number"
                      value={formData.leaseTerm}
                      onChange={(e) => setFormData({...formData, leaseTerm: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="label">Miles/Year</label>
                    <input
                      type="number"
                      value={formData.milesPerYear}
                      onChange={(e) => setFormData({...formData, milesPerYear: parseInt(e.target.value)})}
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Deal Expires</label>
                  <input
                    type="date"
                    value={formData.dealExpires}
                    onChange={(e) => setFormData({...formData, dealExpires: e.target.value})}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="label">Inventory Count</label>
                  <input
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => setFormData({...formData, inventory: parseInt(e.target.value)})}
                    className="input w-full"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="label">Key Features (comma separated)</label>
                <input
                  type="text"
                  value={formData.features.join(', ')}
                  onChange={(e) => setFormData({...formData, features: e.target.value.split(',').map(f => f.trim()).filter(f => f)})}
                  className="input w-full"
                  placeholder="Premium Package, Heads-Up Display, Panoramic Roof"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="label">Available Colors (comma separated)</label>
                <input
                  type="text"
                  value={formData.availableColors.join(', ')}
                  onChange={(e) => setFormData({...formData, availableColors: e.target.value.split(',').map(c => c.trim()).filter(c => c)})}
                  className="input w-full"
                  placeholder="Alpine White, Black Sapphire, Brooklyn Grey"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingDeal ? 'Update Deal' : 'Add Deal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}