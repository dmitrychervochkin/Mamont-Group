import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getScreenWidth } from '../../../utils';

const featuresData = [
	{
		id: 1,
		title: 'Доработка календаря тренировок',
		description:
			'Мы знаем, что иногда календарь тренировок работает не так, как задумывалось, поэтому в будущих обновлениях мы исправим всю логику календаря, чтобы Вам было им удобнее пользоваться!',
	},
	{
		id: 2,
		title: 'Энергозатратность упражнений',
		description:
			'В будущих обновлениях мы добавим поддержку подсчёта энергозатратности упражнений, чтобы Вам было удобнее точно расчитывать сожжёные калории в упражнениях!',
	},
	{
		id: 3,
		title: 'Планирование тренировок',
		description:
			'Поддержка планирования тренировок позволит Вам засекать таймер Push-уведомлений тогда, когда Вам это дейтвительно необходимо!',
	},
	{
		id: 4,
		title: 'Доработка окна тренировки',
		description:
			'Сейчас тренировочное окно работает не так, как нужно. Мы занимаемся доработкой основного функционала нашего приложения, ждите обновлений!',
	},
	{
		id: 5,
		title: 'Поддержка мультиаккаунта MAMONT',
		description:
			'Мультиаккаунт MAMONT Group даст нам возможность эффективно хранить все ваши данные, а Вам - удобство в пользовании экосистемой MAMONT!',
	},
];

const NewFeaturesContainer = ({ className, isDropdownOpen }) => {
	return (
		<div
			className={className}
			id="new-features-dropdown-window"
			style={{
				overflow: isDropdownOpen ? 'visible' : 'hidden',
				maxHeight: isDropdownOpen ? '700px' : '1px',
				opacity: isDropdownOpen ? 1 : 0,
			}}
		>
			<div>
				Что нового в разработке?
				<ul style={{ color: '#a2a2a2' }}>
					{featuresData.map(({ id, title, description }) => (
						<li key={id}>
							<div className="new-feature">{title}</div>
							<div
								className="new-features-more-info"
								style={{
									top: getScreenWidth(620) ? '0' : '100%',
									left: getScreenWidth(620) ? '-300px' : '0',
								}}
							>
								<div
									style={{
										borderBottom: '2px solid #a2a2a2',
										padding: '0 0 10px 0',
										margin: '0 0 10px 0',
									}}
								>
									{title}
								</div>
								<div style={{ color: '#ffffff90' }}>{description}</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export const NewFeatures = styled(NewFeaturesContainer)`
	box-shadow: 0 0 10px 5px #141414;
	transition: opacity 0.3s, max-height 0.3s;
	position: absolute;
	right: 0;
	top: 80px;
	margin: 10px;
	border-radius: 20px;
	width: 300px;
	background-color: #222222;
	padding: 20px;

	li {
		margin-bottom: 10px;
	}

	.new-features-more-info {
		transition: opacity 0.5s;
		border-radius: 20px;
		position: absolute;
		width: 300px;
		height: 100%;
		background-color: #646464;
		opacity: 0;
		padding: 20px;
		color: white;
	}

	.new-feature {
		position: relative;
		cursor: default;
		transition: color 0.5s;

		&:hover + .new-features-more-info {
			opacity: 1;
		}
		&:hover {
			color: white;
		}
	}
`;
