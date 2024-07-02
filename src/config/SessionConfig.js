export const get = (fileStore) => {
    return {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }, // 세션 유지시간 1분
        store: new fileStore({ path: './sessions' }),
    }
}

export const SessionConfig = {
    get,
}