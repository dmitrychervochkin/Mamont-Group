import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const featuresData = [
	{ id: 1, title: 'Календарь тренировок', description: 'Описание 1' },
	{ id: 2, title: 'Энергозатратность упражнений', description: 'Описание 2' },
	{ id: 3, title: 'Планирование тренировок', description: 'Описание 3' },
	{ id: 4, title: 'Раздел сообщество', description: 'Описание 4' },
	{ id: 5, title: 'Раздел плейлисты', description: 'Описание 5' },
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
							<div className="new-features-more-info">
								<div
									style={{
										borderBottom: '2px solid #a2a2a2',
										padding: '0 0 10px 0',
										margin: '0 0 10px 0',
									}}
								>
									{title}
								</div>
								<div style={{ color: '#a2a2a2' }}>{description}</div>
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
	top: 90px;
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
		top: 0;
		border-radius: 20px;
		left: -300px;
		position: absolute;
		width: 300px;
		height: 100%;
		background-color: #646464;
		opacity: 0;
		padding: 20px;
		color: white;
	}

	.new-feature {
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
