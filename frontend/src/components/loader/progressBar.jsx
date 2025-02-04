import styled from 'styled-components';

const ProgressBarContainer = ({ className }) => (
	<div className={className}>
		<div className="progress-line"></div>
	</div>
);

export const ProgressBar = styled(ProgressBarContainer)`
	width: 100%;
	background-color: #141414;
	height: 5px;

	.progress-line {
		background-color: #3eb942;
		height: 5px;
		animation: progress 3s linear 1s infinite;
		@keyframes progress {
			0% {
				width: 0%;
			}
			25% {
				width: 25%;
			}
			50% {
				width: 70%;
			}
			75% {
				width: 80%;
			}
			100% {
				width: 100%;
			}
		}
	}
`;
