"use client";
import StrapiImage from "../atom/blogImage";
import Button from "../atom/button";
import Heading from "../atom/heading";
import RichText from "../atom/richText";

type ContentBlock = Record<string, any>;

export default function BlogContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
    console.log("blocks", blocks);
    return (
        <>
            {blocks.map((block, index) => {
                if (block.h1) return <Heading key={index} level={1} text={block.h1} />;

                if (block.h2) return <Heading key={index} level={2} text={block.h2} />;
                if (block.h3) return <Heading key={index} level={3} text={block.h3} />;
                if (block.h4) return <Heading key={index} level={4} text={block.h4} />;

                if (block.h5) return <Heading key={index} level={5} text={block.h5} />;
                if (block.h6) return <Heading key={index} level={6} text={block.h6} />;

                if (block.Richtext) return <RichText key={index} html={block.Richtext} />;

                if (block.Image)
                    return (
                        <StrapiImage
                            key={index}
                            src={block.Image.formats?.medium?.url || block.Image.url}
                            alt={block.Image.alternativeText}
                            width={block.Image.width}
                            height={block.Image.height}
                        />
                    );

                if (block.href && block.label)
                    return (
                        <Button
                            key={index}
                            href={block.href}
                            label={block.label}
                            target={block.target}
                            isExternal={block.isExternal}
                        />
                    );

                return null;
            })}
        </>
    );
}
