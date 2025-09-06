type DotIndicatorProps = {
  className?: string
}
const DotIndicator = ({ className }: DotIndicatorProps) => (
  <div
    className={`w-2 h-2 bg-gray-800 rounded-full animate-pulse ${className}`}
  ></div>
)
const TypingIndicator = () => {
  return (
    <div className="self-start flex gap-1">
      <DotIndicator />
      <DotIndicator className="animation-delay: 0.2s" />
      <DotIndicator className="animation-delay: 0.4s" />
    </div>
  )
}

export default TypingIndicator
