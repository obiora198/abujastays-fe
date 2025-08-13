import React from "react";

export default function Features() {
    const features = [
      {
        title: 'Best Price Guarantee',
        description: 'We guarantee the best prices for hotels in Abuja. Found a better deal? We\'ll match it!',
        icon: '💰',
      },
      {
        title: 'Easy Booking',
        description: 'Simple and fast booking process. Get instant confirmation for your stay.',
        icon: '⚡',
      },
      {
        title: '24/7 Support',
        description: 'Our customer service team is available round the clock to assist you.',
        icon: '📞',
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }