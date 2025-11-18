const MagnifyingGlassIcon = ({
  width = 20,
  height = 20,
  fill = "#A0AEC0",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 2a8 8 0 015.293 13.707l4 4a1 1 0 01-1.414 1.414l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
      fill={fill}
    />
  </svg>
);

export default MagnifyingGlassIcon;
