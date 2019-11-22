import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from '../../src/components/authentication/protectedRoute'
import AdminDashboard from '../../src/views/adminDashboard'
import UserDashboard from '../../src/views/userDashboard'
import AuthenticatedComponent from '../components/authentication'
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
import RegisteredShifts from '../views//registeredShiftView'
import { ViewGrid } from '../components/layout'
import ModalRoot from '../components/modals/modalRoot'
import SignedOutFallback from '../helper/signed-out-fallback'
import { getCurrentUserQuery } from '../graphql/queries/user/getUser'
import { useQuery } from '@apollo/react-hooks';
import Toast from '../components/toasts'

import { useSelector } from 'react-redux'

const Routes = () => {

    // const isLoggedIn = useSelector(state => state.isLoggedIn)
    // const isAdmin = useSelector(state => state.isAdmin)

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
    const RegisteredShiftsFallback = SignedOutFallback(RegisteredShifts, () => <Redirect to='/login' />);
    const HallsListFallback = SignedOutFallback(HallsList, () => <Redirect to='/login' />);
    const AdminDashboardFallback = SignedOutFallback(AdminDashboard, () => <Redirect to='/login' />);
    const UserDashboardFallback = SignedOutFallback(UserDashboard, () => <Redirect to='/login' />);
    const LogInFallback = SignedOutFallback(() => <Redirect to='/dashboard' />, LogIn);


    return (
        <Router>
            <AppViewWrapper>
                <Route component={Navigation} />
                <ModalRoot />
                {/* <Toast /> */}
                <Switch>
                    <Route path='/login' component={LogInFallback} />
                    <AuthenticatedComponent>
                        {
                            <ViewGrid>
                                <Route path='/dashboard' exact component={isAdmin ? AdminDashboardFallback : UserDashboardFallback} />
                                <Route path='/print' component={PrintExamFallback} />
                                <Route path='/students' component={StudentsListFallback} />
                                <Route path='/modules' component={ModulesListFallback} />
                                <Route path='/ineligible' component={IneligibleStudentsFallback} />
                                <Route path='/eligible' component={EligibleStudentsFallback} />
                                <Route path='/exams' component={ExamListViewFallback} />
                                <Route path='/halls' component={HallsListFallback} />
                                <Route path='/exam/:examId' component={ExamDetailViewFallback} />
                                <Route path='/exam_registration/:examId' component={ExamRegistrationViewFallback} />
                                <Route path='/registered' component={RegisteredShiftsFallback} />
                            </ViewGrid>
                        }
                    </AuthenticatedComponent>
                </Switch>
            </AppViewWrapper>
        </Router>
    );
};

export default Routes;