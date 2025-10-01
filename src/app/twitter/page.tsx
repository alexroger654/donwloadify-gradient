
'use client'

import React, { useState } from 'react';
import { Video, Image, Film, TrendingUp, Tv, RotateCcw, Eye } from 'lucide-react';

import Features from '../components/FeaturesDetails';
import AdsSpace from '../components/AdsSpace';
import FeaturesDetails from '../components/FeaturesDetails';
import HowtoUse from '../components/HowtoUse';
import RelatedTools from '../components/RelatedTools';
import Footer from '../components/Footer';
import Faq from '../components/Faq';
import Navbar from '../components/Navbar';
import TwitterHero from '../components/TwitterHero';



export default function TwitterDownloader() {
  const [activeTab, setActiveTab] = useState('video');
  const [url, setUrl] = useState('');

  const tabs = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'photo', label: 'Photo', icon: Image },

  ];

  const getContentText = () => {
    const contentMap = {
      video: {
        title: 'Download Twitter Videos',
        description: 'Save Twitter videos in high quality to your device. Paste the video URL and download instantly.',
        placeholder: 'Paste Twitter video link here...'
      },
      photo: {
        title: 'Download Twitter Photos',
        description: 'Download Twitter photos and images in original quality. Simple, fast, and free.',
        placeholder: 'Paste Twitter photo link here...'
      }
    };
    // @ts-ignore
    return contentMap[activeTab];
  };

  const content = getContentText();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar gradient="from-[#0077B5] via-[#00A0DC] to-[#00A0DC]" />

      {/* Ad Space - Top Banner */}
      <AdsSpace />

      {/* Hero Section with Gradient */}
      <TwitterHero activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} content={content} />


      {/* Ad Space - Content Banner */}
      <AdsSpace />
      {/* How to Use Section */}
      <HowtoUse content={content} activeTab={activeTab} />

      {/* Features Section */}
      <Features />
      {/* Ad Space - Bottom Banner */}
      <AdsSpace />

      {/* Features Detail Section */}
      <FeaturesDetails />

      {/* FAQ Section */}
      <Faq />
      {/* Related Tools Section */}
      <RelatedTools />

      {/* Footer */}
      <Footer />
    </div>
  );
}