import express from 'express';

import { HandlerSelecter } from '../util/HandlerSelecter.js';

const logoutRouter = express.Router();

const LogoutHandler = HandlerSelecter.LogoutHandlerSelect();

logoutRouter
    .get('/', (req, res) => {
        LogoutHandler.logout_process(req, res);
    });

export default logoutRouter;