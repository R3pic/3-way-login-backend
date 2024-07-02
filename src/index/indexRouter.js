import express from 'express';

import { HandlerSelecter } from '../util/HandlerSelecter.js';

const indexRouter = express.Router();

const IndexHandler = HandlerSelecter.IndexHandlerSelect();

indexRouter
    .get('/', (req, res) => {
        IndexHandler.Message(req, res);
    });

export default indexRouter;