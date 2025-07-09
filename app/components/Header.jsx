import { NavLink } from "@remix-run/react";
import React from "react";
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

function Menu({ menu }) {
  console.log(menu);
  const links = menu?.links?.map((link) => {
    if (link._type === "linkInternal") {
      if (link.reference?._type === "page")
        return (
          <NavLink to={`/pages/${link.reference.slug}`} key={link._key}>
            {link.reference.title}
          </NavLink>
        );
    }
  });
  return <nav>{links}</nav>;
}

export default Header;
