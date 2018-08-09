import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createEmployee } from '../../actions/employee';
import { hideModal } from '../../actions/modals';

import EmployeeAvailability from '../employeeAvailability';

export class CreateEmployeeForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		const availability = [];
		const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		daysOfWeek.forEach(day => {
			if (data.get(day)){
				availability.push({
					day,
					start : data.get(`${day}-start`),
					end: data.get(`${day}-end`)
				});
			}
		});
		
		const newEmployee = {
			firstname : data.get('firstname'),
			lastname : data.get('lastname'),
			email : data.get('email'),
			phoneNumber : data.get('phoneNumber'),
			img : data.get('image'),
			password : data.get('password'),
			availability
		};
		this.props.dispatch(createEmployee(newEmployee));
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	render(){
		let error;

		if (this.props.error) {
			error = (
				<div className="form-modal-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		const defaultAvailability = [
			{
				day : 'monday',
				start : '08:00',
				end:'17:00'
			},
			{
				day : 'tuesday',
				start : '08:00',
				end:'17:00'
			},
			{
				day : 'wednesday',
				start : '08:00',
				end:'17:00'
			},
			{
				day : 'thursday',
				start : '08:00',
				end:'17:00'
			},
			{
				day : 'friday',
				start : '08:00',
				end:'17:00'
			},
		];

		return (
			<React.Fragment>
				<div className="modal-form-wrapper">
          <button
            className="modal-close-btn"
            title="Close create employee form"
            type="button"
            onClick={() => this.handleCancel()}>
          </button>
					<div className="form-wrapper">
						<h2 className='form-header'>New Employee</h2>
						<form onSubmit={e => this.handleSubmit(e)}>
							<fieldset>
								<legend>Add Employee</legend>
								<div className="form-field">
									<label htmlFor="firstname">First Name
										<input
											type='text'
											id='firstname'
											name='firstname'
											autoFocus
											required
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="lastname">Last Name
										<input
											type='text'
											id='lastname'
											name='lastname'
											required
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="image">Image URL
										<input
											type='text'
											id='image'
											name='image'
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="email">Email Address
										<input
											type='email'
											id='email'
											name='email'
											required
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="phoneNumber">Phone Number
										<input
											type='tel'
											id='phoneNumber'
											name='phoneNumber'
											pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
											required
										/>
									</label>
								</div>
								<div className="form-field">
									<EmployeeAvailability availability={defaultAvailability} type='create'/>
								</div>
								<div className="form-field">
									<label htmlFor="password">Password
										<input
											type='password'
											id='password'
											name='password'
											required
										/>
									</label>
								</div>
								<div className="form-field form-btns">
									<button className="form-submit-btn" type='submit'>Save</button>
									<button className="form-reset-btn" type="button" onClick={() => this.handleCancel()}>Cancel</button>
								</div>
								{error}
							</fieldset>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}


CreateEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object,
	error : PropTypes.any
};

const mapStateToProps = state => {
	return {
		error: state.employees.error
	};
};

export default connect(mapStateToProps)(CreateEmployeeForm);