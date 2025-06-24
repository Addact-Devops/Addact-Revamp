import React from "react";

const WhyAddact = () => {
  const servicesList = [
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
    {
      title: "Sitecore XM Cloud",
      description:
        "With Sitecore XM Cloud Services, you can create, manage, deliver personalized experiences to your customers.",
      icon: "/icons/sitecore-xm-cloud.svg",
    },
  ];
  return (
    <section className="my-28 lg:my-48 xl:my-60">
      <div className="container">
        <div className="flex flex-col">
          <h2 className="border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10">
            Why Addact
          </h2>
          <section>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  mt-10 sm:mt-14 lg:mt-24">
              {servicesList.map((service, index) => (
                <div key={index} className="relative">
                  <div className="text-white p-7">
                    <div className="w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 bg-white rounded-sm mb-4"></div>
                    <h3 className="text-lg lg:text-3xl my-7">
                      {service.title}
                    </h3>
                    <p className="text-base 2xl:text-xl text-white">
                      {service.description}
                    </p>
                  </div>
                  {(index + 1) % 3 !== 0 && (
                    <div className="absolute top-1/4 right-0 h-3/4 w-[1px] bg-white opacity-40"></div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default WhyAddact;
