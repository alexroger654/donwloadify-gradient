'use client'
// import React from 'react';
// import Hero from './components/Hero';
// import HowItWorks from './components/HowItWorks';
// import SupportedPlatforms from './components/SupportedPlatforms';
// import Features from './components/Features';
// import Testimonials from './components/Testimonials';

// import Footer from './components/Footer';
// import FloatingShapes from './components/FloatingShapes';
// import FAQ from './components/FAQ';
// import Navbar from './components/navbar';

// function App() {
//   const [selectedPlatform, setSelectedPlatform] = React.useState('');


//   const platformGradients = {
//     'Facebook': 'linear-gradient(135deg, #0e4a82 0%, #1565c0 25%, #0d47a1 75%, #042a5c 100%)',
//     'Instagram': 'linear-gradient(135deg, #5d2a7a 0%, #b8161c 25%, #c7832f 75%, #cc9900 100%)',
//     'Twitter': 'linear-gradient(108deg, rgba(29, 161, 242, 0.9) -57.13%, rgba(91, 112, 131, 0.95) 11.08%, rgba(21, 32, 43, 0.9) 102.57%)',
//     'TikTok': 'linear-gradient(135deg, #99002e 0%, #80004d 33%, #006b80 66%, #138a80 100%)',
//     'LinkedIn': 'linear-gradient(108deg, rgba(0, 119, 181, 0.9) -57.13%, rgba(40, 103, 178, 0.95) 11.08%, rgba(10, 102, 194, 0.9) 102.57%)',
//     'YouTube': 'linear-gradient(135deg, #990000 0%, #660000 50%, #330000 100%)',
//     'Twitch': 'linear-gradient(135deg, #5c2999 0%, #240046 50%, #120026 100%)',
//     'Vimeo': 'linear-gradient(135deg, #0f6b8a 0%, #004466 50%, #002233 100%)'
//   };






//   // Platform-specific gradients
//   // const platformGradients = {
//   //   'Facebook': 'linear-gradient(108deg, rgba(24, 119, 242, 0.9) -57.13%, rgba(66, 103, 178, 0.95) 11.08%, rgba(142, 68, 173, 0.9) 102.57%)',
//   //   'Instagram': 'linear-gradient(108deg, rgba(225, 48, 108, 0.9) -57.13%, rgba(188, 42, 141, 0.95) 11.08%, rgba(81, 91, 212, 0.9) 102.57%)',
//   //   'Twitter': 'linear-gradient(108deg, rgba(29, 161, 242, 0.9) -57.13%, rgba(91, 112, 131, 0.95) 11.08%, rgba(21, 32, 43, 0.9) 102.57%)',
//   //   'TikTok': 'linear-gradient(108deg, rgba(255, 0, 80, 0.9) -57.13%, rgba(0, 240, 255, 0.95) 11.08%, rgba(37, 244, 238, 0.9) 102.57%)',
//   //   'LinkedIn': 'linear-gradient(108deg, rgba(0, 119, 181, 0.9) -57.13%, rgba(40, 103, 178, 0.95) 11.08%, rgba(10, 102, 194, 0.9) 102.57%)',
//   //   'YouTube': 'linear-gradient(108deg, rgba(255, 0, 0, 0.9) -57.13%, rgba(204, 24, 30, 0.95) 11.08%, rgba(136, 14, 79, 0.9) 102.57%)',
//   //   'Twitch': 'linear-gradient(108deg, rgba(145, 70, 255, 0.9) -57.13%, rgba(100, 65, 165, 0.95) 11.08%, rgba(169, 112, 255, 0.9) 102.57%)',
//   //   'Vimeo': 'linear-gradient(108deg, rgba(26, 183, 234, 0.9) -57.13%, rgba(31, 81, 255, 0.95) 11.08%, rgba(64, 224, 208, 0.9) 102.57%)'
//   // };




//     // @ts-ignore
//   const currentGradient = selectedPlatform && platformGradients[selectedPlatform] 
//     // @ts-ignore
//     ? platformGradients[selectedPlatform]
//     // : 'linear-gradient(108deg, rgba(0, 158, 226, .9) -57.13%, #8b2fff 11.08%, rgba(245, 5, 79, .9) 102.57%)';
//     : 'linear-gradient(108deg, rgba(0, 120, 200, 0.93) -57.13%, #7625dd 11.08%, rgba(200, 0, 65, 0.93) 102.57%)';
//   return (
//     <>
//     <Navbar />  
//     <div className="relative min-h-screen overflow-x-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out">
//         <div className="absolute inset-0 opacity-95 transition-all duration-1000 ease-in-out" 
//              style={{background: currentGradient}} />
//         <FloatingShapes />
//       </div>

