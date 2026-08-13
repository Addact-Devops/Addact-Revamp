import React from "react";

interface StructuredDataScriptProps {
  data?: unknown; // Raw structured data from Strapi API
  additionalData?: unknown[]; // Additional hardcoded JSON-LD objects to merge
}

export default function StructuredDataScript({ data, additionalData = [] }: StructuredDataScriptProps) {
  // If neither is provided, don't render anything
  if (!data && additionalData.length === 0) return null;

  let structuredDataArray: unknown[] = [];
  
  if (data) {
    structuredDataArray = Array.isArray(data)
      ? data
      : typeof data === "object" && data !== null
      ? [data]
      : typeof data === "string"
      ? (() => {
          try {
            const p = JSON.parse(data);
            return Array.isArray(p) ? p : [p];
          } catch {
            return [];
          }
        })()
      : [];
  }

  // Ensure all items are proper objects and flatten them
  const cleanArray = structuredDataArray
    .flatMap((item) => {
      if (typeof item === "string") {
        try {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return [];
        }
      }
      return [item];
    })
    .filter(Boolean);

  // Merge the dynamic Strapi data with any additional hardcoded schemas
  const mergedArray = [...cleanArray, ...additionalData];

  if (mergedArray.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(mergedArray),
      }}
    />
  );
}
