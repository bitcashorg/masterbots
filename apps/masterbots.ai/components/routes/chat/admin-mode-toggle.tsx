'use client'
import React, { useState } from 'react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import  { useThread } from '@/lib/hooks/use-thread';

export const AdminModeToggle = () => {
const { isAdminMode, handleToggleAdminMode } = useThread();

  const toggleAdminMode = () => {
      handleToggleAdminMode()
      console.log({ isAdminMode })
  };

  return (
    <button
      onClick={toggleAdminMode}
      className={`flex items-center justify-center px-4 py-2 rounded-md shadow-md transition-all duration-300 ${
        isAdminMode
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}
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
    </button>
  );
};