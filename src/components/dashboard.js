import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import AddShiftForm from './forms/add-shift-form';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek } from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import PropTypes from 'prop-types';

import Filter from './filter';

import './styles/dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addShiftOpen: false };
  }

	componentDidMount() {
		const dates = getThisWeek();
		this.props.dispatch(fetchFrames(dates.start, dates.end));
		this.props.dispatch(fetchEmployees());
	}

	handleAddShiftPrompt = () => {
  	this.setState({ addShiftOpen: !this.state.addShiftOpen })
	};

	render() {
		if (this.props.loading){
			return (<div>Loading...</div>);
		}

		const startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		const endSchedule = moment(getThisWeek().end).format('MMMM, DD');

		return(
			<React.Fragment>
			<div className="dashboard">
				<button
					type="button"
					onClick={this.handleAddShiftPrompt}
				>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</button>
				<div className="dashboard-section-header">
					<div>{startSchedule} - {endSchedule}</div>
					<Filter />
				</div>
				<section className="dashboard-section">
					{this.props.frames.length
						?
						<CardList list={this.props.frames} />
						:
						<div>No data</div>
					}
				</section>
			</div>
				<AddShiftForm
					show={this.state.addShiftOpen}
					onClose={this.handleAddShiftPrompt}/>
      </React.Fragment>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.object,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));