import * as React from "react";
interface ThreadPopupProProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isBrowseView?: boolean;
  onConvertToDocument?: () => void;
  showConvertButton?: boolean;
  isConverting?: boolean;
}
export declare const ThreadPopupPro: React.ForwardRefExoticComponent<
  ThreadPopupProProps & React.RefAttributes<HTMLDivElement>
>;
export {};
//# sourceMappingURL=thread-popup-pro.d.ts.map
