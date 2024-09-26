# MASTERBOTS/apps/masterbots.ai/services/hasura/hasura.service.ts
**Description:** This module provides a set of asynchronous functions to interact with a Hasura backend, leveraging the `mb-genql` client for querying and mutating data related to categories, chatbots, threads, messages, and users.

**Dependencies:**
- `mb-env`: Used for environment validation.
- `mb-genql`: Provides the `createMbClient` function and GraphQL queries/mutations for interacting with the Hasura API.

**Functions:**
- `getHasuraClient(params)`: Creates and returns a `mb-genql` client instance configured with JWT or admin secret.
- `getCategories()`: Fetches a list of categories.
- `getCategory(params)`: Retrieves a specific category by ID.
- `getChatbots(params)`: Fetches a list of chatbots with optional filters.
- `getThreads(params)`: Retrieves threads based on various filters such as chatbot name, category ID, or user ID.
- `getThread(params)`: Fetches a specific thread by ID.
- `saveNewMessage(params)`: Inserts a new message into the database.
- `upsertUser(params)`: Creates or updates a user, ensuring a unique slug.
- `createThread(params)`: Creates a new thread with specified parameters.
- `getChatbot(params)`: Retrieves a chatbot by ID or name, with optional threads.
- `getBrowseThreads(params)`: Fetches threads for browsing with various filters and search options.
- `getMessages(params)`: Retrieves messages for a specific thread.
- `getChatbotsCount(params)`: Returns the count of chatbots in a category.
- `getUserInfoFromBrowse(slug)`: Fetches user information based on a slug.
- `getThreadsWithoutJWT()`: Retrieves all threads without authentication.
- `getUsers()`: Fetches a list of users with their slugs.

This module centralizes data retrieval and mutation logic related to chatbots and threads, interfacing with the Hasura backend to provide comprehensive functionality.


# MASTERBOTS/apps/masterbots.ai/services/hasura/hasura.service.type.ts
**Description:** This module defines TypeScript types and interfaces used for interacting with the Hasura backend. It specifies the parameters required for various functions in the `hasura.service.ts` module.

**Types and Interfaces:**

- **`GetHasuraClientParams`**: Parameters for creating a Hasura client.
  - `jwt` (optional): JSON Web Token for authentication.
  - `adminSecret` (optional): Admin secret for authentication.

- **`HasuraServiceParams`**: Common parameters for Hasura service functions.
  - `jwt`: JSON Web Token for authentication.

- **`GetThreadsParams`**: Parameters for retrieving threads.
  - `chatbotName` (optional): Name of the chatbot.
  - `userId`: User ID for filtering threads.
  - `categoryId` (optional): Category ID for filtering threads.
  - `keyword` (optional): Keyword for searching threads.
  - `limit` (optional): Maximum number of threads to return.
  - `offset` (optional): Number of threads to skip.

- **`GetThreadParams`**: Parameters for retrieving a specific thread.
  - `threadId`: ID of the thread to retrieve.

- **`SaveNewMessageParams`**: Parameters for saving a new message.
  - `content`: Content of the message.
  - `role`: Role of the message sender (`'user'` or `'assistant'`).
  - `threadId`: ID of the thread to which the message belongs.

- **`UpsertUserParams`**: Parameters for creating or updating a user (admin only).
  - `email`: User's email address.
  - `profilePicture`: URL of the user's profile picture.
  - `username`: User's username.
  - `password`: User's password.
  - `adminSecret`: Admin secret for authentication.

- **`CreateThreadParams`**: Parameters for creating a new thread.
  - `chatbotId`: ID of the chatbot associated with the thread.
  - `threadId`: ID of the new thread.
  - `userId`: ID of the user creating the thread.
  - `isPublic` (optional): Whether the thread is public.

- **`GetChatbotParams`**: Parameters for retrieving a chatbot.
  - `chatbotId` (optional): ID of the chatbot.
  - `chatbotName` (optional): Name of the chatbot.
  - `threads` (optional): Whether to include threads.

- **`GetBrowseThreadsParams`**: Parameters for browsing threads.
  - `categoryId` (optional): Category ID for filtering.
  - `keyword` (optional): Keyword for searching.
  - `userId` (optional): User ID for filtering.
  - `chatbotName` (optional): Name of the chatbot for filtering.
  - `slug` (optional): User slug for filtering.
  - `limit` (optional): Maximum number of threads to return.
  - `offset` (optional): Number of threads to skip.

- **`GetChatbotsParams`**: Parameters for retrieving chatbots.
  - `limit` (optional): Maximum number of chatbots to return.
  - `offset` (optional): Number of chatbots to skip.
  - `categoryId` (optional): Category ID for filtering.

- **`GetMessagesParams`**: Parameters for retrieving messages.
  - `threadId`: ID of the thread to retrieve messages from.
  - `limit` (optional): Maximum number of messages to return.
  - `offset` (optional): Number of messages to skip.

