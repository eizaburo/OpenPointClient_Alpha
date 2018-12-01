import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import qrReducer from './reducers/qrReducer';
import valueReducer from './reducers/valueReducer';

//redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default createStore = () => {

    //persist config
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['userData'],
    }

    //reducers
    const rootReducer = combineReducers({
        userData: userReducer,
        qrData: qrReducer,
        valueData: valueReducer,
    });

    //persisted reducers
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    //createStore
    const store = reduxCreateStore(
        persistedReducer,
        applyMiddleware(
            //
        )
    );

    //returns
    let persistor = persistStore(store);
    return { store, persistor }
}