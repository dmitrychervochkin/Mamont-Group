import styled from 'styled-components';
import { Icon } from '../../../../components';
import { ICON } from '../../../../constants';
import { findItem, findLastSet, getRandomInt, timeConverter } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	addPattern,
	closeModal,
	finishWorkout,
	openModal,
	resetError,
	selectExercises,
	selectUserExercises,
	selectUserId,
	selectUserWorkoutExercises,
	setError,
	setUserExercises,
	setUserWorkout,
	setUserWorkoutExercises,
	startWorkout,
} from '../../../../reducers';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';

const WorkoutCardContainer = ({ className, exercises, id, name, discription, userId, setIsDelete }) => {
	const [workoutExercises, setWorkoutExercises] = useState([]);
	const [userExercisesState, setUserExercisesState] = useState([]);
	const [currentExercises, setCurrentExercises] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const userWorkoutExercises = useSelector(selectUserWorkoutExercises);
	const dispatch = useDispatch();
	useEffect(() => {
		Promise.all([server.fetchPatternExercises(id), server.fetchPatternWorkoutExercises(id)])
			.then(([userExercisesData, workoutExercisesData]) => {
				setUserExercisesState(userExercisesData.res);
				setWorkoutExercises(workoutExercisesData.res);
			})
			.catch((err) => {
				dispatch(setError(err));
				setTimeout(() => {
					dispatch(resetError());
				}, [5000]);
			});
	}, []);

	const windowClicker = (event) => {
		const accountDropdownWindow = document.querySelectorAll('#workout-card-dropdown-window' + id);
		const accountDropdown = document.querySelector('#workout-card-dropdown-btn' + id);

		if (event.target === accountDropdown) {
			return;
		} else if (accountDropdownWindow[0] !== event.target.parentNode) {
			setIsDropdownOpen(false);
			window.removeEventListener('click', windowClicker);
		}
	};

	const onDropdownHandler = () => {
		const accountDropdownWindow = document.querySelectorAll('#workout-card-dropdown-window' + id);
		setIsDropdownOpen(!isDropdownOpen);

		if (accountDropdownWindow[0].style.opacity === '0') {
			window.addEventListener('click', windowClicker);
		} else {
			window.removeEventListener('click', windowClicker);
		}
	};

	const onWorkoutCardHandler = () => {
		dispatch(setUserWorkout({ id, name, discription, userId }));
		dispatch(setUserWorkoutExercises(findLastSet(workoutExercises, id)));

		dispatch(
			openModal({
				workoutPreview: true,
				onConfirm: () => {
					dispatch(startWorkout());
					dispatch(closeModal());
				},
				onCancel: () => {
					dispatch(finishWorkout());
					dispatch(closeModal());
				},
			}),
		);
	};

	const onRemovePattern = (patternId) => {
		console.log(patternId);
		dispatch(
			openModal({
				isConfirm: true,
				text: 'Вы действительно хотите удалить шаблон?',
				onConfirm: () => {
					setIsDelete(true);
					server.removePattern(patternId).finally(() => setIsDelete(false));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const onEditPattern = () => {
		dispatch(setUserWorkout({ id, name, discription }));
		dispatch(setUserExercises([...userExercisesState]));
		dispatch(setUserWorkoutExercises([...workoutExercises]));
		dispatch(addPattern());
	};

	return (
		<div className={className}>
			<div
				id={'workout-card-dropdown-window' + id}
				style={{ maxHeight: isDropdownOpen ? '400px' : '0px', opacity: isDropdownOpen ? 1 : 0 }}
				className="workout-card-dropdown"
			>
				<div className="workout-card-dropdown-selector" onClick={() => onEditPattern(id)}>
					<span>Редактировать</span>
					<Icon height="25px" name={ICON.EDIT} />
				</div>
				<div className="workout-card-dropdown-selector" onClick={() => onRemovePattern(id)}>
					<span>Удалить</span>
					<Icon height="25px" name={ICON.DELETE} />
				</div>
			</div>
			<Icon
				id={'workout-card-dropdown-btn' + id}
				className="workout-card-dropdown-btn"
				name={ICON.MENU}
				onClick={onDropdownHandler}
			/>
			<div className="workout-card" onClick={onWorkoutCardHandler}>
				<div className="workout-card-header">{name}</div>
				<div className="workout-card-main">
					<div className="workout-sets">
						{findLastSet(workoutExercises, id).map((item) => (
							<div key={item.id || item[0].id} style={{ display: 'flex', margin: '5px 0' }}>
								<div>{item.length || 1}</div>
								<span style={{ margin: '0 10px' }}> x </span>
								<div>
									{findItem(exercises.rows, item.exerciseId || item[0].exerciseId)?.name}
								</div>
							</div>
						))}
					</div>
					{/* <div className="workout-card-time">Время: {timeConverter(time)}</div> */}
				</div>
			</div>
		</div>
	);
};

export const WorkoutCard = styled(WorkoutCardContainer)`
	position: relative;
	margin: 0 auto;

	.workout-card {
		width: 250px;
		padding: 20px 30px;
		height: 250px;
		background-color: #393939;
		border-radius: 20px;
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		transition: background-color 0.3s;

		&:hover {
			cursor: pointer;
			background-color: #646464;
		}

		&:hover > .workout-card-main .workout-card-time {
			color: #a2a2a2;
		}
	}

	.workout-card-header {
		font-size: 20px;
		width: 170px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.workout-card-time {
		transition: color 0.3s;
		color: #646464;
	}
	.workout-card-main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.workout-sets {
		color: #a2a2a2;
		font-size: 15px;
		overflow: hidden;
		max-height: 150px;
	}
	.workout-card-dropdown {
		background-color: #393939;
		box-shadow: 0 0 5px 1px #141414;
		position: absolute;
		z-index: 1;
		left: 220px;
		top: 20px;
		border-radius: 15px;
		transition: opacity 0.5s, max-height 0.3s;
		overflow: hidden;
		padding: 5px 0;
		width: 180px;
	}

	.workout-card-dropdown-selector {
		font-size: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 15px;

		&:hover {
			cursor: pointer;
			background-color: #646464;
		}
	}
	.workout-card-dropdown-btn {
		position: absolute;
		right: 20px;
		top: 15px;
	}
`;
