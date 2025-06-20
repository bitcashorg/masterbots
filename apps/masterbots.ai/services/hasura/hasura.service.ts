import type {
	ChatbotMetadata,
	ChatbotMetadataClassification,
	ChatbotMetadataHeaders,
	ExampleMetadata,
	ReturnFetchChatbotMetadata,
} from '@/types/types'
import { validateMbEnv } from 'mb-env'
import {
	type Category,
	type Chatbot,
	type MbClient,
	type Message,
	type OrderBy,
	type PreferenceInsertInput,
	type PreferenceSetInput,
	type Thread,
	type User,
	createMbClient,
	everything,
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
	UpdateUserArgs,
	UpsertUserParams,
} from './hasura.service.type'

const chatbotEnumFieldsFragment = {
	complexityEnum: {
		prompt: true,
	},
	toneEnum: {
		prompt: true,
	},
	lengthEnum: {
		prompt: true,
	},
	typeEnum: {
		prompt: true,
	},
}

function getHasuraClient({ jwt, adminSecret, signal }: GetHasuraClientParams) {
	return createMbClient({
		config: {
			signal,
		},
		jwt,
		adminSecret,
		debug: process.env.DEBUG === 'true',
		env: validateMbEnv(process.env.NEXT_PUBLIC_APP_ENV),
	})
}

export async function getCategories(userId?: string) {
	const client = getHasuraClient({})
	const { category } = await client.query({
		category: {
			chatbots: {
				chatbot: {
					followers: {
						followeeId: true,
						followerId: true,
						followeeIdChatbot: true,
					},
					categories: {
						__scalar: true,
						category: {
							name: true,
						},
					},
					prompts: {
						prompt: {
							__scalar: true,
						},
					},
					metadata: {
						domainName: true,
					},
					__scalar: true,
					...chatbotEnumFieldsFragment,
				},
				__scalar: true,
				__args: {
					where: {
						_and: [
							userId
								? {
										chatbot: {
											threads: {
												userId: { _eq: userId },
												isPublic: { _eq: true },
												isApproved: { _eq: true },
											},
										},
									}
								: {},
						],
					},
				},
			},
			__scalar: true,
			__args: {
				where: {
					_and: [
						userId
							? {
									chatbots: {
										chatbot: {
											threads: {
												userId: { _eq: userId },
												isPublic: { _eq: true },
												isApproved: { _eq: true },
											},
										},
									},
								}
							: {},
					],
				},
			},
		},
	})

	return category as Category[]
}

export async function getCategory({
	categoryId,
	chatbotName,
}: {
	categoryId?: number
	chatbotName?: string
}) {
	const client = getHasuraClient({})
	const { category } = await client.query({
		category: {
			__args: {
				where: {
					...(categoryId ? { categoryId: { _eq: categoryId } } : {}),
					...(chatbotName
						? { chatbots: { chatbot: { name: { _eq: chatbotName } } } }
						: {}),
				},
			},
			name: true,
			categoryId: true,
		},
	})

	return category[0] as Category
}

export async function getAllChatbots() {
	const client = getHasuraClient({})
	const { chatbot } = await client.query({
		chatbot: {
			name: true,
			metadata: {
				domainName: true,
			},
		},
	})

	return chatbot as Chatbot[]
}

export async function getChatbots({
	limit,
	offset,
	categoryId,
}: GetChatbotsParams) {
	const client = getHasuraClient({})
	const { chatbot } = await client.query({
		chatbot: {
			threads: {
				threadId: true,
			},
			categories: {
				categoryId: true,
				category: {
					name: true,
				},
			},
			metadata: {
				domainName: true,
			},
			__scalar: true,
			__args: {
				limit: limit ? limit : 20,
				...(offset
					? {
							offset,
						}
					: {}),
				...(categoryId
					? {
							where: {
								categories: {
									categoryId: {
										_eq: categoryId,
									},
								},
							},
						}
					: {}),
			},
		},
	})

	return chatbot as Chatbot[]
}

