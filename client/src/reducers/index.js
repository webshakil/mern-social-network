//This is rootReducer
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
  post
});


//First and foremost, combineReducers is simply a utility function to simplify the most common use case when writing Redux reducers.
