import styled from 'styled-components';
import { Heading, Icon } from '../../../components';

const CommunityCardContainer = ({ className, icon, title, description, link }) => {
	return (
		<div className={className}>
			<div className="community-icon-container">
				<div type="image/svg+xml" data={'icons/' + icon}>
					<img style={{ height: '130px' }} src={'/icons/' + icon} alt="icon" />
				</div>
			</div>
			<div style={{ width: '600px' }}>
				<Heading>{title}</Heading>
				<div style={{ marginTop: '10px', color: '#a2a2a2' }}>{description}</div>
			</div>
			<span style={{ width: '130px', textAlign: 'right' }}>
				<a className="go-to-tg-chanel-btn" href={link} target="_blank" rel="noopener noreferrer">
					Ссылка
				</a>
			</span>
		</div>
	);
};

export const CommunityCard = styled(CommunityCardContainer)`
	padding: 30px 40px;
	border-radius: 20px;
	height: 200px;
	width: 100%;
	background-color: #222222;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;

	.go-to-tg-chanel-btn {
		transition: color 0.3s;
		color: #3eb942;
		transition: opacity 0.3s;

		&:hover {
			cursor: pointer;
			opacity: 0.6;
		}
	}
	.community-icon-container {
		margin-top: -20px;
		box-shadow: inset 0px 0px 10px 7px #141414;
		margin-right: 50px;
		padding: 10px;
		width: 180px;
		height: 180px;
		background-color: #393939;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.3s, box-shadow 0.3s;

		&:hover {
			background-color: #646464;
			box-shadow: inset 0px 0px 10px 7px black;
		}
	}
`;
