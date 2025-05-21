import styled from 'styled-components';
import { groupArrays } from '../../../../../../utils';
import { useRef, useState } from 'react';
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
		event.preventDefault();

		let userExercisesWithSupersets = groupArrays(userExercises, {
			toReturn: 'array',
			filteredBy: 'superSet',
		});

		const draggedId = Number(event.dataTransfer.getData('text/plain'));
		const targetElement = event.target.closest('[data-id]') || event.currentTarget.closest('[data-id]');
		const targetId = targetElement ? Number(targetElement.dataset.id) : NaN;

		if (isNaN(draggedId) || isNaN(targetId)) {
			console.error('Ошибка: некорректные ID');
			return;
		}

		// Убираем классы оформления после drop
		event.currentTarget.querySelector('.card')?.classList.remove('drop');
		document.querySelectorAll('.card').forEach((item) => {
			item.style.borderTop = '0px solid #222222';
			item.classList.remove('swapped');
		});

		let newArray = [...userExercisesWithSupersets];

		let draggedIndex = newArray.findIndex((el) => el.id === draggedId || el[0]?.superSet === draggedId);
		let targetIndex = newArray.findIndex((el) => el.id === targetId || el[0]?.superSet === targetId);

		if (draggedIndex === -1 || targetIndex === -1) {
			console.error('Ошибка: не найдены индексы элементов');
			return;
		}

		// Вставляем dragged перед target
		const [draggedItem] = newArray.splice(draggedIndex, 1); // Удаляем перетаскиваемый элемент
		newArray.splice(targetIndex, 0, draggedItem); // Вставляем его перед target

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
						draggable
						data-id={item[0].superSet}
						onDragStart={drag}
						style={{ boxShadow: '0 0 10px 5px #141414' }}
					>
						{item.map((exercise) => (
							<WorkoutSetsCard
								key={exercise.id}
								exercise={exercise}
								muscleGroupId={exercise.muscleGroupId}
								exercises={userExercises}
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
						muscleGroupId={item.muscleGroupId}
						exercises={userExercises}
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
