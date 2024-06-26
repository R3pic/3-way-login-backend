import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import publicServeRouter from './routers/publicServeRouter.js';
import { UserData, User } from './users/users.data.js';

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cookieParser())
    .get('/', (req, res) => {
        console.log("쿠키",req.cookies);
        const unloginedmessage = '로그인이 필요합니다.';
        const loginedmessage = `안녕하세요! ${req.cookies.user}님!`;
        res.send(req.cookies.user ? loginedmessage : unloginedmessage);
    })
    .use(publicServeRouter)
    .post('/signup', (req, res) => {
        console.log("바디",req.body);
        console.log("쿠키",req.cookies);

        const { username, password } = req.body;
        const user = new User(username, password);

        if (UserData.hasUser(username)) {
            res.send("이미 존재하는 회원입니다.");
            return;
        }
        else {
            UserData.createUser(user);
            // res.cookie('user', username); 회원가입 후 자동 로그인 되지 않도록 주석처리
            res.send("회원가입이 완료되었습니다.");
        }
    })
    .post('/login', (req, res) => {
        console.log("바디",req.body);
        console.log("쿠키",req.cookies);

        if (req.cookies.user) {
            res.send("이미 로그인 되어 있습니다.");
            return;
        }

        const { username, password } = req.body;
        const user = UserData.getUser(username);
        if (user && user.password === password) {
            res.cookie('user', username);
            res.send("로그인 되었습니다.");
        } else {
            res.send("아이디 또는 비밀번호가 틀렸습니다.");
        }
    })
    .get('/logout', (req, res) => {
        console.log("쿠키",req.cookies);

        res.clearCookie('user');
        res.send("로그아웃 되었습니다.");
    })
    .listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));