import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	selectExercises,
	selectUserExercises,
	selectUserWorkout,
	selectUserWorkoutExercises,
	selectWorkout,
	selectWorkoutExercises,
} from '../../../reducers';
import { Button } from '../../button/button';

const SuccessModalWindowContainer = ({ className, text, onCancel }) => {
	const userWorkout = useSelector(selectUserWorkout);
	const userExercises = useSelector(selectUserExercises);
	const userWorkoutExercises = useSelector(selectUserWorkoutExercises);

	const weightSum = () => {
		let weight = 0;
		let reps = 0;
		userWorkoutExercises.forEach((item) => {
			weight += Number(item.weight);
			reps += Number(item.reps);
		});
		return weight * reps;
	};

	return (
		<div className={className}>
			<div className="modal-success-header">{text}:</div>
			<div className="modal-success-main">
				<div className="modal-success-string">
					<label className="modal-success-table-title">Тренировка: </label>
					{userWorkout.name}
				</div>
				<div className="modal-success-string">
					<label className="modal-success-table-title">Время: </label>{' '}
					<div>
						{userWorkout.time >= 3600 && (
							<span>{('0' + Math.floor((userWorkout.time / 60 / 60) % 60)).slice(-2)}:</span>
						)}
						<span>{('0' + Math.floor((userWorkout.time / 60) % 60)).slice(-2)}:</span>
						<span>{('0' + Math.floor(userWorkout.time % 60)).slice(-2)}</span>
					</div>
				</div>
				<div className="modal-success-string">
					<label className="modal-success-table-title">Общий поднятый вес: </label>
					{weightSum()} кг
				</div>
				<div className="modal-success-string">
					<label className="modal-success-table-title">Количество подходов: </label>
					{userWorkoutExercises.length}
				</div>
				<div className="modal-success-string">
					<label className="modal-success-table-title">Количество упражнений: </label>
					{userExercises.length}
				</div>
			</div>
			<Button hover="#326834" color="#3EB942" width="100%" onClick={onCancel}>
				Закрыть
			</Button>
		</div>
	);
};

export const SuccessModalWindow = styled(SuccessModalWindowContainer)`
	text-align: center;
	position: relative;
	width: 400px;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 5px 30px 20px 30px;

	.modal-success-header {
		font-size: 25px;
		padding: 20px 0;
		border-bottom: 2px solid #393939;
	}
	.modal-success-main {
		font-size: 18px;
		margin: 20px 0;
		text-align: left;
	}
	.modal-success-table-title {
		opacity: 0.6;
	}
	.modal-success-string {
		display: flex;
		justify-content: space-between;
	}
`;
