import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';

//redux persist
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default createStore = () => {

    //persist config
    const persistConfig = {
        key: 'root',
        storage,
    }

    //reducers
    const rootReducer = combineReducers({
        userData: userReducer,
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