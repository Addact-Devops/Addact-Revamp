"use client";

import React, { useEffect, useState } from "react";
import { getAllCaseStudyData, IAllCaseStudy } from "@/graphql/queries/getAllCaseStudy";

const CaseStudyListing = () => {
    const [caseStudyBanner, setCaseStudyBanner] = useState<IAllCaseStudy["caseStudy"]>();
    const [caseStudyListing, setCaseStudyListing] = useState<IAllCaseStudy["addactCaseStudies"]>();
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ CaseStudyListing ~ caseStudyData:", caseStudyBanner, caseStudyListing);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getAllCaseStudyData();
            setCaseStudyBanner(data.caseStudy);
            setCaseStudyListing(data.addactCaseStudies);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    if (loading) return <p className='p-6'>Loading...</p>;
    if (!caseStudyListing) return <p className='p-6 text-red-600'>Case-Study List not found.</p>;

    return <div>CaseStudyListing</div>;
};

export default CaseStudyListing;
