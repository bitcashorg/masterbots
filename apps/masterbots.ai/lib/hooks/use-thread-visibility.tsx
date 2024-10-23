"use client"
import React , { useEffect, useState } from 'react';
import { getThreads, UpdateThreadVisibility, deleteThread, approveThread, getUnapprovedThreads } from '@/services/hasura';
import { useSession } from 'next-auth/react';
import { Thread } from 'mb-genql';
import toast from 'react-hot-toast';


interface ThreadVisibilityContextProps {
  isPublic: boolean;
  toggleVisibility: (newIsPublic: boolean, threadId: string) => void;
  threads: Thread[]
  isSameUser: (thread: Thread) => boolean,
  initiateDeleteThread: (threadId: string) => void;
  handleToggleAdminMode: () => void
  adminApproveThread: (threadId: string) => void
  isAdminMode: boolean
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
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isAdminMode, setIsAdminMode] = React.useState<boolean>(false);

  const session = useSession();
  const jwt = session?.data?.user?.hasuraJwt;


  useEffect(() => {
    getThreadForUser();
  }, [jwt])


  const toggleVisibility = async (newIsPublic: boolean, threadId: string) => {
    try {
     setIsPublic(newIsPublic);
    await UpdateThreadVisibility({ isPublic: newIsPublic, threadId, jwt });
     await getThreadForUser();
    } catch (error) {
    console.error('Failed to update thread visibility:', error);
    }
  };

  const getThreadForUser = async () => {
    try {
      if (!jwt || !session?.data?.user?.id) return;
      
      const fetchedThreads = await getThreads({
        jwt,
        userId: session?.data?.user.id
      });
      
      if (fetchedThreads) {
        setThreads(fetchedThreads);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };


  const isSameUser = (thread: Thread) => {
    if (!session?.data?.user?.id) return false;
    return thread.userId === session?.data?.user?.id;
  };


  const initiateDeleteThread = async (threadId: string) => {
    try {
      if (!session?.data?.user?.id || !jwt) {
           toast.error('User session not found. Please log in again.');
          return;   
      };
      await deleteThread({
        threadId,
        jwt,
        userId: session?.data?.user.id
      });
      await getThreadForUser();
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  }
  const LoadUnapprovedThreads = async () => {
    try {
      const unapprovedThreads = await getUnapprovedThreads();
      setThreads(unapprovedThreads);
    } catch (error) {
      console.error('Error fetching unapproved threads:', error);
    }
  }

  const  handleToggleAdminMode =  async() => {
    if(!isAdminMode){
      await LoadUnapprovedThreads();
    }else{
      await getThreadForUser();
    }
    
    setIsAdminMode(!isAdminMode);
  }

  const adminApproveThread = async (threadId: string) => {
    try {
        if (!session || !jwt) {
           toast.error('User session not found. Please log in again.');
           return;
        }
      await approveThread({
        threadId,
        jwt
      })
      toast.success('Thread approved successfully.')
      await  LoadUnapprovedThreads();
    } catch (error) {
      console.error('Error approving thread:', error)
      toast.error('Failed to approve thread. Please try again.')
    }
  }


  
  

  return (
    <ThreadVisibilityContext.Provider 
        value={{ 
          isPublic,
          toggleVisibility,  
          threads,
          isSameUser,
          initiateDeleteThread,
          handleToggleAdminMode,
          adminApproveThread,
          isAdminMode
          }}>
      {children}
    </ThreadVisibilityContext.Provider>
  );
}