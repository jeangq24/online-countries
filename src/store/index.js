import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index.js";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    compose( applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (args) => args, ),
   // applyMiddleware(thunk)
);

export default store;