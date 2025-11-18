const SuccessIcon:React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      width="150"
      height="150"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="20" width="80" height="80" rx="40" fill="#27A376" />
      <g filter="url(#filter0_d_5256_42603)">
        <rect
          x="40"
          y="20"
          width="40"
          height="40"
          rx="20"
          fill="white"
          shapeRendering="crispEdges"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.8839 32.8661C71.372 33.3543 71.372 34.1457 70.8839 34.6339L58.3839 47.1339C57.8957 47.622 57.1043 47.622 56.6161 47.1339L50.3661 40.8839C49.878 40.3957 49.878 39.6043 50.3661 39.1161C50.8543 38.628 51.6457 38.628 52.1339 39.1161L57.5 44.4822L69.1161 32.8661C69.6043 32.378 70.3957 32.378 70.8839 32.8661Z"
          fill="#27A376"
        />
      </g>

      <defs>
        <filter
          id="filter0_d_5256_42603"
          x="0"
          y="0"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5256_42603"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5256_42603"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
);    
export default SuccessIcon;
