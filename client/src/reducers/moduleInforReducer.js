const initialState = {
    name: null,
    moduleId: null
};

export default function moduleInfor(state = initialState, action) {
    switch (action.type) {
        case 'SET_MODULE_INFOR':
            return {
                name: action.name,
                moduleId: action.moduleId
            };
        case 'SET_MODULE_ID':
            return {
                moduleId: action.moduleId
            }
        default:
            return state;
    }
}