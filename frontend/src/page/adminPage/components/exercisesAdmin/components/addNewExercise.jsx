import styled from 'styled-components';
import { Icon, Input } from '../../../../../components';
import { ICON, ROLE } from '../../../../../constants';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectUserId, setError } from '../../../../../reducers';
import { server } from '../../../../../bff';
import { TYPE } from '../../../../../constants/infoTypesConstants';

const AddNewExerciseContainer = ({ className, muscleGroups, setIsSaveExercise, setIsAddNewExercise }) => {
	const [addedFile, setAddedFile] = useState(false);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	const [exerciseForAdd, setExerciseForAdd] = useState({
		name: '',
		muscleGroupId: muscleGroups[0]?.id,
		img: '',
		userId: '',
	});
	let inputId = document.getElementById('add-img-input');

	const onImgInputChange = ({ target }) => {
		let reader = new FileReader();
		setAddedFile(true);
		reader.onload = () => {
			let output = document.getElementById('preview');
			output.src = reader.result;
		};
		setExerciseForAdd({ ...exerciseForAdd, img: target.files[0] });
		reader.readAsDataURL(target.files[0]);
	};

	const onNewExerciseSave = () => {
		console.log(exerciseForAdd.img);
		if (exerciseForAdd.name !== '' && exerciseForAdd.muscleGroupId !== '' && exerciseForAdd.img !== '') {
			server
				.saveExercise({
					name: exerciseForAdd.name,
					muscleGroupId: exerciseForAdd.muscleGroupId,
					userId: userId,
					description: null,
				})
				.then(({ res }) => {
					server.saveExerciseInfo({
						exerciseId: res.id,
						description: exerciseForAdd.img,
						type: TYPE.IMAGE,
					});
					setIsSaveExercise(true);
					setIsAddNewExercise(false);
				});
		} else {
			dispatch(setError('Заполните все поля!'));
			setTimeout(() => {
				dispatch(resetError());
			}, [5000]);
		}
	};
	const onMuscleGroupChange = (target) => {
		for (let type in muscleGroups) {
			if (muscleGroups[type].name === target.value) {
				setExerciseForAdd({ ...exerciseForAdd, muscleGroupId: muscleGroups[type].id });
			}
		}
	};

	return (
		<div className={className}>
			<div className="add-img-input">
				<div
					className="img-preview-container"
					style={{ display: !addedFile && 'none', position: 'relative' }}
				>
					<img id="preview" style={{ borderRadius: '10px', border: '2px solid #646464' }} />
					<Icon
						name={ICON.CROSS}
						height="30px"
						onClick={() => {
							setAddedFile(false);
							inputId.value = '';
						}}
						style={{ position: 'absolute', top: '0', right: '0' }}
					/>
				</div>
				<input
					id="add-img-input"
					type="file"
					onChange={(event) => onImgInputChange(event)}
					style={{ display: addedFile && 'none' }}
					accept="image/png, image/jpg, image/jpeg"
				/>
			</div>
			<div className="add-exercise-info">
				<Input
					width="300px"
					placeholder="Введите название упражнения..."
					onChange={(e) => setExerciseForAdd({ ...exerciseForAdd, name: e.target.value })}
				/>
				<div className="add-exercise-type">
					<label style={{ opacity: '0.6' }}>Мышечная группа:</label>
					<select
						className="add-exercise-type-selector"
						onChange={({ target }) => onMuscleGroupChange(target)}
					>
						{muscleGroups.map(({ id, name }) => (
							<option key={id} id={id}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="add-exercise-icons">
				<Icon height="30px" name={ICON.CROSS} onClick={() => setIsAddNewExercise(false)} />
				<Icon height="30px" name={ICON.SAVE} onClick={() => onNewExerciseSave()} />
			</div>
		</div>
	);
};

export const AddNewExercise = styled(AddNewExerciseContainer)`
	display: flex;
	// padding-top: 10px;
	margin-top: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #393939;
	// background-color: #646464;
	height: 110px;

	.add-img-input {
		height: 100px;
		width: 100px;
		// background-color: #393939;
		// border: dashed 2px #646464;
		// border-radius: 10px;
	}
	#add-img-input[type='file'] {
		width: 100px;
	}
	#add-img-input[type='file']::file-selector-button {
		// opacity: 0;
		width: 100px;
		height: 100px;

		border: none;
		background-color: #393939;
		border: dashed 2px #646464;
		border-radius: 10px;
		color: #fff;
		cursor: pointer;
		transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
	}
	#add-img-input[type='file']::file-selector-button:hover {
		background-color: #646464;
		border: dashed 2px #a2a2a2;
	}
	#preview {
		width: 100px;
		height: 100px;
	}
	.add-exercise-info {
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.add-exercise-type {
		display: flex;
		align-items: center;
		padding: 5px 20px;
		font-size: 14px;
		background-color: #393939;
		height: 40px;
		border-radius: 10px;
	}
	.add-exercise-type-selector {
		// background-color: #393939;
		// text-align: center;
		// text-align-last: center;
		height: 25px;
		color: white;
		border: none;
		background-color: transparent;
		appearance: none;
		transition: 0.2s;
		outline: none;
		font-size: 14px;
		margin-left: 10px;
	}
	.add-exercise-type-selector:hover {
		cursor: pointer;
		opacity: 0.8;
		transition: 0.2s;
	}
	.add-exercise-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		align-items: flex-end;
		margin-right: 10px;
	}
`;
