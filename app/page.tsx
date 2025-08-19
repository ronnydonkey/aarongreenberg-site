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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-light mb-12">
                <span className="text-primary">Hi, I'm Aaron. I solve problems. That's what I do.</span>
              </h1>
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
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>
                <Image
                  src="/aaron-greenberg.jpg"
                  alt="Aaron Greenberg"
                  width={400}
                  height={400}
                  className="relative rounded-2xl shadow-2xl border border-white/10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Expansion */}
      <section className="py-20 bg-elevated">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-6">
              For 23 years, I solved them in Hollywood—story problems, technical problems, workflow problems, people problems, impossible-deadline problems.
            </p>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed mb-6">
              Now I solve them with code.
            </p>
            <p className="text-2xl md:text-3xl font-light text-primary">
              Same brain. Same approach. Different tools.
            </p>
          </div>
        </div>
      </section>

      {/* What I'm Building */}
      <section className="py-20 bg-elevated">
        <div className="container-wide">
          <div className="mb-12">
            <h2 className="h2 mb-4">What I'm Building</h2>
            <p className="text-xl text-secondary">
              Currently shipping ScatterbrainAI and a suite of tools that solve the problems that waste your time. 
              Building in public every morning from 9am-noon. You can watch me figure things out in real-time.
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

      {/* The Work */}
      <section className="py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="h2 mb-8">The Work</h2>
            <p className="text-xl text-secondary mb-6">Problems I've solved recently:</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Built an AI that analyzes bank statements and finds hidden subscriptions with 95% accuracy</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Automated a workflow that saved a client $50K/month in manual processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Debugged a system that everyone said couldn't be fixed (it was a CORS issue)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Shipped working code while everyone else was still in meetings</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section className="py-20 bg-elevated">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="h2 mb-8">The Approach</h2>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              I don't overthink it. I don't overcomplicate it. I look at what's broken, figure out why, 
              then fix it. Sometimes that's code. Sometimes it's process. Sometimes it's just pointing 
              out that the problem isn't what everyone thinks it is.
            </p>
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

      {/* The Call */}
      <section className="py-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container-wide text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-primary">
            Got a problem? Let's solve it.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="mailto:aaron@aarongreenberg.net" className="btn btn-primary btn-lg">
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </Link>
            <Link href="/tools" className="btn btn-secondary btn-lg">
              Explore Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}