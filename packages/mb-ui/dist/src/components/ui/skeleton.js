import { jsx as _jsx } from "react/jsx-runtime";
export function Skeleton({ className, ...props }) {
  return _jsx("div", {
    className: ["animate-pulse rounded-md bg-muted", className]
      .filter(Boolean)
      .join(" "),
    ...props,
  });
}
