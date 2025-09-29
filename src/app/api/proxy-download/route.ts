// app/api/download-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoUrl = searchParams.get('url');
        const filename = searchParams.get('filename') || 'video.mp4';

        if (!videoUrl) {
            return NextResponse.json(
                { error: 'Video URL is required' },
                { status: 400 }
            );
        }

        console.log('Downloading video from:', videoUrl);

        // Fetch the video from the original URL
        const response = await fetch(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'video/mp4,video/webm,video/*,*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch video:', response.status, response.statusText);
            throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'video/mp4';
        const contentLength = response.headers.get('content-length');

        console.log('Video content type:', contentType);
        console.log('Video content length:', contentLength);

        // Get the video data as a stream
        const videoStream = response.body;

        if (!videoStream) {
            throw new Error('No video stream available');
        }

        // Create response headers for download
        const headers = new Headers({
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        });

        // Add content length if available
        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        // Return the video stream with download headers
        return new NextResponse(videoStream, {
            status: 200,
            headers: headers,
        });

    } catch (error) {
        console.error('Proxy download error:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to download video',
                details: 'Check server logs for more information'
            },
            { status: 500 }
        );
    }
}