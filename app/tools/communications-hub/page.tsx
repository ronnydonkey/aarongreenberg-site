'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, 
  MessageSquare, 
  Twitter, 
  Phone,
  Bell,
  Filter,
  Search,
  Check,
  Clock,
  Star,
  Archive,
  Send,
  Zap,
  AlertCircle,
  Hash,
  AtSign,
  Users,
  Calendar,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  Inbox,
  Settings,
  Link,
  BellOff,
  Volume2,
  Smartphone,
  Globe,
  X,
  Plus,
  FolderOpen,
  Sparkles as SparklesIcon,
  Briefcase,
  UserCircle,
  Palette
} from 'lucide-react'
import toast from 'react-hot-toast'

// Platform types
type Platform = 'email' | 'slack' | 'twitter' | 'sms' | 'discord' | 'telegram'
type Priority = 'urgent' | 'high' | 'normal' | 'low'

interface Message {
  id: string
  platform: Platform
  from: string
  fromName?: string
  subject?: string
  preview: string
  content?: string
  timestamp: Date
  isRead: boolean
  isStarred: boolean
  priority: Priority
  labels?: string[]
  thread?: string[]
  channel?: string
  replyCount?: number
}

// Mock data for demo
const mockMessages: Message[] = [
  {
    id: '1',
    platform: 'email',
    from: 'client@company.com',
    fromName: 'Sarah Chen',
    subject: 'Re: Project Timeline Update',
    preview: 'Thanks for the update. Can we schedule a call this week to discuss the Phase 2 deliverables?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    isRead: false,
    isStarred: true,
    priority: 'high',
    labels: ['client', 'project-alpha']
  },
  {
    id: '2',
    platform: 'slack',
    from: 'engineering',
    channel: '#engineering',
    preview: '@aaron The API integration is ready for review. PR #234 is up.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    isRead: false,
    isStarred: false,
    priority: 'urgent',
    labels: ['dev', 'review-needed'],
    replyCount: 3
  },
  {
    id: '3',
    platform: 'twitter',
    from: '@techfounder',
    preview: 'Just saw your thread on AI tools. Would love to chat about potential collaboration!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    isRead: true,
    isStarred: false,
    priority: 'normal',
    labels: ['opportunity']
  },
  {
    id: '4',
    platform: 'sms',
    from: '+1 (555) 123-4567',
    fromName: 'Gary',
    preview: 'Website looks great! Already got 3 inquiries this morning 🚀',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    isRead: true,
    isStarred: false,
    priority: 'normal',
    labels: ['client-feedback']
  },
  {
    id: '5',
    platform: 'email',
    from: 'noreply@stripe.com',
    fromName: 'Stripe',
    subject: 'Weekly Revenue Report',
    preview: 'Your revenue last week was $12,847.32 (+23% from previous week)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: true,
    isStarred: false,
    priority: 'low',
    labels: ['finance', 'automated']
  },
  {
    id: '6',
    platform: 'slack',
    from: 'design',
    channel: '#design-reviews',
    preview: 'New mockups for the onboarding flow are ready. Feedback needed by EOD.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    isRead: false,
    isStarred: false,
    priority: 'high',
    labels: ['design', 'feedback-needed']
  }
]

