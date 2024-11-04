export default {
    "scalars": [
        0,
        10,
        14,
        24,
        45,
        58,
        71,
        74,
        78,
        87,
        90,
        103,
        114,
        120,
        129,
        135,
        140,
        143,
        147,
        159,
        172,
        182,
        188,
        196,
        206,
        223,
        237,
        243,
        249,
        254,
        255,
        256,
        257
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
                188
            ]
        },
        "Category": {
            "categoryId": [
                90
            ],
            "chatbots": [
                38,
                {
                    "distinctOn": [
                        45,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        44,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        41
                    ]
                }
            ],
            "metadataLabels": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "name": [
                188
            ],
            "__typename": [
                188
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
                91
            ],
            "chatbots": [
                41
            ],
            "metadataLabels": [
                99
            ],
            "name": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnum": {
            "added": [
                256
            ],
            "domain": [
                188
            ],
            "domain_enum": [
                75
            ],
            "name": [
                188
            ],
            "subcategory_enums": [
                190,
                {
                    "distinctOn": [
                        196,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        195,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        192
                    ]
                }
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumAggregateOrderBy": {
            "count": [
                147
            ],
            "max": [
                7
            ],
            "min": [
                8
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumBoolExp": {
            "_and": [
                6
            ],
            "_not": [
                6
            ],
            "_or": [
                6
            ],
            "added": [
                233
            ],
            "domain": [
                189
            ],
            "domain_enum": [
                76
            ],
            "name": [
                189
            ],
            "subcategory_enums": [
                192
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumMaxOrderBy": {
            "added": [
                147
            ],
            "domain": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumMinOrderBy": {
            "added": [
                147
            ],
            "domain": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumOrderBy": {
            "added": [
                147
            ],
            "domain": [
                147
            ],
            "domain_enum": [
                77
            ],
            "name": [
                147
            ],
            "subcategory_enumsAggregate": [
                191
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumSelectColumn": {},
        "CategoryEnumStreamCursorInput": {
            "initialValue": [
                12
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "CategoryEnumStreamCursorValueInput": {
            "added": [
                256
            ],
            "domain": [
                188
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotsAggregate": [
                39
            ],
            "metadataLabelsAggregate": [
                97
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "CategorySelectColumn": {},
        "CategoryStreamCursorInput": {
            "initialValue": [
                16
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                90
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "Chat": {
            "addedBy": [
                257
            ],
            "chatId": [
                90
            ],
            "chatbot": [
                34
            ],
            "chatbotId": [
                90
            ],
            "conversationLink": [
                188
            ],
            "user": [
                246
            ],
            "__typename": [
                188
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                19
            ],
            "count": [
                147
            ],
            "max": [
                21
            ],
            "min": [
                22
            ],
            "stddev": [
                25
            ],
            "stddevPop": [
                26
            ],
            "stddevSamp": [
                27
            ],
            "sum": [
                30
            ],
            "varPop": [
                31
            ],
            "varSamp": [
                32
            ],
            "variance": [
                33
            ],
            "__typename": [
                188
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatBoolExp": {
            "_and": [
                20
            ],
            "_not": [
                20
            ],
            "_or": [
                20
            ],
            "addedBy": [
                253
            ],
            "chatId": [
                91
            ],
            "chatbot": [
                37
            ],
            "chatbotId": [
                91
            ],
            "conversationLink": [
                189
            ],
            "user": [
                247
            ],
            "__typename": [
                188
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                147
            ],
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "conversationLink": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                147
            ],
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "conversationLink": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                147
            ],
            "chatId": [
                147
            ],
            "chatbot": [
                57
            ],
            "chatbotId": [
                147
            ],
            "conversationLink": [
                147
            ],
            "user": [
                248
            ],
            "__typename": [
                188
            ]
        },
        "ChatSelectColumn": {},
        "ChatStddevOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatStreamCursorInput": {
            "initialValue": [
                29
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                257
            ],
            "chatId": [
                90
            ],
            "chatbotId": [
                90
            ],
            "conversationLink": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "Chatbot": {
            "avatar": [
                188
            ],
            "categories": [
                38,
                {
                    "distinctOn": [
                        45,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        44,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        41
                    ]
                }
            ],
            "chatbotId": [
                90
            ],
            "chats": [
                17,
                {
                    "distinctOn": [
                        24,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        23,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        20
                    ]
                }
            ],
            "complexityEnum": [
                68
            ],
            "createdBy": [
                188
            ],
            "defaultComplexity": [
                188
            ],
            "defaultLength": [
                188
            ],
            "defaultTone": [
                188
            ],
            "defaultType": [
                188
            ],
            "description": [
                188
            ],
            "lengthEnum": [
                117
            ],
            "metadataLabels": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "name": [
                188
            ],
            "prompts": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        158,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "threads": [
                216,
                {
                    "distinctOn": [
                        223,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        222,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "toneEnum": [
                234
            ],
            "typeEnum": [
                240
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                36
            ],
            "count": [
                147
            ],
            "max": [
                55
            ],
            "min": [
                56
            ],
            "stddev": [
                59
            ],
            "stddevPop": [
                60
            ],
            "stddevSamp": [
                61
            ],
            "sum": [
                64
            ],
            "varPop": [
                65
            ],
            "varSamp": [
                66
            ],
            "variance": [
                67
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                37
            ],
            "_not": [
                37
            ],
            "_or": [
                37
            ],
            "avatar": [
                189
            ],
            "categories": [
                41
            ],
            "chatbotId": [
                91
            ],
            "chats": [
                20
            ],
            "complexityEnum": [
                69
            ],
            "createdBy": [
                189
            ],
            "defaultComplexity": [
                189
            ],
            "defaultLength": [
                189
            ],
            "defaultTone": [
                189
            ],
            "defaultType": [
                189
            ],
            "description": [
                189
            ],
            "lengthEnum": [
                118
            ],
            "metadataLabels": [
                99
            ],
            "name": [
                189
            ],
            "prompts": [
                155
            ],
            "threads": [
                219
            ],
            "toneEnum": [
                235
            ],
            "typeEnum": [
                241
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategory": {
            "category": [
                2
            ],
            "categoryId": [
                90
            ],
            "chatbot": [
                34
            ],
            "chatbotId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                40
            ],
            "count": [
                147
            ],
            "max": [
                42
            ],
            "min": [
                43
            ],
            "stddev": [
                46
            ],
            "stddevPop": [
                47
            ],
            "stddevSamp": [
                48
            ],
            "sum": [
                51
            ],
            "varPop": [
                52
            ],
            "varSamp": [
                53
            ],
            "variance": [
                54
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                41
            ],
            "_not": [
                41
            ],
            "_or": [
                41
            ],
            "category": [
                3
            ],
            "categoryId": [
                91
            ],
            "chatbot": [
                37
            ],
            "chatbotId": [
                91
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                13
            ],
            "categoryId": [
                147
            ],
            "chatbot": [
                57
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategorySelectColumn": {},
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                50
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                90
            ],
            "chatbotId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                147
            ],
            "chatbotId": [
                147
            ],
            "createdBy": [
                147
            ],
            "defaultComplexity": [
                147
            ],
            "defaultLength": [
                147
            ],
            "defaultTone": [
                147
            ],
            "defaultType": [
                147
            ],
            "description": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                147
            ],
            "chatbotId": [
                147
            ],
            "createdBy": [
                147
            ],
            "defaultComplexity": [
                147
            ],
            "defaultLength": [
                147
            ],
            "defaultTone": [
                147
            ],
            "defaultType": [
                147
            ],
            "description": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                147
            ],
            "categoriesAggregate": [
                39
            ],
            "chatbotId": [
                147
            ],
            "chatsAggregate": [
                18
            ],
            "complexityEnum": [
                70
            ],
            "createdBy": [
                147
            ],
            "defaultComplexity": [
                147
            ],
            "defaultLength": [
                147
            ],
            "defaultTone": [
                147
            ],
            "defaultType": [
                147
            ],
            "description": [
                147
            ],
            "lengthEnum": [
                119
            ],
            "metadataLabelsAggregate": [
                97
            ],
            "name": [
                147
            ],
            "promptsAggregate": [
                153
            ],
            "threadsAggregate": [
                217
            ],
            "toneEnum": [
                236
            ],
            "typeEnum": [
                242
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotStreamCursorInput": {
            "initialValue": [
                63
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                188
            ],
            "chatbotId": [
                90
            ],
            "createdBy": [
                188
            ],
            "defaultComplexity": [
                188
            ],
            "defaultLength": [
                188
            ],
            "defaultTone": [
                188
            ],
            "defaultType": [
                188
            ],
            "description": [
                188
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ComplexityEnum": {
            "chatbots": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ComplexityEnumBoolExp": {
            "_and": [
                69
            ],
            "_not": [
                69
            ],
            "_or": [
                69
            ],
            "chatbots": [
                37
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                35
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumStreamCursorInput": {
            "initialValue": [
                73
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "CursorOrdering": {},
        "DomainEnum": {
            "added": [
                256
            ],
            "category_enums": [
                4,
                {
                    "distinctOn": [
                        10,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        9,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "label_chatbot_category_domains": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "name": [
                188
            ],
            "tag_enums": [
                199,
                {
                    "distinctOn": [
                        206,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        205,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "__typename": [
                188
            ]
        },
        "DomainEnumBoolExp": {
            "_and": [
                76
            ],
            "_not": [
                76
            ],
            "_or": [
                76
            ],
            "added": [
                233
            ],
            "category_enums": [
                6
            ],
            "label_chatbot_category_domains": [
                99
            ],
            "name": [
                189
            ],
            "tag_enums": [
                202
            ],
            "__typename": [
                188
            ]
        },
        "DomainEnumOrderBy": {
            "added": [
                147
            ],
            "category_enumsAggregate": [
                5
            ],
            "label_chatbot_category_domainsAggregate": [
                97
            ],
            "name": [
                147
            ],
            "tag_enumsAggregate": [
                200
            ],
            "__typename": [
                188
            ]
        },
        "DomainEnumSelectColumn": {},
        "DomainEnumStreamCursorInput": {
            "initialValue": [
                80
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "DomainEnumStreamCursorValueInput": {
            "added": [
                256
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "Example": {
            "added": [
                256
            ],
            "category": [
                188
            ],
            "domain": [
                188
            ],
            "exampleId": [
                257
            ],
            "metadata": [
                254,
                {
                    "path": [
                        188
                    ]
                }
            ],
            "prompt": [
                188
            ],
            "response": [
                188
            ],
            "subcategory": [
                188
            ],
            "subcategory_enum": [
                190
            ],
            "tags": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "ExampleAggregateOrderBy": {
            "count": [
                147
            ],
            "max": [
                84
            ],
            "min": [
                85
            ],
            "__typename": [
                188
            ]
        },
        "ExampleBoolExp": {
            "_and": [
                83
            ],
            "_not": [
                83
            ],
            "_or": [
                83
            ],
            "added": [
                233
            ],
            "category": [
                189
            ],
            "domain": [
                189
            ],
            "exampleId": [
                253
            ],
            "metadata": [
                93
            ],
            "prompt": [
                189
            ],
            "response": [
                189
            ],
            "subcategory": [
                189
            ],
            "subcategory_enum": [
                192
            ],
            "tags": [
                252
            ],
            "__typename": [
                188
            ]
        },
        "ExampleMaxOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "domain": [
                147
            ],
            "exampleId": [
                147
            ],
            "prompt": [
                147
            ],
            "response": [
                147
            ],
            "subcategory": [
                147
            ],
            "tags": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ExampleMinOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "domain": [
                147
            ],
            "exampleId": [
                147
            ],
            "prompt": [
                147
            ],
            "response": [
                147
            ],
            "subcategory": [
                147
            ],
            "tags": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ExampleOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "domain": [
                147
            ],
            "exampleId": [
                147
            ],
            "metadata": [
                147
            ],
            "prompt": [
                147
            ],
            "response": [
                147
            ],
            "subcategory": [
                147
            ],
            "subcategory_enum": [
                195
            ],
            "tags": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ExampleSelectColumn": {},
        "ExampleStreamCursorInput": {
            "initialValue": [
                89
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ExampleStreamCursorValueInput": {
            "added": [
                256
            ],
            "category": [
                188
            ],
            "domain": [
                188
            ],
            "exampleId": [
                257
            ],
            "metadata": [
                254
            ],
            "prompt": [
                188
            ],
            "response": [
                188
            ],
            "subcategory": [
                188
            ],
            "tags": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "Int": {},
        "IntComparisonExp": {
            "_eq": [
                90
            ],
            "_gt": [
                90
            ],
            "_gte": [
                90
            ],
            "_in": [
                90
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                90
            ],
            "_lte": [
                90
            ],
            "_neq": [
                90
            ],
            "_nin": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "JsonbCastExp": {
            "String": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "JsonbComparisonExp": {
            "_cast": [
                92
            ],
            "_containedIn": [
                254
            ],
            "_contains": [
                254
            ],
            "_eq": [
                254
            ],
            "_gt": [
                254
            ],
            "_gte": [
                254
            ],
            "_hasKey": [
                188
            ],
            "_hasKeysAll": [
                188
            ],
            "_hasKeysAny": [
                188
            ],
            "_in": [
                254
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                254
            ],
            "_lte": [
                254
            ],
            "_neq": [
                254
            ],
            "_nin": [
                254
            ],
            "__typename": [
                188
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                188
            ],
            "labelId": [
                90
            ],
            "metadataLabels": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "questions": [
                188
            ],
            "subCategories": [
                188
            ],
            "tags": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "LabelBoolExp": {
            "_and": [
                95
            ],
            "_not": [
                95
            ],
            "_or": [
                95
            ],
            "advancedLabels": [
                1
            ],
            "categories": [
                189
            ],
            "labelId": [
                91
            ],
            "metadataLabels": [
                99
            ],
            "questions": [
                189
            ],
            "subCategories": [
                189
            ],
            "tags": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomain": {
            "category": [
                2
            ],
            "categoryId": [
                90
            ],
            "chatbot": [
                34
            ],
            "chatbotId": [
                90
            ],
            "domain_enum": [
                75
            ],
            "label": [
                94
            ],
            "labelId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainAggregateOrderBy": {
            "avg": [
                98
            ],
            "count": [
                147
            ],
            "max": [
                100
            ],
            "min": [
                101
            ],
            "stddev": [
                104
            ],
            "stddevPop": [
                105
            ],
            "stddevSamp": [
                106
            ],
            "sum": [
                109
            ],
            "varPop": [
                110
            ],
            "varSamp": [
                111
            ],
            "variance": [
                112
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainAvgOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainBoolExp": {
            "_and": [
                99
            ],
            "_not": [
                99
            ],
            "_or": [
                99
            ],
            "category": [
                3
            ],
            "categoryId": [
                91
            ],
            "chatbot": [
                37
            ],
            "chatbotId": [
                91
            ],
            "domain_enum": [
                76
            ],
            "label": [
                95
            ],
            "labelId": [
                91
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainMaxOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainMinOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainOrderBy": {
            "category": [
                13
            ],
            "categoryId": [
                147
            ],
            "chatbot": [
                57
            ],
            "chatbotId": [
                147
            ],
            "domain_enum": [
                77
            ],
            "label": [
                113
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainSelectColumn": {},
        "LabelChatbotCategoryDomainStddevOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainStddevPopOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainStddevSampOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainStreamCursorInput": {
            "initialValue": [
                108
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainStreamCursorValueInput": {
            "categoryId": [
                90
            ],
            "chatbotId": [
                90
            ],
            "labelId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainSumOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainVarPopOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainVarSampOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelChatbotCategoryDomainVarianceOrderBy": {
            "categoryId": [
                147
            ],
            "chatbotId": [
                147
            ],
            "labelId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelOrderBy": {
            "advancedLabels": [
                147
            ],
            "categories": [
                147
            ],
            "labelId": [
                147
            ],
            "metadataLabelsAggregate": [
                97
            ],
            "questions": [
                147
            ],
            "subCategories": [
                147
            ],
            "tags": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LabelSelectColumn": {},
        "LabelStreamCursorInput": {
            "initialValue": [
                116
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                188
            ],
            "labelId": [
                90
            ],
            "questions": [
                188
            ],
            "subCategories": [
                188
            ],
            "tags": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "LengthEnum": {
            "chatbots": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                118
            ],
            "_not": [
                118
            ],
            "_or": [
                118
            ],
            "chatbots": [
                37
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                35
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                122
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "Message": {
            "augmentedFrom": [
                257
            ],
            "content": [
                188
            ],
            "createdAt": [
                256
            ],
            "examples": [
                254,
                {
                    "path": [
                        188
                    ]
                }
            ],
            "messageId": [
                257
            ],
            "messageTypeEnum": [
                132
            ],
            "prompt": [
                188
            ],
            "role": [
                188
            ],
            "thread": [
                216
            ],
            "threadId": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                147
            ],
            "max": [
                126
            ],
            "min": [
                127
            ],
            "__typename": [
                188
            ]
        },
        "MessageBoolExp": {
            "_and": [
                125
            ],
            "_not": [
                125
            ],
            "_or": [
                125
            ],
            "augmentedFrom": [
                253
            ],
            "content": [
                189
            ],
            "createdAt": [
                233
            ],
            "examples": [
                93
            ],
            "messageId": [
                253
            ],
            "messageTypeEnum": [
                133
            ],
            "prompt": [
                189
            ],
            "role": [
                189
            ],
            "thread": [
                219
            ],
            "threadId": [
                253
            ],
            "__typename": [
                188
            ]
        },
        "MessageMaxOrderBy": {
            "augmentedFrom": [
                147
            ],
            "content": [
                147
            ],
            "createdAt": [
                147
            ],
            "messageId": [
                147
            ],
            "prompt": [
                147
            ],
            "role": [
                147
            ],
            "threadId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "MessageMinOrderBy": {
            "augmentedFrom": [
                147
            ],
            "content": [
                147
            ],
            "createdAt": [
                147
            ],
            "messageId": [
                147
            ],
            "prompt": [
                147
            ],
            "role": [
                147
            ],
            "threadId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "MessageOrderBy": {
            "augmentedFrom": [
                147
            ],
            "content": [
                147
            ],
            "createdAt": [
                147
            ],
            "examples": [
                147
            ],
            "messageId": [
                147
            ],
            "messageTypeEnum": [
                134
            ],
            "prompt": [
                147
            ],
            "role": [
                147
            ],
            "thread": [
                222
            ],
            "threadId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "MessageSelectColumn": {},
        "MessageStreamCursorInput": {
            "initialValue": [
                131
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "MessageStreamCursorValueInput": {
            "augmentedFrom": [
                257
            ],
            "content": [
                188
            ],
            "createdAt": [
                256
            ],
            "examples": [
                254
            ],
            "messageId": [
                257
            ],
            "prompt": [
                188
            ],
            "role": [
                188
            ],
            "threadId": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                123,
                {
                    "distinctOn": [
                        129,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        128,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                133
            ],
            "_not": [
                133
            ],
            "_or": [
                133
            ],
            "messages": [
                125
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                124
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                137
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnum": {
            "name": [
                188
            ],
            "threads": [
                216,
                {
                    "distinctOn": [
                        223,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        222,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                139
            ],
            "_not": [
                139
            ],
            "_or": [
                139
            ],
            "name": [
                189
            ],
            "threads": [
                219
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                140
            ],
            "_in": [
                140
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                140
            ],
            "_nin": [
                140
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                147
            ],
            "threadsAggregate": [
                217
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                145
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                188
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "NumericComparisonExp": {
            "_eq": [
                255
            ],
            "_gt": [
                255
            ],
            "_gte": [
                255
            ],
            "_in": [
                255
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                255
            ],
            "_lte": [
                255
            ],
            "_neq": [
                255
            ],
            "_nin": [
                255
            ],
            "__typename": [
                188
            ]
        },
        "OrderBy": {},
        "Prompt": {
            "chatbots": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        158,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "content": [
                188
            ],
            "promptId": [
                90
            ],
            "promptName": [
                188
            ],
            "promptTypeEnum": [
                179
            ],
            "type": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                150
            ],
            "count": [
                147
            ],
            "max": [
                169
            ],
            "min": [
                170
            ],
            "stddev": [
                173
            ],
            "stddevPop": [
                174
            ],
            "stddevSamp": [
                175
            ],
            "sum": [
                178
            ],
            "varPop": [
                185
            ],
            "varSamp": [
                186
            ],
            "variance": [
                187
            ],
            "__typename": [
                188
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptBoolExp": {
            "_and": [
                151
            ],
            "_not": [
                151
            ],
            "_or": [
                151
            ],
            "chatbots": [
                155
            ],
            "content": [
                189
            ],
            "promptId": [
                91
            ],
            "promptName": [
                189
            ],
            "promptTypeEnum": [
                180
            ],
            "type": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                90
            ],
            "chatbot": [
                34
            ],
            "prompt": [
                148
            ],
            "promptId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                154
            ],
            "count": [
                147
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
                188
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                155
            ],
            "_not": [
                155
            ],
            "_or": [
                155
            ],
            "chabotId": [
                91
            ],
            "chatbot": [
                37
            ],
            "prompt": [
                151
            ],
            "promptId": [
                91
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                147
            ],
            "chatbot": [
                57
            ],
            "prompt": [
                171
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotSelectColumn": {},
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                164
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotStreamCursorValueInput": {
            "chabotId": [
                90
            ],
            "promptId": [
                90
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                147
            ],
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                147
            ],
            "promptId": [
                147
            ],
            "promptName": [
                147
            ],
            "type": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                147
            ],
            "promptId": [
                147
            ],
            "promptName": [
                147
            ],
            "type": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                153
            ],
            "content": [
                147
            ],
            "promptId": [
                147
            ],
            "promptName": [
                147
            ],
            "promptTypeEnum": [
                181
            ],
            "type": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptSelectColumn": {},
        "PromptStddevOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                177
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                188
            ],
            "promptId": [
                90
            ],
            "promptName": [
                188
            ],
            "type": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                148,
                {
                    "distinctOn": [
                        172,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        171,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        151
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                180
            ],
            "_not": [
                180
            ],
            "_or": [
                180
            ],
            "prompts": [
                151
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                149
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                184
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                188
            ],
            "_gt": [
                188
            ],
            "_gte": [
                188
            ],
            "_ilike": [
                188
            ],
            "_in": [
                188
            ],
            "_iregex": [
                188
            ],
            "_isNull": [
                0
            ],
            "_like": [
                188
            ],
            "_lt": [
                188
            ],
            "_lte": [
                188
            ],
            "_neq": [
                188
            ],
            "_nilike": [
                188
            ],
            "_nin": [
                188
            ],
            "_niregex": [
                188
            ],
            "_nlike": [
                188
            ],
            "_nregex": [
                188
            ],
            "_nsimilar": [
                188
            ],
            "_regex": [
                188
            ],
            "_similar": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnum": {
            "added": [
                256
            ],
            "category": [
                188
            ],
            "category_enum": [
                4
            ],
            "domain": [
                188
            ],
            "examples": [
                81,
                {
                    "distinctOn": [
                        87,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        86,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumAggregateOrderBy": {
            "count": [
                147
            ],
            "max": [
                193
            ],
            "min": [
                194
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumBoolExp": {
            "_and": [
                192
            ],
            "_not": [
                192
            ],
            "_or": [
                192
            ],
            "added": [
                233
            ],
            "category": [
                189
            ],
            "category_enum": [
                6
            ],
            "domain": [
                189
            ],
            "examples": [
                83
            ],
            "name": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumMaxOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "domain": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumMinOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "domain": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumOrderBy": {
            "added": [
                147
            ],
            "category": [
                147
            ],
            "category_enum": [
                9
            ],
            "domain": [
                147
            ],
            "examplesAggregate": [
                82
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumSelectColumn": {},
        "SubcategoryEnumStreamCursorInput": {
            "initialValue": [
                198
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "SubcategoryEnumStreamCursorValueInput": {
            "added": [
                256
            ],
            "category": [
                188
            ],
            "domain": [
                188
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "TagEnum": {
            "domain": [
                188
            ],
            "domain_enum": [
                75
            ],
            "frequency": [
                255
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumAggregateOrderBy": {
            "avg": [
                201
            ],
            "count": [
                147
            ],
            "max": [
                203
            ],
            "min": [
                204
            ],
            "stddev": [
                207
            ],
            "stddevPop": [
                208
            ],
            "stddevSamp": [
                209
            ],
            "sum": [
                212
            ],
            "varPop": [
                213
            ],
            "varSamp": [
                214
            ],
            "variance": [
                215
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumAvgOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumBoolExp": {
            "_and": [
                202
            ],
            "_not": [
                202
            ],
            "_or": [
                202
            ],
            "domain": [
                189
            ],
            "domain_enum": [
                76
            ],
            "frequency": [
                146
            ],
            "name": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumMaxOrderBy": {
            "domain": [
                147
            ],
            "frequency": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumMinOrderBy": {
            "domain": [
                147
            ],
            "frequency": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumOrderBy": {
            "domain": [
                147
            ],
            "domain_enum": [
                77
            ],
            "frequency": [
                147
            ],
            "name": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumSelectColumn": {},
        "TagEnumStddevOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumStddevPopOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumStddevSampOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumStreamCursorInput": {
            "initialValue": [
                211
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumStreamCursorValueInput": {
            "domain": [
                188
            ],
            "frequency": [
                255
            ],
            "name": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumSumOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumVarPopOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumVarSampOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TagEnumVarianceOrderBy": {
            "frequency": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "Thread": {
            "chatbot": [
                34
            ],
            "chatbotId": [
                90
            ],
            "createdAt": [
                256
            ],
            "isApproved": [
                0
            ],
            "isPublic": [
                0
            ],
            "messages": [
                123,
                {
                    "distinctOn": [
                        129,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        128,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "model": [
                140
            ],
            "modelsEnum": [
                138
            ],
            "threadId": [
                257
            ],
            "updatedAt": [
                256
            ],
            "user": [
                246
            ],
            "userId": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                218
            ],
            "count": [
                147
            ],
            "max": [
                220
            ],
            "min": [
                221
            ],
            "stddev": [
                224
            ],
            "stddevPop": [
                225
            ],
            "stddevSamp": [
                226
            ],
            "sum": [
                229
            ],
            "varPop": [
                230
            ],
            "varSamp": [
                231
            ],
            "variance": [
                232
            ],
            "__typename": [
                188
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                219
            ],
            "_not": [
                219
            ],
            "_or": [
                219
            ],
            "chatbot": [
                37
            ],
            "chatbotId": [
                91
            ],
            "createdAt": [
                233
            ],
            "isApproved": [
                1
            ],
            "isPublic": [
                1
            ],
            "messages": [
                125
            ],
            "model": [
                141
            ],
            "modelsEnum": [
                139
            ],
            "threadId": [
                253
            ],
            "updatedAt": [
                233
            ],
            "user": [
                247
            ],
            "userId": [
                253
            ],
            "__typename": [
                188
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                147
            ],
            "createdAt": [
                147
            ],
            "threadId": [
                147
            ],
            "updatedAt": [
                147
            ],
            "userId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                147
            ],
            "createdAt": [
                147
            ],
            "threadId": [
                147
            ],
            "updatedAt": [
                147
            ],
            "userId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                57
            ],
            "chatbotId": [
                147
            ],
            "createdAt": [
                147
            ],
            "isApproved": [
                147
            ],
            "isPublic": [
                147
            ],
            "messagesAggregate": [
                124
            ],
            "model": [
                147
            ],
            "modelsEnum": [
                142
            ],
            "threadId": [
                147
            ],
            "updatedAt": [
                147
            ],
            "user": [
                248
            ],
            "userId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadSelectColumn": {},
        "ThreadStddevOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                228
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                90
            ],
            "createdAt": [
                256
            ],
            "isApproved": [
                0
            ],
            "isPublic": [
                0
            ],
            "model": [
                140
            ],
            "threadId": [
                257
            ],
            "updatedAt": [
                256
            ],
            "userId": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                256
            ],
            "_gt": [
                256
            ],
            "_gte": [
                256
            ],
            "_in": [
                256
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                256
            ],
            "_lte": [
                256
            ],
            "_neq": [
                256
            ],
            "_nin": [
                256
            ],
            "__typename": [
                188
            ]
        },
        "ToneEnum": {
            "chatbots": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                235
            ],
            "_not": [
                235
            ],
            "_or": [
                235
            ],
            "chatbots": [
                37
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                35
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                239
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "TypeEnum": {
            "chatbots": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                241
            ],
            "_not": [
                241
            ],
            "_or": [
                241
            ],
            "chatbots": [
                37
            ],
            "value": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                35
            ],
            "value": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                245
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "User": {
            "chats": [
                17,
                {
                    "distinctOn": [
                        24,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        23,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        20
                    ]
                }
            ],
            "dateJoined": [
                256
            ],
            "email": [
                188
            ],
            "lastLogin": [
                256
            ],
            "proUserSubscriptionId": [
                188
            ],
            "profilePicture": [
                188
            ],
            "slug": [
                188
            ],
            "threads": [
                216,
                {
                    "distinctOn": [
                        223,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        222,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "userId": [
                257
            ],
            "username": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "UserBoolExp": {
            "_and": [
                247
            ],
            "_not": [
                247
            ],
            "_or": [
                247
            ],
            "chats": [
                20
            ],
            "dateJoined": [
                233
            ],
            "email": [
                189
            ],
            "lastLogin": [
                233
            ],
            "proUserSubscriptionId": [
                189
            ],
            "profilePicture": [
                189
            ],
            "slug": [
                189
            ],
            "threads": [
                219
            ],
            "userId": [
                253
            ],
            "username": [
                189
            ],
            "__typename": [
                188
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                18
            ],
            "dateJoined": [
                147
            ],
            "email": [
                147
            ],
            "lastLogin": [
                147
            ],
            "proUserSubscriptionId": [
                147
            ],
            "profilePicture": [
                147
            ],
            "slug": [
                147
            ],
            "threadsAggregate": [
                217
            ],
            "userId": [
                147
            ],
            "username": [
                147
            ],
            "__typename": [
                188
            ]
        },
        "UserSelectColumn": {},
        "UserStreamCursorInput": {
            "initialValue": [
                251
            ],
            "ordering": [
                74
            ],
            "__typename": [
                188
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                256
            ],
            "email": [
                188
            ],
            "lastLogin": [
                256
            ],
            "proUserSubscriptionId": [
                188
            ],
            "profilePicture": [
                188
            ],
            "slug": [
                188
            ],
            "userId": [
                257
            ],
            "username": [
                188
            ],
            "__typename": [
                188
            ]
        },
        "UuidArrayComparisonExp": {
            "_containedIn": [
                257
            ],
            "_contains": [
                257
            ],
            "_eq": [
                257
            ],
            "_gt": [
                257
            ],
            "_gte": [
                257
            ],
            "_in": [
                257
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                257
            ],
            "_lte": [
                257
            ],
            "_neq": [
                257
            ],
            "_nin": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                257
            ],
            "_gt": [
                257
            ],
            "_gte": [
                257
            ],
            "_in": [
                257
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                257
            ],
            "_lte": [
                257
            ],
            "_neq": [
                257
            ],
            "_nin": [
                257
            ],
            "__typename": [
                188
            ]
        },
        "jsonb": {},
        "numeric": {},
        "timestamptz": {},
        "uuid": {},
        "Query": {
            "category": [
                2,
                {
                    "distinctOn": [
                        14,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        13,
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
                        90,
                        "Int!"
                    ]
                }
            ],
            "categoryEnum": [
                4,
                {
                    "distinctOn": [
                        10,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        9,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryEnumByPk": [
                4,
                {
                    "domain": [
                        188,
                        "String!"
                    ],
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "chat": [
                17,
                {
                    "distinctOn": [
                        24,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        23,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        20
                    ]
                }
            ],
            "chatByPk": [
                17,
                {
                    "chatId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "chatbot": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "chatbotByPk": [
                34,
                {
                    "chatbotId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                38,
                {
                    "distinctOn": [
                        45,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        44,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        41
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                38,
                {
                    "categoryId": [
                        90,
                        "Int!"
                    ],
                    "chatbotId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "complexityEnum": [
                68,
                {
                    "distinctOn": [
                        71,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        70,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        69
                    ]
                }
            ],
            "complexityEnumByPk": [
                68,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "domainEnum": [
                75,
                {
                    "distinctOn": [
                        78,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        77,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "domainEnumByPk": [
                75,
                {
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "example": [
                81,
                {
                    "distinctOn": [
                        87,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        86,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "exampleByPk": [
                81,
                {
                    "exampleId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "label": [
                94,
                {
                    "distinctOn": [
                        114,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        113,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        95
                    ]
                }
            ],
            "labelByPk": [
                94,
                {
                    "labelId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryDomain": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "lengthEnum": [
                117,
                {
                    "distinctOn": [
                        120,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        119,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "lengthEnumByPk": [
                117,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "message": [
                123,
                {
                    "distinctOn": [
                        129,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        128,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "messageByPk": [
                123,
                {
                    "messageId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                132,
                {
                    "distinctOn": [
                        135,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        134,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                132,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                138,
                {
                    "distinctOn": [
                        143,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        142,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "modelsEnumByPk": [
                138,
                {
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "prompt": [
                148,
                {
                    "distinctOn": [
                        172,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        171,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        151
                    ]
                }
            ],
            "promptByPk": [
                148,
                {
                    "promptId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        158,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "promptChatbotByPk": [
                152,
                {
                    "chabotId": [
                        90,
                        "Int!"
                    ],
                    "promptId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "promptTypeEnum": [
                179,
                {
                    "distinctOn": [
                        182,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        181,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                179,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnum": [
                190,
                {
                    "distinctOn": [
                        196,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        195,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        192
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                190,
                {
                    "category": [
                        188,
                        "String!"
                    ],
                    "domain": [
                        188,
                        "String!"
                    ],
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "tagEnum": [
                199,
                {
                    "distinctOn": [
                        206,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        205,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "thread": [
                216,
                {
                    "distinctOn": [
                        223,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        222,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "threadByPk": [
                216,
                {
                    "threadId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "toneEnum": [
                234,
                {
                    "distinctOn": [
                        237,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        236,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        235
                    ]
                }
            ],
            "toneEnumByPk": [
                234,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                240,
                {
                    "distinctOn": [
                        243,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        242,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "typeEnumByPk": [
                240,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "user": [
                246,
                {
                    "distinctOn": [
                        249,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        248,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "userByPk": [
                246,
                {
                    "userId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                188
            ]
        },
        "Subscription": {
            "category": [
                2,
                {
                    "distinctOn": [
                        14,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        13,
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
                        90,
                        "Int!"
                    ]
                }
            ],
            "categoryEnum": [
                4,
                {
                    "distinctOn": [
                        10,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        9,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryEnumByPk": [
                4,
                {
                    "domain": [
                        188,
                        "String!"
                    ],
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "categoryEnumStream": [
                4,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        11,
                        "[CategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "categoryStream": [
                2,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        15,
                        "[CategoryStreamCursorInput]!"
                    ],
                    "where": [
                        3
                    ]
                }
            ],
            "chat": [
                17,
                {
                    "distinctOn": [
                        24,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        23,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        20
                    ]
                }
            ],
            "chatByPk": [
                17,
                {
                    "chatId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "chatStream": [
                17,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        28,
                        "[ChatStreamCursorInput]!"
                    ],
                    "where": [
                        20
                    ]
                }
            ],
            "chatbot": [
                34,
                {
                    "distinctOn": [
                        58,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        57,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "chatbotByPk": [
                34,
                {
                    "chatbotId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                38,
                {
                    "distinctOn": [
                        45,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        44,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        41
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                38,
                {
                    "categoryId": [
                        90,
                        "Int!"
                    ],
                    "chatbotId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategoryStream": [
                38,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        49,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        41
                    ]
                }
            ],
            "chatbotStream": [
                34,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        62,
                        "[ChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "complexityEnum": [
                68,
                {
                    "distinctOn": [
                        71,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        70,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        69
                    ]
                }
            ],
            "complexityEnumByPk": [
                68,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "complexityEnumStream": [
                68,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        72,
                        "[ComplexityEnumStreamCursorInput]!"
                    ],
                    "where": [
                        69
                    ]
                }
            ],
            "domainEnum": [
                75,
                {
                    "distinctOn": [
                        78,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        77,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "domainEnumByPk": [
                75,
                {
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "domainEnumStream": [
                75,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        79,
                        "[DomainEnumStreamCursorInput]!"
                    ],
                    "where": [
                        76
                    ]
                }
            ],
            "example": [
                81,
                {
                    "distinctOn": [
                        87,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        86,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "exampleByPk": [
                81,
                {
                    "exampleId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "exampleStream": [
                81,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        88,
                        "[ExampleStreamCursorInput]!"
                    ],
                    "where": [
                        83
                    ]
                }
            ],
            "label": [
                94,
                {
                    "distinctOn": [
                        114,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        113,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        95
                    ]
                }
            ],
            "labelByPk": [
                94,
                {
                    "labelId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryDomain": [
                96,
                {
                    "distinctOn": [
                        103,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        102,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "labelChatbotCategoryDomainStream": [
                96,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        107,
                        "[LabelChatbotCategoryDomainStreamCursorInput]!"
                    ],
                    "where": [
                        99
                    ]
                }
            ],
            "labelStream": [
                94,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        115,
                        "[LabelStreamCursorInput]!"
                    ],
                    "where": [
                        95
                    ]
                }
            ],
            "lengthEnum": [
                117,
                {
                    "distinctOn": [
                        120,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        119,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "lengthEnumByPk": [
                117,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                117,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        121,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        118
                    ]
                }
            ],
            "message": [
                123,
                {
                    "distinctOn": [
                        129,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        128,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "messageByPk": [
                123,
                {
                    "messageId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "messageStream": [
                123,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        130,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        125
                    ]
                }
            ],
            "messageTypeEnum": [
                132,
                {
                    "distinctOn": [
                        135,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        134,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                132,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                132,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        136,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        133
                    ]
                }
            ],
            "modelsEnum": [
                138,
                {
                    "distinctOn": [
                        143,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        142,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "modelsEnumByPk": [
                138,
                {
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                138,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        144,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        139
                    ]
                }
            ],
            "prompt": [
                148,
                {
                    "distinctOn": [
                        172,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        171,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        151
                    ]
                }
            ],
            "promptByPk": [
                148,
                {
                    "promptId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                152,
                {
                    "distinctOn": [
                        159,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        158,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "promptChatbotByPk": [
                152,
                {
                    "chabotId": [
                        90,
                        "Int!"
                    ],
                    "promptId": [
                        90,
                        "Int!"
                    ]
                }
            ],
            "promptChatbotStream": [
                152,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        163,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        155
                    ]
                }
            ],
            "promptStream": [
                148,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        176,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        151
                    ]
                }
            ],
            "promptTypeEnum": [
                179,
                {
                    "distinctOn": [
                        182,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        181,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                179,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                179,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        183,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        180
                    ]
                }
            ],
            "subcategoryEnum": [
                190,
                {
                    "distinctOn": [
                        196,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        195,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        192
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                190,
                {
                    "category": [
                        188,
                        "String!"
                    ],
                    "domain": [
                        188,
                        "String!"
                    ],
                    "name": [
                        188,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnumStream": [
                190,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        197,
                        "[SubcategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        192
                    ]
                }
            ],
            "tagEnum": [
                199,
                {
                    "distinctOn": [
                        206,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        205,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "tagEnumStream": [
                199,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        210,
                        "[TagEnumStreamCursorInput]!"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "thread": [
                216,
                {
                    "distinctOn": [
                        223,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        222,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "threadByPk": [
                216,
                {
                    "threadId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                216,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        227,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        219
                    ]
                }
            ],
            "toneEnum": [
                234,
                {
                    "distinctOn": [
                        237,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        236,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        235
                    ]
                }
            ],
            "toneEnumByPk": [
                234,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                234,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        238,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        235
                    ]
                }
            ],
            "typeEnum": [
                240,
                {
                    "distinctOn": [
                        243,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        242,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "typeEnumByPk": [
                240,
                {
                    "value": [
                        188,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                240,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        244,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        241
                    ]
                }
            ],
            "user": [
                246,
                {
                    "distinctOn": [
                        249,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        90
                    ],
                    "offset": [
                        90
                    ],
                    "orderBy": [
                        248,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "userByPk": [
                246,
                {
                    "userId": [
                        257,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                246,
                {
                    "batchSize": [
                        90,
                        "Int!"
                    ],
                    "cursor": [
                        250,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        247
                    ]
                }
            ],
            "__typename": [
                188
            ]
        }
    }
}