import type { Thread } from "mb-genql"

export function searchThreadContent(thread: Thread, searchTerm: string): boolean {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
  
    return thread.messages?.some(message => {
      if (!message?.content) return false
      return message.content.toLowerCase().includes(searchLower)
    }) ?? false
  }