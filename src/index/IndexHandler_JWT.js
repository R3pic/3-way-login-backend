import { JWTUtils } from '../util/jwtUtils.js';

const Message = (req, res) => {
    const { access_token } = req.cookies; // 원래는 헤더의 Authorization에서 가져와야 함

    const unloginedmessage = '로그인이 필요합니다.';
    const invalidtokenmessage = '유효하지 않은 토큰입니다.';
    const expiredtokenmessage = '토큰이 만료되었습니다.';

    if (!access_token) {
        res.send(unloginedmessage);
        return;
    }

    const decoded = JWTUtils.AccessTokenVerify(access_token);

    if (!decoded.valid){
        if (decoded.payload === 'invalid') {
            res.send(invalidtokenmessage);
            return;
        }
        if (decoded.payload === 'expired') {
            res.send(expiredtokenmessage);
            return;
        }
    }

    const { name, data } = decoded.payload;

    const message = `안녕하세요! ${name}님! Payload에 저장된 데이터 : ${data}`;
    res.send(message);
}

export const IndexHandler_JWT = {
    Message,
}