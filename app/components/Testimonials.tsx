import React from "react";

export default function Testimonials() {
    const testimonials = [
      {
        quote: 'Found the perfect hotel for my business trip. The booking process was seamless!',
        author: 'James O.',
        role: 'Business Traveler',
      },
      {
        quote: 'Great selection of hotels in Abuja. The prices were better than other platforms.',
        author: 'Amina B.',
        role: 'Tourist',
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }