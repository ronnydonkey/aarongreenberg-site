'use client'

import Link from 'next/link'
import { Check, X, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Free Demo',
    price: '$0',
    period: 'forever',
    description: 'Try before you buy',
    features: [
      'Demo data only',
      'See all features',
      'No credit card required',
      'Limited to demo mode'
    ],
    notIncluded: [
      'Upload your own data',
      'Save your analysis',
      'Export reports'
    ],
    cta: 'Try Demo',
    ctaLink: '/tools/subscription-tracker',
    popular: false
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals',
    features: [
      'Full Subscription Tracker access',
      'Unlimited bank statement uploads',
      'All subscription detection features',
      'Export to CSV',
      'Email support',
      '7-day money-back guarantee'
    ],
    notIncluded: [
      'API access',
      'Team collaboration',
      'White-label options'
    ],
    cta: 'Start Free Trial',
    ctaLink: '/tools/subscription-tracker',
    popular: true
  },
  {
    name: 'Pro Bundle',
    price: '$79',
    period: '/month',
    description: 'All tools, one price',
    features: [
      'Everything in Starter',
      'Early access to new tools',
      'Arbitrage Scanner (when launched)',
      'Priority support',
      'API access',
      'Custom integrations',
      'White-label options'
    ],
    notIncluded: [],
    cta: 'Join Waitlist',
    ctaLink: 'mailto:aaron@aarongreenberg.net?subject=Pro Bundle Interest',
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="container-wide py-20">
      <div className="text-center mb-16">
        <h1 className="h1 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Start with a free demo. Upgrade when you're ready. Cancel anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card-surface relative ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-black px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-8">
              <h3 className="h3 mb-2">{plan.name}</h3>
              <p className="text-secondary mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-secondary">{plan.period}</span>
              </div>

              <Link
                href={plan.ctaLink}
                className={`btn w-full mb-6 ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                <p className="text-sm font-medium text-primary mb-3">Included:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-secondary">{feature}</span>
                  </div>
                ))}
                
                {plan.notIncluded.length > 0 && (
                  <>
                    <div className="pt-3 mt-3 border-t border-slate-800">
                      <p className="text-sm font-medium text-muted mb-3">Not included:</p>
                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Section */}
      <div className="card-surface p-8 text-center mb-16">
        <h2 className="h2 mb-4">Need Something Custom?</h2>
        <p className="text-secondary mb-6 max-w-2xl mx-auto">
          Building tools for specific industries or unique workflows. Let's discuss your needs.
        </p>
        <Link href="mailto:aaron@aarongreenberg.net" className="btn btn-primary">
          Contact for Custom Solutions
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="h2 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="card-surface p-6">
            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-secondary">
              Yes! Cancel anytime from your account dashboard. You'll keep access until the end of your billing period.
            </p>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-semibold mb-2">What's your refund policy?</h3>
            <p className="text-secondary">
              All paid plans come with a 7-day money-back guarantee. Not happy? Get a full refund, no questions asked.
            </p>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-semibold mb-2">Is my financial data secure?</h3>
            <p className="text-secondary">
              Absolutely. We use bank-level encryption for all data. Your financial information is never sold or shared.
              Read our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details.
            </p>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-semibold mb-2">When will other tools launch?</h3>
            <p className="text-secondary">
              We're building based on demand. Join the waitlist for tools you're interested in, and we'll notify you when they're ready.
            </p>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-semibold mb-2">Do you offer annual billing?</h3>
            <p className="text-secondary">
              Not yet, but it's coming soon. Annual plans will include 2 months free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}