import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import type { PreferenceSectionProps } from '@/types/types'
import {
	AArrowDown,
	AArrowUp,
	MessageSquareX,
	Plus,
	UserRoundX,
} from 'lucide-react'
import { PreferenceItemTitle } from './preference-item'

export function PreferenceSection({
	title,
	items,
	variant,
}: PreferenceSectionProps) {
	return (
		<Accordion key={title} type="single" collapsible defaultValue="1">
			<AccordionItem value="1" className="border-none">
				<AccordionTrigger className="hover:no-underline">
					<p className="text-2xl">{title}</p>
				</AccordionTrigger>
				<AccordionContent>
					<Card className="bg-transparent border-mirage">
						<CardContent className="px-4 py-8 flex flex-col justify-center items-center gap-y-4 w-full">
							{items.map((item, idx) => (
								<div
									key={item.title}
									className={cn(
										'flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full',
										idx === items.length - 1 ? 'border-none' : '',
									)}
								>
									<PreferenceItemTitle
										title={item.title}
										description={item.description}
									/>
									{item.type === 'switch' && (
										<Switch
											defaultChecked={
												'defaultChecked' in item ? item.defaultChecked : false
											}
											className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent"
										/>
									)}
									{item.type === 'toggleGroup' && (
										<ToggleGroup
											type="single"
											defaultValue="b"
											className="gap-0 border rounded-full border-mirage h-7"
										>
											<ToggleGroupItem
												value="a"
												className="h-full px-2 hover:rounded-l-full data-[state=on]:rounded-l-full data-[state=on]:text-white data-[state=on]:bg-accent"
											>
												<AArrowDown />
											</ToggleGroupItem>
											<ToggleGroupItem
												value="b"
												className="h-full px-2 border-x border-gray-700 text-base font-medium text-white data-[state=on]:text-white data-[state=on]:bg-accent"
											>
												MD
											</ToggleGroupItem>
											<ToggleGroupItem
												value="c"
												className="h-full px-2 hover:rounded-r-full data-[state=on]:rounded-r-full data-[state=on]:text-white data-[state=on]:bg-accent"
											>
												<AArrowUp />
											</ToggleGroupItem>
										</ToggleGroup>
									)}
									{item.type === 'button' && (
										<Plus className="cursor-pointer" />
									)}
									{item.type === 'dangerButton' && (
										<Button className="bg-transparent border border-destructive text-destructive p-2 text-sm min-h-9">
											{'icon' in item && item.icon && (
												<item.icon className="mr-1 size-4" />
											)}
											{'buttonText' in item && item.buttonText}
										</Button>
									)}
								</div>
							))}
						</CardContent>
					</Card>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
