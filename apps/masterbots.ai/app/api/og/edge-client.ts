import { UUID } from "crypto"
import { endpoints } from "mb-env"

export async function getThreadForOG(threadId: UUID) {
 
   const env = process.env.NEXT_PUBLIC_APP_ENV
   if (!env || !['prod', 'test', 'local'].includes(env)) {
     throw new Error('Invalid environment configuration')
   }
   const endpoint = endpoints[env as 'prod' | 'test' | 'local']
   if (!endpoint) {
     throw new Error('API endpoint not configured')
   }
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetThread($threadId: uuid!) {
              thread(where: {threadId: {_eq: $threadId}}) {
                chatbot {
                  name
                  avatar
                  categories {
                    category {
                      name
                    }
                  }
                }
                user {
                  username
                  profilePicture
                }
                messages {
                  content
                  role
                }
              }
            }
          `,
          variables: { threadId }
        })
      })
      const data = await response.json()
      if (data.errors) {
        throw new Error(data.errors[0].message)
      }
      return data.data
    } catch (error: any) {
      throw new Error('Unknown error occurred while fetching thread')
    }
  }
  