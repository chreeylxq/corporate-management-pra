
const middleware = {
    checkToken: (req, res, next) => {
        console.log(req.body);

        next()
    }
}

module.exports = middleware;