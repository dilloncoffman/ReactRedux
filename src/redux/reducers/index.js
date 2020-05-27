// root reducer
import { combineReducers } from 'redux';
import courses from './courseReducer'; // with a default export, you can decide what to name it when you export it

const rootReducer = combineReducers({
  courses, // similar to courses: courses since object on lhs will match object on rhs (ES2015+ Modern JS Syntax)
});

export default rootReducer;
