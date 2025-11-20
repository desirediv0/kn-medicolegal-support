/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ferf1mheo22r9ira.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'desirediv-storage.blr1.cdn.digitaloceanspaces.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            }
        ]
    }
};

export default nextConfig;
