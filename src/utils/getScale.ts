export function getScale(): number {
    if(window.innerHeight / 542 <= window.innerWidth / 752) {
        return window.innerHeight / 542
    }
    return window.innerWidth / 752
}