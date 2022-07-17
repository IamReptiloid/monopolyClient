export function getScale(): number {
    if(window.innerWidth > 1330) {
        return window.innerHeight / 522
    } else {
        return window.innerWidth / 692
    }
}