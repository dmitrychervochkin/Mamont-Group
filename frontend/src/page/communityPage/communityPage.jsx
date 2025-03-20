import styled from 'styled-components';
import { Heading } from '../../components';
import { useState } from 'react';
import { CommunityCard } from './components/communityCard';
import { ICON } from '../../constants';

const CommunityPageContainer = ({ className }) => {
	const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

	const telegramLinks = [
		{
			id: 2,
			link: 'https://t.me/mamont_training',
			title: 'Тренировки по науке',
			icon: ICON.BICEPSSHADOW,
			description:
				'Канал будет посвящён научным исследованиям в области тренировок. Основная информация будет состоять из экспертных материалов о занятиях спортом и их пользе, о нюансах выполнения тех или иных упражнений.',
		},
		{
			id: 1,
			link: 'https://t.me/mamont_nutrition',
			title: 'Питание',
			icon: ICON.APPLE,
			description:
				'В группе будут давать советы по составлению планов питания. Также, будет публиковаться информация о разных видах питания, основах составления рациона и рецептах здоровых блюд.',
		},
		{
			id: 4,
			link: 'https://t.me/mamont_health',
			title: 'Здоровье',
			icon: ICON.HEALTH,
			description: (
				<>
					<i>
						В здоровом теле - здоровый дух! <br />
					</i>
					<p style={{ margin: '10px 0' }}>
						Всё о витаминах, необходимых спортсмену для лучшего самочувствия, биодобавках,
						спортивном питании, качественном отдыхе и соблюдении режима.
					</p>
				</>
			),
		},
		// {
		// 	id: 3,
		// 	link: '123123123',
		// 	title: 'Сильный дух',
		// 	icon: ICON.DUMBBELLSHADOW,
		// 	description:
		// 		'Контент канала будет сосредоточен на обычной повседневной жизни: качественный отдых, важные витамины и анализы, соблюдение режима, хобби, самореализация и становление личности. Это не про спорт - это про образ жизни.',
		// },
	];

	return (
		<div className={className}>
			<div className="community-page-header">
				<Heading>Сообщество</Heading>
				<span className="more-info-btn" onClick={() => setIsMoreInfoOpen(!isMoreInfoOpen)}>
					Подробнее
				</span>
			</div>
			<div
				style={{
					maxHeight: isMoreInfoOpen ? '100%' : '100px',
					marginTop: isMoreInfoOpen ? '0' : '-110px',
					opacity: isMoreInfoOpen ? '1' : '0',
				}}
				className="community-page-info"
			>
				<p style={{ borderLeft: '3px solid #a2a2a2', paddingLeft: '20px' }}>
					<b style={{ color: '#ffffff90' }}>Сообщество</b> – это твой проводник в мир здоровья, силы
					и осознанного образа жизни. Здесь ты найдёшь прове&shy;ренные знания, поддержку и
					мотивацию от единомышленников. Мы собрали три Telegram-канала, каждый из которых
					поможет тебе прокачаться в важнейших аспектах:{' '}
					<b style={{ color: '#ffffff90' }}>Питание </b>– разберись в основах сбалансированного
					рациона, узнай, как грамотно подбирать БЖУ, изучи рабочие лайфхаки для набора массы,
					похудения и поддер&shy;жания энергии. <b style={{ color: '#ffffff90' }}>Тренировки </b> –
					эффективные программы для любого уровня, правильная техника выполнения упражнений, советы
					по прогрессии нагрузки и мощная мотивация, чтобы не сдаться на полпути.{' '}
					<b style={{ color: '#ffffff90' }}>Здоровье </b> – всё о восстановлении, профилактике,
					полезных привычках и научном подходе к физическому и ментальному сос&shy;тоянию. Присоединяйся
					и стань лучшей версией себя! 🚀
				</p>
			</div>
			<div className="community-page-main">
				{telegramLinks.map(({ id, icon, title, description, link }) => (
					<CommunityCard key={id} icon={icon} title={title} description={description} link={link} />
				))}
			</div>
		</div>
	);
};

export const CommunityPage = styled(CommunityPageContainer)`
	.community-page-header {
		height: 100px;
		width: 100%;
		background-color: #222222;
		border-radius: 20px;
		padding: 30px 40px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 1;
	}
	.community-page-info {
		position: absolute;
		// word-break: break-all;
		transition: 0.5s;
		overflow: hidden;
		width: 100%;
		border-radius: 20px;
		padding: 30px 40px;
		background-color: #393939;
		color: #a2a2a2;
		border: 2px dashed #a2a2a2;
	}
	.more-info-btn {
		opacity: 0.6;
		transition: opacity 0.3s;

		&:hover {
			cursor: pointer;
			opacity: 1;
		}
	}
	.community-page-main {
		border-radius: 20px;
		margin-top: 10px;
		// height: 300px;
		width: 100%;
		// background-color: #222222;
	}
`;
