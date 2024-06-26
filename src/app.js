import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import indexRouter from './index/indexRouter.js';
import loginRouter from './login/loginRouter.js';
import signupRouter from './signup/signupRouter.js';
import logoutRouter from './logout/logoutRouter.js';

import { SessionConfig } from './config/SessionConfig.js';

console.log(`로그인 관리 방식: ${process.env.VERSION}`);

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cookieParser())
    .use(expressSession(SessionConfig))
    .use('/', indexRouter)
    .use('/login', loginRouter)
    .use('/logout', logoutRouter)
    .use('/signup', signupRouter)
    .listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));