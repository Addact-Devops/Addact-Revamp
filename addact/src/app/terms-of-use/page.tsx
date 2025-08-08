// src/app/terms-conditions/page.tsx

import { getTermsConditions } from "@/graphql/queries/getTermsConditions";
import parse from "html-react-parser";

export default async function TermsConditionsPage() {
    const data = await getTermsConditions();
    const content = data?.termsConditions?.BodyContent?.CommonTitle?.[0];

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
