import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://abiaryan.com",
  trailingSlash: "always",
  adapter: netlify(),
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
