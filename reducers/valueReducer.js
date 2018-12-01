const initialState = {
    value: {
        send_value: 0
    },
}

const valueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SEND_VALUE':
            return Object.assign({}, state, {
                value: {
                    send_value: action.send_value.toString()
                }
            });
        default:
            return state;
    }
}

export default valueReducer;