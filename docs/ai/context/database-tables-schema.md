# Masterbots Hasura Database Schema

The combined YAML file represents the database schema for the Masterbots project using Hasura GraphQL Engine. The schema defines the tables, relationships, and permissions for the Masterbots application.

## Tables

The schema includes the following main tables:

- `chatbot`: Represents the chatbots available in the application. It contains information such as the chatbot's name, description, avatar, default settings, and relationships with other tables.
- `category`: Defines the categories to which chatbots can belong. It has a many-to-many relationship with the `chatbot` table through the `chatbot_category` table.
- `chat`: Stores the chat sessions between users and chatbots. It has foreign key relationships with the `chatbot` and `user` tables.
- `message`: Represents individual messages within a chat thread. It has a foreign key relationship with the `thread` table.
- `thread`: Represents a conversation thread between a user and a chatbot. It has foreign key relationships with the `chatbot` and `user` tables.
- `user`: Stores user information such as username, email, profile picture, and relationships with other tables.
- `prompt`: Contains predefined prompts that can be associated with chatbots or users. It has many-to-many relationships with the `chatbot` and `user` tables through the `prompt_chatbot` and `prompt_user` tables.
- `preference`: Stores user preferences for interacting with chatbots. It has foreign key relationships with the `chatbot` and `user` tables.

## Enums

The schema also includes several enum tables to define predefined values for various attributes:

- `complexity_enum`: Defines the complexity levels for chatbot interactions.
- `length_enum`: Defines the length options for chatbot responses.
- `tone_enum`: Defines the tone options for chatbot responses.
- `type_enum`: Defines the type options for chatbot interactions.

## Relationships

The tables in the schema have various relationships defined using foreign key constraints:

- Many-to-many relationships:
  - `chatbot` and `category` through the `chatbot_category` table.
  - `chatbot` and `prompt` through the `prompt_chatbot` table.
  - `user` and `prompt` through the `prompt_user` table.
- One-to-many relationships:
  - `chatbot` to `chat`, `preference`, and `thread`.
  - `user` to `chat`, `preference`, and `thread`.
  - `thread` to `message`.

## Permissions

The schema defines permissions for different user roles (`anonymous` and `user`) to control access to tables and columns. The permissions specify which columns are accessible and any additional filters that should be applied.

- `anonymous` role: Has limited access to certain columns of the tables for public viewing.
- `user` role: Has more extensive access to tables and columns based on their authentication status.

The permissions ensure that users can only access and modify data that they are authorized to interact with.

Overall, the Hasura database schema provides a structured and secure foundation for building the Masterbots application. It defines the necessary tables, relationships, and permissions to support the core functionalities of the application, such as chatbot interactions, user management, and data storage.

## YAML Table Schema

