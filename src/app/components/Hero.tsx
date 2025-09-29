import React, { useState } from 'react';
import { Play, Download, CheckCircle, Sparkles } from 'lucide-react';
import { FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { TbBrandLinkedinFilled } from 'react-icons/tb';

const platforms = [
  { name: 'YouTube', color: 'bg-gradient-to-r from-red-600 to-red-500', icon: <SiYoutubemusic size={20} /> },
  { name: 'TikTok', color: 'bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600', icon: <AiFillTikTok size={20} /> },
  { name: 'Instagram', color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500', icon: <RiInstagramFill size={20} /> },
  { name: 'Facebook', color: 'bg-gradient-to-r from-blue-700 to-blue-500', icon: <FaFacebook size={20} /> },
  { name: 'Twitter', color: 'bg-gradient-to-r from-slate-900 to-slate-700', icon: <FaSquareXTwitter size={20} /> },
  { name: 'LinkedIn', color: 'bg-gradient-to-r from-blue-800 to-blue-600', icon: <TbBrandLinkedinFilled size={20} /> },
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
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);

  const download = async (format_id: string) => {
    setDownloading(true);
    setDownloadingFormatId(format_id);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl, format_id }),
      });
      const data = await res.json();
      if (data.downloadUrl) {
        window.location.href = data.downloadUrl;
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setDownloadingFormatId(null);
    }
  };

  const analyze = async () => {
    if (!videoUrl) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await res.json();
      setVideo(data);
      setShowDownload(true);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-10 pb-20">
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
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
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
              {/* Glassmorphism Analyze Button */}
              <div className="relative group ">
                {/* Outer glow container */}
                <div className="absolute -inset-1 cursor-pointer bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-3xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-500"></div>

                <button
                  onClick={analyze}
                  disabled={!videoUrl || isAnalyzing}
                  className="relative w-full py-6 px-8 rounded-3xl font-bold text-lg text-white transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
                >
                  {/* Main glassmorphism background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:from-white/25 group-hover:to-white/10"></div>

                  {/* Animated border light */}
                  <div className="absolute inset-0 rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>
                  </div>

                  {/* Multiple reflection layers */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl blur-sm"></div>

                  {/* Content with enhanced styling */}
                  <div className="relative z-10">
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center space-x-4">
                        {/* Enhanced loading spinner */}
                        <div className="relative">
                          <div className="w-6 h-6 border-3 border-white/20 rounded-full"></div>
                          <div className="absolute inset-0 w-6 h-6 border-3 border-transparent border-t-white/80 rounded-full animate-spin"></div>
                        </div>
                        <span className="font-bold tracking-wide text-white">
                          Analyzing Video...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-4">
                        {/* Enhanced icon container */}
                        <div className="relative p-2 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 group-hover:border-white/40 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300">
                          <Play className="w-6 h-6 fill-current drop-shadow-sm" />
                        </div>
                        <span className="font-bold tracking-wide text-white">
                          Analyze Video
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom reflection */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner highlights */}
                  <div className="absolute top-2 left-2 w-4 h-4 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-sm opacity-70"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-tl from-white/30 to-transparent rounded-full blur-sm opacity-60"></div>
                </button>
              </div>
            </div>
          ) : (
            /* Download Options */
            <div className="space-y-8">
              {/* Video Preview */}
              {video && (
                <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl">
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
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      Duration: {video.duration} • {selectedPlatform}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              )}

              {/* Quality Options */}
              {video?.formats && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Choose Quality</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {video.formats.map((format: any, index: number) => {
                      const isDownloadingThis = downloading && downloadingFormatId === format.format_id;

                      return (
                        <button
                          key={index}
                          disabled={downloading}
                          onClick={() => !downloading && download(format.format_id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${downloading && !isDownloadingThis
                              ? 'bg-white/10 border-white/20 opacity-50 cursor-not-allowed'
                              : isDownloadingThis
                                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50'
                                : 'bg-white/20 hover:bg-white/30 border-white/30 hover:border-white/50 cursor-pointer'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${isDownloadingThis
                                ? 'bg-blue-400 animate-pulse'
                                : 'bg-gradient-to-r from-green-400 to-blue-400'
                              }`}></div>
                            <span className="text-white font-semibold">{format.quality || format.format_note || 'Unknown'}</span>
                          </div>
                          <div className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${isDownloadingThis
                              ? 'text-blue-400'
                              : downloading
                                ? 'text-white/50'
                                : 'text-white hover:text-green-400'
                            }`}>
                            {isDownloadingThis ? (
                              <>
                                <div className="w-4 h-4 border-2 border-green-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                                <span className="font-semibold">Downloading...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span className="font-semibold">Download</span>
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* New Download Button */}
              <button
                onClick={() => {
                  setShowDownload(false);
                  setVideoUrl('');
                  setVideo(null);
                }}
                disabled={downloading}
                className={`w-full py-3 px-8 rounded-2xl font-semibold transition-all duration-300 border ${downloading
                    ? 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                  }`}
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