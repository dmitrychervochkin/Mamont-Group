import styled from 'styled-components';
import { INTERFACE, LOGO } from '../../../constants';

const LogoImgContainer = ({ className }) => {
	return (
		<div className={className}>
			<img
				className="img-logo"
				style={{
					marginTop: window.innerWidth > INTERFACE.WIDTH ? '10px' : '0px',
					height: window.innerWidth > INTERFACE.WIDTH ? '70px' : '60px',
				}}
				src={`/images/${window.innerWidth > INTERFACE.WIDTH ? LOGO.HEADER : LOGO.MOBILE}`}
				alt="Logo"
			/>
		</div>
	);
};

export const LogoImg = styled(LogoImgContainer)`
	display: flex;
	align-items: center;
	border-radius: 20px;
	height: 58px;
	margin-right: 10px;
	z-index: 6;
	transition: 0.3s;

	&:hover {
		cursor: pointer;
		transition: 0.3s;
		box-shadow: 0px 0px 50px -5px #3eb942;
	}
`;
