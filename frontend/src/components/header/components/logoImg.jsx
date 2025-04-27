import styled from 'styled-components';
import { INTERFACE, LOGO, ROUTE } from '../../../constants';
import { getScreenWidth } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const LogoImgContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div
			className={className}
			style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '260px' : '80px' }}
			onClick={() => navigate(ROUTE.HOMEPAGE)}
		>
			<img
				className="img-logo"
				src={`/images/${getScreenWidth(INTERFACE.WIDTH) ? LOGO.HEADER : LOGO.MOBILE}`}
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

	.img-logo {
		height: 80px;
	}

	&:hover {
		cursor: pointer;
		opacity: 0.8;
		// transition: 0.3s;
		// box-shadow: 0px 0px 50px -5px #3eb942;
	}
`;
