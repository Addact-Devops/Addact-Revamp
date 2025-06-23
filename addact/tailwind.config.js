/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
                grayCustom: "#2e2e2e",
            },
        extend: {
            colors: {
                grayCustom: "#2e2e2e",
            },
            animation: {
                marquee: "scroll-marquee 20s linear infinite",
                fadeWord: "fadeWord 1.3s ease forwards",
            },
            keyframes: {
                "scroll-marquee": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                fadeWord: {
                    from: { opacity: "0.5" },
                    to: { opacity: "1" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
