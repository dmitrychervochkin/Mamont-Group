import styled from 'styled-components';
import { FooterLeftSide, FooterRightSide } from './components';

const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<FooterLeftSide />
			<FooterRightSide />
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	margin-top: auto;
	box-shadow: #141414 0px 3px 15px 10px;
	bottom: 0;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	height: 140px;
	background-color: #222222;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	width: 1000px;
`;
