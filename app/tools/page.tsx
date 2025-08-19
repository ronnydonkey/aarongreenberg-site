import Link from 'next/link'
import { 
  Building2, 
  Car, 
  CreditCard,
  ExternalLink,
  MessageSquare,
  Clock,
  CheckCircle,
  ShoppingCart
} from 'lucide-react'

const tools = [
  {
    id: 'subscription-tracker',
    name: 'Subscription Tracker',
    story: 'I was bleeding money testing every new AI tool that launched. When I finally sat down to count, I had 47 active subscriptions. Built this in a weekend to stop the madness.',
    description: 'Upload your bank statement. AI finds all your subscriptions, even the sneaky annual ones.',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    status: 'Live',
    statusColor: 'badge-success',
    metrics: {
      subscriptionsFound: '12,847',
      saved: '$847K',
      accuracy: '96%'
    },
    features: [
      'Works with any bank PDF or CSV',
      'Finds subscriptions you forgot about',
      'Catches annual renewals before they hit',
      'Shows spending trends',
      'Export to spreadsheet'
    ],
    pricing: 'Free',
    url: '/tools/subscription-tracker',
    cta: 'Find My Subscriptions',
    internal: true
  },
  {
    id: 'cre-hacker',
    name: 'CRE Investment Tool',
    story: 'My lifelong friend invests in a very specific type of commercial property. He challenged me: "Build me the ultimate tool for my exact investment strategy." So I did.',
    description: 'Custom-built for a specific CRE investment strategy. Monitors deals, scores opportunities, handles the entire workflow.',
    icon: Building2,
    color: 'from-blue-500 to-indigo-500',
    status: 'Private Beta',
    statusColor: 'badge-primary',
    metrics: {
      dealsAnalyzed: '3,847',
      portfolioValue: '$47M',
      accuracy: '94%'
    },
    features: [
      'Built for one specific investment type',
      'Monitors 50+ broker emails automatically',
      'Scores deals based on proven criteria',
      'Sends alerts only for 90+ scores',
      'Complete investment workflow'
    ],
    pricing: 'Custom',
    url: '#',
    cta: 'By Invitation Only'
  },
  {
    id: 'auto-broker',
    name: 'Auto Broker Assistant',
    story: 'A broker I\'ve bought cars from reached out: "I\'m drowning in inventory updates and missing deals for my clients." Built him a tool that watches everything so he doesn\'t have to.',
    description: 'Monitors dealer inventory, tracks price changes, and alerts when the perfect car hits the market.',
    icon: Car,
    color: 'from-green-500 to-emerald-500',
    status: 'In Development',
    statusColor: 'badge-default',
    metrics: {
      inventoryTracked: '147K',
      priceDropsCaught: '8,492',
      perfectMatches: '2,847'
    },
    features: [
      'Watches multiple dealer systems',
      'Tracks price drops in real-time',
      'Matches cars to client wishlists',
      'Sends instant alerts',
      'Negotiation leverage data'
    ],
    pricing: 'Custom',
    url: '#',
    cta: 'Coming Soon'
  },
  {
    id: 'communications-hub',
    name: 'Communications Hub',
    story: 'I was drowning in notifications - email, Slack, Twitter, texts. Built my own command center that shows everything in one place. Now I never miss what matters.',
    description: 'My personal command center. All communications in one dashboard - email, Slack, social feeds, everything.',
    icon: MessageSquare,
    color: 'from-indigo-500 to-purple-500',
    status: 'Personal Use',
    statusColor: 'badge-secondary',
    metrics: {
      messagesProcessed: '847K',
      responseTime: '< 2min',
      platforms: '12'
    },
    features: [
      'Unified inbox for everything',
      'Smart notification filtering',
      'Priority message detection',
      'Quick actions across platforms',
      'Daily digest summaries'
    ],
    pricing: 'Not Available',
    url: '#',
    cta: 'My Personal Tool'
  },
  {
    id: 'arbitrage-scanner',
    name: 'Marketplace Arbitrage',
    story: 'Started as a personal tool to find underpriced items online. Made $12K in the first month. Friends begged me to share it.',
    description: 'Scans marketplaces for pricing inefficiencies. Buy low here, sell high there.',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    status: 'Coming Soon',
    statusColor: 'badge-default',
    metrics: {
      opportunitiesFound: '28K',
      avgROI: '37%',
      totalProfit: '$487K'
    },
    features: [
      'Cross-platform price comparison',
      'ROI calculations with fees',
      'Automated purchase workflows',
      'Inventory management',
      'Profit tracking'
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
      <div className="container-wide mb-16">
        <h1 className="h1 mb-4">The Tools I'm Building</h1>
        <p className="text-xl text-secondary max-w-3xl">
          Each tool starts with a real person, a real problem, and a late-night text: "Can you build something that..."
        </p>
        <p className="text-lg text-muted mt-4 max-w-3xl">
          Some are live. Some are in development. Some are private. All of them solve actual problems.
        </p>
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
                        <p className="text-secondary mb-3">{tool.description}</p>
                        {tool.story && (
                          <p className="text-sm text-muted italic">{tool.story}</p>
                        )}
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
                      {Object.entries(tool.metrics).map(([key, value]) => {
                        const metricLabels: Record<string, string> = {
                          subscriptionsFound: 'subscriptions found',
                          saved: 'saved',
                          accuracy: 'accuracy',
                          dealsAnalyzed: 'deals analyzed',
                          portfolioValue: 'portfolio value',
                          inventoryTracked: 'cars tracked',
                          priceDropsCaught: 'price drops caught',
                          perfectMatches: 'perfect matches',
                          messagesProcessed: 'messages processed',
                          responseTime: 'avg response',
                          platforms: 'platforms',
                          opportunitiesFound: 'opportunities found',
                          avgROI: 'avg ROI',
                          totalProfit: 'total profit'
                        }
                        
                        const label = metricLabels[key] || key
                        const isGreen = key.includes('saved') || key.includes('profit') || key.includes('ROI')
                        
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-sm">
                              <span className={`font-semibold ${isGreen ? 'text-green-500' : 'text-primary'}`}>{value}</span>
                              <span className="text-muted"> {label}</span>
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="lg:border-l border-default lg:pl-8">
                    <div className="mb-6">
                      <div className="text-sm text-muted mb-2">Starting at</div>
                      <div className="text-3xl font-bold text-primary">{tool.pricing}</div>
                    </div>

                    {tool.status === 'Coming Soon' || tool.status === 'In Development' ? (
                      <button className="btn btn-secondary w-full mb-4" disabled>
                        <Clock className="w-4 h-4 mr-2" />
                        {tool.cta}
                      </button>
                    ) : tool.status === 'Personal Use' || tool.status === 'Private Beta' ? (
                      <button className="btn btn-secondary w-full mb-4" disabled>
                        {tool.cta}
                      </button>
                    ) : tool.internal ? (
                      <Link
                        href={tool.url}
                        className="btn btn-primary w-full mb-4"
                      >
                        {tool.cta}
                      </Link>
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
                      <Link href="/blog" className="text-sm text-blue-500 hover:text-blue-400">
                        Follow the build story →
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
          <h2 className="h3 mb-4">Got a Problem That Needs Solving?</h2>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            The best tools come from real problems. If you're drowning in something repetitive, 
            losing money to inefficiency, or just know there's a better way - let's talk.
          </p>
          <a href="mailto:aaron@aarongreenberg.net" className="btn btn-primary">
            Tell Me Your Problem
          </a>
        </div>
      </div>
    </div>
  )
}