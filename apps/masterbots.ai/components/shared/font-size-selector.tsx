'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAccessibility } from '@/lib/hooks/use-accessibility'
import { Text } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useAccessibility()

  return (
    <Button variant="ghost" size="sm" className="flex justify-between w-full">
      <div className="flex items-center gap-2">
        <Text className="size-3.5 sm:size-4" />
        <Select value={fontSize} onValueChange={setFontSize}>
          <SelectTrigger className="w-24 h-auto p-0 text-xs border-none shadow-none sm:w-28 sm:text-sm focus:ring-0">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal" className="text-xs sm:text-sm">
              Normal
            </SelectItem>
            <SelectItem value="large" className="text-xs sm:text-sm">
              Large
            </SelectItem>
            <SelectItem value="x-large" className="text-xs sm:text-sm">
              XL
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Button>
  )
}
