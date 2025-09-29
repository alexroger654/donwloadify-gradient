import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    avatar: '👨‍💻',
    rating: 5,
    text: 'This is literally the best video downloader ever! Super fast and works with everything 🚀',
    platform: 'Downloaded from YouTube',
    gradient: 'from-blue-400 to-purple-500',
  },
  {
    name: 'Sarah Johnson',
    avatar: '👩‍🎨',
    rating: 5,
    text: 'Love how clean and easy this is to use. Downloaded my TikTok videos in seconds! ✨',
    platform: 'Downloaded from TikTok',
    gradient: 'from-pink-400 to-red-500',
  },
  {
    name: 'Mike Rodriguez',
    avatar: '👨‍🚀',
    rating: 5,
    text: 'Finally a downloader that actually works! No ads, no BS, just pure functionality 💯',
    platform: 'Downloaded from Instagram',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Emma Davis',
    avatar: '👩‍💼',
    rating: 5,
    text: 'Perfect for saving educational content from LinkedIn. Quality is amazing! 📚',
    platform: 'Downloaded from LinkedIn',
    gradient: 'from-teal-400 to-blue-500',
  },
  {
    name: 'Jake Wilson',
    avatar: '👨‍🎮',
    rating: 5,
    text: 'Been using this for months to save gaming clips. Never failed me once! 🎮',
    platform: 'Downloaded from Twitch',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    name: 'Sophie Lee',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'As a content creator, this saves me so much time. Highly recommend! 🎬',
    platform: 'Downloaded from Vimeo',
    gradient: 'from-cyan-400 to-teal-500',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What Users Say
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of happy users who trust our service daily
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-white/40 group relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Rating */}
              <div className="flex items-center mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/90 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-xl`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-white/70 text-sm">{testimonial.platform}</div>
                  </div>
                </div>
                
                {/* Verified Badge */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                  <span className="text-green-400 text-xs font-semibold">✓ Verified</span>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Trusted by Users Worldwide</h3>
            <p className="text-white/80">Over 500,000 happy customers and counting!</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;