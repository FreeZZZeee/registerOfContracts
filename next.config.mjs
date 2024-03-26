/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: 'https://testzakupki.pstu.ru/',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
