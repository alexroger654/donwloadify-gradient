'use client'
import React, { useState } from 'react'
import { Video, Image, Film, TrendingUp, Tv, RotateCcw, Eye, Download, CheckCircle, Play } from 'lucide-react';







// ========================================== components =====================================================
export default function FacebookHero({activeTab, setActiveTab, tabs, content}: {activeTab: string, setActiveTab: (tab: string) => void, tabs: { id: string; label: string; icon: any; }[], content: { title: string; description: string; placeholder: string; } }) {
    const [videoUrl, setVideoUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [video, setVideo] = useState<any>(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
    // const [activeTab, setActiveTab] = useState('video');

    function removeAllAfterFirstAmpersand(url: string) {
        return url.split('&')[0];
    }

    const download = async (format_id: string) => {
        setDownloading(true);
        setDownloadingFormatId(format_id);

        try {

            const url = removeAllAfterFirstAmpersand(videoUrl);

            const res = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url, format_id }),
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
            const url = removeAllAfterFirstAmpersand(videoUrl);
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url }),
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


    const downloadImage = async () => {
        setDownloading(true);
        try {

            const url = removeAllAfterFirstAmpersand(videoUrl);

            const res = await fetch("/api/download-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url}),
            });
            const data = await res.json();
            if (data.downloadUrl) {
                window.location.href = data.downloadUrl;
            }
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setDownloading(false);
        }
    };

    const handleDownload = async () => {
        try {
        //   setError("");
    
        //   if (!url) {
        //     setError("Please enter an image URL");
        //     return;
        //   }
    
          // Fetch the image as blob
          const response = await fetch(videoUrl);
          if (!response.ok) throw new Error("Failed to fetch image");
    
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
    
          // Create a temporary link and click it to download
          const link = document.createElement("a");
          link.href = objectUrl;
    
          // Try to extract extension from response
          const contentType = response.headers.get("content-type") || "image/jpeg";
          const ext = contentType.split("/")[1].split(";")[0] || "jpg";
    
          link.download = `downloaded_image.${ext}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(objectUrl);
        } catch (err) {
          console.error(err);
        //   setError("Failed to download image");
        }
      };
    


    //   ========================================== render =====================================================

    return (
        <section id="home" className="bg-gradient-to-r  from-[#1877F2] to-[#00FFA3] py-16 px-4">
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
                                        <div className="text-white/40 text-xs text-center">160x600<br />Advertisement Space</div>
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
                                Facebook Downloader
                            </h2>
                            <p className="text-white/90 text-lg">
                                Download Facebook Videos, Photos, Reels, IGTV & Carousel
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
                                        className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-white text-[#0077B5] shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {!showDownload ? <>
                            {/* Download Box */}
                            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{content.title}</h3>
                                <p className="text-gray-600 mb-6">{content.description}</p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        placeholder={content.placeholder}
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1877F2] transition"
                                    />
                                    <button
                                        onClick={ activeTab === 'video' ? analyze : downloadImage}
                                        disabled={isAnalyzing || downloading}
                                        className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#1877F2] to-[#00FFA3] cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {isAnalyzing || downloading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                                Downloading...
                                            </>
                                        ) : (
                                            "Download"
                                        )}
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
                        </>
                            : <>
                                <div className="space-y-8 bg-white/20 backdrop-blur-md rounded-2xl p-5">
                                    {/* Video Preview */}
                                    {video && (
                                        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/10 border border-white/20">
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
                                                    Duration: {video.duration} • Linkedin
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
                            </>
                        }

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
                                        <div className="text-white/40 text-xs text-center">160x600<br />Advertisement Space</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    )
}
