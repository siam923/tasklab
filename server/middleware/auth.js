import jwt from 'jsonwebtoken';


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //not google or 3rd parti auth token
        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');

            req.userId = decodeData?.indexOf;
        } else {
            // token is coming from google auth
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub; //google uses todifferentiate user
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;

