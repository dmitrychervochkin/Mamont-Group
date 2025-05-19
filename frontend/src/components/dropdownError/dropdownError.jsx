import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { resetError } from '../../reducers';

const DropdownErrorContainer = ({ className, children }) => {
	const dispatch = useDispatch();
	const onCloseError = () => {
		dispatch(resetError());
	};

	return (
		<div
			className={className}
			style={{
				marginTop: !!children ? 0 : '-100px',
				maxHeight: !!children ? '200px' : 0,
				opacity: !!children ? 1 : 0,
			}}
			onClick={onCloseError}
		>
			{children}
		</div>
	);
};

export const DropdownError = styled(DropdownErrorContainer)`
	padding: 20px 20px;
	position: fixed;
	width: 300px;
	background-color: #e74e4e;
	z-index: 10;
	right: 0;
	margin-right: 10px;
	border-radius: 10px;
	box-shadow: 0 0 10px 1px #141414;
	transition: opacity 0.5s, max-height 0.5s, margin 0.5s;
	color: black;
	overflow: hidden;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;

	&:hover {
		cursor: pointer;
	}
`;