export async function getThreads({
	chatbotName,
	categoryId,
	userId,
	domain,
	jwt,
	limit,
	offset,
}: GetThreadsParams) {
	const client = getHasuraClient({ jwt })
	const baseThreadsArguments = {
		...(chatbotName || categoryId
			? {
					where: {
						chatbot: {
							...(chatbotName
								? {
										name: { _eq: chatbotName },
									}
								: {}),
							...(categoryId
								? { categories: { categoryId: { _eq: categoryId } } }
								: {}),
							...(domain
								? {
										metadata: {
											domainName: {
												_ilike: `%${domain.replace(/-/g, ' ')}%`,
											},
										},
									}
								: {}),
						},
						...(userId ? { userId: { _eq: userId } } : {}),
					},
				}
			: userId
				? { where: { userId: { _eq: userId } } }
				: {}),
	}

	const { thread, threadAggregate } = await client.query({
		thread: {
			chatbot: {
				categories: {
					category: {
						__scalar: true,
					},
					__scalar: true,
				},
				threads: {
					threadId: true,
				},
				prompts: {
					prompt: everything,
				},
				__scalar: true,
			},
			messages: {
				__scalar: true,
				__args: {
					orderBy: [{ createdAt: 'ASC' }],
					limit: 2,
				},
			},
			user: {
				username: true,
				profilePicture: true,
				slug: true,
				followers: {
					followerId: true,
					followeeIdChatbot: true,
				},
			},
			thread: {
				threadId: true,
				user: {
					username: true,
					profilePicture: true,
					slug: true,
				},
				messages: {
					__scalar: true,
					__args: {
						orderBy: [{ createdAt: 'ASC' }],
						limit: 2,
					},
				},
			},
			isApproved: true,
			isPublic: true,
			__scalar: true,
			__args: {
				orderBy: [{ updatedAt: 'DESC' }],
				limit: limit ? limit : 20,
				...(offset
					? {
							offset,
						}
					: {}),
				...baseThreadsArguments,
			},
		},
		threadAggregate: {
			aggregate: {
				count: true,
			},
			__args: baseThreadsArguments,
		},
	})

	return {
		threads: thread as Thread[],
		count: threadAggregate.aggregate?.count || 0,
	}
}

export async function getThread({
	threadId,
	threadSlug,
	threadQuestionSlug,
	domain,
	isSEO = false,
	isPersonal = false,
	jwt,
	signal,
}: Partial<GetThreadParams>) {
	try {
		const client = getHasuraClient({ signal, jwt: jwt || undefined })
		const { thread: threadResponse } = await client.query({
			thread: {
				chatbot: {
					__scalar: true,
					categories: {
						category: {
							__scalar: true,
						},
						__scalar: true,
					},
					threads: {
						slug: true,
					},
					prompts: {
						prompt: {
							__scalar: true,
						},
					},
					followers: {
						followerId: true,
						followeeIdChatbot: true,
					},
					metadata: {
						domainName: true,
					},
					...chatbotEnumFieldsFragment,
				},
				user: {
					username: true,
					profilePicture: true,
					slug: true,
				},
				thread: {
					messages: {
						__args: {
							orderBy: [{ createdAt: 'ASC' }],
						},
						__scalar: true,
					},
					slug: true,
					user: {
						username: true,
						profilePicture: true,
						slug: true,
					},
				},
				messages: {
					__scalar: true,
					__args: {
						orderBy: [{ createdAt: 'ASC' }],
					},
				},
				__scalar: true,
				__args: {
					where: {
						...(threadId ? { threadId: { _eq: threadId } } : {}),
						...(threadSlug ? { slug: { _eq: threadSlug } } : {}),
						...(domain
							? {
									chatbot: {
										metadata: {
											domainName: {
												_ilike: `%${domain.replace(/-/g, ' ')}%`,
											},
										},
									},
								}
							: {}),
						...(threadQuestionSlug
							? { messages: { slug: { _eq: threadQuestionSlug } } }
							: {}),
						...(!isPersonal &&
							!isSEO && {
								isPublic: { _eq: true },
								isApproved: { _eq: true },
							}),
					},
				},
			},
		})

		const thread = threadResponse[0] as Thread
		// console.log('You got the thread updated! --> ', thread)
		return thread
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			console.error('ℹ️ Request was aborted: ', error)
		} else {
			console.error('Error fetching thread: ', error)
		}

		return null
	}
}

export async function updateThreadShortLink({
	slug,
	shortLink,
}: Partial<CreateThreadParams>) {
	const client = getHasuraClient({})
	const { updateThread } = await client.mutation({
		updateThread: {
			__args: {
				where: { slug: { _eq: slug } },
				_set: {
					shortLink,
				},
			},
			returning: {
				slug: true,
				shortLink: true,
			},
			affectedRows: true,
		},
	})

	if (!updateThread) {
		throw new Error('Failed to update thread')
	}

	return updateThread.returning[0] as Thread
}

export async function updateMessageShortLink({
	slug,
	shortLink,
}: {
	slug: string
	shortLink: string
}) {
	const client = getHasuraClient({})
	const { updateMessage } = await client.mutation({
		updateMessage: {
			__args: {
				where: { slug: { _eq: slug } },
				_set: {
					shortLink,
				},
			},
			returning: {
				messageId: true,
				shortLink: true,
			},
			affectedRows: true,
		},
	})

	if (!updateMessage) {
		throw new Error('Failed to update message')
	}

	return updateMessage.returning[0] as Message
}

