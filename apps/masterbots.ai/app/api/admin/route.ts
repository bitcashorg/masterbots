import { ZodError } from 'zod'
import { type AdminActionType, adminActions } from './admin-actions'

type ErrorResponse = {
	error: string
	details?: unknown
	code?: string
}

function handleError(error: unknown): Response {
	console.error('Admin API Error:', error)

	if (error instanceof ZodError) {
		return Response.json(
			{
				error: 'Invalid request data',
				details: error.errors,
				code: 'VALIDATION_ERROR',
			} satisfies ErrorResponse,
			{ status: 400 },
		)
	}

	if (error instanceof Error) {
		// * Handle specific error types
		if (error.message.includes('Unauthorized')) {
			return Response.json(
				{
					error: 'Unauthorized access',
					code: 'UNAUTHORIZED',
				} satisfies ErrorResponse,
				{ status: 401 },
			)
		}

		if (error.message.includes('User not found')) {
			return Response.json(
				{
					error: error.message,
					code: 'NOT_FOUND',
				} satisfies ErrorResponse,
				{ status: 404 },
			)
		}

		if (error.message.includes('Cannot grant free month')) {
			return Response.json(
				{
					error: error.message,
					code: 'BUSINESS_RULE_VIOLATION',
				} satisfies ErrorResponse,
				{ status: 400 },
			)
		}

		return Response.json(
			{
				error: error.message,
				code: 'INTERNAL_ERROR',
			} satisfies ErrorResponse,
			{ status: 500 },
		)
	}

	return Response.json(
		{
			error: 'An unexpected error occurred',
			code: 'UNKNOWN_ERROR',
		} satisfies ErrorResponse,
		{ status: 500 },
	)
}

function isValidAction(action: unknown): action is AdminActionType {
	return typeof action === 'string' && action in adminActions
}

export async function POST(req: Request) {
	try {
		const { action, payload } = await req.json().catch(() => ({}))

		if (!action || !isValidAction(action)) {
			return Response.json(
				{
					error: 'Invalid or missing action',
					code: 'INVALID_ACTION',
				} satisfies ErrorResponse,
				{ status: 400 },
			)
		}

		const actionConfig = adminActions[action]
		const validationResult = actionConfig.schema.safeParse(payload)

		if (!validationResult.success) {
			return Response.json(
				{
					error: 'Invalid payload',
					details: validationResult.error.errors,
					code: 'INVALID_PAYLOAD',
				} satisfies ErrorResponse,
				{ status: 400 },
			)
		}

		// biome-ignore lint/suspicious/noExplicitAny: validated by zod schema
		const result = await actionConfig.handler(validationResult.data as any)

		return Response.json({
			data: result,
			success: true,
		})
	} catch (error) {
		return handleError(error)
	}
}
