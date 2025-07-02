"use client";
import StrapiImage from "../atom/blogImage";
import Heading from "../atom/heading";
import RichText from "../atom/richText";
import LinkBase from "../atom/linkBase";

type ContentBlock = {
    id?: string;
    Richtext?: string;
    Image?: {
        alternativeText?: string;
        name?: string;
        height?: number;
        url?: string;
        width?: number;
    };
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
};

export default function BlogContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <>
            {blocks.map((block, index) => {
                if (block.h1) return <Heading key={block.id || index} level={1} text={block.h1} />;
                if (block.h2) return <Heading key={block.id || index} level={2} text={block.h2} />;
                if (block.h3) return <Heading key={block.id || index} level={3} text={block.h3} />;
                if (block.h4) return <Heading key={block.id || index} level={4} text={block.h4} />;
                if (block.h5) return <Heading key={block.id || index} level={5} text={block.h5} />;
                if (block.h6) return <Heading key={block.id || index} level={6} text={block.h6} />;

                if (block.Richtext) return <RichText key={block.id || index} html={block.Richtext} />;

                if (block.Image?.url)
                    return (
                        <StrapiImage
                            key={block.id || index}
                            src={block.Image.url}
                            alt={block.Image.alternativeText || block.Image.name || ""}
                            width={block.Image.width || 0}
                            height={block.Image.height || 0}
                        />
                    );

                if (block.href && block.label)
                    return (
                        <LinkBase
                            key={block.id || index}
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
