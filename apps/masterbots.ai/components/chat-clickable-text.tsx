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
  // ? This regex matches any variation of the unique key phrases followed by a colon and then captures the following sentence.
  const uniquePattern =
    /(?:Unique insight|Unique Tip|Unique, lesser-known solution):\s*([^.:]+[.])/i

  const generalPattern = /(.*?)([:.,])(?:\s|$)/g
  // First, check for the UNIQUE pattern
  const uniqueMatch = fullText.match(uniquePattern)
  let clickableText = uniqueMatch ? uniqueMatch[1] : ''
  let restText = uniqueMatch
    ? fullText.slice(fullText.indexOf(clickableText) + clickableText.length)
    : fullText

  // If the UNIQUE pattern isn't found, use the general pattern
  if (!uniqueMatch) {
    const match = fullText.match(generalPattern)
    clickableText = match ? match[0] : ''
    restText = match ? fullText.slice(match[0].length) : ''
  }

  const handleClick = () => {
    if (sendMessageFromResponse && clickableText) {
      sendMessageFromResponse(clickableText.replace(/(:|\.|\,)\s*$/, ''))
    }
  }

  if (!clickableText.trim()) {
    return <>{fullText}</>
  }

  return (
    <>
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
