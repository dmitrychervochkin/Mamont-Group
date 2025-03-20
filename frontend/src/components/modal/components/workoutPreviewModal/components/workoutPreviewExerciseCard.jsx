import styled from 'styled-components';
import { server } from '../../../../../bff';
import { useEffect, useState } from 'react';
import { ICON, TYPE } from '../../../../../constants';
import { findItem } from '../../../../../utils';
import { Icon } from '../../../../icon/icon';

const WorkoutPreviewExerciseCardContainer = ({ className, item, exercises, muscleGroups }) => {
	const [exerciseInfo, setExerciseInfo] = useState([]);
	const [isShowDropdown, setIsShowDropdown] = useState(false);
	const exercise = findItem(exercises.rows, item.exerciseId || item[0].exerciseId);

	useEffect(() => {
		server
			.fetchExerciseInfo(Array.isArray(item) ? item[0].exerciseId : item.exerciseId)
			.then(({ res }) => {
				setExerciseInfo(res);
			});
	}, []);

	return (
		<div className={className}>
			<img
				className="workout-preview-img"
				src={
					exerciseInfo[0]?.description &&
					process.env.REACT_APP_API_URL +
						exerciseInfo?.find((item) => item.type === TYPE.IMAGE)?.description
				}
			/>
			<div className="workout-card-description">
				<div style={{ display: 'flex' }}>
					<div>{item.length || 1}</div>
					<span style={{ margin: '0 10px' }}> x </span>
					<div>{exercise?.name}</div>
				</div>
				<div style={{ color: '#a2a2a2' }}>{findItem(muscleGroups, exercise?.muscleGroupId)?.name}</div>
			</div>
			<Icon
				className="workout-preview-info-btn"
				height="30px"
				name={ICON.INFO}
				onClick={() => setIsShowDropdown(!isShowDropdown)}
			/>
			<div className="workout-preview-exercise-info">
				<div style={{ margin: '10px 0', fontSize: '18px' }}>{exercise?.name}</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{exerciseInfo.map(
						({ id, description, type }) =>
							type === TYPE.IMAGE && (
								<img
									key={id}
									className="workout-preview-info-img"
									src={process.env.REACT_APP_API_URL + description}
								/>
							),
					)}
				</div>
				{exercise?.description && (
					<div className="workout-preview-exercise-info-description">{exercise?.description}</div>
				)}

				<ol style={{ color: '#a2a2a2', textAlign: 'left' }}>
					{exerciseInfo.map(
						({ id, description, type }) =>
							type === TYPE.TEXT && (
								<li className="workout-preview-instruction-item" key={id}>
									{description}
								</li>
							),
					)}
				</ol>
				{exerciseInfo.filter((item) => item.type === TYPE.TEXT).length === 0 && (
					<div style={{ margin: '20px 0', color: '#a2a2a2' }}>
						Для этого упражнения пока не добавлено описание
					</div>
				)}
			</div>
		</div>
	);
};

export const WorkoutPreviewExerciseCard = styled(WorkoutPreviewExerciseCardContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 0px;

	.workout-preview-img {
		height: 50px;
		width: 50px;
	}
	.workout-card-description {
		width: 150px;
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
	.workout-preview-exercise-info {
		opacity: 0;
		transition: opacity 0.5s;
		position: absolute;
		width: 300px;
		// height: 500px;
		background-color: #646464;
		right: -300px;
		top: 0;
		border-radius: 20px;
		box-shadow: 0 0 5px 1px #393939;
	}
	.workout-preview-info-btn {
		&:hover ~ .workout-preview-exercise-info {
			opacity: 1;
		}
	}
	.workout-preview-info-img {
		width: 80px;
		height: 80px;
		margin: 10px 5px;
		border-radius: 10px;
	}
	.workout-preview-exercise-info-description {
		font-size: 15px;
		padding: 10px 0;
		background-color: #39393970;
		color: #a2a2a2;
	}
	.workout-preview-instruction-item {
		margin: 5px 0;
	}
`;
