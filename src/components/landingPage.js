import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './forms/loginForm';
import About from './about';
import Footer from './footer';

import './styles/landing-page.css';

export class LandingPage extends React.Component {

	render() {

		if(this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<main className="landing-page" role="main">
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
				<section>
				</section>
				<Footer />
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.user !== null
	};
};

LandingPage.propTypes = {
	loggedIn: PropTypes.bool
};


export default connect(mapStateToProps)(LandingPage);