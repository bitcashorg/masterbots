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
        530,
        541,
        553,
        554,
        555,
        567,
        580,
        589,
        593,
        599,
        608,
        612,
        618,
        627,
        631,
        637,
        646,
        657,
        667,
        671,
        673,
        691,
        693
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
                530
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
                530
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
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
                531
            ],
            "__typename": [
                530
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                172
            ],
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                172
            ],
            "name": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                172
            ],
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                172
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "Chat": {
            "addedBy": [
                693
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
                530
            ],
            "user": [
                633
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                676
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                675
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
                531
            ],
            "user": [
                636
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                693
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
                530
            ],
            "user": [
                642
            ],
            "__typename": [
                530
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                693
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                693
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                644
            ],
            "__typename": [
                530
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                693
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                693
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "Chatbot": {
            "avatar": [
                530
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
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
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
                530
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
                532,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadsAggregate": [
                533,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "toneEnum": [
                595
            ],
            "typeEnum": [
                614
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                677
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
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
                531
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
                531
            ],
            "defaultComplexity": [
                531
            ],
            "defaultLength": [
                531
            ],
            "defaultTone": [
                531
            ],
            "defaultType": [
                531
            ],
            "description": [
                531
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
                531
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
                540
            ],
            "threadsAggregate": [
                534
            ],
            "toneEnum": [
                598
            ],
            "typeEnum": [
                617
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                678
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                530
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
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
            ],
            "lengthEnum": [
                251
            ],
            "metadataLabels": [
                184
            ],
            "name": [
                530
            ],
            "preferences": [
                330
            ],
            "prompts": [
                381
            ],
            "threads": [
                537
            ],
            "toneEnum": [
                604
            ],
            "typeEnum": [
                623
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                530
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
            ],
            "name": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                530
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
            ],
            "name": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                536
            ],
            "toneEnum": [
                606
            ],
            "typeEnum": [
                625
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                530
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
            ],
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                530
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                530
            ],
            "defaultComplexity": [
                530
            ],
            "defaultLength": [
                530
            ],
            "defaultTone": [
                530
            ],
            "defaultType": [
                530
            ],
            "description": [
                530
            ],
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                531
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                530
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
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
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
                531
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
                531
            ],
            "subCategories": [
                531
            ],
            "tags": [
                531
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "LabelChatbotCategoryAggregateBoolExp": {
            "count": [
                679
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                530
            ],
            "labelId": [
                172
            ],
            "metadataLabels": [
                184
            ],
            "questions": [
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LabelMaxFields": {
            "categories": [
                530
            ],
            "labelId": [
                172
            ],
            "questions": [
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LabelMinFields": {
            "categories": [
                530
            ],
            "labelId": [
                172
            ],
            "questions": [
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                530
            ],
            "labelId": [
                172
            ],
            "questions": [
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                530
            ],
            "labelId": [
                172
            ],
            "questions": [
                530
            ],
            "subCategories": [
                530
            ],
            "tags": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LabelSumFields": {
            "labelId": [
                172
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                171
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                531
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "Message": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "messageTypeEnum": [
                282
            ],
            "role": [
                530
            ],
            "thread": [
                532
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                680
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                531
            ],
            "createdAt": [
                575
            ],
            "messageId": [
                675
            ],
            "messageTypeEnum": [
                285
            ],
            "role": [
                531
            ],
            "thread": [
                540
            ],
            "threadId": [
                675
            ],
            "__typename": [
                530
            ]
        },
        "MessageConstraint": {},
        "MessageInsertInput": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "messageTypeEnum": [
                291
            ],
            "role": [
                530
            ],
            "thread": [
                549
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "MessageMaxFields": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "role": [
                530
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "MessageMinFields": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "role": [
                530
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                551
            ],
            "threadId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "role": [
                530
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                530
            ],
            "createdAt": [
                691
            ],
            "messageId": [
                693
            ],
            "role": [
                530
            ],
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                531
            ],
            "__typename": [
                530
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                266
            ],
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "ModelsEnum": {
            "name": [
                530
            ],
            "threads": [
                532,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadsAggregate": [
                533,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                531
            ],
            "threads": [
                540
            ],
            "threadsAggregate": [
                534
            ],
            "value": [
                531
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                530
            ],
            "threads": [
                537
            ],
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                530
            ],
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                530
            ],
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                324
            ],
            "threadsAggregate": [
                536
            ],
            "value": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                530
            ],
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                530
            ],
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "toneEnum": [
                595
            ],
            "typeEnum": [
                614
            ],
            "user": [
                633
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                681
            ],
            "bool_or": [
                682
            ],
            "count": [
                683
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                531
            ],
            "preferredLength": [
                531
            ],
            "preferredTone": [
                531
            ],
            "preferredType": [
                531
            ],
            "toneEnum": [
                598
            ],
            "typeEnum": [
                617
            ],
            "user": [
                636
            ],
            "userId": [
                675
            ],
            "__typename": [
                530
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
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "toneEnum": [
                604
            ],
            "typeEnum": [
                623
            ],
            "user": [
                642
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                606
            ],
            "typeEnum": [
                625
            ],
            "user": [
                644
            ],
            "userId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                172
            ],
            "__typename": [
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ],
            "preferredLength": [
                530
            ],
            "preferredTone": [
                530
            ],
            "preferredType": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "promptTypeEnum": [
                440
            ],
            "type": [
                530
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
                530
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
                530
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                684
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                531
            ],
            "promptId": [
                173
            ],
            "promptName": [
                531
            ],
            "promptTypeEnum": [
                443
            ],
            "type": [
                531
            ],
            "users": [
                469
            ],
            "usersAggregate": [
                463
            ],
            "__typename": [
                530
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
                530
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
                530
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                685
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                381
            ],
            "content": [
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "promptTypeEnum": [
                449
            ],
            "type": [
                530
            ],
            "users": [
                466
            ],
            "__typename": [
                530
            ]
        },
        "PromptMaxFields": {
            "content": [
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "type": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptMinFields": {
            "content": [
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "type": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "type": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                530
            ],
            "promptId": [
                172
            ],
            "promptName": [
                530
            ],
            "type": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "PromptSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                531
            ],
            "__typename": [
                530
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                372
            ],
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
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
                530
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
                530
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
                633
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                686
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                636
            ],
            "userId": [
                675
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                530
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
                642
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                172
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                172
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                644
            ],
            "userId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                172
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                172
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                172
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "Referral": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "user": [
                633
            ],
            "userByUserId": [
                633
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                687
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                531
            ],
            "referrerId": [
                675
            ],
            "user": [
                636
            ],
            "userByUserId": [
                636
            ],
            "userId": [
                675
            ],
            "__typename": [
                530
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "user": [
                642
            ],
            "userByUserId": [
                642
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                644
            ],
            "userByUserId": [
                644
            ],
            "userId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                530
            ],
            "referrerId": [
                693
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                530
            ],
            "_gt": [
                530
            ],
            "_gte": [
                530
            ],
            "_ilike": [
                530
            ],
            "_in": [
                530
            ],
            "_iregex": [
                530
            ],
            "_isNull": [
                0
            ],
            "_like": [
                530
            ],
            "_lt": [
                530
            ],
            "_lte": [
                530
            ],
            "_neq": [
                530
            ],
            "_nilike": [
                530
            ],
            "_nin": [
                530
            ],
            "_niregex": [
                530
            ],
            "_nlike": [
                530
            ],
            "_nregex": [
                530
            ],
            "_nsimilar": [
                530
            ],
            "_regex": [
                530
            ],
            "_similar": [
                530
            ],
            "__typename": [
                530
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
                691
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
                693
            ],
            "updatedAt": [
                691
            ],
            "user": [
                633
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                535
            ],
            "nodes": [
                532
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                688
            ],
            "bool_or": [
                689
            ],
            "count": [
                690
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                538
            ],
            "count": [
                172,
                {
                    "columns": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                544
            ],
            "min": [
                546
            ],
            "stddev": [
                557
            ],
            "stddevPop": [
                559
            ],
            "stddevSamp": [
                561
            ],
            "sum": [
                565
            ],
            "varPop": [
                569
            ],
            "varSamp": [
                571
            ],
            "variance": [
                573
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                539
            ],
            "count": [
                324
            ],
            "max": [
                545
            ],
            "min": [
                547
            ],
            "stddev": [
                558
            ],
            "stddevPop": [
                560
            ],
            "stddevSamp": [
                562
            ],
            "sum": [
                566
            ],
            "varPop": [
                570
            ],
            "varSamp": [
                572
            ],
            "variance": [
                574
            ],
            "__typename": [
                530
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                543
            ],
            "onConflict": [
                550
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                540
            ],
            "_not": [
                540
            ],
            "_or": [
                540
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "createdAt": [
                575
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
                675
            ],
            "updatedAt": [
                575
            ],
            "user": [
                636
            ],
            "userId": [
                675
            ],
            "__typename": [
                530
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                530
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
                691
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
                693
            ],
            "updatedAt": [
                691
            ],
            "user": [
                642
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                691
            ],
            "threadId": [
                693
            ],
            "updatedAt": [
                691
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                691
            ],
            "threadId": [
                693
            ],
            "updatedAt": [
                691
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                532
            ],
            "__typename": [
                530
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                543
            ],
            "onConflict": [
                550
            ],
            "__typename": [
                530
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                541
            ],
            "updateColumns": [
                567
            ],
            "where": [
                540
            ],
            "__typename": [
                530
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
                644
            ],
            "userId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                693
            ],
            "__typename": [
                530
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
                691
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
                693
            ],
            "updatedAt": [
                691
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                564
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                691
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
                693
            ],
            "updatedAt": [
                691
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                530
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                542
            ],
            "_set": [
                556
            ],
            "where": [
                540
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                530
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                691
            ],
            "_gt": [
                691
            ],
            "_gte": [
                691
            ],
            "_in": [
                691
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                691
            ],
            "_lte": [
                691
            ],
            "_neq": [
                691
            ],
            "_nin": [
                691
            ],
            "__typename": [
                530
            ]
        },
        "Token": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "userTokens": [
                650,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokensAggregate": [
                651,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "__typename": [
                530
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                578
            ],
            "nodes": [
                576
            ],
            "__typename": [
                530
            ]
        },
        "TokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        589,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                582
            ],
            "min": [
                583
            ],
            "__typename": [
                530
            ]
        },
        "TokenBoolExp": {
            "_and": [
                579
            ],
            "_not": [
                579
            ],
            "_or": [
                579
            ],
            "token": [
                531
            ],
            "tokenExpiry": [
                575
            ],
            "userTokens": [
                656
            ],
            "userTokensAggregate": [
                652
            ],
            "__typename": [
                530
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "userTokens": [
                655
            ],
            "__typename": [
                530
            ]
        },
        "TokenMaxFields": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "__typename": [
                530
            ]
        },
        "TokenMinFields": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "__typename": [
                530
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                576
            ],
            "__typename": [
                530
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                581
            ],
            "onConflict": [
                586
            ],
            "__typename": [
                530
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                580
            ],
            "updateColumns": [
                593
            ],
            "where": [
                579
            ],
            "__typename": [
                530
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
                654
            ],
            "__typename": [
                530
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "__typename": [
                530
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                592
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                530
            ],
            "tokenExpiry": [
                691
            ],
            "__typename": [
                530
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                590
            ],
            "where": [
                579
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                597
            ],
            "nodes": [
                595
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        608,
                        "[ToneEnumSelectColumn!]"
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
                530
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                598
            ],
            "_not": [
                598
            ],
            "_or": [
                598
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
                531
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                595
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                600
            ],
            "onConflict": [
                605
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumOnConflict": {
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
                530
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
                530
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                611
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                609
            ],
            "where": [
                598
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                616
            ],
            "nodes": [
                614
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        627,
                        "[TypeEnumSelectColumn!]"
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
                530
            ]
        },
        "TypeEnumBoolExp": {
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
                531
            ],
            "__typename": [
                530
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
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                614
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                619
            ],
            "onConflict": [
                624
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumOnConflict": {
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
                530
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
                530
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                630
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                628
            ],
            "where": [
                617
            ],
            "__typename": [
                530
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
                691
            ],
            "email": [
                530
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
                691
            ],
            "password": [
                530
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
                530
            ],
            "profilePicture": [
                530
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
            "slug": [
                530
            ],
            "threads": [
                532,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadsAggregate": [
                533,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "userId": [
                693
            ],
            "userTokens": [
                650,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokensAggregate": [
                651,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserAggregate": {
            "aggregate": [
                635
            ],
            "nodes": [
                633
            ],
            "__typename": [
                530
            ]
        },
        "UserAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        646,
                        "[UserSelectColumn!]"
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
                530
            ]
        },
        "UserBoolExp": {
            "_and": [
                636
            ],
            "_not": [
                636
            ],
            "_or": [
                636
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                575
            ],
            "email": [
                531
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
                575
            ],
            "password": [
                531
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "proUserSubscriptionId": [
                531
            ],
            "profilePicture": [
                531
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
            "slug": [
                531
            ],
            "threads": [
                540
            ],
            "threadsAggregate": [
                534
            ],
            "userId": [
                675
            ],
            "userTokens": [
                656
            ],
            "userTokensAggregate": [
                652
            ],
            "username": [
                531
            ],
            "__typename": [
                530
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "chats": [
                35
            ],
            "dateJoined": [
                691
            ],
            "email": [
                530
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
                691
            ],
            "password": [
                530
            ],
            "preferences": [
                330
            ],
            "proUserSubscriptionId": [
                530
            ],
            "profilePicture": [
                530
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
            "slug": [
                530
            ],
            "threads": [
                537
            ],
            "userId": [
                693
            ],
            "userTokens": [
                655
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserMaxFields": {
            "dateJoined": [
                691
            ],
            "email": [
                530
            ],
            "lastLogin": [
                691
            ],
            "password": [
                530
            ],
            "proUserSubscriptionId": [
                530
            ],
            "profilePicture": [
                530
            ],
            "slug": [
                530
            ],
            "userId": [
                693
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserMinFields": {
            "dateJoined": [
                691
            ],
            "email": [
                530
            ],
            "lastLogin": [
                691
            ],
            "password": [
                530
            ],
            "proUserSubscriptionId": [
                530
            ],
            "profilePicture": [
                530
            ],
            "slug": [
                530
            ],
            "userId": [
                693
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                633
            ],
            "__typename": [
                530
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                638
            ],
            "onConflict": [
                643
            ],
            "__typename": [
                530
            ]
        },
        "UserOnConflict": {
            "constraint": [
                637
            ],
            "updateColumns": [
                673
            ],
            "where": [
                636
            ],
            "__typename": [
                530
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                34
            ],
            "dateJoined": [
                324
            ],
            "email": [
                324
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
            "slug": [
                324
            ],
            "threadsAggregate": [
                536
            ],
            "userId": [
                324
            ],
            "userTokensAggregate": [
                654
            ],
            "username": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "dateJoined": [
                691
            ],
            "email": [
                530
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
                691
            ],
            "password": [
                530
            ],
            "proUserSubscriptionId": [
                530
            ],
            "profilePicture": [
                530
            ],
            "slug": [
                530
            ],
            "userId": [
                693
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                649
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                691
            ],
            "email": [
                530
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
                691
            ],
            "password": [
                530
            ],
            "proUserSubscriptionId": [
                530
            ],
            "profilePicture": [
                530
            ],
            "slug": [
                530
            ],
            "userId": [
                693
            ],
            "username": [
                530
            ],
            "__typename": [
                530
            ]
        },
        "UserToken": {
            "token": [
                530
            ],
            "tokenByToken": [
                576
            ],
            "user": [
                633
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                653
            ],
            "nodes": [
                650
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                692
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                659
            ],
            "min": [
                661
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                660
            ],
            "min": [
                662
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                658
            ],
            "onConflict": [
                664
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                656
            ],
            "_not": [
                656
            ],
            "_or": [
                656
            ],
            "token": [
                531
            ],
            "tokenByToken": [
                579
            ],
            "user": [
                636
            ],
            "userId": [
                675
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                530
            ],
            "tokenByToken": [
                585
            ],
            "user": [
                642
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "UserTokenMinFields": {
            "token": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
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
                530
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                650
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                657
            ],
            "updateColumns": [
                671
            ],
            "where": [
                656
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                324
            ],
            "tokenByToken": [
                587
            ],
            "user": [
                644
            ],
            "userId": [
                324
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                670
            ],
            "ordering": [
                170
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                530
            ],
            "userId": [
                693
            ],
            "__typename": [
                530
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                668
            ],
            "where": [
                656
            ],
            "__typename": [
                530
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                647
            ],
            "where": [
                636
            ],
            "__typename": [
                530
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                693
            ],
            "_gt": [
                693
            ],
            "_gte": [
                693
            ],
            "_in": [
                693
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                693
            ],
            "_lte": [
                693
            ],
            "_neq": [
                693
            ],
            "_nin": [
                693
            ],
            "__typename": [
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
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
                530
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                554
            ],
            "distinct": [
                0
            ],
            "filter": [
                540
            ],
            "predicate": [
                1
            ],
            "__typename": [
                530
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                555
            ],
            "distinct": [
                0
            ],
            "filter": [
                540
            ],
            "predicate": [
                1
            ],
            "__typename": [
                530
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                553
            ],
            "distinct": [
                0
            ],
            "filter": [
                540
            ],
            "predicate": [
                173
            ],
            "__typename": [
                530
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                667
            ],
            "distinct": [
                0
            ],
            "filter": [
                656
            ],
            "predicate": [
                173
            ],
            "__typename": [
                530
            ]
        },
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
                        530,
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
                        530,
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
                        693,
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
                        530,
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
                        530,
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
                        530,
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
                        693,
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
                        530,
                        "String!"
                    ]
                }
            ],
            "thread": [
                532,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadAggregate": [
                533,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadByPk": [
                532,
                {
                    "threadId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                576,
                {
                    "distinctOn": [
                        589,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        579
                    ]
                }
            ],
            "tokenAggregate": [
                577,
                {
                    "distinctOn": [
                        589,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        579
                    ]
                }
            ],
            "tokenByPk": [
                576,
                {
                    "token": [
                        530,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                595,
                {
                    "distinctOn": [
                        608,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "toneEnumAggregate": [
                596,
                {
                    "distinctOn": [
                        608,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "toneEnumByPk": [
                595,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                614,
                {
                    "distinctOn": [
                        627,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "typeEnumAggregate": [
                615,
                {
                    "distinctOn": [
                        627,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "typeEnumByPk": [
                614,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "user": [
                633,
                {
                    "distinctOn": [
                        646,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "userAggregate": [
                634,
                {
                    "distinctOn": [
                        646,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "userByPk": [
                633,
                {
                    "userId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                650,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokenAggregate": [
                651,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokenByPk": [
                650,
                {
                    "token": [
                        530,
                        "String!"
                    ],
                    "userId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                530
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
                        530,
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
                        530,
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
                        693,
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
                        530,
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
                        530,
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
                        530,
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
                        693,
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
                        530,
                        "String!"
                    ]
                }
            ],
            "deleteThread": [
                548,
                {
                    "where": [
                        540,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                532,
                {
                    "threadId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                584,
                {
                    "where": [
                        579,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                576,
                {
                    "token": [
                        530,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                603,
                {
                    "where": [
                        598,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                595,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                622,
                {
                    "where": [
                        617,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                614,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                641,
                {
                    "where": [
                        636,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                633,
                {
                    "userId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                663,
                {
                    "where": [
                        656,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                650,
                {
                    "token": [
                        530,
                        "String!"
                    ],
                    "userId": [
                        693,
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
            "insertThread": [
                548,
                {
                    "objects": [
                        543,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        550
                    ]
                }
            ],
            "insertThreadOne": [
                532,
                {
                    "object": [
                        543,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        550
                    ]
                }
            ],
            "insertToken": [
                584,
                {
                    "objects": [
                        581,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        586
                    ]
                }
            ],
            "insertTokenOne": [
                576,
                {
                    "object": [
                        581,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        586
                    ]
                }
            ],
            "insertToneEnum": [
                603,
                {
                    "objects": [
                        600,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        605
                    ]
                }
            ],
            "insertToneEnumOne": [
                595,
                {
                    "object": [
                        600,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        605
                    ]
                }
            ],
            "insertTypeEnum": [
                622,
                {
                    "objects": [
                        619,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        624
                    ]
                }
            ],
            "insertTypeEnumOne": [
                614,
                {
                    "object": [
                        619,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        624
                    ]
                }
            ],
            "insertUser": [
                641,
                {
                    "objects": [
                        638,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        643
                    ]
                }
            ],
            "insertUserOne": [
                633,
                {
                    "object": [
                        638,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        643
                    ]
                }
            ],
            "insertUserToken": [
                663,
                {
                    "objects": [
                        658,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        664
                    ]
                }
            ],
            "insertUserTokenOne": [
                650,
                {
                    "object": [
                        658,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        664
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
            "updateThread": [
                548,
                {
                    "_inc": [
                        542
                    ],
                    "_set": [
                        556
                    ],
                    "where": [
                        540,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                532,
                {
                    "_inc": [
                        542
                    ],
                    "_set": [
                        556
                    ],
                    "pkColumns": [
                        552,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                548,
                {
                    "updates": [
                        568,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                584,
                {
                    "_set": [
                        590
                    ],
                    "where": [
                        579,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                576,
                {
                    "_set": [
                        590
                    ],
                    "pkColumns": [
                        588,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                584,
                {
                    "updates": [
                        594,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                603,
                {
                    "_set": [
                        609
                    ],
                    "where": [
                        598,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                595,
                {
                    "_set": [
                        609
                    ],
                    "pkColumns": [
                        607,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                603,
                {
                    "updates": [
                        613,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                622,
                {
                    "_set": [
                        628
                    ],
                    "where": [
                        617,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                614,
                {
                    "_set": [
                        628
                    ],
                    "pkColumns": [
                        626,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                622,
                {
                    "updates": [
                        632,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                641,
                {
                    "_set": [
                        647
                    ],
                    "where": [
                        636,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                633,
                {
                    "_set": [
                        647
                    ],
                    "pkColumns": [
                        645,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                641,
                {
                    "updates": [
                        674,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                663,
                {
                    "_set": [
                        668
                    ],
                    "where": [
                        656,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                650,
                {
                    "_set": [
                        668
                    ],
                    "pkColumns": [
                        666,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                663,
                {
                    "updates": [
                        672,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                530
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
                        530,
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
                        530,
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
                        693,
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
                        530,
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
                        530,
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
                        530,
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
                        693,
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
                        530,
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
            "thread": [
                532,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadAggregate": [
                533,
                {
                    "distinctOn": [
                        553,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        551,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "threadByPk": [
                532,
                {
                    "threadId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                532,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        563,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        540
                    ]
                }
            ],
            "token": [
                576,
                {
                    "distinctOn": [
                        589,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        579
                    ]
                }
            ],
            "tokenAggregate": [
                577,
                {
                    "distinctOn": [
                        589,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        579
                    ]
                }
            ],
            "tokenByPk": [
                576,
                {
                    "token": [
                        530,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                576,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        591,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        579
                    ]
                }
            ],
            "toneEnum": [
                595,
                {
                    "distinctOn": [
                        608,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "toneEnumAggregate": [
                596,
                {
                    "distinctOn": [
                        608,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        606,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "toneEnumByPk": [
                595,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                595,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        610,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        598
                    ]
                }
            ],
            "typeEnum": [
                614,
                {
                    "distinctOn": [
                        627,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "typeEnumAggregate": [
                615,
                {
                    "distinctOn": [
                        627,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        625,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "typeEnumByPk": [
                614,
                {
                    "value": [
                        530,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                614,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        629,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "user": [
                633,
                {
                    "distinctOn": [
                        646,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "userAggregate": [
                634,
                {
                    "distinctOn": [
                        646,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        644,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "userByPk": [
                633,
                {
                    "userId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                633,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        648,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        636
                    ]
                }
            ],
            "userToken": [
                650,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokenAggregate": [
                651,
                {
                    "distinctOn": [
                        667,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        665,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "userTokenByPk": [
                650,
                {
                    "token": [
                        530,
                        "String!"
                    ],
                    "userId": [
                        693,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                650,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        669,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        656
                    ]
                }
            ],
            "__typename": [
                530
            ]
        }
    }
}