const initialState = {
    name: null,
    email: null,
    dob: null,
    studentId: null,
    program: null,
    schoolYear: null
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_INFOR':
            return {
                name: action.name,
                email: action.email,
                dob: action.dob,
                studentId: action.studentId,
                program: action.program,
                schoolYear: action.schoolYear
            };
        case 'SET_STUDENT_ID':
            return {
                studentId: action.studentId,
            }
        default:
            return state;
    }
}