export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-sky-500" />
      <span className="label">{children}</span>
      <span className="w-8 h-px bg-sky-500" />
    </div>
  )
}
