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
        357,
        365,
        374,
        378,
        380,
        386,
        387,
        397,
        401,
        404,
        414,
        425,
        426,
        427,
        439,
        465,
        476,
        488,
        496,
        508,
        524,
        533,
        537,
        539,
        550,
        561,
        573,
        594,
        604,
        608,
        627,
        646,
        655,
        666,
        670,
        681,
        692,
        704,
        721,
        733,
        734,
        735,
        747,
        760,
        769,
        773,
        779,
        788,
        792,
        798,
        807,
        811,
        817,
        827,
        838,
        848,
        852,
        854,
        863,
        866,
        880,
        882,
        883
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
                646
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
                646
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
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
                647
            ],
            "__typename": [
                646
            ]
        },
        "CategoryConstraint": {},
        "CategoryEnum": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "domain_enum": [
                195
            ],
            "name": [
                646
            ],
            "subcategoryEnumsAggregate": [
                649,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumsByCategoryDomain": [
                648,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                649,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategory_enums": [
                648,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryEnumAggregateBoolExp": {
            "count": [
                858
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryEnumAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                18
            ],
            "min": [
                20
            ],
            "__typename": [
                646
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
                646
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
                755
            ],
            "domain": [
                647
            ],
            "domain_enum": [
                198
            ],
            "name": [
                647
            ],
            "subcategoryEnumsByCategoryDomain": [
                654
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                650
            ],
            "subcategory_enums": [
                654
            ],
            "subcategory_enumsAggregate": [
                650
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumConstraint": {},
        "CategoryEnumInsertInput": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "domain_enum": [
                204
            ],
            "name": [
                646
            ],
            "subcategoryEnumsByCategoryDomain": [
                653
            ],
            "subcategory_enums": [
                653
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumMaxFields": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumMaxOrderBy": {
            "added": [
                404
            ],
            "domain": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumMinFields": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumMinOrderBy": {
            "added": [
                404
            ],
            "domain": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "CategoryEnumOrderBy": {
            "added": [
                404
            ],
            "domain": [
                404
            ],
            "domain_enum": [
                206
            ],
            "name": [
                404
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                652
            ],
            "subcategory_enumsAggregate": [
                652
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumPkColumnsInput": {
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryEnumSelectColumn": {},
        "CategoryEnumSetInput": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryEnumStreamCursorValueInput": {
            "added": [
                880
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryIncInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                646
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
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                243
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                243
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotsAggregate": [
                107
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                243
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                243
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "Chat": {
            "addedBy": [
                883
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
                646
            ],
            "user": [
                813
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatAggregateBoolExp": {
            "count": [
                859
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatAggregateOrderBy": {
            "avg": [
                61
            ],
            "count": [
                404
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
                646
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
                646
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
                646
            ]
        },
        "ChatAvgOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                857
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
                647
            ],
            "user": [
                816
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatInsertInput": {
            "addedBy": [
                883
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
                646
            ],
            "user": [
                822
            ],
            "__typename": [
                646
            ]
        },
        "ChatMaxFields": {
            "addedBy": [
                883
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatMaxOrderBy": {
            "addedBy": [
                404
            ],
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "conversationLink": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatMinFields": {
            "addedBy": [
                883
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatMinOrderBy": {
            "addedBy": [
                404
            ],
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "conversationLink": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ChatOrderBy": {
            "addedBy": [
                404
            ],
            "chatId": [
                404
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                404
            ],
            "conversationLink": [
                404
            ],
            "user": [
                824
            ],
            "__typename": [
                646
            ]
        },
        "ChatPkColumnsInput": {
            "chatId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ChatSelectColumn": {},
        "ChatSetInput": {
            "addedBy": [
                883
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatStddevOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatStddevPopOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatStddevSampOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatStreamCursorValueInput": {
            "addedBy": [
                883
            ],
            "chatId": [
                243
            ],
            "chatbotId": [
                243
            ],
            "conversationLink": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatSumOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ChatVarPopOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatVarSampOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatVarianceOrderBy": {
            "chatId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "Chatbot": {
            "avatar": [
                646
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
            "followers": [
                610,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "followersAggregate": [
                611,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
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
                646
            ],
            "preferences": [
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "prompts": [
                456,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptsAggregate": [
                457,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "threads": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadsAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "toneEnum": [
                775
            ],
            "typeEnum": [
                794
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                860
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                101
            ],
            "count": [
                404
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
                646
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
                646
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                647
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
                647
            ],
            "defaultComplexity": [
                647
            ],
            "defaultLength": [
                647
            ],
            "defaultTone": [
                647
            ],
            "defaultType": [
                647
            ],
            "description": [
                647
            ],
            "followers": [
                618
            ],
            "followersAggregate": [
                612
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
                647
            ],
            "preferences": [
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "prompts": [
                464
            ],
            "promptsAggregate": [
                458
            ],
            "threads": [
                720
            ],
            "threadsAggregate": [
                714
            ],
            "toneEnum": [
                778
            ],
            "typeEnum": [
                797
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                861
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                110
            ],
            "count": [
                404
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
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                39
            ],
            "categoryId": [
                404
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                646
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
            "followers": [
                615
            ],
            "lengthEnum": [
                324
            ],
            "metadataLabels": [
                257
            ],
            "name": [
                646
            ],
            "preferences": [
                410
            ],
            "prompts": [
                461
            ],
            "threads": [
                717
            ],
            "toneEnum": [
                784
            ],
            "typeEnum": [
                803
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                646
            ],
            "chatbotId": [
                243
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
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                404
            ],
            "chatbotId": [
                404
            ],
            "createdBy": [
                404
            ],
            "defaultComplexity": [
                404
            ],
            "defaultLength": [
                404
            ],
            "defaultTone": [
                404
            ],
            "defaultType": [
                404
            ],
            "description": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                646
            ],
            "chatbotId": [
                243
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
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                404
            ],
            "chatbotId": [
                404
            ],
            "createdBy": [
                404
            ],
            "defaultComplexity": [
                404
            ],
            "defaultLength": [
                404
            ],
            "defaultTone": [
                404
            ],
            "defaultType": [
                404
            ],
            "description": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                404
            ],
            "categoriesAggregate": [
                107
            ],
            "chatbotId": [
                404
            ],
            "chatsAggregate": [
                58
            ],
            "complexityEnum": [
                186
            ],
            "createdBy": [
                404
            ],
            "defaultComplexity": [
                404
            ],
            "defaultLength": [
                404
            ],
            "defaultTone": [
                404
            ],
            "defaultType": [
                404
            ],
            "description": [
                404
            ],
            "followersAggregate": [
                614
            ],
            "lengthEnum": [
                326
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "name": [
                404
            ],
            "preferencesAggregate": [
                409
            ],
            "promptsAggregate": [
                460
            ],
            "threadsAggregate": [
                716
            ],
            "toneEnum": [
                786
            ],
            "typeEnum": [
                805
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                646
            ],
            "chatbotId": [
                243
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
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                646
            ],
            "chatbotId": [
                243
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
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
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
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                410
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                409
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "CursorOrdering": {},
        "DomainEnum": {
            "added": [
                880
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
                646
            ],
            "tagEnumsAggregate": [
                673,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "tag_enums": [
                672,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "__typename": [
                646
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
                646
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
                646
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
                755
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
                647
            ],
            "tag_enums": [
                680
            ],
            "tag_enumsAggregate": [
                674
            ],
            "__typename": [
                646
            ]
        },
        "DomainEnumConstraint": {},
        "DomainEnumInsertInput": {
            "added": [
                880
            ],
            "category_enums": [
                13
            ],
            "label_chatbot_category_domains": [
                257
            ],
            "name": [
                646
            ],
            "tag_enums": [
                677
            ],
            "__typename": [
                646
            ]
        },
        "DomainEnumMaxFields": {
            "added": [
                880
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "DomainEnumMinFields": {
            "added": [
                880
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "DomainEnumOrderBy": {
            "added": [
                404
            ],
            "category_enumsAggregate": [
                12
            ],
            "label_chatbot_category_domainsAggregate": [
                256
            ],
            "name": [
                404
            ],
            "tag_enumsAggregate": [
                676
            ],
            "__typename": [
                646
            ]
        },
        "DomainEnumPkColumnsInput": {
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "DomainEnumSelectColumn": {},
        "DomainEnumSetInput": {
            "added": [
                880
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "DomainEnumStreamCursorValueInput": {
            "added": [
                880
            ],
            "name": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "Example": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
            ],
            "metadata": [
                863,
                {
                    "path": [
                        646
                    ]
                }
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
            "subcategoryEnumBySubcategoryCategoryDomain": [
                648
            ],
            "subcategory_enum": [
                648
            ],
            "tags": [
                883
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ExampleAggregateBoolExp": {
            "count": [
                862
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ExampleAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                228
            ],
            "min": [
                230
            ],
            "__typename": [
                646
            ]
        },
        "ExampleAppendInput": {
            "metadata": [
                863
            ],
            "__typename": [
                646
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
                646
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
                755
            ],
            "category": [
                647
            ],
            "domain": [
                647
            ],
            "exampleId": [
                857
            ],
            "metadata": [
                246
            ],
            "prompt": [
                647
            ],
            "response": [
                647
            ],
            "subcategory": [
                647
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                654
            ],
            "subcategory_enum": [
                654
            ],
            "tags": [
                856
            ],
            "__typename": [
                646
            ]
        },
        "ExampleConstraint": {},
        "ExampleDeleteAtPathInput": {
            "metadata": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ExampleDeleteElemInput": {
            "metadata": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ExampleDeleteKeyInput": {
            "metadata": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ExampleInsertInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
            ],
            "metadata": [
                863
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
            "subcategoryEnumBySubcategoryCategoryDomain": [
                662
            ],
            "subcategory_enum": [
                662
            ],
            "tags": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ExampleMaxFields": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
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
            "tags": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ExampleMaxOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "domain": [
                404
            ],
            "exampleId": [
                404
            ],
            "prompt": [
                404
            ],
            "response": [
                404
            ],
            "subcategory": [
                404
            ],
            "tags": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ExampleMinFields": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
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
            "tags": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ExampleMinOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "domain": [
                404
            ],
            "exampleId": [
                404
            ],
            "prompt": [
                404
            ],
            "response": [
                404
            ],
            "subcategory": [
                404
            ],
            "tags": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "ExampleOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "domain": [
                404
            ],
            "exampleId": [
                404
            ],
            "metadata": [
                404
            ],
            "prompt": [
                404
            ],
            "response": [
                404
            ],
            "subcategory": [
                404
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                664
            ],
            "subcategory_enum": [
                664
            ],
            "tags": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ExamplePkColumnsInput": {
            "exampleId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ExamplePrependInput": {
            "metadata": [
                863
            ],
            "__typename": [
                646
            ]
        },
        "ExampleSelectColumn": {},
        "ExampleSetInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
            ],
            "metadata": [
                863
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
            "tags": [
                883
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "ExampleStreamCursorValueInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "exampleId": [
                883
            ],
            "metadata": [
                863
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
            "tags": [
                883
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "JsonbCastExp": {
            "String": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "JsonbComparisonExp": {
            "_cast": [
                245
            ],
            "_containedIn": [
                863
            ],
            "_contains": [
                863
            ],
            "_eq": [
                863
            ],
            "_gt": [
                863
            ],
            "_gte": [
                863
            ],
            "_hasKey": [
                646
            ],
            "_hasKeysAll": [
                646
            ],
            "_hasKeysAny": [
                646
            ],
            "_in": [
                863
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                863
            ],
            "_lte": [
                863
            ],
            "_neq": [
                863
            ],
            "_nin": [
                863
            ],
            "__typename": [
                646
            ]
        },
        "Label": {
            "advancedLabels": [
                0
            ],
            "categories": [
                646
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
                646
            ],
            "subCategories": [
                646
            ],
            "tags": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "LabelAvgFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
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
                647
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
                647
            ],
            "subCategories": [
                647
            ],
            "tags": [
                647
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainAggregateBoolExp": {
            "count": [
                864
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainAggregateOrderBy": {
            "avg": [
                259
            ],
            "count": [
                404
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
                646
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
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainAvgOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                647
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
                646
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
                646
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
                646
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
                646
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
                646
            ],
            "labelId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "LabelChatbotCategoryDomainMaxOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "domainId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ],
            "labelId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "LabelChatbotCategoryDomainMinOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "domainId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainOrderBy": {
            "category": [
                39
            ],
            "categoryId": [
                404
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                404
            ],
            "domainId": [
                404
            ],
            "domain_enum": [
                206
            ],
            "label": [
                300
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ],
            "labelId": [
                243
            ],
            "__typename": [
                646
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
                646
            ],
            "labelId": [
                243
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainStddevOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainStddevPopOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainStddevSampOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ],
            "labelId": [
                243
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainSumOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainVarPopOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainVarSampOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelChatbotCategoryDomainVarianceOrderBy": {
            "categoryId": [
                404
            ],
            "chatbotId": [
                404
            ],
            "labelId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "LabelConstraint": {},
        "LabelIncInput": {
            "labelId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "LabelInsertInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                646
            ],
            "labelId": [
                243
            ],
            "metadataLabels": [
                257
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
                646
            ]
        },
        "LabelMaxFields": {
            "categories": [
                646
            ],
            "labelId": [
                243
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
                646
            ]
        },
        "LabelMinFields": {
            "categories": [
                646
            ],
            "labelId": [
                243
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
                646
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
                646
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
                646
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
                646
            ]
        },
        "LabelOrderBy": {
            "advancedLabels": [
                404
            ],
            "categories": [
                404
            ],
            "labelId": [
                404
            ],
            "metadataLabelsAggregate": [
                256
            ],
            "questions": [
                404
            ],
            "subCategories": [
                404
            ],
            "tags": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "LabelPkColumnsInput": {
            "labelId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "LabelSelectColumn": {},
        "LabelSetInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                646
            ],
            "labelId": [
                243
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
                646
            ]
        },
        "LabelStddevFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "LabelStddevPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "LabelStddevSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelStreamCursorValueInput": {
            "advancedLabels": [
                0
            ],
            "categories": [
                646
            ],
            "labelId": [
                243
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
                646
            ]
        },
        "LabelSumFields": {
            "labelId": [
                243
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LabelVarPopFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "LabelVarSampFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "LabelVarianceFields": {
            "labelId": [
                242
            ],
            "__typename": [
                646
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
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                410
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                409
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "Message": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "examples": [
                863,
                {
                    "path": [
                        646
                    ]
                }
            ],
            "message": [
                334
            ],
            "messageId": [
                883
            ],
            "messageTypeEnum": [
                361
            ],
            "messages": [
                334,
                {
                    "distinctOn": [
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "thread": [
                712
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                865
            ],
            "__typename": [
                646
            ]
        },
        "MessageAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        357,
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
                646
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                348
            ],
            "min": [
                350
            ],
            "__typename": [
                646
            ]
        },
        "MessageAppendInput": {
            "examples": [
                863
            ],
            "__typename": [
                646
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                346
            ],
            "onConflict": [
                353
            ],
            "__typename": [
                646
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
                857
            ],
            "content": [
                647
            ],
            "createdAt": [
                755
            ],
            "examples": [
                246
            ],
            "message": [
                341
            ],
            "messageId": [
                857
            ],
            "messageTypeEnum": [
                364
            ],
            "messages": [
                341
            ],
            "messagesAggregate": [
                336
            ],
            "prompt": [
                647
            ],
            "role": [
                647
            ],
            "thread": [
                720
            ],
            "threadId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "MessageConstraint": {},
        "MessageDeleteAtPathInput": {
            "examples": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageDeleteElemInput": {
            "examples": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "MessageDeleteKeyInput": {
            "examples": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageInsertInput": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "examples": [
                863
            ],
            "message": [
                352
            ],
            "messageId": [
                883
            ],
            "messageTypeEnum": [
                370
            ],
            "messages": [
                340
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "thread": [
                729
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessageMaxFields": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "messageId": [
                883
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessageMaxOrderBy": {
            "augmentedFrom": [
                404
            ],
            "content": [
                404
            ],
            "createdAt": [
                404
            ],
            "messageId": [
                404
            ],
            "prompt": [
                404
            ],
            "role": [
                404
            ],
            "threadId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "MessageMinFields": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "messageId": [
                883
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessageMinOrderBy": {
            "augmentedFrom": [
                404
            ],
            "content": [
                404
            ],
            "createdAt": [
                404
            ],
            "messageId": [
                404
            ],
            "prompt": [
                404
            ],
            "role": [
                404
            ],
            "threadId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "MessageObjRelInsertInput": {
            "data": [
                346
            ],
            "onConflict": [
                353
            ],
            "__typename": [
                646
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                342
            ],
            "updateColumns": [
                380
            ],
            "where": [
                341
            ],
            "__typename": [
                646
            ]
        },
        "MessageOrderBy": {
            "augmentedFrom": [
                404
            ],
            "content": [
                404
            ],
            "createdAt": [
                404
            ],
            "examples": [
                404
            ],
            "message": [
                354
            ],
            "messageId": [
                404
            ],
            "messageTypeEnum": [
                372
            ],
            "messagesAggregate": [
                338
            ],
            "prompt": [
                404
            ],
            "role": [
                404
            ],
            "thread": [
                731
            ],
            "threadId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessagePrependInput": {
            "examples": [
                863
            ],
            "__typename": [
                646
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "examples": [
                863
            ],
            "messageId": [
                883
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                360
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "MessageStreamCursorValueInput": {
            "augmentedFrom": [
                883
            ],
            "content": [
                646
            ],
            "createdAt": [
                880
            ],
            "examples": [
                863
            ],
            "messageId": [
                883
            ],
            "prompt": [
                646
            ],
            "role": [
                646
            ],
            "threadId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                334,
                {
                    "distinctOn": [
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                363
            ],
            "nodes": [
                361
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        374,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                367
            ],
            "min": [
                368
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                364
            ],
            "_not": [
                364
            ],
            "_or": [
                364
            ],
            "messages": [
                341
            ],
            "messagesAggregate": [
                336
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                340
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                361
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumObjRelInsertInput": {
            "data": [
                366
            ],
            "onConflict": [
                371
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                365
            ],
            "updateColumns": [
                378
            ],
            "where": [
                364
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                338
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                377
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                375
            ],
            "where": [
                364
            ],
            "__typename": [
                646
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
                356
            ],
            "_set": [
                358
            ],
            "where": [
                341
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnum": {
            "name": [
                646
            ],
            "threads": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadsAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumAggregate": {
            "aggregate": [
                384
            ],
            "nodes": [
                382
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        397,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                390
            ],
            "min": [
                391
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                385
            ],
            "_not": [
                385
            ],
            "_or": [
                385
            ],
            "name": [
                647
            ],
            "threads": [
                720
            ],
            "threadsAggregate": [
                714
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumConstraint": {},
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                387
            ],
            "_in": [
                387
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                387
            ],
            "_nin": [
                387
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                646
            ],
            "threads": [
                717
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                646
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                646
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                382
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumObjRelInsertInput": {
            "data": [
                389
            ],
            "onConflict": [
                394
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumOnConflict": {
            "constraint": [
                386
            ],
            "updateColumns": [
                401
            ],
            "where": [
                385
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                404
            ],
            "threadsAggregate": [
                716
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                646
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                400
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                646
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ModelsEnumUpdateColumn": {},
        "ModelsEnumUpdates": {
            "_set": [
                398
            ],
            "where": [
                385
            ],
            "__typename": [
                646
            ]
        },
        "NumericComparisonExp": {
            "_eq": [
                866
            ],
            "_gt": [
                866
            ],
            "_gte": [
                866
            ],
            "_in": [
                866
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                866
            ],
            "_lte": [
                866
            ],
            "_neq": [
                866
            ],
            "_nin": [
                866
            ],
            "__typename": [
                646
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
                775
            ],
            "typeEnum": [
                794
            ],
            "user": [
                813
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                408
            ],
            "nodes": [
                405
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                867
            ],
            "bool_or": [
                868
            ],
            "count": [
                869
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                411
            ],
            "count": [
                243,
                {
                    "columns": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                412
            ],
            "count": [
                404
            ],
            "max": [
                418
            ],
            "min": [
                420
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
                442
            ],
            "varSamp": [
                444
            ],
            "variance": [
                446
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                416
            ],
            "onConflict": [
                422
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                413
            ],
            "_not": [
                413
            ],
            "_or": [
                413
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
                647
            ],
            "preferredLength": [
                647
            ],
            "preferredTone": [
                647
            ],
            "preferredType": [
                647
            ],
            "toneEnum": [
                778
            ],
            "typeEnum": [
                797
            ],
            "user": [
                816
            ],
            "userId": [
                857
            ],
            "__typename": [
                646
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
                646
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
                784
            ],
            "typeEnum": [
                803
            ],
            "user": [
                822
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
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
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "preferredComplexity": [
                404
            ],
            "preferredLength": [
                404
            ],
            "preferredTone": [
                404
            ],
            "preferredType": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
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
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "preferredComplexity": [
                404
            ],
            "preferredLength": [
                404
            ],
            "preferredTone": [
                404
            ],
            "preferredType": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                405
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                414
            ],
            "updateColumns": [
                439
            ],
            "where": [
                413
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                404
            ],
            "complexityEnum": [
                186
            ],
            "favorite": [
                404
            ],
            "lengthEnum": [
                326
            ],
            "preferenceId": [
                404
            ],
            "preferredComplexity": [
                404
            ],
            "preferredLength": [
                404
            ],
            "preferredTone": [
                404
            ],
            "preferredType": [
                404
            ],
            "toneEnum": [
                786
            ],
            "typeEnum": [
                805
            ],
            "user": [
                824
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                243
            ],
            "__typename": [
                646
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
            "userId": [
                883
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                436
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
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
            "userId": [
                883
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                415
            ],
            "_set": [
                428
            ],
            "where": [
                413
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                404
            ],
            "preferenceId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "Prompt": {
            "chatbots": [
                456,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "chatbotsAggregate": [
                457,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "promptTypeEnum": [
                520
            ],
            "type": [
                646
            ],
            "users": [
                541,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "usersAggregate": [
                542,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "__typename": [
                646
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                450
            ],
            "nodes": [
                447
            ],
            "__typename": [
                646
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                870
            ],
            "__typename": [
                646
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                453
            ],
            "count": [
                243,
                {
                    "columns": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                454
            ],
            "count": [
                404
            ],
            "max": [
                500
            ],
            "min": [
                502
            ],
            "stddev": [
                511
            ],
            "stddevPop": [
                513
            ],
            "stddevSamp": [
                515
            ],
            "sum": [
                519
            ],
            "varPop": [
                582
            ],
            "varSamp": [
                584
            ],
            "variance": [
                586
            ],
            "__typename": [
                646
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                498
            ],
            "onConflict": [
                505
            ],
            "__typename": [
                646
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptBoolExp": {
            "_and": [
                455
            ],
            "_not": [
                455
            ],
            "_or": [
                455
            ],
            "chatbots": [
                464
            ],
            "chatbotsAggregate": [
                458
            ],
            "content": [
                647
            ],
            "promptId": [
                244
            ],
            "promptName": [
                647
            ],
            "promptTypeEnum": [
                523
            ],
            "type": [
                647
            ],
            "users": [
                549
            ],
            "usersAggregate": [
                543
            ],
            "__typename": [
                646
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
                447
            ],
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                459
            ],
            "nodes": [
                456
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                871
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                462
            ],
            "count": [
                243,
                {
                    "columns": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                463
            ],
            "count": [
                404
            ],
            "max": [
                469
            ],
            "min": [
                471
            ],
            "stddev": [
                479
            ],
            "stddevPop": [
                481
            ],
            "stddevSamp": [
                483
            ],
            "sum": [
                487
            ],
            "varPop": [
                491
            ],
            "varSamp": [
                493
            ],
            "variance": [
                495
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                467
            ],
            "onConflict": [
                473
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                464
            ],
            "_not": [
                464
            ],
            "_or": [
                464
            ],
            "chabotId": [
                244
            ],
            "chatbot": [
                102
            ],
            "prompt": [
                455
            ],
            "promptId": [
                244
            ],
            "__typename": [
                646
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
                646
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
                504
            ],
            "promptId": [
                243
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                456
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                465
            ],
            "updateColumns": [
                488
            ],
            "where": [
                464
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                404
            ],
            "chatbot": [
                153
            ],
            "prompt": [
                506
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                485
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
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
                646
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
                646
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                466
            ],
            "_set": [
                477
            ],
            "where": [
                464
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
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
                646
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                404
            ],
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                461
            ],
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "promptTypeEnum": [
                529
            ],
            "type": [
                646
            ],
            "users": [
                546
            ],
            "__typename": [
                646
            ]
        },
        "PromptMaxFields": {
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "type": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                404
            ],
            "promptId": [
                404
            ],
            "promptName": [
                404
            ],
            "type": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptMinFields": {
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "type": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                404
            ],
            "promptId": [
                404
            ],
            "promptName": [
                404
            ],
            "type": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                447
            ],
            "__typename": [
                646
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                498
            ],
            "onConflict": [
                505
            ],
            "__typename": [
                646
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                496
            ],
            "updateColumns": [
                539
            ],
            "where": [
                455
            ],
            "__typename": [
                646
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                460
            ],
            "content": [
                404
            ],
            "promptId": [
                404
            ],
            "promptName": [
                404
            ],
            "promptTypeEnum": [
                531
            ],
            "type": [
                404
            ],
            "usersAggregate": [
                545
            ],
            "__typename": [
                646
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "type": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                517
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                646
            ],
            "promptId": [
                243
            ],
            "promptName": [
                646
            ],
            "type": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                447,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptsAggregate": [
                448,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                522
            ],
            "nodes": [
                520
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        533,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                526
            ],
            "min": [
                527
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                523
            ],
            "_not": [
                523
            ],
            "_or": [
                523
            ],
            "prompts": [
                455
            ],
            "promptsAggregate": [
                449
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                452
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                520
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                525
            ],
            "onConflict": [
                530
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                524
            ],
            "updateColumns": [
                537
            ],
            "where": [
                523
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                451
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                536
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                534
            ],
            "where": [
                523
            ],
            "__typename": [
                646
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                497
            ],
            "_set": [
                509
            ],
            "where": [
                455
            ],
            "__typename": [
                646
            ]
        },
        "PromptUser": {
            "prompt": [
                447
            ],
            "promptId": [
                243
            ],
            "user": [
                813
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                544
            ],
            "nodes": [
                541
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                872
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                547
            ],
            "count": [
                243,
                {
                    "columns": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                548
            ],
            "count": [
                404
            ],
            "max": [
                554
            ],
            "min": [
                556
            ],
            "stddev": [
                564
            ],
            "stddevPop": [
                566
            ],
            "stddevSamp": [
                568
            ],
            "sum": [
                572
            ],
            "varPop": [
                576
            ],
            "varSamp": [
                578
            ],
            "variance": [
                580
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                552
            ],
            "onConflict": [
                558
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                549
            ],
            "_not": [
                549
            ],
            "_or": [
                549
            ],
            "prompt": [
                455
            ],
            "promptId": [
                244
            ],
            "user": [
                816
            ],
            "userId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                504
            ],
            "promptId": [
                243
            ],
            "user": [
                822
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                243
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                243
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                541
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                550
            ],
            "updateColumns": [
                573
            ],
            "where": [
                549
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                506
            ],
            "promptId": [
                404
            ],
            "user": [
                824
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                243
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                243
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                570
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                243
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                551
            ],
            "_set": [
                562
            ],
            "where": [
                549
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "Referral": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "user": [
                813
            ],
            "userByUserId": [
                813
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralAggregate": {
            "aggregate": [
                590
            ],
            "nodes": [
                587
            ],
            "__typename": [
                646
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                873
            ],
            "__typename": [
                646
            ]
        },
        "ReferralAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                596
            ],
            "min": [
                598
            ],
            "__typename": [
                646
            ]
        },
        "ReferralAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                597
            ],
            "min": [
                599
            ],
            "__typename": [
                646
            ]
        },
        "ReferralArrRelInsertInput": {
            "data": [
                595
            ],
            "onConflict": [
                601
            ],
            "__typename": [
                646
            ]
        },
        "ReferralBoolExp": {
            "_and": [
                593
            ],
            "_not": [
                593
            ],
            "_or": [
                593
            ],
            "referralCode": [
                647
            ],
            "referrerId": [
                857
            ],
            "user": [
                816
            ],
            "userByUserId": [
                816
            ],
            "userId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "user": [
                822
            ],
            "userByUserId": [
                822
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralMaxOrderBy": {
            "referralCode": [
                404
            ],
            "referrerId": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralMinOrderBy": {
            "referralCode": [
                404
            ],
            "referrerId": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ReferralMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                587
            ],
            "__typename": [
                646
            ]
        },
        "ReferralOnConflict": {
            "constraint": [
                594
            ],
            "updateColumns": [
                608
            ],
            "where": [
                593
            ],
            "__typename": [
                646
            ]
        },
        "ReferralOrderBy": {
            "referralCode": [
                404
            ],
            "referrerId": [
                404
            ],
            "user": [
                824
            ],
            "userByUserId": [
                824
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralStreamCursorInput": {
            "initialValue": [
                607
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                646
            ],
            "referrerId": [
                883
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ReferralUpdateColumn": {},
        "ReferralUpdates": {
            "_set": [
                605
            ],
            "where": [
                593
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowing": {
            "chatbot": [
                94
            ],
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "user": [
                813
            ],
            "userByFollowerId": [
                813
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingAggregate": {
            "aggregate": [
                613
            ],
            "nodes": [
                610
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingAggregateBoolExp": {
            "count": [
                874
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingAggregateFields": {
            "avg": [
                616
            ],
            "count": [
                243,
                {
                    "columns": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "SocialFollowingAggregateOrderBy": {
            "avg": [
                617
            ],
            "count": [
                404
            ],
            "max": [
                622
            ],
            "min": [
                624
            ],
            "stddev": [
                630
            ],
            "stddevPop": [
                632
            ],
            "stddevSamp": [
                634
            ],
            "sum": [
                638
            ],
            "varPop": [
                641
            ],
            "varSamp": [
                643
            ],
            "variance": [
                645
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingArrRelInsertInput": {
            "data": [
                620
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingAvgFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingAvgOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingBoolExp": {
            "_and": [
                618
            ],
            "_not": [
                618
            ],
            "_or": [
                618
            ],
            "chatbot": [
                102
            ],
            "createdAt": [
                755
            ],
            "followeeId": [
                857
            ],
            "followeeIdChatbot": [
                244
            ],
            "followerId": [
                857
            ],
            "user": [
                816
            ],
            "userByFollowerId": [
                816
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingIncInput": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingInsertInput": {
            "chatbot": [
                151
            ],
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "user": [
                822
            ],
            "userByFollowerId": [
                822
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingMaxFields": {
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingMaxOrderBy": {
            "createdAt": [
                404
            ],
            "followeeId": [
                404
            ],
            "followeeIdChatbot": [
                404
            ],
            "followerId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingMinFields": {
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingMinOrderBy": {
            "createdAt": [
                404
            ],
            "followeeId": [
                404
            ],
            "followeeIdChatbot": [
                404
            ],
            "followerId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                610
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingOrderBy": {
            "chatbot": [
                153
            ],
            "createdAt": [
                404
            ],
            "followeeId": [
                404
            ],
            "followeeIdChatbot": [
                404
            ],
            "followerId": [
                404
            ],
            "user": [
                824
            ],
            "userByFollowerId": [
                824
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingSelectColumn": {},
        "SocialFollowingSetInput": {
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevPopOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStddevSampOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStreamCursorInput": {
            "initialValue": [
                636
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingStreamCursorValueInput": {
            "createdAt": [
                880
            ],
            "followeeId": [
                883
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingSumFields": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingSumOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingUpdates": {
            "_inc": [
                619
            ],
            "_set": [
                628
            ],
            "where": [
                618
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarPopOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarSampOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarianceFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "SocialFollowingVarianceOrderBy": {
            "followeeIdChatbot": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                646
            ],
            "_gt": [
                646
            ],
            "_gte": [
                646
            ],
            "_ilike": [
                646
            ],
            "_in": [
                646
            ],
            "_iregex": [
                646
            ],
            "_isNull": [
                0
            ],
            "_like": [
                646
            ],
            "_lt": [
                646
            ],
            "_lte": [
                646
            ],
            "_neq": [
                646
            ],
            "_nilike": [
                646
            ],
            "_nin": [
                646
            ],
            "_niregex": [
                646
            ],
            "_nlike": [
                646
            ],
            "_nregex": [
                646
            ],
            "_nsimilar": [
                646
            ],
            "_regex": [
                646
            ],
            "_similar": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnum": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "categoryEnumByDomainCategory": [
                8
            ],
            "category_enum": [
                8
            ],
            "domain": [
                646
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
            "examplesByCategoryDomainSubcategory": [
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
            "examplesByCategoryDomainSubcategoryAggregate": [
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
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumAggregate": {
            "aggregate": [
                651
            ],
            "nodes": [
                648
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumAggregateBoolExp": {
            "count": [
                875
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                657
            ],
            "min": [
                659
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                658
            ],
            "min": [
                660
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumArrRelInsertInput": {
            "data": [
                656
            ],
            "onConflict": [
                663
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumBoolExp": {
            "_and": [
                654
            ],
            "_not": [
                654
            ],
            "_or": [
                654
            ],
            "added": [
                755
            ],
            "category": [
                647
            ],
            "categoryEnumByDomainCategory": [
                14
            ],
            "category_enum": [
                14
            ],
            "domain": [
                647
            ],
            "examples": [
                221
            ],
            "examplesAggregate": [
                216
            ],
            "examplesByCategoryDomainSubcategory": [
                221
            ],
            "examplesByCategoryDomainSubcategoryAggregate": [
                216
            ],
            "name": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumConstraint": {},
        "SubcategoryEnumInsertInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "categoryEnumByDomainCategory": [
                22
            ],
            "category_enum": [
                22
            ],
            "domain": [
                646
            ],
            "examples": [
                220
            ],
            "examplesByCategoryDomainSubcategory": [
                220
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumMaxFields": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumMaxOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "domain": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumMinFields": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumMinOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "domain": [
                404
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                648
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumObjRelInsertInput": {
            "data": [
                656
            ],
            "onConflict": [
                663
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumOnConflict": {
            "constraint": [
                655
            ],
            "updateColumns": [
                670
            ],
            "where": [
                654
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumOrderBy": {
            "added": [
                404
            ],
            "category": [
                404
            ],
            "categoryEnumByDomainCategory": [
                24
            ],
            "category_enum": [
                24
            ],
            "domain": [
                404
            ],
            "examplesAggregate": [
                218
            ],
            "examplesByCategoryDomainSubcategoryAggregate": [
                218
            ],
            "name": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumPkColumnsInput": {
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumSelectColumn": {},
        "SubcategoryEnumSetInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumStreamCursorInput": {
            "initialValue": [
                669
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumStreamCursorValueInput": {
            "added": [
                880
            ],
            "category": [
                646
            ],
            "domain": [
                646
            ],
            "name": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "SubcategoryEnumUpdateColumn": {},
        "SubcategoryEnumUpdates": {
            "_set": [
                667
            ],
            "where": [
                654
            ],
            "__typename": [
                646
            ]
        },
        "TagEnum": {
            "domain": [
                646
            ],
            "domain_enum": [
                195
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumAggregate": {
            "aggregate": [
                675
            ],
            "nodes": [
                672
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumAggregateBoolExp": {
            "count": [
                876
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumAggregateFields": {
            "avg": [
                678
            ],
            "count": [
                243,
                {
                    "columns": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "TagEnumAggregateOrderBy": {
            "avg": [
                679
            ],
            "count": [
                404
            ],
            "max": [
                685
            ],
            "min": [
                687
            ],
            "stddev": [
                695
            ],
            "stddevPop": [
                697
            ],
            "stddevSamp": [
                699
            ],
            "sum": [
                703
            ],
            "varPop": [
                707
            ],
            "varSamp": [
                709
            ],
            "variance": [
                711
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumArrRelInsertInput": {
            "data": [
                683
            ],
            "onConflict": [
                689
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumAvgFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumAvgOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumBoolExp": {
            "_and": [
                680
            ],
            "_not": [
                680
            ],
            "_or": [
                680
            ],
            "domain": [
                647
            ],
            "domain_enum": [
                198
            ],
            "frequency": [
                403
            ],
            "name": [
                647
            ],
            "tagId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumConstraint": {},
        "TagEnumIncInput": {
            "frequency": [
                866
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumInsertInput": {
            "domain": [
                646
            ],
            "domain_enum": [
                204
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumMaxFields": {
            "domain": [
                646
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumMaxOrderBy": {
            "domain": [
                404
            ],
            "frequency": [
                404
            ],
            "name": [
                404
            ],
            "tagId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumMinFields": {
            "domain": [
                646
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumMinOrderBy": {
            "domain": [
                404
            ],
            "frequency": [
                404
            ],
            "name": [
                404
            ],
            "tagId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                672
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumOnConflict": {
            "constraint": [
                681
            ],
            "updateColumns": [
                704
            ],
            "where": [
                680
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumOrderBy": {
            "domain": [
                404
            ],
            "domain_enum": [
                206
            ],
            "frequency": [
                404
            ],
            "name": [
                404
            ],
            "tagId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumPkColumnsInput": {
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumSelectColumn": {},
        "TagEnumSetInput": {
            "domain": [
                646
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevPopOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStddevSampOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStreamCursorInput": {
            "initialValue": [
                701
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumStreamCursorValueInput": {
            "domain": [
                646
            ],
            "frequency": [
                866
            ],
            "name": [
                646
            ],
            "tagId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumSumFields": {
            "frequency": [
                866
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumSumOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumUpdateColumn": {},
        "TagEnumUpdates": {
            "_inc": [
                682
            ],
            "_set": [
                693
            ],
            "where": [
                680
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarPopOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarSampOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarianceFields": {
            "frequency": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "TagEnumVarianceOrderBy": {
            "frequency": [
                404
            ],
            "__typename": [
                646
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
                880
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "model": [
                387
            ],
            "modelsEnum": [
                382
            ],
            "parentThreadId": [
                883
            ],
            "thread": [
                712
            ],
            "threadId": [
                883
            ],
            "threads": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadsAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "updatedAt": [
                880
            ],
            "user": [
                813
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                715
            ],
            "nodes": [
                712
            ],
            "__typename": [
                646
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                877
            ],
            "bool_or": [
                878
            ],
            "count": [
                879
            ],
            "__typename": [
                646
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                718
            ],
            "count": [
                243,
                {
                    "columns": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                646
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                719
            ],
            "count": [
                404
            ],
            "max": [
                725
            ],
            "min": [
                727
            ],
            "stddev": [
                738
            ],
            "stddevPop": [
                740
            ],
            "stddevSamp": [
                742
            ],
            "sum": [
                746
            ],
            "varPop": [
                750
            ],
            "varSamp": [
                752
            ],
            "variance": [
                754
            ],
            "__typename": [
                646
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                723
            ],
            "onConflict": [
                730
            ],
            "__typename": [
                646
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                720
            ],
            "_not": [
                720
            ],
            "_or": [
                720
            ],
            "chatbot": [
                102
            ],
            "chatbotId": [
                244
            ],
            "createdAt": [
                755
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
                388
            ],
            "modelsEnum": [
                385
            ],
            "parentThreadId": [
                857
            ],
            "thread": [
                720
            ],
            "threadId": [
                857
            ],
            "threads": [
                720
            ],
            "threadsAggregate": [
                714
            ],
            "updatedAt": [
                755
            ],
            "user": [
                816
            ],
            "userId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                646
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
                880
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
                387
            ],
            "modelsEnum": [
                393
            ],
            "parentThreadId": [
                883
            ],
            "thread": [
                729
            ],
            "threadId": [
                883
            ],
            "threads": [
                717
            ],
            "updatedAt": [
                880
            ],
            "user": [
                822
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                880
            ],
            "parentThreadId": [
                883
            ],
            "threadId": [
                883
            ],
            "updatedAt": [
                880
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                404
            ],
            "createdAt": [
                404
            ],
            "parentThreadId": [
                404
            ],
            "threadId": [
                404
            ],
            "updatedAt": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                880
            ],
            "parentThreadId": [
                883
            ],
            "threadId": [
                883
            ],
            "updatedAt": [
                880
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                404
            ],
            "createdAt": [
                404
            ],
            "parentThreadId": [
                404
            ],
            "threadId": [
                404
            ],
            "updatedAt": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                712
            ],
            "__typename": [
                646
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                723
            ],
            "onConflict": [
                730
            ],
            "__typename": [
                646
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                721
            ],
            "updateColumns": [
                747
            ],
            "where": [
                720
            ],
            "__typename": [
                646
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                404
            ],
            "createdAt": [
                404
            ],
            "isApproved": [
                404
            ],
            "isBlocked": [
                404
            ],
            "isPublic": [
                404
            ],
            "messagesAggregate": [
                338
            ],
            "model": [
                404
            ],
            "modelsEnum": [
                395
            ],
            "parentThreadId": [
                404
            ],
            "thread": [
                731
            ],
            "threadId": [
                404
            ],
            "threadsAggregate": [
                716
            ],
            "updatedAt": [
                404
            ],
            "user": [
                824
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                883
            ],
            "__typename": [
                646
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
                880
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
                387
            ],
            "parentThreadId": [
                883
            ],
            "threadId": [
                883
            ],
            "updatedAt": [
                880
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                744
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                880
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
                387
            ],
            "parentThreadId": [
                883
            ],
            "threadId": [
                883
            ],
            "updatedAt": [
                880
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                646
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                722
            ],
            "_set": [
                736
            ],
            "where": [
                720
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                646
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                880
            ],
            "_gt": [
                880
            ],
            "_gte": [
                880
            ],
            "_in": [
                880
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                880
            ],
            "_lte": [
                880
            ],
            "_neq": [
                880
            ],
            "_nin": [
                880
            ],
            "__typename": [
                646
            ]
        },
        "Token": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "userTokens": [
                831,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokensAggregate": [
                832,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "__typename": [
                646
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                758
            ],
            "nodes": [
                756
            ],
            "__typename": [
                646
            ]
        },
        "TokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        769,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                762
            ],
            "min": [
                763
            ],
            "__typename": [
                646
            ]
        },
        "TokenBoolExp": {
            "_and": [
                759
            ],
            "_not": [
                759
            ],
            "_or": [
                759
            ],
            "token": [
                647
            ],
            "tokenExpiry": [
                755
            ],
            "userTokens": [
                837
            ],
            "userTokensAggregate": [
                833
            ],
            "__typename": [
                646
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "userTokens": [
                836
            ],
            "__typename": [
                646
            ]
        },
        "TokenMaxFields": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "__typename": [
                646
            ]
        },
        "TokenMinFields": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "__typename": [
                646
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                756
            ],
            "__typename": [
                646
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                761
            ],
            "onConflict": [
                766
            ],
            "__typename": [
                646
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                760
            ],
            "updateColumns": [
                773
            ],
            "where": [
                759
            ],
            "__typename": [
                646
            ]
        },
        "TokenOrderBy": {
            "token": [
                404
            ],
            "tokenExpiry": [
                404
            ],
            "userTokensAggregate": [
                835
            ],
            "__typename": [
                646
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "__typename": [
                646
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                772
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                646
            ],
            "tokenExpiry": [
                880
            ],
            "__typename": [
                646
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                770
            ],
            "where": [
                759
            ],
            "__typename": [
                646
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
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                777
            ],
            "nodes": [
                775
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        788,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                781
            ],
            "min": [
                782
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                778
            ],
            "_not": [
                778
            ],
            "_or": [
                778
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                410
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                775
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                780
            ],
            "onConflict": [
                785
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                779
            ],
            "updateColumns": [
                792
            ],
            "where": [
                778
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                409
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                791
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                789
            ],
            "where": [
                778
            ],
            "__typename": [
                646
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
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                796
            ],
            "nodes": [
                794
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        807,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                800
            ],
            "min": [
                801
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                797
            ],
            "_not": [
                797
            ],
            "_or": [
                797
            ],
            "chatbots": [
                102
            ],
            "chatbotsAggregate": [
                96
            ],
            "preferences": [
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "value": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                99
            ],
            "preferences": [
                410
            ],
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                794
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                799
            ],
            "onConflict": [
                804
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                798
            ],
            "updateColumns": [
                811
            ],
            "where": [
                797
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                98
            ],
            "preferencesAggregate": [
                409
            ],
            "value": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                810
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                808
            ],
            "where": [
                797
            ],
            "__typename": [
                646
            ]
        },
        "User": {
            "bio": [
                646
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
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
            ],
            "followers": [
                610,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "followersAggregate": [
                611,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "following": [
                610,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "followingAggregate": [
                611,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
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
                880
            ],
            "password": [
                646
            ],
            "preferences": [
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferencesAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "prompts": [
                541,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "promptsAggregate": [
                542,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "referrals": [
                587,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralsAggregate": [
                588,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralsByUserId": [
                587,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralsByUserIdAggregate": [
                588,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "threads": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadsAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "userId": [
                883
            ],
            "userTokens": [
                831,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokensAggregate": [
                832,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserAggregate": {
            "aggregate": [
                815
            ],
            "nodes": [
                813
            ],
            "__typename": [
                646
            ]
        },
        "UserAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        827,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                819
            ],
            "min": [
                820
            ],
            "__typename": [
                646
            ]
        },
        "UserBoolExp": {
            "_and": [
                816
            ],
            "_not": [
                816
            ],
            "_or": [
                816
            ],
            "bio": [
                647
            ],
            "chats": [
                62
            ],
            "chatsAggregate": [
                56
            ],
            "dateJoined": [
                755
            ],
            "email": [
                647
            ],
            "favouriteTopic": [
                647
            ],
            "followers": [
                618
            ],
            "followersAggregate": [
                612
            ],
            "following": [
                618
            ],
            "followingAggregate": [
                612
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
                755
            ],
            "password": [
                647
            ],
            "preferences": [
                413
            ],
            "preferencesAggregate": [
                407
            ],
            "proUserSubscriptionId": [
                647
            ],
            "profilePicture": [
                647
            ],
            "prompts": [
                549
            ],
            "promptsAggregate": [
                543
            ],
            "referrals": [
                593
            ],
            "referralsAggregate": [
                589
            ],
            "referralsByUserId": [
                593
            ],
            "referralsByUserIdAggregate": [
                589
            ],
            "role": [
                826
            ],
            "slug": [
                647
            ],
            "threads": [
                720
            ],
            "threadsAggregate": [
                714
            ],
            "userId": [
                857
            ],
            "userTokens": [
                837
            ],
            "userTokensAggregate": [
                833
            ],
            "username": [
                647
            ],
            "__typename": [
                646
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "bio": [
                646
            ],
            "chats": [
                59
            ],
            "dateJoined": [
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
            ],
            "followers": [
                615
            ],
            "following": [
                615
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
                880
            ],
            "password": [
                646
            ],
            "preferences": [
                410
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "prompts": [
                546
            ],
            "referrals": [
                592
            ],
            "referralsByUserId": [
                592
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "threads": [
                717
            ],
            "userId": [
                883
            ],
            "userTokens": [
                836
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserMaxFields": {
            "bio": [
                646
            ],
            "dateJoined": [
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
            ],
            "lastLogin": [
                880
            ],
            "password": [
                646
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "userId": [
                883
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserMinFields": {
            "bio": [
                646
            ],
            "dateJoined": [
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
            ],
            "lastLogin": [
                880
            ],
            "password": [
                646
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "userId": [
                883
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                813
            ],
            "__typename": [
                646
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                818
            ],
            "onConflict": [
                823
            ],
            "__typename": [
                646
            ]
        },
        "UserOnConflict": {
            "constraint": [
                817
            ],
            "updateColumns": [
                854
            ],
            "where": [
                816
            ],
            "__typename": [
                646
            ]
        },
        "UserOrderBy": {
            "bio": [
                404
            ],
            "chatsAggregate": [
                58
            ],
            "dateJoined": [
                404
            ],
            "email": [
                404
            ],
            "favouriteTopic": [
                404
            ],
            "followersAggregate": [
                614
            ],
            "followingAggregate": [
                614
            ],
            "getFreeMonth": [
                404
            ],
            "isBlocked": [
                404
            ],
            "isVerified": [
                404
            ],
            "lastLogin": [
                404
            ],
            "password": [
                404
            ],
            "preferencesAggregate": [
                409
            ],
            "proUserSubscriptionId": [
                404
            ],
            "profilePicture": [
                404
            ],
            "promptsAggregate": [
                545
            ],
            "referralsAggregate": [
                591
            ],
            "referralsByUserIdAggregate": [
                591
            ],
            "role": [
                404
            ],
            "slug": [
                404
            ],
            "threadsAggregate": [
                716
            ],
            "userId": [
                404
            ],
            "userTokensAggregate": [
                835
            ],
            "username": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserRoleComparisonExp": {
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
                646
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "bio": [
                646
            ],
            "dateJoined": [
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
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
                880
            ],
            "password": [
                646
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "userId": [
                883
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                830
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "UserStreamCursorValueInput": {
            "bio": [
                646
            ],
            "dateJoined": [
                880
            ],
            "email": [
                646
            ],
            "favouriteTopic": [
                646
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
                880
            ],
            "password": [
                646
            ],
            "proUserSubscriptionId": [
                646
            ],
            "profilePicture": [
                646
            ],
            "role": [
                882
            ],
            "slug": [
                646
            ],
            "userId": [
                883
            ],
            "username": [
                646
            ],
            "__typename": [
                646
            ]
        },
        "UserToken": {
            "token": [
                646
            ],
            "tokenByToken": [
                756
            ],
            "user": [
                813
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                834
            ],
            "nodes": [
                831
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                881
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                840
            ],
            "min": [
                842
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                404
            ],
            "max": [
                841
            ],
            "min": [
                843
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                839
            ],
            "onConflict": [
                845
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                837
            ],
            "_not": [
                837
            ],
            "_or": [
                837
            ],
            "token": [
                647
            ],
            "tokenByToken": [
                759
            ],
            "user": [
                816
            ],
            "userId": [
                857
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                646
            ],
            "tokenByToken": [
                765
            ],
            "user": [
                822
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                646
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenMaxOrderBy": {
            "token": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenMinFields": {
            "token": [
                646
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenMinOrderBy": {
            "token": [
                404
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                831
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                838
            ],
            "updateColumns": [
                852
            ],
            "where": [
                837
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                404
            ],
            "tokenByToken": [
                767
            ],
            "user": [
                824
            ],
            "userId": [
                404
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                646
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                646
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                851
            ],
            "ordering": [
                194
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                646
            ],
            "userId": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                849
            ],
            "where": [
                837
            ],
            "__typename": [
                646
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                828
            ],
            "where": [
                816
            ],
            "__typename": [
                646
            ]
        },
        "UuidArrayComparisonExp": {
            "_containedIn": [
                883
            ],
            "_contains": [
                883
            ],
            "_eq": [
                883
            ],
            "_gt": [
                883
            ],
            "_gte": [
                883
            ],
            "_in": [
                883
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                883
            ],
            "_lte": [
                883
            ],
            "_neq": [
                883
            ],
            "_nin": [
                883
            ],
            "__typename": [
                646
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                883
            ],
            "_gt": [
                883
            ],
            "_gte": [
                883
            ],
            "_in": [
                883
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                883
            ],
            "_lte": [
                883
            ],
            "_neq": [
                883
            ],
            "_nin": [
                883
            ],
            "__typename": [
                646
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
                646
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
                646
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
                646
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
                646
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
                646
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
                646
            ]
        },
        "messageAggregateBoolExpCount": {
            "arguments": [
                357
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
                646
            ]
        },
        "numeric": {},
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                426
            ],
            "distinct": [
                0
            ],
            "filter": [
                413
            ],
            "predicate": [
                1
            ],
            "__typename": [
                646
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                427
            ],
            "distinct": [
                0
            ],
            "filter": [
                413
            ],
            "predicate": [
                1
            ],
            "__typename": [
                646
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                425
            ],
            "distinct": [
                0
            ],
            "filter": [
                413
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                508
            ],
            "distinct": [
                0
            ],
            "filter": [
                455
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                476
            ],
            "distinct": [
                0
            ],
            "filter": [
                464
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                561
            ],
            "distinct": [
                0
            ],
            "filter": [
                549
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "referralAggregateBoolExpCount": {
            "arguments": [
                604
            ],
            "distinct": [
                0
            ],
            "filter": [
                593
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "socialFollowingAggregateBoolExpCount": {
            "arguments": [
                627
            ],
            "distinct": [
                0
            ],
            "filter": [
                618
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "subcategoryEnumAggregateBoolExpCount": {
            "arguments": [
                666
            ],
            "distinct": [
                0
            ],
            "filter": [
                654
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "tagEnumAggregateBoolExpCount": {
            "arguments": [
                692
            ],
            "distinct": [
                0
            ],
            "filter": [
                680
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                734
            ],
            "distinct": [
                0
            ],
            "filter": [
                720
            ],
            "predicate": [
                1
            ],
            "__typename": [
                646
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                735
            ],
            "distinct": [
                0
            ],
            "filter": [
                720
            ],
            "predicate": [
                1
            ],
            "__typename": [
                646
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                733
            ],
            "distinct": [
                0
            ],
            "filter": [
                720
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                848
            ],
            "distinct": [
                0
            ],
            "filter": [
                837
            ],
            "predicate": [
                244
            ],
            "__typename": [
                646
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
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
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
                        646,
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
                        646,
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
                        883,
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
                        646,
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
                        646,
                        "String!"
                    ]
                }
            ],
            "message": [
                334,
                {
                    "distinctOn": [
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        883,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                361,
                {
                    "distinctOn": [
                        374,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        372,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                362,
                {
                    "distinctOn": [
                        374,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        372,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                361,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                382,
                {
                    "distinctOn": [
                        397,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        395,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        385
                    ]
                }
            ],
            "modelsEnumAggregate": [
                383,
                {
                    "distinctOn": [
                        397,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        395,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        385
                    ]
                }
            ],
            "modelsEnumByPk": [
                382,
                {
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "preference": [
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferenceAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferenceByPk": [
                405,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                447,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptAggregate": [
                448,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptByPk": [
                447,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                456,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptChatbotAggregate": [
                457,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptChatbotByPk": [
                456,
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
                520,
                {
                    "distinctOn": [
                        533,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        531,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        523
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                521,
                {
                    "distinctOn": [
                        533,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        531,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        523
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                520,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                541,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "promptUserAggregate": [
                542,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "promptUserByPk": [
                541,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "referral": [
                587,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralAggregate": [
                588,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralByPk": [
                587,
                {
                    "referralCode": [
                        646,
                        "String!"
                    ]
                }
            ],
            "socialFollowing": [
                610,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "socialFollowingAggregate": [
                611,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "subcategoryEnum": [
                648,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                649,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                648,
                {
                    "category": [
                        646,
                        "String!"
                    ],
                    "domain": [
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "tagEnum": [
                672,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "tagEnumAggregate": [
                673,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "tagEnumByPk": [
                672,
                {
                    "tagId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "thread": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadByPk": [
                712,
                {
                    "threadId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                756,
                {
                    "distinctOn": [
                        769,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        767,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        759
                    ]
                }
            ],
            "tokenAggregate": [
                757,
                {
                    "distinctOn": [
                        769,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        767,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        759
                    ]
                }
            ],
            "tokenByPk": [
                756,
                {
                    "token": [
                        646,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                775,
                {
                    "distinctOn": [
                        788,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        786,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        778
                    ]
                }
            ],
            "toneEnumAggregate": [
                776,
                {
                    "distinctOn": [
                        788,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        786,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        778
                    ]
                }
            ],
            "toneEnumByPk": [
                775,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                794,
                {
                    "distinctOn": [
                        807,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        805,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        797
                    ]
                }
            ],
            "typeEnumAggregate": [
                795,
                {
                    "distinctOn": [
                        807,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        805,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        797
                    ]
                }
            ],
            "typeEnumByPk": [
                794,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "user": [
                813,
                {
                    "distinctOn": [
                        827,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        824,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        816
                    ]
                }
            ],
            "userAggregate": [
                814,
                {
                    "distinctOn": [
                        827,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        824,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        816
                    ]
                }
            ],
            "userByPk": [
                813,
                {
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                831,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokenAggregate": [
                832,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokenByPk": [
                831,
                {
                    "token": [
                        646,
                        "String!"
                    ],
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                646
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
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
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
                        646,
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
                        646,
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
                        883,
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
                        646,
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
                        646,
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
                        883,
                        "uuid!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                369,
                {
                    "where": [
                        364,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                361,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteModelsEnum": [
                392,
                {
                    "where": [
                        385,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "deleteModelsEnumByPk": [
                382,
                {
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                421,
                {
                    "where": [
                        413,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                405,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                503,
                {
                    "where": [
                        455,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                447,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                472,
                {
                    "where": [
                        464,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                456,
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
                528,
                {
                    "where": [
                        523,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                520,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                557,
                {
                    "where": [
                        549,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                541,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "deleteReferral": [
                600,
                {
                    "where": [
                        593,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "deleteReferralByPk": [
                587,
                {
                    "referralCode": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteSocialFollowing": [
                625,
                {
                    "where": [
                        618,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnum": [
                661,
                {
                    "where": [
                        654,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnumByPk": [
                648,
                {
                    "category": [
                        646,
                        "String!"
                    ],
                    "domain": [
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteTagEnum": [
                688,
                {
                    "where": [
                        680,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "deleteTagEnumByPk": [
                672,
                {
                    "tagId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "deleteThread": [
                728,
                {
                    "where": [
                        720,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                712,
                {
                    "threadId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                764,
                {
                    "where": [
                        759,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                756,
                {
                    "token": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                783,
                {
                    "where": [
                        778,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                775,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                802,
                {
                    "where": [
                        797,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                794,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                821,
                {
                    "where": [
                        816,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                813,
                {
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                844,
                {
                    "where": [
                        837,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                831,
                {
                    "token": [
                        646,
                        "String!"
                    ],
                    "userId": [
                        883,
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
                        353
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
                        353
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                369,
                {
                    "objects": [
                        366,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        371
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                361,
                {
                    "object": [
                        366,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        371
                    ]
                }
            ],
            "insertModelsEnum": [
                392,
                {
                    "objects": [
                        389,
                        "[ModelsEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        394
                    ]
                }
            ],
            "insertModelsEnumOne": [
                382,
                {
                    "object": [
                        389,
                        "ModelsEnumInsertInput!"
                    ],
                    "onConflict": [
                        394
                    ]
                }
            ],
            "insertPreference": [
                421,
                {
                    "objects": [
                        416,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        422
                    ]
                }
            ],
            "insertPreferenceOne": [
                405,
                {
                    "object": [
                        416,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        422
                    ]
                }
            ],
            "insertPrompt": [
                503,
                {
                    "objects": [
                        498,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        505
                    ]
                }
            ],
            "insertPromptChatbot": [
                472,
                {
                    "objects": [
                        467,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        473
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                456,
                {
                    "object": [
                        467,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        473
                    ]
                }
            ],
            "insertPromptOne": [
                447,
                {
                    "object": [
                        498,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        505
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                528,
                {
                    "objects": [
                        525,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        530
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                520,
                {
                    "object": [
                        525,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        530
                    ]
                }
            ],
            "insertPromptUser": [
                557,
                {
                    "objects": [
                        552,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        558
                    ]
                }
            ],
            "insertPromptUserOne": [
                541,
                {
                    "object": [
                        552,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        558
                    ]
                }
            ],
            "insertReferral": [
                600,
                {
                    "objects": [
                        595,
                        "[ReferralInsertInput!]!"
                    ],
                    "onConflict": [
                        601
                    ]
                }
            ],
            "insertReferralOne": [
                587,
                {
                    "object": [
                        595,
                        "ReferralInsertInput!"
                    ],
                    "onConflict": [
                        601
                    ]
                }
            ],
            "insertSocialFollowing": [
                625,
                {
                    "objects": [
                        620,
                        "[SocialFollowingInsertInput!]!"
                    ]
                }
            ],
            "insertSocialFollowingOne": [
                610,
                {
                    "object": [
                        620,
                        "SocialFollowingInsertInput!"
                    ]
                }
            ],
            "insertSubcategoryEnum": [
                661,
                {
                    "objects": [
                        656,
                        "[SubcategoryEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        663
                    ]
                }
            ],
            "insertSubcategoryEnumOne": [
                648,
                {
                    "object": [
                        656,
                        "SubcategoryEnumInsertInput!"
                    ],
                    "onConflict": [
                        663
                    ]
                }
            ],
            "insertTagEnum": [
                688,
                {
                    "objects": [
                        683,
                        "[TagEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        689
                    ]
                }
            ],
            "insertTagEnumOne": [
                672,
                {
                    "object": [
                        683,
                        "TagEnumInsertInput!"
                    ],
                    "onConflict": [
                        689
                    ]
                }
            ],
            "insertThread": [
                728,
                {
                    "objects": [
                        723,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        730
                    ]
                }
            ],
            "insertThreadOne": [
                712,
                {
                    "object": [
                        723,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        730
                    ]
                }
            ],
            "insertToken": [
                764,
                {
                    "objects": [
                        761,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        766
                    ]
                }
            ],
            "insertTokenOne": [
                756,
                {
                    "object": [
                        761,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        766
                    ]
                }
            ],
            "insertToneEnum": [
                783,
                {
                    "objects": [
                        780,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        785
                    ]
                }
            ],
            "insertToneEnumOne": [
                775,
                {
                    "object": [
                        780,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        785
                    ]
                }
            ],
            "insertTypeEnum": [
                802,
                {
                    "objects": [
                        799,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        804
                    ]
                }
            ],
            "insertTypeEnumOne": [
                794,
                {
                    "object": [
                        799,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        804
                    ]
                }
            ],
            "insertUser": [
                821,
                {
                    "objects": [
                        818,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        823
                    ]
                }
            ],
            "insertUserOne": [
                813,
                {
                    "object": [
                        818,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        823
                    ]
                }
            ],
            "insertUserToken": [
                844,
                {
                    "objects": [
                        839,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        845
                    ]
                }
            ],
            "insertUserTokenOne": [
                831,
                {
                    "object": [
                        839,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        845
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
                        356
                    ],
                    "_set": [
                        358
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
                        356
                    ],
                    "_set": [
                        358
                    ],
                    "pkColumns": [
                        355,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                351,
                {
                    "updates": [
                        381,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                369,
                {
                    "_set": [
                        375
                    ],
                    "where": [
                        364,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                361,
                {
                    "_set": [
                        375
                    ],
                    "pkColumns": [
                        373,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                369,
                {
                    "updates": [
                        379,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateModelsEnum": [
                392,
                {
                    "_set": [
                        398
                    ],
                    "where": [
                        385,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "updateModelsEnumByPk": [
                382,
                {
                    "_set": [
                        398
                    ],
                    "pkColumns": [
                        396,
                        "ModelsEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateModelsEnumMany": [
                392,
                {
                    "updates": [
                        402,
                        "[ModelsEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                421,
                {
                    "_inc": [
                        415
                    ],
                    "_set": [
                        428
                    ],
                    "where": [
                        413,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                405,
                {
                    "_inc": [
                        415
                    ],
                    "_set": [
                        428
                    ],
                    "pkColumns": [
                        424,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                421,
                {
                    "updates": [
                        440,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                503,
                {
                    "_inc": [
                        497
                    ],
                    "_set": [
                        509
                    ],
                    "where": [
                        455,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                447,
                {
                    "_inc": [
                        497
                    ],
                    "_set": [
                        509
                    ],
                    "pkColumns": [
                        507,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                472,
                {
                    "_inc": [
                        466
                    ],
                    "_set": [
                        477
                    ],
                    "where": [
                        464,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                456,
                {
                    "_inc": [
                        466
                    ],
                    "_set": [
                        477
                    ],
                    "pkColumns": [
                        475,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                472,
                {
                    "updates": [
                        489,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                503,
                {
                    "updates": [
                        540,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                528,
                {
                    "_set": [
                        534
                    ],
                    "where": [
                        523,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                520,
                {
                    "_set": [
                        534
                    ],
                    "pkColumns": [
                        532,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                528,
                {
                    "updates": [
                        538,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                557,
                {
                    "_inc": [
                        551
                    ],
                    "_set": [
                        562
                    ],
                    "where": [
                        549,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                541,
                {
                    "_inc": [
                        551
                    ],
                    "_set": [
                        562
                    ],
                    "pkColumns": [
                        560,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                557,
                {
                    "updates": [
                        574,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateReferral": [
                600,
                {
                    "_set": [
                        605
                    ],
                    "where": [
                        593,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "updateReferralByPk": [
                587,
                {
                    "_set": [
                        605
                    ],
                    "pkColumns": [
                        603,
                        "ReferralPkColumnsInput!"
                    ]
                }
            ],
            "updateReferralMany": [
                600,
                {
                    "updates": [
                        609,
                        "[ReferralUpdates!]!"
                    ]
                }
            ],
            "updateSocialFollowing": [
                625,
                {
                    "_inc": [
                        619
                    ],
                    "_set": [
                        628
                    ],
                    "where": [
                        618,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "updateSocialFollowingMany": [
                625,
                {
                    "updates": [
                        639,
                        "[SocialFollowingUpdates!]!"
                    ]
                }
            ],
            "updateSubcategoryEnum": [
                661,
                {
                    "_set": [
                        667
                    ],
                    "where": [
                        654,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "updateSubcategoryEnumByPk": [
                648,
                {
                    "_set": [
                        667
                    ],
                    "pkColumns": [
                        665,
                        "SubcategoryEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateSubcategoryEnumMany": [
                661,
                {
                    "updates": [
                        671,
                        "[SubcategoryEnumUpdates!]!"
                    ]
                }
            ],
            "updateTagEnum": [
                688,
                {
                    "_inc": [
                        682
                    ],
                    "_set": [
                        693
                    ],
                    "where": [
                        680,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "updateTagEnumByPk": [
                672,
                {
                    "_inc": [
                        682
                    ],
                    "_set": [
                        693
                    ],
                    "pkColumns": [
                        691,
                        "TagEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTagEnumMany": [
                688,
                {
                    "updates": [
                        705,
                        "[TagEnumUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                728,
                {
                    "_inc": [
                        722
                    ],
                    "_set": [
                        736
                    ],
                    "where": [
                        720,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                712,
                {
                    "_inc": [
                        722
                    ],
                    "_set": [
                        736
                    ],
                    "pkColumns": [
                        732,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                728,
                {
                    "updates": [
                        748,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                764,
                {
                    "_set": [
                        770
                    ],
                    "where": [
                        759,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                756,
                {
                    "_set": [
                        770
                    ],
                    "pkColumns": [
                        768,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                764,
                {
                    "updates": [
                        774,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                783,
                {
                    "_set": [
                        789
                    ],
                    "where": [
                        778,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                775,
                {
                    "_set": [
                        789
                    ],
                    "pkColumns": [
                        787,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                783,
                {
                    "updates": [
                        793,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                802,
                {
                    "_set": [
                        808
                    ],
                    "where": [
                        797,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                794,
                {
                    "_set": [
                        808
                    ],
                    "pkColumns": [
                        806,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                802,
                {
                    "updates": [
                        812,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                821,
                {
                    "_set": [
                        828
                    ],
                    "where": [
                        816,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                813,
                {
                    "_set": [
                        828
                    ],
                    "pkColumns": [
                        825,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                821,
                {
                    "updates": [
                        855,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                844,
                {
                    "_set": [
                        849
                    ],
                    "where": [
                        837,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                831,
                {
                    "_set": [
                        849
                    ],
                    "pkColumns": [
                        847,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                844,
                {
                    "updates": [
                        853,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                646
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
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
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
                        646,
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
                        646,
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
                        883,
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
                        646,
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
                        646,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        357,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        354,
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
                        883,
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
                        359,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        341
                    ]
                }
            ],
            "messageTypeEnum": [
                361,
                {
                    "distinctOn": [
                        374,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        372,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                362,
                {
                    "distinctOn": [
                        374,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        372,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                361,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                361,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        376,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        364
                    ]
                }
            ],
            "modelsEnum": [
                382,
                {
                    "distinctOn": [
                        397,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        395,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        385
                    ]
                }
            ],
            "modelsEnumAggregate": [
                383,
                {
                    "distinctOn": [
                        397,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        395,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        385
                    ]
                }
            ],
            "modelsEnumByPk": [
                382,
                {
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                382,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        399,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        385
                    ]
                }
            ],
            "preference": [
                405,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferenceAggregate": [
                406,
                {
                    "distinctOn": [
                        425,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        423,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "preferenceByPk": [
                405,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                405,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        435,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        413
                    ]
                }
            ],
            "prompt": [
                447,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptAggregate": [
                448,
                {
                    "distinctOn": [
                        508,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        506,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptByPk": [
                447,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                456,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptChatbotAggregate": [
                457,
                {
                    "distinctOn": [
                        476,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        474,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptChatbotByPk": [
                456,
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
                456,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        484,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        464
                    ]
                }
            ],
            "promptStream": [
                447,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        516,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptTypeEnum": [
                520,
                {
                    "distinctOn": [
                        533,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        531,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        523
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                521,
                {
                    "distinctOn": [
                        533,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        531,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        523
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                520,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                520,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        535,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        523
                    ]
                }
            ],
            "promptUser": [
                541,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "promptUserAggregate": [
                542,
                {
                    "distinctOn": [
                        561,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        559,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "promptUserByPk": [
                541,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                541,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        569,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        549
                    ]
                }
            ],
            "referral": [
                587,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralAggregate": [
                588,
                {
                    "distinctOn": [
                        604,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        602,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "referralByPk": [
                587,
                {
                    "referralCode": [
                        646,
                        "String!"
                    ]
                }
            ],
            "referralStream": [
                587,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        606,
                        "[ReferralStreamCursorInput]!"
                    ],
                    "where": [
                        593
                    ]
                }
            ],
            "socialFollowing": [
                610,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "socialFollowingAggregate": [
                611,
                {
                    "distinctOn": [
                        627,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        626,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "socialFollowingStream": [
                610,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        635,
                        "[SocialFollowingStreamCursorInput]!"
                    ],
                    "where": [
                        618
                    ]
                }
            ],
            "subcategoryEnum": [
                648,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                649,
                {
                    "distinctOn": [
                        666,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        664,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                648,
                {
                    "category": [
                        646,
                        "String!"
                    ],
                    "domain": [
                        646,
                        "String!"
                    ],
                    "name": [
                        646,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnumStream": [
                648,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        668,
                        "[SubcategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        654
                    ]
                }
            ],
            "tagEnum": [
                672,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "tagEnumAggregate": [
                673,
                {
                    "distinctOn": [
                        692,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        690,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "tagEnumByPk": [
                672,
                {
                    "tagId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "tagEnumStream": [
                672,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        700,
                        "[TagEnumStreamCursorInput]!"
                    ],
                    "where": [
                        680
                    ]
                }
            ],
            "thread": [
                712,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadAggregate": [
                713,
                {
                    "distinctOn": [
                        733,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        731,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "threadByPk": [
                712,
                {
                    "threadId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                712,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        743,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        720
                    ]
                }
            ],
            "token": [
                756,
                {
                    "distinctOn": [
                        769,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        767,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        759
                    ]
                }
            ],
            "tokenAggregate": [
                757,
                {
                    "distinctOn": [
                        769,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        767,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        759
                    ]
                }
            ],
            "tokenByPk": [
                756,
                {
                    "token": [
                        646,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                756,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        771,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        759
                    ]
                }
            ],
            "toneEnum": [
                775,
                {
                    "distinctOn": [
                        788,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        786,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        778
                    ]
                }
            ],
            "toneEnumAggregate": [
                776,
                {
                    "distinctOn": [
                        788,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        786,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        778
                    ]
                }
            ],
            "toneEnumByPk": [
                775,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                775,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        790,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        778
                    ]
                }
            ],
            "typeEnum": [
                794,
                {
                    "distinctOn": [
                        807,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        805,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        797
                    ]
                }
            ],
            "typeEnumAggregate": [
                795,
                {
                    "distinctOn": [
                        807,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        805,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        797
                    ]
                }
            ],
            "typeEnumByPk": [
                794,
                {
                    "value": [
                        646,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                794,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        809,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        797
                    ]
                }
            ],
            "user": [
                813,
                {
                    "distinctOn": [
                        827,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        824,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        816
                    ]
                }
            ],
            "userAggregate": [
                814,
                {
                    "distinctOn": [
                        827,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        824,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        816
                    ]
                }
            ],
            "userByPk": [
                813,
                {
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                813,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        829,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        816
                    ]
                }
            ],
            "userToken": [
                831,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokenAggregate": [
                832,
                {
                    "distinctOn": [
                        848,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        846,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "userTokenByPk": [
                831,
                {
                    "token": [
                        646,
                        "String!"
                    ],
                    "userId": [
                        883,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                831,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        850,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        837
                    ]
                }
            ],
            "__typename": [
                646
            ]
        }
    }
}