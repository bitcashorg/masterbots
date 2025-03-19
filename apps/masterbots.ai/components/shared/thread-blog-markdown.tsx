import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from './markdown'

export function ThreadBlogMarkDown({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
			remarkPlugins={[remarkGfm, remarkMath]}
			components={{
				// @ts-ignore
				p({ children }) {
					return <p className="whitespace-pre-line">{children}</p>
				},
				// @ts-ignore
				li({ children }) {
					return (
						<li className="list-disc list-inside text-left [&_p]:inline-block [&_p]:m-0 [&_p]:w-[97%] [&_p]:align-text-top">
							<span className="inline">{children}</span>
						</li>
					)
				},
				// @ts-ignore
				ol({ children }) {
					return (
						<ol className="list-decimal list-inside text-left">{children}</ol>
					)
				},
				// @ts-ignore
				ul({ children }) {
					return <ul className="list-disc list-inside text-left">{children}</ul>
				},
				// @ts-ignore
				a({ node, children, ...props }) {
					return (
						<a
							className="text-blue-500 underline"
							target="_blank"
							rel="noopener noreferrer"
							{...props}
						>
							{children}
						</a>
					)
				},
				// @ts-ignore
				code({ node, inline, className, children, ...props }) {
					// @ts-ignore
					if (children.length) {
						// @ts-ignore
						if (children[0] === '▍')
							return (
								<span className="mt-1 cursor-default animate-pulse">▍</span>
							)

						// @ts-ignore
						children[0] = (children[0] as string).replace('`▍`', '▍')
					}

					const match = /language-(\w+)/.exec(className || '')

					if (inline)
						return (
							<code className={className} {...props}>
								{children}
							</code>
						)

					return (
						<CodeBlock
							key={String(children)}
							language={match?.[1] || ''}
							value={String(children).replace(/\n$/, '')}
							{...props}
						/>
					)
				},
			}}
		>
			{content}
		</MemoizedReactMarkdown>
	)
}
