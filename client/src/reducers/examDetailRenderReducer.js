const initialState = {
    reRender: false,
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_EXAM_DETAIL_RENDER':
            return {
                reRender: action.state,
            }
        default:
            return state;
    }
}