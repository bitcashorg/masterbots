import * as Sentry from '@sentry/nextjs'

interface LogErrorOptions {
	error: Error | unknown // The error object or value
	message?: string // Optional descriptive message
	level?: Sentry.SeverityLevel // Severity level (e.g., 'error', 'warning', 'info', 'debug')
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	extra?: Record<string, any> // Additional context data
	tags?: Record<string, string | number | boolean> // Tags for categorization
}

const APP_NAME = 'masterbots.ai' // Define the application name consistently

/**
 * Logs an error or message to Sentry with additional context.
 * Uses the @sentry/nextjs SDK, assuming it's already initialized via
 * the standard Next.js Sentry configuration files (instrumentation.ts, etc.).
 *
 * @param title A concise title for the error category or event (used as a tag).
 * @param options An object containing the error/value and optional context.
 * @example // 1. Catching a standard error
 * try {
 *  throw new Error("Database connection failed");
 * } catch (err) {
 *  logErrorToSentry("Database Error", {
 *    error: err,
 *    message: "Failed to connect to primary database.",
 *    level: 'fatal', // Set a specific severity
 *    extra: { attempt: 3, dbHost: 'db.example.com' },
 *    tags: { component: 'database-connector', critical: true }
 *  });
 * }
 * @example // 2. Logging a warning message without an Error object
 * logErrorToSentry("Configuration Warning", {
 *  error: "API key missing for optional service 'Analytics'", // The value/issue being logged
 *  message: "Optional analytics service disabled due to missing API key.", // More descriptive message
 *  level: 'warning',
 *  extra: { service: 'Analytics', configChecked: 'env.local' },
 *  tags: { feature: 'optional-integrations' }
 * });
 * @example // 3. Logging an informational event
 * logErrorToSentry("User Action", {
 *  error: "User signup completed", // Info being logged
 *  level: 'info',
 *  extra: { userId: 'usr_12345', plan: 'free' },
 *  tags: { flow: 'onboarding' }
 * });
 */
export function logErrorToSentry(
	title: string,
	options: LogErrorOptions,
): void {
	const { error, message, level = 'error', extra = {}, tags = {} } = options

	// Map Sentry level to console method
	const consoleMethodMap: Record<Sentry.SeverityLevel, keyof Console> = {
		fatal: 'error',
		error: 'error',
		warning: 'warn',
		log: 'log',
		info: 'info',
		debug: 'debug',
	}
	const consoleMethod = consoleMethodMap[level] || 'log' // Default to 'log' if level is somehow unexpected

	// Optional: Log locally for immediate visibility during development/debugging
	// @ts-ignore
	console[consoleMethod](`[${APP_NAME}] Log [${title}]:`, message || error, {
		level,
		extra,
		tags,
	})

	Sentry.withScope((scope) => {
		// Set the severity level for the event
		scope.setLevel(level)

		// Set standard tags
		scope.setTag('app_name', APP_NAME)
		scope.setTag('log_title', title) // Use the title as a searchable tag

		// Add any custom tags provided
		for (const [key, value] of Object.entries(tags)) {
			scope.setTag(key, value)
		}

		// Add extra context data under a specific namespace
		scope.setContext('Log Details', {
			// Provide a fallback message if none is given
			message:
				message ||
				(error instanceof Error
					? error.message
					: 'No specific message provided.'),
			// Include all other extra data
			...extra,
		})

		// Capture the error or message
		if (error instanceof Error) {
			// If it's a real Error object, capture it as an exception
			Sentry.captureException(error)
		} else {
			// If it's not an Error (e.g., a string or other value), capture it as a message.
			// Construct a meaningful message string.
			const syntheticMessage = `[${APP_NAME}] ${title}: ${message || String(error)}`
			Sentry.captureMessage(syntheticMessage, {
				level: level,
				// Include the original non-error value and any other extra data
				extra: { original_value: error, ...extra },
			})
		}
	})
}
