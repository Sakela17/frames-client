import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterSuccess, setStartValue, setEndValue, advancedFilterSuccess } from '../../actions/filter';

class AdvancedFilter extends React.Component {

	setStartParameter(e) {
		console.log(`AF-START: ${e.target.value}`);
		this.props.dispatch(setStartValue(e.target.value));
	}

	setEndParameter(e) {
		console.log(`AF-END: ${e.target.value}`);
		this.props.dispatch(setEndValue(e.target.value));
	}

	advanfilterByTimeFrame(e) {
		e.preventDefault();
		console.log('Submitting Advanced Filter');
		// console.log(`FILTER TO BE: ${this.props.start} - ${this.props.end}`);
		// let filter = `${this.props.start} - ${this.props.end}`;
		// this.props.dispatch(advancedFilterSuccess(filter));
	}

	// RENDER
	render() {
		if(!this.props.show) {
			return null;
		}

		return(
			<div className="backdrop">
				<div className="modal">

					<form onSubmit={(e) => this.advanfilterByTimeFrame(e)}>
						<select onChange={(e) => this.setStartParameter(e)}>
							<option value={null}>START</option>
							<option value="open">OPEN</option>
							{this.props.frames.map((frame, i) => {
								return <option key={i} value={frame.startFrame}>{frame.startFrame}</option>;
							})}
						</select>

						<select onChange={(e) => this.setEndParameter(e)}>
							<option value={null}>END</option>
							<option value="open">OPEN</option>
							{this.props.frames.map((frame, i) => {
								return <option key={i} value={frame.endFrame}>{frame.endFrame}</option>;
							})}
				    </select>
						<button type="submit" onClick={this.props.onClose}>Submit Filter</button>
					</form>
					<button onClick={this.props.onClose}>Cancel</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	frames: state.frames.frames,
	start: state.filter.start,
	end: state.filter.end,
	filter: state.filter.filter
});

AdvancedFilter.propTypes = {
	dispatch: propTypes.func,
	frames: propTypes.array,
	onClose: propTypes.func.isRequired,
	show: propTypes.bool,
	children: propTypes.node,
	start: propTypes.string,
	end: propTypes.string
};

export default connect(mapStateToProps)(AdvancedFilter);