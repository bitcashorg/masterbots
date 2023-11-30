// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    Int: number,
    String: string,
    timestamptz: any,
}


/** Table to store different categories for chatbots. */
export interface Category {
    categoryId: Scalars['Int']
    /** An array relationship */
    chatbots: ChatbotCategory[]
    name: Scalars['String']
    __typename: 'Category'
}


/** select columns of table "category" */
export type CategorySelectColumn = 'categoryId' | 'name'


/** Table storing information about chatbots, their characteristics, and default settings. */
export interface Chatbot {
    avatar: (Scalars['String'] | null)
    /** An array relationship */
    categories: ChatbotCategory[]
    chatbotId: Scalars['Int']
    createdBy: Scalars['String']
    defaultComplexity: Scalars['String']
    defaultLength: Scalars['String']
    defaultTone: Scalars['String']
    defaultType: Scalars['String']
    /** An object relationship */
    default_complexity_enum: DefaultComplexityEnum
    /** An object relationship */
    default_length_enum: DefaultLengthEnum
    /** An object relationship */
    default_tone_enum: DefaultToneEnum
    /** An object relationship */
    default_type_enum: DefaultTypeEnum
    description: (Scalars['String'] | null)
    /** An array relationship */
    gpt_chats: GptChat[]
    name: Scalars['String']
    /** An array relationship */
    prompts: PromptChatbot[]
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    __typename: 'Chatbot'
}


/** Junction table to manage the many-to-many relationships between chatbots and their categories. */
export interface ChatbotCategory {
    /** An object relationship */
    category: Category
    categoryId: Scalars['Int']
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    __typename: 'ChatbotCategory'
}


/** select columns of table "chatbot_category" */
export type ChatbotCategorySelectColumn = 'categoryId' | 'chatbotId'


/** select columns of table "chatbot" */
export type ChatbotSelectColumn = 'avatar' | 'chatbotId' | 'createdBy' | 'defaultComplexity' | 'defaultLength' | 'defaultTone' | 'defaultType' | 'description' | 'name'


/** ordering argument of a cursor */
export type CursorOrdering = 'ASC' | 'DESC'


/** columns and relationships of "default_complexity_enum" */
export interface DefaultComplexityEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    value: Scalars['String']
    __typename: 'DefaultComplexityEnum'
}


/** select columns of table "default_complexity_enum" */
export type DefaultComplexityEnumSelectColumn = 'value'


/** columns and relationships of "default_length_enum" */
export interface DefaultLengthEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    value: Scalars['String']
    __typename: 'DefaultLengthEnum'
}


/** select columns of table "default_length_enum" */
export type DefaultLengthEnumSelectColumn = 'value'


/** columns and relationships of "default_tone_enum" */
export interface DefaultToneEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    value: Scalars['String']
    __typename: 'DefaultToneEnum'
}


/** select columns of table "default_tone_enum" */
export type DefaultToneEnumSelectColumn = 'value'


/** columns and relationships of "default_type_enum" */
export interface DefaultTypeEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    value: Scalars['String']
    __typename: 'DefaultTypeEnum'
}


/** select columns of table "default_type_enum" */
export type DefaultTypeEnumSelectColumn = 'value'


/** Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link. */
export interface GptChat {
    addedBy: Scalars['Int']
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    conversationLink: Scalars['String']
    gptChatId: Scalars['Int']
    /** An object relationship */
    user: User
    __typename: 'GptChat'
}


/** select columns of table "gpt_chat" */
export type GptChatSelectColumn = 'addedBy' | 'chatbotId' | 'conversationLink' | 'gptChatId'


/** This table stores the messages exchanged between users and chatbots. */
export interface Message {
    content: Scalars['String']
    createdAt: (Scalars['timestamptz'] | null)
    messageId: Scalars['Int']
    /** An object relationship */
    message_type_enum: MessageTypeEnum
    relatedMessageId: (Scalars['Int'] | null)
    /** An object relationship */
    thread: (Thread | null)
    threadId: (Scalars['Int'] | null)
    type: Scalars['String']
    __typename: 'Message'
}


/** select columns of table "message" */
export type MessageSelectColumn = 'content' | 'createdAt' | 'messageId' | 'relatedMessageId' | 'threadId' | 'type'


/** columns and relationships of "message_type_enum" */
export interface MessageTypeEnum {
    /** An array relationship */
    messages: Message[]
    value: Scalars['String']
    __typename: 'MessageTypeEnum'
}


/** select columns of table "message_type_enum" */
export type MessageTypeEnumSelectColumn = 'value'


/** column ordering options */
export type OrderBy = 'ASC' | 'ASC_NULLS_FIRST' | 'ASC_NULLS_LAST' | 'DESC' | 'DESC_NULLS_FIRST' | 'DESC_NULLS_LAST'


/** columns and relationships of "prompt" */
export interface Prompt {
    content: Scalars['String']
    promptId: Scalars['Int']
    promptName: (Scalars['String'] | null)
    /** An array relationship */
    prompt_chatbots: PromptChatbot[]
    /** An object relationship */
    prompt_type_enum: PromptTypeEnum
    type: Scalars['String']
    __typename: 'Prompt'
}


/** Junction table for prompts/instructions and chatbots. */
export interface PromptChatbot {
    chabotId: Scalars['Int']
    /** An object relationship */
    chatbot: Chatbot
    /** An object relationship */
    prompt: Prompt
    promptId: Scalars['Int']
    __typename: 'PromptChatbot'
}


/** select columns of table "prompt_chatbot" */
export type PromptChatbotSelectColumn = 'chabotId' | 'promptId'


/** select columns of table "prompt" */
export type PromptSelectColumn = 'content' | 'promptId' | 'promptName' | 'type'


/** columns and relationships of "prompt_type_enum" */
export interface PromptTypeEnum {
    /** An array relationship */
    prompts: Prompt[]
    value: Scalars['String']
    __typename: 'PromptTypeEnum'
}


/** select columns of table "prompt_type_enum" */
export type PromptTypeEnumSelectColumn = 'value'


/** columns and relationships of "thread" */
export interface Thread {
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    createdAt: Scalars['timestamptz']
    /** An array relationship */
    messages: Message[]
    threadId: Scalars['Int']
    updatedAt: Scalars['timestamptz']
    /** An object relationship */
    user: User
    userId: Scalars['Int']
    __typename: 'Thread'
}


/** select columns of table "thread" */
export type ThreadSelectColumn = 'chatbotId' | 'createdAt' | 'threadId' | 'updatedAt' | 'userId'


/** Table storing information about registered users. */
export interface User {
    dateJoined: Scalars['timestamptz']
    email: Scalars['String']
    /** An array relationship */
    gpt_chats: GptChat[]
    lastLogin: (Scalars['timestamptz'] | null)
    password: Scalars['String']
    profilePicture: (Scalars['String'] | null)
    /** An array relationship */
    threads: Thread[]
    userId: Scalars['Int']
    /** An array relationship */
    user_chatbot_preferences: UserChatbotPreference[]
    username: Scalars['String']
    __typename: 'User'
}


/** This table stores user-specific preferences for quick access when they interact with a chatbot. */
export interface UserChatbotPreference {
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    /** An object relationship */
    default_complexity_enum: DefaultComplexityEnum
    /** An object relationship */
    default_length_enum: DefaultLengthEnum
    /** An object relationship */
    default_tone_enum: DefaultToneEnum
    /** An object relationship */
    default_type_enum: DefaultTypeEnum
    favorite: (Scalars['Boolean'] | null)
    preferenceId: Scalars['Int']
    preferredComplexity: Scalars['String']
    preferredLength: Scalars['String']
    preferredTone: Scalars['String']
    preferredType: Scalars['String']
    /** An object relationship */
    user: User
    userId: Scalars['Int']
    __typename: 'UserChatbotPreference'
}


/** select columns of table "user_chatbot_preference" */
export type UserChatbotPreferenceSelectColumn = 'chatbotId' | 'favorite' | 'preferenceId' | 'preferredComplexity' | 'preferredLength' | 'preferredTone' | 'preferredType' | 'userId'


/** select columns of table "user" */
export type UserSelectColumn = 'dateJoined' | 'email' | 'lastLogin' | 'password' | 'profilePicture' | 'userId' | 'username'

