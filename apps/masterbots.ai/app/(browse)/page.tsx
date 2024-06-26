import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'
export const revalidate = 3600 // revalidate the data at most every hour
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="max-w-[1024px] px-4 pb-10 mx-auto w-full">
      {/* <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList /> */}
     
      <Dialog>
       
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent onClick={()=> alert("clikc")}>
        <p>Dialog content</p>
        <DialogClose asChild>
          <button>Close Dialog</button>
        </DialogClose>
      </DialogContent>
      </Dialog>
    </div>
  )
}
