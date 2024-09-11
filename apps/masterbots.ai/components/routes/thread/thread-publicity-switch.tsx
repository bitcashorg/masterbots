import * as Switch from '@radix-ui/react-switch';
import { Eye, EyeOff } from 'lucide-react'; // Importing the icons from lucide-react'
import { cn } from '@/lib/utils';
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility';

export  function ThreadPublicitySwitch({ threadId }: { threadId: string }) {   
  const { isPublic, toggleVisibility } = useThreadVisibility(threadId);
 
  return (
    <Switch.Root
      className="relative inline-flex items-center h-[24px] w-[48px] bg-gray-300 dark:bg-gray-600 rounded-full"
      checked={isPublic}
      onCheckedChange={toggleVisibility}
    >
      <Switch.Thumb
      title={isPublic ? 'Make public' : 'Make Private'}
       className={cn('w-[30px] h-[30px] bg-gray-100 dark:bg-gray-800 rounded-full transform transition-transform duration-100 ease-in-out', isPublic ? 'translate-x-[24px]' : '')}
      />
      <div className="absolute left-0 right-0 flex justify-between items-center w-full h-full px-[4px]">
        <Eye className={cn('w-[18px] h-[18px] transition-opacity duration-300', isPublic ? 'text-gray-400' : 'text-gray-200')} />
        <EyeOff className={cn('w-[18px] h-[18px]  transition-opacity duration-300', !isPublic ? 'text-gray-400' : 'text-gray-200')} />
      </div>
    </Switch.Root>
  );
}
