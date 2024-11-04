// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    Int: number,
    String: string,
    jsonb: any,
    numeric: any,
    timestamptz: any,
    uuid: any,
}


/** Table to store different categories for chatbots. */
export interface Category {
    categoryId: Scalars['Int']
    /** An array relationship */
    chatbots: ChatbotCategory[]
    /** An array relationship */
    metadataLabels: LabelChatbotCategoryDomain[]
    name: Scalars['String']
    __typename: 'Category'
}


/** columns and relationships of "category_enum" */
export interface CategoryEnum {
    added: Scalars['timestamptz']
    domain: Scalars['String']
    /** An object relationship */
    domain_enum: DomainEnum
    name: Scalars['String']
    /** An array relationship */
    subcategory_enums: SubcategoryEnum[]
    __typename: 'CategoryEnum'
}


/** select columns of table "category_enum" */
export type CategoryEnumSelectColumn = 'added' | 'domain' | 'name'


/** select columns of table "category" */
export type CategorySelectColumn = 'categoryId' | 'name'


/** Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link. */
export interface Chat {
    addedBy: (Scalars['uuid'] | null)
    chatId: Scalars['Int']
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    conversationLink: Scalars['String']
    /** An object relationship */
    user: (User | null)
    __typename: 'Chat'
}


/** select columns of table "chat" */
export type ChatSelectColumn = 'addedBy' | 'chatId' | 'chatbotId' | 'conversationLink'


/** Table storing information about chatbots, their characteristics, and default settings. */
export interface Chatbot {
    avatar: (Scalars['String'] | null)
    /** An array relationship */
    categories: ChatbotCategory[]
    chatbotId: Scalars['Int']
    /** An array relationship */
    chats: Chat[]
    /** An object relationship */
    complexityEnum: (ComplexityEnum | null)
    createdBy: Scalars['String']
    defaultComplexity: (Scalars['String'] | null)
    defaultLength: (Scalars['String'] | null)
    defaultTone: (Scalars['String'] | null)
    defaultType: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    /** An object relationship */
    lengthEnum: (LengthEnum | null)
    /** An array relationship */
    metadataLabels: LabelChatbotCategoryDomain[]
    name: Scalars['String']
    /** An array relationship */
    prompts: PromptChatbot[]
    /** An array relationship */
    threads: Thread[]
    /** An object relationship */
    toneEnum: (ToneEnum | null)
    /** An object relationship */
    typeEnum: (TypeEnum | null)
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


/** columns and relationships of "complexity_enum" */
export interface ComplexityEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    value: Scalars['String']
    __typename: 'ComplexityEnum'
}


/** select columns of table "complexity_enum" */
export type ComplexityEnumSelectColumn = 'value'


/** ordering argument of a cursor */
export type CursorOrdering = 'ASC' | 'DESC'


/** columns and relationships of "domain_enum" */
export interface DomainEnum {
    added: (Scalars['timestamptz'] | null)
    /** An array relationship */
    category_enums: CategoryEnum[]
    /** An array relationship */
    label_chatbot_category_domains: LabelChatbotCategoryDomain[]
    name: Scalars['String']
    /** An array relationship */
    tag_enums: TagEnum[]
    __typename: 'DomainEnum'
}


/** select columns of table "domain_enum" */
export type DomainEnumSelectColumn = 'added' | 'name'


/** columns and relationships of "example" */
export interface Example {
    added: Scalars['timestamptz']
    category: Scalars['String']
    domain: Scalars['String']
    exampleId: Scalars['uuid']
    metadata: Scalars['jsonb']
    prompt: Scalars['String']
    response: Scalars['String']
    subcategory: Scalars['String']
    /** An object relationship */
    subcategory_enum: SubcategoryEnum
    tags: Scalars['uuid'][]
    __typename: 'Example'
}


/** select columns of table "example" */
export type ExampleSelectColumn = 'added' | 'category' | 'domain' | 'exampleId' | 'metadata' | 'prompt' | 'response' | 'subcategory' | 'tags'


/** Labels for chatbots (e.g.: domain, category, sub-category, tags  */
export interface Label {
    advancedLabels: Scalars['Boolean']
    categories: Scalars['String']
    labelId: Scalars['Int']
    /** An array relationship */
    metadataLabels: LabelChatbotCategoryDomain[]
    questions: Scalars['String']
    subCategories: Scalars['String']
    tags: Scalars['String']
    __typename: 'Label'
}


/** Junction table to connect between Label, Chatbot, Categories, and Domains tables. */
export interface LabelChatbotCategoryDomain {
    /** An object relationship */
    category: Category
    categoryId: Scalars['Int']
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    /** An object relationship */
    domain_enum: DomainEnum
    /** An object relationship */
    label: Label
    labelId: Scalars['Int']
    __typename: 'LabelChatbotCategoryDomain'
}


/** select columns of table "label_chatbot_category_domain" */
export type LabelChatbotCategoryDomainSelectColumn = 'categoryId' | 'chatbotId' | 'labelId'


/** select columns of table "label" */
export type LabelSelectColumn = 'advancedLabels' | 'categories' | 'labelId' | 'questions' | 'subCategories' | 'tags'


/** columns and relationships of "length_enum" */
export interface LengthEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    value: Scalars['String']
    __typename: 'LengthEnum'
}


/** select columns of table "length_enum" */
export type LengthEnumSelectColumn = 'value'


/** This table stores the messages exchanged between users and chatbots. */
export interface Message {
    augmentedFrom: (Scalars['uuid'] | null)
    content: Scalars['String']
    createdAt: Scalars['timestamptz']
    examples: (Scalars['jsonb'] | null)
    messageId: Scalars['uuid']
    /** An object relationship */
    messageTypeEnum: MessageTypeEnum
    prompt: (Scalars['String'] | null)
    role: Scalars['String']
    /** An object relationship */
    thread: (Thread | null)
    threadId: (Scalars['uuid'] | null)
    __typename: 'Message'
}


/** select columns of table "message" */
export type MessageSelectColumn = 'augmentedFrom' | 'content' | 'createdAt' | 'examples' | 'messageId' | 'prompt' | 'role' | 'threadId'


/** columns and relationships of "message_type_enum" */
export interface MessageTypeEnum {
    /** An array relationship */
    messages: Message[]
    value: Scalars['String']
    __typename: 'MessageTypeEnum'
}


/** select columns of table "message_type_enum" */
export type MessageTypeEnumSelectColumn = 'value'


/** columns and relationships of "models_enum" */
export interface ModelsEnum {
    name: Scalars['String']
    /** An array relationship */
    threads: Thread[]
    value: Scalars['String']
    __typename: 'ModelsEnum'
}

export type ModelsEnumEnum = 'ANTHROPIC' | 'OPENAI' | 'PERPLEXITY' | 'WORDWARE'


/** select columns of table "models_enum" */
export type ModelsEnumSelectColumn = 'name' | 'value'


/** column ordering options */
export type OrderBy = 'ASC' | 'ASC_NULLS_FIRST' | 'ASC_NULLS_LAST' | 'DESC' | 'DESC_NULLS_FIRST' | 'DESC_NULLS_LAST'


/** columns and relationships of "prompt" */
export interface Prompt {
    /** An array relationship */
    chatbots: PromptChatbot[]
    content: Scalars['String']
    promptId: Scalars['Int']
    promptName: (Scalars['String'] | null)
    /** An object relationship */
    promptTypeEnum: PromptTypeEnum
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


/** columns and relationships of "subcategory_enum" */
export interface SubcategoryEnum {
    added: Scalars['timestamptz']
    category: Scalars['String']
    /** An object relationship */
    category_enum: CategoryEnum
    domain: Scalars['String']
    /** An array relationship */
    examples: Example[]
    name: Scalars['String']
    __typename: 'SubcategoryEnum'
}


/** select columns of table "subcategory_enum" */
export type SubcategoryEnumSelectColumn = 'added' | 'category' | 'domain' | 'name'


/** columns and relationships of "tag_enum" */
export interface TagEnum {
    domain: Scalars['String']
    /** An object relationship */
    domain_enum: DomainEnum
    frequency: Scalars['numeric']
    name: Scalars['String']
    __typename: 'TagEnum'
}


/** select columns of table "tag_enum" */
export type TagEnumSelectColumn = 'domain' | 'frequency' | 'name'


/** columns and relationships of "thread" */
export interface Thread {
    /** An object relationship */
    chatbot: Chatbot
    chatbotId: Scalars['Int']
    createdAt: Scalars['timestamptz']
    isApproved: (Scalars['Boolean'] | null)
    isPublic: (Scalars['Boolean'] | null)
    /** An array relationship */
    messages: Message[]
    model: ModelsEnumEnum
    /** An object relationship */
    modelsEnum: ModelsEnum
    threadId: Scalars['uuid']
    updatedAt: Scalars['timestamptz']
    /** An object relationship */
    user: (User | null)
    userId: (Scalars['uuid'] | null)
    __typename: 'Thread'
}


/** select columns of table "thread" */
export type ThreadSelectColumn = 'chatbotId' | 'createdAt' | 'isApproved' | 'isPublic' | 'model' | 'threadId' | 'updatedAt' | 'userId'


/** columns and relationships of "tone_enum" */
export interface ToneEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    value: Scalars['String']
    __typename: 'ToneEnum'
}


/** select columns of table "tone_enum" */
export type ToneEnumSelectColumn = 'value'


/** columns and relationships of "type_enum" */
export interface TypeEnum {
    /** An array relationship */
    chatbots: Chatbot[]
    value: Scalars['String']
    __typename: 'TypeEnum'
}


/** select columns of table "type_enum" */
export type TypeEnumSelectColumn = 'value'


