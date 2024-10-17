import React , { useEffect, useState } from 'react';
import { getThreadById, UpdateThreadVisibility } from '@/services/hasura';
import { useSession } from 'next-auth/react';


interface ThreadVisibilityContextProps {
  isPublic: boolean;
  isApproved: boolean;
  toggleVisibility: (newIsPublic: boolean, threadId: string) => void;
  fetchThreadById: (threadId: string) => void
}


const ThreadVisibilityContext = React.createContext<ThreadVisibilityContextProps | undefined>(undefined)

export function useThreadVisibility() {
  const context = React.useContext(ThreadVisibilityContext)
  if (!context) {
    throw new Error('useThreadVisibilityContext must be used within a ThreadVisibilityProvider')
  }
  return context
}


interface ThreadVisibilityProviderProps {
  children: React.ReactNode
}

export function ThreadVisibilityProvider({ children }: ThreadVisibilityProviderProps) {
  const [isPublic, setIsPublic] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const session = useSession();
  const jwt = session?.data?.user?.hasuraJwt;


  const toggleVisibility = async (newIsPublic: boolean, threadId: string) => {
    setIsPublic(newIsPublic);
    try {
    await UpdateThreadVisibility({ isPublic: newIsPublic, threadId, jwt });
    } catch (error) {
    setIsPublic(newIsPublic);
    console.error('Failed to update thread visibility:', error);
    }
  };

   const fetchThreadById = async (threadId: string) => {
    try {
      const obj = {
        isApproved: true,
        isPublic: true,
        threadId: true,
      }
      const { threadByPk }  = await getThreadById({ threadId, obj });
       if(threadByPk){
        setIsPublic(threadByPk?.isPublic);
        setIsApproved(threadByPk?.isApproved);
       };
    } catch (error) {
      console.error('Failed to get thread visibility:', error);
    }
  }

  return (
    <ThreadVisibilityContext.Provider value={{ isPublic,isApproved, toggleVisibility, fetchThreadById }}>
      {children}
    </ThreadVisibilityContext.Provider>
  );
}