import {SubmissionError} from 'redux-form';
import {login, loginError} from './auth';
import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';
import { requestLogin } from './auth';

// Create a new admin user, login immediately after
export const createUser = user => dispatch => {
	dispatch(requestLogin());
	return fetch(`${API_BASE_URL}/admin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(login(user.username, user.password));
		})
		.catch(error => {
			dispatch(loginError('Unable to register, please try again'));
			const {message} = error;
			return Promise.reject( new SubmissionError({_error : message}) );
		});
};