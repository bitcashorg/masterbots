import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AdminModeApprove = () => {

   return (
      <div className="bg-[#BE17E81A] py-3  flex justify-between w-full border-t border-[#BE17E8] px-2">
        <ShieldCheck className="w-4 h-4 mr-2 text-[#BE17E8]" />
         <button className='text-purple-500 font-semibold'>
            Approve
         </button>  
      </div>
   )
}