export async function saveNewMessage({
	jwt,
	...object
}: Partial<SaveNewMessageParams>) {
	const client = getHasuraClient({ jwt })
	try {
		const { insertMessageOne: newMessage } = await client.mutation({
			insertMessageOne: {
				__args: {
					object,
				},
				__scalar: true,
			},
		})

		return newMessage as Message
	} catch (error) {
		console.error('Error saving new message:', error)
		throw new Error('Failed to save new message.')
	}
}

/**
 * Updates a message's content by messageId
 * @param params - The parameters for updating the message
 * @returns A promise that resolves to a success status and optional error message
 */
export async function updateMessage({
	messageId,
	content,
	thinking,
	jwt,
}: {
	messageId: string
	content: string
	thinking?: string
	jwt?: string
}): Promise<{ success: boolean; error?: string }> {
	try {
		if (!jwt) {
			throw new Error('Authentication required for message update')
		}

		const client = getHasuraClient({ jwt })
		const updateData: Record<'content' | 'thinking', string | undefined> = {
			content,
			thinking,
		}

		await client.mutation({
			updateMessage: {
				__args: {
					where: { messageId: { _eq: messageId } },
					_set: updateData,
				},
				returning: {
					messageId: true,
					content: true,
					thinking: true,
				},
			},
		})

		return { success: true }
	} catch (error) {
		console.error('Error updating message:', error)
		return { success: false, error: (error as Error).message }
	}
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
					where: { slug: { _eq: slug } },
				},
				slug: true,
				email: true,
			},
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
					...object,
				},
				onConflict: {
					constraint: 'user_email_key',
					updateColumns: ['profilePicture'],
				},
			},
			...everything,
		},
	})

	return insertUserOne as User
}

export async function createThread({
	chatbotId,
	threadId,
	model,
	slug,
	jwt,
	userId,
	parentThreadId,
	isPublic = false,
}: Partial<CreateThreadParams>) {
	const client = getHasuraClient({ jwt })
	const { insertThreadOne } = await client.mutation({
		insertThreadOne: {
			__args: {
				// TODO: Uncomment the model when FE model is done. BE is ready.
				object: {
					threadId,
					chatbotId,
					isPublic,
					parentThreadId,
					slug,
					model,
				},
			},
			threadId: true,
			slug: true,
		},
	})
	return {
		threadId: insertThreadOne?.threadId,
		slug: insertThreadOne?.slug,
	}
}

