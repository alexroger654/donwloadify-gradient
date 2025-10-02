'use client'
import React, { useState } from 'react'
import { Video, Image, Film, TrendingUp, Tv, RotateCcw, Eye, Download, CheckCircle, Play, ClipboardIcon, XIcon, Clock, User, Heart, MessageCircle, Calendar, ChevronUp, ChevronDown, FileImage } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';







// ========================================== components =====================================================
export default function InstagramHero({ activeTab, setActiveTab, tabs, content }: { activeTab: string, setActiveTab: (tab: string) => void, tabs: { id: string; label: string; icon: any; }[], content: { title: string; description: string; placeholder: string; } }) {
    const [videoUrl, setVideoUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [downloadingIndex, setDownloadingIndex] = useState(null);
    const [video, setVideo] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
    const [showAllComments, setShowAllComments] = useState(false);
    // const [activeTab, setActiveTab] = useState('video');

    const pathname = usePathname();

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



    const analyzeInstagramImage = async (url: string) => {
      const res = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    
      const data = await res.json();
      setImage(data);
    };

    const analyze = async () => {
        if (!videoUrl) return;

        setIsAnalyzing(true);

      if(pathname?.split('/')[1]?.toLowerCase() === 'photo' || pathname?.split('/')[1]?.toLowerCase() === 'story' || pathname?.split('/')[1]?.toLowerCase() === 'carousel') {
        try {
          await analyzeInstagramImage(videoUrl);
        } catch (error) {
            console.error('Analysis failed:', error);
            setIsAnalyzing(false);
        } finally {
            setIsAnalyzing(false);
            setShowDownload(true);
        }
      }else{
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
      }

  
    };

    const formatDuration = (seconds : number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
    
      const formatDate = (dateStr : string) => {
        if (!dateStr) return 'Unknown date';
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        return `${day}/${month}/${year}`;
      };
    
      const formatTimestamp = (timestamp : number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      };
    
      const displayedComments =  video?.comments  ? (showAllComments ? video?.comments : video?.comments?.slice(0, 3)) : [];
      const displayedImageComments =  image?.comments ? (showAllComments ? image?.comments : image?.comments?.slice(0, 3)) : [];
    
      const handleDownload = async (imageUrl: string, index: number) => {
        setDownloadingIndex(index as any);
        
        // Use the proxy with download param
        const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}&download=true`;
        
        const link = document.createElement('a');
        link.href = proxyUrl;
        link.download = `image_${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        setDownloadingIndex(null);
      };



    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setVideoUrl(text);
        } catch (err) {
            console.error("Failed to paste:", err);
        }
    };

    const handleClear = () => {
        setVideoUrl("");
    };





    //   ========================================== render =====================================================

    return (
        <section id="home" className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-6 lg:py-16 px-4">
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
                        <div className="text-center mb-4 lg:mb-8">
                            <h2 className="text-2xl md:text-5xl capitalize font-bold text-white mb-2 lg:mb-4">
                                Instagram  Downloader
                            </h2>
                            <p className="text-white/90 text-xs lg:text-lg">
                                Download Instagram Videos, Photos, Reels, IGTV & Carousel
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex flex-wrap justify-center gap-2 mb-4 lg:mb-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <Link
                                    href={`/${tab.label?.toLowerCase()}`}
                                        key={tab.id}
                                        className={`flex items-center space-x-2 px-2 lg:px-4 py-2.5 rounded-lg font-medium transition-all 
          ${pathname?.split('/')[1]?.toLowerCase() === tab.label.toLowerCase()
                                                ? "bg-white text-purple-600 shadow-lg"
                                                : "bg-white/20 text-white hover:bg-white/30"
                                            }`}
                                    >
                                        {/* Icon always visible */}
                                        <Icon className="w-4 h-4 ml-2" />

                                        {/* Label hidden on mobile, visible on md+ screens */}
                                        <span className="hidden sm:inline text-sm">{tab.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                                <h3 className="lg:text-2xl text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-1">{content.title}</h3>
                                <p className="text-gray-500 text-xs lg:text-md font-semibold mb-6">{content.description}</p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            placeholder={'Paste your Instagram link here'}
                                            className="flex-1 w-full px-4 py-3 placeholder:text-gray-400 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition pr-12"
                                        />
                                        {videoUrl ? (
                                            <button
                                                type="button"
                                                onClick={handleClear}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-500"
                                            >
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handlePaste}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-purple-600"
                                            >
                                                <ClipboardIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={analyze}
                                        disabled={isAnalyzing}
                                        className={`flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {isAnalyzing ? (
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
                                                Analyzing...
                                            </>
                                        ) : (
                                            "Analyze"
                                        )}
                                    </button>
                                </div>

                                <div className="mt-4 hidden lg:flex items-center justify-center space-x-4 text-sm text-gray-500">
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



{
  showDownload && image &&  <>
  
  <div className="space-y-6 mt-10">
            {/* Post Preview Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="space-y-6">
                {/* Post Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">@{image?.owner_username}</h3>
                      <span className="text-sm text-gray-500">{formatDate(image?.date_utc)}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-base whitespace-pre-line">
                    {image?.caption}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-900 font-semibold">{image?.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-900 font-semibold">{image?.comments_count}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-full">
                      <FileImage className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-900 font-semibold">{image?.image_urls.length} {image?.image_urls.length === 1 ? 'Image' : 'Images'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Grid */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <FileImage className="w-6 h-6 text-purple-600" />
                Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {image?.image_urls.map((imageUrl : string, index : number) => {
                  const isDownloadingThis = downloadingIndex === index;

                  return (
                    <div
                      key={index}
                      className="group relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={imageUrl && `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Download Button */}
                      <div className="p-4">
                        <button
                          onClick={() => handleDownload(imageUrl, index)}
                          disabled={downloadingIndex !== null}
                          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                            isDownloadingThis
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200'
                              : downloadingIndex !== null
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white hover:shadow-lg hover:scale-105'
                          }`}
                        >
                          {isDownloadingThis ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5" />
                              <span>Download Image {index + 1}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm font-semibold">
                          {index + 1} / {image?.image_urls.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-pink-600" />
                Comments ({image?.comments.length})
              </h3>
              <div className="space-y-3">
                {displayedComments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-gray-900">@{comment.owner_username}</span>
                      <span className="text-xs text-gray-500">{formatTimestamp(comment.created_at_utc)}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.text}</p>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{comment.like_count}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {image?.comments?.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="w-full mt-4 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-all border-2 border-gray-300 flex items-center justify-center gap-2"
                >
                  {showAllComments ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Show All Comments ({image?.comments?.length - 3} more)
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
  </>
}

                            
                        {showDownload && video && <>
                          
                            
                                <div className="space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-5 mt-10">
                                      <div className="space-y-6">
                                          {/* Video Preview Card */}
                                          <div className="bg-white rounded-2xl p-6 shadow-xl">
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                              {/* Thumbnail */}
                                              <div className="relative w-full md:w-48 h-64 md:h-48 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                                                <img
                                                  src={video?.thumbnail}
                                                  alt={video?.title}
                                                  className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                                                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all cursor-pointer">
                                                    <Play className="w-10 h-10 text-purple-600" fill="currentColor" />
                                                  </div>
                                                </div>
                                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDuration(video?.duration)}
                                                  </span>
                                                </div>
                                              </div>
                                
                                              {/* Video Info */}
                                              <div className="flex-1 space-y-4">
                                                <div>
                                                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-2 line-clamp-2 capitalize">
                                                    {video?.title}
                                                  </h2>
                                                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                                                    <User className="w-4 h-4" />
                                                    <span className="font-medium">{video?.uploader}</span>
                                                  </div>
                                                  <p className="text-gray-600 text-sm md:text-base whitespace-pre-line line-clamp-3">
                                                    {video?.description}
                                                  </p>
                                                </div>
                                
                                                {/* Stats */}
                                                <div className="flex flex-wrap gap-4">
                                                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full">
                                                    <Heart className="w-5 h-5 text-red-500" />
                                                    <span className="text-gray-900 font-semibold">{video?.like_count}</span>
                                                  </div>
                                                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                                                    <MessageCircle className="w-5 h-5 text-blue-500" />
                                                    <span className="text-gray-900 font-semibold">{video?.comment_count}</span>
                                                  </div>
                                                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full">
                                                    <Calendar className="w-5 h-5 text-green-500" />
                                                    <span className="text-gray-900 font-semibold">{formatDate(video?.upload_date)}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                
                                          {/* Quality Options */}
                                          <div className="bg-white rounded-2xl p-6 shadow-xl">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                                              Choose Quality
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                              {video?.formats?.map((format : any, index : any) => {
                                                const isDownloadingThis = downloading && downloadingFormatId === format.format_id;
                                
                                                return (
                                                  <button
                                                    key={index}
                                                    disabled={downloading}
                                                    onClick={() => !downloading && download(format.format_id)}
                                                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                                                      downloading && !isDownloadingThis
                                                        ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                                                        : isDownloadingThis
                                                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 shadow-lg shadow-purple-200'
                                                        : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50 cursor-pointer hover:shadow-lg hover:scale-105'
                                                    }`}
                                                  >
                                                    <div className={`w-4 h-4 rounded-full mb-3 ${
                                                      isDownloadingThis
                                                        ? 'bg-purple-500 animate-pulse'
                                                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                    }`}></div>
                                                    <span className="text-gray-900 font-bold text-lg mb-2">
                                                      {format.quality || 'Unknown'}
                                                    </span>
                                                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                                                      isDownloadingThis
                                                        ? 'text-purple-600'
                                                        : downloading
                                                        ? 'text-gray-400'
                                                        : 'text-gray-600'
                                                    }`}>
                                                      {isDownloadingThis ? (
                                                        <>
                                                          <div className="w-4 h-4 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
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
                                
                                          {/* Comments Section */}
                                          <div className="bg-white rounded-2xl p-6 shadow-xl">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                                              Comments ({video?.comments?.length})
                                            </h3>
                                            <div className="space-y-3">
                                              {displayedComments.map((comment : any) => (
                                                <div
                                                  key={comment.id}
                                                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-all"
                                                >
                                                  <div className="flex items-start justify-between mb-2">
                                                    <span className="font-semibold text-gray-900">@{comment.author}</span>
                                                    <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                                                  </div>
                                                  <p className="text-gray-700 text-sm">{comment.text}</p>
                                                </div>
                                              ))}
                                            </div>
                                            
                                            {video?.comments?.length > 3 && (
                                              <button
                                                onClick={() => setShowAllComments(!showAllComments)}
                                                className="w-full mt-4 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-all border-2 border-gray-300 flex items-center justify-center gap-2"
                                              >
                                                {showAllComments ? (
                                                  <>
                                                    <ChevronUp className="w-5 h-5" />
                                                    Show Less
                                                  </>
                                                ) : (
                                                  <>
                                                    <ChevronDown className="w-5 h-5" />
                                                    Show All Comments ({video?.comments?.length - 3} more)
                                                  </>
                                                )}
                                              </button>
                                            )}
                                          </div>
       
                                        </div>
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
