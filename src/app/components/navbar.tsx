import { useState, useEffect } from 'react';
import { Download, Menu, X, Home, Info, Mail, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#features', label: 'Features', icon: Download },
    { href: '#about', label: 'About', icon: Info },
    { href: '#privacy', label: 'Privacy', icon: Shield },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
   
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl border  border-white/20 p-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-14 h-14 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-1000 ease-in-out`}
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(236,72,153,0.4)",
                      "0 0 50px rgba(168,85,247,0.5)",
                      "0 0 30px rgba(236,72,153,0.4)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Download className="w-8 h-8 text-white" />
                </motion.div>
                <div>

                  <span className="text-xl font-bold text-white">

                    Downloadify
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300 font-medium">Premium Experience</span>
                  </div>
                </div>
              </motion.div>

              <nav className="hidden md:flex space-x-8 mr-4">
                {['Features', 'How it works', 'Testimonials', 'FAQ'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white hover:scale-105  transition-all duration-300 relative group font-semibold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </motion.header>
  );
}