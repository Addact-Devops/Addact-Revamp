export interface Image {
    alternativeText: string | null;
    height: number;
    name: string;
    url: string;
    width: number;
}

export interface Link {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
}

export interface Heading {
    id?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
}
