import React from 'react';
import { Zap, Shield, Heart, Sparkles, Clock, HardDrive } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Download videos in seconds with our optimized servers',
    color: 'from-yellow-400 to-orange-500',
    stat: '3x faster',
  },
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Your privacy is protected with encrypted connections',
    color: 'from-green-400 to-emerald-500',
    stat: 'SSL encrypted',
  },
  {
    icon: Heart,
    title: 'Completely Free',
    description: 'No hidden fees, no subscriptions, forever free',
    color: 'from-pink-400 to-red-500',
    stat: '$0 forever',
  },
  {
    icon: Sparkles,
    title: 'HD Quality',
    description: 'Download in original quality up to 4K resolution',
    color: 'from-purple-400 to-indigo-500',
    stat: 'Up to 4K',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Our service works around the clock, anytime you need',
    color: 'from-blue-400 to-cyan-500',
    stat: '99.9% uptime',
  },
  {
    icon: HardDrive,
    title: 'No Limits',
    description: 'Download unlimited videos without any restrictions',
    color: 'from-teal-400 to-green-500',
    stat: 'Unlimited',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose Us?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the best video downloading service with these amazing features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-white/40 group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.stat}
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>

              {/* Hover Border Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-white/80">Videos Downloaded</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-white/80">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">8+</div>
              <div className="text-white/80">Platforms Supported</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;