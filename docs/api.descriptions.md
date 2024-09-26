# MASTERBOTS/apps/masterbots.ai/app/api/chat/actions/actions.tsx 
- **Description**: This module initializes clients for various AI services (OpenAI, Anthropic, Perplexity) and handles the creation of response streams for AI interactions. It abstracts the differences between AI services to provide a uniform API for the server.
  
- **Dependencies**: 
  - `setStreamerPayload` from `@/lib/ai-helpers`: Modifies the structure of the messages payload based on the AI client type.
  - `Anthropic`, `OpenAI`, `AnthropicStream`, `OpenAIStream`, `StreamingTextResponse`: Used to initialize AI clients and create response streams.
  - **Environment Variables**:
    - `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `PERPLEXITY_API_KEY`: Required for authenticating with respective AI services.

- **Additional Information**:
  - **Functions**:
    - `initializeOpenAI(apiKey: string)`: Initializes an OpenAI client.
    - `initializeAnthropic(apiKey: string)`: Initializes an Anthropic client.
    - `initializePerplexity(apiKey: string)`: Initializes a Perplexity client.
    - `createResponseStream(clientType: AiClientType, json: JSONResponseStream, req?: Request)`: Creates a response stream based on the specified AI client type.
  - **Error Handling**: Throws errors if environment variables are not set or if an unsupported client model type is specified.
  - **Client-Specific Parameters**: Handles API key overrides with `previewToken`, and configures specific parameters like `temperature`, `max_tokens`, and `top_p` based on the AI client.


# MASTERBOTS/apps/masterbots.ai/app/api/chat/models/models.ts
- **Description**: This enum defines a set of AI model identifiers used within the application. Each identifier corresponds to a specific AI model that can be utilized for different AI tasks.

- **Dependencies**: None.

- **Enum Values**:
  - `Default`: `'gpt-3.5-turbo'` - The default model, typically used for general AI tasks.
  - `GPT4`: `'gpt-4'` - A more advanced model for complex AI interactions.
  - `Claude3`: `'claude-3-haiku-20240307'` - Represents the Claude 3 AI model.
  - `llama3_8b`: `'llama-3-sonar-small-32k-online'` - A smaller LLaMA model for specific tasks.
  - `llama3_7b`: `'llama-3-sonar-large-32k-online'` - A larger LLaMA model for more resource-intensive tasks.
  - `WordWare`: `'wordware-ai'` - The WordWare AI model, specialized for certain types of processing.

- **Additional Information**:
  - **Usage**: The `AIModels` enum allows for easy selection of AI models within the application, ensuring consistency and reducing the likelihood of errors when specifying model names.


# MASTERBOTS/apps/masterbots.ai/app/api/chat/route.ts
- **Description**: This function handles POST requests to create AI response streams. It processes the incoming request, determines the AI client type based on the model specified, and then delegates the creation of the response stream to the `createResponseStream` function.

- **Dependencies**:
  - `createResponseStream` from `@/app/api/chat/actions/actions`: Used to generate the AI response stream.
  - `getModelClientType` from `@/lib/ai-helpers`: Determines the type of AI client based on the provided model.

- **Additional Information**:
  - **Runtime**: The function is designed to run on the edge (`runtime = 'edge'`), optimizing performance for edge environments.
  - **User Authentication**: There is a placeholder (commented out) for checking user sessions, ensuring that users have an active session for up to 30 days. If the session is not found, the function would return a `401 Unauthorized` response.
  - **Internal Testing Note**: A condition exists for internal testing during the transition to AI SDK 3.1. This condition currently affects how the response stream is created, but will be integrated into the `createResponseStream` function in future updates.


# MASTERBOTS/apps/masterbots.ai/app/api/og/route.tsx
- **Description**: This function handles GET requests to generate an Open Graph (OG) image based on a specific thread's content. It retrieves thread details from the backend and uses this data to create a custom image that can be used for social sharing.

- **Dependencies**:
  - `ImageResponse` from `@vercel/og`: Used to generate the OG image response.
  - `NextRequest` from `next/server`: Handles the incoming request object.
  - `getThread` from `@/services/hasura`: Fetches thread data, including messages and user information, from a Hasura backend.
  - `OGImage` from `@/components/og-image`: A React component used to render the OG image layout.
  - **CSS**: Global styles are applied from `@/app/globals.css`.

- **Additional Information**:
  - **Runtime**: The function is designed to run on the edge (`runtime = 'edge'`), providing low-latency image generation.
  - **Parameters**: The thread ID is extracted from the URL's search parameters (`threadId`) to identify which thread to use for the image.
  - **Theme Handling**: The function checks the user's theme preference (light or dark) and applies it to the OG image. The theme is retrieved from `localStorage`, though this part may not be functional server-side.
  - **Error Handling**: If the image generation fails, the function logs the error and returns a `500` status response with a failure message.


# MASTERBOTS/apps/masterbots.ai/app/api/payment/intent/route.tsx
- **Description**: This function handles the creation of a subscription for a customer in Stripe. It checks if a customer with the provided email already exists; if not, it creates a new customer. Then, it creates a subscription using the provided plan ID and optional trial period. The function returns the client secret of the payment intent associated with the subscription.

- **Dependencies**:
  - `NextRequest` from `next/server`: Handles the incoming request object.
  - `Stripe` from `stripe`: Used to interact with the Stripe API for customer and subscription management.

- **Additional Information**:
  - **Error Handling**: If there is an issue with creating the subscription, the function logs the error and returns a JSON response with an appropriate error message and status code.
  - **Request Validation**: The function ensures that `email`, `name`, and `planId` are provided in the request body, returning a `400` status if any are missing.
  - **Stripe API Version**: The function is compatible with the `2024-04-10` version of the Stripe API.

## DELETE Function
- **Description**: This function handles the deletion of a customer and their incomplete subscriptions in Stripe. It checks if the customer has any active subscriptions and only deletes the customer if none are active. If active subscriptions are found, only incomplete subscriptions are deleted.

- **Dependencies**:
  - `NextRequest` from `next/server`: Handles the incoming request object.
  - `Stripe` from `stripe`: Used to interact with the Stripe API for customer and subscription management.

- **Additional Information**:
  - **Error Handling**: The function logs errors and returns a JSON response with the appropriate error message and status code.
  - **Request Validation**: The function ensures that `email` is provided in the request body, returning a `400` status if missing.
  - **Customer Management**: The function deletes the customer from Stripe only if there are no active subscriptions, ensuring that active customers are not inadvertently removed.
  

# MASTERBOTS/apps/masterbots.ai/app/api/payment/plans/route.tsx
- **Description**: This function retrieves all available pricing plans from Stripe and returns them in the response. It includes both the secret and publishable Stripe keys in the response for client-side usage.

- **Dependencies**:
  - `Stripe` from `stripe`: Used to interact with the Stripe API to fetch pricing plans.
  - `Response`: Constructs the HTTP response returned by the function.

- **Additional Information**:
  - **Error Handling**: If there is an error while fetching the plans from Stripe, the function logs the error and returns a `500 Internal Server Error` status with a corresponding error message.
  - **Environment Variables**: The function relies on the `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` environment variables. If the `STRIPE_SECRET_KEY` is not set, it throws an error.
  - **Stripe API Version**: The function is compatible with the `2024-04-10` version of the Stripe API.
  - **Response Content**: The function returns a JSON response with the retrieved pricing plans, along with the secret and publishable keys.


# MASTERBOTS/apps/masterbots.ai/app/api/payment/subscription/route.tsx
- **Description**: This function retrieves subscription details associated with a specific payment intent ID. It also expands details about the payment method (card) and subscription plan.
  
- **Dependencies**:
  - `Stripe` from `stripe`: Used to interact with the Stripe API for retrieving payment intent and subscription details.
  - `NextRequest`: Represents the request object in Next.js.

- **Additional Information**:
  - **Error Handling**: Returns appropriate HTTP status codes and messages based on the presence or absence of the `paymentIntentId`, `paymentIntent`, `invoice`, or `subscriptionId`.
  - **Stripe API Version**: Compatible with the `2024-04-10` version of the Stripe API.
  - **Response Content**: Returns a JSON response containing details about the card used for payment and the associated subscription.

## PUT Function
- **Description**: This function checks if a customer, identified by their email address, has an active subscription.

- **Dependencies**:
  - `Stripe` from `stripe`: Used to search for customers and check their subscription status.
  - `NextRequest`: Represents the request object in Next.js.

- **Additional Information**:
  - **Error Handling**: Handles cases where the email is missing, the customer is not found, or there is an error in the Stripe API.
  - **Response Content**: Returns a JSON response indicating whether the customer has an active subscription.


# MASTERBOTS/apps/masterbots.ai/app/api/payment/sumarize/route.tsx
- **Description**: This function retrieves payment details using a confirmation token ID provided in the request body. The function then returns a summarized version of these payment details.
  
- **Dependencies**:
  - `NextRequest`: Represents the request object in Next.js.
  - `stripe`: The Stripe library is used to interact with the Stripe API. It's initialized with the `STRIPE_SECRET_KEY` environment variable.

- **Additional Information**:
  - **Error Handling**: 
    - Throws an error if the Stripe secret key is not set.
    - Returns a 500 status code with an error message if there’s an issue retrieving the payment details.
  - **Response Content**: 
    - If successful, returns a JSON response with the summarized payment details.
    - If the `confirmation_token_id` is not provided or an error occurs, the function responds with an appropriate error message.
  - **Runtime**: Edge runtime is specified for better performance and scalability.

- **Helper Function**:
  - **`summarizePaymentDetails(confirmationToken: any)`**: This function processes the `confirmationToken` object to extract and return the relevant summary fields for the UI.
