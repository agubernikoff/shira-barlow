import { PortableText } from "@portabletext/react";
import { useRouteLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "../sanity/SanityClient";
import SanityExternalLink from "../sanity/SanityExternalLink";
import { motion, AnimatePresence } from "motion/react";

export const meta = () => [{ title: "Shira Barlow, M.S. RD" }];

export default function Index() {
  const { homePage } = useRouteLoaderData("root");
  const rawImages = homePage?.heroImages?.filter(Boolean) || [];

  const [displayPopUp, setDisplayPopUp] = useState(true);

  function close() {
    setDisplayPopUp(false);
  }

  return (
    <div>
      <HeroImages rawImages={rawImages} />
      <AnimatePresence mode="popLayout">
        {displayPopUp && (
          <motion.div
            className="homepage-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PopUp popup={homePage.popup} close={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroImages({ rawImages }) {
  // Clone first and last image to enable seamless looping
  const images = [rawImages[rawImages.length - 1], ...rawImages, rawImages[0]];
  const [currentIndex, setCurrentIndex] = useState(1); // start at the first real image
  const [isAnimating, setIsAnimating] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursor({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseEnter = (e, direction) => {
    setHovered(direction);
    setCursor({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const sliderRef = useRef(null);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle transition end to jump without animation if needed
  useEffect(() => {
    const slider = sliderRef.current;
    const handleTransitionEnd = () => {
      setIsAnimating(false);

      // Jump to real first if moved from clone of last
      if (currentIndex === images.length - 1) {
        slider.style.transition = "none";
        setCurrentIndex(1);
        requestAnimationFrame(() => {
          slider.style.transition = "transform 0.5s ease";
        });
      }

      // Jump to real last if moved from clone of first
      if (currentIndex === 0) {
        slider.style.transition = "none";
        setCurrentIndex(images.length - 2);
        requestAnimationFrame(() => {
          slider.style.transition = "transform 0.5s ease";
        });
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, images.length]);
  return (
    <div className="carousel-container">
      <div
        ref={sliderRef}
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`,
          transition: isAnimating ? "transform 0.5s ease" : "none",
          width: `${images.length * 100}vw`,
        }}
      >
        {images.map((image, i) => (
          <div className="carousel-slide" key={i}>
            <img
              src={urlFor(image).auto("format").fit("crop").url()}
              alt={`Hero ${i}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-button left"
        onMouseMove={(e) => handleMouseMove(e, "prev")}
        onMouseEnter={(e) => handleMouseEnter(e, "prev")}
        onMouseLeave={() => setHovered(null)}
        onClick={prev}
      />
      <button
        className="carousel-button right"
        onMouseMove={(e) => handleMouseMove(e, "next")}
        onMouseEnter={(e) => handleMouseEnter(e, "next")}
        onMouseLeave={() => setHovered(null)}
        onClick={next}
      />

      {hovered && (
        <div
          className={`cursor-label ${hovered}`}
          style={{ left: cursor.x, top: cursor.y }}
        >
          {hovered === "prev" ? "Previous" : "Next"}
        </div>
      )}
    </div>
  );
}

function PopUp({ popup, close }) {
  return (
    <>
      <button onClick={close}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.899 0L5.656 4.242L1.414 0L0 1.414L4.242 5.656L0 9.898L1.414 11.312L5.656 7.07L9.899 11.312L11.313 9.898L7.071 5.656L11.313 1.414L9.899 0Z"
            fill="#1E1504"
          />
        </svg>
      </button>
      <PortableText
        value={popup}
        components={{
          marks: {
            linkExternal: SanityExternalLink,
          },
        }}
      />
    </>
  );
}
