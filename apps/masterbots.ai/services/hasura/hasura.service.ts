import type { ChatbotMetadataHeaders } from '@/types/types'
import { validateMbEnv } from 'mb-env'
import {
  type Category,
  type Chatbot,
  type LabelChatbotCategory,
  type Message,
  type Thread,
  type User,
  createMbClient,
  everything
} from 'mb-genql'
import type {
  CreateThreadParams,
  GetBrowseThreadsParams,
  GetChatbotParams,
  GetChatbotsParams,
  GetHasuraClientParams,
  GetMessagesParams,
  GetThreadParams,
  GetThreadsParams,
  SaveNewMessageParams,
  UpsertUserParams
} from './hasura.service.type'

function getHasuraClient({ jwt, adminSecret }: GetHasuraClientParams) {
  return createMbClient({
    jwt,
    adminSecret,
    debug: process.env.DEBUG === 'true',
    env: validateMbEnv(process.env.NEXT_PUBLIC_APP_ENV)
  })
}

export async function getCategories() {
  const client = getHasuraClient({})
  const { category } = await client.query({
    category: {
      chatbots: {
        chatbot: {
          ...everything
        },
        ...everything
      },
      ...everything,
      __args: {
        limit: 20
      }
    }
  })

  return category as Category[]
}

export async function getCategory({ categoryId }: { categoryId: number }) {
  const client = getHasuraClient({})
  const { category } = await client.query({
    category: {
      __args: {
        where: { categoryId: { _eq: categoryId } }
      },
      name: true,
      categoryId: true
    }
  })

  return category[0] as Category
}

export async function getChatbots({
  limit,
  offset,
  categoryId
}: GetChatbotsParams) {
  const client = getHasuraClient({})
  const { chatbot } = await client.query({
    chatbot: {
      threads: {
        threadId: true
      },
      categories: {
        categoryId: true
      },
      ...everything,
      __args: {
        limit: limit ? limit : 20,
        ...(offset
          ? {
              offset
            }
          : {}),
        ...(categoryId
          ? {
              where: {
                categories: {
                  categoryId: {
                    _eq: categoryId
                  }
                }
              }
            }
          : {})
      }
    }
  })

  return chatbot as Chatbot[]
}

export async function getThreads({
  chatbotName,
  jwt,
  userId,
  limit,
  offset,
  categoryId
}: GetThreadsParams) {
  const client = getHasuraClient({ jwt })

  const { thread } = await client.query({
    thread: {
      chatbot: {
        ...everything,
        categories: {
          category: {
            ...everything
          },
          ...everything
        },
        threads: {
          threadId: true
        },
        prompts: {
          prompt: everything
        }
      },
      messages: {
        ...everything,
        __args: {
          orderBy: [{ createdAt: 'ASC' }],
          limit: 2
        }
      },
      ...everything,
      __args: {
        orderBy: [{ createdAt: 'DESC' }],
        limit: limit ? limit : 20,
        ...(offset
          ? {
              offset
            }
          : {}),
        ...(chatbotName || categoryId
          ? {
              where: {
                chatbot: {
                  ...(chatbotName
                    ? {
                        name: { _eq: chatbotName }
                      }
                    : {}),
                  ...(categoryId
                    ? { categories: { categoryId: { _eq: categoryId } } }
                    : {})
                },
                ...(userId ? { userId: { _eq: userId } } : {})
              }
            }
          : userId
            ? { where: { userId: { _eq: userId } } }
            : {})
      }
    }
  })

  return thread as Thread[]
}

export async function getThread({ threadId, jwt }: GetThreadParams) {
  let client = getHasuraClient({})
  if (jwt) client = getHasuraClient({ jwt })
  const { thread } = await client.query({
    thread: {
      chatbot: {
        ...everything,
        categories: {
          category: {
            ...everything
          },
          ...everything
        },
        threads: {
          threadId: true
        },
        prompts: {
          prompt: everything
        }
      },
      user: {
        username: true,
        profilePicture: true
      },
      messages: {
        ...everything,
        __args: {
          orderBy: [{ createdAt: 'ASC' }]
        }
      },
      ...everything,
      __args: {
        where: { threadId: { _eq: threadId } }
      }
    }
  })

  return thread[0] as Thread
}

