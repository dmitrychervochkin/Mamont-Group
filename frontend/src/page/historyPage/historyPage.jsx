import styled from 'styled-components';
import { Button, Heading, Loader } from '../../components';
import { getScreenWidth, timeConverter } from '../../utils';
import { INTERFACE, LIMITS } from '../../constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../bff';
import { resetError, selectUserId, setError } from '../../reducers';
import { formatDate } from '../workoutPage/components/calendar/utils';

const HistoryPageContainer = ({ className }) => {
	const [workouts, setWorkouts] = useState([]);
	const [count, setCount] = useState(1);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const userId = useSelector(selectUserId);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		workouts.length < count
			? server
					.fetchWorkouts(userId, page, LIMITS.WORKOUTS)
					.then(({ res }) => {
						console.log(res);
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

	return (
		<div className={className}>
			<div
				className="history-header"
				style={{
					padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '25px',
				}}
			>
				<Heading size="large">История тренировок</Heading>
			</div>
			<div className="workouts-list">
				{workouts?.map(({ id, name, date, time }) => (
					<div
						key={id}
						className="history-card"
						style={{
							padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 40px' : '25px',
						}}
					>
						<div>{formatDate(new Date(date), 'DDD DD MMM YYYY')}</div>
						<div>{name}</div>
						<div>{timeConverter(time)}</div>
					</div>
				))}
			</div>
			{isLoading ? (
				<div
					style={{
						position: 'relative',
						height: '30px',
						width: '100%',
						margin: '5px 0 115px 0',
					}}
				>
					<Loader width="30px" height="30px" />
				</div>
			) : (
				workouts?.length < count && (
					<Button width="200px" onClick={onMoreWorkoutsBtnHandler}>
						Загрузить ещё...
					</Button>
				)
			)}
		</div>
	);
};
export const HistoryPage = styled(HistoryPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	padding-bottom: 110px;

	.history-header {
		width: 100%;
		background-color: #222222;
		border-radius: 20px;
	}
	.workouts-list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.history-card {
		display: flex;
		justify-content: space-between;
		border: 2px solid #646464;
		background-color: #393939;
		border-radius: 20px;
	}
`;
