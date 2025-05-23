import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { server } from '../../../../../bff';
import { useDispatch } from 'react-redux';
import {
	closeModal,
	openModal,
	resetExercise,
	selectExercise,
	selectExerciseInfo,
	setExercise,
	setExerciseInfo,
} from '../../../../../reducers';
import { useEffect, useState } from 'react';
import { EditExercise } from './editExercise';
import { useSelector } from 'react-redux';
import { TYPE } from '../../../../../constants/infoTypesConstants';

const ExerciseCardContainer = ({
	className,
	id,
	name,
	user,
	muscleGroup,
	userId,
	description,
	setIsDeleteExercise,
	isSaveExercise,
	setIsSaveExercise,
	muscleGroups,
}) => {
	const dispatch = useDispatch();
	const [isEditExercise, setIsEditExercise] = useState(false);
	const [exerciseImg, setExerciseImg] = useState(false);

	useEffect(() => {
		server.fetchExerciseInfo(id).then(({ res }) => {
			setExerciseImg(res.find((item) => item.type === TYPE.IMAGE));
		});
	}, []);

	const onExerciseRemove = (exerciseId) => {
		dispatch(
			openModal({
				text: 'Вы уверены, что хотите удалить упражнение?',
				isConfirm: true,
				onConfirm: () => {
					server.removeExercise(exerciseId).then(() => {
						setIsDeleteExercise(true);
					});
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
		setIsDeleteExercise(false);
	};

	const exerciseInfoHandler = () => {
		dispatch(setExercise({ id, name, userId, muscleGroupId: muscleGroup.id, description: description }));

		dispatch(
			openModal({
				isEditExerciseInfo: true,
				onConfirm: () => {
					setIsSaveExercise(true);
				},
				onCancel: () => {
					dispatch(closeModal());
					dispatch(resetExercise());
				},
			}),
		);
	};

	return (
		<div className={className}>
			{isEditExercise ? (
				<EditExercise
					id={id}
					muscleGroups={muscleGroups}
					name={name}
					description={description}
					userId={user.id}
					img={exerciseImg}
					muscleGroup={muscleGroup}
					setIsEditExercise={setIsEditExercise}
					setIsSaveExercise={setIsSaveExercise}
				/>
			) : (
				<>
					<div className="left-side-exercise-container">
						<div>
							{/* <img
								id={id}
								className="exercise-img"
								src={
									exerciseImg?.description &&
									process.env.REACT_APP_API_URL + '/static/' + exerciseImg?.description
								}
								alt={name ? `Изображение упражнения ${name}` : ''}
							/> */}

							<Icon name={ICON.BICEPSGRAY} className="exercise-img" />
						</div>
						<div className="exercise-info">
							<div className="exercise-name">
								<Icon size="small" name={ICON.EDIT} onClick={() => setIsEditExercise(true)} />
								{name}
							</div>
							<div className="exercise-type">{muscleGroup?.name}</div>
							<div className="exercise-user">
								Пользователь: {user?.login}
								<span style={{ fontSize: '14px', margin: '0 10px 0 0' }}>ID: {id}</span>
							</div>
						</div>
					</div>
					<div className="exercise-icons">
						<Icon height="30px" name={ICON.CROSS} onClick={() => onExerciseRemove(id)} />
						<Icon reverse="true" height="27px" name={ICON.INFO} onClick={exerciseInfoHandler} />
					</div>
				</>
			)}
		</div>
	);
};

export const ExerciseCard = styled(ExerciseCardContainer)`
	display: flex;
	padding: 10px 0px;
	border-bottom: 1px solid #393939;
	justify-content: space-between;

	.exercise-img {
		object-fit: fill;
		width: 100px;
		height: 100px;
		border-radius: 10px;
		background-color: #393939;
	}
	.exercise-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20px;
		font-size: 14px;
		font-weight: 300;
		width: 100%;
	}
	.exercise-name {
		display: flex;
		gap: 15px;
		align-items: center;
		font-size: 20px;
		font-weight: 400;
		width: 100%;
	}
	.exercise-user {
		opacity: 0.6;
		font-style: italic;
		display: flex;
		justify-content: space-between;
	}
	.left-side-exercise-container {
		display: flex;
		width: 100%;
		// justify-content: flex-start;
	}
	.exercise-type {
		opacity: 0.6;
	}
	.exercise-icons {
		margin: 0px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
`;
