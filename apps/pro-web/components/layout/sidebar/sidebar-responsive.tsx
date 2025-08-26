import { Sidebar } from '@/components/layout/sidebar/sidebar'

export function ResponsiveSidebar() {
	return (
		<Sidebar
			className="peer absolute inset-y-0 z-30 border-r bg-muted
    transition-all
    -translate-x-full duration-500 ease-in-out
    data-[state=open]:translate-x-0 data-[state=closed]:lg:translate-x-0
    w-[300px] lg:w-[250px] xl:w-[300px]"
		/>
	)
}
