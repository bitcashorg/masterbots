import type { WebSearchResult } from '@/types/types'

interface ThreadReferencesProps {
  references: WebSearchResult[]
}

export function ThreadReferences({ references }: ThreadReferencesProps) {
  if (references.length === 0) return null

  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <h3 className="mb-2 text-lg font-semibold">References</h3>
      <div className="space-y-4">
        {references.map((ref, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="flex gap-4">
            {ref.thumbnail?.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ref.thumbnail.src}
                alt={ref.title}
                className="object-cover rounded size-20"
              />
            )}
            <div>
              <h4 className="font-medium">{ref.title}</h4>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {ref.profile.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
