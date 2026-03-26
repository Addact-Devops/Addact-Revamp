"use client";

import { useState, useRef, useMemo } from "react";
import { notFound, usePathname } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { CareerDetailResponse } from "@/graphql/queries/getCareerDetails";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
// import "../../../styles/components/caseStudy-detail.scss";
import HeroBanner from "@/components/organisms/HeroBanner";
import { CareerFormState, CareerFormErrors, validateCareerForm } from "@/utils/validateCareerForm";
import Loader from "@/components/atom/loader";

interface CareerDetailClientProps {
  data: CareerDetailResponse["careerDetails"][number] | undefined;
}

export default function CareerDetailClient({ data }: CareerDetailClientProps) {
  const pathname = usePathname();
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState<CareerFormState>({
    fullName: "",
    email: "",
    phone: "",
    currentCTC: "",
    expectedCTC: "",
    experience: "",
    cityName: "",
    linkedInProfile: "",
    remarks: "",
    hyperlink: "",
  });

  const [errors, setErrors] = useState<CareerFormErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const redirectUrl = `${pathname}/thank-you-career`;
  const pageTitle = useMemo(() => pathname.split("/").filter(Boolean).pop(), [pathname]);

  if (!data) return notFound();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = async (file: File) => {
    setResumeLoading(true);
    try {
      setForm({
        fullName: "",
        email: "",
        phone: "",
        currentCTC: "",
        expectedCTC: "",
        experience: "",
        cityName: "",
        linkedInProfile: "",
        remarks: "",
        hyperlink: "",
      });

      const aiFormData = new FormData();
      aiFormData.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: aiFormData,
      });

      if (!res.ok) {
        throw new Error("Failed to parse resume");
      }

      const parsed = await res.json();

      // 🔹 Update the form state with AI-extracted fields
      setForm((prev) => ({
        ...prev,
        fullName: parsed.extracted.fullName || prev.fullName,
        email: parsed.extracted.email || prev.email,
        phone: parsed.extracted.phone || prev.phone,
        experience: parsed.extracted.yearsOfExperience || prev.experience,
        cityName: parsed.extracted.city || prev.cityName,
        linkedInProfile: parsed.extracted.linkedin || prev.linkedInProfile,
        hyperlink: parsed.extracted.portfolio || prev.hyperlink,
      }));
      setResumeLoading(false);
    } catch (err) {
      console.error("AI file upload failed:", err);
      setResumeLoading(false);
    }
  };

  /** Handle submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== "") {
      console.warn("Honeypot field was filled - potential bot detected");
      return;
    }

    const isCaptchaMissing = !captchaToken;
    setCaptchaError(isCaptchaMissing);

    const validationErrors = validateCareerForm(form, resumeFile, captchaToken);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 || isCaptchaMissing) return;

    setFormLoading(true);

    const formData = new FormData();

    // Required fields
    formData.append("name", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);

    // Additional fields
    formData.append("currentCTC", form.currentCTC);
    formData.append("expectedCTC", form.expectedCTC);
    formData.append("experience", form.experience);
    formData.append("cityName", form.cityName);
    formData.append("linkedInProfile", form.linkedInProfile);
    formData.append("remarks", form.remarks);
    formData.append("hyperlink", form.hyperlink);

    // Metadata
    formData.append("sheetName", "CareerForm");
    formData.append("RecipientEmails", data.careers_form.FormFields.RecipientEmails);
    formData.append("pageTitle", `"${pageTitle}"`);
    formData.append("honeypot", honeypot);
    formData.append("turnstileToken", captchaToken || "");

    // Resume
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const res = await fetch("/api/submit-career-form", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setForm({
          fullName: "",
          email: "",
          phone: "",
          currentCTC: "",
          expectedCTC: "",
          experience: "",
          cityName: "",
          linkedInProfile: "",
          remarks: "",
          hyperlink: "",
        });
        setHoneypot("");
        setResumeFile(null);
        setSubmitError(null);
        window.location.href = redirectUrl;
      } else {
        setSubmitError(result.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const bannerData = data?.Banner?.[0];

  return (
    <div>
      {data && (
        <HeroBanner
          title={bannerData?.BannerTitle ?? ""}
          description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
          button={{
            label: bannerData?.BannerLink?.label ?? "",
            url: bannerData?.BannerLink?.href ?? "",
          }}
          backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
        />
      )}

      <section className="bg-[#f4f4f4] py-[40px]">
        <div className="container-main">
          <div className="caseStudy-wrapper mt-16 text-black">
            <BlogContentRenderer blocks={data.JobDescription} />
          </div>

          <section id="form" className="bg-[#f4f4f4] py-10 scroll-mt-20 md:scroll-mt-32">
            <div className="max-w-[1200px] mx-auto bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row shadow-lg">
              {/* Left Image Block */}
              <div
                className="w-full md:w-1/3 bg-cover bg-center p-5 pb-12 text-white flex flex-col justify-end"
                style={{
                  backgroundImage: `url(${data.careers_form.LeftInsights.Image.url})`,
                }}
              >
                <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[50px] !text-white !font-semibold leading-tight mb-6">
                  {data.careers_form.LeftInsights.Title}
                </h2>
                <div
                  className="text-white text-base"
                  dangerouslySetInnerHTML={{
                    __html: data.careers_form.LeftInsights.Description,
                  }}
                />
              </div>

              {/* Right Form Block */}
              <div className="w-full md:w-2/3 pt-8 pr-4 md:pr-14 pb-14 pl-4 md:pl-14 xl:pl-20 bg-[#f9f9f9]">
                <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[44px] font-semibold text-black leading-snug mb-3">
                  {data.careers_form.FormFields.Form[0]?.Title}
                </h2>
                <div
                  className="text-base text-[#333] mb-6"
                  dangerouslySetInnerHTML={{
                    __html: data.careers_form.FormFields.Form[0]?.Description,
                  }}
                />

                {/* Upload Resume */}
                <div
                  className="rounded-[16px] overflow-hidden relative bg-cover bg-center p-6 mb-8 flex flex-col md:flex-row justify-between items-center"
                  style={{
                    backgroundImage: `url(${data.careers_form.FormFields.Form[1]?.Image?.url})`,
                  }}
                >
                  <div className="text-white md:max-w-[70%]">
                    <h3 className="!text-2xl !text-white !font-semibold mb-1">
                      {data.careers_form.FormFields.Form[1]?.Title}
                    </h3>
                    <div
                      className="prose prose-sm prose-invert text-white max-w-none !text-lg"
                      dangerouslySetInnerHTML={{
                        __html: data.careers_form.FormFields.Form[1]?.Description,
                      }}
                    />
                  </div>
                  <div className="mt-4 md:mt-0 md:mr-5 max-w-[100%] md:max-w-[30%]">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#3C4CFF] text-white text-sm px-5 py-2 rounded-md hover:bg-[#3440CB] transition-all duration-200"
                    >
                      {data.careers_form.FormFields.Form[1]?.Link?.label || "Apply with Resume*"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0];
                          if (file.size > 5 * 1024 * 1024) {
                            setErrors((prev) => ({
                              ...prev,
                              resume: "Resume file size must be 5MB or less.",
                            }));
                            e.target.value = "";
                            return;
                          }
                          setResumeFile(file);
                          setErrors((prev) => ({ ...prev, resume: "" }));
                          handleResumeUpload(file);
                        }
                      }}
                    />
                    {resumeFile && (
                      <p className="mt-2 text-sm text-green-600 truncate max-w-full">
                        {resumeFile.name}
                      </p>
                    )}
                    {errors.resume && <p className="text-red-600 text-sm mt-2">{errors.resume}</p>}
                  </div>
                </div>

                {/* Actual Form */}
                <form className="space-y-4 relative" onSubmit={handleSubmit}>
                  {resumeLoading && (
                    <div className="absolute top-0 right-0 w-full h-full z-10 bg-[#ffffffa3] flex items-center justify-center transition-opacity duration-300">
                      <Loader />
                    </div>
                  )}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder={data.careers_form.FormFields.NameLable}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <input
                        type="email"
                        name="email"
                        placeholder={data.careers_form.FormFields.EmailLabel}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="w-full">
                      <input
                        type="tel"
                        name="phone"
                        placeholder={data.careers_form.FormFields.PhoneLabel}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <input
                        type="text"
                        name="currentCTC"
                        placeholder={data.careers_form.fieldName[1].Title}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.currentCTC}
                        onChange={handleChange}
                      />
                      {errors.currentCTC && (
                        <p className="text-red-600 text-sm mt-1">{errors.currentCTC}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <input
                        type="text"
                        name="expectedCTC"
                        placeholder={data.careers_form.fieldName[2].Title}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.expectedCTC}
                        onChange={handleChange}
                      />
                      {errors.expectedCTC && (
                        <p className="text-red-600 text-sm mt-1">{errors.expectedCTC}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <input
                        type="text"
                        name="experience"
                        placeholder={data.careers_form.fieldName[0].Title}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.experience}
                        onChange={handleChange}
                      />
                      {errors.experience && (
                        <p className="text-red-600 text-sm mt-1">{errors.experience}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <input
                        type="text"
                        name="cityName"
                        placeholder={data.careers_form.fieldName[4].Title}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.cityName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <input
                        type="text"
                        name="hyperlink"
                        placeholder={data.careers_form.FormFields.GeneralText}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.hyperlink}
                        onChange={handleChange}
                      />
                      {errors.hyperlink && (
                        <p className="text-red-600 text-sm mt-1">{errors.hyperlink}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        name="linkedInProfile"
                        placeholder={data.careers_form.fieldName[3].Title}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                        value={form.linkedInProfile}
                        onChange={handleChange}
                      />
                      {errors.linkedInProfile && (
                        <p className="text-red-600 text-sm mt-1">{errors.linkedInProfile}</p>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    name="remarks"
                    placeholder={data.careers_form.fieldName[5].Title}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-black placeholder-gray-500"
                    value={form.remarks}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="flex justify-start w-full overflow-hidden">
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

                  {submitError && (
                    <p className="text-red-600 text-sm rounded-md bg-red-50 border border-red-200 px-4 py-2">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="bg-[#3C4CFF] text-white px-6 py-2 rounded-md hover:bg-[#3440CB] shadow-sm mt-4 disabled:!cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                  >
                    {formLoading ? "Submitting..." : data.careers_form.FormFields.ButtonLabel}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
