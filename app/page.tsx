import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PatternPacksSection } from "@/components/pattern-packs-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { SafetySection } from "@/components/safety-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { ReviewsSection } from "@/components/reviews-section"
import { LaunchCTASection } from "@/components/launch-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PatternPacksSection />
      <HowItWorksSection />
      <SafetySection />
      <UseCasesSection />
      <ReviewsSection />
      <LaunchCTASection />
      <Footer />
    </main>
  )
}
