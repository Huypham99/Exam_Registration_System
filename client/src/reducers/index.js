import { combineReducers } from 'redux'
import idReducer from './idReducer'
import loggedInReducer from './loggedInReducer'
import adminReducer from './adminReducer'
import authReducer from './authReducer'
import modalReducer from './modalReducer'
import userInforReducer from './userInforReducer'
import examInforReducer from './examInforReducer'
import shiftInforReducer from './shiftInforReducer'
import shiftHallInforReducer from './shiftHallInforReducer'
import moduleInforReducer from './moduleInforReducer'
import eligibleReducer from './eligibleReducer'
import hallInforReducer from './hallInforReducer'
import toastReducer from './toastReducer'
import studentsListReducer from './studentsListReducer'
import examDetailRenderReducer from './examDetailRenderReducer'

const allReducers = combineReducers({
    id: idReducer,
    isLoggedIn: loggedInReducer,
    isAdmin: adminReducer,
    isAuthed: authReducer,
    modals: modalReducer,
    user: userInforReducer,
    module: moduleInforReducer,
    exam: examInforReducer,
    shift: shiftInforReducer,
    shiftHall: shiftHallInforReducer,
    isEligible: eligibleReducer,
    hall: hallInforReducer,
    toasts: toastReducer,
    studentsList: studentsListReducer,
    examDetailRender: examDetailRenderReducer
})
export default allReducers;







