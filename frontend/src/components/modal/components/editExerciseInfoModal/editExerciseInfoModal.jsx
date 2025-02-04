import styled from 'styled-components';
import { Button } from '../../../button/button';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectExercise,
	selectExerciseInfo,
	selectIsLoading,
	selectRoleId,
	setExercise,
	setExerciseInfo,
} from '../../../../reducers';
import { ICON, ROLE } from '../../../../constants';
import { Icon } from '../../../icon/icon';
import { ExerciseInfoCard } from './components/exerciseInfoCard';
import { ExerciseInfoEdit } from './components/exerciseInfoEdit';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { TYPE } from '../../../../constants/infoTypesConstants';
import { useMatch } from 'react-router-dom';
import { Loader } from '../../../loader/loader';

const EditExerciseInfoModalContainer = ({ className, text, onConfirm, onCancel }) => {
	const [isEditExerciseInfo, setIsEditExerciseInfo] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const adminPage = useMatch('/admin');
	const userRoleId = useSelector(selectRoleId);

	const dispatch = useDispatch();
	const exerciseState = useSelector(selectExercise);
	let exerciseInfoState = useSelector(selectExerciseInfo);

	console.log(exerciseInfoState);

	let exerciseInfoImg = exerciseInfoState.filter((item) => item.type === TYPE.IMAGE);

	useEffect(() => {
		setIsLoading(true);
		server.fetchExerciseInfo(exerciseState.id).then(({ res }) => {
			dispatch(setExerciseInfo(res));
			setTimeout(() => {
				setIsLoading(false);
			}, [300]);
		});
	}, [isEditExerciseInfo]);

	const onExerciseInfoSave = () => {
		exerciseInfoState.forEach((item) =>
			typeof item.id === 'string'
				? server
						.saveExerciseInfo({
							discription: item.type === TYPE.IMAGE ? item.img : item.discription,
							exerciseId: item.exerciseId,
							type: item.type,
						})
						.then(() => setIsEditExerciseInfo(false))
				: server.saveExerciseInfo({ ...item }),
		);

		server
			.saveExercise({ ...exerciseState, discription: exerciseState.discription })
			.then(() => setIsEditExerciseInfo(false));

		onConfirm();
		setIsEditExerciseInfo(false);
	};

	return (
		<div className={className}>
			<>
				<div className="exercise-info-modal-header">
					{isEditExerciseInfo ? (
						<Icon name={ICON.SAVE} onClick={onExerciseInfoSave} />
					) : adminPage && userRoleId === ROLE.ADMIN ? (
						<Icon name={ICON.EDIT} onClick={() => setIsEditExerciseInfo(true)} />
					) : (
						<div></div>
					)}
					{isLoading ? (
						<div className="exercise-info-sceleton"></div>
					) : (
						<div style={{ fontSize: '20px', margin: '20px 0' }}>{exerciseState.name}</div>
					)}
					<Icon name={ICON.CROSS} onClick={onCancel} />
				</div>
				{isLoading ? (
					<div
						style={{
							position: 'relative',
							width: '100%',
							top: '150px',
						}}
					>
						<Loader />
					</div>
				) : isEditExerciseInfo ? (
					<ExerciseInfoEdit
						exerciseState={exerciseState}
						exerciseInfoState={exerciseInfoState}
						exerciseInfoImg={exerciseInfoImg}
					/>
				) : (
					<ExerciseInfoCard exerciseState={exerciseState} />
				)}
			</>
		</div>
	);
};

export const EditExerciseInfoModal = styled(EditExerciseInfoModalContainer)`
	text-align: center;
	position: relative;
	width: 700px;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 5px 30px 20px 30px;
	min-height: 500px;

	.exercise-info-modal-header {
		display: flex;
		justify-content: space-between;
		border-bottom: 3px solid #393939;
		margin-bottom: 10px;
	}

	.exercise-info-sceleton {
		border-radius: 5px;
		width: 200px;
		margin: 20px 0;
		height: 24px;
		background-color: #393939;
	}
`;
