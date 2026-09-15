const API_KEY = ecommerce;

const middleware = (req, res, next)=>{
    const apiKey = req.query.apiKey;

    if(!apiKey){
        return res.status(401).json({
            status: false,
            message: "API key is required"
        })
    }

    if(apiKey !== API_KEY){
        return res.status(401).json({
            status: false,
            message: "Invalid API key"
        })
    }

    next();
}

module.exports = middleware;