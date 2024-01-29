'use client'

import * as React from 'react'
import { Category } from 'mb-genql'
import { BrowseCategoryButton } from './browse-category-button';
import { useBrowse } from '@/lib/hooks/use-browse';

export function BrowseCategoryTabs({
    categories,
}: {
    categories: Category[]
}) {
    const { tab: activeTab, changeTab: setActiveTab } = useBrowse()
    return (
        <div className="flex justify-center w-full py-5">
            <BrowseCategoryButton
                onClick={() => setActiveTab(null)}
                category='all'
                activeTab={activeTab}
            />
            {categories.map((category, key) => (
                <BrowseCategoryButton
                    key={key}
                    onClick={() => setActiveTab(category.categoryId)}
                    category={category}
                    activeTab={activeTab}
                />
            ))}
        </div>
    )
}
