import { mbObjectSchema } from '@/lib/helpers/ai-helpers'
import type { MBObjectHook } from '@/types/types'
import { experimental_useObject as useObject } from 'ai/react'

// ? https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object#experimental_useobject
export function useMBObject({ schema }: MBObjectHook) {
	const useObjectActions = useObject({
		api: 'api/ai-object',
		// ? Ignoring TS due the schema would be defined by the properties that we send on the hook params.
		// ? It is a false positive.
		// @ts-ignore
		schema: mbObjectSchema[schema],
	})

	return useObjectActions
}
