// src/app/privacy-policy/page.tsx

import { getPrivacyPolicy } from "@/graphql/queries/getPrivacyPolicy";
import parse from "html-react-parser";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("privacyPolicy");
}

export default async function PrivacyPolicyPage() {
    const data = await getPrivacyPolicy();
    const content = data?.privacyPolicy?.BodyContent?.CommonTitle?.[0];

    const title = content?.Title;
    const description = content?.Description;

    return (
        <main className="bg-white company-policy">
            <div className="container">
                {title && <h1>{title}</h1>}
                {description ? (
                    <div className="text-[17px] leading-[30px] font-normal text-gray-800 space-y-5">
                        {parse(description)}
                    </div>
                ) : (
                    <p className="text-gray-500">No content available.</p>
                )}
            </div>
        </main>
    );
}
