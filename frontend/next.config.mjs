/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'aceternity.com',
            'img.etimg.com',
            'i.pinimg.com',
            'upload.wikimedia.org',
            'images.squarespace-cdn.com',
            'media.licdn.com',
            'wisdomshort.com',
            'framerusercontent.com',
            'res.cloudinary.com',
            'media.licdn.com',
            'assets.aceternity.com',
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
