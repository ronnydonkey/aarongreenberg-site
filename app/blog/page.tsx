import BuildFeed from '@/components/BuildFeed'
import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'

// In a real app, this would come from your CMS or MDX files
const blogPosts = [
  {
    slug: 'building-cre-research-tool',
    title: 'How I Built a CRE Deal Finder That Actually Works',
    excerpt: 'The story of building an AI tool that monitors 50+ broker emails and finds commercial real estate deals automatically.',
    date: '2024-01-20',
    readTime: '8 min read',
    tags: ['AI', 'Real Estate', 'Python'],
    featured: true
  },
  {
    slug: 'lessons-from-1000-car-searches',
    title: 'What I Learned from 1000 AutoBroker Searches',
    excerpt: 'Data insights from helping people save $3.2M on car purchases, and how AI changed the game.',
    date: '2024-01-18',
    readTime: '6 min read',
    tags: ['Data', 'Automotive', 'AI']
  },
  {
    slug: 'subscription-creep-is-real',
    title: 'The Average Person Has 12 Forgotten Subscriptions',
    excerpt: 'How I discovered I was wasting $247/month and built a tool to help others find their money leaks.',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['Personal Finance', 'SaaS']
  },
  {
    slug: 'ship-ugly-learn-fast',
    title: 'Ship Ugly, Learn Fast: My Product Philosophy',
    excerpt: 'Why I launch MVPs that make designers cry, and how it helps me build better products.',
    date: '2024-01-10',
    readTime: '7 min read',
    tags: ['Product', 'Startup']
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <h1 className="h1 mb-4">Blog</h1>
          <p className="text-xl text-secondary max-w-3xl">
            Thoughts on building AI tools, growing a SaaS business, and solving real problems with code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          {/* Main Content */}
          <div>
            {/* Featured Post */}
            {blogPosts.filter(p => p.featured).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="card-surface card-hover mb-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <div className="badge badge-best mb-4">Featured</div>
                  <h2 className="h2 mb-3">{post.title}</h2>
                  <p className="text-secondary mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* Recent Posts */}
            <h2 className="h3 mb-6">Recent Posts</h2>
            <div className="space-y-6">
              {blogPosts.filter(p => !p.featured).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="card-surface card-hover">
                    <h3 className="h4 mb-2">{post.title}</h3>
                    <p className="text-secondary mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="badge badge-default text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Build Updates */}
            <div>
              <h3 className="h4 mb-6">Latest Build Updates</h3>
              <BuildFeed limit={5} showMetrics={false} allowReactions={false} />
            </div>

            {/* Tags */}
            <div className="card-surface">
              <h3 className="h4 mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'SaaS', 'Real Estate', 'Automotive', 'Product', 'Python', 'Next.js', 'Personal Finance']
                  .map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                      className="badge badge-default hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="card-surface bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <h3 className="h4 mb-4">Get Weekly Updates</h3>
              <p className="text-sm text-secondary mb-4">
                Join 1,200+ builders getting insights on AI tools and SaaS growth.
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
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}