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
                I'm not here to automate humans out of the loop. I'm here to amplify the parts of work that matter—the thinking, 
                the building, the connecting—by taking care of the rest.
              </p>
              <p>
                If your business feels stuck in busywork, there's probably a tool I'm already building to fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Building Section */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow">
          <h2 className="h2 mb-8">What I'm Building Now</h2>
          <p className="text-lg text-secondary mb-8">
            At ScatterbrainAI, I'm developing a growing portfolio of focused, opinionated tools—each one crafted to solve 
            a specific problem cleanly and powerfully.
          </p>
          <div className="space-y-6">
            <div className="border-l-2 border-default pl-6">
              <h3 className="font-normal text-primary mb-2">Subscription Tracker</h3>
              <p className="text-secondary">Take control of recurring expenses with AI-powered detection and optimization</p>
            </div>
            <div className="border-l-2 border-default pl-6">
              <h3 className="font-normal text-primary mb-2">CRE Lead Research</h3>
              <p className="text-secondary">AI-powered commercial real estate opportunity finder that scores deals and sends alerts</p>
            </div>
            <div className="border-l-2 border-default pl-6">
              <h3 className="font-normal text-primary mb-2">AutoBroker Pro</h3>
              <p className="text-secondary">Smart car shopping assistant that monitors inventory and identifies the best deals</p>
            </div>
            <div className="border-l-2 border-default pl-6">
              <h3 className="font-normal text-primary mb-2">Knowledge Ripper</h3>
              <p className="text-secondary">Extract structured data from any document (Coming Soon)</p>
            </div>
          </div>
          <p className="text-secondary mt-8">
            Each tool is fast to use, fast to ship, and built in public. I'm on a mission to create real-world 
            leverage for people who don't have time to waste.
          </p>
        </div>
      </section>

      {/* How I Got Here Section */}
      <section className="py-20">
        <div className="container-narrow">
          <h2 className="h2 mb-12">How I Got Here</h2>
          <div className="prose prose-lg max-w-none text-secondary space-y-6">
            <p>
              I studied film and rhetoric at UC Berkeley, fascinated by how stories shape behavior and how persuasion drives action.
            </p>
            <p>
              That led to 23 years in Hollywood as a triple-guild member (DGA, WGA, SAG)—producing Emmy Award-winning television series, 
              national commercials, music videos, documentaries, and pioneering web series. Running complex post-production teams taught 
              me how to manage chaos, build systems that scale, and translate vision into execution—under pressure, with multi-million 
              dollar budgets, and without excuses.
            </p>
            <p>
              Now, I bring that same battle-tested expertise to software. Each tool I build carries the DNA of that experience: 
              creative, structured, human-centered, and fast.
            </p>
          </div>
        </div>
      </section>

      {/* Original Experience Grid - Hidden */}
      <section className="hidden">
        <div className="container-narrow">
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

      {/* How I Work Section */}
      <section className="py-20">
        <div className="container-narrow">
          <h2 className="h2 mb-12">How I Work</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl text-muted">•</span>
              <p className="text-lg text-secondary">AI is here to serve people—not replace them</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-muted">•</span>
              <p className="text-lg text-secondary">Simple > smart. Clear > clever</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-muted">•</span>
              <p className="text-lg text-secondary">Good tools give back time</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl text-muted">•</span>
              <p className="text-lg text-secondary">Build fast. Ship early. Improve in public.</p>
            </div>
          </div>
          <p className="text-lg text-secondary mt-8">
            My philosophy is radical transparency: no tool is too precious to iterate, no problem too complex to solve.
          </p>
        </div>
      </section>

      {/* When I'm Not Building Section */}
      <section className="py-20 bg-elevated">
        <div className="container-narrow">
          <h2 className="h2 mb-8">When I'm Not Building?</h2>
          <p className="text-lg text-secondary mb-12">
            You'll find me in the mountains or by the ocean—skiing, biking, making music with my family, 
            and living proof that automation isn't about working more, it's about living better.
          </p>
          
          <div className="mt-16 pt-16 border-t border-default text-center">
            <h3 className="h3 mb-4">Let's Connect</h3>
            <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
              If your business feels stuck in busywork, there's probably a tool I'm already building to fix it.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/tools" className="btn btn-secondary btn-lg">
                Explore My Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}