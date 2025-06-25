type ButtonProps = {
    href: string;
    label: string;
    target?: string;
    isExternal?: boolean;
};

export default function Button({ href, label, target, isExternal }: ButtonProps) {
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : target}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
            {label}
        </a>
    );
}
