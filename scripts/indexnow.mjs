const KEY = "faf32153d859d903358f0ebc6874975c";
const HOST = "abiaryan.com";
const KEY_URL = `https://${HOST}/${KEY}.txt`;

const fallback = [
  "/",
  "/about/",
  "/writing/",
  "/books/",
  "/teaching/",
  "/advisory/",
  "/advisory/diagnostic/",
  "/advisory/retainer/",
  "/code/",
  "/speaking/",
  "/sitemap/",
  "/llms.txt",
  "/llms-full.txt",
].map((path) => `https://${HOST}${path}`);

async function locsFrom(url) {
  const res = await fetch(url);
  if (!res.ok) return [];
  const xml = await res.text();
  const hrefs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  const nested = hrefs.filter((href) => href.endsWith(".xml"));
  const pages = hrefs.filter((href) => !href.endsWith(".xml"));
  const children = (await Promise.all(nested.map(locsFrom))).flat();
  return [...pages, ...children];
}

const urls = [...new Set((await locsFrom(`https://${HOST}/sitemap-index.xml`)).concat(fallback))];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_URL,
    urlList: urls,
  }),
});

console.log(`IndexNow ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (!res.ok) {
  console.log(await res.text());
  process.exitCode = 0;
}
