import React from 'react';
import styled, { css } from 'styled-components';

export const Button = React.forwardRef(
	({ children, variant = 'primary', size = 'medium', disabled = false, ...props }, ref) => {
		return (
			<StyledButton ref={ref} variant={variant} size={size} disabled={disabled} {...props}>
				{children}
			</StyledButton>
		);
	},
);

const buttonVariants = {
	primary: css`
		background-color: #393939;
		color: white;

		&:hover {
			background-color: #424242;
			box-shadow: 0 0 20px 5px #141414;
		}
	`,
	primary2: css`
		background-color: #222222;
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
		padding: 8px 10px;
		font-size: 16px;
	`,
	large: css`
		padding: 10px 20px;
		font-size: 18px;
	`,
};

const StyledButton = styled.button`
	display: flex;
	font-weight: 300;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: background-color 0.3s ease, box-shadow 0.3s, color 0.3s;
	width: ${({ width = '100%' }) => width};
	height: 45px;
	${({ variant }) => buttonVariants[variant] || buttonVariants.primary};
	${({ size }) => buttonSizes[size] || buttonSizes.medium};
	${({ disabled }) =>
		disabled &&
		css`
			background-color: #646464;
			color: #a1a1a1;
			cursor: not-allowed;
			box-shadow: none;

			&:hover {
				background-color: #646464;
			}
		`};
`;
