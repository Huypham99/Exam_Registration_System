const initialState = {
    id: null,
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_SHIFT_HALL_ID':
            return {
                id: action.shiftHallId,
            }
        default:
            return state;
    }
}