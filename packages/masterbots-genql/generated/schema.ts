// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Boolean: boolean,
    Float: number,
    Int: number,
    String: string,
    float8: any,
    jsonb: any,
    timestamp: any,
    timestamptz: any,
    uuid: any,
}


/** Additional information for account restoration and for kyc */
export interface accounts_information {
    account: Scalars['String']
    email: Scalars['String']
    id: Scalars['uuid']
    newsletter_subscription: (Scalars['Boolean'] | null)
    phone: Scalars['String']
    recovery_partners: (Scalars['jsonb'] | null)
    /** An object relationship */
    reg_account: reg_accounts
    __typename: 'accounts_information'
}


/** aggregated selection of "accounts_information" */
export interface accounts_information_aggregate {
    aggregate: (accounts_information_aggregate_fields | null)
    nodes: accounts_information[]
    __typename: 'accounts_information_aggregate'
}


/** aggregate fields of "accounts_information" */
export interface accounts_information_aggregate_fields {
    count: Scalars['Int']
    max: (accounts_information_max_fields | null)
    min: (accounts_information_min_fields | null)
    __typename: 'accounts_information_aggregate_fields'
}


/** unique or primary key constraints on table "accounts_information" */
export type accounts_information_constraint = 'accounts_information_account_key' | 'accounts_information_id_key' | 'accounts_information_pkey'


/** aggregate max on columns */
export interface accounts_information_max_fields {
    account: (Scalars['String'] | null)
    email: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    phone: (Scalars['String'] | null)
    __typename: 'accounts_information_max_fields'
}


/** aggregate min on columns */
export interface accounts_information_min_fields {
    account: (Scalars['String'] | null)
    email: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    phone: (Scalars['String'] | null)
    __typename: 'accounts_information_min_fields'
}


/** response of any mutation on the table "accounts_information" */
export interface accounts_information_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: accounts_information[]
    __typename: 'accounts_information_mutation_response'
}


/** select columns of table "accounts_information" */
export type accounts_information_select_column = 'account' | 'email' | 'id' | 'newsletter_subscription' | 'phone' | 'recovery_partners'


/** select "accounts_information_aggregate_bool_exp_bool_and_arguments_columns" columns of table "accounts_information" */
export type accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_and_arguments_columns = 'newsletter_subscription'


/** select "accounts_information_aggregate_bool_exp_bool_or_arguments_columns" columns of table "accounts_information" */
export type accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_or_arguments_columns = 'newsletter_subscription'


/** update columns of table "accounts_information" */
export type accounts_information_update_column = 'account' | 'email' | 'id' | 'newsletter_subscription' | 'phone' | 'recovery_partners'


/** ordering argument of a cursor */
export type cursor_ordering = 'ASC' | 'DESC'


/** columns and relationships of "devices" */
export interface devices {
    account: Scalars['String']
    created_at: (Scalars['timestamptz'] | null)
    cred_id: Scalars['String']
    device_name: Scalars['String']
    public_key: Scalars['String']
    /** An object relationship */
    reg_account: reg_accounts
    __typename: 'devices'
}


/** aggregated selection of "devices" */
export interface devices_aggregate {
    aggregate: (devices_aggregate_fields | null)
    nodes: devices[]
    __typename: 'devices_aggregate'
}


/** aggregate fields of "devices" */
export interface devices_aggregate_fields {
    count: Scalars['Int']
    max: (devices_max_fields | null)
    min: (devices_min_fields | null)
    __typename: 'devices_aggregate_fields'
}


/** unique or primary key constraints on table "devices" */
export type devices_constraint = 'devices_pkey'


/** aggregate max on columns */
export interface devices_max_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    public_key: (Scalars['String'] | null)
    __typename: 'devices_max_fields'
}


/** aggregate min on columns */
export interface devices_min_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    public_key: (Scalars['String'] | null)
    __typename: 'devices_min_fields'
}


/** response of any mutation on the table "devices" */
export interface devices_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: devices[]
    __typename: 'devices_mutation_response'
}


/** select columns of table "devices" */
export type devices_select_column = 'account' | 'created_at' | 'cred_id' | 'device_name' | 'public_key'


/** update columns of table "devices" */
export type devices_update_column = 'account' | 'created_at' | 'cred_id' | 'device_name' | 'public_key'


/** columns and relationships of "messages" */
export interface messages {
    from: Scalars['String']
    id: Scalars['uuid']
    message: Scalars['String']
    p2p_id: (Scalars['uuid'] | null)
    /** An object relationship */
    p2p_offer: (p2p_offers | null)
    /** An object relationship */
    regAccountByTo: reg_accounts
    /** An object relationship */
    reg_account: reg_accounts
    support_id: (Scalars['uuid'] | null)
    timestamp: Scalars['timestamptz']
    to: Scalars['String']
    __typename: 'messages'
}


/** aggregated selection of "messages" */
export interface messages_aggregate {
    aggregate: (messages_aggregate_fields | null)
    nodes: messages[]
    __typename: 'messages_aggregate'
}


/** aggregate fields of "messages" */
export interface messages_aggregate_fields {
    count: Scalars['Int']
    max: (messages_max_fields | null)
    min: (messages_min_fields | null)
    __typename: 'messages_aggregate_fields'
}


/** unique or primary key constraints on table "messages" */
export type messages_constraint = 'messages_pkey'


/** aggregate max on columns */
export interface messages_max_fields {
    from: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    message: (Scalars['String'] | null)
    p2p_id: (Scalars['uuid'] | null)
    support_id: (Scalars['uuid'] | null)
    timestamp: (Scalars['timestamptz'] | null)
    to: (Scalars['String'] | null)
    __typename: 'messages_max_fields'
}


/** aggregate min on columns */
export interface messages_min_fields {
    from: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    message: (Scalars['String'] | null)
    p2p_id: (Scalars['uuid'] | null)
    support_id: (Scalars['uuid'] | null)
    timestamp: (Scalars['timestamptz'] | null)
    to: (Scalars['String'] | null)
    __typename: 'messages_min_fields'
}


/** response of any mutation on the table "messages" */
export interface messages_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: messages[]
    __typename: 'messages_mutation_response'
}


/** select columns of table "messages" */
export type messages_select_column = 'from' | 'id' | 'message' | 'p2p_id' | 'support_id' | 'timestamp' | 'to'


/** update columns of table "messages" */
export type messages_update_column = 'from' | 'id' | 'message' | 'p2p_id' | 'support_id' | 'timestamp' | 'to'


/** columns and relationships of "migrate_device" */
export interface migrate_device {
    account: Scalars['String']
    created_at: (Scalars['timestamptz'] | null)
    cred_id: Scalars['String']
    device_name: Scalars['String']
    public_key: Scalars['String']
    __typename: 'migrate_device'
}


/** aggregated selection of "migrate_device" */
export interface migrate_device_aggregate {
    aggregate: (migrate_device_aggregate_fields | null)
    nodes: migrate_device[]
    __typename: 'migrate_device_aggregate'
}


/** aggregate fields of "migrate_device" */
export interface migrate_device_aggregate_fields {
    count: Scalars['Int']
    max: (migrate_device_max_fields | null)
    min: (migrate_device_min_fields | null)
    __typename: 'migrate_device_aggregate_fields'
}


/** unique or primary key constraints on table "migrate_device" */
export type migrate_device_constraint = 'migrate_device_pkey'


/** aggregate max on columns */
export interface migrate_device_max_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    public_key: (Scalars['String'] | null)
    __typename: 'migrate_device_max_fields'
}


/** aggregate min on columns */
export interface migrate_device_min_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    public_key: (Scalars['String'] | null)
    __typename: 'migrate_device_min_fields'
}


/** response of any mutation on the table "migrate_device" */
export interface migrate_device_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: migrate_device[]
    __typename: 'migrate_device_mutation_response'
}


/** select columns of table "migrate_device" */
export type migrate_device_select_column = 'account' | 'created_at' | 'cred_id' | 'device_name' | 'public_key'


/** update columns of table "migrate_device" */
export type migrate_device_update_column = 'account' | 'created_at' | 'cred_id' | 'device_name' | 'public_key'


/** mutation root */
export interface mutation_root {
    approve_new_account: (Scalars['String'] | null)
    cancel_p2p_offer: (p2p_offer_output | null)
    confirm_p2p_payment: (p2p_offer_output | null)
    /** delete data from the table: "accounts_information" */
    delete_accounts_information: (accounts_information_mutation_response | null)
    /** delete single row from the table: "accounts_information" */
    delete_accounts_information_by_pk: (accounts_information | null)
    /** delete data from the table: "devices" */
    delete_devices: (devices_mutation_response | null)
    /** delete single row from the table: "devices" */
    delete_devices_by_pk: (devices | null)
    /** delete data from the table: "messages" */
    delete_messages: (messages_mutation_response | null)
    /** delete single row from the table: "messages" */
    delete_messages_by_pk: (messages | null)
    /** delete data from the table: "migrate_device" */
    delete_migrate_device: (migrate_device_mutation_response | null)
    /** delete single row from the table: "migrate_device" */
    delete_migrate_device_by_pk: (migrate_device | null)
    /** delete data from the table: "notifications" */
    delete_notifications: (notifications_mutation_response | null)
    /** delete single row from the table: "notifications" */
    delete_notifications_by_pk: (notifications | null)
    /** delete data from the table: "p2p_offers" */
    delete_p2p_offers: (p2p_offers_mutation_response | null)
    /** delete single row from the table: "p2p_offers" */
    delete_p2p_offers_by_pk: (p2p_offers | null)
    /** delete data from the table: "preferences" */
    delete_preferences: (preferences_mutation_response | null)
    /** delete single row from the table: "preferences" */
    delete_preferences_by_pk: (preferences | null)
    /** delete data from the table: "reg_accounts" */
    delete_reg_accounts: (reg_accounts_mutation_response | null)
    /** delete single row from the table: "reg_accounts" */
    delete_reg_accounts_by_pk: (reg_accounts | null)
    /** delete data from the table: "signing_requests" */
    delete_signing_requests: (signing_requests_mutation_response | null)
    /** delete single row from the table: "signing_requests" */
    delete_signing_requests_by_pk: (signing_requests | null)
    /** delete data from the table: "swap_assets" */
    delete_swap_assets: (swap_assets_mutation_response | null)
    /** delete single row from the table: "swap_assets" */
    delete_swap_assets_by_pk: (swap_assets | null)
    /** delete data from the table: "swap_orders" */
    delete_swap_orders: (swap_orders_mutation_response | null)
    /** delete single row from the table: "swap_orders" */
    delete_swap_orders_by_pk: (swap_orders | null)
    /** delete data from the table: "trust_network" */
    delete_trust_network: (trust_network_mutation_response | null)
    /** delete single row from the table: "trust_network" */
    delete_trust_network_by_pk: (trust_network | null)
    /** delete data from the table: "trust_network_notification" */
    delete_trust_network_notification: (trust_network_notification_mutation_response | null)
    /** delete single row from the table: "trust_network_notification" */
    delete_trust_network_notification_by_pk: (trust_network_notification | null)
    /** delete data from the table: "trust_network_status" */
    delete_trust_network_status: (trust_network_status_mutation_response | null)
    /** delete single row from the table: "trust_network_status" */
    delete_trust_network_status_by_pk: (trust_network_status | null)
    /** insert data into the table: "accounts_information" */
    insert_accounts_information: (accounts_information_mutation_response | null)
    /** insert a single row into the table: "accounts_information" */
    insert_accounts_information_one: (accounts_information | null)
    /** insert data into the table: "devices" */
    insert_devices: (devices_mutation_response | null)
    /** insert a single row into the table: "devices" */
    insert_devices_one: (devices | null)
    /** insert data into the table: "messages" */
    insert_messages: (messages_mutation_response | null)
    /** insert a single row into the table: "messages" */
    insert_messages_one: (messages | null)
    /** insert data into the table: "migrate_device" */
    insert_migrate_device: (migrate_device_mutation_response | null)
    /** insert a single row into the table: "migrate_device" */
    insert_migrate_device_one: (migrate_device | null)
    /** insert data into the table: "notifications" */
    insert_notifications: (notifications_mutation_response | null)
    /** insert a single row into the table: "notifications" */
    insert_notifications_one: (notifications | null)
    /** insert data into the table: "p2p_offers" */
    insert_p2p_offers: (p2p_offers_mutation_response | null)
    /** insert a single row into the table: "p2p_offers" */
    insert_p2p_offers_one: (p2p_offers | null)
    /** insert data into the table: "preferences" */
    insert_preferences: (preferences_mutation_response | null)
    /** insert a single row into the table: "preferences" */
    insert_preferences_one: (preferences | null)
    /** insert data into the table: "reg_accounts" */
    insert_reg_accounts: (reg_accounts_mutation_response | null)
    /** insert a single row into the table: "reg_accounts" */
    insert_reg_accounts_one: (reg_accounts | null)
    /** insert data into the table: "signing_requests" */
    insert_signing_requests: (signing_requests_mutation_response | null)
    /** insert a single row into the table: "signing_requests" */
    insert_signing_requests_one: (signing_requests | null)
    /** insert data into the table: "swap_assets" */
    insert_swap_assets: (swap_assets_mutation_response | null)
    /** insert a single row into the table: "swap_assets" */
    insert_swap_assets_one: (swap_assets | null)
    /** insert data into the table: "swap_orders" */
    insert_swap_orders: (swap_orders_mutation_response | null)
    /** insert a single row into the table: "swap_orders" */
    insert_swap_orders_one: (swap_orders | null)
    /** insert data into the table: "trust_network" */
    insert_trust_network: (trust_network_mutation_response | null)
    /** insert data into the table: "trust_network_notification" */
    insert_trust_network_notification: (trust_network_notification_mutation_response | null)
    /** insert a single row into the table: "trust_network_notification" */
    insert_trust_network_notification_one: (trust_network_notification | null)
    /** insert a single row into the table: "trust_network" */
    insert_trust_network_one: (trust_network | null)
    /** insert data into the table: "trust_network_status" */
    insert_trust_network_status: (trust_network_status_mutation_response | null)
    /** insert a single row into the table: "trust_network_status" */
    insert_trust_network_status_one: (trust_network_status | null)
    make_p2p_buy_offer: (p2p_offer_output | null)
    make_p2p_sell_offer: (p2p_offer_output | null)
    reject_new_account: (Scalars['String'] | null)
    request_new_account: (request_new_account_output | null)
    toggle_trust_network: (toggle_trust_network_output | null)
    /** update data of the table: "accounts_information" */
    update_accounts_information: (accounts_information_mutation_response | null)
    /** update single row of the table: "accounts_information" */
    update_accounts_information_by_pk: (accounts_information | null)
    /** update multiples rows of table: "accounts_information" */
    update_accounts_information_many: ((accounts_information_mutation_response | null)[] | null)
    /** update data of the table: "devices" */
    update_devices: (devices_mutation_response | null)
    /** update single row of the table: "devices" */
    update_devices_by_pk: (devices | null)
    /** update multiples rows of table: "devices" */
    update_devices_many: ((devices_mutation_response | null)[] | null)
    /** update data of the table: "messages" */
    update_messages: (messages_mutation_response | null)
    /** update single row of the table: "messages" */
    update_messages_by_pk: (messages | null)
    /** update multiples rows of table: "messages" */
    update_messages_many: ((messages_mutation_response | null)[] | null)
    /** update data of the table: "migrate_device" */
    update_migrate_device: (migrate_device_mutation_response | null)
    /** update single row of the table: "migrate_device" */
    update_migrate_device_by_pk: (migrate_device | null)
    /** update multiples rows of table: "migrate_device" */
    update_migrate_device_many: ((migrate_device_mutation_response | null)[] | null)
    /** update data of the table: "notifications" */
    update_notifications: (notifications_mutation_response | null)
    /** update single row of the table: "notifications" */
    update_notifications_by_pk: (notifications | null)
    /** update multiples rows of table: "notifications" */
    update_notifications_many: ((notifications_mutation_response | null)[] | null)
    /** update data of the table: "p2p_offers" */
    update_p2p_offers: (p2p_offers_mutation_response | null)
    /** update single row of the table: "p2p_offers" */
    update_p2p_offers_by_pk: (p2p_offers | null)
    /** update multiples rows of table: "p2p_offers" */
    update_p2p_offers_many: ((p2p_offers_mutation_response | null)[] | null)
    /** update data of the table: "preferences" */
    update_preferences: (preferences_mutation_response | null)
    /** update single row of the table: "preferences" */
    update_preferences_by_pk: (preferences | null)
    /** update multiples rows of table: "preferences" */
    update_preferences_many: ((preferences_mutation_response | null)[] | null)
    /** update data of the table: "reg_accounts" */
    update_reg_accounts: (reg_accounts_mutation_response | null)
    /** update single row of the table: "reg_accounts" */
    update_reg_accounts_by_pk: (reg_accounts | null)
    /** update multiples rows of table: "reg_accounts" */
    update_reg_accounts_many: ((reg_accounts_mutation_response | null)[] | null)
    /** update data of the table: "signing_requests" */
    update_signing_requests: (signing_requests_mutation_response | null)
    /** update single row of the table: "signing_requests" */
    update_signing_requests_by_pk: (signing_requests | null)
    /** update multiples rows of table: "signing_requests" */
    update_signing_requests_many: ((signing_requests_mutation_response | null)[] | null)
    /** update data of the table: "swap_assets" */
    update_swap_assets: (swap_assets_mutation_response | null)
    /** update single row of the table: "swap_assets" */
    update_swap_assets_by_pk: (swap_assets | null)
    /** update multiples rows of table: "swap_assets" */
    update_swap_assets_many: ((swap_assets_mutation_response | null)[] | null)
    /** update data of the table: "swap_orders" */
    update_swap_orders: (swap_orders_mutation_response | null)
    /** update single row of the table: "swap_orders" */
    update_swap_orders_by_pk: (swap_orders | null)
    /** update multiples rows of table: "swap_orders" */
    update_swap_orders_many: ((swap_orders_mutation_response | null)[] | null)
    /** update data of the table: "trust_network" */
    update_trust_network: (trust_network_mutation_response | null)
    /** update single row of the table: "trust_network" */
    update_trust_network_by_pk: (trust_network | null)
    /** update multiples rows of table: "trust_network" */
    update_trust_network_many: ((trust_network_mutation_response | null)[] | null)
    /** update data of the table: "trust_network_notification" */
    update_trust_network_notification: (trust_network_notification_mutation_response | null)
    /** update single row of the table: "trust_network_notification" */
    update_trust_network_notification_by_pk: (trust_network_notification | null)
    /** update multiples rows of table: "trust_network_notification" */
    update_trust_network_notification_many: ((trust_network_notification_mutation_response | null)[] | null)
    /** update data of the table: "trust_network_status" */
    update_trust_network_status: (trust_network_status_mutation_response | null)
    /** update single row of the table: "trust_network_status" */
    update_trust_network_status_by_pk: (trust_network_status | null)
    /** update multiples rows of table: "trust_network_status" */
    update_trust_network_status_many: ((trust_network_status_mutation_response | null)[] | null)
    __typename: 'mutation_root'
}


/** columns and relationships of "notifications" */
export interface notifications {
    content_id: (Scalars['uuid'] | null)
    created_at: Scalars['timestamptz']
    from: Scalars['String']
    id: Scalars['uuid']
    read: Scalars['Boolean']
    /** An object relationship */
    reg_account_by_from: reg_accounts
    /** An object relationship */
    reg_account_by_to: reg_accounts
    to: Scalars['String']
    type: Scalars['String']
    __typename: 'notifications'
}


/** aggregated selection of "notifications" */
export interface notifications_aggregate {
    aggregate: (notifications_aggregate_fields | null)
    nodes: notifications[]
    __typename: 'notifications_aggregate'
}


/** aggregate fields of "notifications" */
export interface notifications_aggregate_fields {
    count: Scalars['Int']
    max: (notifications_max_fields | null)
    min: (notifications_min_fields | null)
    __typename: 'notifications_aggregate_fields'
}


/** unique or primary key constraints on table "notifications" */
export type notifications_constraint = 'notifications_pkey'


/** aggregate max on columns */
export interface notifications_max_fields {
    content_id: (Scalars['uuid'] | null)
    created_at: (Scalars['timestamptz'] | null)
    from: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    to: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    __typename: 'notifications_max_fields'
}


/** aggregate min on columns */
export interface notifications_min_fields {
    content_id: (Scalars['uuid'] | null)
    created_at: (Scalars['timestamptz'] | null)
    from: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    to: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    __typename: 'notifications_min_fields'
}


/** response of any mutation on the table "notifications" */
export interface notifications_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: notifications[]
    __typename: 'notifications_mutation_response'
}


/** select columns of table "notifications" */
export type notifications_select_column = 'content_id' | 'created_at' | 'from' | 'id' | 'read' | 'to' | 'type'


/** select "notifications_aggregate_bool_exp_bool_and_arguments_columns" columns of table "notifications" */
export type notifications_select_column_notifications_aggregate_bool_exp_bool_and_arguments_columns = 'read'


/** select "notifications_aggregate_bool_exp_bool_or_arguments_columns" columns of table "notifications" */
export type notifications_select_column_notifications_aggregate_bool_exp_bool_or_arguments_columns = 'read'


/** update columns of table "notifications" */
export type notifications_update_column = 'content_id' | 'created_at' | 'from' | 'id' | 'read' | 'to' | 'type'


/** column ordering options */
export type order_by = 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'

export interface p2p_offer_output {
    amount: (Scalars['String'] | null)
    masterbotsbank_id: (Scalars['String'] | null)
    buyer: (Scalars['String'] | null)
    buyer_confirmed_payment: (Scalars['Boolean'] | null)
    buyer_method_details: (Scalars['String'] | null)
    cancelled: (Scalars['Boolean'] | null)
    cancelled_by: (Scalars['String'] | null)
    completed: (Scalars['Boolean'] | null)
    created_at: (Scalars['String'] | null)
    id: (Scalars['String'] | null)
    initiator: (Scalars['String'] | null)
    matched: (Scalars['Boolean'] | null)
    method: (Scalars['String'] | null)
    region: (Scalars['String'] | null)
    seller: (Scalars['String'] | null)
    seller_confirmed_payment: (Scalars['Boolean'] | null)
    seller_method_details: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    updated_at: (Scalars['String'] | null)
    __typename: 'p2p_offer_output'
}


/** columns and relationships of "p2p_offers" */
export interface p2p_offers {
    amount: Scalars['String']
    masterbotsbank_id: (Scalars['String'] | null)
    buyer: (Scalars['String'] | null)
    buyer_confirmed_payment: Scalars['Boolean']
    buyer_method_details: (Scalars['String'] | null)
    cancelled: Scalars['Boolean']
    cancelled_by: (Scalars['String'] | null)
    completed: Scalars['Boolean']
    created_at: Scalars['timestamptz']
    id: Scalars['uuid']
    initiator: Scalars['String']
    matched: Scalars['Boolean']
    /** An array relationship */
    messages: messages[]
    /** An aggregate relationship */
    messages_aggregate: messages_aggregate
    method: Scalars['String']
    /** An object relationship */
    reg_account_by_buyer: (reg_accounts | null)
    /** An object relationship */
    reg_account_by_initiator: reg_accounts
    /** An object relationship */
    reg_account_by_seller: (reg_accounts | null)
    region: (Scalars['String'] | null)
    seller: (Scalars['String'] | null)
    seller_confirmed_payment: Scalars['Boolean']
    seller_method_details: (Scalars['String'] | null)
    type: Scalars['String']
    updated_at: Scalars['timestamptz']
    __typename: 'p2p_offers'
}


/** aggregated selection of "p2p_offers" */
export interface p2p_offers_aggregate {
    aggregate: (p2p_offers_aggregate_fields | null)
    nodes: p2p_offers[]
    __typename: 'p2p_offers_aggregate'
}


/** aggregate fields of "p2p_offers" */
export interface p2p_offers_aggregate_fields {
    count: Scalars['Int']
    max: (p2p_offers_max_fields | null)
    min: (p2p_offers_min_fields | null)
    __typename: 'p2p_offers_aggregate_fields'
}


/** unique or primary key constraints on table "p2p_offers" */
export type p2p_offers_constraint = 'p2p_offers_id_key' | 'p2p_offers_pkey'


/** aggregate max on columns */
export interface p2p_offers_max_fields {
    amount: (Scalars['String'] | null)
    masterbotsbank_id: (Scalars['String'] | null)
    buyer: (Scalars['String'] | null)
    buyer_method_details: (Scalars['String'] | null)
    cancelled_by: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    id: (Scalars['uuid'] | null)
    initiator: (Scalars['String'] | null)
    method: (Scalars['String'] | null)
    region: (Scalars['String'] | null)
    seller: (Scalars['String'] | null)
    seller_method_details: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    updated_at: (Scalars['timestamptz'] | null)
    __typename: 'p2p_offers_max_fields'
}


/** aggregate min on columns */
export interface p2p_offers_min_fields {
    amount: (Scalars['String'] | null)
    masterbotsbank_id: (Scalars['String'] | null)
    buyer: (Scalars['String'] | null)
    buyer_method_details: (Scalars['String'] | null)
    cancelled_by: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    id: (Scalars['uuid'] | null)
    initiator: (Scalars['String'] | null)
    method: (Scalars['String'] | null)
    region: (Scalars['String'] | null)
    seller: (Scalars['String'] | null)
    seller_method_details: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    updated_at: (Scalars['timestamptz'] | null)
    __typename: 'p2p_offers_min_fields'
}


/** response of any mutation on the table "p2p_offers" */
export interface p2p_offers_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: p2p_offers[]
    __typename: 'p2p_offers_mutation_response'
}


/** select columns of table "p2p_offers" */
export type p2p_offers_select_column = 'amount' | 'masterbotsbank_id' | 'buyer' | 'buyer_confirmed_payment' | 'buyer_method_details' | 'cancelled' | 'cancelled_by' | 'completed' | 'created_at' | 'id' | 'initiator' | 'matched' | 'method' | 'region' | 'seller' | 'seller_confirmed_payment' | 'seller_method_details' | 'type' | 'updated_at'


/** select "p2p_offers_aggregate_bool_exp_bool_and_arguments_columns" columns of table "p2p_offers" */
export type p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_and_arguments_columns = 'buyer_confirmed_payment' | 'cancelled' | 'completed' | 'matched' | 'seller_confirmed_payment'


