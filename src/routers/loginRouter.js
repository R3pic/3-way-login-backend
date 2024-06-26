import express from 'express';

import { UserData } from '../users/users.data.js';
import { CookieConfig } from '../config/cookieconfig.js';

const loginRouter = express.Router();

loginRouter
    .get('/', (req, res) => {
        res.sendFile('login.html', { root: 'public' });
    })
    .post('/', (req, res) => {
        console.log("바디",req.body);
        console.log("쿠키",req.cookies);

        if (req.cookies.user) {
            res.send("이미 로그인 되어 있습니다.");
            return;
        }

        const { username, password } = req.body;
        const user = UserData.getUser(username);
        if (user && user.password === password) {
            console.log(`쿠키 설정함, ${username} 콘피그 : ${JSON.stringify(CookieConfig)}`);
            res.cookie('user', username, CookieConfig);
            res.send("로그인 되었습니다.");
        } else {
            res.send("아이디 또는 비밀번호가 틀렸습니다.");
        }
    });

export default loginRouter;