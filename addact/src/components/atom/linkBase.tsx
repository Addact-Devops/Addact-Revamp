type ButtonProps = {
    href: string;
    label: string;
    target?: string;
    isExternal?: boolean;
};

export default function LinkBase({ href, label, target, isExternal }: ButtonProps) {
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : target}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className='block text-black hover:text-[#5865F2] underline text-[22px]'
        >
            {label}
        </a>
    );
}
