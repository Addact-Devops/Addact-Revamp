"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { CONTACTUS } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";

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

    const redirectUrl = "/contact-us/connect-now-thank-you";

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.company) newErrors.company = "Company name is required.";

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

    return (
        <section className="w-full text-white md:py-12 pb-[100px] px-4" id="contact-us">
            <div className="container mx-auto overflow-hidden !px-[10px] lg:!px-[20px] xl:!px-4">
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
                                    <label htmlFor="company" className="block text-base md:text-xl font-semibold mb-1">
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
                                    <label htmlFor="message" className="block text-base md:text-xl font-semibold mb-1">
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
                                            onChange={(token: string | null) => setCaptchaToken(token)}
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
        </section>
    );
};

export default ContactUs;
