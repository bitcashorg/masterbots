# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-at-bottom.tsx
**Description:**  
The `useAtBottom` hook is designed to determine if the scroll position is at the bottom of a given element. It utilizes `MotionValue` from `framer-motion` to track the scrollY value and updates the state `isAtBottom` accordingly.

**Dependencies:**
- `framer-motion` for the `MotionValue`
- `useEffect` and `useState` from React for state management and side effects.

**Usage:**
- Takes a `ref` to the target element and a `MotionValue` instance for `scrollY`.
- Returns an `isAtBottom` boolean indicating if the user has scrolled to the bottom.

This hook is useful for implementing infinite scroll or loading more content as the user reaches the bottom of a page or component.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-browse.tsx
**Description:**  
The `useBrowse` hook and `BrowseProvider` component manage the state of browsing context, including a `keyword` and a `tab` selection. It provides a context for components to access and modify the current browsing state.

**Dependencies:**
- `React` for context, state management, and creating provider components.

**Components:**
- **`useBrowse` Hook:** 
  - Provides access to the browsing context (`keyword`, `tab`, `changeKeyword`, `changeTab`).
  - Throws an error if used outside of the `BrowseProvider`.
  
- **`BrowseProvider` Component:** 
  - Wraps children components and provides them with access to the browsing context.
  - Manages `keyword` and `tab` state and provides functions to update them.

**Usage:**
- Wrap your application or component tree with `BrowseProvider` to use the `useBrowse` hook.
- The hook allows components to read and modify the current `keyword` and `tab` states, making it ideal for filtering or tabbed browsing interfaces.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-click-outside.tsx
**Description:**  
The `useClickOutside` hook detects clicks outside of a specified DOM element and triggers a callback function. It's useful for closing dropdowns, popovers, or modals when the user clicks outside of the component.

**Dependencies:**
- `React` for the `useEffect` hook.
- `RefObject` from React for referencing the DOM element.

**Usage:**
- **Parameters:**
  - `elementRef`: A React `RefObject` pointing to the DOM element to monitor for outside clicks.
  - `toggleVisiblePopover`: A callback function to be invoked when a click outside the element is detected.
  
- **Behavior:**
  - The hook adds an event listener for `click` events on the document.
  - If a click occurs outside the referenced element, the `toggleVisiblePopover` function is triggered.
  - The event listener is cleaned up when the component unmounts.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-copy-to-clipboard.tsx
**Description:**  
The `useCopyToClipboard` hook provides functionality to copy text to the clipboard and manage the copied state. It's useful for adding "copy to clipboard" features in your application.

**Dependencies:**
- `React` for managing state with the `useState` hook.

**Usage:**
- **Parameters:**
  - `timeout` (optional): The duration (in milliseconds) for which the `isCopied` state remains `true` after copying. Default is 2000ms.
  
- **Returns:**
  - `isCopied`: A boolean state that indicates whether the text has been successfully copied.
  - `copyToClipboard`: A function that accepts a string value to copy to the clipboard.

- **Behavior:**
  - The `copyToClipboard` function checks if the clipboard API is available and if a value is provided.
  - Upon successful copying, `isCopied` is set to `true` for the specified timeout duration, after which it resets to `false`.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-enter-submit.tsx
**Description:**  
The `useEnterSubmit` hook facilitates form submission when the "Enter" key is pressed while focusing on a `textarea` element. It allows for a smoother user experience by enabling form submission via keyboard shortcuts.

**Dependencies:**
- `React` for managing refs and event handling.

**Usage:**
- **Returns:**
  - `formRef`: A `RefObject` that should be attached to the `HTMLFormElement` to be submitted.
  - `onKeyDown`: A handler function for `onKeyDown` events on `textarea` elements that triggers the form submission if the "Enter" key is pressed without the Shift key.

- **Behavior:**
  - The `handleKeyDown` function checks if the "Enter" key is pressed (`event.key === 'Enter'`), and prevents the default behavior if `event.shiftKey` is not pressed and `event.nativeEvent.isComposing` is false.
  - It then calls `requestSubmit` on the form referenced by `formRef` to submit the form and prevents the default behavior of the "Enter" key.


# lMASTERBOTS/apps/masterbots.ai/lib/hooks/use-local-storage.ts
**Description:**  
The `useLocalStorage` hook synchronizes a state variable with `localStorage`, allowing for persistent state across page reloads. It provides a way to retrieve and update values stored in `localStorage` with ease.

