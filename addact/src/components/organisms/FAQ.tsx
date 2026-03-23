"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Faq } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";

interface IProps {
  data?: Faq | null;
}

const FAQ = ({ data }: IProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[] | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && sessionStorage.getItem("faq-open");
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
      if (!prev) return [index];
      return prev[0] === index ? [] : [index];
    });
  };

  if (!data || !Array.isArray(data.FAQ) || data.FAQ.length === 0) return null;
  if (openIndexes === null) return null;

  return (
    <section className="py-5 md:py-10 2xl:py-[80px] bg-white">
      <div className="container-main mx-auto px-4">
        <h2 className="text-[#0F0F0F] font-montserrat !text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold! max-w-[677px] w-full">
          {data.Title?.split("Asked")[0] ?? ""}
        </h2>

        <div className="mt-5 lg:mt-10">
          {data.FAQ.map((faq, index) => {
            if (!faq) return null;
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                onClick={() => toggleIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleIndex(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={`border border-[#E5E5E5] hover:bg-[#3C4CFF] group mb-5 px-5 py-5 lg:px-10 lg:py-7.5 cursor-pointer ${
                  isOpen
                    ? "rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[80px]"
                    : "rounded-[10px]"
                } ${index === 0 ? "" : ""}`}
              >
                <button
                  type="button"
                  className="w-full flex items-start text-left transition-colors duration-200"
                >
                  <span
                    className={`font-montserrat text-lg md:text-2xl font-semibold leading-none text-[#0F0F0F] group-hover:text-white transition-colors duration-200 ${isOpen ? "pb-5 lg:pb-7.5" : ""}`}
                    style={{ lineHeight: "100%" }}
                  >
                    {faq.Title}
                  </span>

                  <span className="ml-auto shrink-0 w-5 lg:w-[30px] h-5 lg:h-[30px] flex items-center justify-center [&_svg]:stroke-[#3C4CFF] group-hover:[&_svg]:stroke-white">
                    {isOpen ? (
                      <Minus size={30} strokeWidth={2.5} />
                    ) : (
                      <Plus size={30} strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                  }}
                >
                  <div className="text-base md:text-xl font-normal font-montserrat leading-[34px] text-[#0F0F0F] group-hover:text-white transition-colors duration-200 max-w-[1085px] w-full">
                    <RichText html={String(faq.Description)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
