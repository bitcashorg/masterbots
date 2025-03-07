import { Button } from '@/components/ui/button'
import { IconRefresh } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface ContinueGenerationButtonProps {
  onClick: () => Promise<string | null | undefined>
  isContinuing: boolean
  className?: string
  hiddenClassNames?: string
  textClassNames?: string
}

export function ContinueGenerationButton({
  onClick,
  isContinuing,
  className,
  hiddenClassNames = 'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all',
  textClassNames = 'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300',
}: ContinueGenerationButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(hiddenClassNames, className)}
      onClick={onClick}
      disabled={isContinuing}
    >
      <IconRefresh className={cn("transition-all", isContinuing && "animate-spin")} />
      <span className={textClassNames}>
        {isContinuing ? 'Continuing...' : 'Continue generation'}
      </span>
    </Button>
  )
}