import { useState } from 'react';
import { UpdateThreadVisibility } from '@/services/hasura';
import { useSession } from 'next-auth/react';

export function useThreadVisibility(threadId: string) {
  const [isPublic, setIsPublic] = useState(false);
  const session = useSession();
  const jwt = session?.data?.user?.hasuraJwt;

  const toggleVisibility = async (newIsPublic: boolean) => {
    setIsPublic(newIsPublic);
    try {
    await UpdateThreadVisibility({ isPublic: !newIsPublic, threadId, jwt });
    } catch (error) {
    setIsPublic(newIsPublic);
    console.error('Failed to update thread visibility:', error);
    }
  };

  return { isPublic, toggleVisibility };
}