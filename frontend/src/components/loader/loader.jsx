import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="loader"></div>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	position: absolute;
	display: flex;
	justify-content: center;
	left: 0;
	right: 0;
	z-index: 4;

	.loader {
		border: 5px solid #3eb942;
		border-top: 5px solid #393939;
		border-radius: 50%;
		width: ${({ width = '40px' }) => width};
		height: ${({ height = '40px' }) => height};
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
