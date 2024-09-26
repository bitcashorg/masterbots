# MASTERBOTS/apps/masterbots.ai/actions.ts
**Description:** This module provides functions and types for generating short links using the Dub.co API and managing action states. It uses the `axios` library for HTTP requests and `zod` for validation.

**Functions:**

- **`generateShortLink(path: string): Promise<ActionState>`**
  - **Description:** Generates a short link for a given path using the Dub.co API.
  - **Parameters:**
    - `path`: The path to be shortened.
  - **Returns:** An object containing either the short link details or an error.

**Types:**

- **`DubShareLinkResponse`**
  - **Description:** Response type from the Dub.co API for link generation.
  - **Properties:**
    - `key`: Unique key for the generated link.
    - `shortLink`: The shortened URL.
    - `qrCode`: QR code for the shortened URL.

- **`ActionState`**
  - **Description:** Represents the state of an action.
  - **Properties:**
    - `data` (optional): Data returned from the action.
    - `error` (optional): Error message if the action failed.

**Dependencies:**

- `axios`: For making HTTP requests.
- `resend`: Not used directly but mentioned in imports, potentially for other actions.
- `zod`: For validation (though not used directly in the provided code).


# MASTERBOTS/apps/masterbots.ai/auth.ts
**Description:** This module configures authentication using NextAuth.js with Google as the provider. It handles JWT creation and user session management, integrating with a Hasura backend and using custom utilities for user management and token generation.

**Configuration:**

- **Providers:**
  - **Google**
    - **Client ID:** `process.env.GOOGLE_CLIENT_ID`
    - **Client Secret:** `process.env.GOOGLE_CLIENT_SECRET`

- **Callbacks:**
  - **`signIn`**
    - **Description:** Checks if the profile exists and allows sign-in.
  - **`jwt`**
    - **Description:** Handles JWT creation and user upsertion. Generates a Hasura JWT and stores it in the token if the user profile is available.
    - **Dependencies:**
      - `upsertUser`: For creating or updating user information in Hasura.
      - `getToken`: For generating a Hasura JWT.
      - `validateJwtSecret`: For validating the JWT secret.
  - **`session`**
    - **Description:** Updates the session object with user details from the token, including the Hasura JWT.
  - **`authorized`**
    - **Description:** Ensures that there is a logged-in user for every request.

- **Pages:**
  - **`signIn`**
    - **Description:** Custom sign-in page URL.

**Types:**

- **`Session`**
  - **Description:** Extends the default session object to include additional user information and the Hasura JWT.
  - **Properties:**
    - `id`: User ID.
    - `image`: User profile image.
    - `name`: User name.
    - `hasuraJwt`: Hasura JWT.

**Dependencies:**

- `next-auth`: Authentication library.
- `axios`: For HTTP requests (though not directly used in this file).
- `mb-lib`: Custom library for token generation and validation.
- `services/hasura`: Custom service for user management.
- `lib/utils`: Utility functions like `nanoid` for generating unique IDs.
