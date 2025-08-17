import Link from 'next/link'
import { Twitter, Linkedin, Github, Mail, Heart } from 'lucide-react'

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/aarongreenberg' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/aarongreenberg' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/aarongreenberg' },
  { name: 'Email', icon: Mail, href: 'mailto:aaron@aarongreenberg.net' }
]

const footerLinks = [
  {
    title: 'Tools',
    links: [
      { label: 'CRE Lead Research', href: 'https://scatterbrainai.com/cre-tool' },
      { label: 'AutoBroker Pro', href: 'https://scatterbrainai.com/auto-broker' },
      { label: 'Subscription Tracker', href: 'https://scatterbrainai.com/subscription-tracker' },
      { label: 'All Tools', href: '/tools' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { label: 'Twitter', href: 'https://twitter.com/aarongreenberg' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/aarongreenberg' },
      { label: 'GitHub', href: 'https://github.com/aarongreenberg' },
      { label: 'Email', href: 'mailto:aaron@aarongreenberg.net' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-elevated border-t border-default">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-xl text-primary hover:text-blue-500 transition-colors">
              Aaron Greenberg
            </Link>
            <p className="text-sm text-muted mt-2">
              Building AI tools that solve real problems.
            </p>
            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-primary mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors"
                      {...(link.href.startsWith('http') ? {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-default">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Aaron Greenberg. All rights reserved.
            </p>
            <p className="text-sm text-muted flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500" /> and lots of coffee
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}