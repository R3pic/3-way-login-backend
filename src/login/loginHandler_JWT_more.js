import { UserData } from '../users/users.data.js';
import { JWTUtils } from '../util/jwtUtils.js';
import { CookieConfig } from '../config/cookie.config.js';

const login_process = (req, res) => {
    const { username, password } = req.body;

    const user = UserData.getUser(username);

    if (!user) {
        res.send("존재하지 않는 사용자입니다.");
        return;
    }

    if (user.password !== password) {
        res.send("비밀번호가 틀렸습니다.");
        return;
    }

    const AccessToken = JWTUtils.getAccessToken({ name: username, data: '내가 넣고 싶은 데이터' });
    const RefreshToken = JWTUtils.getRefreshToken({ name: username });

    res.cookie('access_token', AccessToken, CookieConfig);
    res.cookie('refresh_token', RefreshToken, CookieConfig);
    res.send('로그인 성공');
}

export const loginHandler_JWT_more = {
    login_process
}