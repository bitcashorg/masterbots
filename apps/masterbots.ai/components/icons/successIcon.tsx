const SuccessIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    role="img"
    aria-label="Success icon"
    {...props}
  >
    <path
      d="M1 5L5 9L13 1"
      stroke="#83E56A"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SuccessIcon
