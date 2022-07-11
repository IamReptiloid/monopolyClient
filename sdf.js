setTimeout(() => {
    console.log(1)
}, 1000)

new Promise((resolve) => {
    console.log(2)
    setTimeout(() => {
        resolve(3)
    }, 10)
}).then((console.log))

console.log(4)