import katex from "katex";
import { fromHtml } from "hast-util-from-html";

function identTex(name) {
  return `\\mathit{${name.replace(/_/g, "\\_")}}`;
}

function isNamedIdent(name) {
  if (/^[A-Za-z][A-Za-z0-9]+$/.test(name)) return true;
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name) || !name.includes("_")) return false;
  return name.split("_").slice(1).some((part) => part.length >= 2);
}

export function doTex(arg) {
  if (arg === "\\cdot" || arg === "·") return "\\mathit{do}(\\cdot)";
  const ident = arg.trim().replace(/\s+/g, "_");
  if (isNamedIdent(ident)) return `\\mathit{do}(${identTex(ident)})`;
  return `\\mathit{do}(${arg})`;
}

export function renderPlainMath(tex) {
  return katex.renderToString(tex, { throwOnError: false });
}

export function renderIdent(term) {
  const doMatch = /^do\((.+)\)$/.exec(term);
  if (doMatch) return renderPlainMath(doTex(doMatch[1]));
  if (term === "M_alloc") return renderPlainMath("M_{\\mathrm{alloc}}");
  return null;
}

const SKIP = new Set(["code", "pre", "script", "style", "textarea"]);

function classList(node) {
  const cls = node.properties?.className;
  if (Array.isArray(cls)) return cls;
  if (typeof cls === "string") return cls.split(/\s+/);
  return [];
}

function inKatex(node, parent) {
  for (const el of [node, parent]) {
    if (!el) continue;
    if (classList(el).some((name) => String(name).startsWith("katex"))) return true;
  }
  return false;
}

function splitPlainMath(value) {
  const re = /do\(([^)]+)\)|M_alloc|\$([^$\n]*[_\\^][^$\n]*)\$/g;
  const parts = [];
  let last = 0;
  let match;
  while ((match = re.exec(value))) {
    if (match.index > last) {
      parts.push({ type: "text", value: value.slice(last, match.index) });
    }
    const tex = match[0] === "M_alloc" ? "M_{\\mathrm{alloc}}" : match[2] ? match[2] : doTex(match[1]);
    const fragment = fromHtml(renderPlainMath(tex), { fragment: true });
    parts.push(...(fragment.children ?? []));
    last = match.index + match[0].length;
  }
  if (parts.length === 0) return null;
  if (last < value.length) parts.push({ type: "text", value: value.slice(last) });
  return parts;
}

export function rehypePlainMath() {
  return (tree) => {
    const visit = (node, parent) => {
      if (node.type === "element") {
        const cls = node.properties?.className;
        if (Array.isArray(cls)) {
          const sizeAt = cls.indexOf("sizing");
          if (sizeAt !== -1) cls[sizeAt] = "katex-sizing";
        }
        if (SKIP.has(node.tagName)) return;
      }
      if (node.type === "text" && parent?.type === "element" && !SKIP.has(parent.tagName) && !inKatex(node, parent)) {
        const next = splitPlainMath(node.value);
        if (next && typeof parent.children?.indexOf === "function") {
          const index = parent.children.indexOf(node);
          if (index !== -1) parent.children.splice(index, 1, ...next);
          return;
        }
      }
      if (!Array.isArray(node.children)) return;
      for (const child of [...node.children]) visit(child, node);
    };
    visit(tree, null);
  };
}
