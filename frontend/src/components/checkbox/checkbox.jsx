import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { ICON } from '../../constants';
import { useState } from 'react';

const CheckboxContainer = ({ className, checked, setChecked, onClick, ...props }) => {
	return (
		<div
			className={className}
			onClick={() => {
				onClick();
				setChecked(!checked);
			}}
			value={checked}
			{...props}
		>
			<div className="checkbox" style={{ display: checked && 'none' }}></div>
			<Icon height="40px" name={ICON.CHECKBOX} style={{ display: !checked && 'none' }} />
		</div>
	);
};

export const Checkbox = styled(CheckboxContainer)`
	display: flex;
	align-items: center;
	transition: 0.3s;
	.checkbox {
		margin: 0 3px;
		width: 34px;
		height: 34px;
		border: 3px solid #393939;
		cursor: pointer;
		user-select: none;
		border-radius: 5px;
		-webkit-user-select: none; /* Chrome, Safari, Opera */
		user-select: none;
		transition: 0.3s;
		&:hover {
			background-color: #393939;
			border: 3px solid #646464;
		}
	}
`;
