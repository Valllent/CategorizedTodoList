const x = NaN;
if (!x) {
    console.log("Executed")
}

async function asyncFun() {
    console.log("asyncFun")
}

const promise = new Promise((resolve, reject) => {
    console.log("first")
    resolve()
})

promise
    .then(asyncFun)
    .then(async () => {
        await new Promise((resolve, reject) => {
            console.log("Inner Promise")
            reject()
        })
    })
    .then((res) => {
        console.log("then")
    })
    .then(async (res) => {
        console.log("async then")
    })
    .catch((err) => {
        console.log(`Catch: ${err}`)
    })
