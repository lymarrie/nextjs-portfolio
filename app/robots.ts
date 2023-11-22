export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://nextjs-portfolio-ten-neon.vercel.app/sitemap.xml',
    host: 'https://nextjs-portfolio-ten-neon.vercel.app',
  };
}
