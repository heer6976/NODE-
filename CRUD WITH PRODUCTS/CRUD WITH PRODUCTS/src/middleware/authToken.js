const jwt = require("jsonwebtoken");

const authToken = (req,res,next) => {
    try {
        
        const token  = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, "privateKey");
        req.user = userData;
        next();

    } catch (error) {
        res.json({
            msg : "Not Authenticated.",
        });
    }
};


module.exports = authToken;