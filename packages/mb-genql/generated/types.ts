export default {
    "scalars": [
        0,
        7,
        17,
        25,
        39,
        50,
        62,
        84,
        95,
        107,
        115,
        125,
        133,
        142,
        150,
        154,
        156,
        157,
        158,
        164,
        172,
        176,
        187,
        198,
        214,
        222,
        226,
        228,
        236,
        246,
        257,
        258,
        259,
        271,
        297,
        308,
        320,
        328,
        340,
        356,
        364,
        368,
        370,
        378,
        389,
        401,
        413,
        426,
        434,
        438,
        444,
        452,
        456,
        463,
        473,
        481,
        495
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
                378
            ]
        },
        "Category": {
            "categoryId": [
                158
            ],
            "chatbots": [
                75,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotsAggregate": [
                76,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategoryAggregate": {
            "aggregate": [
                4
            ],
            "nodes": [
                2
            ],
            "__typename": [
                378
            ]
        },
        "CategoryAggregateFields": {
            "avg": [
                5
            ],
            "count": [
                158,
                {
                    "columns": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                10
            ],
            "min": [
                11
            ],
            "stddev": [
                19
            ],
            "stddevPop": [
                20
            ],
            "stddevSamp": [
                21
            ],
            "sum": [
                24
            ],
            "varPop": [
                27
            ],
            "varSamp": [
                28
            ],
            "variance": [
                29
            ],
            "__typename": [
                378
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryBoolExp": {
            "_and": [
                6
            ],
            "_not": [
                6
            ],
            "_or": [
                6
            ],
            "categoryId": [
                159
            ],
            "chatbots": [
                83
            ],
            "chatbotsAggregate": [
                77
            ],
            "name": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "CategoryInsertInput": {
            "categoryId": [
                158
            ],
            "chatbots": [
                80
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                158
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                158
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategoryMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                2
            ],
            "__typename": [
                378
            ]
        },
        "CategoryObjRelInsertInput": {
            "data": [
                9
            ],
            "onConflict": [
                14
            ],
            "__typename": [
                378
            ]
        },
        "CategoryOnConflict": {
            "constraint": [
                7
            ],
            "updateColumns": [
                25
            ],
            "where": [
                6
            ],
            "__typename": [
                378
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotsAggregate": [
                79
            ],
            "name": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                158
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryStreamCursorInput": {
            "initialValue": [
                23
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                158
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "CategoryUpdateColumn": {},
        "CategoryUpdates": {
            "_inc": [
                8
            ],
            "_set": [
                18
            ],
            "where": [
                6
            ],
            "__typename": [
                378
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "Chat": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbot": [
                70
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "user": [
                458
            ],
            "__typename": [
                378
            ]
        },
        "ChatAggregate": {
            "aggregate": [
                33
            ],
            "nodes": [
                30
            ],
            "__typename": [
                378
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                486
            ],
            "__typename": [
                378
            ]
        },
        "ChatAggregateFields": {
            "avg": [
                36
            ],
            "count": [
                158,
                {
                    "columns": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                42
            ],
            "min": [
                44
            ],
            "stddev": [
                52
            ],
            "stddevPop": [
                54
            ],
            "stddevSamp": [
                56
            ],
            "sum": [
                60
            ],
            "varPop": [
                64
            ],
            "varSamp": [
                66
            ],
            "variance": [
                68
            ],
            "__typename": [
                378
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                37
            ],
            "count": [
                236
            ],
            "max": [
                43
            ],
            "min": [
                45
            ],
            "stddev": [
                53
            ],
            "stddevPop": [
                55
            ],
            "stddevSamp": [
                57
            ],
            "sum": [
                61
            ],
            "varPop": [
                65
            ],
            "varSamp": [
                67
            ],
            "variance": [
                69
            ],
            "__typename": [
                378
            ]
        },
        "ChatArrRelInsertInput": {
            "data": [
                41
            ],
            "onConflict": [
                47
            ],
            "__typename": [
                378
            ]
        },
        "ChatAvgFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatAvgOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatBoolExp": {
            "_and": [
                38
            ],
            "_not": [
                38
            ],
            "_or": [
                38
            ],
            "addedBy": [
                159
            ],
            "chatId": [
                159
            ],
            "chatbot": [
                74
            ],
            "chatbotId": [
                159
            ],
            "conversationLink": [
                379
            ],
            "user": [
                462
            ],
            "__typename": [
                378
            ]
        },
        "ChatConstraint": {},
        "ChatIncInput": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbot": [
                121
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "user": [
                469
            ],
            "__typename": [
                378
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "conversationLink": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "conversationLink": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                30
            ],
            "__typename": [
                378
            ]
        },
        "ChatOnConflict": {
            "constraint": [
                39
            ],
            "updateColumns": [
                62
            ],
            "where": [
                38
            ],
            "__typename": [
                378
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbot": [
                123
            ],
            "chatbotId": [
                236
            ],
            "conversationLink": [
                236
            ],
            "user": [
                471
            ],
            "__typename": [
                378
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevPopFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevPopOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevSampFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatStddevSampOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatStreamCursorInput": {
            "initialValue": [
                59
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "conversationLink": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatSumFields": {
            "addedBy": [
                158
            ],
            "chatId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatSumOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatUpdateColumn": {},
        "ChatUpdates": {
            "_inc": [
                40
            ],
            "_set": [
                51
            ],
            "where": [
                38
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarPopFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarPopOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarSampFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarSampOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarianceFields": {
            "addedBy": [
                157
            ],
            "chatId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatVarianceOrderBy": {
            "addedBy": [
                236
            ],
            "chatId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "Chatbot": {
            "avatar": [
                378
            ],
            "categories": [
                75,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "categoriesAggregate": [
                76,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotId": [
                158
            ],
            "chats": [
                30,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatsAggregate": [
                31,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "preferences": [
                237,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferencesAggregate": [
                238,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "prompts": [
                288,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptsAggregate": [
                289,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "threads": [
                380,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadsAggregate": [
                381,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotAggregate": {
            "aggregate": [
                72
            ],
            "nodes": [
                70
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotAggregateFields": {
            "avg": [
                73
            ],
            "count": [
                158,
                {
                    "columns": [
                        125,
                        "[ChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                118
            ],
            "min": [
                119
            ],
            "stddev": [
                127
            ],
            "stddevPop": [
                128
            ],
            "stddevSamp": [
                129
            ],
            "sum": [
                132
            ],
            "varPop": [
                135
            ],
            "varSamp": [
                136
            ],
            "variance": [
                137
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                74
            ],
            "_not": [
                74
            ],
            "_or": [
                74
            ],
            "avatar": [
                379
            ],
            "categories": [
                83
            ],
            "categoriesAggregate": [
                77
            ],
            "chatbotId": [
                159
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "createdBy": [
                379
            ],
            "defaultComplexity": [
                379
            ],
            "defaultLength": [
                379
            ],
            "defaultTone": [
                379
            ],
            "defaultType": [
                379
            ],
            "description": [
                379
            ],
            "name": [
                379
            ],
            "preferences": [
                245
            ],
            "preferencesAggregate": [
                239
            ],
            "prompts": [
                296
            ],
            "promptsAggregate": [
                290
            ],
            "threads": [
                388
            ],
            "threadsAggregate": [
                382
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategory": {
            "category": [
                2
            ],
            "categoryId": [
                158
            ],
            "chatbot": [
                70
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAggregate": {
            "aggregate": [
                78
            ],
            "nodes": [
                75
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                487
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAggregateFields": {
            "avg": [
                81
            ],
            "count": [
                158,
                {
                    "columns": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                87
            ],
            "min": [
                89
            ],
            "stddev": [
                97
            ],
            "stddevPop": [
                99
            ],
            "stddevSamp": [
                101
            ],
            "sum": [
                105
            ],
            "varPop": [
                109
            ],
            "varSamp": [
                111
            ],
            "variance": [
                113
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                82
            ],
            "count": [
                236
            ],
            "max": [
                88
            ],
            "min": [
                90
            ],
            "stddev": [
                98
            ],
            "stddevPop": [
                100
            ],
            "stddevSamp": [
                102
            ],
            "sum": [
                106
            ],
            "varPop": [
                110
            ],
            "varSamp": [
                112
            ],
            "variance": [
                114
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryArrRelInsertInput": {
            "data": [
                86
            ],
            "onConflict": [
                92
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAvgFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                83
            ],
            "_not": [
                83
            ],
            "_or": [
                83
            ],
            "category": [
                6
            ],
            "categoryId": [
                159
            ],
            "chatbot": [
                74
            ],
            "chatbotId": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryConstraint": {},
        "ChatbotCategoryIncInput": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryInsertInput": {
            "category": [
                13
            ],
            "categoryId": [
                158
            ],
            "chatbot": [
                121
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryMaxFields": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryMinFields": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                75
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryOnConflict": {
            "constraint": [
                84
            ],
            "updateColumns": [
                107
            ],
            "where": [
                83
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                15
            ],
            "categoryId": [
                236
            ],
            "chatbot": [
                123
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryPkColumnsInput": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategorySelectColumn": {},
        "ChatbotCategorySetInput": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevPopFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevSampFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                104
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategorySumFields": {
            "categoryId": [
                158
            ],
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryUpdateColumn": {},
        "ChatbotCategoryUpdates": {
            "_inc": [
                85
            ],
            "_set": [
                96
            ],
            "where": [
                83
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarPopFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarSampFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarianceFields": {
            "categoryId": [
                157
            ],
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                236
            ],
            "chatbotId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                378
            ],
            "categories": [
                80
            ],
            "chatbotId": [
                158
            ],
            "chats": [
                35
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "preferences": [
                242
            ],
            "prompts": [
                293
            ],
            "threads": [
                385
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                378
            ],
            "chatbotId": [
                158
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                378
            ],
            "chatbotId": [
                158
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                70
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotObjRelInsertInput": {
            "data": [
                117
            ],
            "onConflict": [
                122
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotOnConflict": {
            "constraint": [
                115
            ],
            "updateColumns": [
                133
            ],
            "where": [
                74
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                236
            ],
            "categoriesAggregate": [
                79
            ],
            "chatbotId": [
                236
            ],
            "chatsAggregate": [
                34
            ],
            "createdBy": [
                236
            ],
            "defaultComplexity": [
                236
            ],
            "defaultLength": [
                236
            ],
            "defaultTone": [
                236
            ],
            "defaultType": [
                236
            ],
            "description": [
                236
            ],
            "name": [
                236
            ],
            "preferencesAggregate": [
                241
            ],
            "promptsAggregate": [
                292
            ],
            "threadsAggregate": [
                384
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                378
            ],
            "chatbotId": [
                158
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotStreamCursorInput": {
            "initialValue": [
                131
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                378
            ],
            "chatbotId": [
                158
            ],
            "createdBy": [
                378
            ],
            "defaultComplexity": [
                378
            ],
            "defaultLength": [
                378
            ],
            "defaultTone": [
                378
            ],
            "defaultType": [
                378
            ],
            "description": [
                378
            ],
            "name": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotUpdateColumn": {},
        "ChatbotUpdates": {
            "_inc": [
                116
            ],
            "_set": [
                126
            ],
            "where": [
                74
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnum": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumAggregate": {
            "aggregate": [
                140
            ],
            "nodes": [
                138
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        150,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                144
            ],
            "min": [
                145
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumBoolExp": {
            "_and": [
                141
            ],
            "_not": [
                141
            ],
            "_or": [
                141
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                138
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumOnConflict": {
            "constraint": [
                142
            ],
            "updateColumns": [
                154
            ],
            "where": [
                141
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumOrderBy": {
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumStreamCursorInput": {
            "initialValue": [
                153
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ComplexityEnumUpdateColumn": {},
        "ComplexityEnumUpdates": {
            "_set": [
                151
            ],
            "where": [
                141
            ],
            "__typename": [
                378
            ]
        },
        "CursorOrdering": {},
        "Float": {},
        "Int": {},
        "IntComparisonExp": {
            "_eq": [
                158
            ],
            "_gt": [
                158
            ],
            "_gte": [
                158
            ],
            "_in": [
                158
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                158
            ],
            "_lte": [
                158
            ],
            "_neq": [
                158
            ],
            "_nin": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnum": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumAggregate": {
            "aggregate": [
                162
            ],
            "nodes": [
                160
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        172,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                166
            ],
            "min": [
                167
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                163
            ],
            "_not": [
                163
            ],
            "_or": [
                163
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                160
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumOnConflict": {
            "constraint": [
                164
            ],
            "updateColumns": [
                176
            ],
            "where": [
                163
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumOrderBy": {
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                175
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "LengthEnumUpdateColumn": {},
        "LengthEnumUpdates": {
            "_set": [
                173
            ],
            "where": [
                163
            ],
            "__typename": [
                378
            ]
        },
        "Message": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "thread": [
                380
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageAggregate": {
            "aggregate": [
                181
            ],
            "nodes": [
                178
            ],
            "__typename": [
                378
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                488
            ],
            "__typename": [
                378
            ]
        },
        "MessageAggregateFields": {
            "avg": [
                184
            ],
            "count": [
                158,
                {
                    "columns": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                190
            ],
            "min": [
                192
            ],
            "stddev": [
                200
            ],
            "stddevPop": [
                202
            ],
            "stddevSamp": [
                204
            ],
            "sum": [
                208
            ],
            "varPop": [
                230
            ],
            "varSamp": [
                232
            ],
            "variance": [
                234
            ],
            "__typename": [
                378
            ]
        },
        "MessageAggregateOrderBy": {
            "avg": [
                185
            ],
            "count": [
                236
            ],
            "max": [
                191
            ],
            "min": [
                193
            ],
            "stddev": [
                201
            ],
            "stddevPop": [
                203
            ],
            "stddevSamp": [
                205
            ],
            "sum": [
                209
            ],
            "varPop": [
                231
            ],
            "varSamp": [
                233
            ],
            "variance": [
                235
            ],
            "__typename": [
                378
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                189
            ],
            "onConflict": [
                195
            ],
            "__typename": [
                378
            ]
        },
        "MessageAvgFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageAvgOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageBoolExp": {
            "_and": [
                186
            ],
            "_not": [
                186
            ],
            "_or": [
                186
            ],
            "content": [
                379
            ],
            "createdAt": [
                421
            ],
            "messageId": [
                159
            ],
            "relatedMessageId": [
                159
            ],
            "thread": [
                388
            ],
            "threadId": [
                159
            ],
            "type": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "MessageConstraint": {},
        "MessageIncInput": {
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "MessageInsertInput": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "thread": [
                397
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageMaxFields": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageMaxOrderBy": {
            "content": [
                236
            ],
            "createdAt": [
                236
            ],
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageMinFields": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageMinOrderBy": {
            "content": [
                236
            ],
            "createdAt": [
                236
            ],
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                178
            ],
            "__typename": [
                378
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                187
            ],
            "updateColumns": [
                228
            ],
            "where": [
                186
            ],
            "__typename": [
                378
            ]
        },
        "MessageOrderBy": {
            "content": [
                236
            ],
            "createdAt": [
                236
            ],
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "thread": [
                399
            ],
            "threadId": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevPopFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevPopOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevSampFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageStddevSampOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                207
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                378
            ],
            "createdAt": [
                495
            ],
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageSumFields": {
            "messageId": [
                158
            ],
            "relatedMessageId": [
                158
            ],
            "threadId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "MessageSumOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnum": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                212
            ],
            "nodes": [
                210
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        222,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                216
            ],
            "min": [
                217
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                213
            ],
            "_not": [
                213
            ],
            "_or": [
                213
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                210
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                214
            ],
            "updateColumns": [
                226
            ],
            "where": [
                213
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumOrderBy": {
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                225
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                223
            ],
            "where": [
                213
            ],
            "__typename": [
                378
            ]
        },
        "MessageUpdateColumn": {},
        "MessageUpdates": {
            "_inc": [
                188
            ],
            "_set": [
                199
            ],
            "where": [
                186
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarPopFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarPopOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarSampFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarSampOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarianceFields": {
            "messageId": [
                157
            ],
            "relatedMessageId": [
                157
            ],
            "threadId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "MessageVarianceOrderBy": {
            "messageId": [
                236
            ],
            "relatedMessageId": [
                236
            ],
            "threadId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "OrderBy": {},
        "Preference": {
            "chatbot": [
                70
            ],
            "chatbotId": [
                158
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "user": [
                458
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                240
            ],
            "nodes": [
                237
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                489
            ],
            "bool_or": [
                490
            ],
            "count": [
                491
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                243
            ],
            "count": [
                158,
                {
                    "columns": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                249
            ],
            "min": [
                251
            ],
            "stddev": [
                261
            ],
            "stddevPop": [
                263
            ],
            "stddevSamp": [
                265
            ],
            "sum": [
                269
            ],
            "varPop": [
                273
            ],
            "varSamp": [
                275
            ],
            "variance": [
                277
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                244
            ],
            "count": [
                236
            ],
            "max": [
                250
            ],
            "min": [
                252
            ],
            "stddev": [
                262
            ],
            "stddevPop": [
                264
            ],
            "stddevSamp": [
                266
            ],
            "sum": [
                270
            ],
            "varPop": [
                274
            ],
            "varSamp": [
                276
            ],
            "variance": [
                278
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                248
            ],
            "onConflict": [
                254
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAvgFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                245
            ],
            "_not": [
                245
            ],
            "_or": [
                245
            ],
            "chatbot": [
                74
            ],
            "chatbotId": [
                159
            ],
            "favorite": [
                1
            ],
            "preferenceId": [
                159
            ],
            "preferredComplexity": [
                379
            ],
            "preferredLength": [
                379
            ],
            "preferredTone": [
                379
            ],
            "preferredType": [
                379
            ],
            "user": [
                462
            ],
            "userId": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceConstraint": {},
        "PreferenceIncInput": {
            "chatbotId": [
                158
            ],
            "preferenceId": [
                158
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceInsertInput": {
            "chatbot": [
                121
            ],
            "chatbotId": [
                158
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "user": [
                469
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceMaxFields": {
            "chatbotId": [
                158
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "preferredComplexity": [
                236
            ],
            "preferredLength": [
                236
            ],
            "preferredTone": [
                236
            ],
            "preferredType": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceMinFields": {
            "chatbotId": [
                158
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "preferredComplexity": [
                236
            ],
            "preferredLength": [
                236
            ],
            "preferredTone": [
                236
            ],
            "preferredType": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                237
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                246
            ],
            "updateColumns": [
                271
            ],
            "where": [
                245
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                123
            ],
            "chatbotId": [
                236
            ],
            "favorite": [
                236
            ],
            "preferenceId": [
                236
            ],
            "preferredComplexity": [
                236
            ],
            "preferredLength": [
                236
            ],
            "preferredTone": [
                236
            ],
            "preferredType": [
                236
            ],
            "user": [
                471
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceSelectColumn": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_andArgumentsColumns": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_orArgumentsColumns": {},
        "PreferenceSetInput": {
            "chatbotId": [
                158
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevPopFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevSampFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                268
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceStreamCursorValueInput": {
            "chatbotId": [
                158
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                158
            ],
            "preferredComplexity": [
                378
            ],
            "preferredLength": [
                378
            ],
            "preferredTone": [
                378
            ],
            "preferredType": [
                378
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceSumFields": {
            "chatbotId": [
                158
            ],
            "preferenceId": [
                158
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                247
            ],
            "_set": [
                260
            ],
            "where": [
                245
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarPopFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarSampFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarianceFields": {
            "chatbotId": [
                157
            ],
            "preferenceId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                236
            ],
            "preferenceId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "Prompt": {
            "chatbots": [
                288,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "chatbotsAggregate": [
                289,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                282
            ],
            "nodes": [
                279
            ],
            "__typename": [
                378
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                492
            ],
            "__typename": [
                378
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                285
            ],
            "count": [
                158,
                {
                    "columns": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                331
            ],
            "min": [
                333
            ],
            "stddev": [
                342
            ],
            "stddevPop": [
                344
            ],
            "stddevSamp": [
                346
            ],
            "sum": [
                350
            ],
            "varPop": [
                372
            ],
            "varSamp": [
                374
            ],
            "variance": [
                376
            ],
            "__typename": [
                378
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                286
            ],
            "count": [
                236
            ],
            "max": [
                332
            ],
            "min": [
                334
            ],
            "stddev": [
                343
            ],
            "stddevPop": [
                345
            ],
            "stddevSamp": [
                347
            ],
            "sum": [
                351
            ],
            "varPop": [
                373
            ],
            "varSamp": [
                375
            ],
            "variance": [
                377
            ],
            "__typename": [
                378
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                330
            ],
            "onConflict": [
                337
            ],
            "__typename": [
                378
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptBoolExp": {
            "_and": [
                287
            ],
            "_not": [
                287
            ],
            "_or": [
                287
            ],
            "chatbots": [
                296
            ],
            "chatbotsAggregate": [
                290
            ],
            "content": [
                379
            ],
            "promptId": [
                159
            ],
            "promptName": [
                379
            ],
            "type": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                158
            ],
            "chatbot": [
                70
            ],
            "prompt": [
                279
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                291
            ],
            "nodes": [
                288
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                493
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                294
            ],
            "count": [
                158,
                {
                    "columns": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                300
            ],
            "min": [
                302
            ],
            "stddev": [
                310
            ],
            "stddevPop": [
                312
            ],
            "stddevSamp": [
                314
            ],
            "sum": [
                318
            ],
            "varPop": [
                322
            ],
            "varSamp": [
                324
            ],
            "variance": [
                326
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                295
            ],
            "count": [
                236
            ],
            "max": [
                301
            ],
            "min": [
                303
            ],
            "stddev": [
                311
            ],
            "stddevPop": [
                313
            ],
            "stddevSamp": [
                315
            ],
            "sum": [
                319
            ],
            "varPop": [
                323
            ],
            "varSamp": [
                325
            ],
            "variance": [
                327
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                299
            ],
            "onConflict": [
                305
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAvgFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                296
            ],
            "_not": [
                296
            ],
            "_or": [
                296
            ],
            "chabotId": [
                159
            ],
            "chatbot": [
                74
            ],
            "prompt": [
                287
            ],
            "promptId": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotConstraint": {},
        "PromptChatbotIncInput": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotInsertInput": {
            "chabotId": [
                158
            ],
            "chatbot": [
                121
            ],
            "prompt": [
                336
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotMaxFields": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotMinFields": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                288
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                297
            ],
            "updateColumns": [
                320
            ],
            "where": [
                296
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                236
            ],
            "chatbot": [
                123
            ],
            "prompt": [
                338
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotPkColumnsInput": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotSelectColumn": {},
        "PromptChatbotSetInput": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevPopFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevSampFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                317
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotStreamCursorValueInput": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotSumFields": {
            "chabotId": [
                158
            ],
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                298
            ],
            "_set": [
                309
            ],
            "where": [
                296
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarPopFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarSampFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarianceFields": {
            "chabotId": [
                157
            ],
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                236
            ],
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                293
            ],
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptMaxFields": {
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                236
            ],
            "promptId": [
                236
            ],
            "promptName": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptMinFields": {
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                236
            ],
            "promptId": [
                236
            ],
            "promptName": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                279
            ],
            "__typename": [
                378
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                330
            ],
            "onConflict": [
                337
            ],
            "__typename": [
                378
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                328
            ],
            "updateColumns": [
                370
            ],
            "where": [
                287
            ],
            "__typename": [
                378
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                292
            ],
            "content": [
                236
            ],
            "promptId": [
                236
            ],
            "promptName": [
                236
            ],
            "type": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                349
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                378
            ],
            "promptId": [
                158
            ],
            "promptName": [
                378
            ],
            "type": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptSumFields": {
            "promptId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                279,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptsAggregate": [
                280,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                354
            ],
            "nodes": [
                352
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                358
            ],
            "min": [
                359
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                355
            ],
            "_not": [
                355
            ],
            "_or": [
                355
            ],
            "prompts": [
                287
            ],
            "promptsAggregate": [
                281
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                284
            ],
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                352
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                356
            ],
            "updateColumns": [
                368
            ],
            "where": [
                355
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                283
            ],
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                367
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                365
            ],
            "where": [
                355
            ],
            "__typename": [
                378
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                329
            ],
            "_set": [
                341
            ],
            "where": [
                287
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                378
            ],
            "_gt": [
                378
            ],
            "_gte": [
                378
            ],
            "_ilike": [
                378
            ],
            "_in": [
                378
            ],
            "_iregex": [
                378
            ],
            "_isNull": [
                0
            ],
            "_like": [
                378
            ],
            "_lt": [
                378
            ],
            "_lte": [
                378
            ],
            "_neq": [
                378
            ],
            "_nilike": [
                378
            ],
            "_nin": [
                378
            ],
            "_niregex": [
                378
            ],
            "_nlike": [
                378
            ],
            "_nregex": [
                378
            ],
            "_nsimilar": [
                378
            ],
            "_regex": [
                378
            ],
            "_similar": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "Thread": {
            "chatbot": [
                70
            ],
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "messages": [
                178,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messagesAggregate": [
                179,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "user": [
                458
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                383
            ],
            "nodes": [
                380
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAggregateBoolExp": {
            "count": [
                494
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                386
            ],
            "count": [
                158,
                {
                    "columns": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                392
            ],
            "min": [
                394
            ],
            "stddev": [
                403
            ],
            "stddevPop": [
                405
            ],
            "stddevSamp": [
                407
            ],
            "sum": [
                411
            ],
            "varPop": [
                415
            ],
            "varSamp": [
                417
            ],
            "variance": [
                419
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                387
            ],
            "count": [
                236
            ],
            "max": [
                393
            ],
            "min": [
                395
            ],
            "stddev": [
                404
            ],
            "stddevPop": [
                406
            ],
            "stddevSamp": [
                408
            ],
            "sum": [
                412
            ],
            "varPop": [
                416
            ],
            "varSamp": [
                418
            ],
            "variance": [
                420
            ],
            "__typename": [
                378
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                391
            ],
            "onConflict": [
                398
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                388
            ],
            "_not": [
                388
            ],
            "_or": [
                388
            ],
            "chatbot": [
                74
            ],
            "chatbotId": [
                159
            ],
            "createdAt": [
                421
            ],
            "messages": [
                186
            ],
            "messagesAggregate": [
                180
            ],
            "threadId": [
                159
            ],
            "updatedAt": [
                421
            ],
            "user": [
                462
            ],
            "userId": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                158
            ],
            "threadId": [
                158
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadInsertInput": {
            "chatbot": [
                121
            ],
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "messages": [
                183
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "user": [
                469
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                236
            ],
            "createdAt": [
                236
            ],
            "threadId": [
                236
            ],
            "updatedAt": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                236
            ],
            "createdAt": [
                236
            ],
            "threadId": [
                236
            ],
            "updatedAt": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                380
            ],
            "__typename": [
                378
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                391
            ],
            "onConflict": [
                398
            ],
            "__typename": [
                378
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                389
            ],
            "updateColumns": [
                413
            ],
            "where": [
                388
            ],
            "__typename": [
                378
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                123
            ],
            "chatbotId": [
                236
            ],
            "createdAt": [
                236
            ],
            "messagesAggregate": [
                182
            ],
            "threadId": [
                236
            ],
            "updatedAt": [
                236
            ],
            "user": [
                471
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadSelectColumn": {},
        "ThreadSetInput": {
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                410
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                158
            ],
            "createdAt": [
                495
            ],
            "threadId": [
                158
            ],
            "updatedAt": [
                495
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                158
            ],
            "threadId": [
                158
            ],
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                390
            ],
            "_set": [
                402
            ],
            "where": [
                388
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                157
            ],
            "threadId": [
                157
            ],
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                236
            ],
            "threadId": [
                236
            ],
            "userId": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                495
            ],
            "_gt": [
                495
            ],
            "_gte": [
                495
            ],
            "_in": [
                495
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                495
            ],
            "_lte": [
                495
            ],
            "_neq": [
                495
            ],
            "_nin": [
                495
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnum": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                424
            ],
            "nodes": [
                422
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        434,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                428
            ],
            "min": [
                429
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                425
            ],
            "_not": [
                425
            ],
            "_or": [
                425
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                422
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                426
            ],
            "updateColumns": [
                438
            ],
            "where": [
                425
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumOrderBy": {
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                437
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                435
            ],
            "where": [
                425
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnum": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                442
            ],
            "nodes": [
                440
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                158,
                {
                    "columns": [
                        452,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                446
            ],
            "min": [
                447
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                443
            ],
            "_not": [
                443
            ],
            "_or": [
                443
            ],
            "value": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                440
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                444
            ],
            "updateColumns": [
                456
            ],
            "where": [
                443
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumOrderBy": {
            "value": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                455
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                453
            ],
            "where": [
                443
            ],
            "__typename": [
                378
            ]
        },
        "User": {
            "chats": [
                30,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatsAggregate": [
                31,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "preferences": [
                237,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferencesAggregate": [
                238,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "profilePicture": [
                378
            ],
            "threads": [
                380,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadsAggregate": [
                381,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserAggregate": {
            "aggregate": [
                460
            ],
            "nodes": [
                458
            ],
            "__typename": [
                378
            ]
        },
        "UserAggregateFields": {
            "avg": [
                461
            ],
            "count": [
                158,
                {
                    "columns": [
                        473,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                466
            ],
            "min": [
                467
            ],
            "stddev": [
                475
            ],
            "stddevPop": [
                476
            ],
            "stddevSamp": [
                477
            ],
            "sum": [
                480
            ],
            "varPop": [
                483
            ],
            "varSamp": [
                484
            ],
            "variance": [
                485
            ],
            "__typename": [
                378
            ]
        },
        "UserAvgFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserBoolExp": {
            "_and": [
                462
            ],
            "_not": [
                462
            ],
            "_or": [
                462
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                421
            ],
            "email": [
                379
            ],
            "lastLogin": [
                421
            ],
            "password": [
                379
            ],
            "preferences": [
                245
            ],
            "preferencesAggregate": [
                239
            ],
            "profilePicture": [
                379
            ],
            "threads": [
                388
            ],
            "threadsAggregate": [
                382
            ],
            "userId": [
                159
            ],
            "username": [
                379
            ],
            "__typename": [
                378
            ]
        },
        "UserConstraint": {},
        "UserIncInput": {
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "UserInsertInput": {
            "chats": [
                35
            ],
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "preferences": [
                242
            ],
            "profilePicture": [
                378
            ],
            "threads": [
                385
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserMaxFields": {
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "profilePicture": [
                378
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserMinFields": {
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "profilePicture": [
                378
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                158
            ],
            "returning": [
                458
            ],
            "__typename": [
                378
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                465
            ],
            "onConflict": [
                470
            ],
            "__typename": [
                378
            ]
        },
        "UserOnConflict": {
            "constraint": [
                463
            ],
            "updateColumns": [
                481
            ],
            "where": [
                462
            ],
            "__typename": [
                378
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                34
            ],
            "dateJoined": [
                236
            ],
            "email": [
                236
            ],
            "lastLogin": [
                236
            ],
            "password": [
                236
            ],
            "preferencesAggregate": [
                241
            ],
            "profilePicture": [
                236
            ],
            "threadsAggregate": [
                384
            ],
            "userId": [
                236
            ],
            "username": [
                236
            ],
            "__typename": [
                378
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "profilePicture": [
                378
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserStddevFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserStddevPopFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserStddevSampFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                479
            ],
            "ordering": [
                156
            ],
            "__typename": [
                378
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                495
            ],
            "email": [
                378
            ],
            "lastLogin": [
                495
            ],
            "password": [
                378
            ],
            "profilePicture": [
                378
            ],
            "userId": [
                158
            ],
            "username": [
                378
            ],
            "__typename": [
                378
            ]
        },
        "UserSumFields": {
            "userId": [
                158
            ],
            "__typename": [
                378
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_inc": [
                464
            ],
            "_set": [
                474
            ],
            "where": [
                462
            ],
            "__typename": [
                378
            ]
        },
        "UserVarPopFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserVarSampFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "UserVarianceFields": {
            "userId": [
                157
            ],
            "__typename": [
                378
            ]
        },
        "chatAggregateBoolExpCount": {
            "arguments": [
                50
            ],
            "distinct": [
                0
            ],
            "filter": [
                38
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "chatbotCategoryAggregateBoolExpCount": {
            "arguments": [
                95
            ],
            "distinct": [
                0
            ],
            "filter": [
                83
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "messageAggregateBoolExpCount": {
            "arguments": [
                198
            ],
            "distinct": [
                0
            ],
            "filter": [
                186
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                258
            ],
            "distinct": [
                0
            ],
            "filter": [
                245
            ],
            "predicate": [
                1
            ],
            "__typename": [
                378
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                259
            ],
            "distinct": [
                0
            ],
            "filter": [
                245
            ],
            "predicate": [
                1
            ],
            "__typename": [
                378
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                257
            ],
            "distinct": [
                0
            ],
            "filter": [
                245
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                340
            ],
            "distinct": [
                0
            ],
            "filter": [
                287
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                308
            ],
            "distinct": [
                0
            ],
            "filter": [
                296
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                401
            ],
            "distinct": [
                0
            ],
            "filter": [
                388
            ],
            "predicate": [
                159
            ],
            "__typename": [
                378
            ]
        },
        "timestamptz": {},
        "Query": {
            "category": [
                2,
                {
                    "distinctOn": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        15,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryAggregate": [
                3,
                {
                    "distinctOn": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        15,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryByPk": [
                2,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chat": [
                30,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatAggregate": [
                31,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatByPk": [
                30,
                {
                    "chatId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chatbot": [
                70,
                {
                    "distinctOn": [
                        125,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        123,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        74
                    ]
                }
            ],
            "chatbotAggregate": [
                71,
                {
                    "distinctOn": [
                        125,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        123,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        74
                    ]
                }
            ],
            "chatbotByPk": [
                70,
                {
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                75,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                76,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                75,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ],
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "complexityEnum": [
                138,
                {
                    "distinctOn": [
                        150,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        148,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "complexityEnumAggregate": [
                139,
                {
                    "distinctOn": [
                        150,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        148,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "complexityEnumByPk": [
                138,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "lengthEnum": [
                160,
                {
                    "distinctOn": [
                        172,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        170,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        163
                    ]
                }
            ],
            "lengthEnumAggregate": [
                161,
                {
                    "distinctOn": [
                        172,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        170,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        163
                    ]
                }
            ],
            "lengthEnumByPk": [
                160,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "message": [
                178,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messageAggregate": [
                179,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messageByPk": [
                178,
                {
                    "messageId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "messageTypeEnum": [
                210,
                {
                    "distinctOn": [
                        222,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        220,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                211,
                {
                    "distinctOn": [
                        222,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        220,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                210,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "preference": [
                237,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferenceAggregate": [
                238,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferenceByPk": [
                237,
                {
                    "preferenceId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                279,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptAggregate": [
                280,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptByPk": [
                279,
                {
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                288,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptChatbotAggregate": [
                289,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptChatbotByPk": [
                288,
                {
                    "chabotId": [
                        158,
                        "Int!"
                    ],
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "promptTypeEnum": [
                352,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        355
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                353,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        355
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                352,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "thread": [
                380,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadAggregate": [
                381,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadByPk": [
                380,
                {
                    "threadId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "toneEnum": [
                422,
                {
                    "distinctOn": [
                        434,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        432,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        425
                    ]
                }
            ],
            "toneEnumAggregate": [
                423,
                {
                    "distinctOn": [
                        434,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        432,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        425
                    ]
                }
            ],
            "toneEnumByPk": [
                422,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                440,
                {
                    "distinctOn": [
                        452,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        450,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "typeEnumAggregate": [
                441,
                {
                    "distinctOn": [
                        452,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        450,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "typeEnumByPk": [
                440,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "user": [
                458,
                {
                    "distinctOn": [
                        473,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        471,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        462
                    ]
                }
            ],
            "userAggregate": [
                459,
                {
                    "distinctOn": [
                        473,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        471,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        462
                    ]
                }
            ],
            "userByPk": [
                458,
                {
                    "userId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                378
            ]
        },
        "Mutation": {
            "deleteCategory": [
                12,
                {
                    "where": [
                        6,
                        "CategoryBoolExp!"
                    ]
                }
            ],
            "deleteCategoryByPk": [
                2,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteChat": [
                46,
                {
                    "where": [
                        38,
                        "ChatBoolExp!"
                    ]
                }
            ],
            "deleteChatByPk": [
                30,
                {
                    "chatId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbot": [
                120,
                {
                    "where": [
                        74,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "deleteChatbotByPk": [
                70,
                {
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbotCategory": [
                91,
                {
                    "where": [
                        83,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "deleteChatbotCategoryByPk": [
                75,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ],
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteComplexityEnum": [
                146,
                {
                    "where": [
                        141,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "deleteComplexityEnumByPk": [
                138,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deleteLengthEnum": [
                168,
                {
                    "where": [
                        163,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "deleteLengthEnumByPk": [
                160,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deleteMessage": [
                194,
                {
                    "where": [
                        186,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "deleteMessageByPk": [
                178,
                {
                    "messageId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                218,
                {
                    "where": [
                        213,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                210,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                253,
                {
                    "where": [
                        245,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                237,
                {
                    "preferenceId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                335,
                {
                    "where": [
                        287,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                279,
                {
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                304,
                {
                    "where": [
                        296,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                288,
                {
                    "chabotId": [
                        158,
                        "Int!"
                    ],
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deletePromptTypeEnum": [
                360,
                {
                    "where": [
                        355,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                352,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deleteThread": [
                396,
                {
                    "where": [
                        388,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                380,
                {
                    "threadId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "deleteToneEnum": [
                430,
                {
                    "where": [
                        425,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                422,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                448,
                {
                    "where": [
                        443,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                440,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                468,
                {
                    "where": [
                        462,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                458,
                {
                    "userId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "insertCategory": [
                12,
                {
                    "objects": [
                        9,
                        "[CategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        14
                    ]
                }
            ],
            "insertCategoryOne": [
                2,
                {
                    "object": [
                        9,
                        "CategoryInsertInput!"
                    ],
                    "onConflict": [
                        14
                    ]
                }
            ],
            "insertChat": [
                46,
                {
                    "objects": [
                        41,
                        "[ChatInsertInput!]!"
                    ],
                    "onConflict": [
                        47
                    ]
                }
            ],
            "insertChatOne": [
                30,
                {
                    "object": [
                        41,
                        "ChatInsertInput!"
                    ],
                    "onConflict": [
                        47
                    ]
                }
            ],
            "insertChatbot": [
                120,
                {
                    "objects": [
                        117,
                        "[ChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        122
                    ]
                }
            ],
            "insertChatbotCategory": [
                91,
                {
                    "objects": [
                        86,
                        "[ChatbotCategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        92
                    ]
                }
            ],
            "insertChatbotCategoryOne": [
                75,
                {
                    "object": [
                        86,
                        "ChatbotCategoryInsertInput!"
                    ],
                    "onConflict": [
                        92
                    ]
                }
            ],
            "insertChatbotOne": [
                70,
                {
                    "object": [
                        117,
                        "ChatbotInsertInput!"
                    ],
                    "onConflict": [
                        122
                    ]
                }
            ],
            "insertComplexityEnum": [
                146,
                {
                    "objects": [
                        143,
                        "[ComplexityEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        147
                    ]
                }
            ],
            "insertComplexityEnumOne": [
                138,
                {
                    "object": [
                        143,
                        "ComplexityEnumInsertInput!"
                    ],
                    "onConflict": [
                        147
                    ]
                }
            ],
            "insertLengthEnum": [
                168,
                {
                    "objects": [
                        165,
                        "[LengthEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        169
                    ]
                }
            ],
            "insertLengthEnumOne": [
                160,
                {
                    "object": [
                        165,
                        "LengthEnumInsertInput!"
                    ],
                    "onConflict": [
                        169
                    ]
                }
            ],
            "insertMessage": [
                194,
                {
                    "objects": [
                        189,
                        "[MessageInsertInput!]!"
                    ],
                    "onConflict": [
                        195
                    ]
                }
            ],
            "insertMessageOne": [
                178,
                {
                    "object": [
                        189,
                        "MessageInsertInput!"
                    ],
                    "onConflict": [
                        195
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                218,
                {
                    "objects": [
                        215,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        219
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                210,
                {
                    "object": [
                        215,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        219
                    ]
                }
            ],
            "insertPreference": [
                253,
                {
                    "objects": [
                        248,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        254
                    ]
                }
            ],
            "insertPreferenceOne": [
                237,
                {
                    "object": [
                        248,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        254
                    ]
                }
            ],
            "insertPrompt": [
                335,
                {
                    "objects": [
                        330,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        337
                    ]
                }
            ],
            "insertPromptChatbot": [
                304,
                {
                    "objects": [
                        299,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        305
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                288,
                {
                    "object": [
                        299,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        305
                    ]
                }
            ],
            "insertPromptOne": [
                279,
                {
                    "object": [
                        330,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        337
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                360,
                {
                    "objects": [
                        357,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        361
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                352,
                {
                    "object": [
                        357,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        361
                    ]
                }
            ],
            "insertThread": [
                396,
                {
                    "objects": [
                        391,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        398
                    ]
                }
            ],
            "insertThreadOne": [
                380,
                {
                    "object": [
                        391,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        398
                    ]
                }
            ],
            "insertToneEnum": [
                430,
                {
                    "objects": [
                        427,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        431
                    ]
                }
            ],
            "insertToneEnumOne": [
                422,
                {
                    "object": [
                        427,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        431
                    ]
                }
            ],
            "insertTypeEnum": [
                448,
                {
                    "objects": [
                        445,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        449
                    ]
                }
            ],
            "insertTypeEnumOne": [
                440,
                {
                    "object": [
                        445,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        449
                    ]
                }
            ],
            "insertUser": [
                468,
                {
                    "objects": [
                        465,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        470
                    ]
                }
            ],
            "insertUserOne": [
                458,
                {
                    "object": [
                        465,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        470
                    ]
                }
            ],
            "updateCategory": [
                12,
                {
                    "_inc": [
                        8
                    ],
                    "_set": [
                        18
                    ],
                    "where": [
                        6,
                        "CategoryBoolExp!"
                    ]
                }
            ],
            "updateCategoryByPk": [
                2,
                {
                    "_inc": [
                        8
                    ],
                    "_set": [
                        18
                    ],
                    "pkColumns": [
                        16,
                        "CategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateCategoryMany": [
                12,
                {
                    "updates": [
                        26,
                        "[CategoryUpdates!]!"
                    ]
                }
            ],
            "updateChat": [
                46,
                {
                    "_inc": [
                        40
                    ],
                    "_set": [
                        51
                    ],
                    "where": [
                        38,
                        "ChatBoolExp!"
                    ]
                }
            ],
            "updateChatByPk": [
                30,
                {
                    "_inc": [
                        40
                    ],
                    "_set": [
                        51
                    ],
                    "pkColumns": [
                        49,
                        "ChatPkColumnsInput!"
                    ]
                }
            ],
            "updateChatMany": [
                46,
                {
                    "updates": [
                        63,
                        "[ChatUpdates!]!"
                    ]
                }
            ],
            "updateChatbot": [
                120,
                {
                    "_inc": [
                        116
                    ],
                    "_set": [
                        126
                    ],
                    "where": [
                        74,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "updateChatbotByPk": [
                70,
                {
                    "_inc": [
                        116
                    ],
                    "_set": [
                        126
                    ],
                    "pkColumns": [
                        124,
                        "ChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategory": [
                91,
                {
                    "_inc": [
                        85
                    ],
                    "_set": [
                        96
                    ],
                    "where": [
                        83,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "updateChatbotCategoryByPk": [
                75,
                {
                    "_inc": [
                        85
                    ],
                    "_set": [
                        96
                    ],
                    "pkColumns": [
                        94,
                        "ChatbotCategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategoryMany": [
                91,
                {
                    "updates": [
                        108,
                        "[ChatbotCategoryUpdates!]!"
                    ]
                }
            ],
            "updateChatbotMany": [
                120,
                {
                    "updates": [
                        134,
                        "[ChatbotUpdates!]!"
                    ]
                }
            ],
            "updateComplexityEnum": [
                146,
                {
                    "_set": [
                        151
                    ],
                    "where": [
                        141,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "updateComplexityEnumByPk": [
                138,
                {
                    "_set": [
                        151
                    ],
                    "pkColumns": [
                        149,
                        "ComplexityEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateComplexityEnumMany": [
                146,
                {
                    "updates": [
                        155,
                        "[ComplexityEnumUpdates!]!"
                    ]
                }
            ],
            "updateLengthEnum": [
                168,
                {
                    "_set": [
                        173
                    ],
                    "where": [
                        163,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "updateLengthEnumByPk": [
                160,
                {
                    "_set": [
                        173
                    ],
                    "pkColumns": [
                        171,
                        "LengthEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateLengthEnumMany": [
                168,
                {
                    "updates": [
                        177,
                        "[LengthEnumUpdates!]!"
                    ]
                }
            ],
            "updateMessage": [
                194,
                {
                    "_inc": [
                        188
                    ],
                    "_set": [
                        199
                    ],
                    "where": [
                        186,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "updateMessageByPk": [
                178,
                {
                    "_inc": [
                        188
                    ],
                    "_set": [
                        199
                    ],
                    "pkColumns": [
                        197,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                194,
                {
                    "updates": [
                        229,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                218,
                {
                    "_set": [
                        223
                    ],
                    "where": [
                        213,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                210,
                {
                    "_set": [
                        223
                    ],
                    "pkColumns": [
                        221,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                218,
                {
                    "updates": [
                        227,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                253,
                {
                    "_inc": [
                        247
                    ],
                    "_set": [
                        260
                    ],
                    "where": [
                        245,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                237,
                {
                    "_inc": [
                        247
                    ],
                    "_set": [
                        260
                    ],
                    "pkColumns": [
                        256,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                253,
                {
                    "updates": [
                        272,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                335,
                {
                    "_inc": [
                        329
                    ],
                    "_set": [
                        341
                    ],
                    "where": [
                        287,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                279,
                {
                    "_inc": [
                        329
                    ],
                    "_set": [
                        341
                    ],
                    "pkColumns": [
                        339,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                304,
                {
                    "_inc": [
                        298
                    ],
                    "_set": [
                        309
                    ],
                    "where": [
                        296,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                288,
                {
                    "_inc": [
                        298
                    ],
                    "_set": [
                        309
                    ],
                    "pkColumns": [
                        307,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                304,
                {
                    "updates": [
                        321,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                335,
                {
                    "updates": [
                        371,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                360,
                {
                    "_set": [
                        365
                    ],
                    "where": [
                        355,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                352,
                {
                    "_set": [
                        365
                    ],
                    "pkColumns": [
                        363,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                360,
                {
                    "updates": [
                        369,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                396,
                {
                    "_inc": [
                        390
                    ],
                    "_set": [
                        402
                    ],
                    "where": [
                        388,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                380,
                {
                    "_inc": [
                        390
                    ],
                    "_set": [
                        402
                    ],
                    "pkColumns": [
                        400,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                396,
                {
                    "updates": [
                        414,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                430,
                {
                    "_set": [
                        435
                    ],
                    "where": [
                        425,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                422,
                {
                    "_set": [
                        435
                    ],
                    "pkColumns": [
                        433,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                430,
                {
                    "updates": [
                        439,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                448,
                {
                    "_set": [
                        453
                    ],
                    "where": [
                        443,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                440,
                {
                    "_set": [
                        453
                    ],
                    "pkColumns": [
                        451,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                448,
                {
                    "updates": [
                        457,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                468,
                {
                    "_inc": [
                        464
                    ],
                    "_set": [
                        474
                    ],
                    "where": [
                        462,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                458,
                {
                    "_inc": [
                        464
                    ],
                    "_set": [
                        474
                    ],
                    "pkColumns": [
                        472,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                468,
                {
                    "updates": [
                        482,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                378
            ]
        },
        "Subscription": {
            "category": [
                2,
                {
                    "distinctOn": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        15,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryAggregate": [
                3,
                {
                    "distinctOn": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        15,
                        "[CategoryOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryByPk": [
                2,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "categoryStream": [
                2,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        22,
                        "[CategoryStreamCursorInput]!"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "chat": [
                30,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatAggregate": [
                31,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        48,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatByPk": [
                30,
                {
                    "chatId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chatStream": [
                30,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        58,
                        "[ChatStreamCursorInput]!"
                    ],
                    "where": [
                        38
                    ]
                }
            ],
            "chatbot": [
                70,
                {
                    "distinctOn": [
                        125,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        123,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        74
                    ]
                }
            ],
            "chatbotAggregate": [
                71,
                {
                    "distinctOn": [
                        125,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        123,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        74
                    ]
                }
            ],
            "chatbotByPk": [
                70,
                {
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                75,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                76,
                {
                    "distinctOn": [
                        95,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        93,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                75,
                {
                    "categoryId": [
                        158,
                        "Int!"
                    ],
                    "chatbotId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategoryStream": [
                75,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        103,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "chatbotStream": [
                70,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        130,
                        "[ChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        74
                    ]
                }
            ],
            "complexityEnum": [
                138,
                {
                    "distinctOn": [
                        150,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        148,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "complexityEnumAggregate": [
                139,
                {
                    "distinctOn": [
                        150,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        148,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "complexityEnumByPk": [
                138,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "complexityEnumStream": [
                138,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        152,
                        "[ComplexityEnumStreamCursorInput]!"
                    ],
                    "where": [
                        141
                    ]
                }
            ],
            "lengthEnum": [
                160,
                {
                    "distinctOn": [
                        172,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        170,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        163
                    ]
                }
            ],
            "lengthEnumAggregate": [
                161,
                {
                    "distinctOn": [
                        172,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        170,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        163
                    ]
                }
            ],
            "lengthEnumByPk": [
                160,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                160,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        174,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        163
                    ]
                }
            ],
            "message": [
                178,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messageAggregate": [
                179,
                {
                    "distinctOn": [
                        198,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        196,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messageByPk": [
                178,
                {
                    "messageId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "messageStream": [
                178,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        206,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        186
                    ]
                }
            ],
            "messageTypeEnum": [
                210,
                {
                    "distinctOn": [
                        222,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        220,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                211,
                {
                    "distinctOn": [
                        222,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        220,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                210,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                210,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        224,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        213
                    ]
                }
            ],
            "preference": [
                237,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferenceAggregate": [
                238,
                {
                    "distinctOn": [
                        257,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        255,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "preferenceByPk": [
                237,
                {
                    "preferenceId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                237,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        267,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "prompt": [
                279,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptAggregate": [
                280,
                {
                    "distinctOn": [
                        340,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        338,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptByPk": [
                279,
                {
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                288,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptChatbotAggregate": [
                289,
                {
                    "distinctOn": [
                        308,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        306,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptChatbotByPk": [
                288,
                {
                    "chabotId": [
                        158,
                        "Int!"
                    ],
                    "promptId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "promptChatbotStream": [
                288,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        316,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "promptStream": [
                279,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        348,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        287
                    ]
                }
            ],
            "promptTypeEnum": [
                352,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        355
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                353,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        355
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                352,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                352,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        366,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        355
                    ]
                }
            ],
            "thread": [
                380,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadAggregate": [
                381,
                {
                    "distinctOn": [
                        401,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        399,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "threadByPk": [
                380,
                {
                    "threadId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "threadStream": [
                380,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        409,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        388
                    ]
                }
            ],
            "toneEnum": [
                422,
                {
                    "distinctOn": [
                        434,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        432,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        425
                    ]
                }
            ],
            "toneEnumAggregate": [
                423,
                {
                    "distinctOn": [
                        434,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        432,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        425
                    ]
                }
            ],
            "toneEnumByPk": [
                422,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                422,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        436,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        425
                    ]
                }
            ],
            "typeEnum": [
                440,
                {
                    "distinctOn": [
                        452,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        450,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "typeEnumAggregate": [
                441,
                {
                    "distinctOn": [
                        452,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        450,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "typeEnumByPk": [
                440,
                {
                    "value": [
                        378,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                440,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        454,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "user": [
                458,
                {
                    "distinctOn": [
                        473,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        471,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        462
                    ]
                }
            ],
            "userAggregate": [
                459,
                {
                    "distinctOn": [
                        473,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        158
                    ],
                    "offset": [
                        158
                    ],
                    "orderBy": [
                        471,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        462
                    ]
                }
            ],
            "userByPk": [
                458,
                {
                    "userId": [
                        158,
                        "Int!"
                    ]
                }
            ],
            "userStream": [
                458,
                {
                    "batchSize": [
                        158,
                        "Int!"
                    ],
                    "cursor": [
                        478,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        462
                    ]
                }
            ],
            "__typename": [
                378
            ]
        }
    }
}