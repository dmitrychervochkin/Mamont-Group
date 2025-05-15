import styled from 'styled-components';
import { Button, Heading, Loader } from '../../../../components';
import { INTERFACE, LIMITS, ROUTE } from '../../../../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectUserId, setError } from '../../../../reducers';
import { getScreenWidth, timeConverter } from '../../../../utils';
import { formatDate } from '../calendar/utils';

const HistoryContainer = ({
	className,
	workouts,
	setWorkouts,
	userId,
	isWorkoutsDropdown,
	setIsWorkoutsDropdown,
}) => {
	const [count, setCount] = useState(1);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		workouts.length < count
			? server
					.fetchWorkouts(userId, page, LIMITS.WORKOUTS)
					.then(({ res }) => {
						setCount(res.count);

						setTimeout(() => {
							if (workouts.length === 0) {
								setWorkouts(res.rows);
							} else {
								setWorkouts([...workouts, ...res.rows]);
							}
							setIsLoading(false);
						}, [500]);
					})
					.catch((err) => {
						dispatch(setError(err));
						setTimeout(() => {
							dispatch(resetError());
						}, [5000]);
					})
			: setTimeout(() => {
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
			<div
				className="workout-page-header"
				style={{
					padding: getScreenWidth(430) ? '30px 40px' : '20px 25px',
					display: getScreenWidth(430) ? 'flex' : 'block',
				}}
			>
				<Heading size="large">Мои тренировки</Heading>
				<div className="show-workouts-btn" onClick={onHistoryClick}>
					{isWorkoutsDropdown ? 'Скрыть' : 'Показать'}
				</div>
			</div>
			<div
				style={{
					marginTop: isWorkoutsDropdown ? '10px' : 0,
					opacity: isWorkoutsDropdown ? 1 : 0,
					maxHeight: isWorkoutsDropdown ? '1000px' : 0,
					overflow: isWorkoutsDropdown ? 'visible' : 'hidden',
				}}
				className="user-workouts-container"
			>
				{workouts.map(({ id, name, userId, date, time }) => (
					<div
						key={id}
						className="workouts-history-card"
						style={{ padding: getScreenWidth(430) ? '20px 30px' : '20px 10px' }}
					>
						<div style={{ color: 'white', width: '150px' }}>
							{formatDate(new Date(date), 'DDD DD MMM YYYY')}
						</div>
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
	position: relative;
	max-width: 1000px;
	width: 100%;

	.show-workouts-btn {
		margin-top: 10px;
		text-align: center;
		color: #a2a2a2;
	}

	.workout-page-header {
		background-color: #222222;
		width: 100%;
		// height: 100px;
		border-radius: 20px;
		// display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
	.workouts-history-card {
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #393939;
		border-radius: 15px;
		margin-bottom: 2px;
		color: #a2a2a2;
		box-shadow: 0 0 5px 1px #141414;
	}
	.user-workouts-container {
		position: absolute;
		transition: 0.5s;
		// overflow: hidden;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 20;
		max-width: 500px;
		width: 100%;
		top: 100px;
		right: 0;
	}
	.more-workouts-btn {
		margin-top: 7px;
		background-color: #393939;

		&:hover {
			background-color: #646464;
			box-shadow: none;
		}
	}
`;
