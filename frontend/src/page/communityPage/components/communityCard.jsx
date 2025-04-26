import styled from 'styled-components';
import { Heading, Icon } from '../../../components';
import { getScreenWidth } from '../../../utils';
import { INTERFACE } from '../../../constants';

const CommunityCardContainer = ({ className, icon, title, description, link }) => {
	return (
		<div
			className={className}
			style={{
				flexDirection: getScreenWidth(INTERFACE.WIDTH) ? '0' : 'column',
				padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '30px',
			}}
		>
			<div
				className="community-icon-container"
				style={{
					height: getScreenWidth(INTERFACE.WIDTH) ? '120px' : '80px',
				}}
			>
				<div type="image/svg+xml" data={'icons/' + icon}>
					<img
						style={{ height: getScreenWidth(INTERFACE.WIDTH) ? '130px' : '50px' }}
						src={'/icons/' + icon}
						alt="icon"
					/>
				</div>
				{!getScreenWidth(INTERFACE.WIDTH) && <Heading>{title}</Heading>}
			</div>
			<div>
				{getScreenWidth(INTERFACE.WIDTH) && <Heading>{title}</Heading>}
				<div style={{ margin: '10px 0', color: '#a2a2a2' }}>{description}</div>
				<div style={{ width: '100%', textAlign: 'right' }}>
					<a className="go-to-tg-chanel-btn" href={link} target="_blank" rel="noopener noreferrer">
						Ссылка
					</a>
				</div>
			</div>
		</div>
	);
};

export const CommunityCard = styled(CommunityCardContainer)`
	border-radius: 20px;
	width: 100%;
	background-color: #222222;
	margin-bottom: 10px;
	display: flex;
	align-items: flex-start;
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
		margin-right: 50px;
		display: flex;
		align-items: center;
		gap: 30px;
		transition: background-color 0.3s, box-shadow 0.3s;
	}
`;
