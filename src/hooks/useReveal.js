import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  return { ref, inView }
}

export const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}
