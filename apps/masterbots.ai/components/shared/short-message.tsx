import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from './markdown'

export function ShortMessage({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
			remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
			components={{
				// @ts-ignore
				p({ children }) {
					return (
						<p className="mb-2 last:mb-0 whitespace-pre-line">{children}</p>
					)
				},
				// @ts-ignore
				code({ node, inline, className, children, ...props }) {
					// @ts-ignore
					if (children.length) {
						// @ts-ignore
						if (children[0] === '▍') {
							return (
								<span className="mt-1 cursor-default animate-pulse">▍</span>
							)
						}
					}

					const match = /language-(\w+)/.exec(className || '')

					if (inline) {
						return (
							<code className={className} {...props}>
								{children}
							</code>
						)
					}

					return (
						<CodeBlock
							key={Math.random()}
							language={match?.[1] || ''}
							value={String(children).replace(/\n$/, '')}
							{...props}
						/>
					)
				},
			}}
		>
			{`${content.slice(0, 240)}${content.length >= 240 ? '...' : ''}`}
		</MemoizedReactMarkdown>
	)
}
