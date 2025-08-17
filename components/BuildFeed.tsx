'use client'

import { useState, useEffect } from 'react'
import { 
  Sparkles, 
  GitCommit, 
  Rocket, 
  Bug, 
  Zap,
  TrendingUp,
  MessageSquare,
  Heart
} from 'lucide-react'

interface BuildUpdate {
  id: string
  type: 'feature' | 'fix' | 'improvement' | 'milestone' | 'thought'
  title: string
  content: string
  tool?: string
  metrics?: string
  reactions?: number
  timestamp: string
}

const typeConfig = {
  feature: { icon: Sparkles, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  fix: { icon: Bug, color: 'text-red-500', bg: 'bg-red-500/10' },
  improvement: { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  milestone: { icon: Rocket, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  thought: { icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' }
}

export default function BuildFeed({ 
  limit = 10, 
  showMetrics = true,
  allowReactions = true 
}: {
  limit?: number
  showMetrics?: boolean
  allowReactions?: boolean
}) {
  const [updates, setUpdates] = useState<BuildUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API/database
    // For now, using mock data
    const mockUpdates: BuildUpdate[] = [
      {
        id: '1',
        type: 'feature',
        title: 'Added email monitoring to CRE Tool',
        content: 'Now automatically scanning 50+ broker emails for new deals. Already found 3 properties that match our criteria!',
        tool: 'CRE Tool',
        metrics: '+125 leads in 7 days',
        reactions: 24,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'milestone',
        title: '1000 searches on AutoBroker! 🎉',
        content: 'We just hit 1000 car searches. Average user saves $3,200. Not bad for a side project!',
        tool: 'AutoBroker',
        metrics: '$3.2M in total savings',
        reactions: 45,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        type: 'fix',
        title: 'Fixed CSV parsing bug',
        content: 'Some bank statements were failing to parse. Turns out different banks use different date formats. Who knew? Fixed now.',
        tool: 'Subscription Tracker',
        reactions: 12,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        type: 'thought',
        title: 'Should I add Notion integration?',
        content: 'Thinking about adding Notion export for the Knowledge Ripper. Would you use it? Let me know!',
        tool: 'Knowledge Ripper',
        reactions: 31,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        type: 'improvement',
        title: 'Dark mode is here!',
        content: 'Finally added dark mode to all tools. Your eyes can thank me later. Light mode still available for the brave.',
        reactions: 67,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    setTimeout(() => {
      setUpdates(mockUpdates.slice(0, limit))
      setLoading(false)
    }, 1000)
  }, [limit])

  const handleReaction = (updateId: string) => {
    setUpdates(updates.map(update => 
      update.id === updateId 
        ? { ...update, reactions: (update.reactions || 0) + 1 }
        : update
    ))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'just now'
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card-surface animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => {
        const config = typeConfig[update.type]
        const Icon = config.icon
        
        return (
          <div key={update.id} className="card-surface animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-primary line-clamp-2">
                      {update.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted">
                      {update.tool && (
                        <>
                          <span className="font-medium">{update.tool}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{formatTimestamp(update.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-secondary text-sm mb-3 line-clamp-3">
                  {update.content}
                </p>
                
                <div className="flex items-center gap-4">
                  {showMetrics && update.metrics && (
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {update.metrics}
                      </span>
                    </div>
                  )}
                  
                  {allowReactions && (
                    <button
                      onClick={() => handleReaction(update.id)}
                      className="flex items-center gap-1 text-sm text-muted hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{update.reactions || 0}</span>
                    </button>
                  )}
                  
                  <button className="text-sm text-blue-500 hover:text-blue-400 font-medium ml-auto">
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}