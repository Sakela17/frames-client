import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, } from 'redux-form';
import renderField from './field';
import {isTrimmed, validEmail, validPhone} from './formValidators';
import { editProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

export class ProfileForm extends React.Component {
	onSubmit = values => {
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			}
		});
		this.props.dispatch(editProfile(this.props.initialValues.adminId, updatedProfile))
			.then(this.props.setEdit);
	};

	render() {
		return (
      <div className="form-wrapper">
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Field
						name="companyName"
						label="Company Name"
						type="text"
						component={renderField}
						validate={[isTrimmed]}
					/>
					<Field
						name="username"
						label="Username"
						type="text"
						component={renderField}
						validate={[isTrimmed]}
					/>
					<Field
						name="email"
						label="Email Address"
						type="text"
						component={renderField}
						validate={[validEmail]}
					/>
					<Field
						name="phoneNumber"
						label="Phone Number"
						type="text"
						component={renderField}
						validate={[validPhone]}
					/>
					<div className="form-field profile-form-field">
            <button
              className="form-submit-btn"
              type="submit">
              Save
            </button>
					</div>
				</form>
      </div>
		);
	}
}

ProfileForm.propTypes = {
	adminId : PropTypes.string,
	dispatch : PropTypes.func,
	setEdit : PropTypes.func,
	handleSubmit : PropTypes.func
};

export default connect()(reduxForm({form : 'profile'})(ProfileForm));