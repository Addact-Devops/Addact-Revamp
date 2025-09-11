"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
        <form
            onSubmit={handleFormSubmit}
            className={`space-y-4 bg-[#f9f9f9] p-6 rounded-2xl shadow-md  w-full ${className}`}
        >
            <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold leading-tight mb-2">{title}</h2>
            {description && (
                <div className="text-gray-600 mb-4">
                    <RichText html={description} />{" "}
                </div>
            )}

            <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={NameLabel || "Full Name*"}
                className="w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={EmailLabel || "Business Email*"}
                className="w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={PhoneLabel || "Phone Number*"}
                pattern="[0-9]{10,15}"
                title="Please enter a valid phone number (10–15 digits only)"
                className="w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="flex justify-center">
                <div className="recaptcha-wrapper">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                        onChange={(token: string | null) => setCaptchaToken(token)}
                        size="normal"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#3C4CFF] cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-[#3440CB] transition"
            >
                {submitting ? (
                    <span className="flex justify-center items-center gap-2">
                        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                        Processing...
                    </span>
                ) : (
                    ButtonLabel || "Download"
                )}
            </button>
        </form>
    );
};

export default DownloadForm;
