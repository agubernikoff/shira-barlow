import { NavLink, useLocation } from "@remix-run/react";
import { urlFor } from "../sanity/SanityClient";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  hidden: { opacity: 0, y: 10 },
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

function Header({ header }) {
  const { logo, menu } = header;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function toggle() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const { pathname } = useLocation();
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
            <MobileMenu menu={menu} />
          </motion.div>
        )}
      </AnimatePresence>
      <NavLink to="/">
        <img
          alt="Shira Barlow, M.S. RD"
          src={urlFor(logo).auto("format").fit("crop").url()}
        />
      </NavLink>
      <Menu menu={menu} />
      <MenuToggle isMobileMenuOpen={isMobileMenuOpen} toggle={toggle} />
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
          x1="0"
          y1="10.5"
          x2="27"
          y2="10.5"
          stroke="black"
          initial={{ opacity: 1 }}
          animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line2"}
          className="line"
          x1="0"
          y1="14.5"
          x2="27"
          y2="14.5"
          stroke="black"
          style={{
            transformOrigin: "center",
            transform: isMobileMenuOpen
              ? "rotate(-15deg) translateY(2px)"
              : "rotate(0deg) translateY(0px)",
          }}
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isMobileMenuOpen ? "-15deg" : "0deg",
            y: isMobileMenuOpen ? "2px" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line3"}
          className="line"
          x1="0"
          y1="18.5"
          x2="27"
          y2="18.5"
          stroke="black"
          style={{
            transformOrigin: "center",
            transform: isMobileMenuOpen
              ? "rotate(15deg) translateY(-2px)"
              : "rotate(0deg) translateY(0px)",
          }}
          initial={{ rotate: 0, y: 0 }}
          animate={{
            rotate: isMobileMenuOpen ? "15deg" : "0deg",
            y: isMobileMenuOpen ? "-2px" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.line
          key={"line4"}
          className="line"
          x1="0"
          y1="22.5"
          x2="27"
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

function MobileMenu({ menu }) {
  return (
    <>
      <motion.div variants={menuItemVariants}>
        <Menu menu={menu} />
      </motion.div>
      <motion.div variants={menuItemVariants} className="mobile-menu-ig-link">
        <div>x</div>
      </motion.div>
    </>
  );
}

export default Header;
