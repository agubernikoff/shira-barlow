import { Outlet, useRouteLoaderData } from "@remix-run/react";
import { Menu } from "../components/Header";
import { MobileExpandableMenu } from "../components/MobileExpandableMenu";
import { urlFor } from "../sanity/SanityClient";

function Pages() {
  const { settings } = useRouteLoaderData("root");
  console.log(settings);
  return (
    <div className="pages-container">
      <div className="pages-hero-container">
        <img
          src={urlFor(settings.pagesHero).auto("format").fit("crop").url()}
          alt=""
        />
      </div>
      <div className="pages-content-container">
        <MobileExpandableMenu menu={settings.pagesSideNav}>
          <Outlet />
        </MobileExpandableMenu>
        <Menu menu={settings.pagesSideNav} location={"pages"} />
        <div className="pages-outlet">
          <Outlet />
        </div>
        <a
          className="listen-link"
          href={settings.aboutPageLittleLink?.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{settings.aboutPageLittleLink?.text}</span>
          {/* <svg
            width="9"
            height="11"
            viewBox="0 0 9 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5.5L-4.89399e-07 10.6962L-3.51373e-08 0.303847L9 5.5Z"
              fill="black"
            />
          </svg> */}
        </a>
      </div>
    </div>
  );
}

export default Pages;