/** select "p2p_offers_aggregate_bool_exp_bool_or_arguments_columns" columns of table "p2p_offers" */
export type p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_or_arguments_columns = 'buyer_confirmed_payment' | 'cancelled' | 'completed' | 'matched' | 'seller_confirmed_payment'


/** update columns of table "p2p_offers" */
export type p2p_offers_update_column = 'amount' | 'masterbotsbank_id' | 'buyer' | 'buyer_confirmed_payment' | 'buyer_method_details' | 'cancelled' | 'cancelled_by' | 'completed' | 'created_at' | 'id' | 'initiator' | 'matched' | 'method' | 'region' | 'seller' | 'seller_confirmed_payment' | 'seller_method_details' | 'type' | 'updated_at'


/** columns and relationships of "preferences" */
export interface preferences {
    account: Scalars['String']
    currency: Scalars['String']
    language: Scalars['String']
    notifications: Scalars['Boolean']
    personalized: Scalars['Boolean']
    region: Scalars['String']
    secondary_currency: (Scalars['jsonb'] | null)
    theme: Scalars['String']
    __typename: 'preferences'
}


/** aggregated selection of "preferences" */
export interface preferences_aggregate {
    aggregate: (preferences_aggregate_fields | null)
    nodes: preferences[]
    __typename: 'preferences_aggregate'
}


/** aggregate fields of "preferences" */
export interface preferences_aggregate_fields {
    count: Scalars['Int']
    max: (preferences_max_fields | null)
    min: (preferences_min_fields | null)
    __typename: 'preferences_aggregate_fields'
}


/** unique or primary key constraints on table "preferences" */
export type preferences_constraint = 'preferences_pkey'


/** aggregate max on columns */
export interface preferences_max_fields {
    account: (Scalars['String'] | null)
    currency: (Scalars['String'] | null)
    language: (Scalars['String'] | null)
    region: (Scalars['String'] | null)
    theme: (Scalars['String'] | null)
    __typename: 'preferences_max_fields'
}


/** aggregate min on columns */
export interface preferences_min_fields {
    account: (Scalars['String'] | null)
    currency: (Scalars['String'] | null)
    language: (Scalars['String'] | null)
    region: (Scalars['String'] | null)
    theme: (Scalars['String'] | null)
    __typename: 'preferences_min_fields'
}


/** response of any mutation on the table "preferences" */
export interface preferences_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: preferences[]
    __typename: 'preferences_mutation_response'
}


/** select columns of table "preferences" */
export type preferences_select_column = 'account' | 'currency' | 'language' | 'notifications' | 'personalized' | 'region' | 'secondary_currency' | 'theme'


/** update columns of table "preferences" */
export type preferences_update_column = 'account' | 'currency' | 'language' | 'notifications' | 'personalized' | 'region' | 'secondary_currency' | 'theme'

export interface query_root {
    /** fetch data from the table: "accounts_information" */
    accounts_information: accounts_information[]
    /** fetch aggregated fields from the table: "accounts_information" */
    accounts_information_aggregate: accounts_information_aggregate
    /** fetch data from the table: "accounts_information" using primary key columns */
    accounts_information_by_pk: (accounts_information | null)
    apollo_auth_health_check: (Scalars['String'] | null)
    apollo_health_check: (Scalars['Boolean'] | null)
    /** An array relationship */
    devices: devices[]
    /** An aggregate relationship */
    devices_aggregate: devices_aggregate
    /** fetch data from the table: "devices" using primary key columns */
    devices_by_pk: (devices | null)
    get_trust_network: (trust_network_output | null)
    /** An array relationship */
    messages: messages[]
    /** An aggregate relationship */
    messages_aggregate: messages_aggregate
    /** fetch data from the table: "messages" using primary key columns */
    messages_by_pk: (messages | null)
    /** fetch data from the table: "migrate_device" */
    migrate_device: migrate_device[]
    /** fetch aggregated fields from the table: "migrate_device" */
    migrate_device_aggregate: migrate_device_aggregate
    /** fetch data from the table: "migrate_device" using primary key columns */
    migrate_device_by_pk: (migrate_device | null)
    /** fetch data from the table: "notifications" */
    notifications: notifications[]
    /** fetch aggregated fields from the table: "notifications" */
    notifications_aggregate: notifications_aggregate
    /** fetch data from the table: "notifications" using primary key columns */
    notifications_by_pk: (notifications | null)
    /** fetch data from the table: "p2p_offers" */
    p2p_offers: p2p_offers[]
    /** fetch aggregated fields from the table: "p2p_offers" */
    p2p_offers_aggregate: p2p_offers_aggregate
    /** fetch data from the table: "p2p_offers" using primary key columns */
    p2p_offers_by_pk: (p2p_offers | null)
    /** fetch data from the table: "preferences" */
    preferences: preferences[]
    /** fetch aggregated fields from the table: "preferences" */
    preferences_aggregate: preferences_aggregate
    /** fetch data from the table: "preferences" using primary key columns */
    preferences_by_pk: (preferences | null)
    /** fetch data from the table: "reg_accounts" */
    reg_accounts: reg_accounts[]
    /** fetch aggregated fields from the table: "reg_accounts" */
    reg_accounts_aggregate: reg_accounts_aggregate
    /** fetch data from the table: "reg_accounts" using primary key columns */
    reg_accounts_by_pk: (reg_accounts | null)
    /** fetch data from the table: "signing_requests" */
    signing_requests: signing_requests[]
    /** fetch aggregated fields from the table: "signing_requests" */
    signing_requests_aggregate: signing_requests_aggregate
    /** fetch data from the table: "signing_requests" using primary key columns */
    signing_requests_by_pk: (signing_requests | null)
    /** fetch data from the table: "swap_assets" */
    swap_assets: swap_assets[]
    /** fetch aggregated fields from the table: "swap_assets" */
    swap_assets_aggregate: swap_assets_aggregate
    /** fetch data from the table: "swap_assets" using primary key columns */
    swap_assets_by_pk: (swap_assets | null)
    /** An array relationship */
    swap_orders: swap_orders[]
    /** An aggregate relationship */
    swap_orders_aggregate: swap_orders_aggregate
    /** fetch data from the table: "swap_orders" using primary key columns */
    swap_orders_by_pk: (swap_orders | null)
    /** fetch data from the table: "trust_network" */
    trust_network: trust_network[]
    /** fetch aggregated fields from the table: "trust_network" */
    trust_network_aggregate: trust_network_aggregate
    /** fetch data from the table: "trust_network" using primary key columns */
    trust_network_by_pk: (trust_network | null)
    /** fetch data from the table: "trust_network_notification" */
    trust_network_notification: trust_network_notification[]
    /** fetch aggregated fields from the table: "trust_network_notification" */
    trust_network_notification_aggregate: trust_network_notification_aggregate
    /** fetch data from the table: "trust_network_notification" using primary key columns */
    trust_network_notification_by_pk: (trust_network_notification | null)
    /** fetch data from the table: "trust_network_status" */
    trust_network_status: trust_network_status[]
    /** fetch aggregated fields from the table: "trust_network_status" */
    trust_network_status_aggregate: trust_network_status_aggregate
    /** fetch data from the table: "trust_network_status" using primary key columns */
    trust_network_status_by_pk: (trust_network_status | null)
    __typename: 'query_root'
}


/** columns and relationships of "reg_accounts" */
export interface reg_accounts {
    account: Scalars['String']
    /** An object relationship */
    accounts_information: (accounts_information | null)
    create_account: (Scalars['Boolean'] | null)
    created: (Scalars['timestamptz'] | null)
    created_at: (Scalars['timestamp'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    /** An array relationship */
    devices: devices[]
    /** An aggregate relationship */
    devices_aggregate: devices_aggregate
    id: Scalars['uuid']
    /** An array relationship */
    messages_from: messages[]
    /** An aggregate relationship */
    messages_from_aggregate: messages_aggregate
    /** An array relationship */
    messages_to: messages[]
    /** An aggregate relationship */
    messages_to_aggregate: messages_aggregate
    /** An array relationship */
    notifications_from: notifications[]
    /** An aggregate relationship */
    notifications_from_aggregate: notifications_aggregate
    /** An array relationship */
    notifications_to: notifications[]
    /** An aggregate relationship */
    notifications_to_aggregate: notifications_aggregate
    onboarded: (Scalars['Boolean'] | null)
    /** An array relationship */
    p2p_offers_buyer: p2p_offers[]
    /** An aggregate relationship */
    p2p_offers_buyer_aggregate: p2p_offers_aggregate
    /** An array relationship */
    p2p_offers_initiator: p2p_offers[]
    /** An aggregate relationship */
    p2p_offers_initiator_aggregate: p2p_offers_aggregate
    /** An array relationship */
    p2p_offers_seller: p2p_offers[]
    /** An aggregate relationship */
    p2p_offers_seller_aggregate: p2p_offers_aggregate
    public_key: (Scalars['String'] | null)
    referrer: Scalars['String']
    /** An array relationship */
    reg_accounts_accounts_information: accounts_information[]
    /** An aggregate relationship */
    reg_accounts_accounts_information_aggregate: accounts_information_aggregate
    /** An array relationship */
    swap_orders: swap_orders[]
    /** An aggregate relationship */
    swap_orders_aggregate: swap_orders_aggregate
    /** An array relationship */
    trustNetworkNotificationsByTrust: trust_network_notification[]
    /** An aggregate relationship */
    trustNetworkNotificationsByTrust_aggregate: trust_network_notification_aggregate
    /** An array relationship */
    trust_network_notifications: trust_network_notification[]
    /** An aggregate relationship */
    trust_network_notifications_aggregate: trust_network_notification_aggregate
    /** An array relationship */
    trust_networks_by_account: trust_network[]
    /** An aggregate relationship */
    trust_networks_by_account_aggregate: trust_network_aggregate
    /** An array relationship */
    trust_networks_by_trust: trust_network[]
    /** An aggregate relationship */
    trust_networks_by_trust_aggregate: trust_network_aggregate
    txid: (Scalars['String'] | null)
    __typename: 'reg_accounts'
}


/** aggregated selection of "reg_accounts" */
export interface reg_accounts_aggregate {
    aggregate: (reg_accounts_aggregate_fields | null)
    nodes: reg_accounts[]
    __typename: 'reg_accounts_aggregate'
}


/** aggregate fields of "reg_accounts" */
export interface reg_accounts_aggregate_fields {
    count: Scalars['Int']
    max: (reg_accounts_max_fields | null)
    min: (reg_accounts_min_fields | null)
    __typename: 'reg_accounts_aggregate_fields'
}


/** unique or primary key constraints on table "reg_accounts" */
export type reg_accounts_constraint = 'accounts_pkey' | 'reg_accounts_account_key'


/** aggregate max on columns */
export interface reg_accounts_max_fields {
    account: (Scalars['String'] | null)
    created: (Scalars['timestamptz'] | null)
    created_at: (Scalars['timestamp'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    public_key: (Scalars['String'] | null)
    referrer: (Scalars['String'] | null)
    txid: (Scalars['String'] | null)
    __typename: 'reg_accounts_max_fields'
}


/** aggregate min on columns */
export interface reg_accounts_min_fields {
    account: (Scalars['String'] | null)
    created: (Scalars['timestamptz'] | null)
    created_at: (Scalars['timestamp'] | null)
    cred_id: (Scalars['String'] | null)
    device_name: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    public_key: (Scalars['String'] | null)
    referrer: (Scalars['String'] | null)
    txid: (Scalars['String'] | null)
    __typename: 'reg_accounts_min_fields'
}


/** response of any mutation on the table "reg_accounts" */
export interface reg_accounts_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: reg_accounts[]
    __typename: 'reg_accounts_mutation_response'
}


/** select columns of table "reg_accounts" */
export type reg_accounts_select_column = 'account' | 'create_account' | 'created' | 'created_at' | 'cred_id' | 'device_name' | 'id' | 'onboarded' | 'public_key' | 'referrer' | 'txid'


/** update columns of table "reg_accounts" */
export type reg_accounts_update_column = 'account' | 'create_account' | 'created' | 'created_at' | 'cred_id' | 'device_name' | 'id' | 'onboarded' | 'public_key' | 'referrer' | 'txid'

export interface request_new_account_output {
    id: Scalars['String']
    __typename: 'request_new_account_output'
}


/** columns and relationships of "signing_requests" */
export interface signing_requests {
    createdAt: Scalars['timestamptz']
    esr: Scalars['String']
    id: Scalars['uuid']
    signature: (Scalars['String'] | null)
    signer: Scalars['String']
    status: Scalars['String']
    transactionId: (Scalars['String'] | null)
    updatedAt: Scalars['timestamptz']
    __typename: 'signing_requests'
}


/** aggregated selection of "signing_requests" */
export interface signing_requests_aggregate {
    aggregate: (signing_requests_aggregate_fields | null)
    nodes: signing_requests[]
    __typename: 'signing_requests_aggregate'
}


/** aggregate fields of "signing_requests" */
export interface signing_requests_aggregate_fields {
    count: Scalars['Int']
    max: (signing_requests_max_fields | null)
    min: (signing_requests_min_fields | null)
    __typename: 'signing_requests_aggregate_fields'
}


/** unique or primary key constraints on table "signing_requests" */
export type signing_requests_constraint = 'signing_requests_pkey'


/** aggregate max on columns */
export interface signing_requests_max_fields {
    createdAt: (Scalars['timestamptz'] | null)
    esr: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    signature: (Scalars['String'] | null)
    signer: (Scalars['String'] | null)
    status: (Scalars['String'] | null)
    transactionId: (Scalars['String'] | null)
    updatedAt: (Scalars['timestamptz'] | null)
    __typename: 'signing_requests_max_fields'
}


/** aggregate min on columns */
export interface signing_requests_min_fields {
    createdAt: (Scalars['timestamptz'] | null)
    esr: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    signature: (Scalars['String'] | null)
    signer: (Scalars['String'] | null)
    status: (Scalars['String'] | null)
    transactionId: (Scalars['String'] | null)
    updatedAt: (Scalars['timestamptz'] | null)
    __typename: 'signing_requests_min_fields'
}


/** response of any mutation on the table "signing_requests" */
export interface signing_requests_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: signing_requests[]
    __typename: 'signing_requests_mutation_response'
}


/** select columns of table "signing_requests" */
export type signing_requests_select_column = 'createdAt' | 'esr' | 'id' | 'signature' | 'signer' | 'status' | 'transactionId' | 'updatedAt'


/** update columns of table "signing_requests" */
export type signing_requests_update_column = 'createdAt' | 'esr' | 'id' | 'signature' | 'signer' | 'status' | 'transactionId' | 'updatedAt'

export interface subscription_root {
    /** fetch data from the table: "accounts_information" */
    accounts_information: accounts_information[]
    /** fetch aggregated fields from the table: "accounts_information" */
    accounts_information_aggregate: accounts_information_aggregate
    /** fetch data from the table: "accounts_information" using primary key columns */
    accounts_information_by_pk: (accounts_information | null)
    /** fetch data from the table in a streaming manner: "accounts_information" */
    accounts_information_stream: accounts_information[]
    /** An array relationship */
    devices: devices[]
    /** An aggregate relationship */
    devices_aggregate: devices_aggregate
    /** fetch data from the table: "devices" using primary key columns */
    devices_by_pk: (devices | null)
    /** fetch data from the table in a streaming manner: "devices" */
    devices_stream: devices[]
    /** An array relationship */
    messages: messages[]
    /** An aggregate relationship */
    messages_aggregate: messages_aggregate
    /** fetch data from the table: "messages" using primary key columns */
    messages_by_pk: (messages | null)
    /** fetch data from the table in a streaming manner: "messages" */
    messages_stream: messages[]
    /** fetch data from the table: "migrate_device" */
    migrate_device: migrate_device[]
    /** fetch aggregated fields from the table: "migrate_device" */
    migrate_device_aggregate: migrate_device_aggregate
    /** fetch data from the table: "migrate_device" using primary key columns */
    migrate_device_by_pk: (migrate_device | null)
    /** fetch data from the table in a streaming manner: "migrate_device" */
    migrate_device_stream: migrate_device[]
    /** fetch data from the table: "notifications" */
    notifications: notifications[]
    /** fetch aggregated fields from the table: "notifications" */
    notifications_aggregate: notifications_aggregate
    /** fetch data from the table: "notifications" using primary key columns */
    notifications_by_pk: (notifications | null)
    /** fetch data from the table in a streaming manner: "notifications" */
    notifications_stream: notifications[]
    /** fetch data from the table: "p2p_offers" */
    p2p_offers: p2p_offers[]
    /** fetch aggregated fields from the table: "p2p_offers" */
    p2p_offers_aggregate: p2p_offers_aggregate
    /** fetch data from the table: "p2p_offers" using primary key columns */
    p2p_offers_by_pk: (p2p_offers | null)
    /** fetch data from the table in a streaming manner: "p2p_offers" */
    p2p_offers_stream: p2p_offers[]
    /** fetch data from the table: "preferences" */
    preferences: preferences[]
    /** fetch aggregated fields from the table: "preferences" */
    preferences_aggregate: preferences_aggregate
    /** fetch data from the table: "preferences" using primary key columns */
    preferences_by_pk: (preferences | null)
    /** fetch data from the table in a streaming manner: "preferences" */
    preferences_stream: preferences[]
    /** fetch data from the table: "reg_accounts" */
    reg_accounts: reg_accounts[]
    /** fetch aggregated fields from the table: "reg_accounts" */
    reg_accounts_aggregate: reg_accounts_aggregate
    /** fetch data from the table: "reg_accounts" using primary key columns */
    reg_accounts_by_pk: (reg_accounts | null)
    /** fetch data from the table in a streaming manner: "reg_accounts" */
    reg_accounts_stream: reg_accounts[]
    /** fetch data from the table: "signing_requests" */
    signing_requests: signing_requests[]
    /** fetch aggregated fields from the table: "signing_requests" */
    signing_requests_aggregate: signing_requests_aggregate
    /** fetch data from the table: "signing_requests" using primary key columns */
    signing_requests_by_pk: (signing_requests | null)
    /** fetch data from the table in a streaming manner: "signing_requests" */
    signing_requests_stream: signing_requests[]
    /** fetch data from the table: "swap_assets" */
    swap_assets: swap_assets[]
    /** fetch aggregated fields from the table: "swap_assets" */
    swap_assets_aggregate: swap_assets_aggregate
    /** fetch data from the table: "swap_assets" using primary key columns */
    swap_assets_by_pk: (swap_assets | null)
    /** fetch data from the table in a streaming manner: "swap_assets" */
    swap_assets_stream: swap_assets[]
    /** An array relationship */
    swap_orders: swap_orders[]
    /** An aggregate relationship */
    swap_orders_aggregate: swap_orders_aggregate
    /** fetch data from the table: "swap_orders" using primary key columns */
    swap_orders_by_pk: (swap_orders | null)
    /** fetch data from the table in a streaming manner: "swap_orders" */
    swap_orders_stream: swap_orders[]
    /** fetch data from the table: "trust_network" */
    trust_network: trust_network[]
    /** fetch aggregated fields from the table: "trust_network" */
    trust_network_aggregate: trust_network_aggregate
    /** fetch data from the table: "trust_network" using primary key columns */
    trust_network_by_pk: (trust_network | null)
    /** fetch data from the table: "trust_network_notification" */
    trust_network_notification: trust_network_notification[]
    /** fetch aggregated fields from the table: "trust_network_notification" */
    trust_network_notification_aggregate: trust_network_notification_aggregate
    /** fetch data from the table: "trust_network_notification" using primary key columns */
    trust_network_notification_by_pk: (trust_network_notification | null)
    /** fetch data from the table in a streaming manner: "trust_network_notification" */
    trust_network_notification_stream: trust_network_notification[]
    /** fetch data from the table: "trust_network_status" */
    trust_network_status: trust_network_status[]
    /** fetch aggregated fields from the table: "trust_network_status" */
    trust_network_status_aggregate: trust_network_status_aggregate
    /** fetch data from the table: "trust_network_status" using primary key columns */
    trust_network_status_by_pk: (trust_network_status | null)
    /** fetch data from the table in a streaming manner: "trust_network_status" */
    trust_network_status_stream: trust_network_status[]
    /** fetch data from the table in a streaming manner: "trust_network" */
    trust_network_stream: trust_network[]
    __typename: 'subscription_root'
}


/** columns and relationships of "swap_assets" */
export interface swap_assets {
    active_swaps: Scalars['Boolean']
    asset: Scalars['String']
    asset_name: Scalars['String']
    chain: Scalars['String']
    wallet_address: Scalars['String']
    __typename: 'swap_assets'
}


/** aggregated selection of "swap_assets" */
export interface swap_assets_aggregate {
    aggregate: (swap_assets_aggregate_fields | null)
    nodes: swap_assets[]
    __typename: 'swap_assets_aggregate'
}


/** aggregate fields of "swap_assets" */
export interface swap_assets_aggregate_fields {
    count: Scalars['Int']
    max: (swap_assets_max_fields | null)
    min: (swap_assets_min_fields | null)
    __typename: 'swap_assets_aggregate_fields'
}


/** unique or primary key constraints on table "swap_assets" */
export type swap_assets_constraint = 'swap_assets_pkey'


/** aggregate max on columns */
export interface swap_assets_max_fields {
    asset: (Scalars['String'] | null)
    asset_name: (Scalars['String'] | null)
    chain: (Scalars['String'] | null)
    wallet_address: (Scalars['String'] | null)
    __typename: 'swap_assets_max_fields'
}


/** aggregate min on columns */
export interface swap_assets_min_fields {
    asset: (Scalars['String'] | null)
    asset_name: (Scalars['String'] | null)
    chain: (Scalars['String'] | null)
    wallet_address: (Scalars['String'] | null)
    __typename: 'swap_assets_min_fields'
}


/** response of any mutation on the table "swap_assets" */
export interface swap_assets_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: swap_assets[]
    __typename: 'swap_assets_mutation_response'
}


/** select columns of table "swap_assets" */
export type swap_assets_select_column = 'active_swaps' | 'asset' | 'asset_name' | 'chain' | 'wallet_address'


/** update columns of table "swap_assets" */
export type swap_assets_update_column = 'active_swaps' | 'asset' | 'asset_name' | 'chain' | 'wallet_address'


/** columns and relationships of "swap_orders" */
export interface swap_orders {
    asset: Scalars['String']
    asset_amount: Scalars['float8']
    masterbots_account: Scalars['String']
    masterbots_amount: Scalars['float8']
    masterbots_currency: Scalars['String']
    masterbots_trx: (Scalars['String'] | null)
    created_at: Scalars['timestamptz']
    gems_id: (Scalars['String'] | null)
    id: Scalars['uuid']
    order_status: Scalars['String']
    order_type: Scalars['String']
    price: Scalars['float8']
    /** An object relationship */
    reg_account: reg_accounts
    updated_at: Scalars['timestamptz']
    wallet_address: Scalars['String']
    __typename: 'swap_orders'
}


/** aggregated selection of "swap_orders" */
export interface swap_orders_aggregate {
    aggregate: (swap_orders_aggregate_fields | null)
    nodes: swap_orders[]
    __typename: 'swap_orders_aggregate'
}


/** aggregate fields of "swap_orders" */
export interface swap_orders_aggregate_fields {
    avg: (swap_orders_avg_fields | null)
    count: Scalars['Int']
    max: (swap_orders_max_fields | null)
    min: (swap_orders_min_fields | null)
    stddev: (swap_orders_stddev_fields | null)
    stddev_pop: (swap_orders_stddev_pop_fields | null)
    stddev_samp: (swap_orders_stddev_samp_fields | null)
    sum: (swap_orders_sum_fields | null)
    var_pop: (swap_orders_var_pop_fields | null)
    var_samp: (swap_orders_var_samp_fields | null)
    variance: (swap_orders_variance_fields | null)
    __typename: 'swap_orders_aggregate_fields'
}


/** aggregate avg on columns */
export interface swap_orders_avg_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_avg_fields'
}


/** unique or primary key constraints on table "swap_orders" */
export type swap_orders_constraint = 'swap_orders_pkey'


/** aggregate max on columns */
export interface swap_orders_max_fields {
    asset: (Scalars['String'] | null)
    asset_amount: (Scalars['float8'] | null)
    masterbots_account: (Scalars['String'] | null)
    masterbots_amount: (Scalars['float8'] | null)
    masterbots_currency: (Scalars['String'] | null)
    masterbots_trx: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    gems_id: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    order_status: (Scalars['String'] | null)
    order_type: (Scalars['String'] | null)
    price: (Scalars['float8'] | null)
    updated_at: (Scalars['timestamptz'] | null)
    wallet_address: (Scalars['String'] | null)
    __typename: 'swap_orders_max_fields'
}


/** aggregate min on columns */
export interface swap_orders_min_fields {
    asset: (Scalars['String'] | null)
    asset_amount: (Scalars['float8'] | null)
    masterbots_account: (Scalars['String'] | null)
    masterbots_amount: (Scalars['float8'] | null)
    masterbots_currency: (Scalars['String'] | null)
    masterbots_trx: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    gems_id: (Scalars['String'] | null)
    id: (Scalars['uuid'] | null)
    order_status: (Scalars['String'] | null)
    order_type: (Scalars['String'] | null)
    price: (Scalars['float8'] | null)
    updated_at: (Scalars['timestamptz'] | null)
    wallet_address: (Scalars['String'] | null)
    __typename: 'swap_orders_min_fields'
}


/** response of any mutation on the table "swap_orders" */
export interface swap_orders_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: swap_orders[]
    __typename: 'swap_orders_mutation_response'
}


/** select columns of table "swap_orders" */
export type swap_orders_select_column = 'asset' | 'asset_amount' | 'masterbots_account' | 'masterbots_amount' | 'masterbots_currency' | 'masterbots_trx' | 'created_at' | 'gems_id' | 'id' | 'order_status' | 'order_type' | 'price' | 'updated_at' | 'wallet_address'


/** select "swap_orders_aggregate_bool_exp_avg_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_avg_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_corr_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_corr_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_covar_samp_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_max_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_max_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_min_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_min_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_stddev_samp_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_sum_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_sum_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** select "swap_orders_aggregate_bool_exp_var_samp_arguments_columns" columns of table "swap_orders" */
export type swap_orders_select_column_swap_orders_aggregate_bool_exp_var_samp_arguments_columns = 'asset_amount' | 'masterbots_amount' | 'price'


