export function createSessionId(): string {
    return `f${(+ new Date()).toString(16)}`
}