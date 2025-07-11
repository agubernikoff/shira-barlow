// New MobileExpandableMenu.jsx component
import { useLocation, useNavigate } from "@remix-run/react";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

export function MobileExpandableMenu({ menu, children }) {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);

  // Find which section should be expanded based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = menu.links.find((section) =>
      currentPath.includes(section.reference.slug)
    );
    if (activeSection) {
      setExpandedSection(activeSection.reference.title);
    }
  }, [location.pathname, menu]);

  const getCurrentPageData = () => {
    const currentPath = location.pathname;
    for (const section of menu.links) {
      const activeItem = currentPath.includes(section.reference.slug);

      if (activeItem) {
        return { section: section.reference.title, item: activeItem };
      }
    }
    return null;
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }, 300);
  }, [location.pathname]);

  const currentPageData = getCurrentPageData();

  const toggleSection = (sectionTitle) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  const nav = useNavigate();

  const ref = useRef(null);

  return (
    <div className="mobile-expandable-menu">
      {menu.links.map((section) => {
        const isExpanded = expandedSection === section.reference.title;
        const isCurrentSection =
          currentPageData?.section === section.reference.title;

        return (
          <motion.div
            key={section._key}
            className="menu-section"
            initial={{ height: "18px" }}
            animate={{ height: isExpanded ? "auto" : "18px" }}
            ref={isCurrentSection ? ref : null}
          >
            <button
              className={`section-header ${isExpanded ? "expanded" : ""}`}
              onClick={() => {
                if (!isExpanded)
                  setTimeout(
                    () =>
                      nav(`/pages/${section.reference.slug}`, {
                        preventScrollReset: true,
                      }),
                    300
                  );
                toggleSection();
              }}
            >
              <span className="section-title">{section.reference.title}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="6"
                  y1="2"
                  x2="6"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="2"
                  y1="6"
                  x2="10"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
            {isCurrentSection && (
              <div className="section-page-content">{children}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
