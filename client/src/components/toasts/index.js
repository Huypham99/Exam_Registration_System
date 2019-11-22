import React from 'react';
import {
    ToastsContainer,
    ErrorToast,
    SuccessToast,
    NeutralToast,
    NotificationToast,
} from './style';
import { useSelector, useDispatch } from 'react-redux'
import { removeToast } from '../../actions/toasts'

const ToastsPure = () => {

    const { kind, message, isOpen } = useSelector(state => state.toasts)

    const dispatch = useDispatch()

    const click = () => {
        dispatch(removeToast())
    }

    return (
        <ToastsContainer isOpen={isOpen}>
            {
                (kind === 'error')
                && <ErrorToast>
                    {message}
                    <button onClick={() => click()}>close</button>
                </ErrorToast>
            }
        </ToastsContainer>
        // <ToastsContainer>
        //     {() => {
        //         switch (kind) {
        //             case 'error': {
        //                 // let cleanedMessage = message;
        //                 // if (message.indexOf('GraphQL error: ') >= 0) {
        //                 //   cleanedMessage = message.replace('GraphQL error: ', '');
        //                 // }
        //                 return (
        //                     <ErrorToast>
        //                         {message}
        //                     </ErrorToast>
        //                 );
        //             }
        //             // case 'success': {
        //             //   return (
        //             //     <SuccessToast
        //             //       data-cy={`toast-success`}
        //             //       key={id}
        //             //       timeout={timeout}
        //             //     >
        //             //       {message}
        //             //     </SuccessToast>
        //             //   );
        //             // }
        //             // case 'neutral': {
        //             //   return (
        //             //     <NeutralToast
        //             //       data-cy={`toast-neutral`}
        //             //       key={id}
        //             //       timeout={timeout}
        //             //     >
        //             //       {message}
        //             //     </NeutralToast>
        //             //   );
        //             // }
        //             // case 'notification': {
        //             //   return (
        //             //     <NotificationToast key={id} timeout={timeout}>
        //             //       {message}
        //             //     </NotificationToast>
        //             //   );
        //             // }
        //             default: {
        //                 return null;
        //             }
        //         }
        //     }}
        // </ToastsContainer>
    );
};

export default ToastsPure;