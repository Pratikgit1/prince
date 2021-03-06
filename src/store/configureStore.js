import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import dashboardReducer from './reducers/dashboard'
import userReducer from './reducers/user'
import uiReducer from './reducers/ui';


const rootReducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    dashboard: dashboardReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;