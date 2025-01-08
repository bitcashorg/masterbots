import { UUID } from "crypto"
import { endpoints } from "mb-env"

export async function getThreadForOG(threadId: UUID) {
    const env = process.env.NEXT_PUBLIC_APP_ENV  as 'prod' | 'test' | 'local'
    const endpoint = endpoints[env]
  
    if (!endpoint) {
      throw new Error(`No endpoint found for env: ${env}`)
    }
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_LOCAL_ADMIN_SECRET as string,
        },
        body: JSON.stringify({
          query: `
            query GetThread($threadId: uuid!) {
              thread(where: {threadId: {_eq: $threadId}}) {
                threadId
                createdAt
                updatedAt
                chatbot {
                  chatbotId
                  name
                  avatar
                  description
                  categories {
                    categoryId
                    category {
                      categoryId
                      name
                    }
                  }
                  threads {
                    threadId
                  }
                  prompts {
                    promptId
                    prompt {
                      promptId
                      content
                    }
                  }
                }
                user {
                  userId
                  username
                  profilePicture
                  email
                }
                messages {
                  messageId
                  content
                  role
                  threadId
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
      console.error('Fetch error:', {
        message: error.message,
        endpoint,
        env
      })
      throw error
    }
  }
  