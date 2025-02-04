import styled from 'styled-components';

const IconContainer = ({ className, name, disabled, inactive, ...props }) => {
	return (
		<div className={className} type="image/svg+xml" data={'icons/' + name}>
			<img
				className={'icon ' + (disabled && 'disabled')}
				src={'/icons/' + name}
				alt="icon"
				{...props}
			/>
		</div>
	);
};

export const Icon = styled(IconContainer)`
	margin: ${({ margin = '0' }) => margin};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.3s;
	opacity: ${({ reverse }) => (reverse ? '0.6' : '0.8')};

	.icon {
		// height: ${({ height = '30px' }) => height};
		transition: opacity 0.3s;
	}

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
		opacity: ${({ inactive }) => (inactive ? '0.8' : '1')};
	}

	.disabled {
		cursor: not-allowed;
	}
`;
