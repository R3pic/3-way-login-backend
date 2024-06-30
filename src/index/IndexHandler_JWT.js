import { jwtAuth } from '../util/jwtUtils.js';

const getMessage = (req) => {
    const { access_token } = req.cookies; // 원래는 헤더의 Authorization에서 가져와야 함

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

    const { name, data } = decoded;

    return `안녕하세요! ${name}님! Payload에 저장된 데이터 : ${data}`;
}

export const IndexHandler_JWT = {
    getMessage,
}