/** aggregate stddev on columns */
export interface swap_orders_stddev_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_stddev_fields'
}


/** aggregate stddev_pop on columns */
export interface swap_orders_stddev_pop_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_stddev_pop_fields'
}


/** aggregate stddev_samp on columns */
export interface swap_orders_stddev_samp_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_stddev_samp_fields'
}


/** aggregate sum on columns */
export interface swap_orders_sum_fields {
    asset_amount: (Scalars['float8'] | null)
    masterbots_amount: (Scalars['float8'] | null)
    price: (Scalars['float8'] | null)
    __typename: 'swap_orders_sum_fields'
}


/** update columns of table "swap_orders" */
export type swap_orders_update_column = 'asset' | 'asset_amount' | 'masterbots_account' | 'masterbots_amount' | 'masterbots_currency' | 'masterbots_trx' | 'created_at' | 'gems_id' | 'id' | 'order_status' | 'order_type' | 'price' | 'updated_at' | 'wallet_address'


/** aggregate var_pop on columns */
export interface swap_orders_var_pop_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_var_pop_fields'
}


/** aggregate var_samp on columns */
export interface swap_orders_var_samp_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_var_samp_fields'
}


/** aggregate variance on columns */
export interface swap_orders_variance_fields {
    asset_amount: (Scalars['Float'] | null)
    masterbots_amount: (Scalars['Float'] | null)
    price: (Scalars['Float'] | null)
    __typename: 'swap_orders_variance_fields'
}

export interface toggle_trust_network_output {
    success: (Scalars['Boolean'] | null)
    __typename: 'toggle_trust_network_output'
}


/** columns and relationships of "trust_network" */
export interface trust_network {
    account: Scalars['String']
    created_at: Scalars['timestamptz']
    is_mutual: Scalars['Boolean']
    trust: Scalars['String']
    /** An object relationship */
    trust_by: reg_accounts
    /** An object relationship */
    trust_network: reg_accounts
    __typename: 'trust_network'
}


/** aggregated selection of "trust_network" */
export interface trust_network_aggregate {
    aggregate: (trust_network_aggregate_fields | null)
    nodes: trust_network[]
    __typename: 'trust_network_aggregate'
}


/** aggregate fields of "trust_network" */
export interface trust_network_aggregate_fields {
    count: Scalars['Int']
    max: (trust_network_max_fields | null)
    min: (trust_network_min_fields | null)
    __typename: 'trust_network_aggregate_fields'
}


/** unique or primary key constraints on table "trust_network" */
export type trust_network_constraint = 'trust_network_pkey'


/** aggregate max on columns */
export interface trust_network_max_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    trust: (Scalars['String'] | null)
    __typename: 'trust_network_max_fields'
}


/** aggregate min on columns */
export interface trust_network_min_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    trust: (Scalars['String'] | null)
    __typename: 'trust_network_min_fields'
}


/** response of any mutation on the table "trust_network" */
export interface trust_network_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: trust_network[]
    __typename: 'trust_network_mutation_response'
}


/** columns and relationships of "trust_network_notification" */
export interface trust_network_notification {
    account: Scalars['String']
    created_at: Scalars['timestamptz']
    /** An object relationship */
    regAccountByTrust: reg_accounts
    /** An object relationship */
    reg_account: reg_accounts
    trust: Scalars['String']
    __typename: 'trust_network_notification'
}


/** aggregated selection of "trust_network_notification" */
export interface trust_network_notification_aggregate {
    aggregate: (trust_network_notification_aggregate_fields | null)
    nodes: trust_network_notification[]
    __typename: 'trust_network_notification_aggregate'
}


/** aggregate fields of "trust_network_notification" */
export interface trust_network_notification_aggregate_fields {
    count: Scalars['Int']
    max: (trust_network_notification_max_fields | null)
    min: (trust_network_notification_min_fields | null)
    __typename: 'trust_network_notification_aggregate_fields'
}


/** unique or primary key constraints on table "trust_network_notification" */
export type trust_network_notification_constraint = 'trust_network_notification_pkey'


/** aggregate max on columns */
export interface trust_network_notification_max_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    trust: (Scalars['String'] | null)
    __typename: 'trust_network_notification_max_fields'
}


/** aggregate min on columns */
export interface trust_network_notification_min_fields {
    account: (Scalars['String'] | null)
    created_at: (Scalars['timestamptz'] | null)
    trust: (Scalars['String'] | null)
    __typename: 'trust_network_notification_min_fields'
}


/** response of any mutation on the table "trust_network_notification" */
export interface trust_network_notification_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: trust_network_notification[]
    __typename: 'trust_network_notification_mutation_response'
}


/** select columns of table "trust_network_notification" */
export type trust_network_notification_select_column = 'account' | 'created_at' | 'trust'


/** update columns of table "trust_network_notification" */
export type trust_network_notification_update_column = 'account' | 'created_at' | 'trust'

export interface trust_network_output {
    trusted_network: ((Scalars['String'] | null)[] | null)
    __typename: 'trust_network_output'
}


/** select columns of table "trust_network" */
export type trust_network_select_column = 'account' | 'created_at' | 'is_mutual' | 'trust'


/** select "trust_network_aggregate_bool_exp_bool_and_arguments_columns" columns of table "trust_network" */
export type trust_network_select_column_trust_network_aggregate_bool_exp_bool_and_arguments_columns = 'is_mutual'


/** select "trust_network_aggregate_bool_exp_bool_or_arguments_columns" columns of table "trust_network" */
export type trust_network_select_column_trust_network_aggregate_bool_exp_bool_or_arguments_columns = 'is_mutual'


/** columns and relationships of "trust_network_status" */
export interface trust_network_status {
    status: Scalars['String']
    __typename: 'trust_network_status'
}


/** aggregated selection of "trust_network_status" */
export interface trust_network_status_aggregate {
    aggregate: (trust_network_status_aggregate_fields | null)
    nodes: trust_network_status[]
    __typename: 'trust_network_status_aggregate'
}


/** aggregate fields of "trust_network_status" */
export interface trust_network_status_aggregate_fields {
    count: Scalars['Int']
    max: (trust_network_status_max_fields | null)
    min: (trust_network_status_min_fields | null)
    __typename: 'trust_network_status_aggregate_fields'
}


/** unique or primary key constraints on table "trust_network_status" */
export type trust_network_status_constraint = 'trusted_network_status_pkey'


/** aggregate max on columns */
export interface trust_network_status_max_fields {
    status: (Scalars['String'] | null)
    __typename: 'trust_network_status_max_fields'
}


/** aggregate min on columns */
export interface trust_network_status_min_fields {
    status: (Scalars['String'] | null)
    __typename: 'trust_network_status_min_fields'
}


/** response of any mutation on the table "trust_network_status" */
export interface trust_network_status_mutation_response {
    /** number of rows affected by the mutation */
    affected_rows: Scalars['Int']
    /** data from the rows affected by the mutation */
    returning: trust_network_status[]
    __typename: 'trust_network_status_mutation_response'
}


/** select columns of table "trust_network_status" */
export type trust_network_status_select_column = 'status'


/** update columns of table "trust_network_status" */
export type trust_network_status_update_column = 'status'


/** update columns of table "trust_network" */
export type trust_network_update_column = 'account' | 'created_at' | 'is_mutual' | 'trust'

