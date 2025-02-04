import styled from 'styled-components';
import { Button } from '../../../button/button';
import { Icon } from '../../../icon/icon';
import { ICON, TYPE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserWorkout,
	selectUserWorkoutExercises,
	setUserExercises,
	setUserWorkoutExercises,
} from '../../../../reducers';
import { findItem, findLastSet } from '../../../../utils';
import { server } from '../../../../bff';
import { useEffect, useState } from 'react';
import { WorkoutPreviewExerciseCard } from './components/workoutPreviewExerciseCard';
import { Loader } from '../../../loader/loader';

const WorkoutPreviewModalContainer = ({ className, onConfirm, onCancel }) => {
	const workout = useSelector(selectUserWorkout);
	const dispatch = useDispatch();
	const workoutExercises = useSelector(selectUserWorkoutExercises);
	const [isLoading, setIsLoading] = useState(false);
	const [exercises, setExercises] = useState([]);
	const [types, setTypes] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		server.fetchPatternExercises(workout.id).then(({ res }) => dispatch(setUserExercises(res)));
		server
			.fetchPatternWorkoutExercises(workout.id)
			.then(({ res }) => dispatch(setUserWorkoutExercises(res)));
		server.fetchExercises().then(({ res }) => setExercises(res));
		server.fetchTypes().then(({ res }) => setTypes(res));
		setTimeout(() => {
			setIsLoading(false);
		}, [500]);
	}, []);

	return (
		<div className={className}>
			<div>
				<div className="workout-preview-header">
					<div style={{ fontSize: '20px' }}>{workout.name}</div>
					<Icon name={ICON.CROSS} onClick={onCancel} />
				</div>
				<div className="workout-preview-discription">
					<div style={{ fontSize: '16px', color: '#646464' }}>
						{workout.discription === null ? 'Нет описания' : workout.discription}
					</div>
				</div>
			</div>
			<div className="workout-preview-exercises">
				{isLoading ? (
					<div style={{ position: 'relative', top: '-20px' }}>
						<Loader />
					</div>
				) : (
					findLastSet(workoutExercises, workout.id).map((item) => (
						<WorkoutPreviewExerciseCard
							key={item.id || item[0].id}
							item={item}
							types={types}
							exercises={exercises}
							setIsLoading={setIsLoading}
						/>
					))
				)}
			</div>
			<Button className="modal-preview-btn" onClick={onConfirm}>
				Начать тренировку
			</Button>
		</div>
	);
};

export const WorkoutPreviewModal = styled(WorkoutPreviewModalContainer)`
	text-align: center;
	position: relative;
	width: 400px;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 20px 30px;
	min-height: 320px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.workout-preview-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.workout-preview-discription {
		border-bottom: 2px solid #393939;
		border-top: 2px solid #393939;
		padding: 10px 0;
		margin-top: 10px;
	}
	.workout-preview-exercises {
		// min-height: 100px;
	}
	// .modal-preview-btn {
	// 	position: absolute;
	// 	margin: 20px 30px;
	// 	width: 340px;
	// 	bottom: 0;
	// 	left: 0;
	// }
`;
