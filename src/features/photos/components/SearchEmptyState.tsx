interface SearchEmptyStateProps {
  query: string
}

function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-black text-center text-gray-500">
      <p className="text-sm font-medium">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-xs">Try a different search term.</p>
    </div>
  )
}

export default SearchEmptyState
