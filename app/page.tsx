import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Pricing from '@/components/Pricing'
import LeadForm from '@/components/LeadForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Pricing />
      <LeadForm />
      <Footer />
    </main>
  )
}
