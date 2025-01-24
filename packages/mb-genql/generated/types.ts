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
        547,
        566,
        577,
        589,
        590,
        591,
        603,
        616,
        625,
        629,
        635,
        644,
        648,
        654,
        663,
        667,
        673,
        683,
        694,
        704,
        708,
        710,
        729,
        731,
        732
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
                566
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
                566
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
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
                567
            ],
            "__typename": [
                566
            ]
        },
        "CategoryConstraint": {},
        "CategoryIncInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                172
            ],
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                172
            ],
            "name": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                172
            ],
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                172
            ],
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                172
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "Chat": {
            "addedBy": [
                732
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
                566
            ],
            "user": [
                669
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                713
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                712
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
                567
            ],
            "user": [
                672
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                732
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
                566
            ],
            "user": [
                678
            ],
            "__typename": [
                566
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                732
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                732
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                680
            ],
            "__typename": [
                566
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                732
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                732
            ],
            "chatId": [
                172
            ],
            "chatbotId": [
                172
            ],
            "conversationLink": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "Chatbot": {
            "avatar": [
                566
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
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "followers": [
                530,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "followersAggregate": [
                531,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
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
                566
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
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadsAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "toneEnum": [
                631
            ],
            "typeEnum": [
                650
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                714
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
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
                567
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
                567
            ],
            "defaultComplexity": [
                567
            ],
            "defaultLength": [
                567
            ],
            "defaultTone": [
                567
            ],
            "defaultType": [
                567
            ],
            "description": [
                567
            ],
            "followers": [
                538
            ],
            "followersAggregate": [
                532
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
                567
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
                576
            ],
            "threadsAggregate": [
                570
            ],
            "toneEnum": [
                634
            ],
            "typeEnum": [
                653
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                715
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                566
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
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "followers": [
                535
            ],
            "lengthEnum": [
                251
            ],
            "metadataLabels": [
                184
            ],
            "name": [
                566
            ],
            "preferences": [
                330
            ],
            "prompts": [
                381
            ],
            "threads": [
                573
            ],
            "toneEnum": [
                640
            ],
            "typeEnum": [
                659
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                566
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "name": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                566
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "name": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
            "followersAggregate": [
                534
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
                572
            ],
            "toneEnum": [
                642
            ],
            "typeEnum": [
                661
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                566
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                566
            ],
            "chatbotId": [
                172
            ],
            "createdBy": [
                566
            ],
            "defaultComplexity": [
                566
            ],
            "defaultLength": [
                566
            ],
            "defaultTone": [
                566
            ],
            "defaultType": [
                566
            ],
            "description": [
                566
            ],
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                567
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                566
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
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
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
                567
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
                567
            ],
            "subCategories": [
                567
            ],
            "tags": [
                567
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "LabelChatbotCategoryAggregateBoolExp": {
            "count": [
                716
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                566
            ],
            "labelId": [
                172
            ],
            "metadataLabels": [
                184
            ],
            "questions": [
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LabelMaxFields": {
            "categories": [
                566
            ],
            "labelId": [
                172
            ],
            "questions": [
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LabelMinFields": {
            "categories": [
                566
            ],
            "labelId": [
                172
            ],
            "questions": [
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                566
            ],
            "labelId": [
                172
            ],
            "questions": [
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                566
            ],
            "labelId": [
                172
            ],
            "questions": [
                566
            ],
            "subCategories": [
                566
            ],
            "tags": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LabelSumFields": {
            "labelId": [
                172
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                171
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                567
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "Message": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "messageTypeEnum": [
                282
            ],
            "role": [
                566
            ],
            "thread": [
                568
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                717
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                567
            ],
            "createdAt": [
                611
            ],
            "messageId": [
                712
            ],
            "messageTypeEnum": [
                285
            ],
            "role": [
                567
            ],
            "thread": [
                576
            ],
            "threadId": [
                712
            ],
            "__typename": [
                566
            ]
        },
        "MessageConstraint": {},
        "MessageInsertInput": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "messageTypeEnum": [
                291
            ],
            "role": [
                566
            ],
            "thread": [
                585
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "MessageMaxFields": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "role": [
                566
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "MessageMinFields": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "role": [
                566
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                587
            ],
            "threadId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "role": [
                566
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "MessageStreamCursorValueInput": {
            "content": [
                566
            ],
            "createdAt": [
                729
            ],
            "messageId": [
                732
            ],
            "role": [
                566
            ],
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                567
            ],
            "__typename": [
                566
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                266
            ],
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "ModelsEnum": {
            "name": [
                566
            ],
            "threads": [
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadsAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                567
            ],
            "threads": [
                576
            ],
            "threadsAggregate": [
                570
            ],
            "value": [
                567
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                566
            ],
            "threads": [
                573
            ],
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                566
            ],
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                566
            ],
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                324
            ],
            "threadsAggregate": [
                572
            ],
            "value": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                566
            ],
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                566
            ],
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "toneEnum": [
                631
            ],
            "typeEnum": [
                650
            ],
            "user": [
                669
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                718
            ],
            "bool_or": [
                719
            ],
            "count": [
                720
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                567
            ],
            "preferredLength": [
                567
            ],
            "preferredTone": [
                567
            ],
            "preferredType": [
                567
            ],
            "toneEnum": [
                634
            ],
            "typeEnum": [
                653
            ],
            "user": [
                672
            ],
            "userId": [
                712
            ],
            "__typename": [
                566
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
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "toneEnum": [
                640
            ],
            "typeEnum": [
                659
            ],
            "user": [
                678
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                642
            ],
            "typeEnum": [
                661
            ],
            "user": [
                680
            ],
            "userId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                172
            ],
            "__typename": [
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ],
            "preferredLength": [
                566
            ],
            "preferredTone": [
                566
            ],
            "preferredType": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "promptTypeEnum": [
                440
            ],
            "type": [
                566
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
                566
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
                566
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                721
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                567
            ],
            "promptId": [
                173
            ],
            "promptName": [
                567
            ],
            "promptTypeEnum": [
                443
            ],
            "type": [
                567
            ],
            "users": [
                469
            ],
            "usersAggregate": [
                463
            ],
            "__typename": [
                566
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
                566
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
                566
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                722
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                381
            ],
            "content": [
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "promptTypeEnum": [
                449
            ],
            "type": [
                566
            ],
            "users": [
                466
            ],
            "__typename": [
                566
            ]
        },
        "PromptMaxFields": {
            "content": [
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "type": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptMinFields": {
            "content": [
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "type": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "type": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                566
            ],
            "promptId": [
                172
            ],
            "promptName": [
                566
            ],
            "type": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "PromptSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                567
            ],
            "__typename": [
                566
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                372
            ],
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
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
                566
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
                566
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
                669
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                723
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                672
            ],
            "userId": [
                712
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                172
            ],
            "__typename": [
                566
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
                678
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                172
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                172
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                680
            ],
            "userId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                172
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                172
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                172
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "Referral": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "user": [
                669
            ],
            "userByUserId": [
                669
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                724
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                567
            ],
            "referrerId": [
                712
            ],
            "user": [
                672
            ],
            "userByUserId": [
                672
            ],
            "userId": [
                712
            ],
            "__typename": [
                566
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "user": [
                678
            ],
            "userByUserId": [
                678
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                680
            ],
            "userByUserId": [
                680
            ],
            "userId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                566
            ],
            "referrerId": [
                732
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "SocialFollowing": {
            "chatbot": [
                70
            ],
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "user": [
                669
            ],
            "userByFollowerId": [
                669
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "SocialFollowingAggregateBoolExp": {
            "count": [
                725
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingAggregateFields": {
            "avg": [
                536
            ],
            "count": [
                172,
                {
                    "columns": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                541
            ],
            "min": [
                543
            ],
            "stddev": [
                549
            ],
            "stddevPop": [
                551
            ],
            "stddevSamp": [
                553
            ],
            "sum": [
                557
            ],
            "varPop": [
                560
            ],
            "varSamp": [
                562
            ],
            "variance": [
                564
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingAggregateOrderBy": {
            "avg": [
                537
            ],
            "count": [
                324
            ],
            "max": [
                542
            ],
            "min": [
                544
            ],
            "stddev": [
                550
            ],
            "stddevPop": [
                552
            ],
            "stddevSamp": [
                554
            ],
            "sum": [
                558
            ],
            "varPop": [
                561
            ],
            "varSamp": [
                563
            ],
            "variance": [
                565
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingArrRelInsertInput": {
            "data": [
                540
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingAvgFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingAvgOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingBoolExp": {
            "_and": [
                538
            ],
            "_not": [
                538
            ],
            "_or": [
                538
            ],
            "chatbot": [
                78
            ],
            "createdAt": [
                611
            ],
            "followeeId": [
                712
            ],
            "followeeIdChatbot": [
                173
            ],
            "followerId": [
                712
            ],
            "user": [
                672
            ],
            "userByFollowerId": [
                672
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingIncInput": {
            "followeeIdChatbot": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingInsertInput": {
            "chatbot": [
                127
            ],
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "user": [
                678
            ],
            "userByFollowerId": [
                678
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingMaxFields": {
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingMaxOrderBy": {
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followeeIdChatbot": [
                324
            ],
            "followerId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingMinFields": {
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingMinOrderBy": {
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followeeIdChatbot": [
                324
            ],
            "followerId": [
                324
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "SocialFollowingOrderBy": {
            "chatbot": [
                129
            ],
            "createdAt": [
                324
            ],
            "followeeId": [
                324
            ],
            "followeeIdChatbot": [
                324
            ],
            "followerId": [
                324
            ],
            "user": [
                680
            ],
            "userByFollowerId": [
                680
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingSelectColumn": {},
        "SocialFollowingSetInput": {
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevPopFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevPopOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevSampFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStddevSampOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStreamCursorInput": {
            "initialValue": [
                556
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingStreamCursorValueInput": {
            "createdAt": [
                729
            ],
            "followeeId": [
                732
            ],
            "followeeIdChatbot": [
                172
            ],
            "followerId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingSumFields": {
            "followeeIdChatbot": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingSumOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingUpdates": {
            "_inc": [
                539
            ],
            "_set": [
                548
            ],
            "where": [
                538
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarPopFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarPopOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarSampFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarSampOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarianceFields": {
            "followeeIdChatbot": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "SocialFollowingVarianceOrderBy": {
            "followeeIdChatbot": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                566
            ],
            "_gt": [
                566
            ],
            "_gte": [
                566
            ],
            "_ilike": [
                566
            ],
            "_in": [
                566
            ],
            "_iregex": [
                566
            ],
            "_isNull": [
                0
            ],
            "_like": [
                566
            ],
            "_lt": [
                566
            ],
            "_lte": [
                566
            ],
            "_neq": [
                566
            ],
            "_nilike": [
                566
            ],
            "_nin": [
                566
            ],
            "_niregex": [
                566
            ],
            "_nlike": [
                566
            ],
            "_nregex": [
                566
            ],
            "_nsimilar": [
                566
            ],
            "_regex": [
                566
            ],
            "_similar": [
                566
            ],
            "__typename": [
                566
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
                729
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
            "parentThreadId": [
                732
            ],
            "thread": [
                568
            ],
            "threadId": [
                732
            ],
            "threads": [
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadsAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "updatedAt": [
                729
            ],
            "user": [
                669
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                571
            ],
            "nodes": [
                568
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                726
            ],
            "bool_or": [
                727
            ],
            "count": [
                728
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                574
            ],
            "count": [
                172,
                {
                    "columns": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                580
            ],
            "min": [
                582
            ],
            "stddev": [
                593
            ],
            "stddevPop": [
                595
            ],
            "stddevSamp": [
                597
            ],
            "sum": [
                601
            ],
            "varPop": [
                605
            ],
            "varSamp": [
                607
            ],
            "variance": [
                609
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                575
            ],
            "count": [
                324
            ],
            "max": [
                581
            ],
            "min": [
                583
            ],
            "stddev": [
                594
            ],
            "stddevPop": [
                596
            ],
            "stddevSamp": [
                598
            ],
            "sum": [
                602
            ],
            "varPop": [
                606
            ],
            "varSamp": [
                608
            ],
            "variance": [
                610
            ],
            "__typename": [
                566
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                579
            ],
            "onConflict": [
                586
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                576
            ],
            "_not": [
                576
            ],
            "_or": [
                576
            ],
            "chatbot": [
                78
            ],
            "chatbotId": [
                173
            ],
            "createdAt": [
                611
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
            "parentThreadId": [
                712
            ],
            "thread": [
                576
            ],
            "threadId": [
                712
            ],
            "threads": [
                576
            ],
            "threadsAggregate": [
                570
            ],
            "updatedAt": [
                611
            ],
            "user": [
                672
            ],
            "userId": [
                712
            ],
            "__typename": [
                566
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                172
            ],
            "__typename": [
                566
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
                729
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
            "parentThreadId": [
                732
            ],
            "thread": [
                585
            ],
            "threadId": [
                732
            ],
            "threads": [
                573
            ],
            "updatedAt": [
                729
            ],
            "user": [
                678
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                729
            ],
            "parentThreadId": [
                732
            ],
            "threadId": [
                732
            ],
            "updatedAt": [
                729
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                324
            ],
            "createdAt": [
                324
            ],
            "parentThreadId": [
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
                566
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                729
            ],
            "parentThreadId": [
                732
            ],
            "threadId": [
                732
            ],
            "updatedAt": [
                729
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                324
            ],
            "createdAt": [
                324
            ],
            "parentThreadId": [
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
                566
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                568
            ],
            "__typename": [
                566
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                579
            ],
            "onConflict": [
                586
            ],
            "__typename": [
                566
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                577
            ],
            "updateColumns": [
                603
            ],
            "where": [
                576
            ],
            "__typename": [
                566
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
            "parentThreadId": [
                324
            ],
            "thread": [
                587
            ],
            "threadId": [
                324
            ],
            "threadsAggregate": [
                572
            ],
            "updatedAt": [
                324
            ],
            "user": [
                680
            ],
            "userId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                732
            ],
            "__typename": [
                566
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
                729
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
            "parentThreadId": [
                732
            ],
            "threadId": [
                732
            ],
            "updatedAt": [
                729
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                600
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                172
            ],
            "createdAt": [
                729
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
            "parentThreadId": [
                732
            ],
            "threadId": [
                732
            ],
            "updatedAt": [
                729
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                172
            ],
            "__typename": [
                566
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                578
            ],
            "_set": [
                592
            ],
            "where": [
                576
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                171
            ],
            "__typename": [
                566
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                729
            ],
            "_gt": [
                729
            ],
            "_gte": [
                729
            ],
            "_in": [
                729
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                729
            ],
            "_lte": [
                729
            ],
            "_neq": [
                729
            ],
            "_nin": [
                729
            ],
            "__typename": [
                566
            ]
        },
        "Token": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "userTokens": [
                687,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokensAggregate": [
                688,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "__typename": [
                566
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                614
            ],
            "nodes": [
                612
            ],
            "__typename": [
                566
            ]
        },
        "TokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        625,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                618
            ],
            "min": [
                619
            ],
            "__typename": [
                566
            ]
        },
        "TokenBoolExp": {
            "_and": [
                615
            ],
            "_not": [
                615
            ],
            "_or": [
                615
            ],
            "token": [
                567
            ],
            "tokenExpiry": [
                611
            ],
            "userTokens": [
                693
            ],
            "userTokensAggregate": [
                689
            ],
            "__typename": [
                566
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "userTokens": [
                692
            ],
            "__typename": [
                566
            ]
        },
        "TokenMaxFields": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "__typename": [
                566
            ]
        },
        "TokenMinFields": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "__typename": [
                566
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                612
            ],
            "__typename": [
                566
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                617
            ],
            "onConflict": [
                622
            ],
            "__typename": [
                566
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                616
            ],
            "updateColumns": [
                629
            ],
            "where": [
                615
            ],
            "__typename": [
                566
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
                691
            ],
            "__typename": [
                566
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "__typename": [
                566
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                628
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                566
            ],
            "tokenExpiry": [
                729
            ],
            "__typename": [
                566
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                626
            ],
            "where": [
                615
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                633
            ],
            "nodes": [
                631
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        644,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                637
            ],
            "min": [
                638
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                634
            ],
            "_not": [
                634
            ],
            "_or": [
                634
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
                567
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                631
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                636
            ],
            "onConflict": [
                641
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                635
            ],
            "updateColumns": [
                648
            ],
            "where": [
                634
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                647
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                645
            ],
            "where": [
                634
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                652
            ],
            "nodes": [
                650
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        663,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                656
            ],
            "min": [
                657
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                653
            ],
            "_not": [
                653
            ],
            "_or": [
                653
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
                567
            ],
            "__typename": [
                566
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
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                650
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                655
            ],
            "onConflict": [
                660
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                654
            ],
            "updateColumns": [
                667
            ],
            "where": [
                653
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                666
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                664
            ],
            "where": [
                653
            ],
            "__typename": [
                566
            ]
        },
        "User": {
            "bio": [
                566
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
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
            ],
            "followers": [
                530,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "followersAggregate": [
                531,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "following": [
                530,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "followingAggregate": [
                531,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
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
                729
            ],
            "password": [
                566
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
                566
            ],
            "profilePicture": [
                566
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
                731
            ],
            "slug": [
                566
            ],
            "threads": [
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadsAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "userId": [
                732
            ],
            "userTokens": [
                687,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokensAggregate": [
                688,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserAggregate": {
            "aggregate": [
                671
            ],
            "nodes": [
                669
            ],
            "__typename": [
                566
            ]
        },
        "UserAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        683,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                675
            ],
            "min": [
                676
            ],
            "__typename": [
                566
            ]
        },
        "UserBoolExp": {
            "_and": [
                672
            ],
            "_not": [
                672
            ],
            "_or": [
                672
            ],
            "bio": [
                567
            ],
            "chats": [
                38
            ],
            "chatsAggregate": [
                32
            ],
            "dateJoined": [
                611
            ],
            "email": [
                567
            ],
            "favouriteTopic": [
                567
            ],
            "followers": [
                538
            ],
            "followersAggregate": [
                532
            ],
            "following": [
                538
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
                611
            ],
            "password": [
                567
            ],
            "preferences": [
                333
            ],
            "preferencesAggregate": [
                327
            ],
            "proUserSubscriptionId": [
                567
            ],
            "profilePicture": [
                567
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
                682
            ],
            "slug": [
                567
            ],
            "threads": [
                576
            ],
            "threadsAggregate": [
                570
            ],
            "userId": [
                712
            ],
            "userTokens": [
                693
            ],
            "userTokensAggregate": [
                689
            ],
            "username": [
                567
            ],
            "__typename": [
                566
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "bio": [
                566
            ],
            "chats": [
                35
            ],
            "dateJoined": [
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
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
                729
            ],
            "password": [
                566
            ],
            "preferences": [
                330
            ],
            "proUserSubscriptionId": [
                566
            ],
            "profilePicture": [
                566
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
                731
            ],
            "slug": [
                566
            ],
            "threads": [
                573
            ],
            "userId": [
                732
            ],
            "userTokens": [
                692
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserMaxFields": {
            "bio": [
                566
            ],
            "dateJoined": [
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
            ],
            "lastLogin": [
                729
            ],
            "password": [
                566
            ],
            "proUserSubscriptionId": [
                566
            ],
            "profilePicture": [
                566
            ],
            "role": [
                731
            ],
            "slug": [
                566
            ],
            "userId": [
                732
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserMinFields": {
            "bio": [
                566
            ],
            "dateJoined": [
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
            ],
            "lastLogin": [
                729
            ],
            "password": [
                566
            ],
            "proUserSubscriptionId": [
                566
            ],
            "profilePicture": [
                566
            ],
            "role": [
                731
            ],
            "slug": [
                566
            ],
            "userId": [
                732
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                669
            ],
            "__typename": [
                566
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                674
            ],
            "onConflict": [
                679
            ],
            "__typename": [
                566
            ]
        },
        "UserOnConflict": {
            "constraint": [
                673
            ],
            "updateColumns": [
                710
            ],
            "where": [
                672
            ],
            "__typename": [
                566
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
                572
            ],
            "userId": [
                324
            ],
            "userTokensAggregate": [
                691
            ],
            "username": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserRoleComparisonExp": {
            "_eq": [
                731
            ],
            "_gt": [
                731
            ],
            "_gte": [
                731
            ],
            "_in": [
                731
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                731
            ],
            "_lte": [
                731
            ],
            "_neq": [
                731
            ],
            "_nin": [
                731
            ],
            "__typename": [
                566
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "bio": [
                566
            ],
            "dateJoined": [
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
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
                729
            ],
            "password": [
                566
            ],
            "proUserSubscriptionId": [
                566
            ],
            "profilePicture": [
                566
            ],
            "role": [
                731
            ],
            "slug": [
                566
            ],
            "userId": [
                732
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                686
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "UserStreamCursorValueInput": {
            "bio": [
                566
            ],
            "dateJoined": [
                729
            ],
            "email": [
                566
            ],
            "favouriteTopic": [
                566
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
                729
            ],
            "password": [
                566
            ],
            "proUserSubscriptionId": [
                566
            ],
            "profilePicture": [
                566
            ],
            "role": [
                731
            ],
            "slug": [
                566
            ],
            "userId": [
                732
            ],
            "username": [
                566
            ],
            "__typename": [
                566
            ]
        },
        "UserToken": {
            "token": [
                566
            ],
            "tokenByToken": [
                612
            ],
            "user": [
                669
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                690
            ],
            "nodes": [
                687
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                730
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                172,
                {
                    "columns": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                696
            ],
            "min": [
                698
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                324
            ],
            "max": [
                697
            ],
            "min": [
                699
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                695
            ],
            "onConflict": [
                701
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                693
            ],
            "_not": [
                693
            ],
            "_or": [
                693
            ],
            "token": [
                567
            ],
            "tokenByToken": [
                615
            ],
            "user": [
                672
            ],
            "userId": [
                712
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                566
            ],
            "tokenByToken": [
                621
            ],
            "user": [
                678
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "UserTokenMinFields": {
            "token": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
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
                566
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                172
            ],
            "returning": [
                687
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                694
            ],
            "updateColumns": [
                708
            ],
            "where": [
                693
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                324
            ],
            "tokenByToken": [
                623
            ],
            "user": [
                680
            ],
            "userId": [
                324
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                707
            ],
            "ordering": [
                170
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                566
            ],
            "userId": [
                732
            ],
            "__typename": [
                566
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                705
            ],
            "where": [
                693
            ],
            "__typename": [
                566
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                684
            ],
            "where": [
                672
            ],
            "__typename": [
                566
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                732
            ],
            "_gt": [
                732
            ],
            "_gte": [
                732
            ],
            "_in": [
                732
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                732
            ],
            "_lte": [
                732
            ],
            "_neq": [
                732
            ],
            "_nin": [
                732
            ],
            "__typename": [
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
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
                566
            ]
        },
        "socialFollowingAggregateBoolExpCount": {
            "arguments": [
                547
            ],
            "distinct": [
                0
            ],
            "filter": [
                538
            ],
            "predicate": [
                173
            ],
            "__typename": [
                566
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                590
            ],
            "distinct": [
                0
            ],
            "filter": [
                576
            ],
            "predicate": [
                1
            ],
            "__typename": [
                566
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                591
            ],
            "distinct": [
                0
            ],
            "filter": [
                576
            ],
            "predicate": [
                1
            ],
            "__typename": [
                566
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                589
            ],
            "distinct": [
                0
            ],
            "filter": [
                576
            ],
            "predicate": [
                173
            ],
            "__typename": [
                566
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                704
            ],
            "distinct": [
                0
            ],
            "filter": [
                693
            ],
            "predicate": [
                173
            ],
            "__typename": [
                566
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
                        566,
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
                        566,
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
                        732,
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
                        566,
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
                        566,
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
                        566,
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
                        732,
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
                        566,
                        "String!"
                    ]
                }
            ],
            "socialFollowing": [
                530,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "socialFollowingAggregate": [
                531,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "thread": [
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadByPk": [
                568,
                {
                    "threadId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                612,
                {
                    "distinctOn": [
                        625,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        623,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        615
                    ]
                }
            ],
            "tokenAggregate": [
                613,
                {
                    "distinctOn": [
                        625,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        623,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        615
                    ]
                }
            ],
            "tokenByPk": [
                612,
                {
                    "token": [
                        566,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                631,
                {
                    "distinctOn": [
                        644,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        642,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        634
                    ]
                }
            ],
            "toneEnumAggregate": [
                632,
                {
                    "distinctOn": [
                        644,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        642,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        634
                    ]
                }
            ],
            "toneEnumByPk": [
                631,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                650,
                {
                    "distinctOn": [
                        663,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        661,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "typeEnumAggregate": [
                651,
                {
                    "distinctOn": [
                        663,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        661,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "typeEnumByPk": [
                650,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "user": [
                669,
                {
                    "distinctOn": [
                        683,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        680,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        672
                    ]
                }
            ],
            "userAggregate": [
                670,
                {
                    "distinctOn": [
                        683,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        680,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        672
                    ]
                }
            ],
            "userByPk": [
                669,
                {
                    "userId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                687,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokenAggregate": [
                688,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokenByPk": [
                687,
                {
                    "token": [
                        566,
                        "String!"
                    ],
                    "userId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                566
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
                        566,
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
                        566,
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
                        732,
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
                        566,
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
                        566,
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
                        566,
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
                        732,
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
                        566,
                        "String!"
                    ]
                }
            ],
            "deleteSocialFollowing": [
                545,
                {
                    "where": [
                        538,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "deleteThread": [
                584,
                {
                    "where": [
                        576,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                568,
                {
                    "threadId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                620,
                {
                    "where": [
                        615,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                612,
                {
                    "token": [
                        566,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                639,
                {
                    "where": [
                        634,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                631,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                658,
                {
                    "where": [
                        653,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                650,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                677,
                {
                    "where": [
                        672,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                669,
                {
                    "userId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                700,
                {
                    "where": [
                        693,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                687,
                {
                    "token": [
                        566,
                        "String!"
                    ],
                    "userId": [
                        732,
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
                545,
                {
                    "objects": [
                        540,
                        "[SocialFollowingInsertInput!]!"
                    ]
                }
            ],
            "insertSocialFollowingOne": [
                530,
                {
                    "object": [
                        540,
                        "SocialFollowingInsertInput!"
                    ]
                }
            ],
            "insertThread": [
                584,
                {
                    "objects": [
                        579,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        586
                    ]
                }
            ],
            "insertThreadOne": [
                568,
                {
                    "object": [
                        579,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        586
                    ]
                }
            ],
            "insertToken": [
                620,
                {
                    "objects": [
                        617,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        622
                    ]
                }
            ],
            "insertTokenOne": [
                612,
                {
                    "object": [
                        617,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        622
                    ]
                }
            ],
            "insertToneEnum": [
                639,
                {
                    "objects": [
                        636,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        641
                    ]
                }
            ],
            "insertToneEnumOne": [
                631,
                {
                    "object": [
                        636,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        641
                    ]
                }
            ],
            "insertTypeEnum": [
                658,
                {
                    "objects": [
                        655,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        660
                    ]
                }
            ],
            "insertTypeEnumOne": [
                650,
                {
                    "object": [
                        655,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        660
                    ]
                }
            ],
            "insertUser": [
                677,
                {
                    "objects": [
                        674,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        679
                    ]
                }
            ],
            "insertUserOne": [
                669,
                {
                    "object": [
                        674,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        679
                    ]
                }
            ],
            "insertUserToken": [
                700,
                {
                    "objects": [
                        695,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        701
                    ]
                }
            ],
            "insertUserTokenOne": [
                687,
                {
                    "object": [
                        695,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        701
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
                545,
                {
                    "_inc": [
                        539
                    ],
                    "_set": [
                        548
                    ],
                    "where": [
                        538,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "updateSocialFollowingMany": [
                545,
                {
                    "updates": [
                        559,
                        "[SocialFollowingUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                584,
                {
                    "_inc": [
                        578
                    ],
                    "_set": [
                        592
                    ],
                    "where": [
                        576,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                568,
                {
                    "_inc": [
                        578
                    ],
                    "_set": [
                        592
                    ],
                    "pkColumns": [
                        588,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                584,
                {
                    "updates": [
                        604,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                620,
                {
                    "_set": [
                        626
                    ],
                    "where": [
                        615,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                612,
                {
                    "_set": [
                        626
                    ],
                    "pkColumns": [
                        624,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                620,
                {
                    "updates": [
                        630,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                639,
                {
                    "_set": [
                        645
                    ],
                    "where": [
                        634,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                631,
                {
                    "_set": [
                        645
                    ],
                    "pkColumns": [
                        643,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                639,
                {
                    "updates": [
                        649,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                658,
                {
                    "_set": [
                        664
                    ],
                    "where": [
                        653,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                650,
                {
                    "_set": [
                        664
                    ],
                    "pkColumns": [
                        662,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                658,
                {
                    "updates": [
                        668,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                677,
                {
                    "_set": [
                        684
                    ],
                    "where": [
                        672,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                669,
                {
                    "_set": [
                        684
                    ],
                    "pkColumns": [
                        681,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                677,
                {
                    "updates": [
                        711,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                700,
                {
                    "_set": [
                        705
                    ],
                    "where": [
                        693,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                687,
                {
                    "_set": [
                        705
                    ],
                    "pkColumns": [
                        703,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                700,
                {
                    "updates": [
                        709,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                566
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
                        566,
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
                        566,
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
                        732,
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
                        566,
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
                        566,
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
                        566,
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
                        732,
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
                        566,
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
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "socialFollowingAggregate": [
                531,
                {
                    "distinctOn": [
                        547,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        546,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        538
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
                        555,
                        "[SocialFollowingStreamCursorInput]!"
                    ],
                    "where": [
                        538
                    ]
                }
            ],
            "thread": [
                568,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadAggregate": [
                569,
                {
                    "distinctOn": [
                        589,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        587,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "threadByPk": [
                568,
                {
                    "threadId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                568,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        599,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        576
                    ]
                }
            ],
            "token": [
                612,
                {
                    "distinctOn": [
                        625,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        623,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        615
                    ]
                }
            ],
            "tokenAggregate": [
                613,
                {
                    "distinctOn": [
                        625,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        623,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        615
                    ]
                }
            ],
            "tokenByPk": [
                612,
                {
                    "token": [
                        566,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                612,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        627,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        615
                    ]
                }
            ],
            "toneEnum": [
                631,
                {
                    "distinctOn": [
                        644,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        642,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        634
                    ]
                }
            ],
            "toneEnumAggregate": [
                632,
                {
                    "distinctOn": [
                        644,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        642,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        634
                    ]
                }
            ],
            "toneEnumByPk": [
                631,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                631,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        646,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        634
                    ]
                }
            ],
            "typeEnum": [
                650,
                {
                    "distinctOn": [
                        663,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        661,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "typeEnumAggregate": [
                651,
                {
                    "distinctOn": [
                        663,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        661,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "typeEnumByPk": [
                650,
                {
                    "value": [
                        566,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                650,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        665,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "user": [
                669,
                {
                    "distinctOn": [
                        683,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        680,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        672
                    ]
                }
            ],
            "userAggregate": [
                670,
                {
                    "distinctOn": [
                        683,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        680,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        672
                    ]
                }
            ],
            "userByPk": [
                669,
                {
                    "userId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                669,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        685,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        672
                    ]
                }
            ],
            "userToken": [
                687,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokenAggregate": [
                688,
                {
                    "distinctOn": [
                        704,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        172
                    ],
                    "offset": [
                        172
                    ],
                    "orderBy": [
                        702,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "userTokenByPk": [
                687,
                {
                    "token": [
                        566,
                        "String!"
                    ],
                    "userId": [
                        732,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                687,
                {
                    "batchSize": [
                        172,
                        "Int!"
                    ],
                    "cursor": [
                        706,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        693
                    ]
                }
            ],
            "__typename": [
                566
            ]
        }
    }
}