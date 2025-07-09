import {
  Links,
  Meta,
  useOutlet,
  useLocation,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";
import { motion, AnimatePresence } from "motion/react";
import { client } from "./sanity/SanityClient";
import appStyles from "./styles/app.css?url";

export const links = () => [
  {
    rel: "stylesheet",
    href: appStyles,
  },
];

export async function loader({ request }) {
  const homePage = await client
    .fetch("*[_type == 'home'][0]{...,heroImages[]{...,asset->{url}}}")
    .then((response) => response);
  const data = {
    homePage,
  };

  return json(data);
}

export default function App() {
  const outlet = useOutlet();
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
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
