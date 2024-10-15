import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useThread } from '@/lib/hooks/use-thread';


interface AdminModeApproveProps {
   threadId: string;
 }

export const AdminModeApprove = ({threadId }: AdminModeApproveProps) => {
   const { adminApproveThread } = useThread();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

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
      <div className="bg-[#BE17E81A] py-3  flex justify-between w-full border-t border-[#BE17E8] px-2">
        <ShieldCheck className="w-4 h-4 mr-2 text-[#BE17E8]" />
         <button   aria-label="Approve thread"  disabled={isLoading} onClick={approveThread} className='text-purple-500 font-semibold'>
           {isLoading ? 'Approving...' : 'Approve'}
         </button>  
         {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
   )
}