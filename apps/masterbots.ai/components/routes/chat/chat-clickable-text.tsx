/**
 * ClickableText component
 * Renders specified "unique" or "general" phrases as clickable links, triggering a message when clicked.
 */

export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse
}: {
  children: React.ReactNode
  isListItem: boolean
  sendMessageFromResponse?: (message: string) => void
}) {
  const fullText: string = extractTextFromReactNode(children)

  //* List of unique key phrases to detect and render as clickable text.
  const uniquePhrases = [
    'Unique, lesser-known',
    'Unique insight',
    'Unique Tip',
    'Unique, lesser-known solution',
    'Unique Solution',
    'Unique, lesser-known option',
    'Unique Insight: Lesser-Known Solution',
    'Unique Recommendation',
    'Lesser-Known Gem',
    'For a UNIQUE, LESSER-KNOWN phrase',
    'Unique, Lesser-Known Destination'
  ]

  //* Regex to match phrases followed by a colon and capture the following text as clickable.
  const uniquePattern = new RegExp(
    `(?:${uniquePhrases.join('|')}):\\s*([^.:]+[.])`,
    'i'
  )

  const generalPattern = /(.*?)([:.,])(?:\s|$)/g // General fallback pattern if unique phrases aren't found.

  //* Check if fullText matches unique pattern to set clickableText and restText.
  const uniqueMatch = fullText.match(uniquePattern)
  let clickableText = uniqueMatch ? uniqueMatch[1] : ''
  let restText = uniqueMatch
    ? fullText.slice(fullText.indexOf(clickableText) + clickableText.length)
    : fullText

  //* Fallback to general pattern if uniqueMatch is not found.
  if (!uniqueMatch) {
    const match = fullText.match(generalPattern)
    clickableText = match ? match[0] : ''
    restText = match ? fullText.slice(match[0].length) : ''
  }

  const handleClick = () => {
    if (sendMessageFromResponse && clickableText) {
      //* Calls sendMessageFromResponse with cleaned clickableText for interaction.
      sendMessageFromResponse(
        `Tell me more about ${clickableText.replace(/(:|\.|\,)\s*$/, '')}`
      )
    }
  }

  if (!clickableText.trim()) {
    return <>{fullText}</> //* Render full text if no clickable phrase found.
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <span
        className="cursor-pointer text-link hover:underline"
        onClick={handleClick}
      >
        {clickableText}
      </span>
      {restText}
    </>
  )
}

//* Helper function to convert ReactNode content to string for regex processing.
function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNode(node.props.children)
  }
  return ''
}
