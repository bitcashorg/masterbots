import { type FC, memo } from 'react'
import ReactMarkdown, { type Options } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import 'katex/dist/katex.min.css'

function transformLatexBlocks(markdown: string) {
	return markdown
		.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, content) => {
			return `$$\n${content}\n$$`
		})
		.replace(/\\\((.*?)\\\)/gs, (_, equation) => {
			return `$$${equation}$$`
		})
}

// @eslint-disable-next-line react/display-name
export const MemoizedReactMarkdown: FC<Options> = memo(
	(props) => (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
			rehypePlugins={[
				[rehypeKatex, { strict: false, output: 'htmlAndMathml' }],
			]}
			{...props}
		>
			{/*****
			 // * Transform LaTeX blocks to use double dollar signs for compatibility with KaTeX syntax coming from AI responses
			 ****/}
			{transformLatexBlocks(props.children || '')}
		</ReactMarkdown>
	),
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		prevProps.className === nextProps.className,
)

MemoizedReactMarkdown.displayName = 'MemoizedReactMarkdown'
