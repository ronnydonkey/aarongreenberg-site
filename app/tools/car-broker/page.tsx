'use client'

import { useState } from 'react'
import { 
  Car, 
  Zap, 
  Sparkles, 
  DollarSign, 
  Phone,
  Clock,
  Shield,
  ChevronRight,
  Filter,
  Info,
  Check
} from 'lucide-react'
import toast from 'react-hot-toast'

// Vehicle categories
const categories = [
  { id: 'all', name: 'All Deals', icon: Sparkles },
  { id: 'ev', name: 'Electric', icon: Zap },
  { id: 'luxury', name: 'Luxury', icon: Sparkles },
  { id: 'sedan', name: 'Sedans', icon: Car },
  { id: 'suv', name: 'SUVs', icon: Car },
]

// Sample hot deals data
const hotDeals = [
  {
    id: '1',
    make: 'BMW',
    model: 'i4 eDrive40',
    year: 2024,
    category: 'ev',
    image: '/api/placeholder/400/300',
    msrp: 71400,
    negotiatedPrice: 61200,
    monthlyPayment: 649,
    dueAtSigning: 3500,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 500,
    savings: 10200,
    features: ['Premium Package', 'Driving Assistance Pro', 'Parking Assistance'],
    availableColors: ['Alpine White', 'Black Sapphire', 'Brooklyn Grey'],
    dealExpires: '2024-02-01',
    inventory: 3
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'EQE 350+',
    year: 2024,
    category: 'ev',
    image: '/api/placeholder/400/300',
    msrp: 85900,
    negotiatedPrice: 73500,
    monthlyPayment: 799,
    dueAtSigning: 4000,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 500,
    savings: 12400,
    features: ['AMG Line', 'Burmester Sound', 'Air Body Control'],
    availableColors: ['Obsidian Black', 'Polar White', 'Selenite Grey'],
    dealExpires: '2024-01-28',
    inventory: 2
  },
  {
    id: '3',
    make: 'Genesis',
    model: 'G70 3.3T Sport',
    year: 2024,
    category: 'luxury',
    image: '/api/placeholder/400/300',
    msrp: 52000,
    negotiatedPrice: 44800,
    monthlyPayment: 459,
    dueAtSigning: 2500,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 400,
    savings: 7200,
    features: ['Sport Package', 'Nappa Leather', 'Heads-Up Display'],
    availableColors: ['Adriatic Blue', 'Havana Red', 'Siberian Ice'],
    dealExpires: '2024-01-30',
    inventory: 4
  },
  {
    id: '4',
    make: 'Honda',
    model: 'Accord Hybrid Sport',
    year: 2024,
    category: 'sedan',
    image: '/api/placeholder/400/300',
    msrp: 35500,
    negotiatedPrice: 31900,
    monthlyPayment: 299,
    dueAtSigning: 2000,
    leaseTerm: 36,
    milesPerYear: 12000,
    brokerFee: 300,
    savings: 3600,
    features: ['Honda Sensing', 'Wireless CarPlay', 'Bose Audio'],
    availableColors: ['Platinum White', 'Radiant Red', 'Still Night'],
    dealExpires: '2024-02-05',
    inventory: 6
  },
  {
    id: '5',
    make: 'Mazda',
    model: 'CX-90 PHEV Premium',
    year: 2024,
    category: 'suv',
    image: '/api/placeholder/400/300',
    msrp: 56700,
    negotiatedPrice: 49900,
    monthlyPayment: 549,
    dueAtSigning: 3000,
    leaseTerm: 36,
    milesPerYear: 10000,
    brokerFee: 400,
    savings: 6800,
    features: ['Captain Chairs', 'Panoramic Roof', '360 Camera'],
    availableColors: ['Machine Grey', 'Soul Red Crystal', 'Rhodium White'],
    dealExpires: '2024-01-31',
    inventory: 2
  }
]

interface InquiryForm {
  name: string
  email: string
  phone: string
  preferredContact: 'phone' | 'email' | 'text'
  message?: string
}

