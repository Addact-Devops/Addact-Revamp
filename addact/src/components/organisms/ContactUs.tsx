"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { CONTACTUS } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePathname } from "next/navigation";
import { Mail, Phone, X } from "lucide-react";
import Link from "next/link";

interface IProps {
  data: CONTACTUS;
  isDrawer?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
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

interface DrawerFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const drawerFieldBaseClass =
  "peer w-full border-0 border-b border-white/75 bg-transparent px-0 pb-2 pt-7 text-[16px] leading-tight text-white placeholder:text-transparent transition-colors duration-300 focus:border-[#9EDCFF] focus:outline-none";

const DrawerField = ({
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
}: DrawerFieldProps) => {
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
            className={`${drawerFieldBaseClass} min-h-18 resize-none`}
          />
        ) : (
          <input
            id={id}
            name={name}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={drawerFieldBaseClass}
          />
        )}

        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-7 origin-left text-[16px] font-semibold leading-tight text-white transition-all duration-300 ease-out peer-focus:top-0 peer-focus:text-[13px] peer-focus:text-[#9EDCFF] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[13px] peer-[:not(:placeholder-shown)]:text-[#9EDCFF]"
        >
          {labelContent}
        </label>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const ContactUs = ({ data, isDrawer = false, isOpen = false, onClose }: IProps) => {
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
  const formBlock = data?.Form?.[0];
  const drawerContactDetails = [
    {
      id: "email",
      label: "Email us",
      value: "info@addact.net",
      icon: Mail,
      href: "mailto:info@addact.net",
    },
    {
      id: "india",
      label: "India",
      value: "+91 94277 22717",
      icon: Phone,
      href: "tel:+919427722717",
    },
  ];

  useEffect(() => {
    if (!isDrawer || !isOpen) {
      return;
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isDrawer, isOpen]);

  useEffect(() => {
    if (!isDrawer || !isOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isDrawer, isOpen, onClose]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  if (!formBlock) {
    return null;
  }

  if (isDrawer) {
    return (
      <div
        className={`fixed inset-0 z-200 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => onClose?.()}
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Contact us"
          onClick={(event) => event.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-full max-w-full overflow-y-auto bg-[#0f0f0f] text-white shadow-2xl transition-transform duration-300 ease-out sm:w-[82vw] md:w-160 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-5 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8 lg:px-12 lg:pt-12 lg:pb-10">
            <div className="mb-5 flex items-start justify-between gap-4 md:mb-7">
              <div>
                <h2 className="pb-6! text-[36px]! font-light! leading-[1.05]! md:text-[48px]!">
                  {formBlock.Title}
                </h2>
                <div className="h-1 w-30 bg-[#3C4CFF] md:w-37.5" />
              </div>

              <button
                type="button"
                onClick={() => onClose?.()}
                aria-label="Close contact form"
                className="mt-1 rounded-md p-1 text-white transition-colors hover:text-[#3C4CFF]"
              >
                <X className="h-8 w-8 md:h-9 md:w-9" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-7">
              <DrawerField
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                required
                error={errors.name}
              />

              <DrawerField
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                label="Email Address"
                required
                error={errors.email}
              />

              <DrawerField
                id="company"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                label="Company Name"
                required
                error={errors.company}
              />

              <DrawerField
                id="message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                label="Share Your Requirements"
                multiline
                rows={2}
              />

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
              {isOpen && (
                <div className="flex justify-center sm:justify-start overflow-visible">
                  <div className="recaptcha-wrapper flex flex-col overflow-visible w-full max-w-[400px] ">
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
                        theme: "auto",
                        size: "flexible",
                        language: "en",
                      }}
                    />
                    {captchaError && !captchaToken && (
                      <p className="mt-1 text-sm text-red-500">Please complete the captcha.</p>
                    )}
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={formLoading}
                className="w-full cursor-pointer rounded-[8px] bg-[#3C4CFF] py-3 text-[17px] font-semibold text-white transition-colors hover:bg-[#3440CB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              >
                {formLoading ? "Submitting..." : "Contact Us"}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-9">
              {drawerContactDetails.map((contactItem) => {
                const Icon = contactItem.icon;

                return (
                  <Link
                    key={contactItem.id}
                    href={contactItem.href}
                    className="group flex items-center gap-3 text-white/90 transition-colors hover:text-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3C4CFF] text-[#D9DEFF] transition-colors group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="whitespace-nowrap text-[18px] leading-7 md:text-[22px] md:leading-8">
                      <strong className="font-semibold text-[18px]! leading-7 md:text-[22px] md:leading-8">
                        {contactItem.label}:
                      </strong>{" "}
                      <span className="font-normal text-[18px]! leading-7 md:text-[22px] md:leading-8">
                        {contactItem.value}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <section className="w-full text-white md:py-12 pb-[100px] px-4" id="contact-us">
      <div className="container-main mx-auto !px-[10px] lg:!px-[20px] xl:!px-4">
        <div className="border-gray-700 border">
          <div className="flex flex-col justify-between">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between pb-[30px] md:pb-0">
              <div className="md:w-[30%] border-r border-gray-700 px-5 md:px-12 2xl:px-16 py-5 md:py-12 2xl:py-20">
                <h2 className="!text-[28px] lg:!text-[40px] 2xl:!text-[55px] font-semibold leading-tight !pb-4 xl:!pb-10">
                  {formBlock.Title}
                </h2>
                <div className="h-[3px] md:h-[5px] w-[45px] md:w-[160px] bg-[#3C4CFF] mt-2 mb-4"></div>
              </div>

              <div className="md:w-[70%] text-white px-5 pb-5 md:px-16 [&_p]:font-light [&_p]:!text-[18px] [&_p]:md:!text-[22px] [&_p]:xl:!text-3xl [&_p]:xl:!leading-[54px]">
                <RichText html={formBlock.Description} />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-stretch justify-center">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full lg:w-1/2 px-6 md:px-11 py-10 md:py-12 border-t border-gray-700 flex flex-col"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-[40px]">
                  <div>
                    <label htmlFor="name" className="block text-base md:text-xl font-semibold mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-700 px-3 py-2 pl-0 placeholder-gray-500 focus:outline-none"
                      placeholder="Type your name here"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base md:text-xl font-semibold mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-700 px-3 py-2 pl-0 placeholder-gray-500 focus:outline-none"
                      placeholder="Type your email here"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-[40px]">
                  <label
                    htmlFor="company"
                    className="block text-base md:text-xl font-semibold mb-1"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-700 px-3 py-2 pl-0 placeholder-gray-500 focus:outline-none"
                    placeholder="Type your company name here"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                <div className="mb-[40px]">
                  <label
                    htmlFor="message"
                    className="block text-base md:text-xl font-semibold mb-1"
                  >
                    Describe Your Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={1}
                    className="w-full bg-transparent border-b border-gray-700 px-3 py-2 pl-0 placeholder-gray-500 focus:outline-none"
                    placeholder="Type here..."
                  ></textarea>
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="flex justify-start overflow-visible">
                  <div
                    className="recaptcha-wrapper overflow-visible"
                    style={{ width: 304, minWidth: 304 }}
                  >
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
                        theme: "dark",
                        size: "flexible",
                        language: "en",
                      }}
                    />
                    {captchaError && !captchaToken && (
                      <p className="mt-1 text-sm text-red-500">Please complete the captcha.</p>
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
                {formBlock?.Image?.url && (
                  <Image
                    src={formBlock.Image.url}
                    alt={formBlock.Image.alternativeText || "Contact image"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
