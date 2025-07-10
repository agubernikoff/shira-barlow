import { NavLink } from "@remix-run/react";
import { urlFor } from "../sanity/SanityClient";

function Header({ header }) {
  const { logo, menu } = header;
  return (
    <div className="header">
      <NavLink to="/">
        <img
          alt="Shira Barlow, M.S. RD"
          src={urlFor(logo).auto("format").fit("crop").url()}
        />
      </NavLink>
      <Menu menu={menu} />
    </div>
  );
}

export function Menu({ menu, location }) {
  console.log("menu", menu);
  function activeStyles({ isActive }) {
    if (location === "pages")
      return {
        opacity: isActive ? 1 : 0.25,
      };
  }
  const links = menu?.links?.map((link) => {
    if (link._type === "linkInternal") {
      if (!link.reference)
        return (
          <NavLink to={link.path} key={link._key}>
            {link.title}
          </NavLink>
        );
      if (link.reference?._type === "page")
        return (
          <NavLink
            to={`/pages/${link.reference.slug}`}
            key={link._key}
            style={activeStyles}
          >
            {link.reference.title}
          </NavLink>
        );
    }
  });
  return <nav>{links}</nav>;
}

export default Header;
