interface EmptySectionProps {
  label: string
}

function EmptySection({ label }: EmptySectionProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-black text-center text-gray-500">
      <p className="text-sm font-medium">No photos in {label} yet</p>
      <p className="text-xs">Everything so far lives in Library.</p>
    </div>
  )
}

export default EmptySection
