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
    <section className="who-we-are gap">
      <div className="container">
        <div className="flex gap-[100px]">
          <h2 className="w-[40%] border-after">Who Are We?</h2>

          <div className="w-full text-left">
            <p className="text-lg large inline">
              {` At ADDACT, we don't just build websites, we craft exceptional
              digital experiences powered by the industry-leading Sitecore
              platform.`}
            </p>
          </div>
        </div>
        <section>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-24">
            {servicesList.map((service, index) => (
              <div
                className="bg-[#1C1C1C] border border-gray-700 text-white py-20 px-14 hover:bg-red-400"
                key={index}
              >
                <Image
                  src={expertLogo}
                  alt="Expert Logo"
                  width={310}
                  height={69}
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
