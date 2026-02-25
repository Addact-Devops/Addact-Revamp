"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RichText from "../atom/richText";

type DownloadFormProps = {
    title: string;
    description?: string;
    pdfUrl?: string;
    redirectUrl?: string;
    submitUrl: string;
    pdfName?: string;
    sheetName: string;
    className?: string;
    NameLabel: string;
    EmailLabel: string;
    PhoneLabel: string;
    ButtonLabel: string;
    RecipientEmails: string;
    pageTitle: string;
};

const DownloadForm = ({
    title,
    description,
    pdfUrl,
    pdfName = "file.pdf",
    submitUrl,
    sheetName,
    redirectUrl,
    className = "",
    NameLabel,
    EmailLabel,
    PhoneLabel,
    ButtonLabel,
    RecipientEmails,
    pageTitle,
}: DownloadFormProps) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the captcha.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    sheetName,
                    RecipientEmails,
                    pageTitle,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Submission failed:", result.message);
                return;
            }

            if (redirectUrl) {
                window.location.href = redirectUrl;
            }

            if (pdfUrl) {
                const link = document.createElement("a");
                link.href = pdfUrl;
                link.setAttribute("download", pdfName);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleFormSubmit}
            className={`relative overflow-hidden bg-white border border-gray-100 p-8 md:p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] w-full ${className}`}
        >
            {/* Subtle Brand Accent Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-linear-to-r from-transparent via-[#3C4CFF]/20 to-transparent" />
            
            <div className="relative z-10">
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-black leading-tight mb-3">
                    {title}
                </h2>
                {description && (
                    <div className="text-gray-500 text-lg mb-8 leading-relaxed font-light">
                        <RichText html={description} />
                    </div>
                )}

                <div className="space-y-5">
                    <div className="group relative">
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={NameLabel || "Full Name*"}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-black text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3C4CFF]/20 focus:border-[#3C4CFF] focus:bg-white transition-all duration-300"
                        />
                    </div>

                    <div className="group relative">
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={EmailLabel || "Business Email*"}
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-black text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3C4CFF]/20 focus:border-[#3C4CFF] focus:bg-white transition-all duration-300"
                        />
                    </div>

                    <div className="group relative">
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={PhoneLabel || "Phone Number*"}
                            pattern="[0-9]{10,15}"
                            title="Please enter a valid phone number (10–15 digits only)"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-black text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3C4CFF]/20 focus:border-[#3C4CFF] focus:bg-white transition-all duration-300"
                        />
                    </div>

                    <div className="pt-2">
                        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex justify-center">
                            <div className="recaptcha-wrapper">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                    onChange={(token: string | null) => setCaptchaToken(token)}
                                    size="normal"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full mt-4 bg-black cursor-pointer text-white font-bold py-5 rounded-2xl shadow-xl shadow-black/10 hover:bg-[#3C4CFF] transition-all duration-300 flex justify-center items-center group"
                    >
                        {submitting ? (
                            <span className="flex items-center gap-3">
                                <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                                <span className="tracking-wide">PROCESSING...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 tracking-[0.05em] uppercase text-sm font-black">
                                {ButtonLabel || "Contact Us"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.form>
    );
};

export default DownloadForm;
