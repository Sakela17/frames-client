import React from 'react';
import {connect} from 'react-redux';
import { updateEmployee, deleteEmployee } from '../../actions/employee';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/modals';

class EditEmployeeForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		const updatedEmployee = {
			firstname : data.get('firstname'),
			lastname : data.get('lastname'),
			email : data.get('email'),
			phoneNumber : data.get('phoneNumber')
		};
		this.props.dispatch(updateEmployee(this.props.id, updatedEmployee));
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	handleDelete() {
		this.props.dispatch(deleteEmployee(this.props.id));
	}

	render(){
		return (
			<React.Fragment>
				<h2 className="form-header">Edit Employee</h2>
				<button className="modal-close-btn" onClick={() => this.handleCancel()}></button>
				<div className="form-wrapper">
					<form onSubmit={e => this.handleSubmit(e)}>
						<div className="form-field">
							<label htmlFor="firstname">First Name</label>
							<input
								type='text'
								id='firstname'
								name='firstname'
								defaultValue={this.props.employee.firstname}
							/>
						</div>
						<div className="form-field">
							<label htmlFor="lastname">Last Name</label>
							<input
								type='text'
								id='lasttname'
								name='lastname'
								defaultValue={this.props.employee.lastname}
							/>
						</div>
						<div className="form-field">
							<label htmlFor="email">Email Address</label>
							<input
								type='email'
								id='email'
								name='email'
								defaultValue={this.props.employee.email}
							/>
						</div>
						<div className="form-field">
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type='tel'
								id='phoneNumber'
								name='phoneNumber'
								defaultValue={this.props.employee.phoneNumber}
							/>
						</div>
						<input className="form-reset-btn" type="reset"/>
						<div className="form-btns">
							<button className="form-submit-btn" type='submit'>Save</button>
							<button className="form-delete-btn" onClick={() => this.handleDelete()}>
								<i className="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</div>
					</form>
				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const id = state.modal.currentId;
	const currentEmployee = state.employees.employees.filter(employee => employee.id === id)[0];
	return {
		employee : currentEmployee,
		id
	};
};

EditEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object
};

export default connect(mapStateToProps)(EditEmployeeForm);