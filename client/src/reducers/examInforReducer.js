const initialState = {
    examId: null,
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_EXAM_ID':
            return {
                examId: action.examId,
            }
        default:
            return state;
    }
}