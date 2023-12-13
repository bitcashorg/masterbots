export default {
    "scalars": [
        0,
        2,
        3,
        5,
        18,
        33,
        34,
        35,
        39,
        43,
        52,
        62,
        66,
        68,
        70,
        83,
        93,
        97,
        103,
        111,
        115,
        127,
        137,
        138,
        139,
        143,
        145,
        157,
        168,
        169,
        170,
        174,
        181,
        193,
        197,
        203,
        212,
        216,
        224,
        232,
        236,
        242,
        250,
        254,
        276,
        287,
        288,
        289,
        290,
        291,
        292,
        293,
        294,
        295,
        307,
        315,
        317,
        331,
        346,
        356,
        360,
        366,
        367,
        368,
        374,
        382,
        386,
        390,
        392
    ],
    "types": {
        "Boolean": {},
        "Boolean_comparison_exp": {
            "_eq": [
                0
            ],
            "_gt": [
                0
            ],
            "_gte": [
                0
            ],
            "_in": [
                0
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                0
            ],
            "_lte": [
                0
            ],
            "_neq": [
                0
            ],
            "_nin": [
                0
            ],
            "__typename": [
                5
            ]
        },
        "Float": {},
        "Int": {},
        "Int_comparison_exp": {
            "_eq": [
                3
            ],
            "_gt": [
                3
            ],
            "_gte": [
                3
            ],
            "_in": [
                3
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                3
            ],
            "_lte": [
                3
            ],
            "_neq": [
                3
            ],
            "_nin": [
                3
            ],
            "__typename": [
                5
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                5
            ],
            "_gt": [
                5
            ],
            "_gte": [
                5
            ],
            "_ilike": [
                5
            ],
            "_in": [
                5
            ],
            "_iregex": [
                5
            ],
            "_is_null": [
                0
            ],
            "_like": [
                5
            ],
            "_lt": [
                5
            ],
            "_lte": [
                5
            ],
            "_neq": [
                5
            ],
            "_nilike": [
                5
            ],
            "_nin": [
                5
            ],
            "_niregex": [
                5
            ],
            "_nlike": [
                5
            ],
            "_nregex": [
                5
            ],
            "_nsimilar": [
                5
            ],
            "_regex": [
                5
            ],
            "_similar": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "newsletter_subscription": [
                0
            ],
            "phone": [
                5
            ],
            "recovery_partners": [
                70,
                {
                    "path": [
                        5
                    ]
                }
            ],
            "reg_account": [
                199
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate": {
            "aggregate": [
                13
            ],
            "nodes": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_bool_exp": {
            "bool_and": [
                10
            ],
            "bool_or": [
                11
            ],
            "count": [
                12
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_bool_exp_bool_and": {
            "arguments": [
                34
            ],
            "distinct": [
                0
            ],
            "filter": [
                17
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_bool_exp_bool_or": {
            "arguments": [
                35
            ],
            "distinct": [
                0
            ],
            "filter": [
                17
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_bool_exp_count": {
            "arguments": [
                33
            ],
            "distinct": [
                0
            ],
            "filter": [
                17
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                23
            ],
            "min": [
                25
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                24
            ],
            "min": [
                26
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_append_input": {
            "recovery_partners": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_arr_rel_insert_input": {
            "data": [
                22
            ],
            "on_conflict": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_bool_exp": {
            "_and": [
                17
            ],
            "_not": [
                17
            ],
            "_or": [
                17
            ],
            "account": [
                6
            ],
            "email": [
                6
            ],
            "id": [
                393
            ],
            "newsletter_subscription": [
                1
            ],
            "phone": [
                6
            ],
            "recovery_partners": [
                72
            ],
            "reg_account": [
                202
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_constraint": {},
        "accounts_information_delete_at_path_input": {
            "recovery_partners": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_delete_elem_input": {
            "recovery_partners": [
                3
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_delete_key_input": {
            "recovery_partners": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_insert_input": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "newsletter_subscription": [
                0
            ],
            "phone": [
                5
            ],
            "recovery_partners": [
                70
            ],
            "reg_account": [
                208
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_max_fields": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "phone": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_max_order_by": {
            "account": [
                145
            ],
            "email": [
                145
            ],
            "id": [
                145
            ],
            "phone": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_min_fields": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "phone": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_min_order_by": {
            "account": [
                145
            ],
            "email": [
                145
            ],
            "id": [
                145
            ],
            "phone": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_obj_rel_insert_input": {
            "data": [
                22
            ],
            "on_conflict": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_on_conflict": {
            "constraint": [
                18
            ],
            "update_columns": [
                39
            ],
            "where": [
                17
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_order_by": {
            "account": [
                145
            ],
            "email": [
                145
            ],
            "id": [
                145
            ],
            "newsletter_subscription": [
                145
            ],
            "phone": [
                145
            ],
            "recovery_partners": [
                145
            ],
            "reg_account": [
                210
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_pk_columns_input": {
            "account": [
                5
            ],
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_prepend_input": {
            "recovery_partners": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_select_column": {},
        "accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_and_arguments_columns": {},
        "accounts_information_select_column_accounts_information_aggregate_bool_exp_bool_or_arguments_columns": {},
        "accounts_information_set_input": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "newsletter_subscription": [
                0
            ],
            "phone": [
                5
            ],
            "recovery_partners": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_stream_cursor_input": {
            "initial_value": [
                38
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_stream_cursor_value_input": {
            "account": [
                5
            ],
            "email": [
                5
            ],
            "id": [
                392
            ],
            "newsletter_subscription": [
                0
            ],
            "phone": [
                5
            ],
            "recovery_partners": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "accounts_information_update_column": {},
        "accounts_information_updates": {
            "_append": [
                15
            ],
            "_delete_at_path": [
                19
            ],
            "_delete_elem": [
                20
            ],
            "_delete_key": [
                21
            ],
            "_prepend": [
                32
            ],
            "_set": [
                36
            ],
            "where": [
                17
            ],
            "__typename": [
                5
            ]
        },
        "cancel_p2p_offer_input": {
            "cancelled_by": [
                5
            ],
            "id": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "confirm_p2p_offer_input": {
            "buyer": [
                5
            ],
            "completed": [
                0
            ],
            "id": [
                5
            ],
            "seller": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "cursor_ordering": {},
        "devices": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "reg_account": [
                199
            ],
            "__typename": [
                5
            ]
        },
        "devices_aggregate": {
            "aggregate": [
                48
            ],
            "nodes": [
                44
            ],
            "__typename": [
                5
            ]
        },
        "devices_aggregate_bool_exp": {
            "count": [
                47
            ],
            "__typename": [
                5
            ]
        },
        "devices_aggregate_bool_exp_count": {
            "arguments": [
                62
            ],
            "distinct": [
                0
            ],
            "filter": [
                51
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "devices_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                54
            ],
            "min": [
                56
            ],
            "__typename": [
                5
            ]
        },
        "devices_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                55
            ],
            "min": [
                57
            ],
            "__typename": [
                5
            ]
        },
        "devices_arr_rel_insert_input": {
            "data": [
                53
            ],
            "on_conflict": [
                59
            ],
            "__typename": [
                5
            ]
        },
        "devices_bool_exp": {
            "_and": [
                51
            ],
            "_not": [
                51
            ],
            "_or": [
                51
            ],
            "account": [
                6
            ],
            "created_at": [
                318
            ],
            "cred_id": [
                6
            ],
            "device_name": [
                6
            ],
            "public_key": [
                6
            ],
            "reg_account": [
                202
            ],
            "__typename": [
                5
            ]
        },
        "devices_constraint": {},
        "devices_insert_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "reg_account": [
                208
            ],
            "__typename": [
                5
            ]
        },
        "devices_max_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "devices_max_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "cred_id": [
                145
            ],
            "device_name": [
                145
            ],
            "public_key": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "devices_min_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "devices_min_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "cred_id": [
                145
            ],
            "device_name": [
                145
            ],
            "public_key": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "devices_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                44
            ],
            "__typename": [
                5
            ]
        },
        "devices_on_conflict": {
            "constraint": [
                52
            ],
            "update_columns": [
                66
            ],
            "where": [
                51
            ],
            "__typename": [
                5
            ]
        },
        "devices_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "cred_id": [
                145
            ],
            "device_name": [
                145
            ],
            "public_key": [
                145
            ],
            "reg_account": [
                210
            ],
            "__typename": [
                5
            ]
        },
        "devices_pk_columns_input": {
            "cred_id": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "devices_select_column": {},
        "devices_set_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "devices_stream_cursor_input": {
            "initial_value": [
                65
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "devices_stream_cursor_value_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "devices_update_column": {},
        "devices_updates": {
            "_set": [
                63
            ],
            "where": [
                51
            ],
            "__typename": [
                5
            ]
        },
        "float8": {},
        "float8_comparison_exp": {
            "_eq": [
                68
            ],
            "_gt": [
                68
            ],
            "_gte": [
                68
            ],
            "_in": [
                68
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                68
            ],
            "_lte": [
                68
            ],
            "_neq": [
                68
            ],
            "_nin": [
                68
            ],
            "__typename": [
                5
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                71
            ],
            "_contained_in": [
                70
            ],
            "_contains": [
                70
            ],
            "_eq": [
                70
            ],
            "_gt": [
                70
            ],
            "_gte": [
                70
            ],
            "_has_key": [
                5
            ],
            "_has_keys_all": [
                5
            ],
            "_has_keys_any": [
                5
            ],
            "_in": [
                70
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                70
            ],
            "_lte": [
                70
            ],
            "_neq": [
                70
            ],
            "_nin": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "make_p2p_buy_offer_input": {
            "amount": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_method_details": [
                5
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "make_p2p_sell_offer_input": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_method_details": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "p2p_offer": [
                147
            ],
            "regAccountByTo": [
                199
            ],
            "reg_account": [
                199
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_aggregate": {
            "aggregate": [
                79
            ],
            "nodes": [
                75
            ],
            "__typename": [
                5
            ]
        },
        "messages_aggregate_bool_exp": {
            "count": [
                78
            ],
            "__typename": [
                5
            ]
        },
        "messages_aggregate_bool_exp_count": {
            "arguments": [
                93
            ],
            "distinct": [
                0
            ],
            "filter": [
                82
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "messages_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                85
            ],
            "min": [
                87
            ],
            "__typename": [
                5
            ]
        },
        "messages_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                86
            ],
            "min": [
                88
            ],
            "__typename": [
                5
            ]
        },
        "messages_arr_rel_insert_input": {
            "data": [
                84
            ],
            "on_conflict": [
                90
            ],
            "__typename": [
                5
            ]
        },
        "messages_bool_exp": {
            "_and": [
                82
            ],
            "_not": [
                82
            ],
            "_or": [
                82
            ],
            "from": [
                6
            ],
            "id": [
                393
            ],
            "message": [
                6
            ],
            "p2p_id": [
                393
            ],
            "p2p_offer": [
                156
            ],
            "regAccountByTo": [
                202
            ],
            "reg_account": [
                202
            ],
            "support_id": [
                393
            ],
            "timestamp": [
                318
            ],
            "to": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "messages_constraint": {},
        "messages_insert_input": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "p2p_offer": [
                164
            ],
            "regAccountByTo": [
                208
            ],
            "reg_account": [
                208
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_max_fields": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_max_order_by": {
            "from": [
                145
            ],
            "id": [
                145
            ],
            "message": [
                145
            ],
            "p2p_id": [
                145
            ],
            "support_id": [
                145
            ],
            "timestamp": [
                145
            ],
            "to": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "messages_min_fields": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_min_order_by": {
            "from": [
                145
            ],
            "id": [
                145
            ],
            "message": [
                145
            ],
            "p2p_id": [
                145
            ],
            "support_id": [
                145
            ],
            "timestamp": [
                145
            ],
            "to": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "messages_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                75
            ],
            "__typename": [
                5
            ]
        },
        "messages_on_conflict": {
            "constraint": [
                83
            ],
            "update_columns": [
                97
            ],
            "where": [
                82
            ],
            "__typename": [
                5
            ]
        },
        "messages_order_by": {
            "from": [
                145
            ],
            "id": [
                145
            ],
            "message": [
                145
            ],
            "p2p_id": [
                145
            ],
            "p2p_offer": [
                166
            ],
            "regAccountByTo": [
                210
            ],
            "reg_account": [
                210
            ],
            "support_id": [
                145
            ],
            "timestamp": [
                145
            ],
            "to": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "messages_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "messages_select_column": {},
        "messages_set_input": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_stream_cursor_input": {
            "initial_value": [
                96
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "messages_stream_cursor_value_input": {
            "from": [
                5
            ],
            "id": [
                392
            ],
            "message": [
                5
            ],
            "p2p_id": [
                392
            ],
            "support_id": [
                392
            ],
            "timestamp": [
                317
            ],
            "to": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "messages_update_column": {},
        "messages_updates": {
            "_set": [
                94
            ],
            "where": [
                82
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_aggregate": {
            "aggregate": [
                101
            ],
            "nodes": [
                99
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        111,
                        "[migrate_device_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                105
            ],
            "min": [
                106
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_bool_exp": {
            "_and": [
                102
            ],
            "_not": [
                102
            ],
            "_or": [
                102
            ],
            "account": [
                6
            ],
            "created_at": [
                318
            ],
            "cred_id": [
                6
            ],
            "device_name": [
                6
            ],
            "public_key": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_constraint": {},
        "migrate_device_insert_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_max_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_min_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                99
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_on_conflict": {
            "constraint": [
                103
            ],
            "update_columns": [
                115
            ],
            "where": [
                102
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "cred_id": [
                145
            ],
            "device_name": [
                145
            ],
            "public_key": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_pk_columns_input": {
            "cred_id": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_select_column": {},
        "migrate_device_set_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_stream_cursor_input": {
            "initial_value": [
                114
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_stream_cursor_value_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "public_key": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "migrate_device_update_column": {},
        "migrate_device_updates": {
            "_set": [
                112
            ],
            "where": [
                102
            ],
            "__typename": [
                5
            ]
        },
        "notifications": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "read": [
                0
            ],
            "reg_account_by_from": [
                199
            ],
            "reg_account_by_to": [
                199
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate": {
            "aggregate": [
                123
            ],
            "nodes": [
                117
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_bool_exp": {
            "bool_and": [
                120
            ],
            "bool_or": [
                121
            ],
            "count": [
                122
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_bool_exp_bool_and": {
            "arguments": [
                138
            ],
            "distinct": [
                0
            ],
            "filter": [
                126
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_bool_exp_bool_or": {
            "arguments": [
                139
            ],
            "distinct": [
                0
            ],
            "filter": [
                126
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_bool_exp_count": {
            "arguments": [
                137
            ],
            "distinct": [
                0
            ],
            "filter": [
                126
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                129
            ],
            "min": [
                131
            ],
            "__typename": [
                5
            ]
        },
        "notifications_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                130
            ],
            "min": [
                132
            ],
            "__typename": [
                5
            ]
        },
        "notifications_arr_rel_insert_input": {
            "data": [
                128
            ],
            "on_conflict": [
                134
            ],
            "__typename": [
                5
            ]
        },
        "notifications_bool_exp": {
            "_and": [
                126
            ],
            "_not": [
                126
            ],
            "_or": [
                126
            ],
            "content_id": [
                393
            ],
            "created_at": [
                318
            ],
            "from": [
                6
            ],
            "id": [
                393
            ],
            "read": [
                1
            ],
            "reg_account_by_from": [
                202
            ],
            "reg_account_by_to": [
                202
            ],
            "to": [
                6
            ],
            "type": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "notifications_constraint": {},
        "notifications_insert_input": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "read": [
                0
            ],
            "reg_account_by_from": [
                208
            ],
            "reg_account_by_to": [
                208
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_max_fields": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_max_order_by": {
            "content_id": [
                145
            ],
            "created_at": [
                145
            ],
            "from": [
                145
            ],
            "id": [
                145
            ],
            "to": [
                145
            ],
            "type": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "notifications_min_fields": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_min_order_by": {
            "content_id": [
                145
            ],
            "created_at": [
                145
            ],
            "from": [
                145
            ],
            "id": [
                145
            ],
            "to": [
                145
            ],
            "type": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "notifications_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                117
            ],
            "__typename": [
                5
            ]
        },
        "notifications_on_conflict": {
            "constraint": [
                127
            ],
            "update_columns": [
                143
            ],
            "where": [
                126
            ],
            "__typename": [
                5
            ]
        },
        "notifications_order_by": {
            "content_id": [
                145
            ],
            "created_at": [
                145
            ],
            "from": [
                145
            ],
            "id": [
                145
            ],
            "read": [
                145
            ],
            "reg_account_by_from": [
                210
            ],
            "reg_account_by_to": [
                210
            ],
            "to": [
                145
            ],
            "type": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "notifications_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "notifications_select_column": {},
        "notifications_select_column_notifications_aggregate_bool_exp_bool_and_arguments_columns": {},
        "notifications_select_column_notifications_aggregate_bool_exp_bool_or_arguments_columns": {},
        "notifications_set_input": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "read": [
                0
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_stream_cursor_input": {
            "initial_value": [
                142
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "notifications_stream_cursor_value_input": {
            "content_id": [
                392
            ],
            "created_at": [
                317
            ],
            "from": [
                5
            ],
            "id": [
                392
            ],
            "read": [
                0
            ],
            "to": [
                5
            ],
            "type": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "notifications_update_column": {},
        "notifications_updates": {
            "_set": [
                140
            ],
            "where": [
                126
            ],
            "__typename": [
                5
            ]
        },
        "order_by": {},
        "p2p_offer_output": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_confirmed_payment": [
                0
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled": [
                0
            ],
            "cancelled_by": [
                5
            ],
            "completed": [
                0
            ],
            "created_at": [
                5
            ],
            "id": [
                5
            ],
            "initiator": [
                5
            ],
            "matched": [
                0
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_confirmed_payment": [
                0
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_confirmed_payment": [
                0
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled": [
                0
            ],
            "cancelled_by": [
                5
            ],
            "completed": [
                0
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "matched": [
                0
            ],
            "messages": [
                75,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_aggregate": [
                76,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "method": [
                5
            ],
            "reg_account_by_buyer": [
                199
            ],
            "reg_account_by_initiator": [
                199
            ],
            "reg_account_by_seller": [
                199
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_confirmed_payment": [
                0
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate": {
            "aggregate": [
                153
            ],
            "nodes": [
                147
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_bool_exp": {
            "bool_and": [
                150
            ],
            "bool_or": [
                151
            ],
            "count": [
                152
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_bool_exp_bool_and": {
            "arguments": [
                169
            ],
            "distinct": [
                0
            ],
            "filter": [
                156
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_bool_exp_bool_or": {
            "arguments": [
                170
            ],
            "distinct": [
                0
            ],
            "filter": [
                156
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_bool_exp_count": {
            "arguments": [
                168
            ],
            "distinct": [
                0
            ],
            "filter": [
                156
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                159
            ],
            "min": [
                161
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                160
            ],
            "min": [
                162
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_arr_rel_insert_input": {
            "data": [
                158
            ],
            "on_conflict": [
                165
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_bool_exp": {
            "_and": [
                156
            ],
            "_not": [
                156
            ],
            "_or": [
                156
            ],
            "amount": [
                6
            ],
            "masterbotsbank_id": [
                6
            ],
            "buyer": [
                6
            ],
            "buyer_confirmed_payment": [
                1
            ],
            "buyer_method_details": [
                6
            ],
            "cancelled": [
                1
            ],
            "cancelled_by": [
                6
            ],
            "completed": [
                1
            ],
            "created_at": [
                318
            ],
            "id": [
                393
            ],
            "initiator": [
                6
            ],
            "matched": [
                1
            ],
            "messages": [
                82
            ],
            "messages_aggregate": [
                77
            ],
            "method": [
                6
            ],
            "reg_account_by_buyer": [
                202
            ],
            "reg_account_by_initiator": [
                202
            ],
            "reg_account_by_seller": [
                202
            ],
            "region": [
                6
            ],
            "seller": [
                6
            ],
            "seller_confirmed_payment": [
                1
            ],
            "seller_method_details": [
                6
            ],
            "type": [
                6
            ],
            "updated_at": [
                318
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_constraint": {},
        "p2p_offers_insert_input": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_confirmed_payment": [
                0
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled": [
                0
            ],
            "cancelled_by": [
                5
            ],
            "completed": [
                0
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "matched": [
                0
            ],
            "messages": [
                81
            ],
            "method": [
                5
            ],
            "reg_account_by_buyer": [
                208
            ],
            "reg_account_by_initiator": [
                208
            ],
            "reg_account_by_seller": [
                208
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_confirmed_payment": [
                0
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_max_fields": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled_by": [
                5
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_max_order_by": {
            "amount": [
                145
            ],
            "masterbotsbank_id": [
                145
            ],
            "buyer": [
                145
            ],
            "buyer_method_details": [
                145
            ],
            "cancelled_by": [
                145
            ],
            "created_at": [
                145
            ],
            "id": [
                145
            ],
            "initiator": [
                145
            ],
            "method": [
                145
            ],
            "region": [
                145
            ],
            "seller": [
                145
            ],
            "seller_method_details": [
                145
            ],
            "type": [
                145
            ],
            "updated_at": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_min_fields": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled_by": [
                5
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_min_order_by": {
            "amount": [
                145
            ],
            "masterbotsbank_id": [
                145
            ],
            "buyer": [
                145
            ],
            "buyer_method_details": [
                145
            ],
            "cancelled_by": [
                145
            ],
            "created_at": [
                145
            ],
            "id": [
                145
            ],
            "initiator": [
                145
            ],
            "method": [
                145
            ],
            "region": [
                145
            ],
            "seller": [
                145
            ],
            "seller_method_details": [
                145
            ],
            "type": [
                145
            ],
            "updated_at": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                147
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_obj_rel_insert_input": {
            "data": [
                158
            ],
            "on_conflict": [
                165
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_on_conflict": {
            "constraint": [
                157
            ],
            "update_columns": [
                174
            ],
            "where": [
                156
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_order_by": {
            "amount": [
                145
            ],
            "masterbotsbank_id": [
                145
            ],
            "buyer": [
                145
            ],
            "buyer_confirmed_payment": [
                145
            ],
            "buyer_method_details": [
                145
            ],
            "cancelled": [
                145
            ],
            "cancelled_by": [
                145
            ],
            "completed": [
                145
            ],
            "created_at": [
                145
            ],
            "id": [
                145
            ],
            "initiator": [
                145
            ],
            "matched": [
                145
            ],
            "messages_aggregate": [
                80
            ],
            "method": [
                145
            ],
            "reg_account_by_buyer": [
                210
            ],
            "reg_account_by_initiator": [
                210
            ],
            "reg_account_by_seller": [
                210
            ],
            "region": [
                145
            ],
            "seller": [
                145
            ],
            "seller_confirmed_payment": [
                145
            ],
            "seller_method_details": [
                145
            ],
            "type": [
                145
            ],
            "updated_at": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_select_column": {},
        "p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_and_arguments_columns": {},
        "p2p_offers_select_column_p2p_offers_aggregate_bool_exp_bool_or_arguments_columns": {},
        "p2p_offers_set_input": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_confirmed_payment": [
                0
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled": [
                0
            ],
            "cancelled_by": [
                5
            ],
            "completed": [
                0
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "matched": [
                0
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_confirmed_payment": [
                0
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_stream_cursor_input": {
            "initial_value": [
                173
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_stream_cursor_value_input": {
            "amount": [
                5
            ],
            "masterbotsbank_id": [
                5
            ],
            "buyer": [
                5
            ],
            "buyer_confirmed_payment": [
                0
            ],
            "buyer_method_details": [
                5
            ],
            "cancelled": [
                0
            ],
            "cancelled_by": [
                5
            ],
            "completed": [
                0
            ],
            "created_at": [
                317
            ],
            "id": [
                392
            ],
            "initiator": [
                5
            ],
            "matched": [
                0
            ],
            "method": [
                5
            ],
            "region": [
                5
            ],
            "seller": [
                5
            ],
            "seller_confirmed_payment": [
                0
            ],
            "seller_method_details": [
                5
            ],
            "type": [
                5
            ],
            "updated_at": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "p2p_offers_update_column": {},
        "p2p_offers_updates": {
            "_set": [
                171
            ],
            "where": [
                156
            ],
            "__typename": [
                5
            ]
        },
        "preferences": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "notifications": [
                0
            ],
            "personalized": [
                0
            ],
            "region": [
                5
            ],
            "secondary_currency": [
                70,
                {
                    "path": [
                        5
                    ]
                }
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_aggregate": {
            "aggregate": [
                178
            ],
            "nodes": [
                176
            ],
            "__typename": [
                5
            ]
        },
        "preferences_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        193,
                        "[preferences_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                186
            ],
            "min": [
                187
            ],
            "__typename": [
                5
            ]
        },
        "preferences_append_input": {
            "secondary_currency": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "preferences_bool_exp": {
            "_and": [
                180
            ],
            "_not": [
                180
            ],
            "_or": [
                180
            ],
            "account": [
                6
            ],
            "currency": [
                6
            ],
            "language": [
                6
            ],
            "notifications": [
                1
            ],
            "personalized": [
                1
            ],
            "region": [
                6
            ],
            "secondary_currency": [
                72
            ],
            "theme": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "preferences_constraint": {},
        "preferences_delete_at_path_input": {
            "secondary_currency": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_delete_elem_input": {
            "secondary_currency": [
                3
            ],
            "__typename": [
                5
            ]
        },
        "preferences_delete_key_input": {
            "secondary_currency": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_insert_input": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "notifications": [
                0
            ],
            "personalized": [
                0
            ],
            "region": [
                5
            ],
            "secondary_currency": [
                70
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_max_fields": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "region": [
                5
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_min_fields": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "region": [
                5
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                176
            ],
            "__typename": [
                5
            ]
        },
        "preferences_on_conflict": {
            "constraint": [
                181
            ],
            "update_columns": [
                197
            ],
            "where": [
                180
            ],
            "__typename": [
                5
            ]
        },
        "preferences_order_by": {
            "account": [
                145
            ],
            "currency": [
                145
            ],
            "language": [
                145
            ],
            "notifications": [
                145
            ],
            "personalized": [
                145
            ],
            "region": [
                145
            ],
            "secondary_currency": [
                145
            ],
            "theme": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "preferences_pk_columns_input": {
            "account": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_prepend_input": {
            "secondary_currency": [
                70
            ],
            "__typename": [
                5
            ]
        },
        "preferences_select_column": {},
        "preferences_set_input": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "notifications": [
                0
            ],
            "personalized": [
                0
            ],
            "region": [
                5
            ],
            "secondary_currency": [
                70
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_stream_cursor_input": {
            "initial_value": [
                196
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "preferences_stream_cursor_value_input": {
            "account": [
                5
            ],
            "currency": [
                5
            ],
            "language": [
                5
            ],
            "notifications": [
                0
            ],
            "personalized": [
                0
            ],
            "region": [
                5
            ],
            "secondary_currency": [
                70
            ],
            "theme": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "preferences_update_column": {},
        "preferences_updates": {
            "_append": [
                179
            ],
            "_delete_at_path": [
                182
            ],
            "_delete_elem": [
                183
            ],
            "_delete_key": [
                184
            ],
            "_prepend": [
                192
            ],
            "_set": [
                194
            ],
            "where": [
                180
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts": {
            "account": [
                5
            ],
            "accounts_information": [
                7
            ],
            "create_account": [
                0
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "devices": [
                44,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "devices_aggregate": [
                45,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "id": [
                392
            ],
            "messages_from": [
                75,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_from_aggregate": [
                76,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_to": [
                75,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_to_aggregate": [
                76,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "notifications_from": [
                117,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_from_aggregate": [
                118,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_to": [
                117,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_to_aggregate": [
                118,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "onboarded": [
                0
            ],
            "p2p_offers_buyer": [
                147,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_buyer_aggregate": [
                148,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_initiator": [
                147,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_initiator_aggregate": [
                148,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_seller": [
                147,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_seller_aggregate": [
                148,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "reg_accounts_accounts_information": [
                7,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "reg_accounts_accounts_information_aggregate": [
                8,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "swap_orders": [
                256,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "swap_orders_aggregate": [
                257,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "trustNetworkNotificationsByTrust": [
                338,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trustNetworkNotificationsByTrust_aggregate": [
                339,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notifications": [
                338,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notifications_aggregate": [
                339,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_networks_by_account": [
                321,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_networks_by_account_aggregate": [
                322,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_networks_by_trust": [
                321,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_networks_by_trust_aggregate": [
                322,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_aggregate": {
            "aggregate": [
                201
            ],
            "nodes": [
                199
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        212,
                        "[reg_accounts_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                205
            ],
            "min": [
                206
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_bool_exp": {
            "_and": [
                202
            ],
            "_not": [
                202
            ],
            "_or": [
                202
            ],
            "account": [
                6
            ],
            "accounts_information": [
                17
            ],
            "create_account": [
                1
            ],
            "created": [
                318
            ],
            "created_at": [
                316
            ],
            "cred_id": [
                6
            ],
            "device_name": [
                6
            ],
            "devices": [
                51
            ],
            "devices_aggregate": [
                46
            ],
            "id": [
                393
            ],
            "messages_from": [
                82
            ],
            "messages_from_aggregate": [
                77
            ],
            "messages_to": [
                82
            ],
            "messages_to_aggregate": [
                77
            ],
            "notifications_from": [
                126
            ],
            "notifications_from_aggregate": [
                119
            ],
            "notifications_to": [
                126
            ],
            "notifications_to_aggregate": [
                119
            ],
            "onboarded": [
                1
            ],
            "p2p_offers_buyer": [
                156
            ],
            "p2p_offers_buyer_aggregate": [
                149
            ],
            "p2p_offers_initiator": [
                156
            ],
            "p2p_offers_initiator_aggregate": [
                149
            ],
            "p2p_offers_seller": [
                156
            ],
            "p2p_offers_seller_aggregate": [
                149
            ],
            "public_key": [
                6
            ],
            "referrer": [
                6
            ],
            "reg_accounts_accounts_information": [
                17
            ],
            "reg_accounts_accounts_information_aggregate": [
                9
            ],
            "swap_orders": [
                275
            ],
            "swap_orders_aggregate": [
                258
            ],
            "trustNetworkNotificationsByTrust": [
                345
            ],
            "trustNetworkNotificationsByTrust_aggregate": [
                340
            ],
            "trust_network_notifications": [
                345
            ],
            "trust_network_notifications_aggregate": [
                340
            ],
            "trust_networks_by_account": [
                330
            ],
            "trust_networks_by_account_aggregate": [
                323
            ],
            "trust_networks_by_trust": [
                330
            ],
            "trust_networks_by_trust_aggregate": [
                323
            ],
            "txid": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_constraint": {},
        "reg_accounts_insert_input": {
            "account": [
                5
            ],
            "accounts_information": [
                28
            ],
            "create_account": [
                0
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "devices": [
                50
            ],
            "id": [
                392
            ],
            "messages_from": [
                81
            ],
            "messages_to": [
                81
            ],
            "notifications_from": [
                125
            ],
            "notifications_to": [
                125
            ],
            "onboarded": [
                0
            ],
            "p2p_offers_buyer": [
                155
            ],
            "p2p_offers_initiator": [
                155
            ],
            "p2p_offers_seller": [
                155
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "reg_accounts_accounts_information": [
                16
            ],
            "swap_orders": [
                272
            ],
            "trustNetworkNotificationsByTrust": [
                344
            ],
            "trust_network_notifications": [
                344
            ],
            "trust_networks_by_account": [
                329
            ],
            "trust_networks_by_trust": [
                329
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_max_fields": {
            "account": [
                5
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "id": [
                392
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_min_fields": {
            "account": [
                5
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "id": [
                392
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                199
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_obj_rel_insert_input": {
            "data": [
                204
            ],
            "on_conflict": [
                209
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_on_conflict": {
            "constraint": [
                203
            ],
            "update_columns": [
                216
            ],
            "where": [
                202
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_order_by": {
            "account": [
                145
            ],
            "accounts_information": [
                30
            ],
            "create_account": [
                145
            ],
            "created": [
                145
            ],
            "created_at": [
                145
            ],
            "cred_id": [
                145
            ],
            "device_name": [
                145
            ],
            "devices_aggregate": [
                49
            ],
            "id": [
                145
            ],
            "messages_from_aggregate": [
                80
            ],
            "messages_to_aggregate": [
                80
            ],
            "notifications_from_aggregate": [
                124
            ],
            "notifications_to_aggregate": [
                124
            ],
            "onboarded": [
                145
            ],
            "p2p_offers_buyer_aggregate": [
                154
            ],
            "p2p_offers_initiator_aggregate": [
                154
            ],
            "p2p_offers_seller_aggregate": [
                154
            ],
            "public_key": [
                145
            ],
            "referrer": [
                145
            ],
            "reg_accounts_accounts_information_aggregate": [
                14
            ],
            "swap_orders_aggregate": [
                271
            ],
            "trustNetworkNotificationsByTrust_aggregate": [
                343
            ],
            "trust_network_notifications_aggregate": [
                343
            ],
            "trust_networks_by_account_aggregate": [
                328
            ],
            "trust_networks_by_trust_aggregate": [
                328
            ],
            "txid": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_select_column": {},
        "reg_accounts_set_input": {
            "account": [
                5
            ],
            "create_account": [
                0
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "id": [
                392
            ],
            "onboarded": [
                0
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_stream_cursor_input": {
            "initial_value": [
                215
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_stream_cursor_value_input": {
            "account": [
                5
            ],
            "create_account": [
                0
            ],
            "created": [
                317
            ],
            "created_at": [
                315
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "id": [
                392
            ],
            "onboarded": [
                0
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "txid": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "reg_accounts_update_column": {},
        "reg_accounts_updates": {
            "_set": [
                213
            ],
            "where": [
                202
            ],
            "__typename": [
                5
            ]
        },
        "request_new_account_input": {
            "account": [
                5
            ],
            "create_account": [
                0
            ],
            "cred_id": [
                5
            ],
            "device_name": [
                5
            ],
            "email_address": [
                5
            ],
            "newsletter_subscription": [
                0
            ],
            "phone_number": [
                5
            ],
            "public_key": [
                5
            ],
            "referrer": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "request_new_account_output": {
            "id": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_aggregate": {
            "aggregate": [
                222
            ],
            "nodes": [
                220
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        232,
                        "[signing_requests_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                226
            ],
            "min": [
                227
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_bool_exp": {
            "_and": [
                223
            ],
            "_not": [
                223
            ],
            "_or": [
                223
            ],
            "createdAt": [
                318
            ],
            "esr": [
                6
            ],
            "id": [
                393
            ],
            "signature": [
                6
            ],
            "signer": [
                6
            ],
            "status": [
                6
            ],
            "transactionId": [
                6
            ],
            "updatedAt": [
                318
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_constraint": {},
        "signing_requests_insert_input": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_max_fields": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_min_fields": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                220
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_on_conflict": {
            "constraint": [
                224
            ],
            "update_columns": [
                236
            ],
            "where": [
                223
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_order_by": {
            "createdAt": [
                145
            ],
            "esr": [
                145
            ],
            "id": [
                145
            ],
            "signature": [
                145
            ],
            "signer": [
                145
            ],
            "status": [
                145
            ],
            "transactionId": [
                145
            ],
            "updatedAt": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_select_column": {},
        "signing_requests_set_input": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_stream_cursor_input": {
            "initial_value": [
                235
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_stream_cursor_value_input": {
            "createdAt": [
                317
            ],
            "esr": [
                5
            ],
            "id": [
                392
            ],
            "signature": [
                5
            ],
            "signer": [
                5
            ],
            "status": [
                5
            ],
            "transactionId": [
                5
            ],
            "updatedAt": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "signing_requests_update_column": {},
        "signing_requests_updates": {
            "_set": [
                233
            ],
            "where": [
                223
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets": {
            "active_swaps": [
                0
            ],
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_aggregate": {
            "aggregate": [
                240
            ],
            "nodes": [
                238
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        250,
                        "[swap_assets_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                244
            ],
            "min": [
                245
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_bool_exp": {
            "_and": [
                241
            ],
            "_not": [
                241
            ],
            "_or": [
                241
            ],
            "active_swaps": [
                1
            ],
            "asset": [
                6
            ],
            "asset_name": [
                6
            ],
            "chain": [
                6
            ],
            "wallet_address": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_constraint": {},
        "swap_assets_insert_input": {
            "active_swaps": [
                0
            ],
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_max_fields": {
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_min_fields": {
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                238
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_on_conflict": {
            "constraint": [
                242
            ],
            "update_columns": [
                254
            ],
            "where": [
                241
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_order_by": {
            "active_swaps": [
                145
            ],
            "asset": [
                145
            ],
            "asset_name": [
                145
            ],
            "chain": [
                145
            ],
            "wallet_address": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_pk_columns_input": {
            "asset": [
                5
            ],
            "chain": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_select_column": {},
        "swap_assets_set_input": {
            "active_swaps": [
                0
            ],
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_stream_cursor_input": {
            "initial_value": [
                253
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_stream_cursor_value_input": {
            "active_swaps": [
                0
            ],
            "asset": [
                5
            ],
            "asset_name": [
                5
            ],
            "chain": [
                5
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_assets_update_column": {},
        "swap_assets_updates": {
            "_set": [
                251
            ],
            "where": [
                241
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "reg_account": [
                199
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate": {
            "aggregate": [
                270
            ],
            "nodes": [
                256
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp": {
            "avg": [
                259
            ],
            "corr": [
                260
            ],
            "count": [
                262
            ],
            "covar_samp": [
                263
            ],
            "max": [
                265
            ],
            "min": [
                266
            ],
            "stddev_samp": [
                267
            ],
            "sum": [
                268
            ],
            "var_samp": [
                269
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_avg": {
            "arguments": [
                288
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_corr": {
            "arguments": [
                261
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_corr_arguments": {
            "X": [
                289
            ],
            "Y": [
                289
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_count": {
            "arguments": [
                287
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_covar_samp": {
            "arguments": [
                264
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_covar_samp_arguments": {
            "X": [
                290
            ],
            "Y": [
                290
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_max": {
            "arguments": [
                291
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_min": {
            "arguments": [
                292
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_stddev_samp": {
            "arguments": [
                293
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_sum": {
            "arguments": [
                294
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_bool_exp_var_samp": {
            "arguments": [
                295
            ],
            "distinct": [
                0
            ],
            "filter": [
                275
            ],
            "predicate": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_fields": {
            "avg": [
                273
            ],
            "count": [
                3,
                {
                    "columns": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                279
            ],
            "min": [
                281
            ],
            "stddev": [
                297
            ],
            "stddev_pop": [
                299
            ],
            "stddev_samp": [
                301
            ],
            "sum": [
                305
            ],
            "var_pop": [
                309
            ],
            "var_samp": [
                311
            ],
            "variance": [
                313
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_aggregate_order_by": {
            "avg": [
                274
            ],
            "count": [
                145
            ],
            "max": [
                280
            ],
            "min": [
                282
            ],
            "stddev": [
                298
            ],
            "stddev_pop": [
                300
            ],
            "stddev_samp": [
                302
            ],
            "sum": [
                306
            ],
            "var_pop": [
                310
            ],
            "var_samp": [
                312
            ],
            "variance": [
                314
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_arr_rel_insert_input": {
            "data": [
                278
            ],
            "on_conflict": [
                284
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_avg_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_avg_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_bool_exp": {
            "_and": [
                275
            ],
            "_not": [
                275
            ],
            "_or": [
                275
            ],
            "asset": [
                6
            ],
            "asset_amount": [
                69
            ],
            "masterbots_account": [
                6
            ],
            "masterbots_amount": [
                69
            ],
            "masterbots_currency": [
                6
            ],
            "masterbots_trx": [
                6
            ],
            "created_at": [
                318
            ],
            "gems_id": [
                6
            ],
            "id": [
                393
            ],
            "order_status": [
                6
            ],
            "order_type": [
                6
            ],
            "price": [
                69
            ],
            "reg_account": [
                202
            ],
            "updated_at": [
                318
            ],
            "wallet_address": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_constraint": {},
        "swap_orders_inc_input": {
            "asset_amount": [
                68
            ],
            "masterbots_amount": [
                68
            ],
            "price": [
                68
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_insert_input": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "reg_account": [
                208
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_max_fields": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_max_order_by": {
            "asset": [
                145
            ],
            "asset_amount": [
                145
            ],
            "masterbots_account": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "masterbots_currency": [
                145
            ],
            "masterbots_trx": [
                145
            ],
            "created_at": [
                145
            ],
            "gems_id": [
                145
            ],
            "id": [
                145
            ],
            "order_status": [
                145
            ],
            "order_type": [
                145
            ],
            "price": [
                145
            ],
            "updated_at": [
                145
            ],
            "wallet_address": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_min_fields": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_min_order_by": {
            "asset": [
                145
            ],
            "asset_amount": [
                145
            ],
            "masterbots_account": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "masterbots_currency": [
                145
            ],
            "masterbots_trx": [
                145
            ],
            "created_at": [
                145
            ],
            "gems_id": [
                145
            ],
            "id": [
                145
            ],
            "order_status": [
                145
            ],
            "order_type": [
                145
            ],
            "price": [
                145
            ],
            "updated_at": [
                145
            ],
            "wallet_address": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                256
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_on_conflict": {
            "constraint": [
                276
            ],
            "update_columns": [
                307
            ],
            "where": [
                275
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_order_by": {
            "asset": [
                145
            ],
            "asset_amount": [
                145
            ],
            "masterbots_account": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "masterbots_currency": [
                145
            ],
            "masterbots_trx": [
                145
            ],
            "created_at": [
                145
            ],
            "gems_id": [
                145
            ],
            "id": [
                145
            ],
            "order_status": [
                145
            ],
            "order_type": [
                145
            ],
            "price": [
                145
            ],
            "reg_account": [
                210
            ],
            "updated_at": [
                145
            ],
            "wallet_address": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_pk_columns_input": {
            "id": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_select_column": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_avg_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_corr_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_covar_samp_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_max_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_min_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_stddev_samp_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_sum_arguments_columns": {},
        "swap_orders_select_column_swap_orders_aggregate_bool_exp_var_samp_arguments_columns": {},
        "swap_orders_set_input": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_pop_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_pop_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_samp_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stddev_samp_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stream_cursor_input": {
            "initial_value": [
                304
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_stream_cursor_value_input": {
            "asset": [
                5
            ],
            "asset_amount": [
                68
            ],
            "masterbots_account": [
                5
            ],
            "masterbots_amount": [
                68
            ],
            "masterbots_currency": [
                5
            ],
            "masterbots_trx": [
                5
            ],
            "created_at": [
                317
            ],
            "gems_id": [
                5
            ],
            "id": [
                392
            ],
            "order_status": [
                5
            ],
            "order_type": [
                5
            ],
            "price": [
                68
            ],
            "updated_at": [
                317
            ],
            "wallet_address": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_sum_fields": {
            "asset_amount": [
                68
            ],
            "masterbots_amount": [
                68
            ],
            "price": [
                68
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_sum_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_update_column": {},
        "swap_orders_updates": {
            "_inc": [
                277
            ],
            "_set": [
                296
            ],
            "where": [
                275
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_var_pop_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_var_pop_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_var_samp_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_var_samp_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_variance_fields": {
            "asset_amount": [
                2
            ],
            "masterbots_amount": [
                2
            ],
            "price": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "swap_orders_variance_order_by": {
            "asset_amount": [
                145
            ],
            "masterbots_amount": [
                145
            ],
            "price": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                315
            ],
            "_gt": [
                315
            ],
            "_gte": [
                315
            ],
            "_in": [
                315
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                315
            ],
            "_lte": [
                315
            ],
            "_neq": [
                315
            ],
            "_nin": [
                315
            ],
            "__typename": [
                5
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                317
            ],
            "_gt": [
                317
            ],
            "_gte": [
                317
            ],
            "_in": [
                317
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                317
            ],
            "_lte": [
                317
            ],
            "_neq": [
                317
            ],
            "_nin": [
                317
            ],
            "__typename": [
                5
            ]
        },
        "toggle_trust_network_input": {
            "account": [
                5
            ],
            "reject": [
                0
            ],
            "__typename": [
                5
            ]
        },
        "toggle_trust_network_output": {
            "success": [
                0
            ],
            "__typename": [
                5
            ]
        },
        "trust_network": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "is_mutual": [
                0
            ],
            "trust": [
                5
            ],
            "trust_by": [
                199
            ],
            "trust_network": [
                199
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate": {
            "aggregate": [
                327
            ],
            "nodes": [
                321
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_bool_exp": {
            "bool_and": [
                324
            ],
            "bool_or": [
                325
            ],
            "count": [
                326
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_bool_exp_bool_and": {
            "arguments": [
                367
            ],
            "distinct": [
                0
            ],
            "filter": [
                330
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_bool_exp_bool_or": {
            "arguments": [
                368
            ],
            "distinct": [
                0
            ],
            "filter": [
                330
            ],
            "predicate": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_bool_exp_count": {
            "arguments": [
                366
            ],
            "distinct": [
                0
            ],
            "filter": [
                330
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                333
            ],
            "min": [
                335
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                334
            ],
            "min": [
                336
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_arr_rel_insert_input": {
            "data": [
                332
            ],
            "on_conflict": [
                362
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_bool_exp": {
            "_and": [
                330
            ],
            "_not": [
                330
            ],
            "_or": [
                330
            ],
            "account": [
                6
            ],
            "created_at": [
                318
            ],
            "is_mutual": [
                1
            ],
            "trust": [
                6
            ],
            "trust_by": [
                202
            ],
            "trust_network": [
                202
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_constraint": {},
        "trust_network_insert_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "is_mutual": [
                0
            ],
            "trust": [
                5
            ],
            "trust_by": [
                208
            ],
            "trust_network": [
                208
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_max_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_max_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "trust": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_min_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_min_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "trust": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                321
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "regAccountByTrust": [
                199
            ],
            "reg_account": [
                199
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_aggregate": {
            "aggregate": [
                342
            ],
            "nodes": [
                338
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_aggregate_bool_exp": {
            "count": [
                341
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_aggregate_bool_exp_count": {
            "arguments": [
                356
            ],
            "distinct": [
                0
            ],
            "filter": [
                345
            ],
            "predicate": [
                4
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                348
            ],
            "min": [
                350
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_aggregate_order_by": {
            "count": [
                145
            ],
            "max": [
                349
            ],
            "min": [
                351
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_arr_rel_insert_input": {
            "data": [
                347
            ],
            "on_conflict": [
                353
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_bool_exp": {
            "_and": [
                345
            ],
            "_not": [
                345
            ],
            "_or": [
                345
            ],
            "account": [
                6
            ],
            "created_at": [
                318
            ],
            "regAccountByTrust": [
                202
            ],
            "reg_account": [
                202
            ],
            "trust": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_constraint": {},
        "trust_network_notification_insert_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "regAccountByTrust": [
                208
            ],
            "reg_account": [
                208
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_max_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_max_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "trust": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_min_fields": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_min_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "trust": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                338
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_on_conflict": {
            "constraint": [
                346
            ],
            "update_columns": [
                360
            ],
            "where": [
                345
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "regAccountByTrust": [
                210
            ],
            "reg_account": [
                210
            ],
            "trust": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_pk_columns_input": {
            "account": [
                5
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_select_column": {},
        "trust_network_notification_set_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_stream_cursor_input": {
            "initial_value": [
                359
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_stream_cursor_value_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_notification_update_column": {},
        "trust_network_notification_updates": {
            "_set": [
                357
            ],
            "where": [
                345
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_on_conflict": {
            "constraint": [
                331
            ],
            "update_columns": [
                390
            ],
            "where": [
                330
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_order_by": {
            "account": [
                145
            ],
            "created_at": [
                145
            ],
            "is_mutual": [
                145
            ],
            "trust": [
                145
            ],
            "trust_by": [
                210
            ],
            "trust_network": [
                210
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_output": {
            "trusted_network": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_pk_columns_input": {
            "account": [
                5
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_select_column": {},
        "trust_network_select_column_trust_network_aggregate_bool_exp_bool_and_arguments_columns": {},
        "trust_network_select_column_trust_network_aggregate_bool_exp_bool_or_arguments_columns": {},
        "trust_network_set_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "is_mutual": [
                0
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_aggregate": {
            "aggregate": [
                372
            ],
            "nodes": [
                370
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_aggregate_fields": {
            "count": [
                3,
                {
                    "columns": [
                        382,
                        "[trust_network_status_select_column!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                376
            ],
            "min": [
                377
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_bool_exp": {
            "_and": [
                373
            ],
            "_not": [
                373
            ],
            "_or": [
                373
            ],
            "status": [
                6
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_constraint": {},
        "trust_network_status_insert_input": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_max_fields": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_min_fields": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_mutation_response": {
            "affected_rows": [
                3
            ],
            "returning": [
                370
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_on_conflict": {
            "constraint": [
                374
            ],
            "update_columns": [
                386
            ],
            "where": [
                373
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_order_by": {
            "status": [
                145
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_pk_columns_input": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_select_column": {},
        "trust_network_status_set_input": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_stream_cursor_input": {
            "initial_value": [
                385
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_stream_cursor_value_input": {
            "status": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_status_update_column": {},
        "trust_network_status_updates": {
            "_set": [
                383
            ],
            "where": [
                373
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_stream_cursor_input": {
            "initial_value": [
                389
            ],
            "ordering": [
                43
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_stream_cursor_value_input": {
            "account": [
                5
            ],
            "created_at": [
                317
            ],
            "is_mutual": [
                0
            ],
            "trust": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "trust_network_update_column": {},
        "trust_network_updates": {
            "_set": [
                369
            ],
            "where": [
                330
            ],
            "__typename": [
                5
            ]
        },
        "uuid": {},
        "uuid_comparison_exp": {
            "_eq": [
                392
            ],
            "_gt": [
                392
            ],
            "_gte": [
                392
            ],
            "_in": [
                392
            ],
            "_is_null": [
                0
            ],
            "_lt": [
                392
            ],
            "_lte": [
                392
            ],
            "_neq": [
                392
            ],
            "_nin": [
                392
            ],
            "__typename": [
                5
            ]
        },
        "Query": {
            "accounts_information": [
                7,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "accounts_information_aggregate": [
                8,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "accounts_information_by_pk": [
                7,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "apollo_auth_health_check": [
                5
            ],
            "apollo_health_check": [
                0
            ],
            "devices": [
                44,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "devices_aggregate": [
                45,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "devices_by_pk": [
                44,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "get_trust_network": [
                364,
                {
                    "account": [
                        5
                    ]
                }
            ],
            "messages": [
                75,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_aggregate": [
                76,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_by_pk": [
                75,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "migrate_device": [
                99,
                {
                    "distinct_on": [
                        111,
                        "[migrate_device_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        109,
                        "[migrate_device_order_by!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "migrate_device_aggregate": [
                100,
                {
                    "distinct_on": [
                        111,
                        "[migrate_device_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        109,
                        "[migrate_device_order_by!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "migrate_device_by_pk": [
                99,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "notifications": [
                117,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_aggregate": [
                118,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_by_pk": [
                117,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "p2p_offers": [
                147,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_aggregate": [
                148,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_by_pk": [
                147,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "preferences": [
                176,
                {
                    "distinct_on": [
                        193,
                        "[preferences_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        190,
                        "[preferences_order_by!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "preferences_aggregate": [
                177,
                {
                    "distinct_on": [
                        193,
                        "[preferences_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        190,
                        "[preferences_order_by!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "preferences_by_pk": [
                176,
                {
                    "account": [
                        5,
                        "String!"
                    ]
                }
            ],
            "reg_accounts": [
                199,
                {
                    "distinct_on": [
                        212,
                        "[reg_accounts_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        210,
                        "[reg_accounts_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "reg_accounts_aggregate": [
                200,
                {
                    "distinct_on": [
                        212,
                        "[reg_accounts_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        210,
                        "[reg_accounts_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "reg_accounts_by_pk": [
                199,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "signing_requests": [
                220,
                {
                    "distinct_on": [
                        232,
                        "[signing_requests_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        230,
                        "[signing_requests_order_by!]"
                    ],
                    "where": [
                        223
                    ]
                }
            ],
            "signing_requests_aggregate": [
                221,
                {
                    "distinct_on": [
                        232,
                        "[signing_requests_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        230,
                        "[signing_requests_order_by!]"
                    ],
                    "where": [
                        223
                    ]
                }
            ],
            "signing_requests_by_pk": [
                220,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "swap_assets": [
                238,
                {
                    "distinct_on": [
                        250,
                        "[swap_assets_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        248,
                        "[swap_assets_order_by!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "swap_assets_aggregate": [
                239,
                {
                    "distinct_on": [
                        250,
                        "[swap_assets_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        248,
                        "[swap_assets_order_by!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "swap_assets_by_pk": [
                238,
                {
                    "asset": [
                        5,
                        "String!"
                    ],
                    "chain": [
                        5,
                        "String!"
                    ]
                }
            ],
            "swap_orders": [
                256,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "swap_orders_aggregate": [
                257,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "swap_orders_by_pk": [
                256,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "trust_network": [
                321,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_network_aggregate": [
                322,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_network_by_pk": [
                321,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "trust_network_notification": [
                338,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notification_aggregate": [
                339,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notification_by_pk": [
                338,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "trust_network_status": [
                370,
                {
                    "distinct_on": [
                        382,
                        "[trust_network_status_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        380,
                        "[trust_network_status_order_by!]"
                    ],
                    "where": [
                        373
                    ]
                }
            ],
            "trust_network_status_aggregate": [
                371,
                {
                    "distinct_on": [
                        382,
                        "[trust_network_status_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        380,
                        "[trust_network_status_order_by!]"
                    ],
                    "where": [
                        373
                    ]
                }
            ],
            "trust_network_status_by_pk": [
                370,
                {
                    "status": [
                        5,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "Mutation": {
            "approve_new_account": [
                5,
                {
                    "request_id": [
                        5
                    ]
                }
            ],
            "cancel_p2p_offer": [
                146,
                {
                    "p2p_data": [
                        41
                    ]
                }
            ],
            "confirm_p2p_payment": [
                146,
                {
                    "p2p_data": [
                        42
                    ]
                }
            ],
            "delete_accounts_information": [
                27,
                {
                    "where": [
                        17,
                        "accounts_information_bool_exp!"
                    ]
                }
            ],
            "delete_accounts_information_by_pk": [
                7,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_devices": [
                58,
                {
                    "where": [
                        51,
                        "devices_bool_exp!"
                    ]
                }
            ],
            "delete_devices_by_pk": [
                44,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_messages": [
                89,
                {
                    "where": [
                        82,
                        "messages_bool_exp!"
                    ]
                }
            ],
            "delete_messages_by_pk": [
                75,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_migrate_device": [
                107,
                {
                    "where": [
                        102,
                        "migrate_device_bool_exp!"
                    ]
                }
            ],
            "delete_migrate_device_by_pk": [
                99,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_notifications": [
                133,
                {
                    "where": [
                        126,
                        "notifications_bool_exp!"
                    ]
                }
            ],
            "delete_notifications_by_pk": [
                117,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_p2p_offers": [
                163,
                {
                    "where": [
                        156,
                        "p2p_offers_bool_exp!"
                    ]
                }
            ],
            "delete_p2p_offers_by_pk": [
                147,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_preferences": [
                188,
                {
                    "where": [
                        180,
                        "preferences_bool_exp!"
                    ]
                }
            ],
            "delete_preferences_by_pk": [
                176,
                {
                    "account": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_reg_accounts": [
                207,
                {
                    "where": [
                        202,
                        "reg_accounts_bool_exp!"
                    ]
                }
            ],
            "delete_reg_accounts_by_pk": [
                199,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_signing_requests": [
                228,
                {
                    "where": [
                        223,
                        "signing_requests_bool_exp!"
                    ]
                }
            ],
            "delete_signing_requests_by_pk": [
                220,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_swap_assets": [
                246,
                {
                    "where": [
                        241,
                        "swap_assets_bool_exp!"
                    ]
                }
            ],
            "delete_swap_assets_by_pk": [
                238,
                {
                    "asset": [
                        5,
                        "String!"
                    ],
                    "chain": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_swap_orders": [
                283,
                {
                    "where": [
                        275,
                        "swap_orders_bool_exp!"
                    ]
                }
            ],
            "delete_swap_orders_by_pk": [
                256,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "delete_trust_network": [
                337,
                {
                    "where": [
                        330,
                        "trust_network_bool_exp!"
                    ]
                }
            ],
            "delete_trust_network_by_pk": [
                321,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_trust_network_notification": [
                352,
                {
                    "where": [
                        345,
                        "trust_network_notification_bool_exp!"
                    ]
                }
            ],
            "delete_trust_network_notification_by_pk": [
                338,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "delete_trust_network_status": [
                378,
                {
                    "where": [
                        373,
                        "trust_network_status_bool_exp!"
                    ]
                }
            ],
            "delete_trust_network_status_by_pk": [
                370,
                {
                    "status": [
                        5,
                        "String!"
                    ]
                }
            ],
            "insert_accounts_information": [
                27,
                {
                    "objects": [
                        22,
                        "[accounts_information_insert_input!]!"
                    ],
                    "on_conflict": [
                        29
                    ]
                }
            ],
            "insert_accounts_information_one": [
                7,
                {
                    "object": [
                        22,
                        "accounts_information_insert_input!"
                    ],
                    "on_conflict": [
                        29
                    ]
                }
            ],
            "insert_devices": [
                58,
                {
                    "objects": [
                        53,
                        "[devices_insert_input!]!"
                    ],
                    "on_conflict": [
                        59
                    ]
                }
            ],
            "insert_devices_one": [
                44,
                {
                    "object": [
                        53,
                        "devices_insert_input!"
                    ],
                    "on_conflict": [
                        59
                    ]
                }
            ],
            "insert_messages": [
                89,
                {
                    "objects": [
                        84,
                        "[messages_insert_input!]!"
                    ],
                    "on_conflict": [
                        90
                    ]
                }
            ],
            "insert_messages_one": [
                75,
                {
                    "object": [
                        84,
                        "messages_insert_input!"
                    ],
                    "on_conflict": [
                        90
                    ]
                }
            ],
            "insert_migrate_device": [
                107,
                {
                    "objects": [
                        104,
                        "[migrate_device_insert_input!]!"
                    ],
                    "on_conflict": [
                        108
                    ]
                }
            ],
            "insert_migrate_device_one": [
                99,
                {
                    "object": [
                        104,
                        "migrate_device_insert_input!"
                    ],
                    "on_conflict": [
                        108
                    ]
                }
            ],
            "insert_notifications": [
                133,
                {
                    "objects": [
                        128,
                        "[notifications_insert_input!]!"
                    ],
                    "on_conflict": [
                        134
                    ]
                }
            ],
            "insert_notifications_one": [
                117,
                {
                    "object": [
                        128,
                        "notifications_insert_input!"
                    ],
                    "on_conflict": [
                        134
                    ]
                }
            ],
            "insert_p2p_offers": [
                163,
                {
                    "objects": [
                        158,
                        "[p2p_offers_insert_input!]!"
                    ],
                    "on_conflict": [
                        165
                    ]
                }
            ],
            "insert_p2p_offers_one": [
                147,
                {
                    "object": [
                        158,
                        "p2p_offers_insert_input!"
                    ],
                    "on_conflict": [
                        165
                    ]
                }
            ],
            "insert_preferences": [
                188,
                {
                    "objects": [
                        185,
                        "[preferences_insert_input!]!"
                    ],
                    "on_conflict": [
                        189
                    ]
                }
            ],
            "insert_preferences_one": [
                176,
                {
                    "object": [
                        185,
                        "preferences_insert_input!"
                    ],
                    "on_conflict": [
                        189
                    ]
                }
            ],
            "insert_reg_accounts": [
                207,
                {
                    "objects": [
                        204,
                        "[reg_accounts_insert_input!]!"
                    ],
                    "on_conflict": [
                        209
                    ]
                }
            ],
            "insert_reg_accounts_one": [
                199,
                {
                    "object": [
                        204,
                        "reg_accounts_insert_input!"
                    ],
                    "on_conflict": [
                        209
                    ]
                }
            ],
            "insert_signing_requests": [
                228,
                {
                    "objects": [
                        225,
                        "[signing_requests_insert_input!]!"
                    ],
                    "on_conflict": [
                        229
                    ]
                }
            ],
            "insert_signing_requests_one": [
                220,
                {
                    "object": [
                        225,
                        "signing_requests_insert_input!"
                    ],
                    "on_conflict": [
                        229
                    ]
                }
            ],
            "insert_swap_assets": [
                246,
                {
                    "objects": [
                        243,
                        "[swap_assets_insert_input!]!"
                    ],
                    "on_conflict": [
                        247
                    ]
                }
            ],
            "insert_swap_assets_one": [
                238,
                {
                    "object": [
                        243,
                        "swap_assets_insert_input!"
                    ],
                    "on_conflict": [
                        247
                    ]
                }
            ],
            "insert_swap_orders": [
                283,
                {
                    "objects": [
                        278,
                        "[swap_orders_insert_input!]!"
                    ],
                    "on_conflict": [
                        284
                    ]
                }
            ],
            "insert_swap_orders_one": [
                256,
                {
                    "object": [
                        278,
                        "swap_orders_insert_input!"
                    ],
                    "on_conflict": [
                        284
                    ]
                }
            ],
            "insert_trust_network": [
                337,
                {
                    "objects": [
                        332,
                        "[trust_network_insert_input!]!"
                    ],
                    "on_conflict": [
                        362
                    ]
                }
            ],
            "insert_trust_network_notification": [
                352,
                {
                    "objects": [
                        347,
                        "[trust_network_notification_insert_input!]!"
                    ],
                    "on_conflict": [
                        353
                    ]
                }
            ],
            "insert_trust_network_notification_one": [
                338,
                {
                    "object": [
                        347,
                        "trust_network_notification_insert_input!"
                    ],
                    "on_conflict": [
                        353
                    ]
                }
            ],
            "insert_trust_network_one": [
                321,
                {
                    "object": [
                        332,
                        "trust_network_insert_input!"
                    ],
                    "on_conflict": [
                        362
                    ]
                }
            ],
            "insert_trust_network_status": [
                378,
                {
                    "objects": [
                        375,
                        "[trust_network_status_insert_input!]!"
                    ],
                    "on_conflict": [
                        379
                    ]
                }
            ],
            "insert_trust_network_status_one": [
                370,
                {
                    "object": [
                        375,
                        "trust_network_status_insert_input!"
                    ],
                    "on_conflict": [
                        379
                    ]
                }
            ],
            "make_p2p_buy_offer": [
                146,
                {
                    "offer": [
                        73
                    ]
                }
            ],
            "make_p2p_sell_offer": [
                146,
                {
                    "offer": [
                        74
                    ]
                }
            ],
            "reject_new_account": [
                5,
                {
                    "request_id": [
                        5
                    ]
                }
            ],
            "request_new_account": [
                219,
                {
                    "account_data": [
                        218
                    ]
                }
            ],
            "toggle_trust_network": [
                320,
                {
                    "input": [
                        319
                    ]
                }
            ],
            "update_accounts_information": [
                27,
                {
                    "_append": [
                        15
                    ],
                    "_delete_at_path": [
                        19
                    ],
                    "_delete_elem": [
                        20
                    ],
                    "_delete_key": [
                        21
                    ],
                    "_prepend": [
                        32
                    ],
                    "_set": [
                        36
                    ],
                    "where": [
                        17,
                        "accounts_information_bool_exp!"
                    ]
                }
            ],
            "update_accounts_information_by_pk": [
                7,
                {
                    "_append": [
                        15
                    ],
                    "_delete_at_path": [
                        19
                    ],
                    "_delete_elem": [
                        20
                    ],
                    "_delete_key": [
                        21
                    ],
                    "_prepend": [
                        32
                    ],
                    "_set": [
                        36
                    ],
                    "pk_columns": [
                        31,
                        "accounts_information_pk_columns_input!"
                    ]
                }
            ],
            "update_accounts_information_many": [
                27,
                {
                    "updates": [
                        40,
                        "[accounts_information_updates!]!"
                    ]
                }
            ],
            "update_devices": [
                58,
                {
                    "_set": [
                        63
                    ],
                    "where": [
                        51,
                        "devices_bool_exp!"
                    ]
                }
            ],
            "update_devices_by_pk": [
                44,
                {
                    "_set": [
                        63
                    ],
                    "pk_columns": [
                        61,
                        "devices_pk_columns_input!"
                    ]
                }
            ],
            "update_devices_many": [
                58,
                {
                    "updates": [
                        67,
                        "[devices_updates!]!"
                    ]
                }
            ],
            "update_messages": [
                89,
                {
                    "_set": [
                        94
                    ],
                    "where": [
                        82,
                        "messages_bool_exp!"
                    ]
                }
            ],
            "update_messages_by_pk": [
                75,
                {
                    "_set": [
                        94
                    ],
                    "pk_columns": [
                        92,
                        "messages_pk_columns_input!"
                    ]
                }
            ],
            "update_messages_many": [
                89,
                {
                    "updates": [
                        98,
                        "[messages_updates!]!"
                    ]
                }
            ],
            "update_migrate_device": [
                107,
                {
                    "_set": [
                        112
                    ],
                    "where": [
                        102,
                        "migrate_device_bool_exp!"
                    ]
                }
            ],
            "update_migrate_device_by_pk": [
                99,
                {
                    "_set": [
                        112
                    ],
                    "pk_columns": [
                        110,
                        "migrate_device_pk_columns_input!"
                    ]
                }
            ],
            "update_migrate_device_many": [
                107,
                {
                    "updates": [
                        116,
                        "[migrate_device_updates!]!"
                    ]
                }
            ],
            "update_notifications": [
                133,
                {
                    "_set": [
                        140
                    ],
                    "where": [
                        126,
                        "notifications_bool_exp!"
                    ]
                }
            ],
            "update_notifications_by_pk": [
                117,
                {
                    "_set": [
                        140
                    ],
                    "pk_columns": [
                        136,
                        "notifications_pk_columns_input!"
                    ]
                }
            ],
            "update_notifications_many": [
                133,
                {
                    "updates": [
                        144,
                        "[notifications_updates!]!"
                    ]
                }
            ],
            "update_p2p_offers": [
                163,
                {
                    "_set": [
                        171
                    ],
                    "where": [
                        156,
                        "p2p_offers_bool_exp!"
                    ]
                }
            ],
            "update_p2p_offers_by_pk": [
                147,
                {
                    "_set": [
                        171
                    ],
                    "pk_columns": [
                        167,
                        "p2p_offers_pk_columns_input!"
                    ]
                }
            ],
            "update_p2p_offers_many": [
                163,
                {
                    "updates": [
                        175,
                        "[p2p_offers_updates!]!"
                    ]
                }
            ],
            "update_preferences": [
                188,
                {
                    "_append": [
                        179
                    ],
                    "_delete_at_path": [
                        182
                    ],
                    "_delete_elem": [
                        183
                    ],
                    "_delete_key": [
                        184
                    ],
                    "_prepend": [
                        192
                    ],
                    "_set": [
                        194
                    ],
                    "where": [
                        180,
                        "preferences_bool_exp!"
                    ]
                }
            ],
            "update_preferences_by_pk": [
                176,
                {
                    "_append": [
                        179
                    ],
                    "_delete_at_path": [
                        182
                    ],
                    "_delete_elem": [
                        183
                    ],
                    "_delete_key": [
                        184
                    ],
                    "_prepend": [
                        192
                    ],
                    "_set": [
                        194
                    ],
                    "pk_columns": [
                        191,
                        "preferences_pk_columns_input!"
                    ]
                }
            ],
            "update_preferences_many": [
                188,
                {
                    "updates": [
                        198,
                        "[preferences_updates!]!"
                    ]
                }
            ],
            "update_reg_accounts": [
                207,
                {
                    "_set": [
                        213
                    ],
                    "where": [
                        202,
                        "reg_accounts_bool_exp!"
                    ]
                }
            ],
            "update_reg_accounts_by_pk": [
                199,
                {
                    "_set": [
                        213
                    ],
                    "pk_columns": [
                        211,
                        "reg_accounts_pk_columns_input!"
                    ]
                }
            ],
            "update_reg_accounts_many": [
                207,
                {
                    "updates": [
                        217,
                        "[reg_accounts_updates!]!"
                    ]
                }
            ],
            "update_signing_requests": [
                228,
                {
                    "_set": [
                        233
                    ],
                    "where": [
                        223,
                        "signing_requests_bool_exp!"
                    ]
                }
            ],
            "update_signing_requests_by_pk": [
                220,
                {
                    "_set": [
                        233
                    ],
                    "pk_columns": [
                        231,
                        "signing_requests_pk_columns_input!"
                    ]
                }
            ],
            "update_signing_requests_many": [
                228,
                {
                    "updates": [
                        237,
                        "[signing_requests_updates!]!"
                    ]
                }
            ],
            "update_swap_assets": [
                246,
                {
                    "_set": [
                        251
                    ],
                    "where": [
                        241,
                        "swap_assets_bool_exp!"
                    ]
                }
            ],
            "update_swap_assets_by_pk": [
                238,
                {
                    "_set": [
                        251
                    ],
                    "pk_columns": [
                        249,
                        "swap_assets_pk_columns_input!"
                    ]
                }
            ],
            "update_swap_assets_many": [
                246,
                {
                    "updates": [
                        255,
                        "[swap_assets_updates!]!"
                    ]
                }
            ],
            "update_swap_orders": [
                283,
                {
                    "_inc": [
                        277
                    ],
                    "_set": [
                        296
                    ],
                    "where": [
                        275,
                        "swap_orders_bool_exp!"
                    ]
                }
            ],
            "update_swap_orders_by_pk": [
                256,
                {
                    "_inc": [
                        277
                    ],
                    "_set": [
                        296
                    ],
                    "pk_columns": [
                        286,
                        "swap_orders_pk_columns_input!"
                    ]
                }
            ],
            "update_swap_orders_many": [
                283,
                {
                    "updates": [
                        308,
                        "[swap_orders_updates!]!"
                    ]
                }
            ],
            "update_trust_network": [
                337,
                {
                    "_set": [
                        369
                    ],
                    "where": [
                        330,
                        "trust_network_bool_exp!"
                    ]
                }
            ],
            "update_trust_network_by_pk": [
                321,
                {
                    "_set": [
                        369
                    ],
                    "pk_columns": [
                        365,
                        "trust_network_pk_columns_input!"
                    ]
                }
            ],
            "update_trust_network_many": [
                337,
                {
                    "updates": [
                        391,
                        "[trust_network_updates!]!"
                    ]
                }
            ],
            "update_trust_network_notification": [
                352,
                {
                    "_set": [
                        357
                    ],
                    "where": [
                        345,
                        "trust_network_notification_bool_exp!"
                    ]
                }
            ],
            "update_trust_network_notification_by_pk": [
                338,
                {
                    "_set": [
                        357
                    ],
                    "pk_columns": [
                        355,
                        "trust_network_notification_pk_columns_input!"
                    ]
                }
            ],
            "update_trust_network_notification_many": [
                352,
                {
                    "updates": [
                        361,
                        "[trust_network_notification_updates!]!"
                    ]
                }
            ],
            "update_trust_network_status": [
                378,
                {
                    "_set": [
                        383
                    ],
                    "where": [
                        373,
                        "trust_network_status_bool_exp!"
                    ]
                }
            ],
            "update_trust_network_status_by_pk": [
                370,
                {
                    "_set": [
                        383
                    ],
                    "pk_columns": [
                        381,
                        "trust_network_status_pk_columns_input!"
                    ]
                }
            ],
            "update_trust_network_status_many": [
                378,
                {
                    "updates": [
                        387,
                        "[trust_network_status_updates!]!"
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "Subscription": {
            "accounts_information": [
                7,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "accounts_information_aggregate": [
                8,
                {
                    "distinct_on": [
                        33,
                        "[accounts_information_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        30,
                        "[accounts_information_order_by!]"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "accounts_information_by_pk": [
                7,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "accounts_information_stream": [
                7,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        37,
                        "[accounts_information_stream_cursor_input]!"
                    ],
                    "where": [
                        17
                    ]
                }
            ],
            "devices": [
                44,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "devices_aggregate": [
                45,
                {
                    "distinct_on": [
                        62,
                        "[devices_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        60,
                        "[devices_order_by!]"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "devices_by_pk": [
                44,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "devices_stream": [
                44,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        64,
                        "[devices_stream_cursor_input]!"
                    ],
                    "where": [
                        51
                    ]
                }
            ],
            "messages": [
                75,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_aggregate": [
                76,
                {
                    "distinct_on": [
                        93,
                        "[messages_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        91,
                        "[messages_order_by!]"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "messages_by_pk": [
                75,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "messages_stream": [
                75,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        95,
                        "[messages_stream_cursor_input]!"
                    ],
                    "where": [
                        82
                    ]
                }
            ],
            "migrate_device": [
                99,
                {
                    "distinct_on": [
                        111,
                        "[migrate_device_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        109,
                        "[migrate_device_order_by!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "migrate_device_aggregate": [
                100,
                {
                    "distinct_on": [
                        111,
                        "[migrate_device_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        109,
                        "[migrate_device_order_by!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "migrate_device_by_pk": [
                99,
                {
                    "cred_id": [
                        5,
                        "String!"
                    ]
                }
            ],
            "migrate_device_stream": [
                99,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        113,
                        "[migrate_device_stream_cursor_input]!"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "notifications": [
                117,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_aggregate": [
                118,
                {
                    "distinct_on": [
                        137,
                        "[notifications_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        135,
                        "[notifications_order_by!]"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "notifications_by_pk": [
                117,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "notifications_stream": [
                117,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        141,
                        "[notifications_stream_cursor_input]!"
                    ],
                    "where": [
                        126
                    ]
                }
            ],
            "p2p_offers": [
                147,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_aggregate": [
                148,
                {
                    "distinct_on": [
                        168,
                        "[p2p_offers_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        166,
                        "[p2p_offers_order_by!]"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "p2p_offers_by_pk": [
                147,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "p2p_offers_stream": [
                147,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        172,
                        "[p2p_offers_stream_cursor_input]!"
                    ],
                    "where": [
                        156
                    ]
                }
            ],
            "preferences": [
                176,
                {
                    "distinct_on": [
                        193,
                        "[preferences_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        190,
                        "[preferences_order_by!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "preferences_aggregate": [
                177,
                {
                    "distinct_on": [
                        193,
                        "[preferences_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        190,
                        "[preferences_order_by!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "preferences_by_pk": [
                176,
                {
                    "account": [
                        5,
                        "String!"
                    ]
                }
            ],
            "preferences_stream": [
                176,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        195,
                        "[preferences_stream_cursor_input]!"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "reg_accounts": [
                199,
                {
                    "distinct_on": [
                        212,
                        "[reg_accounts_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        210,
                        "[reg_accounts_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "reg_accounts_aggregate": [
                200,
                {
                    "distinct_on": [
                        212,
                        "[reg_accounts_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        210,
                        "[reg_accounts_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "reg_accounts_by_pk": [
                199,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "reg_accounts_stream": [
                199,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        214,
                        "[reg_accounts_stream_cursor_input]!"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "signing_requests": [
                220,
                {
                    "distinct_on": [
                        232,
                        "[signing_requests_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        230,
                        "[signing_requests_order_by!]"
                    ],
                    "where": [
                        223
                    ]
                }
            ],
            "signing_requests_aggregate": [
                221,
                {
                    "distinct_on": [
                        232,
                        "[signing_requests_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        230,
                        "[signing_requests_order_by!]"
                    ],
                    "where": [
                        223
                    ]
                }
            ],
            "signing_requests_by_pk": [
                220,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "signing_requests_stream": [
                220,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        234,
                        "[signing_requests_stream_cursor_input]!"
                    ],
                    "where": [
                        223
                    ]
                }
            ],
            "swap_assets": [
                238,
                {
                    "distinct_on": [
                        250,
                        "[swap_assets_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        248,
                        "[swap_assets_order_by!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "swap_assets_aggregate": [
                239,
                {
                    "distinct_on": [
                        250,
                        "[swap_assets_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        248,
                        "[swap_assets_order_by!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "swap_assets_by_pk": [
                238,
                {
                    "asset": [
                        5,
                        "String!"
                    ],
                    "chain": [
                        5,
                        "String!"
                    ]
                }
            ],
            "swap_assets_stream": [
                238,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        252,
                        "[swap_assets_stream_cursor_input]!"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "swap_orders": [
                256,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "swap_orders_aggregate": [
                257,
                {
                    "distinct_on": [
                        287,
                        "[swap_orders_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        285,
                        "[swap_orders_order_by!]"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "swap_orders_by_pk": [
                256,
                {
                    "id": [
                        392,
                        "uuid!"
                    ]
                }
            ],
            "swap_orders_stream": [
                256,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        303,
                        "[swap_orders_stream_cursor_input]!"
                    ],
                    "where": [
                        275
                    ]
                }
            ],
            "trust_network": [
                321,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_network_aggregate": [
                322,
                {
                    "distinct_on": [
                        366,
                        "[trust_network_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        363,
                        "[trust_network_order_by!]"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "trust_network_by_pk": [
                321,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "trust_network_notification": [
                338,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notification_aggregate": [
                339,
                {
                    "distinct_on": [
                        356,
                        "[trust_network_notification_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        354,
                        "[trust_network_notification_order_by!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_notification_by_pk": [
                338,
                {
                    "account": [
                        5,
                        "String!"
                    ],
                    "trust": [
                        5,
                        "String!"
                    ]
                }
            ],
            "trust_network_notification_stream": [
                338,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        358,
                        "[trust_network_notification_stream_cursor_input]!"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "trust_network_status": [
                370,
                {
                    "distinct_on": [
                        382,
                        "[trust_network_status_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        380,
                        "[trust_network_status_order_by!]"
                    ],
                    "where": [
                        373
                    ]
                }
            ],
            "trust_network_status_aggregate": [
                371,
                {
                    "distinct_on": [
                        382,
                        "[trust_network_status_select_column!]"
                    ],
                    "limit": [
                        3
                    ],
                    "offset": [
                        3
                    ],
                    "order_by": [
                        380,
                        "[trust_network_status_order_by!]"
                    ],
                    "where": [
                        373
                    ]
                }
            ],
            "trust_network_status_by_pk": [
                370,
                {
                    "status": [
                        5,
                        "String!"
                    ]
                }
            ],
            "trust_network_status_stream": [
                370,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        384,
                        "[trust_network_status_stream_cursor_input]!"
                    ],
                    "where": [
                        373
                    ]
                }
            ],
            "trust_network_stream": [
                321,
                {
                    "batch_size": [
                        3,
                        "Int!"
                    ],
                    "cursor": [
                        388,
                        "[trust_network_stream_cursor_input]!"
                    ],
                    "where": [
                        330
                    ]
                }
            ],
            "__typename": [
                5
            ]
        }
    }
}