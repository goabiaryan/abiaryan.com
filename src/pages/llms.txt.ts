import type { APIRoute } from "astro";
import { essays } from "../data/essays";
import { site, nav } from "../data/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const abs = (href: string) => new URL(href, `${site.url}/`).href;
  const pages = nav
    .filter((item) => item.href !== "/")
    .map((item) => `- [${item.label}](${abs(item.href)})`);
  const writing = essays
    .filter((item) => item.onSite)
    .map((item) => `- [${item.title}](${abs(item.href)}): ${item.note}`);

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Hi, I am Abi. I write and teach inference engineering: serving path, KV cache, SLOs, GPUs, and the job around them.",
    "",
    "## Pages",
    `- [Home](${site.url}/)`,
    ...pages,
    "",
    "## Writing",
    ...writing,
    "",
    "## Elsewhere",
    `- [Joule](${site.links.joule})`,
    `- [ModelCraft](${site.links.modelcraft})`,
    `- [Maven](${site.links.mavenProfile})`,
    `- [GitHub](${site.links.github})`,
    `- [LinkedIn](${site.links.linkedin})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
