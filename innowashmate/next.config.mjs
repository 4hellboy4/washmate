/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard',
            },
            {
                source: '/item/:id',
                destination: '/item/:id',
            },
            {
                source: '/about',
                destination: '/about'
            }
        ];
    },
};

export default nextConfig;
