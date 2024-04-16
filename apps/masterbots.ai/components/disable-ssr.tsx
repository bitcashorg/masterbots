import dynamic from 'next/dynamic'
 
export const BrowseListItem = dynamic(() => import('./browse-list-item'), {
  ssr: false,
})