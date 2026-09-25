import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST = "dist";

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function relativeTo(file, absUrl) {
  const relFile = path.relative(DIST, file).split(path.sep).join("/");
  const depth = relFile.split("/").length - 1;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  return `${prefix}${absUrl.replace(/^\//, "")}`;
}

const files = await walk(DIST);
for (const file of files) {
  const html = await readFile(file, "utf8");
  const next = html.replace(/(href|src|action)="(\/[^"]*)"/g, (match, attr, url) => {
    if (url.startsWith("//")) return match;
    return `${attr}="${relativeTo(file, url)}"`;
  });
  if (next !== html) await writeFile(file, next);
}
