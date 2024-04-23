'use server'
import { createSupabaseServerClient } from '@/services/supabase'
import { getErrorMessage } from '@repo/mb-lib'
import { Dub } from 'dub'
import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import type * as AI from 'ai'
import { omit } from 'lodash'
import { getFirstMessages } from '@/lib/threads'

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

const threadFilter = `
  *,
  message (id,content,role,created_at),
  chatbot (chatbot_id,name,avatar,promtps(*)),
  category (*),
  user (user_id,username,avatar)
`

export async function getThreads({ query }: { query?: string }) {
  const supabase = await createSupabaseServerClient()

  // important to select only the data you need
  const threadsQuery = supabase.from('thread').select(threadFilter).range(0, 20)
  const { data, error } = await threadsQuery
  if (error) throw new Error(getErrorMessage(error))

  // Filter to get the first assistant and user message
  const filteredData = objectToCamel(data).map(thread => {
    return {
      // we only return question and frist answer on collection queries
      // full list of messages are queries when viewing individual threads only
      ...omit(thread, 'message'),
      ...getFirstMessages(thread.message),
      messageCount: thread.message.length
    }
  })

  return error ? null : filteredData
}

// NOTE: for now we prefer inference, but we can also enforce the return types
//      there's a reliability argument for it
export type FilteredThreads = Awaited<ReturnType<typeof getThreads>>
export type FilteredThread = Awaited<ReturnType<typeof getThreads>>[0]

// if (query) {
//   supaQuery = supaQuery
//     .filter('message.role', 'neq', 'system')
//     .textSearch('message.content', query.toString())
// }

export async function getMessagePairs(threadId: string) {
  console.log('get message pairs for', threadId)
  return [] as MB.MessagePair[]
}

export async function getThread({
  threadId
}: {
  threadId: string
}): Promise<FilteredThread> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('thread').select(threadFilter)
  if (error) return null

  return objectToCamel(data) as unknown as FilteredThread
}