export default function CarBrokerPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [formData, setFormData] = useState<InquiryForm>({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredDeals = selectedCategory === 'all' 
    ? hotDeals 
    : hotDeals.filter(deal => deal.category === selectedCategory)

  const handleInquiry = (deal: any) => {
    setSelectedDeal(deal)
    setShowInquiryModal(true)
  }

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/car-broker/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dealId: selectedDeal?.id,
          dealDetails: selectedDeal
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Inquiry sent! Gary will contact you within 30 minutes.')
        setShowInquiryModal(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredContact: 'phone',
          message: ''
        })
        setSelectedDeal(null)
      } else {
        toast.error(data.error || 'Failed to send inquiry')
      }
    } catch (error) {
      toast.error('Failed to send inquiry. Please call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black">
      {/* Hero Section with Hot Deals */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        <div className="container-wide py-12 relative">
          {/* Compact Hero */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skip the Dealership Games
            </h1>
            <p className="text-lg md:text-xl text-secondary mb-6 max-w-2xl mx-auto">
              Pre-negotiated car deals delivered to your door. No haggling, no hidden fees.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Licensed Broker</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">30-Min Response</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">$500 Flat Fee</span>
              </div>
            </div>
          </div>

          {/* Hot Deals This Week - Above the Fold */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              🔥 Hot Deals This Week
            </h2>
            <p className="text-center text-secondary mb-8">
              Updated every Monday • All prices include broker fee
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 inline mr-1" />
                    {category.name}
                  </button>
                )
              })}
            </div>

            {/* Featured Deals Grid - Show top 3 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {filteredDeals.slice(0, 3).map((deal) => (
                <div key={deal.id} className="card-surface rounded-2xl overflow-hidden hover:shadow-2xl transition-all group">
                  <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="w-20 h-20 text-slate-400" />
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ${deal.savings.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2">
                      {deal.year} {deal.make} {deal.model}
                    </h3>
                    
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-sm text-muted">Monthly</span>
                      <span className="text-2xl font-bold text-primary">
                        ${deal.monthlyPayment}
                        <span className="text-sm font-normal text-muted">/mo</span>
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted">Due at Signing</span>
                        <span>${deal.dueAtSigning.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Term</span>
                        <span>{deal.leaseTerm} months</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquiry(deal)}
                      className="btn btn-primary w-full text-sm"
                    >
                      Reserve This Deal
                    </button>

                    {deal.inventory <= 3 && (
                      <p className="text-xs text-center text-amber-600 mt-2">
                        Only {deal.inventory} available
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex gap-4 justify-center mb-4">
                <a href="tel:+13235551234" className="btn btn-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Gary Now
                </a>
                <button 
                  onClick={() => document.getElementById('all-deals')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-secondary"
                >
                  View All {filteredDeals.length} Deals
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              <p className="text-sm text-muted">
                Don&apos;t see your car? Call for custom deals on any make & model
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Simplified */}
      <div className="py-12 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Browse Deals</h3>
              <p className="text-secondary text-sm">
                Pre-negotiated prices updated weekly
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Contact Gary</h3>
              <p className="text-secondary text-sm">
                He handles all negotiations for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Get Your Car</h3>
              <p className="text-secondary text-sm">
                Delivered to your door or pickup
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Deals Section */}
      <div id="all-deals" className="py-16">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              All Available Deals
            </h2>
            <p className="text-secondary">
              {filteredDeals.length} vehicles matching your criteria
            </p>
          </div>

          {/* Deals Grid - Show remaining deals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="card-surface rounded-2xl overflow-hidden hover:shadow-2xl transition-all group">
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  {/* Placeholder for car image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-24 h-24 text-slate-400" />
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ${deal.savings.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {deal.year} {deal.make} {deal.model}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted">Monthly Payment</span>
                      <span className="text-2xl font-bold text-primary">
                        ${deal.monthlyPayment}
                        <span className="text-sm font-normal text-muted">/mo</span>
                      </span>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted">Due at Signing</span>
                        <span>${deal.dueAtSigning.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Term</span>
                        <span>{deal.leaseTerm} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Miles/Year</span>
                        <span>{deal.milesPerYear.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <p className="text-xs font-medium text-muted mb-2">KEY FEATURES</p>
                    <div className="flex flex-wrap gap-2">
                      {deal.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Transparency */}
                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted">MSRP</span>
                        <span className="line-through text-muted">${deal.msrp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Negotiated Price</span>
                        <span className="text-green-600">${deal.negotiatedPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Broker Fee</span>
                        <span>${deal.brokerFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleInquiry(deal)}
                      className="btn btn-primary flex-1"
                    >
                      Reserve This Deal
                    </button>
                    <a
                      href="tel:+13235551234"
                      className="btn btn-secondary p-3"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>

                  {deal.inventory <= 3 && (
                    <p className="text-xs text-center text-amber-600 mt-3">
                      Only {deal.inventory} available at this price
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Work With Gary */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Work With Gary?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="card-surface p-6">
                <h3 className="font-semibold mb-2">No Games, Just Savings</h3>
                <p className="text-secondary text-sm">
                  I&apos;ve already done the negotiating. The price you see is the price you pay, plus my flat $500 fee.
                </p>
              </div>
              <div className="card-surface p-6">
                <h3 className="font-semibold mb-2">7+ Years Experience</h3>
                <p className="text-secondary text-sm">
                  Relationships with 20+ dealerships in LA. I know where the deals are and how to get them.
                </p>
              </div>
              <div className="card-surface p-6">
                <h3 className="font-semibold mb-2">Full Service</h3>
                <p className="text-secondary text-sm">
                  From finding your car to delivery at your door. I handle all the paperwork and logistics.
                </p>
              </div>
              <div className="card-surface p-6">
                <h3 className="font-semibold mb-2">Any Brand, Any Car</h3>
                <p className="text-secondary text-sm">
                  Don&apos;t see what you want? Call me. I can get deals on any make and model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card-surface max-w-md w-full rounded-2xl">
            <div className="p-6 border-b border-default">
              <h2 className="text-2xl font-bold">Reserve This Deal</h2>
              <p className="text-secondary mt-1">
                {selectedDeal.year} {selectedDeal.make} {selectedDeal.model}
              </p>
            </div>
            
            <form onSubmit={handleSubmitInquiry} className="p-6 space-y-4">
              <div>
                <label className="label">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input w-full"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label className="label">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input w-full"
                  placeholder="(323) 555-1234"
                />
              </div>
              
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input w-full"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="label">Preferred Contact Method</label>
                <select 
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({...formData, preferredContact: e.target.value as any})}
                  className="select w-full"
                >
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                  <option value="email">Email</option>
                </select>
              </div>
              
              <div>
                <label className="label">Message (Optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="input w-full h-20 resize-none"
                  placeholder="Any specific color or requirements?"
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>
                    Gary will contact you within 30 minutes during business hours to discuss this deal and answer any questions.
                  </span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowInquiryModal(false)
                    setSelectedDeal(null)
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary flex-1"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}