"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type DownloadFormProps = {
    title: string;
    description?: string;
    pdfUrl: string;
    submitUrl: string;
    pdfName?: string;
    className?: string;
};

const DownloadForm = ({
    title,
    description,
    pdfUrl,
    pdfName = "file.pdf",
    submitUrl,
    className = "",
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
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Submission failed:", result.message);
                return;
            }

            console.log("Submitted successfully:", result);

            const link = document.createElement("a");
            link.href = pdfUrl;
            link.setAttribute("download", pdfName);
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className={`space-y-4 bg-[#f9f9f9] p-6 rounded-2xl shadow-md lg:max-w-sm w-full ${className}`}
        >
            <h2 className='text-2xl font-semibold leading-tight mb-2'>{title}</h2>
            {description && <p className='text-gray-600 mb-4'>{description}</p>}

            <input
                type='text'
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='Full Name*'
                className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
            />

            <input
                type='email'
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder='Business Email*'
                className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
            />

            <input
                type='tel'
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder='Phone Number*'
                pattern='[0-9]{10,15}'
                title='Please enter a valid phone number (10–15 digits only)'
                className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
            />

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token: string | null) => setCaptchaToken(token)}
                className='mx-auto w-full'
            />

            <button
                type='submit'
                className='w-full bg-[#f16565] cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-[#e45555] transition'
            >
                {submitting ? (
                    <span className='flex justify-center items-center gap-2'>
                        <span className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></span>
                        Processing...
                    </span>
                ) : (
                    "Download"
                )}
            </button>
        </form>
    );
};

export default DownloadForm;
