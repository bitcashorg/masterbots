export default {
    "scalars": [
        0,
        7,
        17,
        25,
        39,
        50,
        62,
        88,
        99,
        111,
        119,
        131,
        143,
        155,
        164,
        168,
        170,
        171,
        172,
        178,
        187,
        191,
        200,
        210,
        218,
        227,
        231,
        233,
        235,
        245,
        256,
        257,
        258,
        270,
        296,
        307,
        319,
        327,
        339,
        355,
        364,
        368,
        370,
        381,
        392,
        404,
        418,
        429,
        441,
        442,
        443,
        455,
        468,
        477,
        481,
        487,
        496,
        500,
        506,
        515,
        519,
        535,
        536
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
                418
            ]
        },
        "Category": {
            "categoryId": [
                172
            ],
            "chatbots": [
                79,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotsAggregate": [
                80,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "name": [
                418
            ],
            "__typename": [
                418
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
                418
            ]
        },
        "CategoryAggregateFields": {
            "avg": [
                5
            ],
            "count": [
                172,
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
                418
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
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
                173
            ],
            "chatbots": [
                87
            ],
            "chatbotsAggregate": [
                81
            ],
            "name": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "CategoryInsertInput": {
            "categoryId": [
                172
            ],
            "chatbots": [
                84
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                172
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                172
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "CategoryMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                2
            ],
            "__typename": [
                418
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
                418
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
                418
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotsAggregate": [
                83
            ],
            "name": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                172
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "CategoryStreamCursorInput": {
            "initialValue": [
                23
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                172
            ],
            "__typename": [
                418
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
                418
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "Chat": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbot": [
                70
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "user": [
                502
            ],
            "__typename": [
                418
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
                418
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                522
            ],
            "__typename": [
                418
            ]
        },
        "ChatAggregateFields": {
            "avg": [
                36
            ],
            "count": [
                172,
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
                418
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                37
            ],
            "count": [
                235
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
                418
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
                418
            ]
        },
        "ChatAvgFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
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
                521
            ],
            "chatId": [
                173
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "conversationLink": [
                419
            ],
            "user": [
                505
            ],
            "__typename": [
                418
            ]
        },
        "ChatConstraint": {},
        "ChatIncInput": {
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbot": [
                127
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "user": [
                511
            ],
            "__typename": [
                418
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                235
            ],
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "conversationLink": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                235
            ],
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "conversationLink": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                30
            ],
            "__typename": [
                418
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
                418
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                235
            ],
            "chatId": [
                235
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                235
            ],
            "conversationLink": [
                235
            ],
            "user": [
                513
            ],
            "__typename": [
                418
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevPopFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevSampFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatStreamCursorInput": {
            "initialValue": [
                59
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                536
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatSumFields": {
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
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
                418
            ]
        },
        "ChatVarPopFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatVarSampFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatVarianceFields": {
            "chatId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "Chatbot": {
            "avatar": [
                418
            ],
            "categories": [
                79,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "categoriesAggregate": [
                80,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotId": [
                172
            ],
            "chats": [
                30,
                {
                    "distinctOn": [
                        50,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
            "complexityEnum": [
                151
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "lengthEnum": [
                174
            ],
            "name": [
                418
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "prompts": [
                287,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptsAggregate": [
                288,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "threads": [
                420,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadsAggregate": [
                421,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "toneEnum": [
                464
            ],
            "typeEnum": [
                483
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAggregate": {
            "aggregate": [
                73
            ],
            "nodes": [
                70
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                523
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAggregateFields": {
            "avg": [
                76
            ],
            "count": [
                172,
                {
                    "columns": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                122
            ],
            "min": [
                124
            ],
            "stddev": [
                133
            ],
            "stddevPop": [
                135
            ],
            "stddevSamp": [
                137
            ],
            "sum": [
                141
            ],
            "varPop": [
                145
            ],
            "varSamp": [
                147
            ],
            "variance": [
                149
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                77
            ],
            "count": [
                235
            ],
            "max": [
                123
            ],
            "min": [
                125
            ],
            "stddev": [
                134
            ],
            "stddevPop": [
                136
            ],
            "stddevSamp": [
                138
            ],
            "sum": [
                142
            ],
            "varPop": [
                146
            ],
            "varSamp": [
                148
            ],
            "variance": [
                150
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotArrRelInsertInput": {
            "data": [
                121
            ],
            "onConflict": [
                128
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                78
            ],
            "_not": [
                78
            ],
            "_or": [
                78
            ],
            "avatar": [
                419
            ],
            "categories": [
                87
            ],
            "categoriesAggregate": [
                81
            ],
            "chatbotId": [
                173
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "complexityEnum": [
                154
            ],
            "createdBy": [
                419
            ],
            "defaultComplexity": [
                419
            ],
            "defaultLength": [
                419
            ],
            "defaultTone": [
                419
            ],
            "defaultType": [
                419
            ],
            "description": [
                419
            ],
            "lengthEnum": [
                177
            ],
            "name": [
                419
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "prompts": [
                295
            ],
            "promptsAggregate": [
                289
            ],
            "threads": [
                428
            ],
            "threadsAggregate": [
                422
            ],
            "toneEnum": [
                467
            ],
            "typeEnum": [
                486
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategory": {
            "category": [
                2
            ],
            "categoryId": [
                172
            ],
            "chatbot": [
                70
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAggregate": {
            "aggregate": [
                82
            ],
            "nodes": [
                79
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                524
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAggregateFields": {
            "avg": [
                85
            ],
            "count": [
                172,
                {
                    "columns": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                91
            ],
            "min": [
                93
            ],
            "stddev": [
                101
            ],
            "stddevPop": [
                103
            ],
            "stddevSamp": [
                105
            ],
            "sum": [
                109
            ],
            "varPop": [
                113
            ],
            "varSamp": [
                115
            ],
            "variance": [
                117
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                86
            ],
            "count": [
                235
            ],
            "max": [
                92
            ],
            "min": [
                94
            ],
            "stddev": [
                102
            ],
            "stddevPop": [
                104
            ],
            "stddevSamp": [
                106
            ],
            "sum": [
                110
            ],
            "varPop": [
                114
            ],
            "varSamp": [
                116
            ],
            "variance": [
                118
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryArrRelInsertInput": {
            "data": [
                90
            ],
            "onConflict": [
                96
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAvgFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                87
            ],
            "_not": [
                87
            ],
            "_or": [
                87
            ],
            "category": [
                6
            ],
            "categoryId": [
                173
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryConstraint": {},
        "ChatbotCategoryIncInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryInsertInput": {
            "category": [
                13
            ],
            "categoryId": [
                172
            ],
            "chatbot": [
                127
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryMaxFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryMinFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                79
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryOnConflict": {
            "constraint": [
                88
            ],
            "updateColumns": [
                111
            ],
            "where": [
                87
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                15
            ],
            "categoryId": [
                235
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategorySelectColumn": {},
        "ChatbotCategorySetInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                108
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategorySumFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryUpdateColumn": {},
        "ChatbotCategoryUpdates": {
            "_inc": [
                89
            ],
            "_set": [
                100
            ],
            "where": [
                87
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                235
            ],
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                418
            ],
            "categories": [
                84
            ],
            "chatbotId": [
                172
            ],
            "chats": [
                35
            ],
            "complexityEnum": [
                160
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "lengthEnum": [
                183
            ],
            "name": [
                418
            ],
            "preferences": [
                241
            ],
            "prompts": [
                292
            ],
            "threads": [
                425
            ],
            "toneEnum": [
                473
            ],
            "typeEnum": [
                492
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                418
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                235
            ],
            "chatbotId": [
                235
            ],
            "createdBy": [
                235
            ],
            "defaultComplexity": [
                235
            ],
            "defaultLength": [
                235
            ],
            "defaultTone": [
                235
            ],
            "defaultType": [
                235
            ],
            "description": [
                235
            ],
            "name": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                418
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                235
            ],
            "chatbotId": [
                235
            ],
            "createdBy": [
                235
            ],
            "defaultComplexity": [
                235
            ],
            "defaultLength": [
                235
            ],
            "defaultTone": [
                235
            ],
            "defaultType": [
                235
            ],
            "description": [
                235
            ],
            "name": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                70
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotObjRelInsertInput": {
            "data": [
                121
            ],
            "onConflict": [
                128
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotOnConflict": {
            "constraint": [
                119
            ],
            "updateColumns": [
                143
            ],
            "where": [
                78
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                235
            ],
            "categoriesAggregate": [
                83
            ],
            "chatbotId": [
                235
            ],
            "chatsAggregate": [
                34
            ],
            "complexityEnum": [
                162
            ],
            "createdBy": [
                235
            ],
            "defaultComplexity": [
                235
            ],
            "defaultLength": [
                235
            ],
            "defaultTone": [
                235
            ],
            "defaultType": [
                235
            ],
            "description": [
                235
            ],
            "lengthEnum": [
                185
            ],
            "name": [
                235
            ],
            "preferencesAggregate": [
                240
            ],
            "promptsAggregate": [
                291
            ],
            "threadsAggregate": [
                424
            ],
            "toneEnum": [
                475
            ],
            "typeEnum": [
                494
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                418
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStreamCursorInput": {
            "initialValue": [
                140
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                418
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                418
            ],
            "defaultComplexity": [
                418
            ],
            "defaultLength": [
                418
            ],
            "defaultTone": [
                418
            ],
            "defaultType": [
                418
            ],
            "description": [
                418
            ],
            "name": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotUpdateColumn": {},
        "ChatbotUpdates": {
            "_inc": [
                120
            ],
            "_set": [
                132
            ],
            "where": [
                78
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnum": {
            "chatbots": [
                70,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotsAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumAggregate": {
            "aggregate": [
                153
            ],
            "nodes": [
                151
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        164,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                157
            ],
            "min": [
                158
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumBoolExp": {
            "_and": [
                154
            ],
            "_not": [
                154
            ],
            "_or": [
                154
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                241
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                151
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumObjRelInsertInput": {
            "data": [
                156
            ],
            "onConflict": [
                161
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumOnConflict": {
            "constraint": [
                155
            ],
            "updateColumns": [
                168
            ],
            "where": [
                154
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                240
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumStreamCursorInput": {
            "initialValue": [
                167
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ComplexityEnumUpdateColumn": {},
        "ComplexityEnumUpdates": {
            "_set": [
                165
            ],
            "where": [
                154
            ],
            "__typename": [
                418
            ]
        },
        "CursorOrdering": {},
        "Float": {},
        "Int": {},
        "IntComparisonExp": {
            "_eq": [
                172
            ],
            "_gt": [
                172
            ],
            "_gte": [
                172
            ],
            "_in": [
                172
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                172
            ],
            "_lte": [
                172
            ],
            "_neq": [
                172
            ],
            "_nin": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnum": {
            "chatbots": [
                70,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotsAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumAggregate": {
            "aggregate": [
                176
            ],
            "nodes": [
                174
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        187,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                180
            ],
            "min": [
                181
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                177
            ],
            "_not": [
                177
            ],
            "_or": [
                177
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                241
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                174
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumObjRelInsertInput": {
            "data": [
                179
            ],
            "onConflict": [
                184
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumOnConflict": {
            "constraint": [
                178
            ],
            "updateColumns": [
                191
            ],
            "where": [
                177
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                240
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                190
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "LengthEnumUpdateColumn": {},
        "LengthEnumUpdates": {
            "_set": [
                188
            ],
            "where": [
                177
            ],
            "__typename": [
                418
            ]
        },
        "Message": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "messageTypeEnum": [
                214
            ],
            "role": [
                418
            ],
            "thread": [
                420
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageAggregate": {
            "aggregate": [
                196
            ],
            "nodes": [
                193
            ],
            "__typename": [
                418
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                525
            ],
            "__typename": [
                418
            ]
        },
        "MessageAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                202
            ],
            "min": [
                204
            ],
            "__typename": [
                418
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                235
            ],
            "max": [
                203
            ],
            "min": [
                205
            ],
            "__typename": [
                418
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                201
            ],
            "onConflict": [
                207
            ],
            "__typename": [
                418
            ]
        },
        "MessageBoolExp": {
            "_and": [
                199
            ],
            "_not": [
                199
            ],
            "_or": [
                199
            ],
            "content": [
                419
            ],
            "createdAt": [
                463
            ],
            "messageId": [
                521
            ],
            "messageTypeEnum": [
                217
            ],
            "role": [
                419
            ],
            "thread": [
                428
            ],
            "threadId": [
                521
            ],
            "__typename": [
                418
            ]
        },
        "MessageConstraint": {},
        "MessageInsertInput": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "messageTypeEnum": [
                223
            ],
            "role": [
                418
            ],
            "thread": [
                437
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageMaxFields": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "role": [
                418
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageMaxOrderBy": {
            "content": [
                235
            ],
            "createdAt": [
                235
            ],
            "messageId": [
                235
            ],
            "role": [
                235
            ],
            "threadId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "MessageMinFields": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "role": [
                418
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageMinOrderBy": {
            "content": [
                235
            ],
            "createdAt": [
                235
            ],
            "messageId": [
                235
            ],
            "role": [
                235
            ],
            "threadId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "MessageMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                193
            ],
            "__typename": [
                418
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                200
            ],
            "updateColumns": [
                233
            ],
            "where": [
                199
            ],
            "__typename": [
                418
            ]
        },
        "MessageOrderBy": {
            "content": [
                235
            ],
            "createdAt": [
                235
            ],
            "messageId": [
                235
            ],
            "messageTypeEnum": [
                225
            ],
            "role": [
                235
            ],
            "thread": [
                439
            ],
            "threadId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "role": [
                418
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                213
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                418
            ],
            "createdAt": [
                535
            ],
            "messageId": [
                536
            ],
            "role": [
                418
            ],
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                193,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messagesAggregate": [
                194,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                216
            ],
            "nodes": [
                214
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        227,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                220
            ],
            "min": [
                221
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                217
            ],
            "_not": [
                217
            ],
            "_or": [
                217
            ],
            "messages": [
                199
            ],
            "messagesAggregate": [
                195
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                198
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                214
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumObjRelInsertInput": {
            "data": [
                219
            ],
            "onConflict": [
                224
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                218
            ],
            "updateColumns": [
                231
            ],
            "where": [
                217
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                197
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                230
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                228
            ],
            "where": [
                217
            ],
            "__typename": [
                418
            ]
        },
        "MessageUpdateColumn": {},
        "MessageUpdates": {
            "_set": [
                211
            ],
            "where": [
                199
            ],
            "__typename": [
                418
            ]
        },
        "OrderBy": {},
        "Preference": {
            "chatbot": [
                70
            ],
            "chatbotId": [
                172
            ],
            "complexityEnum": [
                151
            ],
            "favorite": [
                0
            ],
            "lengthEnum": [
                174
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "toneEnum": [
                464
            ],
            "typeEnum": [
                483
            ],
            "user": [
                502
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                239
            ],
            "nodes": [
                236
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                526
            ],
            "bool_or": [
                527
            ],
            "count": [
                528
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                242
            ],
            "count": [
                172,
                {
                    "columns": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                248
            ],
            "min": [
                250
            ],
            "stddev": [
                260
            ],
            "stddevPop": [
                262
            ],
            "stddevSamp": [
                264
            ],
            "sum": [
                268
            ],
            "varPop": [
                272
            ],
            "varSamp": [
                274
            ],
            "variance": [
                276
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                243
            ],
            "count": [
                235
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
                418
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                247
            ],
            "onConflict": [
                253
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAvgFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                244
            ],
            "_not": [
                244
            ],
            "_or": [
                244
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "complexityEnum": [
                154
            ],
            "favorite": [
                1
            ],
            "lengthEnum": [
                177
            ],
            "preferenceId": [
                173
            ],
            "preferredComplexity": [
                419
            ],
            "preferredLength": [
                419
            ],
            "preferredTone": [
                419
            ],
            "preferredType": [
                419
            ],
            "toneEnum": [
                467
            ],
            "typeEnum": [
                486
            ],
            "user": [
                505
            ],
            "userId": [
                521
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceConstraint": {},
        "PreferenceIncInput": {
            "chatbotId": [
                172
            ],
            "preferenceId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceInsertInput": {
            "chatbot": [
                127
            ],
            "chatbotId": [
                172
            ],
            "complexityEnum": [
                160
            ],
            "favorite": [
                0
            ],
            "lengthEnum": [
                183
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "toneEnum": [
                473
            ],
            "typeEnum": [
                492
            ],
            "user": [
                511
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceMaxFields": {
            "chatbotId": [
                172
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "preferredComplexity": [
                235
            ],
            "preferredLength": [
                235
            ],
            "preferredTone": [
                235
            ],
            "preferredType": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceMinFields": {
            "chatbotId": [
                172
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "preferredComplexity": [
                235
            ],
            "preferredLength": [
                235
            ],
            "preferredTone": [
                235
            ],
            "preferredType": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                236
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                245
            ],
            "updateColumns": [
                270
            ],
            "where": [
                244
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                235
            ],
            "complexityEnum": [
                162
            ],
            "favorite": [
                235
            ],
            "lengthEnum": [
                185
            ],
            "preferenceId": [
                235
            ],
            "preferredComplexity": [
                235
            ],
            "preferredLength": [
                235
            ],
            "preferredTone": [
                235
            ],
            "preferredType": [
                235
            ],
            "toneEnum": [
                475
            ],
            "typeEnum": [
                494
            ],
            "user": [
                513
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceSelectColumn": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_andArgumentsColumns": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_orArgumentsColumns": {},
        "PreferenceSetInput": {
            "chatbotId": [
                172
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevPopFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevSampFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                267
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                418
            ],
            "preferredLength": [
                418
            ],
            "preferredTone": [
                418
            ],
            "preferredType": [
                418
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceSumFields": {
            "chatbotId": [
                172
            ],
            "preferenceId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                246
            ],
            "_set": [
                259
            ],
            "where": [
                244
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarPopFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarSampFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarianceFields": {
            "chatbotId": [
                171
            ],
            "preferenceId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                235
            ],
            "preferenceId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "Prompt": {
            "chatbots": [
                287,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "chatbotsAggregate": [
                288,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "promptTypeEnum": [
                351
            ],
            "type": [
                418
            ],
            "users": [
                372,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "usersAggregate": [
                373,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "__typename": [
                418
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                281
            ],
            "nodes": [
                278
            ],
            "__typename": [
                418
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                529
            ],
            "__typename": [
                418
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                284
            ],
            "count": [
                172,
                {
                    "columns": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                330
            ],
            "min": [
                332
            ],
            "stddev": [
                341
            ],
            "stddevPop": [
                343
            ],
            "stddevSamp": [
                345
            ],
            "sum": [
                349
            ],
            "varPop": [
                412
            ],
            "varSamp": [
                414
            ],
            "variance": [
                416
            ],
            "__typename": [
                418
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                285
            ],
            "count": [
                235
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
                413
            ],
            "varSamp": [
                415
            ],
            "variance": [
                417
            ],
            "__typename": [
                418
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                329
            ],
            "onConflict": [
                336
            ],
            "__typename": [
                418
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptBoolExp": {
            "_and": [
                286
            ],
            "_not": [
                286
            ],
            "_or": [
                286
            ],
            "chatbots": [
                295
            ],
            "chatbotsAggregate": [
                289
            ],
            "content": [
                419
            ],
            "promptId": [
                173
            ],
            "promptName": [
                419
            ],
            "promptTypeEnum": [
                354
            ],
            "type": [
                419
            ],
            "users": [
                380
            ],
            "usersAggregate": [
                374
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                172
            ],
            "chatbot": [
                70
            ],
            "prompt": [
                278
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                290
            ],
            "nodes": [
                287
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                530
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                293
            ],
            "count": [
                172,
                {
                    "columns": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                299
            ],
            "min": [
                301
            ],
            "stddev": [
                309
            ],
            "stddevPop": [
                311
            ],
            "stddevSamp": [
                313
            ],
            "sum": [
                317
            ],
            "varPop": [
                321
            ],
            "varSamp": [
                323
            ],
            "variance": [
                325
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                294
            ],
            "count": [
                235
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
                418
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                298
            ],
            "onConflict": [
                304
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAvgFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                295
            ],
            "_not": [
                295
            ],
            "_or": [
                295
            ],
            "chabotId": [
                173
            ],
            "chatbot": [
                78
            ],
            "prompt": [
                286
            ],
            "promptId": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotConstraint": {},
        "PromptChatbotIncInput": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotInsertInput": {
            "chabotId": [
                172
            ],
            "chatbot": [
                127
            ],
            "prompt": [
                335
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotMaxFields": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotMinFields": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                287
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                296
            ],
            "updateColumns": [
                319
            ],
            "where": [
                295
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                235
            ],
            "chatbot": [
                129
            ],
            "prompt": [
                337
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotPkColumnsInput": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotSelectColumn": {},
        "PromptChatbotSetInput": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevPopFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevSampFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                316
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotStreamCursorValueInput": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotSumFields": {
            "chabotId": [
                172
            ],
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                297
            ],
            "_set": [
                308
            ],
            "where": [
                295
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarPopFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarSampFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarianceFields": {
            "chabotId": [
                171
            ],
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                235
            ],
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                292
            ],
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "promptTypeEnum": [
                360
            ],
            "type": [
                418
            ],
            "users": [
                377
            ],
            "__typename": [
                418
            ]
        },
        "PromptMaxFields": {
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "type": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                235
            ],
            "promptId": [
                235
            ],
            "promptName": [
                235
            ],
            "type": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptMinFields": {
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "type": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                235
            ],
            "promptId": [
                235
            ],
            "promptName": [
                235
            ],
            "type": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                278
            ],
            "__typename": [
                418
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                329
            ],
            "onConflict": [
                336
            ],
            "__typename": [
                418
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                327
            ],
            "updateColumns": [
                370
            ],
            "where": [
                286
            ],
            "__typename": [
                418
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                291
            ],
            "content": [
                235
            ],
            "promptId": [
                235
            ],
            "promptName": [
                235
            ],
            "promptTypeEnum": [
                362
            ],
            "type": [
                235
            ],
            "usersAggregate": [
                376
            ],
            "__typename": [
                418
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "type": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                348
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                418
            ],
            "promptId": [
                172
            ],
            "promptName": [
                418
            ],
            "type": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                278,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptsAggregate": [
                279,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                353
            ],
            "nodes": [
                351
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                172,
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
                357
            ],
            "min": [
                358
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                354
            ],
            "_not": [
                354
            ],
            "_or": [
                354
            ],
            "prompts": [
                286
            ],
            "promptsAggregate": [
                280
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                283
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                351
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                356
            ],
            "onConflict": [
                361
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                355
            ],
            "updateColumns": [
                368
            ],
            "where": [
                354
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                282
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                367
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                365
            ],
            "where": [
                354
            ],
            "__typename": [
                418
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                328
            ],
            "_set": [
                340
            ],
            "where": [
                286
            ],
            "__typename": [
                418
            ]
        },
        "PromptUser": {
            "prompt": [
                278
            ],
            "promptId": [
                172
            ],
            "user": [
                502
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                375
            ],
            "nodes": [
                372
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                531
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                378
            ],
            "count": [
                172,
                {
                    "columns": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                384
            ],
            "min": [
                386
            ],
            "stddev": [
                394
            ],
            "stddevPop": [
                396
            ],
            "stddevSamp": [
                398
            ],
            "sum": [
                402
            ],
            "varPop": [
                406
            ],
            "varSamp": [
                408
            ],
            "variance": [
                410
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                379
            ],
            "count": [
                235
            ],
            "max": [
                385
            ],
            "min": [
                387
            ],
            "stddev": [
                395
            ],
            "stddevPop": [
                397
            ],
            "stddevSamp": [
                399
            ],
            "sum": [
                403
            ],
            "varPop": [
                407
            ],
            "varSamp": [
                409
            ],
            "variance": [
                411
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                383
            ],
            "onConflict": [
                389
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                380
            ],
            "_not": [
                380
            ],
            "_or": [
                380
            ],
            "prompt": [
                286
            ],
            "promptId": [
                173
            ],
            "user": [
                505
            ],
            "userId": [
                521
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                335
            ],
            "promptId": [
                172
            ],
            "user": [
                511
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                172
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                172
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                372
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                381
            ],
            "updateColumns": [
                404
            ],
            "where": [
                380
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                337
            ],
            "promptId": [
                235
            ],
            "user": [
                513
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                172
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                172
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                401
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                172
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                382
            ],
            "_set": [
                393
            ],
            "where": [
                380
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                418
            ],
            "_gt": [
                418
            ],
            "_gte": [
                418
            ],
            "_ilike": [
                418
            ],
            "_in": [
                418
            ],
            "_iregex": [
                418
            ],
            "_isNull": [
                0
            ],
            "_like": [
                418
            ],
            "_lt": [
                418
            ],
            "_lte": [
                418
            ],
            "_neq": [
                418
            ],
            "_nilike": [
                418
            ],
            "_nin": [
                418
            ],
            "_niregex": [
                418
            ],
            "_nlike": [
                418
            ],
            "_nregex": [
                418
            ],
            "_nsimilar": [
                418
            ],
            "_regex": [
                418
            ],
            "_similar": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "Thread": {
            "chatbot": [
                70
            ],
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "isPublic": [
                0
            ],
            "messages": [
                193,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messagesAggregate": [
                194,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "user": [
                502
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                423
            ],
            "nodes": [
                420
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                532
            ],
            "bool_or": [
                533
            ],
            "count": [
                534
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                426
            ],
            "count": [
                172,
                {
                    "columns": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                432
            ],
            "min": [
                434
            ],
            "stddev": [
                445
            ],
            "stddevPop": [
                447
            ],
            "stddevSamp": [
                449
            ],
            "sum": [
                453
            ],
            "varPop": [
                457
            ],
            "varSamp": [
                459
            ],
            "variance": [
                461
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                427
            ],
            "count": [
                235
            ],
            "max": [
                433
            ],
            "min": [
                435
            ],
            "stddev": [
                446
            ],
            "stddevPop": [
                448
            ],
            "stddevSamp": [
                450
            ],
            "sum": [
                454
            ],
            "varPop": [
                458
            ],
            "varSamp": [
                460
            ],
            "variance": [
                462
            ],
            "__typename": [
                418
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                431
            ],
            "onConflict": [
                438
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                428
            ],
            "_not": [
                428
            ],
            "_or": [
                428
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "createdAt": [
                463
            ],
            "isPublic": [
                1
            ],
            "messages": [
                199
            ],
            "messagesAggregate": [
                195
            ],
            "threadId": [
                521
            ],
            "updatedAt": [
                463
            ],
            "user": [
                505
            ],
            "userId": [
                521
            ],
            "__typename": [
                418
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ThreadInsertInput": {
            "chatbot": [
                127
            ],
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "isPublic": [
                0
            ],
            "messages": [
                198
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "user": [
                511
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                235
            ],
            "createdAt": [
                235
            ],
            "threadId": [
                235
            ],
            "updatedAt": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                235
            ],
            "createdAt": [
                235
            ],
            "threadId": [
                235
            ],
            "updatedAt": [
                235
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                420
            ],
            "__typename": [
                418
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                431
            ],
            "onConflict": [
                438
            ],
            "__typename": [
                418
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                429
            ],
            "updateColumns": [
                455
            ],
            "where": [
                428
            ],
            "__typename": [
                418
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                235
            ],
            "createdAt": [
                235
            ],
            "isPublic": [
                235
            ],
            "messagesAggregate": [
                197
            ],
            "threadId": [
                235
            ],
            "updatedAt": [
                235
            ],
            "user": [
                513
            ],
            "userId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadSelectColumn": {},
        "ThreadSelectColumnThreadAggregateBoolExpBool_andArgumentsColumns": {},
        "ThreadSelectColumnThreadAggregateBoolExpBool_orArgumentsColumns": {},
        "ThreadSetInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "isPublic": [
                0
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                452
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                535
            ],
            "isPublic": [
                0
            ],
            "threadId": [
                536
            ],
            "updatedAt": [
                535
            ],
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                418
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                430
            ],
            "_set": [
                444
            ],
            "where": [
                428
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                418
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                535
            ],
            "_gt": [
                535
            ],
            "_gte": [
                535
            ],
            "_in": [
                535
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                535
            ],
            "_lte": [
                535
            ],
            "_neq": [
                535
            ],
            "_nin": [
                535
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnum": {
            "chatbots": [
                70,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotsAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                466
            ],
            "nodes": [
                464
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        477,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                470
            ],
            "min": [
                471
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                467
            ],
            "_not": [
                467
            ],
            "_or": [
                467
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                241
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                464
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                469
            ],
            "onConflict": [
                474
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                468
            ],
            "updateColumns": [
                481
            ],
            "where": [
                467
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                240
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                480
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                478
            ],
            "where": [
                467
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnum": {
            "chatbots": [
                70,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotsAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                485
            ],
            "nodes": [
                483
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        496,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                489
            ],
            "min": [
                490
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                486
            ],
            "_not": [
                486
            ],
            "_or": [
                486
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "value": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                241
            ],
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                483
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                488
            ],
            "onConflict": [
                493
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                487
            ],
            "updateColumns": [
                500
            ],
            "where": [
                486
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                240
            ],
            "value": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                499
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                497
            ],
            "where": [
                486
            ],
            "__typename": [
                418
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
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "preferences": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferencesAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "profilePicture": [
                418
            ],
            "prompts": [
                372,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "promptsAggregate": [
                373,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "slug": [
                418
            ],
            "threads": [
                420,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadsAggregate": [
                421,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserAggregate": {
            "aggregate": [
                504
            ],
            "nodes": [
                502
            ],
            "__typename": [
                418
            ]
        },
        "UserAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        515,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                508
            ],
            "min": [
                509
            ],
            "__typename": [
                418
            ]
        },
        "UserBoolExp": {
            "_and": [
                505
            ],
            "_not": [
                505
            ],
            "_or": [
                505
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                463
            ],
            "email": [
                419
            ],
            "lastLogin": [
                463
            ],
            "password": [
                419
            ],
            "preferences": [
                244
            ],
            "preferencesAggregate": [
                238
            ],
            "profilePicture": [
                419
            ],
            "prompts": [
                380
            ],
            "promptsAggregate": [
                374
            ],
            "slug": [
                419
            ],
            "threads": [
                428
            ],
            "threadsAggregate": [
                422
            ],
            "userId": [
                521
            ],
            "username": [
                419
            ],
            "__typename": [
                418
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "chats": [
                35
            ],
            "dateJoined": [
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "preferences": [
                241
            ],
            "profilePicture": [
                418
            ],
            "prompts": [
                377
            ],
            "slug": [
                418
            ],
            "threads": [
                425
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserMaxFields": {
            "dateJoined": [
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "profilePicture": [
                418
            ],
            "slug": [
                418
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserMinFields": {
            "dateJoined": [
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "profilePicture": [
                418
            ],
            "slug": [
                418
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                502
            ],
            "__typename": [
                418
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                507
            ],
            "onConflict": [
                512
            ],
            "__typename": [
                418
            ]
        },
        "UserOnConflict": {
            "constraint": [
                506
            ],
            "updateColumns": [
                519
            ],
            "where": [
                505
            ],
            "__typename": [
                418
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                34
            ],
            "dateJoined": [
                235
            ],
            "email": [
                235
            ],
            "lastLogin": [
                235
            ],
            "password": [
                235
            ],
            "preferencesAggregate": [
                240
            ],
            "profilePicture": [
                235
            ],
            "promptsAggregate": [
                376
            ],
            "slug": [
                235
            ],
            "threadsAggregate": [
                424
            ],
            "userId": [
                235
            ],
            "username": [
                235
            ],
            "__typename": [
                418
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                536
            ],
            "__typename": [
                418
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "dateJoined": [
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "profilePicture": [
                418
            ],
            "slug": [
                418
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                518
            ],
            "ordering": [
                170
            ],
            "__typename": [
                418
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                535
            ],
            "email": [
                418
            ],
            "lastLogin": [
                535
            ],
            "password": [
                418
            ],
            "profilePicture": [
                418
            ],
            "slug": [
                418
            ],
            "userId": [
                536
            ],
            "username": [
                418
            ],
            "__typename": [
                418
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                516
            ],
            "where": [
                505
            ],
            "__typename": [
                418
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                536
            ],
            "_gt": [
                536
            ],
            "_gte": [
                536
            ],
            "_in": [
                536
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                536
            ],
            "_lte": [
                536
            ],
            "_neq": [
                536
            ],
            "_nin": [
                536
            ],
            "__typename": [
                418
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
                173
            ],
            "__typename": [
                418
            ]
        },
        "chatbotAggregateBoolExpCount": {
            "arguments": [
                131
            ],
            "distinct": [
                0
            ],
            "filter": [
                78
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "chatbotCategoryAggregateBoolExpCount": {
            "arguments": [
                99
            ],
            "distinct": [
                0
            ],
            "filter": [
                87
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "messageAggregateBoolExpCount": {
            "arguments": [
                210
            ],
            "distinct": [
                0
            ],
            "filter": [
                199
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                257
            ],
            "distinct": [
                0
            ],
            "filter": [
                244
            ],
            "predicate": [
                1
            ],
            "__typename": [
                418
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                258
            ],
            "distinct": [
                0
            ],
            "filter": [
                244
            ],
            "predicate": [
                1
            ],
            "__typename": [
                418
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                256
            ],
            "distinct": [
                0
            ],
            "filter": [
                244
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                339
            ],
            "distinct": [
                0
            ],
            "filter": [
                286
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                307
            ],
            "distinct": [
                0
            ],
            "filter": [
                295
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                392
            ],
            "distinct": [
                0
            ],
            "filter": [
                380
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                442
            ],
            "distinct": [
                0
            ],
            "filter": [
                428
            ],
            "predicate": [
                1
            ],
            "__typename": [
                418
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                443
            ],
            "distinct": [
                0
            ],
            "filter": [
                428
            ],
            "predicate": [
                1
            ],
            "__typename": [
                418
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                441
            ],
            "distinct": [
                0
            ],
            "filter": [
                428
            ],
            "predicate": [
                173
            ],
            "__typename": [
                418
            ]
        },
        "timestamptz": {},
        "uuid": {},
        "Query": {
            "category": [
                2,
                {
                    "distinctOn": [
                        17,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
                        172,
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
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
                        172,
                        "Int!"
                    ]
                }
            ],
            "chatbot": [
                70,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotByPk": [
                70,
                {
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                79,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                80,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                79,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "complexityEnum": [
                151,
                {
                    "distinctOn": [
                        164,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        162,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        154
                    ]
                }
            ],
            "complexityEnumAggregate": [
                152,
                {
                    "distinctOn": [
                        164,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        162,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        154
                    ]
                }
            ],
            "complexityEnumByPk": [
                151,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "lengthEnum": [
                174,
                {
                    "distinctOn": [
                        187,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        185,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        177
                    ]
                }
            ],
            "lengthEnumAggregate": [
                175,
                {
                    "distinctOn": [
                        187,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        185,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        177
                    ]
                }
            ],
            "lengthEnumByPk": [
                174,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "message": [
                193,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messageAggregate": [
                194,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messageByPk": [
                193,
                {
                    "messageId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                214,
                {
                    "distinctOn": [
                        227,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        225,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                215,
                {
                    "distinctOn": [
                        227,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        225,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                214,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "preference": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferenceAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferenceByPk": [
                236,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                278,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptAggregate": [
                279,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptByPk": [
                278,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                287,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptChatbotAggregate": [
                288,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptChatbotByPk": [
                287,
                {
                    "chabotId": [
                        172,
                        "Int!"
                    ],
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptTypeEnum": [
                351,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                352,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                351,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                372,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "promptUserAggregate": [
                373,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "promptUserByPk": [
                372,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "thread": [
                420,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadAggregate": [
                421,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadByPk": [
                420,
                {
                    "threadId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "toneEnum": [
                464,
                {
                    "distinctOn": [
                        477,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        475,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        467
                    ]
                }
            ],
            "toneEnumAggregate": [
                465,
                {
                    "distinctOn": [
                        477,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        475,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        467
                    ]
                }
            ],
            "toneEnumByPk": [
                464,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                483,
                {
                    "distinctOn": [
                        496,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        494,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        486
                    ]
                }
            ],
            "typeEnumAggregate": [
                484,
                {
                    "distinctOn": [
                        496,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        494,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        486
                    ]
                }
            ],
            "typeEnumByPk": [
                483,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "user": [
                502,
                {
                    "distinctOn": [
                        515,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        513,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "userAggregate": [
                503,
                {
                    "distinctOn": [
                        515,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        513,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "userByPk": [
                502,
                {
                    "userId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                418
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
                        172,
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
                        172,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbot": [
                126,
                {
                    "where": [
                        78,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "deleteChatbotByPk": [
                70,
                {
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbotCategory": [
                95,
                {
                    "where": [
                        87,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "deleteChatbotCategoryByPk": [
                79,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deleteComplexityEnum": [
                159,
                {
                    "where": [
                        154,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "deleteComplexityEnumByPk": [
                151,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deleteLengthEnum": [
                182,
                {
                    "where": [
                        177,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "deleteLengthEnumByPk": [
                174,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deleteMessage": [
                206,
                {
                    "where": [
                        199,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "deleteMessageByPk": [
                193,
                {
                    "messageId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                222,
                {
                    "where": [
                        217,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                214,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                252,
                {
                    "where": [
                        244,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                236,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                334,
                {
                    "where": [
                        286,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                278,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                303,
                {
                    "where": [
                        295,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                287,
                {
                    "chabotId": [
                        172,
                        "Int!"
                    ],
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePromptTypeEnum": [
                359,
                {
                    "where": [
                        354,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                351,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                388,
                {
                    "where": [
                        380,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                372,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "deleteThread": [
                436,
                {
                    "where": [
                        428,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                420,
                {
                    "threadId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "deleteToneEnum": [
                472,
                {
                    "where": [
                        467,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                464,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                491,
                {
                    "where": [
                        486,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                483,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                510,
                {
                    "where": [
                        505,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                502,
                {
                    "userId": [
                        536,
                        "uuid!"
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
                126,
                {
                    "objects": [
                        121,
                        "[ChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        128
                    ]
                }
            ],
            "insertChatbotCategory": [
                95,
                {
                    "objects": [
                        90,
                        "[ChatbotCategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        96
                    ]
                }
            ],
            "insertChatbotCategoryOne": [
                79,
                {
                    "object": [
                        90,
                        "ChatbotCategoryInsertInput!"
                    ],
                    "onConflict": [
                        96
                    ]
                }
            ],
            "insertChatbotOne": [
                70,
                {
                    "object": [
                        121,
                        "ChatbotInsertInput!"
                    ],
                    "onConflict": [
                        128
                    ]
                }
            ],
            "insertComplexityEnum": [
                159,
                {
                    "objects": [
                        156,
                        "[ComplexityEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        161
                    ]
                }
            ],
            "insertComplexityEnumOne": [
                151,
                {
                    "object": [
                        156,
                        "ComplexityEnumInsertInput!"
                    ],
                    "onConflict": [
                        161
                    ]
                }
            ],
            "insertLengthEnum": [
                182,
                {
                    "objects": [
                        179,
                        "[LengthEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        184
                    ]
                }
            ],
            "insertLengthEnumOne": [
                174,
                {
                    "object": [
                        179,
                        "LengthEnumInsertInput!"
                    ],
                    "onConflict": [
                        184
                    ]
                }
            ],
            "insertMessage": [
                206,
                {
                    "objects": [
                        201,
                        "[MessageInsertInput!]!"
                    ],
                    "onConflict": [
                        207
                    ]
                }
            ],
            "insertMessageOne": [
                193,
                {
                    "object": [
                        201,
                        "MessageInsertInput!"
                    ],
                    "onConflict": [
                        207
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                222,
                {
                    "objects": [
                        219,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        224
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                214,
                {
                    "object": [
                        219,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        224
                    ]
                }
            ],
            "insertPreference": [
                252,
                {
                    "objects": [
                        247,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        253
                    ]
                }
            ],
            "insertPreferenceOne": [
                236,
                {
                    "object": [
                        247,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        253
                    ]
                }
            ],
            "insertPrompt": [
                334,
                {
                    "objects": [
                        329,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        336
                    ]
                }
            ],
            "insertPromptChatbot": [
                303,
                {
                    "objects": [
                        298,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        304
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                287,
                {
                    "object": [
                        298,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        304
                    ]
                }
            ],
            "insertPromptOne": [
                278,
                {
                    "object": [
                        329,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        336
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                359,
                {
                    "objects": [
                        356,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        361
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                351,
                {
                    "object": [
                        356,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        361
                    ]
                }
            ],
            "insertPromptUser": [
                388,
                {
                    "objects": [
                        383,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        389
                    ]
                }
            ],
            "insertPromptUserOne": [
                372,
                {
                    "object": [
                        383,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        389
                    ]
                }
            ],
            "insertThread": [
                436,
                {
                    "objects": [
                        431,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        438
                    ]
                }
            ],
            "insertThreadOne": [
                420,
                {
                    "object": [
                        431,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        438
                    ]
                }
            ],
            "insertToneEnum": [
                472,
                {
                    "objects": [
                        469,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        474
                    ]
                }
            ],
            "insertToneEnumOne": [
                464,
                {
                    "object": [
                        469,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        474
                    ]
                }
            ],
            "insertTypeEnum": [
                491,
                {
                    "objects": [
                        488,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        493
                    ]
                }
            ],
            "insertTypeEnumOne": [
                483,
                {
                    "object": [
                        488,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        493
                    ]
                }
            ],
            "insertUser": [
                510,
                {
                    "objects": [
                        507,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        512
                    ]
                }
            ],
            "insertUserOne": [
                502,
                {
                    "object": [
                        507,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        512
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
                126,
                {
                    "_inc": [
                        120
                    ],
                    "_set": [
                        132
                    ],
                    "where": [
                        78,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "updateChatbotByPk": [
                70,
                {
                    "_inc": [
                        120
                    ],
                    "_set": [
                        132
                    ],
                    "pkColumns": [
                        130,
                        "ChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategory": [
                95,
                {
                    "_inc": [
                        89
                    ],
                    "_set": [
                        100
                    ],
                    "where": [
                        87,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "updateChatbotCategoryByPk": [
                79,
                {
                    "_inc": [
                        89
                    ],
                    "_set": [
                        100
                    ],
                    "pkColumns": [
                        98,
                        "ChatbotCategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategoryMany": [
                95,
                {
                    "updates": [
                        112,
                        "[ChatbotCategoryUpdates!]!"
                    ]
                }
            ],
            "updateChatbotMany": [
                126,
                {
                    "updates": [
                        144,
                        "[ChatbotUpdates!]!"
                    ]
                }
            ],
            "updateComplexityEnum": [
                159,
                {
                    "_set": [
                        165
                    ],
                    "where": [
                        154,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "updateComplexityEnumByPk": [
                151,
                {
                    "_set": [
                        165
                    ],
                    "pkColumns": [
                        163,
                        "ComplexityEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateComplexityEnumMany": [
                159,
                {
                    "updates": [
                        169,
                        "[ComplexityEnumUpdates!]!"
                    ]
                }
            ],
            "updateLengthEnum": [
                182,
                {
                    "_set": [
                        188
                    ],
                    "where": [
                        177,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "updateLengthEnumByPk": [
                174,
                {
                    "_set": [
                        188
                    ],
                    "pkColumns": [
                        186,
                        "LengthEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateLengthEnumMany": [
                182,
                {
                    "updates": [
                        192,
                        "[LengthEnumUpdates!]!"
                    ]
                }
            ],
            "updateMessage": [
                206,
                {
                    "_set": [
                        211
                    ],
                    "where": [
                        199,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "updateMessageByPk": [
                193,
                {
                    "_set": [
                        211
                    ],
                    "pkColumns": [
                        209,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                206,
                {
                    "updates": [
                        234,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                222,
                {
                    "_set": [
                        228
                    ],
                    "where": [
                        217,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                214,
                {
                    "_set": [
                        228
                    ],
                    "pkColumns": [
                        226,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                222,
                {
                    "updates": [
                        232,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                252,
                {
                    "_inc": [
                        246
                    ],
                    "_set": [
                        259
                    ],
                    "where": [
                        244,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                236,
                {
                    "_inc": [
                        246
                    ],
                    "_set": [
                        259
                    ],
                    "pkColumns": [
                        255,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                252,
                {
                    "updates": [
                        271,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                334,
                {
                    "_inc": [
                        328
                    ],
                    "_set": [
                        340
                    ],
                    "where": [
                        286,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                278,
                {
                    "_inc": [
                        328
                    ],
                    "_set": [
                        340
                    ],
                    "pkColumns": [
                        338,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                303,
                {
                    "_inc": [
                        297
                    ],
                    "_set": [
                        308
                    ],
                    "where": [
                        295,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                287,
                {
                    "_inc": [
                        297
                    ],
                    "_set": [
                        308
                    ],
                    "pkColumns": [
                        306,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                303,
                {
                    "updates": [
                        320,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                334,
                {
                    "updates": [
                        371,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                359,
                {
                    "_set": [
                        365
                    ],
                    "where": [
                        354,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                351,
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
                359,
                {
                    "updates": [
                        369,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                388,
                {
                    "_inc": [
                        382
                    ],
                    "_set": [
                        393
                    ],
                    "where": [
                        380,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                372,
                {
                    "_inc": [
                        382
                    ],
                    "_set": [
                        393
                    ],
                    "pkColumns": [
                        391,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                388,
                {
                    "updates": [
                        405,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                436,
                {
                    "_inc": [
                        430
                    ],
                    "_set": [
                        444
                    ],
                    "where": [
                        428,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                420,
                {
                    "_inc": [
                        430
                    ],
                    "_set": [
                        444
                    ],
                    "pkColumns": [
                        440,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                436,
                {
                    "updates": [
                        456,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                472,
                {
                    "_set": [
                        478
                    ],
                    "where": [
                        467,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                464,
                {
                    "_set": [
                        478
                    ],
                    "pkColumns": [
                        476,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                472,
                {
                    "updates": [
                        482,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                491,
                {
                    "_set": [
                        497
                    ],
                    "where": [
                        486,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                483,
                {
                    "_set": [
                        497
                    ],
                    "pkColumns": [
                        495,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                491,
                {
                    "updates": [
                        501,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                510,
                {
                    "_set": [
                        516
                    ],
                    "where": [
                        505,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                502,
                {
                    "_set": [
                        516
                    ],
                    "pkColumns": [
                        514,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                510,
                {
                    "updates": [
                        520,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                418
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
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
                        172,
                        "Int!"
                    ]
                }
            ],
            "categoryStream": [
                2,
                {
                    "batchSize": [
                        172,
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
                        172
                    ],
                    "offset": [
                        172
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
                        172
                    ],
                    "offset": [
                        172
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
                        172,
                        "Int!"
                    ]
                }
            ],
            "chatStream": [
                30,
                {
                    "batchSize": [
                        172,
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
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotAggregate": [
                71,
                {
                    "distinctOn": [
                        131,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        129,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "chatbotByPk": [
                70,
                {
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                79,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                80,
                {
                    "distinctOn": [
                        99,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        97,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                79,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategoryStream": [
                79,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        107,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        87
                    ]
                }
            ],
            "chatbotStream": [
                70,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        139,
                        "[ChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        78
                    ]
                }
            ],
            "complexityEnum": [
                151,
                {
                    "distinctOn": [
                        164,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        162,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        154
                    ]
                }
            ],
            "complexityEnumAggregate": [
                152,
                {
                    "distinctOn": [
                        164,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        162,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        154
                    ]
                }
            ],
            "complexityEnumByPk": [
                151,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "complexityEnumStream": [
                151,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        166,
                        "[ComplexityEnumStreamCursorInput]!"
                    ],
                    "where": [
                        154
                    ]
                }
            ],
            "lengthEnum": [
                174,
                {
                    "distinctOn": [
                        187,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        185,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        177
                    ]
                }
            ],
            "lengthEnumAggregate": [
                175,
                {
                    "distinctOn": [
                        187,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        185,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        177
                    ]
                }
            ],
            "lengthEnumByPk": [
                174,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                174,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        189,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        177
                    ]
                }
            ],
            "message": [
                193,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messageAggregate": [
                194,
                {
                    "distinctOn": [
                        210,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        208,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messageByPk": [
                193,
                {
                    "messageId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "messageStream": [
                193,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        212,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        199
                    ]
                }
            ],
            "messageTypeEnum": [
                214,
                {
                    "distinctOn": [
                        227,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        225,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                215,
                {
                    "distinctOn": [
                        227,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        225,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                214,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                214,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        229,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        217
                    ]
                }
            ],
            "preference": [
                236,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferenceAggregate": [
                237,
                {
                    "distinctOn": [
                        256,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        254,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "preferenceByPk": [
                236,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                236,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        266,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "prompt": [
                278,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptAggregate": [
                279,
                {
                    "distinctOn": [
                        339,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        337,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptByPk": [
                278,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                287,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptChatbotAggregate": [
                288,
                {
                    "distinctOn": [
                        307,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        305,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptChatbotByPk": [
                287,
                {
                    "chabotId": [
                        172,
                        "Int!"
                    ],
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbotStream": [
                287,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        315,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        295
                    ]
                }
            ],
            "promptStream": [
                278,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        347,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        286
                    ]
                }
            ],
            "promptTypeEnum": [
                351,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                352,
                {
                    "distinctOn": [
                        364,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        362,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                351,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                351,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        366,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        354
                    ]
                }
            ],
            "promptUser": [
                372,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "promptUserAggregate": [
                373,
                {
                    "distinctOn": [
                        392,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        390,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "promptUserByPk": [
                372,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                372,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        400,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        380
                    ]
                }
            ],
            "thread": [
                420,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadAggregate": [
                421,
                {
                    "distinctOn": [
                        441,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        439,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "threadByPk": [
                420,
                {
                    "threadId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                420,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        451,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        428
                    ]
                }
            ],
            "toneEnum": [
                464,
                {
                    "distinctOn": [
                        477,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        475,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        467
                    ]
                }
            ],
            "toneEnumAggregate": [
                465,
                {
                    "distinctOn": [
                        477,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        475,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        467
                    ]
                }
            ],
            "toneEnumByPk": [
                464,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                464,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        479,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        467
                    ]
                }
            ],
            "typeEnum": [
                483,
                {
                    "distinctOn": [
                        496,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        494,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        486
                    ]
                }
            ],
            "typeEnumAggregate": [
                484,
                {
                    "distinctOn": [
                        496,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        494,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        486
                    ]
                }
            ],
            "typeEnumByPk": [
                483,
                {
                    "value": [
                        418,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                483,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        498,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        486
                    ]
                }
            ],
            "user": [
                502,
                {
                    "distinctOn": [
                        515,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        513,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "userAggregate": [
                503,
                {
                    "distinctOn": [
                        515,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        513,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "userByPk": [
                502,
                {
                    "userId": [
                        536,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                502,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        517,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "__typename": [
                418
            ]
        }
    }
}