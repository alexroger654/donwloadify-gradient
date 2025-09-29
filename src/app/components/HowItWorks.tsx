import React from 'react';
import { MousePointer, Link, Download } from 'lucide-react';

const steps = [
  {
    icon: MousePointer,
    title: 'Select Platform',
    description: 'Choose from YouTube, TikTok, Instagram, Facebook, and more',
    color: 'from-blue-400 to-purple-500',
  },
  {
    icon: Link,
    title: 'Paste URL',
    description: 'Copy and paste your video link into our smart analyzer',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Download,
    title: 'Download Video',
    description: 'Choose your preferred quality and download instantly',
    color: 'from-pink-500 to-red-500',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it%20works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Download videos in just 3 simple steps. No registration required!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0"></div>
              )}
              
              <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 group-hover:border-white/40">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.description}</p>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;