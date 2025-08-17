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
                I'm Aaron Greenberg, and I'm redefining how businesses leverage AI to reclaim their most valuable asset: time.
              </p>
              <p>
                As a triple-guild member of the DGA, WGA, and SAG, I bring 23 years of elite production experience to the AI revolution. 
                My credits span Emmy Award-winning television series, national commercials, music videos, documentaries, and pioneering 
                web series—a body of work that represents mastery of narrative, workflow, and complex creative systems at the highest 
                levels of entertainment.
              </p>
              <p>
                Today, I channel this unparalleled production expertise into building AI solutions that liberate businesses from 
                soul-crushing busywork. My unique vision: technology should amplify human creativity, not replace it. Every tool 
                I develop, every automation strategy I implement, serves a singular mission—giving people back their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Bio Section */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow">
          <div className="prose prose-lg max-w-none text-secondary space-y-4">
            <p>
              As both developer and consultant, I help forward-thinking companies implement intelligent marketing campaigns, 
              custom AI tools, and workflow automations that transform operations. My approach isn't theoretical—it's 
              battle-tested through decades of delivering under impossible deadlines with multi-million dollar budgets on the line.
            </p>
            <p>
              My philosophy is radical transparency: building in public, shipping fast, learning constantly. 
              I believe no tool is too precious to iterate, no problem too complex to solve.
            </p>
            <p>
              Currently dedicating 90% of my focus to AI development while maintaining select production projects, 
              I represent a new breed of technologist—one who understands that the future isn't about choosing between 
              human creativity and artificial intelligence, but orchestrating them in perfect harmony.
            </p>
            <p>
              When I'm not revolutionizing workflows, you'll find me in the mountains—living proof that automation 
              isn't about working more, it's about living better.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container-narrow">
          <h2 className="h2 mb-12 text-center">My Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-surface">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">23 Years in Production</h3>
                  <p className="text-secondary">
                    Emmy Award-winning television, national commercials, music videos, 
                    documentaries—mastering complex creative systems.
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
                  <h3 className="font-semibold text-primary mb-2">Triple Guild Member</h3>
                  <p className="text-secondary">
                    DGA, WGA, SAG—bringing elite entertainment industry expertise 
                    to the intersection of creativity and technology.
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
                  <h3 className="font-semibold text-primary mb-2">AI Revolution</h3>
                  <p className="text-secondary">
                    Channeling production expertise into AI solutions that 
                    liberate businesses from soul-crushing busywork.
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
                  <h3 className="font-semibold text-primary mb-2">Radical Transparency</h3>
                  <p className="text-secondary">
                    Building in public, shipping fast, learning constantly. 
                    No tool too precious to iterate, no problem too complex to solve.
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
          <h2 className="h2 mb-12 text-center">My Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Coffee className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Time Liberation</h3>
              <p className="text-secondary">
                Every automation strategy serves a singular mission—giving 
                people back their most valuable asset: time.
              </p>
            </div>
            <div className="text-center">
              <Mountain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Human + AI Harmony</h3>
              <p className="text-secondary">
                Technology should amplify human creativity, not replace it. 
                The future is orchestrating them in perfect balance.
              </p>
            </div>
            <div className="text-center">
              <Rocket className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="h4 mb-2">Battle-Tested Solutions</h3>
              <p className="text-secondary">
                No theoretical approaches—only proven strategies forged through 
                decades of impossible deadlines and real-world pressure.
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