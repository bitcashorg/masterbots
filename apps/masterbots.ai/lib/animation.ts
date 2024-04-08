// Easing function for smooth animation
export const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

let animationFrameId: number
export const scrollToBottomOfElement = (element?: HTMLElement) => {
  if (!element) return
  const targetScroll = element.scrollHeight - element.clientHeight
  const duration = 500
  const startTime = performance.now()

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const position = easeInOutQuad(
      elapsed,
      element.scrollTop,
      targetScroll - element.scrollTop,
      duration
    )
    element.scrollTop = position

    if (elapsed < duration) {
      animationFrameId = requestAnimationFrame(animateScroll)
    } else {
      cancelAnimationFrame(animationFrameId)
    }
  }

  animationFrameId = requestAnimationFrame(animateScroll)
}
