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
            className='block text-black hover:text-[#3C4CFF] underline text-[22px] transition-colors duration-300'
        >
            {label}
        </a>
    );
}
