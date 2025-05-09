import styled from 'styled-components';
import { Heading } from '../../components';
import { MusicCard } from './components/musicCard';
import { useEffect, useState } from 'react';
import { getScreenWidth } from '../../utils';
import { INTERFACE } from '../../constants';

const playlistsLinks = [
	{
		id: 1,
		title: 'Rock playlist',
		description:
			'«Лестница в небо». Прогрессивные рок-баллады, которые ассоциируются с энергией, зрелищностью и потоком эмоций.',
		musicLink: 'https://music.yandex.ru/iframe/playlist/fdrcvv88/1002',
	},
	{
		id: 2,
		title: 'Metal playlist',
		description:
			'Внутри плейлиста ждёт множество часов лихорадочной, порой до жути странной и пугающей, но всегда захватывающей метал-музыки, способной либо влюбить в этот жанр, либо оставить глубокие шрамы на психике.',
		musicLink: 'https://music.yandex.ru/iframe/album/34013179',
	},
	{
		id: 3,
		title: 'Phonk playlist',
		description:
			'Этот плейлист представляет новые и актуальные треки в жанре фонк, которые отражают разнообразие его вариантов: агрессивного, дрифтового, хаус-фонка и других. Композиции чередуют высокооктановые смеси с электроникой и мрачную атмосферу с рваным вокалом и искажёнными рифмами.',
		musicLink: 'https://music.yandex.ru/iframe/album/34569356',
	},
];

const MusicPageContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => setIsLoading(false), [300]);
	}, []);

	return (
		<div className={className}>
			<div
				className="music-page-header"
				style={{ padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '20px 30px' }}
			>
				<Heading size="large">
					{getScreenWidth(550) ? 'Плейлисты для тренировок' : 'Плейлисты'}
				</Heading>
			</div>
			<div
				style={{
					fontStyle: 'italic',
					height: '100%',
					animation: '2s infinite shadowDance',
					padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '20px 30px',
					margin: getScreenWidth(INTERFACE.WIDTH) ? '20px 0' : '20px 10px',
				}}
				className="music-page-header"
			>
				Не знаете чем разнообразить тренировку?{' '}
				<span style={{ opacity: '0.7' }}>
					Команда{' '}
					<span style={{ filter: 'brightness(140%)', color: '#3eb942' }}>"MAMONT Group"</span>{' '}
					собрала для Вас несколько мощных плейлистов - от энергичных и разрывающих голову, до
					мрачных и вызывающих в Вас бурю эмоций!{' '}
				</span>
				<span style={{ opacity: '0.7' }}>
					Выберите для себя понравившийся плейлист, добавьте в{' '}
					<span style={{ filter: 'brightness(140%)', color: '#3eb942' }}>Яндекс.Музыку </span>и
					наслаждайтесь приятной тренировкой!
				</span>
			</div>
			<div className="music-page-main">
				<div className="playlists">
					{playlistsLinks.map(({ id, musicLink, title, description }) => (
						<MusicCard
							key={id}
							id={id}
							musicLink={musicLink}
							title={title}
							isLoading={isLoading}
							description={description}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export const MusicPage = styled(MusicPageContainer)`
	.music-page-header {
		height: 100px;
		background-color: #222222;
		border-radius: 20px;
	}
	.music-page-main {
		display: flex;
	}

	.playlists {
		width: 100%;
		margin-bottom: 90px;
	}

	@keyframes shadowDance {
		0% {
			box-shadow: 0 0 10px 1px #a2a2a2;
		}
		50% {
			box-shadow: 0 0 20px 2px #3eb942;
		}
		100% {
			box-shadow: 0 0 10px 1px #a2a2a2;
		}
	}
`;
