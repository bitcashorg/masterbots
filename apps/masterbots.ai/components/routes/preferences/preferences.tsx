'use client'

import { preferences } from '@/lib/constants/preferences'
import { appConfig } from 'mb-env'
import { PreferenceSection } from './preference-section'

export function Preferences() {
	const filteredPreferences = preferences.filter(
		(section) =>
			((section.title === 'General' ||
				section.title === 'Thread Preferences') &&
				appConfig.features.devMode) ||
			section.title === 'Danger Zone',
	)
	return (
		<>
			{filteredPreferences.map((section) => (
				<PreferenceSection
					key={section.title}
					title={section.title}
					items={section.items}
				/>
			))}
		</>
	)
}
