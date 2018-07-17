import React from 'react';
import PropTypes from 'prop-types';

import createUser from '../../actions/users';
import RegisterFormFirstPage from './registerFormFirstPage';
import RegisterFormSecondPage from './registerFormSecondPage';


class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage(){
    this.setState({ page: this.state.page - 1 });
  }

  onSubmit(values){
    console.log('onSubmit registerForm ran');

    console.log(values);
    // return this.props.dispatch(createUser());

  }

  render() {
    console.log('PROPS', this.props.onSubmit);
    const { page } = this.state;

    return (
      <React.Fragment>
        <div>Hello RegisterForm</div>
        {page === 1 && <RegisterFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 &&
        <RegisterFormSecondPage
          previousPage={this.previousPage}
          onSubmit={ this.onSubmit }
        />
        }
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;


