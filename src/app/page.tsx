'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Play,
  Zap,
  Shield,
  Clock,
  Star,
  ChevronDown,
  Check,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Music,
  Globe,
  Youtube,
  Sparkles,
  Heart,
  Users,
  TrendingUp,
  Award,
  Verified
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';

// const platforms = [
//   {
//     name: 'Facebook',
//     icon: Facebook,
//     gradient: 'from-blue-500 via-blue-600 to-indigo-700',
//     bgGradient: 'from-blue-500/20 to-indigo-600/20',
//     borderColor: 'border-blue-500',
//     textColor: 'text-blue-600',
//     hoverGlow: 'hover:shadow-blue-500/50',
//     pageGradient: 'from-blue-400 to-blue-800',
//     users: '2.9B',
//     description: 'Connect with friends'
//   },
//   {
//     name: 'Instagram',
//     icon: Instagram,
//     gradient: 'from-pink-500 via-purple-500 to-orange-500',
//     bgGradient: 'from-pink-500/20 to-purple-600/20',
//     borderColor: 'border-pink-500',
//     textColor: 'text-pink-400',
//     hoverGlow: 'hover:shadow-pink-500/50',
//     pageGradient: 'from-purple-600 via-pink-500 to-orange-500',
//     users: '2.4B',
//     description: 'Share your story'
//   },
//   {
//     name: 'Twitter/X',
//     icon: Twitter,
//     gradient: 'from-gray-700 via-gray-800 to-black',
//     bgGradient: 'from-gray-700/20 to-black/20',
//     borderColor: 'border-gray-600',
//     textColor: 'text-gray-300',
//     hoverGlow: 'hover:shadow-gray-500/50',
//     pageGradient: 'from-blue-900 to-sky-500',
//     users: '450M',
//     description: 'What\'s happening'
//   },
//   {
//     name: 'LinkedIn',
//     icon: Linkedin,
//     gradient: 'from-blue-600 via-blue-700 to-blue-800',
//     bgGradient: 'from-blue-600/20 to-blue-800/20',
//     borderColor: 'border-blue-600',
//     textColor: 'text-blue-400',
//     hoverGlow: 'hover:shadow-blue-600/50',
//     pageGradient: 'from-blue-700 to-blue-900',
//     users: '900M',
//     description: 'Professional network'
//   },
//   {
//     name: 'TikTok',
//     icon: Music,
//     gradient: 'from-red-500 via-pink-500 to-purple-600',
//     bgGradient: 'from-red-500/20 to-purple-600/20',
//     borderColor: 'border-red-500',
//     textColor: 'text-red-400',
//     hoverGlow: 'hover:shadow-red-500/50',
//     pageGradient: 'from-black via-blue-500 to-red-500',
//     users: '1.7B',
//     description: 'For you page'
//   },
//   {
//     name: 'YouTube',
//     icon: Youtube,
//     gradient: 'from-red-500 via-red-600 to-red-700',
//     bgGradient: 'from-red-500/20 to-red-600/20',
//     borderColor: 'border-red-500',
//     textColor: 'text-red-400',
//     hoverGlow: 'hover:shadow-red-500/50',
//     pageGradient: 'from-red-500 to-gray-800',
//     users: '2.7B',
//     description: 'Broadcast yourself'
//   },
// ];







const platforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    gradient: 'from-blue-400 via-sky-500 to-indigo-600',
    bgGradient: 'from-blue-400/20 via-sky-500/20 to-indigo-600/20',
    borderColor: 'border-sky-500',
    textColor: 'text-sky-400',
    hoverGlow: 'hover:shadow-sky-500/50',
    pageGradient: 'from-sky-500 via-blue-600 to-indigo-800',
    users: '2.9B',
    description: 'Connect with friends'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    gradient: 'from-pink-500 via-fuchsia-500 to-orange-400',
    bgGradient: 'from-pink-500/20 via-fuchsia-500/20 to-orange-400/20',
    borderColor: 'border-pink-500',
    textColor: 'text-pink-400',
    hoverGlow: 'hover:shadow-pink-500/50',
    pageGradient: 'from-fuchsia-500 via-pink-500 to-amber-400',
    users: '2.4B',
    description: 'Share your story'
  },
  {
    name: 'Twitter/X',
    icon: Twitter,
    gradient: 'from-sky-400 via-blue-500 to-cyan-400',
    bgGradient: 'from-sky-400/20 via-blue-500/20 to-cyan-400/20',
    borderColor: 'border-sky-400',
    textColor: 'text-sky-300',
    hoverGlow: 'hover:shadow-sky-400/50',
    pageGradient: 'from-slate-900 via-blue-700 to-sky-400',
    users: '450M',
    description: 'What  happening'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
    bgGradient: 'from-sky-500/20 via-blue-600/20 to-indigo-700/20',
    borderColor: 'border-sky-500',
    textColor: 'text-sky-400',
    hoverGlow: 'hover:shadow-sky-500/50',
    pageGradient: 'from-blue-700 via-sky-600 to-indigo-800',
    users: '900M',
    description: 'Professional network'
  },
  {
    name: 'TikTok',
    icon: Music,
    gradient: 'from-black via-fuchsia-500 to-cyan-400',
    bgGradient: 'from-black/80 via-fuchsia-500/20 to-cyan-400/20',
    borderColor: 'border-fuchsia-500',
    textColor: 'text-fuchsia-400',
    hoverGlow: 'hover:shadow-fuchsia-500/50',
    pageGradient: 'from-black via-zinc-900 to-black',
    users: '1.7B',
    description: 'For you page',
  },

  {
    name: 'YouTube',
    icon: Youtube,
    gradient: 'from-red-500 via-rose-600 to-orange-500',
    bgGradient: 'from-red-500/20 via-rose-600/20 to-orange-500/20',
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
    hoverGlow: 'hover:shadow-red-500/50',
    pageGradient: 'from-red-600 via-rose-700 to-zinc-900',
    users: '2.7B',
    description: 'Broadcast yourself'
  },
];

const qualityOptions = [
  { quality: '4K', size: '~500MB', recommended: true, badge: 'Ultra HD' },
  { quality: '1080p', size: '~200MB', recommended: false, badge: 'Full HD' },
  { quality: '720p', size: '~100MB', recommended: false, badge: 'HD' },
  { quality: '480p', size: '~50MB', recommended: false, badge: 'SD' },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Download videos in seconds with our optimized servers and CDN network',
    gradient: 'from-yellow-400 to-orange-500',
    metric: '10x faster'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Enterprise-grade security with no malware, ads, or data collection',
    gradient: 'from-green-400 to-emerald-500',
    metric: '100% safe'
  },
  {
    icon: Clock,
    title: 'No Registration',
    description: 'Start downloading immediately with zero friction or sign-up barriers',
    gradient: 'from-blue-400 to-cyan-500',
    metric: '0 seconds'
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Support for MP4, MP3, WebM and various quality options up to 8K',
    gradient: 'from-purple-400 to-pink-500',
    metric: '15+ formats'
  }
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Content Creator',
    avatar: 'AC',
    rating: 5,
    text: 'Downloadify is a game-changer! The interface is incredibly intuitive and the download speeds are phenomenal. Perfect for my content workflow.',
    gradient: 'from-pink-500 to-purple-600',
    verified: true,
    followers: '2.3M'
  },
  {
    name: 'Maya Rodriguez',
    role: 'Social Media Manager',
    avatar: 'MR',
    rating: 5,
    text: 'I manage 50+ client accounts and this tool saves me hours daily. The quality options and batch processing are exactly what I needed.',
    gradient: 'from-blue-500 to-cyan-600',
    verified: true,
    followers: '890K'
  },
  {
    name: 'Jordan Kim',
    role: 'Digital Marketer',
    avatar: 'JK',
    rating: 5,
    text: 'Finally, a downloader that actually works flawlessly! Clean interface, no sketchy ads, and lightning-fast downloads. Highly recommended!',
    gradient: 'from-green-500 to-teal-600',
    verified: true,
    followers: '1.2M'
  }
];

const faqs = [
  {
    question: 'Is Downloadify completely free to use?',
    answer: 'Yes! Downloadify is 100% free with no hidden charges, subscription fees, or premium tiers. We believe in providing unrestricted access to video downloading.',
    icon: Heart
  },
  {
    question: 'What video qualities and formats are supported?',
    answer: 'We support multiple qualities from 480p to 8K (when available), in formats including MP4, MP3, WebM, and more. Quality depends on the original video source.',
    icon: Award
  },
  {
    question: 'Do I need to create an account or register?',
    answer: 'Absolutely not! No registration, no email verification, no personal information required. Just paste your link and start downloading instantly.',
    icon: Zap
  },
  {
    question: 'How secure and safe is the platform?',
    answer: 'We prioritize your security with enterprise-grade protection, no malware, zero ads, and we never collect or store your personal data or download history.',
    icon: Shield
  }
];

const stats = [
  { number: '50M+', label: 'Videos Downloaded', icon: Download },
  { number: '2.3M+', label: 'Happy Users', icon: Users },
  { number: '99.9%', label: 'Success Rate', icon: TrendingUp },
  { number: '24/7', label: 'Availability', icon: Clock },
];

