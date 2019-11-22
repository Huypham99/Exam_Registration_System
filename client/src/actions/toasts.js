type Toasts = 'success' | 'error' | 'neutral' | 'notification';

export const addToast = (
    kind,
    message
) => {
    return {
        type: 'ADD_TOAST',
        payload: {
            kind,
            message,
        },
    };
};

export const removeToast = () => ({
    type: 'REMOVE_TOAST',
});;

// let nextToastId = 0;
// export const addToastWithTimeout = (kind, message) => (
//     dispatch
// ) => {
//     let timeout = 6000;
//     if (kind === 'success') timeout = 3000;
//     if (kind === 'notification') timeout = 5000;

//     let id = nextToastId++;
//     dispatch(addToast(id, kind, message, timeout));

//     setTimeout(() => {
//         dispatch(removeToast(id));
//         id = nextToastId--;
//     }, timeout);
// };