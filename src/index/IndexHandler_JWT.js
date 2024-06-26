import { jwtAuth } from '../util/jwtUtils.js';

const getMessage = (req) => {
    const { access_token } = req.cookies;

    const unloginedmessage = '로그인이 필요합니다.';
    const invalidtokenmessage = '유효하지 않은 토큰입니다.';
    const expiredtokenmessage = '토큰이 만료되었습니다.';

    if (!access_token) {
        return unloginedmessage;
    }

    const decoded = jwtAuth(access_token);

    if (decoded === 'invalid') {
        return invalidtokenmessage;
    }
    if (decoded === 'expired') {
        return expiredtokenmessage;
    }

    return `안녕하세요! ${JSON.stringify(decoded)}님`;
}

export const IndexHandler_JWT = {
    getMessage,
}