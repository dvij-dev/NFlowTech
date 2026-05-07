import Hero from '@/components/sections/Hero'
import LogoMarquee from '@/components/sections/LogoMarquee'
import ServicesOverview from '@/components/sections/ServicesOverview'
import FeaturedCaseStudies from '@/components/sections/FeaturedCaseStudies'
import HowWeWork from '@/components/sections/HowWeWork'
import Testimonial from '@/components/sections/Testimonial'
import Industries from '@/components/sections/Industries'

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesOverview />
      <FeaturedCaseStudies />
      <HowWeWork />
      <Testimonial />
      <Industries />
    </>
  )
}