**Dependencies:**
- `React` for managing state and side effects.

**Usage:**
- **Parameters:**
  - `key`: A `string` representing the key under which the value is stored in `localStorage`.
  - `initialValue`: The initial value to set if no value is found in `localStorage`.

- **Returns:**
  - An array containing:
    - `storedValue`: The current value retrieved from `localStorage` or initialized with `initialValue`.
    - `setValue`: A function to update the value in both state and `localStorage`.

- **Behavior:**
  - On component mount, it retrieves the value associated with the given key from `localStorage` and updates the state.
  - The `setValue` function updates the state and saves the new value to `localStorage`.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-model.tsx
**Description:**  
The `useModel` hook and `ModelProvider` component manage the selected AI model and its corresponding client type in a React application. This hook provides a way to access and update the selected model and client type contextually across the application.

**Dependencies:**
- `React` for context management and state handling.
- `AIModels` from `@/app/api/chat/models/models` for predefined AI model options.
- `getModelClientType` from `@/lib/ai-helpers` for determining the client type based on the selected model.

**Usage:**
- **`useModel` Hook:**
  - Retrieves the current model context, which includes the selected model, its client type, and a function to change the model.
  - **Throws** an error if used outside a `ModelProvider`.

- **`ModelProvider` Component:**
  - Provides the `ModelContext` to child components, allowing them to access and update the selected AI model and client type.

- **Parameters:**
  - **`ModelProvider`**:
    - `children`: React nodes to be rendered within the provider.

- **Returns:**
  - **`useModel`**:
    - `selectedModel`: The currently selected AI model (default is `AIModels.Default`).
    - `clientType`: The client type associated with the selected model.
    - `changeModel`: Function to update the selected model.

- **Behavior:**
  - The `ModelProvider` initializes with a default AI model and updates the `clientType` based on the selected model.
  - The `changeModel` function updates the `selectedModel` state, which in turn updates the `clientType` through the `useEffect` hook.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-payment.tsx
**Description:**  
The `usePayment` hook and `PaymentProvider` component manage various aspects of payment and user information in a React application. This includes handling the current card details, payment intents, error states, user data, and Stripe secrets.

**Dependencies:**
- `React` for context management and state handling.
- `StripePlan` from `@/lib/types` for handling payment plans.

**Usage:**
- **`usePayment` Hook:**
  - Provides access to the payment context, including current card details, user information, payment intents, error messages, and Stripe configuration.
  - **Throws** an error if used outside a `PaymentProvider`.

- **`PaymentProvider` Component:**
  - Manages and provides the payment context to child components.
  - **State Variables:**
    - `card`: Information about the card, including last 4 digits.
    - `loading`: Boolean indicating if a process is loading.
    - `plan`: Current Stripe plan or `null`.
    - `error`: Error message string.
    - `paymentIntent`: Current payment intent.
    - `user`: Object containing user details (id, image, name, email, hasuraJwt).
    - `confirmationToken`: Token for payment confirmation.
    - `secret`: Secret string for internal use.
    - `stripeSecret`: Stripe secret key.
    - `stripePublishkey`: Stripe publishable key.
  - **Functions:**
    - `handlePlan(plan)`: Sets the current payment plan.
    - `handleSetCard(card)`: Updates card information.
    - `handlePaymentIntent(paymentIntent)`: Updates payment intent.
    - `handleSetError(error)`: Updates error state.
    - `handleSetUser(user)`: Updates user information.
    - `handleSetSecret(secret)`: Updates secret.
    - `handleSetLoading(loading)`: Sets loading state.
    - `handleSetConfirmationToken(token)`: Sets confirmation token.
    - `handleDeleteCustomer(email)`: Deletes a customer by email.
    - `handleSetStripeSecret(stripeSecret)`: Updates Stripe secret key.
    - `handleSetStripePublishKey(stripePublishkey)`: Updates Stripe publishable key.

- **Parameters:**
  - **`PaymentProvider`**:
    - `children`: React nodes to be rendered within the provider.

- **Returns:**
  - **`usePayment`**:
    - `plan`, `card`, `user`, `error`, `secret`, `loading`, `paymentIntent`, `confirmationToken`, `stripeSecret`, `stripePublishkey`: The current state and handlers.
    - Functions to update the state and handle payment-related actions.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-sidebar.tsx
