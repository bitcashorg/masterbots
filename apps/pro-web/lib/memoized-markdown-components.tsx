import { getTextFromChildren } from '@/lib/chat-clickable-text'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@masterbots/mb-ui'
import React from 'react'
import type { Components } from 'react-markdown'

/**
 * Preprocesses the children to combine adjacent nodes with a colon.
 *
 * @param children The children nodes.
 * @returns The preprocessed children.
 */

const preprocessChildren = (children: React.ReactNode): React.ReactNode => {
	if (!Array.isArray(children)) return children

	const result: React.ReactNode[] = []
	let i = 0

	while (i < children.length) {
		const current = children[i]
		const next = i + 1 < children.length ? children[i + 1] : null

		// If we detect a pattern where a node is immediately followed by ":"
		if (next && typeof next === 'string' && next.trim() === ':') {
			if (typeof current === 'string') {
				result.push(`${current}:`)
			} else if (React.isValidElement(current)) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				const element = current as React.ReactElement<any>
				const currentChildren = element.props.children
				result.push(
					React.cloneElement(element, {
						children:
							typeof currentChildren === 'string'
								? `${currentChildren}:`
								: currentChildren,
					}),
				)
			} else {
				result.push(current)
				result.push(next)
			}
			i += 2
		} else {
			result.push(current)
			i += 1
		}
	}

	return result
}

export function memoizedMarkdownComponents(props?: {
	handleClickableClick?: (text: string) => void
	shouldPreProcessChildren?: boolean
}): Components {
	const { handleClickableClick, shouldPreProcessChildren = false } = props || {}
	return {
		// Process paragraph nodes.
		// @ts-ignore
		p({ children }) {
			return (
				<p className="text-left whitespace-pre-line">
					{shouldPreProcessChildren ? preprocessChildren(children) : children}
				</p>
			)
		},
		// Process heading nodes with clickable functionality.
		// @ts-ignore
		h1({ children }) {
			const text = getTextFromChildren(children)
			return (
				<h1
					className={cn(
						'mb-2 text-2xl font-bold cursor-pointer',
						handleClickableClick && 'clickable-list-heading',
					)}
					{...(handleClickableClick && {
						onClick: () => handleClickableClick(text),
					})}
				>
					{shouldPreProcessChildren ? preprocessChildren(children) : children}
				</h1>
			)
		},
		// @ts-ignore
		h2({ children }) {
			const text = getTextFromChildren(children)
			return (
				<h2
					className={cn(
						'mb-2 text-xl font-bold cursor-pointer',
						handleClickableClick && 'clickable-list-heading',
					)}
					{...(handleClickableClick && {
						onClick: () => handleClickableClick(text),
					})}
				>
					{shouldPreProcessChildren ? preprocessChildren(children) : children}
				</h2>
			)
		},
		// @ts-ignore
		h3({ children }) {
			const text = getTextFromChildren(children)
			return (
				<h3
					className={cn(
						'mb-2 text-lg font-bold cursor-pointer',
						handleClickableClick && 'clickable-list-heading',
					)}
					{...(handleClickableClick && {
						onClick: () => handleClickableClick(text),
					})}
				>
					{shouldPreProcessChildren ? preprocessChildren(children) : children}
				</h3>
			)
		},
		// Process strong/emphasis nodes.
		// @ts-ignore
		strong({ children }) {
			return (
				<strong>
					{shouldPreProcessChildren ? preprocessChildren(children) : children}
				</strong>
			)
		},
		// List handling.
		// @ts-ignore
		ul({ children }) {
			return (
				<ul className="pl-0 md:pl-4 ml-2 space-y-2 list-disc">{children}</ul>
			)
		},
		// @ts-ignore
		ol({ children }) {
			return (
				<ol className="pl-0 md:pl-4 ml-2 space-y-2 list-decimal">{children}</ol>
			)
		},
		// @ts-ignore
		li({ children }) {
			const processedChildren = preprocessChildren(children)
			const text = getTextFromChildren(processedChildren)
			const hasNestedList = React.Children.toArray(processedChildren).some(
				(child) =>
					React.isValidElement(child) &&
					(child.type === 'ul' || child.type === 'ol'),
			)

			return (
				<li
					className={cn(
						'pl-0 md:pl-4 ml-4',
						hasNestedList && 'mt-2',
						handleClickableClick && 'clickable-list-heading',
					)}
					{...(handleClickableClick && {
						onClick: () => handleClickableClick(text),
					})}
				>
					{processedChildren}
				</li>
			)
		},
		// Process link nodes.
		// @ts-ignore
		a({ href, children, ...props }) {
			return (
				<a
					className="text-blue-500 underline"
					target="_blank"
					rel="noopener noreferrer"
					href={href}
					{...props}
				>
					{children}
				</a>
			)
		},
		// Process code blocks.
		// @ts-ignore
		code({ inline, className, children, ...props }) {
			const childrenText = String(children)
			if (childrenText?.startsWith('▍')) {
				return <span className="mt-1 cursor-default animate-pulse">▍</span>
			}

			const match = /language-(\w+)/.exec(className || '')
			const language = match ? match[1] : ''
			if (!language) {
				return (
					<code
						className={cn(
							className,
							'bg-muted text-muted-foreground px-1 py-0.5 rounded-sm before:content-[""] after:content-[""]',
						)}
						{...props}
					>
						{children}
					</code>
				)
			}
			const codeBlockKey = `code-${language || ''}-${String(children).substring(0, 20).replace(/\n$/, '').replace(/\s/g, '-')}`
			return (
				<CodeBlock
					key={codeBlockKey}
					language={language}
					value={String(children).replace(/\n$/, '')}
					{...props}
				/>
			)
		},
	}
}
