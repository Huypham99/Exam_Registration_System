const initialState = {
    list: []
};

export default function studentsList(state = initialState, action) {
    switch (action.type) {
        case 'SET_STUDENTS_LIST': {
            return {
                ...state,
                list: [...action.student],
            }
        }
        default:
            return state;
    }
}