
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import type { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface ThreadReasoningnProps {
  message: Message
}

export function ThreadReasoning({ message }: ThreadReasoningnProps) {
  if (!message.reasoning || message.role !== 'assistant') return null

  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <details className="group">
        <summary className="font-medium transition-colors cursor-pointer hover:text-gray-700">
          View AI Reasoning Process
          <span className="ml-1 text-gray-400 group-open:hidden">▼</span>
          <span className="hidden ml-1 text-gray-400 group-open:inline">▲</span>
        </summary>
        <div className="p-4 mt-2 text-sm text-gray-600 rounded-md bg-gray-50">
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
          >
            {message.reasoning}
          </MemoizedReactMarkdown>
        </div>
      </details>
    </div>
  )
}