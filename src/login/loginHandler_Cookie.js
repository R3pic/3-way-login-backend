import { UserData } from '../users/users.data.js';
import { CookieConfig } from '../config/cookie.config.js';

const login_process = (req, res) => {
    console.log("바디",req.body);
    console.log("쿠키",req.cookies);

    if (req.cookies.user) {
        res.send("이미 로그인 되어 있습니다.");
        return;
    }

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

    res.cookie('user', username, CookieConfig);
    res.send("로그인 되었습니다.");
}

export const loginHandler_Cookie = {
    login_process
}