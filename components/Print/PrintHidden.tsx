import '../styles.scss'

// Container that hides on print
export const PrintHidden = ({
  className,
  children,
  style,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) => {
  return (
    <div style={style} className={`print-hidden ${className}`}>
      {children}
    </div>
  )
}
