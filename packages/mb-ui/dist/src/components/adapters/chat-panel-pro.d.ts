import * as React from "react";
interface ChatPanelProProps {
  children: React.ReactNode;
  className?: string;
  onSaveDocument?: () => void;
  showSaveButton?: boolean;
  isSaving?: boolean;
  saveDialogOpen?: boolean;
  onSaveDialogClose?: () => void;
  saveDialogTitle?: string;
  saveDialogContent?: React.ReactNode;
}
export declare const ChatPanelPro: React.ForwardRefExoticComponent<
  ChatPanelProProps & React.RefAttributes<HTMLDivElement>
>;
export {};
//# sourceMappingURL=chat-panel-pro.d.ts.map
