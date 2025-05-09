import { useState } from 'react';
import styled from 'styled-components';
import { getScreenWidth } from '../../../utils';
import { INTERFACE } from '../../../constants';

const MusicCardContainer = ({ className, isLoading, id, musicLink, title, description }) => {
	const [isOpenMore, setIsOpenMore] = useState(false);

	return (
		<div className={className} style={{ display: getScreenWidth(INTERFACE.WIDTH) ? 'flex' : 'block' }}>
			{id % 2 === 1 ? (
				<>
					{isLoading ? (
						<div
							style={{
								marginRight: '10px',
								height: isOpenMore ? '500px' : '200px',
							}}
							className="playlist-link"
						></div>
					) : (
						<iframe
							style={{
								marginRight: getScreenWidth(INTERFACE.WIDTH) ? '10px' : '',
								height: isOpenMore ? '500px' : '200px',
								width: getScreenWidth(INTERFACE.WIDTH) ? '700px' : '100%',
							}}
							allow="clipboard-write"
							className="playlist-link"
							width="700"
							height="200"
							src={musicLink}
						></iframe>
					)}
					<div
						className="music-description"
						onClick={() => setIsOpenMore(!isOpenMore)}
						style={{ maxHeight: '500px' }}
					>
						<div
							style={{
								fontStyle: 'italic',
								fontWeight: '900',
								fontSize: '30px',
								marginBottom: '10px',
							}}
						>
							{title}
						</div>
						<div style={{ opacity: '0.7' }}>{description}</div>
					</div>
				</>
			) : (
				<>
					<div
						className="music-description"
						style={{ maxHeight: '500px' }}
						onClick={() => setIsOpenMore(!isOpenMore)}
					>
						<div
							style={{
								fontStyle: 'italic',
								fontWeight: '900',
								fontSize: '30px',
								marginBottom: '10px',
							}}
						>
							{title}
						</div>
						<div style={{ opacity: '0.7' }}>{description}</div>
					</div>
					{isLoading ? (
						<div
							style={{ marginLeft: '10px', height: isOpenMore ? '500px' : '200px' }}
							className="playlist-link"
						></div>
					) : (
						<iframe
							style={{
								marginLeft: getScreenWidth(INTERFACE.WIDTH) ? '10px' : '',
								height: isOpenMore ? '500px' : '200px',
								width: getScreenWidth(INTERFACE.WIDTH) ? '700px' : '100%',
							}}
							allow="clipboard-write"
							className="playlist-link"
							width="700"
							height="200"
							src={musicLink}
						></iframe>
					)}
				</>
			)}
		</div>
	);
};

export const MusicCard = styled(MusicCardContainer)`
	margin-bottom: 20px;

	.playlist-link {
		border: none;
		height: 400px;
		border-radius: 20px;
		border: 2px solid #a2a2a2;
		transition: border 0.3s;
		transition: 0.3s;
		background: linear-gradient(40deg, #393939, #646464, #393939) right / 300% 100%;
		animation: loading-music-cards 1s linear infinite alternate;

		&:hover {
			// opacity: 0.8;
			transition: 0.3s;
			border: 2px solid #3eb942;
			// box-shadow: 0 0 20px 1px #3eb942;
		}
	}

	@keyframes loading-music-cards {
		to {
			background-position: left;
		}
	}

	.music-description {
		width: 100%;
		transition: box-shadow 0.3s;
		border-radius: 20px;
		width: 100%;
		background-color: #222222;
		border: 5px solid rgba(255, 0, 0, 0);
		border-radius: 20px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		transition: 0.3s;

		&:hover {
			cursor: pointer;
			transition: box-shadow 0.3s;
			box-shadow: 0 0 10px 1px #a2a2a2;
		}
	}
`;
