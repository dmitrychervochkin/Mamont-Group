import styled, { css } from 'styled-components';

export const Heading = ({ className, children }) => {
	return <HeadingStyled className={className}>{children}</HeadingStyled>;
};

const HeadingStyled = styled.span`
	font-weight: ${({ weight = '300' }) => weight};
	font-size: ${({ size = '35px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ color = 'white' }) => color};
`;

const HeadingSizes = {
	large: css`
		font-size: 35px;
	`,
	medium: css`
		font-size: 25px;
	`,
	small: css`
		font-size: 20px;
	`,
	xsmall: css`
		font-size: 15px;
	`,
};
