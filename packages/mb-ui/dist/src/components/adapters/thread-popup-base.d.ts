import * as React from "react";
interface ThreadPopupBaseProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isBrowseView?: boolean;
  headerActions?: React.ReactNode;
}
export declare const ThreadPopupBase: React.ForwardRefExoticComponent<
  ThreadPopupBaseProps & React.RefAttributes<HTMLDivElement>
>;
export {};
//# sourceMappingURL=thread-popup-base.d.ts.map
