import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectExerciseInfo } from '../../../../../reducers';
import { TYPE } from '../../../../../constants/infoTypesConstants';

const ExerciseInfoCardContainer = ({ className, exerciseState }) => {
	const exerciseInfoState = useSelector(selectExerciseInfo);
	let exerciseInfoImg = exerciseInfoState.filter((item) => item.type === TYPE.IMAGE);
	let exerciseInfoText = exerciseInfoState.filter((item) => item.type === TYPE.TEXT);

	return (
		<div className={className}>
			<div style={{ display: 'flex' }}>
				{exerciseInfoImg.map(({ id, description }) => (
					<img
						key={id}
						className="exercise-info-modal-image"
						src={process.env.REACT_APP_API_URL + '/' + description}
					/>
				))}
			</div>
			<div className="exercise-info-modal-description">
				{exerciseState.description || 'Добавьте описание для упражнения в режиме редактирования...'}
			</div>
			<div className="exercise-info-modal-instruction">
				<div style={{ fontSize: '23px' }}>Инструкция:</div>
				{exerciseInfoText.length === 0 && (
					<div style={{ opacity: '0.6', textAlign: 'left', marginTop: '10px' }}>
						Для данного упражнения не создана инструкция. Добавьте её в режиме редактирования.
					</div>
				)}
				{exerciseInfoText.length > 0 && (
					<ol style={{ opacity: '0.6', textAlign: 'left' }}>
						{exerciseInfoText.map(({ id, description }) => (
							<li className="exercise-info-modal-instruction-item" key={id}>
								{description}
							</li>
						))}
					</ol>
				)}
			</div>
		</div>
	);
};

export const ExerciseInfoCard = styled(ExerciseInfoCardContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 640px;
	.exercise-info-modal-image {
		margin: 10px;
		object-fit: cover;
		width: 200px;
		height: 200px;
		border-radius: 10px;
	}

	.exercise-info-modal-instruction {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
	.exercise-info-modal-description {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		border-top: 3px solid #393939;
		border-bottom: 3px solid #393939;
		padding: 20px 0;
		margin: 10px;
		opacity: 0.6;
	}
	.exercise-info-modal-instruction-item {
		font-size: 18px;
		margin-bottom: 5px;
		word-break: break-all;
	}
`;
