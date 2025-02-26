import React, { type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface SimplifiedClickableTextProps {
  children: ReactNode
  sendMessageFromResponse?: (message: string) => void
}

/**
 * SimplifiedClickableText Component - Makes list items clickable while preserving their content
 */

export function ImprovedClickableText({
  children,
  sendMessageFromResponse
}: SimplifiedClickableTextProps) {
  // Track hover state for enhanced visual cues
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  // Check if an element is a list item (li)
  const isListItem = (element: React.ReactElement): boolean => {
    return element.type === 'li'
  }

  // Extract text content from React nodes
  const extractTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    
    if (Array.isArray(node)) {
      return node.map(extractTextContent).join('')
    }
    
    if (React.isValidElement(node) && node.props && node.props.children) {
      return extractTextContent(node.props.children)
    }
    
    return ''
  }

  // Check if an element has a strong/bold tag as a direct child
  const hasStrongChild = (element: React.ReactElement): boolean => {
    let result = false
    
    React.Children.forEach(element.props.children, (child: ReactNode) => {
      if (React.isValidElement(child) && (child.type === 'strong' || child.type === 'b')) {
        result = true
      }
    })
    
    return result
  }

  // Get the strong/bold text from a list item
  const getStrongText = (element: React.ReactElement): string => {
    let strongText = ''
    
    React.Children.forEach(element.props.children, (child: ReactNode) => {
      if (React.isValidElement(child) && (child.type === 'strong' || child.type === 'b')) {
        strongText = extractTextContent(child.props.children)
      }
    })
    
    return strongText
  }

  // Handle click events for clickable elements
  const handleClick = (text: string, contextText?: string) => {
    if (!sendMessageFromResponse) {
      console.warn('sendMessageFromResponse function is not provided')
      return
    }

    let query = `Explain more in-depth and in detail about ${text}`
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (contextText && contextText.trim()) {
      query = `Explain more in-depth and in detail about ${text} ${contextText}`
    }
    
    sendMessageFromResponse(query.trim())
  }

  // Process list items with bold/strong text
  const processListItem = (element: React.ReactElement) => {
    console.log('Processing list item:', element.type)
    
    // First, let's make any list item with strong text or starting with a label clickable
    const fullItemText = extractTextContent(element.props.children)
    console.log('Full item text:', fullItemText)
    
    // Try to extract a strong element or look for a labeled pattern like "M1: text"
    let hasClickableContent = false
    let clickableText = ''
    let contextText = ''
    
    // Check for strong elements first
    const hasStrong = hasStrongChild(element)
    if (hasStrong) {
      clickableText = getStrongText(element)
      hasClickableContent = true
      
      // Extract context after the strong text
      const strongIndex = fullItemText.indexOf(clickableText)
      if (strongIndex !== -1) {
        const textAfterStrong = fullItemText.substring(strongIndex + clickableText.length)
        const colonIndex = textAfterStrong.indexOf(':')
        
        if (colonIndex !== -1) {
          contextText = textAfterStrong.substring(0, colonIndex).trim()
        }
      }
    } 
    // Check for "M1:" or "M2:" pattern
    else if (fullItemText.match(/^(M\d+):/i)) {
      const match = fullItemText.match(/^(M\d+):/i)
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (match && match[1]) {
        clickableText = match[1]
        hasClickableContent = true
        
        // Extract context after the label
        contextText = fullItemText.substring(match[0].length).trim()
      }
    }
    
    if (!hasClickableContent) {
      return element
    }
    
    console.log('Clickable text found:', clickableText)
    console.log('Context text:', contextText)
    
    // Create a unique ID for this list item
    const elementId = `li-${clickableText.replace(/\s+/g, '-').toLowerCase().substring(0, 20)}`
    const isHovered = hoveredElement === elementId
    
    // Process the children to make the appropriate elements clickable
    const processedChildren = React.Children.map(
      element.props.children,
      (child: ReactNode) => {
        // If we have a strong element and this child is a strong element
        if (hasStrong && React.isValidElement(child) && (child.type === 'strong' || child.type === 'b')) {
          return React.cloneElement(child as React.ReactElement<React.PropsWithChildren<unknown>>, {
            ...(child as React.ReactElement).props,
            className: cn(
              (child as React.ReactElement).props.className,
              'cursor-pointer transition-colors duration-200 text-blue-500', 
              isHovered ? 'underline' : 'hover:underline'
            ),
            onClick: () => handleClick(clickableText, contextText),
            onMouseEnter: () => setHoveredElement(elementId),
            onMouseLeave: () => setHoveredElement(null),
            'aria-label': `Get more details about ${clickableText}`
          })
        }
        
        // If this is a text node that starts with our pattern (for direct text nodes)
        if (typeof child === 'string' && child.startsWith(`${clickableText}:`)) {
          const parts = child.split(':')
          return (
            <>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <span 
                className={cn(
                  'cursor-pointer transition-colors duration-200 text-blue-500',
                  isHovered ? 'underline' : 'hover:underline'
                )}
                onClick={() => handleClick(clickableText, contextText)}
                onMouseEnter={() => setHoveredElement(elementId)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {parts[0]}
              </span>
              <span>:{parts.slice(1).join(':')}</span>
            </>
          )
        }
        
        return child
      }
    )

    return React.cloneElement(element, {
      ...element.props,
      children: processedChildren
    })
  }

  // Process headings (h1, h2, h3, etc.)
  const isHeading = (element: React.ReactElement): boolean => {
    return typeof element.type === 'string' && /^h[1-6]$/.test(element.type)
  }

  // Make headings clickable
  const processHeading = (element: React.ReactElement) => {
    const headingText = extractTextContent(element.props.children)
    console.log('Processing heading:', headingText)
    
    // Match heading patterns like "1. Performance" or "1. Architecture and Design"
    const match = headingText.match(/^(\d+)\.\s*([A-Za-z0-9\s]+)/)
    
    if (!match || !match[2]) {
      return element
    }
    
    const title = match[2].trim()
    console.log('Found heading title:', title)
    
    const elementId = `heading-${title.replace(/\s+/g, '-').toLowerCase()}`
    const isHovered = hoveredElement === elementId

    // Process the children to wrap the text in a clickable span
    const processedChildren = React.Children.map(
      element.props.children,
      (child: ReactNode) => {
        if (typeof child === 'string') {
          const parts = child.split('.')
          if (parts.length > 1) {
            return (
              <>
                <span>{parts[0]}.</span>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <span 
                  className={cn(
                    'cursor-pointer transition-colors duration-200 text-blue-500',
                    isHovered ? 'underline' : 'hover:underline'
                  )}
                  onClick={() => handleClick(title)}
                  onMouseEnter={() => setHoveredElement(elementId)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {parts.slice(1).join('.')}
                </span>
              </>
            )
          }
        }
        return child
      }
    )

    return React.cloneElement(element, {
      ...element.props,
      children: processedChildren
    })
  }

  // Process text nodes that might have M1/M2 patterns directly
  const processTextNode = (text: string): ReactNode => {
    // Check for M1/M2 patterns
    const match = text.match(/^(M\d+):\s*(.+)/)
    if (!match) return text
    
    const label = match[1]
    const restText = match[2]
    const elementId = `text-${label.toLowerCase()}`
    const isHovered = hoveredElement === elementId
    
    return (
      <>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <span 
          className={cn(
            'cursor-pointer transition-colors duration-200 text-blue-500',
            isHovered ? 'underline' : 'hover:underline'
          )}
          onClick={() => handleClick(label, restText)}
          onMouseEnter={() => setHoveredElement(elementId)}
          onMouseLeave={() => setHoveredElement(null)}
        >
          {label}
        </span>
        <span>: {restText}</span>
      </>
    )
  }

  // Main processing function for React elements
  const processContent = (content: ReactNode): ReactNode => {
    // Handle string content directly
    if (typeof content === 'string') {
      return processTextNode(content)
    }

    // Skip non-string/non-object content
    if (typeof content !== 'object' || content === null) {
      return content
    }

    // Process arrays of elements
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <React.Fragment key={`content-item-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
index}`}>
          {processContent(item)}
        </React.Fragment>
      ))
    }

    // Process React elements
    if (React.isValidElement(content)) {
      // Process headings
      if (isHeading(content)) {
        return processHeading(content)
      }
      
      // Process list items
      if (isListItem(content)) {
        return processListItem(content)
      }

      // Check for strong elements anywhere
      if (content.type === 'strong' || content.type === 'b') {
        const strongText = extractTextContent(content.props.children)
        if (strongText.match(/^M\d+$/)) {
          const elementId = `strong-${strongText.toLowerCase()}`
          const isHovered = hoveredElement === elementId
          
          return React.cloneElement(content as React.ReactElement<React.PropsWithChildren<unknown>>, {
            ...(content as React.ReactElement).props,
            className: cn(
              'cursor-pointer transition-colors duration-200 text-blue-500',
              isHovered ? 'underline' : 'hover:underline'
            ),
            onClick: () => handleClick(strongText),
            onMouseEnter: () => setHoveredElement(elementId),
            onMouseLeave: () => setHoveredElement(null)
          })
        }
      }

      // Process children of other elements
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
            if (content.props && content.props.children) {
        return React.cloneElement(content as React.ReactElement<React.PropsWithChildren<unknown>>, {
          ...(content as React.ReactElement).props,
          children: processContent((content as React.ReactElement).props.children)
        })
      }
    }

    return content
  }

  return <>{processContent(children)}</>
}