//       {/* Main Content */}
//       <div className="relative">
//         <Hero selectedPlatform={selectedPlatform} setSelectedPlatform={setSelectedPlatform} />
//         <HowItWorks />
//         <SupportedPlatforms />
//         <Features />
//         <Testimonials />
//         <FAQ />
//         <Footer />
//       </div>
//     </div>
//     </>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { Video, Image, Film, TrendingUp, Tv, RotateCcw, Eye } from 'lucide-react';

export default function InstagramDownloader() {
  const [activeTab, setActiveTab] = useState('video');
  const [url, setUrl] = useState('');

  const tabs = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'photo', label: 'Photo', icon: Image },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'story', label: 'Story', icon: TrendingUp },
    { id: 'igtv', label: 'IGTV', icon: Tv },
    { id: 'carousel', label: 'Carousel', icon: RotateCcw },
    { id: 'viewer', label: 'Viewer', icon: Eye }
  ];

  const getContentText = () => {
    const contentMap = {
      video: {
        title: 'Download Instagram Videos',
        description: 'Save Instagram videos in high quality to your device. Paste the video URL and download instantly.',
        placeholder: 'Paste Instagram video link here...'
      },
      photo: {
        title: 'Download Instagram Photos',
        description: 'Download Instagram photos and images in original quality. Simple, fast, and free.',
        placeholder: 'Paste Instagram photo link here...'
      },
      reels: {
        title: 'Download Instagram Reels',
        description: 'Save Instagram Reels videos to your device. Download trending reels in HD quality.',
        placeholder: 'Paste Instagram reels link here...'
      },
      story: {
        title: 'Download Instagram Stories',
        description: 'Download Instagram stories before they disappear. Save stories from any public account.',
        placeholder: 'Paste Instagram story link here...'
      },
      igtv: {
        title: 'Download IGTV Videos',
        description: 'Download long-form IGTV videos in high quality. Save your favorite IGTV content.',
        placeholder: 'Paste IGTV link here...'
      },
      carousel: {
        title: 'Download Instagram Carousel',
        description: 'Download all images and videos from Instagram carousel posts. Get the complete collection.',
        placeholder: 'Paste Instagram carousel link here...'
      },
      viewer: {
        title: 'Instagram Profile Viewer',
        description: 'View Instagram profiles, posts, and stories anonymously. Browse without logging in.',
        placeholder: 'Enter Instagram username or profile link...'
      }
    };
    // @ts-ignore
    return contentMap[activeTab];
  };

  const content = getContentText();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                FastDL
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-gray-600 hover:text-purple-600 transition">Home</a>
              <a href="#how-to-use" className=" text-gray-600 hover:text-purple-600 transition">How to Use</a>
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition">Features</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 transition">FAQ</a>
              <a href="#related-tools" className="text-gray-600 hover:text-purple-600 transition">Related Tools</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Ad Space - Top Banner */}
      <div id="ad-space-top" className="bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
            <p className="text-sm text-gray-500">Advertisement Space </p>
          </div>
        </div>
      </div>

      {/* Hero Section with Gradient */}
      <section id="home" className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-16 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Sidebar Ad */}
      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-center text-white/60 text-xs mb-2">Ad</div>
            <div className="bg-white/20 rounded-lg flex items-center justify-center" style={{ minHeight: '400px', width: '160px' }}>
              {/* Google AdSense - Left Sidebar */}
              <div id="google-ad-left" className="w-full h-full flex items-center justify-center">
                <div className="text-white/40 text-xs text-center">160x600<br/>Advertisement Space</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Instagram Downloader
          </h2>
          <p className="text-white/90 text-lg">
            Download Instagram Videos, Photos, Reels, IGTV & Carousel
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Download Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{content.title}</h3>
          <p className="text-gray-600 mb-6">{content.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={content.placeholder}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105">
              Download
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free Forever</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Registration</span>
            </span>
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>HD Quality</span>
            </span>
          </div>
        </div>

        {/* Mobile Ad (shows only on mobile) */}
        <div className="lg:hidden mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-center text-white/60 text-xs mb-2">Advertisement</div>
            <div className="bg-white/20 rounded-lg flex items-center justify-center" style={{ minHeight: '100px' }}>
              <div id="google-ad-mobile" className="w-full h-full flex items-center justify-center">
                <div className="text-white/40 text-sm">Mobile Ad (320x100)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Ad */}
      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-center text-white/60 text-xs mb-2">Ad</div>
            <div className="bg-white/20 rounded-lg flex items-center justify-center" style={{ minHeight: '400px', width: '160px' }}>
              {/* Google AdSense - Right Sidebar */}
              <div id="google-ad-right" className="w-full h-full flex items-center justify-center">
                <div className="text-white/40 text-xs text-center">160x600<br/>Advertisement Space</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

    </div>
  </div>
