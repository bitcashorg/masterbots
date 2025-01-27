
import { FolderX } from 'lucide-react'

export function EmptyState() {
 return (
   <div className="flex flex-col justify-center items-center h-full w-full text-center p-6">
     <div className="mb-6">
       <FolderX className="mx-auto text-gray-400" size={100} strokeWidth={1} />
     </div>
     <h2 className="text-2xl font-bold text-gray-800 mb-3">
       No Data Available
     </h2>
     <p className="text-gray-600 max-w-md">
       There is no data available for this user.
     </p>
   </div>
 );
}
