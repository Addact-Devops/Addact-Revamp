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
            className='inline-block bg-[#3C4CFF] text-white px-4 py-2 rounded hover:bg-[#3440CB] transition'
        >
            {label}
        </a>
    );
}
