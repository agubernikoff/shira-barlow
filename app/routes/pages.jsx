import { Outlet, useRouteLoaderData } from "@remix-run/react";
import { Menu } from "../components/Header";
import { urlFor } from "../sanity/SanityClient";

function Pages() {
  const { settings } = useRouteLoaderData("root");
  return (
    <div className="pages-container">
      <div className="pages-hero-container">
        <img
          src={urlFor(settings.pagesHero).auto("format").fit("crop").url()}
          alt=""
        />
      </div>
      <div className="pages-content-container">
        <Menu menu={settings.pagesSideNav} location={"pages"} />
        <Outlet />
      </div>
    </div>
  );
}

export default Pages;
