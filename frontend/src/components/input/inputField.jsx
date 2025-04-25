import React, { useState } from 'react';
import styled from 'styled-components';
import { ICON } from '../../constants';
import { Icon } from '../icon/icon';

const InputWrapper = styled.div`
	width: 100%;
	position: relative;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 4px;
	font-size: 0.875rem;
	font-weight: 500;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 10px 15px;
	border: 2px solid ${({ error }) => (error ? '#EF4444' : '#393939')};
	border-radius: 10px;
	outline: none;
	font-size: 15px;
	transition: border-color 0.2s;
	background-color: #393939;
	color: white;
	display: flex;
	align-items: center;

	&:focus {
		border-color: #3eb942;
		box-shadow: 0 0 0 2px #141414;
	}
`;

const ToggleButton = styled.div`
	position: absolute;
	right: 10px;
	top: 50%;
	bottom: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	cursor: pointer;
	color: #6b7280;
	font-size: 1rem;
`;

const ErrorText = styled.p`
	position: absolute;
	right: 0;
	top: -3px;
	margin-top: 4px;
	font-size: 0.875rem;
	color: #ef4444;
`;

const InputField = ({
	type = 'text',
	name,
	label,
	value,
	onChange,
	setType,
	register,
	placeholder = '',
	error,
	className = '',
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<InputWrapper className={className}>
			{label && <Label>{label}</Label>}
			<StyledInput
				type={type === 'password' && showPassword ? 'text' : type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				error={error}
				{...register}
				{...props}
			/>
			{type === 'password' && (
				<ToggleButton type="button" onClick={togglePasswordVisibility}>
					{showPassword ? (
						<Icon size="small" name={ICON.EYEOFF} />
					) : (
						<Icon size="small" name={ICON.EYE} />
					)}
				</ToggleButton>
			)}
			{error?.message && <ErrorText>{error.message}</ErrorText>}
		</InputWrapper>
	);
};

export default InputField;
