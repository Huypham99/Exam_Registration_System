import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AdminDashboard from '../../src/views/adminDashboard'
import UserDashboard from '../../src/views/userDashboard'
import AppViewWrapper from '../../src/components/appViewWrapper'
import LogIn from '../../src/views/login'
import Navigation from '../../src/views/navigation'
import PrintExam from '../../src/views/printExam'
import StudentsList from '../views/studentsListView'
import ModulesList from '../views/modulesListView'
import HallsList from '../views/hallListView'
import IneligibleStudents from '../views/ineligibleStudentsView'
import EligibleStudents from '../views/eligibleStudentsView'
import ExamListView from '../views/examListView'
import ExamDetailView from '../views/examDetailView'
import ExamRegistrationView from '../views/examRegistrationView'
import UserSetting from '../views/userSetting'
import { ViewGrid } from '../components/layout'
import ModalRoot from '../components/modals/modalRoot'
import SignedOutFallback from '../helper/signed-out-fallback'
import { getCurrentUserQuery } from '../graphql/queries/user/getUser'
import { useQuery } from '@apollo/react-hooks';
import Toast from '../components/toasts'

import { useSelector } from 'react-redux'

const Routes = () => {

    const { loading, data } = useQuery(getCurrentUserQuery)

    const isAdmin = data && data.getCurrentUser.isAdmin

    const StudentsListFallback = SignedOutFallback(StudentsList, () => <Redirect to='/login' />);

    const PrintExamFallback = SignedOutFallback(PrintExam, () => <Redirect to='/login' />);

    const ModulesListFallback = SignedOutFallback(ModulesList, () => <Redirect to='/login' />);

    const IneligibleStudentsFallback = SignedOutFallback(IneligibleStudents, () => <Redirect to='/login' />);

    const EligibleStudentsFallback = SignedOutFallback(EligibleStudents, () => <Redirect to='/login' />);

    const ExamListViewFallback = SignedOutFallback(ExamListView, () => <Redirect to='/login' />);

    const ExamDetailViewFallback = SignedOutFallback(ExamDetailView, () => <Redirect to='/login' />);

    const ExamRegistrationViewFallback = SignedOutFallback(ExamRegistrationView, () => <Redirect to='/login' />);

    const HallsListFallback = SignedOutFallback(HallsList, () => <Redirect to='/login' />);

    const AdminDashboardFallback = SignedOutFallback(AdminDashboard, () => <Redirect to='/login' />);

    const UserSettingFallback = SignedOutFallback(UserSetting, () => <Redirect to='/login' />);

    const UserDashboardFallback = SignedOutFallback(UserDashboard, () => <Redirect to='/login' />);

    const LogInFallback = SignedOutFallback(() => <Redirect to='/exams' />, LogIn);


    return (
        <Router>
            <AppViewWrapper>
                <Route component={Navigation} />
                <Switch>
                    <Route path='/login' component={LogInFallback} />
                    {
                        <ViewGrid>
                            <ModalRoot />
                            <Route path='/dashboard' exact component={isAdmin ? AdminDashboardFallback : UserDashboardFallback} />
                            <Route path='/print' component={!isAdmin ? PrintExamFallback : LogInFallback} />
                            <Route path='/students' component={isAdmin ? StudentsListFallback : LogInFallback} />
                            <Route path='/modules' component={isAdmin ? ModulesListFallback : LogInFallback} />
                            <Route path='/ineligible' component={isAdmin ? IneligibleStudentsFallback : LogInFallback} />
                            <Route path='/eligible' component={isAdmin ? EligibleStudentsFallback : LogInFallback} />
                            <Route path='/halls' component={isAdmin ? HallsListFallback : LogInFallback} />
                            <Route path='/exams' component={ExamListViewFallback} />
                            <Route path='/exam/:examId' component={ExamDetailViewFallback} />
                            <Route path='/exam_registration/:examId' component={ExamRegistrationViewFallback} />
                            <Route path='/setting' component={UserSettingFallback} />
                        </ViewGrid>
                    }
                </Switch>
            </AppViewWrapper>
        </Router>
    );
};

export default Routes;