import {
  Links,
  Meta,
  useOutlet,
  useLocation,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import {
  EVEN_BETTER_QUERY,
  HOME_QUERY,
  SETTINGS_QUERY,
} from "./sanity/queries";
import { client } from "./sanity/SanityClient";
import appStyles from "./styles/app.css?url";

export const links = () => [
  {
    rel: "stylesheet",
    href: appStyles,
  },
];

export const meta = () => {
  return [
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Shira Barlow",
        url: "https://shirard.com",
        jobTitle:
          "Registered Dietitian, Celebrity Nutritionist, Hormonal Health Nutritionist, PCOS Nutritionist",
        worksFor: {
          "@type": "Organization",
          name: "Goop",
        },
        sameAs: [
          "https://www.instagram.com/shira_rd/",
          "https://www.linkedin.com/in/shira-barlow-ms-rd-4266586b/",
          "https://shirard.substack.com/",
          "https://www.facebook.com/ShiraLenchewski/",
        ],
        description:
          "Shira Barlow is a Celebrity Nutritionist specializing in Blood Sugar Balancing, Weight Loss, GLP-1 Nutritionist programs, Hormonal Health, and Nutrition for Moms. Featured in Goop as a Celebrity Dietitian, she shares expert guidance on PCOS, Hormonal Health, and balanced diets on her Nutritionist Substack.",
        knowsAbout: [
          "Nutritionist Substack",
          "Blood sugar balancing",
          "Celebrity Nutritionist",
          "Goop Nutritionist",
          "Celebrity Dietitian",
          "PCOS Nutritionist",
          "Hormonal Health Nutritionist",
          "Weight Loss",
          "GLP-1 Nutritionist",
          "Nutritionist for Moms",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "New York University",
        },
      },
    },
  ];
};

export async function loader() {
  const homePage = await client.fetch(HOME_QUERY).then((response) => response);
  const settings = await client
    .fetch(SETTINGS_QUERY)
    .then((response) => response);
  const evenBetter = await client.fetch(EVEN_BETTER_QUERY).then((r) => r);
  const data = {
    homePage,
    settings,
    evenBetter,
  };

  return json(data);
}

export default function App() {
  const outlet = useOutlet();
  const location = useLocation();
  const data = useLoaderData();
  console.log("root: ", data);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header
          header={data.settings.header}
          turnHeaderLogo={data.settings.turnHeaderLogo || false}
          instagramLink={data?.settings?.instagramLink}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={
              location.pathname.startsWith("/pages")
                ? "/pages"
                : location.pathname
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // transition={{ duration: .5 }}
          >
            {outlet}
          </motion.main>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
