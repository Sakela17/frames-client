import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import framesReducer from './frames';
import profileReducer from './profile';

export default combineReducers({
	form: formReducer,
	auth : authReducer,
	frames : framesReducer,
	profile : profileReducer
});