import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { MemoizedReactMarkdown } from './markdown'

export function ShortMessage({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 line-clamp-1"
			remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
			components={memoizedMarkdownComponents()}
		>
			{`${content.slice(0, 240)}${content.length >= 240 ? '...' : ''}`}
		</MemoizedReactMarkdown>
	)
}
