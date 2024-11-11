'use client'

import { type FC, memo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconDownload } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c++': '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
  solidity: '.sol',
  cairo: '.cairo',
  json: '.json',
  yaml: '.yaml',
  xml: '.xml',
  markdown: '.md',
  plaintext: '.txt',
  react: '.jsx'
}

const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return lowercase ? result.toLowerCase() : result
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return
    }
    const fileExtension = programmingLanguages[language] || '.file'
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`
    const fileName = window.prompt('Enter file name', suggestedFileName)

    if (!fileName) {
      return
    }

    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(value)
  }

  return (
    <div className="relative w-full overflow-hidden font-sans text-sm rounded-md sm:text-base">
      <div
        className={cn(
          'flex items-center justify-between w-full bg-zinc-800 text-zinc-100',
          'px-2 py-1.5 sm:px-6 sm:py-2'
        )}
      >
        <span className="text-[11px] sm:text-xs lowercase">{language}</span>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button
            variant="ghost"
            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={downloadAsFile}
            size="icon"
          >
            <IconDownload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            onClick={onCopy}
          >
            {isCopied ? (
              <IconCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <IconCopy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <div className="relative w-full overflow-auto text-xs sm:text-sm">
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          PreTag="div"
          showLineNumbers
          customStyle={{
            margin: 0,
            width: '100%',
            background: 'transparent',
            padding: '0.75rem 0.25rem'
          }}
          lineNumberStyle={{
            minWidth: '2em',
            paddingRight: '0.75em',
            userSelect: 'none',
            opacity: 0.5,
            fontSize: '11px'
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
              fontSize: 'inherit',
              lineHeight: '1.4'
            }
          }}
          className="text-xs sm:text-sm"
          wrapLines
          wrapLongLines
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  )
})

CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
