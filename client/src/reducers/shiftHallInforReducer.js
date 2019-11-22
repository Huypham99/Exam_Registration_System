const initialState = {
    shiftHallId: null,
};

export default function userInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_SHIFT_HALL_ID':
            return {
                shiftHallId: action.shiftHallId,
            }
        default:
            return state;
    }
}