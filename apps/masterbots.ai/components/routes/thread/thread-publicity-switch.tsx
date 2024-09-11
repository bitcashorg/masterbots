import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Importing the icons from lucide-react
import { UpdateThreadVisibility } from '@/services/hasura';
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils';

export  function ThreadPublicitySwitch({ threadId }: { threadId: string }) {   
  const [isChecked, setIsChecked] = useState(false);
  const session = useSession()
  const jwt = session?.data?.user?.hasuraJwt

  const handleSwitchChange = async (checked: boolean) => {
    setIsChecked(checked);
    try {
      await UpdateThreadVisibility({ isPublic: !checked, threadId, jwt });
    } catch (error) {
      setIsChecked(!checked);
      console.error('Failed to update thread visibility:', error);
    }
  };

  return (
    <Switch.Root
      className="relative inline-flex items-center h-[24px] w-[48px] bg-gray-300 dark:bg-gray-600 rounded-full"
      checked={isChecked}
      onCheckedChange={handleSwitchChange}
    >
      <Switch.Thumb
        className={`w-[24px] h-[24px] bg-gray-100 dark:bg-gray-800 rounded-full transform transition-transform duration-100 ease-in-out ${isChecked ? 'translate-x-[24px]' : ''}`}
      />
      <div className="absolute left-0 right-0 flex justify-between items-center w-full h-full px-[4px]">
        <Eye className={cn('w-[16px] h-[16px] transition-opacity duration-300', isChecked ? 'text-gray-400' : 'text-gray-200')} />
        <EyeOff className={cn('w-[16px] h-[16px]  transition-opacity duration-300', isChecked ? 'text-gray-200' : 'text-gray-400')} />
      </div>
    </Switch.Root>
  );
}
