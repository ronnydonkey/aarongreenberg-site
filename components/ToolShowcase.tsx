import Link from 'next/link'
import { Building2, Car, CreditCard, ArrowRight } from 'lucide-react'

const tools = [
  {
    id: 'subscription-tracker',
    name: 'Subscription Tracker',
    description: 'Find hidden subscriptions in your bank statements',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    status: 'Live',
    url: '/tools/subscription-tracker',
    internal: true
  },
  {
    id: 'cre-investment',
    name: 'CRE Investment Tool',
    description: 'Custom-built for a specific investment strategy',
    icon: Building2,
    color: 'from-blue-500 to-indigo-500',
    status: 'Private Beta',
    url: '/tools'
  },
  {
    id: 'auto-broker',
    name: 'Auto Broker Assistant',
    description: 'Watches inventory so brokers don\'t have to',
    icon: Car,
    color: 'from-green-500 to-emerald-500',
    status: 'In Development',
    url: '/tools'
  }
]

export default function ToolShowcase({ featured = false }: { featured?: boolean }) {
  const displayTools = featured ? tools.slice(0, 3) : tools

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayTools.map((tool) => {
        const Icon = tool.icon
        const isClickable = tool.status === 'Live'
        
        const content = (
          <div className={`card-surface ${isClickable ? 'card-hover' : 'opacity-75'} h-full`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className={`badge ${
                tool.status === 'Live' ? 'badge-success' : 
                tool.status === 'Private Beta' ? 'badge-secondary' : 
                tool.status === 'In Development' ? 'badge-default' : 
                'badge-primary'
              }`}>
                {tool.status}
              </span>
            </div>
            <h3 className="h4 mb-2">{tool.name}</h3>
            <p className="text-secondary mb-4">{tool.description}</p>
            <div className="flex items-center text-blue-500 font-medium">
              {tool.status === 'Live' ? 'Try It Now' : 'View Story'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        )

        if (!isClickable || tool.url === '/tools') {
          return (
            <Link key={tool.id} href="/tools" className="block">
              {content}
            </Link>
          )
        }

        if (tool.internal) {
          return (
            <Link key={tool.id} href={tool.url} className="block">
              {content}
            </Link>
          )
        }

        return (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {content}
          </a>
        )
      })}
    </div>
  )
}