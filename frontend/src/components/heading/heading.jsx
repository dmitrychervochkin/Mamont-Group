import styled from 'styled-components';

const HeadingContainer = ({ className, children }) => {
	return <span className={className}>{children}</span>;
};

export const Heading = styled(HeadingContainer)`
	font-weight: ${({ weight = '300' }) => weight};
	font-size: ${({ size = '35px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ color = 'white' }) => color};
`;
