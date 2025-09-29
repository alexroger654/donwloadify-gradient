import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-white/20">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{background: 'linear-gradient(108deg, rgba(0, 158, 226, .9) -57.13%, #8b2fff 11.08%, rgba(245, 5, 79, .9) 102.57%)'}}
              >
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-white">VideoGrab</h3>
            </div>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              The fastest, most reliable way to download videos from any platform. 
              Free, secure, and unlimited downloads forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">How It Works</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Supported Platforms</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">DMCA</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/20">
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Github className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Mail className="w-5 h-5 text-white" />
            </a>
          </div>

          <div className="flex items-center space-x-2 text-white/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>by VideoGrab Team</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
          <p className="text-white/60">
            © 2024 VideoGrab. All rights reserved. Download responsibly and respect copyright laws.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;