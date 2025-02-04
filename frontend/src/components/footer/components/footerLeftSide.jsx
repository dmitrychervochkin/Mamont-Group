import styled from 'styled-components';
import { Icon } from '../../icon/icon';
import { ICON } from '../../../constants/iconsContants';

const FooterLeftSideContainer = ({ className }) => {
	return (
		<div className={className}>
			<>
				<div className="company-name">MAMONT GROUP</div>
				<div className="company-name-2">Fitness</div>
			</>
			<div className="social-media-icons">
				<Icon name={ICON.VK} height="20px" />
				<Icon name={ICON.TELEGRAM} height="20px" />
				<Icon name={ICON.YOUTUBE} height="25px" />
				<Icon name={ICON.INSTAGRAM} height="20px" />
			</div>
		</div>
	);
};

export const FooterLeftSide = styled(FooterLeftSideContainer)`
	padding: 30px 50px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.company-name {
		font-weight: 600;
		font-style: italic;
		letter-spacing: -1.2px;
	}
	.company-name-2 {
		font-style: italic;
		font-size: 12px;
		color: #3eb942;
		margin-top: -39px;
		margin-left: 100px;
		z-index: 2;
	}
	.social-media-icons {
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: space-between;
		size: 20px;
	}
`;
