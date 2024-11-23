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
        188,
        199,
        211,
        219,
        229,
        237,
        246,
        255,
        259,
        268,
        278,
        286,
        295,
        299,
        301,
        307,
        308,
        318,
        322,
        324,
        334,
        345,
        346,
        347,
        359,
        385,
        396,
        408,
        416,
        428,
        444,
        453,
        457,
        459,
        470,
        481,
        493,
        514,
        524,
        528,
        544,
        549,
        560,
        572,
        573,
        574,
        586,
        599,
        608,
        612,
        618,
        627,
        631,
        637,
        646,
        650,
        656,
        666,
        677,
        687,
        691,
        693,
        712,
        714,
        715
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
                549
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
            "metadataLabels": [
                179,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                180,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "name": [
                549
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
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
            "metadataLabels": [
                187
            ],
            "metadataLabelsAggregate": [
                181
            ],
            "name": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "CategoryInsertInput": {
            "categoryId": [
                172
            ],
            "chatbots": [
                84
            ],
            "metadataLabels": [
                184
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                172
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                172
            ],
            "name": [
                549
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotsAggregate": [
                83
            ],
            "metadataLabelsAggregate": [
                183
            ],
            "name": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                172
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                172
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "Chat": {
            "addedBy": [
                715
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
                549
            ],
            "user": [
                652
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                696
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                37
            ],
            "count": [
                324
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
                549
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
                549
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
                549
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                695
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
                550
            ],
            "user": [
                655
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                715
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
                549
            ],
            "user": [
                661
            ],
            "__typename": [
                549
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                715
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                324
            ],
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "conversationLink": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                715
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                324
            ],
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "conversationLink": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                324
            ],
            "chatId": [
                324
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                324
            ],
            "conversationLink": [
                324
            ],
            "user": [
                663
            ],
            "__typename": [
                549
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                715
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                549
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatStddevOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                715
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                549
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "Chatbot": {
            "avatar": [
                549
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
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "lengthEnum": [
                242
            ],
            "metadataLabels": [
                179,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                180,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "name": [
                549
            ],
            "preferences": [
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "prompts": [
                376,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptsAggregate": [
                377,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "threads": [
                551,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadsAggregate": [
                552,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "toneEnum": [
                614
            ],
            "typeEnum": [
                633
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                697
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                77
            ],
            "count": [
                324
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
                549
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
                549
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                550
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
                550
            ],
            "defaultComplexity": [
                550
            ],
            "defaultLength": [
                550
            ],
            "defaultTone": [
                550
            ],
            "defaultType": [
                550
            ],
            "description": [
                550
            ],
            "lengthEnum": [
                245
            ],
            "metadataLabels": [
                187
            ],
            "metadataLabelsAggregate": [
                181
            ],
            "name": [
                550
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "prompts": [
                384
            ],
            "promptsAggregate": [
                378
            ],
            "threads": [
                559
            ],
            "threadsAggregate": [
                553
            ],
            "toneEnum": [
                617
            ],
            "typeEnum": [
                636
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                698
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                86
            ],
            "count": [
                324
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
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                15
            ],
            "categoryId": [
                324
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                549
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
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "lengthEnum": [
                251
            ],
            "metadataLabels": [
                184
            ],
            "name": [
                549
            ],
            "preferences": [
                330
            ],
            "prompts": [
                381
            ],
            "threads": [
                556
            ],
            "toneEnum": [
                623
            ],
            "typeEnum": [
                642
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                549
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                324
            ],
            "chatbotId": [
                324
            ],
            "createdBy": [
                324
            ],
            "defaultComplexity": [
                324
            ],
            "defaultLength": [
                324
            ],
            "defaultTone": [
                324
            ],
            "defaultType": [
                324
            ],
            "description": [
                324
            ],
            "name": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                549
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                324
            ],
            "chatbotId": [
                324
            ],
            "createdBy": [
                324
            ],
            "defaultComplexity": [
                324
            ],
            "defaultLength": [
                324
            ],
            "defaultTone": [
                324
            ],
            "defaultType": [
                324
            ],
            "description": [
                324
            ],
            "name": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                324
            ],
            "categoriesAggregate": [
                83
            ],
            "chatbotId": [
                324
            ],
            "chatsAggregate": [
                34
            ],
            "complexityEnum": [
                162
            ],
            "createdBy": [
                324
            ],
            "defaultComplexity": [
                324
            ],
            "defaultLength": [
                324
            ],
            "defaultTone": [
                324
            ],
            "defaultType": [
                324
            ],
            "description": [
                324
            ],
            "lengthEnum": [
                253
            ],
            "metadataLabelsAggregate": [
                183
            ],
            "name": [
                324
            ],
            "preferencesAggregate": [
                329
            ],
            "promptsAggregate": [
                380
            ],
            "threadsAggregate": [
                555
            ],
            "toneEnum": [
                625
            ],
            "typeEnum": [
                644
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                549
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                549
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                549
            ],
            "defaultComplexity": [
                549
            ],
            "defaultLength": [
                549
            ],
            "defaultTone": [
                549
            ],
            "defaultType": [
                549
            ],
            "description": [
                549
            ],
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
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
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
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
                549
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
                549
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
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                330
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                329
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "metadataLabels": [
                179,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                180,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelAggregate": {
            "aggregate": [
                176
            ],
            "nodes": [
                174
            ],
            "__typename": [
                549
            ]
        },
        "LabelAggregateFields": {
            "avg": [
                177
            ],
            "count": [
                172,
                {
                    "columns": [
                        229,
                        "[LabelSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                222
            ],
            "min": [
                223
            ],
            "stddev": [
                231
            ],
            "stddevPop": [
                232
            ],
            "stddevSamp": [
                233
            ],
            "sum": [
                236
            ],
            "varPop": [
                239
            ],
            "varSamp": [
                240
            ],
            "variance": [
                241
            ],
            "__typename": [
                549
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelBoolExp": {
            "_and": [
                178
            ],
            "_not": [
                178
            ],
            "_or": [
                178
            ],
            "advancedLabels": [
                1
            ],
            "categories": [
                550
            ],
            "labelId": [
                173
            ],
            "metadataLabels": [
                187
            ],
            "metadataLabelsAggregate": [
                181
            ],
            "questions": [
                550
            ],
            "subCategories": [
                550
            ],
            "tags": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategory": {
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
            "label": [
                174
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAggregate": {
            "aggregate": [
                182
            ],
            "nodes": [
                179
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAggregateBoolExp": {
            "count": [
                699
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAggregateFields": {
            "avg": [
                185
            ],
            "count": [
                172,
                {
                    "columns": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                213
            ],
            "varSamp": [
                215
            ],
            "variance": [
                217
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAggregateOrderBy": {
            "avg": [
                186
            ],
            "count": [
                324
            ],
            "max": [
                192
            ],
            "min": [
                194
            ],
            "stddev": [
                202
            ],
            "stddevPop": [
                204
            ],
            "stddevSamp": [
                206
            ],
            "sum": [
                210
            ],
            "varPop": [
                214
            ],
            "varSamp": [
                216
            ],
            "variance": [
                218
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryArrRelInsertInput": {
            "data": [
                190
            ],
            "onConflict": [
                196
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAvgFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryAvgOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryBoolExp": {
            "_and": [
                187
            ],
            "_not": [
                187
            ],
            "_or": [
                187
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
            "label": [
                178
            ],
            "labelId": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryConstraint": {},
        "LabelChatbotCategoryIncInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryInsertInput": {
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
            "label": [
                225
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryMaxFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryMaxOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryMinFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryMinOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                179
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryOnConflict": {
            "constraint": [
                188
            ],
            "updateColumns": [
                211
            ],
            "where": [
                187
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryOrderBy": {
            "category": [
                15
            ],
            "categoryId": [
                324
            ],
            "chatbot": [
                129
            ],
            "chatbotId": [
                324
            ],
            "label": [
                227
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategorySelectColumn": {},
        "LabelChatbotCategorySetInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStreamCursorInput": {
            "initialValue": [
                208
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategorySumFields": {
            "categoryId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategorySumOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryUpdateColumn": {},
        "LabelChatbotCategoryUpdates": {
            "_inc": [
                189
            ],
            "_set": [
                200
            ],
            "where": [
                187
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "chatbotId": [
                171
            ],
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                324
            ],
            "chatbotId": [
                324
            ],
            "labelId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "metadataLabels": [
                184
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelMaxFields": {
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelMinFields": {
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                174
            ],
            "__typename": [
                549
            ]
        },
        "LabelObjRelInsertInput": {
            "data": [
                221
            ],
            "onConflict": [
                226
            ],
            "__typename": [
                549
            ]
        },
        "LabelOnConflict": {
            "constraint": [
                219
            ],
            "updateColumns": [
                237
            ],
            "where": [
                178
            ],
            "__typename": [
                549
            ]
        },
        "LabelOrderBy": {
            "advancedLabels": [
                324
            ],
            "categories": [
                324
            ],
            "labelId": [
                324
            ],
            "metadataLabelsAggregate": [
                183
            ],
            "questions": [
                324
            ],
            "subCategories": [
                324
            ],
            "tags": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelStreamCursorInput": {
            "initialValue": [
                235
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                549
            ],
            "labelId": [
                172
            ],
            "questions": [
                549
            ],
            "subCategories": [
                549
            ],
            "tags": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LabelSumFields": {
            "labelId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "LabelUpdateColumn": {},
        "LabelUpdates": {
            "_inc": [
                220
            ],
            "_set": [
                230
            ],
            "where": [
                178
            ],
            "__typename": [
                549
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                171
            ],
            "__typename": [
                549
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
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumAggregate": {
            "aggregate": [
                244
            ],
            "nodes": [
                242
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        255,
                        "[LengthEnumSelectColumn!]"
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
                249
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                245
            ],
            "_not": [
                245
            ],
            "_or": [
                245
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                330
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                242
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumObjRelInsertInput": {
            "data": [
                247
            ],
            "onConflict": [
                252
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumOnConflict": {
            "constraint": [
                246
            ],
            "updateColumns": [
                259
            ],
            "where": [
                245
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                329
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                258
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "LengthEnumUpdateColumn": {},
        "LengthEnumUpdates": {
            "_set": [
                256
            ],
            "where": [
                245
            ],
            "__typename": [
                549
            ]
        },
        "Message": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "messageTypeEnum": [
                282
            ],
            "role": [
                549
            ],
            "thread": [
                551
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageAggregate": {
            "aggregate": [
                264
            ],
            "nodes": [
                261
            ],
            "__typename": [
                549
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                700
            ],
            "__typename": [
                549
            ]
        },
        "MessageAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                270
            ],
            "min": [
                272
            ],
            "__typename": [
                549
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                271
            ],
            "min": [
                273
            ],
            "__typename": [
                549
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                269
            ],
            "onConflict": [
                275
            ],
            "__typename": [
                549
            ]
        },
        "MessageBoolExp": {
            "_and": [
                267
            ],
            "_not": [
                267
            ],
            "_or": [
                267
            ],
            "content": [
                550
            ],
            "createdAt": [
                594
            ],
            "messageId": [
                695
            ],
            "messageTypeEnum": [
                285
            ],
            "role": [
                550
            ],
            "thread": [
                559
            ],
            "threadId": [
                695
            ],
            "__typename": [
                549
            ]
        },
        "MessageConstraint": {},
        "MessageInsertInput": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "messageTypeEnum": [
                291
            ],
            "role": [
                549
            ],
            "thread": [
                568
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageMaxFields": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "role": [
                549
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageMaxOrderBy": {
            "content": [
                324
            ],
            "createdAt": [
                324
            ],
            "messageId": [
                324
            ],
            "role": [
                324
            ],
            "threadId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "MessageMinFields": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "role": [
                549
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageMinOrderBy": {
            "content": [
                324
            ],
            "createdAt": [
                324
            ],
            "messageId": [
                324
            ],
            "role": [
                324
            ],
            "threadId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "MessageMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                261
            ],
            "__typename": [
                549
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                268
            ],
            "updateColumns": [
                301
            ],
            "where": [
                267
            ],
            "__typename": [
                549
            ]
        },
        "MessageOrderBy": {
            "content": [
                324
            ],
            "createdAt": [
                324
            ],
            "messageId": [
                324
            ],
            "messageTypeEnum": [
                293
            ],
            "role": [
                324
            ],
            "thread": [
                570
            ],
            "threadId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "role": [
                549
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                281
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                549
            ],
            "createdAt": [
                712
            ],
            "messageId": [
                715
            ],
            "role": [
                549
            ],
            "threadId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                261,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messagesAggregate": [
                262,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                284
            ],
            "nodes": [
                282
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        295,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                288
            ],
            "min": [
                289
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                285
            ],
            "_not": [
                285
            ],
            "_or": [
                285
            ],
            "messages": [
                267
            ],
            "messagesAggregate": [
                263
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                266
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                282
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumObjRelInsertInput": {
            "data": [
                287
            ],
            "onConflict": [
                292
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                286
            ],
            "updateColumns": [
                299
            ],
            "where": [
                285
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                265
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                298
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                296
            ],
            "where": [
                285
            ],
            "__typename": [
                549
            ]
        },
        "MessageUpdateColumn": {},
        "MessageUpdates": {
            "_set": [
                279
            ],
            "where": [
                267
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnum": {
            "name": [
                549
            ],
            "threads": [
                551,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadsAggregate": [
                552,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumAggregate": {
            "aggregate": [
                305
            ],
            "nodes": [
                303
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        318,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                311
            ],
            "min": [
                312
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                306
            ],
            "_not": [
                306
            ],
            "_or": [
                306
            ],
            "name": [
                550
            ],
            "threads": [
                559
            ],
            "threadsAggregate": [
                553
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumConstraint": {},
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                308
            ],
            "_in": [
                308
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                308
            ],
            "_nin": [
                308
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                549
            ],
            "threads": [
                556
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                549
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                549
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                303
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumObjRelInsertInput": {
            "data": [
                310
            ],
            "onConflict": [
                315
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumOnConflict": {
            "constraint": [
                307
            ],
            "updateColumns": [
                322
            ],
            "where": [
                306
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                324
            ],
            "threadsAggregate": [
                555
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                549
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                321
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                549
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ModelsEnumUpdateColumn": {},
        "ModelsEnumUpdates": {
            "_set": [
                319
            ],
            "where": [
                306
            ],
            "__typename": [
                549
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
                242
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "toneEnum": [
                614
            ],
            "typeEnum": [
                633
            ],
            "user": [
                652
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                328
            ],
            "nodes": [
                325
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                701
            ],
            "bool_or": [
                702
            ],
            "count": [
                703
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                331
            ],
            "count": [
                172,
                {
                    "columns": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                337
            ],
            "min": [
                339
            ],
            "stddev": [
                349
            ],
            "stddevPop": [
                351
            ],
            "stddevSamp": [
                353
            ],
            "sum": [
                357
            ],
            "varPop": [
                361
            ],
            "varSamp": [
                363
            ],
            "variance": [
                365
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                332
            ],
            "count": [
                324
            ],
            "max": [
                338
            ],
            "min": [
                340
            ],
            "stddev": [
                350
            ],
            "stddevPop": [
                352
            ],
            "stddevSamp": [
                354
            ],
            "sum": [
                358
            ],
            "varPop": [
                362
            ],
            "varSamp": [
                364
            ],
            "variance": [
                366
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                336
            ],
            "onConflict": [
                342
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                333
            ],
            "_not": [
                333
            ],
            "_or": [
                333
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
                245
            ],
            "preferenceId": [
                173
            ],
            "preferredComplexity": [
                550
            ],
            "preferredLength": [
                550
            ],
            "preferredTone": [
                550
            ],
            "preferredType": [
                550
            ],
            "toneEnum": [
                617
            ],
            "typeEnum": [
                636
            ],
            "user": [
                655
            ],
            "userId": [
                695
            ],
            "__typename": [
                549
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
                549
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
                251
            ],
            "preferenceId": [
                172
            ],
            "preferredComplexity": [
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "toneEnum": [
                623
            ],
            "typeEnum": [
                642
            ],
            "user": [
                661
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
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
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "preferredComplexity": [
                324
            ],
            "preferredLength": [
                324
            ],
            "preferredTone": [
                324
            ],
            "preferredType": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
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
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "preferredComplexity": [
                324
            ],
            "preferredLength": [
                324
            ],
            "preferredTone": [
                324
            ],
            "preferredType": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                325
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                334
            ],
            "updateColumns": [
                359
            ],
            "where": [
                333
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                324
            ],
            "complexityEnum": [
                162
            ],
            "favorite": [
                324
            ],
            "lengthEnum": [
                253
            ],
            "preferenceId": [
                324
            ],
            "preferredComplexity": [
                324
            ],
            "preferredLength": [
                324
            ],
            "preferredTone": [
                324
            ],
            "preferredType": [
                324
            ],
            "toneEnum": [
                625
            ],
            "typeEnum": [
                644
            ],
            "user": [
                663
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                172
            ],
            "__typename": [
                549
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
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                356
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
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
                549
            ],
            "preferredLength": [
                549
            ],
            "preferredTone": [
                549
            ],
            "preferredType": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                335
            ],
            "_set": [
                348
            ],
            "where": [
                333
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "preferenceId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "Prompt": {
            "chatbots": [
                376,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "chatbotsAggregate": [
                377,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "promptTypeEnum": [
                440
            ],
            "type": [
                549
            ],
            "users": [
                461,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "usersAggregate": [
                462,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "__typename": [
                549
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                370
            ],
            "nodes": [
                367
            ],
            "__typename": [
                549
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                704
            ],
            "__typename": [
                549
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                373
            ],
            "count": [
                172,
                {
                    "columns": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                419
            ],
            "min": [
                421
            ],
            "stddev": [
                430
            ],
            "stddevPop": [
                432
            ],
            "stddevSamp": [
                434
            ],
            "sum": [
                438
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
                549
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                374
            ],
            "count": [
                324
            ],
            "max": [
                420
            ],
            "min": [
                422
            ],
            "stddev": [
                431
            ],
            "stddevPop": [
                433
            ],
            "stddevSamp": [
                435
            ],
            "sum": [
                439
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
                549
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                418
            ],
            "onConflict": [
                425
            ],
            "__typename": [
                549
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptBoolExp": {
            "_and": [
                375
            ],
            "_not": [
                375
            ],
            "_or": [
                375
            ],
            "chatbots": [
                384
            ],
            "chatbotsAggregate": [
                378
            ],
            "content": [
                550
            ],
            "promptId": [
                173
            ],
            "promptName": [
                550
            ],
            "promptTypeEnum": [
                443
            ],
            "type": [
                550
            ],
            "users": [
                469
            ],
            "usersAggregate": [
                463
            ],
            "__typename": [
                549
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
                367
            ],
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                379
            ],
            "nodes": [
                376
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                705
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                382
            ],
            "count": [
                172,
                {
                    "columns": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                388
            ],
            "min": [
                390
            ],
            "stddev": [
                398
            ],
            "stddevPop": [
                400
            ],
            "stddevSamp": [
                402
            ],
            "sum": [
                406
            ],
            "varPop": [
                410
            ],
            "varSamp": [
                412
            ],
            "variance": [
                414
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                383
            ],
            "count": [
                324
            ],
            "max": [
                389
            ],
            "min": [
                391
            ],
            "stddev": [
                399
            ],
            "stddevPop": [
                401
            ],
            "stddevSamp": [
                403
            ],
            "sum": [
                407
            ],
            "varPop": [
                411
            ],
            "varSamp": [
                413
            ],
            "variance": [
                415
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                387
            ],
            "onConflict": [
                393
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                384
            ],
            "_not": [
                384
            ],
            "_or": [
                384
            ],
            "chabotId": [
                173
            ],
            "chatbot": [
                78
            ],
            "prompt": [
                375
            ],
            "promptId": [
                173
            ],
            "__typename": [
                549
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
                549
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
                424
            ],
            "promptId": [
                172
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                376
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                385
            ],
            "updateColumns": [
                408
            ],
            "where": [
                384
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                324
            ],
            "chatbot": [
                129
            ],
            "prompt": [
                426
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                405
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
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
                549
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
                549
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                386
            ],
            "_set": [
                397
            ],
            "where": [
                384
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
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
                549
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                324
            ],
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                381
            ],
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "promptTypeEnum": [
                449
            ],
            "type": [
                549
            ],
            "users": [
                466
            ],
            "__typename": [
                549
            ]
        },
        "PromptMaxFields": {
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "type": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                324
            ],
            "promptId": [
                324
            ],
            "promptName": [
                324
            ],
            "type": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptMinFields": {
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "type": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                324
            ],
            "promptId": [
                324
            ],
            "promptName": [
                324
            ],
            "type": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                367
            ],
            "__typename": [
                549
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                418
            ],
            "onConflict": [
                425
            ],
            "__typename": [
                549
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                416
            ],
            "updateColumns": [
                459
            ],
            "where": [
                375
            ],
            "__typename": [
                549
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                380
            ],
            "content": [
                324
            ],
            "promptId": [
                324
            ],
            "promptName": [
                324
            ],
            "promptTypeEnum": [
                451
            ],
            "type": [
                324
            ],
            "usersAggregate": [
                465
            ],
            "__typename": [
                549
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "type": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                437
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                549
            ],
            "promptId": [
                172
            ],
            "promptName": [
                549
            ],
            "type": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                367,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptsAggregate": [
                368,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                442
            ],
            "nodes": [
                440
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        453,
                        "[PromptTypeEnumSelectColumn!]"
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
                549
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                443
            ],
            "_not": [
                443
            ],
            "_or": [
                443
            ],
            "prompts": [
                375
            ],
            "promptsAggregate": [
                369
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                372
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                440
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                445
            ],
            "onConflict": [
                450
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                444
            ],
            "updateColumns": [
                457
            ],
            "where": [
                443
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                371
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                456
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                454
            ],
            "where": [
                443
            ],
            "__typename": [
                549
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                417
            ],
            "_set": [
                429
            ],
            "where": [
                375
            ],
            "__typename": [
                549
            ]
        },
        "PromptUser": {
            "prompt": [
                367
            ],
            "promptId": [
                172
            ],
            "user": [
                652
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                464
            ],
            "nodes": [
                461
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                706
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                467
            ],
            "count": [
                172,
                {
                    "columns": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                473
            ],
            "min": [
                475
            ],
            "stddev": [
                483
            ],
            "stddevPop": [
                485
            ],
            "stddevSamp": [
                487
            ],
            "sum": [
                491
            ],
            "varPop": [
                495
            ],
            "varSamp": [
                497
            ],
            "variance": [
                499
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                468
            ],
            "count": [
                324
            ],
            "max": [
                474
            ],
            "min": [
                476
            ],
            "stddev": [
                484
            ],
            "stddevPop": [
                486
            ],
            "stddevSamp": [
                488
            ],
            "sum": [
                492
            ],
            "varPop": [
                496
            ],
            "varSamp": [
                498
            ],
            "variance": [
                500
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                472
            ],
            "onConflict": [
                478
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                469
            ],
            "_not": [
                469
            ],
            "_or": [
                469
            ],
            "prompt": [
                375
            ],
            "promptId": [
                173
            ],
            "user": [
                655
            ],
            "userId": [
                695
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                424
            ],
            "promptId": [
                172
            ],
            "user": [
                661
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                172
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                172
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                461
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                470
            ],
            "updateColumns": [
                493
            ],
            "where": [
                469
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                426
            ],
            "promptId": [
                324
            ],
            "user": [
                663
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                172
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                172
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                490
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                172
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                471
            ],
            "_set": [
                482
            ],
            "where": [
                469
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "Referral": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "user": [
                652
            ],
            "userByUserId": [
                652
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralAggregate": {
            "aggregate": [
                510
            ],
            "nodes": [
                507
            ],
            "__typename": [
                549
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                707
            ],
            "__typename": [
                549
            ]
        },
        "ReferralAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                516
            ],
            "min": [
                518
            ],
            "__typename": [
                549
            ]
        },
        "ReferralAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                517
            ],
            "min": [
                519
            ],
            "__typename": [
                549
            ]
        },
        "ReferralArrRelInsertInput": {
            "data": [
                515
            ],
            "onConflict": [
                521
            ],
            "__typename": [
                549
            ]
        },
        "ReferralBoolExp": {
            "_and": [
                513
            ],
            "_not": [
                513
            ],
            "_or": [
                513
            ],
            "referralCode": [
                550
            ],
            "referrerId": [
                695
            ],
            "user": [
                655
            ],
            "userByUserId": [
                655
            ],
            "userId": [
                695
            ],
            "__typename": [
                549
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "user": [
                661
            ],
            "userByUserId": [
                661
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralMaxOrderBy": {
            "referralCode": [
                324
            ],
            "referrerId": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralMinOrderBy": {
            "referralCode": [
                324
            ],
            "referrerId": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ReferralMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                507
            ],
            "__typename": [
                549
            ]
        },
        "ReferralOnConflict": {
            "constraint": [
                514
            ],
            "updateColumns": [
                528
            ],
            "where": [
                513
            ],
            "__typename": [
                549
            ]
        },
        "ReferralOrderBy": {
            "referralCode": [
                324
            ],
            "referrerId": [
                324
            ],
            "user": [
                663
            ],
            "userByUserId": [
                663
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralStreamCursorInput": {
            "initialValue": [
                527
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                549
            ],
            "referrerId": [
                715
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ReferralUpdateColumn": {},
        "ReferralUpdates": {
            "_set": [
                525
            ],
            "where": [
                513
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowing": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "user": [
                652
            ],
            "userByFollowerId": [
                652
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingAggregate": {
            "aggregate": [
                533
            ],
            "nodes": [
                530
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingAggregateBoolExp": {
            "count": [
                708
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                538
            ],
            "min": [
                540
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                539
            ],
            "min": [
                541
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingArrRelInsertInput": {
            "data": [
                537
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingBoolExp": {
            "_and": [
                536
            ],
            "_not": [
                536
            ],
            "_or": [
                536
            ],
            "createdAt": [
                594
            ],
            "followeeId": [
                695
            ],
            "followerId": [
                695
            ],
            "user": [
                655
            ],
            "userByFollowerId": [
                655
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingInsertInput": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "user": [
                661
            ],
            "userByFollowerId": [
                661
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingMaxFields": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingMaxOrderBy": {
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followerId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingMinFields": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingMinOrderBy": {
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followerId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                530
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingOrderBy": {
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followerId": [
                324
            ],
            "user": [
                663
            ],
            "userByFollowerId": [
                663
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingSelectColumn": {},
        "SocialFollowingSetInput": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingStreamCursorInput": {
            "initialValue": [
                547
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingStreamCursorValueInput": {
            "createdAt": [
                712
            ],
            "followeeId": [
                715
            ],
            "followerId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "SocialFollowingUpdates": {
            "_set": [
                545
            ],
            "where": [
                536
            ],
            "__typename": [
                549
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                549
            ],
            "_gt": [
                549
            ],
            "_gte": [
                549
            ],
            "_ilike": [
                549
            ],
            "_in": [
                549
            ],
            "_iregex": [
                549
            ],
            "_isNull": [
                0
            ],
            "_like": [
                549
            ],
            "_lt": [
                549
            ],
            "_lte": [
                549
            ],
            "_neq": [
                549
            ],
            "_nilike": [
                549
            ],
            "_nin": [
                549
            ],
            "_niregex": [
                549
            ],
            "_nlike": [
                549
            ],
            "_nregex": [
                549
            ],
            "_nsimilar": [
                549
            ],
            "_regex": [
                549
            ],
            "_similar": [
                549
            ],
            "__typename": [
                549
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
                712
            ],
            "isApproved": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isPublic": [
                0
            ],
            "messages": [
                261,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messagesAggregate": [
                262,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "model": [
                308
            ],
            "modelsEnum": [
                303
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "user": [
                652
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                554
            ],
            "nodes": [
                551
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                709
            ],
            "bool_or": [
                710
            ],
            "count": [
                711
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                557
            ],
            "count": [
                172,
                {
                    "columns": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                563
            ],
            "min": [
                565
            ],
            "stddev": [
                576
            ],
            "stddevPop": [
                578
            ],
            "stddevSamp": [
                580
            ],
            "sum": [
                584
            ],
            "varPop": [
                588
            ],
            "varSamp": [
                590
            ],
            "variance": [
                592
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                558
            ],
            "count": [
                324
            ],
            "max": [
                564
            ],
            "min": [
                566
            ],
            "stddev": [
                577
            ],
            "stddevPop": [
                579
            ],
            "stddevSamp": [
                581
            ],
            "sum": [
                585
            ],
            "varPop": [
                589
            ],
            "varSamp": [
                591
            ],
            "variance": [
                593
            ],
            "__typename": [
                549
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                562
            ],
            "onConflict": [
                569
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                559
            ],
            "_not": [
                559
            ],
            "_or": [
                559
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "createdAt": [
                594
            ],
            "isApproved": [
                1
            ],
            "isBlocked": [
                1
            ],
            "isPublic": [
                1
            ],
            "messages": [
                267
            ],
            "messagesAggregate": [
                263
            ],
            "model": [
                309
            ],
            "modelsEnum": [
                306
            ],
            "threadId": [
                695
            ],
            "updatedAt": [
                594
            ],
            "user": [
                655
            ],
            "userId": [
                695
            ],
            "__typename": [
                549
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                549
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
                712
            ],
            "isApproved": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isPublic": [
                0
            ],
            "messages": [
                266
            ],
            "model": [
                308
            ],
            "modelsEnum": [
                314
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "user": [
                661
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                712
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                324
            ],
            "createdAt": [
                324
            ],
            "threadId": [
                324
            ],
            "updatedAt": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                712
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                324
            ],
            "createdAt": [
                324
            ],
            "threadId": [
                324
            ],
            "updatedAt": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                551
            ],
            "__typename": [
                549
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                562
            ],
            "onConflict": [
                569
            ],
            "__typename": [
                549
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                560
            ],
            "updateColumns": [
                586
            ],
            "where": [
                559
            ],
            "__typename": [
                549
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                129
            ],
            "chatbotId": [
                324
            ],
            "createdAt": [
                324
            ],
            "isApproved": [
                324
            ],
            "isBlocked": [
                324
            ],
            "isPublic": [
                324
            ],
            "messagesAggregate": [
                265
            ],
            "model": [
                324
            ],
            "modelsEnum": [
                316
            ],
            "threadId": [
                324
            ],
            "updatedAt": [
                324
            ],
            "user": [
                663
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                715
            ],
            "__typename": [
                549
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
                712
            ],
            "isApproved": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isPublic": [
                0
            ],
            "model": [
                308
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                583
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                712
            ],
            "isApproved": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isPublic": [
                0
            ],
            "model": [
                308
            ],
            "threadId": [
                715
            ],
            "updatedAt": [
                712
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                549
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                561
            ],
            "_set": [
                575
            ],
            "where": [
                559
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                549
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                712
            ],
            "_gt": [
                712
            ],
            "_gte": [
                712
            ],
            "_in": [
                712
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                712
            ],
            "_lte": [
                712
            ],
            "_neq": [
                712
            ],
            "_nin": [
                712
            ],
            "__typename": [
                549
            ]
        },
        "Token": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "userTokens": [
                670,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokensAggregate": [
                671,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "__typename": [
                549
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                597
            ],
            "nodes": [
                595
            ],
            "__typename": [
                549
            ]
        },
        "TokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        608,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                601
            ],
            "min": [
                602
            ],
            "__typename": [
                549
            ]
        },
        "TokenBoolExp": {
            "_and": [
                598
            ],
            "_not": [
                598
            ],
            "_or": [
                598
            ],
            "token": [
                550
            ],
            "tokenExpiry": [
                594
            ],
            "userTokens": [
                676
            ],
            "userTokensAggregate": [
                672
            ],
            "__typename": [
                549
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "userTokens": [
                675
            ],
            "__typename": [
                549
            ]
        },
        "TokenMaxFields": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "__typename": [
                549
            ]
        },
        "TokenMinFields": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "__typename": [
                549
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                595
            ],
            "__typename": [
                549
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                600
            ],
            "onConflict": [
                605
            ],
            "__typename": [
                549
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                599
            ],
            "updateColumns": [
                612
            ],
            "where": [
                598
            ],
            "__typename": [
                549
            ]
        },
        "TokenOrderBy": {
            "token": [
                324
            ],
            "tokenExpiry": [
                324
            ],
            "userTokensAggregate": [
                674
            ],
            "__typename": [
                549
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "__typename": [
                549
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                611
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                549
            ],
            "tokenExpiry": [
                712
            ],
            "__typename": [
                549
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                609
            ],
            "where": [
                598
            ],
            "__typename": [
                549
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
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                616
            ],
            "nodes": [
                614
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        627,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                620
            ],
            "min": [
                621
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                617
            ],
            "_not": [
                617
            ],
            "_or": [
                617
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                330
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                614
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                619
            ],
            "onConflict": [
                624
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                618
            ],
            "updateColumns": [
                631
            ],
            "where": [
                617
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                329
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                630
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                628
            ],
            "where": [
                617
            ],
            "__typename": [
                549
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
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                635
            ],
            "nodes": [
                633
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        646,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                639
            ],
            "min": [
                640
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                636
            ],
            "_not": [
                636
            ],
            "_or": [
                636
            ],
            "chatbots": [
                78
            ],
            "chatbotsAggregate": [
                72
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "value": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                75
            ],
            "preferences": [
                330
            ],
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                633
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                638
            ],
            "onConflict": [
                643
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                637
            ],
            "updateColumns": [
                650
            ],
            "where": [
                636
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                74
            ],
            "preferencesAggregate": [
                329
            ],
            "value": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                649
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                647
            ],
            "where": [
                636
            ],
            "__typename": [
                549
            ]
        },
        "User": {
            "bio": [
                549
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
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "followers": [
                530,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "followersAggregate": [
                531,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "following": [
                530,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "followingAggregate": [
                531,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isVerified": [
                0
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "preferences": [
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferencesAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "prompts": [
                461,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "promptsAggregate": [
                462,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "referrals": [
                507,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralsAggregate": [
                508,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralsByUserId": [
                507,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralsByUserIdAggregate": [
                508,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "threads": [
                551,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadsAggregate": [
                552,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "userId": [
                715
            ],
            "userTokens": [
                670,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokensAggregate": [
                671,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserAggregate": {
            "aggregate": [
                654
            ],
            "nodes": [
                652
            ],
            "__typename": [
                549
            ]
        },
        "UserAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        666,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                658
            ],
            "min": [
                659
            ],
            "__typename": [
                549
            ]
        },
        "UserBoolExp": {
            "_and": [
                655
            ],
            "_not": [
                655
            ],
            "_or": [
                655
            ],
            "bio": [
                550
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                594
            ],
            "email": [
                550
            ],
            "favouriteTopic": [
                550
            ],
            "followers": [
                536
            ],
            "followersAggregate": [
                532
            ],
            "following": [
                536
            ],
            "followingAggregate": [
                532
            ],
            "getFreeMonth": [
                1
            ],
            "isBlocked": [
                1
            ],
            "isVerified": [
                1
            ],
            "lastLogin": [
                594
            ],
            "password": [
                550
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "proUserSubscriptionId": [
                550
            ],
            "profilePicture": [
                550
            ],
            "prompts": [
                469
            ],
            "promptsAggregate": [
                463
            ],
            "referrals": [
                513
            ],
            "referralsAggregate": [
                509
            ],
            "referralsByUserId": [
                513
            ],
            "referralsByUserIdAggregate": [
                509
            ],
            "role": [
                665
            ],
            "slug": [
                550
            ],
            "threads": [
                559
            ],
            "threadsAggregate": [
                553
            ],
            "userId": [
                695
            ],
            "userTokens": [
                676
            ],
            "userTokensAggregate": [
                672
            ],
            "username": [
                550
            ],
            "__typename": [
                549
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "bio": [
                549
            ],
            "chats": [
                35
            ],
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "followers": [
                535
            ],
            "following": [
                535
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isVerified": [
                0
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "preferences": [
                330
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "prompts": [
                466
            ],
            "referrals": [
                512
            ],
            "referralsByUserId": [
                512
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "threads": [
                556
            ],
            "userId": [
                715
            ],
            "userTokens": [
                675
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserMaxFields": {
            "bio": [
                549
            ],
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "userId": [
                715
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserMinFields": {
            "bio": [
                549
            ],
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "userId": [
                715
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                652
            ],
            "__typename": [
                549
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                657
            ],
            "onConflict": [
                662
            ],
            "__typename": [
                549
            ]
        },
        "UserOnConflict": {
            "constraint": [
                656
            ],
            "updateColumns": [
                693
            ],
            "where": [
                655
            ],
            "__typename": [
                549
            ]
        },
        "UserOrderBy": {
            "bio": [
                324
            ],
            "chatsAggregate": [
                34
            ],
            "dateJoined": [
                324
            ],
            "email": [
                324
            ],
            "favouriteTopic": [
                324
            ],
            "followersAggregate": [
                534
            ],
            "followingAggregate": [
                534
            ],
            "getFreeMonth": [
                324
            ],
            "isBlocked": [
                324
            ],
            "isVerified": [
                324
            ],
            "lastLogin": [
                324
            ],
            "password": [
                324
            ],
            "preferencesAggregate": [
                329
            ],
            "proUserSubscriptionId": [
                324
            ],
            "profilePicture": [
                324
            ],
            "promptsAggregate": [
                465
            ],
            "referralsAggregate": [
                511
            ],
            "referralsByUserIdAggregate": [
                511
            ],
            "role": [
                324
            ],
            "slug": [
                324
            ],
            "threadsAggregate": [
                555
            ],
            "userId": [
                324
            ],
            "userTokensAggregate": [
                674
            ],
            "username": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserRoleComparisonExp": {
            "_eq": [
                714
            ],
            "_gt": [
                714
            ],
            "_gte": [
                714
            ],
            "_in": [
                714
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                714
            ],
            "_lte": [
                714
            ],
            "_neq": [
                714
            ],
            "_nin": [
                714
            ],
            "__typename": [
                549
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "bio": [
                549
            ],
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isVerified": [
                0
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "userId": [
                715
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                669
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "UserStreamCursorValueInput": {
            "bio": [
                549
            ],
            "dateJoined": [
                712
            ],
            "email": [
                549
            ],
            "favouriteTopic": [
                549
            ],
            "getFreeMonth": [
                0
            ],
            "isBlocked": [
                0
            ],
            "isVerified": [
                0
            ],
            "lastLogin": [
                712
            ],
            "password": [
                549
            ],
            "proUserSubscriptionId": [
                549
            ],
            "profilePicture": [
                549
            ],
            "role": [
                714
            ],
            "slug": [
                549
            ],
            "userId": [
                715
            ],
            "username": [
                549
            ],
            "__typename": [
                549
            ]
        },
        "UserToken": {
            "token": [
                549
            ],
            "tokenByToken": [
                595
            ],
            "user": [
                652
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                673
            ],
            "nodes": [
                670
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                713
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                679
            ],
            "min": [
                681
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                680
            ],
            "min": [
                682
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                678
            ],
            "onConflict": [
                684
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                676
            ],
            "_not": [
                676
            ],
            "_or": [
                676
            ],
            "token": [
                550
            ],
            "tokenByToken": [
                598
            ],
            "user": [
                655
            ],
            "userId": [
                695
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                549
            ],
            "tokenByToken": [
                604
            ],
            "user": [
                661
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenMaxOrderBy": {
            "token": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenMinFields": {
            "token": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenMinOrderBy": {
            "token": [
                324
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                670
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                677
            ],
            "updateColumns": [
                691
            ],
            "where": [
                676
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                324
            ],
            "tokenByToken": [
                606
            ],
            "user": [
                663
            ],
            "userId": [
                324
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                690
            ],
            "ordering": [
                170
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                549
            ],
            "userId": [
                715
            ],
            "__typename": [
                549
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                688
            ],
            "where": [
                676
            ],
            "__typename": [
                549
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                667
            ],
            "where": [
                655
            ],
            "__typename": [
                549
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                715
            ],
            "_gt": [
                715
            ],
            "_gte": [
                715
            ],
            "_in": [
                715
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                715
            ],
            "_lte": [
                715
            ],
            "_neq": [
                715
            ],
            "_nin": [
                715
            ],
            "__typename": [
                549
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
                549
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
                549
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
                549
            ]
        },
        "labelChatbotCategoryAggregateBoolExpCount": {
            "arguments": [
                199
            ],
            "distinct": [
                0
            ],
            "filter": [
                187
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "messageAggregateBoolExpCount": {
            "arguments": [
                278
            ],
            "distinct": [
                0
            ],
            "filter": [
                267
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                346
            ],
            "distinct": [
                0
            ],
            "filter": [
                333
            ],
            "predicate": [
                1
            ],
            "__typename": [
                549
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                347
            ],
            "distinct": [
                0
            ],
            "filter": [
                333
            ],
            "predicate": [
                1
            ],
            "__typename": [
                549
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                345
            ],
            "distinct": [
                0
            ],
            "filter": [
                333
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                428
            ],
            "distinct": [
                0
            ],
            "filter": [
                375
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                396
            ],
            "distinct": [
                0
            ],
            "filter": [
                384
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                481
            ],
            "distinct": [
                0
            ],
            "filter": [
                469
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "referralAggregateBoolExpCount": {
            "arguments": [
                524
            ],
            "distinct": [
                0
            ],
            "filter": [
                513
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "socialFollowingAggregateBoolExpCount": {
            "arguments": [
                544
            ],
            "distinct": [
                0
            ],
            "filter": [
                536
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                573
            ],
            "distinct": [
                0
            ],
            "filter": [
                559
            ],
            "predicate": [
                1
            ],
            "__typename": [
                549
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                574
            ],
            "distinct": [
                0
            ],
            "filter": [
                559
            ],
            "predicate": [
                1
            ],
            "__typename": [
                549
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                572
            ],
            "distinct": [
                0
            ],
            "filter": [
                559
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                687
            ],
            "distinct": [
                0
            ],
            "filter": [
                676
            ],
            "predicate": [
                173
            ],
            "__typename": [
                549
            ]
        },
        "user_role": {},
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
                        549,
                        "String!"
                    ]
                }
            ],
            "label": [
                174,
                {
                    "distinctOn": [
                        229,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        227,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "labelAggregate": [
                175,
                {
                    "distinctOn": [
                        229,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        227,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "labelByPk": [
                174,
                {
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategory": [
                179,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "labelChatbotCategoryAggregate": [
                180,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "labelChatbotCategoryByPk": [
                179,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ],
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "lengthEnum": [
                242,
                {
                    "distinctOn": [
                        255,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        253,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "lengthEnumAggregate": [
                243,
                {
                    "distinctOn": [
                        255,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        253,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "lengthEnumByPk": [
                242,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "message": [
                261,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messageAggregate": [
                262,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messageByPk": [
                261,
                {
                    "messageId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                282,
                {
                    "distinctOn": [
                        295,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        293,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                283,
                {
                    "distinctOn": [
                        295,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        293,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                282,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                303,
                {
                    "distinctOn": [
                        318,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        316,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        306
                    ]
                }
            ],
            "modelsEnumAggregate": [
                304,
                {
                    "distinctOn": [
                        318,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        316,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        306
                    ]
                }
            ],
            "modelsEnumByPk": [
                303,
                {
                    "name": [
                        549,
                        "String!"
                    ]
                }
            ],
            "preference": [
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferenceAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferenceByPk": [
                325,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                367,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptAggregate": [
                368,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptByPk": [
                367,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                376,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptChatbotAggregate": [
                377,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptChatbotByPk": [
                376,
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
                440,
                {
                    "distinctOn": [
                        453,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        451,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                441,
                {
                    "distinctOn": [
                        453,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        451,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                440,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                461,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "promptUserAggregate": [
                462,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "promptUserByPk": [
                461,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "referral": [
                507,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralAggregate": [
                508,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralByPk": [
                507,
                {
                    "referralCode": [
                        549,
                        "String!"
                    ]
                }
            ],
            "socialFollowing": [
                530,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "socialFollowingAggregate": [
                531,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "thread": [
                551,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadAggregate": [
                552,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadByPk": [
                551,
                {
                    "threadId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                595,
                {
                    "distinctOn": [
                        608,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "tokenAggregate": [
                596,
                {
                    "distinctOn": [
                        608,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "tokenByPk": [
                595,
                {
                    "token": [
                        549,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                614,
                {
                    "distinctOn": [
                        627,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "toneEnumAggregate": [
                615,
                {
                    "distinctOn": [
                        627,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "toneEnumByPk": [
                614,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                633,
                {
                    "distinctOn": [
                        646,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "typeEnumAggregate": [
                634,
                {
                    "distinctOn": [
                        646,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "typeEnumByPk": [
                633,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "user": [
                652,
                {
                    "distinctOn": [
                        666,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        663,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        655
                    ]
                }
            ],
            "userAggregate": [
                653,
                {
                    "distinctOn": [
                        666,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        663,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        655
                    ]
                }
            ],
            "userByPk": [
                652,
                {
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                670,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokenAggregate": [
                671,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokenByPk": [
                670,
                {
                    "token": [
                        549,
                        "String!"
                    ],
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                549
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
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteLabel": [
                224,
                {
                    "where": [
                        178,
                        "LabelBoolExp!"
                    ]
                }
            ],
            "deleteLabelByPk": [
                174,
                {
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deleteLabelChatbotCategory": [
                195,
                {
                    "where": [
                        187,
                        "LabelChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "deleteLabelChatbotCategoryByPk": [
                179,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ],
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deleteLengthEnum": [
                250,
                {
                    "where": [
                        245,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "deleteLengthEnumByPk": [
                242,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteMessage": [
                274,
                {
                    "where": [
                        267,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "deleteMessageByPk": [
                261,
                {
                    "messageId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                290,
                {
                    "where": [
                        285,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                282,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteModelsEnum": [
                313,
                {
                    "where": [
                        306,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "deleteModelsEnumByPk": [
                303,
                {
                    "name": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                341,
                {
                    "where": [
                        333,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                325,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                423,
                {
                    "where": [
                        375,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                367,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                392,
                {
                    "where": [
                        384,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                376,
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
                448,
                {
                    "where": [
                        443,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                440,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                477,
                {
                    "where": [
                        469,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                461,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "deleteReferral": [
                520,
                {
                    "where": [
                        513,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "deleteReferralByPk": [
                507,
                {
                    "referralCode": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteSocialFollowing": [
                542,
                {
                    "where": [
                        536,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "deleteThread": [
                567,
                {
                    "where": [
                        559,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                551,
                {
                    "threadId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                603,
                {
                    "where": [
                        598,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                595,
                {
                    "token": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                622,
                {
                    "where": [
                        617,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                614,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                641,
                {
                    "where": [
                        636,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                633,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                660,
                {
                    "where": [
                        655,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                652,
                {
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                683,
                {
                    "where": [
                        676,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                670,
                {
                    "token": [
                        549,
                        "String!"
                    ],
                    "userId": [
                        715,
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
            "insertLabel": [
                224,
                {
                    "objects": [
                        221,
                        "[LabelInsertInput!]!"
                    ],
                    "onConflict": [
                        226
                    ]
                }
            ],
            "insertLabelChatbotCategory": [
                195,
                {
                    "objects": [
                        190,
                        "[LabelChatbotCategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        196
                    ]
                }
            ],
            "insertLabelChatbotCategoryOne": [
                179,
                {
                    "object": [
                        190,
                        "LabelChatbotCategoryInsertInput!"
                    ],
                    "onConflict": [
                        196
                    ]
                }
            ],
            "insertLabelOne": [
                174,
                {
                    "object": [
                        221,
                        "LabelInsertInput!"
                    ],
                    "onConflict": [
                        226
                    ]
                }
            ],
            "insertLengthEnum": [
                250,
                {
                    "objects": [
                        247,
                        "[LengthEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        252
                    ]
                }
            ],
            "insertLengthEnumOne": [
                242,
                {
                    "object": [
                        247,
                        "LengthEnumInsertInput!"
                    ],
                    "onConflict": [
                        252
                    ]
                }
            ],
            "insertMessage": [
                274,
                {
                    "objects": [
                        269,
                        "[MessageInsertInput!]!"
                    ],
                    "onConflict": [
                        275
                    ]
                }
            ],
            "insertMessageOne": [
                261,
                {
                    "object": [
                        269,
                        "MessageInsertInput!"
                    ],
                    "onConflict": [
                        275
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                290,
                {
                    "objects": [
                        287,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        292
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                282,
                {
                    "object": [
                        287,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        292
                    ]
                }
            ],
            "insertModelsEnum": [
                313,
                {
                    "objects": [
                        310,
                        "[ModelsEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        315
                    ]
                }
            ],
            "insertModelsEnumOne": [
                303,
                {
                    "object": [
                        310,
                        "ModelsEnumInsertInput!"
                    ],
                    "onConflict": [
                        315
                    ]
                }
            ],
            "insertPreference": [
                341,
                {
                    "objects": [
                        336,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        342
                    ]
                }
            ],
            "insertPreferenceOne": [
                325,
                {
                    "object": [
                        336,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        342
                    ]
                }
            ],
            "insertPrompt": [
                423,
                {
                    "objects": [
                        418,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        425
                    ]
                }
            ],
            "insertPromptChatbot": [
                392,
                {
                    "objects": [
                        387,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        393
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                376,
                {
                    "object": [
                        387,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        393
                    ]
                }
            ],
            "insertPromptOne": [
                367,
                {
                    "object": [
                        418,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        425
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                448,
                {
                    "objects": [
                        445,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        450
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                440,
                {
                    "object": [
                        445,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        450
                    ]
                }
            ],
            "insertPromptUser": [
                477,
                {
                    "objects": [
                        472,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        478
                    ]
                }
            ],
            "insertPromptUserOne": [
                461,
                {
                    "object": [
                        472,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        478
                    ]
                }
            ],
            "insertReferral": [
                520,
                {
                    "objects": [
                        515,
                        "[ReferralInsertInput!]!"
                    ],
                    "onConflict": [
                        521
                    ]
                }
            ],
            "insertReferralOne": [
                507,
                {
                    "object": [
                        515,
                        "ReferralInsertInput!"
                    ],
                    "onConflict": [
                        521
                    ]
                }
            ],
            "insertSocialFollowing": [
                542,
                {
                    "objects": [
                        537,
                        "[SocialFollowingInsertInput!]!"
                    ]
                }
            ],
            "insertSocialFollowingOne": [
                530,
                {
                    "object": [
                        537,
                        "SocialFollowingInsertInput!"
                    ]
                }
            ],
            "insertThread": [
                567,
                {
                    "objects": [
                        562,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        569
                    ]
                }
            ],
            "insertThreadOne": [
                551,
                {
                    "object": [
                        562,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        569
                    ]
                }
            ],
            "insertToken": [
                603,
                {
                    "objects": [
                        600,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        605
                    ]
                }
            ],
            "insertTokenOne": [
                595,
                {
                    "object": [
                        600,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        605
                    ]
                }
            ],
            "insertToneEnum": [
                622,
                {
                    "objects": [
                        619,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        624
                    ]
                }
            ],
            "insertToneEnumOne": [
                614,
                {
                    "object": [
                        619,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        624
                    ]
                }
            ],
            "insertTypeEnum": [
                641,
                {
                    "objects": [
                        638,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        643
                    ]
                }
            ],
            "insertTypeEnumOne": [
                633,
                {
                    "object": [
                        638,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        643
                    ]
                }
            ],
            "insertUser": [
                660,
                {
                    "objects": [
                        657,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertUserOne": [
                652,
                {
                    "object": [
                        657,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertUserToken": [
                683,
                {
                    "objects": [
                        678,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        684
                    ]
                }
            ],
            "insertUserTokenOne": [
                670,
                {
                    "object": [
                        678,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        684
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
            "updateLabel": [
                224,
                {
                    "_inc": [
                        220
                    ],
                    "_set": [
                        230
                    ],
                    "where": [
                        178,
                        "LabelBoolExp!"
                    ]
                }
            ],
            "updateLabelByPk": [
                174,
                {
                    "_inc": [
                        220
                    ],
                    "_set": [
                        230
                    ],
                    "pkColumns": [
                        228,
                        "LabelPkColumnsInput!"
                    ]
                }
            ],
            "updateLabelChatbotCategory": [
                195,
                {
                    "_inc": [
                        189
                    ],
                    "_set": [
                        200
                    ],
                    "where": [
                        187,
                        "LabelChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "updateLabelChatbotCategoryByPk": [
                179,
                {
                    "_inc": [
                        189
                    ],
                    "_set": [
                        200
                    ],
                    "pkColumns": [
                        198,
                        "LabelChatbotCategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateLabelChatbotCategoryMany": [
                195,
                {
                    "updates": [
                        212,
                        "[LabelChatbotCategoryUpdates!]!"
                    ]
                }
            ],
            "updateLabelMany": [
                224,
                {
                    "updates": [
                        238,
                        "[LabelUpdates!]!"
                    ]
                }
            ],
            "updateLengthEnum": [
                250,
                {
                    "_set": [
                        256
                    ],
                    "where": [
                        245,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "updateLengthEnumByPk": [
                242,
                {
                    "_set": [
                        256
                    ],
                    "pkColumns": [
                        254,
                        "LengthEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateLengthEnumMany": [
                250,
                {
                    "updates": [
                        260,
                        "[LengthEnumUpdates!]!"
                    ]
                }
            ],
            "updateMessage": [
                274,
                {
                    "_set": [
                        279
                    ],
                    "where": [
                        267,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "updateMessageByPk": [
                261,
                {
                    "_set": [
                        279
                    ],
                    "pkColumns": [
                        277,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                274,
                {
                    "updates": [
                        302,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                290,
                {
                    "_set": [
                        296
                    ],
                    "where": [
                        285,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                282,
                {
                    "_set": [
                        296
                    ],
                    "pkColumns": [
                        294,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                290,
                {
                    "updates": [
                        300,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateModelsEnum": [
                313,
                {
                    "_set": [
                        319
                    ],
                    "where": [
                        306,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "updateModelsEnumByPk": [
                303,
                {
                    "_set": [
                        319
                    ],
                    "pkColumns": [
                        317,
                        "ModelsEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateModelsEnumMany": [
                313,
                {
                    "updates": [
                        323,
                        "[ModelsEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                341,
                {
                    "_inc": [
                        335
                    ],
                    "_set": [
                        348
                    ],
                    "where": [
                        333,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                325,
                {
                    "_inc": [
                        335
                    ],
                    "_set": [
                        348
                    ],
                    "pkColumns": [
                        344,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                341,
                {
                    "updates": [
                        360,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                423,
                {
                    "_inc": [
                        417
                    ],
                    "_set": [
                        429
                    ],
                    "where": [
                        375,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                367,
                {
                    "_inc": [
                        417
                    ],
                    "_set": [
                        429
                    ],
                    "pkColumns": [
                        427,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                392,
                {
                    "_inc": [
                        386
                    ],
                    "_set": [
                        397
                    ],
                    "where": [
                        384,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                376,
                {
                    "_inc": [
                        386
                    ],
                    "_set": [
                        397
                    ],
                    "pkColumns": [
                        395,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                392,
                {
                    "updates": [
                        409,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                423,
                {
                    "updates": [
                        460,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                448,
                {
                    "_set": [
                        454
                    ],
                    "where": [
                        443,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                440,
                {
                    "_set": [
                        454
                    ],
                    "pkColumns": [
                        452,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                448,
                {
                    "updates": [
                        458,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                477,
                {
                    "_inc": [
                        471
                    ],
                    "_set": [
                        482
                    ],
                    "where": [
                        469,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                461,
                {
                    "_inc": [
                        471
                    ],
                    "_set": [
                        482
                    ],
                    "pkColumns": [
                        480,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                477,
                {
                    "updates": [
                        494,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateReferral": [
                520,
                {
                    "_set": [
                        525
                    ],
                    "where": [
                        513,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "updateReferralByPk": [
                507,
                {
                    "_set": [
                        525
                    ],
                    "pkColumns": [
                        523,
                        "ReferralPkColumnsInput!"
                    ]
                }
            ],
            "updateReferralMany": [
                520,
                {
                    "updates": [
                        529,
                        "[ReferralUpdates!]!"
                    ]
                }
            ],
            "updateSocialFollowing": [
                542,
                {
                    "_set": [
                        545
                    ],
                    "where": [
                        536,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "updateSocialFollowingMany": [
                542,
                {
                    "updates": [
                        548,
                        "[SocialFollowingUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                567,
                {
                    "_inc": [
                        561
                    ],
                    "_set": [
                        575
                    ],
                    "where": [
                        559,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                551,
                {
                    "_inc": [
                        561
                    ],
                    "_set": [
                        575
                    ],
                    "pkColumns": [
                        571,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                567,
                {
                    "updates": [
                        587,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                603,
                {
                    "_set": [
                        609
                    ],
                    "where": [
                        598,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                595,
                {
                    "_set": [
                        609
                    ],
                    "pkColumns": [
                        607,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                603,
                {
                    "updates": [
                        613,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                622,
                {
                    "_set": [
                        628
                    ],
                    "where": [
                        617,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                614,
                {
                    "_set": [
                        628
                    ],
                    "pkColumns": [
                        626,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                622,
                {
                    "updates": [
                        632,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                641,
                {
                    "_set": [
                        647
                    ],
                    "where": [
                        636,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                633,
                {
                    "_set": [
                        647
                    ],
                    "pkColumns": [
                        645,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                641,
                {
                    "updates": [
                        651,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                660,
                {
                    "_set": [
                        667
                    ],
                    "where": [
                        655,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                652,
                {
                    "_set": [
                        667
                    ],
                    "pkColumns": [
                        664,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                660,
                {
                    "updates": [
                        694,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                683,
                {
                    "_set": [
                        688
                    ],
                    "where": [
                        676,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                670,
                {
                    "_set": [
                        688
                    ],
                    "pkColumns": [
                        686,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                683,
                {
                    "updates": [
                        692,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                549
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
                        549,
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
            "label": [
                174,
                {
                    "distinctOn": [
                        229,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        227,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "labelAggregate": [
                175,
                {
                    "distinctOn": [
                        229,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        227,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "labelByPk": [
                174,
                {
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategory": [
                179,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "labelChatbotCategoryAggregate": [
                180,
                {
                    "distinctOn": [
                        199,
                        "[LabelChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        197,
                        "[LabelChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "labelChatbotCategoryByPk": [
                179,
                {
                    "categoryId": [
                        172,
                        "Int!"
                    ],
                    "chatbotId": [
                        172,
                        "Int!"
                    ],
                    "labelId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryStream": [
                179,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        207,
                        "[LabelChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        187
                    ]
                }
            ],
            "labelStream": [
                174,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        234,
                        "[LabelStreamCursorInput]!"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "lengthEnum": [
                242,
                {
                    "distinctOn": [
                        255,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        253,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "lengthEnumAggregate": [
                243,
                {
                    "distinctOn": [
                        255,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        253,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "lengthEnumByPk": [
                242,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                242,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        257,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        245
                    ]
                }
            ],
            "message": [
                261,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messageAggregate": [
                262,
                {
                    "distinctOn": [
                        278,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        276,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messageByPk": [
                261,
                {
                    "messageId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "messageStream": [
                261,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        280,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        267
                    ]
                }
            ],
            "messageTypeEnum": [
                282,
                {
                    "distinctOn": [
                        295,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        293,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                283,
                {
                    "distinctOn": [
                        295,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        293,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                282,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                282,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        297,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        285
                    ]
                }
            ],
            "modelsEnum": [
                303,
                {
                    "distinctOn": [
                        318,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        316,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        306
                    ]
                }
            ],
            "modelsEnumAggregate": [
                304,
                {
                    "distinctOn": [
                        318,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        316,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        306
                    ]
                }
            ],
            "modelsEnumByPk": [
                303,
                {
                    "name": [
                        549,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                303,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        320,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        306
                    ]
                }
            ],
            "preference": [
                325,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferenceAggregate": [
                326,
                {
                    "distinctOn": [
                        345,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        343,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "preferenceByPk": [
                325,
                {
                    "preferenceId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                325,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        355,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        333
                    ]
                }
            ],
            "prompt": [
                367,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptAggregate": [
                368,
                {
                    "distinctOn": [
                        428,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        426,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptByPk": [
                367,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                376,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptChatbotAggregate": [
                377,
                {
                    "distinctOn": [
                        396,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        394,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptChatbotByPk": [
                376,
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
                376,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        404,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "promptStream": [
                367,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        436,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        375
                    ]
                }
            ],
            "promptTypeEnum": [
                440,
                {
                    "distinctOn": [
                        453,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        451,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                441,
                {
                    "distinctOn": [
                        453,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        451,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                440,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                440,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        455,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        443
                    ]
                }
            ],
            "promptUser": [
                461,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "promptUserAggregate": [
                462,
                {
                    "distinctOn": [
                        481,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        479,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "promptUserByPk": [
                461,
                {
                    "promptId": [
                        172,
                        "Int!"
                    ],
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                461,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        489,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        469
                    ]
                }
            ],
            "referral": [
                507,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralAggregate": [
                508,
                {
                    "distinctOn": [
                        524,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        522,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "referralByPk": [
                507,
                {
                    "referralCode": [
                        549,
                        "String!"
                    ]
                }
            ],
            "referralStream": [
                507,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        526,
                        "[ReferralStreamCursorInput]!"
                    ],
                    "where": [
                        513
                    ]
                }
            ],
            "socialFollowing": [
                530,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "socialFollowingAggregate": [
                531,
                {
                    "distinctOn": [
                        544,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        543,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "socialFollowingStream": [
                530,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        546,
                        "[SocialFollowingStreamCursorInput]!"
                    ],
                    "where": [
                        536
                    ]
                }
            ],
            "thread": [
                551,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadAggregate": [
                552,
                {
                    "distinctOn": [
                        572,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        570,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "threadByPk": [
                551,
                {
                    "threadId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                551,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        582,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        559
                    ]
                }
            ],
            "token": [
                595,
                {
                    "distinctOn": [
                        608,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "tokenAggregate": [
                596,
                {
                    "distinctOn": [
                        608,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "tokenByPk": [
                595,
                {
                    "token": [
                        549,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                595,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        610,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "toneEnum": [
                614,
                {
                    "distinctOn": [
                        627,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "toneEnumAggregate": [
                615,
                {
                    "distinctOn": [
                        627,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "toneEnumByPk": [
                614,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                614,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        629,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "typeEnum": [
                633,
                {
                    "distinctOn": [
                        646,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "typeEnumAggregate": [
                634,
                {
                    "distinctOn": [
                        646,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "typeEnumByPk": [
                633,
                {
                    "value": [
                        549,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                633,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        648,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "user": [
                652,
                {
                    "distinctOn": [
                        666,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        663,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        655
                    ]
                }
            ],
            "userAggregate": [
                653,
                {
                    "distinctOn": [
                        666,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        663,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        655
                    ]
                }
            ],
            "userByPk": [
                652,
                {
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                652,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        668,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        655
                    ]
                }
            ],
            "userToken": [
                670,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokenAggregate": [
                671,
                {
                    "distinctOn": [
                        687,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        685,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "userTokenByPk": [
                670,
                {
                    "token": [
                        549,
                        "String!"
                    ],
                    "userId": [
                        715,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                670,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        689,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "__typename": [
                549
            ]
        }
    }
}