import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { required, isTrimmed, nonEmpty, length, matches, validEmail } from './form-validators';
import renderField from './field';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export const RegisterFormSecondPage = props => {
	const { handleSubmit, previousPage } = props;
	let error;
	if (props.error) {
		error = (
			<div className="form-error" aria-live="polite">
				{props.error}
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			{error}
			<fieldset>
				<legend>Registration</legend>
					<Field
						name="email"
						label="Email"
						type="email"
						component={renderField}
						validate={[required, validEmail]}
						placeholder="user@gmail.com"
						autocomplete="off"
					/>
					<Field
						name="password"
						label="Password"
						type="password"
						component={renderField}
						validate={[required, isTrimmed, passwordLength]}
						placeholder="password"
						autocomplete="off"
					/>
					<Field
						name="passwordConfirm"
						label="Confirm password"
						type="password"
						component={renderField}
						validate={[required, nonEmpty, matchesPassword]}
						autocomplete="off"
					/>
				<div className="form-field form-btns">
					<button
						type="button"
						className="previous"
						title="previous"
						onClick={previousPage}
					>
						Previous
					</button>
					<button
						className="form-submit-btn next"
						type="submit"
						title="Submit registration"
					>
						Submit
					</button>
					{error}
				</div>
			</fieldset>

		</form>
	);
};

RegisterFormSecondPage.propTypes = {
	handleSubmit: PropTypes.func,
	pristine: PropTypes.bool,
	previousPage: PropTypes.func,
	submitting: PropTypes.bool,
	error : PropTypes.string
};

export default reduxForm({
	form: 'register', //               <------ same form name
	destroyOnUnmount: false, //        <------ preserve form data
	forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(RegisterFormSecondPage);
