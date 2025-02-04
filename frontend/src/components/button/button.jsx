import styled from 'styled-components';

const ButtonContainer = ({ className, width, children, disabled, ...props }) => {
	return (
		<button disabled={disabled} className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	height: 45px;
	background-color: ${({ color = '#393939' }) => color};
	width: ${({ width = '100%' }) => width};
	transition: box-shadow 0.3s, background-color 0.3s;
	border: none;
	font-size: 15px;
	border-radius: 10px;

	&:hover {
		background-color: ${({ hover = '#424242' }) => hover};
		transition: box-shadow 0.3s, background-color 0.3s;
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		box-shadow: 0 0 20px 5px #141414;
	}
`;
