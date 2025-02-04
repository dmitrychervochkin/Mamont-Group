import styled from 'styled-components';

export const AccessErrorContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const AccessError = styled(AccessErrorContainer)`
	text-align: center;
	background-color: #222222;
	padding: 40px 40px;
	border-radius: 20px;
	width: 1000px;
`;