export async function getChatbot({
	chatbotId,
	chatbotName,
	threads,
	jwt,
}: GetChatbotParams) {
	if (!chatbotId && !chatbotName)
		throw new Error('You need to pass chatbotId or chatbotName')
	let client = getHasuraClient({})
	if (jwt) client = getHasuraClient({ jwt })
	const { chatbot } = await client.query({
		chatbot: {
			__args: {
				where: { name: { _eq: chatbotName } },
			},
			__scalar: true,
			followers: {
				followerId: true,
				followeeIdChatbot: true,
			},
			categories: {
				category: {
					__scalar: true,
				},
				__scalar: true,
			},
			prompts: {
				prompt: {
					__scalar: true,
				},
				__args: {
					orderBy: [{ promptId: 'DESC' }],
				},
			},
			...chatbotEnumFieldsFragment,
			...(threads
				? {
						threads: {
							__scalar: true,
							messages: {
								__scalar: true,
								__args: {
									orderBy: [{ createdAt: 'ASC' }],
								},
							},
						},
					}
				: {}),
		},
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
	slug,
	isAdminMode = false,
	followedUserId,
}: GetBrowseThreadsParams) {
	const client = getHasuraClient({})
	const baseLimit = limit || 20
	const baseWhereConditions = {
		...(categoryId
			? {
					chatbot: {
						categories: {
							categoryId: { _eq: categoryId },
						},
					},
				}
			: {}),
		...(categoriesId
			? {
					chatbot: {
						categories: {
							categoryId: { _in: categoriesId },
						},
					},
				}
			: {}),
		...(chatbotName
			? {
					chatbot: {
						name: { _eq: chatbotName },
					},
				}
			: {}),
		...(chatbotsId
			? {
					chatbot: {
						chatbotId: { _in: chatbotsId },
					},
				}
			: {}),
		...(userId
			? {
					userId: {
						_eq: userId,
					},
				}
			: {}),
		...(slug
			? {
					user: {
						slug: {
							_eq: slug,
						},
					},
				}
			: {}),
		isPublic: { _eq: true },
		isApproved: { _eq: !isAdminMode },
	}

	const { thread: allThreads, threadAggregate } = await client.query({
		thread: {
			chatbot: {
				chatbotId: true,
				name: true,
				categories: {
					category: {
						__scalar: true,
					},
					__scalar: true,
				},
				followers: {
					followerId: true,
				},
				threads: {
					threadId: true,
				},
				metadata: {
					domainName: true,
				},
				__scalar: true,
			},
			messages: {
				messageId: true,
				content: true,
				createdAt: true,
				role: true,
				__args: {
					orderBy: [{ createdAt: 'ASC' }],
					...(keyword
						? {
								where: {
									_or: [
										{ content: { _iregex: keyword } },
										{ content: { _eq: keyword } },
									],
								},
							}
						: ''),
					limit: 2,
				},
			},
			user: {
				username: true,
				profilePicture: true,
				slug: true,
				followers: {
					followerId: true,
				},
			},
			thread: {
				__scalar: true,
				user: {
					username: true,
					profilePicture: true,
					slug: true,
				},
				messages: {
					__scalar: true,
					__args: {
						limit: 2,
					},
				},
			},
			isApproved: true,
			isPublic: true,
			__scalar: true,
			__args: {
				orderBy: [{ updatedAt: 'DESC' }],
				where: baseWhereConditions,
				limit: baseLimit,
				offset: offset || 0,
			},
		},
		threadAggregate: {
			aggregate: {
				count: true,
			},
			__args: {
				where: baseWhereConditions,
			},
		},
	})

	if (!allThreads) return { threads: [], count: 0 }

	const threads = allThreads as Thread[]

	// Separate following content (both from followed bots and users)
	const followingThreads = threads.filter((thread) => {
		if (followedUserId) {
			// Exclude user's own posts
			if (thread.userId === followedUserId) {
				return false
			}

			// For bot content
			const isFollowingBot = thread.chatbot?.followers?.some((follower) => {
				return follower.followerId === followedUserId
			})

			// For user content
			const isFollowingUser = thread.user?.followers?.some((follower) => {
				return follower.followerId === followedUserId
			})

			return isFollowingBot || isFollowingUser
		}
		return false
	})

	// Organic content (neither from followed bots nor followed users)
	const organicThreads = threads.filter(
		(thread) =>
			!thread.chatbot?.followers?.some(
				(follower) => follower.followerId === followedUserId,
			) &&
			!thread.user?.followers?.some(
				(follower) => follower.followerId === followedUserId,
			),
	)

	const interweavedThreads: Thread[] = []
	let followingIndex = 0
	let organicIndex = 0

	while (
		(followingIndex < followingThreads.length ||
			organicIndex < organicThreads.length) &&
		interweavedThreads.length < baseLimit
	) {
		// Add up to 4 following threads
		for (
			let i = 0;
			i < baseLimit - organicThreads.length &&
			followingIndex < followingThreads.length &&
			interweavedThreads.length < baseLimit;
			i++
		) {
			interweavedThreads.push(followingThreads[followingIndex])
			followingIndex++
		}

		// Add 1 organic thread if available
		if (
			organicIndex < organicThreads.length &&
			interweavedThreads.length < baseLimit
		) {
			interweavedThreads.push(organicThreads[organicIndex])
			organicIndex++
		}
	}
	return {
		threads: interweavedThreads,
		count: threadAggregate.aggregate?.count || 0,
	}
}

export async function getMessages({
	threadId,
	threadQuestionSlug,
	limit,
	offset,
	jwt,
}: GetMessagesParams) {
	let client = getHasuraClient({})
	if (jwt) client = getHasuraClient({ jwt })
	const { message } = await client.query({
		message: {
			...everything,
			__args: {
				where: {
					...(threadId ? { threadId: { _eq: threadId } } : {}),
					...(threadQuestionSlug ? { slug: { _eq: threadQuestionSlug } } : {}),
				},
				orderBy: [{ createdAt: 'ASC' }],
				...(limit
					? {
							limit,
						}
					: {}),
				...(offset
					? {
							offset,
						}
					: {}),
			},
		},
	})
	return message as Message[]
}

export async function getChatbotsCount({
	categoryId,
	jwt,
}: GetChatbotsParams & { jwt: string }) {
	const client = getHasuraClient({ jwt })
	const { chatbotAggregate } = await client.query({
		chatbotAggregate: {
			aggregate: {
				count: true,
			},
			__args: {
				...(categoryId
					? {
							where: {
								categories: {
									categoryId: {
										_eq: categoryId,
									},
								},
							},
						}
					: {}),
			},
		},
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
			bio: true,
			__args: {
				where: {
					slug: {
						_eq: slug,
					},
				},
			},
		},
	})
	return user[0]
}

export async function getThreadsWithoutJWT() {
	const client = getHasuraClient({})
	const { thread } = await client.query({
		thread: {
			chatbot: {
				categories: {
					category: {
						name: true,
					},
				},
				name: true,
			},
			...everything,
			__args: {
				orderBy: [{ createdAt: 'DESC' }],
			},
		},
	})

	return thread as Thread[]
}

export async function getUsers() {
	const client = getHasuraClient({})
	const { user } = await client.query({
		user: {
			slug: true,
		},
	})
	return user as User[]
}

