"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { CONTACTUS } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";
import { User, Mail, Building, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  data: CONTACTUS;
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

const ContactUs = ({ data }: IProps) => {
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
  const [activeField, setActiveField] = useState<string | null>(null);

  const redirectUrl = "/contact-us/connect-now-thank-you";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const strLenRegex = /^.{2,}$/;
    if (!formData.name) newErrors.name = "Name is required.";
    if (!strLenRegex.test(formData.name)) {
      newErrors.name = "Please enter at least 2 character name";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!strLenRegex.test(formData.company)) {
      newErrors.company = "Please enter at least 2 character company name";
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
        headers: { "Content-Type": "application/json" },
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

  const inputClasses = (fieldName: string) => `
    w-full bg-zinc-50 border-b-2 transition-all duration-300 px-12 py-4 text-black focus:outline-none
    ${activeField === fieldName || formData[fieldName as keyof ContactFormData] 
      ? "border-[#3C4CFF] bg-white shadow-[0_4px_20px_-10px_rgba(60,76,255,0.2)]" 
      : "border-zinc-200"
    }
    ${errors[fieldName as keyof FormErrors] ? "border-red-500" : ""}
  `;

  return (
    <section className="w-full bg-white py-20 lg:py-32" id="contact-us">
      <div className="container mx-auto px-4">
        {/* Unified Premium Card */}
        <div className="group/form relative bg-white rounded-[40px] overflow-hidden border border-zinc-300 shadow-[0_50px_100px_-20px_rgba(60,76,255,0.12)] flex flex-col lg:flex-row min-h-[700px]">
          
          {/* Border Beam Effect */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[40px]">
            <motion.div 
              animate={{
                left: ["-100%", "200%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-[40%] h-[2px] bg-linear-to-r from-transparent via-[#3C4CFF] to-transparent opacity-30"
            />
          </div>

          <div className="lg:w-1/2 p-8 md:p-14 xl:p-20 relative z-10 flex flex-col">
            {/* Header inside Card */}
            <div className="mb-14">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-[32px] md:text-[45px] 2xl:text-[56px] font-bold leading-tight text-black mb-6"
                >
                  {data.Form[0].Title}
                </motion.h2>
                <div className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    <RichText html={data.Form[0].Description} />
                </div>
                <div className="h-1 w-20 bg-[#3C4CFF] mt-8 rounded-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="relative group/field">
                  <User className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${activeField === "name" ? "text-[#3C4CFF]" : "text-zinc-400"}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-zinc-200 focus:border-[#3C4CFF] transition-all duration-500 px-8 py-4 text-black focus:outline-none"
                    placeholder=" "
                  />
                  <label className={`absolute left-8 transition-all duration-300 pointer-events-none ${activeField === "name" || formData.name ? "-top-6 text-xs text-[#3C4CFF] font-bold uppercase tracking-widest" : "top-4 text-zinc-400 font-medium"}`}>
                    Your Name *
                  </label>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold uppercase mt-1 absolute">{errors.name}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="relative group/field">
                  <Mail className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${activeField === "email" ? "text-[#3C4CFF]" : "text-zinc-400"}`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className="w-full bg-transparent border-b border-zinc-200 focus:border-[#3C4CFF] transition-all duration-500 px-8 py-4 text-black focus:outline-none"
                    placeholder=" "
                  />
                  <label className={`absolute left-8 transition-all duration-300 pointer-events-none ${activeField === "email" || formData.email ? "-top-6 text-xs text-[#3C4CFF] font-bold uppercase tracking-widest" : "top-4 text-zinc-400 font-medium"}`}>
                    Email Address *
                  </label>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold uppercase mt-1 absolute">{errors.email}</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Company Field */}
              <div className="relative group/field">
                <Building className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${activeField === "company" ? "text-[#3C4CFF]" : "text-zinc-400"}`} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setActiveField("company")}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-transparent border-b border-zinc-200 focus:border-[#3C4CFF] transition-all duration-500 px-8 py-4 text-black focus:outline-none"
                  placeholder=" "
                />
                <label className={`absolute left-8 transition-all duration-300 pointer-events-none ${activeField === "company" || formData.company ? "-top-6 text-xs text-[#3C4CFF] font-bold uppercase tracking-widest" : "top-4 text-zinc-400 font-medium"}`}>
                  Company Name *
                </label>
                <AnimatePresence>
                  {errors.company && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold uppercase mt-1 absolute">{errors.company}</motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="relative group/field">
                <MessageSquare className={`absolute left-0 top-6 w-5 h-5 transition-all duration-300 ${activeField === "message" ? "text-[#3C4CFF]" : "text-zinc-400"}`} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  rows={3}
                  className="w-full bg-transparent border-b border-zinc-200 focus:border-[#3C4CFF] transition-all duration-500 px-8 pt-6 pb-2 text-black focus:outline-none resize-none"
                  placeholder=" "
                />
                <label className={`absolute left-8 transition-all duration-300 pointer-events-none ${activeField === "message" || formData.message ? "-top-6 text-xs text-[#3C4CFF] font-bold uppercase tracking-widest" : "top-6 text-zinc-400 font-medium"}`}>
                  Describe Your Requirements
                </label>
              </div>

              <div className="flex flex-col gap-8">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={setCaptchaToken}
                  size="normal"
                />

                <motion.button
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(60, 76, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formLoading}
                  className="group relative w-full h-[70px] bg-[#3C4CFF] text-white rounded-2xl font-black text-lg uppercase tracking-[4px] overflow-hidden"
                >
                  <span className="relative z-10">{formLoading ? "Sending..." : "Connect Now"}</span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#3C4CFF] via-sky-400 to-[#3C4CFF] -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out opacity-20" />
                </motion.button>
              </div>
            </form>
          </div>

          <div className="hidden lg:block lg:w-1/2 relative bg-zinc-50">
            {data?.Form[0]?.Image?.url && (
              <Image
                src={data.Form[0].Image.url}
                alt={data.Form[0].Image.alternativeText || "Contact Us"}
                fill
                className="object-cover"
                priority
              />
            )}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
