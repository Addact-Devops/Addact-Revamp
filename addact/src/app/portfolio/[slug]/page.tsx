"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CaseStudyBySlugResponse, getCaseStudyBySlug } from "@/graphql/queries/getCaseStudyBySlug";

const CaseStudyDetail = () => {
    const { slug } = useParams();

    const [caseStudy, setCaseStudy] = useState<CaseStudyBySlugResponse["addactCaseStudies"][number]>();
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ CaseStudyDetail ~ caseStudy:", caseStudy);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getCaseStudyBySlug(slug);
                setCaseStudy(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) return <p className='p-6'>Loading...</p>;
    if (!caseStudy) return <p className='p-6 text-red-600'>Case-Study not found.</p>;

    return <div>CaseStudyDetail</div>;
};

export default CaseStudyDetail;
