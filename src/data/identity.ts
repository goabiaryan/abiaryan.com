import { builds, courseLabs } from "./builds";
import { indexKeywords, investigations } from "./catalog";
import { author, course } from "./entities";
import { education, theses } from "./education";
import { site, stack, research } from "./site";
import { mavenCourses, lightningLessons, mavenSchool } from "./teaching";

const personId = `${author.url}#person`;
const jouleId = `${site.links.joule}#org`;

export const stackTopics = stack.flatMap((layer) => [layer.layer, ...layer.tools]);

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: author.name,
  url: author.url,
  jobTitle: author.role,
  description: site.description,
  sameAs: author.sameAs,
  knowsAbout: [
    ...author.focus,
    "LLMOps",
    "inference power economics engine",
    "AI inference engineering",
    "digital twin",
    "SLO-aware inference",
    "hardware-aware compilers",
    "phase-aware observability",
    ...stackTopics,
    ...indexKeywords,
  ],
  worksFor: { "@id": jouleId },
  founder: { "@id": jouleId },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "NOVA IMS",
      url: "https://www.novaims.unl.pt/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "The London School of Economics and Political Science",
      url: "https://www.lse.ac.uk/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Maharshi Dayanand University",
    },
  ],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "AI Infrastructure Engineer",
      description: site.description,
    },
    {
      "@type": "Occupation",
      name: "Invited Faculty for AI Inference Engineering",
      occupationLocation: {
        "@type": "Organization",
        name: "Andreessen Horowitz Academy (The Academy SF)",
        url: site.links.academy,
      },
    },
    {
      "@type": "Occupation",
      name: "Instructor",
      occupationLocation: {
        "@type": "Organization",
        name: "Maven",
        url: mavenSchool.href,
      },
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  author: { "@id": personId },
  about: { "@id": personId },
  publisher: { "@id": personId },
};

export const jouleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": jouleId,
  name: "Joule",
  url: site.links.joule,
  founder: { "@id": personId },
  description:
    "Joule is an inference power economics engine that ties physical GPU energy to token throughput and SLO goodput.",
};

export const courseJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    url: course.href,
    description: course.note,
    provider: { "@type": "Organization", name: "Maven", url: mavenSchool.href },
    instructor: { "@id": personId },
  },
  ...mavenCourses
    .filter((item) => item.href !== course.href)
    .map((item) => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: item.title,
      url: item.href,
      description: item.note,
      provider: { "@type": "Organization", name: "Maven", url: mavenSchool.href },
      instructor: { "@id": personId },
    })),
];

export const thesisJsonLd = theses.map((item) => ({
  "@context": "https://schema.org",
  "@type": "Thesis",
  name: item.title,
  datePublished: item.year,
  url: item.href,
  author: { "@id": personId },
  description: item.note,
}));

export const projectJsonLd = [...builds, ...courseLabs].map((item) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: item.title,
  url: item.href,
  applicationCategory: item.kind,
  description: item.note,
  keywords: item.keywords.join(", "),
  author: { "@id": personId },
}));

export const investigationJsonLd = investigations.map((item) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: item.title,
  url: new URL(item.href, `${site.url}/`).href,
  datePublished: item.date,
  description: item.note,
  keywords: (item.keywords ?? []).join(", "),
  author: { "@id": personId },
}));

export const identityJsonLd = [websiteJsonLd, personJsonLd, jouleJsonLd, ...projectJsonLd];

export const aboutJsonLd = [
  ...education.map((item) => ({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: item.title,
    description: item.note,
    recognizedBy: item.href ? { "@type": "Organization", url: item.href } : undefined,
  })),
  ...thesisJsonLd,
  {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: site.doctorate.title,
    description: site.doctorate.statement,
    author: { "@id": personId },
    keywords: research.map((item) => item.title).join(", "),
  },
];

export const teachingJsonLd = [
  ...courseJsonLd,
  ...lightningLessons.map((item) => ({
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: item.title,
    url: item.href,
    timeRequired: item.meta,
    isAccessibleForFree: true,
    instructor: { "@id": personId },
  })),
];