// Platform config
const platformConfig = {
  email: { icon: Mail, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  slack: { icon: Hash, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  twitter: { icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  sms: { icon: Phone, color: 'text-green-500', bg: 'bg-green-500/10' },
  discord: { icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  telegram: { icon: Send, color: 'text-cyan-500', bg: 'bg-cyan-500/10' }
}

export default function CommunicationsHubPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [notificationPrefs, setNotificationPrefs] = useState({
    desktop: true,
    sound: false,
    mobile: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  })
  const [platformConnections, setPlatformConnections] = useState({
    email: { connected: true, accounts: ['aaron@aarongreenberg.net'] },
    slack: { connected: true, workspaces: ['Acme Corp', 'Side Projects'] },
    twitter: { connected: false, accounts: [] },
    sms: { connected: true, numbers: ['+1 (555) 123-4567'] },
    discord: { connected: false, servers: [] },
    telegram: { connected: false, accounts: [] }
  })
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({
    platform: 'email' as Platform,
    to: '',
    subject: '',
    message: ''
  })

  // Platform stats
  const platformStats = messages.reduce((acc, msg) => {
    if (!acc[msg.platform]) {
      acc[msg.platform] = { total: 0, unread: 0 }
    }
    acc[msg.platform].total++
    if (!msg.isRead) acc[msg.platform].unread++
    return acc
  }, {} as Record<Platform, { total: number; unread: number }>)

  // Filtered messages
  const filteredMessages = messages.filter(msg => {
    if (selectedPlatform !== 'all' && msg.platform !== selectedPlatform) return false
    if (filterPriority !== 'all' && msg.priority !== filterPriority) return false
    if (showUnreadOnly && msg.isRead) return false
    if (searchQuery && !msg.preview.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !msg.fromName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !msg.subject?.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true)
      setTimeout(() => setIsRefreshing(false), 1000)
    }, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('search-input')?.focus()
      }
      // Escape to close message
      if (e.key === 'Escape' && selectedMessage) {
        setSelectedMessage(null)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedMessage])

  const handleMarkAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ))
  }

  const handleToggleStar = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ))
  }

  const handleArchive = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
    toast.success('Message archived')
  }

  const handleQuickReply = (message: Message) => {
    toast.success(`Opening ${message.platform} to reply...`)
    // In real app, would open the appropriate platform
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-500/10'
      case 'high': return 'text-orange-500 bg-orange-500/10'
      case 'normal': return 'text-blue-500 bg-blue-500/10'
      case 'low': return 'text-slate-500 bg-slate-500/10'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-base">
      {/* Header */}
      <div className="border-b border-default">
        <div className="container-wide py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Inbox className="w-8 h-8" />
                Communications Hub
              </h1>
              <p className="text-secondary mt-1">All your messages in one place</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompose(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Compose
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="btn btn-secondary"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={() => {
                  setIsRefreshing(true)
                  setTimeout(() => setIsRefreshing(false), 1000)
                }}
                className={`btn btn-secondary ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.entries(platformConfig).map(([platform, config]) => {
              const stats = platformStats[platform as Platform] || { total: 0, unread: 0 }
              const Icon = config.icon
              
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(selectedPlatform === platform ? 'all' : platform as Platform)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPlatform === platform 
                      ? 'border-primary bg-elevated' 
                      : 'border-default hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    {stats.unread > 0 && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        {stats.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium capitalize">{platform}</p>
                  <p className="text-xs text-muted">{stats.total} total</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-6">
        <div className="grid lg:grid-cols-[400px,1fr] gap-6">
          {/* Sidebar - Message List */}
          <div className="border border-default rounded-lg overflow-hidden">
            {/* Smart Folders */}
            <div className="p-4 border-b border-default">
              <p className="text-xs font-medium text-muted uppercase mb-3">Smart Folders</p>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-elevated transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Urgent</span>
                  </div>
                  <span className="text-xs text-muted">{messages.filter(m => m.priority === 'urgent' && !m.isRead).length}</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-elevated transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Starred</span>
                  </div>
                  <span className="text-xs text-muted">{messages.filter(m => m.isStarred).length}</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-elevated transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Work</span>
                  </div>
                  <span className="text-xs text-muted">{messages.filter(m => m.labels?.includes('client') || m.labels?.includes('project-alpha')).length}</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-elevated transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Personal</span>
                  </div>
                  <span className="text-xs text-muted">0</span>
                </button>
              </div>
            </div>
            {/* Filters */}
            <div className="p-4 border-b border-default space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search messages... (⌘K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
                  className="select flex-1"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
                
                <button
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={`btn ${showUnreadOnly ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message List */}
            <div className="divide-y divide-default max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-muted">
                  <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                filteredMessages.map((message) => {
                  const PlatformIcon = platformConfig[message.platform].icon
                  
                  return (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message)
                        handleMarkAsRead(message.id)
                      }}
                      className={`p-4 hover:bg-elevated cursor-pointer transition-colors ${
                        !message.isRead ? 'bg-blue-500/5' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-elevated' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${platformConfig[message.platform].bg}`}>
                          <PlatformIcon className={`w-4 h-4 ${platformConfig[message.platform].color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-medium truncate ${!message.isRead ? 'text-primary' : 'text-secondary'}`}>
                              {message.fromName || message.from}
                            </p>
                            <span className="text-xs text-muted">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                          
                          {message.subject && (
                            <p className={`text-sm truncate mb-1 ${!message.isRead ? 'font-medium' : ''}`}>
                              {message.subject}
                            </p>
                          )}
                          
                          <p className="text-sm text-secondary truncate">
                            {message.preview}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            {message.isStarred && (
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(message.priority)}`}>
                              {message.priority}
                            </span>
                            {message.labels?.map((label) => (
                              <span key={label} className="text-xs text-muted">
                                #{label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="border border-default rounded-lg">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                {/* Message Header */}
                <div className="p-6 border-b border-default">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        {selectedMessage.fromName || selectedMessage.from}
                      </h2>
                      {selectedMessage.subject && (
                        <p className="text-secondary">{selectedMessage.subject}</p>
                      )}
                      <p className="text-sm text-muted mt-1">
                        {selectedMessage.timestamp.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStar(selectedMessage.id)}
                        className="p-2 hover:bg-elevated rounded-lg transition-colors"
                      >
                        <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                      </button>
                      <button
                        onClick={() => handleArchive(selectedMessage.id)}
                        className="p-2 hover:bg-elevated rounded-lg transition-colors"
                      >
                        <Archive className="w-4 h-4 text-muted" />
                      </button>
                      <button className="p-2 hover:bg-elevated rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`text-sm px-3 py-1 rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority} priority
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedMessage.labels?.map((label) => (
                        <span key={label} className="text-sm text-muted">
                          #{label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 p-6">
                  <p className="text-secondary whitespace-pre-wrap">
                    {selectedMessage.content || selectedMessage.preview}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="p-6 border-t border-default">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleQuickReply(selectedMessage)}
                      className="btn btn-primary"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Reply in {selectedMessage.platform}
                    </button>
                    <button className="btn btn-secondary">
                      <Clock className="w-4 h-4 mr-2" />
                      Snooze
                    </button>
                    <button className="btn btn-secondary">
                      <Users className="w-4 h-4 mr-2" />
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <MessageSquare className="w-16 h-16 text-muted mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">No message selected</p>
                  <p className="text-sm text-muted">
                    Choose a message from the list to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Daily Digest */}
        <div className="mt-8 border border-default rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Daily Digest
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold">{messages.filter(m => !m.isRead).length}</p>
              <p className="text-sm text-muted">Unread messages</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{messages.filter(m => m.priority === 'urgent' || m.priority === 'high').length}</p>
              <p className="text-sm text-muted">High priority</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2.3min</p>
              <p className="text-sm text-muted">Avg response time</p>
            </div>
            <div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted">Platforms connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-base border border-default max-w-lg w-full rounded-lg">
            <div className="p-6 border-b border-default flex items-center justify-between">
              <h2 className="text-xl font-semibold">New Message</h2>
              <button
                onClick={() => setShowCompose(false)}
                className="text-muted hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              toast.success(`Message sent via ${composeData.platform}!`)
              setShowCompose(false)
              setComposeData({ platform: 'email', to: '', subject: '', message: '' })
            }} className="p-6 space-y-4">
              <div>
                <label className="label">Platform</label>
                <select
                  value={composeData.platform}
                  onChange={(e) => setComposeData({ ...composeData, platform: e.target.value as Platform })}
                  className="select w-full"
                >
                  {Object.entries(platformConnections).map(([platform, status]) => (
                    <option key={platform} value={platform} disabled={!status.connected}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      {!status.connected && ' (Not connected)'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="label">
                  {composeData.platform === 'email' ? 'To' : 
                   composeData.platform === 'slack' ? 'Channel/User' :
                   composeData.platform === 'sms' ? 'Phone Number' :
                   'Recipient'}
                </label>
                <input
                  type="text"
                  required
                  value={composeData.to}
                  onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                  className="input w-full"
                  placeholder={
                    composeData.platform === 'email' ? 'email@example.com' :
                    composeData.platform === 'slack' ? '#channel or @username' :
                    composeData.platform === 'sms' ? '+1 (555) 123-4567' :
                    '@username'
                  }
                />
              </div>
              
              {composeData.platform === 'email' && (
                <div>
                  <label className="label">Subject</label>
                  <input
                    type="text"
                    required
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="input w-full"
                    placeholder="Email subject"
                  />
                </div>
              )}
              
              <div>
                <label className="label">Message</label>
                <textarea
                  required
                  value={composeData.message}
                  onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                  className="input w-full h-32 resize-none"
                  placeholder="Type your message..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="flex-1 py-3 border border-default rounded-lg hover:bg-elevated transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-base border border-default max-w-2xl w-full rounded-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-default flex items-center justify-between">
              <h2 className="text-xl font-semibold">Communications Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-muted hover:text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Platform Connections */}
              <div className="p-6 border-b border-default">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Platform Connections
                </h3>
                <div className="space-y-4">
                  {Object.entries(platformConnections).map(([platform, status]) => {
                    const config = platformConfig[platform as Platform]
                    const Icon = config.icon
                    
                    return (
                      <div key={platform} className="flex items-center justify-between p-4 border border-default rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${config.bg}`}>
                            <Icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          <div>
                            <p className="font-medium capitalize">{platform}</p>
                            <p className="text-sm text-muted">
                              {status.connected ? (
                                platform === 'email' ? status.accounts.join(', ') :
                                platform === 'slack' ? status.workspaces.join(', ') :
                                platform === 'sms' ? status.numbers.join(', ') :
                                'Connected'
                              ) : 'Not connected'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (status.connected) {
                              toast.success(`Disconnected from ${platform}`)
                              setPlatformConnections(prev => ({
                                ...prev,
                                [platform]: { ...prev[platform as Platform], connected: false }
                              }))
                            } else {
                              toast.success(`Connect to ${platform} (integration coming soon)`)
                            }
                          }}
                          className={`btn ${status.connected ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          {status.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Notification Preferences */}
              <div className="p-6 border-b border-default">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span>Desktop Notifications</span>
                    <input
                      type="checkbox"
                      checked={notificationPrefs.desktop}
                      onChange={(e) => setNotificationPrefs(prev => ({ ...prev, desktop: e.target.checked }))}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span>Sound Alerts</span>
                    <input
                      type="checkbox"
                      checked={notificationPrefs.sound}
                      onChange={(e) => setNotificationPrefs(prev => ({ ...prev, sound: e.target.checked }))}
                      className="toggle"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span>Mobile Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={notificationPrefs.mobile}
                      onChange={(e) => setNotificationPrefs(prev => ({ ...prev, mobile: e.target.checked }))}
                      className="toggle"
                    />
                  </label>
                  
                  <div className="border-t border-default pt-4">
                    <label className="flex items-center justify-between mb-3">
                      <span>Quiet Hours</span>
                      <input
                        type="checkbox"
                        checked={notificationPrefs.quietHours}
                        onChange={(e) => setNotificationPrefs(prev => ({ ...prev, quietHours: e.target.checked }))}
                        className="toggle"
                      />
                    </label>
                    
                    {notificationPrefs.quietHours && (
                      <div className="flex gap-3 ml-4">
                        <div>
                          <label className="text-sm text-muted">Start</label>
                          <input
                            type="time"
                            value={notificationPrefs.quietStart}
                            onChange={(e) => setNotificationPrefs(prev => ({ ...prev, quietStart: e.target.value }))}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted">End</label>
                          <input
                            type="time"
                            value={notificationPrefs.quietEnd}
                            onChange={(e) => setNotificationPrefs(prev => ({ ...prev, quietEnd: e.target.value }))}
                            className="input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Smart Filters */}
              <div className="p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Smart Filters
                </h3>
                <div className="space-y-3">
                  <div className="p-4 border border-default rounded-lg">
                    <p className="font-medium mb-2">VIP Contacts</p>
                    <p className="text-sm text-muted mb-3">Always notify for messages from these contacts</p>
                    <button className="btn btn-secondary btn-sm">Manage VIP List</button>
                  </div>
                  
                  <div className="p-4 border border-default rounded-lg">
                    <p className="font-medium mb-2">Keyword Alerts</p>
                    <p className="text-sm text-muted mb-3">Get notified when messages contain specific keywords</p>
                    <button className="btn btn-secondary btn-sm">Configure Keywords</button>
                  </div>
                  
                  <div className="p-4 border border-default rounded-lg">
                    <p className="font-medium mb-2">Auto-Archive Rules</p>
                    <p className="text-sm text-muted mb-3">Automatically archive messages based on rules</p>
                    <button className="btn btn-secondary btn-sm">Set Up Rules</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-default">
              <button
                onClick={() => {
                  setShowSettings(false)
                  toast.success('Settings saved!')
                }}
                className="btn btn-primary w-full"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}