import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(req: NextRequest) {
    try {
        const { public_id } = await req.json(); // Get public_id from the request

        // Delete image from Cloudinary
        const deleteResponse = await new Promise((resolve, reject) => {
            interface DeleteResponse {
                result: string;
            }

            interface DeleteError {
                message: string;
            }

            cloudinary.uploader.destroy(
                public_id,
                (
                    error: DeleteError | null,
                    result: DeleteResponse | unknown
                ) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        });

        // Check if the deletion was successful
        if ((deleteResponse as { result: string }).result === 'ok') {
            return NextResponse.json({ message: 'Image deleted successfully' });
        } else {
            throw new Error('Failed to delete image');
        }
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            {
                message: 'Delete failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
