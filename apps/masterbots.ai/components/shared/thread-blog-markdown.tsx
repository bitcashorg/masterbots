import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from './markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export function ThreadBlogMarkDown({ content }: { content: string }) {
  return (
    <MemoizedReactMarkdown
      className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="whitespace-pre-line">{children}</p>
        },
        li({ children }) {
          return <li className="list-disc">{children}</li>
        },
        ol({ children }) {
          return (
            <ol className="list-decimal list-inside text-left">{children}</ol>
          )
        },
        ul({ children }) {
          return <ul className="list-disc list-inside text-left">{children}</ul>
        },
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
        code({ node, inline, className, children, ...props }) {
          //* Handle cursor animation for streaming responses
          if (children.length) {
            if (children[0] === '▍')
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          //* Extract language from className for syntax highlighting
          const match = /language-(\w+)/.exec(className || '')

          //* Handle inline code differently from code blocks
          if (inline)
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )

          //* Render full code block with syntax highlighting
          return (
            <CodeBlock
              key={String(children)}
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        }
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  )
}
