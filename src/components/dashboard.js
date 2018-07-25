import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import AddShiftForm from './forms/create-shift-form';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek, getToday } from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import PropTypes from 'prop-types';

import Filter from './filter';
import AdvancedFilter from './modals/advanced-filter-modal';

import './styles/dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			addShiftOpen: false,
			advanFilter: false 
		};
	}

	componentDidMount() {
		const dates = getThisWeek();
		this.props.dispatch(fetchFrames(dates.start, dates.end));
		this.props.dispatch(fetchEmployees());
	}

	handleAddShiftPrompt = () => {
  	this.setState({ addShiftOpen: !this.state.addShiftOpen })
	};
	
	toggleAdvancedFilter = () => {
		console.log('Toggle Advanced Filter');
		this.setState({
			advanFilter: !this.state.advanFilter
		});
	};

	render() {
		if (this.props.loading){
			return (<div>Loading...</div>);
		}

		const startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		const endSchedule = moment(getThisWeek().end).format('MMMM, DD');
		const defaultTime = getToday().start;

		let frameList = this.props.frames;
		let filteredFrames = frameList.filter(frame => {
			if (this.props.filter !== null) {
				return frame.startFrame === this.props.filter.split('|')[0];	
			}
		});
		let listOfFramesToBeRendered = frameList;

		if (this.props.filter === undefined || this.props.filter === 'null' || this.props.filter === null) {
      listOfFramesToBeRendered = frameList;
    } else if (this.props.filter !== null) {
      listOfFramesToBeRendered = filteredFrames;
		}
		

		console.log(`filteredFrames: ${filteredFrames}`);
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
					<button onClick={this.toggleAdvancedFilter}>Advanced Filter</button>
					<AdvancedFilter show={this.state.advanFilter} onClose={this.toggleAdvancedFilter} />
				</div>
				<section className="dashboard-section">
						{listOfFramesToBeRendered.length 
							? <CardList list={listOfFramesToBeRendered} /> 
							: <div>No data</div>}
				</section>
			</div>
				<AddShiftForm
					initialValues={{
						startDate: defaultTime,
						endDate: defaultTime
					}}
					show={this.state.addShiftOpen}
					onClose={this.handleAddShiftPrompt}/>
      </React.Fragment>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.array,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func,
	filter: PropTypes.string
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error,
	filter: state.filter.filter
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));