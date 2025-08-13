import { Suspense } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SearchForm from './components/SearchForm'
import PopularHotels from './components/PopularHotels'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Loading from './components/Loading'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-12">
          <Suspense fallback={<Loading />}>
            <SearchForm />
          </Suspense>
          
          <PopularHotels />
          <Features />
          <Testimonials />
        </div>
      </main>

      <Footer />
    </div>
  )
}