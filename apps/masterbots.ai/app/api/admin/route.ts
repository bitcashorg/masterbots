import { verifyAdmin } from '@/services/admin/admin.service'
import { adminActions, type AdminActionType } from './actions'

export async function POST(req: Request) {
  try {
    await verifyAdmin()

    const { action, payload } = await req.json()

    if (!isValidAction(action)) {
      return Response.json(
        { error: `Invalid action: ${action}` },
        { status: 400 }
      )
    }

    const actionConfig = adminActions[action]

    const validationResult = actionConfig.schema.safeParse(payload)
    if (!validationResult.success) {
      return Response.json(
        { error: validationResult.error.message },
        { status: 400 }
      )
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const result = await actionConfig.handler(validationResult.data as any)

    return Response.json({ data: result })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      {
        status:
          error instanceof Error && error.message.includes('Unauthorized')
            ? 401
            : 400
      }
    )
  }
}

function isValidAction(action: unknown): action is AdminActionType {
  return typeof action === 'string' && action in adminActions
}
