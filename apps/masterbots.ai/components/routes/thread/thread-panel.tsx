"use client"
import UserThreadPanel from '@/components/routes/thread/user-thread-panel'
import { Thread } from 'mb-genql'

export default  function ThreadPanel({
  chatbot,
  threads=[]
}: {
  chatbot?: string
  threads: Thread[]
  search?: { [key: string]: string | string[] | undefined }
}) {
  return <UserThreadPanel chatbot={chatbot}  threads={threads} />
}
