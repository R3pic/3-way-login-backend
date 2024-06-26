import { UserData } from '../users/users.data.js';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config.js';
import { CookieConfig } from '../config/cookie.config.js';

const login_process = (req, res) => {
    const SECRET_KEY = process.env.JWT_SECRET;

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

    const token = jwt.sign({ 
        name: username,
        data: "내가 임의로 넣은 데이터" 
    }, SECRET_KEY, jwtConfig);

    res.cookie('access_token', token, CookieConfig);
    res.send('로그인 성공');
}

export const loginHandler_JWT = {
    login_process
}