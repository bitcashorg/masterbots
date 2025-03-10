import {  PreferenceItemType } from '../../../types/types'
import { preferences } from '../../../lib/constants/preferences'
import { PreferenceSection } from './preference-section'

export function Preferences() {
  return (
 <>
    {preferences.map((section: { title: string; items: PreferenceItemType[] }) => (
      <PreferenceSection key={section.title} title={section.title} items={section.items} />
    ))}
 </>

)
}
