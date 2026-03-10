import React from "react";

export const RightArrowIcon: React.FC = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0383 7.4126L25.6258 15.0001L18.0383 22.5876"
        stroke="#3C4CFF"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.375 15L25.4125 15"
        stroke="#3C4CFF"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RightArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.7832 14.4863L29.5135 14.4863L29.5135 25.2167"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4883 29.5127L29.364 14.6369"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CaretRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const { className, ...rest } = props || {};
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`align-middle inline-block ${className ?? ""}`}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
        fill="white"
      />
    </svg>
  );
};

export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  const { ...rest } = props || {};
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      {...rest}
    >
      <path
        d="M18.0383 7.41235L25.6258 14.9999L18.0383 22.5874"
        stroke="#3C4CFF"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.375 15L25.4125 15"
        stroke="#3C4CFF"
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props || {};
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      {...rest}
    >
      <circle
        cx="20"
        cy="20"
        r="19.5"
        fill="white"
        fill-opacity="0.1"
        stroke="#3C4CFF"
      />
      <path
        d="M12.2004 27.1998C11.7054 27.1998 11.2816 27.0235 10.9291 26.6708C10.5766 26.3181 10.4004 25.8941 10.4004 25.3988V14.5928C10.4004 14.0975 10.5766 13.6748 10.9291 13.3248C11.2816 12.9748 11.7054 12.7998 12.2004 12.7998H27.8004C28.2954 12.7998 28.7191 12.9761 29.0716 13.3288C29.4241 13.6815 29.6004 14.1055 29.6004 14.6008V25.4068C29.6004 25.9021 29.4241 26.3248 29.0716 26.6748C28.7191 27.0248 28.2954 27.1998 27.8004 27.1998H12.2004ZM20.0004 21.1998L12.2004 16.7248V25.3998H27.8004V16.7248L20.0004 21.1998ZM20.0004 19.0748L27.8004 14.5998H12.2004L20.0004 19.0748ZM12.2004 16.7248V14.5998V25.3998V16.7248Z"
        fill="#E3E3E3"
      />
    </svg>
  );
};
