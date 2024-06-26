import express from 'express';

import { HandlerSelecter } from '../util/HandlerSelecter.js';

const loginRouter = express.Router();

const LoginHandler = HandlerSelecter.LoginHandlerSelect();

loginRouter
    .get('/', (req, res) => {
        res.sendFile('login.html', { root: 'public' });
    })
    .post('/', (req, res) => {
        LoginHandler.login_process(req, res);
    });

export default loginRouter;