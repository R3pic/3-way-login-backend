import { IndexHandler_Cookie } from '../index/IndexHandler_Cookie.js';
import { IndexHandler_Session } from '../index/IndexHandler_Session.js';

const IndexHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return IndexHandler_Cookie;
    }
    else {
        return IndexHandler_Session;
    }
}

const loginHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return loginHandler_Cookie;
    }
    else {
        return loginHandler_Session;
    }
}

const signupHandlerSelect = () => {
    if (process.env.VERSION === 'cookie') {
        return signupHandler_Cookie;
    }
    else {
        return signupHandler_Session;
    }

}

export const HandlerSelecter = {
    IndexHandlerSelect,
}