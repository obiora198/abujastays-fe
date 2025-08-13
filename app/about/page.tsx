import React from 'react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About AbujaStays</h1>
      
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <Image
          src="/about-hero.jpg"
          alt="About AbujaStays"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="prose max-w-none">
        <h2>Our Story</h2>
        <p>
          Founded in 2023, AbujaStays was born out of a passion for connecting travelers with
          the best accommodations in Nigeria's capital city. We noticed a gap in the market
          for a platform that truly understands the unique needs of visitors to Abuja.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          To simplify hotel booking in Abuja while providing exceptional value and service.
          We partner with only the most reputable hotels and apartments to ensure your stay
          is comfortable, safe, and memorable.
        </p>
        
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Local expertise on Abuja's best neighborhoods</li>
          <li>Exclusive deals you won't find elsewhere</li>
          <li>24/7 customer support</li>
          <li>Verified reviews from real guests</li>
          <li>Best price guarantee</li>
        </ul>
        
        <h2>Our Team</h2>
        <p>
          Our team of Abuja natives and hospitality experts work tirelessly to ensure you
          have the perfect stay. From business travelers to vacationing families, we
          understand every visitor's unique needs.
        </p>
      </div>
    </div>
  )
}