export interface query_root {
    /** fetch data from the table: "category" */
    category: Category[]
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk: (Category | null)
    /** fetch data from the table: "chatbot" */
    chatbot: Chatbot[]
    /** fetch data from the table: "chatbot" using primary key columns */
    chatbotByPk: (Chatbot | null)
    /** fetch data from the table: "chatbot_category" */
    chatbotCategory: ChatbotCategory[]
    /** fetch data from the table: "chatbot_category" using primary key columns */
    chatbotCategoryByPk: (ChatbotCategory | null)
    /** fetch data from the table: "default_complexity_enum" */
    defaultComplexityEnum: DefaultComplexityEnum[]
    /** fetch data from the table: "default_complexity_enum" using primary key columns */
    defaultComplexityEnumByPk: (DefaultComplexityEnum | null)
    /** fetch data from the table: "default_length_enum" */
    defaultLengthEnum: DefaultLengthEnum[]
    /** fetch data from the table: "default_length_enum" using primary key columns */
    defaultLengthEnumByPk: (DefaultLengthEnum | null)
    /** fetch data from the table: "default_tone_enum" */
    defaultToneEnum: DefaultToneEnum[]
    /** fetch data from the table: "default_tone_enum" using primary key columns */
    defaultToneEnumByPk: (DefaultToneEnum | null)
    /** fetch data from the table: "default_type_enum" */
    defaultTypeEnum: DefaultTypeEnum[]
    /** fetch data from the table: "default_type_enum" using primary key columns */
    defaultTypeEnumByPk: (DefaultTypeEnum | null)
    /** fetch data from the table: "gpt_chat" */
    gptChat: GptChat[]
    /** fetch data from the table: "gpt_chat" using primary key columns */
    gptChatByPk: (GptChat | null)
    /** fetch data from the table: "message" */
    message: Message[]
    /** fetch data from the table: "message" using primary key columns */
    messageByPk: (Message | null)
    /** fetch data from the table: "message_type_enum" */
    messageTypeEnum: MessageTypeEnum[]
    /** fetch data from the table: "message_type_enum" using primary key columns */
    messageTypeEnumByPk: (MessageTypeEnum | null)
    /** fetch data from the table: "prompt" */
    prompt: Prompt[]
    /** fetch data from the table: "prompt" using primary key columns */
    promptByPk: (Prompt | null)
    /** fetch data from the table: "prompt_chatbot" */
    promptChatbot: PromptChatbot[]
    /** fetch data from the table: "prompt_chatbot" using primary key columns */
    promptChatbotByPk: (PromptChatbot | null)
    /** fetch data from the table: "prompt_type_enum" */
    promptTypeEnum: PromptTypeEnum[]
    /** fetch data from the table: "prompt_type_enum" using primary key columns */
    promptTypeEnumByPk: (PromptTypeEnum | null)
    /** fetch data from the table: "thread" */
    thread: Thread[]
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk: (Thread | null)
    /** fetch data from the table: "user" */
    user: User[]
    /** fetch data from the table: "user" using primary key columns */
    userByPk: (User | null)
    /** fetch data from the table: "user_chatbot_preference" */
    userChatbotPreference: UserChatbotPreference[]
    /** fetch data from the table: "user_chatbot_preference" using primary key columns */
    userChatbotPreferenceByPk: (UserChatbotPreference | null)
    __typename: 'query_root'
}

export interface subscription_root {
    /** fetch data from the table: "category" */
    category: Category[]
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk: (Category | null)
    /** fetch data from the table in a streaming manner: "category" */
    categoryStream: Category[]
    /** fetch data from the table: "chatbot" */
    chatbot: Chatbot[]
    /** fetch data from the table: "chatbot" using primary key columns */
    chatbotByPk: (Chatbot | null)
    /** fetch data from the table: "chatbot_category" */
    chatbotCategory: ChatbotCategory[]
    /** fetch data from the table: "chatbot_category" using primary key columns */
    chatbotCategoryByPk: (ChatbotCategory | null)
    /** fetch data from the table in a streaming manner: "chatbot_category" */
    chatbotCategoryStream: ChatbotCategory[]
    /** fetch data from the table in a streaming manner: "chatbot" */
    chatbotStream: Chatbot[]
    /** fetch data from the table: "default_complexity_enum" */
    defaultComplexityEnum: DefaultComplexityEnum[]
    /** fetch data from the table: "default_complexity_enum" using primary key columns */
    defaultComplexityEnumByPk: (DefaultComplexityEnum | null)
    /** fetch data from the table in a streaming manner: "default_complexity_enum" */
    defaultComplexityEnumStream: DefaultComplexityEnum[]
    /** fetch data from the table: "default_length_enum" */
    defaultLengthEnum: DefaultLengthEnum[]
    /** fetch data from the table: "default_length_enum" using primary key columns */
    defaultLengthEnumByPk: (DefaultLengthEnum | null)
    /** fetch data from the table in a streaming manner: "default_length_enum" */
    defaultLengthEnumStream: DefaultLengthEnum[]
    /** fetch data from the table: "default_tone_enum" */
    defaultToneEnum: DefaultToneEnum[]
    /** fetch data from the table: "default_tone_enum" using primary key columns */
    defaultToneEnumByPk: (DefaultToneEnum | null)
    /** fetch data from the table in a streaming manner: "default_tone_enum" */
    defaultToneEnumStream: DefaultToneEnum[]
    /** fetch data from the table: "default_type_enum" */
    defaultTypeEnum: DefaultTypeEnum[]
    /** fetch data from the table: "default_type_enum" using primary key columns */
    defaultTypeEnumByPk: (DefaultTypeEnum | null)
    /** fetch data from the table in a streaming manner: "default_type_enum" */
    defaultTypeEnumStream: DefaultTypeEnum[]
    /** fetch data from the table: "gpt_chat" */
    gptChat: GptChat[]
    /** fetch data from the table: "gpt_chat" using primary key columns */
    gptChatByPk: (GptChat | null)
    /** fetch data from the table in a streaming manner: "gpt_chat" */
    gptChatStream: GptChat[]
    /** fetch data from the table: "message" */
    message: Message[]
    /** fetch data from the table: "message" using primary key columns */
    messageByPk: (Message | null)
    /** fetch data from the table in a streaming manner: "message" */
    messageStream: Message[]
    /** fetch data from the table: "message_type_enum" */
    messageTypeEnum: MessageTypeEnum[]
    /** fetch data from the table: "message_type_enum" using primary key columns */
    messageTypeEnumByPk: (MessageTypeEnum | null)
    /** fetch data from the table in a streaming manner: "message_type_enum" */
    messageTypeEnumStream: MessageTypeEnum[]
    /** fetch data from the table: "prompt" */
    prompt: Prompt[]
    /** fetch data from the table: "prompt" using primary key columns */
    promptByPk: (Prompt | null)
    /** fetch data from the table: "prompt_chatbot" */
    promptChatbot: PromptChatbot[]
    /** fetch data from the table: "prompt_chatbot" using primary key columns */
    promptChatbotByPk: (PromptChatbot | null)
    /** fetch data from the table in a streaming manner: "prompt_chatbot" */
    promptChatbotStream: PromptChatbot[]
    /** fetch data from the table in a streaming manner: "prompt" */
    promptStream: Prompt[]
    /** fetch data from the table: "prompt_type_enum" */
    promptTypeEnum: PromptTypeEnum[]
    /** fetch data from the table: "prompt_type_enum" using primary key columns */
    promptTypeEnumByPk: (PromptTypeEnum | null)
    /** fetch data from the table in a streaming manner: "prompt_type_enum" */
    promptTypeEnumStream: PromptTypeEnum[]
    /** fetch data from the table: "thread" */
    thread: Thread[]
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk: (Thread | null)
    /** fetch data from the table in a streaming manner: "thread" */
    threadStream: Thread[]
    /** fetch data from the table: "user" */
    user: User[]
    /** fetch data from the table: "user" using primary key columns */
    userByPk: (User | null)
    /** fetch data from the table: "user_chatbot_preference" */
    userChatbotPreference: UserChatbotPreference[]
    /** fetch data from the table: "user_chatbot_preference" using primary key columns */
    userChatbotPreferenceByPk: (UserChatbotPreference | null)
    /** fetch data from the table in a streaming manner: "user_chatbot_preference" */
    userChatbotPreferenceStream: UserChatbotPreference[]
    /** fetch data from the table in a streaming manner: "user" */
    userStream: User[]
    __typename: 'subscription_root'
}

export type Query = query_root
export type Subscription = subscription_root


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface BooleanComparisonExp {_eq?: (Scalars['Boolean'] | null),_gt?: (Scalars['Boolean'] | null),_gte?: (Scalars['Boolean'] | null),_in?: (Scalars['Boolean'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['Boolean'] | null),_lte?: (Scalars['Boolean'] | null),_neq?: (Scalars['Boolean'] | null),_nin?: (Scalars['Boolean'][] | null)}


/** Table to store different categories for chatbots. */
export interface CategoryGenqlSelection{
    categoryId?: boolean | number
    /** An array relationship */
    chatbots?: (ChatbotCategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotCategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotCategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotCategoryBoolExp | null)} })
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export interface CategoryBoolExp {_and?: (CategoryBoolExp[] | null),_not?: (CategoryBoolExp | null),_or?: (CategoryBoolExp[] | null),categoryId?: (IntComparisonExp | null),chatbots?: (ChatbotCategoryBoolExp | null),name?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "category". */
export interface CategoryOrderBy {categoryId?: (OrderBy | null),chatbotsAggregate?: (ChatbotCategoryAggregateOrderBy | null),name?: (OrderBy | null)}


/** Streaming cursor of the table "category" */
export interface CategoryStreamCursorInput {
/** Stream column input with initial value */
initialValue: CategoryStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface CategoryStreamCursorValueInput {categoryId?: (Scalars['Int'] | null),name?: (Scalars['String'] | null)}


/** Table storing information about chatbots, their characteristics, and default settings. */
export interface ChatbotGenqlSelection{
    avatar?: boolean | number
    /** An array relationship */
    categories?: (ChatbotCategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotCategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotCategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotCategoryBoolExp | null)} })
    chatbotId?: boolean | number
    createdBy?: boolean | number
    defaultComplexity?: boolean | number
    defaultLength?: boolean | number
    defaultTone?: boolean | number
    defaultType?: boolean | number
    /** An object relationship */
    default_complexity_enum?: DefaultComplexityEnumGenqlSelection
    /** An object relationship */
    default_length_enum?: DefaultLengthEnumGenqlSelection
    /** An object relationship */
    default_tone_enum?: DefaultToneEnumGenqlSelection
    /** An object relationship */
    default_type_enum?: DefaultTypeEnumGenqlSelection
    description?: boolean | number
    /** An array relationship */
    gpt_chats?: (GptChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (GptChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (GptChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (GptChatBoolExp | null)} })
    name?: boolean | number
    /** An array relationship */
    prompts?: (PromptChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptChatbotBoolExp | null)} })
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "chatbot" */
export interface ChatbotAggregateOrderBy {avg?: (ChatbotAvgOrderBy | null),count?: (OrderBy | null),max?: (ChatbotMaxOrderBy | null),min?: (ChatbotMinOrderBy | null),stddev?: (ChatbotStddevOrderBy | null),stddevPop?: (ChatbotStddevPopOrderBy | null),stddevSamp?: (ChatbotStddevSampOrderBy | null),sum?: (ChatbotSumOrderBy | null),varPop?: (ChatbotVarPopOrderBy | null),varSamp?: (ChatbotVarSampOrderBy | null),variance?: (ChatbotVarianceOrderBy | null)}


