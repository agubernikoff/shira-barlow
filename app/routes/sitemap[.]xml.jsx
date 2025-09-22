import { client } from "../sanity/SanityClient";

// Fetch all pages with slugs from Sanity
const ALL_PAGES_QUERY = `*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`;

export async function loader() {
  const siteUrl = "https://shirard.com";

  // Static routes
  const staticRoutes = [
    { loc: `${siteUrl}/`, priority: 1.0 },
    { loc: `${siteUrl}/even-better`, priority: 0.8 },
    { loc: `${siteUrl}/pages`, priority: 0.7 },
  ];

  // Dynamic routes from Sanity
  let sanityPages = [];
  try {
    sanityPages = await client.fetch(ALL_PAGES_QUERY);
  } catch (err) {
    console.error("Error fetching Sanity pages for sitemap:", err);
  }

  const dynamicRoutes = sanityPages.map((p) => ({
    loc: `${siteUrl}/pages/${p.slug}`,
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (r) => `
    <url>
      <loc>${r.loc}</loc>
      <changefreq>weekly</changefreq>
      <priority>${r.priority}</priority>
    </url>`
    )
    .join("")}
</urlset>
  `.trim();

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
