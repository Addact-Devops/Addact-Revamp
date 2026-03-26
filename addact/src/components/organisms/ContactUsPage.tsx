"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { CONTACTUS } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePathname } from "next/navigation";
import GoogleMapSection from "./GoogleMapSection";

interface IProps {
  data: CONTACTUS;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

interface ContactFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const contactFieldBaseClass =
  "peer w-full border-0 border-b border-gray-700 bg-transparent px-0 pb-2 pt-7 text-base leading-tight text-white placeholder:text-transparent transition-colors duration-300 focus:border-[#9EDCFF] focus:outline-none";

const ContactField = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  autoComplete,
  required = false,
  multiline = false,
  rows = 3,
}: ContactFieldProps) => {
  const labelContent = (
    <>
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </>
  );

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder=" "
            className={`${contactFieldBaseClass} min-h-18 resize-none`}
          ></textarea>
        ) : (
          <input
            id={id}
            name={name}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={contactFieldBaseClass}
          />
        )}

        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-7 origin-left text-base font-semibold leading-tight text-white transition-all duration-300 ease-out peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[#9EDCFF] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#9EDCFF]"
        >
          {labelContent}
        </label>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const ContactUs = ({ data }: IProps) => {
  const pathname = usePathname();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    honeypot: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formLoading, setFormLoading] = useState(false);

  const redirectUrl = "/contact-us/connect-now-thank-you";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const strLenRegex = /^.{2,}$/;
    if (!formData.name) newErrors.name = "Please enter Name.";
    if (!strLenRegex.test(formData.name)) {
      newErrors.name = "Please enter valid name";
    }
    if (!formData.email) {
      newErrors.email = "Please enter email address.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.company) newErrors.company = "Please enter company name.";
    if (!strLenRegex.test(formData.company)) {
      newErrors.company = "Please enter valid company name";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot validation - reject if filled (indicates bot)
    if (formData.honeypot.trim() !== "") {
      console.warn("Honeypot field was filled - potential bot detected");
      return;
    }

    const validationErrors = validate();
    const isCaptchaMissing = !captchaToken;
    setCaptchaError(isCaptchaMissing);

    if (Object.keys(validationErrors).length > 0 || isCaptchaMissing) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    setFormLoading(true);

    try {
      let pageTitle = "";
      if (pathname === "/") {
        pageTitle = "Home Page";
      } else if (pathname === "/contact-us") {
        pageTitle = "Contact Us";
      } else {
        pageTitle = pathname.replace("/", "").replace("-", " ");
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
      }
      const payload = {
        name: formData.name,
        email: formData.email,
        companyName: formData.company,
        description: formData.message,
        pageTitle,
        recipientEmails: data.RecipientEmails,
        honeypot: formData.honeypot,
        turnstileToken: captchaToken,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          honeypot: "",
        });
        window.location.href = redirectUrl;
      }
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section
      className="w-full text-white md:py-12 pb-[100px] px-4"
      id="contact-us"
    >
      <div className="container-main mx-auto overflow-hidden !px-[10px] lg:!px-[20px] xl:!px-4">
        <div className="border-gray-700 border">
          <div className="flex flex-col justify-between">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between pb-[30px] md:pb-0">
              <div className="md:w-[30%] border-r border-gray-700 px-5 md:px-12 2xl:px-16 py-5 md:py-12 2xl:py-20">
                <h2 className="!text-[28px] lg:!text-[40px] 2xl:!text-[55px] font-semibold leading-tight !pb-4 xl:!pb-10">
                  {data.Form[0].Title}
                </h2>
                <div className="h-[3px] md:h-[5px] w-[45px] md:w-[160px] bg-[#3C4CFF] mt-2 mb-4"></div>
              </div>

              <div className="md:w-[70%] text-white px-5 pb-5 md:px-16 [&_p]:font-light [&_p]:!text-[18px] [&_p]:md:!text-[22px] [&_p]:xl:!text-3xl [&_p]:xl:!leading-[54px]">
                <RichText html={data.Form[0].Description} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-stretch justify-center">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full lg:w-1/2 px-6 md:px-11 py-10 md:py-12 border-t border-gray-700 flex flex-col"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-[40px]">
                  <ContactField
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Your Name"
                    required
                    error={errors.name}
                  />
                  <ContactField
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email Address"
                    required
                    error={errors.email}
                  />
                </div>

                <div className="mb-[40px]">
                  <ContactField
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    label="Company Name"
                    required
                    error={errors.company}
                  />
                </div>

                <div className="mb-[40px]">
                  <ContactField
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleChange}
                    label="Describe Your Requirements"
                    multiline
                    rows={2}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="flex justify-center">
                  <div className="recaptcha-wrapper flex flex-col overflow-visible">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                      onSuccess={(token) => {
                        setCaptchaToken(token);
                        setCaptchaError(false);
                      }}
                      onExpire={() => {
                        setCaptchaToken(null);
                      }}
                      onError={() => {
                        setCaptchaToken(null);
                      }}
                      options={{
                        size: "normal",
                      }}
                    />
                    {captchaError && !captchaToken && (
                      <p className="mt-1 text-sm text-red-500">
                        Please complete the captcha.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-[#3C4CFF] cursor-pointer text-base md:text-lg font-semibold text-white py-3 rounded hover:bg-[#3440CB]"
                >
                  {formLoading ? "Submitting..." : "Contact Us"}
                </button>
              </form>

              <div className="hidden lg:block w-1/2 relative">
                {data?.Form[0]?.Image?.url && (
                  <Image
                    src={data.Form[0].Image.url}
                    alt={data.Form[0].Image.alternativeText || "Contact image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoogleMapSection
        lat={23.0436193}
        lng={72.4816712}
        title="Addact Technologies"
        address="Office No 914, Sankalp Square 3B, Sindhu Bhavan Marg, beside Taj skyline, PRL Colony, Thaltej, Ahmedabad, Gujarat 380058"
        mapUrl="https://www.google.com/maps/place/Addact+Technologies/@23.0436242,72.4790963,1037m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e9bc437b14a2f:0x6c87dddab10d11f9!8m2!3d23.0436193!4d72.4816712!16s%2Fg%2F11gzpb_mtb?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D%27"
      />
    </section>
  );
};

export default ContactUs;
