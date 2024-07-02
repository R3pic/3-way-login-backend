import express from 'express';

const refreshRouter = express.Router();

refreshRouter
    .get('/', (req, res) => {
        res.send('리프레시 라우터');
    });

export default refreshRouter;