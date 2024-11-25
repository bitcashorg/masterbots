import { 
  extractTextFromReactNode, 
  parseClickableText, 
  cleanClickableText 
} from '@/lib/utils'

interface ClickableTextProps {
  children: React.ReactNode
  isListItem: boolean
  sendMessageFromResponse?: (message: string) => void
}

/**
 * ClickableText component
 * Renders phrases as clickable links, triggering a message when clicked.
 */
export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse
}: ClickableTextProps) {
  const fullText = extractTextFromReactNode(children)
  const { clickableText, restText } = parseClickableText(fullText)

  const handleClick = () => {
    if (sendMessageFromResponse && clickableText.trim()) {
      const cleanedText = cleanClickableText(clickableText)
      sendMessageFromResponse(`Tell me more about ${cleanedText}`)
    }
  }

  if (!clickableText.trim()) {
    return <>{fullText}</>
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Click handler is supplementary */}
      <span
        className="cursor-pointer text-link hover:underline"
        onClick={handleClick}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="button"
        tabIndex={0}
      >
        {clickableText}
      </span>
      {restText}
    </>
  )
}