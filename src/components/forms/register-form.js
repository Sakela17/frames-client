import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import RegisterFormFirstPage from './register-form-first-page';
import RegisterFormSecondPage from './register-form-second-page';

import './styles/forms.css';


export class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  nextPage = () => {
    console.log('next page');
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    console.log('previous page');
    this.setState({ page: this.state.page - 1 });
  };

  handleCreateUser = values => {
    console.log('handleCreateUser');
	const {username, email, companyName, password, phoneNumber} = values;

    const user = {
      username,
      email,
      companyName,
      password,
      phoneNumber
    };

    return this.props.dispatch(createUser(user));
  };

  render() {

    if(this.props.loggedIn){
      return <Redirect to="/dashboard" />;
    }

    const { page } = this.state;

    return (
      <div className="login-form-wrapper register-form-wrapper">
        <h2 className="form-header">Register</h2>
        {page === 1 &&
        <RegisterFormFirstPage
          onSubmit={this.nextPage} />}
        {page === 2 &&
        <RegisterFormSecondPage
          previousPage={this.previousPage}
          onSubmit={this.handleCreateUser}
          loading={this.props.loading}
        />
        }
        <p
          className="ask-login sign-up-link">
          Already have an account?
          <Link to="/login">Log In</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegisterForm);



