import React from "react";
import Image from "../atom/image";

const OurCmsExperts = () => {
  const expertLogo = "/expertlogo.png";
  const servicesList = [
    {
      icon: expertLogo,
    },
    {
      icon: expertLogo,
    },
    {
      icon: expertLogo,
    },
    {
      icon: expertLogo,
    },
    {
      icon: expertLogo,
    },
    {
      icon: expertLogo,
    },
  ];

  return (
    <section className="my-24 sm:my-32 md:my-40 lg:my-60">
      <div className="container">
        <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center">
          <h2 className="w-full lg:w-[40%] border-after">Our CMS Expertise</h2>

          <div className="w-full text-left">
            <p className="text-base sm:text-3xl inline">
              {` At ADDACT, we don't just build websites, we craft exceptional
              digital experiences powered by the industry-leading Sitecore
              platform.`}
            </p>
          </div>
        </div>
        <section>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 sm:mt-8 md:mt-14 lg:mt-24">
            {servicesList.map((service, index) => (
              <div
                className="bg-[#1C1C1C] border border-gray-700 text-white py-4 px-4 md:py-20 md:px-14 hover:bg-red-400 flex justify-center items-center"
                key={index}
              >
                <Image
                  src={expertLogo}
                  alt="Expert Logo"
                  width={310}
                  height={69}
                  className="w-[113px] md:w-[310px]"
                  unoptimized={false}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default OurCmsExperts;
