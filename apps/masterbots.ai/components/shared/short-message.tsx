import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { MemoizedReactMarkdown } from './markdown'

export function ShortMessage({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 line-clamp-1"
			components={memoizedMarkdownComponents()}
		>
			{`${content.slice(0, 240)}${content.length >= 240 ? '...' : ''}`}
		</MemoizedReactMarkdown>
	)
}
