import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useThread } from '@/lib/hooks/use-thread';


interface AdminModeApproveProps {
   threadId: string;
 }

export const AdminModeApprove = ({threadId }: AdminModeApproveProps) => {
   const { adminApproveThread } = useThread();

   const approveThread = () => {
         adminApproveThread(threadId)
    };
   return (
      <div className="bg-[#BE17E81A] py-3  flex justify-between w-full border-t border-[#BE17E8] px-2">
        <ShieldCheck className="w-4 h-4 mr-2 text-[#BE17E8]" />
         <button onClick={approveThread} className='text-purple-500 font-semibold'>
            Approve
         </button>  
      </div>
   )
}