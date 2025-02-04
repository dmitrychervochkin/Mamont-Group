import styled from 'styled-components';
import { Heading, Loader, ScrollSlider, Search } from '../../../../components';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { ExerciseCard } from './components/exerciseCard';
import { AddNewExercise } from './components/addNewExercise';
import { findItem } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	loading,
	selectExercises,
	selectIsEditExerciseInfo,
	selectIsLoading,
	setError,
	setExercises,
	stopLoading,
} from '../../../../reducers';
import { ExercisesAdminHeader } from './components';

const ExercisesRightSideContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [types, setTypes] = useState([]);
	const [isAddNewExercise, setIsAddNewExercise] = useState(false);
	const [isDeleteExercise, setIsDeleteExercise] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaveExercise, setIsSaveExercise] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [searchingExercises, setSearchingExercises] = useState([]);
	const [currentType, setCurrentType] = useState('');
	const exercisesState = useSelector(selectExercises);
	const isEditExerciseInfo = useSelector(selectIsEditExerciseInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		Promise.all([server.fetchExercises(currentType), server.fetchTypes(), server.fetchUsers()]).then(
			([exercises, types, users]) => {
				dispatch(setExercises(exercises.res));
				setTypes(types.res);
				setUsers(users.res);
				setIsSaveExercise(false);
				setTimeout(() => {
					setIsLoading(false);
				}, [300]);
			},
		);
	}, [isDeleteExercise, isSaveExercise, currentType]);

	const onTypeClick = (id) => {
		if (id === currentType) {
			setCurrentType('');
		} else {
			setCurrentType(id);
		}
	};

	const onExercisesSearch = (name) => {
		setIsSearch(true);
		if (name === '') {
			setIsSearch(false);
		}

		let results = [];
		let exercisesArray = exercisesState.rows;

		for (let i = 0; i < exercisesState.rows.length; i++) {
			for (let key in exercisesState.rows[i]) {
				if (key === 'name') {
					if (exercisesState.rows[i][key].indexOf(name) !== -1) {
						results.push(exercisesArray[i]);
					}
				}
			}
		}

		setSearchingExercises(results);
	};

	return (
		<div className={className}>
			<ExercisesAdminHeader
				isSearch={isSearch}
				isLoading={isLoading}
				currentType={currentType}
				type={findItem(types, currentType)?.name}
				searchingExercises={searchingExercises}
				isAddNewExercise={isAddNewExercise}
				setIsAddNewExercise={setIsAddNewExercise}
			/>
			<div className="exercises-container">
				<div className="exercises-container-header" style={{ marginTop: '-3px' }}>
					<Search onChange={(e) => onExercisesSearch(e.target.value)} />
					<div className="search-types">
						{isLoading ? (
							<>
								<div className="search-types-sceleton"></div>
								<div className="search-types-sceleton"></div>
								<div className="search-types-sceleton"></div>
								<div className="search-types-sceleton"></div>
								<div className="search-types-sceleton"></div>
								<div className="search-types-sceleton"></div>
							</>
						) : (
							types.map(({ id, name }) => (
								<div
									key={id}
									onClick={() => onTypeClick(id)}
									style={{
										cursor: 'pointer',
										opacity: currentType === id ? '1' : '0.6',
									}}
								>
									{name}
								</div>
							))
						)}
					</div>
				</div>
				{isLoading ? (
					<div
						className="exercises-list"
						style={{
							position: 'relative',
							width: '100%',
							top: '30%',
						}}
					>
						<Loader />
					</div>
				) : (
					<ScrollSlider className="exercises-list">
						{isAddNewExercise && (
							<AddNewExercise
								types={types}
								setIsSaveExercise={setIsSaveExercise}
								setIsAddNewExercise={setIsAddNewExercise}
								setError={setError}
							/>
						)}
						{(isSearch ? searchingExercises : exercisesState?.rows)
							?.map(({ id, name, userId, typeId, discription }) => (
								<ExerciseCard
									setError={setError}
									key={id}
									id={id}
									name={name}
									discription={discription}
									types={types}
									userId={userId}
									setIsDeleteExercise={setIsDeleteExercise}
									isSaveExercise={isSaveExercise}
									setIsSaveExercise={setIsSaveExercise}
									type={findItem(types, typeId)}
									user={findItem(users, userId)}
								/>
							))
							.reverse()}
					</ScrollSlider>
				)}
			</div>
		</div>
	);
};

export const ExercisesRightSide = styled(ExercisesRightSideContainer)`
	height: 100%;

	.add-new-exercise-btn {
		display: flex;
		align-items: center;

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}
	}
	.exercises-container {
		margin-top: 10px;
		height: 100%;
	}

	.search-types {
		-webkit-user-select: none;
		user-select: none;
		display: flex;
		justify-content: space-between;
		padding: 14px 5px;
		font-size: 15px;
		border-bottom: 3px solid #393939;
		height: 50px;
	}
	.exercises-list {
		// height: calc(100vh - 580px);
		// overflow: scroll;
		// overflow-x: hid
		// den;
	}
	.search-types-sceleton {
		background-color: #393939;
		width: 70px;
		height: 20px;
		border-radius: 7px;
	}
`;
