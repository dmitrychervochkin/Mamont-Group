import React from 'react';
import styled, { css } from 'styled-components';

const ButtonField = ({ children, variant = 'primary', size = 'medium', disabled = false, ...props }) => {
	return (
		<StyledButton variant={variant} size={size} disabled={disabled} {...props}>
			{children}
		</StyledButton>
	);
};

const buttonVariants = {
	primary: css`
		background-color: #393939;
		color: white;

		&:hover {
			background-color: #424242;
			box-shadow: 0 0 20px 5px #141414;
		}
	`,
	secondary: css`
		background-color: #3eb942;
		color: white;
        
		&:hover {
			background-color: #5a6268;
		}
	`,
	auth: css`
		background-color: #3eb94290;
		color: white;

		&:hover {
			background-color: #3eb942;
		}
	`,
	danger: css`
		background-color: #dc3545;
		color: white;

		&:hover {
			background-color: #c82333;
		}
	`,
};

const buttonSizes = {
	small: css`
		padding: 6px 12px;
		font-size: 14px;
	`,
	medium: css`
		padding: 8px 16px;
		font-size: 16px;
	`,
	large: css`
		padding: 12px 20px;
		font-size: 18px;
	`,
};

const StyledButton = styled.button`
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: background-color 0.3s ease, box-shadow 0.3s, color 0.3s;
	width: 250px;
	height: 45px;
	${({ variant }) => buttonVariants[variant] || buttonVariants.primary};
	${({ size }) => buttonSizes[size] || buttonSizes.medium};
	${({ disabled }) =>
		disabled &&
		css`
			background-color: #646464;
			color: #393939;
			cursor: not-allowed;
			&:hover {
				background-color: #646464;
				color: #222222;
				box-shadow: none;
			}
		`};
`;

export default ButtonField;
