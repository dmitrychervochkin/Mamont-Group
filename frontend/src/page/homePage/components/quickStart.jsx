import styled from 'styled-components';
import { Button, Heading } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, startWorkout } from '../../../reducers';
import { INTERFACE } from '../../../constants';
import { getScreenWidth } from '../../../utils';

const QuickStartContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const newWorkoutHandler = () => {
		dispatch(startWorkout());
		navigate('/workout');
	};
	return (
		<div
			className={className}
			style={{ padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '25px' }}
		>
			<div className="quick-start-left-side">
				<Heading size="large" className="info-title">
					Быстрый старт
				</Heading>
				<p className="info-description">
					Если у вас нет опыта в индивидуальных тренировках, рекомендуем оформить платную подписку
					для достижения ваших целей!
				</p>
				<Button
					disabled={!userId}
					className="quick-start-btn"
					width={getScreenWidth(INTERFACE.WIDTH) ? '250px' : '100%'}
					onClick={newWorkoutHandler}
				>
					Начать пустую тренировку
				</Button>
			</div>
			{getScreenWidth(INTERFACE.WIDTH) && <div className="quick-start-right-side"></div>}
		</div>
	);
};

export const QuickStart = styled(QuickStartContainer)`
	background-color: #222222;
	border-radius: 20px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	box-shadow: #141414 0px 3px 5px 1px;

	.info-description {
		margin: 15px 0 15px 0;
		font-weight: 200;
		font-size: 14px;
		filter: brightness(70%);
	}
	.quick-start-left-side {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.quick-start-right-side {
		width: 40%;
		height: 100%;
		background-image: linear-gradient(160deg, #393939 0%, #a2a2a2 50%, #393939 100%);
		border-radius: 15px;
		box-shadow: 0 0 20px 5px #141414;
	}
`;
