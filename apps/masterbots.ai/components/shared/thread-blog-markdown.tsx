import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import rehypeMathJax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import { MemoizedReactMarkdown } from './markdown'

export function ThreadBlogMarkDown({ content }: { content: string }) {
	return (
		<MemoizedReactMarkdown
			className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
			remarkPlugins={[remarkGfm, rehypeMathJax, remarkRehype]}
			components={memoizedMarkdownComponents()}
		>
			{content}
		</MemoizedReactMarkdown>
	)
}
