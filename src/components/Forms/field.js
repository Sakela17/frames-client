import React from 'react';
import PropTypes from 'prop-types';

import './styles/forms.css';

export const Field = props => {
	const Element = props.element || 'input';
	return (
		<div className="form-field" id={props.id}>
			<label htmlFor={props.input.name}>{props.label}</label>
			<Element
				id={props.input.name}
				className={(props.meta.error && props.meta.touched) ? 'error-border' : 'placeholder-class'}
				type={props.type}
				value={props.value}
				aria-required="true"
				placeholder={props.placeholder ? props.placeholder : null }
				{...props.input}
			>
				{props.children}
			</Element>
			{props.meta.error && props.meta.touched && <div className="form-field-error" aria-live="polite" role="alert">{props.meta.error}</div>}
		</div>
	);
};

Field.propTypes = {
	element : PropTypes.string,
	input : PropTypes.object,
	id : PropTypes.string,
	label : PropTypes.string,
	meta : PropTypes.object,
	type : PropTypes.string,
	value : PropTypes.any,
	placeholder : PropTypes.string,
	children : PropTypes.any
};

export default Field;