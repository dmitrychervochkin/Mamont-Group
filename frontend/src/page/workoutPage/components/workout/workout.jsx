import styled from 'styled-components';
import { Button, Checkbox, Heading, Icon } from '../../../../components';
import { ICON } from '../../../../constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeModal,
	finishWorkout,
	openModal,
	resetError,
	selectExercises,
	selectIsAddPattern,
	selectIsTimerEditing,
	selectStartWorkout,
	selectTypes,
	selectUserExercises,
	selectUserId,
	selectUserWorkout,
	selectUserWorkoutExercises,
	setError,
	setExercises,
	setMuscleGroups,
	setTypes,
	setUser,
	setUserExercises,
	setUserWorkout,
	setUserWorkoutExercises,
	startBreak,
	stopBreak,
	stopWorkout,
	timerEditing,
} from '../../../../reducers';
import { server } from '../../../../bff';
import { findItem, groupArrays } from '../../../../utils';
import { RestTimeTimer, WorkoutSets } from './components';

const dragStart = (event) => {
	if (event.target.className.includes('card')) {
		event.target.classList.remove('swapped');
		event.target.classList.add('dragging');
	}
};

const dragEnd = (event) => {
	if (event.target.className.includes('card')) {
		event.target.classList.remove('dragging');
		event.target.classList.remove('swapped');
	}
	event.target.classList.remove('swapped');
};

const WorkoutContainer = ({ className, setIsSave }) => {
	const userExercises = useSelector(selectUserExercises);
	const userWorkout = useSelector(selectUserWorkout);
	const userWorkoutExercises = useSelector(selectUserWorkoutExercises);
	const exercises = useSelector(selectExercises);
	const start = useSelector(selectStartWorkout);
	const userId = useSelector(selectUserId);
	const isAddPattern = useSelector(selectIsAddPattern);
	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([server.fetchExercises(), server.fetchMuscleGroups()])
			.then(([exercises, muscleGroups]) => {
				dispatch(setExercises(exercises.res));
				dispatch(setMuscleGroups(muscleGroups.res));
			})
			.catch((err) => {
				dispatch(setError(err.message));
				setTimeout(() => {
					dispatch(resetError());
				}, [5000]);
			});

		document.addEventListener('dragstart', dragStart);
		document.addEventListener('dragend', dragEnd);

		return () => {
			document.removeEventListener('dragstart', dragStart);
			document.removeEventListener('dragend', dragEnd);
		};
	}, [start]);

	const addNewExercise = () => {
		let findExercises = [];

		dispatch(
			openModal({
				isExercises: true,
				onConfirm: (array) => {
					array.forEach((item) => findExercises.push(findItem(exercises.rows, item)));
					dispatch(
						setUserExercises([
							...userExercises,
							...findExercises.map((item) => ({
								id: Date.now() + item.id,
								exerciseId: item.id,
								name: item.name,
								muscleGroupId: item.muscleGroupId,
								superSet: null,
							})),
						]),
					);
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
		// dispatch(setWorkout());
	};

	const onCancelWorkout = () => {
		dispatch(
			openModal({
				text: isAddPattern
					? 'Отменить создание шаблона?'
					: 'Вы уверены, что хотите завершить трeнировку?',
				isConfirm: true,
				onConfirm: () => {
					dispatch(finishWorkout());
					dispatch(stopWorkout());
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const onSavePattern = () => {
		if (userWorkoutExercises.length === 0 || userExercises.length === 0) {
			dispatch(setError('Заполните упражнения и подходы!'));
			setTimeout(() => {
				dispatch(resetError());
			}, [3000]);
		} else {
			dispatch(
				openModal({
					text: 'Сохранить шаблон?',
					isConfirm: true,
					onConfirm: () => {
						server
							.savePattern(userWorkout, userId, userExercises, userWorkoutExercises)
							.then(({ error }) => {
								if (!error) {
									setIsSave(true);
									dispatch(finishWorkout());
									dispatch(stopWorkout());
								}
								dispatch(setError(error));
								setTimeout(() => {
									dispatch(resetError());
								}, [5000]);
							});
						dispatch(closeModal());
					},
					onCancel: () => dispatch(closeModal()),
				}),
			);
		}
	};

	return (
		<div className={className}>
			<RestTimeTimer />
			{start && (
				<>
					<WorkoutSets />
					<Button className="add-new-exercise-btn" width="250px" onClick={addNewExercise}>
						Добавить упражнение
					</Button>
					{isAddPattern ? (
						<>
							<Button className="cancel-workout-btn" width="250px" onClick={onCancelWorkout}>
								Отменить
							</Button>
							<Button
								style={{ marginBottom: start && '100px' }}
								className="save-workout-btn"
								width="250px"
								onClick={onSavePattern}
							>
								Сохранить
							</Button>
						</>
					) : (
						<Button
							style={{ marginBottom: start && '100px' }}
							className="cancel-workout-btn"
							width="250px"
							onClick={onCancelWorkout}
						>
							Отменить тренировку
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export const Workout = styled(WorkoutContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	// position: absolute;
	position: relative;
	width: 100%;
	z-index: 1;
	animation: scale 0.3s linear;

	@keyframes scale {
		0% {
			margin-top: -150px;
			z-index: -1;
			// position: absolute;
		}
		50% {
			margin-top: -75px;
			z-index: -1;
			// position: absolute;
		}
		100% {
			margin-top: 0px;
			z-index: -1;
			// position: absolute;
		}
	}

	.superset-container {
		// overflow: hidden;
		background-color: transparent;
		margin-bottom: 10px;
		margin-top: -10px;
		padding-top: 10px;
		transition: 0.3s;
		animation: scale 0.5s linear;
		border-radius: 20px;
	}
	.superset-container .card:last-child {
		border: none;
		border-radius: 0 0 20px 20px;
	}
	.superset-container .card:first-child {
		border-radius: 20px 20px 0 0;
	}
	.superset-container .card {
		border-bottom: 2px solid #393939;
	}

	.card {
		cursor: grab;
	}
	.card:active {
		overflow: visible;
		cursor: grabbing;
	}
	.card {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.card.dragging {
		opacity: 0.5;
		transform: scale(0.9);
	}

	.cancel-workout-btn {
		color: red;
		background-color: #222222;

		&:hover {
			color: black;
			background-color: #ee3434;
		}
	}

	.save-workout-btn {
		margin-top: 10px;
		color: #3eb942;
		background-color: #222222;

		&:hover {
			color: black;
			background-color: #3eb942;
		}
	}

	.add-new-exercise-btn {
		// color: red;
		background-color: #222222;
		margin-bottom: 10px;

		&:hover {
			background-color: #393939;
		}
	}
`;
