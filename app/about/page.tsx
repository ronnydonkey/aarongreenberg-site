import Image from 'next/image'
import Link from 'next/link'
import { 
  Code, 
  Rocket, 
  Brain,
  Target,
  Coffee,
  Mountain,
  ArrowRight
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="container-narrow mb-20">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Profile Image */}
          <div className="mx-auto md:mx-0">
            <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/aaron-profile.jpg"
                alt="Aaron Greenberg"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h1 className="h1 mb-6">About Me</h1>
            <div className="space-y-4 text-lg text-secondary">
              <p>
                Hey, I'm Aaron. I build AI-powered tools that solve real problems 
                in commercial real estate, automotive, and personal finance.
              </p>
              <p>
                I believe in building in public, shipping fast, and learning from users. 
                Every tool I create starts with a problem I've personally experienced.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the outdoors, 
                reading about emerging tech, or working on my next side project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow">
          <h2 className="h2 mb-12 text-center">My Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Started Coding</h3>
                  <p className="text-secondary">
                    Got hooked on programming when I realized I could automate 
                    boring tasks and build things that didn't exist yet.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Discovered AI</h3>
                  <p className="text-secondary">
                    Realized AI could be a force multiplier for solving complex problems. 
                    Started integrating it into every tool I build.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Found My Niche</h3>
                  <p className="text-secondary">
                    Focused on building tools for specific industries where 
                    I saw massive inefficiencies and opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Building in Public</h3>
                  <p className="text-secondary">
                    Started sharing my journey, the wins and the failures. 
                    Building a community of builders and problem solvers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-narrow">
          <h2 className="h2 mb-12 text-center">What Drives Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Coffee className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Simplicity</h3>
              <p className="text-secondary">
                Complex problems don't need complex solutions. 
                I strive to make tools that just work.
              </p>
            </div>
            <div className="text-center">
              <Mountain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Impact</h3>
              <p className="text-secondary">
                Every line of code should create real value. 
                I measure success by problems solved, not features shipped.
              </p>
            </div>
            <div className="text-center">
              <Rocket className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Speed</h3>
              <p className="text-secondary">
                Ship fast, get feedback, iterate. 
                Perfect is the enemy of done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow">
          <div className="card-surface text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <h2 className="h2 mb-4">Let's Connect</h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              I'm always interested in meeting fellow builders, hearing about 
              interesting problems, or exploring collaboration opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/tools" className="btn btn-secondary btn-lg">
                Check Out My Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}