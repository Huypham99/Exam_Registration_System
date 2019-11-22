export const setLoggedIn =  value=> {
    return {
        type: 'SET_LOGIN',
        payload: value
    }
}

export const setId = value => {
    return {
        type: 'SET_ID',
        payload: value
    }
}

export const setAdmin = value => {
    return {
        type: 'SET_ADMIN',
        payload: value
    }
}

export const setAuthed = value => {
    return {
        type: 'SET_AUTHED',
        payload: value
    }
}
