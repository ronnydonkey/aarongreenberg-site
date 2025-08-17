'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // In production, this would send to your email service
    // For now, we'll simulate it
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h1 className="h1 mb-4">Get in Touch</h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12">
          {/* Contact Form */}
          <div className="card-surface">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    required
                    className="input w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="label">Subject</label>
                <input
                  type="text"
                  required
                  className="input w-full"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div>
                <label className="label">Message</label>
                <textarea
                  required
                  rows={6}
                  className="input w-full resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card-surface">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Email</h3>
                  <a href="mailto:aaron@aarongreenberg.net" className="text-secondary hover:text-blue-500">
                    aaron@aarongreenberg.net
                  </a>
                </div>
              </div>
            </div>

            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Social</h3>
                  <p className="text-secondary text-sm mb-2">
                    For quick questions or just to connect:
                  </p>
                  <div className="space-y-1">
                    <a href="https://twitter.com/aarongreenberg" target="_blank" rel="noopener noreferrer" 
                       className="block text-sm text-secondary hover:text-blue-500">
                      Twitter/X: @aarongreenberg
                    </a>
                    <a href="https://linkedin.com/in/aarongreenberg" target="_blank" rel="noopener noreferrer"
                       className="block text-sm text-secondary hover:text-blue-500">
                      LinkedIn: /in/aarongreenberg
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-surface bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <h3 className="font-semibold text-primary mb-2">Working Together</h3>
              <p className="text-sm text-secondary mb-3">
                I'm open to:
              </p>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Consulting on AI/SaaS projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Building custom tools for specific needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Speaking at events about building in public</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Partnering on interesting problems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}