/** Table storing information about registered users. */
export interface User {
    /** An array relationship */
    chats: Chat[]
    dateJoined: Scalars['timestamptz']
    email: Scalars['String']
    lastLogin: (Scalars['timestamptz'] | null)
    proUserSubscriptionId: Scalars['String']
    profilePicture: (Scalars['String'] | null)
    slug: Scalars['String']
    /** An array relationship */
    threads: Thread[]
    userId: Scalars['uuid']
    username: Scalars['String']
    __typename: 'User'
}


/** select columns of table "user" */
export type UserSelectColumn = 'dateJoined' | 'email' | 'lastLogin' | 'proUserSubscriptionId' | 'profilePicture' | 'slug' | 'userId' | 'username'

export interface query_root {
    /** fetch data from the table: "category" */
    category: Category[]
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk: (Category | null)
    /** fetch data from the table: "category_enum" */
    categoryEnum: CategoryEnum[]
    /** fetch data from the table: "category_enum" using primary key columns */
    categoryEnumByPk: (CategoryEnum | null)
    /** fetch data from the table: "chat" */
    chat: Chat[]
    /** fetch data from the table: "chat" using primary key columns */
    chatByPk: (Chat | null)
    /** fetch data from the table: "chatbot" */
    chatbot: Chatbot[]
    /** fetch data from the table: "chatbot" using primary key columns */
    chatbotByPk: (Chatbot | null)
    /** fetch data from the table: "chatbot_category" */
    chatbotCategory: ChatbotCategory[]
    /** fetch data from the table: "chatbot_category" using primary key columns */
    chatbotCategoryByPk: (ChatbotCategory | null)
    /** fetch data from the table: "complexity_enum" */
    complexityEnum: ComplexityEnum[]
    /** fetch data from the table: "complexity_enum" using primary key columns */
    complexityEnumByPk: (ComplexityEnum | null)
    /** fetch data from the table: "domain_enum" */
    domainEnum: DomainEnum[]
    /** fetch data from the table: "domain_enum" using primary key columns */
    domainEnumByPk: (DomainEnum | null)
    /** fetch data from the table: "example" */
    example: Example[]
    /** fetch data from the table: "example" using primary key columns */
    exampleByPk: (Example | null)
    /** fetch data from the table: "label" */
    label: Label[]
    /** fetch data from the table: "label" using primary key columns */
    labelByPk: (Label | null)
    /** fetch data from the table: "label_chatbot_category_domain" */
    labelChatbotCategoryDomain: LabelChatbotCategoryDomain[]
    /** fetch data from the table: "length_enum" */
    lengthEnum: LengthEnum[]
    /** fetch data from the table: "length_enum" using primary key columns */
    lengthEnumByPk: (LengthEnum | null)
    /** fetch data from the table: "message" */
    message: Message[]
    /** fetch data from the table: "message" using primary key columns */
    messageByPk: (Message | null)
    /** fetch data from the table: "message_type_enum" */
    messageTypeEnum: MessageTypeEnum[]
    /** fetch data from the table: "message_type_enum" using primary key columns */
    messageTypeEnumByPk: (MessageTypeEnum | null)
    /** fetch data from the table: "models_enum" */
    modelsEnum: ModelsEnum[]
    /** fetch data from the table: "models_enum" using primary key columns */
    modelsEnumByPk: (ModelsEnum | null)
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
    /** fetch data from the table: "subcategory_enum" */
    subcategoryEnum: SubcategoryEnum[]
    /** fetch data from the table: "subcategory_enum" using primary key columns */
    subcategoryEnumByPk: (SubcategoryEnum | null)
    /** fetch data from the table: "tag_enum" */
    tagEnum: TagEnum[]
    /** fetch data from the table: "thread" */
    thread: Thread[]
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk: (Thread | null)
    /** fetch data from the table: "tone_enum" */
    toneEnum: ToneEnum[]
    /** fetch data from the table: "tone_enum" using primary key columns */
    toneEnumByPk: (ToneEnum | null)
    /** fetch data from the table: "type_enum" */
    typeEnum: TypeEnum[]
    /** fetch data from the table: "type_enum" using primary key columns */
    typeEnumByPk: (TypeEnum | null)
    /** fetch data from the table: "user" */
    user: User[]
    /** fetch data from the table: "user" using primary key columns */
    userByPk: (User | null)
    __typename: 'query_root'
}

