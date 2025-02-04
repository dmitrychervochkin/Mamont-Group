import styled from 'styled-components';

const ScrollSliderContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const ScrollSlider = styled(ScrollSliderContainer)`
	overflow: scroll;
	overflow-x: hidden;
	height: calc(100vh - 420px);
    // height: 100%;
    margin-right: -7px;

	&::-webkit-scrollbar {
		width: 6px; /* ширина scrollbar */
	}
	&::-webkit-scrollbar-thumb {
		background-color: #a2a2a2; /* цвет плашки */
		border-radius: 30px; /* закругления плашки */
	}
`;
