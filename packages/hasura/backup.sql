--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Debian 14.9-1.pgdg120+1)
-- Dumped by pg_dump version 14.9 (Debian 14.9-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: hdb_catalog; Type: SCHEMA; Schema: -; Owner: chatllm
--

CREATE SCHEMA hdb_catalog;


ALTER SCHEMA hdb_catalog OWNER TO chatllm;

--
-- Name: gen_hasura_uuid(); Type: FUNCTION; Schema: hdb_catalog; Owner: chatllm
--

CREATE FUNCTION hdb_catalog.gen_hasura_uuid() RETURNS uuid
    LANGUAGE sql
    AS $$select gen_random_uuid()$$;


ALTER FUNCTION hdb_catalog.gen_hasura_uuid() OWNER TO chatllm;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hdb_action_log; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_action_log (
    id uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    action_name text,
    input_payload jsonb NOT NULL,
    request_headers jsonb NOT NULL,
    session_variables jsonb NOT NULL,
    response_payload jsonb,
    errors jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    response_received_at timestamp with time zone,
    status text NOT NULL,
    CONSTRAINT hdb_action_log_status_check CHECK ((status = ANY (ARRAY['created'::text, 'processing'::text, 'completed'::text, 'error'::text])))
);


ALTER TABLE hdb_catalog.hdb_action_log OWNER TO chatllm;

--
-- Name: hdb_cron_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_cron_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_cron_event_invocation_logs OWNER TO chatllm;

--
-- Name: hdb_cron_events; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_cron_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    trigger_name text NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_cron_events OWNER TO chatllm;

--
-- Name: hdb_metadata; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_metadata (
    id integer NOT NULL,
    metadata json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL
);


ALTER TABLE hdb_catalog.hdb_metadata OWNER TO chatllm;

--
-- Name: hdb_scheduled_event_invocation_logs; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_scheduled_event_invocation_logs (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    event_id text,
    status integer,
    request json,
    response json,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE hdb_catalog.hdb_scheduled_event_invocation_logs OWNER TO chatllm;

--
-- Name: hdb_scheduled_events; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_scheduled_events (
    id text DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    webhook_conf json NOT NULL,
    scheduled_time timestamp with time zone NOT NULL,
    retry_conf json,
    payload json,
    header_conf json,
    status text DEFAULT 'scheduled'::text NOT NULL,
    tries integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    next_retry_at timestamp with time zone,
    comment text,
    CONSTRAINT valid_status CHECK ((status = ANY (ARRAY['scheduled'::text, 'locked'::text, 'delivered'::text, 'error'::text, 'dead'::text])))
);


ALTER TABLE hdb_catalog.hdb_scheduled_events OWNER TO chatllm;

--
-- Name: hdb_schema_notifications; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_schema_notifications (
    id integer NOT NULL,
    notification json NOT NULL,
    resource_version integer DEFAULT 1 NOT NULL,
    instance_id uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT hdb_schema_notifications_id_check CHECK ((id = 1))
);


ALTER TABLE hdb_catalog.hdb_schema_notifications OWNER TO chatllm;

--
-- Name: hdb_version; Type: TABLE; Schema: hdb_catalog; Owner: chatllm
--

CREATE TABLE hdb_catalog.hdb_version (
    hasura_uuid uuid DEFAULT hdb_catalog.gen_hasura_uuid() NOT NULL,
    version text NOT NULL,
    upgraded_on timestamp with time zone NOT NULL,
    cli_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    console_state jsonb DEFAULT '{}'::jsonb NOT NULL,
    ee_client_id text,
    ee_client_secret text
);


ALTER TABLE hdb_catalog.hdb_version OWNER TO chatllm;

--
-- Name: category; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO chatllm;

--
-- Name: TABLE category; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.category IS 'Table to store different categories for chatbots.';


--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO chatllm;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: chatbot; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.chatbot (
    chatbot_id integer NOT NULL,
    name text NOT NULL,
    description text,
    category text NOT NULL,
    avatar text,
    created_by text NOT NULL,
    default_tone text NOT NULL,
    default_length text NOT NULL,
    default_type text NOT NULL,
    default_complexity text NOT NULL
);


ALTER TABLE public.chatbot OWNER TO chatllm;

--
-- Name: TABLE chatbot; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.chatbot IS 'Table storing information about chatbots, their characteristics, and default settings.';


--
-- Name: chatbot_category; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.chatbot_category (
    chatbot_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.chatbot_category OWNER TO chatllm;

--
-- Name: TABLE chatbot_category; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.chatbot_category IS 'Junction table to manage the many-to-many relationships between chatbots and their categories.';


--
-- Name: chatbot_chatbot_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.chatbot_chatbot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatbot_chatbot_id_seq OWNER TO chatllm;

--
-- Name: chatbot_chatbot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.chatbot_chatbot_id_seq OWNED BY public.chatbot.chatbot_id;


--
-- Name: default_complexity_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.default_complexity_enum (
    value text NOT NULL
);


ALTER TABLE public.default_complexity_enum OWNER TO chatllm;

--
-- Name: default_length_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.default_length_enum (
    value text NOT NULL
);


ALTER TABLE public.default_length_enum OWNER TO chatllm;

--
-- Name: default_tone_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.default_tone_enum (
    value text NOT NULL
);


ALTER TABLE public.default_tone_enum OWNER TO chatllm;

--
-- Name: default_type_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.default_type_enum (
    value text NOT NULL
);


ALTER TABLE public.default_type_enum OWNER TO chatllm;

--
-- Name: gpt_chat; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.gpt_chat (
    gpt_chat_id integer NOT NULL,
    chatbot_id integer NOT NULL,
    conversation_link text NOT NULL,
    added_by integer NOT NULL
);


ALTER TABLE public.gpt_chat OWNER TO chatllm;

--
-- Name: TABLE gpt_chat; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.gpt_chat IS 'Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link.';


--
-- Name: gpt_chat_gpt_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.gpt_chat_gpt_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gpt_chat_gpt_chat_id_seq OWNER TO chatllm;

--
-- Name: gpt_chat_gpt_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.gpt_chat_gpt_chat_id_seq OWNED BY public.gpt_chat.gpt_chat_id;


--
-- Name: message; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.message (
    message_id integer NOT NULL,
    content text NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.message OWNER TO chatllm;

--
-- Name: TABLE message; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.message IS 'This table stores the messages exchanged between users and chatbots.';


--
-- Name: message_message_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_message_id_seq OWNER TO chatllm;

--
-- Name: message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.message_message_id_seq OWNED BY public.message.message_id;


--
-- Name: message_type_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.message_type_enum (
    value text NOT NULL
);


ALTER TABLE public.message_type_enum OWNER TO chatllm;

--
-- Name: prompt; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.prompt (
    prompt_id integer NOT NULL,
    chatbot_id integer NOT NULL,
    content text NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.prompt OWNER TO chatllm;

--
-- Name: prompt_type_enum; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.prompt_type_enum (
    value text NOT NULL
);


ALTER TABLE public.prompt_type_enum OWNER TO chatllm;

--
-- Name: user; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    date_joined timestamp with time zone DEFAULT now() NOT NULL,
    last_login timestamp with time zone DEFAULT now(),
    profile_picture text
);


ALTER TABLE public."user" OWNER TO chatllm;

--
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public."user" IS 'Table storing information about registered users.';


--
-- Name: user_chatbot_preference; Type: TABLE; Schema: public; Owner: chatllm
--

CREATE TABLE public.user_chatbot_preference (
    preference_id integer NOT NULL,
    user_id integer NOT NULL,
    chatbot_id integer NOT NULL,
    preferred_tone text NOT NULL,
    preferred_length text NOT NULL,
    preferred_type text NOT NULL,
    preferred_complexity text NOT NULL
);


ALTER TABLE public.user_chatbot_preference OWNER TO chatllm;

--
-- Name: TABLE user_chatbot_preference; Type: COMMENT; Schema: public; Owner: chatllm
--

COMMENT ON TABLE public.user_chatbot_preference IS 'This table stores user-specific preferences for quick access when they interact with a chatbot.';


--
-- Name: user_chatbot_preference_preference_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.user_chatbot_preference_preference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_chatbot_preference_preference_id_seq OWNER TO chatllm;

--
-- Name: user_chatbot_preference_preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.user_chatbot_preference_preference_id_seq OWNED BY public.user_chatbot_preference.preference_id;


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: chatllm
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO chatllm;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chatllm
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: chatbot chatbot_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot ALTER COLUMN chatbot_id SET DEFAULT nextval('public.chatbot_chatbot_id_seq'::regclass);


--
-- Name: gpt_chat gpt_chat_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.gpt_chat ALTER COLUMN gpt_chat_id SET DEFAULT nextval('public.gpt_chat_gpt_chat_id_seq'::regclass);


--
-- Name: message message_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: user_chatbot_preference preference_id; Type: DEFAULT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference ALTER COLUMN preference_id SET DEFAULT nextval('public.user_chatbot_preference_preference_id_seq'::regclass);


--
-- Data for Name: hdb_action_log; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_action_log (id, action_name, input_payload, request_headers, session_variables, response_payload, errors, created_at, response_received_at, status) FROM stdin;
\.


--
-- Data for Name: hdb_cron_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_cron_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_cron_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_cron_events (id, trigger_name, scheduled_time, status, tries, created_at, next_retry_at) FROM stdin;
\.


--
-- Data for Name: hdb_metadata; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_metadata (id, metadata, resource_version) FROM stdin;
1	{"sources":[{"configuration":{"connection_info":{"database_url":{"from_env":"HASURA_GRAPHQL_DATABASE_URL"},"isolation_level":"read-committed","use_prepared_statements":false}},"kind":"postgres","name":"chatllm","tables":[{"table":{"name":"category","schema":"public"}},{"table":{"name":"chatbot","schema":"public"}},{"table":{"name":"chatbot_category","schema":"public"}},{"table":{"name":"default_complexity_enum","schema":"public"}},{"table":{"name":"default_length_enum","schema":"public"}},{"table":{"name":"default_tone_enum","schema":"public"}},{"table":{"name":"default_type_enum","schema":"public"}},{"table":{"name":"gpt_chat","schema":"public"}},{"table":{"name":"message","schema":"public"}},{"table":{"name":"message_type_enum","schema":"public"}},{"table":{"name":"prompt","schema":"public"}},{"table":{"name":"prompt_type_enum","schema":"public"}},{"table":{"name":"user","schema":"public"}},{"table":{"name":"user_chatbot_preference","schema":"public"}}]}],"version":3}	38
\.


--
-- Data for Name: hdb_scheduled_event_invocation_logs; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_scheduled_event_invocation_logs (id, event_id, status, request, response, created_at) FROM stdin;
\.


--
-- Data for Name: hdb_scheduled_events; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_scheduled_events (id, webhook_conf, scheduled_time, retry_conf, payload, header_conf, status, tries, created_at, next_retry_at, comment) FROM stdin;
\.


--
-- Data for Name: hdb_schema_notifications; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_schema_notifications (id, notification, resource_version, instance_id, updated_at) FROM stdin;
1	{"metadata":false,"remote_schemas":[],"sources":["chatllm"],"data_connectors":[]}	38	9589c5d9-e09f-4388-844c-5e7ad307bc75	2023-10-15 01:28:41.327457+00
\.


--
-- Data for Name: hdb_version; Type: TABLE DATA; Schema: hdb_catalog; Owner: chatllm
--

COPY hdb_catalog.hdb_version (hasura_uuid, version, upgraded_on, cli_state, console_state, ee_client_id, ee_client_secret) FROM stdin;
0c1bb595-1e33-4be1-bd3d-ef0efc5bf48c	48	2023-10-14 03:13:03.066925+00	{"settings": {"migration_mode": "true"}, "migrations": {"chatllm": {"1697344629783": false, "1697344818722": false, "1697345145350": false, "1697345267017": false, "1697345283393": false, "1697345288872": false, "1697345933532": false, "1697347372868": false, "1697347578339": false, "1697347719088": false, "1697347824902": false, "1697348411101": false, "1697348460803": false, "1697348505885": false, "1697348550376": false, "1697348568629": false, "1697348584946": false, "1697348634751": false, "1697349401941": false, "1697349548172": false, "1697349809670": false, "1697349860491": false, "1697350390906": false, "1697352123323": false, "1697352994248": false, "1697353759474": false, "1697354008249": false, "1697354175102": false, "1697354241458": false, "1697354272464": false}}, "isStateCopyCompleted": true}	{"console_notifications": {"admin": {"date": "2023-10-15T01:10:09.845Z", "read": [], "showBadge": false}}}	\N	\N
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.category (category_id, name) FROM stdin;
\.


--
-- Data for Name: chatbot; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.chatbot (chatbot_id, name, description, category, avatar, created_by, default_tone, default_length, default_type, default_complexity) FROM stdin;
\.


--
-- Data for Name: chatbot_category; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.chatbot_category (chatbot_id, category_id) FROM stdin;
\.


--
-- Data for Name: default_complexity_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.default_complexity_enum (value) FROM stdin;
\.


--
-- Data for Name: default_length_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.default_length_enum (value) FROM stdin;
\.


--
-- Data for Name: default_tone_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.default_tone_enum (value) FROM stdin;
Professional
Friendly
Neutral
\.


--
-- Data for Name: default_type_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.default_type_enum (value) FROM stdin;
\.


--
-- Data for Name: gpt_chat; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.gpt_chat (gpt_chat_id, chatbot_id, conversation_link, added_by) FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.message (message_id, content, sender_id, receiver_id, type) FROM stdin;
\.


--
-- Data for Name: message_type_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.message_type_enum (value) FROM stdin;
user
chatbot
\.


--
-- Data for Name: prompt; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.prompt (prompt_id, chatbot_id, content, type) FROM stdin;
\.


--
-- Data for Name: prompt_type_enum; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.prompt_type_enum (value) FROM stdin;
prompt
instruction
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public."user" (user_id, username, email, password, date_joined, last_login, profile_picture) FROM stdin;
\.


--
-- Data for Name: user_chatbot_preference; Type: TABLE DATA; Schema: public; Owner: chatllm
--

COPY public.user_chatbot_preference (preference_id, user_id, chatbot_id, preferred_tone, preferred_length, preferred_type, preferred_complexity) FROM stdin;
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.category_category_id_seq', 1, false);


--
-- Name: chatbot_chatbot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.chatbot_chatbot_id_seq', 1, false);


--
-- Name: gpt_chat_gpt_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.gpt_chat_gpt_chat_id_seq', 1, false);


--
-- Name: message_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.message_message_id_seq', 1, false);


--
-- Name: user_chatbot_preference_preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.user_chatbot_preference_preference_id_seq', 1, false);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chatllm
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- Name: hdb_action_log hdb_action_log_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_action_log
    ADD CONSTRAINT hdb_action_log_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_cron_events hdb_cron_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_events
    ADD CONSTRAINT hdb_cron_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_pkey PRIMARY KEY (id);


--
-- Name: hdb_metadata hdb_metadata_resource_version_key; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_metadata
    ADD CONSTRAINT hdb_metadata_resource_version_key UNIQUE (resource_version);


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_pkey PRIMARY KEY (id);


--
-- Name: hdb_scheduled_events hdb_scheduled_events_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_events
    ADD CONSTRAINT hdb_scheduled_events_pkey PRIMARY KEY (id);


--
-- Name: hdb_schema_notifications hdb_schema_notifications_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_schema_notifications
    ADD CONSTRAINT hdb_schema_notifications_pkey PRIMARY KEY (id);


--
-- Name: hdb_version hdb_version_pkey; Type: CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_version
    ADD CONSTRAINT hdb_version_pkey PRIMARY KEY (hasura_uuid);


--
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: chatbot_category chatbot_category_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_pkey PRIMARY KEY (chatbot_id, category_id);


--
-- Name: chatbot chatbot_name_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_name_key UNIQUE (name);


--
-- Name: chatbot chatbot_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_pkey PRIMARY KEY (chatbot_id);


--
-- Name: default_complexity_enum default_complexity_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.default_complexity_enum
    ADD CONSTRAINT default_complexity_enum_pkey PRIMARY KEY (value);


--
-- Name: default_length_enum default_length_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.default_length_enum
    ADD CONSTRAINT default_length_enum_pkey PRIMARY KEY (value);


--
-- Name: default_tone_enum default_tone_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.default_tone_enum
    ADD CONSTRAINT default_tone_enum_pkey PRIMARY KEY (value);


--
-- Name: default_type_enum default_type_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.default_type_enum
    ADD CONSTRAINT default_type_enum_pkey PRIMARY KEY (value);


--
-- Name: gpt_chat gpt_chat_conversation_link_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_conversation_link_key UNIQUE (conversation_link);


--
-- Name: gpt_chat gpt_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_pkey PRIMARY KEY (gpt_chat_id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);


--
-- Name: message_type_enum message_type_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message_type_enum
    ADD CONSTRAINT message_type_enum_pkey PRIMARY KEY (value);


--
-- Name: prompt prompt_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_pkey PRIMARY KEY (prompt_id);


--
-- Name: prompt_type_enum type_enum_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.prompt_type_enum
    ADD CONSTRAINT type_enum_pkey PRIMARY KEY (value);


--
-- Name: user_chatbot_preference user_chatbot_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_pkey PRIMARY KEY (preference_id);


--
-- Name: user_chatbot_preference user_chatbot_preference_user_id_chatbot_id_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_user_id_chatbot_id_key UNIQUE (user_id, chatbot_id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: hdb_cron_event_invocation_event_id; Type: INDEX; Schema: hdb_catalog; Owner: chatllm
--

CREATE INDEX hdb_cron_event_invocation_event_id ON hdb_catalog.hdb_cron_event_invocation_logs USING btree (event_id);


--
-- Name: hdb_cron_event_status; Type: INDEX; Schema: hdb_catalog; Owner: chatllm
--

CREATE INDEX hdb_cron_event_status ON hdb_catalog.hdb_cron_events USING btree (status);


--
-- Name: hdb_cron_events_unique_scheduled; Type: INDEX; Schema: hdb_catalog; Owner: chatllm
--

CREATE UNIQUE INDEX hdb_cron_events_unique_scheduled ON hdb_catalog.hdb_cron_events USING btree (trigger_name, scheduled_time) WHERE (status = 'scheduled'::text);


--
-- Name: hdb_scheduled_event_status; Type: INDEX; Schema: hdb_catalog; Owner: chatllm
--

CREATE INDEX hdb_scheduled_event_status ON hdb_catalog.hdb_scheduled_events USING btree (status);


--
-- Name: hdb_version_one_row; Type: INDEX; Schema: hdb_catalog; Owner: chatllm
--

CREATE UNIQUE INDEX hdb_version_one_row ON hdb_catalog.hdb_version USING btree (((version IS NOT NULL)));


--
-- Name: hdb_cron_event_invocation_logs hdb_cron_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_cron_event_invocation_logs
    ADD CONSTRAINT hdb_cron_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_cron_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hdb_scheduled_event_invocation_logs hdb_scheduled_event_invocation_logs_event_id_fkey; Type: FK CONSTRAINT; Schema: hdb_catalog; Owner: chatllm
--

ALTER TABLE ONLY hdb_catalog.hdb_scheduled_event_invocation_logs
    ADD CONSTRAINT hdb_scheduled_event_invocation_logs_event_id_fkey FOREIGN KEY (event_id) REFERENCES hdb_catalog.hdb_scheduled_events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chatbot_category chatbot_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: chatbot_category chatbot_category_chatbot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot_category
    ADD CONSTRAINT chatbot_category_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: chatbot chatbot_default_complexity_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_complexity_fkey FOREIGN KEY (default_complexity) REFERENCES public.default_complexity_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: chatbot chatbot_default_length_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_length_fkey FOREIGN KEY (default_length) REFERENCES public.default_length_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: chatbot chatbot_default_tone_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_tone_fkey FOREIGN KEY (default_tone) REFERENCES public.default_tone_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: chatbot chatbot_default_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.chatbot
    ADD CONSTRAINT chatbot_default_type_fkey FOREIGN KEY (default_type) REFERENCES public.default_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: gpt_chat gpt_chat_added_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_added_by_fkey FOREIGN KEY (added_by) REFERENCES public."user"(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: gpt_chat gpt_chat_chatbot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.gpt_chat
    ADD CONSTRAINT gpt_chat_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: message message_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public."user"(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: message message_receiver_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_receiver_id_fkey1 FOREIGN KEY (receiver_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: message message_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public."user"(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: message message_sender_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_sender_id_fkey1 FOREIGN KEY (sender_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: message message_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_type_fkey FOREIGN KEY (type) REFERENCES public.message_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: prompt prompt_chatbot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_chatbot_id_fkey FOREIGN KEY (chatbot_id) REFERENCES public.chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: prompt prompt_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.prompt
    ADD CONSTRAINT prompt_type_fkey FOREIGN KEY (type) REFERENCES public.prompt_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_chatbot_preference user_chatbot_preference_preferred_complexity_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_complexity_fkey FOREIGN KEY (preferred_complexity) REFERENCES public.default_complexity_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_chatbot_preference user_chatbot_preference_preferred_length_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_length_fkey FOREIGN KEY (preferred_length) REFERENCES public.default_length_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_chatbot_preference user_chatbot_preference_preferred_tone_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_tone_fkey FOREIGN KEY (preferred_tone) REFERENCES public.default_tone_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_chatbot_preference user_chatbot_preference_preferred_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chatllm
--

ALTER TABLE ONLY public.user_chatbot_preference
    ADD CONSTRAINT user_chatbot_preference_preferred_type_fkey FOREIGN KEY (preferred_type) REFERENCES public.default_type_enum(value) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

