import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from './markdown'

export function ThreadBlogMarkDown({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
			remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
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
					const childrenText = String(children)
					if (childrenText?.startsWith('▍')) {
						return <span className="mt-1 cursor-default animate-pulse">▍</span>
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
