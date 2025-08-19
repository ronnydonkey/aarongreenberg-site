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
    <div className="min-h-screen bg-base">
      {/* Hero Section with Hot Deals */}
      <div className="border-b border-default">
        <div className="container-wide py-8">
          {/* Compact Hero */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">
              Pre-Negotiated Car Deals
            </h1>
            <p className="text-lg text-secondary mb-6 max-w-2xl">
              Skip the dealership. Get transparent pricing. Save thousands.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Licensed CA Broker</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>30-Min Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full" />
                <span>$500 Flat Fee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Deals Section */}
      <div className="container-wide py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold">This Week's Deals</h2>
          <p className="text-sm text-muted">Updated Monday</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 pb-6 border-b border-default overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Deals Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {filteredDeals.slice(0, 3).map((deal) => (
            <div key={deal.id} className="border border-default rounded-lg hover:border-primary/50 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {deal.year} {deal.make}
                    </h3>
                    <p className="text-secondary">{deal.model}</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    -{((deal.savings / deal.msrp) * 100).toFixed(0)}%
                  </span>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">${deal.monthlyPayment}<span className="text-sm font-normal text-muted">/mo</span></p>
                    <p className="text-sm text-muted">{deal.leaseTerm} months • {deal.milesPerYear.toLocaleString()} mi/yr</p>
                  </div>
                  
                  <div className="space-y-2 py-4 border-y border-default">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">MSRP</span>
                      <span className="line-through text-muted">${deal.msrp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Sale Price</span>
                      <span>${deal.negotiatedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>You Save</span>
                      <span className="text-green-600">${deal.savings.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Due at Signing</span>
                      <span>${deal.dueAtSigning.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Broker Fee</span>
                      <span>${deal.brokerFee}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInquiry(deal)}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Reserve This Deal
                  </button>

                  {deal.inventory <= 3 && (
                    <p className="text-xs text-center text-amber-600">
                      Only {deal.inventory} left at this price
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex items-center justify-between py-8 border-t border-default">
          <div>
            <p className="font-medium mb-1">Need a different car?</p>
            <p className="text-sm text-muted">I can get deals on any make & model</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:+13235551234" className="btn btn-primary">
              Call Gary: (323) 555-1234
            </a>
            <button 
              onClick={() => document.getElementById('all-deals')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary"
            >
              View All {filteredDeals.length} Deals
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="border-t border-default">
        <div className="container-wide py-12">
          <h2 className="text-xl font-semibold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-sm text-muted mb-2">01</p>
              <h3 className="font-medium mb-2">Browse Deals</h3>
              <p className="text-sm text-secondary">
                All prices are pre-negotiated. What you see is what you pay plus $500 broker fee.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted mb-2">02</p>
              <h3 className="font-medium mb-2">Contact Gary</h3>
              <p className="text-sm text-secondary">
                Call or text. I handle all paperwork, DMV, and delivery coordination.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm text-muted mb-2">03</p>
              <h3 className="font-medium mb-2">Get Your Car</h3>
              <p className="text-sm text-secondary">
                Pick up at dealer or have it delivered to your home or office.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Deals Section */}
      <div id="all-deals" className="border-t border-default">
        <div className="container-wide py-12">
          <h2 className="text-2xl font-bold mb-8">
            All Available Deals ({filteredDeals.length})
          </h2>

          {/* Deals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="border border-default rounded-lg hover:border-primary/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {deal.year} {deal.make}
                      </h3>
                      <p className="text-secondary">{deal.model}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      -{((deal.savings / deal.msrp) * 100).toFixed(0)}%
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-3xl font-bold">${deal.monthlyPayment}<span className="text-sm font-normal text-muted">/mo</span></p>
                      <p className="text-sm text-muted">{deal.leaseTerm} months • {deal.milesPerYear.toLocaleString()} mi/yr</p>
                    </div>
                    
                    <div className="space-y-2 py-4 border-y border-default">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">MSRP</span>
                        <span className="line-through text-muted">${deal.msrp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Sale Price</span>
                        <span>${deal.negotiatedPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>You Save</span>
                        <span className="text-green-600">${deal.savings.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Due at Signing</span>
                        <span>${deal.dueAtSigning.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Broker Fee</span>
                        <span>${deal.brokerFee}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquiry(deal)}
                      className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Reserve This Deal
                    </button>

                    {deal.inventory <= 3 && (
                      <p className="text-xs text-center text-amber-600">
                        Only {deal.inventory} left at this price
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Work With Gary */}
      <div className="border-t border-default">
        <div className="container-wide py-12">
          <h2 className="text-2xl font-bold mb-8">Why Work With Gary</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-medium mb-2">No Games, Just Savings</h3>
              <p className="text-sm text-secondary">
                I&apos;ve already done the negotiating. The price you see is the price you pay, plus my flat $500 fee.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">7+ Years Experience</h3>
              <p className="text-sm text-secondary">
                Relationships with 20+ dealerships in LA. I know where the deals are and how to get them.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Full Service</h3>
              <p className="text-sm text-secondary">
                From finding your car to delivery at your door. I handle all the paperwork and logistics.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Any Brand, Any Car</h3>
              <p className="text-sm text-secondary">
                Don&apos;t see what you want? Call me. I can get deals on any make and model.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-base border border-default max-w-md w-full rounded-lg">
            <div className="p-6 border-b border-default">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Reserve This Deal</h2>
                  <p className="text-sm text-secondary mt-1">
                    {selectedDeal.year} {selectedDeal.make} {selectedDeal.model}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowInquiryModal(false)
                    setSelectedDeal(null)
                  }}
                  className="text-muted hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
              
              <div className="p-4 bg-elevated rounded border border-default">
                <p className="text-sm text-secondary">
                  Gary will contact you within 30 minutes during business hours to discuss this deal and answer any questions.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowInquiryModal(false)
                    setSelectedDeal(null)
                  }}
                  className="flex-1 py-3 border border-default rounded-lg hover:bg-elevated transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
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