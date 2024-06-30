import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import indexRouter from './index/indexRouter.js';
import loginRouter from './login/loginRouter.js';
import signupRouter from './signup/signupRouter.js';
import logoutRouter from './logout/logoutRouter.js';
import FileStore from 'session-file-store';
import Session from 'express-session';

const SaveFileStore = FileStore(Session);

console.log(`로그인 관리 방식: ${process.env.VERSION}`);

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static('public'))
    .use(cookieParser())
    .use(expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
        store: new SaveFileStore({ path: './sessions' })
    }))
    .use('/', indexRouter)
    .use('/login', loginRouter)
    .use('/logout', logoutRouter)
    .use('/signup', signupRouter)
    .listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));