
//? Component for approving threads in admin mode

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility';

interface AdminModeApproveProps {
  threadId: string;
}

export function AdminModeApprove({ threadId }: AdminModeApproveProps) {
  const { adminApproveThread } = useThreadVisibility();
  const [isLoading, setIsLoading] = useState(false); //* Tracks the loading state during approval
  const [error, setError] = useState<string | null>(null); //* Stores any error message from approval

  //* Handles the approval of a thread by calling the adminApproveThread function
  const approveThread = async () => {
    setIsLoading(true);
    try {
      await adminApproveThread(threadId);
    } catch (err) {
      setError('Failed to approve thread. Please try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#BE17E81A] py-3 flex justify-between w-full border-t border-[#BE17E8] px-2">
      <ShieldCheck className="size-4 mr-2 text-[#BE17E8]" />
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        aria-label="Approve thread"
        disabled={isLoading}
        onClick={approveThread}
        className="font-semibold text-purple-500"
      >
        {isLoading ? 'Approving...' : 'Approve'}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}