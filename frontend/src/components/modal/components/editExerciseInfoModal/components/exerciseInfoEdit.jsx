import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectExerciseInfo, setExercise, setExerciseInfo } from '../../../../../reducers';
import { Input } from '../../../../input/input';
import { Icon } from '../../../../icon/icon';
import { ICON } from '../../../../../constants';
import { useState } from 'react';
import { useEffect } from 'react';
import { server } from '../../../../../bff';
import { TYPE } from '../../../../../constants/infoTypesConstants';

const ExerciseInfoEditContainer = ({ className, exerciseState, exerciseInfoState, exerciseInfoImg }) => {
	const dispatch = useDispatch();
	const [exerciseInfoText, setExerciseInfoText] = useState([]);
	const [addedFiles, setAddedFiles] = useState([]);

	useEffect(() => {
		setExerciseInfoText(exerciseInfoState.filter((item) => item.type === 'TEXT'));
	}, [exerciseInfoState]);

	const addNewdescriptionHandler = () => {
		dispatch(
			setExerciseInfo([
				...exerciseInfoState,
				{
					id: Date.now().toString(),
					description: '',
					type: 'TEXT',
					exerciseId: exerciseState.id,
				},
			]),
		);
	};

	const onInputdescriptionChange = (value, id) => {
		dispatch(
			setExerciseInfo(
				exerciseInfoState.map((item) => (item.id === id ? { ...item, description: value } : item)),
			),
		);
	};

	const ondescriptionInfoChange = (value) => {
		dispatch(setExercise({ ...exerciseState, description: value }));
	};

	const onExerciseInfoDelete = (id) => {
		dispatch(setExerciseInfo([...exerciseInfoState.filter((item) => item.id !== id)]));
		if (typeof id === 'number') {
			server.removeExerciseInfo(id);
		}
	};
	const onExerciseInfoImgDelete = (id) => {
		dispatch(setExerciseInfo([...exerciseInfoState.filter((item) => item.id !== id)]));
		if (typeof id === 'number') {
			server.removeExerciseInfo(id);
		}
	};

	const onImgInputChange = ({ target }) => {
		setAddedFiles([...addedFiles, target.files[0]]);
		// setOnChange(true);
		let reader = new FileReader();
		// setAddedFile(true);
		reader.onload = () => {
			let output = document.getElementById('preview-modal-' + target.files[0].name);
			output.src = reader.result;
			output.style.width = '200px';
			output.style.height = '200px';
		};

		dispatch(
			setExerciseInfo([
				...exerciseInfoState,
				{
					id: String(Date.now()),
					img: target.files[0],
					exerciseId: exerciseState.id,
					type: TYPE.IMAGE,
				},
			]),
		);
		reader.readAsDataURL(target.files[0]);
	};

	const onRemoveFile = (name) => {
		setAddedFiles([...addedFiles.filter((item) => item.name !== name)]);
		dispatch(setExerciseInfo([...exerciseInfoState.filter((item) => item.img.name !== name)]));
	};

	return (
		<div className={className}>
			<div style={{ display: 'flex', alignItems: 'center', height: '220px' }}>
				{exerciseInfoImg.map(
					({ id, description }) =>
						typeof id === 'number' && (
							<div
								key={id}
								className="exercise-info-img-container"
								style={{ position: 'relative' }}
							>
								<img
									key={id}
									className="exercise-info-modal-image"
									src={process.env.REACT_APP_API_URL + description}
								/>
								<Icon
									className="exercise-info-img-btn"
									style={{ position: 'absolute', top: '0', right: '0', margin: '10px' }}
									name={ICON.CROSS}
									onClick={() => onExerciseInfoImgDelete(id)}
								/>
							</div>
						),
				)}
				{addedFiles.map(({ name }) => (
					<div
						className="img-preview-container-modal"
						style={{ display: !addedFiles[0] && 'none', position: 'relative', margin: '10px' }}
					>
						<img
							id={'preview-modal-' + name}
							style={{ borderRadius: '10px', border: '2px solid #646464' }}
						/>
						<Icon
							name={ICON.CROSS}
							height="30px"
							onClick={() => onRemoveFile(name)}
							style={{ position: 'absolute', top: '0', right: '0' }}
						/>
					</div>
				))}

				{exerciseInfoImg.length < 3 && (
					<div className="exercise-info-modal-add-new-img">
						<div style={{ marginTop: '7px' }}>+</div>
						<input
							id="add-img-input-modal"
							type="file"
							accept="image/png, image/jpg, image/jpeg"
							onChange={(event) => onImgInputChange(event)}
						/>
					</div>
				)}
			</div>
			<div className="exercise-info-modal-description">
				<Input
					width="100%"
					placeholder={
						exerciseState.description ||
						'Добавьте описание для упражнения в режиме редактирования...'
					}
					value={exerciseState.description}
					onChange={(e) => ondescriptionInfoChange(e.target.value)}
				/>
			</div>
			<div className="exercise-info-modal-instruction">
				<div style={{ fontSize: '23px' }}>Инструкция:</div>
				{exerciseInfoText.length === 0 && (
					<div style={{ opacity: '0.6', textAlign: 'left', margin: '10px 0 15px 0' }}>
						Для данного упражнения не создана инструкция. Добавьте её в режиме редактирования.
					</div>
				)}
				{exerciseInfoText.length > 0 && (
					<ol style={{ opacity: '0.6', textAlign: 'left', width: '100%' }}>
						{exerciseInfoText.map(({ id, description }) => (
							<div key={id} style={{ display: 'flex' }}>
								<li className="exercise-info-modal-instruction-item">
									<input
										id={id}
										className="exercise-info-modal-instruction-input"
										value={description}
										placeholder="Укажите инструкцию для упражнения..."
										onChange={(e) => onInputdescriptionChange(e.target.value, id)}
									/>
								</li>
								<Icon
									height="25px"
									margin="0 0 8px 10px"
									name={ICON.CROSS}
									onClick={() => onExerciseInfoDelete(id)}
								/>
							</div>
						))}
					</ol>
				)}
				<div className="add-new-description-btn" onClick={addNewdescriptionHandler}>
					<Icon inactive="true" name={ICON.ADD} margin="0 15px 0 0" />
					<div>Добавить описание</div>
				</div>
			</div>
		</div>
	);
};