export default function App() {
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePlatformSelect = (platformName: string) => {
    setSelectedPlatform(platformName);
    setShowResults(false);
  };

  const handleAnalyze = async () => {
    if (!url.trim() || !selectedPlatform) return;

    setIsAnalyzing(true);
    // Simulate API call with realistic timing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsDownloading(false);
    console.log(`Downloaded ${selectedQuality} quality video from ${selectedPlatform}!`);
  };

  const selectedPlatformData = platforms.find(p => p.name === selectedPlatform);

  // Get the background gradient based on selected platform
  const getBackgroundGradient = () => {
    if (!selectedPlatformData) {
      return 'from-gray-900 via-purple-900/20 to-pink-900/20';
    }
    return selectedPlatformData.pageGradient;
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Enhanced Dynamic Animated Background */}
      <motion.div
        className="fixed inset-0 z-0"
        key={selectedPlatform}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 ease-in-out`} />
        {!selectedPlatform && (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-green-900/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(34,197,94,0.1),transparent_50%)]" />
          </>
        )}

        {/* Enhanced floating orbs with platform colors */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-1/4 left-1/4 w-64 h-64 ${selectedPlatformData
            ? `bg-gradient-to-r ${selectedPlatformData.gradient}`
            : 'bg-gradient-to-r from-pink-500/10 to-purple-500/10'
            } rounded-full blur-3xl opacity-20 transition-all duration-1000`}
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${selectedPlatformData
            ? `bg-gradient-to-r ${selectedPlatformData.gradient}`
            : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
            } rounded-full blur-3xl opacity-20 transition-all duration-1000`}
        />

        {/* Additional ambient particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className={`absolute w-2 h-2 ${selectedPlatformData
              ? `bg-gradient-to-r ${selectedPlatformData.gradient}`
              : 'bg-gradient-to-r from-white/20 to-white/10'
              } rounded-full blur-sm opacity-40`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced Header with glassmorphism */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-14 h-14 ${selectedPlatformData
                    ? `bg-gradient-to-r ${selectedPlatformData.gradient}`
                    : 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600'
                    } rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-1000 ease-in-out`}
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
                  {/* <motion.span
                    className="bg-gradient-to-r text-4xl  font-bold from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block mt-2"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Downloadify
                  </motion.span> */}
                  {/* <span className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">

                    Downloadify
                  </span> */}
                  <span className="text-4xl font-bold text-white">

                    Downloadify
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300 font-medium">Premium Experience</span>
                  </div>
                </div>
              </motion.div>

              <nav className="hidden md:flex space-x-8">
                {['Features', 'How it works', 'Testimonials', 'FAQ'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 relative group font-medium"
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

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-200">Trusted by 2.3M+ creators worldwide</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Download Videos
              <motion.span
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block mt-2"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                From Anywhere
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            The most advanced video downloader with lightning-fast speeds, premium quality options,
            and support for all major platforms. Experience the future of content downloading.
          </motion.p>

          {/* Enhanced Platform Selection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-10">
              <h3 className="text-3xl font-bold text-white">
                Choose Your Platform
              </h3>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlatformSelect(platform.name)}
                  className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-500 border-2 backdrop-blur-sm ${selectedPlatform === platform.name
                    ? `${platform.borderColor} bg-gradient-to-br ${platform.bgGradient} shadow-2xl ${platform.hoverGlow} shadow-lg`
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${platform.gradient} flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className={`font-bold text-lg mb-2 text-white`}>
                    {platform.name}
                  </h4>
                  <p className="text-sm  mb-2">{platform.description}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="w-3 h-3 " />
                    <span className="text-xs  font-medium">{platform.users}</span>
                  </div>

                  {selectedPlatform === platform.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced URL Input */}
          <AnimatePresence>
            {selectedPlatform && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-16"
              >
                <div className={`p-6 bg-white/10 backdrop-blur-xl rounded-3xl border-2 ${selectedPlatformData?.borderColor} shadow-2xl`}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="url"
                        placeholder={`Paste your ${selectedPlatform} video URL here...`}
                        value={url}
                        onChange={(e: any) => setUrl(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-white/70 text-lg h-14 rounded-2xl focus:ring-2 focus:ring-transparent focus:border-transparent transition-all duration-300 "
                      />
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      disabled={!url.trim() || isAnalyzing}
                      className={`bg-gradient-to-r ${selectedPlatformData?.gradient} hover:shadow-xl ${selectedPlatformData?.hoverGlow} text-white px-10 py-4 h-14 rounded-2xl font-bold text-lg transition-all duration-300  min-w-[180px]`}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-6 h-6" />
                          </motion.div>
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-6 h-6" />
                          <span>Analyze Video</span>
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-center space-x-6 text-sm ">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>100% Safe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Lightning Fast</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span>Always Free</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Results Section */}
          <AnimatePresence>
            {showResults && selectedPlatformData && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <Card className={`bg-white/10 backdrop-blur-xl border-2 ${selectedPlatformData.borderColor} shadow-2xl rounded-3xl overflow-hidden`}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6 mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${selectedPlatformData.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-3xl font-bold text-white mb-2">Video Ready!</h3>
                        <p className={`text-lg ${selectedPlatformData.textColor}`}>Choose your preferred quality and format</p>
                      </div>
                      <div className="ml-auto">
                        <div className="flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2">
                          <Verified className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Verified</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {qualityOptions.map((option) => (
                        <motion.div
                          key={option.quality}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedQuality(option.quality)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm ${selectedQuality === option.quality
                            ? `${selectedPlatformData.borderColor} bg-gradient-to-br ${selectedPlatformData.bgGradient} shadow-lg`
                            : 'border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10'
                            }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">{option.quality}</div>
                            <div className="text-sm  mb-2">{option.size}</div>
                            <Badge className={`text-xs ${option.recommended ? `bg-gradient-to-r ${selectedPlatformData.gradient} text-white` : 'bg-gray-600 text-gray-300'}`}>
                              {option.badge}
                            </Badge>
                            {option.recommended && (
                              <div className="mt-2">
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                                  Recommended
                                </Badge>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className={`w-full bg-gradient-to-r ${selectedPlatformData.gradient} hover:shadow-2xl ${selectedPlatformData.hoverGlow} text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 disabled:opacity-50`}
                    >
                      {isDownloading ? (
                        <div className="flex items-center justify-center space-x-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Download className="w-6 h-6" />
                          </motion.div>
                          <span>Downloading...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-3">
                          <Download className="w-6 h-6" />
                          <span>Download Video ({selectedQuality})</span>
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className=" font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-200">Premium Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced video downloading platform with enterprise-grade features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center group hover:border-pink-500/50 transition-all duration-500 hover:bg-white/10"
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  whileHover={{
                    boxShadow: "0 0 40px rgba(236,72,153,0.4)"
                  }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-400 font-bold text-sm">{feature.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How It <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Download any video in just three simple steps with our streamlined process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Choose Platform',
                description: 'Select your preferred social media platform from our comprehensive list of supported services',
                gradient: 'from-pink-500 to-purple-600',
                icon: Globe
              },
              {
                step: '02',
                title: 'Paste & Analyze',
                description: 'Copy your video link and our AI-powered system will instantly analyze all available download options',
                gradient: 'from-purple-500 to-blue-600',
                icon: Zap
              },
              {
                step: '03',
                title: 'Download',
                description: 'Choose your preferred quality and format, then download instantly to your device with lightning speed',
                gradient: 'from-blue-500 to-cyan-600',
                icon: Download
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:bg-white/10">
                  <motion.div
                    className={`w-24 h-24 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 relative`}
                    whileHover={{
                      boxShadow: "0 0 50px rgba(236,72,153,0.5)"
                    }}
                  >
                    <span className="text-3xl font-bold text-white absolute">{item.step}</span>
                    <item.icon className="w-8 h-8 text-white/50 absolute bottom-2 right-2" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
                </div>

                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 opacity-50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-medium text-gray-200">Loved by Creators</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Users <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join millions of satisfied creators who trust Downloadify for their content needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:bg-white/10"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold mr-4 shadow-xl text-xl`}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(236,72,153,0.5)"
                    }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Verified className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <p className="text-sm  mb-1">{testimonial.role}</p>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 " />
                      <span className="text-xs ">{testimonial.followers} followers</span>
                    </div>
                  </div>
                </div>

                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section id="faq" className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about Downloadify
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <faq.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-pink-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-gray-300 text-lg leading-relaxed ml-16">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-6 py-16 bg-black/30 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                className={`w-16 h-16 ${selectedPlatformData
                  ? `bg-gradient-to-r ${selectedPlatformData.gradient}`
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600'
                  } rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-1000 ease-in-out`}
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
                <span className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Downloadify
                </span>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300 font-medium">Premium Experience</span>
                </div>
              </div>
            </div>
            <p className=" mb-6 text-lg">
              The worlds most advanced video downloading platform
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm ">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Always Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>2.3M+ Users</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm ">
              © 2024 Downloadify. All rights reserved. Made with ❤️ for creators worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}