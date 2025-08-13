// Base interfaces with all possible parameters
export interface BasePersonalPublicUrlParams {
	type: 'personal' | 'public' | 'pro' | 'bot' | 'org'
	raw?: boolean
	category?: string
	domain?: string
	chatbot?: string
	threadSlug?: string
	threadQuestionSlug?: string
}

export interface BaseProfilesUrlParams {
	type: 'user' | 'chatbot' | 'user-chatbot'
	raw?: boolean
	usernameSlug?: string
	category?: string
	domain?: string
	chatbot?: string
	threadSlug?: string
	threadQuestionSlug?: string
}

// Template types for PersonalPublicUrlParams with specific required fields
export type PersonalPublicUrlParams<
	RequiredFields extends keyof BasePersonalPublicUrlParams,
> = Required<Pick<BasePersonalPublicUrlParams, RequiredFields>> &
	Partial<Omit<BasePersonalPublicUrlParams, RequiredFields>>

// Template types for ProfilesUrlParams with specific required fields
export type ProfilesUrlParams<
	RequiredFields extends keyof BaseProfilesUrlParams,
> = Required<Pick<BaseProfilesUrlParams, RequiredFields>> &
	Partial<Omit<BaseProfilesUrlParams, RequiredFields>>

// Type definitions for specific function parameter requirements
export type TopicThreadListUrlParams = PersonalPublicUrlParams<
	'type' | 'category'
>
export type ChatbotThreadListUrlParams = PersonalPublicUrlParams<
	'type' | 'category' | 'domain' | 'chatbot'
>
export type ThreadUrlParams = PersonalPublicUrlParams<
	'type' | 'category' | 'domain' | 'chatbot' | 'threadSlug'
>
export type ThreadQuestionUrlParams = PersonalPublicUrlParams<
	| 'type'
	| 'category'
	| 'domain'
	| 'chatbot'
	| 'threadSlug'
	| 'threadQuestionSlug'
>

export type ProfilesUrlUserParams = ProfilesUrlParams<'type' | 'usernameSlug'>
export type ProfilesUrlChatbotParams = ProfilesUrlParams<'type' | 'chatbot'>
export type ProfilesThreadUrlUserParams = ProfilesUrlParams<
	'type' | 'usernameSlug' | 'category' | 'domain' | 'chatbot' | 'threadSlug'
>
export type ProfilesThreadUrlChatbotParams = ProfilesUrlParams<
	'type' | 'chatbot' | 'threadSlug'
>
export type ProfilesThreadQuestionUrlUserParams = ProfilesUrlParams<
	| 'type'
	| 'usernameSlug'
	| 'category'
	| 'domain'
	| 'chatbot'
	| 'threadSlug'
	| 'threadQuestionSlug'
>
export type ProfilesThreadQuestionUrlChatbotParams = ProfilesUrlParams<
	'type' | 'domain' | 'chatbot' | 'threadSlug' | 'threadQuestionSlug'
>

export type UserTopicThreadListUrlParams = ProfilesUrlParams<
	'type' | 'usernameSlug' | 'category'
>
export type UserChatbotThreadListUrlParams = ProfilesUrlParams<
	'type' | 'usernameSlug' | 'category' | 'domain' | 'chatbot'
>
