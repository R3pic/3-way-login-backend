import express from 'express';

import { HandlerSelecter } from '../util/HandlerSelecter.js';

const indexRouter = express.Router();

const IndexHandler = HandlerSelecter.IndexHandlerSelect();

indexRouter
    .get('/', (req, res) => {
        const message = IndexHandler.getMessage(req);
        res.send(message);
    });

export default indexRouter;