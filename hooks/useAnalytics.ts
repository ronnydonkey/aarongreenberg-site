'use client'

import { useEffect } from 'react'

type AnalyticsEvent = {
  event: string
  tool?: string
  properties?: Record<string, any>
}

export function useAnalytics() {
  const track = (event: AnalyticsEvent) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event)
    }
    
    // You can add real analytics here later (e.g., PostHog, Mixpanel, GA4)
    // For now, we'll just collect basic metrics
    
    // Store events in localStorage for beta metrics
    try {
      const storedEvents = localStorage.getItem('beta-analytics') || '[]'
      const events = JSON.parse(storedEvents)
      events.push({
        ...event,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
      })
      
      // Keep only last 100 events to prevent localStorage bloat
      if (events.length > 100) {
        events.splice(0, events.length - 100)
      }
      
      localStorage.setItem('beta-analytics', JSON.stringify(events))
    } catch (error) {
      console.error('Failed to store analytics:', error)
    }
  }
  
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('analytics-session-id', sessionId)
    }
    return sessionId
  }
  
  // Track page views
  useEffect(() => {
    track({
      event: 'page_view',
      properties: {
        path: window.location.pathname,
        referrer: document.referrer
      }
    })
  }, [])
  
  return { track }
}

// Common events for easy tracking
export const ANALYTICS_EVENTS = {
  // Subscription Tracker events
  DEMO_STARTED: 'demo_started',
  WAITLIST_OPENED: 'waitlist_opened',
  WAITLIST_JOINED: 'waitlist_joined',
  FILE_UPLOAD_STARTED: 'file_upload_started',
  FILE_UPLOAD_SUCCESS: 'file_upload_success',
  FILE_UPLOAD_ERROR: 'file_upload_error',
  SUBSCRIPTION_ADDED: 'subscription_added',
  SUBSCRIPTION_REMOVED: 'subscription_removed',
  TAB_SWITCHED: 'tab_switched',
  UPGRADE_CLICKED: 'upgrade_clicked',
  
  // General tool events
  TOOL_VIEWED: 'tool_viewed',
  TOOL_DEMO_CLICKED: 'tool_demo_clicked',
  TOOL_WAITLIST_CLICKED: 'tool_waitlist_clicked'
}