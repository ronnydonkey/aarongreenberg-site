import Link from 'next/link'
import { 
  Building2, 
  Car, 
  CreditCard, 
  FileText,
  ExternalLink,
  Users,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const tools = [
  {
    id: 'cre-research',
    name: 'CRE Lead Research',
    description: 'AI-powered commercial real estate opportunity finder. Monitors emails, scores deals, and sends alerts for properties matching your criteria.',
    icon: Building2,
    color: 'from-blue-500 to-indigo-500',
    status: 'Live',
    statusColor: 'badge-success',
    metrics: {
      users: '127',
      saved: '$2.1M',
      accuracy: '94%'
    },
    features: [
      'Email monitoring for 50+ brokers',
      'Automated lead scoring (0-100)',
      'Custom investment criteria',
      'Real-time alerts',
      'Export to CSV/Excel'
    ],
    pricing: '$99/month',
    url: 'https://scatterbrainai.com/cre-tool',
    cta: 'Start Finding Deals'
  },
  {
    id: 'autobroker',
    name: 'AutoBroker Pro',
    description: 'Smart car shopping assistant that monitors inventory, tracks prices, and identifies the best deals based on your preferences.',
    icon: Car,
    color: 'from-green-500 to-emerald-500',
    status: 'Beta',
    statusColor: 'badge-primary',
    metrics: {
      users: '892',
      saved: '$3.2M',
      deals: '1,247'
    },
    features: [
      'Real-time inventory tracking',
      'Price drop alerts',
      'Deal scoring algorithm',
      'Market trend analysis',
      'Negotiation insights'
    ],
    pricing: '$49/month',
    url: 'https://scatterbrainai.com/auto-broker',
    cta: 'Find Your Car'
  },
  {
    id: 'subscription-tracker',
    name: 'Subscription Tracker',
    description: 'Take control of recurring expenses. Upload bank statements and let AI identify, categorize, and optimize your subscriptions.',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    status: 'Live',
    statusColor: 'badge-success',
    metrics: {
      users: '2,341',
      saved: '$847K',
      accuracy: '96%'
    },
    features: [
      'Bank statement import',
      'AI subscription detection',
      'Spending analytics',
      'Cancellation reminders',
      'Savings recommendations'
    ],
    pricing: '$9/month',
    url: 'https://scatterbrainai.com/subscription-tracker',
    cta: 'Track Subscriptions'
  },
  {
    id: 'knowledge-ripper',
    name: 'Knowledge Ripper',
    description: 'Extract structured data from any document. Perfect for contracts, reports, and research papers.',
    icon: FileText,
    color: 'from-orange-500 to-red-500',
    status: 'Coming Soon',
    statusColor: 'badge-default',
    metrics: {
      waitlist: '412',
      accuracy: '98%',
      speed: '10s avg'
    },
    features: [
      'PDF, Word, Excel support',
      'Custom extraction templates',
      'Bulk processing',
      'API access',
      'Export to any format'
    ],
    pricing: 'TBD',
    url: '#',
    cta: 'Join Waitlist'
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="container-wide mb-12">
        <h1 className="h1 mb-4">My Tools</h1>
        <p className="text-xl text-secondary max-w-3xl">
          AI-powered solutions for real problems. Each tool is built from personal need, 
          tested in the real world, and designed to save you time and money.
        </p>
      </div>

      {/* Bundle Offer */}
      <div className="container-wide mb-16">
        <div className="card-surface bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="badge badge-best mb-4">BEST VALUE</div>
              <h2 className="h3 mb-3">All Access Bundle</h2>
              <p className="text-secondary mb-4">
                Get access to all current and future tools for one low price. 
                Save 40% compared to individual subscriptions.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-primary">$149</span>
                <span className="text-secondary">/month</span>
                <span className="text-sm text-muted line-through">$246</span>
              </div>
              <Link href="https://scatterbrainai.com/pricing" className="btn btn-primary btn-lg">
                Get All Access
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4+</div>
                <div className="text-sm text-muted">Premium Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">$97</div>
                <div className="text-sm text-muted">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted">Priority Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted">Future Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container-wide">
        <div className="space-y-12">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div key={tool.id} className="card-surface">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="h3">{tool.name}</h2>
                          <span className={`badge ${tool.statusColor}`}>{tool.status}</span>
                        </div>
                        <p className="text-secondary">{tool.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-primary mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted" />
                        <span className="text-sm">
                          <span className="font-semibold text-primary">{tool.metrics.users}</span>
                          <span className="text-muted"> active users</span>
                        </span>
                      </div>
                      {tool.metrics.saved && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-muted" />
                          <span className="text-sm">
                            <span className="font-semibold text-green-500">{tool.metrics.saved}</span>
                            <span className="text-muted"> saved</span>
                          </span>
                        </div>
                      )}
                      {tool.metrics.accuracy && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-muted" />
                          <span className="text-sm">
                            <span className="font-semibold text-primary">{tool.metrics.accuracy}</span>
                            <span className="text-muted"> accuracy</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:border-l border-default lg:pl-8">
                    <div className="mb-6">
                      <div className="text-sm text-muted mb-2">Starting at</div>
                      <div className="text-3xl font-bold text-primary">{tool.pricing}</div>
                    </div>

                    {tool.status === 'Coming Soon' ? (
                      <button className="btn btn-secondary w-full mb-4" disabled>
                        <Clock className="w-4 h-4 mr-2" />
                        Coming Soon
                      </button>
                    ) : (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-full mb-4"
                      >
                        {tool.cta}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}

                    <div className="text-center">
                      <Link href={`/blog/building-${tool.id}`} className="text-sm text-blue-500 hover:text-blue-400">
                        Read how I built this →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container-wide mt-16">
        <div className="card-surface text-center">
          <h2 className="h3 mb-4">Have a Specific Problem?</h2>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            I'm always looking for new problems to solve. If you have a specific need that my current tools don't address, 
            let's talk about building a solution together.
          </p>
          <a href="mailto:aaron@aarongreenberg.net" className="btn btn-primary">
            Discuss Your Idea
          </a>
        </div>
      </div>
    </div>
  )
}