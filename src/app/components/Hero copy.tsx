import React, { useState } from 'react';
import { Play, Download, CheckCircle, Sparkles, Facebook } from 'lucide-react';
import { FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { TbBrandLinkedinFilled } from 'react-icons/tb';


const platforms = [
  { name: 'YouTube', color: 'bg-red-500', icon: <SiYoutubemusic size={20} /> },
  { name: 'TikTok', color: 'bg-pink-500', icon: <AiFillTikTok size={20} /> },
  { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: <RiInstagramFill size={20} /> },
  { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebook size={20} /> },
  { name: 'Twitter', color: 'bg-sky-500', icon: <FaSquareXTwitter size={20} /> },
  { name: 'LinkedIn', color: 'bg-blue-700', icon: <TbBrandLinkedinFilled size={20} /> },
];

const qualityOptions = [
  { quality: '360p', size: '25 MB' },
  { quality: '720p', size: '55 MB' },
  { quality: '1080p', size: '120 MB' },
];

interface HeroProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

const Hero: React.FC<HeroProps> = ({ selectedPlatform, setSelectedPlatform }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  console.log(videoUrl, 'video url')


  const download = async (format_id: string) => {
    setDownloading(true);
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url:videoUrl, format_id }),
    });
    const data = await res.json();
    if (data.downloadUrl) {
      window.location.href = data.downloadUrl; // trigger download
    }
    setDownloading(false);
  };

  const analyze = async () => {
    setIsAnalyzing(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({url: videoUrl }),
    });
    const data = await res.json();
    setVideo(data);
    setIsAnalyzing(false);
    setShowDownload(true);
  };



  const handleAnalyze = () => {
    if (!selectedPlatform || !videoUrl) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDownload(true);
    }, 2000);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Download Videos
            <span className="inline-flex items-center ml-4">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-300 animate-pulse" />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium">
            From any platform, instantly & free
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          {!showDownload ? (
            <div className="space-y-8">
              {/* Platform Selection */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Select Platform</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => handlePlatformSelect(platform.name)}
                      className={`p-4 rounded-2xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${selectedPlatform === platform.name
                          ? `${platform.color} ring-4 ring-white/50 scale-105`
                          : 'bg-white/20 hover:bg-white/30'
                        }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="hidden sm:inline">{platform.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Input */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Paste Video URL</h3>
                <div className="relative">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-4 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:border-white/60 focus:bg-white/25 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 text-lg"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 hover:from-blue-400/20 hover:via-purple-400/20 hover:to-pink-400/20 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyze}
                disabled={ !videoUrl || isAnalyzing}
                className="w-full py-4 px-8 rounded-2xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: 'linear-gradient(108deg, rgba(0, 158, 226, .9) -57.13%, #8b2fff 11.08%, rgba(245, 5, 79, .9) 102.57%)' }}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Analyze Video</span>
                  </div>
                )}
              </button>
            </div>
          ) : (
            /* Download Options */
            <div className="space-y-8 animate-fade-in">
              {/* Video Preview */}

              {
                video &&
                <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
                  {/* Thumbnail with play overlay */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title & details */}
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      Duration: {video.duration} • {selectedPlatform}
                    </p>
                  </div>

                  {/* Status check */}
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              }


              {/* Quality Options */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Choose Quality</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  {video.formats.map((f: any, i: number) => (


                    <button
                      key={i}
                      className="lg:flex items-center cursor-pointer justify-between p-4 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
                        <span className="text-white font-semibold">{f.quality}</span>
                        {/* <span className="text-white/70">({option.size})</span> */}
                      </div>
                      <div onClick={() => download(f.format_id)} className="flex text-xs md:text-base items-center space-x-2 text-white group-hover:text-green-400 transition-colors duration-300">
                        <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="font-semibold">Download</span>
                      </div>
                    </button>



                  ))}
                </div>
              </div>

              {/* New Download Button */}
              <button
                onClick={() => {
                  setShowDownload(false);
                  setVideoUrl('');
                  // Keep the selected platform for better UX
                }}
                className="w-full py-3 px-8 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 border border-white/30"
              >
                Download Another Video
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;