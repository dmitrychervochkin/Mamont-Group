import styled from 'styled-components';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Workout } from './components/workout/workout';
import { WorkoutCard } from './components/workoutCard/workoutCard';
import { Calendar, History } from './components';

import { Button, Heading, Icon, Loader } from '../../components';
import { server } from '../../bff';
import { ICON, INTERFACE, LIMITS, ROUTE } from '../../constants';

import {
	addPattern,
	startWorkout,
	setError,
	resetError,
	selectStartWorkout,
	selectUserId,
} from '../../reducers';

const useFetchWorkouts = (userId, isDataUpdating, setIsLoading, page) => {
	const [patterns, setPatterns] = useState([]);
	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const [exercisesRes, patternsRes] = await Promise.all([
					server.fetchExercises(),
					server.fetchPatterns(userId, LIMITS.PATTERNS, page),
				]);

				setExercises(exercisesRes.res);
				setPatterns(patternsRes.res);
			} catch (err) {
				console.error(err);
			} finally {
				setTimeout(() => setIsLoading(false), 500);
			}
		};

		fetchData();
	}, [userId, isDataUpdating, page]);

	return { patterns, workouts, exercises, setWorkouts };
};

const WorkoutPageContainer = ({ className }) => {
	const [isWorkoutsDropdown, setIsWorkoutsDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDataUpdating, setIsDataUpdating] = useState(false);
	const isStartWorkout = useSelector(selectStartWorkout);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const location = useLocation();

	const { patterns, workouts, exercises, setWorkouts } = useFetchWorkouts(
		userId,
		isDataUpdating,
		setIsLoading,
		page,
	);

	useEffect(() => {
		setIsWorkoutsDropdown(location.pathname === ROUTE.HISTORY);
	}, [location.pathname]);

	const startNewWorkout = useCallback(() => dispatch(startWorkout()), [dispatch]);

	const onAddPatternHandler = useCallback(() => dispatch(addPattern()), [dispatch]);

	const renderWorkoutCards = useMemo(
		() =>
			patterns.map(({ id, name, description }) => (
				<WorkoutCard
					key={id}
					exercises={exercises}
					setIsDelete={() => setIsDataUpdating(true)}
					id={id}
					name={name}
					description={description}
				/>
			)),
		[patterns, exercises],
	);

	if (isStartWorkout) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<div className={className}>
			{isStartWorkout && <Workout setIsSave={setIsDataUpdating} />}

			<ContentWrapper isStartWorkout={isStartWorkout}>
				<History
					userId={userId}
					isWorkoutsDropdown={isWorkoutsDropdown}
					setIsWorkoutsDropdown={setIsWorkoutsDropdown}
					workouts={workouts}
					setWorkouts={setWorkouts}
				/>
				<Calendar patterns={patterns} workouts={workouts} />

				<div
					className="workout-page-container"
					style={{ padding: window.innerWidth > INTERFACE.WIDTH ? '30px 40px' : '20px 30px' }}
				>
					<Header style={{ display: window.innerWidth > 540 ? 'flex' : 'block' }}>
						<HeadingContainer>
							<Heading>Шаблоны</Heading>
							<Icon height="35px" name={ICON.ADD} onClick={onAddPatternHandler} />
						</HeadingContainer>
						{!isLoading && (
							<div style={{ display: 'flex' }}>
								{page > 1 ? (
									<Icon
										height="30px"
										name={ICON.ARROWLEFT}
										onClick={() => setPage(page - 1)}
									/>
								) : (
									patterns.length === 9 && (
										<Icon
											height="30px"
											name={ICON.ARROWRIGHT}
											onClick={() => setPage(page + 1)}
										/>
									)
								)}
							</div>
						)}
						<Button width={window.innerWidth > 540 ? '250px' : '100%'} onClick={startNewWorkout}>
							Начать пустую тренировку
						</Button>
					</Header>

					<div className="workout-page-main">
						{isLoading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							renderWorkoutCards
						)}
					</div>
				</div>
			</ContentWrapper>
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
		// min-height: 415px;
		margin-bottom: 10px;
	}

	.workout-page-main {
		position: relative;
		z-index: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// min-height: 400px;
		margin-bottom: 500px;
	}

	.show-workouts-btn {
		transition: opacity 0.3s;

		&:hover {
			cursor: pointer;
			opacity: 0.6;
		}
	}
`;

const ContentWrapper = styled.div`
	transition: opacity 1.5s, margin-top 1s;
	opacity: ${(props) => (props.isStartWorkout ? 0 : 1)};
	margin-top: ${(props) => (props.isStartWorkout ? '-1000px' : '0px')};
`;

const Header = styled.div`
	justify-content: space-between;
	margin-bottom: 30px;
	// align-items: center;
`;

const HeadingContainer = styled.div`
	// width: 220px;
	display: flex;
	justify-content: space-between;
	gap: 30px;
	margin-bottom: 10px;
`;

const LoaderContainer = styled.div`
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 0;
`;
