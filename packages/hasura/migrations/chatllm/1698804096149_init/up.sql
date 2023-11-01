SET check_function_bodies = false;
CREATE TABLE public.category (
    category_id integer NOT NULL,
    name text NOT NULL
);
COMMENT ON TABLE public.category IS 'Table to store different categories for chatbots.';
CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;
CREATE TABLE public.chatbot (
    chatbot_id integer NOT NULL,
    name text NOT NULL,
    description text,
    avatar text,
    created_by text NOT NULL,
    default_tone text NOT NULL,
    default_length text NOT NULL,
    default_type text NOT NULL,
    default_complexity text NOT NULL
);
COMMENT ON TABLE public.chatbot IS 'Table storing information about chatbots, their characteristics, and default settings.';
CREATE TABLE public.chatbot_category (
    chatbot_id integer NOT NULL,
    category_id integer NOT NULL
);
COMMENT ON TABLE public.chatbot_category IS 'Junction table to manage the many-to-many relationships between chatbots and their categories.';
CREATE SEQUENCE public.chatbot_chatbot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.chatbot_chatbot_id_seq OWNED BY public.chatbot.chatbot_id;
CREATE TABLE public.default_complexity_enum (
    value text NOT NULL
);
CREATE TABLE public.default_length_enum (
    value text NOT NULL
);
CREATE TABLE public.default_tone_enum (
    value text NOT NULL
);
CREATE TABLE public.default_type_enum (
    value text NOT NULL
);
CREATE TABLE public.gpt_chat (
    gpt_chat_id integer NOT NULL,
    chatbot_id integer NOT NULL,
    conversation_link text NOT NULL,
    added_by integer NOT NULL
);
COMMENT ON TABLE public.gpt_chat IS 'Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link.';
CREATE SEQUENCE public.gpt_chat_gpt_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.gpt_chat_gpt_chat_id_seq OWNED BY public.gpt_chat.gpt_chat_id;
CREATE TABLE public.message (
    message_id integer NOT NULL,
    content text NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    related_message_id integer
);
COMMENT ON TABLE public.message IS 'This table stores the messages exchanged between users and chatbots.';
CREATE SEQUENCE public.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.message_message_id_seq OWNED BY public.message.message_id;
CREATE TABLE public.message_type_enum (
    value text NOT NULL
);
CREATE TABLE public.prompt (
    content text NOT NULL,
    type text NOT NULL,
    prompt_id integer NOT NULL,
    prompt_name text
);
CREATE TABLE public.prompt_chatbot (
    prompt_id integer NOT NULL,
    chabot_id integer NOT NULL
);
COMMENT ON TABLE public.prompt_chatbot IS 'Junction table for prompts/instructions and chatbots.';
CREATE SEQUENCE public.prompt_prompt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.prompt_prompt_id_seq OWNED BY public.prompt.prompt_id;
CREATE TABLE public.prompt_type_enum (
    value text NOT NULL
);
CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    date_joined timestamp with time zone DEFAULT now() NOT NULL,
    last_login timestamp with time zone DEFAULT now(),
    profile_picture text
);
COMMENT ON TABLE public."user" IS 'Table storing information about registered users.';
CREATE TABLE public.user_chatbot_preference (
    preference_id integer NOT NULL,
    user_id integer NOT NULL,
    chatbot_id integer NOT NULL,
    preferred_tone text NOT NULL,
    preferred_length text NOT NULL,
    preferred_type text NOT NULL,
    preferred_complexity text NOT NULL,
    favorite boolean
);
COMMENT ON TABLE public.user_chatbot_preference IS 'This table stores user-specific preferences for quick access when they interact with a chatbot.';
CREATE SEQUENCE public.user_chatbot_preference_preference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_chatbot_preference_preference_id_seq OWNED BY public.user_chatbot_preference.preference_id;
CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;
ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);
ALTER TABLE ONLY public.chatbot ALTER COLUMN chatbot_id SET DEFAULT nextval('public.chatbot_chatbot_id_seq'::regclass);
ALTER TABLE ONLY public.gpt_chat ALTER COLUMN gpt_chat_id SET DEFAULT nextval('public.gpt_chat_gpt_chat_id_seq'::regclass);
ALTER TABLE ONLY public.message ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);
ALTER TABLE ONLY public.prompt ALTER COLUMN prompt_id SET DEFAULT nextval('public.prompt_prompt_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);
ALTER TABLE ONLY public.user_chatbot_preference ALTER COLUMN preference_id SET DEFAULT nextval('public.user_chatbot_preference_preference_id_seq'::regclass);
ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);
ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);
ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_pkey PRIMARY KEY (chatbot_id, category_id);
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_name_key UNIQUE (name);
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_pkey PRIMARY KEY (chatbot_id);
ALTER TABLE ONLY public.default_complexity_enum
    ADD CONSTRAINT default_complexity_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.default_length_enum
    ADD CONSTRAINT default_length_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.default_tone_enum
    ADD CONSTRAINT default_tone_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.default_type_enum
    ADD CONSTRAINT default_type_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_conversation_link_key UNIQUE (conversation_link);
ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_pkey PRIMARY KEY (gpt_chat_id);
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);
ALTER TABLE ONLY public.message_type_enum
    ADD CONSTRAINT message_type_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.prompt_chatbot
    ADD CONSTRAINT prompt_chatbot_pkey PRIMARY KEY (prompt_id, chabot_id);
ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_pkey PRIMARY KEY (prompt_id);
ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_prompt_id_key UNIQUE (prompt_id);
ALTER TABLE ONLY public.prompt_type_enum
    ADD CONSTRAINT type_enum_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_pkey PRIMARY KEY (preference_id);
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_user_id_chatbot_id_key UNIQUE (user_id, chatbot_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);
ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_complexity_fkey FOREIGN KEY (default_complexity) REFERENCES public.default_complexity_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_length_fkey FOREIGN KEY (default_length) REFERENCES public.default_length_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_tone_fkey FOREIGN KEY (default_tone) REFERENCES public.default_tone_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_type_fkey FOREIGN KEY (default_type) REFERENCES public.default_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_added_by_fkey FOREIGN KEY (added_by) REFERENCES public."user"(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_type_fkey FOREIGN KEY (type) REFERENCES public.message_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.prompt_chatbot
    ADD CONSTRAINT prompt_chatbot_chabot_id_fkey FOREIGN KEY (chabot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.prompt_chatbot
    ADD CONSTRAINT prompt_chatbot_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt(prompt_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_type_fkey FOREIGN KEY (type) REFERENCES public.prompt_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_complexity_fkey FOREIGN KEY (preferred_complexity) REFERENCES public.default_complexity_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_length_fkey FOREIGN KEY (preferred_length) REFERENCES public.default_length_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_tone_fkey FOREIGN KEY (preferred_tone) REFERENCES public.default_tone_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_type_fkey FOREIGN KEY (preferred_type) REFERENCES public.default_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
