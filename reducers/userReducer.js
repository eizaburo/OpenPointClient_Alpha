const initialState = {
    user: {
        id: '99',
        name: 'hoge',
        email: 'hoge@test.com',
        signedIn: false,
    },
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return Object.assign({}, state, {
                user: {
                    id: action.id.toString(),
                    name: action.name,
                    email: action.email,
                    signedIn: action.signedIn,
                }
            });
        default:
            return state;
    }
}

export default userReducer;