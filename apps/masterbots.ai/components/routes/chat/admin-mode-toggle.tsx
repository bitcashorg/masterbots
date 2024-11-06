//? Component for toggling admin mode on and off

'use client';
import React from 'react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility';

export function AdminModeToggle() {
  //* Retrieves admin mode state and toggle handler from useThreadVisibility hook
  const { isAdminMode, handleToggleAdminMode } = useThreadVisibility();

  return (
    <Button
      variant={isAdminMode ? 'destructive' : 'secondary'}
      onClick={handleToggleAdminMode}
      className="flex items-center justify-center px-4 py-2 transition-all duration-300 rounded-md shadow-md"
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
}