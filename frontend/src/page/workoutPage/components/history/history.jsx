import styled from 'styled-components';
import { Button, Heading, Loader } from '../../../../components';
import { LIMITS, ROUTE } from '../../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../../reducers';
import { timeConverter } from '../../../../utils';

const HistoryContainer = ({ className, userId, isWorkoutsDropdown, setIsWorkoutsDropdown }) => {
	const [workouts, setWorkouts] = useState([]);
	const [count, setCount] = useState(1);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		workouts.length < count &&
			server.fetchWorkouts(userId, page, LIMITS.WORKOUTS).then(({ res }) => {
				setCount(res.count);

				setTimeout(() => {
					if (workouts.length === 0) {
						setWorkouts(res.rows);
					} else {
						setWorkouts([...workouts, ...res.rows]);
					}
					setIsLoading(false);
				}, [500]);
			});
		setTimeout(() => {
			setIsLoading(false);
		}, [1000]);
	}, [page]);

	const onMoreWorkoutsBtnHandler = () => {
		setPage(page + 1);
	};

	const onHistoryClick = () => {
		if (location.pathname !== ROUTE.HISTORY) {
			navigate(ROUTE.HISTORY);
		} else {
			navigate(ROUTE.WORKOUT);
		}
		setIsWorkoutsDropdown(!isWorkoutsDropdown);
	};

	return (
		<div className={className}>
			<div className="workout-page-header">
				<Heading>Мои тренировки</Heading>
				<div className="show-workouts-btn" onClick={onHistoryClick}>
					{isWorkoutsDropdown ? 'Скрыть' : 'Показать'}
				</div>
			</div>
			<div
				style={{
					marginTop: isWorkoutsDropdown ? '10px' : 0,
					opacity: isWorkoutsDropdown ? 1 : 0,
					maxHeight: isWorkoutsDropdown ? '1000px' : 0,
				}}
				className="user-workouts-container"
			>
				{workouts.map(({ id, name, userId, date, time }) => (
					<div key={id} className="workouts-history-card">
						<div>{date}</div>
						<div>{name}</div>
						<div>{timeConverter(time)}</div>
					</div>
				))}
				{isLoading ? (
					<div
						style={{
							position: 'relative',
							height: '30px',
							width: '100%',
							margin: '15px 0 10px 0',
						}}
					>
						<Loader width="30px" height="30px" />
					</div>
				) : (
					workouts.length < count && (
						<Button
							className="more-workouts-btn"
							width="100px"
							onClick={onMoreWorkoutsBtnHandler}
						>
							Ещё
						</Button>
					)
				)}
			</div>
		</div>
	);
};

export const History = styled(HistoryContainer)`
	.workout-page-header {
		padding: 30px 40px;
		background-color: #222222;
		width: 100%;
		height: 100px;
		border-radius: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.workouts-history-card {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #393939;
		padding: 20px 30px;
		border-radius: 15px;
		margin-bottom: 2px;
		color: #a2a2a2;
	}
`;
