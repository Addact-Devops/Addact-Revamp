"use client";

import "../../styles/components/ourPartners.scss";

const logos = [
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/ram-info.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/sitecore.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/quasar.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/coveo.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/blue-fountain-media.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/pactera-edge.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/mcd.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/advaiya.svg",
  "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/suyati.svg",
];

export default function OurPartners() {
  return (
    <section className="partners">
      <div className="container">
        <h2 className="partners__heading">Our Partners</h2>
      </div>

      <div className="partners__marquee">
        <div className="partners__marquee-content">
          {logos.concat(logos).map((logo, index) => (
            <div key={index} className="partners__logo-item">
              <img src={logo} alt={`Partner Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
