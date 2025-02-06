export default {
    "scalars": [
        0,
        7,
        15,
        26,
        30,
        41,
        49,
        72,
        83,
        95,
        103,
        113,
        124,
        136,
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
        251,
        260,
        264,
        274,
        289,
        297,
        306,
        310,
        312,
        318,
        319,
        329,
        333,
        336,
        346,
        357,
        358,
        359,
        371,
        397,
        408,
        420,
        428,
        440,
        456,
        465,
        469,
        471,
        482,
        493,
        505,
        526,
        536,
        540,
        559,
        578,
        587,
        598,
        602,
        613,
        624,
        636,
        653,
        665,
        666,
        667,
        679,
        692,
        701,
        705,
        711,
        720,
        724,
        730,
        739,
        743,
        749,
        759,
        770,
        780,
        784,
        786,
        795,
        797,
        811,
        813,
        814
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
                578
            ]
        },
        "Category": {
            "categoryId": [
                243
            ],
            "chatbots": [
                63,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotsAggregate": [
                64,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
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
                578
            ]
        },
        "CategoryAvgFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
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
                71
            ],
            "chatbotsAggregate": [
                65
            ],
            "name": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "CategoryConstraint": {},
        "CategoryEnum": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "domain_enum": [
                195
            ],
            "name": [
                578
            ],
            "subcategoryEnumsAggregate": [
                581,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumsByCategoryDomain": [
                580,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                581,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategory_enums": [
                580,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryEnumAggregateBoolExp": {
            "count": [
                790
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryEnumAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                18
            ],
            "min": [
                20
            ],
            "__typename": [
                578
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
                578
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
                687
            ],
            "domain": [
                579
            ],
            "domain_enum": [
                198
            ],
            "name": [
                579
            ],
            "subcategoryEnumsByCategoryDomain": [
                586
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                582
            ],
            "subcategory_enums": [
                586
            ],
            "subcategory_enumsAggregate": [
                582
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumConstraint": {},
        "CategoryEnumInsertInput": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "domain_enum": [
                204
            ],
            "name": [
                578
            ],
            "subcategoryEnumsByCategoryDomain": [
                585
            ],
            "subcategory_enums": [
                585
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumMaxFields": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumMaxOrderBy": {
            "added": [
                336
            ],
            "domain": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumMinFields": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumMinOrderBy": {
            "added": [
                336
            ],
            "domain": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "CategoryEnumOrderBy": {
            "added": [
                336
            ],
            "domain": [
                336
            ],
            "domain_enum": [
                206
            ],
            "name": [
                336
            ],
            "subcategoryEnumsByCategoryDomainAggregate": [
                584
            ],
            "subcategory_enumsAggregate": [
                584
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumPkColumnsInput": {
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryEnumSelectColumn": {},
        "CategoryEnumSetInput": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryEnumStreamCursorValueInput": {
            "added": [
                811
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryIncInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "CategoryInsertInput": {
            "categoryId": [
                243
            ],
            "chatbots": [
                68
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryMaxFields": {
            "categoryId": [
                243
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryMinFields": {
            "categoryId": [
                243
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "CategoryOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotsAggregate": [
                67
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "CategoryPkColumnsInput": {
            "categoryId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "CategorySelectColumn": {},
        "CategorySetInput": {
            "categoryId": [
                243
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategoryStddevFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "CategoryStddevPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "CategoryStddevSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryStreamCursorValueInput": {
            "categoryId": [
                243
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "CategorySumFields": {
            "categoryId": [
                243
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CategoryVarPopFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "CategoryVarSampFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "CategoryVarianceFields": {
            "categoryId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "Chatbot": {
            "avatar": [
                578
            ],
            "categories": [
                63,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "categoriesAggregate": [
                64,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotId": [
                243
            ],
            "complexityEnum": [
                175
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "followers": [
                542,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "followersAggregate": [
                543,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "lengthEnum": [
                247
            ],
            "metadata": [
                104,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "metadataAggregate": [
                105,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "name": [
                578
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "prompts": [
                388,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptsAggregate": [
                389,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "threads": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadsAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "toneEnum": [
                707
            ],
            "typeEnum": [
                726
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotAggregate": {
            "aggregate": [
                57
            ],
            "nodes": [
                54
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotAggregateBoolExp": {
            "count": [
                791
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotAggregateFields": {
            "avg": [
                60
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
                578
            ]
        },
        "ChatbotAggregateOrderBy": {
            "avg": [
                61
            ],
            "count": [
                336
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
                578
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
                578
            ]
        },
        "ChatbotAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotAvgOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotBoolExp": {
            "_and": [
                62
            ],
            "_not": [
                62
            ],
            "_or": [
                62
            ],
            "avatar": [
                579
            ],
            "categories": [
                71
            ],
            "categoriesAggregate": [
                65
            ],
            "chatbotId": [
                244
            ],
            "complexityEnum": [
                178
            ],
            "createdBy": [
                579
            ],
            "defaultComplexity": [
                579
            ],
            "defaultLength": [
                579
            ],
            "defaultTone": [
                579
            ],
            "defaultType": [
                579
            ],
            "description": [
                579
            ],
            "followers": [
                550
            ],
            "followersAggregate": [
                544
            ],
            "lengthEnum": [
                250
            ],
            "metadata": [
                112
            ],
            "metadataAggregate": [
                106
            ],
            "name": [
                579
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "prompts": [
                396
            ],
            "promptsAggregate": [
                390
            ],
            "threads": [
                652
            ],
            "threadsAggregate": [
                646
            ],
            "toneEnum": [
                710
            ],
            "typeEnum": [
                729
            ],
            "__typename": [
                578
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
                54
            ],
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryAggregate": {
            "aggregate": [
                66
            ],
            "nodes": [
                63
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryAggregateBoolExp": {
            "count": [
                792
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryAggregateFields": {
            "avg": [
                69
            ],
            "count": [
                243,
                {
                    "columns": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                75
            ],
            "min": [
                77
            ],
            "stddev": [
                85
            ],
            "stddevPop": [
                87
            ],
            "stddevSamp": [
                89
            ],
            "sum": [
                93
            ],
            "varPop": [
                97
            ],
            "varSamp": [
                99
            ],
            "variance": [
                101
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryAggregateOrderBy": {
            "avg": [
                70
            ],
            "count": [
                336
            ],
            "max": [
                76
            ],
            "min": [
                78
            ],
            "stddev": [
                86
            ],
            "stddevPop": [
                88
            ],
            "stddevSamp": [
                90
            ],
            "sum": [
                94
            ],
            "varPop": [
                98
            ],
            "varSamp": [
                100
            ],
            "variance": [
                102
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryArrRelInsertInput": {
            "data": [
                74
            ],
            "onConflict": [
                80
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryAvgOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryBoolExp": {
            "_and": [
                71
            ],
            "_not": [
                71
            ],
            "_or": [
                71
            ],
            "category": [
                6
            ],
            "categoryId": [
                244
            ],
            "chatbot": [
                62
            ],
            "chatbotId": [
                244
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "ChatbotCategoryMaxOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryMinOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                63
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryOnConflict": {
            "constraint": [
                72
            ],
            "updateColumns": [
                95
            ],
            "where": [
                71
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryOrderBy": {
            "category": [
                39
            ],
            "categoryId": [
                336
            ],
            "chatbot": [
                153
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "ChatbotCategoryStddevOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryStddevPopOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryStddevSampOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryStreamCursorInput": {
            "initialValue": [
                92
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
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
                578
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
                578
            ]
        },
        "ChatbotCategorySumOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotCategoryUpdateColumn": {},
        "ChatbotCategoryUpdates": {
            "_inc": [
                73
            ],
            "_set": [
                84
            ],
            "where": [
                71
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryVarPopOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryVarSampOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotCategoryVarianceOrderBy": {
            "categoryId": [
                336
            ],
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotConstraint": {},
        "ChatbotDomain": {
            "chatbot": [
                54
            ],
            "chatbotId": [
                243
            ],
            "domain": [
                195
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainAggregate": {
            "aggregate": [
                107
            ],
            "nodes": [
                104
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainAggregateBoolExp": {
            "count": [
                793
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainAggregateFields": {
            "avg": [
                110
            ],
            "count": [
                243,
                {
                    "columns": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
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
                578
            ]
        },
        "ChatbotDomainAggregateOrderBy": {
            "avg": [
                111
            ],
            "count": [
                336
            ],
            "max": [
                117
            ],
            "min": [
                119
            ],
            "stddev": [
                127
            ],
            "stddevPop": [
                129
            ],
            "stddevSamp": [
                131
            ],
            "sum": [
                135
            ],
            "varPop": [
                139
            ],
            "varSamp": [
                141
            ],
            "variance": [
                143
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainArrRelInsertInput": {
            "data": [
                115
            ],
            "onConflict": [
                121
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainAvgOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainBoolExp": {
            "_and": [
                112
            ],
            "_not": [
                112
            ],
            "_or": [
                112
            ],
            "chatbot": [
                62
            ],
            "chatbotId": [
                244
            ],
            "domain": [
                198
            ],
            "domainName": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainConstraint": {},
        "ChatbotDomainIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainInsertInput": {
            "chatbot": [
                151
            ],
            "chatbotId": [
                243
            ],
            "domain": [
                204
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainMaxFields": {
            "chatbotId": [
                243
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainMaxOrderBy": {
            "chatbotId": [
                336
            ],
            "domainName": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainMinFields": {
            "chatbotId": [
                243
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainMinOrderBy": {
            "chatbotId": [
                336
            ],
            "domainName": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                104
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainOnConflict": {
            "constraint": [
                113
            ],
            "updateColumns": [
                136
            ],
            "where": [
                112
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                336
            ],
            "domain": [
                206
            ],
            "domainName": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainPkColumnsInput": {
            "chatbotId": [
                243
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainSelectColumn": {},
        "ChatbotDomainSetInput": {
            "chatbotId": [
                243
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStddevSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStreamCursorInput": {
            "initialValue": [
                133
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "domainName": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainSumOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainUpdateColumn": {},
        "ChatbotDomainUpdates": {
            "_inc": [
                114
            ],
            "_set": [
                125
            ],
            "where": [
                112
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotDomainVarianceOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotInsertInput": {
            "avatar": [
                578
            ],
            "categories": [
                68
            ],
            "chatbotId": [
                243
            ],
            "complexityEnum": [
                184
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "followers": [
                547
            ],
            "lengthEnum": [
                256
            ],
            "metadata": [
                109
            ],
            "name": [
                578
            ],
            "preferences": [
                342
            ],
            "prompts": [
                393
            ],
            "threads": [
                649
            ],
            "toneEnum": [
                716
            ],
            "typeEnum": [
                735
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotMaxFields": {
            "avatar": [
                578
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotMaxOrderBy": {
            "avatar": [
                336
            ],
            "chatbotId": [
                336
            ],
            "createdBy": [
                336
            ],
            "defaultComplexity": [
                336
            ],
            "defaultLength": [
                336
            ],
            "defaultTone": [
                336
            ],
            "defaultType": [
                336
            ],
            "description": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotMinFields": {
            "avatar": [
                578
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotMinOrderBy": {
            "avatar": [
                336
            ],
            "chatbotId": [
                336
            ],
            "createdBy": [
                336
            ],
            "defaultComplexity": [
                336
            ],
            "defaultLength": [
                336
            ],
            "defaultTone": [
                336
            ],
            "defaultType": [
                336
            ],
            "description": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                54
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotOnConflict": {
            "constraint": [
                103
            ],
            "updateColumns": [
                167
            ],
            "where": [
                62
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotOrderBy": {
            "avatar": [
                336
            ],
            "categoriesAggregate": [
                67
            ],
            "chatbotId": [
                336
            ],
            "complexityEnum": [
                186
            ],
            "createdBy": [
                336
            ],
            "defaultComplexity": [
                336
            ],
            "defaultLength": [
                336
            ],
            "defaultTone": [
                336
            ],
            "defaultType": [
                336
            ],
            "description": [
                336
            ],
            "followersAggregate": [
                546
            ],
            "lengthEnum": [
                258
            ],
            "metadataAggregate": [
                108
            ],
            "name": [
                336
            ],
            "preferencesAggregate": [
                341
            ],
            "promptsAggregate": [
                392
            ],
            "threadsAggregate": [
                648
            ],
            "toneEnum": [
                718
            ],
            "typeEnum": [
                737
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotPkColumnsInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotSelectColumn": {},
        "ChatbotSetInput": {
            "avatar": [
                578
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotStddevSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ChatbotStreamCursorValueInput": {
            "avatar": [
                578
            ],
            "chatbotId": [
                243
            ],
            "createdBy": [
                578
            ],
            "defaultComplexity": [
                578
            ],
            "defaultLength": [
                578
            ],
            "defaultTone": [
                578
            ],
            "defaultType": [
                578
            ],
            "description": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotSumOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
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
                62
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ChatbotVarianceOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnum": {
            "chatbots": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotsAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
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
                578
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
                578
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
                62
            ],
            "chatbotsAggregate": [
                56
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnumConstraint": {},
        "ComplexityEnumInsertInput": {
            "chatbots": [
                59
            ],
            "preferences": [
                342
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "ComplexityEnumOrderBy": {
            "chatbotsAggregate": [
                58
            ],
            "preferencesAggregate": [
                341
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ComplexityEnumSelectColumn": {},
        "ComplexityEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ComplexityEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "CursorOrdering": {},
        "DomainEnum": {
            "added": [
                811
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
            "chatbot": [
                104,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotAggregate": [
                105,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "name": [
                578
            ],
            "tagEnumsAggregate": [
                605,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "tag_enums": [
                604,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "__typename": [
                578
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
                578
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
                578
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
                687
            ],
            "category_enums": [
                14
            ],
            "category_enumsAggregate": [
                10
            ],
            "chatbot": [
                112
            ],
            "chatbotAggregate": [
                106
            ],
            "name": [
                579
            ],
            "tag_enums": [
                612
            ],
            "tag_enumsAggregate": [
                606
            ],
            "__typename": [
                578
            ]
        },
        "DomainEnumConstraint": {},
        "DomainEnumInsertInput": {
            "added": [
                811
            ],
            "category_enums": [
                13
            ],
            "chatbot": [
                109
            ],
            "name": [
                578
            ],
            "tag_enums": [
                609
            ],
            "__typename": [
                578
            ]
        },
        "DomainEnumMaxFields": {
            "added": [
                811
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "DomainEnumMinFields": {
            "added": [
                811
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "DomainEnumOrderBy": {
            "added": [
                336
            ],
            "category_enumsAggregate": [
                12
            ],
            "chatbotAggregate": [
                108
            ],
            "name": [
                336
            ],
            "tag_enumsAggregate": [
                608
            ],
            "__typename": [
                578
            ]
        },
        "DomainEnumPkColumnsInput": {
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "DomainEnumSelectColumn": {},
        "DomainEnumSetInput": {
            "added": [
                811
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "DomainEnumStreamCursorValueInput": {
            "added": [
                811
            ],
            "name": [
                578
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "Example": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "metadata": [
                795,
                {
                    "path": [
                        578
                    ]
                }
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                580
            ],
            "subcategory_enum": [
                580
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ExampleAggregateBoolExp": {
            "count": [
                794
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ExampleAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                228
            ],
            "min": [
                230
            ],
            "__typename": [
                578
            ]
        },
        "ExampleAppendInput": {
            "metadata": [
                795
            ],
            "__typename": [
                578
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
                578
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
                687
            ],
            "category": [
                579
            ],
            "domain": [
                579
            ],
            "exampleId": [
                789
            ],
            "metadata": [
                246
            ],
            "prompt": [
                579
            ],
            "response": [
                579
            ],
            "subcategory": [
                579
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                586
            ],
            "subcategory_enum": [
                586
            ],
            "tags": [
                788
            ],
            "__typename": [
                578
            ]
        },
        "ExampleConstraint": {},
        "ExampleDeleteAtPathInput": {
            "metadata": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ExampleDeleteElemInput": {
            "metadata": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ExampleDeleteKeyInput": {
            "metadata": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ExampleInsertInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "metadata": [
                795
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                594
            ],
            "subcategory_enum": [
                594
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ExampleMaxFields": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ExampleMaxOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "domain": [
                336
            ],
            "exampleId": [
                336
            ],
            "prompt": [
                336
            ],
            "response": [
                336
            ],
            "subcategory": [
                336
            ],
            "tags": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ExampleMinFields": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ExampleMinOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "domain": [
                336
            ],
            "exampleId": [
                336
            ],
            "prompt": [
                336
            ],
            "response": [
                336
            ],
            "subcategory": [
                336
            ],
            "tags": [
                336
            ],
            "__typename": [
                578
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
                578
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
                578
            ]
        },
        "ExampleOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "domain": [
                336
            ],
            "exampleId": [
                336
            ],
            "metadata": [
                336
            ],
            "prompt": [
                336
            ],
            "response": [
                336
            ],
            "subcategory": [
                336
            ],
            "subcategoryEnumBySubcategoryCategoryDomain": [
                596
            ],
            "subcategory_enum": [
                596
            ],
            "tags": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ExamplePkColumnsInput": {
            "exampleId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ExamplePrependInput": {
            "metadata": [
                795
            ],
            "__typename": [
                578
            ]
        },
        "ExampleSelectColumn": {},
        "ExampleSetInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "metadata": [
                795
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "ExampleStreamCursorValueInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "exampleId": [
                814
            ],
            "metadata": [
                795
            ],
            "prompt": [
                578
            ],
            "response": [
                578
            ],
            "subcategory": [
                578
            ],
            "tags": [
                814
            ],
            "__typename": [
                578
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
                578
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
                578
            ]
        },
        "JsonbCastExp": {
            "String": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "JsonbComparisonExp": {
            "_cast": [
                245
            ],
            "_containedIn": [
                795
            ],
            "_contains": [
                795
            ],
            "_eq": [
                795
            ],
            "_gt": [
                795
            ],
            "_gte": [
                795
            ],
            "_hasKey": [
                578
            ],
            "_hasKeysAll": [
                578
            ],
            "_hasKeysAny": [
                578
            ],
            "_in": [
                795
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                795
            ],
            "_lte": [
                795
            ],
            "_neq": [
                795
            ],
            "_nin": [
                795
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnum": {
            "chatbots": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotsAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumAggregate": {
            "aggregate": [
                249
            ],
            "nodes": [
                247
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        260,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                253
            ],
            "min": [
                254
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumBoolExp": {
            "_and": [
                250
            ],
            "_not": [
                250
            ],
            "_or": [
                250
            ],
            "chatbots": [
                62
            ],
            "chatbotsAggregate": [
                56
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumConstraint": {},
        "LengthEnumInsertInput": {
            "chatbots": [
                59
            ],
            "preferences": [
                342
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                247
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumObjRelInsertInput": {
            "data": [
                252
            ],
            "onConflict": [
                257
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumOnConflict": {
            "constraint": [
                251
            ],
            "updateColumns": [
                264
            ],
            "where": [
                250
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumOrderBy": {
            "chatbotsAggregate": [
                58
            ],
            "preferencesAggregate": [
                341
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumSelectColumn": {},
        "LengthEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumStreamCursorInput": {
            "initialValue": [
                263
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "LengthEnumUpdateColumn": {},
        "LengthEnumUpdates": {
            "_set": [
                261
            ],
            "where": [
                250
            ],
            "__typename": [
                578
            ]
        },
        "Message": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "examples": [
                795,
                {
                    "path": [
                        578
                    ]
                }
            ],
            "message": [
                266
            ],
            "messageId": [
                814
            ],
            "messageTypeEnum": [
                293
            ],
            "messages": [
                266,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messagesAggregate": [
                267,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "thread": [
                644
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageAggregate": {
            "aggregate": [
                269
            ],
            "nodes": [
                266
            ],
            "__typename": [
                578
            ]
        },
        "MessageAggregateBoolExp": {
            "count": [
                796
            ],
            "__typename": [
                578
            ]
        },
        "MessageAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                279
            ],
            "min": [
                281
            ],
            "__typename": [
                578
            ]
        },
        "MessageAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                280
            ],
            "min": [
                282
            ],
            "__typename": [
                578
            ]
        },
        "MessageAppendInput": {
            "examples": [
                795
            ],
            "__typename": [
                578
            ]
        },
        "MessageArrRelInsertInput": {
            "data": [
                278
            ],
            "onConflict": [
                285
            ],
            "__typename": [
                578
            ]
        },
        "MessageBoolExp": {
            "_and": [
                273
            ],
            "_not": [
                273
            ],
            "_or": [
                273
            ],
            "augmentedFrom": [
                789
            ],
            "content": [
                579
            ],
            "createdAt": [
                687
            ],
            "examples": [
                246
            ],
            "message": [
                273
            ],
            "messageId": [
                789
            ],
            "messageTypeEnum": [
                296
            ],
            "messages": [
                273
            ],
            "messagesAggregate": [
                268
            ],
            "prompt": [
                579
            ],
            "role": [
                579
            ],
            "thread": [
                652
            ],
            "threadId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "MessageConstraint": {},
        "MessageDeleteAtPathInput": {
            "examples": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageDeleteElemInput": {
            "examples": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "MessageDeleteKeyInput": {
            "examples": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageInsertInput": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "examples": [
                795
            ],
            "message": [
                284
            ],
            "messageId": [
                814
            ],
            "messageTypeEnum": [
                302
            ],
            "messages": [
                272
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "thread": [
                661
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageMaxFields": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "messageId": [
                814
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageMaxOrderBy": {
            "augmentedFrom": [
                336
            ],
            "content": [
                336
            ],
            "createdAt": [
                336
            ],
            "messageId": [
                336
            ],
            "prompt": [
                336
            ],
            "role": [
                336
            ],
            "threadId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "MessageMinFields": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "messageId": [
                814
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageMinOrderBy": {
            "augmentedFrom": [
                336
            ],
            "content": [
                336
            ],
            "createdAt": [
                336
            ],
            "messageId": [
                336
            ],
            "prompt": [
                336
            ],
            "role": [
                336
            ],
            "threadId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "MessageMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                266
            ],
            "__typename": [
                578
            ]
        },
        "MessageObjRelInsertInput": {
            "data": [
                278
            ],
            "onConflict": [
                285
            ],
            "__typename": [
                578
            ]
        },
        "MessageOnConflict": {
            "constraint": [
                274
            ],
            "updateColumns": [
                312
            ],
            "where": [
                273
            ],
            "__typename": [
                578
            ]
        },
        "MessageOrderBy": {
            "augmentedFrom": [
                336
            ],
            "content": [
                336
            ],
            "createdAt": [
                336
            ],
            "examples": [
                336
            ],
            "message": [
                286
            ],
            "messageId": [
                336
            ],
            "messageTypeEnum": [
                304
            ],
            "messagesAggregate": [
                270
            ],
            "prompt": [
                336
            ],
            "role": [
                336
            ],
            "thread": [
                663
            ],
            "threadId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "MessagePkColumnsInput": {
            "messageId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessagePrependInput": {
            "examples": [
                795
            ],
            "__typename": [
                578
            ]
        },
        "MessageSelectColumn": {},
        "MessageSetInput": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "examples": [
                795
            ],
            "messageId": [
                814
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageStreamCursorInput": {
            "initialValue": [
                292
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "MessageStreamCursorValueInput": {
            "augmentedFrom": [
                814
            ],
            "content": [
                578
            ],
            "createdAt": [
                811
            ],
            "examples": [
                795
            ],
            "messageId": [
                814
            ],
            "prompt": [
                578
            ],
            "role": [
                578
            ],
            "threadId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnum": {
            "messages": [
                266,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messagesAggregate": [
                267,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumAggregate": {
            "aggregate": [
                295
            ],
            "nodes": [
                293
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        306,
                        "[MessageTypeEnumSelectColumn!]"
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
                300
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumBoolExp": {
            "_and": [
                296
            ],
            "_not": [
                296
            ],
            "_or": [
                296
            ],
            "messages": [
                273
            ],
            "messagesAggregate": [
                268
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumConstraint": {},
        "MessageTypeEnumInsertInput": {
            "messages": [
                272
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                293
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumObjRelInsertInput": {
            "data": [
                298
            ],
            "onConflict": [
                303
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumOnConflict": {
            "constraint": [
                297
            ],
            "updateColumns": [
                310
            ],
            "where": [
                296
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumOrderBy": {
            "messagesAggregate": [
                270
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumSelectColumn": {},
        "MessageTypeEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumStreamCursorInput": {
            "initialValue": [
                309
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "MessageTypeEnumUpdateColumn": {},
        "MessageTypeEnumUpdates": {
            "_set": [
                307
            ],
            "where": [
                296
            ],
            "__typename": [
                578
            ]
        },
        "MessageUpdateColumn": {},
        "MessageUpdates": {
            "_append": [
                271
            ],
            "_deleteAtPath": [
                275
            ],
            "_deleteElem": [
                276
            ],
            "_deleteKey": [
                277
            ],
            "_prepend": [
                288
            ],
            "_set": [
                290
            ],
            "where": [
                273
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnum": {
            "name": [
                578
            ],
            "threads": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadsAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumAggregate": {
            "aggregate": [
                316
            ],
            "nodes": [
                314
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        329,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                322
            ],
            "min": [
                323
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumBoolExp": {
            "_and": [
                317
            ],
            "_not": [
                317
            ],
            "_or": [
                317
            ],
            "name": [
                579
            ],
            "threads": [
                652
            ],
            "threadsAggregate": [
                646
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumConstraint": {},
        "ModelsEnumEnum": {},
        "ModelsEnumEnumComparisonExp": {
            "_eq": [
                319
            ],
            "_in": [
                319
            ],
            "_isNull": [
                0
            ],
            "_neq": [
                319
            ],
            "_nin": [
                319
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumInsertInput": {
            "name": [
                578
            ],
            "threads": [
                649
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumMaxFields": {
            "name": [
                578
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumMinFields": {
            "name": [
                578
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                314
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumObjRelInsertInput": {
            "data": [
                321
            ],
            "onConflict": [
                326
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumOnConflict": {
            "constraint": [
                318
            ],
            "updateColumns": [
                333
            ],
            "where": [
                317
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumOrderBy": {
            "name": [
                336
            ],
            "threadsAggregate": [
                648
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumPkColumnsInput": {
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumSelectColumn": {},
        "ModelsEnumSetInput": {
            "name": [
                578
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumStreamCursorInput": {
            "initialValue": [
                332
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumStreamCursorValueInput": {
            "name": [
                578
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ModelsEnumUpdateColumn": {},
        "ModelsEnumUpdates": {
            "_set": [
                330
            ],
            "where": [
                317
            ],
            "__typename": [
                578
            ]
        },
        "NumericComparisonExp": {
            "_eq": [
                797
            ],
            "_gt": [
                797
            ],
            "_gte": [
                797
            ],
            "_in": [
                797
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                797
            ],
            "_lte": [
                797
            ],
            "_neq": [
                797
            ],
            "_nin": [
                797
            ],
            "__typename": [
                578
            ]
        },
        "OrderBy": {},
        "Preference": {
            "chatbot": [
                54
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
                247
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "toneEnum": [
                707
            ],
            "typeEnum": [
                726
            ],
            "user": [
                745
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceAggregate": {
            "aggregate": [
                340
            ],
            "nodes": [
                337
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceAggregateBoolExp": {
            "bool_and": [
                798
            ],
            "bool_or": [
                799
            ],
            "count": [
                800
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceAggregateFields": {
            "avg": [
                343
            ],
            "count": [
                243,
                {
                    "columns": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                349
            ],
            "min": [
                351
            ],
            "stddev": [
                361
            ],
            "stddevPop": [
                363
            ],
            "stddevSamp": [
                365
            ],
            "sum": [
                369
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
                578
            ]
        },
        "PreferenceAggregateOrderBy": {
            "avg": [
                344
            ],
            "count": [
                336
            ],
            "max": [
                350
            ],
            "min": [
                352
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
                374
            ],
            "varSamp": [
                376
            ],
            "variance": [
                378
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceArrRelInsertInput": {
            "data": [
                348
            ],
            "onConflict": [
                354
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceAvgOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceBoolExp": {
            "_and": [
                345
            ],
            "_not": [
                345
            ],
            "_or": [
                345
            ],
            "chatbot": [
                62
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
                250
            ],
            "preferenceId": [
                244
            ],
            "preferredComplexity": [
                579
            ],
            "preferredLength": [
                579
            ],
            "preferredTone": [
                579
            ],
            "preferredType": [
                579
            ],
            "toneEnum": [
                710
            ],
            "typeEnum": [
                729
            ],
            "user": [
                748
            ],
            "userId": [
                789
            ],
            "__typename": [
                578
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
                578
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
                256
            ],
            "preferenceId": [
                243
            ],
            "preferredComplexity": [
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "toneEnum": [
                716
            ],
            "typeEnum": [
                735
            ],
            "user": [
                754
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
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
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceMaxOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "preferredComplexity": [
                336
            ],
            "preferredLength": [
                336
            ],
            "preferredTone": [
                336
            ],
            "preferredType": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
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
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceMinOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "preferredComplexity": [
                336
            ],
            "preferredLength": [
                336
            ],
            "preferredTone": [
                336
            ],
            "preferredType": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                337
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceOnConflict": {
            "constraint": [
                346
            ],
            "updateColumns": [
                371
            ],
            "where": [
                345
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                336
            ],
            "complexityEnum": [
                186
            ],
            "favorite": [
                336
            ],
            "lengthEnum": [
                258
            ],
            "preferenceId": [
                336
            ],
            "preferredComplexity": [
                336
            ],
            "preferredLength": [
                336
            ],
            "preferredTone": [
                336
            ],
            "preferredType": [
                336
            ],
            "toneEnum": [
                718
            ],
            "typeEnum": [
                737
            ],
            "user": [
                756
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PreferencePkColumnsInput": {
            "preferenceId": [
                243
            ],
            "__typename": [
                578
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
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceStddevOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceStddevPopOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceStddevSampOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceStreamCursorInput": {
            "initialValue": [
                368
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
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
                578
            ],
            "preferredLength": [
                578
            ],
            "preferredTone": [
                578
            ],
            "preferredType": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceSumOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PreferenceUpdateColumn": {},
        "PreferenceUpdates": {
            "_inc": [
                347
            ],
            "_set": [
                360
            ],
            "where": [
                345
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceVarPopOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceVarSampOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PreferenceVarianceOrderBy": {
            "chatbotId": [
                336
            ],
            "preferenceId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "Prompt": {
            "chatbots": [
                388,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "chatbotsAggregate": [
                389,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "promptTypeEnum": [
                452
            ],
            "type": [
                578
            ],
            "users": [
                473,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "usersAggregate": [
                474,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "__typename": [
                578
            ]
        },
        "PromptAggregate": {
            "aggregate": [
                382
            ],
            "nodes": [
                379
            ],
            "__typename": [
                578
            ]
        },
        "PromptAggregateBoolExp": {
            "count": [
                801
            ],
            "__typename": [
                578
            ]
        },
        "PromptAggregateFields": {
            "avg": [
                385
            ],
            "count": [
                243,
                {
                    "columns": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                431
            ],
            "min": [
                433
            ],
            "stddev": [
                442
            ],
            "stddevPop": [
                444
            ],
            "stddevSamp": [
                446
            ],
            "sum": [
                450
            ],
            "varPop": [
                513
            ],
            "varSamp": [
                515
            ],
            "variance": [
                517
            ],
            "__typename": [
                578
            ]
        },
        "PromptAggregateOrderBy": {
            "avg": [
                386
            ],
            "count": [
                336
            ],
            "max": [
                432
            ],
            "min": [
                434
            ],
            "stddev": [
                443
            ],
            "stddevPop": [
                445
            ],
            "stddevSamp": [
                447
            ],
            "sum": [
                451
            ],
            "varPop": [
                514
            ],
            "varSamp": [
                516
            ],
            "variance": [
                518
            ],
            "__typename": [
                578
            ]
        },
        "PromptArrRelInsertInput": {
            "data": [
                430
            ],
            "onConflict": [
                437
            ],
            "__typename": [
                578
            ]
        },
        "PromptAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptAvgOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptBoolExp": {
            "_and": [
                387
            ],
            "_not": [
                387
            ],
            "_or": [
                387
            ],
            "chatbots": [
                396
            ],
            "chatbotsAggregate": [
                390
            ],
            "content": [
                579
            ],
            "promptId": [
                244
            ],
            "promptName": [
                579
            ],
            "promptTypeEnum": [
                455
            ],
            "type": [
                579
            ],
            "users": [
                481
            ],
            "usersAggregate": [
                475
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbot": {
            "chabotId": [
                243
            ],
            "chatbot": [
                54
            ],
            "prompt": [
                379
            ],
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotAggregate": {
            "aggregate": [
                391
            ],
            "nodes": [
                388
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotAggregateBoolExp": {
            "count": [
                802
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotAggregateFields": {
            "avg": [
                394
            ],
            "count": [
                243,
                {
                    "columns": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                400
            ],
            "min": [
                402
            ],
            "stddev": [
                410
            ],
            "stddevPop": [
                412
            ],
            "stddevSamp": [
                414
            ],
            "sum": [
                418
            ],
            "varPop": [
                422
            ],
            "varSamp": [
                424
            ],
            "variance": [
                426
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotAggregateOrderBy": {
            "avg": [
                395
            ],
            "count": [
                336
            ],
            "max": [
                401
            ],
            "min": [
                403
            ],
            "stddev": [
                411
            ],
            "stddevPop": [
                413
            ],
            "stddevSamp": [
                415
            ],
            "sum": [
                419
            ],
            "varPop": [
                423
            ],
            "varSamp": [
                425
            ],
            "variance": [
                427
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotArrRelInsertInput": {
            "data": [
                399
            ],
            "onConflict": [
                405
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotAvgOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotBoolExp": {
            "_and": [
                396
            ],
            "_not": [
                396
            ],
            "_or": [
                396
            ],
            "chabotId": [
                244
            ],
            "chatbot": [
                62
            ],
            "prompt": [
                387
            ],
            "promptId": [
                244
            ],
            "__typename": [
                578
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
                578
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
                436
            ],
            "promptId": [
                243
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotMaxOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotMinOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                388
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotOnConflict": {
            "constraint": [
                397
            ],
            "updateColumns": [
                420
            ],
            "where": [
                396
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotOrderBy": {
            "chabotId": [
                336
            ],
            "chatbot": [
                153
            ],
            "prompt": [
                438
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
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
                578
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
                578
            ]
        },
        "PromptChatbotStddevOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotStddevPopOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotStddevSampOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotStreamCursorInput": {
            "initialValue": [
                417
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
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
                578
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
                578
            ]
        },
        "PromptChatbotSumOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptChatbotUpdateColumn": {},
        "PromptChatbotUpdates": {
            "_inc": [
                398
            ],
            "_set": [
                409
            ],
            "where": [
                396
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotVarPopOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotVarSampOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "PromptChatbotVarianceOrderBy": {
            "chabotId": [
                336
            ],
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptConstraint": {},
        "PromptIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptInsertInput": {
            "chatbots": [
                393
            ],
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "promptTypeEnum": [
                461
            ],
            "type": [
                578
            ],
            "users": [
                478
            ],
            "__typename": [
                578
            ]
        },
        "PromptMaxFields": {
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "type": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptMaxOrderBy": {
            "content": [
                336
            ],
            "promptId": [
                336
            ],
            "promptName": [
                336
            ],
            "type": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptMinFields": {
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "type": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptMinOrderBy": {
            "content": [
                336
            ],
            "promptId": [
                336
            ],
            "promptName": [
                336
            ],
            "type": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                379
            ],
            "__typename": [
                578
            ]
        },
        "PromptObjRelInsertInput": {
            "data": [
                430
            ],
            "onConflict": [
                437
            ],
            "__typename": [
                578
            ]
        },
        "PromptOnConflict": {
            "constraint": [
                428
            ],
            "updateColumns": [
                471
            ],
            "where": [
                387
            ],
            "__typename": [
                578
            ]
        },
        "PromptOrderBy": {
            "chatbotsAggregate": [
                392
            ],
            "content": [
                336
            ],
            "promptId": [
                336
            ],
            "promptName": [
                336
            ],
            "promptTypeEnum": [
                463
            ],
            "type": [
                336
            ],
            "usersAggregate": [
                477
            ],
            "__typename": [
                578
            ]
        },
        "PromptPkColumnsInput": {
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptSelectColumn": {},
        "PromptSetInput": {
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "type": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevPopOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptStddevSampOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptStreamCursorInput": {
            "initialValue": [
                449
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "PromptStreamCursorValueInput": {
            "content": [
                578
            ],
            "promptId": [
                243
            ],
            "promptName": [
                578
            ],
            "type": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptSumOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnum": {
            "prompts": [
                379,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptsAggregate": [
                380,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumAggregate": {
            "aggregate": [
                454
            ],
            "nodes": [
                452
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        465,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                458
            ],
            "min": [
                459
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumBoolExp": {
            "_and": [
                455
            ],
            "_not": [
                455
            ],
            "_or": [
                455
            ],
            "prompts": [
                387
            ],
            "promptsAggregate": [
                381
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumConstraint": {},
        "PromptTypeEnumInsertInput": {
            "prompts": [
                384
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                452
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumObjRelInsertInput": {
            "data": [
                457
            ],
            "onConflict": [
                462
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumOnConflict": {
            "constraint": [
                456
            ],
            "updateColumns": [
                469
            ],
            "where": [
                455
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumOrderBy": {
            "promptsAggregate": [
                383
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumSelectColumn": {},
        "PromptTypeEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumStreamCursorInput": {
            "initialValue": [
                468
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "PromptTypeEnumUpdateColumn": {},
        "PromptTypeEnumUpdates": {
            "_set": [
                466
            ],
            "where": [
                455
            ],
            "__typename": [
                578
            ]
        },
        "PromptUpdateColumn": {},
        "PromptUpdates": {
            "_inc": [
                429
            ],
            "_set": [
                441
            ],
            "where": [
                387
            ],
            "__typename": [
                578
            ]
        },
        "PromptUser": {
            "prompt": [
                379
            ],
            "promptId": [
                243
            ],
            "user": [
                745
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAggregate": {
            "aggregate": [
                476
            ],
            "nodes": [
                473
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAggregateBoolExp": {
            "count": [
                803
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAggregateFields": {
            "avg": [
                479
            ],
            "count": [
                243,
                {
                    "columns": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                485
            ],
            "min": [
                487
            ],
            "stddev": [
                495
            ],
            "stddevPop": [
                497
            ],
            "stddevSamp": [
                499
            ],
            "sum": [
                503
            ],
            "varPop": [
                507
            ],
            "varSamp": [
                509
            ],
            "variance": [
                511
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAggregateOrderBy": {
            "avg": [
                480
            ],
            "count": [
                336
            ],
            "max": [
                486
            ],
            "min": [
                488
            ],
            "stddev": [
                496
            ],
            "stddevPop": [
                498
            ],
            "stddevSamp": [
                500
            ],
            "sum": [
                504
            ],
            "varPop": [
                508
            ],
            "varSamp": [
                510
            ],
            "variance": [
                512
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserArrRelInsertInput": {
            "data": [
                484
            ],
            "onConflict": [
                490
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAvgFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserAvgOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserBoolExp": {
            "_and": [
                481
            ],
            "_not": [
                481
            ],
            "_or": [
                481
            ],
            "prompt": [
                387
            ],
            "promptId": [
                244
            ],
            "user": [
                748
            ],
            "userId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserConstraint": {},
        "PromptUserIncInput": {
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserInsertInput": {
            "prompt": [
                436
            ],
            "promptId": [
                243
            ],
            "user": [
                754
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserMaxFields": {
            "promptId": [
                243
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserMaxOrderBy": {
            "promptId": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserMinFields": {
            "promptId": [
                243
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserMinOrderBy": {
            "promptId": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                473
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserOnConflict": {
            "constraint": [
                482
            ],
            "updateColumns": [
                505
            ],
            "where": [
                481
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserOrderBy": {
            "prompt": [
                438
            ],
            "promptId": [
                336
            ],
            "user": [
                756
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserPkColumnsInput": {
            "promptId": [
                243
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserSelectColumn": {},
        "PromptUserSetInput": {
            "promptId": [
                243
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevPopOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStddevSampOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStreamCursorInput": {
            "initialValue": [
                502
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserStreamCursorValueInput": {
            "promptId": [
                243
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserSumFields": {
            "promptId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserSumOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserUpdateColumn": {},
        "PromptUserUpdates": {
            "_inc": [
                483
            ],
            "_set": [
                494
            ],
            "where": [
                481
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarPopOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarSampOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptUserVarianceOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarPopFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarPopOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarSampFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarSampOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarianceFields": {
            "promptId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "PromptVarianceOrderBy": {
            "promptId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "Referral": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "user": [
                745
            ],
            "userByUserId": [
                745
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralAggregate": {
            "aggregate": [
                522
            ],
            "nodes": [
                519
            ],
            "__typename": [
                578
            ]
        },
        "ReferralAggregateBoolExp": {
            "count": [
                804
            ],
            "__typename": [
                578
            ]
        },
        "ReferralAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                528
            ],
            "min": [
                530
            ],
            "__typename": [
                578
            ]
        },
        "ReferralAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                529
            ],
            "min": [
                531
            ],
            "__typename": [
                578
            ]
        },
        "ReferralArrRelInsertInput": {
            "data": [
                527
            ],
            "onConflict": [
                533
            ],
            "__typename": [
                578
            ]
        },
        "ReferralBoolExp": {
            "_and": [
                525
            ],
            "_not": [
                525
            ],
            "_or": [
                525
            ],
            "referralCode": [
                579
            ],
            "referrerId": [
                789
            ],
            "user": [
                748
            ],
            "userByUserId": [
                748
            ],
            "userId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "ReferralConstraint": {},
        "ReferralInsertInput": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "user": [
                754
            ],
            "userByUserId": [
                754
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralMaxFields": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralMaxOrderBy": {
            "referralCode": [
                336
            ],
            "referrerId": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ReferralMinFields": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralMinOrderBy": {
            "referralCode": [
                336
            ],
            "referrerId": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ReferralMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                519
            ],
            "__typename": [
                578
            ]
        },
        "ReferralOnConflict": {
            "constraint": [
                526
            ],
            "updateColumns": [
                540
            ],
            "where": [
                525
            ],
            "__typename": [
                578
            ]
        },
        "ReferralOrderBy": {
            "referralCode": [
                336
            ],
            "referrerId": [
                336
            ],
            "user": [
                756
            ],
            "userByUserId": [
                756
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ReferralPkColumnsInput": {
            "referralCode": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ReferralSelectColumn": {},
        "ReferralSetInput": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralStreamCursorInput": {
            "initialValue": [
                539
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "ReferralStreamCursorValueInput": {
            "referralCode": [
                578
            ],
            "referrerId": [
                814
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ReferralUpdateColumn": {},
        "ReferralUpdates": {
            "_set": [
                537
            ],
            "where": [
                525
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowing": {
            "chatbot": [
                54
            ],
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "user": [
                745
            ],
            "userByFollowerId": [
                745
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAggregate": {
            "aggregate": [
                545
            ],
            "nodes": [
                542
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAggregateBoolExp": {
            "count": [
                805
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAggregateFields": {
            "avg": [
                548
            ],
            "count": [
                243,
                {
                    "columns": [
                        559,
                        "[SocialFollowingSelectColumn!]"
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
                561
            ],
            "stddevPop": [
                563
            ],
            "stddevSamp": [
                565
            ],
            "sum": [
                569
            ],
            "varPop": [
                572
            ],
            "varSamp": [
                574
            ],
            "variance": [
                576
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAggregateOrderBy": {
            "avg": [
                549
            ],
            "count": [
                336
            ],
            "max": [
                554
            ],
            "min": [
                556
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
                573
            ],
            "varSamp": [
                575
            ],
            "variance": [
                577
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingArrRelInsertInput": {
            "data": [
                552
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAvgFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingAvgOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingBoolExp": {
            "_and": [
                550
            ],
            "_not": [
                550
            ],
            "_or": [
                550
            ],
            "chatbot": [
                62
            ],
            "createdAt": [
                687
            ],
            "followeeId": [
                789
            ],
            "followeeIdChatbot": [
                244
            ],
            "followerId": [
                789
            ],
            "user": [
                748
            ],
            "userByFollowerId": [
                748
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingIncInput": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingInsertInput": {
            "chatbot": [
                151
            ],
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "user": [
                754
            ],
            "userByFollowerId": [
                754
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingMaxFields": {
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingMaxOrderBy": {
            "createdAt": [
                336
            ],
            "followeeId": [
                336
            ],
            "followeeIdChatbot": [
                336
            ],
            "followerId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingMinFields": {
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingMinOrderBy": {
            "createdAt": [
                336
            ],
            "followeeId": [
                336
            ],
            "followeeIdChatbot": [
                336
            ],
            "followerId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                542
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingOrderBy": {
            "chatbot": [
                153
            ],
            "createdAt": [
                336
            ],
            "followeeId": [
                336
            ],
            "followeeIdChatbot": [
                336
            ],
            "followerId": [
                336
            ],
            "user": [
                756
            ],
            "userByFollowerId": [
                756
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingSelectColumn": {},
        "SocialFollowingSetInput": {
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevPopOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStddevSampOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStreamCursorInput": {
            "initialValue": [
                568
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingStreamCursorValueInput": {
            "createdAt": [
                811
            ],
            "followeeId": [
                814
            ],
            "followeeIdChatbot": [
                243
            ],
            "followerId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingSumFields": {
            "followeeIdChatbot": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingSumOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingUpdates": {
            "_inc": [
                551
            ],
            "_set": [
                560
            ],
            "where": [
                550
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarPopFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarPopOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarSampFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarSampOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarianceFields": {
            "followeeIdChatbot": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "SocialFollowingVarianceOrderBy": {
            "followeeIdChatbot": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "String": {},
        "StringComparisonExp": {
            "_eq": [
                578
            ],
            "_gt": [
                578
            ],
            "_gte": [
                578
            ],
            "_ilike": [
                578
            ],
            "_in": [
                578
            ],
            "_iregex": [
                578
            ],
            "_isNull": [
                0
            ],
            "_like": [
                578
            ],
            "_lt": [
                578
            ],
            "_lte": [
                578
            ],
            "_neq": [
                578
            ],
            "_nilike": [
                578
            ],
            "_nin": [
                578
            ],
            "_niregex": [
                578
            ],
            "_nlike": [
                578
            ],
            "_nregex": [
                578
            ],
            "_nsimilar": [
                578
            ],
            "_regex": [
                578
            ],
            "_similar": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnum": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "categoryEnumByDomainCategory": [
                8
            ],
            "category_enum": [
                8
            ],
            "domain": [
                578
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
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumAggregate": {
            "aggregate": [
                583
            ],
            "nodes": [
                580
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumAggregateBoolExp": {
            "count": [
                806
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                589
            ],
            "min": [
                591
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                590
            ],
            "min": [
                592
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumArrRelInsertInput": {
            "data": [
                588
            ],
            "onConflict": [
                595
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumBoolExp": {
            "_and": [
                586
            ],
            "_not": [
                586
            ],
            "_or": [
                586
            ],
            "added": [
                687
            ],
            "category": [
                579
            ],
            "categoryEnumByDomainCategory": [
                14
            ],
            "category_enum": [
                14
            ],
            "domain": [
                579
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
                579
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumConstraint": {},
        "SubcategoryEnumInsertInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "categoryEnumByDomainCategory": [
                22
            ],
            "category_enum": [
                22
            ],
            "domain": [
                578
            ],
            "examples": [
                220
            ],
            "examplesByCategoryDomainSubcategory": [
                220
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumMaxFields": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumMaxOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "domain": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumMinFields": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumMinOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "domain": [
                336
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                580
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumObjRelInsertInput": {
            "data": [
                588
            ],
            "onConflict": [
                595
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumOnConflict": {
            "constraint": [
                587
            ],
            "updateColumns": [
                602
            ],
            "where": [
                586
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumOrderBy": {
            "added": [
                336
            ],
            "category": [
                336
            ],
            "categoryEnumByDomainCategory": [
                24
            ],
            "category_enum": [
                24
            ],
            "domain": [
                336
            ],
            "examplesAggregate": [
                218
            ],
            "examplesByCategoryDomainSubcategoryAggregate": [
                218
            ],
            "name": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumPkColumnsInput": {
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumSelectColumn": {},
        "SubcategoryEnumSetInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumStreamCursorInput": {
            "initialValue": [
                601
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumStreamCursorValueInput": {
            "added": [
                811
            ],
            "category": [
                578
            ],
            "domain": [
                578
            ],
            "name": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "SubcategoryEnumUpdateColumn": {},
        "SubcategoryEnumUpdates": {
            "_set": [
                599
            ],
            "where": [
                586
            ],
            "__typename": [
                578
            ]
        },
        "TagEnum": {
            "domain": [
                578
            ],
            "domain_enum": [
                195
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAggregate": {
            "aggregate": [
                607
            ],
            "nodes": [
                604
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAggregateBoolExp": {
            "count": [
                807
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAggregateFields": {
            "avg": [
                610
            ],
            "count": [
                243,
                {
                    "columns": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                616
            ],
            "min": [
                618
            ],
            "stddev": [
                626
            ],
            "stddevPop": [
                628
            ],
            "stddevSamp": [
                630
            ],
            "sum": [
                634
            ],
            "varPop": [
                638
            ],
            "varSamp": [
                640
            ],
            "variance": [
                642
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAggregateOrderBy": {
            "avg": [
                611
            ],
            "count": [
                336
            ],
            "max": [
                617
            ],
            "min": [
                619
            ],
            "stddev": [
                627
            ],
            "stddevPop": [
                629
            ],
            "stddevSamp": [
                631
            ],
            "sum": [
                635
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
                578
            ]
        },
        "TagEnumArrRelInsertInput": {
            "data": [
                615
            ],
            "onConflict": [
                621
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAvgFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumAvgOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumBoolExp": {
            "_and": [
                612
            ],
            "_not": [
                612
            ],
            "_or": [
                612
            ],
            "domain": [
                579
            ],
            "domain_enum": [
                198
            ],
            "frequency": [
                335
            ],
            "name": [
                579
            ],
            "tagId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumConstraint": {},
        "TagEnumIncInput": {
            "frequency": [
                797
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumInsertInput": {
            "domain": [
                578
            ],
            "domain_enum": [
                204
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumMaxFields": {
            "domain": [
                578
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumMaxOrderBy": {
            "domain": [
                336
            ],
            "frequency": [
                336
            ],
            "name": [
                336
            ],
            "tagId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumMinFields": {
            "domain": [
                578
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumMinOrderBy": {
            "domain": [
                336
            ],
            "frequency": [
                336
            ],
            "name": [
                336
            ],
            "tagId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                604
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumOnConflict": {
            "constraint": [
                613
            ],
            "updateColumns": [
                636
            ],
            "where": [
                612
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumOrderBy": {
            "domain": [
                336
            ],
            "domain_enum": [
                206
            ],
            "frequency": [
                336
            ],
            "name": [
                336
            ],
            "tagId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumPkColumnsInput": {
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumSelectColumn": {},
        "TagEnumSetInput": {
            "domain": [
                578
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevPopOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStddevSampOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStreamCursorInput": {
            "initialValue": [
                633
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumStreamCursorValueInput": {
            "domain": [
                578
            ],
            "frequency": [
                797
            ],
            "name": [
                578
            ],
            "tagId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumSumFields": {
            "frequency": [
                797
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumSumOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumUpdateColumn": {},
        "TagEnumUpdates": {
            "_inc": [
                614
            ],
            "_set": [
                625
            ],
            "where": [
                612
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarPopFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarPopOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarSampFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarSampOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarianceFields": {
            "frequency": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "TagEnumVarianceOrderBy": {
            "frequency": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "Thread": {
            "chatbot": [
                54
            ],
            "chatbotId": [
                243
            ],
            "createdAt": [
                811
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
                266,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messagesAggregate": [
                267,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "model": [
                319
            ],
            "modelsEnum": [
                314
            ],
            "parentThreadId": [
                814
            ],
            "thread": [
                644
            ],
            "threadId": [
                814
            ],
            "threads": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadsAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "updatedAt": [
                811
            ],
            "user": [
                745
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAggregate": {
            "aggregate": [
                647
            ],
            "nodes": [
                644
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAggregateBoolExp": {
            "bool_and": [
                808
            ],
            "bool_or": [
                809
            ],
            "count": [
                810
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAggregateFields": {
            "avg": [
                650
            ],
            "count": [
                243,
                {
                    "columns": [
                        665,
                        "[ThreadSelectColumn!]"
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
            "stddev": [
                669
            ],
            "stddevPop": [
                671
            ],
            "stddevSamp": [
                673
            ],
            "sum": [
                677
            ],
            "varPop": [
                681
            ],
            "varSamp": [
                683
            ],
            "variance": [
                685
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAggregateOrderBy": {
            "avg": [
                651
            ],
            "count": [
                336
            ],
            "max": [
                657
            ],
            "min": [
                659
            ],
            "stddev": [
                670
            ],
            "stddevPop": [
                672
            ],
            "stddevSamp": [
                674
            ],
            "sum": [
                678
            ],
            "varPop": [
                682
            ],
            "varSamp": [
                684
            ],
            "variance": [
                686
            ],
            "__typename": [
                578
            ]
        },
        "ThreadArrRelInsertInput": {
            "data": [
                655
            ],
            "onConflict": [
                662
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAvgFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadAvgOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadBoolExp": {
            "_and": [
                652
            ],
            "_not": [
                652
            ],
            "_or": [
                652
            ],
            "chatbot": [
                62
            ],
            "chatbotId": [
                244
            ],
            "createdAt": [
                687
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
                273
            ],
            "messagesAggregate": [
                268
            ],
            "model": [
                320
            ],
            "modelsEnum": [
                317
            ],
            "parentThreadId": [
                789
            ],
            "thread": [
                652
            ],
            "threadId": [
                789
            ],
            "threads": [
                652
            ],
            "threadsAggregate": [
                646
            ],
            "updatedAt": [
                687
            ],
            "user": [
                748
            ],
            "userId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "ThreadConstraint": {},
        "ThreadIncInput": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
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
                811
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
                272
            ],
            "model": [
                319
            ],
            "modelsEnum": [
                325
            ],
            "parentThreadId": [
                814
            ],
            "thread": [
                661
            ],
            "threadId": [
                814
            ],
            "threads": [
                649
            ],
            "updatedAt": [
                811
            ],
            "user": [
                754
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadMaxFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                811
            ],
            "parentThreadId": [
                814
            ],
            "threadId": [
                814
            ],
            "updatedAt": [
                811
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadMaxOrderBy": {
            "chatbotId": [
                336
            ],
            "createdAt": [
                336
            ],
            "parentThreadId": [
                336
            ],
            "threadId": [
                336
            ],
            "updatedAt": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadMinFields": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                811
            ],
            "parentThreadId": [
                814
            ],
            "threadId": [
                814
            ],
            "updatedAt": [
                811
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadMinOrderBy": {
            "chatbotId": [
                336
            ],
            "createdAt": [
                336
            ],
            "parentThreadId": [
                336
            ],
            "threadId": [
                336
            ],
            "updatedAt": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                644
            ],
            "__typename": [
                578
            ]
        },
        "ThreadObjRelInsertInput": {
            "data": [
                655
            ],
            "onConflict": [
                662
            ],
            "__typename": [
                578
            ]
        },
        "ThreadOnConflict": {
            "constraint": [
                653
            ],
            "updateColumns": [
                679
            ],
            "where": [
                652
            ],
            "__typename": [
                578
            ]
        },
        "ThreadOrderBy": {
            "chatbot": [
                153
            ],
            "chatbotId": [
                336
            ],
            "createdAt": [
                336
            ],
            "isApproved": [
                336
            ],
            "isBlocked": [
                336
            ],
            "isPublic": [
                336
            ],
            "messagesAggregate": [
                270
            ],
            "model": [
                336
            ],
            "modelsEnum": [
                327
            ],
            "parentThreadId": [
                336
            ],
            "thread": [
                663
            ],
            "threadId": [
                336
            ],
            "threadsAggregate": [
                648
            ],
            "updatedAt": [
                336
            ],
            "user": [
                756
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadPkColumnsInput": {
            "threadId": [
                814
            ],
            "__typename": [
                578
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
                811
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
                319
            ],
            "parentThreadId": [
                814
            ],
            "threadId": [
                814
            ],
            "updatedAt": [
                811
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStddevSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStreamCursorInput": {
            "initialValue": [
                676
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "ThreadStreamCursorValueInput": {
            "chatbotId": [
                243
            ],
            "createdAt": [
                811
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
                319
            ],
            "parentThreadId": [
                814
            ],
            "threadId": [
                814
            ],
            "updatedAt": [
                811
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "ThreadSumFields": {
            "chatbotId": [
                243
            ],
            "__typename": [
                578
            ]
        },
        "ThreadSumOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadUpdateColumn": {},
        "ThreadUpdates": {
            "_inc": [
                654
            ],
            "_set": [
                668
            ],
            "where": [
                652
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarPopFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarPopOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarSampFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarSampOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarianceFields": {
            "chatbotId": [
                242
            ],
            "__typename": [
                578
            ]
        },
        "ThreadVarianceOrderBy": {
            "chatbotId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TimestamptzComparisonExp": {
            "_eq": [
                811
            ],
            "_gt": [
                811
            ],
            "_gte": [
                811
            ],
            "_in": [
                811
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                811
            ],
            "_lte": [
                811
            ],
            "_neq": [
                811
            ],
            "_nin": [
                811
            ],
            "__typename": [
                578
            ]
        },
        "Token": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "userTokens": [
                763,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokensAggregate": [
                764,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "__typename": [
                578
            ]
        },
        "TokenAggregate": {
            "aggregate": [
                690
            ],
            "nodes": [
                688
            ],
            "__typename": [
                578
            ]
        },
        "TokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        701,
                        "[TokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                694
            ],
            "min": [
                695
            ],
            "__typename": [
                578
            ]
        },
        "TokenBoolExp": {
            "_and": [
                691
            ],
            "_not": [
                691
            ],
            "_or": [
                691
            ],
            "token": [
                579
            ],
            "tokenExpiry": [
                687
            ],
            "userTokens": [
                769
            ],
            "userTokensAggregate": [
                765
            ],
            "__typename": [
                578
            ]
        },
        "TokenConstraint": {},
        "TokenInsertInput": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "userTokens": [
                768
            ],
            "__typename": [
                578
            ]
        },
        "TokenMaxFields": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "__typename": [
                578
            ]
        },
        "TokenMinFields": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "__typename": [
                578
            ]
        },
        "TokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                688
            ],
            "__typename": [
                578
            ]
        },
        "TokenObjRelInsertInput": {
            "data": [
                693
            ],
            "onConflict": [
                698
            ],
            "__typename": [
                578
            ]
        },
        "TokenOnConflict": {
            "constraint": [
                692
            ],
            "updateColumns": [
                705
            ],
            "where": [
                691
            ],
            "__typename": [
                578
            ]
        },
        "TokenOrderBy": {
            "token": [
                336
            ],
            "tokenExpiry": [
                336
            ],
            "userTokensAggregate": [
                767
            ],
            "__typename": [
                578
            ]
        },
        "TokenPkColumnsInput": {
            "token": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TokenSelectColumn": {},
        "TokenSetInput": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "__typename": [
                578
            ]
        },
        "TokenStreamCursorInput": {
            "initialValue": [
                704
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "TokenStreamCursorValueInput": {
            "token": [
                578
            ],
            "tokenExpiry": [
                811
            ],
            "__typename": [
                578
            ]
        },
        "TokenUpdateColumn": {},
        "TokenUpdates": {
            "_set": [
                702
            ],
            "where": [
                691
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnum": {
            "chatbots": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotsAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumAggregate": {
            "aggregate": [
                709
            ],
            "nodes": [
                707
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        720,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                713
            ],
            "min": [
                714
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumBoolExp": {
            "_and": [
                710
            ],
            "_not": [
                710
            ],
            "_or": [
                710
            ],
            "chatbots": [
                62
            ],
            "chatbotsAggregate": [
                56
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumConstraint": {},
        "ToneEnumInsertInput": {
            "chatbots": [
                59
            ],
            "preferences": [
                342
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                707
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumObjRelInsertInput": {
            "data": [
                712
            ],
            "onConflict": [
                717
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumOnConflict": {
            "constraint": [
                711
            ],
            "updateColumns": [
                724
            ],
            "where": [
                710
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumOrderBy": {
            "chatbotsAggregate": [
                58
            ],
            "preferencesAggregate": [
                341
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumSelectColumn": {},
        "ToneEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumStreamCursorInput": {
            "initialValue": [
                723
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "ToneEnumUpdateColumn": {},
        "ToneEnumUpdates": {
            "_set": [
                721
            ],
            "where": [
                710
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnum": {
            "chatbots": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotsAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumAggregate": {
            "aggregate": [
                728
            ],
            "nodes": [
                726
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        739,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                732
            ],
            "min": [
                733
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumBoolExp": {
            "_and": [
                729
            ],
            "_not": [
                729
            ],
            "_or": [
                729
            ],
            "chatbots": [
                62
            ],
            "chatbotsAggregate": [
                56
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "value": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumConstraint": {},
        "TypeEnumInsertInput": {
            "chatbots": [
                59
            ],
            "preferences": [
                342
            ],
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumMaxFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumMinFields": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                726
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumObjRelInsertInput": {
            "data": [
                731
            ],
            "onConflict": [
                736
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumOnConflict": {
            "constraint": [
                730
            ],
            "updateColumns": [
                743
            ],
            "where": [
                729
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumOrderBy": {
            "chatbotsAggregate": [
                58
            ],
            "preferencesAggregate": [
                341
            ],
            "value": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumPkColumnsInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumSelectColumn": {},
        "TypeEnumSetInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumStreamCursorInput": {
            "initialValue": [
                742
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumStreamCursorValueInput": {
            "value": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "TypeEnumUpdateColumn": {},
        "TypeEnumUpdates": {
            "_set": [
                740
            ],
            "where": [
                729
            ],
            "__typename": [
                578
            ]
        },
        "User": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
            ],
            "followers": [
                542,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "followersAggregate": [
                543,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "following": [
                542,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "followingAggregate": [
                543,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
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
                811
            ],
            "password": [
                578
            ],
            "preferences": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferencesAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "prompts": [
                473,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "promptsAggregate": [
                474,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "referrals": [
                519,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralsAggregate": [
                520,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralsByUserId": [
                519,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralsByUserIdAggregate": [
                520,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "threads": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadsAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "userId": [
                814
            ],
            "userTokens": [
                763,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokensAggregate": [
                764,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserAggregate": {
            "aggregate": [
                747
            ],
            "nodes": [
                745
            ],
            "__typename": [
                578
            ]
        },
        "UserAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        759,
                        "[UserSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                751
            ],
            "min": [
                752
            ],
            "__typename": [
                578
            ]
        },
        "UserBoolExp": {
            "_and": [
                748
            ],
            "_not": [
                748
            ],
            "_or": [
                748
            ],
            "bio": [
                579
            ],
            "dateJoined": [
                687
            ],
            "email": [
                579
            ],
            "favouriteTopic": [
                579
            ],
            "followers": [
                550
            ],
            "followersAggregate": [
                544
            ],
            "following": [
                550
            ],
            "followingAggregate": [
                544
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
                687
            ],
            "password": [
                579
            ],
            "preferences": [
                345
            ],
            "preferencesAggregate": [
                339
            ],
            "proUserSubscriptionId": [
                579
            ],
            "profilePicture": [
                579
            ],
            "prompts": [
                481
            ],
            "promptsAggregate": [
                475
            ],
            "referrals": [
                525
            ],
            "referralsAggregate": [
                521
            ],
            "referralsByUserId": [
                525
            ],
            "referralsByUserIdAggregate": [
                521
            ],
            "role": [
                758
            ],
            "slug": [
                579
            ],
            "threads": [
                652
            ],
            "threadsAggregate": [
                646
            ],
            "userId": [
                789
            ],
            "userTokens": [
                769
            ],
            "userTokensAggregate": [
                765
            ],
            "username": [
                579
            ],
            "__typename": [
                578
            ]
        },
        "UserConstraint": {},
        "UserInsertInput": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
            ],
            "followers": [
                547
            ],
            "following": [
                547
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
                811
            ],
            "password": [
                578
            ],
            "preferences": [
                342
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "prompts": [
                478
            ],
            "referrals": [
                524
            ],
            "referralsByUserId": [
                524
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "threads": [
                649
            ],
            "userId": [
                814
            ],
            "userTokens": [
                768
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserMaxFields": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
            ],
            "lastLogin": [
                811
            ],
            "password": [
                578
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "userId": [
                814
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserMinFields": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
            ],
            "lastLogin": [
                811
            ],
            "password": [
                578
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "userId": [
                814
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                745
            ],
            "__typename": [
                578
            ]
        },
        "UserObjRelInsertInput": {
            "data": [
                750
            ],
            "onConflict": [
                755
            ],
            "__typename": [
                578
            ]
        },
        "UserOnConflict": {
            "constraint": [
                749
            ],
            "updateColumns": [
                786
            ],
            "where": [
                748
            ],
            "__typename": [
                578
            ]
        },
        "UserOrderBy": {
            "bio": [
                336
            ],
            "dateJoined": [
                336
            ],
            "email": [
                336
            ],
            "favouriteTopic": [
                336
            ],
            "followersAggregate": [
                546
            ],
            "followingAggregate": [
                546
            ],
            "getFreeMonth": [
                336
            ],
            "isBlocked": [
                336
            ],
            "isVerified": [
                336
            ],
            "lastLogin": [
                336
            ],
            "password": [
                336
            ],
            "preferencesAggregate": [
                341
            ],
            "proUserSubscriptionId": [
                336
            ],
            "profilePicture": [
                336
            ],
            "promptsAggregate": [
                477
            ],
            "referralsAggregate": [
                523
            ],
            "referralsByUserIdAggregate": [
                523
            ],
            "role": [
                336
            ],
            "slug": [
                336
            ],
            "threadsAggregate": [
                648
            ],
            "userId": [
                336
            ],
            "userTokensAggregate": [
                767
            ],
            "username": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "UserPkColumnsInput": {
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserRoleComparisonExp": {
            "_eq": [
                813
            ],
            "_gt": [
                813
            ],
            "_gte": [
                813
            ],
            "_in": [
                813
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                813
            ],
            "_lte": [
                813
            ],
            "_neq": [
                813
            ],
            "_nin": [
                813
            ],
            "__typename": [
                578
            ]
        },
        "UserSelectColumn": {},
        "UserSetInput": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
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
                811
            ],
            "password": [
                578
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "userId": [
                814
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserStreamCursorInput": {
            "initialValue": [
                762
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "UserStreamCursorValueInput": {
            "bio": [
                578
            ],
            "dateJoined": [
                811
            ],
            "email": [
                578
            ],
            "favouriteTopic": [
                578
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
                811
            ],
            "password": [
                578
            ],
            "proUserSubscriptionId": [
                578
            ],
            "profilePicture": [
                578
            ],
            "role": [
                813
            ],
            "slug": [
                578
            ],
            "userId": [
                814
            ],
            "username": [
                578
            ],
            "__typename": [
                578
            ]
        },
        "UserToken": {
            "token": [
                578
            ],
            "tokenByToken": [
                688
            ],
            "user": [
                745
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenAggregate": {
            "aggregate": [
                766
            ],
            "nodes": [
                763
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenAggregateBoolExp": {
            "count": [
                812
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenAggregateFields": {
            "count": [
                243,
                {
                    "columns": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "distinct": [
                        0
                    ]
                }
            ],
            "max": [
                772
            ],
            "min": [
                774
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenAggregateOrderBy": {
            "count": [
                336
            ],
            "max": [
                773
            ],
            "min": [
                775
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenArrRelInsertInput": {
            "data": [
                771
            ],
            "onConflict": [
                777
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenBoolExp": {
            "_and": [
                769
            ],
            "_not": [
                769
            ],
            "_or": [
                769
            ],
            "token": [
                579
            ],
            "tokenByToken": [
                691
            ],
            "user": [
                748
            ],
            "userId": [
                789
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenConstraint": {},
        "UserTokenInsertInput": {
            "token": [
                578
            ],
            "tokenByToken": [
                697
            ],
            "user": [
                754
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenMaxFields": {
            "token": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenMaxOrderBy": {
            "token": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenMinFields": {
            "token": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenMinOrderBy": {
            "token": [
                336
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenMutationResponse": {
            "affectedRows": [
                243
            ],
            "returning": [
                763
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenOnConflict": {
            "constraint": [
                770
            ],
            "updateColumns": [
                784
            ],
            "where": [
                769
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenOrderBy": {
            "token": [
                336
            ],
            "tokenByToken": [
                699
            ],
            "user": [
                756
            ],
            "userId": [
                336
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenPkColumnsInput": {
            "token": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenSelectColumn": {},
        "UserTokenSetInput": {
            "token": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenStreamCursorInput": {
            "initialValue": [
                783
            ],
            "ordering": [
                194
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenStreamCursorValueInput": {
            "token": [
                578
            ],
            "userId": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UserTokenUpdateColumn": {},
        "UserTokenUpdates": {
            "_set": [
                781
            ],
            "where": [
                769
            ],
            "__typename": [
                578
            ]
        },
        "UserUpdateColumn": {},
        "UserUpdates": {
            "_set": [
                760
            ],
            "where": [
                748
            ],
            "__typename": [
                578
            ]
        },
        "UuidArrayComparisonExp": {
            "_containedIn": [
                814
            ],
            "_contains": [
                814
            ],
            "_eq": [
                814
            ],
            "_gt": [
                814
            ],
            "_gte": [
                814
            ],
            "_in": [
                814
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                814
            ],
            "_lte": [
                814
            ],
            "_neq": [
                814
            ],
            "_nin": [
                814
            ],
            "__typename": [
                578
            ]
        },
        "UuidComparisonExp": {
            "_eq": [
                814
            ],
            "_gt": [
                814
            ],
            "_gte": [
                814
            ],
            "_in": [
                814
            ],
            "_isNull": [
                0
            ],
            "_lt": [
                814
            ],
            "_lte": [
                814
            ],
            "_neq": [
                814
            ],
            "_nin": [
                814
            ],
            "__typename": [
                578
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
                578
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
                62
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "chatbotCategoryAggregateBoolExpCount": {
            "arguments": [
                83
            ],
            "distinct": [
                0
            ],
            "filter": [
                71
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "chatbotDomainAggregateBoolExpCount": {
            "arguments": [
                124
            ],
            "distinct": [
                0
            ],
            "filter": [
                112
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
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
                578
            ]
        },
        "jsonb": {},
        "messageAggregateBoolExpCount": {
            "arguments": [
                289
            ],
            "distinct": [
                0
            ],
            "filter": [
                273
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "numeric": {},
        "preferenceAggregateBoolExpBool_and": {
            "arguments": [
                358
            ],
            "distinct": [
                0
            ],
            "filter": [
                345
            ],
            "predicate": [
                1
            ],
            "__typename": [
                578
            ]
        },
        "preferenceAggregateBoolExpBool_or": {
            "arguments": [
                359
            ],
            "distinct": [
                0
            ],
            "filter": [
                345
            ],
            "predicate": [
                1
            ],
            "__typename": [
                578
            ]
        },
        "preferenceAggregateBoolExpCount": {
            "arguments": [
                357
            ],
            "distinct": [
                0
            ],
            "filter": [
                345
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "promptAggregateBoolExpCount": {
            "arguments": [
                440
            ],
            "distinct": [
                0
            ],
            "filter": [
                387
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "promptChatbotAggregateBoolExpCount": {
            "arguments": [
                408
            ],
            "distinct": [
                0
            ],
            "filter": [
                396
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "promptUserAggregateBoolExpCount": {
            "arguments": [
                493
            ],
            "distinct": [
                0
            ],
            "filter": [
                481
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "referralAggregateBoolExpCount": {
            "arguments": [
                536
            ],
            "distinct": [
                0
            ],
            "filter": [
                525
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "socialFollowingAggregateBoolExpCount": {
            "arguments": [
                559
            ],
            "distinct": [
                0
            ],
            "filter": [
                550
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "subcategoryEnumAggregateBoolExpCount": {
            "arguments": [
                598
            ],
            "distinct": [
                0
            ],
            "filter": [
                586
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "tagEnumAggregateBoolExpCount": {
            "arguments": [
                624
            ],
            "distinct": [
                0
            ],
            "filter": [
                612
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "threadAggregateBoolExpBool_and": {
            "arguments": [
                666
            ],
            "distinct": [
                0
            ],
            "filter": [
                652
            ],
            "predicate": [
                1
            ],
            "__typename": [
                578
            ]
        },
        "threadAggregateBoolExpBool_or": {
            "arguments": [
                667
            ],
            "distinct": [
                0
            ],
            "filter": [
                652
            ],
            "predicate": [
                1
            ],
            "__typename": [
                578
            ]
        },
        "threadAggregateBoolExpCount": {
            "arguments": [
                665
            ],
            "distinct": [
                0
            ],
            "filter": [
                652
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
            ]
        },
        "timestamptz": {},
        "userTokenAggregateBoolExpCount": {
            "arguments": [
                780
            ],
            "distinct": [
                0
            ],
            "filter": [
                769
            ],
            "predicate": [
                244
            ],
            "__typename": [
                578
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
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "chatbot": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "chatbotByPk": [
                54,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                63,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                64,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                63,
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
            "chatbotDomain": [
                104,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotDomainAggregate": [
                105,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotDomainByPk": [
                104,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainName": [
                        578,
                        "String!"
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
                        578,
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
                        578,
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
                        814,
                        "uuid!"
                    ]
                }
            ],
            "lengthEnum": [
                247,
                {
                    "distinctOn": [
                        260,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        258,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "lengthEnumAggregate": [
                248,
                {
                    "distinctOn": [
                        260,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        258,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "lengthEnumByPk": [
                247,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "message": [
                266,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messageAggregate": [
                267,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messageByPk": [
                266,
                {
                    "messageId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "messageTypeEnum": [
                293,
                {
                    "distinctOn": [
                        306,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        304,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                294,
                {
                    "distinctOn": [
                        306,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        304,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                293,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "modelsEnum": [
                314,
                {
                    "distinctOn": [
                        329,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        327,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        317
                    ]
                }
            ],
            "modelsEnumAggregate": [
                315,
                {
                    "distinctOn": [
                        329,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        327,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        317
                    ]
                }
            ],
            "modelsEnumByPk": [
                314,
                {
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "preference": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferenceAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferenceByPk": [
                337,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "prompt": [
                379,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptAggregate": [
                380,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptByPk": [
                379,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                388,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptChatbotAggregate": [
                389,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptChatbotByPk": [
                388,
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
                452,
                {
                    "distinctOn": [
                        465,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        463,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                453,
                {
                    "distinctOn": [
                        465,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        463,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                452,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "promptUser": [
                473,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "promptUserAggregate": [
                474,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "promptUserByPk": [
                473,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "referral": [
                519,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralAggregate": [
                520,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralByPk": [
                519,
                {
                    "referralCode": [
                        578,
                        "String!"
                    ]
                }
            ],
            "socialFollowing": [
                542,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "socialFollowingAggregate": [
                543,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "subcategoryEnum": [
                580,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                581,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                580,
                {
                    "category": [
                        578,
                        "String!"
                    ],
                    "domain": [
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "tagEnum": [
                604,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "tagEnumAggregate": [
                605,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "tagEnumByPk": [
                604,
                {
                    "tagId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "thread": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadByPk": [
                644,
                {
                    "threadId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "token": [
                688,
                {
                    "distinctOn": [
                        701,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        699,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        691
                    ]
                }
            ],
            "tokenAggregate": [
                689,
                {
                    "distinctOn": [
                        701,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        699,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        691
                    ]
                }
            ],
            "tokenByPk": [
                688,
                {
                    "token": [
                        578,
                        "String!"
                    ]
                }
            ],
            "toneEnum": [
                707,
                {
                    "distinctOn": [
                        720,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        718,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        710
                    ]
                }
            ],
            "toneEnumAggregate": [
                708,
                {
                    "distinctOn": [
                        720,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        718,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        710
                    ]
                }
            ],
            "toneEnumByPk": [
                707,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "typeEnum": [
                726,
                {
                    "distinctOn": [
                        739,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        737,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        729
                    ]
                }
            ],
            "typeEnumAggregate": [
                727,
                {
                    "distinctOn": [
                        739,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        737,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        729
                    ]
                }
            ],
            "typeEnumByPk": [
                726,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "user": [
                745,
                {
                    "distinctOn": [
                        759,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        756,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        748
                    ]
                }
            ],
            "userAggregate": [
                746,
                {
                    "distinctOn": [
                        759,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        756,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        748
                    ]
                }
            ],
            "userByPk": [
                745,
                {
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "userToken": [
                763,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokenAggregate": [
                764,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokenByPk": [
                763,
                {
                    "token": [
                        578,
                        "String!"
                    ],
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "__typename": [
                578
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
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteChatbot": [
                150,
                {
                    "where": [
                        62,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "deleteChatbotByPk": [
                54,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deleteChatbotCategory": [
                79,
                {
                    "where": [
                        71,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "deleteChatbotCategoryByPk": [
                63,
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
            "deleteChatbotDomain": [
                120,
                {
                    "where": [
                        112,
                        "ChatbotDomainBoolExp!"
                    ]
                }
            ],
            "deleteChatbotDomainByPk": [
                104,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainName": [
                        578,
                        "String!"
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
                        578,
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
                        578,
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
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteLengthEnum": [
                255,
                {
                    "where": [
                        250,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "deleteLengthEnumByPk": [
                247,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteMessage": [
                283,
                {
                    "where": [
                        273,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "deleteMessageByPk": [
                266,
                {
                    "messageId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteMessageTypeEnum": [
                301,
                {
                    "where": [
                        296,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteMessageTypeEnumByPk": [
                293,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteModelsEnum": [
                324,
                {
                    "where": [
                        317,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "deleteModelsEnumByPk": [
                314,
                {
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deletePreference": [
                353,
                {
                    "where": [
                        345,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "deletePreferenceByPk": [
                337,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePrompt": [
                435,
                {
                    "where": [
                        387,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "deletePromptByPk": [
                379,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "deletePromptChatbot": [
                404,
                {
                    "where": [
                        396,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "deletePromptChatbotByPk": [
                388,
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
                460,
                {
                    "where": [
                        455,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "deletePromptTypeEnumByPk": [
                452,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deletePromptUser": [
                489,
                {
                    "where": [
                        481,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "deletePromptUserByPk": [
                473,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteReferral": [
                532,
                {
                    "where": [
                        525,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "deleteReferralByPk": [
                519,
                {
                    "referralCode": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteSocialFollowing": [
                557,
                {
                    "where": [
                        550,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnum": [
                593,
                {
                    "where": [
                        586,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "deleteSubcategoryEnumByPk": [
                580,
                {
                    "category": [
                        578,
                        "String!"
                    ],
                    "domain": [
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteTagEnum": [
                620,
                {
                    "where": [
                        612,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "deleteTagEnumByPk": [
                604,
                {
                    "tagId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteThread": [
                660,
                {
                    "where": [
                        652,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "deleteThreadByPk": [
                644,
                {
                    "threadId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteToken": [
                696,
                {
                    "where": [
                        691,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "deleteTokenByPk": [
                688,
                {
                    "token": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteToneEnum": [
                715,
                {
                    "where": [
                        710,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "deleteToneEnumByPk": [
                707,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteTypeEnum": [
                734,
                {
                    "where": [
                        729,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "deleteTypeEnumByPk": [
                726,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                753,
                {
                    "where": [
                        748,
                        "UserBoolExp!"
                    ]
                }
            ],
            "deleteUserByPk": [
                745,
                {
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "deleteUserToken": [
                776,
                {
                    "where": [
                        769,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "deleteUserTokenByPk": [
                763,
                {
                    "token": [
                        578,
                        "String!"
                    ],
                    "userId": [
                        814,
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
                79,
                {
                    "objects": [
                        74,
                        "[ChatbotCategoryInsertInput!]!"
                    ],
                    "onConflict": [
                        80
                    ]
                }
            ],
            "insertChatbotCategoryOne": [
                63,
                {
                    "object": [
                        74,
                        "ChatbotCategoryInsertInput!"
                    ],
                    "onConflict": [
                        80
                    ]
                }
            ],
            "insertChatbotDomain": [
                120,
                {
                    "objects": [
                        115,
                        "[ChatbotDomainInsertInput!]!"
                    ],
                    "onConflict": [
                        121
                    ]
                }
            ],
            "insertChatbotDomainOne": [
                104,
                {
                    "object": [
                        115,
                        "ChatbotDomainInsertInput!"
                    ],
                    "onConflict": [
                        121
                    ]
                }
            ],
            "insertChatbotOne": [
                54,
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
            "insertLengthEnum": [
                255,
                {
                    "objects": [
                        252,
                        "[LengthEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        257
                    ]
                }
            ],
            "insertLengthEnumOne": [
                247,
                {
                    "object": [
                        252,
                        "LengthEnumInsertInput!"
                    ],
                    "onConflict": [
                        257
                    ]
                }
            ],
            "insertMessage": [
                283,
                {
                    "objects": [
                        278,
                        "[MessageInsertInput!]!"
                    ],
                    "onConflict": [
                        285
                    ]
                }
            ],
            "insertMessageOne": [
                266,
                {
                    "object": [
                        278,
                        "MessageInsertInput!"
                    ],
                    "onConflict": [
                        285
                    ]
                }
            ],
            "insertMessageTypeEnum": [
                301,
                {
                    "objects": [
                        298,
                        "[MessageTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        303
                    ]
                }
            ],
            "insertMessageTypeEnumOne": [
                293,
                {
                    "object": [
                        298,
                        "MessageTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        303
                    ]
                }
            ],
            "insertModelsEnum": [
                324,
                {
                    "objects": [
                        321,
                        "[ModelsEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        326
                    ]
                }
            ],
            "insertModelsEnumOne": [
                314,
                {
                    "object": [
                        321,
                        "ModelsEnumInsertInput!"
                    ],
                    "onConflict": [
                        326
                    ]
                }
            ],
            "insertPreference": [
                353,
                {
                    "objects": [
                        348,
                        "[PreferenceInsertInput!]!"
                    ],
                    "onConflict": [
                        354
                    ]
                }
            ],
            "insertPreferenceOne": [
                337,
                {
                    "object": [
                        348,
                        "PreferenceInsertInput!"
                    ],
                    "onConflict": [
                        354
                    ]
                }
            ],
            "insertPrompt": [
                435,
                {
                    "objects": [
                        430,
                        "[PromptInsertInput!]!"
                    ],
                    "onConflict": [
                        437
                    ]
                }
            ],
            "insertPromptChatbot": [
                404,
                {
                    "objects": [
                        399,
                        "[PromptChatbotInsertInput!]!"
                    ],
                    "onConflict": [
                        405
                    ]
                }
            ],
            "insertPromptChatbotOne": [
                388,
                {
                    "object": [
                        399,
                        "PromptChatbotInsertInput!"
                    ],
                    "onConflict": [
                        405
                    ]
                }
            ],
            "insertPromptOne": [
                379,
                {
                    "object": [
                        430,
                        "PromptInsertInput!"
                    ],
                    "onConflict": [
                        437
                    ]
                }
            ],
            "insertPromptTypeEnum": [
                460,
                {
                    "objects": [
                        457,
                        "[PromptTypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        462
                    ]
                }
            ],
            "insertPromptTypeEnumOne": [
                452,
                {
                    "object": [
                        457,
                        "PromptTypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        462
                    ]
                }
            ],
            "insertPromptUser": [
                489,
                {
                    "objects": [
                        484,
                        "[PromptUserInsertInput!]!"
                    ],
                    "onConflict": [
                        490
                    ]
                }
            ],
            "insertPromptUserOne": [
                473,
                {
                    "object": [
                        484,
                        "PromptUserInsertInput!"
                    ],
                    "onConflict": [
                        490
                    ]
                }
            ],
            "insertReferral": [
                532,
                {
                    "objects": [
                        527,
                        "[ReferralInsertInput!]!"
                    ],
                    "onConflict": [
                        533
                    ]
                }
            ],
            "insertReferralOne": [
                519,
                {
                    "object": [
                        527,
                        "ReferralInsertInput!"
                    ],
                    "onConflict": [
                        533
                    ]
                }
            ],
            "insertSocialFollowing": [
                557,
                {
                    "objects": [
                        552,
                        "[SocialFollowingInsertInput!]!"
                    ]
                }
            ],
            "insertSocialFollowingOne": [
                542,
                {
                    "object": [
                        552,
                        "SocialFollowingInsertInput!"
                    ]
                }
            ],
            "insertSubcategoryEnum": [
                593,
                {
                    "objects": [
                        588,
                        "[SubcategoryEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        595
                    ]
                }
            ],
            "insertSubcategoryEnumOne": [
                580,
                {
                    "object": [
                        588,
                        "SubcategoryEnumInsertInput!"
                    ],
                    "onConflict": [
                        595
                    ]
                }
            ],
            "insertTagEnum": [
                620,
                {
                    "objects": [
                        615,
                        "[TagEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        621
                    ]
                }
            ],
            "insertTagEnumOne": [
                604,
                {
                    "object": [
                        615,
                        "TagEnumInsertInput!"
                    ],
                    "onConflict": [
                        621
                    ]
                }
            ],
            "insertThread": [
                660,
                {
                    "objects": [
                        655,
                        "[ThreadInsertInput!]!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertThreadOne": [
                644,
                {
                    "object": [
                        655,
                        "ThreadInsertInput!"
                    ],
                    "onConflict": [
                        662
                    ]
                }
            ],
            "insertToken": [
                696,
                {
                    "objects": [
                        693,
                        "[TokenInsertInput!]!"
                    ],
                    "onConflict": [
                        698
                    ]
                }
            ],
            "insertTokenOne": [
                688,
                {
                    "object": [
                        693,
                        "TokenInsertInput!"
                    ],
                    "onConflict": [
                        698
                    ]
                }
            ],
            "insertToneEnum": [
                715,
                {
                    "objects": [
                        712,
                        "[ToneEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        717
                    ]
                }
            ],
            "insertToneEnumOne": [
                707,
                {
                    "object": [
                        712,
                        "ToneEnumInsertInput!"
                    ],
                    "onConflict": [
                        717
                    ]
                }
            ],
            "insertTypeEnum": [
                734,
                {
                    "objects": [
                        731,
                        "[TypeEnumInsertInput!]!"
                    ],
                    "onConflict": [
                        736
                    ]
                }
            ],
            "insertTypeEnumOne": [
                726,
                {
                    "object": [
                        731,
                        "TypeEnumInsertInput!"
                    ],
                    "onConflict": [
                        736
                    ]
                }
            ],
            "insertUser": [
                753,
                {
                    "objects": [
                        750,
                        "[UserInsertInput!]!"
                    ],
                    "onConflict": [
                        755
                    ]
                }
            ],
            "insertUserOne": [
                745,
                {
                    "object": [
                        750,
                        "UserInsertInput!"
                    ],
                    "onConflict": [
                        755
                    ]
                }
            ],
            "insertUserToken": [
                776,
                {
                    "objects": [
                        771,
                        "[UserTokenInsertInput!]!"
                    ],
                    "onConflict": [
                        777
                    ]
                }
            ],
            "insertUserTokenOne": [
                763,
                {
                    "object": [
                        771,
                        "UserTokenInsertInput!"
                    ],
                    "onConflict": [
                        777
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
                        62,
                        "ChatbotBoolExp!"
                    ]
                }
            ],
            "updateChatbotByPk": [
                54,
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
                79,
                {
                    "_inc": [
                        73
                    ],
                    "_set": [
                        84
                    ],
                    "where": [
                        71,
                        "ChatbotCategoryBoolExp!"
                    ]
                }
            ],
            "updateChatbotCategoryByPk": [
                63,
                {
                    "_inc": [
                        73
                    ],
                    "_set": [
                        84
                    ],
                    "pkColumns": [
                        82,
                        "ChatbotCategoryPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotCategoryMany": [
                79,
                {
                    "updates": [
                        96,
                        "[ChatbotCategoryUpdates!]!"
                    ]
                }
            ],
            "updateChatbotDomain": [
                120,
                {
                    "_inc": [
                        114
                    ],
                    "_set": [
                        125
                    ],
                    "where": [
                        112,
                        "ChatbotDomainBoolExp!"
                    ]
                }
            ],
            "updateChatbotDomainByPk": [
                104,
                {
                    "_inc": [
                        114
                    ],
                    "_set": [
                        125
                    ],
                    "pkColumns": [
                        123,
                        "ChatbotDomainPkColumnsInput!"
                    ]
                }
            ],
            "updateChatbotDomainMany": [
                120,
                {
                    "updates": [
                        137,
                        "[ChatbotDomainUpdates!]!"
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
            "updateLengthEnum": [
                255,
                {
                    "_set": [
                        261
                    ],
                    "where": [
                        250,
                        "LengthEnumBoolExp!"
                    ]
                }
            ],
            "updateLengthEnumByPk": [
                247,
                {
                    "_set": [
                        261
                    ],
                    "pkColumns": [
                        259,
                        "LengthEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateLengthEnumMany": [
                255,
                {
                    "updates": [
                        265,
                        "[LengthEnumUpdates!]!"
                    ]
                }
            ],
            "updateMessage": [
                283,
                {
                    "_append": [
                        271
                    ],
                    "_deleteAtPath": [
                        275
                    ],
                    "_deleteElem": [
                        276
                    ],
                    "_deleteKey": [
                        277
                    ],
                    "_prepend": [
                        288
                    ],
                    "_set": [
                        290
                    ],
                    "where": [
                        273,
                        "MessageBoolExp!"
                    ]
                }
            ],
            "updateMessageByPk": [
                266,
                {
                    "_append": [
                        271
                    ],
                    "_deleteAtPath": [
                        275
                    ],
                    "_deleteElem": [
                        276
                    ],
                    "_deleteKey": [
                        277
                    ],
                    "_prepend": [
                        288
                    ],
                    "_set": [
                        290
                    ],
                    "pkColumns": [
                        287,
                        "MessagePkColumnsInput!"
                    ]
                }
            ],
            "updateMessageMany": [
                283,
                {
                    "updates": [
                        313,
                        "[MessageUpdates!]!"
                    ]
                }
            ],
            "updateMessageTypeEnum": [
                301,
                {
                    "_set": [
                        307
                    ],
                    "where": [
                        296,
                        "MessageTypeEnumBoolExp!"
                    ]
                }
            ],
            "updateMessageTypeEnumByPk": [
                293,
                {
                    "_set": [
                        307
                    ],
                    "pkColumns": [
                        305,
                        "MessageTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateMessageTypeEnumMany": [
                301,
                {
                    "updates": [
                        311,
                        "[MessageTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateModelsEnum": [
                324,
                {
                    "_set": [
                        330
                    ],
                    "where": [
                        317,
                        "ModelsEnumBoolExp!"
                    ]
                }
            ],
            "updateModelsEnumByPk": [
                314,
                {
                    "_set": [
                        330
                    ],
                    "pkColumns": [
                        328,
                        "ModelsEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateModelsEnumMany": [
                324,
                {
                    "updates": [
                        334,
                        "[ModelsEnumUpdates!]!"
                    ]
                }
            ],
            "updatePreference": [
                353,
                {
                    "_inc": [
                        347
                    ],
                    "_set": [
                        360
                    ],
                    "where": [
                        345,
                        "PreferenceBoolExp!"
                    ]
                }
            ],
            "updatePreferenceByPk": [
                337,
                {
                    "_inc": [
                        347
                    ],
                    "_set": [
                        360
                    ],
                    "pkColumns": [
                        356,
                        "PreferencePkColumnsInput!"
                    ]
                }
            ],
            "updatePreferenceMany": [
                353,
                {
                    "updates": [
                        372,
                        "[PreferenceUpdates!]!"
                    ]
                }
            ],
            "updatePrompt": [
                435,
                {
                    "_inc": [
                        429
                    ],
                    "_set": [
                        441
                    ],
                    "where": [
                        387,
                        "PromptBoolExp!"
                    ]
                }
            ],
            "updatePromptByPk": [
                379,
                {
                    "_inc": [
                        429
                    ],
                    "_set": [
                        441
                    ],
                    "pkColumns": [
                        439,
                        "PromptPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbot": [
                404,
                {
                    "_inc": [
                        398
                    ],
                    "_set": [
                        409
                    ],
                    "where": [
                        396,
                        "PromptChatbotBoolExp!"
                    ]
                }
            ],
            "updatePromptChatbotByPk": [
                388,
                {
                    "_inc": [
                        398
                    ],
                    "_set": [
                        409
                    ],
                    "pkColumns": [
                        407,
                        "PromptChatbotPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptChatbotMany": [
                404,
                {
                    "updates": [
                        421,
                        "[PromptChatbotUpdates!]!"
                    ]
                }
            ],
            "updatePromptMany": [
                435,
                {
                    "updates": [
                        472,
                        "[PromptUpdates!]!"
                    ]
                }
            ],
            "updatePromptTypeEnum": [
                460,
                {
                    "_set": [
                        466
                    ],
                    "where": [
                        455,
                        "PromptTypeEnumBoolExp!"
                    ]
                }
            ],
            "updatePromptTypeEnumByPk": [
                452,
                {
                    "_set": [
                        466
                    ],
                    "pkColumns": [
                        464,
                        "PromptTypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptTypeEnumMany": [
                460,
                {
                    "updates": [
                        470,
                        "[PromptTypeEnumUpdates!]!"
                    ]
                }
            ],
            "updatePromptUser": [
                489,
                {
                    "_inc": [
                        483
                    ],
                    "_set": [
                        494
                    ],
                    "where": [
                        481,
                        "PromptUserBoolExp!"
                    ]
                }
            ],
            "updatePromptUserByPk": [
                473,
                {
                    "_inc": [
                        483
                    ],
                    "_set": [
                        494
                    ],
                    "pkColumns": [
                        492,
                        "PromptUserPkColumnsInput!"
                    ]
                }
            ],
            "updatePromptUserMany": [
                489,
                {
                    "updates": [
                        506,
                        "[PromptUserUpdates!]!"
                    ]
                }
            ],
            "updateReferral": [
                532,
                {
                    "_set": [
                        537
                    ],
                    "where": [
                        525,
                        "ReferralBoolExp!"
                    ]
                }
            ],
            "updateReferralByPk": [
                519,
                {
                    "_set": [
                        537
                    ],
                    "pkColumns": [
                        535,
                        "ReferralPkColumnsInput!"
                    ]
                }
            ],
            "updateReferralMany": [
                532,
                {
                    "updates": [
                        541,
                        "[ReferralUpdates!]!"
                    ]
                }
            ],
            "updateSocialFollowing": [
                557,
                {
                    "_inc": [
                        551
                    ],
                    "_set": [
                        560
                    ],
                    "where": [
                        550,
                        "SocialFollowingBoolExp!"
                    ]
                }
            ],
            "updateSocialFollowingMany": [
                557,
                {
                    "updates": [
                        571,
                        "[SocialFollowingUpdates!]!"
                    ]
                }
            ],
            "updateSubcategoryEnum": [
                593,
                {
                    "_set": [
                        599
                    ],
                    "where": [
                        586,
                        "SubcategoryEnumBoolExp!"
                    ]
                }
            ],
            "updateSubcategoryEnumByPk": [
                580,
                {
                    "_set": [
                        599
                    ],
                    "pkColumns": [
                        597,
                        "SubcategoryEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateSubcategoryEnumMany": [
                593,
                {
                    "updates": [
                        603,
                        "[SubcategoryEnumUpdates!]!"
                    ]
                }
            ],
            "updateTagEnum": [
                620,
                {
                    "_inc": [
                        614
                    ],
                    "_set": [
                        625
                    ],
                    "where": [
                        612,
                        "TagEnumBoolExp!"
                    ]
                }
            ],
            "updateTagEnumByPk": [
                604,
                {
                    "_inc": [
                        614
                    ],
                    "_set": [
                        625
                    ],
                    "pkColumns": [
                        623,
                        "TagEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTagEnumMany": [
                620,
                {
                    "updates": [
                        637,
                        "[TagEnumUpdates!]!"
                    ]
                }
            ],
            "updateThread": [
                660,
                {
                    "_inc": [
                        654
                    ],
                    "_set": [
                        668
                    ],
                    "where": [
                        652,
                        "ThreadBoolExp!"
                    ]
                }
            ],
            "updateThreadByPk": [
                644,
                {
                    "_inc": [
                        654
                    ],
                    "_set": [
                        668
                    ],
                    "pkColumns": [
                        664,
                        "ThreadPkColumnsInput!"
                    ]
                }
            ],
            "updateThreadMany": [
                660,
                {
                    "updates": [
                        680,
                        "[ThreadUpdates!]!"
                    ]
                }
            ],
            "updateToken": [
                696,
                {
                    "_set": [
                        702
                    ],
                    "where": [
                        691,
                        "TokenBoolExp!"
                    ]
                }
            ],
            "updateTokenByPk": [
                688,
                {
                    "_set": [
                        702
                    ],
                    "pkColumns": [
                        700,
                        "TokenPkColumnsInput!"
                    ]
                }
            ],
            "updateTokenMany": [
                696,
                {
                    "updates": [
                        706,
                        "[TokenUpdates!]!"
                    ]
                }
            ],
            "updateToneEnum": [
                715,
                {
                    "_set": [
                        721
                    ],
                    "where": [
                        710,
                        "ToneEnumBoolExp!"
                    ]
                }
            ],
            "updateToneEnumByPk": [
                707,
                {
                    "_set": [
                        721
                    ],
                    "pkColumns": [
                        719,
                        "ToneEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateToneEnumMany": [
                715,
                {
                    "updates": [
                        725,
                        "[ToneEnumUpdates!]!"
                    ]
                }
            ],
            "updateTypeEnum": [
                734,
                {
                    "_set": [
                        740
                    ],
                    "where": [
                        729,
                        "TypeEnumBoolExp!"
                    ]
                }
            ],
            "updateTypeEnumByPk": [
                726,
                {
                    "_set": [
                        740
                    ],
                    "pkColumns": [
                        738,
                        "TypeEnumPkColumnsInput!"
                    ]
                }
            ],
            "updateTypeEnumMany": [
                734,
                {
                    "updates": [
                        744,
                        "[TypeEnumUpdates!]!"
                    ]
                }
            ],
            "updateUser": [
                753,
                {
                    "_set": [
                        760
                    ],
                    "where": [
                        748,
                        "UserBoolExp!"
                    ]
                }
            ],
            "updateUserByPk": [
                745,
                {
                    "_set": [
                        760
                    ],
                    "pkColumns": [
                        757,
                        "UserPkColumnsInput!"
                    ]
                }
            ],
            "updateUserMany": [
                753,
                {
                    "updates": [
                        787,
                        "[UserUpdates!]!"
                    ]
                }
            ],
            "updateUserToken": [
                776,
                {
                    "_set": [
                        781
                    ],
                    "where": [
                        769,
                        "UserTokenBoolExp!"
                    ]
                }
            ],
            "updateUserTokenByPk": [
                763,
                {
                    "_set": [
                        781
                    ],
                    "pkColumns": [
                        779,
                        "UserTokenPkColumnsInput!"
                    ]
                }
            ],
            "updateUserTokenMany": [
                776,
                {
                    "updates": [
                        785,
                        "[UserTokenUpdates!]!"
                    ]
                }
            ],
            "__typename": [
                578
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
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
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
            "chatbot": [
                54,
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
                        62
                    ]
                }
            ],
            "chatbotAggregate": [
                55,
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
                        62
                    ]
                }
            ],
            "chatbotByPk": [
                54,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "chatbotCategory": [
                63,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotCategoryAggregate": [
                64,
                {
                    "distinctOn": [
                        83,
                        "[ChatbotCategorySelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        81,
                        "[ChatbotCategoryOrderBy!]"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotCategoryByPk": [
                63,
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
                63,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        91,
                        "[ChatbotCategoryStreamCursorInput]!"
                    ],
                    "where": [
                        71
                    ]
                }
            ],
            "chatbotDomain": [
                104,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotDomainAggregate": [
                105,
                {
                    "distinctOn": [
                        124,
                        "[ChatbotDomainSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        122,
                        "[ChatbotDomainOrderBy!]"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotDomainByPk": [
                104,
                {
                    "chatbotId": [
                        243,
                        "Int!"
                    ],
                    "domainName": [
                        578,
                        "String!"
                    ]
                }
            ],
            "chatbotDomainStream": [
                104,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        132,
                        "[ChatbotDomainStreamCursorInput]!"
                    ],
                    "where": [
                        112
                    ]
                }
            ],
            "chatbotStream": [
                54,
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
                        62
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
                        578,
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
                        578,
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
                        814,
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
            "lengthEnum": [
                247,
                {
                    "distinctOn": [
                        260,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        258,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "lengthEnumAggregate": [
                248,
                {
                    "distinctOn": [
                        260,
                        "[LengthEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        258,
                        "[LengthEnumOrderBy!]"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "lengthEnumByPk": [
                247,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "lengthEnumStream": [
                247,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        262,
                        "[LengthEnumStreamCursorInput]!"
                    ],
                    "where": [
                        250
                    ]
                }
            ],
            "message": [
                266,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messageAggregate": [
                267,
                {
                    "distinctOn": [
                        289,
                        "[MessageSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        286,
                        "[MessageOrderBy!]"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messageByPk": [
                266,
                {
                    "messageId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "messageStream": [
                266,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        291,
                        "[MessageStreamCursorInput]!"
                    ],
                    "where": [
                        273
                    ]
                }
            ],
            "messageTypeEnum": [
                293,
                {
                    "distinctOn": [
                        306,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        304,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "messageTypeEnumAggregate": [
                294,
                {
                    "distinctOn": [
                        306,
                        "[MessageTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        304,
                        "[MessageTypeEnumOrderBy!]"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "messageTypeEnumByPk": [
                293,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "messageTypeEnumStream": [
                293,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        308,
                        "[MessageTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        296
                    ]
                }
            ],
            "modelsEnum": [
                314,
                {
                    "distinctOn": [
                        329,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        327,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        317
                    ]
                }
            ],
            "modelsEnumAggregate": [
                315,
                {
                    "distinctOn": [
                        329,
                        "[ModelsEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        327,
                        "[ModelsEnumOrderBy!]"
                    ],
                    "where": [
                        317
                    ]
                }
            ],
            "modelsEnumByPk": [
                314,
                {
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "modelsEnumStream": [
                314,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        331,
                        "[ModelsEnumStreamCursorInput]!"
                    ],
                    "where": [
                        317
                    ]
                }
            ],
            "preference": [
                337,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferenceAggregate": [
                338,
                {
                    "distinctOn": [
                        357,
                        "[PreferenceSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        355,
                        "[PreferenceOrderBy!]"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "preferenceByPk": [
                337,
                {
                    "preferenceId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "preferenceStream": [
                337,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        367,
                        "[PreferenceStreamCursorInput]!"
                    ],
                    "where": [
                        345
                    ]
                }
            ],
            "prompt": [
                379,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptAggregate": [
                380,
                {
                    "distinctOn": [
                        440,
                        "[PromptSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        438,
                        "[PromptOrderBy!]"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptByPk": [
                379,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ]
                }
            ],
            "promptChatbot": [
                388,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptChatbotAggregate": [
                389,
                {
                    "distinctOn": [
                        408,
                        "[PromptChatbotSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        406,
                        "[PromptChatbotOrderBy!]"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptChatbotByPk": [
                388,
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
                388,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        416,
                        "[PromptChatbotStreamCursorInput]!"
                    ],
                    "where": [
                        396
                    ]
                }
            ],
            "promptStream": [
                379,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        448,
                        "[PromptStreamCursorInput]!"
                    ],
                    "where": [
                        387
                    ]
                }
            ],
            "promptTypeEnum": [
                452,
                {
                    "distinctOn": [
                        465,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        463,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptTypeEnumAggregate": [
                453,
                {
                    "distinctOn": [
                        465,
                        "[PromptTypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        463,
                        "[PromptTypeEnumOrderBy!]"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptTypeEnumByPk": [
                452,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "promptTypeEnumStream": [
                452,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        467,
                        "[PromptTypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        455
                    ]
                }
            ],
            "promptUser": [
                473,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "promptUserAggregate": [
                474,
                {
                    "distinctOn": [
                        493,
                        "[PromptUserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        491,
                        "[PromptUserOrderBy!]"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "promptUserByPk": [
                473,
                {
                    "promptId": [
                        243,
                        "Int!"
                    ],
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "promptUserStream": [
                473,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        501,
                        "[PromptUserStreamCursorInput]!"
                    ],
                    "where": [
                        481
                    ]
                }
            ],
            "referral": [
                519,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralAggregate": [
                520,
                {
                    "distinctOn": [
                        536,
                        "[ReferralSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        534,
                        "[ReferralOrderBy!]"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "referralByPk": [
                519,
                {
                    "referralCode": [
                        578,
                        "String!"
                    ]
                }
            ],
            "referralStream": [
                519,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        538,
                        "[ReferralStreamCursorInput]!"
                    ],
                    "where": [
                        525
                    ]
                }
            ],
            "socialFollowing": [
                542,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "socialFollowingAggregate": [
                543,
                {
                    "distinctOn": [
                        559,
                        "[SocialFollowingSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        558,
                        "[SocialFollowingOrderBy!]"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "socialFollowingStream": [
                542,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        567,
                        "[SocialFollowingStreamCursorInput]!"
                    ],
                    "where": [
                        550
                    ]
                }
            ],
            "subcategoryEnum": [
                580,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumAggregate": [
                581,
                {
                    "distinctOn": [
                        598,
                        "[SubcategoryEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        596,
                        "[SubcategoryEnumOrderBy!]"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "subcategoryEnumByPk": [
                580,
                {
                    "category": [
                        578,
                        "String!"
                    ],
                    "domain": [
                        578,
                        "String!"
                    ],
                    "name": [
                        578,
                        "String!"
                    ]
                }
            ],
            "subcategoryEnumStream": [
                580,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        600,
                        "[SubcategoryEnumStreamCursorInput]!"
                    ],
                    "where": [
                        586
                    ]
                }
            ],
            "tagEnum": [
                604,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "tagEnumAggregate": [
                605,
                {
                    "distinctOn": [
                        624,
                        "[TagEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        622,
                        "[TagEnumOrderBy!]"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "tagEnumByPk": [
                604,
                {
                    "tagId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "tagEnumStream": [
                604,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        632,
                        "[TagEnumStreamCursorInput]!"
                    ],
                    "where": [
                        612
                    ]
                }
            ],
            "thread": [
                644,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadAggregate": [
                645,
                {
                    "distinctOn": [
                        665,
                        "[ThreadSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        663,
                        "[ThreadOrderBy!]"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "threadByPk": [
                644,
                {
                    "threadId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "threadStream": [
                644,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        675,
                        "[ThreadStreamCursorInput]!"
                    ],
                    "where": [
                        652
                    ]
                }
            ],
            "token": [
                688,
                {
                    "distinctOn": [
                        701,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        699,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        691
                    ]
                }
            ],
            "tokenAggregate": [
                689,
                {
                    "distinctOn": [
                        701,
                        "[TokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        699,
                        "[TokenOrderBy!]"
                    ],
                    "where": [
                        691
                    ]
                }
            ],
            "tokenByPk": [
                688,
                {
                    "token": [
                        578,
                        "String!"
                    ]
                }
            ],
            "tokenStream": [
                688,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        703,
                        "[TokenStreamCursorInput]!"
                    ],
                    "where": [
                        691
                    ]
                }
            ],
            "toneEnum": [
                707,
                {
                    "distinctOn": [
                        720,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        718,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        710
                    ]
                }
            ],
            "toneEnumAggregate": [
                708,
                {
                    "distinctOn": [
                        720,
                        "[ToneEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        718,
                        "[ToneEnumOrderBy!]"
                    ],
                    "where": [
                        710
                    ]
                }
            ],
            "toneEnumByPk": [
                707,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "toneEnumStream": [
                707,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        722,
                        "[ToneEnumStreamCursorInput]!"
                    ],
                    "where": [
                        710
                    ]
                }
            ],
            "typeEnum": [
                726,
                {
                    "distinctOn": [
                        739,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        737,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        729
                    ]
                }
            ],
            "typeEnumAggregate": [
                727,
                {
                    "distinctOn": [
                        739,
                        "[TypeEnumSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        737,
                        "[TypeEnumOrderBy!]"
                    ],
                    "where": [
                        729
                    ]
                }
            ],
            "typeEnumByPk": [
                726,
                {
                    "value": [
                        578,
                        "String!"
                    ]
                }
            ],
            "typeEnumStream": [
                726,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        741,
                        "[TypeEnumStreamCursorInput]!"
                    ],
                    "where": [
                        729
                    ]
                }
            ],
            "user": [
                745,
                {
                    "distinctOn": [
                        759,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        756,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        748
                    ]
                }
            ],
            "userAggregate": [
                746,
                {
                    "distinctOn": [
                        759,
                        "[UserSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        756,
                        "[UserOrderBy!]"
                    ],
                    "where": [
                        748
                    ]
                }
            ],
            "userByPk": [
                745,
                {
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "userStream": [
                745,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        761,
                        "[UserStreamCursorInput]!"
                    ],
                    "where": [
                        748
                    ]
                }
            ],
            "userToken": [
                763,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokenAggregate": [
                764,
                {
                    "distinctOn": [
                        780,
                        "[UserTokenSelectColumn!]"
                    ],
                    "limit": [
                        243
                    ],
                    "offset": [
                        243
                    ],
                    "orderBy": [
                        778,
                        "[UserTokenOrderBy!]"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "userTokenByPk": [
                763,
                {
                    "token": [
                        578,
                        "String!"
                    ],
                    "userId": [
                        814,
                        "uuid!"
                    ]
                }
            ],
            "userTokenStream": [
                763,
                {
                    "batchSize": [
                        243,
                        "Int!"
                    ],
                    "cursor": [
                        782,
                        "[UserTokenStreamCursorInput]!"
                    ],
                    "where": [
                        769
                    ]
                }
            ],
            "__typename": [
                578
            ]
        }
    }
}