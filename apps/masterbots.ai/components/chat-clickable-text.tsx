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
  // * previous regexPattern = isListItem ? /.*?[:.,](?:\s|$)/ : /.*?[.](?:\s|$)/
  // ? regExp breaks on the first : or . or , and return the first part of the matching string.
  const regexPattern = /(.*?)([:.,])(?:\s|$)/g
  const match = fullText.match(regexPattern)
  const clickableText = match ? match[0] : ''
  const restText = match ? fullText.slice(match[0].length) : ''

  const handleClick = () => {
    if (sendMessageFromResponse && match) {
      sendMessageFromResponse(
        clickableText.replace(/(:|\.|\,)\s*$/, '').replace(/•\s/g, '')
      )
    }
  }

  if (!clickableText.trim()) {
    return <>{fullText}</>
  }

  return (
    <>
      <span
        className="text-link cursor-pointer hover:underline"
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
