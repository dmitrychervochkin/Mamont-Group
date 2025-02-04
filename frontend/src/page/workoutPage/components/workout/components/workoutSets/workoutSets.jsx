import styled from 'styled-components';
import { groupArrays } from '../../../../../../utils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserExercises, setUserExercises } from '../../../../../../reducers';
import { WorkoutSetsCard } from './components/workoutSetsCard/workoutSetsCard';

const WorkoutSetsContainer = ({ className }) => {
	const [swapElement, setSwapElement] = useState(null);
	const [mergedExercises, setMergedExercises] = useState([]);
	const userExercises = useSelector(selectUserExercises);
	const dispatch = useDispatch();

	const dragEnter = (event) => {
		if (event.target.dataset.id !== undefined) {
			setSwapElement(Number(event.target.dataset.id));
			event.target.style.borderTop = '100px solid #141414';
		}
		event.currentTarget.querySelector('.card').classList.add('drop');
	};

	const dragLeave = (event) => {
		if (event.target.dataset.id !== undefined) {
			setSwapElement(Number(event.target.dataset.id));
			event.target.style.borderTop = '1px solid #141414';
			event.target.classList.add('swapped');
		}
		event.currentTarget.classList.remove('drop');
	};

	const allowDrop = (event) => {
		event.preventDefault();
	};

	const drag = (event) => {
		event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
	};

	const drop = (event) => {
		let userExercisesWithSupersets = groupArrays(userExercises, {
			toReturn: 'array',
			filteredBy: 'superSet',
		});

		const id = Number(event.dataTransfer.getData('text/plain'));
		event.currentTarget.querySelector('.card').classList.remove('drop');
		document.querySelectorAll('.card').forEach((item) => (item.style.borderTop = '0px solid #222222'));
		document.querySelectorAll('.card').forEach((item) => item.classList.remove('swapped'));
		event.preventDefault();

		const swapElements = (array, index1, index2) => {
			[array[index1], array[index2]] = [array[index2], array[index1]];
		};

		let newArray = [...userExercisesWithSupersets];
		for (let i in userExercisesWithSupersets) {
			if (
				userExercisesWithSupersets[i].id === id ||
				userExercisesWithSupersets[i][0]?.superSet === id
			) {
				for (let j in userExercisesWithSupersets) {
					if (
						userExercisesWithSupersets[j].id === swapElement ||
						userExercisesWithSupersets[j][0]?.superSet === swapElement
					) {
						swapElements(newArray, i, j);
					}
				}
			}
		}

		console.log(newArray);

		dispatch(setUserExercises(newArray.flat()));
	};

	return (
		<div
			className={className}
			data-column="exercises"
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDragOver={allowDrop}
			onDrop={drop}
		>
			{/* <div className="exercise-sets-container"> */}
			{groupArrays(userExercises, {
				toReturn: 'array',
				filteredBy: 'superSet',
			}).map((item) =>
				Array.isArray(item) ? (
					<div
						className="superset-container card"
						key={item[0].superSet}
						draggable={'true'}
						data-id={item[0].superSet}
						onDragStart={drag}
						style={{ boxShadow: '0 0 10px 5px #141414' }}
					>
						{item.map((exercise) => (
							<WorkoutSetsCard
								key={exercise.id}
								exercise={exercise}
								// id={exercise.id}
								// exerciseId={exercise.exerciseId}
								// name={exercise.name}
								// superSet={exercise.superSet}
								// typeId={exercise.typeId}
								// types={types}
								exercises={userExercises}
								// setExercises={setExercises}
								mergedExercises={mergedExercises}
								setMergedExercises={setMergedExercises}
								drag={drag}
								swapElement={swapElement}
							/>
						))}
					</div>
				) : (
					<WorkoutSetsCard
						key={item.id}
						exercise={item}
						// id={item.id}
						// exerciseId={item.exerciseId}
						// name={item.name}
						// superSet={item.superSet}
						// typeId={item.typeId}
						// types={types}
						exercises={userExercises}
						// setExercises={setExercises}
						// workoutExercises={userWorkoutExercises}
						mergedExercises={mergedExercises}
						setMergedExercises={setMergedExercises}
						drag={drag}
						swapElement={swapElement}
					/>
				),
			)}
		</div>
		// </div>
	);
};

export const WorkoutSets = styled(WorkoutSetsContainer)`
	// .exercise-sets-container {
	width: 100%;
	z-index: 2;
	// }
`;
