import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { ICON } from '../../constants/iconsContants';
import { forwardRef, useState } from 'react';

const InputContainer = forwardRef(({ className, id, type, disabled, setType, ...props }, ref) => {
	const [icon, setIcon] = useState(ICON.EYEOFF);

	const handleToggle = () => {
		if (type === 'password') {
			setIcon(ICON.EYE);
			setType('text');
		} else {
			setIcon(ICON.EYEOFF);
			setType('password');
		}
	};

	return (
		<div className={className}>
			<input
				disabled={disabled}
				className={'input ' + (disabled && 'disabled')}
				id={id}
				type={type}
				{...props}
				ref={ref}
			/>
			{(type === 'password' || type === 'text') && (
				<div>
					<Icon className="eye-icon" height="20px" onClick={handleToggle} name={icon} />
				</div>
			)}
		</div>
	);
});

export const Input = styled(InputContainer)`
	background-color: #393939;
	border-radius: 10px;
	width: ${({ width = '350px' }) => width};
	display: flex;
	align-items: center;

	.input {
		width: ${({ width = '350px' }) => width};
		padding: ${({ padding = '5px 20px' }) => padding};
		font-size: 14px;
		color: white;
		height: 40px;
		border-radius: 10px;
		border: none;
		color: white;
		background-color: #393939;
		height: 40px;
		outline: none;
	}

	.eye-icon {
		margin: 0px 10px;
	}

	.disabled {
		cursor: not-allowed;
	}
`;
