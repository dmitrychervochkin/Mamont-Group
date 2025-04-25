import styled, { css } from 'styled-components';

export const Icon = ({ className, name, ...props }) => {
	return (
		<StyledIcon className={className} type="image/svg+xml" data={'icons/' + name}>
			<StyledImg className={'icon'} src={'/icons/' + name} alt="icon" {...props} />
		</StyledIcon>
	);
};

const iconVariants = {
	primary: css`
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	`,
	menu: css`
		opacity: 0.4;

		&:hover {
			opacity: 0.8;
		}
	`,
	current: css`
		opacity: 1;

		&:hover {
			opacity: 0.8;
		}
	`,
};

const iconSizes = {
	verySmall: css`
		height: 15px;
	`,
	small: css`
		height: 25px;
	`,
	medium: css`
		height: 30px;
	`,
	large: css`
		height: 35px;
	`,
};

const StyledIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledImg = styled.img`
	transition: opacity 0.3s;

	&:hover {
		cursor: pointer;
	}
	${({ variant }) => iconVariants[variant] || iconVariants.primary};
	${({ size }) => iconSizes[size] || iconSizes.medium};
	${({ disabled = false }) =>
		disabled &&
		css`
			opacity: 0.4;
			&:hover {
				opacity: 0.4;
				cursor: not-allowed;
			}
		`};
	${({ inactive = false }) =>
		inactive &&
		css`
			opacity: 1;
			&:hover {
				cursor: default;
				opacity: 1;
			}
		`};
`;
