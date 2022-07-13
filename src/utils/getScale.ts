export function getScale(): number {
    if(window.innerWidth > 1330) {
        return window.innerHeight / 482
    } else {
        return window.innerWidth / 682
    }
}