"use client";

import { useState } from "react";
import Image from "next/image";

interface TechStackImage {
  url: string;
  alt: string;
}

interface TechStackItem {
  id: string;
  label: string;
  image: TechStackImage;
}

interface TechStackTab {
  id: string;
  title: string;
  items: TechStackItem[];
}

interface OurTechStackProps {
  title?: string;
  description?: string;
  tabs?: TechStackTab[];
  defaultActiveTabId?: string;
}

const createIconDataUrl = () =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect width="80" height="80" rx="20" fill="white"/>
        <circle cx="40" cy="32" r="14" fill="#161616" fill-opacity="0.08"/>
        <path d="M40 17c1 4-1 7-4 9 4 1 7-1 8-5 1-3 0-5-1-7-1 1-2 2-3 3Z" fill="#161616"/>
        <path d="M47 46c-2 3-4 5-7 5-3 0-4-2-8-2-4 0-5 2-8 2-3 0-5-3-7-6-4-7-4-16 0-19 2-2 4-3 7-3 3 0 5 2 8 2 2 0 4-2 7-2 2 0 5 1 7 4-6 4-5 13 1 16Z" fill="#161616"/>
      </svg>
    `)}`;

const staticTabs: TechStackTab[] = [
  {
    id: "mobile",
    title: "Mobile",
    items: [
      {
        id: "ios-1",
        label: "iOS",
        image: { url: createIconDataUrl(), alt: "iOS" },
      },
      {
        id: "ios-2",
        label: "iOS",
        image: { url: createIconDataUrl(), alt: "iOS" },
      },
      {
        id: "ios-3",
        label: "iOS",
        image: { url: createIconDataUrl(), alt: "iOS" },
      },
      {
        id: "ios-4",
        label: "iOS",
        image: { url: createIconDataUrl(), alt: "iOS" },
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    items: [
      {
        id: "react",
        label: "React",
        image: { url: createIconDataUrl(), alt: "React" },
      },
      {
        id: "next",
        label: "Next.js",
        image: { url: createIconDataUrl(), alt: "Next.js" },
      },
      {
        id: "vue",
        label: "Vue",
        image: { url: createIconDataUrl(), alt: "Vue" },
      },
      {
        id: "angular",
        label: "Angular",
        image: { url: createIconDataUrl(), alt: "Angular" },
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      {
        id: "node",
        label: "Node.js",
        image: { url: createIconDataUrl(), alt: "Node.js" },
      },
      {
        id: "dotnet",
        label: ".NET",
        image: { url: createIconDataUrl(), alt: ".NET" },
      },
      {
        id: "php",
        label: "PHP",
        image: { url: createIconDataUrl(), alt: "PHP" },
      },
      {
        id: "python",
        label: "Python",
        image: { url: createIconDataUrl(), alt: "Python" },
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    items: [
      {
        id: "jest",
        label: "Jest",
        image: { url: createIconDataUrl(), alt: "Jest" },
      },
      {
        id: "cypress",
        label: "Cypress",
        image: { url: createIconDataUrl(), alt: "Cypress" },
      },
      {
        id: "playwright",
        label: "Playwright",
        image: { url: createIconDataUrl(), alt: "Playwright" },
      },
      {
        id: "selenium",
        label: "Selenium",
        image: { url: createIconDataUrl(), alt: "Selenium" },
      },
    ],
  },
  {
    id: "devops",
    title: "Devops",
    items: [
      {
        id: "docker",
        label: "Docker",
        image: { url: createIconDataUrl(), alt: "Docker" },
      },
      {
        id: "kubernetes",
        label: "Kubernetes",
        image: { url: createIconDataUrl(), alt: "Kubernetes" },
      },
      {
        id: "aws",
        label: "AWS",
        image: { url: createIconDataUrl(), alt: "AWS" },
      },
      {
        id: "azure",
        label: "Azure",
        image: { url: createIconDataUrl(), alt: "Azure" },
      },
    ],
  },
  {
    id: "aiml",
    title: "AI/ML",
    items: [
      {
        id: "openai",
        label: "OpenAI",
        image: { url: createIconDataUrl(), alt: "OpenAI" },
      },
      {
        id: "langchain",
        label: "LangChain",
        image: { url: createIconDataUrl(), alt: "LangChain" },
      },
      {
        id: "pytorch",
        label: "PyTorch",
        image: { url: createIconDataUrl(), alt: "PyTorch" },
      },
      {
        id: "tensorflow",
        label: "TensorFlow",
        image: { url: createIconDataUrl(), alt: "TensorFlow" },
      },
    ],
  },
];

const OurTechStack = ({
  title = "Our Tech Stack",
  description = "Our operations are backed by a robust and versatile tech stack, ensuring seamless functionality and innovation.",
  tabs = staticTabs,
  defaultActiveTabId,
}: OurTechStackProps) => {
  const initialTabId =
    defaultActiveTabId && tabs.some((tab) => tab.id === defaultActiveTabId)
      ? defaultActiveTabId
      : tabs[0]?.id;

  const [activeTabId, setActiveTabId] = useState(initialTabId);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) {
    return null;
  }

  return (
    <section className="bg-[#F5F5F5] py-[72px] md:py-[88px] xl:py-[110px]">
      <div className="container-main">
        <div className="max-w-[720px]">
          <h2 className="!text-[32px] !font-semibold !leading-[1.2] text-[#111111] md:!text-[44px] xl:!text-[58px]">
            {title}
          </h2>
          <p className="mt-5 max-w-[620px] !text-[18px] !leading-[1.7] text-[#4B4B4B] md:mt-7 md:!text-[20px]">
            {description}
          </p>
        </div>

        <div className="mt-10 border-b border-[#D7D7D7] md:mt-14">
          <div className="flex gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-8 xl:gap-10">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={[
                    "relative shrink-0 border-b-2 px-1 pb-4 !text-[20px] !font-medium transition-colors duration-200 md:!text-[22px]",
                    isActive
                      ? "border-[#3C4CFF] text-[#111111]"
                      : "border-transparent text-[#7E7E7E]",
                  ].join(" ")}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-[820px] grid-cols-2 justify-items-center gap-4 md:mt-10 md:grid-cols-4 md:gap-5">
          {activeTab.items.map((item) => (
            <article
              key={item.id}
              className="flex h-[164px] w-full max-w-[170px] flex-col items-center justify-center rounded-[10px] border border-[#D7D7D7] bg-white px-4 py-5"
            >
              <Image
                src={item.image.url}
                alt={item.image.alt}
                width={68}
                height={68}
                unoptimized
                className="h-[68px] w-[68px] object-contain"
              />
              <p className="mt-4 text-center !text-[18px] !font-medium text-[#161616] md:!text-[20px]">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTechStack;
