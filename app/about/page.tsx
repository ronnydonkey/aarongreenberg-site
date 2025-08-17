import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Main Content */}
      <section className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start mb-20">
          {/* Profile Image */}
          <div className="mx-auto md:mx-0">
            <div className="relative w-[280px] h-[280px] overflow-hidden">
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
            <h1 className="h1 mb-6">Aaron Greenberg</h1>
            <p className="text-xl text-secondary mb-6">
              23 years in Hollywood (DGA, WGA, SAG). Emmy Award-winning producer. 
              Now building AI tools that give people their time back.
            </p>
            <p className="text-lg text-secondary mb-8">
              I studied film and rhetoric at UC Berkeley. Spent two decades managing chaos in production. 
              Now I build tools at ScatterbrainAI that eliminate friction and help teams run faster.
            </p>
            <div className="space-y-2 text-lg text-secondary mb-8">
              <p>• AI serves people—not replaces them</p>
              <p>• Simple &gt; smart. Clear &gt; clever</p>
              <p>• Good tools give back time</p>
              <p>• Ship fast. Learn in public</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools" className="btn btn-primary">
                See What I'm Building
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-default pt-12 max-w-2xl mx-auto text-center">
          <p className="text-lg text-secondary">
            When I'm not building? You'll find me in the mountains or by the ocean—skiing, biking, 
            making music with my family. Living proof that automation isn't about working more, 
            it's about living better.
          </p>
        </div>
      </section>
    </div>
  )
}