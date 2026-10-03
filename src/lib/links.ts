export function isExternalHref(href?: string, origin = "https://abiaryan.com") {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("/") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  try {
    const url = new URL(href, origin);
    return (url.protocol === "http:" || url.protocol === "https:") && url.origin !== new URL(origin).origin;
  } catch {
    return false;
  }
}

export function externalLinkAttrs(href?: string) {
  if (!isExternalHref(href)) return {};
  return { target: "_blank", rel: "noopener noreferrer" } as const;
}
