import { useRouteLoaderData } from "@remix-run/react";

export const meta = () => {
  return [{ title: `Shira Barlow, M.S. RD | EVEN BETTER` }];
};

function EvenBetter() {
  const { settings } = useRouteLoaderData("root");

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
      <div className="pages-content-container"></div>
    </div>
  );
}

function CollageImage({ image }) {
  console.log(image);
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
        transform: `
          ${image.centerHorizontally ? "translateX(-50%)" : ""}
          ${image.centerVertically ? "translateY(-50%)" : ""}
        `.trim(),
      }}
    />
  );
}
export default EvenBetter;