export async function saveNewMessage({ jwt, ...object }: SaveNewMessageParams) {
  const client = getHasuraClient({ jwt })
  await client.mutation({
    insertMessageOne: {
      __args: {
        object
      },
      ...everything
    }
  })
}

export async function upsertUser({
  adminSecret,
  username,
  ...object
}: UpsertUserParams) {
  const client = getHasuraClient({ adminSecret })

  // Generate base slug from the user's name
  const baseSlug = username.toLowerCase().replace(/\s+/g, '_')

  // Check if the base slug conflicts with existing slugs
  let slugCount = 0
  let slug = baseSlug
  while (true) {
    const { user } = await client.query({
      user: {
        __args: {
          where: { slug: { _eq: slug } }
        },
        slug: true,
        email: true
      }
    })
    if (!user?.length || user[0]?.email === object.email) {
      // Found a unique slug
      break
    }
    // Slug conflicts, append a number to make it unique
    slugCount++
    slug = `${baseSlug}${slugCount > 0 ? slugCount : ''}`
  }
  const { insertUserOne } = await client.mutation({
    insertUserOne: {
      __args: {
        object: {
          username,
          slug,
          ...object
        },
        onConflict: {
          constraint: 'user_email_key',
          updateColumns: ['profilePicture']
        }
      },
      ...everything
    }
  })

  return insertUserOne as User
}

export async function createThread({
  chatbotId,
  threadId,
  jwt,
  userId,
  isPublic = true
}: CreateThreadParams) {
  // console.log('CREATING THREAD ...', { chatbotId, threadId, jwt, userId })
  const client = getHasuraClient({ jwt })
  const { insertThreadOne } = await client.mutation({
    insertThreadOne: {
      __args: {
        object: { threadId, chatbotId, userId, isPublic }
      },
      threadId: true
    }
  })
  // console.log('THREAD CREATED', insertThreadOne?.threadId)
  return insertThreadOne?.threadId
}

export async function getChatbot({
  chatbotId,
  chatbotName,
  threads,
  jwt
}: GetChatbotParams) {
  if (!chatbotId && !chatbotName)
    throw new Error('You need to pass chatbotId or chatbotName')
  let client = getHasuraClient({})
  if (jwt) client = getHasuraClient({ jwt })
  const { chatbot } = await client.query({
    chatbot: {
      __args: {
        where: { name: { _eq: chatbotName } }
      },
      ...everything,
      categories: {
        category: {
          ...everything
        },
        ...everything
      },
      prompts: {
        prompt: everything
      },
      ...(threads
        ? {
            threads: {
              ...everything,
              messages: {
                ...everything,
                __args: {
                  orderBy: [{ createdAt: 'ASC' }]
                }
              }
            }
          }
        : {})
    }
  })

  return chatbot[0] as Chatbot
}

export async function getBrowseThreads({
  categoryId,
  categoriesId,
  keyword,
  chatbotName,
  chatbotsId,
  userId,
  limit,
  offset,
  slug
}: GetBrowseThreadsParams) {
  const client = getHasuraClient({})

  const { thread } = await client.query({
    thread: {
      __args: {
        orderBy: [{ createdAt: 'DESC' }],
        where: {
          ...(categoryId
            ? {
                chatbot: {
                  categories: {
                    categoryId: { _eq: categoryId }
                  }
                }
              }
            : {}),
          ...(categoriesId
            ? {
                chatbot: {
                  categories: {
                    categoryId: { _in: categoriesId }
                  }
                }
              }
            : {}),
          ...(chatbotName
            ? {
                chatbot: {
                  name: { _eq: chatbotName }
                }
              }
            : {}),
          ...(chatbotsId
            ? {
                chatbot: {
                  chatbotId: { _in: chatbotsId }
                }
              }
            : {}),
          ...(userId
            ? {
                userId: {
                  _eq: userId
                }
              }
            : {}),
          ...(slug
            ? {
                user: {
                  slug: {
                    _eq: slug
                  }
                }
              }
            : {}),
          isPublic: { _eq: true },
          isApproved: { _eq: true }
        },
        limit: limit || 30,
        offset: offset || 0
      },
      chatbot: {
        categories: {
          category: {
            ...everything
          },
          ...everything
        },
        threads: {
          threadId: true
        },
        ...everything
      },
      messages: {
        ...everything,
        __args: {
          orderBy: [{ createdAt: 'ASC' }],
          ...(keyword
            ? {
                where: {
                  _or: [
                    {
                      content: {
                        _iregex: keyword
                      }
                    },
                    {
                      content: {
                        _eq: keyword
                      }
                    }
                  ]
                }
              }
            : ''),
          limit: 2
        }
      },
      user: {
        username: true,
        profilePicture: true,
        slug: true
      },
      ...everything
    }
  })

  return thread as Thread[]
}

