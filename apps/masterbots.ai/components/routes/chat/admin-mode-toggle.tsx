'use client'
import React from 'react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import  { useThread } from '@/lib/hooks/use-thread';
import { Button } from '@/components/ui/button';

export const AdminModeToggle = () => {
const { isAdminMode, handleToggleAdminMode } = useThread();

  return (
    <Button 
    variant={isAdminMode ? 'destructive' :  'secondary'}
    onClick={handleToggleAdminMode}
    className='flex items-center justify-center px-4 py-2 rounded-md shadow-md transition-all duration-300'
    >
      {isAdminMode ? (
        <>
          <ShieldX className="w-5 h-5 mr-2" />
          Disable Admin Mode
        </>
      ) : (
        <>
          <ShieldCheck className="w-5 h-5 mr-2" />
          Enable Admin Mode
        </>
      )}
    </Button>
  );
};