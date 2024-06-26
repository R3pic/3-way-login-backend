const userdb = new Map()

const createUser = (user) => {
    userdb.set(user.username, user);
}

const getUser = (username) => {
    return userdb.get(username);
}

const hasUser = (username) => {
    return userdb.has(username);
}


export const UserData = {
    createUser,
    getUser,
    hasUser
}