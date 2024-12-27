const CloseIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    width={19}
    height={18}
    viewBox="0 0 19 18"
    fill="none"
    role="img"
    aria-label="Close icon"
    {...props}
  >
    <title>Close Icon</title>
    <path
      d="M14 4.5L5 13.5"
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 4.5L14 13.5"
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CloseIcon