export async function updateThreadVisibility({
	threadId,
	isPublic,
	jwt,
}: {
	threadId: string
	isPublic: boolean
	jwt: string | undefined
}): Promise<{ success: boolean; error?: string }> {
	try {
		const client = getHasuraClient({ jwt })
		const updateThreadResponse = await client.mutation({
			updateThread: {
				__args: {
					where: { threadId: { _eq: threadId } },
					_set: { isPublic },
				},
				returning: {
					threadId: true,
					isPublic: true,
				},
			},
		})
		return {
			success: Boolean(updateThreadResponse.updateThread?.returning?.length),
		}
	} catch (error) {
		return { success: false, error: (error as Error).message }
	}
}

export async function approveThread({
	threadId,
	jwt,
}: {
	threadId: string
	jwt: string | undefined
}): Promise<{ success: boolean; error?: string }> {
	try {
		const client = getHasuraClient({ jwt })
		await client.mutation({
			updateThread: {
				__args: {
					where: { threadId: { _eq: threadId } },
					_set: { isApproved: true },
				},
				returning: {
					threadId: true,
					isApproved: true,
				},
			},
		})
		return { success: true }
	} catch (error) {
		console.error('Error approving thread:', error)
		return { success: false, error: 'Failed to approve the thread.' }
	}
}

export async function getUserByEmail({
	email,
}: {
	email: string | null | undefined
}) {
	try {
		const client = getHasuraClient({ jwt: '' })
		const { user } = await client.query({
			user: {
				__args: {
					where: { email: { _eq: email } },
				},
				role: true,
				slug: true,
				deletionRequestedAt: true,
				email: true,
			},
		})
		return { users: user as User[] }
	} catch (error) {
		console.error('Error fetching user role by email:', error)
		return { users: [], error: 'Failed to fetch user role by email.' }
	}
}

export async function deleteThread({
	threadId,
	jwt,
	userId,
}: {
	threadId: string
	jwt: string | undefined
	userId: string | undefined
}) {
	try {
		if (!jwt) {
			throw new Error('Authentication required for thread deletion')
		}

		const client = getHasuraClient({ jwt })
		const result = await client.mutation({
			deleteThread: {
				__args: {
					where: {
						threadId: { _eq: threadId },
						userId: { _eq: userId },
					},
				},
				affectedRows: true,
			},
		})

		if ((result.deleteThread?.affectedRows ?? 0) > 0) {
			return { success: true }
		}
		return { success: false }
	} catch (error) {
		console.error('Error deleting thread:', error)
		return { success: false, error: 'Failed to delete the thread.' }
	}
}

// get all threads that are not approved
export async function getUnapprovedThreads({ jwt }: { jwt: string }) {
	if (!jwt) {
		throw new Error('Authentication required to access unapproved threads')
	}
	const client = getHasuraClient({ jwt })
	const { thread } = await client.query({
		thread: {
			__args: {
				where: { isApproved: { _eq: false } },
				orderBy: [{ createdAt: 'DESC' }],
				limit: 20,
			},
			chatbot: {
				...everything,
				categories: {
					category: {
						...everything,
					},
					...everything,
				},
				threads: {
					threadId: true,
				},
				prompts: {
					prompt: everything,
				},
			},
			messages: {
				...everything,
				__args: {
					orderBy: [{ createdAt: 'ASC' }],
					limit: 2,
				},
			},
			user: {
				slug: true,
				username: true,
				profilePicture: true,
			},
			isApproved: true,
			isPublic: true,
			__scalar: true,
		},
	})

	return thread as Thread[]
}

export async function getUserBySlug({
	slug,
	isSameUser,
}: {
	slug: string
	isSameUser: boolean
}) {
	try {
		const client = getHasuraClient({})
		const { user } = await client.query({
			user: {
				__args: {
					where: {
						slug: {
							_eq: slug,
						},
					},
				},
				userId: true,
				username: true,
				profilePicture: true,
				email: true,
				slug: true,
				bio: true,
				favouriteTopic: true,
				proUserSubscriptionId: true,
				threads: {
					__args: {
						where: isSameUser
							? {}
							: {
									_and: [
										{ isApproved: { _eq: true } },
										{ isPublic: { _eq: true } },
									],
								},
					},
					threadId: true,
					isApproved: true,
					isPublic: true,
					chatbot: {
						name: true,
						metadata: {
							domainName: true,
						},
					},
					messages: {
						content: true,
						__args: {
							limit: 2,
						},
					},
				},
				followers: {
					followeeId: true,
					followerId: true,
					userByFollowerId: {
						username: true,
					},
				},

				following: {
					__args: {
						where: {
							followeeId: { _isNull: false },
							followeeIdChatbot: { _isNull: true },
						},
					},
					followeeId: true,
					followerId: true,
					userByFollowerId: {
						username: true,
					},
				},

				preferences: {
					__scalar: true,
				},
			},
		} as const)

		if (!user || user.length === 0) {
			console.log('No user found with user slug:', slug)
			return { user: null, error: 'User not found.' }
		}
		return {
			user: user[0], // Return the first matching user
			error: null,
		}
	} catch (error) {
		console.error('Error fetching user by username:', {
			error,
			slug,
			timestamp: new Date().toISOString(),
		})
		if (error instanceof Error) {
			return {
				user: null,
				error: error.message || 'Failed to fetch user by username.',
			}
		}

		return {
			user: null,
			error: 'An unexpected error occurred while fetching user.',
		}
	}
}

