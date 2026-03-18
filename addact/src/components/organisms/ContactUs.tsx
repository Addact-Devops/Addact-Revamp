"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { CONTACTUS } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import ReCAPTCHA from "react-google-recaptcha";
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
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

const ContactUs = ({
  data,
  isDrawer = false,
  isOpen = false,
  onClose,
}: IProps) => {
  const pathname = usePathname();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
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
    {
      id: "usa",
      label: "USA",
      value: "+1 619-738-5955",
      icon: Phone,
      href: "tel:+16197385955",
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const strLenRegex = /^.{2,}$/;
    if (!formData.name) newErrors.name = "Name is required.";
    if (!strLenRegex.test(formData.name)) {
      newErrors.name = "Please enter at least 2-3 character name";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!strLenRegex.test(formData.company)) {
      newErrors.company = "Please enter at least 2-3 character company name";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the captcha.");
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
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
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormData({ name: "", email: "", company: "", message: "" });
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
        className={`fixed inset-0 z-[200] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
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
          className={`absolute right-0 top-0 h-full w-full max-w-full overflow-y-auto bg-[#0f0f0f] text-white shadow-2xl transition-transform duration-300 ease-out sm:w-[88vw] md:w-[760px] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-6 pt-7 pb-8 md:px-10 md:pt-8 md:pb-10 lg:p-[80px]!">
            <div className="mb-7 flex items-start justify-between md:mb-10">
              <div>
                <h2 className="!pb-10 !text-[48px] !font-light !leading-[1.05] md:!text-[60px]">
                  {formBlock.Title}
                </h2>
                <div className="h-[5px] w-[160px] bg-[#3C4CFF]" />
              </div>

              <button
                type="button"
                onClick={() => onClose?.()}
                aria-label="Close contact form"
                className="mt-1 rounded-md p-1 text-white transition-colors hover:text-[#3C4CFF]"
              >
                <X className="h-10 w-10" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[20px] font-semibold leading-tight"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-[#616161] bg-transparent px-0 py-5 text-[16px] leading-tight placeholder:text-[#616161] focus:outline-none"
                  placeholder="Type your name here"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[20px] font-semibold leading-tight"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-[#616161] bg-transparent px-0 py-5 text-[16px] leading-tight placeholder:text-[#616161] focus:outline-none"
                  placeholder="Type your email here"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-[20px] font-semibold leading-tight"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border-b border-[#616161] bg-transparent px-0 py-5 text-[16px] leading-tight placeholder:text-[#616161] focus:outline-none"
                  placeholder="Type your company name here"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[20px] font-semibold leading-tight"
                >
                  Describe Your Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border-b border-[#616161] bg-transparent px-0 py-5 text-[16px] leading-tight placeholder:text-[#616161] focus:outline-none"
                  placeholder="Type here..."
                />
              </div>

              <div className="flex justify-center md:justify-start">
                <div className="recaptcha-wrapper scale-[0.92] origin-left sm:scale-100">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={(token: string | null) => setCaptchaToken(token)}
                    size="normal"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full cursor-pointer rounded-[8px] bg-[#3C4CFF] py-3 text-[18px] font-semibold text-white transition-colors hover:bg-[#3440CB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
              >
                {formLoading ? "Submitting..." : "Contact Us"}
              </button>
            </form>

            <div className="mt-10 space-y-[28px]">
              {drawerContactDetails.map((contactItem) => {
                const Icon = contactItem.icon;

                return (
                  <Link
                    key={contactItem.id}
                    href={contactItem.href}
                    className="group flex items-center gap-3 text-white/90 transition-colors hover:text-white mb-7.5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3C4CFF] text-[#D9DEFF] transition-colors group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[20px] leading-8 md:text-[28px] md:leading-10">
                      <strong className="font-semibold text-[20px]! leading-8 md:text-[28px] md:leading-10">
                        {contactItem.label}:
                      </strong>{" "}
                      <span className="font-normal text-[20px]! leading-8 md:text-[28px] md:leading-10">
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
                    <label
                      htmlFor="name"
                      className="block text-base md:text-xl font-semibold mb-1"
                    >
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
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
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
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
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
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
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

                <div className="flex justify-center">
                  <div className="recaptcha-wrapper">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      onChange={(token: string | null) =>
                        setCaptchaToken(token)
                      }
                      size="normal"
                    />
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