export const ExerciseInfoEdit = styled(ExerciseInfoEditContainer)`
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
		transition: opacity 0.3s;
	}
	.exercise-info-img-container {
		&:hover:hover > .exercise-info-modal-image {
			opacity: 0.7;
		}
	}
	#add-img-input-modal {
		opacity: 0;
		width: 100px;
		height: 100px;
		position: absolute;
		top: 0;
		left: 0;

		&:hover {
			cursor: pointer;
		}
	}

	#preview-modal {
		width: 200px;
		height: 200px;
	}
	// #add-img-input[type='file'] {
	// 	width: 100px;
	// }
	// #add-img-input[type='file']::file-selector-button {
	// 	// opacity: 0;
	// 	width: 100px;
	// 	height: 100px;

	// 	border: none;
	// 	background-color: #393939;
	// 	border: dashed 2px #646464;
	// 	border-radius: 10px;
	// 	color: #fff;
	// 	cursor: pointer;
	// 	transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
	// }
	// #add-img-input[type='file']::file-selector-button:hover {
	// 	background-color: #646464;
	// 	border: dashed 2px #a2a2a2;
	// }

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
		width: 100%;
		font-size: 18px;
		margin-bottom: 5px;
	}
	.exercise-info-modal-add-new-img {
		height: 100px;
		width: 100px;
		background-color: #393939;
		margin: 10px;
		border-radius: 10px;
		font-size: 60px;
		font-weight: 200;
		transition: 0.3s;
		position: relative;

		&:hover {
			transition: 0.3s;
			// opacity: 0.8;
			background-color: #646464;
			cursor: pointer;
		}
	}
	.exercise-info-modal-instruction-input {
		height: 40px;
		width: 100%;
		border-radius: 10px;
		background-color: #393939;
		border: none;
		padding: 5px 20px;
		font-size: 15px;
		color: white;
		outline: none;
	}
	.add-new-description-btn {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: center;
		background-color: #393939;
		border-radius: 10px;
		padding: 5px;
		transition: opacity 0.3s;

		&:hover {
			// transition: opacity 0.3s;
			cursor: pointer;
			opacity: 0.8;
		}
	}
`;
