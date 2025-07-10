"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Faq } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";

interface IProps {
    data: Faq;
}

const FAQ = ({ data }: IProps) => {
    const [openIndexes, setOpenIndexes] = useState<number[] | null>(null);

    useEffect(() => {
        const stored = typeof window !== "undefined" && sessionStorage.getItem("faq-open");
        if (stored) {
            setOpenIndexes(JSON.parse(stored));
        } else {
            setOpenIndexes([0]); // default open first one
        }
    }, []);

    useEffect(() => {
        if (openIndexes !== null) {
            sessionStorage.setItem("faq-open", JSON.stringify(openIndexes));
        }
    }, [openIndexes]);

    const toggleIndex = (index: number) => {
        setOpenIndexes((prev) => {
            if (!prev) return [index]; // fallback if prev is null
            return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
        });
    };

    if (openIndexes === null) return null;

    return (
        <div className='my-28 lg:my-48 xl:my-60'>
            <div className='container mx-auto px-4'>
                <h2 className='border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>
                    {data.Title?.split("Asked")[0]}
                    <br className='block' />
                    {"Asked " + data.Title?.split("Asked")[1]}
                </h2>

                <div className='border border-gray-700 mt-12 lg:mt-24'>
                    {data.FAQ.map((faq, index) => {
                        const isOpen = openIndexes.includes(index);
                        return (
                            <div
                                key={index}
                                className={`border-t border-gray-700 hover:bg-[#3C4CFF] ${
                                    index === 0 ? "border-t-0" : ""
                                }`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className={`w-full flex items-start text-left transition-colors duration-200 px-0 py-6 pr-5 lg:pr-0`}
                                >
                                    <span className='ml-5 lg:ml-[40px] mr-5 lg:mr-[65px] mt-1 shrink-0 w-5 lg:w-[30px] h-5 lg:h-[30px] flex items-center justify-center'>
                                        {isOpen ? (
                                            <Minus size={30} strokeWidth={2.5} />
                                        ) : (
                                            <Plus size={30} strokeWidth={2.5} />
                                        )}
                                    </span>
                                    <span
                                        className='font-montserrat text-lg md:text-2xl font-semibold leading-none'
                                        style={{ lineHeight: "100%" }}
                                    >
                                        {faq.Title}
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className='pl-[60px] lg:pl-[135px] pr-6 pb-6 text-base md:text-xl font-normal font-montserrat leading-[34px]'>
                                        <RichText html={faq.Description} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
