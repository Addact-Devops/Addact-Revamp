"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import contactImage from "../../../public/contact.png";

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

const ContactUs = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.company) newErrors.company = "Company name is required.";
        return newErrors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", company: "", message: "" });
            }
        } catch (err) {
            console.error("Submission error", err);
        }
    };

    return (
        <section className='w-full text-white py-12 px-4'>
            <div className='container mx-auto border border-gray-700 overflow-hidden !p-0'>
                <div className='flex flex-col justify-between'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                        <div className='md:w-1/3 border-r border-gray-700 px-16 py-28'>
                            <h2 className='text-5xl font-semibold leading-tight'>Contact us</h2>
                            <div className='h-[5px] w-[160px] bg-blue-600 mt-2 mb-4'></div>
                        </div>
                        <p className='md:w-[77%] text-white px-16 font-light !text-3xl !leading-[54px]'>
                            We would love to hear from you. Feel free to reach out to us for your next project and we
                            will be available at your earliest convenience.
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <form
                            onSubmit={handleSubmit}
                            className='space-y-6 w-1/2 px-11 py-20 border-t border-gray-700 h-[594px]'
                        >
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-xl font-semibold mb-1'>
                                        Your Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className='w-full bg-transparent border-b border-gray-700 px-3 pl-0 py-2 placeholder-gray-500 focus:outline-none'
                                        placeholder='Type your name here'
                                    />
                                    {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                                </div>
                                <div>
                                    <label className='block text-xl font-semibold mb-1'>
                                        Email Address <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className='w-full bg-transparent border-b border-gray-700 px-3 pl-0 py-2 placeholder-gray-500 focus:outline-none'
                                        placeholder='Type your email here'
                                    />
                                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className='block text-xl font-semibold mb-1'>
                                    Company Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    name='company'
                                    value={formData.company}
                                    onChange={handleChange}
                                    className='w-full bg-transparent border-b border-gray-700 px-3 pl-0 py-2 placeholder-gray-500 focus:outline-none'
                                    placeholder='Type your company name here'
                                />
                                {errors.company && <p className='text-red-500 text-sm mt-1'>{errors.company}</p>}
                            </div>
                            <div>
                                <label className='block text-xl font-semibold mb-1'>Describe Your Requirements</label>
                                <textarea
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className='w-full bg-transparent border-b border-gray-700 px-3 pl-0 py-2 placeholder-gray-500 focus:outline-none'
                                    placeholder='Type here...'
                                ></textarea>
                            </div>
                            <button
                                type='submit'
                                className='w-full bg-blue-600 text-lg font-semibold text-white py-3 rounded hover:bg-blue-700'
                            >
                                Contact Us
                            </button>
                            {submitted && <p className='text-green-500 text-sm mt-2'>Thank you for contacting us!</p>}
                        </form>

                        <div className='hidden lg:block w-1/2 h-[594px]'>
                            <Image
                                src={contactImage}
                                alt='contact illustration'
                                width={868}
                                height={594}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