/** order by avg() on columns of table "chatbot" */
export interface ChatbotAvgOrderBy {chatbotId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "chatbot". All fields are combined with a logical 'AND'. */
export interface ChatbotBoolExp {_and?: (ChatbotBoolExp[] | null),_not?: (ChatbotBoolExp | null),_or?: (ChatbotBoolExp[] | null),avatar?: (StringComparisonExp | null),categories?: (ChatbotCategoryBoolExp | null),chatbotId?: (IntComparisonExp | null),createdBy?: (StringComparisonExp | null),defaultComplexity?: (StringComparisonExp | null),defaultLength?: (StringComparisonExp | null),defaultTone?: (StringComparisonExp | null),defaultType?: (StringComparisonExp | null),default_complexity_enum?: (DefaultComplexityEnumBoolExp | null),default_length_enum?: (DefaultLengthEnumBoolExp | null),default_tone_enum?: (DefaultToneEnumBoolExp | null),default_type_enum?: (DefaultTypeEnumBoolExp | null),description?: (StringComparisonExp | null),gpt_chats?: (GptChatBoolExp | null),name?: (StringComparisonExp | null),prompts?: (PromptChatbotBoolExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null)}


/** Junction table to manage the many-to-many relationships between chatbots and their categories. */
export interface ChatbotCategoryGenqlSelection{
    /** An object relationship */
    category?: CategoryGenqlSelection
    categoryId?: boolean | number
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "chatbot_category" */
export interface ChatbotCategoryAggregateOrderBy {avg?: (ChatbotCategoryAvgOrderBy | null),count?: (OrderBy | null),max?: (ChatbotCategoryMaxOrderBy | null),min?: (ChatbotCategoryMinOrderBy | null),stddev?: (ChatbotCategoryStddevOrderBy | null),stddevPop?: (ChatbotCategoryStddevPopOrderBy | null),stddevSamp?: (ChatbotCategoryStddevSampOrderBy | null),sum?: (ChatbotCategorySumOrderBy | null),varPop?: (ChatbotCategoryVarPopOrderBy | null),varSamp?: (ChatbotCategoryVarSampOrderBy | null),variance?: (ChatbotCategoryVarianceOrderBy | null)}


/** order by avg() on columns of table "chatbot_category" */
export interface ChatbotCategoryAvgOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "chatbot_category". All fields are combined with a logical 'AND'. */
export interface ChatbotCategoryBoolExp {_and?: (ChatbotCategoryBoolExp[] | null),_not?: (ChatbotCategoryBoolExp | null),_or?: (ChatbotCategoryBoolExp[] | null),category?: (CategoryBoolExp | null),categoryId?: (IntComparisonExp | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null)}


/** order by max() on columns of table "chatbot_category" */
export interface ChatbotCategoryMaxOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by min() on columns of table "chatbot_category" */
export interface ChatbotCategoryMinOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** Ordering options when selecting data from "chatbot_category". */
export interface ChatbotCategoryOrderBy {category?: (CategoryOrderBy | null),categoryId?: (OrderBy | null),chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null)}


/** order by stddev() on columns of table "chatbot_category" */
export interface ChatbotCategoryStddevOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "chatbot_category" */
export interface ChatbotCategoryStddevPopOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "chatbot_category" */
export interface ChatbotCategoryStddevSampOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** Streaming cursor of the table "chatbot_category" */
export interface ChatbotCategoryStreamCursorInput {
/** Stream column input with initial value */
initialValue: ChatbotCategoryStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ChatbotCategoryStreamCursorValueInput {categoryId?: (Scalars['Int'] | null),chatbotId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "chatbot_category" */
export interface ChatbotCategorySumOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by varPop() on columns of table "chatbot_category" */
export interface ChatbotCategoryVarPopOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by varSamp() on columns of table "chatbot_category" */
export interface ChatbotCategoryVarSampOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by variance() on columns of table "chatbot_category" */
export interface ChatbotCategoryVarianceOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by max() on columns of table "chatbot" */
export interface ChatbotMaxOrderBy {avatar?: (OrderBy | null),chatbotId?: (OrderBy | null),createdBy?: (OrderBy | null),defaultComplexity?: (OrderBy | null),defaultLength?: (OrderBy | null),defaultTone?: (OrderBy | null),defaultType?: (OrderBy | null),description?: (OrderBy | null),name?: (OrderBy | null)}


/** order by min() on columns of table "chatbot" */
export interface ChatbotMinOrderBy {avatar?: (OrderBy | null),chatbotId?: (OrderBy | null),createdBy?: (OrderBy | null),defaultComplexity?: (OrderBy | null),defaultLength?: (OrderBy | null),defaultTone?: (OrderBy | null),defaultType?: (OrderBy | null),description?: (OrderBy | null),name?: (OrderBy | null)}


/** Ordering options when selecting data from "chatbot". */
export interface ChatbotOrderBy {avatar?: (OrderBy | null),categoriesAggregate?: (ChatbotCategoryAggregateOrderBy | null),chatbotId?: (OrderBy | null),createdBy?: (OrderBy | null),defaultComplexity?: (OrderBy | null),defaultLength?: (OrderBy | null),defaultTone?: (OrderBy | null),defaultType?: (OrderBy | null),default_complexity_enum?: (DefaultComplexityEnumOrderBy | null),default_length_enum?: (DefaultLengthEnumOrderBy | null),default_tone_enum?: (DefaultToneEnumOrderBy | null),default_type_enum?: (DefaultTypeEnumOrderBy | null),description?: (OrderBy | null),gpt_chatsAggregate?: (GptChatAggregateOrderBy | null),name?: (OrderBy | null),promptsAggregate?: (PromptChatbotAggregateOrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null)}


/** order by stddev() on columns of table "chatbot" */
export interface ChatbotStddevOrderBy {chatbotId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "chatbot" */
export interface ChatbotStddevPopOrderBy {chatbotId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "chatbot" */
export interface ChatbotStddevSampOrderBy {chatbotId?: (OrderBy | null)}


/** Streaming cursor of the table "chatbot" */
export interface ChatbotStreamCursorInput {
/** Stream column input with initial value */
initialValue: ChatbotStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ChatbotStreamCursorValueInput {avatar?: (Scalars['String'] | null),chatbotId?: (Scalars['Int'] | null),createdBy?: (Scalars['String'] | null),defaultComplexity?: (Scalars['String'] | null),defaultLength?: (Scalars['String'] | null),defaultTone?: (Scalars['String'] | null),defaultType?: (Scalars['String'] | null),description?: (Scalars['String'] | null),name?: (Scalars['String'] | null)}


/** order by sum() on columns of table "chatbot" */
export interface ChatbotSumOrderBy {chatbotId?: (OrderBy | null)}


/** order by varPop() on columns of table "chatbot" */
export interface ChatbotVarPopOrderBy {chatbotId?: (OrderBy | null)}


/** order by varSamp() on columns of table "chatbot" */
export interface ChatbotVarSampOrderBy {chatbotId?: (OrderBy | null)}


/** order by variance() on columns of table "chatbot" */
export interface ChatbotVarianceOrderBy {chatbotId?: (OrderBy | null)}


/** columns and relationships of "default_complexity_enum" */
export interface DefaultComplexityEnumGenqlSelection{
    /** An array relationship */
    chatbots?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "default_complexity_enum". All fields are combined with a logical 'AND'. */
export interface DefaultComplexityEnumBoolExp {_and?: (DefaultComplexityEnumBoolExp[] | null),_not?: (DefaultComplexityEnumBoolExp | null),_or?: (DefaultComplexityEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "default_complexity_enum". */
export interface DefaultComplexityEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "default_complexity_enum" */
export interface DefaultComplexityEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: DefaultComplexityEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface DefaultComplexityEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** columns and relationships of "default_length_enum" */
export interface DefaultLengthEnumGenqlSelection{
    /** An array relationship */
    chatbots?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "default_length_enum". All fields are combined with a logical 'AND'. */
export interface DefaultLengthEnumBoolExp {_and?: (DefaultLengthEnumBoolExp[] | null),_not?: (DefaultLengthEnumBoolExp | null),_or?: (DefaultLengthEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "default_length_enum". */
export interface DefaultLengthEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "default_length_enum" */
export interface DefaultLengthEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: DefaultLengthEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface DefaultLengthEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** columns and relationships of "default_tone_enum" */
export interface DefaultToneEnumGenqlSelection{
    /** An array relationship */
    chatbots?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "default_tone_enum". All fields are combined with a logical 'AND'. */
export interface DefaultToneEnumBoolExp {_and?: (DefaultToneEnumBoolExp[] | null),_not?: (DefaultToneEnumBoolExp | null),_or?: (DefaultToneEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "default_tone_enum". */
export interface DefaultToneEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "default_tone_enum" */
export interface DefaultToneEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: DefaultToneEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface DefaultToneEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** columns and relationships of "default_type_enum" */
export interface DefaultTypeEnumGenqlSelection{
    /** An array relationship */
    chatbots?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "default_type_enum". All fields are combined with a logical 'AND'. */
export interface DefaultTypeEnumBoolExp {_and?: (DefaultTypeEnumBoolExp[] | null),_not?: (DefaultTypeEnumBoolExp | null),_or?: (DefaultTypeEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "default_type_enum". */
export interface DefaultTypeEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "default_type_enum" */
export interface DefaultTypeEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: DefaultTypeEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface DefaultTypeEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link. */
export interface GptChatGenqlSelection{
    addedBy?: boolean | number
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    conversationLink?: boolean | number
    gptChatId?: boolean | number
    /** An object relationship */
    user?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "gpt_chat" */
export interface GptChatAggregateOrderBy {avg?: (GptChatAvgOrderBy | null),count?: (OrderBy | null),max?: (GptChatMaxOrderBy | null),min?: (GptChatMinOrderBy | null),stddev?: (GptChatStddevOrderBy | null),stddevPop?: (GptChatStddevPopOrderBy | null),stddevSamp?: (GptChatStddevSampOrderBy | null),sum?: (GptChatSumOrderBy | null),varPop?: (GptChatVarPopOrderBy | null),varSamp?: (GptChatVarSampOrderBy | null),variance?: (GptChatVarianceOrderBy | null)}


/** order by avg() on columns of table "gpt_chat" */
export interface GptChatAvgOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "gpt_chat". All fields are combined with a logical 'AND'. */
export interface GptChatBoolExp {_and?: (GptChatBoolExp[] | null),_not?: (GptChatBoolExp | null),_or?: (GptChatBoolExp[] | null),addedBy?: (IntComparisonExp | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),conversationLink?: (StringComparisonExp | null),gptChatId?: (IntComparisonExp | null),user?: (UserBoolExp | null)}


/** order by max() on columns of table "gpt_chat" */
export interface GptChatMaxOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by min() on columns of table "gpt_chat" */
export interface GptChatMinOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** Ordering options when selecting data from "gpt_chat". */
export interface GptChatOrderBy {addedBy?: (OrderBy | null),chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null),gptChatId?: (OrderBy | null),user?: (UserOrderBy | null)}


/** order by stddev() on columns of table "gpt_chat" */
export interface GptChatStddevOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "gpt_chat" */
export interface GptChatStddevPopOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "gpt_chat" */
export interface GptChatStddevSampOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** Streaming cursor of the table "gpt_chat" */
export interface GptChatStreamCursorInput {
/** Stream column input with initial value */
initialValue: GptChatStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface GptChatStreamCursorValueInput {addedBy?: (Scalars['Int'] | null),chatbotId?: (Scalars['Int'] | null),conversationLink?: (Scalars['String'] | null),gptChatId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "gpt_chat" */
export interface GptChatSumOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by varPop() on columns of table "gpt_chat" */
export interface GptChatVarPopOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by varSamp() on columns of table "gpt_chat" */
export interface GptChatVarSampOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** order by variance() on columns of table "gpt_chat" */
export interface GptChatVarianceOrderBy {addedBy?: (OrderBy | null),chatbotId?: (OrderBy | null),gptChatId?: (OrderBy | null)}


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface IntComparisonExp {_eq?: (Scalars['Int'] | null),_gt?: (Scalars['Int'] | null),_gte?: (Scalars['Int'] | null),_in?: (Scalars['Int'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['Int'] | null),_lte?: (Scalars['Int'] | null),_neq?: (Scalars['Int'] | null),_nin?: (Scalars['Int'][] | null)}


/** This table stores the messages exchanged between users and chatbots. */
export interface MessageGenqlSelection{
    content?: boolean | number
    createdAt?: boolean | number
    messageId?: boolean | number
    /** An object relationship */
    message_type_enum?: MessageTypeEnumGenqlSelection
    relatedMessageId?: boolean | number
    /** An object relationship */
    thread?: ThreadGenqlSelection
    threadId?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "message" */
export interface MessageAggregateOrderBy {avg?: (MessageAvgOrderBy | null),count?: (OrderBy | null),max?: (MessageMaxOrderBy | null),min?: (MessageMinOrderBy | null),stddev?: (MessageStddevOrderBy | null),stddevPop?: (MessageStddevPopOrderBy | null),stddevSamp?: (MessageStddevSampOrderBy | null),sum?: (MessageSumOrderBy | null),varPop?: (MessageVarPopOrderBy | null),varSamp?: (MessageVarSampOrderBy | null),variance?: (MessageVarianceOrderBy | null)}


/** order by avg() on columns of table "message" */
export interface MessageAvgOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export interface MessageBoolExp {_and?: (MessageBoolExp[] | null),_not?: (MessageBoolExp | null),_or?: (MessageBoolExp[] | null),content?: (StringComparisonExp | null),createdAt?: (TimestamptzComparisonExp | null),messageId?: (IntComparisonExp | null),message_type_enum?: (MessageTypeEnumBoolExp | null),relatedMessageId?: (IntComparisonExp | null),thread?: (ThreadBoolExp | null),threadId?: (IntComparisonExp | null),type?: (StringComparisonExp | null)}


/** order by max() on columns of table "message" */
export interface MessageMaxOrderBy {content?: (OrderBy | null),createdAt?: (OrderBy | null),messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null),type?: (OrderBy | null)}


/** order by min() on columns of table "message" */
export interface MessageMinOrderBy {content?: (OrderBy | null),createdAt?: (OrderBy | null),messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null),type?: (OrderBy | null)}


/** Ordering options when selecting data from "message". */
export interface MessageOrderBy {content?: (OrderBy | null),createdAt?: (OrderBy | null),messageId?: (OrderBy | null),message_type_enum?: (MessageTypeEnumOrderBy | null),relatedMessageId?: (OrderBy | null),thread?: (ThreadOrderBy | null),threadId?: (OrderBy | null),type?: (OrderBy | null)}


/** order by stddev() on columns of table "message" */
export interface MessageStddevOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "message" */
export interface MessageStddevPopOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "message" */
export interface MessageStddevSampOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** Streaming cursor of the table "message" */
export interface MessageStreamCursorInput {
/** Stream column input with initial value */
initialValue: MessageStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface MessageStreamCursorValueInput {content?: (Scalars['String'] | null),createdAt?: (Scalars['timestamptz'] | null),messageId?: (Scalars['Int'] | null),relatedMessageId?: (Scalars['Int'] | null),threadId?: (Scalars['Int'] | null),type?: (Scalars['String'] | null)}


/** order by sum() on columns of table "message" */
export interface MessageSumOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** columns and relationships of "message_type_enum" */
export interface MessageTypeEnumGenqlSelection{
    /** An array relationship */
    messages?: (MessageGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "message_type_enum". All fields are combined with a logical 'AND'. */
export interface MessageTypeEnumBoolExp {_and?: (MessageTypeEnumBoolExp[] | null),_not?: (MessageTypeEnumBoolExp | null),_or?: (MessageTypeEnumBoolExp[] | null),messages?: (MessageBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "message_type_enum". */
export interface MessageTypeEnumOrderBy {messagesAggregate?: (MessageAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "message_type_enum" */
export interface MessageTypeEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: MessageTypeEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface MessageTypeEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** order by varPop() on columns of table "message" */
export interface MessageVarPopOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** order by varSamp() on columns of table "message" */
export interface MessageVarSampOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** order by variance() on columns of table "message" */
export interface MessageVarianceOrderBy {messageId?: (OrderBy | null),relatedMessageId?: (OrderBy | null),threadId?: (OrderBy | null)}


/** columns and relationships of "prompt" */
export interface PromptGenqlSelection{
    content?: boolean | number
    promptId?: boolean | number
    promptName?: boolean | number
    /** An array relationship */
    prompt_chatbots?: (PromptChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptChatbotBoolExp | null)} })
    /** An object relationship */
    prompt_type_enum?: PromptTypeEnumGenqlSelection
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "prompt" */
export interface PromptAggregateOrderBy {avg?: (PromptAvgOrderBy | null),count?: (OrderBy | null),max?: (PromptMaxOrderBy | null),min?: (PromptMinOrderBy | null),stddev?: (PromptStddevOrderBy | null),stddevPop?: (PromptStddevPopOrderBy | null),stddevSamp?: (PromptStddevSampOrderBy | null),sum?: (PromptSumOrderBy | null),varPop?: (PromptVarPopOrderBy | null),varSamp?: (PromptVarSampOrderBy | null),variance?: (PromptVarianceOrderBy | null)}


/** order by avg() on columns of table "prompt" */
export interface PromptAvgOrderBy {promptId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "prompt". All fields are combined with a logical 'AND'. */
export interface PromptBoolExp {_and?: (PromptBoolExp[] | null),_not?: (PromptBoolExp | null),_or?: (PromptBoolExp[] | null),content?: (StringComparisonExp | null),promptId?: (IntComparisonExp | null),promptName?: (StringComparisonExp | null),prompt_chatbots?: (PromptChatbotBoolExp | null),prompt_type_enum?: (PromptTypeEnumBoolExp | null),type?: (StringComparisonExp | null)}


/** Junction table for prompts/instructions and chatbots. */
export interface PromptChatbotGenqlSelection{
    chabotId?: boolean | number
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    /** An object relationship */
    prompt?: PromptGenqlSelection
    promptId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "prompt_chatbot" */
export interface PromptChatbotAggregateOrderBy {avg?: (PromptChatbotAvgOrderBy | null),count?: (OrderBy | null),max?: (PromptChatbotMaxOrderBy | null),min?: (PromptChatbotMinOrderBy | null),stddev?: (PromptChatbotStddevOrderBy | null),stddevPop?: (PromptChatbotStddevPopOrderBy | null),stddevSamp?: (PromptChatbotStddevSampOrderBy | null),sum?: (PromptChatbotSumOrderBy | null),varPop?: (PromptChatbotVarPopOrderBy | null),varSamp?: (PromptChatbotVarSampOrderBy | null),variance?: (PromptChatbotVarianceOrderBy | null)}


/** order by avg() on columns of table "prompt_chatbot" */
export interface PromptChatbotAvgOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "prompt_chatbot". All fields are combined with a logical 'AND'. */
export interface PromptChatbotBoolExp {_and?: (PromptChatbotBoolExp[] | null),_not?: (PromptChatbotBoolExp | null),_or?: (PromptChatbotBoolExp[] | null),chabotId?: (IntComparisonExp | null),chatbot?: (ChatbotBoolExp | null),prompt?: (PromptBoolExp | null),promptId?: (IntComparisonExp | null)}


/** order by max() on columns of table "prompt_chatbot" */
export interface PromptChatbotMaxOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by min() on columns of table "prompt_chatbot" */
export interface PromptChatbotMinOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** Ordering options when selecting data from "prompt_chatbot". */
export interface PromptChatbotOrderBy {chabotId?: (OrderBy | null),chatbot?: (ChatbotOrderBy | null),prompt?: (PromptOrderBy | null),promptId?: (OrderBy | null)}


/** order by stddev() on columns of table "prompt_chatbot" */
export interface PromptChatbotStddevOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "prompt_chatbot" */
export interface PromptChatbotStddevPopOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "prompt_chatbot" */
export interface PromptChatbotStddevSampOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** Streaming cursor of the table "prompt_chatbot" */
export interface PromptChatbotStreamCursorInput {
/** Stream column input with initial value */
initialValue: PromptChatbotStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface PromptChatbotStreamCursorValueInput {chabotId?: (Scalars['Int'] | null),promptId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "prompt_chatbot" */
export interface PromptChatbotSumOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by varPop() on columns of table "prompt_chatbot" */
export interface PromptChatbotVarPopOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by varSamp() on columns of table "prompt_chatbot" */
export interface PromptChatbotVarSampOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by variance() on columns of table "prompt_chatbot" */
export interface PromptChatbotVarianceOrderBy {chabotId?: (OrderBy | null),promptId?: (OrderBy | null)}


/** order by max() on columns of table "prompt" */
export interface PromptMaxOrderBy {content?: (OrderBy | null),promptId?: (OrderBy | null),promptName?: (OrderBy | null),type?: (OrderBy | null)}


/** order by min() on columns of table "prompt" */
export interface PromptMinOrderBy {content?: (OrderBy | null),promptId?: (OrderBy | null),promptName?: (OrderBy | null),type?: (OrderBy | null)}


/** Ordering options when selecting data from "prompt". */
export interface PromptOrderBy {content?: (OrderBy | null),promptId?: (OrderBy | null),promptName?: (OrderBy | null),prompt_chatbotsAggregate?: (PromptChatbotAggregateOrderBy | null),prompt_type_enum?: (PromptTypeEnumOrderBy | null),type?: (OrderBy | null)}


/** order by stddev() on columns of table "prompt" */
export interface PromptStddevOrderBy {promptId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "prompt" */
export interface PromptStddevPopOrderBy {promptId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "prompt" */
export interface PromptStddevSampOrderBy {promptId?: (OrderBy | null)}


/** Streaming cursor of the table "prompt" */
export interface PromptStreamCursorInput {
/** Stream column input with initial value */
initialValue: PromptStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface PromptStreamCursorValueInput {content?: (Scalars['String'] | null),promptId?: (Scalars['Int'] | null),promptName?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}


/** order by sum() on columns of table "prompt" */
export interface PromptSumOrderBy {promptId?: (OrderBy | null)}


/** columns and relationships of "prompt_type_enum" */
export interface PromptTypeEnumGenqlSelection{
    /** An array relationship */
    prompts?: (PromptGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptBoolExp | null)} })
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "prompt_type_enum". All fields are combined with a logical 'AND'. */
export interface PromptTypeEnumBoolExp {_and?: (PromptTypeEnumBoolExp[] | null),_not?: (PromptTypeEnumBoolExp | null),_or?: (PromptTypeEnumBoolExp[] | null),prompts?: (PromptBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "prompt_type_enum". */
export interface PromptTypeEnumOrderBy {promptsAggregate?: (PromptAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "prompt_type_enum" */
export interface PromptTypeEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: PromptTypeEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface PromptTypeEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** order by varPop() on columns of table "prompt" */
export interface PromptVarPopOrderBy {promptId?: (OrderBy | null)}


/** order by varSamp() on columns of table "prompt" */
export interface PromptVarSampOrderBy {promptId?: (OrderBy | null)}


/** order by variance() on columns of table "prompt" */
export interface PromptVarianceOrderBy {promptId?: (OrderBy | null)}


/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface StringComparisonExp {_eq?: (Scalars['String'] | null),_gt?: (Scalars['String'] | null),_gte?: (Scalars['String'] | null),
/** does the column match the given case-insensitive pattern */
_ilike?: (Scalars['String'] | null),_in?: (Scalars['String'][] | null),
/** does the column match the given POSIX regular expression, case insensitive */
_iregex?: (Scalars['String'] | null),_isNull?: (Scalars['Boolean'] | null),
/** does the column match the given pattern */
_like?: (Scalars['String'] | null),_lt?: (Scalars['String'] | null),_lte?: (Scalars['String'] | null),_neq?: (Scalars['String'] | null),
/** does the column NOT match the given case-insensitive pattern */
_nilike?: (Scalars['String'] | null),_nin?: (Scalars['String'][] | null),
/** does the column NOT match the given POSIX regular expression, case insensitive */
_niregex?: (Scalars['String'] | null),
/** does the column NOT match the given pattern */
_nlike?: (Scalars['String'] | null),
/** does the column NOT match the given POSIX regular expression, case sensitive */
_nregex?: (Scalars['String'] | null),
/** does the column NOT match the given SQL regular expression */
_nsimilar?: (Scalars['String'] | null),
/** does the column match the given POSIX regular expression, case sensitive */
_regex?: (Scalars['String'] | null),
/** does the column match the given SQL regular expression */
_similar?: (Scalars['String'] | null)}


/** columns and relationships of "thread" */
export interface ThreadGenqlSelection{
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    createdAt?: boolean | number
    /** An array relationship */
    messages?: (MessageGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageBoolExp | null)} })
    threadId?: boolean | number
    updatedAt?: boolean | number
    /** An object relationship */
    user?: UserGenqlSelection
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "thread" */
export interface ThreadAggregateOrderBy {avg?: (ThreadAvgOrderBy | null),count?: (OrderBy | null),max?: (ThreadMaxOrderBy | null),min?: (ThreadMinOrderBy | null),stddev?: (ThreadStddevOrderBy | null),stddevPop?: (ThreadStddevPopOrderBy | null),stddevSamp?: (ThreadStddevSampOrderBy | null),sum?: (ThreadSumOrderBy | null),varPop?: (ThreadVarPopOrderBy | null),varSamp?: (ThreadVarSampOrderBy | null),variance?: (ThreadVarianceOrderBy | null)}


/** order by avg() on columns of table "thread" */
export interface ThreadAvgOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "thread". All fields are combined with a logical 'AND'. */
export interface ThreadBoolExp {_and?: (ThreadBoolExp[] | null),_not?: (ThreadBoolExp | null),_or?: (ThreadBoolExp[] | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),createdAt?: (TimestamptzComparisonExp | null),messages?: (MessageBoolExp | null),threadId?: (IntComparisonExp | null),updatedAt?: (TimestamptzComparisonExp | null),user?: (UserBoolExp | null),userId?: (IntComparisonExp | null)}


/** order by max() on columns of table "thread" */
export interface ThreadMaxOrderBy {chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by min() on columns of table "thread" */
export interface ThreadMinOrderBy {chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),userId?: (OrderBy | null)}


/** Ordering options when selecting data from "thread". */
export interface ThreadOrderBy {chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),messagesAggregate?: (MessageAggregateOrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),user?: (UserOrderBy | null),userId?: (OrderBy | null)}


/** order by stddev() on columns of table "thread" */
export interface ThreadStddevOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "thread" */
export interface ThreadStddevPopOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "thread" */
export interface ThreadStddevSampOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Streaming cursor of the table "thread" */
export interface ThreadStreamCursorInput {
/** Stream column input with initial value */
initialValue: ThreadStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ThreadStreamCursorValueInput {chatbotId?: (Scalars['Int'] | null),createdAt?: (Scalars['timestamptz'] | null),threadId?: (Scalars['Int'] | null),updatedAt?: (Scalars['timestamptz'] | null),userId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "thread" */
export interface ThreadSumOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by varPop() on columns of table "thread" */
export interface ThreadVarPopOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by varSamp() on columns of table "thread" */
export interface ThreadVarSampOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by variance() on columns of table "thread" */
export interface ThreadVarianceOrderBy {chatbotId?: (OrderBy | null),threadId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface TimestamptzComparisonExp {_eq?: (Scalars['timestamptz'] | null),_gt?: (Scalars['timestamptz'] | null),_gte?: (Scalars['timestamptz'] | null),_in?: (Scalars['timestamptz'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamptz'] | null),_lte?: (Scalars['timestamptz'] | null),_neq?: (Scalars['timestamptz'] | null),_nin?: (Scalars['timestamptz'][] | null)}


/** Table storing information about registered users. */
export interface UserGenqlSelection{
    dateJoined?: boolean | number
    email?: boolean | number
    /** An array relationship */
    gpt_chats?: (GptChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (GptChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (GptChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (GptChatBoolExp | null)} })
    lastLogin?: boolean | number
    password?: boolean | number
    profilePicture?: boolean | number
    /** An array relationship */
    threads?: (ThreadGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ThreadSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ThreadOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ThreadBoolExp | null)} })
    userId?: boolean | number
    /** An array relationship */
    user_chatbot_preferences?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export interface UserBoolExp {_and?: (UserBoolExp[] | null),_not?: (UserBoolExp | null),_or?: (UserBoolExp[] | null),dateJoined?: (TimestamptzComparisonExp | null),email?: (StringComparisonExp | null),gpt_chats?: (GptChatBoolExp | null),lastLogin?: (TimestamptzComparisonExp | null),password?: (StringComparisonExp | null),profilePicture?: (StringComparisonExp | null),threads?: (ThreadBoolExp | null),userId?: (IntComparisonExp | null),user_chatbot_preferences?: (UserChatbotPreferenceBoolExp | null),username?: (StringComparisonExp | null)}


/** This table stores user-specific preferences for quick access when they interact with a chatbot. */
export interface UserChatbotPreferenceGenqlSelection{
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    /** An object relationship */
    default_complexity_enum?: DefaultComplexityEnumGenqlSelection
    /** An object relationship */
    default_length_enum?: DefaultLengthEnumGenqlSelection
    /** An object relationship */
    default_tone_enum?: DefaultToneEnumGenqlSelection
    /** An object relationship */
    default_type_enum?: DefaultTypeEnumGenqlSelection
    favorite?: boolean | number
    preferenceId?: boolean | number
    preferredComplexity?: boolean | number
    preferredLength?: boolean | number
    preferredTone?: boolean | number
    preferredType?: boolean | number
    /** An object relationship */
    user?: UserGenqlSelection
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "user_chatbot_preference" */
export interface UserChatbotPreferenceAggregateOrderBy {avg?: (UserChatbotPreferenceAvgOrderBy | null),count?: (OrderBy | null),max?: (UserChatbotPreferenceMaxOrderBy | null),min?: (UserChatbotPreferenceMinOrderBy | null),stddev?: (UserChatbotPreferenceStddevOrderBy | null),stddevPop?: (UserChatbotPreferenceStddevPopOrderBy | null),stddevSamp?: (UserChatbotPreferenceStddevSampOrderBy | null),sum?: (UserChatbotPreferenceSumOrderBy | null),varPop?: (UserChatbotPreferenceVarPopOrderBy | null),varSamp?: (UserChatbotPreferenceVarSampOrderBy | null),variance?: (UserChatbotPreferenceVarianceOrderBy | null)}


/** order by avg() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceAvgOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "user_chatbot_preference". All fields are combined with a logical 'AND'. */
export interface UserChatbotPreferenceBoolExp {_and?: (UserChatbotPreferenceBoolExp[] | null),_not?: (UserChatbotPreferenceBoolExp | null),_or?: (UserChatbotPreferenceBoolExp[] | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),default_complexity_enum?: (DefaultComplexityEnumBoolExp | null),default_length_enum?: (DefaultLengthEnumBoolExp | null),default_tone_enum?: (DefaultToneEnumBoolExp | null),default_type_enum?: (DefaultTypeEnumBoolExp | null),favorite?: (BooleanComparisonExp | null),preferenceId?: (IntComparisonExp | null),preferredComplexity?: (StringComparisonExp | null),preferredLength?: (StringComparisonExp | null),preferredTone?: (StringComparisonExp | null),preferredType?: (StringComparisonExp | null),user?: (UserBoolExp | null),userId?: (IntComparisonExp | null)}


/** order by max() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceMaxOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),preferredComplexity?: (OrderBy | null),preferredLength?: (OrderBy | null),preferredTone?: (OrderBy | null),preferredType?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by min() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceMinOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),preferredComplexity?: (OrderBy | null),preferredLength?: (OrderBy | null),preferredTone?: (OrderBy | null),preferredType?: (OrderBy | null),userId?: (OrderBy | null)}


/** Ordering options when selecting data from "user_chatbot_preference". */
export interface UserChatbotPreferenceOrderBy {chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),default_complexity_enum?: (DefaultComplexityEnumOrderBy | null),default_length_enum?: (DefaultLengthEnumOrderBy | null),default_tone_enum?: (DefaultToneEnumOrderBy | null),default_type_enum?: (DefaultTypeEnumOrderBy | null),favorite?: (OrderBy | null),preferenceId?: (OrderBy | null),preferredComplexity?: (OrderBy | null),preferredLength?: (OrderBy | null),preferredTone?: (OrderBy | null),preferredType?: (OrderBy | null),user?: (UserOrderBy | null),userId?: (OrderBy | null)}


/** order by stddev() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceStddevOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceStddevPopOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceStddevSampOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Streaming cursor of the table "user_chatbot_preference" */
export interface UserChatbotPreferenceStreamCursorInput {
/** Stream column input with initial value */
initialValue: UserChatbotPreferenceStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface UserChatbotPreferenceStreamCursorValueInput {chatbotId?: (Scalars['Int'] | null),favorite?: (Scalars['Boolean'] | null),preferenceId?: (Scalars['Int'] | null),preferredComplexity?: (Scalars['String'] | null),preferredLength?: (Scalars['String'] | null),preferredTone?: (Scalars['String'] | null),preferredType?: (Scalars['String'] | null),userId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceSumOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by varPop() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceVarPopOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by varSamp() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceVarSampOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by variance() on columns of table "user_chatbot_preference" */
export interface UserChatbotPreferenceVarianceOrderBy {chatbotId?: (OrderBy | null),preferenceId?: (OrderBy | null),userId?: (OrderBy | null)}


/** Ordering options when selecting data from "user". */
export interface UserOrderBy {dateJoined?: (OrderBy | null),email?: (OrderBy | null),gpt_chatsAggregate?: (GptChatAggregateOrderBy | null),lastLogin?: (OrderBy | null),password?: (OrderBy | null),profilePicture?: (OrderBy | null),threadsAggregate?: (ThreadAggregateOrderBy | null),userId?: (OrderBy | null),user_chatbot_preferencesAggregate?: (UserChatbotPreferenceAggregateOrderBy | null),username?: (OrderBy | null)}


/** Streaming cursor of the table "user" */
export interface UserStreamCursorInput {
/** Stream column input with initial value */
initialValue: UserStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface UserStreamCursorValueInput {dateJoined?: (Scalars['timestamptz'] | null),email?: (Scalars['String'] | null),lastLogin?: (Scalars['timestamptz'] | null),password?: (Scalars['String'] | null),profilePicture?: (Scalars['String'] | null),userId?: (Scalars['Int'] | null),username?: (Scalars['String'] | null)}

export interface query_rootGenqlSelection{
    /** fetch data from the table: "category" */
    category?: (CategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (CategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (CategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (CategoryBoolExp | null)} })
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk?: (CategoryGenqlSelection & { __args: {categoryId: Scalars['Int']} })
    /** fetch data from the table: "chatbot" */
    chatbot?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** fetch data from the table: "chatbot" using primary key columns */
    chatbotByPk?: (ChatbotGenqlSelection & { __args: {chatbotId: Scalars['Int']} })
    /** fetch data from the table: "chatbot_category" */
    chatbotCategory?: (ChatbotCategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotCategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotCategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotCategoryBoolExp | null)} })
    /** fetch data from the table: "chatbot_category" using primary key columns */
    chatbotCategoryByPk?: (ChatbotCategoryGenqlSelection & { __args: {categoryId: Scalars['Int'], chatbotId: Scalars['Int']} })
    /** fetch data from the table: "default_complexity_enum" */
    defaultComplexityEnum?: (DefaultComplexityEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultComplexityEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultComplexityEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "default_complexity_enum" using primary key columns */
    defaultComplexityEnumByPk?: (DefaultComplexityEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "default_length_enum" */
    defaultLengthEnum?: (DefaultLengthEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultLengthEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultLengthEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultLengthEnumBoolExp | null)} })
    /** fetch data from the table: "default_length_enum" using primary key columns */
    defaultLengthEnumByPk?: (DefaultLengthEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "default_tone_enum" */
    defaultToneEnum?: (DefaultToneEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultToneEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultToneEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultToneEnumBoolExp | null)} })
    /** fetch data from the table: "default_tone_enum" using primary key columns */
    defaultToneEnumByPk?: (DefaultToneEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "default_type_enum" */
    defaultTypeEnum?: (DefaultTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultTypeEnumBoolExp | null)} })
    /** fetch data from the table: "default_type_enum" using primary key columns */
    defaultTypeEnumByPk?: (DefaultTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "gpt_chat" */
    gptChat?: (GptChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (GptChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (GptChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (GptChatBoolExp | null)} })
    /** fetch data from the table: "gpt_chat" using primary key columns */
    gptChatByPk?: (GptChatGenqlSelection & { __args: {gptChatId: Scalars['Int']} })
    /** fetch data from the table: "message" */
    message?: (MessageGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageBoolExp | null)} })
    /** fetch data from the table: "message" using primary key columns */
    messageByPk?: (MessageGenqlSelection & { __args: {messageId: Scalars['Int']} })
    /** fetch data from the table: "message_type_enum" */
    messageTypeEnum?: (MessageTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageTypeEnumBoolExp | null)} })
    /** fetch data from the table: "message_type_enum" using primary key columns */
    messageTypeEnumByPk?: (MessageTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "prompt" */
    prompt?: (PromptGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptBoolExp | null)} })
    /** fetch data from the table: "prompt" using primary key columns */
    promptByPk?: (PromptGenqlSelection & { __args: {promptId: Scalars['Int']} })
    /** fetch data from the table: "prompt_chatbot" */
    promptChatbot?: (PromptChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptChatbotBoolExp | null)} })
    /** fetch data from the table: "prompt_chatbot" using primary key columns */
    promptChatbotByPk?: (PromptChatbotGenqlSelection & { __args: {chabotId: Scalars['Int'], promptId: Scalars['Int']} })
    /** fetch data from the table: "prompt_type_enum" */
    promptTypeEnum?: (PromptTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptTypeEnumBoolExp | null)} })
    /** fetch data from the table: "prompt_type_enum" using primary key columns */
    promptTypeEnumByPk?: (PromptTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "thread" */
    thread?: (ThreadGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ThreadSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ThreadOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ThreadBoolExp | null)} })
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk?: (ThreadGenqlSelection & { __args: {threadId: Scalars['Int']} })
    /** fetch data from the table: "user" */
    user?: (UserGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserBoolExp | null)} })
    /** fetch data from the table: "user" using primary key columns */
    userByPk?: (UserGenqlSelection & { __args: {userId: Scalars['Int']} })
    /** fetch data from the table: "user_chatbot_preference" */
    userChatbotPreference?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    /** fetch data from the table: "user_chatbot_preference" using primary key columns */
    userChatbotPreferenceByPk?: (UserChatbotPreferenceGenqlSelection & { __args: {preferenceId: Scalars['Int']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface subscription_rootGenqlSelection{
    /** fetch data from the table: "category" */
    category?: (CategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (CategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (CategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (CategoryBoolExp | null)} })
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk?: (CategoryGenqlSelection & { __args: {categoryId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "category" */
    categoryStream?: (CategoryGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (CategoryStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (CategoryBoolExp | null)} })
    /** fetch data from the table: "chatbot" */
    chatbot?: (ChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** fetch data from the table: "chatbot" using primary key columns */
    chatbotByPk?: (ChatbotGenqlSelection & { __args: {chatbotId: Scalars['Int']} })
    /** fetch data from the table: "chatbot_category" */
    chatbotCategory?: (ChatbotCategoryGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatbotCategorySelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatbotCategoryOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatbotCategoryBoolExp | null)} })
    /** fetch data from the table: "chatbot_category" using primary key columns */
    chatbotCategoryByPk?: (ChatbotCategoryGenqlSelection & { __args: {categoryId: Scalars['Int'], chatbotId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "chatbot_category" */
    chatbotCategoryStream?: (ChatbotCategoryGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ChatbotCategoryStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ChatbotCategoryBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "chatbot" */
    chatbotStream?: (ChatbotGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ChatbotStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ChatbotBoolExp | null)} })
    /** fetch data from the table: "default_complexity_enum" */
    defaultComplexityEnum?: (DefaultComplexityEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultComplexityEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultComplexityEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "default_complexity_enum" using primary key columns */
    defaultComplexityEnumByPk?: (DefaultComplexityEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "default_complexity_enum" */
    defaultComplexityEnumStream?: (DefaultComplexityEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (DefaultComplexityEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (DefaultComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "default_length_enum" */
    defaultLengthEnum?: (DefaultLengthEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultLengthEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultLengthEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultLengthEnumBoolExp | null)} })
    /** fetch data from the table: "default_length_enum" using primary key columns */
    defaultLengthEnumByPk?: (DefaultLengthEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "default_length_enum" */
    defaultLengthEnumStream?: (DefaultLengthEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (DefaultLengthEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (DefaultLengthEnumBoolExp | null)} })
    /** fetch data from the table: "default_tone_enum" */
    defaultToneEnum?: (DefaultToneEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultToneEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultToneEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultToneEnumBoolExp | null)} })
    /** fetch data from the table: "default_tone_enum" using primary key columns */
    defaultToneEnumByPk?: (DefaultToneEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "default_tone_enum" */
    defaultToneEnumStream?: (DefaultToneEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (DefaultToneEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (DefaultToneEnumBoolExp | null)} })
    /** fetch data from the table: "default_type_enum" */
    defaultTypeEnum?: (DefaultTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DefaultTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DefaultTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DefaultTypeEnumBoolExp | null)} })
    /** fetch data from the table: "default_type_enum" using primary key columns */
    defaultTypeEnumByPk?: (DefaultTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "default_type_enum" */
    defaultTypeEnumStream?: (DefaultTypeEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (DefaultTypeEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (DefaultTypeEnumBoolExp | null)} })
    /** fetch data from the table: "gpt_chat" */
    gptChat?: (GptChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (GptChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (GptChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (GptChatBoolExp | null)} })
    /** fetch data from the table: "gpt_chat" using primary key columns */
    gptChatByPk?: (GptChatGenqlSelection & { __args: {gptChatId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "gpt_chat" */
    gptChatStream?: (GptChatGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (GptChatStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (GptChatBoolExp | null)} })
    /** fetch data from the table: "message" */
    message?: (MessageGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageBoolExp | null)} })
    /** fetch data from the table: "message" using primary key columns */
    messageByPk?: (MessageGenqlSelection & { __args: {messageId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "message" */
    messageStream?: (MessageGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (MessageStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (MessageBoolExp | null)} })
    /** fetch data from the table: "message_type_enum" */
    messageTypeEnum?: (MessageTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (MessageTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (MessageTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (MessageTypeEnumBoolExp | null)} })
    /** fetch data from the table: "message_type_enum" using primary key columns */
    messageTypeEnumByPk?: (MessageTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "message_type_enum" */
    messageTypeEnumStream?: (MessageTypeEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (MessageTypeEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (MessageTypeEnumBoolExp | null)} })
    /** fetch data from the table: "prompt" */
    prompt?: (PromptGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptBoolExp | null)} })
    /** fetch data from the table: "prompt" using primary key columns */
    promptByPk?: (PromptGenqlSelection & { __args: {promptId: Scalars['Int']} })
    /** fetch data from the table: "prompt_chatbot" */
    promptChatbot?: (PromptChatbotGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptChatbotSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptChatbotOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptChatbotBoolExp | null)} })
    /** fetch data from the table: "prompt_chatbot" using primary key columns */
    promptChatbotByPk?: (PromptChatbotGenqlSelection & { __args: {chabotId: Scalars['Int'], promptId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "prompt_chatbot" */
    promptChatbotStream?: (PromptChatbotGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (PromptChatbotStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (PromptChatbotBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "prompt" */
    promptStream?: (PromptGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (PromptStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (PromptBoolExp | null)} })
    /** fetch data from the table: "prompt_type_enum" */
    promptTypeEnum?: (PromptTypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (PromptTypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (PromptTypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (PromptTypeEnumBoolExp | null)} })
    /** fetch data from the table: "prompt_type_enum" using primary key columns */
    promptTypeEnumByPk?: (PromptTypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "prompt_type_enum" */
    promptTypeEnumStream?: (PromptTypeEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (PromptTypeEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (PromptTypeEnumBoolExp | null)} })
    /** fetch data from the table: "thread" */
    thread?: (ThreadGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ThreadSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ThreadOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ThreadBoolExp | null)} })
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk?: (ThreadGenqlSelection & { __args: {threadId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "thread" */
    threadStream?: (ThreadGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ThreadStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ThreadBoolExp | null)} })
    /** fetch data from the table: "user" */
    user?: (UserGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserBoolExp | null)} })
    /** fetch data from the table: "user" using primary key columns */
    userByPk?: (UserGenqlSelection & { __args: {userId: Scalars['Int']} })
    /** fetch data from the table: "user_chatbot_preference" */
    userChatbotPreference?: (UserChatbotPreferenceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (UserChatbotPreferenceSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (UserChatbotPreferenceOrderBy[] | null), 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    /** fetch data from the table: "user_chatbot_preference" using primary key columns */
    userChatbotPreferenceByPk?: (UserChatbotPreferenceGenqlSelection & { __args: {preferenceId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "user_chatbot_preference" */
    userChatbotPreferenceStream?: (UserChatbotPreferenceGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (UserChatbotPreferenceStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (UserChatbotPreferenceBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "user" */
    userStream?: (UserGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (UserStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (UserBoolExp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export type QueryGenqlSelection = query_rootGenqlSelection
export type SubscriptionGenqlSelection = subscription_rootGenqlSelection


    const Category_possibleTypes: string[] = ['Category']
    export const isCategory = (obj?: { __typename?: any } | null): obj is Category => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategory"')
      return Category_possibleTypes.includes(obj.__typename)
    }
    


    const Chatbot_possibleTypes: string[] = ['Chatbot']
    export const isChatbot = (obj?: { __typename?: any } | null): obj is Chatbot => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChatbot"')
      return Chatbot_possibleTypes.includes(obj.__typename)
    }
    


    const ChatbotCategory_possibleTypes: string[] = ['ChatbotCategory']
    export const isChatbotCategory = (obj?: { __typename?: any } | null): obj is ChatbotCategory => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChatbotCategory"')
      return ChatbotCategory_possibleTypes.includes(obj.__typename)
    }
    


    const DefaultComplexityEnum_possibleTypes: string[] = ['DefaultComplexityEnum']
    export const isDefaultComplexityEnum = (obj?: { __typename?: any } | null): obj is DefaultComplexityEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDefaultComplexityEnum"')
      return DefaultComplexityEnum_possibleTypes.includes(obj.__typename)
    }
    


    const DefaultLengthEnum_possibleTypes: string[] = ['DefaultLengthEnum']
    export const isDefaultLengthEnum = (obj?: { __typename?: any } | null): obj is DefaultLengthEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDefaultLengthEnum"')
      return DefaultLengthEnum_possibleTypes.includes(obj.__typename)
    }
    


    const DefaultToneEnum_possibleTypes: string[] = ['DefaultToneEnum']
    export const isDefaultToneEnum = (obj?: { __typename?: any } | null): obj is DefaultToneEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDefaultToneEnum"')
      return DefaultToneEnum_possibleTypes.includes(obj.__typename)
    }
    


    const DefaultTypeEnum_possibleTypes: string[] = ['DefaultTypeEnum']
    export const isDefaultTypeEnum = (obj?: { __typename?: any } | null): obj is DefaultTypeEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDefaultTypeEnum"')
      return DefaultTypeEnum_possibleTypes.includes(obj.__typename)
    }
    


    const GptChat_possibleTypes: string[] = ['GptChat']
    export const isGptChat = (obj?: { __typename?: any } | null): obj is GptChat => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGptChat"')
      return GptChat_possibleTypes.includes(obj.__typename)
    }
    


    const Message_possibleTypes: string[] = ['Message']
    export const isMessage = (obj?: { __typename?: any } | null): obj is Message => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMessage"')
      return Message_possibleTypes.includes(obj.__typename)
    }
    


    const MessageTypeEnum_possibleTypes: string[] = ['MessageTypeEnum']
    export const isMessageTypeEnum = (obj?: { __typename?: any } | null): obj is MessageTypeEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMessageTypeEnum"')
      return MessageTypeEnum_possibleTypes.includes(obj.__typename)
    }
    


    const Prompt_possibleTypes: string[] = ['Prompt']
    export const isPrompt = (obj?: { __typename?: any } | null): obj is Prompt => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPrompt"')
      return Prompt_possibleTypes.includes(obj.__typename)
    }
    


    const PromptChatbot_possibleTypes: string[] = ['PromptChatbot']
    export const isPromptChatbot = (obj?: { __typename?: any } | null): obj is PromptChatbot => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPromptChatbot"')
      return PromptChatbot_possibleTypes.includes(obj.__typename)
    }
    


    const PromptTypeEnum_possibleTypes: string[] = ['PromptTypeEnum']
    export const isPromptTypeEnum = (obj?: { __typename?: any } | null): obj is PromptTypeEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPromptTypeEnum"')
      return PromptTypeEnum_possibleTypes.includes(obj.__typename)
    }
    


    const Thread_possibleTypes: string[] = ['Thread']
    export const isThread = (obj?: { __typename?: any } | null): obj is Thread => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThread"')
      return Thread_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    


    const UserChatbotPreference_possibleTypes: string[] = ['UserChatbotPreference']
    export const isUserChatbotPreference = (obj?: { __typename?: any } | null): obj is UserChatbotPreference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUserChatbotPreference"')
      return UserChatbotPreference_possibleTypes.includes(obj.__typename)
    }
    


    const query_root_possibleTypes: string[] = ['query_root']
    export const isquery_root = (obj?: { __typename?: any } | null): obj is query_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isquery_root"')
      return query_root_possibleTypes.includes(obj.__typename)
    }
    


    const subscription_root_possibleTypes: string[] = ['subscription_root']
    export const issubscription_root = (obj?: { __typename?: any } | null): obj is subscription_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issubscription_root"')
      return subscription_root_possibleTypes.includes(obj.__typename)
    }
    

export const enumCategorySelectColumn = {
   categoryId: 'categoryId' as const,
   name: 'name' as const
}

export const enumChatbotCategorySelectColumn = {
   categoryId: 'categoryId' as const,
   chatbotId: 'chatbotId' as const
}

export const enumChatbotSelectColumn = {
   avatar: 'avatar' as const,
   chatbotId: 'chatbotId' as const,
   createdBy: 'createdBy' as const,
   defaultComplexity: 'defaultComplexity' as const,
   defaultLength: 'defaultLength' as const,
   defaultTone: 'defaultTone' as const,
   defaultType: 'defaultType' as const,
   description: 'description' as const,
   name: 'name' as const
}

export const enumCursorOrdering = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumDefaultComplexityEnumSelectColumn = {
   value: 'value' as const
}

export const enumDefaultLengthEnumSelectColumn = {
   value: 'value' as const
}

export const enumDefaultToneEnumSelectColumn = {
   value: 'value' as const
}

export const enumDefaultTypeEnumSelectColumn = {
   value: 'value' as const
}

export const enumGptChatSelectColumn = {
   addedBy: 'addedBy' as const,
   chatbotId: 'chatbotId' as const,
   conversationLink: 'conversationLink' as const,
   gptChatId: 'gptChatId' as const
}

export const enumMessageSelectColumn = {
   content: 'content' as const,
   createdAt: 'createdAt' as const,
   messageId: 'messageId' as const,
   relatedMessageId: 'relatedMessageId' as const,
   threadId: 'threadId' as const,
   type: 'type' as const
}

export const enumMessageTypeEnumSelectColumn = {
   value: 'value' as const
}

export const enumOrderBy = {
   ASC: 'ASC' as const,
   ASC_NULLS_FIRST: 'ASC_NULLS_FIRST' as const,
   ASC_NULLS_LAST: 'ASC_NULLS_LAST' as const,
   DESC: 'DESC' as const,
   DESC_NULLS_FIRST: 'DESC_NULLS_FIRST' as const,
   DESC_NULLS_LAST: 'DESC_NULLS_LAST' as const
}

export const enumPromptChatbotSelectColumn = {
   chabotId: 'chabotId' as const,
   promptId: 'promptId' as const
}

export const enumPromptSelectColumn = {
   content: 'content' as const,
   promptId: 'promptId' as const,
   promptName: 'promptName' as const,
   type: 'type' as const
}

export const enumPromptTypeEnumSelectColumn = {
   value: 'value' as const
}

export const enumThreadSelectColumn = {
   chatbotId: 'chatbotId' as const,
   createdAt: 'createdAt' as const,
   threadId: 'threadId' as const,
   updatedAt: 'updatedAt' as const,
   userId: 'userId' as const
}

export const enumUserChatbotPreferenceSelectColumn = {
   chatbotId: 'chatbotId' as const,
   favorite: 'favorite' as const,
   preferenceId: 'preferenceId' as const,
   preferredComplexity: 'preferredComplexity' as const,
   preferredLength: 'preferredLength' as const,
   preferredTone: 'preferredTone' as const,
   preferredType: 'preferredType' as const,
   userId: 'userId' as const
}

export const enumUserSelectColumn = {
   dateJoined: 'dateJoined' as const,
   email: 'email' as const,
   lastLogin: 'lastLogin' as const,
   password: 'password' as const,
   profilePicture: 'profilePicture' as const,
   userId: 'userId' as const,
   username: 'username' as const
}
