export function ClickableText({ children, isListItem, sendMessageFromResponse }: {
  children: React.ReactNode
  isListItem: boolean
  sendMessageFromResponse?: (message: string) => void
}) {
  const fullText: string = extractTextFromReactNode(children)
  const regexPattern = isListItem ? /.*?[:.,](?:\s|$)/ : /.*?[.](?:\s|$)/
  const match = fullText.match(regexPattern)
  const clickableText = match ? match[0] : ''
  const restText = match ? fullText.slice(match[0].length) : ''

  const handleClick = () => {
    if (sendMessageFromResponse && match) {
      sendMessageFromResponse(clickableText.replace(/[:.,]\s*$/, ''))
    }
  }


  if (!clickableText.trim()) {
    return <>{fullText}</>
  }

  return (
    <>
      <span
        className="text-link cursor-pointer font-bold hover:underline"
        onClick={handleClick}
      >
        {clickableText}
      </span>
      {restText}
    </>
  )
}

function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }

  if (typeof node === 'number') {
    return node.toString()
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('')
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNode(node.props.children)
  }

  return ''
}
