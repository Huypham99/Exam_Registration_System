const initialState = {
    shiftId: null,
    time: null,
    date: null,
    dayOfWeek: null,
    moduleId: null,
    moduleName: null,
    id: null
};

export default function shiftInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_SHIFT_ID':
            return {
                shiftId: action.shiftId,
            }
        case 'SET_SHIFT_INFOR':
            return {
                id: action.id,
                time: action.time,
                date: action.date,
                dayOfWeek: action.dayOfWeek,
                moduleId: action.moduleId,
                moduleName: action.moduleName
            }
        default:
            return state;
    }
}