import { NavLink, useLocation } from "@remix-run/react";
import { urlFor } from "../sanity/SanityClient";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import InlineSvg from "./InvlineSvg";

const mobileMenuVariants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: {
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
  exit: {
    y: "-100%",
    transition: {
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

function Header({ header, instagramLink, turnHeaderLogo }) {
  const { logo, menu } = header;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  function toggle() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // Track window width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize(); // check initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  return (
    <div className="header">
      <AnimatePresence mode="popLayout">
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileMenu menu={menu} instagramLink={instagramLink} />
          </motion.div>
        )}
      </AnimatePresence>

      <NavLink to="/">
        <InlineSvg
          image={logo}
          alt="Shira Barlow, M.S. RD"
          className="header-logo"
          forceColor={
            turnHeaderLogo && pathname.includes("/pages") && !isMobile
              ? "white"
              : undefined
          }
        />
      </NavLink>

      <Menu menu={menu} />
      <MenuToggle isMobileMenuOpen={isMobileMenuOpen} toggle={toggle} />
    </div>
  );
}

export function Menu({ menu, location }) {
  const [hovered, setHovered] = useState("");

  const links = menu?.links?.map((link) => {
    if (link._type === "linkInternal") {
      if (!link.reference)
        return (
          <NavLink
            to={link.path}
            key={link._key}
            onMouseEnter={() => {
              if (location === "pages") setHovered(link.title);
            }}
            onMouseLeave={() => setHovered("")}
          >
            {link.title}
          </NavLink>
        );
      if (link.reference?._type === "page")
        return (
          <NavLink
            to={`/pages/${link.reference.slug}`}
            key={link._key}
            style={({ isActive }) => {
              let opacity = 1;
              if (location === "pages") {
                if (hovered === link.reference.title) {
                  opacity = 1;
                } else if (!isActive) {
                  opacity = 0.25;
                }
              }
              return { opacity };
            }}
            onMouseEnter={() => {
              if (location === "pages") setHovered(link.reference.title);
            }}
            onMouseLeave={() => setHovered("")}
          >
            {link.reference.title}
          </NavLink>
        );
    }
    if (link._type === "linkEmail")
      return (
        <a href={`mailto:${link.email}`} key={link._key}>
          Contact
        </a>
      );
  });

  return <nav>{links}</nav>;
}

function MenuToggle({ isMobileMenuOpen, toggle }) {
  return (
    <button
      onClick={() => {
        toggle();
      }}
      className="mobile-menu-toggle"
    >
      <svg
        width="27"
        height="34"
        viewBox="0 0 27 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          key={"line1"}
          className="line"
          x1="5"
          y1="10.5"
          x2="21"
          y2="10.5"
          stroke="black"
          initial={{ opacity: 1 }}
          animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line2"}
          className="line"
          x1="5"
          y1="14.5"
          x2="21"
          y2="14.5"
          stroke="black"
          style={{
            transformOrigin: "center",
            transform: isMobileMenuOpen
              ? "rotate(-45deg) translateY(4px)"
              : "rotate(0deg) translateY(0px)",
          }}
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isMobileMenuOpen ? "-45deg" : "0deg",
            y: isMobileMenuOpen ? "4px" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line3"}
          className="line"
          x1="5"
          y1="18.5"
          x2="21"
          y2="18.5"
          stroke="black"
          style={{
            transformOrigin: "center",
            transform: isMobileMenuOpen
              ? "rotate(45deg) translateY(0px)"
              : "rotate(0deg) translateY(0px)",
          }}
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isMobileMenuOpen ? "45deg" : "0deg",
            y: isMobileMenuOpen ? "0px" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line4"}
          className="line"
          x1="5"
          y1="22.5"
          x2="21"
          y2="22.5"
          stroke="black"
          initial={{ opacity: 1 }}
          animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </button>
  );
}

function MobileMenu({ menu, instagramLink }) {
  return (
    <>
      <motion.div variants={menuItemVariants}>
        <Menu menu={menu} />
      </motion.div>
      <motion.div variants={menuItemVariants} className="mobile-menu-ig-link">
        <a
          href={instagramLink?.instagram?.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
          {/* <InlineSvg
            image={instagramLink?.icon}
            alt="Instagram"
            className="ig-icon"
          /> */}
        </a>
      </motion.div>
    </>
  );
}

export default Header;
