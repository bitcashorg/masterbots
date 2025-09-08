import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { MemoizedReactMarkdown } from './markdown'

export function ThreadBlogMarkDown({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
			components={memoizedMarkdownComponents()}
		>
			{content}
		</MemoizedReactMarkdown>
	)
}
