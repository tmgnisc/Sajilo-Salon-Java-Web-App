import { HeroSection } from "@/components/customer/hero-section"
import { FeaturedSalons } from "@/components/customer/featured-salons"
import { ServicesPreview } from "@/components/customer/services-preview"

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <FeaturedSalons />
      <ServicesPreview />
    </div>
  )
}
