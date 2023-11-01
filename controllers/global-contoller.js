module.exports = {
    unknownUrl: (req, res) => {
        res.status(404).send('Resource not found')
    },

    exceptionHandler: (err, req, res, next) => {
        console.log(`Exception in request: ${req.url}`)
        console.trace(err)
        res.status(500).send("Internal error")
    }
}