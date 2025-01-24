export default {
    "scalars": [
        0,
        7,
        15,
        26,
        30,
        41,
        49,
        63,
        74,
        86,
        112,
        123,
        135,
        143,
        155,
        167,
        179,
        188,
        192,
        194,
        199,
        208,
        212,
        222,
        236,
        240,
        242,
        243,
        261,
        272,
        284,
        292,
        302,
        310,
        319,
        328,
        332,
        342,
        356,
        364,
        373,
        377,
        379,
        385,
        386,
        396,
        400,
        403,
        413,
        424,
        425,
        426,
        438,
        464,
        475,
        487,
        495,
        507,
        523,
        532,
        536,
        538,
        549,
        560,
        572,
        593,
        603,
        607,
        626,
        645,
        654,
        665,
        669,
        680,
        691,
        703,
        720,
        732,
        733,
        734,
        746,
        759,
        768,
        772,
        778,
        787,
        791,
        797,
        806,
        810,
        816,
        826,
        837,
        847,
        851,
        853,
        862,
        865,
        879,
        881,
        882
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
                645
            ]
        },
        "Category": {
            "categoryId": [
                243
            ],
            "chatbots": [
                103,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotsAggregate": [
                104,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "metadataLabels": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "name": [
                645
            ],
            "__typename": [
                645
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
                645
            ]
        },
        "CategoryAggregateFields": {
            "avg": [
                5
            ],
            "count": [
                243,
                {
                    "columns": [
                        41,
                        "[CategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                34
            ],
            "min": [
                35
            ],
            "stddev": [
                43
            ],
            "stddevPop": [
                44
            ],
            "stddevSamp": [
                45
            ],
            "sum": [
                48
            ],
            "varPop": [
                51
            ],
            "varSamp": [
                52
            ],
            "variance": [
                53
            ],
            "__typename": [
                645
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
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
                244
            ],
            "chatbots": [
                111
            ],
            "chatbotsAggregate": [
                105
            ],
            "metadataLabels": [
                260
            ],
            "metadataLabelsAggregate": [
                254
            ],
            "name": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "CategoryConstraint": {},
        "CategoryEnum": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "domain_enum": [
                195
            ],
            "name": [
                645
            ],
            "subcategoryEnumsAggregate": [
                648,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "subcategory_enums": [
                647,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumAggregate": {
            "aggregate": [
                11
            ],
            "nodes": [
                8
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumAggregateBoolExp": {
            "count": [
                857
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                17
            ],
            "min": [
                19
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                18
            ],
            "min": [
                20
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumArrRelInsertInput": {
            "data": [
                16
            ],
            "onConflict": [
                23
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumBoolExp": {
            "_and": [
                14
            ],
            "_not": [
                14
            ],
            "_or": [
                14
            ],
            "added": [
                754
            ],
            "domain": [
                646
            ],
            "domain_enum": [
                198
            ],
            "name": [
                646
            ],
            "subcategory_enums": [
                653
            ],
            "subcategory_enumsAggregate": [
                649
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumConstraint": {},
        "CategoryEnumInsertInput": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "domain_enum": [
                204
            ],
            "name": [
                645
            ],
            "subcategory_enums": [
                652
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumMaxFields": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumMaxOrderBy": {
            "added": [
                403
            ],
            "domain": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumMinFields": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumMinOrderBy": {
            "added": [
                403
            ],
            "domain": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                8
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumObjRelInsertInput": {
            "data": [
                16
            ],
            "onConflict": [
                23
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumOnConflict": {
            "constraint": [
                15
            ],
            "updateColumns": [
                30
            ],
            "where": [
                14
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumOrderBy": {
            "added": [
                403
            ],
            "domain": [
                403
            ],
            "domain_enum": [
                206
            ],
            "name": [
                403
            ],
            "subcategory_enumsAggregate": [
                651
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumPkColumnsInput": {
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumSelectColumn": {},
        "CategoryEnumSetInput": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumStreamCursorInput": {
            "initialValue": [
                29
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumStreamCursorValueInput": {
            "added": [
                879
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryEnumUpdateColumn": {},
        "CategoryEnumUpdates": {
            "_set": [
                27
            ],
            "where": [
                14
            ],
            "__typename": [
                645
            ]
        },
        "CategoryIncInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "CategoryInsertInput": {
            "categoryId": [
                243
            ],
            "chatbots": [
                108
            ],
            "metadataLabels": [
                257
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                243
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                243
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                2
            ],
            "__typename": [
                645
            ]
        },
        "CategoryObjRelInsertInput": {
            "data": [
                33
            ],
            "onConflict": [
                38
            ],
            "__typename": [
                645
            ]
        },
        "CategoryOnConflict": {
            "constraint": [
                7
            ],
            "updateColumns": [
                49
            ],
            "where": [
                6
            ],
            "__typename": [
                645
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotsAggregate": [
                107
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                243
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "CategoryStreamCursorInput": {
            "initialValue": [
                47
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "CategoryUpdateColumn": {},
        "CategoryUpdates": {
            "_inc": [
                32
            ],
            "_set": [
                42
            ],
            "where": [
                6
            ],
            "__typename": [
                645
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "Chat": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbot": [
                94
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "user": [
                812
            ],
            "__typename": [
                645
            ]
        },
        "ChatAggregate": {
            "aggregate": [
                57
            ],
            "nodes": [
                54
            ],
            "__typename": [
                645
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                858
            ],
            "__typename": [
                645
            ]
        },
        "ChatAggregateFields": {
            "avg": [
                60
            ],
            "count": [
                243,
                {
                    "columns": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                66
            ],
            "min": [
                68
            ],
            "stddev": [
                76
            ],
            "stddevPop": [
                78
            ],
            "stddevSamp": [
                80
            ],
            "sum": [
                84
            ],
            "varPop": [
                88
            ],
            "varSamp": [
                90
            ],
            "variance": [
                92
            ],
            "__typename": [
                645
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                61
            ],
            "count": [
                403
            ],
            "max": [
                67
            ],
            "min": [
                69
            ],
            "stddev": [
                77
            ],
            "stddevPop": [
                79
            ],
            "stddevSamp": [
                81
            ],
            "sum": [
                85
            ],
            "varPop": [
                89
            ],
            "varSamp": [
                91
            ],
            "variance": [
                93
            ],
            "__typename": [
                645
            ]
        },
        "ChatArrRelInsertInput": {
            "data": [
                65
            ],
            "onConflict": [
                71
            ],
            "__typename": [
                645
            ]
        },
        "ChatAvgFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatBoolExp": {
            "_and": [
                62
            ],
            "_not": [
                62
            ],
            "_or": [
                62
            ],
            "addedBy": [
                856
            ],
            "chatId": [
                244
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "conversationLink": [
                646
            ],
            "user": [
                815
            ],
            "__typename": [
                645
            ]
        },
        "ChatConstraint": {},
        "ChatIncInput": {
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "user": [
                821
            ],
            "__typename": [
                645
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                403
            ],
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "conversationLink": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                403
            ],
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "conversationLink": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                54
            ],
            "__typename": [
                645
            ]
        },
        "ChatOnConflict": {
            "constraint": [
                63
            ],
            "updateColumns": [
                86
            ],
            "where": [
                62
            ],
            "__typename": [
                645
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                403
            ],
            "chatId": [
                403
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                403
            ],
            "conversationLink": [
                403
            ],
            "user": [
                823
            ],
            "__typename": [
                645
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevPopFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevSampFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatStreamCursorInput": {
            "initialValue": [
                83
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                882
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatSumFields": {
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatUpdateColumn": {},
        "ChatUpdates": {
            "_inc": [
                64
            ],
            "_set": [
                75
            ],
            "where": [
                62
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarPopFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarSampFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarianceFields": {
            "chatId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "Chatbot": {
            "avatar": [
                645
            ],
            "categories": [
                103,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "categoriesAggregate": [
                104,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotId": [
                243
            ],
            "chats": [
                54,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatsAggregate": [
                55,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "complexityEnum": [
                175
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "lengthEnum": [
                315
            ],
            "metadataLabels": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "name": [
                645
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "prompts": [
                455,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptsAggregate": [
                456,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "threads": [
                711,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadsAggregate": [
                712,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "toneEnum": [
                774
            ],
            "typeEnum": [
                793
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAggregate": {
            "aggregate": [
                97
            ],
            "nodes": [
                94
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                859
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAggregateFields": {
            "avg": [
                100
            ],
            "count": [
                243,
                {
                    "columns": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                146
            ],
            "min": [
                148
            ],
            "stddev": [
                157
            ],
            "stddevPop": [
                159
            ],
            "stddevSamp": [
                161
            ],
            "sum": [
                165
            ],
            "varPop": [
                169
            ],
            "varSamp": [
                171
            ],
            "variance": [
                173
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                101
            ],
            "count": [
                403
            ],
            "max": [
                147
            ],
            "min": [
                149
            ],
            "stddev": [
                158
            ],
            "stddevPop": [
                160
            ],
            "stddevSamp": [
                162
            ],
            "sum": [
                166
            ],
            "varPop": [
                170
            ],
            "varSamp": [
                172
            ],
            "variance": [
                174
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotArrRelInsertInput": {
            "data": [
                145
            ],
            "onConflict": [
                152
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                102
            ],
            "_not": [
                102
            ],
            "_or": [
                102
            ],
            "avatar": [
                646
            ],
            "categories": [
                111
            ],
            "categoriesAggregate": [
                105
            ],
            "chatbotId": [
                244
            ],
            "chats": [
                62
            ],
            "chatsAggregate": [
                56
            ],
            "complexityEnum": [
                178
            ],
            "createdBy": [
                646
            ],
            "defaultComplexity": [
                646
            ],
            "defaultLength": [
                646
            ],
            "defaultTone": [
                646
            ],
            "defaultType": [
                646
            ],
            "description": [
                646
            ],
            "lengthEnum": [
                318
            ],
            "metadataLabels": [
                260
            ],
            "metadataLabelsAggregate": [
                254
            ],
            "name": [
                646
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "prompts": [
                463
            ],
            "promptsAggregate": [
                457
            ],
            "threads": [
                719
            ],
            "threadsAggregate": [
                713
            ],
            "toneEnum": [
                777
            ],
            "typeEnum": [
                796
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategory": {
            "category": [
                2
            ],
            "categoryId": [
                243
            ],
            "chatbot": [
                94
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAggregate": {
            "aggregate": [
                106
            ],
            "nodes": [
                103
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                860
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAggregateFields": {
            "avg": [
                109
            ],
            "count": [
                243,
                {
                    "columns": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                115
            ],
            "min": [
                117
            ],
            "stddev": [
                125
            ],
            "stddevPop": [
                127
            ],
            "stddevSamp": [
                129
            ],
            "sum": [
                133
            ],
            "varPop": [
                137
            ],
            "varSamp": [
                139
            ],
            "variance": [
                141
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                110
            ],
            "count": [
                403
            ],
            "max": [
                116
            ],
            "min": [
                118
            ],
            "stddev": [
                126
            ],
            "stddevPop": [
                128
            ],
            "stddevSamp": [
                130
            ],
            "sum": [
                134
            ],
            "varPop": [
                138
            ],
            "varSamp": [
                140
            ],
            "variance": [
                142
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryArrRelInsertInput": {
            "data": [
                114
            ],
            "onConflict": [
                120
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAvgFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                111
            ],
            "_not": [
                111
            ],
            "_or": [
                111
            ],
            "category": [
                6
            ],
            "categoryId": [
                244
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryConstraint": {},
        "ChatbotCategoryIncInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryInsertInput": {
            "category": [
                37
            ],
            "categoryId": [
                243
            ],
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryMaxFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryMinFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                103
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryOnConflict": {
            "constraint": [
                112
            ],
            "updateColumns": [
                135
            ],
            "where": [
                111
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                39
            ],
            "categoryId": [
                403
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryPkColumnsInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategorySelectColumn": {},
        "ChatbotCategorySetInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevPopFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevSampFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                132
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategorySumFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryUpdateColumn": {},
        "ChatbotCategoryUpdates": {
            "_inc": [
                113
            ],
            "_set": [
                124
            ],
            "where": [
                111
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarPopFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarSampFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarianceFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                645
            ],
            "categories": [
                108
            ],
            "chatbotId": [
                243
            ],
            "chats": [
                59
            ],
            "complexityEnum": [
                184
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "lengthEnum": [
                324
            ],
            "metadataLabels": [
                257
            ],
            "name": [
                645
            ],
            "preferences": [
                409
            ],
            "prompts": [
                460
            ],
            "threads": [
                716
            ],
            "toneEnum": [
                783
            ],
            "typeEnum": [
                802
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                645
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                403
            ],
            "chatbotId": [
                403
            ],
            "createdBy": [
                403
            ],
            "defaultComplexity": [
                403
            ],
            "defaultLength": [
                403
            ],
            "defaultTone": [
                403
            ],
            "defaultType": [
                403
            ],
            "description": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                645
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                403
            ],
            "chatbotId": [
                403
            ],
            "createdBy": [
                403
            ],
            "defaultComplexity": [
                403
            ],
            "defaultLength": [
                403
            ],
            "defaultTone": [
                403
            ],
            "defaultType": [
                403
            ],
            "description": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                94
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotObjRelInsertInput": {
            "data": [
                145
            ],
            "onConflict": [
                152
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotOnConflict": {
            "constraint": [
                143
            ],
            "updateColumns": [
                167
            ],
            "where": [
                102
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                403
            ],
            "categoriesAggregate": [
                107
            ],
            "chatbotId": [
                403
            ],
            "chatsAggregate": [
                58
            ],
            "complexityEnum": [
                186
            ],
            "createdBy": [
                403
            ],
            "defaultComplexity": [
                403
            ],
            "defaultLength": [
                403
            ],
            "defaultTone": [
                403
            ],
            "defaultType": [
                403
            ],
            "description": [
                403
            ],
            "lengthEnum": [
                326
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "name": [
                403
            ],
            "preferencesAggregate": [
                408
            ],
            "promptsAggregate": [
                459
            ],
            "threadsAggregate": [
                715
            ],
            "toneEnum": [
                785
            ],
            "typeEnum": [
                804
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                645
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStreamCursorInput": {
            "initialValue": [
                164
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                645
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                645
            ],
            "defaultComplexity": [
                645
            ],
            "defaultLength": [
                645
            ],
            "defaultTone": [
                645
            ],
            "defaultType": [
                645
            ],
            "description": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotUpdateColumn": {},
        "ChatbotUpdates": {
            "_inc": [
                144
            ],
            "_set": [
                156
            ],
            "where": [
                102
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnum": {
            "chatbots": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotsAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumAggregate": {
            "aggregate": [
                177
            ],
            "nodes": [
                175
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        188,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                181
            ],
            "min": [
                182
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumBoolExp": {
            "_and": [
                178
            ],
            "_not": [
                178
            ],
            "_or": [
                178
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                409
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                175
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumObjRelInsertInput": {
            "data": [
                180
            ],
            "onConflict": [
                185
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumOnConflict": {
            "constraint": [
                179
            ],
            "updateColumns": [
                192
            ],
            "where": [
                178
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                408
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumStreamCursorInput": {
            "initialValue": [
                191
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ComplexityEnumUpdateColumn": {},
        "ComplexityEnumUpdates": {
            "_set": [
                189
            ],
            "where": [
                178
            ],
            "__typename": [
                645
            ]
        },
        "CursorOrdering": {},
        "DomainEnum": {
            "added": [
                879
            ],
            "categoryEnumsAggregate": [
                9,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "category_enums": [
                8,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "labelChatbotCategoryDomainsAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "label_chatbot_category_domains": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "name": [
                645
            ],
            "tagEnumsAggregate": [
                672,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "tag_enums": [
                671,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumAggregate": {
            "aggregate": [
                197
            ],
            "nodes": [
                195
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        208,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                201
            ],
            "min": [
                202
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumBoolExp": {
            "_and": [
                198
            ],
            "_not": [
                198
            ],
            "_or": [
                198
            ],
            "added": [
                754
            ],
            "category_enums": [
                14
            ],
            "category_enumsAggregate": [
                10
            ],
            "label_chatbot_category_domains": [
                260
            ],
            "label_chatbot_category_domainsAggregate": [
                254
            ],
            "name": [
                646
            ],
            "tag_enums": [
                679
            ],
            "tag_enumsAggregate": [
                673
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumConstraint": {},
        "DomainEnumInsertInput": {
            "added": [
                879
            ],
            "category_enums": [
                13
            ],
            "label_chatbot_category_domains": [
                257
            ],
            "name": [
                645
            ],
            "tag_enums": [
                676
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumMaxFields": {
            "added": [
                879
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumMinFields": {
            "added": [
                879
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                195
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumObjRelInsertInput": {
            "data": [
                200
            ],
            "onConflict": [
                205
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumOnConflict": {
            "constraint": [
                199
            ],
            "updateColumns": [
                212
            ],
            "where": [
                198
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumOrderBy": {
            "added": [
                403
            ],
            "category_enumsAggregate": [
                12
            ],
            "label_chatbot_category_domainsAggregate": [
                256
            ],
            "name": [
                403
            ],
            "tag_enumsAggregate": [
                675
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumPkColumnsInput": {
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumSelectColumn": {},
        "DomainEnumSetInput": {
            "added": [
                879
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumStreamCursorInput": {
            "initialValue": [
                211
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumStreamCursorValueInput": {
            "added": [
                879
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "DomainEnumUpdateColumn": {},
        "DomainEnumUpdates": {
            "_set": [
                209
            ],
            "where": [
                198
            ],
            "__typename": [
                645
            ]
        },
        "Example": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "metadata": [
                862,
                {
                    "path": [
                        645
                    ]
                }
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "subcategory_enum": [
                647
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleAggregate": {
            "aggregate": [
                217
            ],
            "nodes": [
                214
            ],
            "__typename": [
                645
            ]
        },
        "ExampleAggregateBoolExp": {
            "count": [
                861
            ],
            "__typename": [
                645
            ]
        },
        "ExampleAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                227
            ],
            "min": [
                229
            ],
            "__typename": [
                645
            ]
        },
        "ExampleAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                228
            ],
            "min": [
                230
            ],
            "__typename": [
                645
            ]
        },
        "ExampleAppendInput": {
            "metadata": [
                862
            ],
            "__typename": [
                645
            ]
        },
        "ExampleArrRelInsertInput": {
            "data": [
                226
            ],
            "onConflict": [
                232
            ],
            "__typename": [
                645
            ]
        },
        "ExampleBoolExp": {
            "_and": [
                221
            ],
            "_not": [
                221
            ],
            "_or": [
                221
            ],
            "added": [
                754
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                856
            ],
            "metadata": [
                246
            ],
            "prompt": [
                646
            ],
            "response": [
                646
            ],
            "subcategory": [
                646
            ],
            "subcategory_enum": [
                653
            ],
            "tags": [
                855
            ],
            "__typename": [
                645
            ]
        },
        "ExampleConstraint": {},
        "ExampleDeleteAtPathInput": {
            "metadata": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ExampleDeleteElemInput": {
            "metadata": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ExampleDeleteKeyInput": {
            "metadata": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ExampleInsertInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "metadata": [
                862
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "subcategory_enum": [
                661
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleMaxFields": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleMaxOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "domain": [
                403
            ],
            "exampleId": [
                403
            ],
            "prompt": [
                403
            ],
            "response": [
                403
            ],
            "subcategory": [
                403
            ],
            "tags": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ExampleMinFields": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleMinOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "domain": [
                403
            ],
            "exampleId": [
                403
            ],
            "prompt": [
                403
            ],
            "response": [
                403
            ],
            "subcategory": [
                403
            ],
            "tags": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ExampleMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                214
            ],
            "__typename": [
                645
            ]
        },
        "ExampleOnConflict": {
            "constraint": [
                222
            ],
            "updateColumns": [
                240
            ],
            "where": [
                221
            ],
            "__typename": [
                645
            ]
        },
        "ExampleOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "domain": [
                403
            ],
            "exampleId": [
                403
            ],
            "metadata": [
                403
            ],
            "prompt": [
                403
            ],
            "response": [
                403
            ],
            "subcategory": [
                403
            ],
            "subcategory_enum": [
                663
            ],
            "tags": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ExamplePkColumnsInput": {
            "exampleId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExamplePrependInput": {
            "metadata": [
                862
            ],
            "__typename": [
                645
            ]
        },
        "ExampleSelectColumn": {},
        "ExampleSetInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "metadata": [
                862
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleStreamCursorInput": {
            "initialValue": [
                239
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ExampleStreamCursorValueInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "exampleId": [
                882
            ],
            "metadata": [
                862
            ],
            "prompt": [
                645
            ],
            "response": [
                645
            ],
            "subcategory": [
                645
            ],
            "tags": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ExampleUpdateColumn": {},
        "ExampleUpdates": {
            "_append": [
                219
            ],
            "_deleteAtPath": [
                223
            ],
            "_deleteElem": [
                224
            ],
            "_deleteKey": [
                225
            ],
            "_prepend": [
                235
            ],
            "_set": [
                237
            ],
            "where": [
                221
            ],
            "__typename": [
                645
            ]
        },
        "Float": {},
        "Int": {},
        "IntComparisonExp": {
            "_eq": [
                243
            ],
            "_gt": [
                243
            ],
            "_gte": [
                243
            ],
            "_in": [
                243
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                243
            ],
            "_lte": [
                243
            ],
            "_neq": [
                243
            ],
            "_nin": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "JsonbCastExp": {
            "String": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "JsonbComparisonExp": {
            "_cast": [
                245
            ],
            "_containedIn": [
                862
            ],
            "_contains": [
                862
            ],
            "_eq": [
                862
            ],
            "_gt": [
                862
            ],
            "_gte": [
                862
            ],
            "_hasKey": [
                645
            ],
            "_hasKeysAll": [
                645
            ],
            "_hasKeysAny": [
                645
            ],
            "_in": [
                862
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                862
            ],
            "_lte": [
                862
            ],
            "_neq": [
                862
            ],
            "_nin": [
                862
            ],
            "__typename": [
                645
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "metadataLabels": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "metadataLabelsAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelAggregate": {
            "aggregate": [
                249
            ],
            "nodes": [
                247
            ],
            "__typename": [
                645
            ]
        },
        "LabelAggregateFields": {
            "avg": [
                250
            ],
            "count": [
                243,
                {
                    "columns": [
                        302,
                        "[LabelSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                295
            ],
            "min": [
                296
            ],
            "stddev": [
                304
            ],
            "stddevPop": [
                305
            ],
            "stddevSamp": [
                306
            ],
            "sum": [
                309
            ],
            "varPop": [
                312
            ],
            "varSamp": [
                313
            ],
            "variance": [
                314
            ],
            "__typename": [
                645
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelBoolExp": {
            "_and": [
                251
            ],
            "_not": [
                251
            ],
            "_or": [
                251
            ],
            "advancedLabels": [
                1
            ],
            "categories": [
                646
            ],
            "labelId": [
                244
            ],
            "metadataLabels": [
                260
            ],
            "metadataLabelsAggregate": [
                254
            ],
            "questions": [
                646
            ],
            "subCategories": [
                646
            ],
            "tags": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomain": {
            "category": [
                2
            ],
            "categoryId": [
                243
            ],
            "chatbot": [
                94
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "domain_enum": [
                195
            ],
            "label": [
                247
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAggregate": {
            "aggregate": [
                255
            ],
            "nodes": [
                252
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAggregateBoolExp": {
            "count": [
                863
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAggregateFields": {
            "avg": [
                258
            ],
            "count": [
                243,
                {
                    "columns": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                264
            ],
            "min": [
                266
            ],
            "stddev": [
                274
            ],
            "stddevPop": [
                276
            ],
            "stddevSamp": [
                278
            ],
            "sum": [
                282
            ],
            "varPop": [
                286
            ],
            "varSamp": [
                288
            ],
            "variance": [
                290
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAggregateOrderBy": {
            "avg": [
                259
            ],
            "count": [
                403
            ],
            "max": [
                265
            ],
            "min": [
                267
            ],
            "stddev": [
                275
            ],
            "stddevPop": [
                277
            ],
            "stddevSamp": [
                279
            ],
            "sum": [
                283
            ],
            "varPop": [
                287
            ],
            "varSamp": [
                289
            ],
            "variance": [
                291
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainArrRelInsertInput": {
            "data": [
                263
            ],
            "onConflict": [
                269
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAvgFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainAvgOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainBoolExp": {
            "_and": [
                260
            ],
            "_not": [
                260
            ],
            "_or": [
                260
            ],
            "category": [
                6
            ],
            "categoryId": [
                244
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "domainId": [
                646
            ],
            "domain_enum": [
                198
            ],
            "label": [
                251
            ],
            "labelId": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainConstraint": {},
        "LabelChatbotCategoryDomainIncInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainInsertInput": {
            "category": [
                37
            ],
            "categoryId": [
                243
            ],
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "domain_enum": [
                204
            ],
            "label": [
                298
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainMaxFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainMaxOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "domainId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainMinFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainMinOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "domainId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                252
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainOnConflict": {
            "constraint": [
                261
            ],
            "updateColumns": [
                284
            ],
            "where": [
                260
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainOrderBy": {
            "category": [
                39
            ],
            "categoryId": [
                403
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                403
            ],
            "domainId": [
                403
            ],
            "domain_enum": [
                206
            ],
            "label": [
                300
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainPkColumnsInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainSelectColumn": {},
        "LabelChatbotCategoryDomainSetInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevPopFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevPopOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevSampFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStddevSampOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStreamCursorInput": {
            "initialValue": [
                281
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "domainId": [
                645
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainSumFields": {
            "categoryId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainSumOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainUpdateColumn": {},
        "LabelChatbotCategoryDomainUpdates": {
            "_inc": [
                262
            ],
            "_set": [
                273
            ],
            "where": [
                260
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarPopFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarPopOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarSampFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarSampOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarianceFields": {
            "categoryId": [
                242
            ],
            "chatbotId": [
                242
            ],
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelChatbotCategoryDomainVarianceOrderBy": {
            "categoryId": [
                403
            ],
            "chatbotId": [
                403
            ],
            "labelId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "metadataLabels": [
                257
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelMaxFields": {
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelMinFields": {
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                247
            ],
            "__typename": [
                645
            ]
        },
        "LabelObjRelInsertInput": {
            "data": [
                294
            ],
            "onConflict": [
                299
            ],
            "__typename": [
                645
            ]
        },
        "LabelOnConflict": {
            "constraint": [
                292
            ],
            "updateColumns": [
                310
            ],
            "where": [
                251
            ],
            "__typename": [
                645
            ]
        },
        "LabelOrderBy": {
            "advancedLabels": [
                403
            ],
            "categories": [
                403
            ],
            "labelId": [
                403
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "questions": [
                403
            ],
            "subCategories": [
                403
            ],
            "tags": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelStreamCursorInput": {
            "initialValue": [
                308
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                645
            ],
            "labelId": [
                243
            ],
            "questions": [
                645
            ],
            "subCategories": [
                645
            ],
            "tags": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LabelSumFields": {
            "labelId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "LabelUpdateColumn": {},
        "LabelUpdates": {
            "_inc": [
                293
            ],
            "_set": [
                303
            ],
            "where": [
                251
            ],
            "__typename": [
                645
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnum": {
            "chatbots": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotsAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumAggregate": {
            "aggregate": [
                317
            ],
            "nodes": [
                315
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        328,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                321
            ],
            "min": [
                322
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                318
            ],
            "_not": [
                318
            ],
            "_or": [
                318
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                409
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                315
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumObjRelInsertInput": {
            "data": [
                320
            ],
            "onConflict": [
                325
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumOnConflict": {
            "constraint": [
                319
            ],
            "updateColumns": [
                332
            ],
            "where": [
                318
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                408
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                331
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "LengthEnumUpdateColumn": {},
        "LengthEnumUpdates": {
            "_set": [
                329
            ],
            "where": [
                318
            ],
            "__typename": [
                645
            ]
        },
        "Message": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "examples": [
                862,
                {
                    "path": [
                        645
                    ]
                }
            ],
            "messageId": [
                882
            ],
            "messageTypeEnum": [
                360
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "thread": [
                711
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageAggregate": {
            "aggregate": [
                337
            ],
            "nodes": [
                334
            ],
            "__typename": [
                645
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                864
            ],
            "__typename": [
                645
            ]
        },
        "MessageAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                347
            ],
            "min": [
                349
            ],
            "__typename": [
                645
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                348
            ],
            "min": [
                350
            ],
            "__typename": [
                645
            ]
        },
        "MessageAppendInput": {
            "examples": [
                862
            ],
            "__typename": [
                645
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                346
            ],
            "onConflict": [
                352
            ],
            "__typename": [
                645
            ]
        },
        "MessageBoolExp": {
            "_and": [
                341
            ],
            "_not": [
                341
            ],
            "_or": [
                341
            ],
            "augmentedFrom": [
                856
            ],
            "content": [
                646
            ],
            "createdAt": [
                754
            ],
            "examples": [
                246
            ],
            "messageId": [
                856
            ],
            "messageTypeEnum": [
                363
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "thread": [
                719
            ],
            "threadId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "MessageConstraint": {},
        "MessageDeleteAtPathInput": {
            "examples": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageDeleteElemInput": {
            "examples": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "MessageDeleteKeyInput": {
            "examples": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageInsertInput": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "examples": [
                862
            ],
            "messageId": [
                882
            ],
            "messageTypeEnum": [
                369
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "thread": [
                728
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageMaxFields": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "messageId": [
                882
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageMaxOrderBy": {
            "augmentedFrom": [
                403
            ],
            "content": [
                403
            ],
            "createdAt": [
                403
            ],
            "messageId": [
                403
            ],
            "prompt": [
                403
            ],
            "role": [
                403
            ],
            "threadId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "MessageMinFields": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "messageId": [
                882
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageMinOrderBy": {
            "augmentedFrom": [
                403
            ],
            "content": [
                403
            ],
            "createdAt": [
                403
            ],
            "messageId": [
                403
            ],
            "prompt": [
                403
            ],
            "role": [
                403
            ],
            "threadId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "MessageMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                334
            ],
            "__typename": [
                645
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                342
            ],
            "updateColumns": [
                379
            ],
            "where": [
                341
            ],
            "__typename": [
                645
            ]
        },
        "MessageOrderBy": {
            "augmentedFrom": [
                403
            ],
            "content": [
                403
            ],
            "createdAt": [
                403
            ],
            "examples": [
                403
            ],
            "messageId": [
                403
            ],
            "messageTypeEnum": [
                371
            ],
            "prompt": [
                403
            ],
            "role": [
                403
            ],
            "thread": [
                730
            ],
            "threadId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessagePrependInput": {
            "examples": [
                862
            ],
            "__typename": [
                645
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "examples": [
                862
            ],
            "messageId": [
                882
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                359
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "MessageStreamCursorValueInput": {
            "augmentedFrom": [
                882
            ],
            "content": [
                645
            ],
            "createdAt": [
                879
            ],
            "examples": [
                862
            ],
            "messageId": [
                882
            ],
            "prompt": [
                645
            ],
            "role": [
                645
            ],
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                334,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messagesAggregate": [
                335,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                362
            ],
            "nodes": [
                360
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        373,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                366
            ],
            "min": [
                367
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                363
            ],
            "_not": [
                363
            ],
            "_or": [
                363
            ],
            "messages": [
                341
            ],
            "messagesAggregate": [
                336
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                340
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                360
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumObjRelInsertInput": {
            "data": [
                365
            ],
            "onConflict": [
                370
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                364
            ],
            "updateColumns": [
                377
            ],
            "where": [
                363
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                338
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                376
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                374
            ],
            "where": [
                363
            ],
            "__typename": [
                645
            ]
        },
        "MessageUpdateColumn": {},
        "MessageUpdates": {
            "_append": [
                339
            ],
            "_deleteAtPath": [
                343
            ],
            "_deleteElem": [
                344
            ],
            "_deleteKey": [
                345
            ],
            "_prepend": [
                355
            ],
            "_set": [
                357
            ],
            "where": [
                341
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnum": {
            "name": [
                645
            ],
            "threads": [
                711,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadsAggregate": [
                712,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumAggregate": {
            "aggregate": [
                383
            ],
            "nodes": [
                381
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        396,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                389
            ],
            "min": [
                390
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                384
            ],
            "_not": [
                384
            ],
            "_or": [
                384
            ],
            "name": [
                646
            ],
            "threads": [
                719
            ],
            "threadsAggregate": [
                713
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumConstraint": {},
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                386
            ],
            "_in": [
                386
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                386
            ],
            "_nin": [
                386
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                645
            ],
            "threads": [
                716
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                645
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                645
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                381
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumObjRelInsertInput": {
            "data": [
                388
            ],
            "onConflict": [
                393
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumOnConflict": {
            "constraint": [
                385
            ],
            "updateColumns": [
                400
            ],
            "where": [
                384
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                403
            ],
            "threadsAggregate": [
                715
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                645
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                399
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                645
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ModelsEnumUpdateColumn": {},
        "ModelsEnumUpdates": {
            "_set": [
                397
            ],
            "where": [
                384
            ],
            "__typename": [
                645
            ]
        },
        "NumericComparisonExp": {
            "_eq": [
                865
            ],
            "_gt": [
                865
            ],
            "_gte": [
                865
            ],
            "_in": [
                865
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                865
            ],
            "_lte": [
                865
            ],
            "_neq": [
                865
            ],
            "_nin": [
                865
            ],
            "__typename": [
                645
            ]
        },
        "OrderBy": {},
        "Preference": {
            "chatbot": [
                94
            ],
            "chatbotId": [
                243
            ],
            "complexityEnum": [
                175
            ],
            "favorite": [
                0
            ],
            "lengthEnum": [
                315
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "toneEnum": [
                774
            ],
            "typeEnum": [
                793
            ],
            "user": [
                812
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                407
            ],
            "nodes": [
                404
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                866
            ],
            "bool_or": [
                867
            ],
            "count": [
                868
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                410
            ],
            "count": [
                243,
                {
                    "columns": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                416
            ],
            "min": [
                418
            ],
            "stddev": [
                428
            ],
            "stddevPop": [
                430
            ],
            "stddevSamp": [
                432
            ],
            "sum": [
                436
            ],
            "varPop": [
                440
            ],
            "varSamp": [
                442
            ],
            "variance": [
                444
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                411
            ],
            "count": [
                403
            ],
            "max": [
                417
            ],
            "min": [
                419
            ],
            "stddev": [
                429
            ],
            "stddevPop": [
                431
            ],
            "stddevSamp": [
                433
            ],
            "sum": [
                437
            ],
            "varPop": [
                441
            ],
            "varSamp": [
                443
            ],
            "variance": [
                445
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                415
            ],
            "onConflict": [
                421
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAvgFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                412
            ],
            "_not": [
                412
            ],
            "_or": [
                412
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "complexityEnum": [
                178
            ],
            "favorite": [
                1
            ],
            "lengthEnum": [
                318
            ],
            "preferenceId": [
                244
            ],
            "preferredComplexity": [
                646
            ],
            "preferredLength": [
                646
            ],
            "preferredTone": [
                646
            ],
            "preferredType": [
                646
            ],
            "toneEnum": [
                777
            ],
            "typeEnum": [
                796
            ],
            "user": [
                815
            ],
            "userId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceConstraint": {},
        "PreferenceIncInput": {
            "chatbotId": [
                243
            ],
            "preferenceId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceInsertInput": {
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "complexityEnum": [
                184
            ],
            "favorite": [
                0
            ],
            "lengthEnum": [
                324
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "toneEnum": [
                783
            ],
            "typeEnum": [
                802
            ],
            "user": [
                821
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceMaxFields": {
            "chatbotId": [
                243
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "preferredComplexity": [
                403
            ],
            "preferredLength": [
                403
            ],
            "preferredTone": [
                403
            ],
            "preferredType": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceMinFields": {
            "chatbotId": [
                243
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "preferredComplexity": [
                403
            ],
            "preferredLength": [
                403
            ],
            "preferredTone": [
                403
            ],
            "preferredType": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                404
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                413
            ],
            "updateColumns": [
                438
            ],
            "where": [
                412
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                403
            ],
            "complexityEnum": [
                186
            ],
            "favorite": [
                403
            ],
            "lengthEnum": [
                326
            ],
            "preferenceId": [
                403
            ],
            "preferredComplexity": [
                403
            ],
            "preferredLength": [
                403
            ],
            "preferredTone": [
                403
            ],
            "preferredType": [
                403
            ],
            "toneEnum": [
                785
            ],
            "typeEnum": [
                804
            ],
            "user": [
                823
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceSelectColumn": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_andArgumentsColumns": {},
        "PreferenceSelectColumnPreferenceAggregateBoolExpBool_orArgumentsColumns": {},
        "PreferenceSetInput": {
            "chatbotId": [
                243
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevPopFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevSampFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                435
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "favorite": [
                0
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                645
            ],
            "preferredLength": [
                645
            ],
            "preferredTone": [
                645
            ],
            "preferredType": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceSumFields": {
            "chatbotId": [
                243
            ],
            "preferenceId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                414
            ],
            "_set": [
                427
            ],
            "where": [
                412
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarPopFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarSampFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarianceFields": {
            "chatbotId": [
                242
            ],
            "preferenceId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                403
            ],
            "preferenceId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "Prompt": {
            "chatbots": [
                455,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "chatbotsAggregate": [
                456,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "promptTypeEnum": [
                519
            ],
            "type": [
                645
            ],
            "users": [
                540,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "usersAggregate": [
                541,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                449
            ],
            "nodes": [
                446
            ],
            "__typename": [
                645
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                869
            ],
            "__typename": [
                645
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                452
            ],
            "count": [
                243,
                {
                    "columns": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                498
            ],
            "min": [
                500
            ],
            "stddev": [
                509
            ],
            "stddevPop": [
                511
            ],
            "stddevSamp": [
                513
            ],
            "sum": [
                517
            ],
            "varPop": [
                580
            ],
            "varSamp": [
                582
            ],
            "variance": [
                584
            ],
            "__typename": [
                645
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                453
            ],
            "count": [
                403
            ],
            "max": [
                499
            ],
            "min": [
                501
            ],
            "stddev": [
                510
            ],
            "stddevPop": [
                512
            ],
            "stddevSamp": [
                514
            ],
            "sum": [
                518
            ],
            "varPop": [
                581
            ],
            "varSamp": [
                583
            ],
            "variance": [
                585
            ],
            "__typename": [
                645
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                497
            ],
            "onConflict": [
                504
            ],
            "__typename": [
                645
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptBoolExp": {
            "_and": [
                454
            ],
            "_not": [
                454
            ],
            "_or": [
                454
            ],
            "chatbots": [
                463
            ],
            "chatbotsAggregate": [
                457
            ],
            "content": [
                646
            ],
            "promptId": [
                244
            ],
            "promptName": [
                646
            ],
            "promptTypeEnum": [
                522
            ],
            "type": [
                646
            ],
            "users": [
                548
            ],
            "usersAggregate": [
                542
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                243
            ],
            "chatbot": [
                94
            ],
            "prompt": [
                446
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                458
            ],
            "nodes": [
                455
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                870
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                461
            ],
            "count": [
                243,
                {
                    "columns": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                467
            ],
            "min": [
                469
            ],
            "stddev": [
                477
            ],
            "stddevPop": [
                479
            ],
            "stddevSamp": [
                481
            ],
            "sum": [
                485
            ],
            "varPop": [
                489
            ],
            "varSamp": [
                491
            ],
            "variance": [
                493
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                462
            ],
            "count": [
                403
            ],
            "max": [
                468
            ],
            "min": [
                470
            ],
            "stddev": [
                478
            ],
            "stddevPop": [
                480
            ],
            "stddevSamp": [
                482
            ],
            "sum": [
                486
            ],
            "varPop": [
                490
            ],
            "varSamp": [
                492
            ],
            "variance": [
                494
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                466
            ],
            "onConflict": [
                472
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAvgFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                463
            ],
            "_not": [
                463
            ],
            "_or": [
                463
            ],
            "chabotId": [
                244
            ],
            "chatbot": [
                102
            ],
            "prompt": [
                454
            ],
            "promptId": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotConstraint": {},
        "PromptChatbotIncInput": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotInsertInput": {
            "chabotId": [
                243
            ],
            "chatbot": [
                151
            ],
            "prompt": [
                503
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotMaxFields": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotMinFields": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                455
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                464
            ],
            "updateColumns": [
                487
            ],
            "where": [
                463
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                403
            ],
            "chatbot": [
                153
            ],
            "prompt": [
                505
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotPkColumnsInput": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotSelectColumn": {},
        "PromptChatbotSetInput": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevPopFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevSampFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                484
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotStreamCursorValueInput": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotSumFields": {
            "chabotId": [
                243
            ],
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                465
            ],
            "_set": [
                476
            ],
            "where": [
                463
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarPopFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarSampFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarianceFields": {
            "chabotId": [
                242
            ],
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                403
            ],
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                460
            ],
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "promptTypeEnum": [
                528
            ],
            "type": [
                645
            ],
            "users": [
                545
            ],
            "__typename": [
                645
            ]
        },
        "PromptMaxFields": {
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "type": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                403
            ],
            "promptId": [
                403
            ],
            "promptName": [
                403
            ],
            "type": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptMinFields": {
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "type": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                403
            ],
            "promptId": [
                403
            ],
            "promptName": [
                403
            ],
            "type": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                446
            ],
            "__typename": [
                645
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                497
            ],
            "onConflict": [
                504
            ],
            "__typename": [
                645
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                495
            ],
            "updateColumns": [
                538
            ],
            "where": [
                454
            ],
            "__typename": [
                645
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                459
            ],
            "content": [
                403
            ],
            "promptId": [
                403
            ],
            "promptName": [
                403
            ],
            "promptTypeEnum": [
                530
            ],
            "type": [
                403
            ],
            "usersAggregate": [
                544
            ],
            "__typename": [
                645
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "type": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                516
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                645
            ],
            "promptId": [
                243
            ],
            "promptName": [
                645
            ],
            "type": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                446,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptsAggregate": [
                447,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                521
            ],
            "nodes": [
                519
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        532,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                525
            ],
            "min": [
                526
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                522
            ],
            "_not": [
                522
            ],
            "_or": [
                522
            ],
            "prompts": [
                454
            ],
            "promptsAggregate": [
                448
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                451
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                519
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                524
            ],
            "onConflict": [
                529
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                523
            ],
            "updateColumns": [
                536
            ],
            "where": [
                522
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                450
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                535
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                533
            ],
            "where": [
                522
            ],
            "__typename": [
                645
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                496
            ],
            "_set": [
                508
            ],
            "where": [
                454
            ],
            "__typename": [
                645
            ]
        },
        "PromptUser": {
            "prompt": [
                446
            ],
            "promptId": [
                243
            ],
            "user": [
                812
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                543
            ],
            "nodes": [
                540
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                871
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                546
            ],
            "count": [
                243,
                {
                    "columns": [
                        560,
                        "[PromptUserSelectColumn!]"
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
                554
            ],
            "stddev": [
                562
            ],
            "stddevPop": [
                564
            ],
            "stddevSamp": [
                566
            ],
            "sum": [
                570
            ],
            "varPop": [
                574
            ],
            "varSamp": [
                576
            ],
            "variance": [
                578
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                547
            ],
            "count": [
                403
            ],
            "max": [
                553
            ],
            "min": [
                555
            ],
            "stddev": [
                563
            ],
            "stddevPop": [
                565
            ],
            "stddevSamp": [
                567
            ],
            "sum": [
                571
            ],
            "varPop": [
                575
            ],
            "varSamp": [
                577
            ],
            "variance": [
                579
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                551
            ],
            "onConflict": [
                557
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                548
            ],
            "_not": [
                548
            ],
            "_or": [
                548
            ],
            "prompt": [
                454
            ],
            "promptId": [
                244
            ],
            "user": [
                815
            ],
            "userId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                503
            ],
            "promptId": [
                243
            ],
            "user": [
                821
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                243
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                243
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                540
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                549
            ],
            "updateColumns": [
                572
            ],
            "where": [
                548
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                505
            ],
            "promptId": [
                403
            ],
            "user": [
                823
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                243
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                243
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                569
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                243
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                550
            ],
            "_set": [
                561
            ],
            "where": [
                548
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "Referral": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "user": [
                812
            ],
            "userByUserId": [
                812
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralAggregate": {
            "aggregate": [
                589
            ],
            "nodes": [
                586
            ],
            "__typename": [
                645
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                872
            ],
            "__typename": [
                645
            ]
        },
        "ReferralAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                595
            ],
            "min": [
                597
            ],
            "__typename": [
                645
            ]
        },
        "ReferralAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                596
            ],
            "min": [
                598
            ],
            "__typename": [
                645
            ]
        },
        "ReferralArrRelInsertInput": {
            "data": [
                594
            ],
            "onConflict": [
                600
            ],
            "__typename": [
                645
            ]
        },
        "ReferralBoolExp": {
            "_and": [
                592
            ],
            "_not": [
                592
            ],
            "_or": [
                592
            ],
            "referralCode": [
                646
            ],
            "referrerId": [
                856
            ],
            "user": [
                815
            ],
            "userByUserId": [
                815
            ],
            "userId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "user": [
                821
            ],
            "userByUserId": [
                821
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralMaxOrderBy": {
            "referralCode": [
                403
            ],
            "referrerId": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralMinOrderBy": {
            "referralCode": [
                403
            ],
            "referrerId": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ReferralMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                586
            ],
            "__typename": [
                645
            ]
        },
        "ReferralOnConflict": {
            "constraint": [
                593
            ],
            "updateColumns": [
                607
            ],
            "where": [
                592
            ],
            "__typename": [
                645
            ]
        },
        "ReferralOrderBy": {
            "referralCode": [
                403
            ],
            "referrerId": [
                403
            ],
            "user": [
                823
            ],
            "userByUserId": [
                823
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralStreamCursorInput": {
            "initialValue": [
                606
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                645
            ],
            "referrerId": [
                882
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ReferralUpdateColumn": {},
        "ReferralUpdates": {
            "_set": [
                604
            ],
            "where": [
                592
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowing": {
            "chatbot": [
                94
            ],
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "user": [
                812
            ],
            "userByFollowerId": [
                812
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAggregate": {
            "aggregate": [
                612
            ],
            "nodes": [
                609
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAggregateBoolExp": {
            "count": [
                873
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAggregateFields": {
            "avg": [
                615
            ],
            "count": [
                243,
                {
                    "columns": [
                        626,
                        "[SocialFollowingSelectColumn!]"
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
                622
            ],
            "stddev": [
                628
            ],
            "stddevPop": [
                630
            ],
            "stddevSamp": [
                632
            ],
            "sum": [
                636
            ],
            "varPop": [
                639
            ],
            "varSamp": [
                641
            ],
            "variance": [
                643
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAggregateOrderBy": {
            "avg": [
                616
            ],
            "count": [
                403
            ],
            "max": [
                621
            ],
            "min": [
                623
            ],
            "stddev": [
                629
            ],
            "stddevPop": [
                631
            ],
            "stddevSamp": [
                633
            ],
            "sum": [
                637
            ],
            "varPop": [
                640
            ],
            "varSamp": [
                642
            ],
            "variance": [
                644
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingArrRelInsertInput": {
            "data": [
                619
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAvgFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingAvgOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingBoolExp": {
            "_and": [
                617
            ],
            "_not": [
                617
            ],
            "_or": [
                617
            ],
            "chatbot": [
                102
            ],
            "createdAt": [
                754
            ],
            "followeeId": [
                856
            ],
            "followeeIdChatbot": [
                244
            ],
            "followerId": [
                856
            ],
            "user": [
                815
            ],
            "userByFollowerId": [
                815
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingIncInput": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingInsertInput": {
            "chatbot": [
                151
            ],
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "user": [
                821
            ],
            "userByFollowerId": [
                821
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingMaxFields": {
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingMaxOrderBy": {
            "createdAt": [
                403
            ],
            "followeeId": [
                403
            ],
            "followeeIdChatbot": [
                403
            ],
            "followerId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingMinFields": {
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingMinOrderBy": {
            "createdAt": [
                403
            ],
            "followeeId": [
                403
            ],
            "followeeIdChatbot": [
                403
            ],
            "followerId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                609
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingOrderBy": {
            "chatbot": [
                153
            ],
            "createdAt": [
                403
            ],
            "followeeId": [
                403
            ],
            "followeeIdChatbot": [
                403
            ],
            "followerId": [
                403
            ],
            "user": [
                823
            ],
            "userByFollowerId": [
                823
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingSelectColumn": {},
        "SocialFollowingSetInput": {
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevPopOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStddevSampOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStreamCursorInput": {
            "initialValue": [
                635
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingStreamCursorValueInput": {
            "createdAt": [
                879
            ],
            "followeeId": [
                882
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingSumFields": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingSumOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingUpdates": {
            "_inc": [
                618
            ],
            "_set": [
                627
            ],
            "where": [
                617
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarPopOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarSampOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarianceFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "SocialFollowingVarianceOrderBy": {
            "followeeIdChatbot": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                645
            ],
            "_gt": [
                645
            ],
            "_gte": [
                645
            ],
            "_ilike": [
                645
            ],
            "_in": [
                645
            ],
            "_iregex": [
                645
            ],
            "_isNull": [
                0
            ],
            "_like": [
                645
            ],
            "_lt": [
                645
            ],
            "_lte": [
                645
            ],
            "_neq": [
                645
            ],
            "_nilike": [
                645
            ],
            "_nin": [
                645
            ],
            "_niregex": [
                645
            ],
            "_nlike": [
                645
            ],
            "_nregex": [
                645
            ],
            "_nsimilar": [
                645
            ],
            "_regex": [
                645
            ],
            "_similar": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnum": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "category_enum": [
                8
            ],
            "domain": [
                645
            ],
            "examples": [
                214,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "examplesAggregate": [
                215,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumAggregate": {
            "aggregate": [
                650
            ],
            "nodes": [
                647
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumAggregateBoolExp": {
            "count": [
                874
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
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
                658
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                657
            ],
            "min": [
                659
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumArrRelInsertInput": {
            "data": [
                655
            ],
            "onConflict": [
                662
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumBoolExp": {
            "_and": [
                653
            ],
            "_not": [
                653
            ],
            "_or": [
                653
            ],
            "added": [
                754
            ],
            "category": [
                646
            ],
            "category_enum": [
                14
            ],
            "domain": [
                646
            ],
            "examples": [
                221
            ],
            "examplesAggregate": [
                216
            ],
            "name": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumConstraint": {},
        "SubcategoryEnumInsertInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "category_enum": [
                22
            ],
            "domain": [
                645
            ],
            "examples": [
                220
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumMaxFields": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumMaxOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "domain": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumMinFields": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumMinOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "domain": [
                403
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                647
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumObjRelInsertInput": {
            "data": [
                655
            ],
            "onConflict": [
                662
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumOnConflict": {
            "constraint": [
                654
            ],
            "updateColumns": [
                669
            ],
            "where": [
                653
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumOrderBy": {
            "added": [
                403
            ],
            "category": [
                403
            ],
            "category_enum": [
                24
            ],
            "domain": [
                403
            ],
            "examplesAggregate": [
                218
            ],
            "name": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumPkColumnsInput": {
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumSelectColumn": {},
        "SubcategoryEnumSetInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumStreamCursorInput": {
            "initialValue": [
                668
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumStreamCursorValueInput": {
            "added": [
                879
            ],
            "category": [
                645
            ],
            "domain": [
                645
            ],
            "name": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "SubcategoryEnumUpdateColumn": {},
        "SubcategoryEnumUpdates": {
            "_set": [
                666
            ],
            "where": [
                653
            ],
            "__typename": [
                645
            ]
        },
        "TagEnum": {
            "domain": [
                645
            ],
            "domain_enum": [
                195
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAggregate": {
            "aggregate": [
                674
            ],
            "nodes": [
                671
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAggregateBoolExp": {
            "count": [
                875
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAggregateFields": {
            "avg": [
                677
            ],
            "count": [
                243,
                {
                    "columns": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                683
            ],
            "min": [
                685
            ],
            "stddev": [
                693
            ],
            "stddevPop": [
                695
            ],
            "stddevSamp": [
                697
            ],
            "sum": [
                701
            ],
            "varPop": [
                705
            ],
            "varSamp": [
                707
            ],
            "variance": [
                709
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAggregateOrderBy": {
            "avg": [
                678
            ],
            "count": [
                403
            ],
            "max": [
                684
            ],
            "min": [
                686
            ],
            "stddev": [
                694
            ],
            "stddevPop": [
                696
            ],
            "stddevSamp": [
                698
            ],
            "sum": [
                702
            ],
            "varPop": [
                706
            ],
            "varSamp": [
                708
            ],
            "variance": [
                710
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumArrRelInsertInput": {
            "data": [
                682
            ],
            "onConflict": [
                688
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAvgFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumAvgOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumBoolExp": {
            "_and": [
                679
            ],
            "_not": [
                679
            ],
            "_or": [
                679
            ],
            "domain": [
                646
            ],
            "domain_enum": [
                198
            ],
            "frequency": [
                402
            ],
            "name": [
                646
            ],
            "tagId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumConstraint": {},
        "TagEnumIncInput": {
            "frequency": [
                865
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumInsertInput": {
            "domain": [
                645
            ],
            "domain_enum": [
                204
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumMaxFields": {
            "domain": [
                645
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumMaxOrderBy": {
            "domain": [
                403
            ],
            "frequency": [
                403
            ],
            "name": [
                403
            ],
            "tagId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumMinFields": {
            "domain": [
                645
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumMinOrderBy": {
            "domain": [
                403
            ],
            "frequency": [
                403
            ],
            "name": [
                403
            ],
            "tagId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                671
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumOnConflict": {
            "constraint": [
                680
            ],
            "updateColumns": [
                703
            ],
            "where": [
                679
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumOrderBy": {
            "domain": [
                403
            ],
            "domain_enum": [
                206
            ],
            "frequency": [
                403
            ],
            "name": [
                403
            ],
            "tagId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumPkColumnsInput": {
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumSelectColumn": {},
        "TagEnumSetInput": {
            "domain": [
                645
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevPopOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStddevSampOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStreamCursorInput": {
            "initialValue": [
                700
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumStreamCursorValueInput": {
            "domain": [
                645
            ],
            "frequency": [
                865
            ],
            "name": [
                645
            ],
            "tagId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumSumFields": {
            "frequency": [
                865
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumSumOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumUpdateColumn": {},
        "TagEnumUpdates": {
            "_inc": [
                681
            ],
            "_set": [
                692
            ],
            "where": [
                679
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarPopOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarSampOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarianceFields": {
            "frequency": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "TagEnumVarianceOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "Thread": {
            "chatbot": [
                94
            ],
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
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
                334,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messagesAggregate": [
                335,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "model": [
                386
            ],
            "modelsEnum": [
                381
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "user": [
                812
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                714
            ],
            "nodes": [
                711
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                876
            ],
            "bool_or": [
                877
            ],
            "count": [
                878
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                717
            ],
            "count": [
                243,
                {
                    "columns": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                723
            ],
            "min": [
                725
            ],
            "stddev": [
                736
            ],
            "stddevPop": [
                738
            ],
            "stddevSamp": [
                740
            ],
            "sum": [
                744
            ],
            "varPop": [
                748
            ],
            "varSamp": [
                750
            ],
            "variance": [
                752
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                718
            ],
            "count": [
                403
            ],
            "max": [
                724
            ],
            "min": [
                726
            ],
            "stddev": [
                737
            ],
            "stddevPop": [
                739
            ],
            "stddevSamp": [
                741
            ],
            "sum": [
                745
            ],
            "varPop": [
                749
            ],
            "varSamp": [
                751
            ],
            "variance": [
                753
            ],
            "__typename": [
                645
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                722
            ],
            "onConflict": [
                729
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                719
            ],
            "_not": [
                719
            ],
            "_or": [
                719
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "createdAt": [
                754
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
                341
            ],
            "messagesAggregate": [
                336
            ],
            "model": [
                387
            ],
            "modelsEnum": [
                384
            ],
            "threadId": [
                856
            ],
            "updatedAt": [
                754
            ],
            "user": [
                815
            ],
            "userId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ThreadInsertInput": {
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
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
                340
            ],
            "model": [
                386
            ],
            "modelsEnum": [
                392
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "user": [
                821
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                403
            ],
            "createdAt": [
                403
            ],
            "threadId": [
                403
            ],
            "updatedAt": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                403
            ],
            "createdAt": [
                403
            ],
            "threadId": [
                403
            ],
            "updatedAt": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                711
            ],
            "__typename": [
                645
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                722
            ],
            "onConflict": [
                729
            ],
            "__typename": [
                645
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                720
            ],
            "updateColumns": [
                746
            ],
            "where": [
                719
            ],
            "__typename": [
                645
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                403
            ],
            "createdAt": [
                403
            ],
            "isApproved": [
                403
            ],
            "isBlocked": [
                403
            ],
            "isPublic": [
                403
            ],
            "messagesAggregate": [
                338
            ],
            "model": [
                403
            ],
            "modelsEnum": [
                394
            ],
            "threadId": [
                403
            ],
            "updatedAt": [
                403
            ],
            "user": [
                823
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadSelectColumn": {},
        "ThreadSelectColumnThreadAggregateBoolExpBool_andArgumentsColumns": {},
        "ThreadSelectColumnThreadAggregateBoolExpBool_orArgumentsColumns": {},
        "ThreadSetInput": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
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
                386
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                743
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                879
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
                386
            ],
            "threadId": [
                882
            ],
            "updatedAt": [
                879
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                645
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                721
            ],
            "_set": [
                735
            ],
            "where": [
                719
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                645
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                879
            ],
            "_gt": [
                879
            ],
            "_gte": [
                879
            ],
            "_in": [
                879
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                879
            ],
            "_lte": [
                879
            ],
            "_neq": [
                879
            ],
            "_nin": [
                879
            ],
            "__typename": [
                645
            ]
        },
        "Token": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "userTokens": [
                830,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokensAggregate": [
                831,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                757
            ],
            "nodes": [
                755
            ],
            "__typename": [
                645
            ]
        },
        "TokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        768,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                761
            ],
            "min": [
                762
            ],
            "__typename": [
                645
            ]
        },
        "TokenBoolExp": {
            "_and": [
                758
            ],
            "_not": [
                758
            ],
            "_or": [
                758
            ],
            "token": [
                646
            ],
            "tokenExpiry": [
                754
            ],
            "userTokens": [
                836
            ],
            "userTokensAggregate": [
                832
            ],
            "__typename": [
                645
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "userTokens": [
                835
            ],
            "__typename": [
                645
            ]
        },
        "TokenMaxFields": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "__typename": [
                645
            ]
        },
        "TokenMinFields": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "__typename": [
                645
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                755
            ],
            "__typename": [
                645
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                760
            ],
            "onConflict": [
                765
            ],
            "__typename": [
                645
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                759
            ],
            "updateColumns": [
                772
            ],
            "where": [
                758
            ],
            "__typename": [
                645
            ]
        },
        "TokenOrderBy": {
            "token": [
                403
            ],
            "tokenExpiry": [
                403
            ],
            "userTokensAggregate": [
                834
            ],
            "__typename": [
                645
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "__typename": [
                645
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                771
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                645
            ],
            "tokenExpiry": [
                879
            ],
            "__typename": [
                645
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                769
            ],
            "where": [
                758
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnum": {
            "chatbots": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotsAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                776
            ],
            "nodes": [
                774
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        787,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                780
            ],
            "min": [
                781
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                777
            ],
            "_not": [
                777
            ],
            "_or": [
                777
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                409
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                774
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                779
            ],
            "onConflict": [
                784
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                778
            ],
            "updateColumns": [
                791
            ],
            "where": [
                777
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                408
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                790
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                788
            ],
            "where": [
                777
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnum": {
            "chatbots": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotsAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                795
            ],
            "nodes": [
                793
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        806,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                799
            ],
            "min": [
                800
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                796
            ],
            "_not": [
                796
            ],
            "_or": [
                796
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "value": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                409
            ],
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                793
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                798
            ],
            "onConflict": [
                803
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                797
            ],
            "updateColumns": [
                810
            ],
            "where": [
                796
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                408
            ],
            "value": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                809
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                807
            ],
            "where": [
                796
            ],
            "__typename": [
                645
            ]
        },
        "User": {
            "bio": [
                645
            ],
            "chats": [
                54,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatsAggregate": [
                55,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
            ],
            "followers": [
                609,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "followersAggregate": [
                610,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "following": [
                609,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "followingAggregate": [
                610,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
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
                879
            ],
            "password": [
                645
            ],
            "preferences": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferencesAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "prompts": [
                540,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "promptsAggregate": [
                541,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "referrals": [
                586,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralsAggregate": [
                587,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralsByUserId": [
                586,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralsByUserIdAggregate": [
                587,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "threads": [
                711,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadsAggregate": [
                712,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "userId": [
                882
            ],
            "userTokens": [
                830,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokensAggregate": [
                831,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserAggregate": {
            "aggregate": [
                814
            ],
            "nodes": [
                812
            ],
            "__typename": [
                645
            ]
        },
        "UserAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        826,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                818
            ],
            "min": [
                819
            ],
            "__typename": [
                645
            ]
        },
        "UserBoolExp": {
            "_and": [
                815
            ],
            "_not": [
                815
            ],
            "_or": [
                815
            ],
            "bio": [
                646
            ],
            "chats": [
                62
            ],
            "chatsAggregate": [
                56
            ],
            "dateJoined": [
                754
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
            ],
            "followers": [
                617
            ],
            "followersAggregate": [
                611
            ],
            "following": [
                617
            ],
            "followingAggregate": [
                611
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
                754
            ],
            "password": [
                646
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "prompts": [
                548
            ],
            "promptsAggregate": [
                542
            ],
            "referrals": [
                592
            ],
            "referralsAggregate": [
                588
            ],
            "referralsByUserId": [
                592
            ],
            "referralsByUserIdAggregate": [
                588
            ],
            "role": [
                825
            ],
            "slug": [
                646
            ],
            "threads": [
                719
            ],
            "threadsAggregate": [
                713
            ],
            "userId": [
                856
            ],
            "userTokens": [
                836
            ],
            "userTokensAggregate": [
                832
            ],
            "username": [
                646
            ],
            "__typename": [
                645
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "bio": [
                645
            ],
            "chats": [
                59
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
            ],
            "followers": [
                614
            ],
            "following": [
                614
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
                879
            ],
            "password": [
                645
            ],
            "preferences": [
                409
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "prompts": [
                545
            ],
            "referrals": [
                591
            ],
            "referralsByUserId": [
                591
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "threads": [
                716
            ],
            "userId": [
                882
            ],
            "userTokens": [
                835
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserMaxFields": {
            "bio": [
                645
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
            ],
            "lastLogin": [
                879
            ],
            "password": [
                645
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "userId": [
                882
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserMinFields": {
            "bio": [
                645
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
            ],
            "lastLogin": [
                879
            ],
            "password": [
                645
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "userId": [
                882
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                812
            ],
            "__typename": [
                645
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                817
            ],
            "onConflict": [
                822
            ],
            "__typename": [
                645
            ]
        },
        "UserOnConflict": {
            "constraint": [
                816
            ],
            "updateColumns": [
                853
            ],
            "where": [
                815
            ],
            "__typename": [
                645
            ]
        },
        "UserOrderBy": {
            "bio": [
                403
            ],
            "chatsAggregate": [
                58
            ],
            "dateJoined": [
                403
            ],
            "email": [
                403
            ],
            "favouriteTopic": [
                403
            ],
            "followersAggregate": [
                613
            ],
            "followingAggregate": [
                613
            ],
            "getFreeMonth": [
                403
            ],
            "isBlocked": [
                403
            ],
            "isVerified": [
                403
            ],
            "lastLogin": [
                403
            ],
            "password": [
                403
            ],
            "preferencesAggregate": [
                408
            ],
            "proUserSubscriptionId": [
                403
            ],
            "profilePicture": [
                403
            ],
            "promptsAggregate": [
                544
            ],
            "referralsAggregate": [
                590
            ],
            "referralsByUserIdAggregate": [
                590
            ],
            "role": [
                403
            ],
            "slug": [
                403
            ],
            "threadsAggregate": [
                715
            ],
            "userId": [
                403
            ],
            "userTokensAggregate": [
                834
            ],
            "username": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserRoleComparisonExp": {
            "_eq": [
                881
            ],
            "_gt": [
                881
            ],
            "_gte": [
                881
            ],
            "_in": [
                881
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                881
            ],
            "_lte": [
                881
            ],
            "_neq": [
                881
            ],
            "_nin": [
                881
            ],
            "__typename": [
                645
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "bio": [
                645
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
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
                879
            ],
            "password": [
                645
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "userId": [
                882
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                829
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "UserStreamCursorValueInput": {
            "bio": [
                645
            ],
            "dateJoined": [
                879
            ],
            "email": [
                645
            ],
            "favouriteTopic": [
                645
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
                879
            ],
            "password": [
                645
            ],
            "proUserSubscriptionId": [
                645
            ],
            "profilePicture": [
                645
            ],
            "role": [
                881
            ],
            "slug": [
                645
            ],
            "userId": [
                882
            ],
            "username": [
                645
            ],
            "__typename": [
                645
            ]
        },
        "UserToken": {
            "token": [
                645
            ],
            "tokenByToken": [
                755
            ],
            "user": [
                812
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                833
            ],
            "nodes": [
                830
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                880
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                839
            ],
            "min": [
                841
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                840
            ],
            "min": [
                842
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                838
            ],
            "onConflict": [
                844
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                836
            ],
            "_not": [
                836
            ],
            "_or": [
                836
            ],
            "token": [
                646
            ],
            "tokenByToken": [
                758
            ],
            "user": [
                815
            ],
            "userId": [
                856
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                645
            ],
            "tokenByToken": [
                764
            ],
            "user": [
                821
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenMaxOrderBy": {
            "token": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenMinFields": {
            "token": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenMinOrderBy": {
            "token": [
                403
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                830
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                837
            ],
            "updateColumns": [
                851
            ],
            "where": [
                836
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                403
            ],
            "tokenByToken": [
                766
            ],
            "user": [
                823
            ],
            "userId": [
                403
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                850
            ],
            "ordering": [
                194
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                645
            ],
            "userId": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                848
            ],
            "where": [
                836
            ],
            "__typename": [
                645
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                827
            ],
            "where": [
                815
            ],
            "__typename": [
                645
            ]
        },
        "UuidArrayComparisonExp": {
            "_containedIn": [
                882
            ],
            "_contains": [
                882
            ],
            "_eq": [
                882
            ],
            "_gt": [
                882
            ],
            "_gte": [
                882
            ],
            "_in": [
                882
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                882
            ],
            "_lte": [
                882
            ],
            "_neq": [
                882
            ],
            "_nin": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                882
            ],
            "_gt": [
                882
            ],
            "_gte": [
                882
            ],
            "_in": [
                882
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                882
            ],
            "_lte": [
                882
            ],
            "_neq": [
                882
            ],
            "_nin": [
                882
            ],
            "__typename": [
                645
            ]
        },
        "categoryEnumAggregateBoolExpCount": {
            "arguments": [
                26
            ],
            "distinct": [
                0
            ],
            "filter": [
                14
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "chatAggregateBoolExpCount": {
            "arguments": [
                74
            ],
            "distinct": [
                0
            ],
            "filter": [
                62
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "chatbotAggregateBoolExpCount": {
            "arguments": [
                155
            ],
            "distinct": [
                0
            ],
            "filter": [
                102
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "chatbotCategoryAggregateBoolExpCount": {
            "arguments": [
                123
            ],
            "distinct": [
                0
            ],
            "filter": [
                111
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "exampleAggregateBoolExpCount": {
            "arguments": [
                236
            ],
            "distinct": [
                0
            ],
            "filter": [
                221
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "jsonb": {},
        "labelChatbotCategoryDomainAggregateBoolExpCount": {
            "arguments": [
                272
            ],
            "distinct": [
                0
            ],
            "filter": [
                260
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "messageAggregateBoolExpCount": {
            "arguments": [
                356
            ],
            "distinct": [
                0
            ],
            "filter": [
                341
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "numeric": {},
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                425
            ],
            "distinct": [
                0
            ],
            "filter": [
                412
            ],
            "predicate": [
                1
            ],
            "__typename": [
                645
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                426
            ],
            "distinct": [
                0
            ],
            "filter": [
                412
            ],
            "predicate": [
                1
            ],
            "__typename": [
                645
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                424
            ],
            "distinct": [
                0
            ],
            "filter": [
                412
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                507
            ],
            "distinct": [
                0
            ],
            "filter": [
                454
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                475
            ],
            "distinct": [
                0
            ],
            "filter": [
                463
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                560
            ],
            "distinct": [
                0
            ],
            "filter": [
                548
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "referralAggregateBoolExpCount": {
            "arguments": [
                603
            ],
            "distinct": [
                0
            ],
            "filter": [
                592
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "socialFollowingAggregateBoolExpCount": {
            "arguments": [
                626
            ],
            "distinct": [
                0
            ],
            "filter": [
                617
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "subcategoryEnumAggregateBoolExpCount": {
            "arguments": [
                665
            ],
            "distinct": [
                0
            ],
            "filter": [
                653
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "tagEnumAggregateBoolExpCount": {
            "arguments": [
                691
            ],
            "distinct": [
                0
            ],
            "filter": [
                679
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                733
            ],
            "distinct": [
                0
            ],
            "filter": [
                719
            ],
            "predicate": [
                1
            ],
            "__typename": [
                645
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                734
            ],
            "distinct": [
                0
            ],
            "filter": [
                719
            ],
            "predicate": [
                1
            ],
            "__typename": [
                645
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                732
            ],
            "distinct": [
                0
            ],
            "filter": [
                719
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                847
            ],
            "distinct": [
                0
            ],
            "filter": [
                836
            ],
            "predicate": [
                244
            ],
            "__typename": [
                645
            ]
        },
        "user_role": {},
        "uuid": {},
        "Query": {
            "category": [
                2,
                {
                    "distinctOn": [
                        41,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        39,
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
                        41,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        39,
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
                        243,
                        "Int!"
                    ]
                }
            ],
            "categoryEnum": [
                8,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "categoryEnumAggregate": [
                9,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "categoryEnumByPk": [
                8,
                {
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "chat": [
                54,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatAggregate": [
                55,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatByPk": [
                54,
                {
                    "chatId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbot": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotByPk": [
                94,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                103,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                104,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                103,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "complexityEnum": [
                175,
                {
                    "distinctOn": [
                        188,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        186,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "complexityEnumAggregate": [
                176,
                {
                    "distinctOn": [
                        188,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        186,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "complexityEnumByPk": [
                175,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "domainEnum": [
                195,
                {
                    "distinctOn": [
                        208,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        206,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        198
                    ]
                }
            ],
            "domainEnumAggregate": [
                196,
                {
                    "distinctOn": [
                        208,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        206,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        198
                    ]
                }
            ],
            "domainEnumByPk": [
                195,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "example": [
                214,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "exampleAggregate": [
                215,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "exampleByPk": [
                214,
                {
                    "exampleId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "label": [
                247,
                {
                    "distinctOn": [
                        302,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        300,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        251
                    ]
                }
            ],
            "labelAggregate": [
                248,
                {
                    "distinctOn": [
                        302,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        300,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        251
                    ]
                }
            ],
            "labelByPk": [
                247,
                {
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryDomain": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "labelChatbotCategoryDomainAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "labelChatbotCategoryDomainByPk": [
                252,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainId": [
                        645,
                        "String!"
                    ],
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "lengthEnum": [
                315,
                {
                    "distinctOn": [
                        328,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        326,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        318
                    ]
                }
            ],
            "lengthEnumAggregate": [
                316,
                {
                    "distinctOn": [
                        328,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        326,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        318
                    ]
                }
            ],
            "lengthEnumByPk": [
                315,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "message": [
                334,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageAggregate": [
                335,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageByPk": [
                334,
                {
                    "messageId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                360,
                {
                    "distinctOn": [
                        373,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        371,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        363
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                361,
                {
                    "distinctOn": [
                        373,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        371,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        363
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                360,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                381,
                {
                    "distinctOn": [
                        396,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        394,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "modelsEnumAggregate": [
                382,
                {
                    "distinctOn": [
                        396,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        394,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "modelsEnumByPk": [
                381,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "preference": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferenceAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferenceByPk": [
                404,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                446,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptAggregate": [
                447,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptByPk": [
                446,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                455,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptChatbotAggregate": [
                456,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptChatbotByPk": [
                455,
                {
                    "chabotId": [
                        243,
                        "Int!"
                    ],
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptTypeEnum": [
                519,
                {
                    "distinctOn": [
                        532,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        530,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        522
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                520,
                {
                    "distinctOn": [
                        532,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        530,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        522
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                519,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                540,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "promptUserAggregate": [
                541,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "promptUserByPk": [
                540,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "referral": [
                586,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralAggregate": [
                587,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralByPk": [
                586,
                {
                    "referralCode": [
                        645,
                        "String!"
                    ]
                }
            ],
            "socialFollowing": [
                609,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "socialFollowingAggregate": [
                610,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnum": [
                647,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                648,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                647,
                {
                    "category": [
                        645,
                        "String!"
                    ],
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "tagEnum": [
                671,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "tagEnumAggregate": [
                672,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "tagEnumByPk": [
                671,
                {
                    "tagId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "thread": [
                711,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadAggregate": [
                712,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadByPk": [
                711,
                {
                    "threadId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                755,
                {
                    "distinctOn": [
                        768,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        766,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        758
                    ]
                }
            ],
            "tokenAggregate": [
                756,
                {
                    "distinctOn": [
                        768,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        766,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        758
                    ]
                }
            ],
            "tokenByPk": [
                755,
                {
                    "token": [
                        645,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                774,
                {
                    "distinctOn": [
                        787,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        785,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        777
                    ]
                }
            ],
            "toneEnumAggregate": [
                775,
                {
                    "distinctOn": [
                        787,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        785,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        777
                    ]
                }
            ],
            "toneEnumByPk": [
                774,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                793,
                {
                    "distinctOn": [
                        806,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        804,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        796
                    ]
                }
            ],
            "typeEnumAggregate": [
                794,
                {
                    "distinctOn": [
                        806,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        804,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        796
                    ]
                }
            ],
            "typeEnumByPk": [
                793,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "user": [
                812,
                {
                    "distinctOn": [
                        826,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        823,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        815
                    ]
                }
            ],
            "userAggregate": [
                813,
                {
                    "distinctOn": [
                        826,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        823,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        815
                    ]
                }
            ],
            "userByPk": [
                812,
                {
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                830,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokenAggregate": [
                831,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokenByPk": [
                830,
                {
                    "token": [
                        645,
                        "String!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "Mutation": {
            "deleteCategory": [
                36,
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
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteCategoryEnum": [
                21,
                {
                    "where": [
                        14,
                        "CategoryEnumBoolExp!"
                    ]
                }
            ],
            "deleteCategoryEnumByPk": [
                8,
                {
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteChat": [
                70,
                {
                    "where": [
                        62,
                        "ChatBoolExp!"
                    ]
                }
            ],
            "deleteChatByPk": [
                54,
                {
                    "chatId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbot": [
                150,
                {
                    "where": [
                        102,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "deleteChatbotByPk": [
                94,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbotCategory": [
                119,
                {
                    "where": [
                        111,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "deleteChatbotCategoryByPk": [
                103,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteComplexityEnum": [
                183,
                {
                    "where": [
                        178,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "deleteComplexityEnumByPk": [
                175,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteDomainEnum": [
                203,
                {
                    "where": [
                        198,
                        "DomainEnumBoolExp!"
                    ]
                }
            ],
            "deleteDomainEnumByPk": [
                195,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteExample": [
                231,
                {
                    "where": [
                        221,
                        "ExampleBoolExp!"
                    ]
                }
            ],
            "deleteExampleByPk": [
                214,
                {
                    "exampleId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteLabel": [
                297,
                {
                    "where": [
                        251,
                        "LabelBoolExp!"
                    ]
                }
            ],
            "deleteLabelByPk": [
                247,
                {
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteLabelChatbotCategoryDomain": [
                268,
                {
                    "where": [
                        260,
                        "LabelChatbotCategoryDomainBoolExp!"
                    ]
                }
            ],
            "deleteLabelChatbotCategoryDomainByPk": [
                252,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainId": [
                        645,
                        "String!"
                    ],
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteLengthEnum": [
                323,
                {
                    "where": [
                        318,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "deleteLengthEnumByPk": [
                315,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteMessage": [
                351,
                {
                    "where": [
                        341,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "deleteMessageByPk": [
                334,
                {
                    "messageId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                368,
                {
                    "where": [
                        363,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                360,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteModelsEnum": [
                391,
                {
                    "where": [
                        384,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "deleteModelsEnumByPk": [
                381,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                420,
                {
                    "where": [
                        412,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                404,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                502,
                {
                    "where": [
                        454,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                446,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                471,
                {
                    "where": [
                        463,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                455,
                {
                    "chabotId": [
                        243,
                        "Int!"
                    ],
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePromptTypeEnum": [
                527,
                {
                    "where": [
                        522,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                519,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                556,
                {
                    "where": [
                        548,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                540,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteReferral": [
                599,
                {
                    "where": [
                        592,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "deleteReferralByPk": [
                586,
                {
                    "referralCode": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteSocialFollowing": [
                624,
                {
                    "where": [
                        617,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnum": [
                660,
                {
                    "where": [
                        653,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnumByPk": [
                647,
                {
                    "category": [
                        645,
                        "String!"
                    ],
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteTagEnum": [
                687,
                {
                    "where": [
                        679,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "deleteTagEnumByPk": [
                671,
                {
                    "tagId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteThread": [
                727,
                {
                    "where": [
                        719,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                711,
                {
                    "threadId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                763,
                {
                    "where": [
                        758,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                755,
                {
                    "token": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                782,
                {
                    "where": [
                        777,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                774,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                801,
                {
                    "where": [
                        796,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                793,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                820,
                {
                    "where": [
                        815,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                812,
                {
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                843,
                {
                    "where": [
                        836,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                830,
                {
                    "token": [
                        645,
                        "String!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "insertCategory": [
                36,
                {
                    "objects": [
                        33,
                        "[CategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        38
                    ]
                }
            ],
            "insertCategoryEnum": [
                21,
                {
                    "objects": [
                        16,
                        "[CategoryEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        23
                    ]
                }
            ],
            "insertCategoryEnumOne": [
                8,
                {
                    "object": [
                        16,
                        "CategoryEnumInsertInput!"
                    ],
                    "onConflict": [
                        23
                    ]
                }
            ],
            "insertCategoryOne": [
                2,
                {
                    "object": [
                        33,
                        "CategoryInsertInput!"
                    ],
                    "onConflict": [
                        38
                    ]
                }
            ],
            "insertChat": [
                70,
                {
                    "objects": [
                        65,
                        "[ChatInsertInput!]!"
                    ],
                    "onConflict": [
                        71
                    ]
                }
            ],
            "insertChatOne": [
                54,
                {
                    "object": [
                        65,
                        "ChatInsertInput!"
                    ],
                    "onConflict": [
                        71
                    ]
                }
            ],
            "insertChatbot": [
                150,
                {
                    "objects": [
                        145,
                        "[ChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        152
                    ]
                }
            ],
            "insertChatbotCategory": [
                119,
                {
                    "objects": [
                        114,
                        "[ChatbotCategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        120
                    ]
                }
            ],
            "insertChatbotCategoryOne": [
                103,
                {
                    "object": [
                        114,
                        "ChatbotCategoryInsertInput!"
                    ],
                    "onConflict": [
                        120
                    ]
                }
            ],
            "insertChatbotOne": [
                94,
                {
                    "object": [
                        145,
                        "ChatbotInsertInput!"
                    ],
                    "onConflict": [
                        152
                    ]
                }
            ],
            "insertComplexityEnum": [
                183,
                {
                    "objects": [
                        180,
                        "[ComplexityEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        185
                    ]
                }
            ],
            "insertComplexityEnumOne": [
                175,
                {
                    "object": [
                        180,
                        "ComplexityEnumInsertInput!"
                    ],
                    "onConflict": [
                        185
                    ]
                }
            ],
            "insertDomainEnum": [
                203,
                {
                    "objects": [
                        200,
                        "[DomainEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        205
                    ]
                }
            ],
            "insertDomainEnumOne": [
                195,
                {
                    "object": [
                        200,
                        "DomainEnumInsertInput!"
                    ],
                    "onConflict": [
                        205
                    ]
                }
            ],
            "insertExample": [
                231,
                {
                    "objects": [
                        226,
                        "[ExampleInsertInput!]!"
                    ],
                    "onConflict": [
                        232
                    ]
                }
            ],
            "insertExampleOne": [
                214,
                {
                    "object": [
                        226,
                        "ExampleInsertInput!"
                    ],
                    "onConflict": [
                        232
                    ]
                }
            ],
            "insertLabel": [
                297,
                {
                    "objects": [
                        294,
                        "[LabelInsertInput!]!"
                    ],
                    "onConflict": [
                        299
                    ]
                }
            ],
            "insertLabelChatbotCategoryDomain": [
                268,
                {
                    "objects": [
                        263,
                        "[LabelChatbotCategoryDomainInsertInput!]!"
                    ],
                    "onConflict": [
                        269
                    ]
                }
            ],
            "insertLabelChatbotCategoryDomainOne": [
                252,
                {
                    "object": [
                        263,
                        "LabelChatbotCategoryDomainInsertInput!"
                    ],
                    "onConflict": [
                        269
                    ]
                }
            ],
            "insertLabelOne": [
                247,
                {
                    "object": [
                        294,
                        "LabelInsertInput!"
                    ],
                    "onConflict": [
                        299
                    ]
                }
            ],
            "insertLengthEnum": [
                323,
                {
                    "objects": [
                        320,
                        "[LengthEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        325
                    ]
                }
            ],
            "insertLengthEnumOne": [
                315,
                {
                    "object": [
                        320,
                        "LengthEnumInsertInput!"
                    ],
                    "onConflict": [
                        325
                    ]
                }
            ],
            "insertMessage": [
                351,
                {
                    "objects": [
                        346,
                        "[MessageInsertInput!]!"
                    ],
                    "onConflict": [
                        352
                    ]
                }
            ],
            "insertMessageOne": [
                334,
                {
                    "object": [
                        346,
                        "MessageInsertInput!"
                    ],
                    "onConflict": [
                        352
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                368,
                {
                    "objects": [
                        365,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        370
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                360,
                {
                    "object": [
                        365,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        370
                    ]
                }
            ],
            "insertModelsEnum": [
                391,
                {
                    "objects": [
                        388,
                        "[ModelsEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        393
                    ]
                }
            ],
            "insertModelsEnumOne": [
                381,
                {
                    "object": [
                        388,
                        "ModelsEnumInsertInput!"
                    ],
                    "onConflict": [
                        393
                    ]
                }
            ],
            "insertPreference": [
                420,
                {
                    "objects": [
                        415,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        421
                    ]
                }
            ],
            "insertPreferenceOne": [
                404,
                {
                    "object": [
                        415,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        421
                    ]
                }
            ],
            "insertPrompt": [
                502,
                {
                    "objects": [
                        497,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        504
                    ]
                }
            ],
            "insertPromptChatbot": [
                471,
                {
                    "objects": [
                        466,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        472
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                455,
                {
                    "object": [
                        466,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        472
                    ]
                }
            ],
            "insertPromptOne": [
                446,
                {
                    "object": [
                        497,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        504
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                527,
                {
                    "objects": [
                        524,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        529
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                519,
                {
                    "object": [
                        524,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        529
                    ]
                }
            ],
            "insertPromptUser": [
                556,
                {
                    "objects": [
                        551,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        557
                    ]
                }
            ],
            "insertPromptUserOne": [
                540,
                {
                    "object": [
                        551,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        557
                    ]
                }
            ],
            "insertReferral": [
                599,
                {
                    "objects": [
                        594,
                        "[ReferralInsertInput!]!"
                    ],
                    "onConflict": [
                        600
                    ]
                }
            ],
            "insertReferralOne": [
                586,
                {
                    "object": [
                        594,
                        "ReferralInsertInput!"
                    ],
                    "onConflict": [
                        600
                    ]
                }
            ],
            "insertSocialFollowing": [
                624,
                {
                    "objects": [
                        619,
                        "[SocialFollowingInsertInput!]!"
                    ]
                }
            ],
            "insertSocialFollowingOne": [
                609,
                {
                    "object": [
                        619,
                        "SocialFollowingInsertInput!"
                    ]
                }
            ],
            "insertSubcategoryEnum": [
                660,
                {
                    "objects": [
                        655,
                        "[SubcategoryEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertSubcategoryEnumOne": [
                647,
                {
                    "object": [
                        655,
                        "SubcategoryEnumInsertInput!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertTagEnum": [
                687,
                {
                    "objects": [
                        682,
                        "[TagEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        688
                    ]
                }
            ],
            "insertTagEnumOne": [
                671,
                {
                    "object": [
                        682,
                        "TagEnumInsertInput!"
                    ],
                    "onConflict": [
                        688
                    ]
                }
            ],
            "insertThread": [
                727,
                {
                    "objects": [
                        722,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        729
                    ]
                }
            ],
            "insertThreadOne": [
                711,
                {
                    "object": [
                        722,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        729
                    ]
                }
            ],
            "insertToken": [
                763,
                {
                    "objects": [
                        760,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        765
                    ]
                }
            ],
            "insertTokenOne": [
                755,
                {
                    "object": [
                        760,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        765
                    ]
                }
            ],
            "insertToneEnum": [
                782,
                {
                    "objects": [
                        779,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        784
                    ]
                }
            ],
            "insertToneEnumOne": [
                774,
                {
                    "object": [
                        779,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        784
                    ]
                }
            ],
            "insertTypeEnum": [
                801,
                {
                    "objects": [
                        798,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        803
                    ]
                }
            ],
            "insertTypeEnumOne": [
                793,
                {
                    "object": [
                        798,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        803
                    ]
                }
            ],
            "insertUser": [
                820,
                {
                    "objects": [
                        817,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        822
                    ]
                }
            ],
            "insertUserOne": [
                812,
                {
                    "object": [
                        817,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        822
                    ]
                }
            ],
            "insertUserToken": [
                843,
                {
                    "objects": [
                        838,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        844
                    ]
                }
            ],
            "insertUserTokenOne": [
                830,
                {
                    "object": [
                        838,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        844
                    ]
                }
            ],
            "updateCategory": [
                36,
                {
                    "_inc": [
                        32
                    ],
                    "_set": [
                        42
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
                        32
                    ],
                    "_set": [
                        42
                    ],
                    "pkColumns": [
                        40,
                        "CategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateCategoryEnum": [
                21,
                {
                    "_set": [
                        27
                    ],
                    "where": [
                        14,
                        "CategoryEnumBoolExp!"
                    ]
                }
            ],
            "updateCategoryEnumByPk": [
                8,
                {
                    "_set": [
                        27
                    ],
                    "pkColumns": [
                        25,
                        "CategoryEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateCategoryEnumMany": [
                21,
                {
                    "updates": [
                        31,
                        "[CategoryEnumUpdates!]!"
                    ]
                }
            ],
            "updateCategoryMany": [
                36,
                {
                    "updates": [
                        50,
                        "[CategoryUpdates!]!"
                    ]
                }
            ],
            "updateChat": [
                70,
                {
                    "_inc": [
                        64
                    ],
                    "_set": [
                        75
                    ],
                    "where": [
                        62,
                        "ChatBoolExp!"
                    ]
                }
            ],
            "updateChatByPk": [
                54,
                {
                    "_inc": [
                        64
                    ],
                    "_set": [
                        75
                    ],
                    "pkColumns": [
                        73,
                        "ChatPkColumnsInput!"
                    ]
                }
            ],
            "updateChatMany": [
                70,
                {
                    "updates": [
                        87,
                        "[ChatUpdates!]!"
                    ]
                }
            ],
            "updateChatbot": [
                150,
                {
                    "_inc": [
                        144
                    ],
                    "_set": [
                        156
                    ],
                    "where": [
                        102,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "updateChatbotByPk": [
                94,
                {
                    "_inc": [
                        144
                    ],
                    "_set": [
                        156
                    ],
                    "pkColumns": [
                        154,
                        "ChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategory": [
                119,
                {
                    "_inc": [
                        113
                    ],
                    "_set": [
                        124
                    ],
                    "where": [
                        111,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "updateChatbotCategoryByPk": [
                103,
                {
                    "_inc": [
                        113
                    ],
                    "_set": [
                        124
                    ],
                    "pkColumns": [
                        122,
                        "ChatbotCategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategoryMany": [
                119,
                {
                    "updates": [
                        136,
                        "[ChatbotCategoryUpdates!]!"
                    ]
                }
            ],
            "updateChatbotMany": [
                150,
                {
                    "updates": [
                        168,
                        "[ChatbotUpdates!]!"
                    ]
                }
            ],
            "updateComplexityEnum": [
                183,
                {
                    "_set": [
                        189
                    ],
                    "where": [
                        178,
                        "ComplexityEnumBoolExp!"
                    ]
                }
            ],
            "updateComplexityEnumByPk": [
                175,
                {
                    "_set": [
                        189
                    ],
                    "pkColumns": [
                        187,
                        "ComplexityEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateComplexityEnumMany": [
                183,
                {
                    "updates": [
                        193,
                        "[ComplexityEnumUpdates!]!"
                    ]
                }
            ],
            "updateDomainEnum": [
                203,
                {
                    "_set": [
                        209
                    ],
                    "where": [
                        198,
                        "DomainEnumBoolExp!"
                    ]
                }
            ],
            "updateDomainEnumByPk": [
                195,
                {
                    "_set": [
                        209
                    ],
                    "pkColumns": [
                        207,
                        "DomainEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateDomainEnumMany": [
                203,
                {
                    "updates": [
                        213,
                        "[DomainEnumUpdates!]!"
                    ]
                }
            ],
            "updateExample": [
                231,
                {
                    "_append": [
                        219
                    ],
                    "_deleteAtPath": [
                        223
                    ],
                    "_deleteElem": [
                        224
                    ],
                    "_deleteKey": [
                        225
                    ],
                    "_prepend": [
                        235
                    ],
                    "_set": [
                        237
                    ],
                    "where": [
                        221,
                        "ExampleBoolExp!"
                    ]
                }
            ],
            "updateExampleByPk": [
                214,
                {
                    "_append": [
                        219
                    ],
                    "_deleteAtPath": [
                        223
                    ],
                    "_deleteElem": [
                        224
                    ],
                    "_deleteKey": [
                        225
                    ],
                    "_prepend": [
                        235
                    ],
                    "_set": [
                        237
                    ],
                    "pkColumns": [
                        234,
                        "ExamplePkColumnsInput!"
                    ]
                }
            ],
            "updateExampleMany": [
                231,
                {
                    "updates": [
                        241,
                        "[ExampleUpdates!]!"
                    ]
                }
            ],
            "updateLabel": [
                297,
                {
                    "_inc": [
                        293
                    ],
                    "_set": [
                        303
                    ],
                    "where": [
                        251,
                        "LabelBoolExp!"
                    ]
                }
            ],
            "updateLabelByPk": [
                247,
                {
                    "_inc": [
                        293
                    ],
                    "_set": [
                        303
                    ],
                    "pkColumns": [
                        301,
                        "LabelPkColumnsInput!"
                    ]
                }
            ],
            "updateLabelChatbotCategoryDomain": [
                268,
                {
                    "_inc": [
                        262
                    ],
                    "_set": [
                        273
                    ],
                    "where": [
                        260,
                        "LabelChatbotCategoryDomainBoolExp!"
                    ]
                }
            ],
            "updateLabelChatbotCategoryDomainByPk": [
                252,
                {
                    "_inc": [
                        262
                    ],
                    "_set": [
                        273
                    ],
                    "pkColumns": [
                        271,
                        "LabelChatbotCategoryDomainPkColumnsInput!"
                    ]
                }
            ],
            "updateLabelChatbotCategoryDomainMany": [
                268,
                {
                    "updates": [
                        285,
                        "[LabelChatbotCategoryDomainUpdates!]!"
                    ]
                }
            ],
            "updateLabelMany": [
                297,
                {
                    "updates": [
                        311,
                        "[LabelUpdates!]!"
                    ]
                }
            ],
            "updateLengthEnum": [
                323,
                {
                    "_set": [
                        329
                    ],
                    "where": [
                        318,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "updateLengthEnumByPk": [
                315,
                {
                    "_set": [
                        329
                    ],
                    "pkColumns": [
                        327,
                        "LengthEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateLengthEnumMany": [
                323,
                {
                    "updates": [
                        333,
                        "[LengthEnumUpdates!]!"
                    ]
                }
            ],
            "updateMessage": [
                351,
                {
                    "_append": [
                        339
                    ],
                    "_deleteAtPath": [
                        343
                    ],
                    "_deleteElem": [
                        344
                    ],
                    "_deleteKey": [
                        345
                    ],
                    "_prepend": [
                        355
                    ],
                    "_set": [
                        357
                    ],
                    "where": [
                        341,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "updateMessageByPk": [
                334,
                {
                    "_append": [
                        339
                    ],
                    "_deleteAtPath": [
                        343
                    ],
                    "_deleteElem": [
                        344
                    ],
                    "_deleteKey": [
                        345
                    ],
                    "_prepend": [
                        355
                    ],
                    "_set": [
                        357
                    ],
                    "pkColumns": [
                        354,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                351,
                {
                    "updates": [
                        380,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                368,
                {
                    "_set": [
                        374
                    ],
                    "where": [
                        363,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                360,
                {
                    "_set": [
                        374
                    ],
                    "pkColumns": [
                        372,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                368,
                {
                    "updates": [
                        378,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateModelsEnum": [
                391,
                {
                    "_set": [
                        397
                    ],
                    "where": [
                        384,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "updateModelsEnumByPk": [
                381,
                {
                    "_set": [
                        397
                    ],
                    "pkColumns": [
                        395,
                        "ModelsEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateModelsEnumMany": [
                391,
                {
                    "updates": [
                        401,
                        "[ModelsEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                420,
                {
                    "_inc": [
                        414
                    ],
                    "_set": [
                        427
                    ],
                    "where": [
                        412,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                404,
                {
                    "_inc": [
                        414
                    ],
                    "_set": [
                        427
                    ],
                    "pkColumns": [
                        423,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                420,
                {
                    "updates": [
                        439,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                502,
                {
                    "_inc": [
                        496
                    ],
                    "_set": [
                        508
                    ],
                    "where": [
                        454,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                446,
                {
                    "_inc": [
                        496
                    ],
                    "_set": [
                        508
                    ],
                    "pkColumns": [
                        506,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                471,
                {
                    "_inc": [
                        465
                    ],
                    "_set": [
                        476
                    ],
                    "where": [
                        463,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                455,
                {
                    "_inc": [
                        465
                    ],
                    "_set": [
                        476
                    ],
                    "pkColumns": [
                        474,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                471,
                {
                    "updates": [
                        488,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                502,
                {
                    "updates": [
                        539,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                527,
                {
                    "_set": [
                        533
                    ],
                    "where": [
                        522,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                519,
                {
                    "_set": [
                        533
                    ],
                    "pkColumns": [
                        531,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                527,
                {
                    "updates": [
                        537,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                556,
                {
                    "_inc": [
                        550
                    ],
                    "_set": [
                        561
                    ],
                    "where": [
                        548,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                540,
                {
                    "_inc": [
                        550
                    ],
                    "_set": [
                        561
                    ],
                    "pkColumns": [
                        559,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                556,
                {
                    "updates": [
                        573,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateReferral": [
                599,
                {
                    "_set": [
                        604
                    ],
                    "where": [
                        592,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "updateReferralByPk": [
                586,
                {
                    "_set": [
                        604
                    ],
                    "pkColumns": [
                        602,
                        "ReferralPkColumnsInput!"
                    ]
                }
            ],
            "updateReferralMany": [
                599,
                {
                    "updates": [
                        608,
                        "[ReferralUpdates!]!"
                    ]
                }
            ],
            "updateSocialFollowing": [
                624,
                {
                    "_inc": [
                        618
                    ],
                    "_set": [
                        627
                    ],
                    "where": [
                        617,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "updateSocialFollowingMany": [
                624,
                {
                    "updates": [
                        638,
                        "[SocialFollowingUpdates!]!"
                    ]
                }
            ],
            "updateSubcategoryEnum": [
                660,
                {
                    "_set": [
                        666
                    ],
                    "where": [
                        653,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "updateSubcategoryEnumByPk": [
                647,
                {
                    "_set": [
                        666
                    ],
                    "pkColumns": [
                        664,
                        "SubcategoryEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateSubcategoryEnumMany": [
                660,
                {
                    "updates": [
                        670,
                        "[SubcategoryEnumUpdates!]!"
                    ]
                }
            ],
            "updateTagEnum": [
                687,
                {
                    "_inc": [
                        681
                    ],
                    "_set": [
                        692
                    ],
                    "where": [
                        679,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "updateTagEnumByPk": [
                671,
                {
                    "_inc": [
                        681
                    ],
                    "_set": [
                        692
                    ],
                    "pkColumns": [
                        690,
                        "TagEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTagEnumMany": [
                687,
                {
                    "updates": [
                        704,
                        "[TagEnumUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                727,
                {
                    "_inc": [
                        721
                    ],
                    "_set": [
                        735
                    ],
                    "where": [
                        719,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                711,
                {
                    "_inc": [
                        721
                    ],
                    "_set": [
                        735
                    ],
                    "pkColumns": [
                        731,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                727,
                {
                    "updates": [
                        747,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                763,
                {
                    "_set": [
                        769
                    ],
                    "where": [
                        758,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                755,
                {
                    "_set": [
                        769
                    ],
                    "pkColumns": [
                        767,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                763,
                {
                    "updates": [
                        773,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                782,
                {
                    "_set": [
                        788
                    ],
                    "where": [
                        777,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                774,
                {
                    "_set": [
                        788
                    ],
                    "pkColumns": [
                        786,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                782,
                {
                    "updates": [
                        792,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                801,
                {
                    "_set": [
                        807
                    ],
                    "where": [
                        796,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                793,
                {
                    "_set": [
                        807
                    ],
                    "pkColumns": [
                        805,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                801,
                {
                    "updates": [
                        811,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                820,
                {
                    "_set": [
                        827
                    ],
                    "where": [
                        815,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                812,
                {
                    "_set": [
                        827
                    ],
                    "pkColumns": [
                        824,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                820,
                {
                    "updates": [
                        854,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                843,
                {
                    "_set": [
                        848
                    ],
                    "where": [
                        836,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                830,
                {
                    "_set": [
                        848
                    ],
                    "pkColumns": [
                        846,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                843,
                {
                    "updates": [
                        852,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                645
            ]
        },
        "Subscription": {
            "category": [
                2,
                {
                    "distinctOn": [
                        41,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        39,
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
                        41,
                        "[CategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        39,
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
                        243,
                        "Int!"
                    ]
                }
            ],
            "categoryEnum": [
                8,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "categoryEnumAggregate": [
                9,
                {
                    "distinctOn": [
                        26,
                        "[CategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        24,
                        "[CategoryEnumOrderBy!]"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "categoryEnumByPk": [
                8,
                {
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "categoryEnumStream": [
                8,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        28,
                        "[CategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        14
                    ]
                }
            ],
            "categoryStream": [
                2,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        46,
                        "[CategoryStreamCursorInput]!"
                    ],
                    "where": [
                        6
                    ]
                }
            ],
            "chat": [
                54,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatAggregate": [
                55,
                {
                    "distinctOn": [
                        74,
                        "[ChatSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        72,
                        "[ChatOrderBy!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatByPk": [
                54,
                {
                    "chatId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatStream": [
                54,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        82,
                        "[ChatStreamCursorInput]!"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "chatbot": [
                94,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotAggregate": [
                95,
                {
                    "distinctOn": [
                        155,
                        "[ChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        153,
                        "[ChatbotOrderBy!]"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "chatbotByPk": [
                94,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                103,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                104,
                {
                    "distinctOn": [
                        123,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        121,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                103,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategoryStream": [
                103,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        131,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "chatbotStream": [
                94,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        163,
                        "[ChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        102
                    ]
                }
            ],
            "complexityEnum": [
                175,
                {
                    "distinctOn": [
                        188,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        186,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "complexityEnumAggregate": [
                176,
                {
                    "distinctOn": [
                        188,
                        "[ComplexityEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        186,
                        "[ComplexityEnumOrderBy!]"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "complexityEnumByPk": [
                175,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "complexityEnumStream": [
                175,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        190,
                        "[ComplexityEnumStreamCursorInput]!"
                    ],
                    "where": [
                        178
                    ]
                }
            ],
            "domainEnum": [
                195,
                {
                    "distinctOn": [
                        208,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        206,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        198
                    ]
                }
            ],
            "domainEnumAggregate": [
                196,
                {
                    "distinctOn": [
                        208,
                        "[DomainEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        206,
                        "[DomainEnumOrderBy!]"
                    ],
                    "where": [
                        198
                    ]
                }
            ],
            "domainEnumByPk": [
                195,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "domainEnumStream": [
                195,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        210,
                        "[DomainEnumStreamCursorInput]!"
                    ],
                    "where": [
                        198
                    ]
                }
            ],
            "example": [
                214,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "exampleAggregate": [
                215,
                {
                    "distinctOn": [
                        236,
                        "[ExampleSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        233,
                        "[ExampleOrderBy!]"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "exampleByPk": [
                214,
                {
                    "exampleId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "exampleStream": [
                214,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        238,
                        "[ExampleStreamCursorInput]!"
                    ],
                    "where": [
                        221
                    ]
                }
            ],
            "label": [
                247,
                {
                    "distinctOn": [
                        302,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        300,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        251
                    ]
                }
            ],
            "labelAggregate": [
                248,
                {
                    "distinctOn": [
                        302,
                        "[LabelSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        300,
                        "[LabelOrderBy!]"
                    ],
                    "where": [
                        251
                    ]
                }
            ],
            "labelByPk": [
                247,
                {
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryDomain": [
                252,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "labelChatbotCategoryDomainAggregate": [
                253,
                {
                    "distinctOn": [
                        272,
                        "[LabelChatbotCategoryDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        270,
                        "[LabelChatbotCategoryDomainOrderBy!]"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "labelChatbotCategoryDomainByPk": [
                252,
                {
                    "categoryId": [
                        243,
                        "Int!"
                    ],
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainId": [
                        645,
                        "String!"
                    ],
                    "labelId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "labelChatbotCategoryDomainStream": [
                252,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        280,
                        "[LabelChatbotCategoryDomainStreamCursorInput]!"
                    ],
                    "where": [
                        260
                    ]
                }
            ],
            "labelStream": [
                247,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        307,
                        "[LabelStreamCursorInput]!"
                    ],
                    "where": [
                        251
                    ]
                }
            ],
            "lengthEnum": [
                315,
                {
                    "distinctOn": [
                        328,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        326,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        318
                    ]
                }
            ],
            "lengthEnumAggregate": [
                316,
                {
                    "distinctOn": [
                        328,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        326,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        318
                    ]
                }
            ],
            "lengthEnumByPk": [
                315,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                315,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        330,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        318
                    ]
                }
            ],
            "message": [
                334,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageAggregate": [
                335,
                {
                    "distinctOn": [
                        356,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        353,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageByPk": [
                334,
                {
                    "messageId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "messageStream": [
                334,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        358,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageTypeEnum": [
                360,
                {
                    "distinctOn": [
                        373,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        371,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        363
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                361,
                {
                    "distinctOn": [
                        373,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        371,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        363
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                360,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                360,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        375,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        363
                    ]
                }
            ],
            "modelsEnum": [
                381,
                {
                    "distinctOn": [
                        396,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        394,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "modelsEnumAggregate": [
                382,
                {
                    "distinctOn": [
                        396,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        394,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "modelsEnumByPk": [
                381,
                {
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                381,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        398,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        384
                    ]
                }
            ],
            "preference": [
                404,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferenceAggregate": [
                405,
                {
                    "distinctOn": [
                        424,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        422,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "preferenceByPk": [
                404,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                404,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        434,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        412
                    ]
                }
            ],
            "prompt": [
                446,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptAggregate": [
                447,
                {
                    "distinctOn": [
                        507,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        505,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptByPk": [
                446,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                455,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptChatbotAggregate": [
                456,
                {
                    "distinctOn": [
                        475,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        473,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptChatbotByPk": [
                455,
                {
                    "chabotId": [
                        243,
                        "Int!"
                    ],
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbotStream": [
                455,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        483,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        463
                    ]
                }
            ],
            "promptStream": [
                446,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        515,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        454
                    ]
                }
            ],
            "promptTypeEnum": [
                519,
                {
                    "distinctOn": [
                        532,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        530,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        522
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                520,
                {
                    "distinctOn": [
                        532,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        530,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        522
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                519,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                519,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        534,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        522
                    ]
                }
            ],
            "promptUser": [
                540,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "promptUserAggregate": [
                541,
                {
                    "distinctOn": [
                        560,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "promptUserByPk": [
                540,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                540,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        568,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        548
                    ]
                }
            ],
            "referral": [
                586,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralAggregate": [
                587,
                {
                    "distinctOn": [
                        603,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        601,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "referralByPk": [
                586,
                {
                    "referralCode": [
                        645,
                        "String!"
                    ]
                }
            ],
            "referralStream": [
                586,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        605,
                        "[ReferralStreamCursorInput]!"
                    ],
                    "where": [
                        592
                    ]
                }
            ],
            "socialFollowing": [
                609,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "socialFollowingAggregate": [
                610,
                {
                    "distinctOn": [
                        626,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        625,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "socialFollowingStream": [
                609,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        634,
                        "[SocialFollowingStreamCursorInput]!"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnum": [
                647,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                648,
                {
                    "distinctOn": [
                        665,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                647,
                {
                    "category": [
                        645,
                        "String!"
                    ],
                    "domain": [
                        645,
                        "String!"
                    ],
                    "name": [
                        645,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnumStream": [
                647,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        667,
                        "[SubcategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        653
                    ]
                }
            ],
            "tagEnum": [
                671,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "tagEnumAggregate": [
                672,
                {
                    "distinctOn": [
                        691,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        689,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "tagEnumByPk": [
                671,
                {
                    "tagId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "tagEnumStream": [
                671,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        699,
                        "[TagEnumStreamCursorInput]!"
                    ],
                    "where": [
                        679
                    ]
                }
            ],
            "thread": [
                711,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadAggregate": [
                712,
                {
                    "distinctOn": [
                        732,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "threadByPk": [
                711,
                {
                    "threadId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                711,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        742,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        719
                    ]
                }
            ],
            "token": [
                755,
                {
                    "distinctOn": [
                        768,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        766,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        758
                    ]
                }
            ],
            "tokenAggregate": [
                756,
                {
                    "distinctOn": [
                        768,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        766,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        758
                    ]
                }
            ],
            "tokenByPk": [
                755,
                {
                    "token": [
                        645,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                755,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        770,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        758
                    ]
                }
            ],
            "toneEnum": [
                774,
                {
                    "distinctOn": [
                        787,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        785,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        777
                    ]
                }
            ],
            "toneEnumAggregate": [
                775,
                {
                    "distinctOn": [
                        787,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        785,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        777
                    ]
                }
            ],
            "toneEnumByPk": [
                774,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                774,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        789,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        777
                    ]
                }
            ],
            "typeEnum": [
                793,
                {
                    "distinctOn": [
                        806,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        804,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        796
                    ]
                }
            ],
            "typeEnumAggregate": [
                794,
                {
                    "distinctOn": [
                        806,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        804,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        796
                    ]
                }
            ],
            "typeEnumByPk": [
                793,
                {
                    "value": [
                        645,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                793,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        808,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        796
                    ]
                }
            ],
            "user": [
                812,
                {
                    "distinctOn": [
                        826,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        823,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        815
                    ]
                }
            ],
            "userAggregate": [
                813,
                {
                    "distinctOn": [
                        826,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        823,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        815
                    ]
                }
            ],
            "userByPk": [
                812,
                {
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                812,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        828,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        815
                    ]
                }
            ],
            "userToken": [
                830,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokenAggregate": [
                831,
                {
                    "distinctOn": [
                        847,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        845,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "userTokenByPk": [
                830,
                {
                    "token": [
                        645,
                        "String!"
                    ],
                    "userId": [
                        882,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                830,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        849,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        836
                    ]
                }
            ],
            "__typename": [
                645
            ]
        }
    }
}