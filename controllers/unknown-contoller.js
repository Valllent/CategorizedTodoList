module.exports.unknownUrl = (req, res) => {
    res.status(404).send('Resource not found')
}