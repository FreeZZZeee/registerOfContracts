/** @type {import('next').NextConfig} */
const nextConfig = {
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/',
    //         },
    //         {
    //             source: '/auth/login',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/auth/login',
    //         },
    //         {
    //             source: '/auth/reset',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/auth/reset',
    //         },
    //         {
    //             source: '/auth/register',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/auth/register',
    //         },
    //         {
    //             source: '/auth/new-verification',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/auth/new-verification',
    //         },
    //         {
    //             source: '/auth/new-password',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'host',
    //                     value: '82.179.112.145:3000',
    //                 },
    //             ],
    //             permanent: false,
    //             destination: 'https://testzakupki.pstu.ru/auth/new-password',
    //         },
    //     ];
    // },
};

export default nextConfig;
