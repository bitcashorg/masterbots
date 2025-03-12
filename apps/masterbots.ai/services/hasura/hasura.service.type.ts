import type { MessageInsertInput } from 'mb-genql'

export type GetHasuraClientParams = {
  jwt?: string
  adminSecret?: string
  signal?: AbortController['signal']
}

export interface HasuraServiceParams {
  jwt: string
}

export interface GetThreadsParams extends HasuraServiceParams {
  chatbotName?: string
  userId?: string
  categoryId?: number | null
  domain?: string | null
  keyword?: string
  limit?: number
  offset?: number
}

export interface GetThreadParams extends HasuraServiceParams {
  domain: string
  threadSlug: string | null
  threadId?: string | null
  threadQuestionSlug?: string | null
  signal?: AbortController['signal']
}

export interface SaveNewMessageParams extends HasuraServiceParams, Partial<MessageInsertInput> {}

// this can only be called by admin
export interface UpsertUserParams {
  email: string
  profilePicture: string
  username: string
  password: string
  adminSecret: string
}

export interface CreateThreadParams extends HasuraServiceParams {
  chatbotId: number
  threadId: string
  slug: string
  userId: string
  isPublic?: boolean
  parentThreadId?: string
}

export interface GetChatbotParams extends HasuraServiceParams {
  chatbotId?: number
  chatbotName?: string
  threads?: boolean
}

export interface GetBrowseThreadsParams {
  categoryId?: number | null
  categoriesId?: number[] | null
  keyword?: string
  userId?: string
  chatbotName?: string
  chatbotsId?: number[]
  slug?: string | null
  limit?: number
  offset?: number
  followedUserId?: string
}

export interface GetChatbotsParams {
  limit?: number
  offset?: number
  categoryId?: number | null
}

export interface GetMessagesParams extends GetHasuraClientParams {
  threadId: string
  limit?: number
  offset?: number
}
export interface UpdateUserArgs {
  pkColumns: { userId: string | undefined }
  _set?: {
    bio?: string
    favouriteTopic?: string
  }
}
