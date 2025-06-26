// components/organisms/BlogContactCard.tsx
"use client";
import Link from "next/link";

type ContactCard = {
    id?: string;
    CardTitle?: string;
    CardDescription?: string;
    CardLink?: {
        href?: string;
        label?: string;
        isExternal?: boolean;
        target?: string;
    };
};

export default function BlogContactCard({ contactCards }: { contactCards?: ContactCard[] }) {
    if (!Array.isArray(contactCards) || contactCards.length === 0) return null;

    return (
        <div>
            {contactCards.map((card, index) => {
                const { CardTitle, CardDescription, CardLink } = card;

                return (
                    <div key={index}>
                        {CardTitle && <h3>{CardTitle}</h3>}
                        {CardDescription && <p>{CardDescription}</p>}
                        {CardLink?.href && CardLink?.label && (
                            <Link
                                href={CardLink.href}
                                target={CardLink.target || "_self"}
                                rel={CardLink.isExternal ? "noopener noreferrer" : undefined}
                            >
                                {CardLink.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
