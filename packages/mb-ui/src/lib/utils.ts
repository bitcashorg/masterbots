export function cn(...inputs: Array<string | undefined | null | false>) {
	return inputs.filter(Boolean).join(' ')
}
