import styled from 'styled-components';
import { Heading, Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserWorkout, setUserWorkout } from '../../../../../reducers';
import { useState } from 'react';
import { ICON, INTERFACE } from '../../../../../constants';
import { getScreenWidth } from '../../../../../utils';

const WorkoutTitleContainer = ({ className, name }) => {
	const [isWorkoutNameEdit, setIsWorkoutNameEdit] = useState(true);
	const userWorkout = useSelector(selectUserWorkout);
	const dispatch = useDispatch();

	const onWorkoutNameChange = (e) => {
		dispatch(setUserWorkout({ ...userWorkout, name: e.target.value }));
	};

	return (
		<div className={className} style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '50%' : '40%' }}>
			<div
				style={{
					display: 'flex',
					width: '130px',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span style={{ opacity: '0.4' }}>Тренировка:</span>
				{isWorkoutNameEdit ? (
					<Icon size="small" name={ICON.SAVE} onClick={() => setIsWorkoutNameEdit(false)} />
				) : (
					<Icon size="small" name={ICON.EDIT} onClick={() => setIsWorkoutNameEdit(true)} />
				)}
			</div>
			{isWorkoutNameEdit ? (
				<input
					placeholder="Название..."
					maxLength="18"
					className="workout-name-input"
					onChange={onWorkoutNameChange}
				/>
			) : (
				<Heading>{name || userWorkout?.name}</Heading>
			)}
		</div>
	);
};

export const WorkoutTitle = styled(WorkoutTitleContainer)`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px 0;

	.workout-name-input {
		background-color: transparent;
		border: none;
		outline: none;
		color: white;
		font-size: 35px;
		margin: 0;
		font-weight: 300;
	}
`;
