'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import type { ChatbotDetailsProps, ExampleQuestion } from '@/types/types'
import { ArrowBigLeft, Bot, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Mock example questions - these will come from Hasura eventually
// TODO: Replace with real data from Hasura using fetchDomainExamples
// Example:
// const [exampleQuestions, setExampleQuestions] = useState<ExampleQuestion[]>([])
//
// useEffect(() => {
//   if (activeChatbot) {
//     const fetchExamples = async () => {
//       const examples = await fetchDomainExamples({
//         domainName: activeChatbot.domain,
//         categories: activeChatbot.categories.map(c => c.category.name)
//       })
//       if (examples) {
//         setExampleQuestions(examples.slice(0, 3).map(ex => ({
//           id: ex.exampleId,
//           prompt: ex.prompt,
//           category: ex.category
//         })))
//       }
//     }
//     fetchExamples()
//   }
// }, [activeChatbot])

const mockExampleQuestions: ExampleQuestion[] = [
	{
		id: '1',
		prompt: 'What are the best practices for React performance optimization?',
		category: 'Development',
	},
	{
		id: '2',
		prompt: 'How can I implement authentication in a Next.js application?',
		category: 'Development',
	},
	{
		id: '3',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '4',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '5',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '6',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '7',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
]

interface OnboardingChatbotExamplesProps extends ChatbotDetailsProps {
	onExampleClick?: (question: string) => void
	exampleQuestions?: ExampleQuestion[]
}

export function OnboardingChatbotExamples({
	isWelcomeView = true,
	onExampleClick,
	exampleQuestions = mockExampleQuestions,
}: OnboardingChatbotExamplesProps) {
	const routeType = getRouteType(usePathname())
	const { activeChatbot } = useSidebar()
	const { randomChatbot } = useThread()
	const [selectedExample, setSelectedExample] = useState<string | null>(null)

	const botName = activeChatbot?.name || randomChatbot?.name
	const avatar = activeChatbot?.avatar || randomChatbot?.avatar || ''
	const description = activeChatbot?.description || randomChatbot?.description

	const handleExampleClick = (question: string, id: string) => {
		setSelectedExample(id)
		onExampleClick?.(question)

		const event = new CustomEvent('exampleQuestionSelected', {
			detail: { question },
		})
		window.dispatchEvent(event)
	}

	useEffect(() => {
		if (activeChatbot?.chatbotId) {
			setSelectedExample(null)
		}
	}, [activeChatbot?.chatbotId])

	return (
		<div
			className="mt-5 hidden h-[calc(100vh-196px)] md:flex items-center justify-center -translate-y-8 relative"
			data-route={routeType}
		>
			<Card className="w-[900px] bg-white dark:bg-[#09090B] relative z-10">
				<CardHeader className="space-y-3">
					<h1 className="px-4 pt-4 text-2xl font-bold text-zinc-950 dark:text-gray-300">
						{isWelcomeView ? 'Welcome to Masterbots!' : botName}
					</h1>
					{!isWelcomeView && (
						<div className="flex items-center px-4">
							<Bot className="mr-2 size-4" />
							<span className="text-sm">Description:</span>
						</div>
					)}
					<div className="h-[3px] bg-zinc-200 dark:bg-slate-800 relative">
						<div className="absolute right-6 -top-12">
							<div
								className={cn(
									'relative rounded-full size-32',
									'bg-zinc-200 dark:bg-black',
									'ring-4 selected-bot-avatar', // Using the route-based ring color
								)}
							>
								<Image
									src={avatar}
									alt={`${botName} avatar`}
									height={128}
									width={128}
									className="object-cover rounded-full"
								/>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-1">
					<p className="pt-2.5 max-w-[calc(100%-160px)] text-base text-zinc-500 dark:text-zinc-500 min-h-24">
						{isWelcomeView
							? 'Here you can create new threads and share them to your network! Navigate with the sidebar and pick any bot of your interest.'
							: description}
					</p>

					{isWelcomeView && (
						<div className="flex flex-col justify-center items-center space-y-4">
							<h2 className="flex items-center text-2xl font-semibold selected-bot-text">
								<ArrowBigLeft className="mr-2 size-6 selected-bot-icon" />
								Go To Sidebar And Select One Bot
							</h2>
						</div>
					)}

					{!isWelcomeView &&
						exampleQuestions &&
						exampleQuestions.length > 0 && (
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem
									value="example-questions"
									className="border-none"
								>
									<AccordionTrigger className="hover:no-underline">
										<div className="flex gap-1 items-center">
											<h3 className="text-lg font-semibold text-zinc-950 dark:text-gray-300">
												Example questions
											</h3>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="pt-4">
											<div className="relative">
												<div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
													{exampleQuestions.map((example, index) => (
														<Button
															key={example.id}
															variant="outline"
															className={cn(
																'justify-start text-left h-auto min-h-[60px] shrink-0 w-[280px] p-4 border-2 transition-all duration-300',
																'hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20',
																'hover:shadow-lg',
																'group relative overflow-hidden',
																selectedExample === example.id
																	? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-lg'
																	: 'border-zinc-200 dark:border-zinc-700 hover:border-purple-400',
															)}
															onClick={() =>
																handleExampleClick(example.prompt, example.id)
															}
														>
															<div className="flex items-center w-full">
																<p className="text-sm font-medium leading-relaxed transition-colors duration-200 text-zinc-950 dark:text-gray-300 group-hover:text-purple-900 dark:group-hover:text-purple-100">
																	{example.prompt}
																</p>
															</div>
														</Button>
													))}
												</div>
												{exampleQuestions.length > 3 && (
													<div className="flex gap-2 justify-center mt-4">
														{Array.from(
															{
																length: Math.ceil(exampleQuestions.length / 3),
															},
															(_, i) => (
																<button
																	key={i}
																	type="button"
																	className="w-2 h-2 rounded-full transition-colors bg-zinc-300 dark:bg-zinc-600 hover:bg-purple-500 dark:hover:bg-purple-400"
																	onClick={() => {
																		const container =
																			document.querySelector('.overflow-x-auto')
																		if (container) {
																			container.scrollTo({
																				left: i * 3 * 292, // 280px width + 12px gap
																				behavior: 'smooth',
																			})
																		}
																	}}
																/>
															),
														)}
													</div>
												)}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)}
				</CardContent>
			</Card>
		</div>
	)
}