export type Query = query_root
export type Mutation = mutation_root
export type Subscription = subscription_root


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {_eq?: (Scalars['Boolean'] | null),_gt?: (Scalars['Boolean'] | null),_gte?: (Scalars['Boolean'] | null),_in?: (Scalars['Boolean'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Boolean'] | null),_lte?: (Scalars['Boolean'] | null),_neq?: (Scalars['Boolean'] | null),_nin?: (Scalars['Boolean'][] | null)}


/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {_eq?: (Scalars['Int'] | null),_gt?: (Scalars['Int'] | null),_gte?: (Scalars['Int'] | null),_in?: (Scalars['Int'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['Int'] | null),_lte?: (Scalars['Int'] | null),_neq?: (Scalars['Int'] | null),_nin?: (Scalars['Int'][] | null)}


/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {_eq?: (Scalars['String'] | null),_gt?: (Scalars['String'] | null),_gte?: (Scalars['String'] | null),
/** does the column match the given case-insensitive pattern */
_ilike?: (Scalars['String'] | null),_in?: (Scalars['String'][] | null),
/** does the column match the given POSIX regular expression, case insensitive */
_iregex?: (Scalars['String'] | null),_is_null?: (Scalars['Boolean'] | null),
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


/** Additional information for account restoration and for kyc */
export interface accounts_informationGenqlSelection{
    account?: boolean | number
    email?: boolean | number
    id?: boolean | number
    newsletter_subscription?: boolean | number
    phone?: boolean | number
    recovery_partners?: { __args: {
    /** JSON select path */
    path?: (Scalars['String'] | null)} } | boolean | number
    /** An object relationship */
    reg_account?: reg_accountsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "accounts_information" */
export interface accounts_information_aggregateGenqlSelection{
    aggregate?: accounts_information_aggregate_fieldsGenqlSelection
    nodes?: accounts_informationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface accounts_information_aggregate_bool_exp {bool_and?: (accounts_information_aggregate_bool_exp_bool_and | null),bool_or?: (accounts_information_aggregate_bool_exp_bool_or | null),count?: (accounts_information_aggregate_bool_exp_count | null)}

export interface accounts_information_aggregate_bool_exp_bool_and {arguments?: accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_and_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (accounts_information_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface accounts_information_aggregate_bool_exp_bool_or {arguments?: accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_or_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (accounts_information_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface accounts_information_aggregate_bool_exp_count {arguments?: (accounts_information_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (accounts_information_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "accounts_information" */
export interface accounts_information_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (accounts_information_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: accounts_information_max_fieldsGenqlSelection
    min?: accounts_information_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "accounts_information" */
export interface accounts_information_aggregate_order_by {count?: (order_by | null),max?: (accounts_information_max_order_by | null),min?: (accounts_information_min_order_by | null)}


/** append existing jsonb value of filtered columns with new jsonb value */
export interface accounts_information_append_input {recovery_partners?: (Scalars['jsonb'] | null)}


/** input type for inserting array relation for remote table "accounts_information" */
export interface accounts_information_arr_rel_insert_input {data?: accounts_information_insert_input[],
/** upsert condition */
on_conflict?: (accounts_information_on_conflict | null)}


/** Boolean expression to filter rows from the table "accounts_information". All fields are combined with a logical 'AND'. */
export interface accounts_information_bool_exp {_and?: (accounts_information_bool_exp[] | null),_not?: (accounts_information_bool_exp | null),_or?: (accounts_information_bool_exp[] | null),account?: (String_comparison_exp | null),email?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),newsletter_subscription?: (Boolean_comparison_exp | null),phone?: (String_comparison_exp | null),recovery_partners?: (jsonb_comparison_exp | null),reg_account?: (reg_accounts_bool_exp | null)}


/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export interface accounts_information_delete_at_path_input {recovery_partners?: (Scalars['String'][] | null)}


/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export interface accounts_information_delete_elem_input {recovery_partners?: (Scalars['Int'] | null)}


/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export interface accounts_information_delete_key_input {recovery_partners?: (Scalars['String'] | null)}


/** input type for inserting data into table "accounts_information" */
export interface accounts_information_insert_input {account?: (Scalars['String'] | null),email?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),newsletter_subscription?: (Scalars['Boolean'] | null),phone?: (Scalars['String'] | null),recovery_partners?: (Scalars['jsonb'] | null),reg_account?: (reg_accounts_obj_rel_insert_input | null)}


/** aggregate max on columns */
export interface accounts_information_max_fieldsGenqlSelection{
    account?: boolean | number
    email?: boolean | number
    id?: boolean | number
    phone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "accounts_information" */
export interface accounts_information_max_order_by {account?: (order_by | null),email?: (order_by | null),id?: (order_by | null),phone?: (order_by | null)}


/** aggregate min on columns */
export interface accounts_information_min_fieldsGenqlSelection{
    account?: boolean | number
    email?: boolean | number
    id?: boolean | number
    phone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "accounts_information" */
export interface accounts_information_min_order_by {account?: (order_by | null),email?: (order_by | null),id?: (order_by | null),phone?: (order_by | null)}


/** response of any mutation on the table "accounts_information" */
export interface accounts_information_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: accounts_informationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "accounts_information" */
export interface accounts_information_obj_rel_insert_input {data?: accounts_information_insert_input,
/** upsert condition */
on_conflict?: (accounts_information_on_conflict | null)}


/** on_conflict condition type for table "accounts_information" */
export interface accounts_information_on_conflict {constraint?: accounts_information_constraint,update_columns?: accounts_information_update_column[],where?: (accounts_information_bool_exp | null)}


/** Ordering options when selecting data from "accounts_information". */
export interface accounts_information_order_by {account?: (order_by | null),email?: (order_by | null),id?: (order_by | null),newsletter_subscription?: (order_by | null),phone?: (order_by | null),recovery_partners?: (order_by | null),reg_account?: (reg_accounts_order_by | null)}


/** primary key columns input for table: accounts_information */
export interface accounts_information_pk_columns_input {account?: Scalars['String'],id?: Scalars['uuid']}


/** prepend existing jsonb value of filtered columns with new jsonb value */
export interface accounts_information_prepend_input {recovery_partners?: (Scalars['jsonb'] | null)}


/** input type for updating data in table "accounts_information" */
export interface accounts_information_set_input {account?: (Scalars['String'] | null),email?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),newsletter_subscription?: (Scalars['Boolean'] | null),phone?: (Scalars['String'] | null),recovery_partners?: (Scalars['jsonb'] | null)}


/** Streaming cursor of the table "accounts_information" */
export interface accounts_information_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: accounts_information_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface accounts_information_stream_cursor_value_input {account?: (Scalars['String'] | null),email?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),newsletter_subscription?: (Scalars['Boolean'] | null),phone?: (Scalars['String'] | null),recovery_partners?: (Scalars['jsonb'] | null)}

export interface accounts_information_updates {
/** append existing jsonb value of filtered columns with new jsonb value */
_append?: (accounts_information_append_input | null),
/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
_delete_at_path?: (accounts_information_delete_at_path_input | null),
/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
_delete_elem?: (accounts_information_delete_elem_input | null),
/** delete key/value pair or string element. key/value pairs are matched based on their key value */
_delete_key?: (accounts_information_delete_key_input | null),
/** prepend existing jsonb value of filtered columns with new jsonb value */
_prepend?: (accounts_information_prepend_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (accounts_information_set_input | null),
/** filter the rows which have to be updated */
where?: accounts_information_bool_exp}

export interface cancel_p2p_offer_input {cancelled_by?: Scalars['String'],id?: Scalars['String']}

export interface confirm_p2p_offer_input {buyer?: (Scalars['String'] | null),completed?: (Scalars['Boolean'] | null),id?: Scalars['String'],seller?: (Scalars['String'] | null)}


/** columns and relationships of "devices" */
export interface devicesGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    /** An object relationship */
    reg_account?: reg_accountsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "devices" */
export interface devices_aggregateGenqlSelection{
    aggregate?: devices_aggregate_fieldsGenqlSelection
    nodes?: devicesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface devices_aggregate_bool_exp {count?: (devices_aggregate_bool_exp_count | null)}

export interface devices_aggregate_bool_exp_count {arguments?: (devices_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (devices_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "devices" */
export interface devices_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (devices_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: devices_max_fieldsGenqlSelection
    min?: devices_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "devices" */
export interface devices_aggregate_order_by {count?: (order_by | null),max?: (devices_max_order_by | null),min?: (devices_min_order_by | null)}


/** input type for inserting array relation for remote table "devices" */
export interface devices_arr_rel_insert_input {data?: devices_insert_input[],
/** upsert condition */
on_conflict?: (devices_on_conflict | null)}


/** Boolean expression to filter rows from the table "devices". All fields are combined with a logical 'AND'. */
export interface devices_bool_exp {_and?: (devices_bool_exp[] | null),_not?: (devices_bool_exp | null),_or?: (devices_bool_exp[] | null),account?: (String_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),cred_id?: (String_comparison_exp | null),device_name?: (String_comparison_exp | null),public_key?: (String_comparison_exp | null),reg_account?: (reg_accounts_bool_exp | null)}


/** input type for inserting data into table "devices" */
export interface devices_insert_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null),reg_account?: (reg_accounts_obj_rel_insert_input | null)}


/** aggregate max on columns */
export interface devices_max_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "devices" */
export interface devices_max_order_by {account?: (order_by | null),created_at?: (order_by | null),cred_id?: (order_by | null),device_name?: (order_by | null),public_key?: (order_by | null)}


/** aggregate min on columns */
export interface devices_min_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "devices" */
export interface devices_min_order_by {account?: (order_by | null),created_at?: (order_by | null),cred_id?: (order_by | null),device_name?: (order_by | null),public_key?: (order_by | null)}


/** response of any mutation on the table "devices" */
export interface devices_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: devicesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "devices" */
export interface devices_on_conflict {constraint?: devices_constraint,update_columns?: devices_update_column[],where?: (devices_bool_exp | null)}


/** Ordering options when selecting data from "devices". */
export interface devices_order_by {account?: (order_by | null),created_at?: (order_by | null),cred_id?: (order_by | null),device_name?: (order_by | null),public_key?: (order_by | null),reg_account?: (reg_accounts_order_by | null)}


/** primary key columns input for table: devices */
export interface devices_pk_columns_input {cred_id?: Scalars['String']}


/** input type for updating data in table "devices" */
export interface devices_set_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null)}


/** Streaming cursor of the table "devices" */
export interface devices_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: devices_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface devices_stream_cursor_value_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null)}

export interface devices_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (devices_set_input | null),
/** filter the rows which have to be updated */
where?: devices_bool_exp}


/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export interface float8_comparison_exp {_eq?: (Scalars['float8'] | null),_gt?: (Scalars['float8'] | null),_gte?: (Scalars['float8'] | null),_in?: (Scalars['float8'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['float8'] | null),_lte?: (Scalars['float8'] | null),_neq?: (Scalars['float8'] | null),_nin?: (Scalars['float8'][] | null)}

export interface jsonb_cast_exp {String?: (String_comparison_exp | null)}


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export interface jsonb_comparison_exp {_cast?: (jsonb_cast_exp | null),
/** is the column contained in the given json value */
_contained_in?: (Scalars['jsonb'] | null),
/** does the column contain the given json value at the top level */
_contains?: (Scalars['jsonb'] | null),_eq?: (Scalars['jsonb'] | null),_gt?: (Scalars['jsonb'] | null),_gte?: (Scalars['jsonb'] | null),
/** does the string exist as a top-level key in the column */
_has_key?: (Scalars['String'] | null),
/** do all of these strings exist as top-level keys in the column */
_has_keys_all?: (Scalars['String'][] | null),
/** do any of these strings exist as top-level keys in the column */
_has_keys_any?: (Scalars['String'][] | null),_in?: (Scalars['jsonb'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['jsonb'] | null),_lte?: (Scalars['jsonb'] | null),_neq?: (Scalars['jsonb'] | null),_nin?: (Scalars['jsonb'][] | null)}

export interface make_p2p_buy_offer_input {amount?: Scalars['String'],buyer?: Scalars['String'],buyer_method_details?: (Scalars['String'] | null),method?: Scalars['String'],region?: Scalars['String']}

export interface make_p2p_sell_offer_input {amount?: Scalars['String'],masterbotsbank_id?: Scalars['String'],method?: Scalars['String'],region?: Scalars['String'],seller?: Scalars['String'],seller_method_details?: (Scalars['String'] | null)}


/** columns and relationships of "messages" */
export interface messagesGenqlSelection{
    from?: boolean | number
    id?: boolean | number
    message?: boolean | number
    p2p_id?: boolean | number
    /** An object relationship */
    p2p_offer?: p2p_offersGenqlSelection
    /** An object relationship */
    regAccountByTo?: reg_accountsGenqlSelection
    /** An object relationship */
    reg_account?: reg_accountsGenqlSelection
    support_id?: boolean | number
    timestamp?: boolean | number
    to?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "messages" */
export interface messages_aggregateGenqlSelection{
    aggregate?: messages_aggregate_fieldsGenqlSelection
    nodes?: messagesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface messages_aggregate_bool_exp {count?: (messages_aggregate_bool_exp_count | null)}

export interface messages_aggregate_bool_exp_count {arguments?: (messages_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (messages_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "messages" */
export interface messages_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (messages_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: messages_max_fieldsGenqlSelection
    min?: messages_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "messages" */
export interface messages_aggregate_order_by {count?: (order_by | null),max?: (messages_max_order_by | null),min?: (messages_min_order_by | null)}


/** input type for inserting array relation for remote table "messages" */
export interface messages_arr_rel_insert_input {data?: messages_insert_input[],
/** upsert condition */
on_conflict?: (messages_on_conflict | null)}


/** Boolean expression to filter rows from the table "messages". All fields are combined with a logical 'AND'. */
export interface messages_bool_exp {_and?: (messages_bool_exp[] | null),_not?: (messages_bool_exp | null),_or?: (messages_bool_exp[] | null),from?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),message?: (String_comparison_exp | null),p2p_id?: (uuid_comparison_exp | null),p2p_offer?: (p2p_offers_bool_exp | null),regAccountByTo?: (reg_accounts_bool_exp | null),reg_account?: (reg_accounts_bool_exp | null),support_id?: (uuid_comparison_exp | null),timestamp?: (timestamptz_comparison_exp | null),to?: (String_comparison_exp | null)}


/** input type for inserting data into table "messages" */
export interface messages_insert_input {from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),message?: (Scalars['String'] | null),p2p_id?: (Scalars['uuid'] | null),p2p_offer?: (p2p_offers_obj_rel_insert_input | null),regAccountByTo?: (reg_accounts_obj_rel_insert_input | null),reg_account?: (reg_accounts_obj_rel_insert_input | null),support_id?: (Scalars['uuid'] | null),timestamp?: (Scalars['timestamptz'] | null),to?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface messages_max_fieldsGenqlSelection{
    from?: boolean | number
    id?: boolean | number
    message?: boolean | number
    p2p_id?: boolean | number
    support_id?: boolean | number
    timestamp?: boolean | number
    to?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "messages" */
export interface messages_max_order_by {from?: (order_by | null),id?: (order_by | null),message?: (order_by | null),p2p_id?: (order_by | null),support_id?: (order_by | null),timestamp?: (order_by | null),to?: (order_by | null)}


/** aggregate min on columns */
export interface messages_min_fieldsGenqlSelection{
    from?: boolean | number
    id?: boolean | number
    message?: boolean | number
    p2p_id?: boolean | number
    support_id?: boolean | number
    timestamp?: boolean | number
    to?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "messages" */
export interface messages_min_order_by {from?: (order_by | null),id?: (order_by | null),message?: (order_by | null),p2p_id?: (order_by | null),support_id?: (order_by | null),timestamp?: (order_by | null),to?: (order_by | null)}


/** response of any mutation on the table "messages" */
export interface messages_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: messagesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "messages" */
export interface messages_on_conflict {constraint?: messages_constraint,update_columns?: messages_update_column[],where?: (messages_bool_exp | null)}


/** Ordering options when selecting data from "messages". */
export interface messages_order_by {from?: (order_by | null),id?: (order_by | null),message?: (order_by | null),p2p_id?: (order_by | null),p2p_offer?: (p2p_offers_order_by | null),regAccountByTo?: (reg_accounts_order_by | null),reg_account?: (reg_accounts_order_by | null),support_id?: (order_by | null),timestamp?: (order_by | null),to?: (order_by | null)}


/** primary key columns input for table: messages */
export interface messages_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "messages" */
export interface messages_set_input {from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),message?: (Scalars['String'] | null),p2p_id?: (Scalars['uuid'] | null),support_id?: (Scalars['uuid'] | null),timestamp?: (Scalars['timestamptz'] | null),to?: (Scalars['String'] | null)}


/** Streaming cursor of the table "messages" */
export interface messages_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: messages_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface messages_stream_cursor_value_input {from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),message?: (Scalars['String'] | null),p2p_id?: (Scalars['uuid'] | null),support_id?: (Scalars['uuid'] | null),timestamp?: (Scalars['timestamptz'] | null),to?: (Scalars['String'] | null)}

export interface messages_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (messages_set_input | null),
/** filter the rows which have to be updated */
where?: messages_bool_exp}


/** columns and relationships of "migrate_device" */
export interface migrate_deviceGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "migrate_device" */
export interface migrate_device_aggregateGenqlSelection{
    aggregate?: migrate_device_aggregate_fieldsGenqlSelection
    nodes?: migrate_deviceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "migrate_device" */
export interface migrate_device_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (migrate_device_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: migrate_device_max_fieldsGenqlSelection
    min?: migrate_device_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "migrate_device". All fields are combined with a logical 'AND'. */
export interface migrate_device_bool_exp {_and?: (migrate_device_bool_exp[] | null),_not?: (migrate_device_bool_exp | null),_or?: (migrate_device_bool_exp[] | null),account?: (String_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),cred_id?: (String_comparison_exp | null),device_name?: (String_comparison_exp | null),public_key?: (String_comparison_exp | null)}


/** input type for inserting data into table "migrate_device" */
export interface migrate_device_insert_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface migrate_device_max_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface migrate_device_min_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    public_key?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "migrate_device" */
export interface migrate_device_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: migrate_deviceGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "migrate_device" */
export interface migrate_device_on_conflict {constraint?: migrate_device_constraint,update_columns?: migrate_device_update_column[],where?: (migrate_device_bool_exp | null)}


/** Ordering options when selecting data from "migrate_device". */
export interface migrate_device_order_by {account?: (order_by | null),created_at?: (order_by | null),cred_id?: (order_by | null),device_name?: (order_by | null),public_key?: (order_by | null)}


/** primary key columns input for table: migrate_device */
export interface migrate_device_pk_columns_input {cred_id?: Scalars['String']}


/** input type for updating data in table "migrate_device" */
export interface migrate_device_set_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null)}


/** Streaming cursor of the table "migrate_device" */
export interface migrate_device_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: migrate_device_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface migrate_device_stream_cursor_value_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),public_key?: (Scalars['String'] | null)}

export interface migrate_device_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (migrate_device_set_input | null),
/** filter the rows which have to be updated */
where?: migrate_device_bool_exp}


/** mutation root */
export interface mutation_rootGenqlSelection{
    approve_new_account?: { __args: {request_id?: (Scalars['String'] | null)} } | boolean | number
    cancel_p2p_offer?: (p2p_offer_outputGenqlSelection & { __args?: {p2p_data?: (cancel_p2p_offer_input | null)} })
    confirm_p2p_payment?: (p2p_offer_outputGenqlSelection & { __args?: {p2p_data?: (confirm_p2p_offer_input | null)} })
    /** delete data from the table: "accounts_information" */
    delete_accounts_information?: (accounts_information_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: accounts_information_bool_exp} })
    /** delete single row from the table: "accounts_information" */
    delete_accounts_information_by_pk?: (accounts_informationGenqlSelection & { __args: {account: Scalars['String'], id: Scalars['uuid']} })
    /** delete data from the table: "devices" */
    delete_devices?: (devices_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: devices_bool_exp} })
    /** delete single row from the table: "devices" */
    delete_devices_by_pk?: (devicesGenqlSelection & { __args: {cred_id: Scalars['String']} })
    /** delete data from the table: "messages" */
    delete_messages?: (messages_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: messages_bool_exp} })
    /** delete single row from the table: "messages" */
    delete_messages_by_pk?: (messagesGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "migrate_device" */
    delete_migrate_device?: (migrate_device_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: migrate_device_bool_exp} })
    /** delete single row from the table: "migrate_device" */
    delete_migrate_device_by_pk?: (migrate_deviceGenqlSelection & { __args: {cred_id: Scalars['String']} })
    /** delete data from the table: "notifications" */
    delete_notifications?: (notifications_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: notifications_bool_exp} })
    /** delete single row from the table: "notifications" */
    delete_notifications_by_pk?: (notificationsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "p2p_offers" */
    delete_p2p_offers?: (p2p_offers_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: p2p_offers_bool_exp} })
    /** delete single row from the table: "p2p_offers" */
    delete_p2p_offers_by_pk?: (p2p_offersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "preferences" */
    delete_preferences?: (preferences_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: preferences_bool_exp} })
    /** delete single row from the table: "preferences" */
    delete_preferences_by_pk?: (preferencesGenqlSelection & { __args: {account: Scalars['String']} })
    /** delete data from the table: "reg_accounts" */
    delete_reg_accounts?: (reg_accounts_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: reg_accounts_bool_exp} })
    /** delete single row from the table: "reg_accounts" */
    delete_reg_accounts_by_pk?: (reg_accountsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "signing_requests" */
    delete_signing_requests?: (signing_requests_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: signing_requests_bool_exp} })
    /** delete single row from the table: "signing_requests" */
    delete_signing_requests_by_pk?: (signing_requestsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "swap_assets" */
    delete_swap_assets?: (swap_assets_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: swap_assets_bool_exp} })
    /** delete single row from the table: "swap_assets" */
    delete_swap_assets_by_pk?: (swap_assetsGenqlSelection & { __args: {asset: Scalars['String'], chain: Scalars['String']} })
    /** delete data from the table: "swap_orders" */
    delete_swap_orders?: (swap_orders_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: swap_orders_bool_exp} })
    /** delete single row from the table: "swap_orders" */
    delete_swap_orders_by_pk?: (swap_ordersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** delete data from the table: "trust_network" */
    delete_trust_network?: (trust_network_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: trust_network_bool_exp} })
    /** delete single row from the table: "trust_network" */
    delete_trust_network_by_pk?: (trust_networkGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** delete data from the table: "trust_network_notification" */
    delete_trust_network_notification?: (trust_network_notification_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: trust_network_notification_bool_exp} })
    /** delete single row from the table: "trust_network_notification" */
    delete_trust_network_notification_by_pk?: (trust_network_notificationGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** delete data from the table: "trust_network_status" */
    delete_trust_network_status?: (trust_network_status_mutation_responseGenqlSelection & { __args: {
    /** filter the rows which have to be deleted */
    where: trust_network_status_bool_exp} })
    /** delete single row from the table: "trust_network_status" */
    delete_trust_network_status_by_pk?: (trust_network_statusGenqlSelection & { __args: {status: Scalars['String']} })
    /** insert data into the table: "accounts_information" */
    insert_accounts_information?: (accounts_information_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: accounts_information_insert_input[], 
    /** upsert condition */
    on_conflict?: (accounts_information_on_conflict | null)} })
    /** insert a single row into the table: "accounts_information" */
    insert_accounts_information_one?: (accounts_informationGenqlSelection & { __args: {
    /** the row to be inserted */
    object: accounts_information_insert_input, 
    /** upsert condition */
    on_conflict?: (accounts_information_on_conflict | null)} })
    /** insert data into the table: "devices" */
    insert_devices?: (devices_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: devices_insert_input[], 
    /** upsert condition */
    on_conflict?: (devices_on_conflict | null)} })
    /** insert a single row into the table: "devices" */
    insert_devices_one?: (devicesGenqlSelection & { __args: {
    /** the row to be inserted */
    object: devices_insert_input, 
    /** upsert condition */
    on_conflict?: (devices_on_conflict | null)} })
    /** insert data into the table: "messages" */
    insert_messages?: (messages_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: messages_insert_input[], 
    /** upsert condition */
    on_conflict?: (messages_on_conflict | null)} })
    /** insert a single row into the table: "messages" */
    insert_messages_one?: (messagesGenqlSelection & { __args: {
    /** the row to be inserted */
    object: messages_insert_input, 
    /** upsert condition */
    on_conflict?: (messages_on_conflict | null)} })
    /** insert data into the table: "migrate_device" */
    insert_migrate_device?: (migrate_device_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: migrate_device_insert_input[], 
    /** upsert condition */
    on_conflict?: (migrate_device_on_conflict | null)} })
    /** insert a single row into the table: "migrate_device" */
    insert_migrate_device_one?: (migrate_deviceGenqlSelection & { __args: {
    /** the row to be inserted */
    object: migrate_device_insert_input, 
    /** upsert condition */
    on_conflict?: (migrate_device_on_conflict | null)} })
    /** insert data into the table: "notifications" */
    insert_notifications?: (notifications_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: notifications_insert_input[], 
    /** upsert condition */
    on_conflict?: (notifications_on_conflict | null)} })
    /** insert a single row into the table: "notifications" */
    insert_notifications_one?: (notificationsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: notifications_insert_input, 
    /** upsert condition */
    on_conflict?: (notifications_on_conflict | null)} })
    /** insert data into the table: "p2p_offers" */
    insert_p2p_offers?: (p2p_offers_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: p2p_offers_insert_input[], 
    /** upsert condition */
    on_conflict?: (p2p_offers_on_conflict | null)} })
    /** insert a single row into the table: "p2p_offers" */
    insert_p2p_offers_one?: (p2p_offersGenqlSelection & { __args: {
    /** the row to be inserted */
    object: p2p_offers_insert_input, 
    /** upsert condition */
    on_conflict?: (p2p_offers_on_conflict | null)} })
    /** insert data into the table: "preferences" */
    insert_preferences?: (preferences_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: preferences_insert_input[], 
    /** upsert condition */
    on_conflict?: (preferences_on_conflict | null)} })
    /** insert a single row into the table: "preferences" */
    insert_preferences_one?: (preferencesGenqlSelection & { __args: {
    /** the row to be inserted */
    object: preferences_insert_input, 
    /** upsert condition */
    on_conflict?: (preferences_on_conflict | null)} })
    /** insert data into the table: "reg_accounts" */
    insert_reg_accounts?: (reg_accounts_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: reg_accounts_insert_input[], 
    /** upsert condition */
    on_conflict?: (reg_accounts_on_conflict | null)} })
    /** insert a single row into the table: "reg_accounts" */
    insert_reg_accounts_one?: (reg_accountsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: reg_accounts_insert_input, 
    /** upsert condition */
    on_conflict?: (reg_accounts_on_conflict | null)} })
    /** insert data into the table: "signing_requests" */
    insert_signing_requests?: (signing_requests_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: signing_requests_insert_input[], 
    /** upsert condition */
    on_conflict?: (signing_requests_on_conflict | null)} })
    /** insert a single row into the table: "signing_requests" */
    insert_signing_requests_one?: (signing_requestsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: signing_requests_insert_input, 
    /** upsert condition */
    on_conflict?: (signing_requests_on_conflict | null)} })
    /** insert data into the table: "swap_assets" */
    insert_swap_assets?: (swap_assets_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: swap_assets_insert_input[], 
    /** upsert condition */
    on_conflict?: (swap_assets_on_conflict | null)} })
    /** insert a single row into the table: "swap_assets" */
    insert_swap_assets_one?: (swap_assetsGenqlSelection & { __args: {
    /** the row to be inserted */
    object: swap_assets_insert_input, 
    /** upsert condition */
    on_conflict?: (swap_assets_on_conflict | null)} })
    /** insert data into the table: "swap_orders" */
    insert_swap_orders?: (swap_orders_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: swap_orders_insert_input[], 
    /** upsert condition */
    on_conflict?: (swap_orders_on_conflict | null)} })
    /** insert a single row into the table: "swap_orders" */
    insert_swap_orders_one?: (swap_ordersGenqlSelection & { __args: {
    /** the row to be inserted */
    object: swap_orders_insert_input, 
    /** upsert condition */
    on_conflict?: (swap_orders_on_conflict | null)} })
    /** insert data into the table: "trust_network" */
    insert_trust_network?: (trust_network_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: trust_network_insert_input[], 
    /** upsert condition */
    on_conflict?: (trust_network_on_conflict | null)} })
    /** insert data into the table: "trust_network_notification" */
    insert_trust_network_notification?: (trust_network_notification_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: trust_network_notification_insert_input[], 
    /** upsert condition */
    on_conflict?: (trust_network_notification_on_conflict | null)} })
    /** insert a single row into the table: "trust_network_notification" */
    insert_trust_network_notification_one?: (trust_network_notificationGenqlSelection & { __args: {
    /** the row to be inserted */
    object: trust_network_notification_insert_input, 
    /** upsert condition */
    on_conflict?: (trust_network_notification_on_conflict | null)} })
    /** insert a single row into the table: "trust_network" */
    insert_trust_network_one?: (trust_networkGenqlSelection & { __args: {
    /** the row to be inserted */
    object: trust_network_insert_input, 
    /** upsert condition */
    on_conflict?: (trust_network_on_conflict | null)} })
    /** insert data into the table: "trust_network_status" */
    insert_trust_network_status?: (trust_network_status_mutation_responseGenqlSelection & { __args: {
    /** the rows to be inserted */
    objects: trust_network_status_insert_input[], 
    /** upsert condition */
    on_conflict?: (trust_network_status_on_conflict | null)} })
    /** insert a single row into the table: "trust_network_status" */
    insert_trust_network_status_one?: (trust_network_statusGenqlSelection & { __args: {
    /** the row to be inserted */
    object: trust_network_status_insert_input, 
    /** upsert condition */
    on_conflict?: (trust_network_status_on_conflict | null)} })
    make_p2p_buy_offer?: (p2p_offer_outputGenqlSelection & { __args?: {offer?: (make_p2p_buy_offer_input | null)} })
    make_p2p_sell_offer?: (p2p_offer_outputGenqlSelection & { __args?: {offer?: (make_p2p_sell_offer_input | null)} })
    reject_new_account?: { __args: {request_id?: (Scalars['String'] | null)} } | boolean | number
    request_new_account?: (request_new_account_outputGenqlSelection & { __args?: {account_data?: (request_new_account_input | null)} })
    toggle_trust_network?: (toggle_trust_network_outputGenqlSelection & { __args?: {input?: (toggle_trust_network_input | null)} })
    /** update data of the table: "accounts_information" */
    update_accounts_information?: (accounts_information_mutation_responseGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (accounts_information_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (accounts_information_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (accounts_information_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (accounts_information_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (accounts_information_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (accounts_information_set_input | null), 
    /** filter the rows which have to be updated */
    where: accounts_information_bool_exp} })
    /** update single row of the table: "accounts_information" */
    update_accounts_information_by_pk?: (accounts_informationGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (accounts_information_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (accounts_information_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (accounts_information_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (accounts_information_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (accounts_information_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (accounts_information_set_input | null), pk_columns: accounts_information_pk_columns_input} })
    /** update multiples rows of table: "accounts_information" */
    update_accounts_information_many?: (accounts_information_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: accounts_information_updates[]} })
    /** update data of the table: "devices" */
    update_devices?: (devices_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (devices_set_input | null), 
    /** filter the rows which have to be updated */
    where: devices_bool_exp} })
    /** update single row of the table: "devices" */
    update_devices_by_pk?: (devicesGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (devices_set_input | null), pk_columns: devices_pk_columns_input} })
    /** update multiples rows of table: "devices" */
    update_devices_many?: (devices_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: devices_updates[]} })
    /** update data of the table: "messages" */
    update_messages?: (messages_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (messages_set_input | null), 
    /** filter the rows which have to be updated */
    where: messages_bool_exp} })
    /** update single row of the table: "messages" */
    update_messages_by_pk?: (messagesGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (messages_set_input | null), pk_columns: messages_pk_columns_input} })
    /** update multiples rows of table: "messages" */
    update_messages_many?: (messages_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: messages_updates[]} })
    /** update data of the table: "migrate_device" */
    update_migrate_device?: (migrate_device_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (migrate_device_set_input | null), 
    /** filter the rows which have to be updated */
    where: migrate_device_bool_exp} })
    /** update single row of the table: "migrate_device" */
    update_migrate_device_by_pk?: (migrate_deviceGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (migrate_device_set_input | null), pk_columns: migrate_device_pk_columns_input} })
    /** update multiples rows of table: "migrate_device" */
    update_migrate_device_many?: (migrate_device_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: migrate_device_updates[]} })
    /** update data of the table: "notifications" */
    update_notifications?: (notifications_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (notifications_set_input | null), 
    /** filter the rows which have to be updated */
    where: notifications_bool_exp} })
    /** update single row of the table: "notifications" */
    update_notifications_by_pk?: (notificationsGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (notifications_set_input | null), pk_columns: notifications_pk_columns_input} })
    /** update multiples rows of table: "notifications" */
    update_notifications_many?: (notifications_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: notifications_updates[]} })
    /** update data of the table: "p2p_offers" */
    update_p2p_offers?: (p2p_offers_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (p2p_offers_set_input | null), 
    /** filter the rows which have to be updated */
    where: p2p_offers_bool_exp} })
    /** update single row of the table: "p2p_offers" */
    update_p2p_offers_by_pk?: (p2p_offersGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (p2p_offers_set_input | null), pk_columns: p2p_offers_pk_columns_input} })
    /** update multiples rows of table: "p2p_offers" */
    update_p2p_offers_many?: (p2p_offers_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: p2p_offers_updates[]} })
    /** update data of the table: "preferences" */
    update_preferences?: (preferences_mutation_responseGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (preferences_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (preferences_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (preferences_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (preferences_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (preferences_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (preferences_set_input | null), 
    /** filter the rows which have to be updated */
    where: preferences_bool_exp} })
    /** update single row of the table: "preferences" */
    update_preferences_by_pk?: (preferencesGenqlSelection & { __args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: (preferences_append_input | null), 
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: (preferences_delete_at_path_input | null), 
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: (preferences_delete_elem_input | null), 
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: (preferences_delete_key_input | null), 
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: (preferences_prepend_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (preferences_set_input | null), pk_columns: preferences_pk_columns_input} })
    /** update multiples rows of table: "preferences" */
    update_preferences_many?: (preferences_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: preferences_updates[]} })
    /** update data of the table: "reg_accounts" */
    update_reg_accounts?: (reg_accounts_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (reg_accounts_set_input | null), 
    /** filter the rows which have to be updated */
    where: reg_accounts_bool_exp} })
    /** update single row of the table: "reg_accounts" */
    update_reg_accounts_by_pk?: (reg_accountsGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (reg_accounts_set_input | null), pk_columns: reg_accounts_pk_columns_input} })
    /** update multiples rows of table: "reg_accounts" */
    update_reg_accounts_many?: (reg_accounts_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: reg_accounts_updates[]} })
    /** update data of the table: "signing_requests" */
    update_signing_requests?: (signing_requests_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (signing_requests_set_input | null), 
    /** filter the rows which have to be updated */
    where: signing_requests_bool_exp} })
    /** update single row of the table: "signing_requests" */
    update_signing_requests_by_pk?: (signing_requestsGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (signing_requests_set_input | null), pk_columns: signing_requests_pk_columns_input} })
    /** update multiples rows of table: "signing_requests" */
    update_signing_requests_many?: (signing_requests_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: signing_requests_updates[]} })
    /** update data of the table: "swap_assets" */
    update_swap_assets?: (swap_assets_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (swap_assets_set_input | null), 
    /** filter the rows which have to be updated */
    where: swap_assets_bool_exp} })
    /** update single row of the table: "swap_assets" */
    update_swap_assets_by_pk?: (swap_assetsGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (swap_assets_set_input | null), pk_columns: swap_assets_pk_columns_input} })
    /** update multiples rows of table: "swap_assets" */
    update_swap_assets_many?: (swap_assets_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: swap_assets_updates[]} })
    /** update data of the table: "swap_orders" */
    update_swap_orders?: (swap_orders_mutation_responseGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (swap_orders_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (swap_orders_set_input | null), 
    /** filter the rows which have to be updated */
    where: swap_orders_bool_exp} })
    /** update single row of the table: "swap_orders" */
    update_swap_orders_by_pk?: (swap_ordersGenqlSelection & { __args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: (swap_orders_inc_input | null), 
    /** sets the columns of the filtered rows to the given values */
    _set?: (swap_orders_set_input | null), pk_columns: swap_orders_pk_columns_input} })
    /** update multiples rows of table: "swap_orders" */
    update_swap_orders_many?: (swap_orders_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: swap_orders_updates[]} })
    /** update data of the table: "trust_network" */
    update_trust_network?: (trust_network_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_set_input | null), 
    /** filter the rows which have to be updated */
    where: trust_network_bool_exp} })
    /** update single row of the table: "trust_network" */
    update_trust_network_by_pk?: (trust_networkGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_set_input | null), pk_columns: trust_network_pk_columns_input} })
    /** update multiples rows of table: "trust_network" */
    update_trust_network_many?: (trust_network_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: trust_network_updates[]} })
    /** update data of the table: "trust_network_notification" */
    update_trust_network_notification?: (trust_network_notification_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_notification_set_input | null), 
    /** filter the rows which have to be updated */
    where: trust_network_notification_bool_exp} })
    /** update single row of the table: "trust_network_notification" */
    update_trust_network_notification_by_pk?: (trust_network_notificationGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_notification_set_input | null), pk_columns: trust_network_notification_pk_columns_input} })
    /** update multiples rows of table: "trust_network_notification" */
    update_trust_network_notification_many?: (trust_network_notification_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: trust_network_notification_updates[]} })
    /** update data of the table: "trust_network_status" */
    update_trust_network_status?: (trust_network_status_mutation_responseGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_status_set_input | null), 
    /** filter the rows which have to be updated */
    where: trust_network_status_bool_exp} })
    /** update single row of the table: "trust_network_status" */
    update_trust_network_status_by_pk?: (trust_network_statusGenqlSelection & { __args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: (trust_network_status_set_input | null), pk_columns: trust_network_status_pk_columns_input} })
    /** update multiples rows of table: "trust_network_status" */
    update_trust_network_status_many?: (trust_network_status_mutation_responseGenqlSelection & { __args: {
    /** updates to execute, in order */
    updates: trust_network_status_updates[]} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "notifications" */
export interface notificationsGenqlSelection{
    content_id?: boolean | number
    created_at?: boolean | number
    from?: boolean | number
    id?: boolean | number
    read?: boolean | number
    /** An object relationship */
    reg_account_by_from?: reg_accountsGenqlSelection
    /** An object relationship */
    reg_account_by_to?: reg_accountsGenqlSelection
    to?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "notifications" */
export interface notifications_aggregateGenqlSelection{
    aggregate?: notifications_aggregate_fieldsGenqlSelection
    nodes?: notificationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface notifications_aggregate_bool_exp {bool_and?: (notifications_aggregate_bool_exp_bool_and | null),bool_or?: (notifications_aggregate_bool_exp_bool_or | null),count?: (notifications_aggregate_bool_exp_count | null)}

export interface notifications_aggregate_bool_exp_bool_and {arguments?: notifications_select_column_notifications_aggregate_bool_exp_bool_and_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (notifications_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface notifications_aggregate_bool_exp_bool_or {arguments?: notifications_select_column_notifications_aggregate_bool_exp_bool_or_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (notifications_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface notifications_aggregate_bool_exp_count {arguments?: (notifications_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (notifications_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "notifications" */
export interface notifications_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (notifications_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: notifications_max_fieldsGenqlSelection
    min?: notifications_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "notifications" */
export interface notifications_aggregate_order_by {count?: (order_by | null),max?: (notifications_max_order_by | null),min?: (notifications_min_order_by | null)}


/** input type for inserting array relation for remote table "notifications" */
export interface notifications_arr_rel_insert_input {data?: notifications_insert_input[],
/** upsert condition */
on_conflict?: (notifications_on_conflict | null)}


/** Boolean expression to filter rows from the table "notifications". All fields are combined with a logical 'AND'. */
export interface notifications_bool_exp {_and?: (notifications_bool_exp[] | null),_not?: (notifications_bool_exp | null),_or?: (notifications_bool_exp[] | null),content_id?: (uuid_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),from?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),read?: (Boolean_comparison_exp | null),reg_account_by_from?: (reg_accounts_bool_exp | null),reg_account_by_to?: (reg_accounts_bool_exp | null),to?: (String_comparison_exp | null),type?: (String_comparison_exp | null)}


/** input type for inserting data into table "notifications" */
export interface notifications_insert_input {content_id?: (Scalars['uuid'] | null),created_at?: (Scalars['timestamptz'] | null),from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),read?: (Scalars['Boolean'] | null),reg_account_by_from?: (reg_accounts_obj_rel_insert_input | null),reg_account_by_to?: (reg_accounts_obj_rel_insert_input | null),to?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface notifications_max_fieldsGenqlSelection{
    content_id?: boolean | number
    created_at?: boolean | number
    from?: boolean | number
    id?: boolean | number
    to?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "notifications" */
export interface notifications_max_order_by {content_id?: (order_by | null),created_at?: (order_by | null),from?: (order_by | null),id?: (order_by | null),to?: (order_by | null),type?: (order_by | null)}


/** aggregate min on columns */
export interface notifications_min_fieldsGenqlSelection{
    content_id?: boolean | number
    created_at?: boolean | number
    from?: boolean | number
    id?: boolean | number
    to?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "notifications" */
export interface notifications_min_order_by {content_id?: (order_by | null),created_at?: (order_by | null),from?: (order_by | null),id?: (order_by | null),to?: (order_by | null),type?: (order_by | null)}


/** response of any mutation on the table "notifications" */
export interface notifications_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: notificationsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "notifications" */
export interface notifications_on_conflict {constraint?: notifications_constraint,update_columns?: notifications_update_column[],where?: (notifications_bool_exp | null)}


/** Ordering options when selecting data from "notifications". */
export interface notifications_order_by {content_id?: (order_by | null),created_at?: (order_by | null),from?: (order_by | null),id?: (order_by | null),read?: (order_by | null),reg_account_by_from?: (reg_accounts_order_by | null),reg_account_by_to?: (reg_accounts_order_by | null),to?: (order_by | null),type?: (order_by | null)}


/** primary key columns input for table: notifications */
export interface notifications_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "notifications" */
export interface notifications_set_input {content_id?: (Scalars['uuid'] | null),created_at?: (Scalars['timestamptz'] | null),from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),read?: (Scalars['Boolean'] | null),to?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}


/** Streaming cursor of the table "notifications" */
export interface notifications_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: notifications_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface notifications_stream_cursor_value_input {content_id?: (Scalars['uuid'] | null),created_at?: (Scalars['timestamptz'] | null),from?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),read?: (Scalars['Boolean'] | null),to?: (Scalars['String'] | null),type?: (Scalars['String'] | null)}

export interface notifications_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (notifications_set_input | null),
/** filter the rows which have to be updated */
where?: notifications_bool_exp}

export interface p2p_offer_outputGenqlSelection{
    amount?: boolean | number
    masterbotsbank_id?: boolean | number
    buyer?: boolean | number
    buyer_confirmed_payment?: boolean | number
    buyer_method_details?: boolean | number
    cancelled?: boolean | number
    cancelled_by?: boolean | number
    completed?: boolean | number
    created_at?: boolean | number
    id?: boolean | number
    initiator?: boolean | number
    matched?: boolean | number
    method?: boolean | number
    region?: boolean | number
    seller?: boolean | number
    seller_confirmed_payment?: boolean | number
    seller_method_details?: boolean | number
    type?: boolean | number
    updated_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "p2p_offers" */
export interface p2p_offersGenqlSelection{
    amount?: boolean | number
    masterbotsbank_id?: boolean | number
    buyer?: boolean | number
    buyer_confirmed_payment?: boolean | number
    buyer_method_details?: boolean | number
    cancelled?: boolean | number
    cancelled_by?: boolean | number
    completed?: boolean | number
    created_at?: boolean | number
    id?: boolean | number
    initiator?: boolean | number
    matched?: boolean | number
    /** An array relationship */
    messages?: (messagesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An aggregate relationship */
    messages_aggregate?: (messages_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    method?: boolean | number
    /** An object relationship */
    reg_account_by_buyer?: reg_accountsGenqlSelection
    /** An object relationship */
    reg_account_by_initiator?: reg_accountsGenqlSelection
    /** An object relationship */
    reg_account_by_seller?: reg_accountsGenqlSelection
    region?: boolean | number
    seller?: boolean | number
    seller_confirmed_payment?: boolean | number
    seller_method_details?: boolean | number
    type?: boolean | number
    updated_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "p2p_offers" */
export interface p2p_offers_aggregateGenqlSelection{
    aggregate?: p2p_offers_aggregate_fieldsGenqlSelection
    nodes?: p2p_offersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface p2p_offers_aggregate_bool_exp {bool_and?: (p2p_offers_aggregate_bool_exp_bool_and | null),bool_or?: (p2p_offers_aggregate_bool_exp_bool_or | null),count?: (p2p_offers_aggregate_bool_exp_count | null)}

export interface p2p_offers_aggregate_bool_exp_bool_and {arguments?: p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_and_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (p2p_offers_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface p2p_offers_aggregate_bool_exp_bool_or {arguments?: p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_or_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (p2p_offers_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface p2p_offers_aggregate_bool_exp_count {arguments?: (p2p_offers_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (p2p_offers_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "p2p_offers" */
export interface p2p_offers_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (p2p_offers_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: p2p_offers_max_fieldsGenqlSelection
    min?: p2p_offers_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "p2p_offers" */
export interface p2p_offers_aggregate_order_by {count?: (order_by | null),max?: (p2p_offers_max_order_by | null),min?: (p2p_offers_min_order_by | null)}


/** input type for inserting array relation for remote table "p2p_offers" */
export interface p2p_offers_arr_rel_insert_input {data?: p2p_offers_insert_input[],
/** upsert condition */
on_conflict?: (p2p_offers_on_conflict | null)}


/** Boolean expression to filter rows from the table "p2p_offers". All fields are combined with a logical 'AND'. */
export interface p2p_offers_bool_exp {_and?: (p2p_offers_bool_exp[] | null),_not?: (p2p_offers_bool_exp | null),_or?: (p2p_offers_bool_exp[] | null),amount?: (String_comparison_exp | null),masterbotsbank_id?: (String_comparison_exp | null),buyer?: (String_comparison_exp | null),buyer_confirmed_payment?: (Boolean_comparison_exp | null),buyer_method_details?: (String_comparison_exp | null),cancelled?: (Boolean_comparison_exp | null),cancelled_by?: (String_comparison_exp | null),completed?: (Boolean_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),id?: (uuid_comparison_exp | null),initiator?: (String_comparison_exp | null),matched?: (Boolean_comparison_exp | null),messages?: (messages_bool_exp | null),messages_aggregate?: (messages_aggregate_bool_exp | null),method?: (String_comparison_exp | null),reg_account_by_buyer?: (reg_accounts_bool_exp | null),reg_account_by_initiator?: (reg_accounts_bool_exp | null),reg_account_by_seller?: (reg_accounts_bool_exp | null),region?: (String_comparison_exp | null),seller?: (String_comparison_exp | null),seller_confirmed_payment?: (Boolean_comparison_exp | null),seller_method_details?: (String_comparison_exp | null),type?: (String_comparison_exp | null),updated_at?: (timestamptz_comparison_exp | null)}


/** input type for inserting data into table "p2p_offers" */
export interface p2p_offers_insert_input {amount?: (Scalars['String'] | null),masterbotsbank_id?: (Scalars['String'] | null),buyer?: (Scalars['String'] | null),buyer_confirmed_payment?: (Scalars['Boolean'] | null),buyer_method_details?: (Scalars['String'] | null),cancelled?: (Scalars['Boolean'] | null),cancelled_by?: (Scalars['String'] | null),completed?: (Scalars['Boolean'] | null),created_at?: (Scalars['timestamptz'] | null),id?: (Scalars['uuid'] | null),initiator?: (Scalars['String'] | null),matched?: (Scalars['Boolean'] | null),messages?: (messages_arr_rel_insert_input | null),method?: (Scalars['String'] | null),reg_account_by_buyer?: (reg_accounts_obj_rel_insert_input | null),reg_account_by_initiator?: (reg_accounts_obj_rel_insert_input | null),reg_account_by_seller?: (reg_accounts_obj_rel_insert_input | null),region?: (Scalars['String'] | null),seller?: (Scalars['String'] | null),seller_confirmed_payment?: (Scalars['Boolean'] | null),seller_method_details?: (Scalars['String'] | null),type?: (Scalars['String'] | null),updated_at?: (Scalars['timestamptz'] | null)}


/** aggregate max on columns */
export interface p2p_offers_max_fieldsGenqlSelection{
    amount?: boolean | number
    masterbotsbank_id?: boolean | number
    buyer?: boolean | number
    buyer_method_details?: boolean | number
    cancelled_by?: boolean | number
    created_at?: boolean | number
    id?: boolean | number
    initiator?: boolean | number
    method?: boolean | number
    region?: boolean | number
    seller?: boolean | number
    seller_method_details?: boolean | number
    type?: boolean | number
    updated_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "p2p_offers" */
export interface p2p_offers_max_order_by {amount?: (order_by | null),masterbotsbank_id?: (order_by | null),buyer?: (order_by | null),buyer_method_details?: (order_by | null),cancelled_by?: (order_by | null),created_at?: (order_by | null),id?: (order_by | null),initiator?: (order_by | null),method?: (order_by | null),region?: (order_by | null),seller?: (order_by | null),seller_method_details?: (order_by | null),type?: (order_by | null),updated_at?: (order_by | null)}


/** aggregate min on columns */
export interface p2p_offers_min_fieldsGenqlSelection{
    amount?: boolean | number
    masterbotsbank_id?: boolean | number
    buyer?: boolean | number
    buyer_method_details?: boolean | number
    cancelled_by?: boolean | number
    created_at?: boolean | number
    id?: boolean | number
    initiator?: boolean | number
    method?: boolean | number
    region?: boolean | number
    seller?: boolean | number
    seller_method_details?: boolean | number
    type?: boolean | number
    updated_at?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "p2p_offers" */
export interface p2p_offers_min_order_by {amount?: (order_by | null),masterbotsbank_id?: (order_by | null),buyer?: (order_by | null),buyer_method_details?: (order_by | null),cancelled_by?: (order_by | null),created_at?: (order_by | null),id?: (order_by | null),initiator?: (order_by | null),method?: (order_by | null),region?: (order_by | null),seller?: (order_by | null),seller_method_details?: (order_by | null),type?: (order_by | null),updated_at?: (order_by | null)}


/** response of any mutation on the table "p2p_offers" */
export interface p2p_offers_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: p2p_offersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "p2p_offers" */
export interface p2p_offers_obj_rel_insert_input {data?: p2p_offers_insert_input,
/** upsert condition */
on_conflict?: (p2p_offers_on_conflict | null)}


/** on_conflict condition type for table "p2p_offers" */
export interface p2p_offers_on_conflict {constraint?: p2p_offers_constraint,update_columns?: p2p_offers_update_column[],where?: (p2p_offers_bool_exp | null)}


/** Ordering options when selecting data from "p2p_offers". */
export interface p2p_offers_order_by {amount?: (order_by | null),masterbotsbank_id?: (order_by | null),buyer?: (order_by | null),buyer_confirmed_payment?: (order_by | null),buyer_method_details?: (order_by | null),cancelled?: (order_by | null),cancelled_by?: (order_by | null),completed?: (order_by | null),created_at?: (order_by | null),id?: (order_by | null),initiator?: (order_by | null),matched?: (order_by | null),messages_aggregate?: (messages_aggregate_order_by | null),method?: (order_by | null),reg_account_by_buyer?: (reg_accounts_order_by | null),reg_account_by_initiator?: (reg_accounts_order_by | null),reg_account_by_seller?: (reg_accounts_order_by | null),region?: (order_by | null),seller?: (order_by | null),seller_confirmed_payment?: (order_by | null),seller_method_details?: (order_by | null),type?: (order_by | null),updated_at?: (order_by | null)}


/** primary key columns input for table: p2p_offers */
export interface p2p_offers_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "p2p_offers" */
export interface p2p_offers_set_input {amount?: (Scalars['String'] | null),masterbotsbank_id?: (Scalars['String'] | null),buyer?: (Scalars['String'] | null),buyer_confirmed_payment?: (Scalars['Boolean'] | null),buyer_method_details?: (Scalars['String'] | null),cancelled?: (Scalars['Boolean'] | null),cancelled_by?: (Scalars['String'] | null),completed?: (Scalars['Boolean'] | null),created_at?: (Scalars['timestamptz'] | null),id?: (Scalars['uuid'] | null),initiator?: (Scalars['String'] | null),matched?: (Scalars['Boolean'] | null),method?: (Scalars['String'] | null),region?: (Scalars['String'] | null),seller?: (Scalars['String'] | null),seller_confirmed_payment?: (Scalars['Boolean'] | null),seller_method_details?: (Scalars['String'] | null),type?: (Scalars['String'] | null),updated_at?: (Scalars['timestamptz'] | null)}


/** Streaming cursor of the table "p2p_offers" */
export interface p2p_offers_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: p2p_offers_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface p2p_offers_stream_cursor_value_input {amount?: (Scalars['String'] | null),masterbotsbank_id?: (Scalars['String'] | null),buyer?: (Scalars['String'] | null),buyer_confirmed_payment?: (Scalars['Boolean'] | null),buyer_method_details?: (Scalars['String'] | null),cancelled?: (Scalars['Boolean'] | null),cancelled_by?: (Scalars['String'] | null),completed?: (Scalars['Boolean'] | null),created_at?: (Scalars['timestamptz'] | null),id?: (Scalars['uuid'] | null),initiator?: (Scalars['String'] | null),matched?: (Scalars['Boolean'] | null),method?: (Scalars['String'] | null),region?: (Scalars['String'] | null),seller?: (Scalars['String'] | null),seller_confirmed_payment?: (Scalars['Boolean'] | null),seller_method_details?: (Scalars['String'] | null),type?: (Scalars['String'] | null),updated_at?: (Scalars['timestamptz'] | null)}

export interface p2p_offers_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (p2p_offers_set_input | null),
/** filter the rows which have to be updated */
where?: p2p_offers_bool_exp}


/** columns and relationships of "preferences" */
export interface preferencesGenqlSelection{
    account?: boolean | number
    currency?: boolean | number
    language?: boolean | number
    notifications?: boolean | number
    personalized?: boolean | number
    region?: boolean | number
    secondary_currency?: { __args: {
    /** JSON select path */
    path?: (Scalars['String'] | null)} } | boolean | number
    theme?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "preferences" */
export interface preferences_aggregateGenqlSelection{
    aggregate?: preferences_aggregate_fieldsGenqlSelection
    nodes?: preferencesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "preferences" */
export interface preferences_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (preferences_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: preferences_max_fieldsGenqlSelection
    min?: preferences_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** append existing jsonb value of filtered columns with new jsonb value */
export interface preferences_append_input {secondary_currency?: (Scalars['jsonb'] | null)}


/** Boolean expression to filter rows from the table "preferences". All fields are combined with a logical 'AND'. */
export interface preferences_bool_exp {_and?: (preferences_bool_exp[] | null),_not?: (preferences_bool_exp | null),_or?: (preferences_bool_exp[] | null),account?: (String_comparison_exp | null),currency?: (String_comparison_exp | null),language?: (String_comparison_exp | null),notifications?: (Boolean_comparison_exp | null),personalized?: (Boolean_comparison_exp | null),region?: (String_comparison_exp | null),secondary_currency?: (jsonb_comparison_exp | null),theme?: (String_comparison_exp | null)}


/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export interface preferences_delete_at_path_input {secondary_currency?: (Scalars['String'][] | null)}


/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export interface preferences_delete_elem_input {secondary_currency?: (Scalars['Int'] | null)}


/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export interface preferences_delete_key_input {secondary_currency?: (Scalars['String'] | null)}


/** input type for inserting data into table "preferences" */
export interface preferences_insert_input {account?: (Scalars['String'] | null),currency?: (Scalars['String'] | null),language?: (Scalars['String'] | null),notifications?: (Scalars['Boolean'] | null),personalized?: (Scalars['Boolean'] | null),region?: (Scalars['String'] | null),secondary_currency?: (Scalars['jsonb'] | null),theme?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface preferences_max_fieldsGenqlSelection{
    account?: boolean | number
    currency?: boolean | number
    language?: boolean | number
    region?: boolean | number
    theme?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface preferences_min_fieldsGenqlSelection{
    account?: boolean | number
    currency?: boolean | number
    language?: boolean | number
    region?: boolean | number
    theme?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "preferences" */
export interface preferences_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: preferencesGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "preferences" */
export interface preferences_on_conflict {constraint?: preferences_constraint,update_columns?: preferences_update_column[],where?: (preferences_bool_exp | null)}


/** Ordering options when selecting data from "preferences". */
export interface preferences_order_by {account?: (order_by | null),currency?: (order_by | null),language?: (order_by | null),notifications?: (order_by | null),personalized?: (order_by | null),region?: (order_by | null),secondary_currency?: (order_by | null),theme?: (order_by | null)}


/** primary key columns input for table: preferences */
export interface preferences_pk_columns_input {account?: Scalars['String']}


/** prepend existing jsonb value of filtered columns with new jsonb value */
export interface preferences_prepend_input {secondary_currency?: (Scalars['jsonb'] | null)}


/** input type for updating data in table "preferences" */
export interface preferences_set_input {account?: (Scalars['String'] | null),currency?: (Scalars['String'] | null),language?: (Scalars['String'] | null),notifications?: (Scalars['Boolean'] | null),personalized?: (Scalars['Boolean'] | null),region?: (Scalars['String'] | null),secondary_currency?: (Scalars['jsonb'] | null),theme?: (Scalars['String'] | null)}


/** Streaming cursor of the table "preferences" */
export interface preferences_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: preferences_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface preferences_stream_cursor_value_input {account?: (Scalars['String'] | null),currency?: (Scalars['String'] | null),language?: (Scalars['String'] | null),notifications?: (Scalars['Boolean'] | null),personalized?: (Scalars['Boolean'] | null),region?: (Scalars['String'] | null),secondary_currency?: (Scalars['jsonb'] | null),theme?: (Scalars['String'] | null)}

export interface preferences_updates {
/** append existing jsonb value of filtered columns with new jsonb value */
_append?: (preferences_append_input | null),
/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
_delete_at_path?: (preferences_delete_at_path_input | null),
/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
_delete_elem?: (preferences_delete_elem_input | null),
/** delete key/value pair or string element. key/value pairs are matched based on their key value */
_delete_key?: (preferences_delete_key_input | null),
/** prepend existing jsonb value of filtered columns with new jsonb value */
_prepend?: (preferences_prepend_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (preferences_set_input | null),
/** filter the rows which have to be updated */
where?: preferences_bool_exp}

export interface query_rootGenqlSelection{
    /** fetch data from the table: "accounts_information" */
    accounts_information?: (accounts_informationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** fetch aggregated fields from the table: "accounts_information" */
    accounts_information_aggregate?: (accounts_information_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** fetch data from the table: "accounts_information" using primary key columns */
    accounts_information_by_pk?: (accounts_informationGenqlSelection & { __args: {account: Scalars['String'], id: Scalars['uuid']} })
    apollo_auth_health_check?: boolean | number
    apollo_health_check?: boolean | number
    /** An array relationship */
    devices?: (devicesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** An aggregate relationship */
    devices_aggregate?: (devices_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** fetch data from the table: "devices" using primary key columns */
    devices_by_pk?: (devicesGenqlSelection & { __args: {cred_id: Scalars['String']} })
    get_trust_network?: (trust_network_outputGenqlSelection & { __args?: {account?: (Scalars['String'] | null)} })
    /** An array relationship */
    messages?: (messagesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An aggregate relationship */
    messages_aggregate?: (messages_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** fetch data from the table: "messages" using primary key columns */
    messages_by_pk?: (messagesGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "migrate_device" */
    migrate_device?: (migrate_deviceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (migrate_device_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (migrate_device_order_by[] | null), 
    /** filter the rows returned */
    where?: (migrate_device_bool_exp | null)} })
    /** fetch aggregated fields from the table: "migrate_device" */
    migrate_device_aggregate?: (migrate_device_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (migrate_device_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (migrate_device_order_by[] | null), 
    /** filter the rows returned */
    where?: (migrate_device_bool_exp | null)} })
    /** fetch data from the table: "migrate_device" using primary key columns */
    migrate_device_by_pk?: (migrate_deviceGenqlSelection & { __args: {cred_id: Scalars['String']} })
    /** fetch data from the table: "notifications" */
    notifications?: (notificationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** fetch aggregated fields from the table: "notifications" */
    notifications_aggregate?: (notifications_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** fetch data from the table: "notifications" using primary key columns */
    notifications_by_pk?: (notificationsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "p2p_offers" */
    p2p_offers?: (p2p_offersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** fetch aggregated fields from the table: "p2p_offers" */
    p2p_offers_aggregate?: (p2p_offers_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** fetch data from the table: "p2p_offers" using primary key columns */
    p2p_offers_by_pk?: (p2p_offersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "preferences" */
    preferences?: (preferencesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (preferences_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (preferences_order_by[] | null), 
    /** filter the rows returned */
    where?: (preferences_bool_exp | null)} })
    /** fetch aggregated fields from the table: "preferences" */
    preferences_aggregate?: (preferences_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (preferences_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (preferences_order_by[] | null), 
    /** filter the rows returned */
    where?: (preferences_bool_exp | null)} })
    /** fetch data from the table: "preferences" using primary key columns */
    preferences_by_pk?: (preferencesGenqlSelection & { __args: {account: Scalars['String']} })
    /** fetch data from the table: "reg_accounts" */
    reg_accounts?: (reg_accountsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (reg_accounts_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (reg_accounts_order_by[] | null), 
    /** filter the rows returned */
    where?: (reg_accounts_bool_exp | null)} })
    /** fetch aggregated fields from the table: "reg_accounts" */
    reg_accounts_aggregate?: (reg_accounts_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (reg_accounts_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (reg_accounts_order_by[] | null), 
    /** filter the rows returned */
    where?: (reg_accounts_bool_exp | null)} })
    /** fetch data from the table: "reg_accounts" using primary key columns */
    reg_accounts_by_pk?: (reg_accountsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "signing_requests" */
    signing_requests?: (signing_requestsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (signing_requests_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (signing_requests_order_by[] | null), 
    /** filter the rows returned */
    where?: (signing_requests_bool_exp | null)} })
    /** fetch aggregated fields from the table: "signing_requests" */
    signing_requests_aggregate?: (signing_requests_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (signing_requests_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (signing_requests_order_by[] | null), 
    /** filter the rows returned */
    where?: (signing_requests_bool_exp | null)} })
    /** fetch data from the table: "signing_requests" using primary key columns */
    signing_requests_by_pk?: (signing_requestsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "swap_assets" */
    swap_assets?: (swap_assetsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_assets_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_assets_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_assets_bool_exp | null)} })
    /** fetch aggregated fields from the table: "swap_assets" */
    swap_assets_aggregate?: (swap_assets_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_assets_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_assets_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_assets_bool_exp | null)} })
    /** fetch data from the table: "swap_assets" using primary key columns */
    swap_assets_by_pk?: (swap_assetsGenqlSelection & { __args: {asset: Scalars['String'], chain: Scalars['String']} })
    /** An array relationship */
    swap_orders?: (swap_ordersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** An aggregate relationship */
    swap_orders_aggregate?: (swap_orders_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** fetch data from the table: "swap_orders" using primary key columns */
    swap_orders_by_pk?: (swap_ordersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table: "trust_network" */
    trust_network?: (trust_networkGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network" */
    trust_network_aggregate?: (trust_network_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** fetch data from the table: "trust_network" using primary key columns */
    trust_network_by_pk?: (trust_networkGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** fetch data from the table: "trust_network_notification" */
    trust_network_notification?: (trust_network_notificationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network_notification" */
    trust_network_notification_aggregate?: (trust_network_notification_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** fetch data from the table: "trust_network_notification" using primary key columns */
    trust_network_notification_by_pk?: (trust_network_notificationGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** fetch data from the table: "trust_network_status" */
    trust_network_status?: (trust_network_statusGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_status_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_status_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_status_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network_status" */
    trust_network_status_aggregate?: (trust_network_status_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_status_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_status_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_status_bool_exp | null)} })
    /** fetch data from the table: "trust_network_status" using primary key columns */
    trust_network_status_by_pk?: (trust_network_statusGenqlSelection & { __args: {status: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "reg_accounts" */
export interface reg_accountsGenqlSelection{
    account?: boolean | number
    /** An object relationship */
    accounts_information?: accounts_informationGenqlSelection
    create_account?: boolean | number
    created?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    /** An array relationship */
    devices?: (devicesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** An aggregate relationship */
    devices_aggregate?: (devices_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    id?: boolean | number
    /** An array relationship */
    messages_from?: (messagesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An aggregate relationship */
    messages_from_aggregate?: (messages_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An array relationship */
    messages_to?: (messagesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An aggregate relationship */
    messages_to_aggregate?: (messages_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An array relationship */
    notifications_from?: (notificationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** An aggregate relationship */
    notifications_from_aggregate?: (notifications_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** An array relationship */
    notifications_to?: (notificationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** An aggregate relationship */
    notifications_to_aggregate?: (notifications_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    onboarded?: boolean | number
    /** An array relationship */
    p2p_offers_buyer?: (p2p_offersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** An aggregate relationship */
    p2p_offers_buyer_aggregate?: (p2p_offers_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** An array relationship */
    p2p_offers_initiator?: (p2p_offersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** An aggregate relationship */
    p2p_offers_initiator_aggregate?: (p2p_offers_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** An array relationship */
    p2p_offers_seller?: (p2p_offersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** An aggregate relationship */
    p2p_offers_seller_aggregate?: (p2p_offers_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    public_key?: boolean | number
    referrer?: boolean | number
    /** An array relationship */
    reg_accounts_accounts_information?: (accounts_informationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** An aggregate relationship */
    reg_accounts_accounts_information_aggregate?: (accounts_information_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** An array relationship */
    swap_orders?: (swap_ordersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** An aggregate relationship */
    swap_orders_aggregate?: (swap_orders_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** An array relationship */
    trustNetworkNotificationsByTrust?: (trust_network_notificationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** An aggregate relationship */
    trustNetworkNotificationsByTrust_aggregate?: (trust_network_notification_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** An array relationship */
    trust_network_notifications?: (trust_network_notificationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** An aggregate relationship */
    trust_network_notifications_aggregate?: (trust_network_notification_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** An array relationship */
    trust_networks_by_account?: (trust_networkGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** An aggregate relationship */
    trust_networks_by_account_aggregate?: (trust_network_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** An array relationship */
    trust_networks_by_trust?: (trust_networkGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** An aggregate relationship */
    trust_networks_by_trust_aggregate?: (trust_network_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    txid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "reg_accounts" */
export interface reg_accounts_aggregateGenqlSelection{
    aggregate?: reg_accounts_aggregate_fieldsGenqlSelection
    nodes?: reg_accountsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "reg_accounts" */
export interface reg_accounts_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (reg_accounts_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: reg_accounts_max_fieldsGenqlSelection
    min?: reg_accounts_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "reg_accounts". All fields are combined with a logical 'AND'. */
export interface reg_accounts_bool_exp {_and?: (reg_accounts_bool_exp[] | null),_not?: (reg_accounts_bool_exp | null),_or?: (reg_accounts_bool_exp[] | null),account?: (String_comparison_exp | null),accounts_information?: (accounts_information_bool_exp | null),create_account?: (Boolean_comparison_exp | null),created?: (timestamptz_comparison_exp | null),created_at?: (timestamp_comparison_exp | null),cred_id?: (String_comparison_exp | null),device_name?: (String_comparison_exp | null),devices?: (devices_bool_exp | null),devices_aggregate?: (devices_aggregate_bool_exp | null),id?: (uuid_comparison_exp | null),messages_from?: (messages_bool_exp | null),messages_from_aggregate?: (messages_aggregate_bool_exp | null),messages_to?: (messages_bool_exp | null),messages_to_aggregate?: (messages_aggregate_bool_exp | null),notifications_from?: (notifications_bool_exp | null),notifications_from_aggregate?: (notifications_aggregate_bool_exp | null),notifications_to?: (notifications_bool_exp | null),notifications_to_aggregate?: (notifications_aggregate_bool_exp | null),onboarded?: (Boolean_comparison_exp | null),p2p_offers_buyer?: (p2p_offers_bool_exp | null),p2p_offers_buyer_aggregate?: (p2p_offers_aggregate_bool_exp | null),p2p_offers_initiator?: (p2p_offers_bool_exp | null),p2p_offers_initiator_aggregate?: (p2p_offers_aggregate_bool_exp | null),p2p_offers_seller?: (p2p_offers_bool_exp | null),p2p_offers_seller_aggregate?: (p2p_offers_aggregate_bool_exp | null),public_key?: (String_comparison_exp | null),referrer?: (String_comparison_exp | null),reg_accounts_accounts_information?: (accounts_information_bool_exp | null),reg_accounts_accounts_information_aggregate?: (accounts_information_aggregate_bool_exp | null),swap_orders?: (swap_orders_bool_exp | null),swap_orders_aggregate?: (swap_orders_aggregate_bool_exp | null),trustNetworkNotificationsByTrust?: (trust_network_notification_bool_exp | null),trustNetworkNotificationsByTrust_aggregate?: (trust_network_notification_aggregate_bool_exp | null),trust_network_notifications?: (trust_network_notification_bool_exp | null),trust_network_notifications_aggregate?: (trust_network_notification_aggregate_bool_exp | null),trust_networks_by_account?: (trust_network_bool_exp | null),trust_networks_by_account_aggregate?: (trust_network_aggregate_bool_exp | null),trust_networks_by_trust?: (trust_network_bool_exp | null),trust_networks_by_trust_aggregate?: (trust_network_aggregate_bool_exp | null),txid?: (String_comparison_exp | null)}


/** input type for inserting data into table "reg_accounts" */
export interface reg_accounts_insert_input {account?: (Scalars['String'] | null),accounts_information?: (accounts_information_obj_rel_insert_input | null),create_account?: (Scalars['Boolean'] | null),created?: (Scalars['timestamptz'] | null),created_at?: (Scalars['timestamp'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),devices?: (devices_arr_rel_insert_input | null),id?: (Scalars['uuid'] | null),messages_from?: (messages_arr_rel_insert_input | null),messages_to?: (messages_arr_rel_insert_input | null),notifications_from?: (notifications_arr_rel_insert_input | null),notifications_to?: (notifications_arr_rel_insert_input | null),onboarded?: (Scalars['Boolean'] | null),p2p_offers_buyer?: (p2p_offers_arr_rel_insert_input | null),p2p_offers_initiator?: (p2p_offers_arr_rel_insert_input | null),p2p_offers_seller?: (p2p_offers_arr_rel_insert_input | null),public_key?: (Scalars['String'] | null),referrer?: (Scalars['String'] | null),reg_accounts_accounts_information?: (accounts_information_arr_rel_insert_input | null),swap_orders?: (swap_orders_arr_rel_insert_input | null),trustNetworkNotificationsByTrust?: (trust_network_notification_arr_rel_insert_input | null),trust_network_notifications?: (trust_network_notification_arr_rel_insert_input | null),trust_networks_by_account?: (trust_network_arr_rel_insert_input | null),trust_networks_by_trust?: (trust_network_arr_rel_insert_input | null),txid?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface reg_accounts_max_fieldsGenqlSelection{
    account?: boolean | number
    created?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    id?: boolean | number
    public_key?: boolean | number
    referrer?: boolean | number
    txid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface reg_accounts_min_fieldsGenqlSelection{
    account?: boolean | number
    created?: boolean | number
    created_at?: boolean | number
    cred_id?: boolean | number
    device_name?: boolean | number
    id?: boolean | number
    public_key?: boolean | number
    referrer?: boolean | number
    txid?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "reg_accounts" */
export interface reg_accounts_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: reg_accountsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** input type for inserting object relation for remote table "reg_accounts" */
export interface reg_accounts_obj_rel_insert_input {data?: reg_accounts_insert_input,
/** upsert condition */
on_conflict?: (reg_accounts_on_conflict | null)}


/** on_conflict condition type for table "reg_accounts" */
export interface reg_accounts_on_conflict {constraint?: reg_accounts_constraint,update_columns?: reg_accounts_update_column[],where?: (reg_accounts_bool_exp | null)}


/** Ordering options when selecting data from "reg_accounts". */
export interface reg_accounts_order_by {account?: (order_by | null),accounts_information?: (accounts_information_order_by | null),create_account?: (order_by | null),created?: (order_by | null),created_at?: (order_by | null),cred_id?: (order_by | null),device_name?: (order_by | null),devices_aggregate?: (devices_aggregate_order_by | null),id?: (order_by | null),messages_from_aggregate?: (messages_aggregate_order_by | null),messages_to_aggregate?: (messages_aggregate_order_by | null),notifications_from_aggregate?: (notifications_aggregate_order_by | null),notifications_to_aggregate?: (notifications_aggregate_order_by | null),onboarded?: (order_by | null),p2p_offers_buyer_aggregate?: (p2p_offers_aggregate_order_by | null),p2p_offers_initiator_aggregate?: (p2p_offers_aggregate_order_by | null),p2p_offers_seller_aggregate?: (p2p_offers_aggregate_order_by | null),public_key?: (order_by | null),referrer?: (order_by | null),reg_accounts_accounts_information_aggregate?: (accounts_information_aggregate_order_by | null),swap_orders_aggregate?: (swap_orders_aggregate_order_by | null),trustNetworkNotificationsByTrust_aggregate?: (trust_network_notification_aggregate_order_by | null),trust_network_notifications_aggregate?: (trust_network_notification_aggregate_order_by | null),trust_networks_by_account_aggregate?: (trust_network_aggregate_order_by | null),trust_networks_by_trust_aggregate?: (trust_network_aggregate_order_by | null),txid?: (order_by | null)}


/** primary key columns input for table: reg_accounts */
export interface reg_accounts_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "reg_accounts" */
export interface reg_accounts_set_input {account?: (Scalars['String'] | null),create_account?: (Scalars['Boolean'] | null),created?: (Scalars['timestamptz'] | null),created_at?: (Scalars['timestamp'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),onboarded?: (Scalars['Boolean'] | null),public_key?: (Scalars['String'] | null),referrer?: (Scalars['String'] | null),txid?: (Scalars['String'] | null)}


/** Streaming cursor of the table "reg_accounts" */
export interface reg_accounts_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: reg_accounts_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface reg_accounts_stream_cursor_value_input {account?: (Scalars['String'] | null),create_account?: (Scalars['Boolean'] | null),created?: (Scalars['timestamptz'] | null),created_at?: (Scalars['timestamp'] | null),cred_id?: (Scalars['String'] | null),device_name?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),onboarded?: (Scalars['Boolean'] | null),public_key?: (Scalars['String'] | null),referrer?: (Scalars['String'] | null),txid?: (Scalars['String'] | null)}

export interface reg_accounts_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (reg_accounts_set_input | null),
/** filter the rows which have to be updated */
where?: reg_accounts_bool_exp}

export interface request_new_account_input {account?: Scalars['String'],create_account?: (Scalars['Boolean'] | null),cred_id?: Scalars['String'],device_name?: Scalars['String'],email_address?: Scalars['String'],newsletter_subscription?: Scalars['Boolean'],phone_number?: Scalars['String'],public_key?: Scalars['String'],referrer?: Scalars['String']}

export interface request_new_account_outputGenqlSelection{
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "signing_requests" */
export interface signing_requestsGenqlSelection{
    createdAt?: boolean | number
    esr?: boolean | number
    id?: boolean | number
    signature?: boolean | number
    signer?: boolean | number
    status?: boolean | number
    transactionId?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "signing_requests" */
export interface signing_requests_aggregateGenqlSelection{
    aggregate?: signing_requests_aggregate_fieldsGenqlSelection
    nodes?: signing_requestsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "signing_requests" */
export interface signing_requests_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (signing_requests_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: signing_requests_max_fieldsGenqlSelection
    min?: signing_requests_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "signing_requests". All fields are combined with a logical 'AND'. */
export interface signing_requests_bool_exp {_and?: (signing_requests_bool_exp[] | null),_not?: (signing_requests_bool_exp | null),_or?: (signing_requests_bool_exp[] | null),createdAt?: (timestamptz_comparison_exp | null),esr?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),signature?: (String_comparison_exp | null),signer?: (String_comparison_exp | null),status?: (String_comparison_exp | null),transactionId?: (String_comparison_exp | null),updatedAt?: (timestamptz_comparison_exp | null)}


/** input type for inserting data into table "signing_requests" */
export interface signing_requests_insert_input {createdAt?: (Scalars['timestamptz'] | null),esr?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),signature?: (Scalars['String'] | null),signer?: (Scalars['String'] | null),status?: (Scalars['String'] | null),transactionId?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamptz'] | null)}


/** aggregate max on columns */
export interface signing_requests_max_fieldsGenqlSelection{
    createdAt?: boolean | number
    esr?: boolean | number
    id?: boolean | number
    signature?: boolean | number
    signer?: boolean | number
    status?: boolean | number
    transactionId?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface signing_requests_min_fieldsGenqlSelection{
    createdAt?: boolean | number
    esr?: boolean | number
    id?: boolean | number
    signature?: boolean | number
    signer?: boolean | number
    status?: boolean | number
    transactionId?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "signing_requests" */
export interface signing_requests_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: signing_requestsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "signing_requests" */
export interface signing_requests_on_conflict {constraint?: signing_requests_constraint,update_columns?: signing_requests_update_column[],where?: (signing_requests_bool_exp | null)}


/** Ordering options when selecting data from "signing_requests". */
export interface signing_requests_order_by {createdAt?: (order_by | null),esr?: (order_by | null),id?: (order_by | null),signature?: (order_by | null),signer?: (order_by | null),status?: (order_by | null),transactionId?: (order_by | null),updatedAt?: (order_by | null)}


/** primary key columns input for table: signing_requests */
export interface signing_requests_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "signing_requests" */
export interface signing_requests_set_input {createdAt?: (Scalars['timestamptz'] | null),esr?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),signature?: (Scalars['String'] | null),signer?: (Scalars['String'] | null),status?: (Scalars['String'] | null),transactionId?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamptz'] | null)}


/** Streaming cursor of the table "signing_requests" */
export interface signing_requests_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: signing_requests_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface signing_requests_stream_cursor_value_input {createdAt?: (Scalars['timestamptz'] | null),esr?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),signature?: (Scalars['String'] | null),signer?: (Scalars['String'] | null),status?: (Scalars['String'] | null),transactionId?: (Scalars['String'] | null),updatedAt?: (Scalars['timestamptz'] | null)}

export interface signing_requests_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (signing_requests_set_input | null),
/** filter the rows which have to be updated */
where?: signing_requests_bool_exp}

export interface subscription_rootGenqlSelection{
    /** fetch data from the table: "accounts_information" */
    accounts_information?: (accounts_informationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** fetch aggregated fields from the table: "accounts_information" */
    accounts_information_aggregate?: (accounts_information_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (accounts_information_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (accounts_information_order_by[] | null), 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** fetch data from the table: "accounts_information" using primary key columns */
    accounts_information_by_pk?: (accounts_informationGenqlSelection & { __args: {account: Scalars['String'], id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "accounts_information" */
    accounts_information_stream?: (accounts_informationGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (accounts_information_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (accounts_information_bool_exp | null)} })
    /** An array relationship */
    devices?: (devicesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** An aggregate relationship */
    devices_aggregate?: (devices_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (devices_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (devices_order_by[] | null), 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** fetch data from the table: "devices" using primary key columns */
    devices_by_pk?: (devicesGenqlSelection & { __args: {cred_id: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "devices" */
    devices_stream?: (devicesGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (devices_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (devices_bool_exp | null)} })
    /** An array relationship */
    messages?: (messagesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** An aggregate relationship */
    messages_aggregate?: (messages_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (messages_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (messages_order_by[] | null), 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** fetch data from the table: "messages" using primary key columns */
    messages_by_pk?: (messagesGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "messages" */
    messages_stream?: (messagesGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (messages_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (messages_bool_exp | null)} })
    /** fetch data from the table: "migrate_device" */
    migrate_device?: (migrate_deviceGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (migrate_device_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (migrate_device_order_by[] | null), 
    /** filter the rows returned */
    where?: (migrate_device_bool_exp | null)} })
    /** fetch aggregated fields from the table: "migrate_device" */
    migrate_device_aggregate?: (migrate_device_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (migrate_device_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (migrate_device_order_by[] | null), 
    /** filter the rows returned */
    where?: (migrate_device_bool_exp | null)} })
    /** fetch data from the table: "migrate_device" using primary key columns */
    migrate_device_by_pk?: (migrate_deviceGenqlSelection & { __args: {cred_id: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "migrate_device" */
    migrate_device_stream?: (migrate_deviceGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (migrate_device_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (migrate_device_bool_exp | null)} })
    /** fetch data from the table: "notifications" */
    notifications?: (notificationsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** fetch aggregated fields from the table: "notifications" */
    notifications_aggregate?: (notifications_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (notifications_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (notifications_order_by[] | null), 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** fetch data from the table: "notifications" using primary key columns */
    notifications_by_pk?: (notificationsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "notifications" */
    notifications_stream?: (notificationsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (notifications_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (notifications_bool_exp | null)} })
    /** fetch data from the table: "p2p_offers" */
    p2p_offers?: (p2p_offersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** fetch aggregated fields from the table: "p2p_offers" */
    p2p_offers_aggregate?: (p2p_offers_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (p2p_offers_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (p2p_offers_order_by[] | null), 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** fetch data from the table: "p2p_offers" using primary key columns */
    p2p_offers_by_pk?: (p2p_offersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "p2p_offers" */
    p2p_offers_stream?: (p2p_offersGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (p2p_offers_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (p2p_offers_bool_exp | null)} })
    /** fetch data from the table: "preferences" */
    preferences?: (preferencesGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (preferences_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (preferences_order_by[] | null), 
    /** filter the rows returned */
    where?: (preferences_bool_exp | null)} })
    /** fetch aggregated fields from the table: "preferences" */
    preferences_aggregate?: (preferences_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (preferences_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (preferences_order_by[] | null), 
    /** filter the rows returned */
    where?: (preferences_bool_exp | null)} })
    /** fetch data from the table: "preferences" using primary key columns */
    preferences_by_pk?: (preferencesGenqlSelection & { __args: {account: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "preferences" */
    preferences_stream?: (preferencesGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (preferences_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (preferences_bool_exp | null)} })
    /** fetch data from the table: "reg_accounts" */
    reg_accounts?: (reg_accountsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (reg_accounts_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (reg_accounts_order_by[] | null), 
    /** filter the rows returned */
    where?: (reg_accounts_bool_exp | null)} })
    /** fetch aggregated fields from the table: "reg_accounts" */
    reg_accounts_aggregate?: (reg_accounts_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (reg_accounts_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (reg_accounts_order_by[] | null), 
    /** filter the rows returned */
    where?: (reg_accounts_bool_exp | null)} })
    /** fetch data from the table: "reg_accounts" using primary key columns */
    reg_accounts_by_pk?: (reg_accountsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "reg_accounts" */
    reg_accounts_stream?: (reg_accountsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (reg_accounts_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (reg_accounts_bool_exp | null)} })
    /** fetch data from the table: "signing_requests" */
    signing_requests?: (signing_requestsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (signing_requests_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (signing_requests_order_by[] | null), 
    /** filter the rows returned */
    where?: (signing_requests_bool_exp | null)} })
    /** fetch aggregated fields from the table: "signing_requests" */
    signing_requests_aggregate?: (signing_requests_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (signing_requests_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (signing_requests_order_by[] | null), 
    /** filter the rows returned */
    where?: (signing_requests_bool_exp | null)} })
    /** fetch data from the table: "signing_requests" using primary key columns */
    signing_requests_by_pk?: (signing_requestsGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "signing_requests" */
    signing_requests_stream?: (signing_requestsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (signing_requests_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (signing_requests_bool_exp | null)} })
    /** fetch data from the table: "swap_assets" */
    swap_assets?: (swap_assetsGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_assets_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_assets_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_assets_bool_exp | null)} })
    /** fetch aggregated fields from the table: "swap_assets" */
    swap_assets_aggregate?: (swap_assets_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_assets_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_assets_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_assets_bool_exp | null)} })
    /** fetch data from the table: "swap_assets" using primary key columns */
    swap_assets_by_pk?: (swap_assetsGenqlSelection & { __args: {asset: Scalars['String'], chain: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "swap_assets" */
    swap_assets_stream?: (swap_assetsGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (swap_assets_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (swap_assets_bool_exp | null)} })
    /** An array relationship */
    swap_orders?: (swap_ordersGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** An aggregate relationship */
    swap_orders_aggregate?: (swap_orders_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (swap_orders_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (swap_orders_order_by[] | null), 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** fetch data from the table: "swap_orders" using primary key columns */
    swap_orders_by_pk?: (swap_ordersGenqlSelection & { __args: {id: Scalars['uuid']} })
    /** fetch data from the table in a streaming manner: "swap_orders" */
    swap_orders_stream?: (swap_ordersGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (swap_orders_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (swap_orders_bool_exp | null)} })
    /** fetch data from the table: "trust_network" */
    trust_network?: (trust_networkGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network" */
    trust_network_aggregate?: (trust_network_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    /** fetch data from the table: "trust_network" using primary key columns */
    trust_network_by_pk?: (trust_networkGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** fetch data from the table: "trust_network_notification" */
    trust_network_notification?: (trust_network_notificationGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network_notification" */
    trust_network_notification_aggregate?: (trust_network_notification_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_notification_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_notification_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** fetch data from the table: "trust_network_notification" using primary key columns */
    trust_network_notification_by_pk?: (trust_network_notificationGenqlSelection & { __args: {account: Scalars['String'], trust: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "trust_network_notification" */
    trust_network_notification_stream?: (trust_network_notificationGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (trust_network_notification_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (trust_network_notification_bool_exp | null)} })
    /** fetch data from the table: "trust_network_status" */
    trust_network_status?: (trust_network_statusGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_status_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_status_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_status_bool_exp | null)} })
    /** fetch aggregated fields from the table: "trust_network_status" */
    trust_network_status_aggregate?: (trust_network_status_aggregateGenqlSelection & { __args?: {
    /** distinct select on columns */
    distinct_on?: (trust_network_status_select_column[] | null), 
    /** limit the number of rows returned */
    limit?: (Scalars['Int'] | null), 
    /** skip the first n rows. Use only with order_by */
    offset?: (Scalars['Int'] | null), 
    /** sort the rows by one or more columns */
    order_by?: (trust_network_status_order_by[] | null), 
    /** filter the rows returned */
    where?: (trust_network_status_bool_exp | null)} })
    /** fetch data from the table: "trust_network_status" using primary key columns */
    trust_network_status_by_pk?: (trust_network_statusGenqlSelection & { __args: {status: Scalars['String']} })
    /** fetch data from the table in a streaming manner: "trust_network_status" */
    trust_network_status_stream?: (trust_network_statusGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (trust_network_status_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (trust_network_status_bool_exp | null)} })
    /** fetch data from the table in a streaming manner: "trust_network" */
    trust_network_stream?: (trust_networkGenqlSelection & { __args: {
    /** maximum number of rows returned in a single batch */
    batch_size: Scalars['Int'], 
    /** cursor to stream the results returned by the query */
    cursor: (trust_network_stream_cursor_input | null)[], 
    /** filter the rows returned */
    where?: (trust_network_bool_exp | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "swap_assets" */
export interface swap_assetsGenqlSelection{
    active_swaps?: boolean | number
    asset?: boolean | number
    asset_name?: boolean | number
    chain?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "swap_assets" */
export interface swap_assets_aggregateGenqlSelection{
    aggregate?: swap_assets_aggregate_fieldsGenqlSelection
    nodes?: swap_assetsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "swap_assets" */
export interface swap_assets_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (swap_assets_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: swap_assets_max_fieldsGenqlSelection
    min?: swap_assets_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "swap_assets". All fields are combined with a logical 'AND'. */
export interface swap_assets_bool_exp {_and?: (swap_assets_bool_exp[] | null),_not?: (swap_assets_bool_exp | null),_or?: (swap_assets_bool_exp[] | null),active_swaps?: (Boolean_comparison_exp | null),asset?: (String_comparison_exp | null),asset_name?: (String_comparison_exp | null),chain?: (String_comparison_exp | null),wallet_address?: (String_comparison_exp | null)}


/** input type for inserting data into table "swap_assets" */
export interface swap_assets_insert_input {active_swaps?: (Scalars['Boolean'] | null),asset?: (Scalars['String'] | null),asset_name?: (Scalars['String'] | null),chain?: (Scalars['String'] | null),wallet_address?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface swap_assets_max_fieldsGenqlSelection{
    asset?: boolean | number
    asset_name?: boolean | number
    chain?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface swap_assets_min_fieldsGenqlSelection{
    asset?: boolean | number
    asset_name?: boolean | number
    chain?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "swap_assets" */
export interface swap_assets_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: swap_assetsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "swap_assets" */
export interface swap_assets_on_conflict {constraint?: swap_assets_constraint,update_columns?: swap_assets_update_column[],where?: (swap_assets_bool_exp | null)}


/** Ordering options when selecting data from "swap_assets". */
export interface swap_assets_order_by {active_swaps?: (order_by | null),asset?: (order_by | null),asset_name?: (order_by | null),chain?: (order_by | null),wallet_address?: (order_by | null)}


/** primary key columns input for table: swap_assets */
export interface swap_assets_pk_columns_input {asset?: Scalars['String'],chain?: Scalars['String']}


/** input type for updating data in table "swap_assets" */
export interface swap_assets_set_input {active_swaps?: (Scalars['Boolean'] | null),asset?: (Scalars['String'] | null),asset_name?: (Scalars['String'] | null),chain?: (Scalars['String'] | null),wallet_address?: (Scalars['String'] | null)}


/** Streaming cursor of the table "swap_assets" */
export interface swap_assets_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: swap_assets_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface swap_assets_stream_cursor_value_input {active_swaps?: (Scalars['Boolean'] | null),asset?: (Scalars['String'] | null),asset_name?: (Scalars['String'] | null),chain?: (Scalars['String'] | null),wallet_address?: (Scalars['String'] | null)}

export interface swap_assets_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (swap_assets_set_input | null),
/** filter the rows which have to be updated */
where?: swap_assets_bool_exp}


/** columns and relationships of "swap_orders" */
export interface swap_ordersGenqlSelection{
    asset?: boolean | number
    asset_amount?: boolean | number
    masterbots_account?: boolean | number
    masterbots_amount?: boolean | number
    masterbots_currency?: boolean | number
    masterbots_trx?: boolean | number
    created_at?: boolean | number
    gems_id?: boolean | number
    id?: boolean | number
    order_status?: boolean | number
    order_type?: boolean | number
    price?: boolean | number
    /** An object relationship */
    reg_account?: reg_accountsGenqlSelection
    updated_at?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "swap_orders" */
export interface swap_orders_aggregateGenqlSelection{
    aggregate?: swap_orders_aggregate_fieldsGenqlSelection
    nodes?: swap_ordersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface swap_orders_aggregate_bool_exp {avg?: (swap_orders_aggregate_bool_exp_avg | null),corr?: (swap_orders_aggregate_bool_exp_corr | null),count?: (swap_orders_aggregate_bool_exp_count | null),covar_samp?: (swap_orders_aggregate_bool_exp_covar_samp | null),max?: (swap_orders_aggregate_bool_exp_max | null),min?: (swap_orders_aggregate_bool_exp_min | null),stddev_samp?: (swap_orders_aggregate_bool_exp_stddev_samp | null),sum?: (swap_orders_aggregate_bool_exp_sum | null),var_samp?: (swap_orders_aggregate_bool_exp_var_samp | null)}

export interface swap_orders_aggregate_bool_exp_avg {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_avg_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_corr {arguments?: swap_orders_aggregate_bool_exp_corr_arguments,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_corr_arguments {X?: swap_orders_select_column_swap_orders_aggregate_bool_exp_corr_arguments_columns,Y?: swap_orders_select_column_swap_orders_aggregate_bool_exp_corr_arguments_columns}

export interface swap_orders_aggregate_bool_exp_count {arguments?: (swap_orders_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: Int_comparison_exp}

export interface swap_orders_aggregate_bool_exp_covar_samp {arguments?: swap_orders_aggregate_bool_exp_covar_samp_arguments,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_covar_samp_arguments {X?: swap_orders_select_column_swap_orders_aggregate_bool_exp_covar_samp_arguments_columns,Y?: swap_orders_select_column_swap_orders_aggregate_bool_exp_covar_samp_arguments_columns}

export interface swap_orders_aggregate_bool_exp_max {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_max_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_min {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_min_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_stddev_samp {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_stddev_samp_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_sum {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_sum_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}

export interface swap_orders_aggregate_bool_exp_var_samp {arguments?: swap_orders_select_column_swap_orders_aggregate_bool_exp_var_samp_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (swap_orders_bool_exp | null),predicate?: float8_comparison_exp}


/** aggregate fields of "swap_orders" */
export interface swap_orders_aggregate_fieldsGenqlSelection{
    avg?: swap_orders_avg_fieldsGenqlSelection
    count?: { __args: {columns?: (swap_orders_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: swap_orders_max_fieldsGenqlSelection
    min?: swap_orders_min_fieldsGenqlSelection
    stddev?: swap_orders_stddev_fieldsGenqlSelection
    stddev_pop?: swap_orders_stddev_pop_fieldsGenqlSelection
    stddev_samp?: swap_orders_stddev_samp_fieldsGenqlSelection
    sum?: swap_orders_sum_fieldsGenqlSelection
    var_pop?: swap_orders_var_pop_fieldsGenqlSelection
    var_samp?: swap_orders_var_samp_fieldsGenqlSelection
    variance?: swap_orders_variance_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "swap_orders" */
export interface swap_orders_aggregate_order_by {avg?: (swap_orders_avg_order_by | null),count?: (order_by | null),max?: (swap_orders_max_order_by | null),min?: (swap_orders_min_order_by | null),stddev?: (swap_orders_stddev_order_by | null),stddev_pop?: (swap_orders_stddev_pop_order_by | null),stddev_samp?: (swap_orders_stddev_samp_order_by | null),sum?: (swap_orders_sum_order_by | null),var_pop?: (swap_orders_var_pop_order_by | null),var_samp?: (swap_orders_var_samp_order_by | null),variance?: (swap_orders_variance_order_by | null)}


/** input type for inserting array relation for remote table "swap_orders" */
export interface swap_orders_arr_rel_insert_input {data?: swap_orders_insert_input[],
/** upsert condition */
on_conflict?: (swap_orders_on_conflict | null)}


/** aggregate avg on columns */
export interface swap_orders_avg_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by avg() on columns of table "swap_orders" */
export interface swap_orders_avg_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** Boolean expression to filter rows from the table "swap_orders". All fields are combined with a logical 'AND'. */
export interface swap_orders_bool_exp {_and?: (swap_orders_bool_exp[] | null),_not?: (swap_orders_bool_exp | null),_or?: (swap_orders_bool_exp[] | null),asset?: (String_comparison_exp | null),asset_amount?: (float8_comparison_exp | null),masterbots_account?: (String_comparison_exp | null),masterbots_amount?: (float8_comparison_exp | null),masterbots_currency?: (String_comparison_exp | null),masterbots_trx?: (String_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),gems_id?: (String_comparison_exp | null),id?: (uuid_comparison_exp | null),order_status?: (String_comparison_exp | null),order_type?: (String_comparison_exp | null),price?: (float8_comparison_exp | null),reg_account?: (reg_accounts_bool_exp | null),updated_at?: (timestamptz_comparison_exp | null),wallet_address?: (String_comparison_exp | null)}


/** input type for incrementing numeric columns in table "swap_orders" */
export interface swap_orders_inc_input {asset_amount?: (Scalars['float8'] | null),masterbots_amount?: (Scalars['float8'] | null),price?: (Scalars['float8'] | null)}


/** input type for inserting data into table "swap_orders" */
export interface swap_orders_insert_input {asset?: (Scalars['String'] | null),asset_amount?: (Scalars['float8'] | null),masterbots_account?: (Scalars['String'] | null),masterbots_amount?: (Scalars['float8'] | null),masterbots_currency?: (Scalars['String'] | null),masterbots_trx?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),gems_id?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),order_status?: (Scalars['String'] | null),order_type?: (Scalars['String'] | null),price?: (Scalars['float8'] | null),reg_account?: (reg_accounts_obj_rel_insert_input | null),updated_at?: (Scalars['timestamptz'] | null),wallet_address?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface swap_orders_max_fieldsGenqlSelection{
    asset?: boolean | number
    asset_amount?: boolean | number
    masterbots_account?: boolean | number
    masterbots_amount?: boolean | number
    masterbots_currency?: boolean | number
    masterbots_trx?: boolean | number
    created_at?: boolean | number
    gems_id?: boolean | number
    id?: boolean | number
    order_status?: boolean | number
    order_type?: boolean | number
    price?: boolean | number
    updated_at?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "swap_orders" */
export interface swap_orders_max_order_by {asset?: (order_by | null),asset_amount?: (order_by | null),masterbots_account?: (order_by | null),masterbots_amount?: (order_by | null),masterbots_currency?: (order_by | null),masterbots_trx?: (order_by | null),created_at?: (order_by | null),gems_id?: (order_by | null),id?: (order_by | null),order_status?: (order_by | null),order_type?: (order_by | null),price?: (order_by | null),updated_at?: (order_by | null),wallet_address?: (order_by | null)}


/** aggregate min on columns */
export interface swap_orders_min_fieldsGenqlSelection{
    asset?: boolean | number
    asset_amount?: boolean | number
    masterbots_account?: boolean | number
    masterbots_amount?: boolean | number
    masterbots_currency?: boolean | number
    masterbots_trx?: boolean | number
    created_at?: boolean | number
    gems_id?: boolean | number
    id?: boolean | number
    order_status?: boolean | number
    order_type?: boolean | number
    price?: boolean | number
    updated_at?: boolean | number
    wallet_address?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "swap_orders" */
export interface swap_orders_min_order_by {asset?: (order_by | null),asset_amount?: (order_by | null),masterbots_account?: (order_by | null),masterbots_amount?: (order_by | null),masterbots_currency?: (order_by | null),masterbots_trx?: (order_by | null),created_at?: (order_by | null),gems_id?: (order_by | null),id?: (order_by | null),order_status?: (order_by | null),order_type?: (order_by | null),price?: (order_by | null),updated_at?: (order_by | null),wallet_address?: (order_by | null)}


/** response of any mutation on the table "swap_orders" */
export interface swap_orders_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: swap_ordersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "swap_orders" */
export interface swap_orders_on_conflict {constraint?: swap_orders_constraint,update_columns?: swap_orders_update_column[],where?: (swap_orders_bool_exp | null)}


/** Ordering options when selecting data from "swap_orders". */
export interface swap_orders_order_by {asset?: (order_by | null),asset_amount?: (order_by | null),masterbots_account?: (order_by | null),masterbots_amount?: (order_by | null),masterbots_currency?: (order_by | null),masterbots_trx?: (order_by | null),created_at?: (order_by | null),gems_id?: (order_by | null),id?: (order_by | null),order_status?: (order_by | null),order_type?: (order_by | null),price?: (order_by | null),reg_account?: (reg_accounts_order_by | null),updated_at?: (order_by | null),wallet_address?: (order_by | null)}


/** primary key columns input for table: swap_orders */
export interface swap_orders_pk_columns_input {id?: Scalars['uuid']}


/** input type for updating data in table "swap_orders" */
export interface swap_orders_set_input {asset?: (Scalars['String'] | null),asset_amount?: (Scalars['float8'] | null),masterbots_account?: (Scalars['String'] | null),masterbots_amount?: (Scalars['float8'] | null),masterbots_currency?: (Scalars['String'] | null),masterbots_trx?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),gems_id?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),order_status?: (Scalars['String'] | null),order_type?: (Scalars['String'] | null),price?: (Scalars['float8'] | null),updated_at?: (Scalars['timestamptz'] | null),wallet_address?: (Scalars['String'] | null)}


/** aggregate stddev on columns */
export interface swap_orders_stddev_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev() on columns of table "swap_orders" */
export interface swap_orders_stddev_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** aggregate stddev_pop on columns */
export interface swap_orders_stddev_pop_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev_pop() on columns of table "swap_orders" */
export interface swap_orders_stddev_pop_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** aggregate stddev_samp on columns */
export interface swap_orders_stddev_samp_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by stddev_samp() on columns of table "swap_orders" */
export interface swap_orders_stddev_samp_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** Streaming cursor of the table "swap_orders" */
export interface swap_orders_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: swap_orders_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface swap_orders_stream_cursor_value_input {asset?: (Scalars['String'] | null),asset_amount?: (Scalars['float8'] | null),masterbots_account?: (Scalars['String'] | null),masterbots_amount?: (Scalars['float8'] | null),masterbots_currency?: (Scalars['String'] | null),masterbots_trx?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),gems_id?: (Scalars['String'] | null),id?: (Scalars['uuid'] | null),order_status?: (Scalars['String'] | null),order_type?: (Scalars['String'] | null),price?: (Scalars['float8'] | null),updated_at?: (Scalars['timestamptz'] | null),wallet_address?: (Scalars['String'] | null)}


/** aggregate sum on columns */
export interface swap_orders_sum_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by sum() on columns of table "swap_orders" */
export interface swap_orders_sum_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}

export interface swap_orders_updates {
/** increments the numeric columns with given value of the filtered values */
_inc?: (swap_orders_inc_input | null),
/** sets the columns of the filtered rows to the given values */
_set?: (swap_orders_set_input | null),
/** filter the rows which have to be updated */
where?: swap_orders_bool_exp}


/** aggregate var_pop on columns */
export interface swap_orders_var_pop_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by var_pop() on columns of table "swap_orders" */
export interface swap_orders_var_pop_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** aggregate var_samp on columns */
export interface swap_orders_var_samp_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by var_samp() on columns of table "swap_orders" */
export interface swap_orders_var_samp_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** aggregate variance on columns */
export interface swap_orders_variance_fieldsGenqlSelection{
    asset_amount?: boolean | number
    masterbots_amount?: boolean | number
    price?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by variance() on columns of table "swap_orders" */
export interface swap_orders_variance_order_by {asset_amount?: (order_by | null),masterbots_amount?: (order_by | null),price?: (order_by | null)}


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export interface timestamp_comparison_exp {_eq?: (Scalars['timestamp'] | null),_gt?: (Scalars['timestamp'] | null),_gte?: (Scalars['timestamp'] | null),_in?: (Scalars['timestamp'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamp'] | null),_lte?: (Scalars['timestamp'] | null),_neq?: (Scalars['timestamp'] | null),_nin?: (Scalars['timestamp'][] | null)}


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {_eq?: (Scalars['timestamptz'] | null),_gt?: (Scalars['timestamptz'] | null),_gte?: (Scalars['timestamptz'] | null),_in?: (Scalars['timestamptz'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['timestamptz'] | null),_lte?: (Scalars['timestamptz'] | null),_neq?: (Scalars['timestamptz'] | null),_nin?: (Scalars['timestamptz'][] | null)}

export interface toggle_trust_network_input {account?: Scalars['String'],reject?: (Scalars['Boolean'] | null)}

export interface toggle_trust_network_outputGenqlSelection{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "trust_network" */
export interface trust_networkGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    is_mutual?: boolean | number
    trust?: boolean | number
    /** An object relationship */
    trust_by?: reg_accountsGenqlSelection
    /** An object relationship */
    trust_network?: reg_accountsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "trust_network" */
export interface trust_network_aggregateGenqlSelection{
    aggregate?: trust_network_aggregate_fieldsGenqlSelection
    nodes?: trust_networkGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface trust_network_aggregate_bool_exp {bool_and?: (trust_network_aggregate_bool_exp_bool_and | null),bool_or?: (trust_network_aggregate_bool_exp_bool_or | null),count?: (trust_network_aggregate_bool_exp_count | null)}

export interface trust_network_aggregate_bool_exp_bool_and {arguments?: trust_network_select_column_trust_network_aggregate_bool_exp_bool_and_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (trust_network_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface trust_network_aggregate_bool_exp_bool_or {arguments?: trust_network_select_column_trust_network_aggregate_bool_exp_bool_or_arguments_columns,distinct?: (Scalars['Boolean'] | null),filter?: (trust_network_bool_exp | null),predicate?: Boolean_comparison_exp}

export interface trust_network_aggregate_bool_exp_count {arguments?: (trust_network_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (trust_network_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "trust_network" */
export interface trust_network_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (trust_network_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: trust_network_max_fieldsGenqlSelection
    min?: trust_network_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "trust_network" */
export interface trust_network_aggregate_order_by {count?: (order_by | null),max?: (trust_network_max_order_by | null),min?: (trust_network_min_order_by | null)}


/** input type for inserting array relation for remote table "trust_network" */
export interface trust_network_arr_rel_insert_input {data?: trust_network_insert_input[],
/** upsert condition */
on_conflict?: (trust_network_on_conflict | null)}


/** Boolean expression to filter rows from the table "trust_network". All fields are combined with a logical 'AND'. */
export interface trust_network_bool_exp {_and?: (trust_network_bool_exp[] | null),_not?: (trust_network_bool_exp | null),_or?: (trust_network_bool_exp[] | null),account?: (String_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),is_mutual?: (Boolean_comparison_exp | null),trust?: (String_comparison_exp | null),trust_by?: (reg_accounts_bool_exp | null),trust_network?: (reg_accounts_bool_exp | null)}


/** input type for inserting data into table "trust_network" */
export interface trust_network_insert_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),is_mutual?: (Scalars['Boolean'] | null),trust?: (Scalars['String'] | null),trust_by?: (reg_accounts_obj_rel_insert_input | null),trust_network?: (reg_accounts_obj_rel_insert_input | null)}


/** aggregate max on columns */
export interface trust_network_max_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    trust?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "trust_network" */
export interface trust_network_max_order_by {account?: (order_by | null),created_at?: (order_by | null),trust?: (order_by | null)}


/** aggregate min on columns */
export interface trust_network_min_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    trust?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "trust_network" */
export interface trust_network_min_order_by {account?: (order_by | null),created_at?: (order_by | null),trust?: (order_by | null)}


/** response of any mutation on the table "trust_network" */
export interface trust_network_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: trust_networkGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** columns and relationships of "trust_network_notification" */
export interface trust_network_notificationGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    /** An object relationship */
    regAccountByTrust?: reg_accountsGenqlSelection
    /** An object relationship */
    reg_account?: reg_accountsGenqlSelection
    trust?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "trust_network_notification" */
export interface trust_network_notification_aggregateGenqlSelection{
    aggregate?: trust_network_notification_aggregate_fieldsGenqlSelection
    nodes?: trust_network_notificationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface trust_network_notification_aggregate_bool_exp {count?: (trust_network_notification_aggregate_bool_exp_count | null)}

export interface trust_network_notification_aggregate_bool_exp_count {arguments?: (trust_network_notification_select_column[] | null),distinct?: (Scalars['Boolean'] | null),filter?: (trust_network_notification_bool_exp | null),predicate?: Int_comparison_exp}


/** aggregate fields of "trust_network_notification" */
export interface trust_network_notification_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (trust_network_notification_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: trust_network_notification_max_fieldsGenqlSelection
    min?: trust_network_notification_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by aggregate values of table "trust_network_notification" */
export interface trust_network_notification_aggregate_order_by {count?: (order_by | null),max?: (trust_network_notification_max_order_by | null),min?: (trust_network_notification_min_order_by | null)}


/** input type for inserting array relation for remote table "trust_network_notification" */
export interface trust_network_notification_arr_rel_insert_input {data?: trust_network_notification_insert_input[],
/** upsert condition */
on_conflict?: (trust_network_notification_on_conflict | null)}


/** Boolean expression to filter rows from the table "trust_network_notification". All fields are combined with a logical 'AND'. */
export interface trust_network_notification_bool_exp {_and?: (trust_network_notification_bool_exp[] | null),_not?: (trust_network_notification_bool_exp | null),_or?: (trust_network_notification_bool_exp[] | null),account?: (String_comparison_exp | null),created_at?: (timestamptz_comparison_exp | null),regAccountByTrust?: (reg_accounts_bool_exp | null),reg_account?: (reg_accounts_bool_exp | null),trust?: (String_comparison_exp | null)}


/** input type for inserting data into table "trust_network_notification" */
export interface trust_network_notification_insert_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),regAccountByTrust?: (reg_accounts_obj_rel_insert_input | null),reg_account?: (reg_accounts_obj_rel_insert_input | null),trust?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface trust_network_notification_max_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    trust?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by max() on columns of table "trust_network_notification" */
export interface trust_network_notification_max_order_by {account?: (order_by | null),created_at?: (order_by | null),trust?: (order_by | null)}


/** aggregate min on columns */
export interface trust_network_notification_min_fieldsGenqlSelection{
    account?: boolean | number
    created_at?: boolean | number
    trust?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** order by min() on columns of table "trust_network_notification" */
export interface trust_network_notification_min_order_by {account?: (order_by | null),created_at?: (order_by | null),trust?: (order_by | null)}


/** response of any mutation on the table "trust_network_notification" */
export interface trust_network_notification_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: trust_network_notificationGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "trust_network_notification" */
export interface trust_network_notification_on_conflict {constraint?: trust_network_notification_constraint,update_columns?: trust_network_notification_update_column[],where?: (trust_network_notification_bool_exp | null)}


/** Ordering options when selecting data from "trust_network_notification". */
export interface trust_network_notification_order_by {account?: (order_by | null),created_at?: (order_by | null),regAccountByTrust?: (reg_accounts_order_by | null),reg_account?: (reg_accounts_order_by | null),trust?: (order_by | null)}


/** primary key columns input for table: trust_network_notification */
export interface trust_network_notification_pk_columns_input {account?: Scalars['String'],trust?: Scalars['String']}


/** input type for updating data in table "trust_network_notification" */
export interface trust_network_notification_set_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),trust?: (Scalars['String'] | null)}


/** Streaming cursor of the table "trust_network_notification" */
export interface trust_network_notification_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: trust_network_notification_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface trust_network_notification_stream_cursor_value_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),trust?: (Scalars['String'] | null)}

export interface trust_network_notification_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (trust_network_notification_set_input | null),
/** filter the rows which have to be updated */
where?: trust_network_notification_bool_exp}


/** on_conflict condition type for table "trust_network" */
export interface trust_network_on_conflict {constraint?: trust_network_constraint,update_columns?: trust_network_update_column[],where?: (trust_network_bool_exp | null)}


/** Ordering options when selecting data from "trust_network". */
export interface trust_network_order_by {account?: (order_by | null),created_at?: (order_by | null),is_mutual?: (order_by | null),trust?: (order_by | null),trust_by?: (reg_accounts_order_by | null),trust_network?: (reg_accounts_order_by | null)}

export interface trust_network_outputGenqlSelection{
    trusted_network?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** primary key columns input for table: trust_network */
export interface trust_network_pk_columns_input {account?: Scalars['String'],trust?: Scalars['String']}


/** input type for updating data in table "trust_network" */
export interface trust_network_set_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),is_mutual?: (Scalars['Boolean'] | null),trust?: (Scalars['String'] | null)}


/** columns and relationships of "trust_network_status" */
export interface trust_network_statusGenqlSelection{
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregated selection of "trust_network_status" */
export interface trust_network_status_aggregateGenqlSelection{
    aggregate?: trust_network_status_aggregate_fieldsGenqlSelection
    nodes?: trust_network_statusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate fields of "trust_network_status" */
export interface trust_network_status_aggregate_fieldsGenqlSelection{
    count?: { __args: {columns?: (trust_network_status_select_column[] | null), distinct?: (Scalars['Boolean'] | null)} } | boolean | number
    max?: trust_network_status_max_fieldsGenqlSelection
    min?: trust_network_status_min_fieldsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Boolean expression to filter rows from the table "trust_network_status". All fields are combined with a logical 'AND'. */
export interface trust_network_status_bool_exp {_and?: (trust_network_status_bool_exp[] | null),_not?: (trust_network_status_bool_exp | null),_or?: (trust_network_status_bool_exp[] | null),status?: (String_comparison_exp | null)}


/** input type for inserting data into table "trust_network_status" */
export interface trust_network_status_insert_input {status?: (Scalars['String'] | null)}


/** aggregate max on columns */
export interface trust_network_status_max_fieldsGenqlSelection{
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** aggregate min on columns */
export interface trust_network_status_min_fieldsGenqlSelection{
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** response of any mutation on the table "trust_network_status" */
export interface trust_network_status_mutation_responseGenqlSelection{
    /** number of rows affected by the mutation */
    affected_rows?: boolean | number
    /** data from the rows affected by the mutation */
    returning?: trust_network_statusGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** on_conflict condition type for table "trust_network_status" */
export interface trust_network_status_on_conflict {constraint?: trust_network_status_constraint,update_columns?: trust_network_status_update_column[],where?: (trust_network_status_bool_exp | null)}


/** Ordering options when selecting data from "trust_network_status". */
export interface trust_network_status_order_by {status?: (order_by | null)}


/** primary key columns input for table: trust_network_status */
export interface trust_network_status_pk_columns_input {status?: Scalars['String']}


/** input type for updating data in table "trust_network_status" */
export interface trust_network_status_set_input {status?: (Scalars['String'] | null)}


/** Streaming cursor of the table "trust_network_status" */
export interface trust_network_status_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: trust_network_status_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface trust_network_status_stream_cursor_value_input {status?: (Scalars['String'] | null)}

export interface trust_network_status_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (trust_network_status_set_input | null),
/** filter the rows which have to be updated */
where?: trust_network_status_bool_exp}


/** Streaming cursor of the table "trust_network" */
export interface trust_network_stream_cursor_input {
/** Stream column input with initial value */
initial_value?: trust_network_stream_cursor_value_input,
/** cursor ordering */
ordering?: (cursor_ordering | null)}


/** Initial value of the column from where the streaming should start */
export interface trust_network_stream_cursor_value_input {account?: (Scalars['String'] | null),created_at?: (Scalars['timestamptz'] | null),is_mutual?: (Scalars['Boolean'] | null),trust?: (Scalars['String'] | null)}

export interface trust_network_updates {
/** sets the columns of the filtered rows to the given values */
_set?: (trust_network_set_input | null),
/** filter the rows which have to be updated */
where?: trust_network_bool_exp}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export interface uuid_comparison_exp {_eq?: (Scalars['uuid'] | null),_gt?: (Scalars['uuid'] | null),_gte?: (Scalars['uuid'] | null),_in?: (Scalars['uuid'][] | null),_is_null?: (Scalars['Boolean'] | null),_lt?: (Scalars['uuid'] | null),_lte?: (Scalars['uuid'] | null),_neq?: (Scalars['uuid'] | null),_nin?: (Scalars['uuid'][] | null)}

export type QueryGenqlSelection = query_rootGenqlSelection
export type MutationGenqlSelection = mutation_rootGenqlSelection
export type SubscriptionGenqlSelection = subscription_rootGenqlSelection


    const accounts_information_possibleTypes: string[] = ['accounts_information']
    export const isaccounts_information = (obj?: { __typename?: any } | null): obj is accounts_information => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information"')
      return accounts_information_possibleTypes.includes(obj.__typename)
    }
    


    const accounts_information_aggregate_possibleTypes: string[] = ['accounts_information_aggregate']
    export const isaccounts_information_aggregate = (obj?: { __typename?: any } | null): obj is accounts_information_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information_aggregate"')
      return accounts_information_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const accounts_information_aggregate_fields_possibleTypes: string[] = ['accounts_information_aggregate_fields']
    export const isaccounts_information_aggregate_fields = (obj?: { __typename?: any } | null): obj is accounts_information_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information_aggregate_fields"')
      return accounts_information_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const accounts_information_max_fields_possibleTypes: string[] = ['accounts_information_max_fields']
    export const isaccounts_information_max_fields = (obj?: { __typename?: any } | null): obj is accounts_information_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information_max_fields"')
      return accounts_information_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const accounts_information_min_fields_possibleTypes: string[] = ['accounts_information_min_fields']
    export const isaccounts_information_min_fields = (obj?: { __typename?: any } | null): obj is accounts_information_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information_min_fields"')
      return accounts_information_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const accounts_information_mutation_response_possibleTypes: string[] = ['accounts_information_mutation_response']
    export const isaccounts_information_mutation_response = (obj?: { __typename?: any } | null): obj is accounts_information_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isaccounts_information_mutation_response"')
      return accounts_information_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const devices_possibleTypes: string[] = ['devices']
    export const isdevices = (obj?: { __typename?: any } | null): obj is devices => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices"')
      return devices_possibleTypes.includes(obj.__typename)
    }
    


    const devices_aggregate_possibleTypes: string[] = ['devices_aggregate']
    export const isdevices_aggregate = (obj?: { __typename?: any } | null): obj is devices_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices_aggregate"')
      return devices_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const devices_aggregate_fields_possibleTypes: string[] = ['devices_aggregate_fields']
    export const isdevices_aggregate_fields = (obj?: { __typename?: any } | null): obj is devices_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices_aggregate_fields"')
      return devices_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const devices_max_fields_possibleTypes: string[] = ['devices_max_fields']
    export const isdevices_max_fields = (obj?: { __typename?: any } | null): obj is devices_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices_max_fields"')
      return devices_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const devices_min_fields_possibleTypes: string[] = ['devices_min_fields']
    export const isdevices_min_fields = (obj?: { __typename?: any } | null): obj is devices_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices_min_fields"')
      return devices_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const devices_mutation_response_possibleTypes: string[] = ['devices_mutation_response']
    export const isdevices_mutation_response = (obj?: { __typename?: any } | null): obj is devices_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isdevices_mutation_response"')
      return devices_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const messages_possibleTypes: string[] = ['messages']
    export const ismessages = (obj?: { __typename?: any } | null): obj is messages => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages"')
      return messages_possibleTypes.includes(obj.__typename)
    }
    


    const messages_aggregate_possibleTypes: string[] = ['messages_aggregate']
    export const ismessages_aggregate = (obj?: { __typename?: any } | null): obj is messages_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages_aggregate"')
      return messages_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const messages_aggregate_fields_possibleTypes: string[] = ['messages_aggregate_fields']
    export const ismessages_aggregate_fields = (obj?: { __typename?: any } | null): obj is messages_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages_aggregate_fields"')
      return messages_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const messages_max_fields_possibleTypes: string[] = ['messages_max_fields']
    export const ismessages_max_fields = (obj?: { __typename?: any } | null): obj is messages_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages_max_fields"')
      return messages_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const messages_min_fields_possibleTypes: string[] = ['messages_min_fields']
    export const ismessages_min_fields = (obj?: { __typename?: any } | null): obj is messages_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages_min_fields"')
      return messages_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const messages_mutation_response_possibleTypes: string[] = ['messages_mutation_response']
    export const ismessages_mutation_response = (obj?: { __typename?: any } | null): obj is messages_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismessages_mutation_response"')
      return messages_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_possibleTypes: string[] = ['migrate_device']
    export const ismigrate_device = (obj?: { __typename?: any } | null): obj is migrate_device => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device"')
      return migrate_device_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_aggregate_possibleTypes: string[] = ['migrate_device_aggregate']
    export const ismigrate_device_aggregate = (obj?: { __typename?: any } | null): obj is migrate_device_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device_aggregate"')
      return migrate_device_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_aggregate_fields_possibleTypes: string[] = ['migrate_device_aggregate_fields']
    export const ismigrate_device_aggregate_fields = (obj?: { __typename?: any } | null): obj is migrate_device_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device_aggregate_fields"')
      return migrate_device_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_max_fields_possibleTypes: string[] = ['migrate_device_max_fields']
    export const ismigrate_device_max_fields = (obj?: { __typename?: any } | null): obj is migrate_device_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device_max_fields"')
      return migrate_device_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_min_fields_possibleTypes: string[] = ['migrate_device_min_fields']
    export const ismigrate_device_min_fields = (obj?: { __typename?: any } | null): obj is migrate_device_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device_min_fields"')
      return migrate_device_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const migrate_device_mutation_response_possibleTypes: string[] = ['migrate_device_mutation_response']
    export const ismigrate_device_mutation_response = (obj?: { __typename?: any } | null): obj is migrate_device_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismigrate_device_mutation_response"')
      return migrate_device_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const mutation_root_possibleTypes: string[] = ['mutation_root']
    export const ismutation_root = (obj?: { __typename?: any } | null): obj is mutation_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ismutation_root"')
      return mutation_root_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_possibleTypes: string[] = ['notifications']
    export const isnotifications = (obj?: { __typename?: any } | null): obj is notifications => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications"')
      return notifications_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_aggregate_possibleTypes: string[] = ['notifications_aggregate']
    export const isnotifications_aggregate = (obj?: { __typename?: any } | null): obj is notifications_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications_aggregate"')
      return notifications_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_aggregate_fields_possibleTypes: string[] = ['notifications_aggregate_fields']
    export const isnotifications_aggregate_fields = (obj?: { __typename?: any } | null): obj is notifications_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications_aggregate_fields"')
      return notifications_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_max_fields_possibleTypes: string[] = ['notifications_max_fields']
    export const isnotifications_max_fields = (obj?: { __typename?: any } | null): obj is notifications_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications_max_fields"')
      return notifications_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_min_fields_possibleTypes: string[] = ['notifications_min_fields']
    export const isnotifications_min_fields = (obj?: { __typename?: any } | null): obj is notifications_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications_min_fields"')
      return notifications_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const notifications_mutation_response_possibleTypes: string[] = ['notifications_mutation_response']
    export const isnotifications_mutation_response = (obj?: { __typename?: any } | null): obj is notifications_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isnotifications_mutation_response"')
      return notifications_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offer_output_possibleTypes: string[] = ['p2p_offer_output']
    export const isp2p_offer_output = (obj?: { __typename?: any } | null): obj is p2p_offer_output => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offer_output"')
      return p2p_offer_output_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_possibleTypes: string[] = ['p2p_offers']
    export const isp2p_offers = (obj?: { __typename?: any } | null): obj is p2p_offers => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers"')
      return p2p_offers_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_aggregate_possibleTypes: string[] = ['p2p_offers_aggregate']
    export const isp2p_offers_aggregate = (obj?: { __typename?: any } | null): obj is p2p_offers_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers_aggregate"')
      return p2p_offers_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_aggregate_fields_possibleTypes: string[] = ['p2p_offers_aggregate_fields']
    export const isp2p_offers_aggregate_fields = (obj?: { __typename?: any } | null): obj is p2p_offers_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers_aggregate_fields"')
      return p2p_offers_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_max_fields_possibleTypes: string[] = ['p2p_offers_max_fields']
    export const isp2p_offers_max_fields = (obj?: { __typename?: any } | null): obj is p2p_offers_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers_max_fields"')
      return p2p_offers_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_min_fields_possibleTypes: string[] = ['p2p_offers_min_fields']
    export const isp2p_offers_min_fields = (obj?: { __typename?: any } | null): obj is p2p_offers_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers_min_fields"')
      return p2p_offers_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const p2p_offers_mutation_response_possibleTypes: string[] = ['p2p_offers_mutation_response']
    export const isp2p_offers_mutation_response = (obj?: { __typename?: any } | null): obj is p2p_offers_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isp2p_offers_mutation_response"')
      return p2p_offers_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_possibleTypes: string[] = ['preferences']
    export const ispreferences = (obj?: { __typename?: any } | null): obj is preferences => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences"')
      return preferences_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_aggregate_possibleTypes: string[] = ['preferences_aggregate']
    export const ispreferences_aggregate = (obj?: { __typename?: any } | null): obj is preferences_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences_aggregate"')
      return preferences_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_aggregate_fields_possibleTypes: string[] = ['preferences_aggregate_fields']
    export const ispreferences_aggregate_fields = (obj?: { __typename?: any } | null): obj is preferences_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences_aggregate_fields"')
      return preferences_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_max_fields_possibleTypes: string[] = ['preferences_max_fields']
    export const ispreferences_max_fields = (obj?: { __typename?: any } | null): obj is preferences_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences_max_fields"')
      return preferences_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_min_fields_possibleTypes: string[] = ['preferences_min_fields']
    export const ispreferences_min_fields = (obj?: { __typename?: any } | null): obj is preferences_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences_min_fields"')
      return preferences_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const preferences_mutation_response_possibleTypes: string[] = ['preferences_mutation_response']
    export const ispreferences_mutation_response = (obj?: { __typename?: any } | null): obj is preferences_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "ispreferences_mutation_response"')
      return preferences_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const query_root_possibleTypes: string[] = ['query_root']
    export const isquery_root = (obj?: { __typename?: any } | null): obj is query_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isquery_root"')
      return query_root_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_possibleTypes: string[] = ['reg_accounts']
    export const isreg_accounts = (obj?: { __typename?: any } | null): obj is reg_accounts => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts"')
      return reg_accounts_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_aggregate_possibleTypes: string[] = ['reg_accounts_aggregate']
    export const isreg_accounts_aggregate = (obj?: { __typename?: any } | null): obj is reg_accounts_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts_aggregate"')
      return reg_accounts_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_aggregate_fields_possibleTypes: string[] = ['reg_accounts_aggregate_fields']
    export const isreg_accounts_aggregate_fields = (obj?: { __typename?: any } | null): obj is reg_accounts_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts_aggregate_fields"')
      return reg_accounts_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_max_fields_possibleTypes: string[] = ['reg_accounts_max_fields']
    export const isreg_accounts_max_fields = (obj?: { __typename?: any } | null): obj is reg_accounts_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts_max_fields"')
      return reg_accounts_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_min_fields_possibleTypes: string[] = ['reg_accounts_min_fields']
    export const isreg_accounts_min_fields = (obj?: { __typename?: any } | null): obj is reg_accounts_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts_min_fields"')
      return reg_accounts_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const reg_accounts_mutation_response_possibleTypes: string[] = ['reg_accounts_mutation_response']
    export const isreg_accounts_mutation_response = (obj?: { __typename?: any } | null): obj is reg_accounts_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isreg_accounts_mutation_response"')
      return reg_accounts_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const request_new_account_output_possibleTypes: string[] = ['request_new_account_output']
    export const isrequest_new_account_output = (obj?: { __typename?: any } | null): obj is request_new_account_output => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isrequest_new_account_output"')
      return request_new_account_output_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_possibleTypes: string[] = ['signing_requests']
    export const issigning_requests = (obj?: { __typename?: any } | null): obj is signing_requests => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests"')
      return signing_requests_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_aggregate_possibleTypes: string[] = ['signing_requests_aggregate']
    export const issigning_requests_aggregate = (obj?: { __typename?: any } | null): obj is signing_requests_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests_aggregate"')
      return signing_requests_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_aggregate_fields_possibleTypes: string[] = ['signing_requests_aggregate_fields']
    export const issigning_requests_aggregate_fields = (obj?: { __typename?: any } | null): obj is signing_requests_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests_aggregate_fields"')
      return signing_requests_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_max_fields_possibleTypes: string[] = ['signing_requests_max_fields']
    export const issigning_requests_max_fields = (obj?: { __typename?: any } | null): obj is signing_requests_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests_max_fields"')
      return signing_requests_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_min_fields_possibleTypes: string[] = ['signing_requests_min_fields']
    export const issigning_requests_min_fields = (obj?: { __typename?: any } | null): obj is signing_requests_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests_min_fields"')
      return signing_requests_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const signing_requests_mutation_response_possibleTypes: string[] = ['signing_requests_mutation_response']
    export const issigning_requests_mutation_response = (obj?: { __typename?: any } | null): obj is signing_requests_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issigning_requests_mutation_response"')
      return signing_requests_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const subscription_root_possibleTypes: string[] = ['subscription_root']
    export const issubscription_root = (obj?: { __typename?: any } | null): obj is subscription_root => {
      if (!obj?.__typename) throw new Error('__typename is missing in "issubscription_root"')
      return subscription_root_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_possibleTypes: string[] = ['swap_assets']
    export const isswap_assets = (obj?: { __typename?: any } | null): obj is swap_assets => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets"')
      return swap_assets_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_aggregate_possibleTypes: string[] = ['swap_assets_aggregate']
    export const isswap_assets_aggregate = (obj?: { __typename?: any } | null): obj is swap_assets_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets_aggregate"')
      return swap_assets_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_aggregate_fields_possibleTypes: string[] = ['swap_assets_aggregate_fields']
    export const isswap_assets_aggregate_fields = (obj?: { __typename?: any } | null): obj is swap_assets_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets_aggregate_fields"')
      return swap_assets_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_max_fields_possibleTypes: string[] = ['swap_assets_max_fields']
    export const isswap_assets_max_fields = (obj?: { __typename?: any } | null): obj is swap_assets_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets_max_fields"')
      return swap_assets_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_min_fields_possibleTypes: string[] = ['swap_assets_min_fields']
    export const isswap_assets_min_fields = (obj?: { __typename?: any } | null): obj is swap_assets_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets_min_fields"')
      return swap_assets_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_assets_mutation_response_possibleTypes: string[] = ['swap_assets_mutation_response']
    export const isswap_assets_mutation_response = (obj?: { __typename?: any } | null): obj is swap_assets_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_assets_mutation_response"')
      return swap_assets_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_possibleTypes: string[] = ['swap_orders']
    export const isswap_orders = (obj?: { __typename?: any } | null): obj is swap_orders => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders"')
      return swap_orders_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_aggregate_possibleTypes: string[] = ['swap_orders_aggregate']
    export const isswap_orders_aggregate = (obj?: { __typename?: any } | null): obj is swap_orders_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_aggregate"')
      return swap_orders_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_aggregate_fields_possibleTypes: string[] = ['swap_orders_aggregate_fields']
    export const isswap_orders_aggregate_fields = (obj?: { __typename?: any } | null): obj is swap_orders_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_aggregate_fields"')
      return swap_orders_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_avg_fields_possibleTypes: string[] = ['swap_orders_avg_fields']
    export const isswap_orders_avg_fields = (obj?: { __typename?: any } | null): obj is swap_orders_avg_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_avg_fields"')
      return swap_orders_avg_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_max_fields_possibleTypes: string[] = ['swap_orders_max_fields']
    export const isswap_orders_max_fields = (obj?: { __typename?: any } | null): obj is swap_orders_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_max_fields"')
      return swap_orders_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_min_fields_possibleTypes: string[] = ['swap_orders_min_fields']
    export const isswap_orders_min_fields = (obj?: { __typename?: any } | null): obj is swap_orders_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_min_fields"')
      return swap_orders_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_mutation_response_possibleTypes: string[] = ['swap_orders_mutation_response']
    export const isswap_orders_mutation_response = (obj?: { __typename?: any } | null): obj is swap_orders_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_mutation_response"')
      return swap_orders_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_stddev_fields_possibleTypes: string[] = ['swap_orders_stddev_fields']
    export const isswap_orders_stddev_fields = (obj?: { __typename?: any } | null): obj is swap_orders_stddev_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_stddev_fields"')
      return swap_orders_stddev_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_stddev_pop_fields_possibleTypes: string[] = ['swap_orders_stddev_pop_fields']
    export const isswap_orders_stddev_pop_fields = (obj?: { __typename?: any } | null): obj is swap_orders_stddev_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_stddev_pop_fields"')
      return swap_orders_stddev_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_stddev_samp_fields_possibleTypes: string[] = ['swap_orders_stddev_samp_fields']
    export const isswap_orders_stddev_samp_fields = (obj?: { __typename?: any } | null): obj is swap_orders_stddev_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_stddev_samp_fields"')
      return swap_orders_stddev_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_sum_fields_possibleTypes: string[] = ['swap_orders_sum_fields']
    export const isswap_orders_sum_fields = (obj?: { __typename?: any } | null): obj is swap_orders_sum_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_sum_fields"')
      return swap_orders_sum_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_var_pop_fields_possibleTypes: string[] = ['swap_orders_var_pop_fields']
    export const isswap_orders_var_pop_fields = (obj?: { __typename?: any } | null): obj is swap_orders_var_pop_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_var_pop_fields"')
      return swap_orders_var_pop_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_var_samp_fields_possibleTypes: string[] = ['swap_orders_var_samp_fields']
    export const isswap_orders_var_samp_fields = (obj?: { __typename?: any } | null): obj is swap_orders_var_samp_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_var_samp_fields"')
      return swap_orders_var_samp_fields_possibleTypes.includes(obj.__typename)
    }
    


    const swap_orders_variance_fields_possibleTypes: string[] = ['swap_orders_variance_fields']
    export const isswap_orders_variance_fields = (obj?: { __typename?: any } | null): obj is swap_orders_variance_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isswap_orders_variance_fields"')
      return swap_orders_variance_fields_possibleTypes.includes(obj.__typename)
    }
    


    const toggle_trust_network_output_possibleTypes: string[] = ['toggle_trust_network_output']
    export const istoggle_trust_network_output = (obj?: { __typename?: any } | null): obj is toggle_trust_network_output => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istoggle_trust_network_output"')
      return toggle_trust_network_output_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_possibleTypes: string[] = ['trust_network']
    export const istrust_network = (obj?: { __typename?: any } | null): obj is trust_network => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network"')
      return trust_network_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_aggregate_possibleTypes: string[] = ['trust_network_aggregate']
    export const istrust_network_aggregate = (obj?: { __typename?: any } | null): obj is trust_network_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_aggregate"')
      return trust_network_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_aggregate_fields_possibleTypes: string[] = ['trust_network_aggregate_fields']
    export const istrust_network_aggregate_fields = (obj?: { __typename?: any } | null): obj is trust_network_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_aggregate_fields"')
      return trust_network_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_max_fields_possibleTypes: string[] = ['trust_network_max_fields']
    export const istrust_network_max_fields = (obj?: { __typename?: any } | null): obj is trust_network_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_max_fields"')
      return trust_network_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_min_fields_possibleTypes: string[] = ['trust_network_min_fields']
    export const istrust_network_min_fields = (obj?: { __typename?: any } | null): obj is trust_network_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_min_fields"')
      return trust_network_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_mutation_response_possibleTypes: string[] = ['trust_network_mutation_response']
    export const istrust_network_mutation_response = (obj?: { __typename?: any } | null): obj is trust_network_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_mutation_response"')
      return trust_network_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_possibleTypes: string[] = ['trust_network_notification']
    export const istrust_network_notification = (obj?: { __typename?: any } | null): obj is trust_network_notification => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification"')
      return trust_network_notification_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_aggregate_possibleTypes: string[] = ['trust_network_notification_aggregate']
    export const istrust_network_notification_aggregate = (obj?: { __typename?: any } | null): obj is trust_network_notification_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification_aggregate"')
      return trust_network_notification_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_aggregate_fields_possibleTypes: string[] = ['trust_network_notification_aggregate_fields']
    export const istrust_network_notification_aggregate_fields = (obj?: { __typename?: any } | null): obj is trust_network_notification_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification_aggregate_fields"')
      return trust_network_notification_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_max_fields_possibleTypes: string[] = ['trust_network_notification_max_fields']
    export const istrust_network_notification_max_fields = (obj?: { __typename?: any } | null): obj is trust_network_notification_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification_max_fields"')
      return trust_network_notification_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_min_fields_possibleTypes: string[] = ['trust_network_notification_min_fields']
    export const istrust_network_notification_min_fields = (obj?: { __typename?: any } | null): obj is trust_network_notification_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification_min_fields"')
      return trust_network_notification_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_notification_mutation_response_possibleTypes: string[] = ['trust_network_notification_mutation_response']
    export const istrust_network_notification_mutation_response = (obj?: { __typename?: any } | null): obj is trust_network_notification_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_notification_mutation_response"')
      return trust_network_notification_mutation_response_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_output_possibleTypes: string[] = ['trust_network_output']
    export const istrust_network_output = (obj?: { __typename?: any } | null): obj is trust_network_output => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_output"')
      return trust_network_output_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_possibleTypes: string[] = ['trust_network_status']
    export const istrust_network_status = (obj?: { __typename?: any } | null): obj is trust_network_status => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status"')
      return trust_network_status_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_aggregate_possibleTypes: string[] = ['trust_network_status_aggregate']
    export const istrust_network_status_aggregate = (obj?: { __typename?: any } | null): obj is trust_network_status_aggregate => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status_aggregate"')
      return trust_network_status_aggregate_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_aggregate_fields_possibleTypes: string[] = ['trust_network_status_aggregate_fields']
    export const istrust_network_status_aggregate_fields = (obj?: { __typename?: any } | null): obj is trust_network_status_aggregate_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status_aggregate_fields"')
      return trust_network_status_aggregate_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_max_fields_possibleTypes: string[] = ['trust_network_status_max_fields']
    export const istrust_network_status_max_fields = (obj?: { __typename?: any } | null): obj is trust_network_status_max_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status_max_fields"')
      return trust_network_status_max_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_min_fields_possibleTypes: string[] = ['trust_network_status_min_fields']
    export const istrust_network_status_min_fields = (obj?: { __typename?: any } | null): obj is trust_network_status_min_fields => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status_min_fields"')
      return trust_network_status_min_fields_possibleTypes.includes(obj.__typename)
    }
    


    const trust_network_status_mutation_response_possibleTypes: string[] = ['trust_network_status_mutation_response']
    export const istrust_network_status_mutation_response = (obj?: { __typename?: any } | null): obj is trust_network_status_mutation_response => {
      if (!obj?.__typename) throw new Error('__typename is missing in "istrust_network_status_mutation_response"')
      return trust_network_status_mutation_response_possibleTypes.includes(obj.__typename)
    }
    

export const enumAccountsInformationConstraint = {
   accounts_information_account_key: 'accounts_information_account_key' as const,
   accounts_information_id_key: 'accounts_information_id_key' as const,
   accounts_information_pkey: 'accounts_information_pkey' as const
}

export const enumAccountsInformationSelectColumn = {
   account: 'account' as const,
   email: 'email' as const,
   id: 'id' as const,
   newsletter_subscription: 'newsletter_subscription' as const,
   phone: 'phone' as const,
   recovery_partners: 'recovery_partners' as const
}

export const enumAccountsInformationSelectColumnAccountsInformationAggregateBoolExpBoolAndArgumentsColumns = {
   newsletter_subscription: 'newsletter_subscription' as const
}

export const enumAccountsInformationSelectColumnAccountsInformationAggregateBoolExpBoolOrArgumentsColumns = {
   newsletter_subscription: 'newsletter_subscription' as const
}

export const enumAccountsInformationUpdateColumn = {
   account: 'account' as const,
   email: 'email' as const,
   id: 'id' as const,
   newsletter_subscription: 'newsletter_subscription' as const,
   phone: 'phone' as const,
   recovery_partners: 'recovery_partners' as const
}

export const enumCursorOrdering = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}

export const enumDevicesConstraint = {
   devices_pkey: 'devices_pkey' as const
}

export const enumDevicesSelectColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   public_key: 'public_key' as const
}

export const enumDevicesUpdateColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   public_key: 'public_key' as const
}

export const enumMessagesConstraint = {
   messages_pkey: 'messages_pkey' as const
}

export const enumMessagesSelectColumn = {
   from: 'from' as const,
   id: 'id' as const,
   message: 'message' as const,
   p2p_id: 'p2p_id' as const,
   support_id: 'support_id' as const,
   timestamp: 'timestamp' as const,
   to: 'to' as const
}

export const enumMessagesUpdateColumn = {
   from: 'from' as const,
   id: 'id' as const,
   message: 'message' as const,
   p2p_id: 'p2p_id' as const,
   support_id: 'support_id' as const,
   timestamp: 'timestamp' as const,
   to: 'to' as const
}

export const enumMigrateDeviceConstraint = {
   migrate_device_pkey: 'migrate_device_pkey' as const
}

export const enumMigrateDeviceSelectColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   public_key: 'public_key' as const
}

export const enumMigrateDeviceUpdateColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   public_key: 'public_key' as const
}

export const enumNotificationsConstraint = {
   notifications_pkey: 'notifications_pkey' as const
}

export const enumNotificationsSelectColumn = {
   content_id: 'content_id' as const,
   created_at: 'created_at' as const,
   from: 'from' as const,
   id: 'id' as const,
   read: 'read' as const,
   to: 'to' as const,
   type: 'type' as const
}

export const enumNotificationsSelectColumnNotificationsAggregateBoolExpBoolAndArgumentsColumns = {
   read: 'read' as const
}

export const enumNotificationsSelectColumnNotificationsAggregateBoolExpBoolOrArgumentsColumns = {
   read: 'read' as const
}

export const enumNotificationsUpdateColumn = {
   content_id: 'content_id' as const,
   created_at: 'created_at' as const,
   from: 'from' as const,
   id: 'id' as const,
   read: 'read' as const,
   to: 'to' as const,
   type: 'type' as const
}

export const enumOrderBy = {
   asc: 'asc' as const,
   asc_nulls_first: 'asc_nulls_first' as const,
   asc_nulls_last: 'asc_nulls_last' as const,
   desc: 'desc' as const,
   desc_nulls_first: 'desc_nulls_first' as const,
   desc_nulls_last: 'desc_nulls_last' as const
}

export const enumP2POffersConstraint = {
   p2p_offers_id_key: 'p2p_offers_id_key' as const,
   p2p_offers_pkey: 'p2p_offers_pkey' as const
}

export const enumP2POffersSelectColumn = {
   amount: 'amount' as const,
   masterbotsbank_id: 'masterbotsbank_id' as const,
   buyer: 'buyer' as const,
   buyer_confirmed_payment: 'buyer_confirmed_payment' as const,
   buyer_method_details: 'buyer_method_details' as const,
   cancelled: 'cancelled' as const,
   cancelled_by: 'cancelled_by' as const,
   completed: 'completed' as const,
   created_at: 'created_at' as const,
   id: 'id' as const,
   initiator: 'initiator' as const,
   matched: 'matched' as const,
   method: 'method' as const,
   region: 'region' as const,
   seller: 'seller' as const,
   seller_confirmed_payment: 'seller_confirmed_payment' as const,
   seller_method_details: 'seller_method_details' as const,
   type: 'type' as const,
   updated_at: 'updated_at' as const
}

export const enumP2POffersSelectColumnP2POffersAggregateBoolExpBoolAndArgumentsColumns = {
   buyer_confirmed_payment: 'buyer_confirmed_payment' as const,
   cancelled: 'cancelled' as const,
   completed: 'completed' as const,
   matched: 'matched' as const,
   seller_confirmed_payment: 'seller_confirmed_payment' as const
}

export const enumP2POffersSelectColumnP2POffersAggregateBoolExpBoolOrArgumentsColumns = {
   buyer_confirmed_payment: 'buyer_confirmed_payment' as const,
   cancelled: 'cancelled' as const,
   completed: 'completed' as const,
   matched: 'matched' as const,
   seller_confirmed_payment: 'seller_confirmed_payment' as const
}

export const enumP2POffersUpdateColumn = {
   amount: 'amount' as const,
   masterbotsbank_id: 'masterbotsbank_id' as const,
   buyer: 'buyer' as const,
   buyer_confirmed_payment: 'buyer_confirmed_payment' as const,
   buyer_method_details: 'buyer_method_details' as const,
   cancelled: 'cancelled' as const,
   cancelled_by: 'cancelled_by' as const,
   completed: 'completed' as const,
   created_at: 'created_at' as const,
   id: 'id' as const,
   initiator: 'initiator' as const,
   matched: 'matched' as const,
   method: 'method' as const,
   region: 'region' as const,
   seller: 'seller' as const,
   seller_confirmed_payment: 'seller_confirmed_payment' as const,
   seller_method_details: 'seller_method_details' as const,
   type: 'type' as const,
   updated_at: 'updated_at' as const
}

export const enumPreferencesConstraint = {
   preferences_pkey: 'preferences_pkey' as const
}

export const enumPreferencesSelectColumn = {
   account: 'account' as const,
   currency: 'currency' as const,
   language: 'language' as const,
   notifications: 'notifications' as const,
   personalized: 'personalized' as const,
   region: 'region' as const,
   secondary_currency: 'secondary_currency' as const,
   theme: 'theme' as const
}

export const enumPreferencesUpdateColumn = {
   account: 'account' as const,
   currency: 'currency' as const,
   language: 'language' as const,
   notifications: 'notifications' as const,
   personalized: 'personalized' as const,
   region: 'region' as const,
   secondary_currency: 'secondary_currency' as const,
   theme: 'theme' as const
}

export const enumRegAccountsConstraint = {
   accounts_pkey: 'accounts_pkey' as const,
   reg_accounts_account_key: 'reg_accounts_account_key' as const
}

export const enumRegAccountsSelectColumn = {
   account: 'account' as const,
   create_account: 'create_account' as const,
   created: 'created' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   id: 'id' as const,
   onboarded: 'onboarded' as const,
   public_key: 'public_key' as const,
   referrer: 'referrer' as const,
   txid: 'txid' as const
}

export const enumRegAccountsUpdateColumn = {
   account: 'account' as const,
   create_account: 'create_account' as const,
   created: 'created' as const,
   created_at: 'created_at' as const,
   cred_id: 'cred_id' as const,
   device_name: 'device_name' as const,
   id: 'id' as const,
   onboarded: 'onboarded' as const,
   public_key: 'public_key' as const,
   referrer: 'referrer' as const,
   txid: 'txid' as const
}

export const enumSigningRequestsConstraint = {
   signing_requests_pkey: 'signing_requests_pkey' as const
}

export const enumSigningRequestsSelectColumn = {
   createdAt: 'createdAt' as const,
   esr: 'esr' as const,
   id: 'id' as const,
   signature: 'signature' as const,
   signer: 'signer' as const,
   status: 'status' as const,
   transactionId: 'transactionId' as const,
   updatedAt: 'updatedAt' as const
}

export const enumSigningRequestsUpdateColumn = {
   createdAt: 'createdAt' as const,
   esr: 'esr' as const,
   id: 'id' as const,
   signature: 'signature' as const,
   signer: 'signer' as const,
   status: 'status' as const,
   transactionId: 'transactionId' as const,
   updatedAt: 'updatedAt' as const
}

export const enumSwapAssetsConstraint = {
   swap_assets_pkey: 'swap_assets_pkey' as const
}

export const enumSwapAssetsSelectColumn = {
   active_swaps: 'active_swaps' as const,
   asset: 'asset' as const,
   asset_name: 'asset_name' as const,
   chain: 'chain' as const,
   wallet_address: 'wallet_address' as const
}

export const enumSwapAssetsUpdateColumn = {
   active_swaps: 'active_swaps' as const,
   asset: 'asset' as const,
   asset_name: 'asset_name' as const,
   chain: 'chain' as const,
   wallet_address: 'wallet_address' as const
}

export const enumSwapOrdersConstraint = {
   swap_orders_pkey: 'swap_orders_pkey' as const
}

export const enumSwapOrdersSelectColumn = {
   asset: 'asset' as const,
   asset_amount: 'asset_amount' as const,
   masterbots_account: 'masterbots_account' as const,
   masterbots_amount: 'masterbots_amount' as const,
   masterbots_currency: 'masterbots_currency' as const,
   masterbots_trx: 'masterbots_trx' as const,
   created_at: 'created_at' as const,
   gems_id: 'gems_id' as const,
   id: 'id' as const,
   order_status: 'order_status' as const,
   order_type: 'order_type' as const,
   price: 'price' as const,
   updated_at: 'updated_at' as const,
   wallet_address: 'wallet_address' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpAvgArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpCorrArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpCovarSampArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpMaxArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpMinArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpStddevSampArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpSumArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersSelectColumnSwapOrdersAggregateBoolExpVarSampArgumentsColumns = {
   asset_amount: 'asset_amount' as const,
   masterbots_amount: 'masterbots_amount' as const,
   price: 'price' as const
}

export const enumSwapOrdersUpdateColumn = {
   asset: 'asset' as const,
   asset_amount: 'asset_amount' as const,
   masterbots_account: 'masterbots_account' as const,
   masterbots_amount: 'masterbots_amount' as const,
   masterbots_currency: 'masterbots_currency' as const,
   masterbots_trx: 'masterbots_trx' as const,
   created_at: 'created_at' as const,
   gems_id: 'gems_id' as const,
   id: 'id' as const,
   order_status: 'order_status' as const,
   order_type: 'order_type' as const,
   price: 'price' as const,
   updated_at: 'updated_at' as const,
   wallet_address: 'wallet_address' as const
}

export const enumTrustNetworkConstraint = {
   trust_network_pkey: 'trust_network_pkey' as const
}

export const enumTrustNetworkNotificationConstraint = {
   trust_network_notification_pkey: 'trust_network_notification_pkey' as const
}

export const enumTrustNetworkNotificationSelectColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   trust: 'trust' as const
}

export const enumTrustNetworkNotificationUpdateColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   trust: 'trust' as const
}

export const enumTrustNetworkSelectColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   is_mutual: 'is_mutual' as const,
   trust: 'trust' as const
}

export const enumTrustNetworkSelectColumnTrustNetworkAggregateBoolExpBoolAndArgumentsColumns = {
   is_mutual: 'is_mutual' as const
}

export const enumTrustNetworkSelectColumnTrustNetworkAggregateBoolExpBoolOrArgumentsColumns = {
   is_mutual: 'is_mutual' as const
}

export const enumTrustNetworkStatusConstraint = {
   trusted_network_status_pkey: 'trusted_network_status_pkey' as const
}

export const enumTrustNetworkStatusSelectColumn = {
   status: 'status' as const
}

export const enumTrustNetworkStatusUpdateColumn = {
   status: 'status' as const
}

export const enumTrustNetworkUpdateColumn = {
   account: 'account' as const,
   created_at: 'created_at' as const,
   is_mutual: 'is_mutual' as const,
   trust: 'trust' as const
}
