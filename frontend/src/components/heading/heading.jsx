import styled, { css } from 'styled-components';

export const Heading = ({ className, children, ...props }) => {
	return (
		<HeadingStyled className={className} {...props}>
			{children}
		</HeadingStyled>
	);
};

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

const HeadingStyled = styled.div`
	font-weight: ${({ weight = '300' }) => weight};
	${({ size }) => HeadingSizes[size] || HeadingSizes.medium};
	color: ${({ color = 'white' }) => color};
`;
