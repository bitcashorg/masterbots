import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

import { IconSpinner } from '@/components/ui/icons'

export function AlertDialogue({
  title,
  description,
  deleteDialogOpen,
  isDeleting,
  setIsDeleteOpen,
  handleDelete,
}: {
  title: string
  description: string
  deleteDialogOpen: boolean
  isDeleting: boolean
  setIsDeleteOpen: (open: boolean) => void
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {
  return (
    <AlertDialog open={deleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={e => {
              e.stopPropagation()
              setIsDeleteOpen(false)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.stopPropagation()
              handleDelete(e)
            }}
          >
            {isDeleting && <IconSpinner className="w-4 h-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
