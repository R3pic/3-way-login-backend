import { JWTUtils } from '../util/jwtUtils.js';

const Message = (req, res) => {
    const { access_token, refresh_token } = req.cookies; // 원래는 헤더의 Authorization에서 가져와야 함

    if (!access_token) { // 액세스 토큰이 존재하지 않을 때,
        if (refresh_token) { // 리프레시 토큰이 존재하면,
            TryNewAccessToken(refresh_token, res);
            return;
        }
        res.send('로그인이 필요한 요청입니다.');
        return;
    }

    // 액세스 토큰이 존재할때,
    const decoded = JWTUtils.AccessTokenVerify(access_token);

    if (!decoded.valid){ // 액세스 토큰이 유효하지 않을 때,
        if (refresh_token) { // 리프레시 토큰이 존재하면,
            TryNewAccessToken(refresh_token, res);
            return;
        }
        res.send('로그인이 필요한 요청입니다.');
        return;
    }

    const { name, data } = decoded.payload;

    const message = `안녕하세요! ${name}님! Payload에 저장된 데이터 : ${data}`;
    res.send(message);
}

const TryNewAccessToken = (refresh_token, res) => {
    if (!refresh_token) {
        res.send('리프레시 토큰이 존재하지 않습니다. 로그인이 필요합니다.');
        return;
    }

    const decoded = JWTUtils.RefreshTokenVerify(refresh_token);
    if (!decoded.valid) {
        res.send('리프레시 토큰이 유효하지 않습니다. 로그인이 필요합니다.');
        return;
    }
    const { name } = decoded.payload;
    const newAccessToken = JWTUtils.getAccessToken({ name, data: '새로 발급받은 액세스 토큰' });
    res.cookie('access_token', newAccessToken);
    console.log('액세스 토큰 재발급 완료');

    const newAccessTokenDecoded = JWTUtils.AccessTokenVerify(newAccessToken);

    if (newAccessTokenDecoded) {
        const { name, data } = newAccessTokenDecoded.payload;
        const message = `안녕하세요! ${name}님! Payload에 저장된 데이터 : ${data}`;
        res.send(message);
    }
    return;
}

export const IndexHandler_JWT_more = {
    Message,
}