```yaml
- table:
    name: chatbot
    schema: public
  array_relationships:
    - name: categories
      using:
        foreign_key_constraint_on:
          column: chatbot_id
          table:
            name: chatbot_category
            schema: public
    - name: chats
      using:
        foreign_key_constraint_on:
          column: chatbot_id
          table:
            name: chat
            schema: public
    - name: preferences
      using:
        foreign_key_constraint_on:
          column: chatbot_id
          table:
            name: preference
            schema: public
    - name: prompts
      using:
        foreign_key_constraint_on:
          column: chabot_id
          table:
            name: prompt_chatbot
            schema: public
    - name: threads
      using:
        foreign_key_constraint_on:
          column: chatbot_id
          table:
            name: thread
            schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - chatbot_id
          - avatar
          - created_by
          - default_complexity
          - default_length
          - default_tone
          - default_type
          - description
          - name
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - chatbot_id
          - avatar
          - created_by
          - default_complexity
          - default_length
          - default_tone
          - default_type
          - description
          - name
        filter: {}
        allow_aggregations: true
      comment: ""

- table:
    name: chatbot_category
    schema: public
  object_relationships:
    - name: category
      using:
        foreign_key_constraint_on: category_id
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - category_id
          - chatbot_id
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - category_id
          - chatbot_id
        filter: {}
      comment: ""

- table:
    name: complexity_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - value
        filter: {}
      comment: ""

- table:
    name: category
    schema: public
  array_relationships:
    - name: chatbots
      using:
        foreign_key_constraint_on:
          column: category_id
          table:
            name: chatbot_category
            schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - category_id
          - name
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - category_id
          - name
        filter: {}
      comment: ""

- table:
    name: chat
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
    - name: user
      using:
        foreign_key_constraint_on: added_by
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - chatbot_id
          - chat_id
          - conversation_link
          - added_by
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - chatbot_id
          - chat_id
          - conversation_link
          - added_by  
        filter: {}
      comment: ""

- table:
    name: default_length_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""

- table:
    name: default_tone_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value  
        filter: {}
      comment: ""

- table:
    name: default_type_enum
    schema: public
  select_permissions:  
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""

- table:
    name: gpt_chat
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
    - name: user  
      using:
        foreign_key_constraint_on: added_by
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - added_by
          - chatbot_id
          - chat_id
          - conversation_link
        filter: {}
      comment: ""

- table:
    name: default_complexity_enum
    schema: public
  select_permissions:
    - role: anonymous  
      permission:
        columns:
          - value
        filter: {}
      comment: ""

- table:
    name: length_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns: []
        filter: {}
      comment: ""

- table:
    name: message
    schema: public  
  object_relationships:
    - name: thread
      using:
        foreign_key_constraint_on: thread_id
  insert_permissions:
    - role: user
      permission:
        check:
          thread:
            user_id:
              _eq: X-Hasura-User-Id
        columns:
          - content
          - role
          - created_at
          - message_id
          - thread_id
      comment: ""
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - content
          - created_at
          - message_id
          - thread_id
          - role
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - content
          - role
          - created_at
          - message_id
          - thread_id
        filter: {}
      comment: ""

- table:
    name: message_type_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - value
        filter: {}
      comment: ""

- table:
    name: models
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - model_name
          - model_value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - model_name
          - model_value
        filter: {}
      comment: ""

- table:
    name: preference
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
  insert_permissions:
    - role: user
      permission:
        check:
          user_id:
            _eq: X-Hasura-User-Id
        columns:
          - chatbot_id
          - favorite
          - preferred_complexity
          - preferred_length
          - preferred_tone
          - preferred_type
          - user_id
      comment: ""
  select_permissions:
    - role: user
      permission:
        columns:
          - favorite
          - chatbot_id
          - preference_id
          - preferred_complexity
          - preferred_length
          - preferred_tone
          - preferred_type
          - user_id
        filter:
          user_id:
            _eq: X-Hasura-User-Id
      comment: ""

- table:
    name: prompt
    schema: public
  array_relationships:
    - name: chatbots
      using:
        foreign_key_constraint_on:
          column: prompt_id
          table:
            name: prompt_chatbot
            schema: public
    - name: users
      using:
        foreign_key_constraint_on:
          column: prompt_id
          table:
            name: prompt_user
            schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - prompt_id
          - content
          - prompt_name
          - type
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - prompt_id
          - content
          - prompt_name
          - type
        filter: {}
      comment: ""

- table:
    name: prompt_chatbot
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chabot_id
    - name: prompt
      using:
        foreign_key_constraint_on: prompt_id
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - chabot_id
          - prompt_id
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - chabot_id
          - prompt_id
        filter: {}
      comment: ""

- table:
    name: prompt_type_enum
    schema: public
  array_relationships:
    - name: prompts
      using:
        foreign_key_constraint_on:
          column: type
          table:
            name: prompt
            schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - value
        filter: {}
      comment: "" 

- table:
    name: prompt_user
    schema: public
  object_relationships:
    - name: user
      using:
        foreign_key_constraint_on: user_id
    - name: prompt
      using:
        foreign_key_constraint_on: prompt_id  
  insert_permissions:
    - role: user
      permission:
        columns:
          - user_id
          - prompt_id
      check: {}
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - user_id
          - prompt_id
      filter: {}
    - role: user  
      permission:
        columns:
          - user_id
          - prompt_id
      filter: {}

- table:
    name: referral
    schema: public
  object_relationships:
    - name: user
      using:
        foreign_key_constraint_on: user_id
    - name: referrer 
      using:
        foreign_key_constraint_on: referrer_id

- table:
    name: thread
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
    - name: user
      using:
        foreign_key_constraint_on: user_id
  array_relationships:  
    - name: messages
      using:
        foreign_key_constraint_on:
          column: thread_id
          table:
            name: message
            schema: public
  insert_permissions:
    - role: user
      permission:
        check:
          user_id:
            _eq: X-Hasura-User-Id
        columns:
          - chatbot_id
          - thread_id
          - user_id
          - is_public
          - model
      comment: ""
  select_permissions:
    - role: anonymous
      permission: 
        columns:
          - chatbot_id
          - created_at
          - updated_at
          - thread_id
          - user_id
          - is_public
          - model
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - chatbot_id
          - created_at
          - updated_at
          - thread_id
          - user_id
          - is_public   
          - model
        filter: {}
      comment: ""

- table:
    name: tone_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user
      permission:
        columns:
          - value
        filter: {}  
      comment: ""

- table:
    name: type_enum
    schema: public
  select_permissions:
    - role: anonymous
      permission:
        columns:
          - value
        filter: {}
      comment: ""
    - role: user  
      permission:
        columns:
          - value
        filter: {} 
      comment: ""
      
- table:
    name: user
    schema: public
  array_relationships:
    - name: chats
      using:
        foreign_key_constraint_on:
          column: added_by
          table:
            name: chat
            schema: public
    - name: preferences 
      using:
        foreign_key_constraint_on:
          column: user_id
          table:
            name: preference
            schema: public
    - name: threads
      using:
        foreign_key_constraint_on:
          column: user_id
          table:
            name: thread
            schema: public
    - name: prompts  
      using:
        foreign_key_constraint_on:
          column: user_id
          table:
            name: prompt_user
            schema: public
  select_permissions:
    - role: user
      permission:
        columns:
          - date_joined
          - email
          - last_login
          - profile_picture
          - user_id
          - username
          - slug
          - get_free_month
          - is_blocked
          - pro_user_subscription_id
        filter:
          user_id:
            _eq: X-Hasura-User-Id
      comment: ""
    - role: anonymous
      permission:
        columns:
          - email
          - profile_picture
          - username
          - slug
        filter: {}
      comment: ""

- table:
    name: user_chatbot_preference
    schema: public
  object_relationships:
    - name: chatbot
      using:
        foreign_key_constraint_on: chatbot_id
    - name: user
      using:
        foreign_key_constraint_on: user_id
  select_permissions:
    - role: anonymous  
      permission:
        columns:
          - favorite
          - chatbot_id
          - preference_id
          - user_id
          - preferred_complexity
          - preferred_length 
          - preferred_tone
          - preferred_type
        filter: {}
      comment: ""
```
