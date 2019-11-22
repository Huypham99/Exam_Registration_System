import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setId, setLoggedIn, setAdmin, setAuthed } from '../../actions/authentication'


const AuthenticatedComponent = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        async function verifyToken() {
            let res = await axios({
                method: 'get',
                url: 'http://localhost:4000/verifyToken',
                withCredentials: true,
                crossdomain: true,
            })
            if (res.data.sub) {
                dispatch(setId(res.data.sub.id));
                dispatch(setAdmin(res.data.sub.isAdmin));
                dispatch(setLoggedIn(true));
                dispatch(setAuthed(true));
            }
            if (res.error) {
                dispatch(setId(''))
                dispatch(setAdmin(false))
                dispatch(setLoggedIn(false))
                dispatch(setAuthed(false))
            }
        }
        verifyToken();
    });

    return (
        <div>{props.children}</div>
    );
};

export default AuthenticatedComponent;