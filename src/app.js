import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routers/indexRouter.js';
import loginRouter from './routers/loginRouter.js';
import signupRouter from './routers/signupRouter.js';

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cookieParser())
    .use('/', indexRouter)
    .use('/login', loginRouter)
    .use('/signup', signupRouter)
    .get('/logout', (req, res) => {
        console.log("쿠키",req.cookies);

        res.clearCookie('user');
        res.send("로그아웃 되었습니다.");
    })
    .listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));