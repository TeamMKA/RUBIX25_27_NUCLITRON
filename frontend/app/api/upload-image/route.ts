/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const { image, filename } = await req.json();

        // Upload image to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                image,
                {
                    folder: 'user-uploads',
                    public_id: `${Date.now()}_${filename}`,
                    overwrite: true,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        });

        // Return the secure URL and public_id
        return NextResponse.json({
            url: (uploadResponse as any).secure_url,
            public_id: (uploadResponse as any).public_id, // Return public_id for later use
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                message: 'Upload failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

