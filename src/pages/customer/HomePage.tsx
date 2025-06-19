import HeroSection from "../../components/customer/HeroSection"
import FeaturedSalons from "../../components/customer/FeaturedSalons"
import ServicesPreview from "../../components/customer/ServicesPreview"

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <FeaturedSalons />
      <ServicesPreview />
    </div>
  )
}
