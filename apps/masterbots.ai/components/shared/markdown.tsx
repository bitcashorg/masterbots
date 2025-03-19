import { type FC, memo } from 'react'
import ReactMarkdown, { type Options } from 'react-markdown'

// TODO: Typescript not inferring the correct type for the children prop... please update package when time available... adding ts-ignore for now
export const MemoizedReactMarkdown: FC<Options> = memo(
	ReactMarkdown,
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		prevProps.className === nextProps.className,
)
