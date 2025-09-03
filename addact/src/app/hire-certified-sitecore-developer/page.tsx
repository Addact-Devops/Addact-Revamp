import SiteDetailClient from "./SiteDetailClient";

export const metadata = {
    robots: {
        index: false,
        follow: false, // change to true if you want links followed
    },
};

export default function Page() {
    return <SiteDetailClient />;
}