export async function updateUserPersonality({
	userId,
	bio,
	topic,
	jwt,
	profilePicture,
}: {
	userId: string | undefined
	bio: string | null
	topic: string | null
	jwt: string | undefined
	profilePicture: string | null
}) {
	try {
		if (!jwt) {
			throw new Error('Authentication required to update user bio')
		}

		const client = getHasuraClient({ jwt })

		// Build update arguments based on non-null values
		const updateArgs: UpdateUserArgs = {
			pkColumns: { userId },
		}

		updateArgs._set = {
			...(bio !== null && { bio }),
			...(topic !== null && { favouriteTopic: topic }),
			...(profilePicture !== null && { profilePicture }),
		}

		await client.mutation({
			updateUserByPk: {
				__args: updateArgs,
				userId: true,
				bio: true,
				favouriteTopic: true,
			},
		})

		return { success: true }
	} catch (error) {
		console.error('Error updating user bio:', error)
		return { success: false, error: "Failed to update user's profile" }
	}
}

const getFollowStatus = async (
	client: MbClient,
	followerId: string,
	followeeId: string,
) => {
	const { socialFollowing } = await client.query({
		socialFollowing: {
			__args: {
				where: {
					followerId: { _eq: followerId },
					followeeId: { _eq: followeeId },
				},
			},
			followeeId: true,
			followerId: true,
		},
	})
	return socialFollowing?.length > 0
}

const followUser = async (
	client: MbClient,
	followerId: string,
	followeeId: string,
) => {
	return client.mutation({
		insertSocialFollowingOne: {
			__args: {
				object: { followerId, followeeId },
			},
			followeeId: true,
			followerId: true,
			userByFollowerId: { username: true },
		},
	})
}

const unfollowUser = async (
	client: MbClient,
	followerId: string,
	followeeId: string,
) => {
	return client.mutation({
		deleteSocialFollowing: {
			__args: {
				where: {
					followerId: { _eq: followerId },
					followeeId: { _eq: followeeId },
				},
			},
			affectedRows: true,
			returning: { followeeId: true, followerId: true },
		},
	})
}

export async function userFollowOrUnfollow({
	followerId,
	followeeId,
	jwt,
}: {
	followerId: string
	followeeId: string
	jwt: string
}) {
	if (!jwt) throw new Error('Authentication required to follow/unfollow user')

	const client = getHasuraClient({ jwt })
	try {
		const isFollowing = await getFollowStatus(client, followerId, followeeId)
		if (!isFollowing) {
			await followUser(client, followerId, followeeId)
			return { success: true, follow: true }
		}
		await unfollowUser(client, followerId, followeeId)
		return { success: true, follow: false }
	} catch (error) {
		console.error('Error following/unfollowing user:', error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to follow/unfollow user.',
		}
	}
}

// chatbot follow or unfollow  function

const getChatbotFollowStatus = async (
	client: MbClient,
	followerId: string,
	followeeId: number,
) => {
	const { socialFollowing } = await client.query({
		socialFollowing: {
			__args: {
				where: {
					followerId: { _eq: followerId },
					followeeIdChatbot: { _eq: followeeId },
				},
			},
			followeeIdChatbot: true,
			followerId: true,
		},
	})
	return socialFollowing?.length > 0
}

const followChatbot = async (
	client: MbClient,
	followerId: string,
	followeeId: number,
) => {
	return client.mutation({
		insertSocialFollowingOne: {
			__args: {
				object: { followerId, followeeIdChatbot: followeeId },
			},
			followeeIdChatbot: true,
			followerId: true,
			chatbot: { name: true },
		},
	})
}

const unfollowChatbot = async (
	client: MbClient,
	followerId: string,
	followeeId: number,
) => {
	return client.mutation({
		deleteSocialFollowing: {
			__args: {
				where: {
					followerId: { _eq: followerId },
					followeeIdChatbot: { _eq: followeeId },
				},
			},
			affectedRows: true,
			returning: { followeeIdChatbot: true, followerId: true },
		},
	})
}