export interface subscription_root {
    /** fetch data from the table: "category" */
    category: Category[]
    /** fetch data from the table: "category" using primary key columns */
    categoryByPk: (Category | null)
    /** fetch data from the table: "category_enum" */
    categoryEnum: CategoryEnum[]
    /** fetch data from the table: "category_enum" using primary key columns */
    categoryEnumByPk: (CategoryEnum | null)
    /** fetch data from the table in a streaming manner: "category_enum" */
    categoryEnumStream: CategoryEnum[]
    /** fetch data from the table in a streaming manner: "category" */
    categoryStream: Category[]
    /** fetch data from the table: "chat" */
    chat: Chat[]
    /** fetch data from the table: "chat" using primary key columns */
    chatByPk: (Chat | null)
    /** fetch data from the table in a streaming manner: "chat" */
    chatStream: Chat[]
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
    /** fetch data from the table: "complexity_enum" */
    complexityEnum: ComplexityEnum[]
    /** fetch data from the table: "complexity_enum" using primary key columns */
    complexityEnumByPk: (ComplexityEnum | null)
    /** fetch data from the table in a streaming manner: "complexity_enum" */
    complexityEnumStream: ComplexityEnum[]
    /** fetch data from the table: "domain_enum" */
    domainEnum: DomainEnum[]
    /** fetch data from the table: "domain_enum" using primary key columns */
    domainEnumByPk: (DomainEnum | null)
    /** fetch data from the table in a streaming manner: "domain_enum" */
    domainEnumStream: DomainEnum[]
    /** fetch data from the table: "example" */
    example: Example[]
    /** fetch data from the table: "example" using primary key columns */
    exampleByPk: (Example | null)
    /** fetch data from the table in a streaming manner: "example" */
    exampleStream: Example[]
    /** fetch data from the table: "label" */
    label: Label[]
    /** fetch data from the table: "label" using primary key columns */
    labelByPk: (Label | null)
    /** fetch data from the table: "label_chatbot_category_domain" */
    labelChatbotCategoryDomain: LabelChatbotCategoryDomain[]
    /** fetch data from the table in a streaming manner: "label_chatbot_category_domain" */
    labelChatbotCategoryDomainStream: LabelChatbotCategoryDomain[]
    /** fetch data from the table in a streaming manner: "label" */
    labelStream: Label[]
    /** fetch data from the table: "length_enum" */
    lengthEnum: LengthEnum[]
    /** fetch data from the table: "length_enum" using primary key columns */
    lengthEnumByPk: (LengthEnum | null)
    /** fetch data from the table in a streaming manner: "length_enum" */
    lengthEnumStream: LengthEnum[]
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
    /** fetch data from the table: "models_enum" */
    modelsEnum: ModelsEnum[]
    /** fetch data from the table: "models_enum" using primary key columns */
    modelsEnumByPk: (ModelsEnum | null)
    /** fetch data from the table in a streaming manner: "models_enum" */
    modelsEnumStream: ModelsEnum[]
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
    /** fetch data from the table: "subcategory_enum" */
    subcategoryEnum: SubcategoryEnum[]
    /** fetch data from the table: "subcategory_enum" using primary key columns */
    subcategoryEnumByPk: (SubcategoryEnum | null)
    /** fetch data from the table in a streaming manner: "subcategory_enum" */
    subcategoryEnumStream: SubcategoryEnum[]
    /** fetch data from the table: "tag_enum" */
    tagEnum: TagEnum[]
    /** fetch data from the table in a streaming manner: "tag_enum" */
    tagEnumStream: TagEnum[]
    /** fetch data from the table: "thread" */
    thread: Thread[]
    /** fetch data from the table: "thread" using primary key columns */
    threadByPk: (Thread | null)
    /** fetch data from the table in a streaming manner: "thread" */
    threadStream: Thread[]
    /** fetch data from the table: "tone_enum" */
    toneEnum: ToneEnum[]
    /** fetch data from the table: "tone_enum" using primary key columns */
    toneEnumByPk: (ToneEnum | null)
    /** fetch data from the table in a streaming manner: "tone_enum" */
    toneEnumStream: ToneEnum[]
    /** fetch data from the table: "type_enum" */
    typeEnum: TypeEnum[]
    /** fetch data from the table: "type_enum" using primary key columns */
    typeEnumByPk: (TypeEnum | null)
    /** fetch data from the table in a streaming manner: "type_enum" */
    typeEnumStream: TypeEnum[]
    /** fetch data from the table: "user" */
    user: User[]
    /** fetch data from the table: "user" using primary key columns */
    userByPk: (User | null)
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
    /** An array relationship */
    metadataLabels?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export interface CategoryBoolExp {_and?: (CategoryBoolExp[] | null),_not?: (CategoryBoolExp | null),_or?: (CategoryBoolExp[] | null),categoryId?: (IntComparisonExp | null),chatbots?: (ChatbotCategoryBoolExp | null),metadataLabels?: (LabelChatbotCategoryDomainBoolExp | null),name?: (StringComparisonExp | null)}


/** columns and relationships of "category_enum" */
export interface CategoryEnumGenqlSelection{
    added?: boolean | number
    domain?: boolean | number
    /** An object relationship */
    domain_enum?: DomainEnumGenqlSelection
    name?: boolean | number
    /** An array relationship */
    subcategory_enums?: (SubcategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (SubcategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (SubcategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (SubcategoryEnumBoolExp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "category_enum" */
export interface CategoryEnumAggregateOrderBy {count?: (OrderBy | null),max?: (CategoryEnumMaxOrderBy | null),min?: (CategoryEnumMinOrderBy | null)}


/** Boolean expression to filter rows from the table "category_enum". All fields are combined with a logical 'AND'. */
export interface CategoryEnumBoolExp {_and?: (CategoryEnumBoolExp[] | null),_not?: (CategoryEnumBoolExp | null),_or?: (CategoryEnumBoolExp[] | null),added?: (TimestamptzComparisonExp | null),domain?: (StringComparisonExp | null),domain_enum?: (DomainEnumBoolExp | null),name?: (StringComparisonExp | null),subcategory_enums?: (SubcategoryEnumBoolExp | null)}


/** order by max() on columns of table "category_enum" */
export interface CategoryEnumMaxOrderBy {added?: (OrderBy | null),domain?: (OrderBy | null),name?: (OrderBy | null)}


/** order by min() on columns of table "category_enum" */
export interface CategoryEnumMinOrderBy {added?: (OrderBy | null),domain?: (OrderBy | null),name?: (OrderBy | null)}


/** Ordering options when selecting data from "category_enum". */
export interface CategoryEnumOrderBy {added?: (OrderBy | null),domain?: (OrderBy | null),domain_enum?: (DomainEnumOrderBy | null),name?: (OrderBy | null),subcategory_enumsAggregate?: (SubcategoryEnumAggregateOrderBy | null)}


/** Streaming cursor of the table "category_enum" */
export interface CategoryEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: CategoryEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface CategoryEnumStreamCursorValueInput {added?: (Scalars['timestamptz'] | null),domain?: (Scalars['String'] | null),name?: (Scalars['String'] | null)}


/** Ordering options when selecting data from "category". */
export interface CategoryOrderBy {categoryId?: (OrderBy | null),chatbotsAggregate?: (ChatbotCategoryAggregateOrderBy | null),metadataLabelsAggregate?: (LabelChatbotCategoryDomainAggregateOrderBy | null),name?: (OrderBy | null)}


/** Streaming cursor of the table "category" */
export interface CategoryStreamCursorInput {
/** Stream column input with initial value */
initialValue: CategoryStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface CategoryStreamCursorValueInput {categoryId?: (Scalars['Int'] | null),name?: (Scalars['String'] | null)}


/** Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link. */
export interface ChatGenqlSelection{
    addedBy?: boolean | number
    chatId?: boolean | number
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    conversationLink?: boolean | number
    /** An object relationship */
    user?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "chat" */
export interface ChatAggregateOrderBy {avg?: (ChatAvgOrderBy | null),count?: (OrderBy | null),max?: (ChatMaxOrderBy | null),min?: (ChatMinOrderBy | null),stddev?: (ChatStddevOrderBy | null),stddevPop?: (ChatStddevPopOrderBy | null),stddevSamp?: (ChatStddevSampOrderBy | null),sum?: (ChatSumOrderBy | null),varPop?: (ChatVarPopOrderBy | null),varSamp?: (ChatVarSampOrderBy | null),variance?: (ChatVarianceOrderBy | null)}


/** order by avg() on columns of table "chat" */
export interface ChatAvgOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "chat". All fields are combined with a logical 'AND'. */
export interface ChatBoolExp {_and?: (ChatBoolExp[] | null),_not?: (ChatBoolExp | null),_or?: (ChatBoolExp[] | null),addedBy?: (UuidComparisonExp | null),chatId?: (IntComparisonExp | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),conversationLink?: (StringComparisonExp | null),user?: (UserBoolExp | null)}


/** order by max() on columns of table "chat" */
export interface ChatMaxOrderBy {addedBy?: (OrderBy | null),chatId?: (OrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null)}


/** order by min() on columns of table "chat" */
export interface ChatMinOrderBy {addedBy?: (OrderBy | null),chatId?: (OrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null)}


/** Ordering options when selecting data from "chat". */
export interface ChatOrderBy {addedBy?: (OrderBy | null),chatId?: (OrderBy | null),chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),conversationLink?: (OrderBy | null),user?: (UserOrderBy | null)}


/** order by stddev() on columns of table "chat" */
export interface ChatStddevOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "chat" */
export interface ChatStddevPopOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "chat" */
export interface ChatStddevSampOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** Streaming cursor of the table "chat" */
export interface ChatStreamCursorInput {
/** Stream column input with initial value */
initialValue: ChatStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ChatStreamCursorValueInput {addedBy?: (Scalars['uuid'] | null),chatId?: (Scalars['Int'] | null),chatbotId?: (Scalars['Int'] | null),conversationLink?: (Scalars['String'] | null)}


/** order by sum() on columns of table "chat" */
export interface ChatSumOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by varPop() on columns of table "chat" */
export interface ChatVarPopOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by varSamp() on columns of table "chat" */
export interface ChatVarSampOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


/** order by variance() on columns of table "chat" */
export interface ChatVarianceOrderBy {chatId?: (OrderBy | null),chatbotId?: (OrderBy | null)}


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
    /** An array relationship */
    chats?: (ChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatBoolExp | null)} })
    /** An object relationship */
    complexityEnum?: ComplexityEnumGenqlSelection
    createdBy?: boolean | number
    defaultComplexity?: boolean | number
    defaultLength?: boolean | number
    defaultTone?: boolean | number
    defaultType?: boolean | number
    description?: boolean | number
    /** An object relationship */
    lengthEnum?: LengthEnumGenqlSelection
    /** An array relationship */
    metadataLabels?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
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
    /** An object relationship */
    toneEnum?: ToneEnumGenqlSelection
    /** An object relationship */
    typeEnum?: TypeEnumGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "chatbot" */
export interface ChatbotAggregateOrderBy {avg?: (ChatbotAvgOrderBy | null),count?: (OrderBy | null),max?: (ChatbotMaxOrderBy | null),min?: (ChatbotMinOrderBy | null),stddev?: (ChatbotStddevOrderBy | null),stddevPop?: (ChatbotStddevPopOrderBy | null),stddevSamp?: (ChatbotStddevSampOrderBy | null),sum?: (ChatbotSumOrderBy | null),varPop?: (ChatbotVarPopOrderBy | null),varSamp?: (ChatbotVarSampOrderBy | null),variance?: (ChatbotVarianceOrderBy | null)}


/** order by avg() on columns of table "chatbot" */
export interface ChatbotAvgOrderBy {chatbotId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "chatbot". All fields are combined with a logical 'AND'. */
export interface ChatbotBoolExp {_and?: (ChatbotBoolExp[] | null),_not?: (ChatbotBoolExp | null),_or?: (ChatbotBoolExp[] | null),avatar?: (StringComparisonExp | null),categories?: (ChatbotCategoryBoolExp | null),chatbotId?: (IntComparisonExp | null),chats?: (ChatBoolExp | null),complexityEnum?: (ComplexityEnumBoolExp | null),createdBy?: (StringComparisonExp | null),defaultComplexity?: (StringComparisonExp | null),defaultLength?: (StringComparisonExp | null),defaultTone?: (StringComparisonExp | null),defaultType?: (StringComparisonExp | null),description?: (StringComparisonExp | null),lengthEnum?: (LengthEnumBoolExp | null),metadataLabels?: (LabelChatbotCategoryDomainBoolExp | null),name?: (StringComparisonExp | null),prompts?: (PromptChatbotBoolExp | null),threads?: (ThreadBoolExp | null),toneEnum?: (ToneEnumBoolExp | null),typeEnum?: (TypeEnumBoolExp | null)}


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
export interface ChatbotOrderBy {avatar?: (OrderBy | null),categoriesAggregate?: (ChatbotCategoryAggregateOrderBy | null),chatbotId?: (OrderBy | null),chatsAggregate?: (ChatAggregateOrderBy | null),complexityEnum?: (ComplexityEnumOrderBy | null),createdBy?: (OrderBy | null),defaultComplexity?: (OrderBy | null),defaultLength?: (OrderBy | null),defaultTone?: (OrderBy | null),defaultType?: (OrderBy | null),description?: (OrderBy | null),lengthEnum?: (LengthEnumOrderBy | null),metadataLabelsAggregate?: (LabelChatbotCategoryDomainAggregateOrderBy | null),name?: (OrderBy | null),promptsAggregate?: (PromptChatbotAggregateOrderBy | null),threadsAggregate?: (ThreadAggregateOrderBy | null),toneEnum?: (ToneEnumOrderBy | null),typeEnum?: (TypeEnumOrderBy | null)}


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


/** columns and relationships of "complexity_enum" */
export interface ComplexityEnumGenqlSelection{
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
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "complexity_enum". All fields are combined with a logical 'AND'. */
export interface ComplexityEnumBoolExp {_and?: (ComplexityEnumBoolExp[] | null),_not?: (ComplexityEnumBoolExp | null),_or?: (ComplexityEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "complexity_enum". */
export interface ComplexityEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "complexity_enum" */
export interface ComplexityEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: ComplexityEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ComplexityEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** columns and relationships of "domain_enum" */
export interface DomainEnumGenqlSelection{
    added?: boolean | number
    /** An array relationship */
    category_enums?: (CategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (CategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (CategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (CategoryEnumBoolExp | null)} })
    /** An array relationship */
    label_chatbot_category_domains?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    name?: boolean | number
    /** An array relationship */
    tag_enums?: (TagEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (TagEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (TagEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (TagEnumBoolExp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "domain_enum". All fields are combined with a logical 'AND'. */
export interface DomainEnumBoolExp {_and?: (DomainEnumBoolExp[] | null),_not?: (DomainEnumBoolExp | null),_or?: (DomainEnumBoolExp[] | null),added?: (TimestamptzComparisonExp | null),category_enums?: (CategoryEnumBoolExp | null),label_chatbot_category_domains?: (LabelChatbotCategoryDomainBoolExp | null),name?: (StringComparisonExp | null),tag_enums?: (TagEnumBoolExp | null)}


/** Ordering options when selecting data from "domain_enum". */
export interface DomainEnumOrderBy {added?: (OrderBy | null),category_enumsAggregate?: (CategoryEnumAggregateOrderBy | null),label_chatbot_category_domainsAggregate?: (LabelChatbotCategoryDomainAggregateOrderBy | null),name?: (OrderBy | null),tag_enumsAggregate?: (TagEnumAggregateOrderBy | null)}


/** Streaming cursor of the table "domain_enum" */
export interface DomainEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: DomainEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface DomainEnumStreamCursorValueInput {added?: (Scalars['timestamptz'] | null),name?: (Scalars['String'] | null)}


/** columns and relationships of "example" */
export interface ExampleGenqlSelection{
    added?: boolean | number
    category?: boolean | number
    domain?: boolean | number
    exampleId?: boolean | number
    metadata?: { __args: {
    /** JSON select path */
    path?: (Scalars['String'] | null)} } | boolean | number
    prompt?: boolean | number
    response?: boolean | number
    subcategory?: boolean | number
    /** An object relationship */
    subcategory_enum?: SubcategoryEnumGenqlSelection
    tags?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "example" */
export interface ExampleAggregateOrderBy {count?: (OrderBy | null),max?: (ExampleMaxOrderBy | null),min?: (ExampleMinOrderBy | null)}


/** Boolean expression to filter rows from the table "example". All fields are combined with a logical 'AND'. */
export interface ExampleBoolExp {_and?: (ExampleBoolExp[] | null),_not?: (ExampleBoolExp | null),_or?: (ExampleBoolExp[] | null),added?: (TimestamptzComparisonExp | null),category?: (StringComparisonExp | null),domain?: (StringComparisonExp | null),exampleId?: (UuidComparisonExp | null),metadata?: (JsonbComparisonExp | null),prompt?: (StringComparisonExp | null),response?: (StringComparisonExp | null),subcategory?: (StringComparisonExp | null),subcategory_enum?: (SubcategoryEnumBoolExp | null),tags?: (UuidArrayComparisonExp | null)}


/** order by max() on columns of table "example" */
export interface ExampleMaxOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),domain?: (OrderBy | null),exampleId?: (OrderBy | null),prompt?: (OrderBy | null),response?: (OrderBy | null),subcategory?: (OrderBy | null),tags?: (OrderBy | null)}


/** order by min() on columns of table "example" */
export interface ExampleMinOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),domain?: (OrderBy | null),exampleId?: (OrderBy | null),prompt?: (OrderBy | null),response?: (OrderBy | null),subcategory?: (OrderBy | null),tags?: (OrderBy | null)}


/** Ordering options when selecting data from "example". */
export interface ExampleOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),domain?: (OrderBy | null),exampleId?: (OrderBy | null),metadata?: (OrderBy | null),prompt?: (OrderBy | null),response?: (OrderBy | null),subcategory?: (OrderBy | null),subcategory_enum?: (SubcategoryEnumOrderBy | null),tags?: (OrderBy | null)}


/** Streaming cursor of the table "example" */
export interface ExampleStreamCursorInput {
/** Stream column input with initial value */
initialValue: ExampleStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ExampleStreamCursorValueInput {added?: (Scalars['timestamptz'] | null),category?: (Scalars['String'] | null),domain?: (Scalars['String'] | null),exampleId?: (Scalars['uuid'] | null),metadata?: (Scalars['jsonb'] | null),prompt?: (Scalars['String'] | null),response?: (Scalars['String'] | null),subcategory?: (Scalars['String'] | null),tags?: (Scalars['uuid'][] | null)}


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface IntComparisonExp {_eq?: (Scalars['Int'] | null),_gt?: (Scalars['Int'] | null),_gte?: (Scalars['Int'] | null),_in?: (Scalars['Int'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['Int'] | null),_lte?: (Scalars['Int'] | null),_neq?: (Scalars['Int'] | null),_nin?: (Scalars['Int'][] | null)}

export interface JsonbCastExp {String?: (StringComparisonExp | null)}


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export interface JsonbComparisonExp {_cast?: (JsonbCastExp | null),
/** is the column contained in the given json value */
_containedIn?: (Scalars['jsonb'] | null),
/** does the column contain the given json value at the top level */
_contains?: (Scalars['jsonb'] | null),_eq?: (Scalars['jsonb'] | null),_gt?: (Scalars['jsonb'] | null),_gte?: (Scalars['jsonb'] | null),
/** does the string exist as a top-level key in the column */
_hasKey?: (Scalars['String'] | null),
/** do all of these strings exist as top-level keys in the column */
_hasKeysAll?: (Scalars['String'][] | null),
/** do any of these strings exist as top-level keys in the column */
_hasKeysAny?: (Scalars['String'][] | null),_in?: (Scalars['jsonb'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['jsonb'] | null),_lte?: (Scalars['jsonb'] | null),_neq?: (Scalars['jsonb'] | null),_nin?: (Scalars['jsonb'][] | null)}


/** Labels for chatbots (e.g.: domain, category, sub-category, tags  */
export interface LabelGenqlSelection{
    advancedLabels?: boolean | number
    categories?: boolean | number
    labelId?: boolean | number
    /** An array relationship */
    metadataLabels?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    questions?: boolean | number
    subCategories?: boolean | number
    tags?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "label". All fields are combined with a logical 'AND'. */
export interface LabelBoolExp {_and?: (LabelBoolExp[] | null),_not?: (LabelBoolExp | null),_or?: (LabelBoolExp[] | null),advancedLabels?: (BooleanComparisonExp | null),categories?: (StringComparisonExp | null),labelId?: (IntComparisonExp | null),metadataLabels?: (LabelChatbotCategoryDomainBoolExp | null),questions?: (StringComparisonExp | null),subCategories?: (StringComparisonExp | null),tags?: (StringComparisonExp | null)}


/** Junction table to connect between Label, Chatbot, Categories, and Domains tables. */
export interface LabelChatbotCategoryDomainGenqlSelection{
    /** An object relationship */
    category?: CategoryGenqlSelection
    categoryId?: boolean | number
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    /** An object relationship */
    domain_enum?: DomainEnumGenqlSelection
    /** An object relationship */
    label?: LabelGenqlSelection
    labelId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainAggregateOrderBy {avg?: (LabelChatbotCategoryDomainAvgOrderBy | null),count?: (OrderBy | null),max?: (LabelChatbotCategoryDomainMaxOrderBy | null),min?: (LabelChatbotCategoryDomainMinOrderBy | null),stddev?: (LabelChatbotCategoryDomainStddevOrderBy | null),stddevPop?: (LabelChatbotCategoryDomainStddevPopOrderBy | null),stddevSamp?: (LabelChatbotCategoryDomainStddevSampOrderBy | null),sum?: (LabelChatbotCategoryDomainSumOrderBy | null),varPop?: (LabelChatbotCategoryDomainVarPopOrderBy | null),varSamp?: (LabelChatbotCategoryDomainVarSampOrderBy | null),variance?: (LabelChatbotCategoryDomainVarianceOrderBy | null)}


/** order by avg() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainAvgOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "label_chatbot_category_domain". All fields are combined with a logical 'AND'. */
export interface LabelChatbotCategoryDomainBoolExp {_and?: (LabelChatbotCategoryDomainBoolExp[] | null),_not?: (LabelChatbotCategoryDomainBoolExp | null),_or?: (LabelChatbotCategoryDomainBoolExp[] | null),category?: (CategoryBoolExp | null),categoryId?: (IntComparisonExp | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),domain_enum?: (DomainEnumBoolExp | null),label?: (LabelBoolExp | null),labelId?: (IntComparisonExp | null)}


/** order by max() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainMaxOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by min() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainMinOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** Ordering options when selecting data from "label_chatbot_category_domain". */
export interface LabelChatbotCategoryDomainOrderBy {category?: (CategoryOrderBy | null),categoryId?: (OrderBy | null),chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),domain_enum?: (DomainEnumOrderBy | null),label?: (LabelOrderBy | null),labelId?: (OrderBy | null)}


/** order by stddev() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainStddevOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainStddevPopOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainStddevSampOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** Streaming cursor of the table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainStreamCursorInput {
/** Stream column input with initial value */
initialValue: LabelChatbotCategoryDomainStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface LabelChatbotCategoryDomainStreamCursorValueInput {categoryId?: (Scalars['Int'] | null),chatbotId?: (Scalars['Int'] | null),labelId?: (Scalars['Int'] | null)}


/** order by sum() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainSumOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by varPop() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainVarPopOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by varSamp() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainVarSampOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** order by variance() on columns of table "label_chatbot_category_domain" */
export interface LabelChatbotCategoryDomainVarianceOrderBy {categoryId?: (OrderBy | null),chatbotId?: (OrderBy | null),labelId?: (OrderBy | null)}


/** Ordering options when selecting data from "label". */
export interface LabelOrderBy {advancedLabels?: (OrderBy | null),categories?: (OrderBy | null),labelId?: (OrderBy | null),metadataLabelsAggregate?: (LabelChatbotCategoryDomainAggregateOrderBy | null),questions?: (OrderBy | null),subCategories?: (OrderBy | null),tags?: (OrderBy | null)}


/** Streaming cursor of the table "label" */
export interface LabelStreamCursorInput {
/** Stream column input with initial value */
initialValue: LabelStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface LabelStreamCursorValueInput {advancedLabels?: (Scalars['Boolean'] | null),categories?: (Scalars['String'] | null),labelId?: (Scalars['Int'] | null),questions?: (Scalars['String'] | null),subCategories?: (Scalars['String'] | null),tags?: (Scalars['String'] | null)}


/** columns and relationships of "length_enum" */
export interface LengthEnumGenqlSelection{
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
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "length_enum". All fields are combined with a logical 'AND'. */
export interface LengthEnumBoolExp {_and?: (LengthEnumBoolExp[] | null),_not?: (LengthEnumBoolExp | null),_or?: (LengthEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "length_enum". */
export interface LengthEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "length_enum" */
export interface LengthEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: LengthEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface LengthEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** This table stores the messages exchanged between users and chatbots. */
export interface MessageGenqlSelection{
    augmentedFrom?: boolean | number
    content?: boolean | number
    createdAt?: boolean | number
    examples?: { __args: {
    /** JSON select path */
    path?: (Scalars['String'] | null)} } | boolean | number
    messageId?: boolean | number
    /** An object relationship */
    messageTypeEnum?: MessageTypeEnumGenqlSelection
    prompt?: boolean | number
    role?: boolean | number
    /** An object relationship */
    thread?: ThreadGenqlSelection
    threadId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "message" */
export interface MessageAggregateOrderBy {count?: (OrderBy | null),max?: (MessageMaxOrderBy | null),min?: (MessageMinOrderBy | null)}


/** Boolean expression to filter rows from the table "message". All fields are combined with a logical 'AND'. */
export interface MessageBoolExp {_and?: (MessageBoolExp[] | null),_not?: (MessageBoolExp | null),_or?: (MessageBoolExp[] | null),augmentedFrom?: (UuidComparisonExp | null),content?: (StringComparisonExp | null),createdAt?: (TimestamptzComparisonExp | null),examples?: (JsonbComparisonExp | null),messageId?: (UuidComparisonExp | null),messageTypeEnum?: (MessageTypeEnumBoolExp | null),prompt?: (StringComparisonExp | null),role?: (StringComparisonExp | null),thread?: (ThreadBoolExp | null),threadId?: (UuidComparisonExp | null)}


/** order by max() on columns of table "message" */
export interface MessageMaxOrderBy {augmentedFrom?: (OrderBy | null),content?: (OrderBy | null),createdAt?: (OrderBy | null),messageId?: (OrderBy | null),prompt?: (OrderBy | null),role?: (OrderBy | null),threadId?: (OrderBy | null)}


/** order by min() on columns of table "message" */
export interface MessageMinOrderBy {augmentedFrom?: (OrderBy | null),content?: (OrderBy | null),createdAt?: (OrderBy | null),messageId?: (OrderBy | null),prompt?: (OrderBy | null),role?: (OrderBy | null),threadId?: (OrderBy | null)}


/** Ordering options when selecting data from "message". */
export interface MessageOrderBy {augmentedFrom?: (OrderBy | null),content?: (OrderBy | null),createdAt?: (OrderBy | null),examples?: (OrderBy | null),messageId?: (OrderBy | null),messageTypeEnum?: (MessageTypeEnumOrderBy | null),prompt?: (OrderBy | null),role?: (OrderBy | null),thread?: (ThreadOrderBy | null),threadId?: (OrderBy | null)}


/** Streaming cursor of the table "message" */
export interface MessageStreamCursorInput {
/** Stream column input with initial value */
initialValue: MessageStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface MessageStreamCursorValueInput {augmentedFrom?: (Scalars['uuid'] | null),content?: (Scalars['String'] | null),createdAt?: (Scalars['timestamptz'] | null),examples?: (Scalars['jsonb'] | null),messageId?: (Scalars['uuid'] | null),prompt?: (Scalars['String'] | null),role?: (Scalars['String'] | null),threadId?: (Scalars['uuid'] | null)}


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


/** columns and relationships of "models_enum" */
export interface ModelsEnumGenqlSelection{
    name?: boolean | number
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
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "models_enum". All fields are combined with a logical 'AND'. */
export interface ModelsEnumBoolExp {_and?: (ModelsEnumBoolExp[] | null),_not?: (ModelsEnumBoolExp | null),_or?: (ModelsEnumBoolExp[] | null),name?: (StringComparisonExp | null),threads?: (ThreadBoolExp | null),value?: (StringComparisonExp | null)}


/** Boolean expression to compare columns of type "ModelsEnumEnum". All fields are combined with logical 'AND'. */
export interface ModelsEnumEnumComparisonExp {_eq?: (ModelsEnumEnum | null),_in?: (ModelsEnumEnum[] | null),_isNull?: (Scalars['Boolean'] | null),_neq?: (ModelsEnumEnum | null),_nin?: (ModelsEnumEnum[] | null)}


/** Ordering options when selecting data from "models_enum". */
export interface ModelsEnumOrderBy {name?: (OrderBy | null),threadsAggregate?: (ThreadAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "models_enum" */
export interface ModelsEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: ModelsEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ModelsEnumStreamCursorValueInput {name?: (Scalars['String'] | null),value?: (Scalars['String'] | null)}


/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export interface NumericComparisonExp {_eq?: (Scalars['numeric'] | null),_gt?: (Scalars['numeric'] | null),_gte?: (Scalars['numeric'] | null),_in?: (Scalars['numeric'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['numeric'] | null),_lte?: (Scalars['numeric'] | null),_neq?: (Scalars['numeric'] | null),_nin?: (Scalars['numeric'][] | null)}


/** columns and relationships of "prompt" */
export interface PromptGenqlSelection{
    /** An array relationship */
    chatbots?: (PromptChatbotGenqlSelection & { __args?: {
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
    content?: boolean | number
    promptId?: boolean | number
    promptName?: boolean | number
    /** An object relationship */
    promptTypeEnum?: PromptTypeEnumGenqlSelection
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "prompt" */
export interface PromptAggregateOrderBy {avg?: (PromptAvgOrderBy | null),count?: (OrderBy | null),max?: (PromptMaxOrderBy | null),min?: (PromptMinOrderBy | null),stddev?: (PromptStddevOrderBy | null),stddevPop?: (PromptStddevPopOrderBy | null),stddevSamp?: (PromptStddevSampOrderBy | null),sum?: (PromptSumOrderBy | null),varPop?: (PromptVarPopOrderBy | null),varSamp?: (PromptVarSampOrderBy | null),variance?: (PromptVarianceOrderBy | null)}


/** order by avg() on columns of table "prompt" */
export interface PromptAvgOrderBy {promptId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "prompt". All fields are combined with a logical 'AND'. */
export interface PromptBoolExp {_and?: (PromptBoolExp[] | null),_not?: (PromptBoolExp | null),_or?: (PromptBoolExp[] | null),chatbots?: (PromptChatbotBoolExp | null),content?: (StringComparisonExp | null),promptId?: (IntComparisonExp | null),promptName?: (StringComparisonExp | null),promptTypeEnum?: (PromptTypeEnumBoolExp | null),type?: (StringComparisonExp | null)}


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
export interface PromptOrderBy {chatbotsAggregate?: (PromptChatbotAggregateOrderBy | null),content?: (OrderBy | null),promptId?: (OrderBy | null),promptName?: (OrderBy | null),promptTypeEnum?: (PromptTypeEnumOrderBy | null),type?: (OrderBy | null)}


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


/** columns and relationships of "subcategory_enum" */
export interface SubcategoryEnumGenqlSelection{
    added?: boolean | number
    category?: boolean | number
    /** An object relationship */
    category_enum?: CategoryEnumGenqlSelection
    domain?: boolean | number
    /** An array relationship */
    examples?: (ExampleGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ExampleSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ExampleOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ExampleBoolExp | null)} })
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "subcategory_enum" */
export interface SubcategoryEnumAggregateOrderBy {count?: (OrderBy | null),max?: (SubcategoryEnumMaxOrderBy | null),min?: (SubcategoryEnumMinOrderBy | null)}


/** Boolean expression to filter rows from the table "subcategory_enum". All fields are combined with a logical 'AND'. */
export interface SubcategoryEnumBoolExp {_and?: (SubcategoryEnumBoolExp[] | null),_not?: (SubcategoryEnumBoolExp | null),_or?: (SubcategoryEnumBoolExp[] | null),added?: (TimestamptzComparisonExp | null),category?: (StringComparisonExp | null),category_enum?: (CategoryEnumBoolExp | null),domain?: (StringComparisonExp | null),examples?: (ExampleBoolExp | null),name?: (StringComparisonExp | null)}


/** order by max() on columns of table "subcategory_enum" */
export interface SubcategoryEnumMaxOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),domain?: (OrderBy | null),name?: (OrderBy | null)}


/** order by min() on columns of table "subcategory_enum" */
export interface SubcategoryEnumMinOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),domain?: (OrderBy | null),name?: (OrderBy | null)}


/** Ordering options when selecting data from "subcategory_enum". */
export interface SubcategoryEnumOrderBy {added?: (OrderBy | null),category?: (OrderBy | null),category_enum?: (CategoryEnumOrderBy | null),domain?: (OrderBy | null),examplesAggregate?: (ExampleAggregateOrderBy | null),name?: (OrderBy | null)}


/** Streaming cursor of the table "subcategory_enum" */
export interface SubcategoryEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: SubcategoryEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface SubcategoryEnumStreamCursorValueInput {added?: (Scalars['timestamptz'] | null),category?: (Scalars['String'] | null),domain?: (Scalars['String'] | null),name?: (Scalars['String'] | null)}


/** columns and relationships of "tag_enum" */
export interface TagEnumGenqlSelection{
    domain?: boolean | number
    /** An object relationship */
    domain_enum?: DomainEnumGenqlSelection
    frequency?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "tag_enum" */
export interface TagEnumAggregateOrderBy {avg?: (TagEnumAvgOrderBy | null),count?: (OrderBy | null),max?: (TagEnumMaxOrderBy | null),min?: (TagEnumMinOrderBy | null),stddev?: (TagEnumStddevOrderBy | null),stddevPop?: (TagEnumStddevPopOrderBy | null),stddevSamp?: (TagEnumStddevSampOrderBy | null),sum?: (TagEnumSumOrderBy | null),varPop?: (TagEnumVarPopOrderBy | null),varSamp?: (TagEnumVarSampOrderBy | null),variance?: (TagEnumVarianceOrderBy | null)}


/** order by avg() on columns of table "tag_enum" */
export interface TagEnumAvgOrderBy {frequency?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "tag_enum". All fields are combined with a logical 'AND'. */
export interface TagEnumBoolExp {_and?: (TagEnumBoolExp[] | null),_not?: (TagEnumBoolExp | null),_or?: (TagEnumBoolExp[] | null),domain?: (StringComparisonExp | null),domain_enum?: (DomainEnumBoolExp | null),frequency?: (NumericComparisonExp | null),name?: (StringComparisonExp | null)}


/** order by max() on columns of table "tag_enum" */
export interface TagEnumMaxOrderBy {domain?: (OrderBy | null),frequency?: (OrderBy | null),name?: (OrderBy | null)}


/** order by min() on columns of table "tag_enum" */
export interface TagEnumMinOrderBy {domain?: (OrderBy | null),frequency?: (OrderBy | null),name?: (OrderBy | null)}


/** Ordering options when selecting data from "tag_enum". */
export interface TagEnumOrderBy {domain?: (OrderBy | null),domain_enum?: (DomainEnumOrderBy | null),frequency?: (OrderBy | null),name?: (OrderBy | null)}


/** order by stddev() on columns of table "tag_enum" */
export interface TagEnumStddevOrderBy {frequency?: (OrderBy | null)}


/** order by stddevPop() on columns of table "tag_enum" */
export interface TagEnumStddevPopOrderBy {frequency?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "tag_enum" */
export interface TagEnumStddevSampOrderBy {frequency?: (OrderBy | null)}


/** Streaming cursor of the table "tag_enum" */
export interface TagEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: TagEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface TagEnumStreamCursorValueInput {domain?: (Scalars['String'] | null),frequency?: (Scalars['numeric'] | null),name?: (Scalars['String'] | null)}


/** order by sum() on columns of table "tag_enum" */
export interface TagEnumSumOrderBy {frequency?: (OrderBy | null)}


/** order by varPop() on columns of table "tag_enum" */
export interface TagEnumVarPopOrderBy {frequency?: (OrderBy | null)}


/** order by varSamp() on columns of table "tag_enum" */
export interface TagEnumVarSampOrderBy {frequency?: (OrderBy | null)}


/** order by variance() on columns of table "tag_enum" */
export interface TagEnumVarianceOrderBy {frequency?: (OrderBy | null)}


/** columns and relationships of "thread" */
export interface ThreadGenqlSelection{
    /** An object relationship */
    chatbot?: ChatbotGenqlSelection
    chatbotId?: boolean | number
    createdAt?: boolean | number
    isApproved?: boolean | number
    isPublic?: boolean | number
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
    model?: boolean | number
    /** An object relationship */
    modelsEnum?: ModelsEnumGenqlSelection
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
export interface ThreadAvgOrderBy {chatbotId?: (OrderBy | null)}


/** Boolean expression to filter rows from the table "thread". All fields are combined with a logical 'AND'. */
export interface ThreadBoolExp {_and?: (ThreadBoolExp[] | null),_not?: (ThreadBoolExp | null),_or?: (ThreadBoolExp[] | null),chatbot?: (ChatbotBoolExp | null),chatbotId?: (IntComparisonExp | null),createdAt?: (TimestamptzComparisonExp | null),isApproved?: (BooleanComparisonExp | null),isPublic?: (BooleanComparisonExp | null),messages?: (MessageBoolExp | null),model?: (ModelsEnumEnumComparisonExp | null),modelsEnum?: (ModelsEnumBoolExp | null),threadId?: (UuidComparisonExp | null),updatedAt?: (TimestamptzComparisonExp | null),user?: (UserBoolExp | null),userId?: (UuidComparisonExp | null)}


/** order by max() on columns of table "thread" */
export interface ThreadMaxOrderBy {chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),userId?: (OrderBy | null)}


/** order by min() on columns of table "thread" */
export interface ThreadMinOrderBy {chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),userId?: (OrderBy | null)}


/** Ordering options when selecting data from "thread". */
export interface ThreadOrderBy {chatbot?: (ChatbotOrderBy | null),chatbotId?: (OrderBy | null),createdAt?: (OrderBy | null),isApproved?: (OrderBy | null),isPublic?: (OrderBy | null),messagesAggregate?: (MessageAggregateOrderBy | null),model?: (OrderBy | null),modelsEnum?: (ModelsEnumOrderBy | null),threadId?: (OrderBy | null),updatedAt?: (OrderBy | null),user?: (UserOrderBy | null),userId?: (OrderBy | null)}


/** order by stddev() on columns of table "thread" */
export interface ThreadStddevOrderBy {chatbotId?: (OrderBy | null)}


/** order by stddevPop() on columns of table "thread" */
export interface ThreadStddevPopOrderBy {chatbotId?: (OrderBy | null)}


/** order by stddevSamp() on columns of table "thread" */
export interface ThreadStddevSampOrderBy {chatbotId?: (OrderBy | null)}


/** Streaming cursor of the table "thread" */
export interface ThreadStreamCursorInput {
/** Stream column input with initial value */
initialValue: ThreadStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ThreadStreamCursorValueInput {chatbotId?: (Scalars['Int'] | null),createdAt?: (Scalars['timestamptz'] | null),isApproved?: (Scalars['Boolean'] | null),isPublic?: (Scalars['Boolean'] | null),model?: (ModelsEnumEnum | null),threadId?: (Scalars['uuid'] | null),updatedAt?: (Scalars['timestamptz'] | null),userId?: (Scalars['uuid'] | null)}


/** order by sum() on columns of table "thread" */
export interface ThreadSumOrderBy {chatbotId?: (OrderBy | null)}


/** order by varPop() on columns of table "thread" */
export interface ThreadVarPopOrderBy {chatbotId?: (OrderBy | null)}


/** order by varSamp() on columns of table "thread" */
export interface ThreadVarSampOrderBy {chatbotId?: (OrderBy | null)}


/** order by variance() on columns of table "thread" */
export interface ThreadVarianceOrderBy {chatbotId?: (OrderBy | null)}


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface TimestamptzComparisonExp {_eq?: (Scalars['timestamptz'] | null),_gt?: (Scalars['timestamptz'] | null),_gte?: (Scalars['timestamptz'] | null),_in?: (Scalars['timestamptz'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamptz'] | null),_lte?: (Scalars['timestamptz'] | null),_neq?: (Scalars['timestamptz'] | null),_nin?: (Scalars['timestamptz'][] | null)}


/** columns and relationships of "tone_enum" */
export interface ToneEnumGenqlSelection{
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
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "tone_enum". All fields are combined with a logical 'AND'. */
export interface ToneEnumBoolExp {_and?: (ToneEnumBoolExp[] | null),_not?: (ToneEnumBoolExp | null),_or?: (ToneEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "tone_enum". */
export interface ToneEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "tone_enum" */
export interface ToneEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: ToneEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface ToneEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** columns and relationships of "type_enum" */
export interface TypeEnumGenqlSelection{
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
    value?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "type_enum". All fields are combined with a logical 'AND'. */
export interface TypeEnumBoolExp {_and?: (TypeEnumBoolExp[] | null),_not?: (TypeEnumBoolExp | null),_or?: (TypeEnumBoolExp[] | null),chatbots?: (ChatbotBoolExp | null),value?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "type_enum". */
export interface TypeEnumOrderBy {chatbotsAggregate?: (ChatbotAggregateOrderBy | null),value?: (OrderBy | null)}


/** Streaming cursor of the table "type_enum" */
export interface TypeEnumStreamCursorInput {
/** Stream column input with initial value */
initialValue: TypeEnumStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface TypeEnumStreamCursorValueInput {value?: (Scalars['String'] | null)}


/** Table storing information about registered users. */
export interface UserGenqlSelection{
    /** An array relationship */
    chats?: (ChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatBoolExp | null)} })
    dateJoined?: boolean | number
    email?: boolean | number
    lastLogin?: boolean | number
    proUserSubscriptionId?: boolean | number
    profilePicture?: boolean | number
    slug?: boolean | number
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
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export interface UserBoolExp {_and?: (UserBoolExp[] | null),_not?: (UserBoolExp | null),_or?: (UserBoolExp[] | null),chats?: (ChatBoolExp | null),dateJoined?: (TimestamptzComparisonExp | null),email?: (StringComparisonExp | null),lastLogin?: (TimestamptzComparisonExp | null),proUserSubscriptionId?: (StringComparisonExp | null),profilePicture?: (StringComparisonExp | null),slug?: (StringComparisonExp | null),threads?: (ThreadBoolExp | null),userId?: (UuidComparisonExp | null),username?: (StringComparisonExp | null)}


/** Ordering options when selecting data from "user". */
export interface UserOrderBy {chatsAggregate?: (ChatAggregateOrderBy | null),dateJoined?: (OrderBy | null),email?: (OrderBy | null),lastLogin?: (OrderBy | null),proUserSubscriptionId?: (OrderBy | null),profilePicture?: (OrderBy | null),slug?: (OrderBy | null),threadsAggregate?: (ThreadAggregateOrderBy | null),userId?: (OrderBy | null),username?: (OrderBy | null)}


/** Streaming cursor of the table "user" */
export interface UserStreamCursorInput {
/** Stream column input with initial value */
initialValue: UserStreamCursorValueInput,
/** cursor ordering */
ordering?: (CursorOrdering | null)}


/** Initial value of the column from where the streaming should start */
export interface UserStreamCursorValueInput {dateJoined?: (Scalars['timestamptz'] | null),email?: (Scalars['String'] | null),lastLogin?: (Scalars['timestamptz'] | null),proUserSubscriptionId?: (Scalars['String'] | null),profilePicture?: (Scalars['String'] | null),slug?: (Scalars['String'] | null),userId?: (Scalars['uuid'] | null),username?: (Scalars['String'] | null)}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export interface UuidArrayComparisonExp {
/** is the array contained in the given array value */
_containedIn?: (Scalars['uuid'][] | null),
/** does the array contain the given value */
_contains?: (Scalars['uuid'][] | null),_eq?: (Scalars['uuid'][] | null),_gt?: (Scalars['uuid'][] | null),_gte?: (Scalars['uuid'][] | null),_in?: (Scalars['uuid'][][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['uuid'][] | null),_lte?: (Scalars['uuid'][] | null),_neq?: (Scalars['uuid'][] | null),_nin?: (Scalars['uuid'][][] | null)}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export interface UuidComparisonExp {_eq?: (Scalars['uuid'] | null),_gt?: (Scalars['uuid'] | null),_gte?: (Scalars['uuid'] | null),_in?: (Scalars['uuid'][] | null),_isNull?: (Scalars['Boolean'] | null),_lt?: (Scalars['uuid'] | null),_lte?: (Scalars['uuid'] | null),_neq?: (Scalars['uuid'] | null),_nin?: (Scalars['uuid'][] | null)}

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
    /** fetch data from the table: "category_enum" */
    categoryEnum?: (CategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (CategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (CategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (CategoryEnumBoolExp | null)} })
    /** fetch data from the table: "category_enum" using primary key columns */
    categoryEnumByPk?: (CategoryEnumGenqlSelection & { __args: {domain: Scalars['String'], name: Scalars['String']} })
    /** fetch data from the table: "chat" */
    chat?: (ChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatBoolExp | null)} })
    /** fetch data from the table: "chat" using primary key columns */
    chatByPk?: (ChatGenqlSelection & { __args: {chatId: Scalars['Int']} })
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
    /** fetch data from the table: "complexity_enum" */
    complexityEnum?: (ComplexityEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ComplexityEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ComplexityEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "complexity_enum" using primary key columns */
    complexityEnumByPk?: (ComplexityEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "domain_enum" */
    domainEnum?: (DomainEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DomainEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DomainEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DomainEnumBoolExp | null)} })
    /** fetch data from the table: "domain_enum" using primary key columns */
    domainEnumByPk?: (DomainEnumGenqlSelection & { __args: {name: Scalars['String']} })
    /** fetch data from the table: "example" */
    example?: (ExampleGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ExampleSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ExampleOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ExampleBoolExp | null)} })
    /** fetch data from the table: "example" using primary key columns */
    exampleByPk?: (ExampleGenqlSelection & { __args: {exampleId: Scalars['uuid']} })
    /** fetch data from the table: "label" */
    label?: (LabelGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelBoolExp | null)} })
    /** fetch data from the table: "label" using primary key columns */
    labelByPk?: (LabelGenqlSelection & { __args: {labelId: Scalars['Int']} })
    /** fetch data from the table: "label_chatbot_category_domain" */
    labelChatbotCategoryDomain?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    /** fetch data from the table: "length_enum" */
    lengthEnum?: (LengthEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LengthEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LengthEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LengthEnumBoolExp | null)} })
    /** fetch data from the table: "length_enum" using primary key columns */
    lengthEnumByPk?: (LengthEnumGenqlSelection & { __args: {value: Scalars['String']} })
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
    messageByPk?: (MessageGenqlSelection & { __args: {messageId: Scalars['uuid']} })
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
    /** fetch data from the table: "models_enum" */
    modelsEnum?: (ModelsEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ModelsEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ModelsEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ModelsEnumBoolExp | null)} })
    /** fetch data from the table: "models_enum" using primary key columns */
    modelsEnumByPk?: (ModelsEnumGenqlSelection & { __args: {name: Scalars['String']} })
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
    /** fetch data from the table: "subcategory_enum" */
    subcategoryEnum?: (SubcategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (SubcategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (SubcategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (SubcategoryEnumBoolExp | null)} })
    /** fetch data from the table: "subcategory_enum" using primary key columns */
    subcategoryEnumByPk?: (SubcategoryEnumGenqlSelection & { __args: {category: Scalars['String'], domain: Scalars['String'], name: Scalars['String']} })
    /** fetch data from the table: "tag_enum" */
    tagEnum?: (TagEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (TagEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (TagEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (TagEnumBoolExp | null)} })
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
    threadByPk?: (ThreadGenqlSelection & { __args: {threadId: Scalars['uuid']} })
    /** fetch data from the table: "tone_enum" */
    toneEnum?: (ToneEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ToneEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ToneEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ToneEnumBoolExp | null)} })
    /** fetch data from the table: "tone_enum" using primary key columns */
    toneEnumByPk?: (ToneEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table: "type_enum" */
    typeEnum?: (TypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (TypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (TypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (TypeEnumBoolExp | null)} })
    /** fetch data from the table: "type_enum" using primary key columns */
    typeEnumByPk?: (TypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
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
    userByPk?: (UserGenqlSelection & { __args: {userId: Scalars['uuid']} })
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
    /** fetch data from the table: "category_enum" */
    categoryEnum?: (CategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (CategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (CategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (CategoryEnumBoolExp | null)} })
    /** fetch data from the table: "category_enum" using primary key columns */
    categoryEnumByPk?: (CategoryEnumGenqlSelection & { __args: {domain: Scalars['String'], name: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "category_enum" */
    categoryEnumStream?: (CategoryEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (CategoryEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (CategoryEnumBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "category" */
    categoryStream?: (CategoryGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (CategoryStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (CategoryBoolExp | null)} })
    /** fetch data from the table: "chat" */
    chat?: (ChatGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ChatSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ChatOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ChatBoolExp | null)} })
    /** fetch data from the table: "chat" using primary key columns */
    chatByPk?: (ChatGenqlSelection & { __args: {chatId: Scalars['Int']} })
    /** fetch data from the table in a streaming manner: "chat" */
    chatStream?: (ChatGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ChatStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ChatBoolExp | null)} })
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
    /** fetch data from the table: "complexity_enum" */
    complexityEnum?: (ComplexityEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ComplexityEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ComplexityEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "complexity_enum" using primary key columns */
    complexityEnumByPk?: (ComplexityEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "complexity_enum" */
    complexityEnumStream?: (ComplexityEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ComplexityEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ComplexityEnumBoolExp | null)} })
    /** fetch data from the table: "domain_enum" */
    domainEnum?: (DomainEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (DomainEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (DomainEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (DomainEnumBoolExp | null)} })
    /** fetch data from the table: "domain_enum" using primary key columns */
    domainEnumByPk?: (DomainEnumGenqlSelection & { __args: {name: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "domain_enum" */
    domainEnumStream?: (DomainEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (DomainEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (DomainEnumBoolExp | null)} })
    /** fetch data from the table: "example" */
    example?: (ExampleGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ExampleSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ExampleOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ExampleBoolExp | null)} })
    /** fetch data from the table: "example" using primary key columns */
    exampleByPk?: (ExampleGenqlSelection & { __args: {exampleId: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "example" */
    exampleStream?: (ExampleGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ExampleStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ExampleBoolExp | null)} })
    /** fetch data from the table: "label" */
    label?: (LabelGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelBoolExp | null)} })
    /** fetch data from the table: "label" using primary key columns */
    labelByPk?: (LabelGenqlSelection & { __args: {labelId: Scalars['Int']} })
    /** fetch data from the table: "label_chatbot_category_domain" */
    labelChatbotCategoryDomain?: (LabelChatbotCategoryDomainGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LabelChatbotCategoryDomainSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LabelChatbotCategoryDomainOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "label_chatbot_category_domain" */
    labelChatbotCategoryDomainStream?: (LabelChatbotCategoryDomainGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (LabelChatbotCategoryDomainStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (LabelChatbotCategoryDomainBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "label" */
    labelStream?: (LabelGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (LabelStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (LabelBoolExp | null)} })
    /** fetch data from the table: "length_enum" */
    lengthEnum?: (LengthEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (LengthEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (LengthEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (LengthEnumBoolExp | null)} })
    /** fetch data from the table: "length_enum" using primary key columns */
    lengthEnumByPk?: (LengthEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "length_enum" */
    lengthEnumStream?: (LengthEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (LengthEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (LengthEnumBoolExp | null)} })
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
    messageByPk?: (MessageGenqlSelection & { __args: {messageId: Scalars['uuid']} })
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
    /** fetch data from the table: "models_enum" */
    modelsEnum?: (ModelsEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ModelsEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ModelsEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ModelsEnumBoolExp | null)} })
    /** fetch data from the table: "models_enum" using primary key columns */
    modelsEnumByPk?: (ModelsEnumGenqlSelection & { __args: {name: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "models_enum" */
    modelsEnumStream?: (ModelsEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ModelsEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ModelsEnumBoolExp | null)} })
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
    /** fetch data from the table: "subcategory_enum" */
    subcategoryEnum?: (SubcategoryEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (SubcategoryEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (SubcategoryEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (SubcategoryEnumBoolExp | null)} })
    /** fetch data from the table: "subcategory_enum" using primary key columns */
    subcategoryEnumByPk?: (SubcategoryEnumGenqlSelection & { __args: {category: Scalars['String'], domain: Scalars['String'], name: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "subcategory_enum" */
    subcategoryEnumStream?: (SubcategoryEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (SubcategoryEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (SubcategoryEnumBoolExp | null)} })
    /** fetch data from the table: "tag_enum" */
    tagEnum?: (TagEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (TagEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (TagEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (TagEnumBoolExp | null)} })
    /** fetch data from the table in a streaming manner: "tag_enum" */
    tagEnumStream?: (TagEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (TagEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (TagEnumBoolExp | null)} })
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
    threadByPk?: (ThreadGenqlSelection & { __args: {threadId: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "thread" */
    threadStream?: (ThreadGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ThreadStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ThreadBoolExp | null)} })
    /** fetch data from the table: "tone_enum" */
    toneEnum?: (ToneEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (ToneEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (ToneEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (ToneEnumBoolExp | null)} })
    /** fetch data from the table: "tone_enum" using primary key columns */
    toneEnumByPk?: (ToneEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "tone_enum" */
    toneEnumStream?: (ToneEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (ToneEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (ToneEnumBoolExp | null)} })
    /** fetch data from the table: "type_enum" */
    typeEnum?: (TypeEnumGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinctOn?: (TypeEnumSelectColumn[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    orderBy?: (TypeEnumOrderBy[] | null), 
    /** filter the rows returned */
    where?: (TypeEnumBoolExp | null)} })
    /** fetch data from the table: "type_enum" using primary key columns */
    typeEnumByPk?: (TypeEnumGenqlSelection & { __args: {value: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "type_enum" */
    typeEnumStream?: (TypeEnumGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batchSize: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (TypeEnumStreamCursorInput | null)[], 
    /** filter the rows returned */
    where?: (TypeEnumBoolExp | null)} })
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
    userByPk?: (UserGenqlSelection & { __args: {userId: Scalars['uuid']} })
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
    


    const CategoryEnum_possibleTypes: string[] = ['CategoryEnum']
    export const isCategoryEnum = (obj?: { __typename?: any } | null): obj is CategoryEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCategoryEnum"')
      return CategoryEnum_possibleTypes.includes(obj.__typename)
    }
    


    const Chat_possibleTypes: string[] = ['Chat']
    export const isChat = (obj?: { __typename?: any } | null): obj is Chat => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChat"')
      return Chat_possibleTypes.includes(obj.__typename)
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
    


    const ComplexityEnum_possibleTypes: string[] = ['ComplexityEnum']
    export const isComplexityEnum = (obj?: { __typename?: any } | null): obj is ComplexityEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isComplexityEnum"')
      return ComplexityEnum_possibleTypes.includes(obj.__typename)
    }
    


    const DomainEnum_possibleTypes: string[] = ['DomainEnum']
    export const isDomainEnum = (obj?: { __typename?: any } | null): obj is DomainEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDomainEnum"')
      return DomainEnum_possibleTypes.includes(obj.__typename)
    }
    


    const Example_possibleTypes: string[] = ['Example']
    export const isExample = (obj?: { __typename?: any } | null): obj is Example => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExample"')
      return Example_possibleTypes.includes(obj.__typename)
    }
    


    const Label_possibleTypes: string[] = ['Label']
    export const isLabel = (obj?: { __typename?: any } | null): obj is Label => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLabel"')
      return Label_possibleTypes.includes(obj.__typename)
    }
    


    const LabelChatbotCategoryDomain_possibleTypes: string[] = ['LabelChatbotCategoryDomain']
    export const isLabelChatbotCategoryDomain = (obj?: { __typename?: any } | null): obj is LabelChatbotCategoryDomain => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLabelChatbotCategoryDomain"')
      return LabelChatbotCategoryDomain_possibleTypes.includes(obj.__typename)
    }
    


    const LengthEnum_possibleTypes: string[] = ['LengthEnum']
    export const isLengthEnum = (obj?: { __typename?: any } | null): obj is LengthEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLengthEnum"')
      return LengthEnum_possibleTypes.includes(obj.__typename)
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
    


    const ModelsEnum_possibleTypes: string[] = ['ModelsEnum']
    export const isModelsEnum = (obj?: { __typename?: any } | null): obj is ModelsEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isModelsEnum"')
      return ModelsEnum_possibleTypes.includes(obj.__typename)
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
    


    const SubcategoryEnum_possibleTypes: string[] = ['SubcategoryEnum']
    export const isSubcategoryEnum = (obj?: { __typename?: any } | null): obj is SubcategoryEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSubcategoryEnum"')
      return SubcategoryEnum_possibleTypes.includes(obj.__typename)
    }
    


    const TagEnum_possibleTypes: string[] = ['TagEnum']
    export const isTagEnum = (obj?: { __typename?: any } | null): obj is TagEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTagEnum"')
      return TagEnum_possibleTypes.includes(obj.__typename)
    }
    


    const Thread_possibleTypes: string[] = ['Thread']
    export const isThread = (obj?: { __typename?: any } | null): obj is Thread => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isThread"')
      return Thread_possibleTypes.includes(obj.__typename)
    }
    


    const ToneEnum_possibleTypes: string[] = ['ToneEnum']
    export const isToneEnum = (obj?: { __typename?: any } | null): obj is ToneEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isToneEnum"')
      return ToneEnum_possibleTypes.includes(obj.__typename)
    }
    


