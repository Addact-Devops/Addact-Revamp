"use client";
import StrapiImage from "../atom/blogImage";
import Button from "../atom/button";
import Heading from "../atom/heading";
import RichText from "../atom/richText";

type ContentBlock = Record<string, any>;

export default function BlogContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <div className='space-y-6'>
            {blocks.map((block, index) => {
                if (block.Heading1) return <Heading key={index} level={1} text={block.Heading1} />;

                if (block.Heading2) return <Heading key={index} level={2} text={block.Heading2} />;

                if (block.Heading5) return <Heading key={index} level={5} text={block.Heading5} />;

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
        </div>
    );
}
