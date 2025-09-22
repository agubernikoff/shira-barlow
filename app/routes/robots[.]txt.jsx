export async function loader() {
  return new Response(
    `
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
    `.trim(),
    {
      headers: { "Content-Type": "text/plain" },
    }
  );
}