export async function chatbotFollowOrUnfollow({
	followerId,
	followeeId,
	jwt,
}: {
	followerId: string
	followeeId: number
	jwt: string
}) {
	if (!jwt)
		throw new Error('Authentication required to follow/unfollow chatbot')

	const client = getHasuraClient({ jwt })
	try {
		const isFollowing = await getChatbotFollowStatus(
			client,
			followerId,
			followeeId,
		)
		if (!isFollowing) {
			await followChatbot(client, followerId, followeeId)
			return { success: true, follow: true }
		}
		await unfollowChatbot(client, followerId, followeeId)
		return { success: true, follow: false }
	} catch (error) {
		console.error('Error following/unfollowing chatbot:', error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to follow/unfollow chatbot.',
		}
	}
}

export async function fetchChatbotMetadata({
	chatbot, // ? domain === category: Renaming category to domains and category will be another level for the Masterbots (chatbots)
	isPowerUp,
}: ChatbotMetadataHeaders): Promise<ReturnFetchChatbotMetadata> {
	try {
		const client = getHasuraClient({})
		const { chatbotDomain } = await client.query({
			chatbotDomain: {
				__args: {
					where: {
						chatbotId: { _eq: chatbot },
					},
				},
				domain: {
					name: true,
					tag_enums: {
						name: true,
					},
					category_enums: {
						name: true,
						subcategory_enums: {
							name: true,
						},
					},
				},
			},
		})
		// console.log('isPowerUp --> ', isPowerUp)
		const chatbotMetadata = chatbotDomain.filter(
			// ? Filtering Advanced chatbots domains
			(item) =>
				isPowerUp
					? item.domain.name.endsWith('(Advanced)')
					: !item.domain.name.endsWith('(Advanced)'),
		)
		// console.log('chatbotMetadata::BE --> ', chatbotMetadata)

		// require that the length is 1
		if (!chatbotMetadata[0] || !chatbotMetadata[0].domain) {
			throw new Error('Invalid chatbot metadata response')
		}

		// Transform the data to create a dictionary of categories with subcategories as values
		const transformedMetadata = chatbotMetadata.map((item) => ({
			domainName: item.domain.name,
			tags: item.domain.tag_enums.map((tag) => tag.name),
			categories: item.domain.category_enums.reduce(
				(acc: { [key: string]: string[] }, category) => {
					acc[category.name] = category.subcategory_enums.map(
						(subcat: { name: string }) => subcat.name,
					)
					return acc
				},
				{},
			),
		}))

		// console.log('transformedMetadata', transformedMetadata);

		return transformedMetadata[0] as unknown as ChatbotMetadata
	} catch (error) {
		console.error('Error fetching chatbot metadata:', error)
		return null
	}
}

export async function fetchDomainExamples({
	domainName,
	categories,
}: ChatbotMetadataClassification) {
	try {
		const client = getHasuraClient({})
		const categoryArgs = categories.map((category) => ({
			category: {
				_like: `%${category}%`,
			},
		}))
		const { example: examples } = await client.query({
			example: {
				__args: {
					where: {
						domain: { _eq: domainName },
						_or: categoryArgs,
					},
				},
				prompt: true,
				category: true,
				domain: true,
				exampleId: true,
				response: true,
				subcategory: true,
				tags: true,
			},
		})

		return examples.map((example) => ({
			...example,
			cumulativeSum: 0,
		})) as unknown as ExampleMetadata[]
	} catch (error) {
		console.error('Error fetching examples:', error)
		return null
	}
}

export async function fetchDomainTags({
	domainName,
	tags: tagNames,
}: ChatbotMetadataClassification) {
	try {
		const client = getHasuraClient({})
		const tagNameArgs = tagNames.map((tag) => ({
			name: {
				_eq: tag,
			},
		}))
		const { tagEnum: tags } = await client.query({
			tagEnum: {
				__args: {
					where: {
						domain: { _eq: domainName },
						_or: tagNameArgs,
					},
				},
				name: true,
				frequency: true,
				tagId: true,
			},
		})

		if (!tags.length) {
			throw new Error(`No tags found for domain: ${domainName}`)
		}

		// change to a dict with key of tagId and value of object with name and frequency
		const transformedTags: {
			[key: string]: { name: string; frequency: number }
		} = {}

		for (const tag in tags) {
			const tagData = tags[tag]
			transformedTags[tagData.tagId] = {
				name: tagData.name,
				frequency: tagData.frequency,
			}
		}

		return transformedTags
	} catch (error) {
		console.error('Error fetching tags:', error)
		return null
	}
}

