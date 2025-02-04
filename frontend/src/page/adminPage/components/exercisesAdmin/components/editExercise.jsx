import styled from 'styled-components';
import { Icon, Input } from '../../../../../components';
import { useState } from 'react';
import { ICON } from '../../../../../constants';
import { server } from '../../../../../bff';
import { TYPE } from '../../../../../constants/infoTypesConstants';
import { useDispatch } from 'react-redux';
import { resetError, setError } from '../../../../../reducers';

const EditExerciseContainer = ({
	className,
	types,
	id,
	name,
	img,
	discription,
	type,
	setIsEditExercise,
	setIsSaveExercise,
}) => {
	const [editingExercise, setEditingExercise] = useState({
		id: id,
		name: name,
		img: img?.discription,
		discription: discription,
		typeId: type?.id,
	});

	const [typeValue, setTypeValue] = useState(type?.name);
	const [addedFile, setAddedFile] = useState(true);
	const [onChange, setOnChange] = useState(false);
	const dispatch = useDispatch();

	const onExerciseNameChange = ({ target }) => {
		setOnChange(true);
		setEditingExercise({ ...editingExercise, name: target.value });
	};
	const onTypeChange = ({ target }) => {
		setOnChange(true);
		for (let type in types) {
			if (types[type]?.name === target.value) {
				setTypeValue(types[type]?.name);
				setEditingExercise({ ...editingExercise, typeId: types[type]?.id });
			}
		}
	};

	console.log(editingExercise);

	const onExerciseSave = () => {
		let oldImg = img.discription;
		if (onChange) {
			server
				.saveExerciseInfo({
					id: img.id,
					exerciseId: img.exerciseId,
					type: img.type,
					discription: editingExercise.img,
					oldImg,
				})
				.then(({ error }) => {
					error && dispatch(setError(error));
					setTimeout(() => {
						dispatch(resetError());
					}, [5000]);
				});

			server.saveExercise({ ...editingExercise }).then(() => {
				setIsSaveExercise(true);
			});
		}
		setIsEditExercise(false);
		setOnChange(false);
	};

	const onImgInputChange = ({ target }) => {
		setOnChange(true);
		let reader = new FileReader();
		setAddedFile(true);
		reader.onload = () => {
			let output = document.getElementById('edit-preview');
			output.src = reader.result;
		};
		setEditingExercise({ ...editingExercise, img: target.files[0] });
		reader.readAsDataURL(target.files[0]);
	};

	const onAddedFile = () => {
		setOnChange(true);
		let inputId = document.getElementById('edit-img-input');
		inputId.value = '';
		setAddedFile(false);
	};

	return (
		<div className={className}>
			<div
				className="edit-img-preview-container"
				style={{ display: !addedFile && 'none', position: 'relative' }}
			>
				<img
					src={process.env.REACT_APP_API_URL + img?.discription}
					id="edit-preview"
					style={{ borderRadius: '10px', border: '2px solid #646464' }}
				/>
				<Icon
					name={ICON.CROSS}
					height="30px"
					onClick={() => onAddedFile()}
					style={{ position: 'absolute', top: '0', right: '0' }}
				/>
			</div>
			<input
				id="edit-img-input"
				type="file"
				onChange={(event) => onImgInputChange(event)}
				style={{ display: addedFile && 'none' }}
				accept="image/png, image/jpg, image/jpeg"
			/>
			<div className="edit-exercise-info">
				<Input
					width="300px"
					placeholder="Введите название упражнения..."
					value={editingExercise.name}
					onChange={(e) => onExerciseNameChange(e)}
				/>
				<div className="edit-exercise-type">
					<label style={{ opacity: '0.6' }}>Мышечная группа:</label>
					<select
						className="edit-exercise-type-selector"
						value={typeValue}
						onChange={(e) => onTypeChange(e)}
					>
						{types?.map(({ id, name }) => (
							<option key={id} id={id}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="edit-exercise-icons">
				<Icon height="30px" name={ICON.CROSS} onClick={() => setIsEditExercise(false)} />
				<Icon height="30px" name={ICON.SAVE} onClick={() => onExerciseSave()} />
			</div>
		</div>
	);
};
export const EditExercise = styled(EditExerciseContainer)`
	display: flex;
	justify-content: space-between;
	height: 100%;
	width: 100%;

	.edit-exercise-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		margin-left: 20px;
	}
	.edit-exercise-type {
		display: flex;
		align-items: center;
		padding: 5px 20px;
		font-size: 14px;
		background-color: #393939;
		height: 40px;
		border-radius: 10px;
		width: 300px;
	}
	.edit-exercise-type-selector {
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
	.edit-exercise-type-selector:hover {
		cursor: pointer;
		opacity: 0.8;
		transition: 0.2s;
	}
	.edit-exercise-icons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-right: 10px;
	}
	.edit-img-input {
		height: 100px;
		width: 100px;
		// background-color: #393939;
		// border: dashed 2px #646464;
		// border-radius: 10px;
	}

	#edit-img-input[type='file'] {
		width: 100px;
	}
	#edit-img-input[type='file']::file-selector-button {
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
	#edit-img-input[type='file']::file-selector-button:hover {
		background-color: #646464;
		border: dashed 2px #a2a2a2;
	}
	#edit-preview {
		width: 100px;
		height: 100px;
	}
`;
