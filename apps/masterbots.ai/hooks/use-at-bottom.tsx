import { MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  ref: any
  scrollY: MotionValue<number>
}

export const useAtBottom = ({ ref, scrollY }: Props) => {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    if (!scrollY || !Boolean(ref.current)) return
    scrollY.clearListeners()
    scrollY.on('change', () => {
      setIsAtBottom(
        scrollY.get() + 5 >
          ref.current.scrollHeight - ref.current.offsetHeight &&
          scrollY.get() > 0
      )
    })
  }, [ref, scrollY])
  useEffect(() => {
    if (!scrollY || !Boolean(ref.current)) return
    if (
      scrollY.get() + 5 > ref.current.scrollHeight - ref.current.offsetHeight &&
      scrollY.get() === 0
    ) {
      setIsAtBottom(true)
    }
  }, [])

  return {
    isAtBottom
  }
}
