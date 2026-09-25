import { builds, courseLabs } from "./builds";
import { essays } from "./essays";

export const investigations = essays.filter((item) => item.kind !== "Archive");
export const archiveEssays = essays.filter((item) => item.kind === "Archive");
export const allBuilds = [...builds, ...courseLabs];

export function uniqueKeywords(values: string[]) {
  return [...new Set(values.map((item) => item.trim()).filter(Boolean))];
}

export const projectKeywords = uniqueKeywords(
  allBuilds.flatMap((item) => [item.title, item.kind, ...item.keywords]),
);

export const investigationKeywords = uniqueKeywords(
  essays.flatMap((item) => [item.title, item.kind ?? "", item.note, ...("keywords" in item && item.keywords ? item.keywords : [])]),
);

export const indexKeywords = uniqueKeywords([...projectKeywords, ...investigationKeywords]);
