import styled from 'styled-components';
import { Workout } from './components/workout/workout';
import { useDispatch, useSelector } from 'react-redux';
import {
	addPattern,
	closeModal,
	openModal,
	selectModal,
	selectStartWorkout,
	selectUserId,
	selectWorkoutTime,
	startWorkout,
} from '../../reducers';
import { WorkoutHeader } from './components/workoutHeader/workoutHeader';
import { Button, Heading, Icon, Loader } from '../../components';
import { useEffect, useState } from 'react';
import { WorkoutCard } from './components/workoutCard/workoutCard';
import { server } from '../../bff';
import { CALENDAR, ICON, ROUTE } from '../../constants';
import { LIMITS } from '../../constants/limitsConstants';
import { timeConverter } from '../../utils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Calendar, History } from './components';

const WorkoutPageContainer = ({ className }) => {
	const [isWorkoutsDropdown, setIsWorkoutsDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [patterns, setPatterns] = useState([]);
	const [exercises, setExercises] = useState([]);
	const isStartWorkout = useSelector(selectStartWorkout);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		setIsLoading(true);
		if (location.pathname === ROUTE.HISTORY) {
			setIsWorkoutsDropdown(true);
		}
		Promise.all([server.fetchExercises(), server.fetchPatterns(userId)]).then(([exercises, patterns]) => {
			setExercises(exercises.res);
			setPatterns(patterns.res);
			setTimeout(() => {
				setIsSave(false);
				setIsLoading(false);
			}, [500]);
		});
	}, [isDelete, isSave]);

	const startNewWorkout = () => {
		dispatch(startWorkout());
	};

	const onAddPatternHandler = () => {
		dispatch(addPattern());
	};

	return (
		<div className={className}>
			{isStartWorkout && <Workout setIsSave={setIsSave} />}

			<div
				style={{
					transition: 'opacity 1.5s, margin-top 1s',
					opacity: isStartWorkout ? 0 : 1,
					marginTop: isStartWorkout ? '-1000px' : '0px',
				}}
			>
				<History
					userId={userId}
					isWorkoutsDropdown={isWorkoutsDropdown}
					setIsWorkoutsDropdown={setIsWorkoutsDropdown}
				/>
				<Calendar patterns={patterns} />
				<div className="workout-page-container">
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
						<div style={{ width: '220px', display: 'flex', justifyContent: 'space-between' }}>
							<Heading>Шаблоны</Heading>
							<Icon height="35px" name={ICON.ADD} onClick={onAddPatternHandler} />
						</div>
						<Button width="250px" onClick={startNewWorkout}>
							Начать пустую тренировку
						</Button>
					</div>
					<div className="workout-page-main">
						{isLoading ? (
							<div style={{ position: 'absolute', width: '900px', top: '100px' }}>
								<Loader />
							</div>
						) : (
							patterns?.map(({ id, name, discription }) => (
								<WorkoutCard
									key={id}
									exercises={exercises}
									setIsDelete={setIsDelete}
									id={id}
									name={name}
									discription={discription}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const WorkoutPage = styled(WorkoutPageContainer)`
	position: relative;

	.workout-page-container {
		width: 100%;
		height: 100%;
		background-color: #222222;
		border-radius: 20px;
		padding: 30px 40px;
		min-height: 415px;
		margin-bottom: 10px;
	}
	.workout-page-main {
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.show-workouts-btn {
		transition: opacity 0.3s;

		&:hover {
			cursor: pointer;
			opacity: 0.6;
		}
	}
	.user-workouts-container {
		position: relative;
		transition: 0.5s;
		overflow: hidden;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
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
