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
        239,
        240,
        250,
        254,
        256,
        266,
        277,
        278,
        279,
        291,
        317,
        328,
        340,
        348,
        360,
        376,
        385,
        389,
        391,
        402,
        413,
        425,
        446,
        456,
        460,
        462,
        473,
        485,
        486,
        487,
        499,
        512,
        521,
        525,
        531,
        540,
        544,
        550,
        559,
        563,
        580,
        581
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
                462
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
                462
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
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
                463
            ],
            "__typename": [
                462
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                462
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
                462
            ],
            "__typename": [
                462
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                172
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                172
            ],
            "name": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotsAggregate": [
                83
            ],
            "name": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                172
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                172
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "Chat": {
            "addedBy": [
                581
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
                462
            ],
            "user": [
                546
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                566
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                37
            ],
            "count": [
                256
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
                462
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
                462
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
                462
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                565
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
                463
            ],
            "user": [
                549
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                581
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
                462
            ],
            "user": [
                555
            ],
            "__typename": [
                462
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                581
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                256
            ],
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "conversationLink": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                581
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                256
            ],
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "conversationLink": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                256
            ],
            "chatId": [
                256
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                256
            ],
            "conversationLink": [
                256
            ],
            "user": [
                557
            ],
            "__typename": [
                462
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                581
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatStddevOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                581
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "Chatbot": {
            "avatar": [
                462
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
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "lengthEnum": [
                174
            ],
            "name": [
                462
            ],
            "preferences": [
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "prompts": [
                308,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptsAggregate": [
                309,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "threads": [
                464,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadsAggregate": [
                465,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "toneEnum": [
                508
            ],
            "typeEnum": [
                527
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                567
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                77
            ],
            "count": [
                256
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
                462
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
                462
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                463
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
                463
            ],
            "defaultComplexity": [
                463
            ],
            "defaultLength": [
                463
            ],
            "defaultTone": [
                463
            ],
            "defaultType": [
                463
            ],
            "description": [
                463
            ],
            "lengthEnum": [
                177
            ],
            "name": [
                463
            ],
            "preferences": [
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "prompts": [
                316
            ],
            "promptsAggregate": [
                310
            ],
            "threads": [
                472
            ],
            "threadsAggregate": [
                466
            ],
            "toneEnum": [
                511
            ],
            "typeEnum": [
                530
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                568
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                86
            ],
            "count": [
                256
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
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                15
            ],
            "categoryId": [
                256
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                256
            ],
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                462
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
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "lengthEnum": [
                183
            ],
            "name": [
                462
            ],
            "preferences": [
                262
            ],
            "prompts": [
                313
            ],
            "threads": [
                469
            ],
            "toneEnum": [
                517
            ],
            "typeEnum": [
                536
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                462
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                256
            ],
            "chatbotId": [
                256
            ],
            "createdBy": [
                256
            ],
            "defaultComplexity": [
                256
            ],
            "defaultLength": [
                256
            ],
            "defaultTone": [
                256
            ],
            "defaultType": [
                256
            ],
            "description": [
                256
            ],
            "name": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                462
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                256
            ],
            "chatbotId": [
                256
            ],
            "createdBy": [
                256
            ],
            "defaultComplexity": [
                256
            ],
            "defaultLength": [
                256
            ],
            "defaultTone": [
                256
            ],
            "defaultType": [
                256
            ],
            "description": [
                256
            ],
            "name": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                256
            ],
            "categoriesAggregate": [
                83
            ],
            "chatbotId": [
                256
            ],
            "chatsAggregate": [
                34
            ],
            "complexityEnum": [
                162
            ],
            "createdBy": [
                256
            ],
            "defaultComplexity": [
                256
            ],
            "defaultLength": [
                256
            ],
            "defaultTone": [
                256
            ],
            "defaultType": [
                256
            ],
            "description": [
                256
            ],
            "lengthEnum": [
                185
            ],
            "name": [
                256
            ],
            "preferencesAggregate": [
                261
            ],
            "promptsAggregate": [
                312
            ],
            "threadsAggregate": [
                468
            ],
            "toneEnum": [
                519
            ],
            "typeEnum": [
                538
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                462
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                462
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                462
            ],
            "defaultComplexity": [
                462
            ],
            "defaultLength": [
                462
            ],
            "defaultTone": [
                462
            ],
            "defaultType": [
                462
            ],
            "description": [
                462
            ],
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
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
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                262
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                261
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                262
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                261
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "Message": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "messageTypeEnum": [
                214
            ],
            "role": [
                462
            ],
            "thread": [
                464
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                569
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                256
            ],
            "max": [
                203
            ],
            "min": [
                205
            ],
            "__typename": [
                462
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
                462
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
                463
            ],
            "createdAt": [
                507
            ],
            "messageId": [
                565
            ],
            "messageTypeEnum": [
                217
            ],
            "role": [
                463
            ],
            "thread": [
                472
            ],
            "threadId": [
                565
            ],
            "__typename": [
                462
            ]
        },
        "MessageConstraint": {},
        "MessageInsertInput": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "messageTypeEnum": [
                223
            ],
            "role": [
                462
            ],
            "thread": [
                481
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "MessageMaxFields": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "role": [
                462
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "MessageMaxOrderBy": {
            "content": [
                256
            ],
            "createdAt": [
                256
            ],
            "messageId": [
                256
            ],
            "role": [
                256
            ],
            "threadId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "MessageMinFields": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "role": [
                462
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "MessageMinOrderBy": {
            "content": [
                256
            ],
            "createdAt": [
                256
            ],
            "messageId": [
                256
            ],
            "role": [
                256
            ],
            "threadId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "MessageOrderBy": {
            "content": [
                256
            ],
            "createdAt": [
                256
            ],
            "messageId": [
                256
            ],
            "messageTypeEnum": [
                225
            ],
            "role": [
                256
            ],
            "thread": [
                483
            ],
            "threadId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "role": [
                462
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                462
            ],
            "createdAt": [
                580
            ],
            "messageId": [
                581
            ],
            "role": [
                462
            ],
            "threadId": [
                581
            ],
            "__typename": [
                462
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
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                463
            ],
            "__typename": [
                462
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                198
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                197
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "ModelsEnum": {
            "name": [
                462
            ],
            "threads": [
                464,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadsAggregate": [
                465,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumAggregate": {
            "aggregate": [
                237
            ],
            "nodes": [
                235
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        250,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                243
            ],
            "min": [
                244
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                238
            ],
            "_not": [
                238
            ],
            "_or": [
                238
            ],
            "name": [
                463
            ],
            "threads": [
                472
            ],
            "threadsAggregate": [
                466
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumConstraint": {},
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                240
            ],
            "_in": [
                240
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                240
            ],
            "_nin": [
                240
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                462
            ],
            "threads": [
                469
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                462
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                462
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                235
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumObjRelInsertInput": {
            "data": [
                242
            ],
            "onConflict": [
                247
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumOnConflict": {
            "constraint": [
                239
            ],
            "updateColumns": [
                254
            ],
            "where": [
                238
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                256
            ],
            "threadsAggregate": [
                468
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                462
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                253
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                462
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ModelsEnumUpdateColumn": {},
        "ModelsEnumUpdates": {
            "_set": [
                251
            ],
            "where": [
                238
            ],
            "__typename": [
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "toneEnum": [
                508
            ],
            "typeEnum": [
                527
            ],
            "user": [
                546
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                260
            ],
            "nodes": [
                257
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                570
            ],
            "bool_or": [
                571
            ],
            "count": [
                572
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                263
            ],
            "count": [
                172,
                {
                    "columns": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                269
            ],
            "min": [
                271
            ],
            "stddev": [
                281
            ],
            "stddevPop": [
                283
            ],
            "stddevSamp": [
                285
            ],
            "sum": [
                289
            ],
            "varPop": [
                293
            ],
            "varSamp": [
                295
            ],
            "variance": [
                297
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                264
            ],
            "count": [
                256
            ],
            "max": [
                270
            ],
            "min": [
                272
            ],
            "stddev": [
                282
            ],
            "stddevPop": [
                284
            ],
            "stddevSamp": [
                286
            ],
            "sum": [
                290
            ],
            "varPop": [
                294
            ],
            "varSamp": [
                296
            ],
            "variance": [
                298
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                268
            ],
            "onConflict": [
                274
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                265
            ],
            "_not": [
                265
            ],
            "_or": [
                265
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
                463
            ],
            "preferredLength": [
                463
            ],
            "preferredTone": [
                463
            ],
            "preferredType": [
                463
            ],
            "toneEnum": [
                511
            ],
            "typeEnum": [
                530
            ],
            "user": [
                549
            ],
            "userId": [
                565
            ],
            "__typename": [
                462
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
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "toneEnum": [
                517
            ],
            "typeEnum": [
                536
            ],
            "user": [
                555
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "preferredComplexity": [
                256
            ],
            "preferredLength": [
                256
            ],
            "preferredTone": [
                256
            ],
            "preferredType": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "preferredComplexity": [
                256
            ],
            "preferredLength": [
                256
            ],
            "preferredTone": [
                256
            ],
            "preferredType": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                257
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                266
            ],
            "updateColumns": [
                291
            ],
            "where": [
                265
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                256
            ],
            "complexityEnum": [
                162
            ],
            "favorite": [
                256
            ],
            "lengthEnum": [
                185
            ],
            "preferenceId": [
                256
            ],
            "preferredComplexity": [
                256
            ],
            "preferredLength": [
                256
            ],
            "preferredTone": [
                256
            ],
            "preferredType": [
                256
            ],
            "toneEnum": [
                519
            ],
            "typeEnum": [
                538
            ],
            "user": [
                557
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                172
            ],
            "__typename": [
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                288
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
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
                462
            ],
            "preferredLength": [
                462
            ],
            "preferredTone": [
                462
            ],
            "preferredType": [
                462
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                267
            ],
            "_set": [
                280
            ],
            "where": [
                265
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                256
            ],
            "preferenceId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "Prompt": {
            "chatbots": [
                308,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "chatbotsAggregate": [
                309,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "promptTypeEnum": [
                372
            ],
            "type": [
                462
            ],
            "users": [
                393,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "usersAggregate": [
                394,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "__typename": [
                462
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                302
            ],
            "nodes": [
                299
            ],
            "__typename": [
                462
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                573
            ],
            "__typename": [
                462
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                305
            ],
            "count": [
                172,
                {
                    "columns": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                351
            ],
            "min": [
                353
            ],
            "stddev": [
                362
            ],
            "stddevPop": [
                364
            ],
            "stddevSamp": [
                366
            ],
            "sum": [
                370
            ],
            "varPop": [
                433
            ],
            "varSamp": [
                435
            ],
            "variance": [
                437
            ],
            "__typename": [
                462
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                306
            ],
            "count": [
                256
            ],
            "max": [
                352
            ],
            "min": [
                354
            ],
            "stddev": [
                363
            ],
            "stddevPop": [
                365
            ],
            "stddevSamp": [
                367
            ],
            "sum": [
                371
            ],
            "varPop": [
                434
            ],
            "varSamp": [
                436
            ],
            "variance": [
                438
            ],
            "__typename": [
                462
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                350
            ],
            "onConflict": [
                357
            ],
            "__typename": [
                462
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptBoolExp": {
            "_and": [
                307
            ],
            "_not": [
                307
            ],
            "_or": [
                307
            ],
            "chatbots": [
                316
            ],
            "chatbotsAggregate": [
                310
            ],
            "content": [
                463
            ],
            "promptId": [
                173
            ],
            "promptName": [
                463
            ],
            "promptTypeEnum": [
                375
            ],
            "type": [
                463
            ],
            "users": [
                401
            ],
            "usersAggregate": [
                395
            ],
            "__typename": [
                462
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
                299
            ],
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                311
            ],
            "nodes": [
                308
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                574
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                314
            ],
            "count": [
                172,
                {
                    "columns": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                320
            ],
            "min": [
                322
            ],
            "stddev": [
                330
            ],
            "stddevPop": [
                332
            ],
            "stddevSamp": [
                334
            ],
            "sum": [
                338
            ],
            "varPop": [
                342
            ],
            "varSamp": [
                344
            ],
            "variance": [
                346
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                315
            ],
            "count": [
                256
            ],
            "max": [
                321
            ],
            "min": [
                323
            ],
            "stddev": [
                331
            ],
            "stddevPop": [
                333
            ],
            "stddevSamp": [
                335
            ],
            "sum": [
                339
            ],
            "varPop": [
                343
            ],
            "varSamp": [
                345
            ],
            "variance": [
                347
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                319
            ],
            "onConflict": [
                325
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                316
            ],
            "_not": [
                316
            ],
            "_or": [
                316
            ],
            "chabotId": [
                173
            ],
            "chatbot": [
                78
            ],
            "prompt": [
                307
            ],
            "promptId": [
                173
            ],
            "__typename": [
                462
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
                462
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
                356
            ],
            "promptId": [
                172
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                308
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                317
            ],
            "updateColumns": [
                340
            ],
            "where": [
                316
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                256
            ],
            "chatbot": [
                129
            ],
            "prompt": [
                358
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                337
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
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
                462
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
                462
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                318
            ],
            "_set": [
                329
            ],
            "where": [
                316
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
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
                462
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                256
            ],
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                313
            ],
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "promptTypeEnum": [
                381
            ],
            "type": [
                462
            ],
            "users": [
                398
            ],
            "__typename": [
                462
            ]
        },
        "PromptMaxFields": {
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "type": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                256
            ],
            "promptId": [
                256
            ],
            "promptName": [
                256
            ],
            "type": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptMinFields": {
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "type": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                256
            ],
            "promptId": [
                256
            ],
            "promptName": [
                256
            ],
            "type": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                299
            ],
            "__typename": [
                462
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                350
            ],
            "onConflict": [
                357
            ],
            "__typename": [
                462
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                348
            ],
            "updateColumns": [
                391
            ],
            "where": [
                307
            ],
            "__typename": [
                462
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                312
            ],
            "content": [
                256
            ],
            "promptId": [
                256
            ],
            "promptName": [
                256
            ],
            "promptTypeEnum": [
                383
            ],
            "type": [
                256
            ],
            "usersAggregate": [
                397
            ],
            "__typename": [
                462
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "type": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                369
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                462
            ],
            "promptId": [
                172
            ],
            "promptName": [
                462
            ],
            "type": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                299,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptsAggregate": [
                300,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                374
            ],
            "nodes": [
                372
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        385,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                378
            ],
            "min": [
                379
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                375
            ],
            "_not": [
                375
            ],
            "_or": [
                375
            ],
            "prompts": [
                307
            ],
            "promptsAggregate": [
                301
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                304
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                372
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                377
            ],
            "onConflict": [
                382
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                376
            ],
            "updateColumns": [
                389
            ],
            "where": [
                375
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                303
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                388
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                386
            ],
            "where": [
                375
            ],
            "__typename": [
                462
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                349
            ],
            "_set": [
                361
            ],
            "where": [
                307
            ],
            "__typename": [
                462
            ]
        },
        "PromptUser": {
            "prompt": [
                299
            ],
            "promptId": [
                172
            ],
            "user": [
                546
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                396
            ],
            "nodes": [
                393
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                575
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                399
            ],
            "count": [
                172,
                {
                    "columns": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                405
            ],
            "min": [
                407
            ],
            "stddev": [
                415
            ],
            "stddevPop": [
                417
            ],
            "stddevSamp": [
                419
            ],
            "sum": [
                423
            ],
            "varPop": [
                427
            ],
            "varSamp": [
                429
            ],
            "variance": [
                431
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                400
            ],
            "count": [
                256
            ],
            "max": [
                406
            ],
            "min": [
                408
            ],
            "stddev": [
                416
            ],
            "stddevPop": [
                418
            ],
            "stddevSamp": [
                420
            ],
            "sum": [
                424
            ],
            "varPop": [
                428
            ],
            "varSamp": [
                430
            ],
            "variance": [
                432
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                404
            ],
            "onConflict": [
                410
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                401
            ],
            "_not": [
                401
            ],
            "_or": [
                401
            ],
            "prompt": [
                307
            ],
            "promptId": [
                173
            ],
            "user": [
                549
            ],
            "userId": [
                565
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                356
            ],
            "promptId": [
                172
            ],
            "user": [
                555
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                172
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                172
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                393
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                402
            ],
            "updateColumns": [
                425
            ],
            "where": [
                401
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                358
            ],
            "promptId": [
                256
            ],
            "user": [
                557
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                172
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                172
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                422
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                172
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                403
            ],
            "_set": [
                414
            ],
            "where": [
                401
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "Referral": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "user": [
                546
            ],
            "userByUserId": [
                546
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralAggregate": {
            "aggregate": [
                442
            ],
            "nodes": [
                439
            ],
            "__typename": [
                462
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                576
            ],
            "__typename": [
                462
            ]
        },
        "ReferralAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                448
            ],
            "min": [
                450
            ],
            "__typename": [
                462
            ]
        },
        "ReferralAggregateOrderBy": {
            "count": [
                256
            ],
            "max": [
                449
            ],
            "min": [
                451
            ],
            "__typename": [
                462
            ]
        },
        "ReferralArrRelInsertInput": {
            "data": [
                447
            ],
            "onConflict": [
                453
            ],
            "__typename": [
                462
            ]
        },
        "ReferralBoolExp": {
            "_and": [
                445
            ],
            "_not": [
                445
            ],
            "_or": [
                445
            ],
            "referralCode": [
                463
            ],
            "referrerId": [
                565
            ],
            "user": [
                549
            ],
            "userByUserId": [
                549
            ],
            "userId": [
                565
            ],
            "__typename": [
                462
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "user": [
                555
            ],
            "userByUserId": [
                555
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralMaxOrderBy": {
            "referralCode": [
                256
            ],
            "referrerId": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralMinOrderBy": {
            "referralCode": [
                256
            ],
            "referrerId": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ReferralMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                439
            ],
            "__typename": [
                462
            ]
        },
        "ReferralOnConflict": {
            "constraint": [
                446
            ],
            "updateColumns": [
                460
            ],
            "where": [
                445
            ],
            "__typename": [
                462
            ]
        },
        "ReferralOrderBy": {
            "referralCode": [
                256
            ],
            "referrerId": [
                256
            ],
            "user": [
                557
            ],
            "userByUserId": [
                557
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralStreamCursorInput": {
            "initialValue": [
                459
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                462
            ],
            "referrerId": [
                581
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ReferralUpdateColumn": {},
        "ReferralUpdates": {
            "_set": [
                457
            ],
            "where": [
                445
            ],
            "__typename": [
                462
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                462
            ],
            "_gt": [
                462
            ],
            "_gte": [
                462
            ],
            "_ilike": [
                462
            ],
            "_in": [
                462
            ],
            "_iregex": [
                462
            ],
            "_isNull": [
                0
            ],
            "_like": [
                462
            ],
            "_lt": [
                462
            ],
            "_lte": [
                462
            ],
            "_neq": [
                462
            ],
            "_nilike": [
                462
            ],
            "_nin": [
                462
            ],
            "_niregex": [
                462
            ],
            "_nlike": [
                462
            ],
            "_nregex": [
                462
            ],
            "_nsimilar": [
                462
            ],
            "_regex": [
                462
            ],
            "_similar": [
                462
            ],
            "__typename": [
                462
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
                580
            ],
            "isApproved": [
                0
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
            "model": [
                240
            ],
            "modelsEnum": [
                235
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "user": [
                546
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                467
            ],
            "nodes": [
                464
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                577
            ],
            "bool_or": [
                578
            ],
            "count": [
                579
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                470
            ],
            "count": [
                172,
                {
                    "columns": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                476
            ],
            "min": [
                478
            ],
            "stddev": [
                489
            ],
            "stddevPop": [
                491
            ],
            "stddevSamp": [
                493
            ],
            "sum": [
                497
            ],
            "varPop": [
                501
            ],
            "varSamp": [
                503
            ],
            "variance": [
                505
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                471
            ],
            "count": [
                256
            ],
            "max": [
                477
            ],
            "min": [
                479
            ],
            "stddev": [
                490
            ],
            "stddevPop": [
                492
            ],
            "stddevSamp": [
                494
            ],
            "sum": [
                498
            ],
            "varPop": [
                502
            ],
            "varSamp": [
                504
            ],
            "variance": [
                506
            ],
            "__typename": [
                462
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                475
            ],
            "onConflict": [
                482
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                472
            ],
            "_not": [
                472
            ],
            "_or": [
                472
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "createdAt": [
                507
            ],
            "isApproved": [
                1
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
            "model": [
                241
            ],
            "modelsEnum": [
                238
            ],
            "threadId": [
                565
            ],
            "updatedAt": [
                507
            ],
            "user": [
                549
            ],
            "userId": [
                565
            ],
            "__typename": [
                462
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                462
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
                580
            ],
            "isApproved": [
                0
            ],
            "isPublic": [
                0
            ],
            "messages": [
                198
            ],
            "model": [
                240
            ],
            "modelsEnum": [
                246
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "user": [
                555
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                580
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                256
            ],
            "createdAt": [
                256
            ],
            "threadId": [
                256
            ],
            "updatedAt": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                580
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                256
            ],
            "createdAt": [
                256
            ],
            "threadId": [
                256
            ],
            "updatedAt": [
                256
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                464
            ],
            "__typename": [
                462
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                475
            ],
            "onConflict": [
                482
            ],
            "__typename": [
                462
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                473
            ],
            "updateColumns": [
                499
            ],
            "where": [
                472
            ],
            "__typename": [
                462
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                256
            ],
            "createdAt": [
                256
            ],
            "isApproved": [
                256
            ],
            "isPublic": [
                256
            ],
            "messagesAggregate": [
                197
            ],
            "model": [
                256
            ],
            "modelsEnum": [
                248
            ],
            "threadId": [
                256
            ],
            "updatedAt": [
                256
            ],
            "user": [
                557
            ],
            "userId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                581
            ],
            "__typename": [
                462
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
                580
            ],
            "isApproved": [
                0
            ],
            "isPublic": [
                0
            ],
            "model": [
                240
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                496
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                580
            ],
            "isApproved": [
                0
            ],
            "isPublic": [
                0
            ],
            "model": [
                240
            ],
            "threadId": [
                581
            ],
            "updatedAt": [
                580
            ],
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                462
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                474
            ],
            "_set": [
                488
            ],
            "where": [
                472
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                462
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                580
            ],
            "_gt": [
                580
            ],
            "_gte": [
                580
            ],
            "_in": [
                580
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                580
            ],
            "_lte": [
                580
            ],
            "_neq": [
                580
            ],
            "_nin": [
                580
            ],
            "__typename": [
                462
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
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                510
            ],
            "nodes": [
                508
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        521,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                514
            ],
            "min": [
                515
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                511
            ],
            "_not": [
                511
            ],
            "_or": [
                511
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                262
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                508
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                513
            ],
            "onConflict": [
                518
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                512
            ],
            "updateColumns": [
                525
            ],
            "where": [
                511
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                261
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                524
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                522
            ],
            "where": [
                511
            ],
            "__typename": [
                462
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
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                529
            ],
            "nodes": [
                527
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        540,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                533
            ],
            "min": [
                534
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                530
            ],
            "_not": [
                530
            ],
            "_or": [
                530
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "value": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                262
            ],
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                527
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                532
            ],
            "onConflict": [
                537
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                531
            ],
            "updateColumns": [
                544
            ],
            "where": [
                530
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                261
            ],
            "value": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                543
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                541
            ],
            "where": [
                530
            ],
            "__typename": [
                462
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
                580
            ],
            "email": [
                462
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "preferences": [
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferencesAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "prompts": [
                393,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "promptsAggregate": [
                394,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "referrals": [
                439,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralsAggregate": [
                440,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralsByUserId": [
                439,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralsByUserIdAggregate": [
                440,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "slug": [
                462
            ],
            "threads": [
                464,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadsAggregate": [
                465,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserAggregate": {
            "aggregate": [
                548
            ],
            "nodes": [
                546
            ],
            "__typename": [
                462
            ]
        },
        "UserAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        559,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                552
            ],
            "min": [
                553
            ],
            "__typename": [
                462
            ]
        },
        "UserBoolExp": {
            "_and": [
                549
            ],
            "_not": [
                549
            ],
            "_or": [
                549
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                507
            ],
            "email": [
                463
            ],
            "getFreeMonth": [
                1
            ],
            "isBlocked": [
                1
            ],
            "lastLogin": [
                507
            ],
            "password": [
                463
            ],
            "preferences": [
                265
            ],
            "preferencesAggregate": [
                259
            ],
            "proUserSubscriptionId": [
                463
            ],
            "profilePicture": [
                463
            ],
            "prompts": [
                401
            ],
            "promptsAggregate": [
                395
            ],
            "referrals": [
                445
            ],
            "referralsAggregate": [
                441
            ],
            "referralsByUserId": [
                445
            ],
            "referralsByUserIdAggregate": [
                441
            ],
            "slug": [
                463
            ],
            "threads": [
                472
            ],
            "threadsAggregate": [
                466
            ],
            "userId": [
                565
            ],
            "username": [
                463
            ],
            "__typename": [
                462
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "chats": [
                35
            ],
            "dateJoined": [
                580
            ],
            "email": [
                462
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "preferences": [
                262
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "prompts": [
                398
            ],
            "referrals": [
                444
            ],
            "referralsByUserId": [
                444
            ],
            "slug": [
                462
            ],
            "threads": [
                469
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserMaxFields": {
            "dateJoined": [
                580
            ],
            "email": [
                462
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "slug": [
                462
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserMinFields": {
            "dateJoined": [
                580
            ],
            "email": [
                462
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "slug": [
                462
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                546
            ],
            "__typename": [
                462
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                551
            ],
            "onConflict": [
                556
            ],
            "__typename": [
                462
            ]
        },
        "UserOnConflict": {
            "constraint": [
                550
            ],
            "updateColumns": [
                563
            ],
            "where": [
                549
            ],
            "__typename": [
                462
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                34
            ],
            "dateJoined": [
                256
            ],
            "email": [
                256
            ],
            "getFreeMonth": [
                256
            ],
            "isBlocked": [
                256
            ],
            "lastLogin": [
                256
            ],
            "password": [
                256
            ],
            "preferencesAggregate": [
                261
            ],
            "proUserSubscriptionId": [
                256
            ],
            "profilePicture": [
                256
            ],
            "promptsAggregate": [
                397
            ],
            "referralsAggregate": [
                443
            ],
            "referralsByUserIdAggregate": [
                443
            ],
            "slug": [
                256
            ],
            "threadsAggregate": [
                468
            ],
            "userId": [
                256
            ],
            "username": [
                256
            ],
            "__typename": [
                462
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                581
            ],
            "__typename": [
                462
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "dateJoined": [
                580
            ],
            "email": [
                462
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "slug": [
                462
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                562
            ],
            "ordering": [
                170
            ],
            "__typename": [
                462
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                580
            ],
            "email": [
                462
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "lastLogin": [
                580
            ],
            "password": [
                462
            ],
            "proUserSubscriptionId": [
                462
            ],
            "profilePicture": [
                462
            ],
            "slug": [
                462
            ],
            "userId": [
                581
            ],
            "username": [
                462
            ],
            "__typename": [
                462
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                560
            ],
            "where": [
                549
            ],
            "__typename": [
                462
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                581
            ],
            "_gt": [
                581
            ],
            "_gte": [
                581
            ],
            "_in": [
                581
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                581
            ],
            "_lte": [
                581
            ],
            "_neq": [
                581
            ],
            "_nin": [
                581
            ],
            "__typename": [
                462
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
                462
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
                462
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
                462
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
                462
            ]
        },
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                278
            ],
            "distinct": [
                0
            ],
            "filter": [
                265
            ],
            "predicate": [
                1
            ],
            "__typename": [
                462
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                279
            ],
            "distinct": [
                0
            ],
            "filter": [
                265
            ],
            "predicate": [
                1
            ],
            "__typename": [
                462
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                277
            ],
            "distinct": [
                0
            ],
            "filter": [
                265
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                360
            ],
            "distinct": [
                0
            ],
            "filter": [
                307
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                328
            ],
            "distinct": [
                0
            ],
            "filter": [
                316
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                413
            ],
            "distinct": [
                0
            ],
            "filter": [
                401
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
            ]
        },
        "referralAggregateBoolExpCount": {
            "arguments": [
                456
            ],
            "distinct": [
                0
            ],
            "filter": [
                445
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                486
            ],
            "distinct": [
                0
            ],
            "filter": [
                472
            ],
            "predicate": [
                1
            ],
            "__typename": [
                462
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                487
            ],
            "distinct": [
                0
            ],
            "filter": [
                472
            ],
            "predicate": [
                1
            ],
            "__typename": [
                462
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                485
            ],
            "distinct": [
                0
            ],
            "filter": [
                472
            ],
            "predicate": [
                173
            ],
            "__typename": [
                462
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
                        462,
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
                        462,
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
                        581,
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
                        462,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                235,
                {
                    "distinctOn": [
                        250,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        248,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "modelsEnumAggregate": [
                236,
                {
                    "distinctOn": [
                        250,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        248,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "modelsEnumByPk": [
                235,
                {
                    "name": [
                        462,
                        "String!"
                    ]
                }
            ],
            "preference": [
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferenceAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferenceByPk": [
                257,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                299,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptAggregate": [
                300,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptByPk": [
                299,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                308,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptChatbotAggregate": [
                309,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptChatbotByPk": [
                308,
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
                372,
                {
                    "distinctOn": [
                        385,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        383,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                373,
                {
                    "distinctOn": [
                        385,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        383,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                372,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                393,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "promptUserAggregate": [
                394,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "promptUserByPk": [
                393,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "referral": [
                439,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralAggregate": [
                440,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralByPk": [
                439,
                {
                    "referralCode": [
                        462,
                        "String!"
                    ]
                }
            ],
            "thread": [
                464,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadAggregate": [
                465,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadByPk": [
                464,
                {
                    "threadId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "toneEnum": [
                508,
                {
                    "distinctOn": [
                        521,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        519,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        511
                    ]
                }
            ],
            "toneEnumAggregate": [
                509,
                {
                    "distinctOn": [
                        521,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        519,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        511
                    ]
                }
            ],
            "toneEnumByPk": [
                508,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                527,
                {
                    "distinctOn": [
                        540,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        538,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        530
                    ]
                }
            ],
            "typeEnumAggregate": [
                528,
                {
                    "distinctOn": [
                        540,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        538,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        530
                    ]
                }
            ],
            "typeEnumByPk": [
                527,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "user": [
                546,
                {
                    "distinctOn": [
                        559,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        557,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "userAggregate": [
                547,
                {
                    "distinctOn": [
                        559,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        557,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "userByPk": [
                546,
                {
                    "userId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                462
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
                        462,
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
                        462,
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
                        581,
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
                        462,
                        "String!"
                    ]
                }
            ],
            "deleteModelsEnum": [
                245,
                {
                    "where": [
                        238,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "deleteModelsEnumByPk": [
                235,
                {
                    "name": [
                        462,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                273,
                {
                    "where": [
                        265,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                257,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                355,
                {
                    "where": [
                        307,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                299,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                324,
                {
                    "where": [
                        316,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                308,
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
                380,
                {
                    "where": [
                        375,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                372,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                409,
                {
                    "where": [
                        401,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                393,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "deleteReferral": [
                452,
                {
                    "where": [
                        445,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "deleteReferralByPk": [
                439,
                {
                    "referralCode": [
                        462,
                        "String!"
                    ]
                }
            ],
            "deleteThread": [
                480,
                {
                    "where": [
                        472,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                464,
                {
                    "threadId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "deleteToneEnum": [
                516,
                {
                    "where": [
                        511,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                508,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                535,
                {
                    "where": [
                        530,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                527,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                554,
                {
                    "where": [
                        549,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                546,
                {
                    "userId": [
                        581,
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
            "insertModelsEnum": [
                245,
                {
                    "objects": [
                        242,
                        "[ModelsEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        247
                    ]
                }
            ],
            "insertModelsEnumOne": [
                235,
                {
                    "object": [
                        242,
                        "ModelsEnumInsertInput!"
                    ],
                    "onConflict": [
                        247
                    ]
                }
            ],
            "insertPreference": [
                273,
                {
                    "objects": [
                        268,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        274
                    ]
                }
            ],
            "insertPreferenceOne": [
                257,
                {
                    "object": [
                        268,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        274
                    ]
                }
            ],
            "insertPrompt": [
                355,
                {
                    "objects": [
                        350,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        357
                    ]
                }
            ],
            "insertPromptChatbot": [
                324,
                {
                    "objects": [
                        319,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        325
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                308,
                {
                    "object": [
                        319,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        325
                    ]
                }
            ],
            "insertPromptOne": [
                299,
                {
                    "object": [
                        350,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        357
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                380,
                {
                    "objects": [
                        377,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        382
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                372,
                {
                    "object": [
                        377,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        382
                    ]
                }
            ],
            "insertPromptUser": [
                409,
                {
                    "objects": [
                        404,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        410
                    ]
                }
            ],
            "insertPromptUserOne": [
                393,
                {
                    "object": [
                        404,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        410
                    ]
                }
            ],
            "insertReferral": [
                452,
                {
                    "objects": [
                        447,
                        "[ReferralInsertInput!]!"
                    ],
                    "onConflict": [
                        453
                    ]
                }
            ],
            "insertReferralOne": [
                439,
                {
                    "object": [
                        447,
                        "ReferralInsertInput!"
                    ],
                    "onConflict": [
                        453
                    ]
                }
            ],
            "insertThread": [
                480,
                {
                    "objects": [
                        475,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        482
                    ]
                }
            ],
            "insertThreadOne": [
                464,
                {
                    "object": [
                        475,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        482
                    ]
                }
            ],
            "insertToneEnum": [
                516,
                {
                    "objects": [
                        513,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        518
                    ]
                }
            ],
            "insertToneEnumOne": [
                508,
                {
                    "object": [
                        513,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        518
                    ]
                }
            ],
            "insertTypeEnum": [
                535,
                {
                    "objects": [
                        532,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        537
                    ]
                }
            ],
            "insertTypeEnumOne": [
                527,
                {
                    "object": [
                        532,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        537
                    ]
                }
            ],
            "insertUser": [
                554,
                {
                    "objects": [
                        551,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        556
                    ]
                }
            ],
            "insertUserOne": [
                546,
                {
                    "object": [
                        551,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        556
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
            "updateModelsEnum": [
                245,
                {
                    "_set": [
                        251
                    ],
                    "where": [
                        238,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "updateModelsEnumByPk": [
                235,
                {
                    "_set": [
                        251
                    ],
                    "pkColumns": [
                        249,
                        "ModelsEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateModelsEnumMany": [
                245,
                {
                    "updates": [
                        255,
                        "[ModelsEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                273,
                {
                    "_inc": [
                        267
                    ],
                    "_set": [
                        280
                    ],
                    "where": [
                        265,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                257,
                {
                    "_inc": [
                        267
                    ],
                    "_set": [
                        280
                    ],
                    "pkColumns": [
                        276,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                273,
                {
                    "updates": [
                        292,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                355,
                {
                    "_inc": [
                        349
                    ],
                    "_set": [
                        361
                    ],
                    "where": [
                        307,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                299,
                {
                    "_inc": [
                        349
                    ],
                    "_set": [
                        361
                    ],
                    "pkColumns": [
                        359,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                324,
                {
                    "_inc": [
                        318
                    ],
                    "_set": [
                        329
                    ],
                    "where": [
                        316,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                308,
                {
                    "_inc": [
                        318
                    ],
                    "_set": [
                        329
                    ],
                    "pkColumns": [
                        327,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                324,
                {
                    "updates": [
                        341,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                355,
                {
                    "updates": [
                        392,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                380,
                {
                    "_set": [
                        386
                    ],
                    "where": [
                        375,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                372,
                {
                    "_set": [
                        386
                    ],
                    "pkColumns": [
                        384,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                380,
                {
                    "updates": [
                        390,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                409,
                {
                    "_inc": [
                        403
                    ],
                    "_set": [
                        414
                    ],
                    "where": [
                        401,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                393,
                {
                    "_inc": [
                        403
                    ],
                    "_set": [
                        414
                    ],
                    "pkColumns": [
                        412,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                409,
                {
                    "updates": [
                        426,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateReferral": [
                452,
                {
                    "_set": [
                        457
                    ],
                    "where": [
                        445,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "updateReferralByPk": [
                439,
                {
                    "_set": [
                        457
                    ],
                    "pkColumns": [
                        455,
                        "ReferralPkColumnsInput!"
                    ]
                }
            ],
            "updateReferralMany": [
                452,
                {
                    "updates": [
                        461,
                        "[ReferralUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                480,
                {
                    "_inc": [
                        474
                    ],
                    "_set": [
                        488
                    ],
                    "where": [
                        472,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                464,
                {
                    "_inc": [
                        474
                    ],
                    "_set": [
                        488
                    ],
                    "pkColumns": [
                        484,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                480,
                {
                    "updates": [
                        500,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                516,
                {
                    "_set": [
                        522
                    ],
                    "where": [
                        511,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                508,
                {
                    "_set": [
                        522
                    ],
                    "pkColumns": [
                        520,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                516,
                {
                    "updates": [
                        526,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                535,
                {
                    "_set": [
                        541
                    ],
                    "where": [
                        530,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                527,
                {
                    "_set": [
                        541
                    ],
                    "pkColumns": [
                        539,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                535,
                {
                    "updates": [
                        545,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                554,
                {
                    "_set": [
                        560
                    ],
                    "where": [
                        549,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                546,
                {
                    "_set": [
                        560
                    ],
                    "pkColumns": [
                        558,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                554,
                {
                    "updates": [
                        564,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                462
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
                        462,
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
                        462,
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
                        581,
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
                        462,
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
            "modelsEnum": [
                235,
                {
                    "distinctOn": [
                        250,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        248,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "modelsEnumAggregate": [
                236,
                {
                    "distinctOn": [
                        250,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        248,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "modelsEnumByPk": [
                235,
                {
                    "name": [
                        462,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                235,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        252,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        238
                    ]
                }
            ],
            "preference": [
                257,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferenceAggregate": [
                258,
                {
                    "distinctOn": [
                        277,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        275,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "preferenceByPk": [
                257,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                257,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        287,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        265
                    ]
                }
            ],
            "prompt": [
                299,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptAggregate": [
                300,
                {
                    "distinctOn": [
                        360,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        358,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptByPk": [
                299,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                308,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptChatbotAggregate": [
                309,
                {
                    "distinctOn": [
                        328,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        326,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptChatbotByPk": [
                308,
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
                308,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        336,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        316
                    ]
                }
            ],
            "promptStream": [
                299,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        368,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        307
                    ]
                }
            ],
            "promptTypeEnum": [
                372,
                {
                    "distinctOn": [
                        385,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        383,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                373,
                {
                    "distinctOn": [
                        385,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        383,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                372,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                372,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        387,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptUser": [
                393,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "promptUserAggregate": [
                394,
                {
                    "distinctOn": [
                        413,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        411,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "promptUserByPk": [
                393,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                393,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        421,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        401
                    ]
                }
            ],
            "referral": [
                439,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralAggregate": [
                440,
                {
                    "distinctOn": [
                        456,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        454,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "referralByPk": [
                439,
                {
                    "referralCode": [
                        462,
                        "String!"
                    ]
                }
            ],
            "referralStream": [
                439,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        458,
                        "[ReferralStreamCursorInput]!"
                    ],
                    "where": [
                        445
                    ]
                }
            ],
            "thread": [
                464,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadAggregate": [
                465,
                {
                    "distinctOn": [
                        485,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        483,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "threadByPk": [
                464,
                {
                    "threadId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                464,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        495,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        472
                    ]
                }
            ],
            "toneEnum": [
                508,
                {
                    "distinctOn": [
                        521,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        519,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        511
                    ]
                }
            ],
            "toneEnumAggregate": [
                509,
                {
                    "distinctOn": [
                        521,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        519,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        511
                    ]
                }
            ],
            "toneEnumByPk": [
                508,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                508,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        523,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        511
                    ]
                }
            ],
            "typeEnum": [
                527,
                {
                    "distinctOn": [
                        540,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        538,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        530
                    ]
                }
            ],
            "typeEnumAggregate": [
                528,
                {
                    "distinctOn": [
                        540,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        538,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        530
                    ]
                }
            ],
            "typeEnumByPk": [
                527,
                {
                    "value": [
                        462,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                527,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        542,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        530
                    ]
                }
            ],
            "user": [
                546,
                {
                    "distinctOn": [
                        559,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        557,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "userAggregate": [
                547,
                {
                    "distinctOn": [
                        559,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        557,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "userByPk": [
                546,
                {
                    "userId": [
                        581,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                546,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        561,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "__typename": [
                462
            ]
        }
    }
}