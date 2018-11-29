const initialState = {
    nav: {
        page: '',
    },
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NAV_DATA':
            return Object.assign({}, state, {
                nav: {
                    page: action.page,
                }
            });
        default:
            return state;
    }
}

export default navReducer;