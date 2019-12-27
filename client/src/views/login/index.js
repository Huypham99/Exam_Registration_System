import React, { useState } from 'react';
import { Input, Error } from '../../components/formElements/index'
import { Wrapper, Form, BtnWarapper, Title } from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { logInMutation } from '../../graphql/mutations/user/logIn'
import { PrimaryButton } from '../../components/button/index'
import axios from 'axios';

const LogIn = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [serverError, setServerError] = useState('')

    const [logIn, { error }] = useMutation(logInMutation)


    const changeUsername = e => {
        let username = e.target.value;
        setUsername(username)
        setUsernameError(false)
    };

    const changePassword = e => {
        let password = e.target.value;
        setPassword(password)
        setPasswordError(false)
    };

    const submit = async e => {
        if (!password || password.length === 0) {
            setPasswordError(true)
        }
        if (!username || username.length === 0) {
            setUsernameError(true)
        }
        if ((password || password.length !== 0) && (username || username.length !== 0)) {
            await logIn({ variables: { userName: username, password: password } })
            props.history.push('/dashboard')
        }
    }

    return (
        <Wrapper>
            <Title>
                Đăng nhập hệ thống
            </Title>
            <Form>
                {error && <Error>{error.message}</Error>}
                <Input
                    type="text"
                    defaultValue={username}
                    onChange={changeUsername}
                    placeholder={'username'}
                >Username</Input>
                {usernameError ? <Error>Username can not be blank</Error> : ''}
                <Input
                    inputType="password"
                    defaultValue={password}
                    onChange={changePassword}
                    placeholder={'password'}
                >Password</Input>
                {passwordError ? <Error>Password can not be blank</Error> : ''}
                <BtnWarapper>
                    <PrimaryButton onClick={submit} target='_self'>Login</PrimaryButton>
                </BtnWarapper>
            </Form>
        </Wrapper>
    );
};

export default withRouter(LogIn);