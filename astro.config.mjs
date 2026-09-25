import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://abiaryan.com",
  trailingSlash: "always",
  build: {
    assets: "site",
  },
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/advisory/thanks"),
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
