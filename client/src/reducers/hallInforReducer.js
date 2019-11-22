const initialState = {
    hallId: null,
    name: null,
    capacity: null
};

export default function hallInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_HALL_INFOR':
            return {
                name: action.name,
                capacity: action.capacity
            };
        case 'SET_HALL_ID':
            return {
                hallId: action.hallId
            };
        default:
            return state;
    }
}