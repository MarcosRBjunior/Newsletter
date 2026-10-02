import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  muted?: boolean
  className?: string
}

export function Eyebrow({ children, muted = false, className = '' }: EyebrowProps) {
  return (
    <p className={`font-mono text-eyebrow uppercase ${muted ? 'text-ink-40' : 'text-hot'} ${className}`}>
      {children}
    </p>
  )
}
