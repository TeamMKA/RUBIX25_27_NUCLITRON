/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'aceternity.com',
            'i.pinimg.com',
            'upload.wikimedia.org',
            'media.licdn.com',
            'encrypted-tbn0.gstatic.com',
            'en.wikipedia.org',
            'aaregistry.org',
            'theindosphere.com',
            'images.squarespace-cdn.com',
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
