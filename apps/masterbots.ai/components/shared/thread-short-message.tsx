import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from './markdown'
import { CodeBlock } from '../ui/codeblock'

export function ShortMessage({ content }: { content: string }) {
  return (
    <MemoizedReactMarkdown
      className="break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
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
              language={(match && match[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        }
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
    >
      {`${content.slice(0, 240)}${content.length >= 240 ? '...' : ''}`}
    </MemoizedReactMarkdown>
  )
}
