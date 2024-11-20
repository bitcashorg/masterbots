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
        609,
        618,
        629,
        633,
        644,
        655,
        667,
        684,
        696,
        697,
        698,
        710,
        723,
        732,
        736,
        742,
        751,
        755,
        761,
        770,
        774,
        780,
        790,
        801,
        811,
        815,
        817,
        826,
        829,
        842,
        844,
        845
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
                609
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
                609
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
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
                610
            ],
            "__typename": [
                609
            ]
        },
        "CategoryConstraint": {},
        "CategoryEnum": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "domain_enum": [
                195
            ],
            "name": [
                609
            ],
            "subcategoryEnumsAggregate": [
                612,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategory_enums": [
                611,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryEnumAggregateBoolExp": {
            "count": [
                821
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                718
            ],
            "domain": [
                610
            ],
            "domain_enum": [
                198
            ],
            "name": [
                610
            ],
            "subcategory_enums": [
                617
            ],
            "subcategory_enumsAggregate": [
                613
            ],
            "__typename": [
                609
            ]
        },
        "CategoryEnumConstraint": {},
        "CategoryEnumInsertInput": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "domain_enum": [
                204
            ],
            "name": [
                609
            ],
            "subcategory_enums": [
                616
            ],
            "__typename": [
                609
            ]
        },
        "CategoryEnumMaxFields": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryEnumMinFields": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                615
            ],
            "__typename": [
                609
            ]
        },
        "CategoryEnumPkColumnsInput": {
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "CategoryEnumSelectColumn": {},
        "CategoryEnumSetInput": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryEnumStreamCursorValueInput": {
            "added": [
                842
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryIncInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                243
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                243
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                243
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                243
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "Chat": {
            "addedBy": [
                845
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
                609
            ],
            "user": [
                776
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                822
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                820
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
                610
            ],
            "user": [
                779
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                845
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
                609
            ],
            "user": [
                785
            ],
            "__typename": [
                609
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                845
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                845
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                787
            ],
            "__typename": [
                609
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                845
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                845
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "Chatbot": {
            "avatar": [
                609
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
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
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
                609
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
                675,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadsAggregate": [
                676,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "toneEnum": [
                738
            ],
            "typeEnum": [
                757
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                823
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
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
                610
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
                610
            ],
            "defaultComplexity": [
                610
            ],
            "defaultLength": [
                610
            ],
            "defaultTone": [
                610
            ],
            "defaultType": [
                610
            ],
            "description": [
                610
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
                610
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
                683
            ],
            "threadsAggregate": [
                677
            ],
            "toneEnum": [
                741
            ],
            "typeEnum": [
                760
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                824
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                609
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
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
            ],
            "lengthEnum": [
                324
            ],
            "metadataLabels": [
                257
            ],
            "name": [
                609
            ],
            "preferences": [
                409
            ],
            "prompts": [
                460
            ],
            "threads": [
                680
            ],
            "toneEnum": [
                747
            ],
            "typeEnum": [
                766
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                609
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                609
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                679
            ],
            "toneEnum": [
                749
            ],
            "typeEnum": [
                768
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                609
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                609
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                609
            ],
            "defaultComplexity": [
                609
            ],
            "defaultLength": [
                609
            ],
            "defaultTone": [
                609
            ],
            "defaultType": [
                609
            ],
            "description": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                610
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "CursorOrdering": {},
        "DomainEnum": {
            "added": [
                842
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
                609
            ],
            "tagEnumsAggregate": [
                636,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "tag_enums": [
                635,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "__typename": [
                609
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
                609
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
                609
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
                718
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
                610
            ],
            "tag_enums": [
                643
            ],
            "tag_enumsAggregate": [
                637
            ],
            "__typename": [
                609
            ]
        },
        "DomainEnumConstraint": {},
        "DomainEnumInsertInput": {
            "added": [
                842
            ],
            "category_enums": [
                13
            ],
            "label_chatbot_category_domains": [
                257
            ],
            "name": [
                609
            ],
            "tag_enums": [
                640
            ],
            "__typename": [
                609
            ]
        },
        "DomainEnumMaxFields": {
            "added": [
                842
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "DomainEnumMinFields": {
            "added": [
                842
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                639
            ],
            "__typename": [
                609
            ]
        },
        "DomainEnumPkColumnsInput": {
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "DomainEnumSelectColumn": {},
        "DomainEnumSetInput": {
            "added": [
                842
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "DomainEnumStreamCursorValueInput": {
            "added": [
                842
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "Example": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "metadata": [
                826,
                {
                    "path": [
                        609
                    ]
                }
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "subcategory_enum": [
                611
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ExampleAggregateBoolExp": {
            "count": [
                825
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "ExampleAppendInput": {
            "metadata": [
                826
            ],
            "__typename": [
                609
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
                609
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
                718
            ],
            "category": [
                610
            ],
            "domain": [
                610
            ],
            "exampleId": [
                820
            ],
            "metadata": [
                246
            ],
            "prompt": [
                610
            ],
            "response": [
                610
            ],
            "subcategory": [
                610
            ],
            "subcategory_enum": [
                617
            ],
            "tags": [
                819
            ],
            "__typename": [
                609
            ]
        },
        "ExampleConstraint": {},
        "ExampleDeleteAtPathInput": {
            "metadata": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ExampleDeleteElemInput": {
            "metadata": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ExampleDeleteKeyInput": {
            "metadata": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ExampleInsertInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "metadata": [
                826
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "subcategory_enum": [
                625
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ExampleMaxFields": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ExampleMinFields": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                627
            ],
            "tags": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ExamplePkColumnsInput": {
            "exampleId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ExamplePrependInput": {
            "metadata": [
                826
            ],
            "__typename": [
                609
            ]
        },
        "ExampleSelectColumn": {},
        "ExampleSetInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "metadata": [
                826
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ExampleStreamCursorValueInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "exampleId": [
                845
            ],
            "metadata": [
                826
            ],
            "prompt": [
                609
            ],
            "response": [
                609
            ],
            "subcategory": [
                609
            ],
            "tags": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "JsonbCastExp": {
            "String": [
                610
            ],
            "__typename": [
                609
            ]
        },
        "JsonbComparisonExp": {
            "_cast": [
                245
            ],
            "_containedIn": [
                826
            ],
            "_contains": [
                826
            ],
            "_eq": [
                826
            ],
            "_gt": [
                826
            ],
            "_gte": [
                826
            ],
            "_hasKey": [
                609
            ],
            "_hasKeysAll": [
                609
            ],
            "_hasKeysAny": [
                609
            ],
            "_in": [
                826
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                826
            ],
            "_lte": [
                826
            ],
            "_neq": [
                826
            ],
            "_nin": [
                826
            ],
            "__typename": [
                609
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                609
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
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
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
                610
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
                610
            ],
            "subCategories": [
                610
            ],
            "tags": [
                610
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
            ]
        },
        "LabelChatbotCategoryDomainAggregateBoolExp": {
            "count": [
                827
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                610
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
                609
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
                609
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
                609
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
                609
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
                609
            ],
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
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
                609
            ],
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ],
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
            ],
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ],
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                609
            ],
            "labelId": [
                243
            ],
            "metadataLabels": [
                257
            ],
            "questions": [
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LabelMaxFields": {
            "categories": [
                609
            ],
            "labelId": [
                243
            ],
            "questions": [
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LabelMinFields": {
            "categories": [
                609
            ],
            "labelId": [
                243
            ],
            "questions": [
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                609
            ],
            "labelId": [
                243
            ],
            "questions": [
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                609
            ],
            "labelId": [
                243
            ],
            "questions": [
                609
            ],
            "subCategories": [
                609
            ],
            "tags": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LabelSumFields": {
            "labelId": [
                243
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                242
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                610
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "Message": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "examples": [
                826,
                {
                    "path": [
                        609
                    ]
                }
            ],
            "messageId": [
                845
            ],
            "messageTypeEnum": [
                360
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "thread": [
                675
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                828
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "MessageAppendInput": {
            "examples": [
                826
            ],
            "__typename": [
                609
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
                609
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
                820
            ],
            "content": [
                610
            ],
            "createdAt": [
                718
            ],
            "examples": [
                246
            ],
            "messageId": [
                820
            ],
            "messageTypeEnum": [
                363
            ],
            "prompt": [
                610
            ],
            "role": [
                610
            ],
            "thread": [
                683
            ],
            "threadId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "MessageConstraint": {},
        "MessageDeleteAtPathInput": {
            "examples": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "MessageDeleteElemInput": {
            "examples": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "MessageDeleteKeyInput": {
            "examples": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "MessageInsertInput": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "examples": [
                826
            ],
            "messageId": [
                845
            ],
            "messageTypeEnum": [
                369
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "thread": [
                692
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "MessageMaxFields": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "messageId": [
                845
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "MessageMinFields": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "messageId": [
                845
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                694
            ],
            "threadId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "MessagePrependInput": {
            "examples": [
                826
            ],
            "__typename": [
                609
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "examples": [
                826
            ],
            "messageId": [
                845
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "MessageStreamCursorValueInput": {
            "augmentedFrom": [
                845
            ],
            "content": [
                609
            ],
            "createdAt": [
                842
            ],
            "examples": [
                826
            ],
            "messageId": [
                845
            ],
            "prompt": [
                609
            ],
            "role": [
                609
            ],
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                610
            ],
            "__typename": [
                609
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                340
            ],
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "ModelsEnum": {
            "name": [
                609
            ],
            "threads": [
                675,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadsAggregate": [
                676,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                610
            ],
            "threads": [
                683
            ],
            "threadsAggregate": [
                677
            ],
            "value": [
                610
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                609
            ],
            "threads": [
                680
            ],
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                609
            ],
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                609
            ],
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                403
            ],
            "threadsAggregate": [
                679
            ],
            "value": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                609
            ],
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                609
            ],
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "NumericComparisonExp": {
            "_eq": [
                829
            ],
            "_gt": [
                829
            ],
            "_gte": [
                829
            ],
            "_in": [
                829
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                829
            ],
            "_lte": [
                829
            ],
            "_neq": [
                829
            ],
            "_nin": [
                829
            ],
            "__typename": [
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "toneEnum": [
                738
            ],
            "typeEnum": [
                757
            ],
            "user": [
                776
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                830
            ],
            "bool_or": [
                831
            ],
            "count": [
                832
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                610
            ],
            "preferredLength": [
                610
            ],
            "preferredTone": [
                610
            ],
            "preferredType": [
                610
            ],
            "toneEnum": [
                741
            ],
            "typeEnum": [
                760
            ],
            "user": [
                779
            ],
            "userId": [
                820
            ],
            "__typename": [
                609
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
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "toneEnum": [
                747
            ],
            "typeEnum": [
                766
            ],
            "user": [
                785
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                749
            ],
            "typeEnum": [
                768
            ],
            "user": [
                787
            ],
            "userId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                243
            ],
            "__typename": [
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ],
            "preferredLength": [
                609
            ],
            "preferredTone": [
                609
            ],
            "preferredType": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "promptTypeEnum": [
                519
            ],
            "type": [
                609
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
                609
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
                609
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                833
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                610
            ],
            "promptId": [
                244
            ],
            "promptName": [
                610
            ],
            "promptTypeEnum": [
                522
            ],
            "type": [
                610
            ],
            "users": [
                548
            ],
            "usersAggregate": [
                542
            ],
            "__typename": [
                609
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
                609
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
                609
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                834
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                460
            ],
            "content": [
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "promptTypeEnum": [
                528
            ],
            "type": [
                609
            ],
            "users": [
                545
            ],
            "__typename": [
                609
            ]
        },
        "PromptMaxFields": {
            "content": [
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "type": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptMinFields": {
            "content": [
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "type": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "type": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                609
            ],
            "promptId": [
                243
            ],
            "promptName": [
                609
            ],
            "type": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "PromptSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                610
            ],
            "__typename": [
                609
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                451
            ],
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
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
                609
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
                609
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
                776
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                835
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                779
            ],
            "userId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                609
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
                785
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                243
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                243
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                787
            ],
            "userId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                243
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                243
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                243
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "Referral": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "user": [
                776
            ],
            "userByUserId": [
                776
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                836
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                610
            ],
            "referrerId": [
                820
            ],
            "user": [
                779
            ],
            "userByUserId": [
                779
            ],
            "userId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "user": [
                785
            ],
            "userByUserId": [
                785
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                787
            ],
            "userByUserId": [
                787
            ],
            "userId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                609
            ],
            "referrerId": [
                845
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                609
            ],
            "_gt": [
                609
            ],
            "_gte": [
                609
            ],
            "_ilike": [
                609
            ],
            "_in": [
                609
            ],
            "_iregex": [
                609
            ],
            "_isNull": [
                0
            ],
            "_like": [
                609
            ],
            "_lt": [
                609
            ],
            "_lte": [
                609
            ],
            "_neq": [
                609
            ],
            "_nilike": [
                609
            ],
            "_nin": [
                609
            ],
            "_niregex": [
                609
            ],
            "_nlike": [
                609
            ],
            "_nregex": [
                609
            ],
            "_nsimilar": [
                609
            ],
            "_regex": [
                609
            ],
            "_similar": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnum": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "category_enum": [
                8
            ],
            "domain": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumAggregate": {
            "aggregate": [
                614
            ],
            "nodes": [
                611
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumAggregateBoolExp": {
            "count": [
                837
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
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
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                621
            ],
            "min": [
                623
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumArrRelInsertInput": {
            "data": [
                619
            ],
            "onConflict": [
                626
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumBoolExp": {
            "_and": [
                617
            ],
            "_not": [
                617
            ],
            "_or": [
                617
            ],
            "added": [
                718
            ],
            "category": [
                610
            ],
            "category_enum": [
                14
            ],
            "domain": [
                610
            ],
            "examples": [
                221
            ],
            "examplesAggregate": [
                216
            ],
            "name": [
                610
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumConstraint": {},
        "SubcategoryEnumInsertInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "category_enum": [
                22
            ],
            "domain": [
                609
            ],
            "examples": [
                220
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumMaxFields": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "SubcategoryEnumMinFields": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "SubcategoryEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                611
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumObjRelInsertInput": {
            "data": [
                619
            ],
            "onConflict": [
                626
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumOnConflict": {
            "constraint": [
                618
            ],
            "updateColumns": [
                633
            ],
            "where": [
                617
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "SubcategoryEnumPkColumnsInput": {
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumSelectColumn": {},
        "SubcategoryEnumSetInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumStreamCursorInput": {
            "initialValue": [
                632
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumStreamCursorValueInput": {
            "added": [
                842
            ],
            "category": [
                609
            ],
            "domain": [
                609
            ],
            "name": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "SubcategoryEnumUpdateColumn": {},
        "SubcategoryEnumUpdates": {
            "_set": [
                630
            ],
            "where": [
                617
            ],
            "__typename": [
                609
            ]
        },
        "TagEnum": {
            "domain": [
                609
            ],
            "domain_enum": [
                195
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAggregate": {
            "aggregate": [
                638
            ],
            "nodes": [
                635
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAggregateBoolExp": {
            "count": [
                838
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAggregateFields": {
            "avg": [
                641
            ],
            "count": [
                243,
                {
                    "columns": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                647
            ],
            "min": [
                649
            ],
            "stddev": [
                657
            ],
            "stddevPop": [
                659
            ],
            "stddevSamp": [
                661
            ],
            "sum": [
                665
            ],
            "varPop": [
                669
            ],
            "varSamp": [
                671
            ],
            "variance": [
                673
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAggregateOrderBy": {
            "avg": [
                642
            ],
            "count": [
                403
            ],
            "max": [
                648
            ],
            "min": [
                650
            ],
            "stddev": [
                658
            ],
            "stddevPop": [
                660
            ],
            "stddevSamp": [
                662
            ],
            "sum": [
                666
            ],
            "varPop": [
                670
            ],
            "varSamp": [
                672
            ],
            "variance": [
                674
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumArrRelInsertInput": {
            "data": [
                646
            ],
            "onConflict": [
                652
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAvgFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumAvgOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumBoolExp": {
            "_and": [
                643
            ],
            "_not": [
                643
            ],
            "_or": [
                643
            ],
            "domain": [
                610
            ],
            "domain_enum": [
                198
            ],
            "frequency": [
                402
            ],
            "name": [
                610
            ],
            "tagId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumConstraint": {},
        "TagEnumIncInput": {
            "frequency": [
                829
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumInsertInput": {
            "domain": [
                609
            ],
            "domain_enum": [
                204
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumMaxFields": {
            "domain": [
                609
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "TagEnumMinFields": {
            "domain": [
                609
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "TagEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                635
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumOnConflict": {
            "constraint": [
                644
            ],
            "updateColumns": [
                667
            ],
            "where": [
                643
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "TagEnumPkColumnsInput": {
            "tagId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumSelectColumn": {},
        "TagEnumSetInput": {
            "domain": [
                609
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevPopOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStddevSampOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStreamCursorInput": {
            "initialValue": [
                664
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumStreamCursorValueInput": {
            "domain": [
                609
            ],
            "frequency": [
                829
            ],
            "name": [
                609
            ],
            "tagId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumSumFields": {
            "frequency": [
                829
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumSumOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumUpdateColumn": {},
        "TagEnumUpdates": {
            "_inc": [
                645
            ],
            "_set": [
                656
            ],
            "where": [
                643
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarPopOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarSampOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarianceFields": {
            "frequency": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "TagEnumVarianceOrderBy": {
            "frequency": [
                403
            ],
            "__typename": [
                609
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
                842
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
                845
            ],
            "updatedAt": [
                842
            ],
            "user": [
                776
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                678
            ],
            "nodes": [
                675
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                839
            ],
            "bool_or": [
                840
            ],
            "count": [
                841
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                681
            ],
            "count": [
                243,
                {
                    "columns": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                687
            ],
            "min": [
                689
            ],
            "stddev": [
                700
            ],
            "stddevPop": [
                702
            ],
            "stddevSamp": [
                704
            ],
            "sum": [
                708
            ],
            "varPop": [
                712
            ],
            "varSamp": [
                714
            ],
            "variance": [
                716
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                682
            ],
            "count": [
                403
            ],
            "max": [
                688
            ],
            "min": [
                690
            ],
            "stddev": [
                701
            ],
            "stddevPop": [
                703
            ],
            "stddevSamp": [
                705
            ],
            "sum": [
                709
            ],
            "varPop": [
                713
            ],
            "varSamp": [
                715
            ],
            "variance": [
                717
            ],
            "__typename": [
                609
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                686
            ],
            "onConflict": [
                693
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                683
            ],
            "_not": [
                683
            ],
            "_or": [
                683
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "createdAt": [
                718
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
                820
            ],
            "updatedAt": [
                718
            ],
            "user": [
                779
            ],
            "userId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                609
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
                842
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
                845
            ],
            "updatedAt": [
                842
            ],
            "user": [
                785
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                842
            ],
            "threadId": [
                845
            ],
            "updatedAt": [
                842
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                842
            ],
            "threadId": [
                845
            ],
            "updatedAt": [
                842
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                675
            ],
            "__typename": [
                609
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                686
            ],
            "onConflict": [
                693
            ],
            "__typename": [
                609
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                684
            ],
            "updateColumns": [
                710
            ],
            "where": [
                683
            ],
            "__typename": [
                609
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
                787
            ],
            "userId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                845
            ],
            "__typename": [
                609
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
                842
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
                845
            ],
            "updatedAt": [
                842
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                707
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                842
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
                845
            ],
            "updatedAt": [
                842
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                609
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                685
            ],
            "_set": [
                699
            ],
            "where": [
                683
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                609
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                842
            ],
            "_gt": [
                842
            ],
            "_gte": [
                842
            ],
            "_in": [
                842
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                842
            ],
            "_lte": [
                842
            ],
            "_neq": [
                842
            ],
            "_nin": [
                842
            ],
            "__typename": [
                609
            ]
        },
        "Token": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "userTokens": [
                794,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokensAggregate": [
                795,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "__typename": [
                609
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                721
            ],
            "nodes": [
                719
            ],
            "__typename": [
                609
            ]
        },
        "TokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        732,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                725
            ],
            "min": [
                726
            ],
            "__typename": [
                609
            ]
        },
        "TokenBoolExp": {
            "_and": [
                722
            ],
            "_not": [
                722
            ],
            "_or": [
                722
            ],
            "token": [
                610
            ],
            "tokenExpiry": [
                718
            ],
            "userTokens": [
                800
            ],
            "userTokensAggregate": [
                796
            ],
            "__typename": [
                609
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "userTokens": [
                799
            ],
            "__typename": [
                609
            ]
        },
        "TokenMaxFields": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "__typename": [
                609
            ]
        },
        "TokenMinFields": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "__typename": [
                609
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                719
            ],
            "__typename": [
                609
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                724
            ],
            "onConflict": [
                729
            ],
            "__typename": [
                609
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                723
            ],
            "updateColumns": [
                736
            ],
            "where": [
                722
            ],
            "__typename": [
                609
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
                798
            ],
            "__typename": [
                609
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "__typename": [
                609
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                735
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                609
            ],
            "tokenExpiry": [
                842
            ],
            "__typename": [
                609
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                733
            ],
            "where": [
                722
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                740
            ],
            "nodes": [
                738
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        751,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                744
            ],
            "min": [
                745
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                741
            ],
            "_not": [
                741
            ],
            "_or": [
                741
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
                610
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                738
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                743
            ],
            "onConflict": [
                748
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                742
            ],
            "updateColumns": [
                755
            ],
            "where": [
                741
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                754
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                752
            ],
            "where": [
                741
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                759
            ],
            "nodes": [
                757
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        770,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                763
            ],
            "min": [
                764
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                760
            ],
            "_not": [
                760
            ],
            "_or": [
                760
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
                610
            ],
            "__typename": [
                609
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
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                757
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                762
            ],
            "onConflict": [
                767
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                761
            ],
            "updateColumns": [
                774
            ],
            "where": [
                760
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                773
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                771
            ],
            "where": [
                760
            ],
            "__typename": [
                609
            ]
        },
        "User": {
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
                842
            ],
            "email": [
                609
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
                842
            ],
            "password": [
                609
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
                609
            ],
            "profilePicture": [
                609
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
                844
            ],
            "slug": [
                609
            ],
            "threads": [
                675,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadsAggregate": [
                676,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "userId": [
                845
            ],
            "userTokens": [
                794,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokensAggregate": [
                795,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserAggregate": {
            "aggregate": [
                778
            ],
            "nodes": [
                776
            ],
            "__typename": [
                609
            ]
        },
        "UserAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        790,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                782
            ],
            "min": [
                783
            ],
            "__typename": [
                609
            ]
        },
        "UserBoolExp": {
            "_and": [
                779
            ],
            "_not": [
                779
            ],
            "_or": [
                779
            ],
            "chats": [
                62
            ],
            "chatsAggregate": [
                56
            ],
            "dateJoined": [
                718
            ],
            "email": [
                610
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
                718
            ],
            "password": [
                610
            ],
            "preferences": [
                412
            ],
            "preferencesAggregate": [
                406
            ],
            "proUserSubscriptionId": [
                610
            ],
            "profilePicture": [
                610
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
                789
            ],
            "slug": [
                610
            ],
            "threads": [
                683
            ],
            "threadsAggregate": [
                677
            ],
            "userId": [
                820
            ],
            "userTokens": [
                800
            ],
            "userTokensAggregate": [
                796
            ],
            "username": [
                610
            ],
            "__typename": [
                609
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "chats": [
                59
            ],
            "dateJoined": [
                842
            ],
            "email": [
                609
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
                842
            ],
            "password": [
                609
            ],
            "preferences": [
                409
            ],
            "proUserSubscriptionId": [
                609
            ],
            "profilePicture": [
                609
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
                844
            ],
            "slug": [
                609
            ],
            "threads": [
                680
            ],
            "userId": [
                845
            ],
            "userTokens": [
                799
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserMaxFields": {
            "dateJoined": [
                842
            ],
            "email": [
                609
            ],
            "lastLogin": [
                842
            ],
            "password": [
                609
            ],
            "proUserSubscriptionId": [
                609
            ],
            "profilePicture": [
                609
            ],
            "role": [
                844
            ],
            "slug": [
                609
            ],
            "userId": [
                845
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserMinFields": {
            "dateJoined": [
                842
            ],
            "email": [
                609
            ],
            "lastLogin": [
                842
            ],
            "password": [
                609
            ],
            "proUserSubscriptionId": [
                609
            ],
            "profilePicture": [
                609
            ],
            "role": [
                844
            ],
            "slug": [
                609
            ],
            "userId": [
                845
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                776
            ],
            "__typename": [
                609
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                781
            ],
            "onConflict": [
                786
            ],
            "__typename": [
                609
            ]
        },
        "UserOnConflict": {
            "constraint": [
                780
            ],
            "updateColumns": [
                817
            ],
            "where": [
                779
            ],
            "__typename": [
                609
            ]
        },
        "UserOrderBy": {
            "chatsAggregate": [
                58
            ],
            "dateJoined": [
                403
            ],
            "email": [
                403
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
                679
            ],
            "userId": [
                403
            ],
            "userTokensAggregate": [
                798
            ],
            "username": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserRoleComparisonExp": {
            "_eq": [
                844
            ],
            "_gt": [
                844
            ],
            "_gte": [
                844
            ],
            "_in": [
                844
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                844
            ],
            "_lte": [
                844
            ],
            "_neq": [
                844
            ],
            "_nin": [
                844
            ],
            "__typename": [
                609
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "dateJoined": [
                842
            ],
            "email": [
                609
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
                842
            ],
            "password": [
                609
            ],
            "proUserSubscriptionId": [
                609
            ],
            "profilePicture": [
                609
            ],
            "role": [
                844
            ],
            "slug": [
                609
            ],
            "userId": [
                845
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                793
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "UserStreamCursorValueInput": {
            "dateJoined": [
                842
            ],
            "email": [
                609
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
                842
            ],
            "password": [
                609
            ],
            "proUserSubscriptionId": [
                609
            ],
            "profilePicture": [
                609
            ],
            "role": [
                844
            ],
            "slug": [
                609
            ],
            "userId": [
                845
            ],
            "username": [
                609
            ],
            "__typename": [
                609
            ]
        },
        "UserToken": {
            "token": [
                609
            ],
            "tokenByToken": [
                719
            ],
            "user": [
                776
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                797
            ],
            "nodes": [
                794
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                843
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                803
            ],
            "min": [
                805
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                403
            ],
            "max": [
                804
            ],
            "min": [
                806
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                802
            ],
            "onConflict": [
                808
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                800
            ],
            "_not": [
                800
            ],
            "_or": [
                800
            ],
            "token": [
                610
            ],
            "tokenByToken": [
                722
            ],
            "user": [
                779
            ],
            "userId": [
                820
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                609
            ],
            "tokenByToken": [
                728
            ],
            "user": [
                785
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "UserTokenMinFields": {
            "token": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
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
                609
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                794
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                801
            ],
            "updateColumns": [
                815
            ],
            "where": [
                800
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                403
            ],
            "tokenByToken": [
                730
            ],
            "user": [
                787
            ],
            "userId": [
                403
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                814
            ],
            "ordering": [
                194
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                609
            ],
            "userId": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                812
            ],
            "where": [
                800
            ],
            "__typename": [
                609
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                791
            ],
            "where": [
                779
            ],
            "__typename": [
                609
            ]
        },
        "UuidArrayComparisonExp": {
            "_containedIn": [
                845
            ],
            "_contains": [
                845
            ],
            "_eq": [
                845
            ],
            "_gt": [
                845
            ],
            "_gte": [
                845
            ],
            "_in": [
                845
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                845
            ],
            "_lte": [
                845
            ],
            "_neq": [
                845
            ],
            "_nin": [
                845
            ],
            "__typename": [
                609
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                845
            ],
            "_gt": [
                845
            ],
            "_gte": [
                845
            ],
            "_in": [
                845
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                845
            ],
            "_lte": [
                845
            ],
            "_neq": [
                845
            ],
            "_nin": [
                845
            ],
            "__typename": [
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
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
                609
            ]
        },
        "subcategoryEnumAggregateBoolExpCount": {
            "arguments": [
                629
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
                609
            ]
        },
        "tagEnumAggregateBoolExpCount": {
            "arguments": [
                655
            ],
            "distinct": [
                0
            ],
            "filter": [
                643
            ],
            "predicate": [
                244
            ],
            "__typename": [
                609
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                697
            ],
            "distinct": [
                0
            ],
            "filter": [
                683
            ],
            "predicate": [
                1
            ],
            "__typename": [
                609
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                698
            ],
            "distinct": [
                0
            ],
            "filter": [
                683
            ],
            "predicate": [
                1
            ],
            "__typename": [
                609
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                696
            ],
            "distinct": [
                0
            ],
            "filter": [
                683
            ],
            "predicate": [
                244
            ],
            "__typename": [
                609
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                811
            ],
            "distinct": [
                0
            ],
            "filter": [
                800
            ],
            "predicate": [
                244
            ],
            "__typename": [
                609
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
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnum": [
                611,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                612,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                611,
                {
                    "category": [
                        609,
                        "String!"
                    ],
                    "domain": [
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
                        "String!"
                    ]
                }
            ],
            "tagEnum": [
                635,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "tagEnumAggregate": [
                636,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "tagEnumByPk": [
                635,
                {
                    "tagId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "thread": [
                675,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadAggregate": [
                676,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadByPk": [
                675,
                {
                    "threadId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                719,
                {
                    "distinctOn": [
                        732,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        722
                    ]
                }
            ],
            "tokenAggregate": [
                720,
                {
                    "distinctOn": [
                        732,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        722
                    ]
                }
            ],
            "tokenByPk": [
                719,
                {
                    "token": [
                        609,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                738,
                {
                    "distinctOn": [
                        751,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        749,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        741
                    ]
                }
            ],
            "toneEnumAggregate": [
                739,
                {
                    "distinctOn": [
                        751,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        749,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        741
                    ]
                }
            ],
            "toneEnumByPk": [
                738,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                757,
                {
                    "distinctOn": [
                        770,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        768,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        760
                    ]
                }
            ],
            "typeEnumAggregate": [
                758,
                {
                    "distinctOn": [
                        770,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        768,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        760
                    ]
                }
            ],
            "typeEnumByPk": [
                757,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "user": [
                776,
                {
                    "distinctOn": [
                        790,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        787,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        779
                    ]
                }
            ],
            "userAggregate": [
                777,
                {
                    "distinctOn": [
                        790,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        787,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        779
                    ]
                }
            ],
            "userByPk": [
                776,
                {
                    "userId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                794,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokenAggregate": [
                795,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokenByPk": [
                794,
                {
                    "token": [
                        609,
                        "String!"
                    ],
                    "userId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                609
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
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
                        "String!"
                    ]
                }
            ],
            "deleteSubcategoryEnum": [
                624,
                {
                    "where": [
                        617,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnumByPk": [
                611,
                {
                    "category": [
                        609,
                        "String!"
                    ],
                    "domain": [
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
                        "String!"
                    ]
                }
            ],
            "deleteTagEnum": [
                651,
                {
                    "where": [
                        643,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "deleteTagEnumByPk": [
                635,
                {
                    "tagId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "deleteThread": [
                691,
                {
                    "where": [
                        683,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                675,
                {
                    "threadId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                727,
                {
                    "where": [
                        722,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                719,
                {
                    "token": [
                        609,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                746,
                {
                    "where": [
                        741,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                738,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                765,
                {
                    "where": [
                        760,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                757,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                784,
                {
                    "where": [
                        779,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                776,
                {
                    "userId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                807,
                {
                    "where": [
                        800,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                794,
                {
                    "token": [
                        609,
                        "String!"
                    ],
                    "userId": [
                        845,
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
            "insertSubcategoryEnum": [
                624,
                {
                    "objects": [
                        619,
                        "[SubcategoryEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        626
                    ]
                }
            ],
            "insertSubcategoryEnumOne": [
                611,
                {
                    "object": [
                        619,
                        "SubcategoryEnumInsertInput!"
                    ],
                    "onConflict": [
                        626
                    ]
                }
            ],
            "insertTagEnum": [
                651,
                {
                    "objects": [
                        646,
                        "[TagEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        652
                    ]
                }
            ],
            "insertTagEnumOne": [
                635,
                {
                    "object": [
                        646,
                        "TagEnumInsertInput!"
                    ],
                    "onConflict": [
                        652
                    ]
                }
            ],
            "insertThread": [
                691,
                {
                    "objects": [
                        686,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        693
                    ]
                }
            ],
            "insertThreadOne": [
                675,
                {
                    "object": [
                        686,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        693
                    ]
                }
            ],
            "insertToken": [
                727,
                {
                    "objects": [
                        724,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        729
                    ]
                }
            ],
            "insertTokenOne": [
                719,
                {
                    "object": [
                        724,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        729
                    ]
                }
            ],
            "insertToneEnum": [
                746,
                {
                    "objects": [
                        743,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        748
                    ]
                }
            ],
            "insertToneEnumOne": [
                738,
                {
                    "object": [
                        743,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        748
                    ]
                }
            ],
            "insertTypeEnum": [
                765,
                {
                    "objects": [
                        762,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        767
                    ]
                }
            ],
            "insertTypeEnumOne": [
                757,
                {
                    "object": [
                        762,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        767
                    ]
                }
            ],
            "insertUser": [
                784,
                {
                    "objects": [
                        781,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        786
                    ]
                }
            ],
            "insertUserOne": [
                776,
                {
                    "object": [
                        781,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        786
                    ]
                }
            ],
            "insertUserToken": [
                807,
                {
                    "objects": [
                        802,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        808
                    ]
                }
            ],
            "insertUserTokenOne": [
                794,
                {
                    "object": [
                        802,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        808
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
            "updateSubcategoryEnum": [
                624,
                {
                    "_set": [
                        630
                    ],
                    "where": [
                        617,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "updateSubcategoryEnumByPk": [
                611,
                {
                    "_set": [
                        630
                    ],
                    "pkColumns": [
                        628,
                        "SubcategoryEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateSubcategoryEnumMany": [
                624,
                {
                    "updates": [
                        634,
                        "[SubcategoryEnumUpdates!]!"
                    ]
                }
            ],
            "updateTagEnum": [
                651,
                {
                    "_inc": [
                        645
                    ],
                    "_set": [
                        656
                    ],
                    "where": [
                        643,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "updateTagEnumByPk": [
                635,
                {
                    "_inc": [
                        645
                    ],
                    "_set": [
                        656
                    ],
                    "pkColumns": [
                        654,
                        "TagEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTagEnumMany": [
                651,
                {
                    "updates": [
                        668,
                        "[TagEnumUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                691,
                {
                    "_inc": [
                        685
                    ],
                    "_set": [
                        699
                    ],
                    "where": [
                        683,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                675,
                {
                    "_inc": [
                        685
                    ],
                    "_set": [
                        699
                    ],
                    "pkColumns": [
                        695,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                691,
                {
                    "updates": [
                        711,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                727,
                {
                    "_set": [
                        733
                    ],
                    "where": [
                        722,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                719,
                {
                    "_set": [
                        733
                    ],
                    "pkColumns": [
                        731,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                727,
                {
                    "updates": [
                        737,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                746,
                {
                    "_set": [
                        752
                    ],
                    "where": [
                        741,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                738,
                {
                    "_set": [
                        752
                    ],
                    "pkColumns": [
                        750,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                746,
                {
                    "updates": [
                        756,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                765,
                {
                    "_set": [
                        771
                    ],
                    "where": [
                        760,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                757,
                {
                    "_set": [
                        771
                    ],
                    "pkColumns": [
                        769,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                765,
                {
                    "updates": [
                        775,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                784,
                {
                    "_set": [
                        791
                    ],
                    "where": [
                        779,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                776,
                {
                    "_set": [
                        791
                    ],
                    "pkColumns": [
                        788,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                784,
                {
                    "updates": [
                        818,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                807,
                {
                    "_set": [
                        812
                    ],
                    "where": [
                        800,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                794,
                {
                    "_set": [
                        812
                    ],
                    "pkColumns": [
                        810,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                807,
                {
                    "updates": [
                        816,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                609
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
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
                        609,
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
                        609,
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
                        845,
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
                        609,
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
            "subcategoryEnum": [
                611,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                612,
                {
                    "distinctOn": [
                        629,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        627,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                611,
                {
                    "category": [
                        609,
                        "String!"
                    ],
                    "domain": [
                        609,
                        "String!"
                    ],
                    "name": [
                        609,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnumStream": [
                611,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        631,
                        "[SubcategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        617
                    ]
                }
            ],
            "tagEnum": [
                635,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "tagEnumAggregate": [
                636,
                {
                    "distinctOn": [
                        655,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        653,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "tagEnumByPk": [
                635,
                {
                    "tagId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "tagEnumStream": [
                635,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        663,
                        "[TagEnumStreamCursorInput]!"
                    ],
                    "where": [
                        643
                    ]
                }
            ],
            "thread": [
                675,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadAggregate": [
                676,
                {
                    "distinctOn": [
                        696,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        694,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "threadByPk": [
                675,
                {
                    "threadId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                675,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        706,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        683
                    ]
                }
            ],
            "token": [
                719,
                {
                    "distinctOn": [
                        732,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        722
                    ]
                }
            ],
            "tokenAggregate": [
                720,
                {
                    "distinctOn": [
                        732,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        730,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        722
                    ]
                }
            ],
            "tokenByPk": [
                719,
                {
                    "token": [
                        609,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                719,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        734,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        722
                    ]
                }
            ],
            "toneEnum": [
                738,
                {
                    "distinctOn": [
                        751,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        749,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        741
                    ]
                }
            ],
            "toneEnumAggregate": [
                739,
                {
                    "distinctOn": [
                        751,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        749,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        741
                    ]
                }
            ],
            "toneEnumByPk": [
                738,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                738,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        753,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        741
                    ]
                }
            ],
            "typeEnum": [
                757,
                {
                    "distinctOn": [
                        770,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        768,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        760
                    ]
                }
            ],
            "typeEnumAggregate": [
                758,
                {
                    "distinctOn": [
                        770,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        768,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        760
                    ]
                }
            ],
            "typeEnumByPk": [
                757,
                {
                    "value": [
                        609,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                757,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        772,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        760
                    ]
                }
            ],
            "user": [
                776,
                {
                    "distinctOn": [
                        790,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        787,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        779
                    ]
                }
            ],
            "userAggregate": [
                777,
                {
                    "distinctOn": [
                        790,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        787,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        779
                    ]
                }
            ],
            "userByPk": [
                776,
                {
                    "userId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                776,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        792,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        779
                    ]
                }
            ],
            "userToken": [
                794,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokenAggregate": [
                795,
                {
                    "distinctOn": [
                        811,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        809,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "userTokenByPk": [
                794,
                {
                    "token": [
                        609,
                        "String!"
                    ],
                    "userId": [
                        845,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                794,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        813,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        800
                    ]
                }
            ],
            "__typename": [
                609
            ]
        }
    }
}