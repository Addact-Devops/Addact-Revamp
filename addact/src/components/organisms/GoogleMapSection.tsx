"use client";

// import { useMemo, useState } from "react";
// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { MapPin, Navigation } from "lucide-react";
import { Navigation } from "lucide-react";

interface GoogleMapSectionProps {
  lat: number;
  lng: number;
  address: string;
  mapUrl?: string;
  title?: string;
  zoom?: number;
}

// const mapLibraries: Array<"places"> = ["places"];

const GoogleMapSection = (
  {
    //   lat,
    //   lng,
    //   address,
    //   mapUrl,
    //   title = "Our Location",
    //   zoom = 15,
  }: GoogleMapSectionProps,
) => {
  //   const [isInfoOpen, setIsInfoOpen] = useState(true);
  //   const mapCenter = useMemo(() => ({ lat, lng }), [lat, lng]);
  //   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

  //   const { isLoaded, loadError } = useJsApiLoader({
  //     id: "contact-us-google-map",
  //     googleMapsApiKey: apiKey || "",
  //     libraries: mapLibraries,
  //   });

  //   const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  //   const mapLink = mapUrl?.trim() || directionsUrl;
  const mapLink =
    "https://www.google.com/maps/place/Addact+Technologies/@23.0436193,72.4816712,17z/data=!3m1!4b1!4m6!3m5!1s0x395e9bc437b14a2f:0x6c87dddab10d11f9!8m2!3d23.0436193!4d72.4816712!16s%2Fg%2F11gzpb_mtb?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D";

  //   const embedMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <section className="w-full bg-[#0f0f0f] py-10 md:py-14">
      <div className="container-main">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[28px] font-semibold leading-tight text-white md:text-[40px]">
            Find Us on Map
          </h2>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#3C4CFF] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3440CB]"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </a>
        </div>

        <div className="overflow-hidden rounded-[16px] border border-white/15 bg-black/30">
          {/* {!apiKey ? (
                        <div className='flex min-h-80 flex-col items-center justify-center gap-3 px-6 py-8 text-center text-white/90 md:min-h-105'>
                            <MapPin className='h-9 w-9 text-[#9EDCFF]' />
                            <p className='text-lg font-semibold'>Google Maps API key missing</p>
                            <p className='max-w-140 text-sm text-white/70'>
                                Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment to enable full map
                                functionality.
                            </p>
                            <p className='max-w-170 text-sm text-white/85'>{address}</p>
                            <a
                                href={mapLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-2 inline-flex items-center gap-2 rounded-md border border-[#3C4CFF] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3C4CFF]/20'
                            >
                                Open Directions
                            </a>
                        </div>
                    ) : loadError ? (
                        <div className='min-h-80 px-6 py-8 md:min-h-105 md:px-8'>
                            <div className='mb-5 rounded-lg border border-red-300/30 bg-red-500/10 p-4 text-center'>
                                <p className='text-base font-semibold text-red-200'>
                                    Unable to load Google Map right now.
                                </p>
                                <p className='mt-2 text-sm text-red-100/90'>
                                    This usually means the API key is restricted for localhost, billing is not enabled,
                                    or the Maps JavaScript API is disabled in Google Cloud.
                                </p>
                            </div>
                            <iframe
                                title='Google Maps fallback preview'
                                src={embedMapUrl}
                                className='h-80 w-full rounded-lg border border-white/15 md:h-115'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            />
                        </div>
                    ) : !isLoaded ? (
                        <div className='min-h-80 animate-pulse bg-white/10 md:min-h-105' />
                    ) : (
                        <GoogleMap
                            mapContainerClassName='h-[320px] w-full md:h-[460px]'
                            center={mapCenter}
                            zoom={zoom}
                            options={{
                                fullscreenControl: true,
                                zoomControl: true,
                                streetViewControl: true,
                                mapTypeControl: false,
                            }}
                        >
                            <Marker position={mapCenter} onClick={() => setIsInfoOpen((prev) => !prev)} title={title} />

                            {isInfoOpen && (
                                <InfoWindow position={mapCenter} onCloseClick={() => setIsInfoOpen(false)}>
                                    <div className='max-w-65 p-1'>
                                        <p className='mb-1 text-sm font-semibold text-[#0f0f0f]'>{title}</p>
                                        <p className='mb-3 text-xs leading-5 text-[#272727]'>{address}</p>
                                        <a
                                            href={mapLink}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='inline-flex items-center gap-2 rounded-md bg-[#3C4CFF] px-3 py-1.5 text-xs font-semibold text-white'
                                        >
                                            <Navigation className='h-3.5 w-3.5' />
                                            Get Directions
                                        </a>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    )} */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.5704776412977!2d72.47909627521224!3d23.043619279159007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bc437b14a2f%3A0x6c87dddab10d11f9!2sAddact%20Technologies!5e0!3m2!1sen!2sin!4v1774243876407!5m2!1sen!2sin"
            height="450"
            style={{ border: "0", width: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
