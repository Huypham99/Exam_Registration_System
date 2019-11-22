const initialState = {
    kind: null,
    message: null,
    isOpen: false
};

export default function toasts(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TOAST': {
            return {
                kind: action.payload.kind,
                message: action.payload.message,
                isOpen: true
            }
        }
          case 'REMOVE_TOAST': {
            return initialState;
          }
        default:
            return state;
    }
}