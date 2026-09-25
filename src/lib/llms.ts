import { builds, courseLabs } from "../data/builds";
import { education, theses } from "../data/education";
import { essays } from "../data/essays";
import { papers } from "../data/papers";
import { site, nav, stack, research } from "../data/site";
import { mavenCourses, lightningLessons, mavenSchool } from "../data/teaching";
import { books } from "../data/entities";

const abs = (href: string) => new URL(href, `${site.url}/`).href;

export function llmsIndex() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Hi, I am Abi. I am an AI Infrastructure Engineer building inference systems for data centers, neoclouds, and hyperscalers. I write and teach inference engineering: serving path, KV cache, SLOs, GPUs, and the job around them.",
    "",
    "## Joule",
    `- [Joule](${site.links.joule}): ${site.joule}`,
    "",
    "## Teaching / Maven",
    `- School: [${mavenSchool.href}](${mavenSchool.href}). ${mavenSchool.subscribers} subscribers. ${mavenSchool.standing}.`,
    `- Invited Expert and Faculty Member on AI Inferencing for [Andreessen Horowitz Academy (The Academy SF)](${site.links.academy}).`,
    ...mavenCourses.map((item) => `- [${item.title}](${item.href}) (${item.meta}): ${item.note}`),
    ...lightningLessons.map((item) => `- Lightning lesson: [${item.title}](${item.href}) (${item.meta})`),
    `- 1:1 mentorship: [${site.links.mentorship}](${site.links.mentorship})`,
    "",
    "## The stack I teach",
    ...stack.map(
      (layer, i) =>
        `- ${String(i + 1).padStart(2, "0")} ${layer.layer}: ${layer.tools.join(", ")}`,
    ),
    "",
    "## Doctoral research",
    `- ${site.doctorate.title}.`,
    site.doctorate.statement,
    ...research.map((item) => `- ${item.title}: ${item.note}`),
    "",
    "## Education and theses",
    ...education.map((item) => `- ${item.year} ${item.title}: ${item.note}`),
    ...theses.map((item) => `- Thesis ${item.year}: ${item.title}. ${item.note}`),
    "",
    "## Books",
    ...Object.values(books).map((item) => `- [${item.title}](${abs(item.href)}): ${item.note}`),
    "",
    "## Pages",
    `- [Home](${site.url}/)`,
    ...nav.filter((item) => item.href !== "/").map((item) => `- [${item.label}](${abs(item.href)})`),
    `- [llms.txt](${site.url}/llms.txt)`,
    `- [llms-full.txt](${site.url}/llms-full.txt)`,
    "",
    `- [Sitemap](${site.url}/sitemap/)`,
    "",
    "## Investigations",
    ...essays
      .filter((item) => item.onSite && item.kind !== "Archive")
      .map((item) => {
        const keys = item.keywords?.length ? ` Keywords: ${item.keywords.join(", ")}.` : "";
        return `- [${item.title}](${abs(item.href)}): ${item.note}${keys}`;
      }),
    "",
    "## Archive writing",
    ...essays
      .filter((item) => item.onSite && item.kind === "Archive")
      .map((item) => `- [${item.title}](${abs(item.href)}): ${item.note}`),
    "",
    "## Projects I built",
    ...builds.map(
      (item) =>
        `- [${item.title}](${item.href}) (${item.kind}): ${item.note} Keywords: ${item.keywords.join(", ")}.`,
    ),
    "",
    "## Course labs",
    ...courseLabs.map(
      (item) =>
        `- [${item.title}](${item.href}) (${item.kind}): ${item.note} Keywords: ${item.keywords.join(", ")}.`,
    ),
    "",
    "## Elsewhere",
    `- [ModelCraft](${site.links.modelcraft})`,
    `- [GitHub](${site.links.github})`,
    `- [LinkedIn](${site.links.linkedin})`,
    `- [X](${site.links.x})`,
    `- [YouTube](${site.links.youtube})`,
    `- [Podcast](${site.links.podcast})`,
    `- [gpuengineering.com](${site.links.gpuengineering})`,
    "",
  ].join("\n");
}

export function llmsFull() {
  return [
    llmsIndex().trim(),
    "",
    "## Papers",
    ...papers.map((item) => `- ${item.year} ${item.title}${item.href ? ` (${item.href})` : ""}. ${item.note}`),
    "",
    "## Stack tools, one per line",
    ...stack.flatMap((layer) =>
      layer.tools.map((tool) => `- ${tool} (${layer.layer} layer, taught by Abi Aryan)`),
    ),
    "",
    "## Project keywords, one per line",
    ...builds.flatMap((item) =>
      item.keywords.map((keyword) => `- ${keyword} (${item.title}, ${item.kind})`),
    ),
    "",
  ].join("\n");
}
