import jwt from 'jsonwebtoken';
import { JWTConfig } from '../config/jwt.config.js';

const getAccessToken = (data) => {
    const SECRET_KEY = process.env.JWT_SECRET;

    const accessToken = jwt.sign(data, SECRET_KEY, JWTConfig.accessTokenConfig);

    return accessToken;
}

const getRefreshToken = (data) => {
    const SECRET_KEY = process.env.JWT_REFRESH_SECRET;

    const refreshToken = jwt.sign(data, SECRET_KEY, JWTConfig.refreshTokenConfig);

    return refreshToken;
}

const AccessTokenVerify = (accessToken) => {
    const SECRET_KEY = process.env.JWT_SECRET;

    try {
        console.log("액세스 토큰 검증 : ", accessToken);
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        console.log("액세스 토큰 검증 결과 : ", decoded);
        return { valid: true, payload: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 토큰 만료
            return { valid: false, payload: 'expired' };
        }
        if (error.name === 'JsonWebTokenError') { // 토큰 위조
            return { valid: false, payload: 'invalid' };
        }

        return { valid: false, payload: 'unknown error' };
    }
}

const RefreshTokenVerify = (refreshToken) => {
    const SECRET_KEY = process.env.JWT_REFRESH_SECRET;

    try {
        console.log("리프레시 토큰 검증", refreshToken);
        const decoded = jwt.verify(refreshToken, SECRET_KEY);
        console.log("리프레시 토큰 검증 결과", decoded);
        return { valid: true, payload: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 토큰 만료
            return { valid: false, payload: 'expired' };
        }
        if (error.name === 'JsonWebTokenError') { // 토큰 위조
            return { valid: false, payload: 'invalid' };
        }

        return { valid: false, payload: 'unknown error' };
    }
}

export const JWTUtils = {
    getAccessToken,
    getRefreshToken,
    AccessTokenVerify,
    RefreshTokenVerify,
}