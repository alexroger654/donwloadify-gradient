'use client'
import React, { useState } from 'react';
import { Video, Image, Film, TrendingUp, Tv, RotateCcw, Eye } from 'lucide-react';



import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AdsSpace from './AdsSpace';
import InstagramHero from './InstagramHero';
import HowtoUse from './HowtoUse';
import FeaturesDetailsTwo from './FeaturesDetails';
import Faq from './Faq';
import RelatedTools from './RelatedTools';
import Footer from './Footer';




export default function CommonPageContent() {
  const [activeTab, setActiveTab] = useState('video');


  const tabs = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'photo', label: 'Photo', icon: Image },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'story', label: 'Story', icon: TrendingUp },
    { id: 'igtv', label: 'IGTV', icon: Tv },
    { id: 'carousel', label: 'Carousel', icon: RotateCcw }
  ];
  const pathname = usePathname();
  const getContentText = () => {
    const key = pathname?.replace('/', '') || 'video';
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
    return contentMap[key || 'video'];
  };

  const content = getContentText();

  return (
    <div className="min-h-screen bg-white">
      <Navbar gradient="from-purple-600 via-pink-500 to-orange-400" />
      <AdsSpace />
      <InstagramHero activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} content={content} />
      <AdsSpace />
      <HowtoUse content={content} activeTab={activeTab} />
      <FeaturesDetailsTwo />
      <AdsSpace />
      <Faq />
      <RelatedTools />
      <Footer />
    </div>
  );
}