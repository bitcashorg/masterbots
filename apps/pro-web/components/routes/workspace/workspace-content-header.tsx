'use client'

import { Button } from '@/components/ui/button'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { HistoryIcon, SaveIcon } from 'lucide-react'
import * as React from 'react'

interface WorkspaceContentHeaderProps {
	documentType: 'text' | 'image' | 'spreadsheet'
	activeSection: string | null
	isSaving: boolean
	showVersions: boolean
	versions: Array<{
		version: number
		updatedAt: string
		checksum: string
		url: string
	}>
	onSave: () => void
	onToggleVersions: () => void
	onRollback: (version: number) => void
}

export function WorkspaceContentHeader({
	documentType,
	activeSection,
	isSaving,
	showVersions,
	versions,
	onSave,
	onToggleVersions,
	onRollback,
}: WorkspaceContentHeaderProps) {
	return (
		<>
			<div className="absolute top-5 right-6 flex justify-end items-center z-50">
				<div className="flex items-center gap-2">
					{documentType === 'text' && activeSection && (
						<Button
							size="sm"
							variant="outline"
							onClick={onSave}
							disabled={isSaving}
							className="flex items-center gap-2"
						>
							<SaveIcon className="h-4 w-4" />
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						onClick={onToggleVersions}
						className="ml-1"
					>
						<HistoryIcon className="size-4" /> History
					</Button>
				</div>
			</div>

			{showVersions && versions.length > 0 && (
				<div className="border rounded-md p-3 text-sm">
					<div className="font-medium mb-2">Version History</div>
					<ul className="space-y-1">
						{[...versions]
							.sort((a, b) => b.version - a.version)
							.map((v) => (
								<li
									key={v.version}
									className="flex items-center justify-between"
								>
									<span>
										v{v.version} • {new Date(v.updatedAt).toLocaleString()} •
										checksum {v.checksum}
									</span>
									<div className="flex items-center gap-2">
										<a
											href={v.url}
											target="_blank"
											rel="noreferrer"
											className="text-xs underline"
										>
											View
										</a>
										<Button
											variant="outline"
											size="sm"
											onClick={() => onRollback(v.version)}
										>
											Rollback
										</Button>
									</div>
								</li>
							))}
					</ul>
				</div>
			)}
		</>
	)
}
