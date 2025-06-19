import { Scissors, Sparkles, Heart, Palette } from "lucide-react"
import { Card, CardContent } from "../ui/card"

export default function ServicesPreview() {
  const services = [
    {
      icon: Scissors,
      title: "Hair Care",
      description: "Professional cuts, styling, and treatments",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Sparkles,
      title: "Facial & Skincare",
      description: "Rejuvenating facials and skin treatments",
      color: "from-rose-500 to-rose-600",
    },
    {
      icon: Heart,
      title: "Massage Therapy",
      description: "Relaxing and therapeutic massage services",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Palette,
      title: "Beauty & Makeup",
      description: "Professional makeup and beauty services",
      color: "from-emerald-500 to-emerald-600",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          From haircuts to spa treatments, we offer a complete range of beauty and wellness services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
