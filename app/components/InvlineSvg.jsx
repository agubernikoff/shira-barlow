import { useEffect, useState } from "react";
import { urlFor } from "../sanity/SanityClient";

export default function InlineSvg({
  image,
  alt = "",
  className = "",
  style = {},
  forceColor,
}) {
  const [inlineSvg, setInlineSvg] = useState(null);

  // Generate Sanity URL
  const url = image?.asset?.url || urlFor(image).url();
  const isSvg = url?.toLowerCase().endsWith(".svg");

  useEffect(() => {
    if (isSvg) {
      fetch(url)
        .then((res) => res.text())
        .then((svgText) => {
          let processed = svgText;

          // Strip width/height so CSS can control size
          processed = processed.replace(/(width|height)="[^"]*"/g, "");

          // Optionally recolor
          if (forceColor) {
            processed = processed
              .replace(/fill="[^"]*"/g, `fill="${forceColor}"`)
              .replace(/stroke="[^"]*"/g, `stroke="${forceColor}"`);
          }

          setInlineSvg(processed);
        })
        .catch((err) => console.error("Failed to fetch SVG:", err));
    }
  }, [isSvg, url, forceColor]);

  if (isSvg && inlineSvg) {
    return (
      <div
        className={`inline-svg ${className}`}
        style={style}
        dangerouslySetInnerHTML={{ __html: inlineSvg }}
        aria-label={alt}
        role="img"
      />
    );
  }

  // Non-SVG fallback
  return (
    <img
      src={urlFor(image).auto("format").fit("crop").url()}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
