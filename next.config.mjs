/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.articles.media',
                port: '',
                // pathname: '',
            },
            {
                protocol: 'https',
                hostname: 'articles-website.s3.amazonaws.com',
                port: '',
                // pathname: '',
            },
        ],
    },
    async headers() {
        if (process.env.NODE_ENV === 'development') {
            return [];
        }
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://articles.media",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