</section>

      {/* Ad Space - Content Banner */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">Advertisement Space </p>
          </div>
        </div>
      </div>
         {/* How to Use Section */}
         <section id="how-to-use" className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How to Download Instagram {content.title.split(' ').pop()}
          </h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Copy Instagram Link</h4>
                <p className="text-gray-600">Open Instagram and copy the link of the {activeTab} you want to download</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Paste URL</h4>
                <p className="text-gray-600">Paste the link into the input box above and click the Download button</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Download & Save</h4>
                <p className="text-gray-600">Wait a few seconds and download the content to your device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose FastDL?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h4>
              <p className="text-gray-600">Download Instagram content in seconds with our optimized servers</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">100% Safe</h4>
              <p className="text-gray-600">Secure and private. We don't store your data or downloaded content</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">All Devices</h4>
              <p className="text-gray-600">Works on mobile, tablet, and desktop. Download anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space - Bottom Banner */}
      <div id="ad-space-bottom" className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">Advertisement Space </p>
          </div>
        </div>
      </div>

   

      {/* Features Detail Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Powerful Features for Everyone
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our Instagram downloader is packed with features that make downloading content simple and efficient
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Unlimited Downloads</h4>
              <p className="text-gray-600 text-sm">Download as many videos, photos, and reels as you want. No limits, no restrictions.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">High Quality Downloads</h4>
              <p className="text-gray-600 text-sm">Get Instagram content in the highest quality available, including HD and 4K videos.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Private & Secure</h4>
              <p className="text-gray-600 text-sm">Your privacy matters. We don't store your data or track your downloads.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Super Fast Speed</h4>
              <p className="text-gray-600 text-sm">Our optimized servers ensure lightning-fast downloads every time.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">No Registration</h4>
              <p className="text-gray-600 text-sm">Start downloading immediately. No account creation or login required.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">All Devices Supported</h4>
              <p className="text-gray-600 text-sm">Works seamlessly on Android, iOS, Windows, Mac, and Linux devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">
              Find answers to common questions about our Instagram downloader
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Is it free to download Instagram content?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                Yes, FastDL is completely free to use. You can download unlimited Instagram videos, photos, reels, and stories without any charges or subscription fees.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Do I need to install any software?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                No installation required! FastDL is a web-based tool that works directly in your browser. Simply paste the Instagram link and download instantly.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Can I download private Instagram posts?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                No, you can only download content from public Instagram accounts. Private accounts require you to be a follower and have permission to view their content.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>What quality will the downloaded content be?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                We download content in the highest quality available from Instagram. This includes HD videos, full-resolution photos, and original quality for all media types.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Is it safe to use this downloader?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                Absolutely! FastDL is 100% safe and secure. We don't store your data, require login information, or install any malware. Your privacy and security are our top priorities.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Can I download multiple photos from a carousel post?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                Yes! When you use the Carousel tab and paste a carousel post link, you'll be able to download all images and videos from that post in one go.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Does Instagram know when I download something?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                No, Instagram doesn't notify content creators when someone downloads their content using third-party tools like FastDL. Your downloads are completely anonymous.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-50 transition">
                <span>Why isn't my download working?</span>
                <svg className="w-5 h-5 text-purple-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                Make sure you're using the correct Instagram URL, the account is public, and you have a stable internet connection. If issues persist, try clearing your browser cache or using a different browser.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section id="related-tools" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              More Social Media Download Tools
            </h3>
            <p className="text-gray-600">
              Explore our other powerful downloaders for different social media platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="#" className="group bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">YouTube Downloader</h4>
              <p className="text-sm text-gray-600">Download YouTube videos in HD, 4K, and MP3 format</p>
            </a>

            <a href="#" className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">Twitter Downloader</h4>
              <p className="text-sm text-gray-600">Save Twitter videos and GIFs to your device easily</p>
            </a>

            <a href="#" className="group bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition">TikTok Downloader</h4>
              <p className="text-sm text-gray-600">Download TikTok videos without watermark</p>
            </a>

            <a href="#" className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition">Facebook Downloader</h4>
              <p className="text-sm text-gray-600">Download Facebook videos in full HD quality</p>
            </a>
          </div>

          <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">
                  Need More Features?
                </h4>
                <p className="text-gray-600">
                  Check out our premium tools for batch downloads, scheduling, and advanced features. Download from multiple platforms simultaneously and manage all your content in one place.
                </p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
                Explore Premium Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold text-lg mb-4">FastDL</h5>
              <p className="text-gray-400 text-sm">The fastest and easiest way to download Instagram content. Free forever.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Tools</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Video Downloader</a></li>
                <li><a href="#" className="hover:text-white transition">Photo Downloader</a></li>
                <li><a href="#" className="hover:text-white transition">Reels Downloader</a></li>
                <li><a href="#" className="hover:text-white transition">Story Downloader</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us </a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 FastDL. All rights reserved. This tool is not affiliated with Instagram.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}