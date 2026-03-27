"use client";
import { useState } from "react";
import Image from "next/image";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePathname } from "next/navigation";

type RichTextBlock = {
  type: string;
  children: {
    text: string;
  }[];
};

type ContactUsFormProps = {
  ContactUsFormBlock: {
    LeftTitle: string;
    LeftDescription: RichTextBlock[] | string[];
    LeftBackgroundImage: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
    };
    RightTitle: string;
    RightDescription: RichTextBlock[] | string[];
    RecipientEmails: string;
  };
};

function isRichTextBlocks(blocks: unknown): blocks is RichTextBlock[] {
  return (
    Array.isArray(blocks) &&
    blocks.length > 0 &&
    blocks[0] !== null &&
    typeof blocks[0] === "object" &&
    "type" in blocks[0] &&
    "children" in blocks[0]
  );
}

const renderRichText = (blocks: RichTextBlock[] | string[], isLeft = false) => {
  if (!blocks || blocks.length === 0) return null;

  if (typeof blocks[0] === "string") {
    return (blocks as string[]).map((text, index) => (
      <p key={index} className={`text-[#000000] ${isLeft ? "text-white" : "text-[#000000]"}`}>
        {text}
      </p>
    ));
  }

  if (isRichTextBlocks(blocks)) {
    return blocks.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p
            key={index}
            className={`text-base leading-relaxed mb-2 ${isLeft ? "text-white" : "text-[#000]"}`}
          >
            {block.children?.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  }

  return null;
};

const ContactUsForm = ({ ContactUsFormBlock }: ContactUsFormProps) => {
  const {
    LeftTitle,
    LeftDescription,
    LeftBackgroundImage,
    RightTitle,
    RightDescription,
    RecipientEmails,
  } = ContactUsFormBlock;
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    requirements: "",
    honeypot: "",
  });
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const redirectUrl = `${pathname}/connect-now-thank-you`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot.trim() !== "") {
      console.warn("Honeypot field was filled - potential bot detected");
      return;
    }

    const isCaptchaMissing = !captchaToken;
    setCaptchaError(isCaptchaMissing);
    if (isCaptchaMissing) {
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        companyName: formData.companyName,
        requirements: formData.requirements,
        recipientEmails: RecipientEmails,
        honeypot: formData.honeypot,
        turnstileToken: captchaToken,
      };

      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          requirements: "",
          honeypot: "",
        });
        setCaptchaToken(null);
        window.location.href = redirectUrl;
      } else {
        const { error } = await res.json();
        console.error("Form submission error:", error);
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section
      className="container-main !px-0 md:!px-[25px] pb-[60px] lg:pb-[100px] mt-[60px] lg:mt-[100px]"
      id="contact-page-form"
    >
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-md">
        {/* Left Side */}
        <div className="relative w-full md:w-[35%] min-h-[300px] sm:min-h-[400px] md:min-h-[unset]">
          <div className="absolute inset-0">
            <Image
              src={LeftBackgroundImage.url}
              alt={LeftBackgroundImage.alternativeText || ""}
              fill
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
            <h2 className="text-white !text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold mb-4">
              {LeftTitle}
            </h2>
            {renderRichText(LeftDescription, true)}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[65%] px-6 sm:px-[50px] xl:px-[110px] py-8 md:py-[40px] bg-white">
          <h2 className="text-[#000000] !text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold mb-[10px]">
            {RightTitle}
          </h2>
          <div className="mb-[50px]">{renderRichText(RightDescription)}</div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-[40px]">
              {/* Full Name */}
              <div className="relative w-full">
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                  required
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                    peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                >
                  Full Name*
                </label>
              </div>

              {/* Business Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                    peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                >
                  Business Email*
                </label>
              </div>
            </div>

            {/* Company Name */}
            <div className="relative">
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                required
              />
              <label
                htmlFor="companyName"
                className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
              >
                Company Name*
              </label>
            </div>

            {/* Requirements */}
            <div className="relative">
              <textarea
                id="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder=" "
                rows={4}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
              />
              <label
                htmlFor="requirements"
                className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
              >
                Describe Your Requirements (Optional)
              </label>
            </div>

            <input
              type="text"
              id="honeypot"
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
                  <p className="mt-1 text-sm text-red-500">Please complete the captcha.</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formLoading}
              className="inline-block bg-[#3C4CFF] hover:bg-[#3440CB] text-white px-[20px] py-[10px] rounded-md font-semibold transition text-lg text-[15px]"
            >
              {formLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsForm;
