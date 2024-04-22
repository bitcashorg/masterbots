'use server'

import { createSupabaseServerClient } from '@/services/supabase'
import { Dub } from 'dub'

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

  let supaQuery = supabase.from('thread').select(
    `
      *,
      message (
        * order(created_at desc)
      )
    `
  )

  if (query) {
    supaQuery = supaQuery
      .filter('message.role', 'neq', 'system')
      .textSearch('message.content', query.toString())
  }

  const { data, error } = await supaQuery

  return error ? null : data
}
