import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

function walk(node, visit) {
  visit(node);
  if (Array.isArray(node?.children)) {
    for (const child of node.children) walk(child, visit);
  }
}

function rehypeExternalLinks() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      if (href.startsWith("#") || href.startsWith("/") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      try {
        const url = new URL(href, "https://abiaryan.com");
        if (url.origin === "https://abiaryan.com") return;
        if (url.protocol !== "http:" && url.protocol !== "https:") return;
      } catch {
        return;
      }
      node.properties = node.properties ?? {};
      node.properties.target = "_blank";
      const rel = new Set(String(node.properties.rel ?? "").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      node.properties.rel = [...rel].join(" ");
    });
  };
}

export default defineConfig({
  site: "https://abiaryan.com",
  trailingSlash: "always",
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  build: {
    assets: "site",
  },
  adapter: process.env.ASTRO_LOCAL ? undefined : netlify(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/advisory/thanks"),
      customPages: ["https://abiaryan.com/llms.txt", "https://abiaryan.com/llms-full.txt"],
      serialize(item) {
        const path = new URL(item.url).pathname;
        const top =
          path === "/" ||
          path === "/about/" ||
          path === "/teaching/" ||
          path === "/books/" ||
          path === "/writing/" ||
          path === "/code/" ||
          path === "/speaking/" ||
          path === "/conferences/" ||
          path === "/sitemap/";
        const investigation = path.startsWith("/writing/") && path !== "/writing/";
        return {
          ...item,
          lastmod: new Date().toISOString(),
          changefreq: investigation ? "weekly" : "daily",
          priority: top ? 1 : investigation ? 0.9 : path.includes("/advisory") || path.includes("/speaking") ? 0.8 : 0.6,
        };
      },
    }),
  ],
  redirects: {
    "/posts/gpu-engineering": "/writing/llm-inference/",
    "/posts/llm-evals": "/writing/llm-evals/",
    "/posts/intro-llms": "/writing/intro-llms/",
    "/posts/mlops-open-problems": "/writing/mlops-open-problems/",
    "/posts/automl-problems-2019": "/writing/automl-problems/",
    "/posts/automl-survey-2019": "/writing/automl-problems/",
    "/posts/game-ai": "/writing/game-ai/",
    "/posts/why-tensorlayer": "/writing/why-tensorlayer/",
    "/posts/associative-memory": "/writing/associative-memory/",
    "/advisory/gpu": "/advisory/retainer/",
    "/advisory/agents": "/advisory/retainer/",
  },
});
