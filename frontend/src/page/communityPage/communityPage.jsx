import styled from 'styled-components';
import { Heading } from '../../components';
import { useState } from 'react';
import { CommunityCard } from './components/communityCard';
import { ICON } from '../../constants';

const CommunityPageContainer = ({ className }) => {
	const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

	const telegramLinks = [
		{
			id: 1,
			link: '123123123',
			title: 'Питание',
			icon: ICON.APPLE,
			discription:
			'В группе будут давать советы по составлению планов питания. Также, будет публиковаться информация о разных видах питания, основах составления рациона и рецептах здоровых блюд.',
		},
		{
			id: 2,
			link: '123123123',
			title: 'Тренировки по науке',
			icon: ICON.BICEPSSHADOW,
			discription:
				'Канал будет посвящён научным исследованиям в области тренировок. Основная информация будет состоять из экспертных материалов о занятиях спортом и их пользе, о нюансах выполнения тех или иных упражнений.',
		},
		{
			id: 4,
			link: '123123123',
			title: 'Здоровье',
			icon: ICON.HEALTH,
			discription: (
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
		{
			id: 3,
			link: '123123123',
			title: 'Сильный дух',
			icon: ICON.DUMBBELLSHADOW,
			discription:
				'Контент канала будет сосредоточен на обычной повседневной жизни: качественный отдых, важные витамины и анализы, соблюдение режима, хобби, самореализация и становление личности. Это не про спорт - это про образ жизни.',
		},
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
					maxHeight: isMoreInfoOpen ? '200px' : '100px',
					marginTop: isMoreInfoOpen ? '0' : '-110px',
					opacity: isMoreInfoOpen ? '1' : '0',
				}}
				className="community-page-info"
			>
				<div style={{  borderLeft: '3px solid #a2a2a2', paddingLeft: '20px' }}>
					The border shorthand is especially useful when you want all four borders to be the same.
					To make them different from each other, however, you can use the longhand border-width,
					border-style, and border-color properties, which accept different values for each side.
					Alternatively, you can target one border at a time with the physical (e.g., border-top )
					and logical (e.g., border-block-start) border properties.The border shorthand is
					especially useful when you want all four borders to be the same. To make them different
					from each other, however, you can use the longhand border-width, border-style, and
					border-color properties, which accept different values for each side. Alternatively, you
					can target one border at a time with the physical (e.g., border-top ) and logical (e.g.,
					border-block-start) border properties.
				</div>
			</div>
			<div className="community-page-main">
				{telegramLinks.map(({ id, icon, title, discription }) => (
					<CommunityCard key={id} icon={icon} title={title} discription={discription} />
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
		word-break: break-all;
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
