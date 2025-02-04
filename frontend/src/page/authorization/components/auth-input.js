import styled from 'styled-components';
import { Heading, Input } from '../../../components';
import { forwardRef } from 'react';

const AuthInputContainer = forwardRef(
	({ className, children, type, setType, size, margin, placeholder, ...props }, ref) => {
		return (
			<div className={className}>
				<Heading size={size} margin={margin}>
					{children}
				</Heading>
				<Input type={type} setType={setType} placeholder={placeholder} {...props} ref={ref} />
			</div>
		);
	},
);

export const AuthInput = styled(AuthInputContainer)`
	margin-bottom: 30px;
	display: flex;
	flex-direction: column;
`;
