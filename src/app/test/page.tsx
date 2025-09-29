// app/page.tsx
'use client';

import { useState } from 'react';
import { Download, Video, AlertCircle, Loader2 } from 'lucide-react';

interface VideoQuality {
    quality: string;
    url: string;
    fileSize?: string;
    format: string;
    formatId?: string; // Add this if your backend provides it
}

interface VideoInfo {
    title: string;
    duration: string;
    thumbnail: string;
    uploader?: string;
    viewCount?: number;
    qualities: VideoQuality[];
}

// Component starts here
export default function VideoDownloader() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [error, setError] = useState('');
    const [downloadingItems, setDownloadingItems] = useState<Set<string>>(new Set());




    const processVideo = async () => {
        if (!url.trim()) {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError('');
        setVideoInfo(null);

        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Failed to process video');
            }

            const data = await response.json();
            setVideoInfo(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (downloadUrl: string, quality: string, title: string, index: number) => {
        const downloadKey = `${index}-${quality}`;

        try {
            // Add to downloading set
            setDownloadingItems(prev => new Set(prev).add(downloadKey));

            // Clean the title for filename
            const cleanTitle = title.replace(/[^a-z0-9\s-_]/gi, '').trim().replace(/\s+/g, '_');
            const filename = `${cleanTitle}_${quality}.mp4`;

            // Create the proxy URL
            const proxyUrl = `/api/download-proxy?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`;

            console.log('Starting download:', filename);

            // Method 1: Try using fetch first (for better error handling)
            try {
                const response = await fetch(proxyUrl);

                if (!response.ok) {
                    throw new Error(`Download failed: ${response.status} ${response.statusText}`);
                }

                // Get the blob
                const blob = await response.blob();

                // Create download link
                const link = document.createElement('a');
                const blobUrl = window.URL.createObjectURL(blob);

                link.href = blobUrl;
                link.download = filename;
                link.style.display = 'none';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Clean up
                window.URL.revokeObjectURL(blobUrl);

                console.log('Download completed:', filename);

            } catch (fetchError) {
                console.warn('Fetch method failed, trying direct link method:', fetchError);

                // Method 2: Fallback to direct link
                const link = document.createElement('a');
                link.href = proxyUrl;
                link.download = filename;
                link.style.display = 'none';
                link.target = '_blank'; // This might open in new tab, but with download header it should download

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        } catch (error) {
            console.error('Download error:', error);
            setError(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            // Remove from downloading set after a delay
            setTimeout(() => {
                setDownloadingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(downloadKey);
                    return newSet;
                });
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                        <Video className="text-blue-600" />
                        Video Downloader
                    </h1>
                    <p className="text-gray-600">Download videos in multiple qualities</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id="url"
                                    type="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com/video-url"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    disabled={loading}
                                />
                                <button
                                    onClick={processVideo}
                                    disabled={loading || !url.trim()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Video className="w-4 h-4" />
                                            Process
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {videoInfo && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex gap-4">
                                <img
                                    src={videoInfo.thumbnail}
                                    alt={videoInfo.title}
                                    className="w-32 h-24 object-cover rounded-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x240?text=No+Thumbnail';
                                    }}
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {videoInfo.title}
                                    </h2>
                                    <div className="space-y-1 text-gray-600">
                                        <p>Duration: {videoInfo.duration}</p>
                                        {videoInfo.uploader && (
                                            <p>Uploader: {videoInfo.uploader}</p>
                                        )}
                                        {videoInfo.viewCount && (
                                            <p>Views: {videoInfo.viewCount.toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Available Qualities
                            </h3>
                            <div className="grid gap-3">
                                {videoInfo.qualities.map((quality, index) => {
                                    const downloadKey = `${index}-${quality.quality}`;
                                    const isDownloading = downloadingItems.has(downloadKey);

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Video className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {quality.quality}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {quality.format}
                                                        {quality.fileSize && ` • ${quality.fileSize}`}
                                                    </div>
                                                    {isDownloading && (
                                                        <div className="text-xs text-blue-600 mt-1">
                                                            Preparing download...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(quality.url, quality.quality, videoInfo.title, index)}
                                                disabled={isDownloading}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                            >
                                                {isDownloading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Downloading
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center text-gray-500 text-sm space-y-2">
                    <p>Supports YouTube, Vimeo, TikTok, Twitter, Instagram, and many other platforms</p>
                    <p className="text-xs">Powered by yt-dlp • Direct downloads from source</p>
                </div>
            </div>
        </div>
    );
}