export default {
    "scalars": [
        0,
        5,
        19,
        32,
        42,
        46,
        52,
        58,
        64,
        74,
        84,
        93,
        103,
        109,
        121,
        134,
        144,
        150,
        159,
        179,
        190,
        193
    ],
    "types": {
        "Boolean": {},
        "BooleanComparisonExp": {
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
            "_isNull": [
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
                150
            ]
        },
        "Category": {
            "categoryId": [
                84
            ],
            "chatbots": [
                12,
                {
                    "distinctOn": [
                        19,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        18,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "name": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "CategoryBoolExp": {
            "_and": [
                3
            ],
            "_not": [
                3
            ],
            "_or": [
                3
            ],
            "categoryId": [
                85
            ],
            "chatbots": [
                15
            ],
            "name": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotsAggregate": [
                13
            ],
            "name": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "CategorySelectColumn": {},
        "CategoryStreamCursorInput": {
            "initialValue": [
                7
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                84
            ],
            "name": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "Chatbot": {
            "avatar": [
                150
            ],
            "categories": [
                12,
                {
                    "distinctOn": [
                        19,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        18,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "chatbotId": [
                84
            ],
            "createdBy": [
                150
            ],
            "defaultComplexity": [
                150
            ],
            "defaultLength": [
                150
            ],
            "defaultTone": [
                150
            ],
            "defaultType": [
                150
            ],
            "default_complexity_enum": [
                43
            ],
            "default_length_enum": [
                49
            ],
            "default_tone_enum": [
                55
            ],
            "default_type_enum": [
                61
            ],
            "description": [
                150
            ],
            "gpt_chats": [
                67,
                {
                    "distinctOn": [
                        74,
                        "[GptChatSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        73,
                        "[GptChatOrderBy!]"
                    ],
                    "where": [
                        70
                    ]
                }
            ],
            "name": [
                150
            ],
            "prompts": [
                114,
                {
                    "distinctOn": [
                        121,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        120,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                10
            ],
            "count": [
                109
            ],
            "max": [
                29
            ],
            "min": [
                30
            ],
            "stddev": [
                33
            ],
            "stddevPop": [
                34
            ],
            "stddevSamp": [
                35
            ],
            "sum": [
                38
            ],
            "varPop": [
                39
            ],
            "varSamp": [
                40
            ],
            "variance": [
                41
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                11
            ],
            "_not": [
                11
            ],
            "_or": [
                11
            ],
            "avatar": [
                151
            ],
            "categories": [
                15
            ],
            "chatbotId": [
                85
            ],
            "createdBy": [
                151
            ],
            "defaultComplexity": [
                151
            ],
            "defaultLength": [
                151
            ],
            "defaultTone": [
                151
            ],
            "defaultType": [
                151
            ],
            "default_complexity_enum": [
                44
            ],
            "default_length_enum": [
                50
            ],
            "default_tone_enum": [
                56
            ],
            "default_type_enum": [
                62
            ],
            "description": [
                151
            ],
            "gpt_chats": [
                70
            ],
            "name": [
                151
            ],
            "prompts": [
                117
            ],
            "user_chatbot_preferences": [
                175
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategory": {
            "category": [
                2
            ],
            "categoryId": [
                84
            ],
            "chatbot": [
                8
            ],
            "chatbotId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                14
            ],
            "count": [
                109
            ],
            "max": [
                16
            ],
            "min": [
                17
            ],
            "stddev": [
                20
            ],
            "stddevPop": [
                21
            ],
            "stddevSamp": [
                22
            ],
            "sum": [
                25
            ],
            "varPop": [
                26
            ],
            "varSamp": [
                27
            ],
            "variance": [
                28
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                15
            ],
            "_not": [
                15
            ],
            "_or": [
                15
            ],
            "category": [
                3
            ],
            "categoryId": [
                85
            ],
            "chatbot": [
                11
            ],
            "chatbotId": [
                85
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                4
            ],
            "categoryId": [
                109
            ],
            "chatbot": [
                31
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategorySelectColumn": {},
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                24
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                84
            ],
            "chatbotId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                109
            ],
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                109
            ],
            "chatbotId": [
                109
            ],
            "createdBy": [
                109
            ],
            "defaultComplexity": [
                109
            ],
            "defaultLength": [
                109
            ],
            "defaultTone": [
                109
            ],
            "defaultType": [
                109
            ],
            "description": [
                109
            ],
            "name": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                109
            ],
            "chatbotId": [
                109
            ],
            "createdBy": [
                109
            ],
            "defaultComplexity": [
                109
            ],
            "defaultLength": [
                109
            ],
            "defaultTone": [
                109
            ],
            "defaultType": [
                109
            ],
            "description": [
                109
            ],
            "name": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                109
            ],
            "categoriesAggregate": [
                13
            ],
            "chatbotId": [
                109
            ],
            "createdBy": [
                109
            ],
            "defaultComplexity": [
                109
            ],
            "defaultLength": [
                109
            ],
            "defaultTone": [
                109
            ],
            "defaultType": [
                109
            ],
            "default_complexity_enum": [
                45
            ],
            "default_length_enum": [
                51
            ],
            "default_tone_enum": [
                57
            ],
            "default_type_enum": [
                63
            ],
            "description": [
                109
            ],
            "gpt_chatsAggregate": [
                68
            ],
            "name": [
                109
            ],
            "promptsAggregate": [
                115
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotStreamCursorInput": {
            "initialValue": [
                37
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                150
            ],
            "chatbotId": [
                84
            ],
            "createdBy": [
                150
            ],
            "defaultComplexity": [
                150
            ],
            "defaultLength": [
                150
            ],
            "defaultTone": [
                150
            ],
            "defaultType": [
                150
            ],
            "description": [
                150
            ],
            "name": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "CursorOrdering": {},
        "DefaultComplexityEnum": {
            "chatbots": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultComplexityEnumBoolExp": {
            "_and": [
                44
            ],
            "_not": [
                44
            ],
            "_or": [
                44
            ],
            "chatbots": [
                11
            ],
            "user_chatbot_preferences": [
                175
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "DefaultComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                9
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "DefaultComplexityEnumSelectColumn": {},
        "DefaultComplexityEnumStreamCursorInput": {
            "initialValue": [
                48
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "DefaultComplexityEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultLengthEnum": {
            "chatbots": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultLengthEnumBoolExp": {
            "_and": [
                50
            ],
            "_not": [
                50
            ],
            "_or": [
                50
            ],
            "chatbots": [
                11
            ],
            "user_chatbot_preferences": [
                175
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "DefaultLengthEnumOrderBy": {
            "chatbotsAggregate": [
                9
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "DefaultLengthEnumSelectColumn": {},
        "DefaultLengthEnumStreamCursorInput": {
            "initialValue": [
                54
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "DefaultLengthEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultToneEnum": {
            "chatbots": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultToneEnumBoolExp": {
            "_and": [
                56
            ],
            "_not": [
                56
            ],
            "_or": [
                56
            ],
            "chatbots": [
                11
            ],
            "user_chatbot_preferences": [
                175
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "DefaultToneEnumOrderBy": {
            "chatbotsAggregate": [
                9
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "DefaultToneEnumSelectColumn": {},
        "DefaultToneEnumStreamCursorInput": {
            "initialValue": [
                60
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "DefaultToneEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultTypeEnum": {
            "chatbots": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "DefaultTypeEnumBoolExp": {
            "_and": [
                62
            ],
            "_not": [
                62
            ],
            "_or": [
                62
            ],
            "chatbots": [
                11
            ],
            "user_chatbot_preferences": [
                175
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "DefaultTypeEnumOrderBy": {
            "chatbotsAggregate": [
                9
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "DefaultTypeEnumSelectColumn": {},
        "DefaultTypeEnumStreamCursorInput": {
            "initialValue": [
                66
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "DefaultTypeEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "GptChat": {
            "addedBy": [
                84
            ],
            "chatbot": [
                8
            ],
            "chatbotId": [
                84
            ],
            "conversationLink": [
                150
            ],
            "gptChatId": [
                84
            ],
            "user": [
                170
            ],
            "__typename": [
                150
            ]
        },
        "GptChatAggregateOrderBy": {
            "avg": [
                69
            ],
            "count": [
                109
            ],
            "max": [
                71
            ],
            "min": [
                72
            ],
            "stddev": [
                75
            ],
            "stddevPop": [
                76
            ],
            "stddevSamp": [
                77
            ],
            "sum": [
                80
            ],
            "varPop": [
                81
            ],
            "varSamp": [
                82
            ],
            "variance": [
                83
            ],
            "__typename": [
                150
            ]
        },
        "GptChatAvgOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatBoolExp": {
            "_and": [
                70
            ],
            "_not": [
                70
            ],
            "_or": [
                70
            ],
            "addedBy": [
                85
            ],
            "chatbot": [
                11
            ],
            "chatbotId": [
                85
            ],
            "conversationLink": [
                151
            ],
            "gptChatId": [
                85
            ],
            "user": [
                171
            ],
            "__typename": [
                150
            ]
        },
        "GptChatMaxOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "conversationLink": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatMinOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "conversationLink": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatOrderBy": {
            "addedBy": [
                109
            ],
            "chatbot": [
                31
            ],
            "chatbotId": [
                109
            ],
            "conversationLink": [
                109
            ],
            "gptChatId": [
                109
            ],
            "user": [
                189
            ],
            "__typename": [
                150
            ]
        },
        "GptChatSelectColumn": {},
        "GptChatStddevOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatStddevPopOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatStddevSampOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatStreamCursorInput": {
            "initialValue": [
                79
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "GptChatStreamCursorValueInput": {
            "addedBy": [
                84
            ],
            "chatbotId": [
                84
            ],
            "conversationLink": [
                150
            ],
            "gptChatId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "GptChatSumOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatVarPopOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatVarSampOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "GptChatVarianceOrderBy": {
            "addedBy": [
                109
            ],
            "chatbotId": [
                109
            ],
            "gptChatId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "Int": {},
        "IntComparisonExp": {
            "_eq": [
                84
            ],
            "_gt": [
                84
            ],
            "_gte": [
                84
            ],
            "_in": [
                84
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                84
            ],
            "_lte": [
                84
            ],
            "_neq": [
                84
            ],
            "_nin": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "Message": {
            "content": [
                150
            ],
            "createdAt": [
                193
            ],
            "messageId": [
                84
            ],
            "message_type_enum": [
                100
            ],
            "relatedMessageId": [
                84
            ],
            "thread": [
                152
            ],
            "threadId": [
                84
            ],
            "type": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "MessageAggregateOrderBy": {
            "avg": [
                88
            ],
            "count": [
                109
            ],
            "max": [
                90
            ],
            "min": [
                91
            ],
            "stddev": [
                94
            ],
            "stddevPop": [
                95
            ],
            "stddevSamp": [
                96
            ],
            "sum": [
                99
            ],
            "varPop": [
                106
            ],
            "varSamp": [
                107
            ],
            "variance": [
                108
            ],
            "__typename": [
                150
            ]
        },
        "MessageAvgOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageBoolExp": {
            "_and": [
                89
            ],
            "_not": [
                89
            ],
            "_or": [
                89
            ],
            "content": [
                151
            ],
            "createdAt": [
                169
            ],
            "messageId": [
                85
            ],
            "message_type_enum": [
                101
            ],
            "relatedMessageId": [
                85
            ],
            "thread": [
                155
            ],
            "threadId": [
                85
            ],
            "type": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "MessageMaxOrderBy": {
            "content": [
                109
            ],
            "createdAt": [
                109
            ],
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageMinOrderBy": {
            "content": [
                109
            ],
            "createdAt": [
                109
            ],
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageOrderBy": {
            "content": [
                109
            ],
            "createdAt": [
                109
            ],
            "messageId": [
                109
            ],
            "message_type_enum": [
                102
            ],
            "relatedMessageId": [
                109
            ],
            "thread": [
                158
            ],
            "threadId": [
                109
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageSelectColumn": {},
        "MessageStddevOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageStddevPopOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageStddevSampOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                98
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                150
            ],
            "createdAt": [
                193
            ],
            "messageId": [
                84
            ],
            "relatedMessageId": [
                84
            ],
            "threadId": [
                84
            ],
            "type": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "MessageSumOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                86,
                {
                    "distinctOn": [
                        93,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        92,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                101
            ],
            "_not": [
                101
            ],
            "_or": [
                101
            ],
            "messages": [
                89
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                87
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                105
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "MessageVarPopOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageVarSampOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "MessageVarianceOrderBy": {
            "messageId": [
                109
            ],
            "relatedMessageId": [
                109
            ],
            "threadId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "OrderBy": {},
        "Prompt": {
            "content": [
                150
            ],
            "promptId": [
                84
            ],
            "promptName": [
                150
            ],
            "prompt_chatbots": [
                114,
                {
                    "distinctOn": [
                        121,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        120,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "prompt_type_enum": [
                141
            ],
            "type": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                112
            ],
            "count": [
                109
            ],
            "max": [
                131
            ],
            "min": [
                132
            ],
            "stddev": [
                135
            ],
            "stddevPop": [
                136
            ],
            "stddevSamp": [
                137
            ],
            "sum": [
                140
            ],
            "varPop": [
                147
            ],
            "varSamp": [
                148
            ],
            "variance": [
                149
            ],
            "__typename": [
                150
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptBoolExp": {
            "_and": [
                113
            ],
            "_not": [
                113
            ],
            "_or": [
                113
            ],
            "content": [
                151
            ],
            "promptId": [
                85
            ],
            "promptName": [
                151
            ],
            "prompt_chatbots": [
                117
            ],
            "prompt_type_enum": [
                142
            ],
            "type": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                84
            ],
            "chatbot": [
                8
            ],
            "prompt": [
                110
            ],
            "promptId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                116
            ],
            "count": [
                109
            ],
            "max": [
                118
            ],
            "min": [
                119
            ],
            "stddev": [
                122
            ],
            "stddevPop": [
                123
            ],
            "stddevSamp": [
                124
            ],
            "sum": [
                127
            ],
            "varPop": [
                128
            ],
            "varSamp": [
                129
            ],
            "variance": [
                130
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                117
            ],
            "_not": [
                117
            ],
            "_or": [
                117
            ],
            "chabotId": [
                85
            ],
            "chatbot": [
                11
            ],
            "prompt": [
                113
            ],
            "promptId": [
                85
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                109
            ],
            "chatbot": [
                31
            ],
            "prompt": [
                133
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotSelectColumn": {},
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                126
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotStreamCursorValueInput": {
            "chabotId": [
                84
            ],
            "promptId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                109
            ],
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                109
            ],
            "promptId": [
                109
            ],
            "promptName": [
                109
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                109
            ],
            "promptId": [
                109
            ],
            "promptName": [
                109
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptOrderBy": {
            "content": [
                109
            ],
            "promptId": [
                109
            ],
            "promptName": [
                109
            ],
            "prompt_chatbotsAggregate": [
                115
            ],
            "prompt_type_enum": [
                143
            ],
            "type": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptSelectColumn": {},
        "PromptStddevOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                139
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                150
            ],
            "promptId": [
                84
            ],
            "promptName": [
                150
            ],
            "type": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                110,
                {
                    "distinctOn": [
                        134,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        133,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        113
                    ]
                }
            ],
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                142
            ],
            "_not": [
                142
            ],
            "_or": [
                142
            ],
            "prompts": [
                113
            ],
            "value": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                111
            ],
            "value": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                146
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                150
            ],
            "_gt": [
                150
            ],
            "_gte": [
                150
            ],
            "_ilike": [
                150
            ],
            "_in": [
                150
            ],
            "_iregex": [
                150
            ],
            "_isNull": [
                0
            ],
            "_like": [
                150
            ],
            "_lt": [
                150
            ],
            "_lte": [
                150
            ],
            "_neq": [
                150
            ],
            "_nilike": [
                150
            ],
            "_nin": [
                150
            ],
            "_niregex": [
                150
            ],
            "_nlike": [
                150
            ],
            "_nregex": [
                150
            ],
            "_nsimilar": [
                150
            ],
            "_regex": [
                150
            ],
            "_similar": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "Thread": {
            "chatbot": [
                8
            ],
            "chatbotId": [
                84
            ],
            "createdAt": [
                193
            ],
            "messages": [
                86,
                {
                    "distinctOn": [
                        93,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        92,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "threadId": [
                84
            ],
            "updatedAt": [
                193
            ],
            "user": [
                170
            ],
            "userId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                154
            ],
            "count": [
                109
            ],
            "max": [
                156
            ],
            "min": [
                157
            ],
            "stddev": [
                160
            ],
            "stddevPop": [
                161
            ],
            "stddevSamp": [
                162
            ],
            "sum": [
                165
            ],
            "varPop": [
                166
            ],
            "varSamp": [
                167
            ],
            "variance": [
                168
            ],
            "__typename": [
                150
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                155
            ],
            "_not": [
                155
            ],
            "_or": [
                155
            ],
            "chatbot": [
                11
            ],
            "chatbotId": [
                85
            ],
            "createdAt": [
                169
            ],
            "messages": [
                89
            ],
            "threadId": [
                85
            ],
            "updatedAt": [
                169
            ],
            "user": [
                171
            ],
            "userId": [
                85
            ],
            "__typename": [
                150
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                109
            ],
            "createdAt": [
                109
            ],
            "threadId": [
                109
            ],
            "updatedAt": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                109
            ],
            "createdAt": [
                109
            ],
            "threadId": [
                109
            ],
            "updatedAt": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                31
            ],
            "chatbotId": [
                109
            ],
            "createdAt": [
                109
            ],
            "messagesAggregate": [
                87
            ],
            "threadId": [
                109
            ],
            "updatedAt": [
                109
            ],
            "user": [
                189
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadSelectColumn": {},
        "ThreadStddevOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                164
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                84
            ],
            "createdAt": [
                193
            ],
            "threadId": [
                84
            ],
            "updatedAt": [
                193
            ],
            "userId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                109
            ],
            "threadId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                193
            ],
            "_gt": [
                193
            ],
            "_gte": [
                193
            ],
            "_in": [
                193
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                193
            ],
            "_lte": [
                193
            ],
            "_neq": [
                193
            ],
            "_nin": [
                193
            ],
            "__typename": [
                150
            ]
        },
        "User": {
            "dateJoined": [
                193
            ],
            "email": [
                150
            ],
            "gpt_chats": [
                67,
                {
                    "distinctOn": [
                        74,
                        "[GptChatSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        73,
                        "[GptChatOrderBy!]"
                    ],
                    "where": [
                        70
                    ]
                }
            ],
            "lastLogin": [
                193
            ],
            "password": [
                150
            ],
            "profilePicture": [
                150
            ],
            "threads": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        158,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "userId": [
                84
            ],
            "user_chatbot_preferences": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "username": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "UserBoolExp": {
            "_and": [
                171
            ],
            "_not": [
                171
            ],
            "_or": [
                171
            ],
            "dateJoined": [
                169
            ],
            "email": [
                151
            ],
            "gpt_chats": [
                70
            ],
            "lastLogin": [
                169
            ],
            "password": [
                151
            ],
            "profilePicture": [
                151
            ],
            "threads": [
                155
            ],
            "userId": [
                85
            ],
            "user_chatbot_preferences": [
                175
            ],
            "username": [
                151
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreference": {
            "chatbot": [
                8
            ],
            "chatbotId": [
                84
            ],
            "default_complexity_enum": [
                43
            ],
            "default_length_enum": [
                49
            ],
            "default_tone_enum": [
                55
            ],
            "default_type_enum": [
                61
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                84
            ],
            "preferredComplexity": [
                150
            ],
            "preferredLength": [
                150
            ],
            "preferredTone": [
                150
            ],
            "preferredType": [
                150
            ],
            "user": [
                170
            ],
            "userId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceAggregateOrderBy": {
            "avg": [
                174
            ],
            "count": [
                109
            ],
            "max": [
                176
            ],
            "min": [
                177
            ],
            "stddev": [
                180
            ],
            "stddevPop": [
                181
            ],
            "stddevSamp": [
                182
            ],
            "sum": [
                185
            ],
            "varPop": [
                186
            ],
            "varSamp": [
                187
            ],
            "variance": [
                188
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceAvgOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceBoolExp": {
            "_and": [
                175
            ],
            "_not": [
                175
            ],
            "_or": [
                175
            ],
            "chatbot": [
                11
            ],
            "chatbotId": [
                85
            ],
            "default_complexity_enum": [
                44
            ],
            "default_length_enum": [
                50
            ],
            "default_tone_enum": [
                56
            ],
            "default_type_enum": [
                62
            ],
            "favorite": [
                1
            ],
            "preferenceId": [
                85
            ],
            "preferredComplexity": [
                151
            ],
            "preferredLength": [
                151
            ],
            "preferredTone": [
                151
            ],
            "preferredType": [
                151
            ],
            "user": [
                171
            ],
            "userId": [
                85
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceMaxOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "preferredComplexity": [
                109
            ],
            "preferredLength": [
                109
            ],
            "preferredTone": [
                109
            ],
            "preferredType": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceMinOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "preferredComplexity": [
                109
            ],
            "preferredLength": [
                109
            ],
            "preferredTone": [
                109
            ],
            "preferredType": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceOrderBy": {
            "chatbot": [
                31
            ],
            "chatbotId": [
                109
            ],
            "default_complexity_enum": [
                45
            ],
            "default_length_enum": [
                51
            ],
            "default_tone_enum": [
                57
            ],
            "default_type_enum": [
                63
            ],
            "favorite": [
                109
            ],
            "preferenceId": [
                109
            ],
            "preferredComplexity": [
                109
            ],
            "preferredLength": [
                109
            ],
            "preferredTone": [
                109
            ],
            "preferredType": [
                109
            ],
            "user": [
                189
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceSelectColumn": {},
        "UserChatbotPreferenceStddevOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceStddevPopOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceStddevSampOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceStreamCursorInput": {
            "initialValue": [
                184
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceStreamCursorValueInput": {
            "chatbotId": [
                84
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                84
            ],
            "preferredComplexity": [
                150
            ],
            "preferredLength": [
                150
            ],
            "preferredTone": [
                150
            ],
            "preferredType": [
                150
            ],
            "userId": [
                84
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceSumOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceVarPopOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceVarSampOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserChatbotPreferenceVarianceOrderBy": {
            "chatbotId": [
                109
            ],
            "preferenceId": [
                109
            ],
            "userId": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserOrderBy": {
            "dateJoined": [
                109
            ],
            "email": [
                109
            ],
            "gpt_chatsAggregate": [
                68
            ],
            "lastLogin": [
                109
            ],
            "password": [
                109
            ],
            "profilePicture": [
                109
            ],
            "threadsAggregate": [
                153
            ],
            "userId": [
                109
            ],
            "user_chatbot_preferencesAggregate": [
                173
            ],
            "username": [
                109
            ],
            "__typename": [
                150
            ]
        },
        "UserSelectColumn": {},
        "UserStreamCursorInput": {
            "initialValue": [
                192
            ],
            "ordering": [
                42
            ],
            "__typename": [
                150
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                193
            ],
            "email": [
                150
            ],
            "lastLogin": [
                193
            ],
            "password": [
                150
            ],
            "profilePicture": [
                150
            ],
            "userId": [
                84
            ],
            "username": [
                150
            ],
            "__typename": [
                150
            ]
        },
        "timestamptz": {},
        "Query": {
            "category": [
                2,
                {
                    "distinctOn": [
                        5,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        4,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        3
                    ]
                }
            ],
            "categoryByPk": [
                2,
                {
                    "categoryId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "chatbot": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "chatbotByPk": [
                8,
                {
                    "chatbotId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                12,
                {
                    "distinctOn": [
                        19,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        18,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                12,
                {
                    "categoryId": [
                        84,
                        "Int!"
                    ],
                    "chatbotId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "defaultComplexityEnum": [
                43,
                {
                    "distinctOn": [
                        46,
                        "[DefaultComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        45,
                        "[DefaultComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        44
                    ]
                }
            ],
            "defaultComplexityEnumByPk": [
                43,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultLengthEnum": [
                49,
                {
                    "distinctOn": [
                        52,
                        "[DefaultLengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        51,
                        "[DefaultLengthEnumOrderBy!]"
                    ],
                    "where": [
                        50
                    ]
                }
            ],
            "defaultLengthEnumByPk": [
                49,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultToneEnum": [
                55,
                {
                    "distinctOn": [
                        58,
                        "[DefaultToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        57,
                        "[DefaultToneEnumOrderBy!]"
                    ],
                    "where": [
                        56
                    ]
                }
            ],
            "defaultToneEnumByPk": [
                55,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultTypeEnum": [
                61,
                {
                    "distinctOn": [
                        64,
                        "[DefaultTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        63,
                        "[DefaultTypeEnumOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "defaultTypeEnumByPk": [
                61,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "gptChat": [
                67,
                {
                    "distinctOn": [
                        74,
                        "[GptChatSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        73,
                        "[GptChatOrderBy!]"
                    ],
                    "where": [
                        70
                    ]
                }
            ],
            "gptChatByPk": [
                67,
                {
                    "gptChatId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "message": [
                86,
                {
                    "distinctOn": [
                        93,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        92,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "messageByPk": [
                86,
                {
                    "messageId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "messageTypeEnum": [
                100,
                {
                    "distinctOn": [
                        103,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        102,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        101
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                100,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "prompt": [
                110,
                {
                    "distinctOn": [
                        134,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        133,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        113
                    ]
                }
            ],
            "promptByPk": [
                110,
                {
                    "promptId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                114,
                {
                    "distinctOn": [
                        121,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        120,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "promptChatbotByPk": [
                114,
                {
                    "chabotId": [
                        84,
                        "Int!"
                    ],
                    "promptId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "promptTypeEnum": [
                141,
                {
                    "distinctOn": [
                        144,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        143,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        142
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                141,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "thread": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        158,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "threadByPk": [
                152,
                {
                    "threadId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "user": [
                170,
                {
                    "distinctOn": [
                        190,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        189,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        171
                    ]
                }
            ],
            "userByPk": [
                170,
                {
                    "userId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "userChatbotPreference": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "userChatbotPreferenceByPk": [
                172,
                {
                    "preferenceId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                150
            ]
        },
        "Subscription": {
            "category": [
                2,
                {
                    "distinctOn": [
                        5,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        4,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        3
                    ]
                }
            ],
            "categoryByPk": [
                2,
                {
                    "categoryId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "categoryStream": [
                2,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        6,
                        "[CategoryStreamCursorInput]!"
                    ],
                    "where": [
                        3
                    ]
                }
            ],
            "chatbot": [
                8,
                {
                    "distinctOn": [
                        32,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        31,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "chatbotByPk": [
                8,
                {
                    "chatbotId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                12,
                {
                    "distinctOn": [
                        19,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        18,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                12,
                {
                    "categoryId": [
                        84,
                        "Int!"
                    ],
                    "chatbotId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategoryStream": [
                12,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        23,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        15
                    ]
                }
            ],
            "chatbotStream": [
                8,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        36,
                        "[ChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        11
                    ]
                }
            ],
            "defaultComplexityEnum": [
                43,
                {
                    "distinctOn": [
                        46,
                        "[DefaultComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        45,
                        "[DefaultComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        44
                    ]
                }
            ],
            "defaultComplexityEnumByPk": [
                43,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultComplexityEnumStream": [
                43,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        47,
                        "[DefaultComplexityEnumStreamCursorInput]!"
                    ],
                    "where": [
                        44
                    ]
                }
            ],
            "defaultLengthEnum": [
                49,
                {
                    "distinctOn": [
                        52,
                        "[DefaultLengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        51,
                        "[DefaultLengthEnumOrderBy!]"
                    ],
                    "where": [
                        50
                    ]
                }
            ],
            "defaultLengthEnumByPk": [
                49,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultLengthEnumStream": [
                49,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        53,
                        "[DefaultLengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        50
                    ]
                }
            ],
            "defaultToneEnum": [
                55,
                {
                    "distinctOn": [
                        58,
                        "[DefaultToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        57,
                        "[DefaultToneEnumOrderBy!]"
                    ],
                    "where": [
                        56
                    ]
                }
            ],
            "defaultToneEnumByPk": [
                55,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultToneEnumStream": [
                55,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        59,
                        "[DefaultToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        56
                    ]
                }
            ],
            "defaultTypeEnum": [
                61,
                {
                    "distinctOn": [
                        64,
                        "[DefaultTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        63,
                        "[DefaultTypeEnumOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "defaultTypeEnumByPk": [
                61,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "defaultTypeEnumStream": [
                61,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        65,
                        "[DefaultTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "gptChat": [
                67,
                {
                    "distinctOn": [
                        74,
                        "[GptChatSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        73,
                        "[GptChatOrderBy!]"
                    ],
                    "where": [
                        70
                    ]
                }
            ],
            "gptChatByPk": [
                67,
                {
                    "gptChatId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "gptChatStream": [
                67,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        78,
                        "[GptChatStreamCursorInput]!"
                    ],
                    "where": [
                        70
                    ]
                }
            ],
            "message": [
                86,
                {
                    "distinctOn": [
                        93,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        92,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "messageByPk": [
                86,
                {
                    "messageId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "messageStream": [
                86,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        97,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "messageTypeEnum": [
                100,
                {
                    "distinctOn": [
                        103,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        102,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        101
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                100,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                100,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        104,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        101
                    ]
                }
            ],
            "prompt": [
                110,
                {
                    "distinctOn": [
                        134,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        133,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        113
                    ]
                }
            ],
            "promptByPk": [
                110,
                {
                    "promptId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                114,
                {
                    "distinctOn": [
                        121,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        120,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "promptChatbotByPk": [
                114,
                {
                    "chabotId": [
                        84,
                        "Int!"
                    ],
                    "promptId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "promptChatbotStream": [
                114,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        125,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "promptStream": [
                110,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        138,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        113
                    ]
                }
            ],
            "promptTypeEnum": [
                141,
                {
                    "distinctOn": [
                        144,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        143,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        142
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                141,
                {
                    "value": [
                        150,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                141,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        145,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        142
                    ]
                }
            ],
            "thread": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        158,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "threadByPk": [
                152,
                {
                    "threadId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "threadStream": [
                152,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        163,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "user": [
                170,
                {
                    "distinctOn": [
                        190,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        189,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        171
                    ]
                }
            ],
            "userByPk": [
                170,
                {
                    "userId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "userChatbotPreference": [
                172,
                {
                    "distinctOn": [
                        179,
                        "[UserChatbotPreferenceSelectColumn!]"
                    ],
                    "limit": [
                        84
                    ],
                    "offset": [
                        84
                    ],
                    "orderBy": [
                        178,
                        "[UserChatbotPreferenceOrderBy!]"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "userChatbotPreferenceByPk": [
                172,
                {
                    "preferenceId": [
                        84,
                        "Int!"
                    ]
                }
            ],
            "userChatbotPreferenceStream": [
                172,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        183,
                        "[UserChatbotPreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        175
                    ]
                }
            ],
            "userStream": [
                170,
                {
                    "batchSize": [
                        84,
                        "Int!"
                    ],
                    "cursor": [
                        191,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        171
                    ]
                }
            ],
            "__typename": [
                150
            ]
        }
    }
}