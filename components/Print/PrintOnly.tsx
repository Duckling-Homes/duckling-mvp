import '../styles.scss'

// Container that shows only on print
export const PrintOnly = ({
  className,
  children,
  style,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) => {
  return (
    <div style={style} className={`print-only ${className}`}>
      {children}
    </div>
  )
}
