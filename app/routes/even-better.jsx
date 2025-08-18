import { PortableText } from "@portabletext/react";
import { useRouteLoaderData } from "@remix-run/react";
import SanityExternalLink from "../sanity/SanityExternalLink";

export const meta = () => {
  return [{ title: `Shira Barlow, M.S. RD | EVEN BETTER` }];
};

function EvenBetter() {
  const { settings, evenBetter } = useRouteLoaderData("root");

  const mappedImages = settings?.evenBetterHero?.images?.map((image) => (
    <CollageImage image={image} key={image._key} />
  ));
  return (
    <div className="pages-container">
      <div
        className="even-better-hero-container"
        style={{
          background: settings?.evenBetterHero?.background,
          position: "relative",
        }}
      >
        {mappedImages}
      </div>
      <div className="even-better-content-container">
        <img src={evenBetter?.logo?.asset?.url} alt="" />
        <PortableText
          value={evenBetter?.headerText}
          components={{
            marks: {
              linkExternal: SanityExternalLink,
            },
          }}
        />
        <div className="even-better-links-container">
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
          {evenBetter?.articleLinks?.map((link, i) => (
            <a
              key={link._key}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank"
              className="even-better-link"
            >
              <span>
                {i + 1 < 10 ? 0 : ""}
                {i + 1}
              </span>
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollageImage({ image }) {
  //   console.log(image);
  const transformX = image.centerHorizontally ? "translateX(-50%)" : "";
  const transformY = image.centerVertically ? "translateY(-50%)" : "";
  const transform = [transformX, transformY].filter(Boolean).join(" ");
  return (
    <img
      alt=""
      src={image.image.asset.url}
      style={{
        position: "absolute",
        [image.horizontalAlignFrom ?? "left"]: image.horizontalPosition ?? "0",
        [image.verticalAlignFrom ?? "top"]: image.verticalPosition ?? "0",
        width: image.width ?? "auto",
        zIndex: image.zIndex ?? 1,
        objectFit: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
        ...(transform ? { transform } : {}),
      }}
    />
  );
}
export default EvenBetter;
