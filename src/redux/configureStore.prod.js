// Define a function to configure the store which will be called at our app's entry point
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // since file is called index.js, don't have to define that in the path to get rootReducer

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk)); // can applyMiddleware as 3rd arg to enhance Redux's capabilities
}
