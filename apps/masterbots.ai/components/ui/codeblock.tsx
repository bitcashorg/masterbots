'use client'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconDownload } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'
import { type FC, memo } from 'react'
import {
	Prism as SyntaxHighlighterComponent,
	type SyntaxHighlighterProps,
} from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Use type assertion to fix React version incompatibility
const SyntaxHighlighter =
	SyntaxHighlighterComponent as unknown as React.ComponentType<SyntaxHighlighterProps>

interface Props {
	language: string
	value: string
}

interface languageMap {
	[key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
	actionscript: '.as',
	ada: '.ada',
	assembly: '.asm',
	bash: '.sh',
	c: '.c',
	'c#': '.cs',
	'c++': '.cpp',
	cairo: '.cairo',
	clojure: '.clj',
	cobol: '.cob',
	cpp: '.cpp',
	css: '.css',
	dart: '.dart',
	dockerfile: '.dockerfile',
	elixir: '.ex',
	erlang: '.erl',
	fortran: '.f',
	go: '.go',
	groovy: '.groovy',
	haskell: '.hs',
	html: '.html',
	java: '.java',
	javascript: '.js',
	json: '.json',
	kotlin: '.kt',
	lua: '.lua',
	markdown: '.md',
	matlab: '.m',
	'objective-c': '.m',
	perl: '.pl',
	php: '.php',
	plaintext: '.txt',
	powershell: '.ps1',
	python: '.py',
	r: '.r',
	react: '.jsx',
	ruby: '.rb',
	rust: '.rs',
	sass: '.sass',
	scala: '.scala',
	scss: '.scss',
	shell: '.sh',
	solidity: '.sol',
	sql: '.sql',
	swift: '.swift',
	tsx: '.tsx',
	typescript: '.ts',
	vb: '.vb',
	vue: '.vue',
	xml: '.xml',
	yaml: '.yaml',
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

	const downloadAsFile = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (typeof window === 'undefined') {
			return
		}
		const fileExtension = programmingLanguages[language] || '.txt'
		const suggestedFileName = `file-${generateRandomString(6, true)}${fileExtension}`
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

	const onCopy = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (isCopied) return
		copyToClipboard(value)
	}

	return (
		<div className="relative w-full overflow-hidden font-sans text-sm rounded-md sm:text-base z-10">
			<div
				className={cn(
					'flex items-center justify-between w-full bg-zinc-800 text-zinc-100',
					'px-2 py-1.5 sm:px-6 sm:py-2',
				)}
			>
				<span className="text-[11px] sm:text-xs lowercase">{language}</span>
				<div className="flex items-center gap-0.5 sm:gap-1">
					<Button
						variant="ghost"
						className="pointer-events-auto h-7 w-7 sm:h-8 sm:w-8 hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
						onClick={downloadAsFile}
						size="icon"
					>
						<IconDownload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
						<span className="sr-only">Download</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="pointer-events-auto h-7 w-7 sm:h-8 sm:w-8 hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
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
						padding: '0.75rem 0.25rem',
					}}
					lineNumberStyle={{
						minWidth: '2em',
						paddingRight: '0.75em',
						userSelect: 'none',
						opacity: 0.5,
						fontSize: '11px',
					}}
					codeTagProps={{
						style: {
							fontFamily: 'var(--font-mono)',
							fontSize: 'inherit',
							lineHeight: '1.4',
						},
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
