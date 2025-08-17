import Image from 'next/image'
import Link from 'next/link'
import { 
  Brain, 
  Rocket, 
  Code, 
  Sparkles,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail
} from 'lucide-react'
import BuildFeed from '@/components/BuildFeed'
import ToolShowcase from '@/components/ToolShowcase'

const socialLinks = [
  { name: 'Twitter/X', icon: Twitter, href: 'https://twitter.com/aarongreenberg', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/aarongreenberg', color: 'hover:text-blue-600' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/aarongreenberg', color: 'hover:text-gray-400' },
  { name: 'Email', icon: Mail, href: 'mailto:aaron@aarongreenberg.net', color: 'hover:text-green-500' }
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="container-wide relative">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="text-primary">Aaron Greenberg</span>
              <span className="block text-3xl md:text-4xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Redefining How Businesses Leverage AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed max-w-3xl">
              Triple-guild member (DGA, WGA, SAG) with 23 years of elite production experience, 
              now building AI solutions that liberate businesses from soul-crushing busywork.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/tools" className="btn btn-primary btn-lg">
                Explore My Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/blog" className="btn btn-secondary btn-lg">
                Read Build Log
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted hover:text-primary transition-colors ${link.color}`}
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Building */}
      <section className="py-20 bg-elevated">
        <div className="container-wide">
          <div className="mb-12">
            <h2 className="h2 mb-4">Current Projects</h2>
            <p className="text-xl text-secondary">
              AI-powered tools that save time and money. Available individually or as a suite.
            </p>
          </div>
          <ToolShowcase featured />
          <div className="mt-8 text-center">
            <Link href="/tools" className="btn btn-secondary">
              View All Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Build in Public */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            <div>
              <div className="mb-8">
                <h2 className="h2 mb-4">Building in Public</h2>
                <p className="text-secondary">
                  Raw updates from my coding sessions. The wins, the bugs, and everything in between.
                </p>
              </div>
              <BuildFeed limit={5} />
              <div className="mt-8">
                <Link href="/blog" className="text-blue-500 hover:text-blue-400 font-medium">
                  View all updates →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Stats */}
              <div className="card-surface">
                <h3 className="h4 mb-6">Progress Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Tools Built</span>
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Total Users</span>
                    <span className="text-2xl font-bold text-primary">1,247</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Money Saved</span>
                    <span className="text-2xl font-bold text-green-500">$3.2M</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-muted">Lines of Code</span>
                    <span className="text-2xl font-bold text-primary">47K</span>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="card-surface bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <h3 className="h4 mb-4">Get Updates</h3>
                <p className="text-sm text-secondary mb-4">
                  Weekly insights on building AI tools and growing a SaaS business.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input w-full"
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-muted mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow text-center">
          <h2 className="h2 mb-8">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card-surface">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="h4 mb-2">Solve Real Problems</h3>
              <p className="text-secondary">
                Every tool starts with a problem I actually have. No solutions looking for problems.
              </p>
            </div>
            <div className="card-surface">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="h4 mb-2">Ship Fast, Learn Faster</h3>
              <p className="text-secondary">
                Launch MVPs quickly, get user feedback, iterate. Perfect is the enemy of shipped.
              </p>
            </div>
            <div className="card-surface">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="h4 mb-2">AI as a Multiplier</h3>
              <p className="text-secondary">
                Use AI to augment human capabilities, not replace them. Make the complex simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="card-surface text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <Code className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="h2 mb-4">Let's Build Something Together</h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Got a problem that needs solving? I'm always looking for interesting challenges.
              Let's chat about how AI can help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:aaron@aarongreenberg.net"
                className="btn btn-primary btn-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
              <Link href="/tools" className="btn btn-secondary btn-lg">
                Try My Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}