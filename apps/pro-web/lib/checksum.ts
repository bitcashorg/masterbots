// Shared checksum utility used by both client and server code.
// It mirrors the previous implementation in /api/workspace/state.

export function computeChecksum(obj: unknown): string {
	try {
		const json = typeof obj === 'string' ? obj : JSON.stringify(obj)
		let hash = 0
		for (let i = 0; i < json.length; i++) {
			const chr = json.charCodeAt(i)
			hash = (hash << 5) - hash + chr
			hash |= 0
		}
		return hash.toString()
	} catch {
		return '0'
	}
}
