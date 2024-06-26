import jwt from 'jsonwebtoken';

export const jwtAuth = (access_token) => {
    const SECRET_KEY = process.env.JWT_SECRET;

    try {
        console.log("토큰 검증", access_token)
        const decoded = jwt.verify(access_token, SECRET_KEY);
        console.log("토큰 검증 결과", decoded)
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return 'expired';
        }
        if (error.name === 'JsonWebTokenError') {
            return 'invalid';
        }
    }
}