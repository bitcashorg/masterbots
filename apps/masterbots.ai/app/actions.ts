'use server'

import { createSupabaseServerClient } from '@/services/supabase'
import { getErrorMessage } from '@repo/mb-lib'
import { Dub } from 'dub'
import { objectToCamel } from 'ts-case-convert'

const dub = new Dub({
  projectSlug: 'bitcash'
})

export async function shorten(_prevState: any, formData: any) {
  try {
    const url = formData.get('url')
    // Validate form data
    if (!url || typeof url !== 'string') {
      return {
        shortLink: 'Invalid URL'
      }
    }

    const resp = await dub.links.create({
      url,
      domain: 'mbots.to'
    })

    console.log('🤌🏻 dub response', resp)
    return {
      shortLink: ''
    }
  } catch (error) {
    console.log('ERROR', error)

    return {
      shortLink: 'Invalid data provided'
    }
  }
}

/*
 The base query is set up to fetch all threads and all associated messages, ordered by creation time.
 When a search query is provided, a modified select statement is used which applies a filter to exclude messages 
 with a role of 'system' only during the search. This way, the search will ignore 'system' messages but the
 final output for threads that match other criteria will include all messages.
 Conditional Query Construction: The filter and text search are only applied if there's a non-empty searchQuery.
 This ensures that all messages, including those with a 'system' role, are returned if there is no search criterion.
*/
export async function getThreads(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const query = formData.get('query')

  const threadsQuery = supabase
    .from('thread')
    .select(
      `
      *,
      message (
        * 
      )
    `
    )
    .range(0, 20)
  const { data, error } = await threadsQuery
  if (error) throw new Error(getErrorMessage(error))

  // Filter to get the first assistant and user message
  const filteredData = objectToCamel(data).map(thread => {
    const firstAssistantMessage = thread.message.find(
      msg => msg.role === 'assistant'
    )
    const firstUserMessage = thread.message.find(msg => msg.role === 'user')
    return {
      ...thread,
      // new props in response for easier reference
      firstUserMessage,
      firstAssistantMessage,
      // for backward campat with current code
      message: [firstUserMessage, firstAssistantMessage].filter(Boolean), // Removes undefined entries
      messageCount: thread.message.length
    }
  })

  return error ? null : filteredData
}

// if (query) {
//   supaQuery = supaQuery
//     .filter('message.role', 'neq', 'system')
//     .textSearch('message.content', query.toString())
// }
