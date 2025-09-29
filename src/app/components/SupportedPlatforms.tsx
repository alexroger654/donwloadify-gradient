import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutubeSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaTwitch, FaVimeo } from 'react-icons/fa6';

const platforms = [
  { name: 'YouTube', icon: <FaYoutubeSquare size={20}/>, color: 'from-red-500 to-red-600', users: '2B+' },
  { name: 'TikTok', icon: <AiFillTikTok size={20} /> , color: 'from-pink-500 to-purple-600', users: '1B+' },
  { name: 'Instagram', icon: <RiInstagramFill size={20} /> , color: 'from-purple-500 to-pink-500', users: '2B+' },
  { name: 'Facebook', icon: <FaFacebook size={20} /> , color: 'from-blue-500 to-blue-600', users: '3B+' },
  { name: 'Twitter', icon: <FaTwitter size={20} /> , color: 'from-sky-400 to-blue-500', users: '450M+' },
  { name: 'LinkedIn', icon: <FaLinkedin size={20} /> , color: 'from-blue-600 to-blue-700', users: '900M+' },
  { name: 'Twitch', icon: <FaTwitch size={20} /> , color: 'from-purple-600 to-purple-700', users: '140M+' },
  { name: 'Vimeo', icon: <FaVimeo size={20} /> , color: 'from-teal-500 to-cyan-600', users: '260M+' },
];

const SupportedPlatforms = () => {
  return (
    <section id="supported-platforms" className="py-20 px-4">
      <div className="max-w-6xl mx-auto"> 
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Supported Platforms
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Download from all major social media and video platforms
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-white/40 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Platform Icon */}
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <span className="text-2xl">{platform.icon}</span>
              </div>

              {/* Platform Info */}
              <h3 className="text-white font-bold text-lg text-center mb-2">
                {platform.name}
              </h3>
              <p className="text-white/70 text-center text-sm">
                {platform.users} users
              </p>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-white/80 mb-6">More platforms coming soon!</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedPlatforms;