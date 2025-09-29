//api/download/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface YtDlpFormat {
    format_id: string;
    ext: string;
    resolution: string | null;
    height: number | null;
    width: number | null;
    filesize: number | null;
    url: string;
    vcodec: string;
    acodec: string;
    format_note: string;
}

interface YtDlpInfo {
    title: string;
    duration: number;
    thumbnail: string;
    formats: YtDlpFormat[];
    uploader: string;
    view_count: number;
}




async function getVideoInfo(url: string): Promise<YtDlpInfo> {
    try {
        // Use yt-dlp to extract video information
        const command = `"C:\\Users\\Abid\\AppData\\Roaming\\Python\\Python312\\Scripts\\yt-dlp.exe" --dump-json --no-download "${url}"`;
        const { stdout } = await execAsync(command, {
            timeout: 30000,
            maxBuffer: 10 * 1024 * 1024 // 10MB buffer
        });

        const videoInfo = JSON.parse(stdout.trim());
        return videoInfo;
    } catch (error) {
        console.error('Error extracting video info:', error);
        throw new Error('Failed to extract video information');
    }
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number | null): string {
    if (!bytes) return 'Unknown';

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);

    return `${Math.round(size * 100) / 100} ${sizes[i]}`;
}

function getQualityLabel(format: YtDlpFormat): string {
    if (format.height) {
        return `${format.height}p`;
    } else if (format.resolution && format.resolution !== 'audio only') {
        return format.resolution;
    } else if (format.format_note) {
        return format.format_note;
    }
    return format.format_id;
}

async function processVideoUrl(url: string) {
    if (!url || !isValidVideoUrl(url)) {
        throw new Error('Invalid video URL');
    }

    const videoInfo = await getVideoInfo(url);

    // Filter and sort video formats
    const videoFormats = videoInfo.formats
        .filter(format =>
            format.vcodec !== 'none' &&
            format.acodec !== 'none' &&
            format.ext === 'mp4' &&
            format.height
        )
        .sort((a, b) => (a.height || 0) - (b.height || 0))
        .reduce((acc, format) => {
            // Remove duplicates based on height
            const existing = acc.find(f => f.height === format.height);
            if (!existing || (format.filesize && (!existing.filesize || format.filesize < existing.filesize))) {
                return [...acc.filter(f => f.height !== format.height), format];
            }
            return acc;
        }, [] as YtDlpFormat[]);

    // Also get audio-only format if available
    const audioFormat = videoInfo.formats.find(format =>
        format.vcodec === 'none' &&
        format.acodec !== 'none' &&
        format.ext === 'm4a'
    );

    const qualities = videoFormats.map(format => ({
        quality: getQualityLabel(format),
        url: format.url,
        fileSize: formatFileSize(format.filesize),
        format: format.ext.toUpperCase(),
        formatId: format.format_id
    }));

    // Add audio-only option if available
    if (audioFormat) {
        qualities.unshift({
            quality: 'Audio Only',
            url: audioFormat.url,
            fileSize: formatFileSize(audioFormat.filesize),
            format: audioFormat.ext.toUpperCase(),
            formatId: audioFormat.format_id
        });
    }

    return {
        title: videoInfo.title,
        duration: formatDuration(videoInfo.duration),
        thumbnail: videoInfo.thumbnail || 'https://via.placeholder.com/320x240?text=No+Thumbnail',
        uploader: videoInfo.uploader || 'Unknown',
        viewCount: videoInfo.view_count || 0,
        qualities
    };
}

function isValidVideoUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        const validDomains = [
            'youtube.com',
            'youtu.be',
            'vimeo.com',
            'dailymotion.com',
            'twitch.tv',
            'facebook.com',
            'instagram.com',
            'tiktok.com',
            'twitter.com',
            'x.com',
            'reddit.com'
        ];

        return validDomains.some(domain =>
            urlObj.hostname.includes(domain)
        );
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const videoInfo = await processVideoUrl(url);
        return NextResponse.json(videoInfo);

    } catch (error) {
        console.error('Error processing video:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}
