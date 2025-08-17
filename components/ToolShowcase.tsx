import Link from 'next/link'
import { Building2, Car, CreditCard, FileText, ArrowRight } from 'lucide-react'

const tools = [
  {
    id: 'cre-research',
    name: 'CRE Lead Research',
    description: 'Find commercial real estate deals automatically',
    icon: Building2,
    color: 'from-blue-500 to-indigo-500',
    status: 'Live',
    url: 'https://scatterbrainai.com/cre-tool'
  },
  {
    id: 'autobroker',
    name: 'AutoBroker Pro',
    description: 'AI-powered car shopping assistant',
    icon: Car,
    color: 'from-green-500 to-emerald-500',
    status: 'Beta',
    url: 'https://scatterbrainai.com/auto-broker'
  },
  {
    id: 'subscription-tracker',
    name: 'Subscription Tracker',
    description: 'Manage and optimize recurring expenses',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-500',
    status: 'Live',
    url: 'https://scatterbrainai.com/subscription-tracker'
  },
  {
    id: 'knowledge-ripper',
    name: 'Knowledge Ripper',
    description: 'Extract insights from any document',
    icon: FileText,
    color: 'from-orange-500 to-red-500',
    status: 'Coming Soon',
    url: '#'
  }
]

export default function ToolShowcase({ featured = false }: { featured?: boolean }) {
  const displayTools = featured ? tools.slice(0, 3) : tools

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayTools.map((tool) => {
        const Icon = tool.icon
        const isComingSoon = tool.status === 'Coming Soon'
        
        const content = (
          <div className={`card-surface ${!isComingSoon ? 'card-hover' : 'opacity-75'} h-full`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className={`badge ${
                tool.status === 'Live' ? 'badge-success' : 
                tool.status === 'Beta' ? 'badge-primary' : 
                'badge-default'
              }`}>
                {tool.status}
              </span>
            </div>
            <h3 className="h4 mb-2">{tool.name}</h3>
            <p className="text-secondary mb-4">{tool.description}</p>
            <div className="flex items-center text-blue-500 font-medium">
              {isComingSoon ? 'Notify Me' : 'Learn More'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        )

        if (isComingSoon) {
          return <div key={tool.id}>{content}</div>
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