**Description:**  
The `useSidebar` hook and `SidebarProvider` component manage the state of a sidebar in a React application. This includes handling whether the sidebar is open or closed, loading state, active tab, and active category or chatbot. The state is persisted in `localStorage`.

**Dependencies:**
- `React` for context management and state handling.
- `Chatbot` from `mb-genql` for handling chatbot data.

**Usage:**
- **`useSidebar` Hook:**
  - Provides access to the sidebar context, including sidebar open/close state, loading state, active tab, and functions to change these states.
  - **Throws** an error if used outside a `SidebarProvider`.

- **`SidebarProvider` Component:**
  - Manages and provides the sidebar context to child components.
  - **State Variables:**
    - `isSidebarOpen`: Boolean indicating if the sidebar is open.
    - `isLoading`: Boolean indicating if the sidebar state is loading.
    - `activeChatbot`: The currently active chatbot or `null`.
    - `tab`: Current tab ('general' or 'work').
    - `activeCategory`: The currently active category or `null`.
  - **Functions:**
    - `toggleSidebar(toggle = true)`: Toggles the sidebar open/close state and persists it in `localStorage`.
    - `changeTab(cate: 'general' | 'work')`: Changes the active tab.
    - `setActiveCategory`: Updates the active category.
    - `setActiveChatbot`: Updates the active chatbot.

- **Parameters:**
  - **`SidebarProvider`**:
    - `children`: React nodes to be rendered within the provider.

- **Returns:**
  - **`useSidebar`**:
    - `isSidebarOpen`, `isLoading`, `tab`, `activeCategory`, `activeChatbot`: Current state values.
    - Functions to update the state and manage the sidebar.


# MASTERBOTS/apps/masterbots.ai/lib/hooks/use-thread.tsx
**Description:**  
The `useThread` hook and `ThreadProvider` component manage the state and functionality of a chat thread, including fetching and saving messages, handling chat responses, and managing the thread's state and context.

**Dependencies:**
- `React` for context management and state handling.
- `useChat` from `ai/react` for chat functionality.
- `useScroll` from `framer-motion` for scroll-related logic.
- `uniqBy` from `lodash` for unique array filtering.
- Various custom services and hooks such as `getAllUserMessagesAsStringArray`, `getChatbots`, `getChatbotsCount`, `getMessages`, and `saveNewMessage`.

**Usage:**
- **`useThread` Hook:**
  - Provides access to the thread context, including the active thread, all messages, and various functions for managing the chat thread.
  - **Throws** an error if used outside a `ThreadProvider`.

- **`ThreadProvider` Component:**
  - Manages and provides the thread context to child components.
  - **State Variables:**
    - `activeThread`: The currently active chat thread or `null`.
    - `sectionRef`: Reference to the chat section.
    - `messagesFromDB`: Messages fetched from the database.
    - `isNewResponse`: Boolean indicating if there is a new response.
    - `isOpenPopup`: Boolean indicating if a popup is open.
    - `randomChatbot`: A randomly selected chatbot or `null`.
  - **Functions:**
    - `sendMessageFromResponse(bulletContent: string)`: Sends a message based on the provided content and updates the thread.
    - `fetchMessages()`: Fetches messages for the active thread from the database.
    - `getRandomChatbot()`: Fetches a random chatbot based on the active category.
  - **Effects:**
    - Fetches messages when the active thread changes.
    - Updates the thread state when the popup is closed and the active category changes.
    - Fetches a random chatbot when the active category or thread changes.

- **Parameters:**
  - **`ThreadProvider`**:
    - `children`: React nodes to be rendered within the provider.

- **Returns:**
  - **`useThread`**:
    - `activeThread`, `setActiveThread`, `allMessages`, `sendMessageFromResponse`, `initialMessages`, `isNewResponse`, `setIsNewResponse`, `isOpenPopup`, `setIsOpenPopup`, `isAtBottom`, `isLoading`, `sectionRef`, `randomChatbot`, `getRandomChatbot`: Context values and functions.


# MASTERBOTS/apps/masterbots.ai/lib/actions.ts
**Description:**  
The `lib/actions.ts` file includes utility functions for formatting system prompts and determining the appropriate hostname and protocol based on the environment.

**Dependencies:**
- `PromptProps` from `@/lib/types` for type definitions.
- `Message` from `ai` for message type.


# MASTERBOTS/apps/masterbots.ai/lib/ai-helpers.tsx
**Description:**  
The `lib/ai-helpers.tsx` file provides utility functions for working with different AI models, creating payloads for chat messages, and formatting payloads for various client types.

