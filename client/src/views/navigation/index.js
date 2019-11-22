import React from 'react';
import { useSelector } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { withCurrentUser } from '../../components/withCurrentUser/index'
import { compose } from 'recompose'
import Icon from '../../components/icon/index'
import { PrimaryButton } from '../../components/button'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setId, setLoggedIn, setAdmin, setAuthed } from '../../actions/authentication'

import {
    NavigationWrapper,
    NavigationGrid,
    AvatarGrid,
    AvatarLink,
    Label,
    IconWrapper,
    Divider,
    ActionsRowContainer
} from './style'

const Navigation = (props) => {

    const { currentUser } = props

    const dispatch = useDispatch();


    const logout = async (e) => {
        e.preventDefaul()

        await axios({
            method: 'get',
            url: 'http://localhost:4000/clearToken',
            withCredentials: true,
            crossdomain: true,
        })

        dispatch(setLoggedIn(false))

        dispatch(setId(''));

        dispatch(setAdmin(false));

        dispatch(setAuthed(false));
    }


    if (currentUser) {
        if (currentUser.isAdmin) {
            return (
                <NavigationWrapper>
                    <NavigationGrid>
                        <Route path='/dashboard'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/dashboard'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Dashboard</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/exams'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/exams'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Examinations</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/students'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/students'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Students</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/modules'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/modules'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Modules</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/halls'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/halls'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Lecture Halls</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/eligible'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/eligible'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Eligible</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/ineligible'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/ineligible'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="document" size='26' />
                                        </IconWrapper>

                                        <Label>Ineligible</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Divider />
                        <Route path='/aa'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/aa'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="user" size='27' />
                                        </IconWrapper>

                                        <Label>{currentUser && currentUser.studentId}</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Divider />
                        <ActionsRowContainer>
                            <PrimaryButton href={'http://localhost:4000/auth/logout'} target="_self">logout</PrimaryButton>
                        </ActionsRowContainer>
                    </NavigationGrid>
                </NavigationWrapper>
            )
        }
        if (!currentUser.isAdmin) {
            return (
                <NavigationWrapper>
                    <NavigationGrid>
                        <Route path='/exams'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/exams'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="register" size='26' />
                                        </IconWrapper>

                                        <Label>Đăng kí thi</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/registered'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/registered'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="register" size='26' />
                                        </IconWrapper>

                                        <Label>Danh sách</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Route path='/print'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/print'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="printer" size='26' />
                                        </IconWrapper>

                                        <Label>In đăng kí thi</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Divider />
                        <Route path='/hbhb'>
                            {({ match }) => (
                                <AvatarGrid isActive={!!match}>
                                    <AvatarLink
                                        to={'/hbhb'}
                                    >
                                        <IconWrapper>
                                            <Icon glyph="user" size='27' />
                                        </IconWrapper>

                                        <Label>{currentUser && currentUser.studentId}</Label>
                                    </AvatarLink>
                                </AvatarGrid>
                            )}
                        </Route>
                        <Divider />
                        <ActionsRowContainer>
                            <PrimaryButton href={'http://localhost:4000/auth/logout'} target='_self'>logout</PrimaryButton>
                        </ActionsRowContainer>
                    </NavigationGrid>
                </NavigationWrapper>
            )
        }
    }
    return null;
};


export default compose(withCurrentUser, withRouter)(Navigation);


