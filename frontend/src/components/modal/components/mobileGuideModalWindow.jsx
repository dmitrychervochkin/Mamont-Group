import styled from 'styled-components';
import { Heading } from '../../heading/heading';
import { Button } from '../../button/button';
import { useState } from 'react';
import { ScrollSlider } from '../../scrollSlider/scrollSlider';
import { INTERFACE } from '../../../constants';
import { getScreenWidth } from '../../../utils';

const MobileGuideModalContainer = ({ className, onCancel }) => {
	const [selector, setSelector] = useState('IOS');
	return (
		<div className={className}>
			<Heading size="small" weight="500">
				Краткий гайд как добавить приложение на экран вашего смартфона:
			</Heading>
			<div className="selector-container">
				<div
					style={{
						color: selector === 'IOS' ? '#3eb942' : '#a2a2a2',
						border: selector === 'IOS' ? '1px solid #3eb942' : 'none',
					}}
					className="selector-option"
					onClick={() => setSelector('IOS')}
				>
					IOS
				</div>
				<div
					style={{
						color: selector === 'Android' ? '#3eb942' : '#a2a2a2',
						border: selector === 'Android' ? '1px solid #3eb942' : 'none',
					}}
					className="selector-option"
					onClick={() => setSelector('Android')}
				>
					Android
				</div>
				<div
					style={{
						color: selector === 'MacOS' ? '#3eb942' : '#a2a2a2',
						border: selector === 'MacOS' ? '1px solid #3eb942' : 'none',
					}}
					className="selector-option"
					onClick={() => setSelector('MacOS')}
				>
					MacOS
				</div>
			</div>
			{selector === 'IOS' && (
				<ScrollSlider className="guide-container">
					<div className="guide-point-container">
						<div className="guide-label">1. Нажмите на иконку "Share"</div>
						<img className="guide-img" src="/images/guide-img1.jpg" />
					</div>
					<div className="guide-point-container">
						<div className="guide-label">2. Пролистайте ниже до кнопки "На экран Домой"</div>
						<img className="guide-img" src="/images/guide-img2.jpg" />
					</div>
					<div className="guide-point-container">
						<div className="guide-label">3. Добавьте иконку на рабочий стол </div>
						<img className="guide-img" src="/images/guide-img3.jpg" />
					</div>
				</ScrollSlider>
			)}

			{(selector === 'MacOS' || selector === 'Android') && (
				<div className="no-guide-text">
					Адаптация приложения под текущие настройки находится в разработке! Следите за следующими
					обновлениями!
				</div>
			)}

			<Button variant="auth" onClick={onCancel}>
				Готово
			</Button>
		</div>
	);
};

export const MobileGuideModal = styled(MobileGuideModalContainer)`
	text-align: center;
	position: relative;
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 20px;

	.guide-img {
		width: 100%;
		border-radius: 20px;
		border: 2px solid #a2a2a2;
	}
	.guide-label {
		color: #a2a2a2;
		margin: 10px 0;
	}

	.guide-point-container {
		padding-bottom: 20px;
		margin: 20px 0;
		border-bottom: 2px solid #393939;
	}

	.selector-container {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		margin: 10px 0;
		border-top: 2px solid #393939;
		border-bottom: 2px solid #393939;
	}
	.selector-option {
		padding: 2px 10px;
		border-radius: 8px;
		transition: color 0.2s ease;
		&:hover {
			cursor: pointer;
			color: #ffffff97;
		}
	}
	.no-guide-text {
		color: #a2a2a2;
		margin: 30px 0;
	}

	.guide-container {
		margin-bottom: 10px;
		margin-right: 0;
		height: calc(100vh - 380px);

		&::-webkit-scrollbar {
			width: 0px; /* ширина scrollbar */
		}
	}
`;
