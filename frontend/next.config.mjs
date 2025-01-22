/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'aceternity.com',
            'i.pinimg.com',
            'upload.wikimedia.org',
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