    const TypeEnum_possibleTypes: string[] = ['TypeEnum']
    export const isTypeEnum = (obj?: { __typename?: any } | null): obj is TypeEnum => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTypeEnum"')
      return TypeEnum_possibleTypes.includes(obj.__typename)
    }
    


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
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
    

export const enumCategoryEnumSelectColumn = {
   added: 'added' as const,
   domain: 'domain' as const,
   name: 'name' as const
}

export const enumCategorySelectColumn = {
   categoryId: 'categoryId' as const,
   name: 'name' as const
}

export const enumChatSelectColumn = {
   addedBy: 'addedBy' as const,
   chatId: 'chatId' as const,
   chatbotId: 'chatbotId' as const,
   conversationLink: 'conversationLink' as const
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

export const enumComplexityEnumSelectColumn = {
   value: 'value' as const
}

export const enumCursorOrdering = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumDomainEnumSelectColumn = {
   added: 'added' as const,
   name: 'name' as const
}

export const enumExampleSelectColumn = {
   added: 'added' as const,
   category: 'category' as const,
   domain: 'domain' as const,
   exampleId: 'exampleId' as const,
   metadata: 'metadata' as const,
   prompt: 'prompt' as const,
   response: 'response' as const,
   subcategory: 'subcategory' as const,
   tags: 'tags' as const
}

export const enumLabelChatbotCategoryDomainSelectColumn = {
   categoryId: 'categoryId' as const,
   chatbotId: 'chatbotId' as const,
   labelId: 'labelId' as const
}

export const enumLabelSelectColumn = {
   advancedLabels: 'advancedLabels' as const,
   categories: 'categories' as const,
   labelId: 'labelId' as const,
   questions: 'questions' as const,
   subCategories: 'subCategories' as const,
   tags: 'tags' as const
}

export const enumLengthEnumSelectColumn = {
   value: 'value' as const
}

export const enumMessageSelectColumn = {
   augmentedFrom: 'augmentedFrom' as const,
   content: 'content' as const,
   createdAt: 'createdAt' as const,
   examples: 'examples' as const,
   messageId: 'messageId' as const,
   prompt: 'prompt' as const,
   role: 'role' as const,
   threadId: 'threadId' as const
}

export const enumMessageTypeEnumSelectColumn = {
   value: 'value' as const
}

export const enumModelsEnumEnum = {
   ANTHROPIC: 'ANTHROPIC' as const,
   OPENAI: 'OPENAI' as const,
   PERPLEXITY: 'PERPLEXITY' as const,
   WORDWARE: 'WORDWARE' as const
}

export const enumModelsEnumSelectColumn = {
   name: 'name' as const,
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

export const enumSubcategoryEnumSelectColumn = {
   added: 'added' as const,
   category: 'category' as const,
   domain: 'domain' as const,
   name: 'name' as const
}

export const enumTagEnumSelectColumn = {
   domain: 'domain' as const,
   frequency: 'frequency' as const,
   name: 'name' as const
}

export const enumThreadSelectColumn = {
   chatbotId: 'chatbotId' as const,
   createdAt: 'createdAt' as const,
   isApproved: 'isApproved' as const,
   isPublic: 'isPublic' as const,
   model: 'model' as const,
   threadId: 'threadId' as const,
   updatedAt: 'updatedAt' as const,
   userId: 'userId' as const
}

export const enumToneEnumSelectColumn = {
   value: 'value' as const
}

export const enumTypeEnumSelectColumn = {
   value: 'value' as const
}

export const enumUserSelectColumn = {
   dateJoined: 'dateJoined' as const,
   email: 'email' as const,
   lastLogin: 'lastLogin' as const,
   proUserSubscriptionId: 'proUserSubscriptionId' as const,
   profilePicture: 'profilePicture' as const,
   slug: 'slug' as const,
   userId: 'userId' as const,
   username: 'username' as const
}
