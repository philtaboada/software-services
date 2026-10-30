export function ThreadNode({ className }: { className?: string }) {
  return (
    <span
      data-thread-node
      aria-hidden
      className={`pointer-events-none absolute h-px w-px ${className ?? ""}`}
    />
  );
}
