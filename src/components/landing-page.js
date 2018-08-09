import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './forms/login-form';
import About from './about';
import Footer from './footer';

import './styles/landing-page.css';

export class LandingPage extends React.Component {
	render() {
		let loader;
		if (this.props.loading){
			loader = (
				<div className="loader-wrapper">
					<div className="loader">Loading...</div>
				</div>
			);
		}

		if (this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<div className="landing-page">
				{loader}
				<section className="hero-section">
					<div className="hero-section-text-wrapper">
						<h1>Employee shift management made easy</h1>
					</div>
					<div className="hero-section-form-wrapper">
						<LoginForm />
					</div>
				</section>
				<section className="about">
					<About/>
				</section>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.user !== null,
		loading: state.auth.loading
	};
};

LandingPage.propTypes = {
	loggedIn: PropTypes.bool
};


export default connect(mapStateToProps)(LandingPage);