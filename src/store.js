import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./Reducers/user";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";

// function configureStore(state) {
//   return createStore(combineReducers({user}),state);
// }
// const persistConfig = {
//     key: 'root',
//     storage: Storag,
//     whitelist: ["user"],
//     blacklist: [],
//   };
  
// const persistReducer1 = persistReducer(persistConfig, combineReducers({user}));
const store = createStore( combineReducers({user}),applyMiddleware(thunk));
// let persister = persistStore(store);

export { store,};