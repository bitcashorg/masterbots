'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@masterbots/mb-ui'
import {
	ClipboardList,
	Download,
	FileText,
	GraduationCap,
	Presentation,
	Upload,
} from 'lucide-react'
import type * as React from 'react'

// Helper to create styled icon holders, similar to Button variant="outline" size="icon"
const IconHolder = ({ children }: { children: React.ReactNode }) => (
	<div className="inline-flex items-center justify-center rounded-full border border-input bg-background shadow-sm h-9 w-9">
		{children}
	</div>
)

export default function ContextAttachments() {
	const defaultOpenSections = [
		'context',
		'instructions',
		'expertise',
		'examples',
	]

	const sections = [
		{
			id: 'context',
			title: 'Context',
			icon: <FileText className="h-4 w-4" />,
			label: 'Add context information',
			placeholder:
				'Enter background information and additional details here...',
			extraHeaderContent: (
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="flex items-center space-x-2"
						onClick={(e) => e.stopPropagation()} // Prevent accordion toggle
					>
						<Upload className="h-4 w-4" />
						<span>Upload from computer</span>
					</Button>
					<Button
						variant="outline"
						className="flex items-center space-x-2"
						onClick={(e) => e.stopPropagation()} // Prevent accordion toggle
					>
						<Download className="h-4 w-4" />
						<span>Attach from Google Drive</span>
					</Button>
				</div>
			),
		},
		{
			id: 'instructions',
			title: 'Instructions',
			icon: <Presentation className="h-4 w-4" />,
			label: 'Add instructions',
			placeholder: 'Enter steps, guidelines, or specific requirements here...',
		},
		{
			id: 'expertise',
			title: 'Expertise',
			icon: <GraduationCap className="h-4 w-4" />,
			label: 'Expert Qualifications',
			placeholder:
				'Enter expert knowledge, qualifications, and credentials here...',
		},
		{
			id: 'examples',
			title: 'Examples',
			icon: <ClipboardList className="h-4 w-4" />,
			label: 'Add Examples',
			placeholder: 'Enter relevant examples and use cases here...',
		},
	]

	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<Card>
				<Accordion
					type="multiple"
					defaultValue={defaultOpenSections}
					className="w-full"
				>
					{sections.map((section, index) => (
						<AccordionItem
							key={section.id}
							value={section.id}
							className={index === sections.length - 1 ? 'border-b-0' : ''}
						>
							<AccordionTrigger className="px-4 hover:no-underline">
								<div className="flex flex-1 items-center justify-between">
									<div className="flex items-center space-x-4">
										<IconHolder>{section.icon}</IconHolder>
										<h3 className="font-semibold">{section.title}</h3>
									</div>
									{section.extraHeaderContent}
								</div>
							</AccordionTrigger>
							<AccordionContent className="px-4">
								<div className="bg-muted p-4 rounded-lg mt-4">
									{section.id === 'context' && (
										<div className="mb-2">
											<span className="font-medium">
												Background Information
											</span>
										</div>
									)}
									<div className="space-y-4">
										<div>
											<Label htmlFor={`${section.id}-input`}>
												{section.label}
											</Label>
											<Textarea
												id={`${section.id}-input`}
												placeholder={section.placeholder}
												className="mt-2 min-h-[120px]"
											/>
										</div>
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</Card>
		</div>
	)
}
