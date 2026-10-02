import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'ink' | 'hot'
type Size = 'md' | 'sm' | 'nav'

interface StyleProps {
  variant?: Variant
  size?: Size
}

const VARIANTS: Record<Variant, string> = {
  ink: 'bg-ink text-paper hover:bg-hot hover:text-on-hot',
  hot: 'bg-hot text-on-hot hover:bg-hot-press',
}

const SIZES: Record<Size, string> = {
  md: 'px-6 py-3 text-button',
  sm: 'px-5 py-2.5 text-button',
  nav: 'px-4 py-2 text-nav',
}

function buttonClasses({ variant = 'ink', size = 'md' }: StyleProps, className = '') {
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono uppercase transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${className}`
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />
}