export async function getMessages({
  threadId,
  limit,
  offset,
  jwt
}: GetMessagesParams) {
  let client = getHasuraClient({})
  if (jwt) client = getHasuraClient({ jwt })
  const { message } = await client.query({
    message: {
      ...everything,
      __args: {
        where: { threadId: { _eq: threadId } },
        orderBy: [{ createdAt: 'ASC' }],
        ...(limit
          ? {
              limit
            }
          : {}),
        ...(offset
          ? {
              offset
            }
          : {})
      }
    }
  })
  return message as Message[]
}

export async function getChatbotsCount({
  categoryId,
  jwt
}: GetChatbotsParams & { jwt: string }) {
  const client = getHasuraClient({ jwt })
  const { chatbotAggregate } = await client.query({
    chatbotAggregate: {
      aggregate: {
        count: true
      },
      __args: {
        ...(categoryId
          ? {
              where: {
                categories: {
                  categoryId: {
                    _eq: categoryId
                  }
                }
              }
            }
          : {})
      }
    }
  })
  return chatbotAggregate.aggregate?.count
    ? chatbotAggregate.aggregate.count
    : 0
}

export async function getUserInfoFromBrowse(slug: string) {
  const client = getHasuraClient({})
  const { user } = await client.query({
    user: {
      username: true,
      profilePicture: true,
      __args: {
        where: {
          slug: {
            _eq: slug
          }
        }
      }
    }
  })
  return user[0]
}

export async function getThreadsWithoutJWT() {
  const client = getHasuraClient({})
  const { thread } = await client.query({
    thread: {
      chatbot: {
        ...everything
      },
      categories: {
        category: {
          ...everything
        },
        ...everything
      },
      ...everything,
      __args: {
        orderBy: [{ createdAt: 'DESC' }]
      }
    }
  })

  return thread as Thread[]
}

export async function getUsers() {
  const client = getHasuraClient({})
  const { user } = await client.query({
    user: {
      slug: true
    }
  })
  return user as User[]
}

export async function UpdateThreadVisibility({
  threadId,
  isPublic,
  jwt
}: {
  threadId: string
  isPublic: boolean
  jwt: string | undefined
}): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getHasuraClient({ jwt })
    await client.mutation({
      updateThreadByPk: {
        __args: {
          pkColumns: { threadId },
          _set: { isPublic }
        },
        threadId: true,
        isPublic: true
      }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export type ReturnFetchChatbotMetadata = Pick<
  LabelChatbotCategory['label'],
  'questions' | 'categories' | 'subCategories' | 'tags'
> | null

export async function fetchChatbotMetadata({
  chatbot,
  domain
}: ChatbotMetadataHeaders): Promise<ReturnFetchChatbotMetadata> {
  try {
    const client = getHasuraClient({})
    const { labelChatbotCategory: chatbotMetadata } = await client.query({
      labelChatbotCategory: {
        __args: {
          where: {
            chatbotId: { _eq: chatbot },
            domainId: { _eq: domain }
          }
        },
        label: {
          questions: true,
          categories: true,
          subCategories: true,
          tags: true
        }
      }
    })

    return chatbotMetadata[0].label as LabelChatbotCategory['label']
  } catch (error) {
    console.error('Error fetching chatbot metadata:', error)
    return null
  }
}