// update user deletion_requested_at with the current date
export async function updateUserDeletionRequest({
	userId,
	jwt,
	reset = false,
}: {
	userId: string
	jwt: string
	reset?: boolean
}): Promise<{ success: boolean; error?: string }> {
	try {
		if (!jwt) {
			throw new Error('Authentication required to update user deletion request')
		}

		const client = getHasuraClient({ jwt })
		await client.mutation({
			updateUserByPk: {
				__args: {
					pkColumns: { userId },
					_set: {
						deletionRequestedAt: reset ? null : new Date().toISOString(),
					},
				},
				userId: true,
			},
		})

		return { success: true }
	} catch (error) {
		console.error('Error updating user deletion request:', error)
		return { success: false, error: (error as Error).message }
	}
}

// a function to delete all users messages and threads
export async function deleteUserMessagesAndThreads({
	userId,
	jwt,
}: {
	userId: string
	jwt: string
}): Promise<{ success: boolean; error?: string }> {
	try {
		if (!jwt) {
			throw new Error(
				'Authentication required to delete user messages and threads',
			)
		}

		const client = getHasuraClient({ jwt })

		// First, delete all messages associated with the user's threads
		// Then, delete all the user's threads
		const whereArgDeleteObject = {
			thread: {
				userId: { _eq: userId },
				isPublic: { _eq: true },
				isApproved: { _eq: true },
			},
		}
		await client.mutation({
			deleteMessage: {
				__args: {
					where: whereArgDeleteObject,
				},
				affectedRows: true,
			},
			deleteThread: {
				__args: {
					where: whereArgDeleteObject,
				},
				affectedRows: true,
			},
		})

		return { success: true }
	} catch (error) {
		console.error('Error deleting user messages and threads:', error)
		return { success: false, error: (error as Error).message }
	}
}

//? This function fetches all models from the database
export async function getModels() {
	try {
		const client = getHasuraClient({})
		console.log('Fetching models from Hasura...')

		const result = await client.query({
			models: {
				enabled: true,
				model: true,
				model_data: {
					name: true,
					value: true,
				},
				type: true,
			},
		})
		return result.models
	} catch (error) {
		console.error('Error fetching models:', error)
		return []
	}
}

export async function updatePreferences({
	jwt,
	userId,
	preferencesSet,
}: {
	jwt: string
	userId: string
	preferencesSet: PreferenceSetInput
}) {
	try {
		const client = getHasuraClient({ jwt })
		const { updatePreference } = await client.mutation({
			updatePreference: {
				__args: {
					where: {
						userId: {
							_eq: userId,
						},
					},
					_set: preferencesSet,
				},
				userId: true,
				preferences: true,
			},
		})

		if (!updatePreference)
			throw new Error(
				'Failed to fetch and/or update preferences. No rows returned.',
			)

		return {
			data: updatePreference,
			error: null,
		}
	} catch (error) {
		console.error('Failed to update user preferences ——>', error)
		return {
			data: null,
			error: (error as Error).message,
		}
	}
}

export async function insertPreferencesByUserId({
	jwt,
	preferencesSet,
}: {
	jwt?: string
	preferencesSet: PreferenceInsertInput
}) {
	try {
		const client = getHasuraClient({ jwt })
		const { insertPreferenceOne } = await client.mutation({
			insertPreferenceOne: {
				__args: {
					object: preferencesSet,
				},
				userId: true,
				preferences: true,
			},
		})

		if (!insertPreferenceOne)
			throw new Error(
				'Failed to fetch and/or update preferences. No rows returned.',
			)

		return {
			data: insertPreferenceOne,
			error: null,
		}
	} catch (error) {
		console.error('Failed to update user preferences by user ID:', error)
		return {
			data: null,
			error: (error as Error).message,
		}
	}
}

export async function getThreadMetadataBySlug({
	slug,
	jwt,
}: {
	slug: string
	jwt?: string
}): Promise<{ thread: Thread | null; error?: string }> {
	try {
		const client = getHasuraClient({ jwt })
		const { thread } = await client.query({
			thread: {
				__args: {
					where: { slug: { _eq: slug } },
				},
				metadata: true,
			},
		})

		if (!thread || thread.length === 0) {
			return { thread: null, error: 'Thread not found' }
		}

		return { thread: thread[0] as Thread, error: undefined }
	} catch (error) {
		console.error('Error fetching thread metadata by slug:', error)
		return { thread: null, error: (error as Error).message }
	}
}

export const deleteMessages = async (
	messageIds: string[],
	jwt: string | undefined,
) => {
	try {
		if (!jwt) {
			throw new Error('Authentication required for thread deletion')
		}

		const client = getHasuraClient({ jwt })
		const res = await client.mutation({
			deleteMessage: {
				__args: {
					where: {
						messageId: { _in: messageIds },
					},
				},
				affectedRows: true,
				returning: {
					messageId: true,
				},
			},
		})

		if ((res.deleteMessage?.affectedRows ?? 0) > 0) {
			return { success: true }
		}
		return { success: false }
	} catch (error) {
		console.error('Failed to delete messages:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		}
	}
}
