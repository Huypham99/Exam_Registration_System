import React, { useState } from 'react';
import { Input, Error } from '../../components/formElements/index'
import { Wrapper, Form, BtnWarapper, Title } from './style'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { PrimaryButton } from '../../components/button/index'
import axios from 'axios';

const LogIn = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

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

    const handleLogin = (e) => {

        e.preventDefault()

        if (!password || password.length === 0) {
            setPasswordError(true)
        }
        if (!username || username.length === 0) {
            setUsernameError(true)
        }

        if ((password || password.length !== 0) && (username || username.length !== 0)) {

            setLoading(true)

            axios({
                method: 'post',
                url: 'http://localhost:4000/auth/login',
                withCredentials: true,
                data: { userName: username, password: password }
            }).then(function (response) {
                if (response) {
                    setLoading(false)
                    return props.history.push('/exams')
                }
            }).catch((error) => {
                setServerError(error.response.data.error)
                setLoading(false)
            })
        }
    }

    return (
        <Wrapper>
            <Title>
                Đăng nhập hệ thống
            </Title>
            <Form>
                {serverError && <Error>{serverError}</Error>}
                <Input
                    type="text"
                    defaultValue={username}
                    onChange={changeUsername}
                    placeholder={'username'}
                >Tên truy cập</Input>
                {usernameError ? <Error>Tên truy cập không được để trống</Error> : ''}
                <Input
                    inputType="password"
                    defaultValue={password}
                    onChange={changePassword}
                    placeholder={'password'}
                >Mật khẩu</Input>
                {passwordError ? <Error>Mật khẩu không được để trống</Error> : ''}
                <BtnWarapper>
                    <PrimaryButton onClick={handleLogin} target='_self'>{loading ? 'Đăng nhập...' : 'Đăng nhập'}</PrimaryButton>
                </BtnWarapper>
            </Form>
        </Wrapper>
    );
};

export default withRouter(LogIn);