export interface CareerFormState {
    fullName: string;
    email: string;
    phone: string;
    currentCTC: string;
    expectedCTC: string;
    experience: string;
    cityName: string;
    linkedInProfile: string;
    remarks: string;
    hyperlink: string;
}

export type CareerFormErrors = Partial<Record<keyof CareerFormState | "resume" | "captcha", string>>;

export const validateCareerForm = (
    form: CareerFormState,
    resumeFile: File | null,
    captchaToken: string | null
): CareerFormErrors => {
    const errors: CareerFormErrors = {};

    // Full name
    if (!form.fullName.trim()) {
        errors.fullName = "Full name is required.";
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
        errors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email.";
    }

    // Normalize phone number (remove spaces, dashes, parentheses)
    const normalizePhone = (phone: string) => phone.replace(/[\s-()]/g, "");

    // Phone validation
    const rawPhone = form.phone.trim();
    if (!rawPhone) {
        errors.phone = "Phone number is required.";
    } else {
        const normalized = normalizePhone(rawPhone);

        // E.164 global format: + followed by 8–15 digits
        const globalRegex = /^\+?[1-9]\d{7,14}$/;

        // Indian local format: 10 digits, starts with 6–9
        const indianLocalRegex = /^[6-9]\d{9}$/;

        if (!(globalRegex.test(normalized) || indianLocalRegex.test(normalized))) {
            errors.phone = "Please enter a valid mobile number (with country code or 10-digit Indian number).";
        }
    }

    if (!form.currentCTC.trim()) {
        errors.currentCTC = "Current CTC is required.";
    }

    if (!form.expectedCTC.trim()) {
        errors.expectedCTC = "Expected CTC is required.";
    }

    if (!form.experience.trim()) {
        errors.experience = "Experience is required.";
    }

    // Resume required
    if (!resumeFile) {
        errors.resume = "Please upload your resume.";
    }

    // Captcha required
    if (!captchaToken) {
        errors.captcha = "Please complete the captcha.";
    }

    if (form.linkedInProfile.trim()) {
        try {
            new URL(form.linkedInProfile);
        } catch {
            errors.linkedInProfile = "Please enter a valid LinkedIn profile URL.";
        }
    }

    if (form.hyperlink.trim()) {
        try {
            new URL(form.hyperlink);
        } catch {
            errors.hyperlink = "Please enter a valid portfolio link.";
        }
    }

    return errors;
};
