const SuccessCheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}   // allows custom className, sx, style, etc.
    >
      <path
        d="M10 0.5C15.2468 0.5 19.5 4.7533 19.5 10C19.5 15.2467 15.2468 19.5 10 19.5C4.75328 19.5 0.5 15.2467 0.5 10C0.5 4.75332 4.75328 0.500041 10 0.5Z"
        fill="#01CD52"
        fillOpacity="0.15"
        stroke="#01CD52"
      />
      <path
        d="M6.15332 10.8345C6.15332 10.8345 7.55253 11.4425 8.25213 12.3337C8.25213 12.3337 10.3509 8.83567 13.1493 7.66968"
        stroke="#06943F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SuccessCheckIcon;
