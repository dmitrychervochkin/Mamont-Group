import styled from 'styled-components';
import { WorkoutSet } from './components/workoutSet';
import { WorkoutTableTitle } from './components/workoutTableTitle';
import { Component, useEffect, useRef, useState } from 'react';
import { Icon } from '../../../../../../../../components';
import { ICON } from '../../../../../../../../constants';
import { useDispatch, useSelector } from 'react-redux';

import {
	closeModal,
	openModal,
	resetExercise,
	selectMuscleGroups,
	selectTypes,
	selectUserExercises,
	selectUserWorkoutExercises,
	setExercise,
	setExercises,
	setUserExercises,
	setUserWorkoutExercises,
	setWorkoutExercises,
} from '../../../../../../../../reducers';
import { findItem, groupArrays } from '../../../../../../../../utils';

const WorkoutSetsCardContainer = ({
	className,
	exercise,
	exercises,
	mergedExercises,
	setMergedExercises,
	drag,
}) => {
	const { id, exerciseId, name, muscleGroupId, userId, superSet } = exercise;
	const [isSuperSet, setIsSuperSet] = useState(!!superSet);
	const [calories, setCalories] = useState(0);
	const [hover, setHover] = useState(false);
	const userExercises = useSelector(selectUserExercises);
	const muscleGroups = useSelector(selectMuscleGroups);
	const userWorkoutExercises = useSelector(selectUserWorkoutExercises);
	const dispatch = useDispatch();

	const getPrevValue = (prevSet, userExerciseId) => {
		let prevValueExercise = userWorkoutExercises.find(
			(item) => item.set === prevSet - 1 && item.userExerciseId === userExerciseId,
		);
		if (prevValueExercise?.weight && prevValueExercise?.reps) {
			return `${prevValueExercise?.weight}кг x ${prevValueExercise?.reps}`;
		} else if (prevValueExercise?.weight && !prevValueExercise?.reps) {
			return prevValueExercise?.weight + 'кг';
		} else if (!prevValueExercise?.weight && prevValueExercise?.reps) return prevValueExercise?.reps;
	};

	const onDeleteExercise = () => {
		dispatch(
			setUserWorkoutExercises([...userWorkoutExercises.filter((item) => item.userExerciseId !== id)]),
		);
		dispatch(setUserExercises([...exercises.filter((item) => item.id !== id)]));
	};

	const onAddNewSet = () => {
		const currentExercisesCount =
			userWorkoutExercises?.filter((item) => item.userExerciseId === id).length + 1;

		dispatch(
			setUserWorkoutExercises([
				...userWorkoutExercises,
				{
					id: Date.now(),
					userExerciseId: id,
					exerciseId: exerciseId,
					reps: '',
					set: currentExercisesCount,
					weight: '',
				},
			]),
		);
	};

	const onExerciseNameHandler = () => {
		dispatch(setExercise({ id: exerciseId, name, userId, muscleGroupId }));

		dispatch(
			openModal({
				isEditExerciseInfo: true,
				onCancel: () => {
					dispatch(closeModal());
					dispatch(resetExercise());
				},
			}),
		);
		// setIsSaveExercise(false);
	};

	const onMergedHandler = () => {
		setIsSuperSet(!isSuperSet);

		let userExerciseCopy = [...userExercises];

		if (superSet !== null) {
			setMergedExercises([...mergedExercises.filter((item) => item !== id)]);
			userExerciseCopy = userExerciseCopy.map((item) =>
				item.id === id ? { ...item, superSet: null } : item,
			);
		} else {
			setMergedExercises([...mergedExercises, id]);
			for (let i in userExercises) {
				if (userExercises[i].id === id) {
					if (mergedExercises.includes(userExercises[Number(i) + 1]?.id)) {
						userExerciseCopy = userExerciseCopy.map((item) =>
							item.id === id
								? { ...item, superSet: userExercises[Number(i) + 1]?.superSet }
								: item,
						);
					} else if (mergedExercises.includes(userExercises[Number(i) - 1]?.id)) {
						userExerciseCopy = userExerciseCopy.map((item) =>
							item.id === id
								? { ...item, superSet: userExercises[Number(i) - 1]?.superSet }
								: item,
						);
					} else {
						userExerciseCopy = userExerciseCopy.map((item) =>
							item.id === id ? { ...item, superSet: Date.now() } : item,
						);
					}
				}
			}
		}

		dispatch(setUserExercises(userExerciseCopy));
	};

	return (
		<div
			className={className + ' card'}
			style={{
				borderRadius:
					isSuperSet && userExercises.filter((item) => item.superSet === superSet).length >= 2
						? 'none'
						: '20px',
				boxShadow: isSuperSet ? 'none' : '0 0 10px 5px #141414',
				margin:
					isSuperSet && userExercises.filter((item) => item.superSet === superSet).length >= 2
						? '0'
						: '0 0 10px 0',
				animation: isSuperSet ? 'none' : 'scale 0.3s linear',
				borderLeft:
					isSuperSet &&
					(userExercises.filter((item) => item.superSet === superSet).length >= 2
						? '5px solid #3eb942'
						: '5px solid #a2a2a2'),
			}}
			draggable={isSuperSet ? 'false' : 'true'}
			data-id={isSuperSet ? null : id}
			onDragStart={isSuperSet ? null : drag}
		>
			<div className="exercise-name">
				<div style={{ display: 'flex' }}>
					<Icon
						height="25px"
						margin="0 10px 0 0"
						name={ICON.MERGE}
						onClick={onMergedHandler}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					/>

					<div
						style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
						onClick={onExerciseNameHandler}
					>
						{name}
						<div
							style={{
								padding: '5px 10px',
								borderRadius: '10px',
								fontSize: '16px',
								transition: '0.3s',
								opacity: hover ? '1' : '0',
								position: 'absolute',
								backgroundColor: '#646464',
								visibility: hover ? 'visible' : 'hidden',
							}}
						>
							Добавить упражнение в суперсет
						</div>
						<span style={{ color: '#a2a2a2', fontSize: '16px', marginLeft: '10px' }}>
							({findItem(muscleGroups, muscleGroupId)?.name})
						</span>
					</div>
				</div>

				<Icon height="30px" name={ICON.DELETE} onClick={onDeleteExercise} />
			</div>
			<WorkoutTableTitle style="zIndex: 6, position: absolute" />
			<div className="workout-exercises-container">
				{userWorkoutExercises
					.map((item) => item)
					.sort((a, b) => a.set - b.set)
					.map(
						({
							id: uniqueId,
							userExerciseId,
							exerciseId: workoutExerciseId,
							reps,
							set,
							weight,
						}) =>
							id === userExerciseId && (
								<WorkoutSet
									key={uniqueId}
									id={uniqueId}
									reps={reps}
									exerciseId={workoutExerciseId}
									userExerciseId={userExerciseId}
									set={set}
									weight={weight}
									workoutExercises={userWorkoutExercises}
									calories={calories}
									setCalories={setCalories}
									prev={getPrevValue(set, userExerciseId)}
								/>
							),
					)}
			</div>
			<div className="add-new-set-btn-container">
				<span className="add-new-set-btn" onClick={onAddNewSet}>
					+
				</span>
				<div style={{ fontSize: '15px', width: '155px' }}>
					<span style={{ color: '#646464' }}>Потрачено ккал: </span>
					<span style={{ color: '#3eb942' }}>{calories}</span>
				</div>
			</div>
		</div>
	);
};

export const WorkoutSetsCard = styled(WorkoutSetsCardContainer)`
	width: 100%;
	z-index: 5;
	background-color: #222222;
	overflow-y: hidden;
	flex: 1;
	position: relative;
	z-index: 5;
	padding: 30px;

	.workout-exercises-container {
		// z-index: 4;
	}
	.add-new-set-btn-container {
		display: flex;
		align-items: flex-start;
		margin-top: 5px;
		justify-content: space-between;
		align-items: flex-end;
	}
	.add-new-set-btn {
		height: 40px;
		width: 40px;
		background-color: #393939;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		font-size: 30px;
		transition: filter 0.3s;
		&:hover {
			filter: brightness(120%);
			cursor: pointer;
		}
	}
	.workout-exercise-sets {
	}
	.exercise-name {
		font-size: 20px;
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
