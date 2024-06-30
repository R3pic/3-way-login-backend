import FileStore from 'session-file-store';
import Session from 'express-session';

const SaveFileStore = FileStore(Session);

export const SessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new SaveFileStore({ path: './sessions' })
}