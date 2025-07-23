"use client";

import { EventDetailResponse, getEventDetailBySlug } from "@/graphql/queries/getEventDetail";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EventDetails = () => {
    const { slug } = useParams();
    const [eventDetailData, setEventDetailData] = useState<EventDetailResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getEventDetailBySlug(slug);
                setEventDetailData(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!eventDetailData) return <p className='p-6 text-red-600'>Career Details not found.</p>;
    return <div>EventDetails</div>;
};

export default EventDetails;
