import styled from 'styled-components';
import { Search } from '../../../search/search';
import { Icon } from '../../../icon/icon';
import { ICON } from '../../../../constants';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { findItem } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectExercises,
	selectTypes,
	selectUserExercises,
	setExercises,
	setTypes,
} from '../../../../reducers';
import { ModalExercise } from './components/modalExercise';
import { Loader } from '../../../loader/loader';
import { ScrollSlider } from '../../../scrollSlider/scrollSlider';

const AddExercisesModalWindowContainer = ({ className, onCancel, onConfirm }) => {
	const types = useSelector(selectTypes);
	const exercises = useSelector(selectExercises);
	const userExercises = useSelector(selectUserExercises);
	const dispatch = useDispatch(selectExercises);
	const [currentType, setCurrentType] = useState('');
	const [currentExercise, setCurrentExercise] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSearch, setIsSearch] = useState(false);
	const [searchingExercises, setSearchingExercises] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		server.fetchExercises(currentType).then(({ res }) => dispatch(setExercises(res)));
		server.fetchTypes().then(({ res }) => dispatch(setTypes(res)));
		setTimeout(() => {
			setIsLoading(false);
		}, [500]);
	}, [currentType]);

	const onTypeClick = (id) => {
		if (id === currentType) {
			setCurrentType('');
		} else {
			setCurrentType(id);
		}
	};

	const onAddExerciseHandler = () => {
		onConfirm(currentExercise);
	};

	const onExercisesSearch = (name) => {
		setIsSearch(true);
		if (name === '') {
			setIsSearch(false);
		}

		let results = [];
		let exercisesArray = exercises.rows;

		for (let i = 0; i < exercises.rows.length; i++) {
			for (let key in exercises.rows[i]) {
				if (key === 'name') {
					if (exercises.rows[i][key].indexOf(name) !== -1) {
						results.push(exercisesArray[i]);
					}
				}
			}
		}

		setSearchingExercises(results);
	};

	return (
		<div className={className}>
			<div className="header-modal-exercises">
				<Icon height="25px" name={ICON.CROSS} onClick={onCancel} />
				<div className="modal-add-exercises-btn" onClick={onAddExerciseHandler}>
					Добавить ({currentExercise.length})
				</div>
			</div>
			<div style={{ padding: '0 20px', borderBottom: '4px solid #393939' }}>
				<Search onChange={(e) => onExercisesSearch(e.target.value)} />
				<div className="modal-types-container">
					{types?.map(({ id, name }) => (
						<div
							key={id}
							onClick={() => onTypeClick(id)}
							style={{ cursor: 'pointer', opacity: currentType === id ? '1' : '0.6' }}
						>
							{name}
						</div>
					))}
				</div>
			</div>
			<div className="modal-exercises-container">
				{isLoading ? (
					<div
						style={{
							marginTop: '200px',
						}}
					>
						<Loader />
					</div>
				) : (
					(isSearch ? searchingExercises : exercises?.rows)
						.map(({ id, uniqueId, name, img, typeId, userId }) => (
							// currentType === '' ? (
							<ModalExercise
								key={id}
								id={id}
								img={img}
								name={name}
								type={findItem(types, typeId)}
								userExercises={userExercises}
								currentExercise={currentExercise}
								setCurrentExercise={setCurrentExercise}
							/>
						))
						.reverse()
				)}
			</div>
		</div>
	);
};

export const AddExercisesModalWindow = styled(AddExercisesModalWindowContainer)`
	text-align: center;
	position: relative;
	width: 400px;
	margin: 0 auto;
	min-height: 700px;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 5px 30px 20px 30px;
	padding: 20px 0;

	.header-modal-exercises {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding: 0 20px;
	}

	.modal-exercises-container {
		overflow: scroll;
		overflow-x: hidden;
		max-height: 550px;
		// margin-right: -7px;

		&::-webkit-scrollbar {
			width: 6px; /* ширина scrollbar */
		}
		&::-webkit-scrollbar-thumb {
			background-color: #a2a2a2; /* цвет плашки */
			border-radius: 30px; /* закругления плашки */
		}
	}

	.modal-types-container {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		padding: 15px 5px;
	}

	.modal-add-exercises-btn {
		opacity: 0.6;
		transition: 0.3s;

		&:hover {
			color: #a2a2a2;
			cursor: pointer;
			transition: 0.3s;
		}
	}
`;