**Dependencies:**
- `AIModels` from `@/app/api/chat/models/models` for AI model types.
- `AiClientType` from `@/lib/types` for client types.
- `MessageParam` from `@anthropic-ai/sdk/resources` for Anthropic message parameters.
- `nanoid` for generating unique IDs.
- `ChatCompletionMessageParam` from `openai/resources` for OpenAI message parameters.

**Exports:**
- `getModelClientType`: Function to get the client type for a given AI model.
- `createPayload`: Function to create a base payload for chat messages.
- `setStreamerPayload`: Function to format the payload based on client type.


# MASTERBOTS/apps/masterbots.ai/lib/metadata.ts
**Description:**  
This file includes functions for generating SEO metadata for pages, specifically tailored for Open Graph and Twitter cards. It also provides functionality to generate metadata for threads.

**Dependencies:**
- `getThread` from `@/services/hasura` for fetching thread details.
- `getThreadLink` from `./threads` for generating thread links.
- `headers` from `next/headers` for accessing request headers.
- `Metadata` type from `next` for type definitions.

**Types:**

- **`OgType`**  
  Represents possible Open Graph types for content:
  - `'website'`
  - `'article'`
  - `'book'`
  - `'profile'`
  - `'music.song'`
  - `'music.album'`
  - `'music.playlist'`
  - `'music.radio_station'`
  - `'video.movie'`
  - `'video.episode'`
  - `'video.tv_show'`
  - `'video.other'`

- **`TwitterCard`**  
  Represents possible Twitter card types:
  - `'summary'`
  - `'summary_large_image'`
  - `'player'`
  - `'app'`

- **`PageSEO`**  
  Interface for page SEO configuration:
  - `title`: The title of the page.
  - `description`: The description of the page.
  - `ogType`: Open Graph type.
  - `ogImageUrl`: Optional URL for the Open Graph image.
  - `twitterCard`: Twitter card type.

**Exports:**
- `generateMetadataFromSEO`: Function to generate general SEO metadata.
- `generateMbMetadata`: Function to generate thread-specific metadata.


# MASTERBOTS/apps/masterbots.ai/lib/threads.ts
**Description:**  
This file contains utility functions for handling message and thread data. It includes functions for cleaning prompts, converting messages, retrieving user messages, and generating thread links.

**Dependencies:**
- `Message` and `Thread` from `mb-genql` for data types.
- `extractBetweenMarkers` from `./utils` for text extraction.
- `toSlug` from `./url` for generating URL-friendly slugs.

**Exports:**
- `cleanPrompt`: Function to clean and extract content from a prompt.
- `convertMessage`: Function to convert a `Message` object to `AI.Message` format.
- `getAllUserMessagesAsStringArray`: Function to get and clean user messages from an array.
- `getThreadLink`: Function to generate a URL link for a thread.


# MASTERBOTS/apps/masterbots.ai/lib/types.ts
**Description:**  
This file defines various TypeScript types and interfaces used throughout the application. It includes types for chat data, server action results, Stripe-related components, and AI client types.

**Dependencies:**
- `Stripe` from `stripe` for Stripe-related types.
- `Message` from `ai` for AI message types.
- `ChatCompletionMessageParam` from `openai/resources` for OpenAI message parameters.

**Types and Interfaces:**

- **`Chat`**
  - **Description:** Represents a chat session with its metadata and associated messages.
  - **Properties:**
    - `id`: Unique identifier for the chat.
    - `title`: Title of the chat.
    - `createdAt`: Creation date of the chat.
    - `userId`: User ID associated with the chat.
    - `path`: Path for accessing the chat.
    - `messages`: Array of messages in the chat.
    - `sharePath?`: Optional path for sharing the chat.


# MASTERBOTS/apps/masterbots.ai/lib/url.ts
**Description:**  
This file provides utility functions and Zod schema for handling URL-related tasks, such as validating and converting slugs, and encoding/decoding URL query parameters.

**Dependencies:**
- `z`, `ZodSchema` from `zod` for schema validation.


# MASTERBOTS/apps/masterbots.ai/lib/utils.ts
**Description:**  
This file contains various utility functions for general-purpose tasks such as string manipulation, date formatting, error handling, and animations. It also includes functions for working with messages and slugs.

**Dependencies:**
- `clsx` for conditional class names.
- `nanoid` for generating unique IDs.
- `tailwind-merge` for merging Tailwind CSS class names.



 







