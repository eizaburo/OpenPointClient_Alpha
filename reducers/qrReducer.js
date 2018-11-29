const initialState = {
    qr: {
        data: '',
    },
}

const qrReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_QR_DATA':
            return Object.assign({}, state, {
                qr: {
                    data: action.data,
                }
            });
        default:
            return state;
    }
}

export default qrReducer;