import { useLoaderData } from "@remix-run/react";
import { SANITY_PAGE_QUERY } from "../sanity/queries";
import { client } from "../sanity/SanityClient";
import { motion, AnimatePresence } from "motion/react";
import { PortableText } from "@portabletext/react";
import articleLinks from "../components/ArticleLinks";

export const meta = ({ data }) => {
  return [{ title: `Shira Barlow, M.S. RD | ${data?.sanityPage.title ?? ""}` }];
};

export async function loader({ params }) {
  if (!params.handle) {
    throw new Error("Missing page handle");
  }

  const [sanityPage] = await Promise.all([
    // context.storefront.query(PAGE_QUERY, {
    //   variables: {
    //     handle: params.handle,
    //   },
    // }),
    // Add other queries here, so that they are loaded in parallel
    client.fetch(SANITY_PAGE_QUERY, { slug: params.handle }),
  ]);

  if (!sanityPage) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    sanityPage,
  };
}

export default function Page() {
  const data = useLoaderData();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={data?.sanityPage?.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="page-content"
      >
        <div className="page-content-portable-text-container">
          <PortableText
            value={data?.sanityPage?.body}
            components={{
              types: {
                articleLinks: articleLinks,
              },
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
