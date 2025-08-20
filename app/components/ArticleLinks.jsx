import React from "react";

function ArticleLinks({ value }) {
  console.log(value.links);
  return (
    <div className="even-better-links-container">
      {(value.links || value.articleLinks).map((link, i) => (
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
  );
}

export default ArticleLinks;
