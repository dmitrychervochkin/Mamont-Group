import styled from 'styled-components';
import { Heading, Icon, Input, Loader, ScrollSlider, Search } from '../../../../components';
import { Link } from 'react-router-dom';
import { ICON } from '../../../../constants';
import { useEffect, useState } from 'react';
import { MuscleGroupCard, TypeCard } from './components/muscleGroupCard';
import { server } from '../../../../bff';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, setError } from '../../../../reducers';

const MuscleGroupsAdminContainer = ({ className }) => {
	const [muscleGroups, setMuscleGroups] = useState([]);
	const [isAdd, setIsAdd] = useState(false);
	const [isSave, setIsSave] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [addMuscleGroup, setAddMuscleGroup] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		server
			.fetchMuscleGroups()
			.then(({ error, res }) => setMuscleGroups(res))
			.finally(() =>
				setTimeout(() => {
					setIsLoading(false);
				}, [300]),
			);
	}, [isSave, isDelete]);

	const onMuscleGroupChange = (target) => {
		setAddMuscleGroup(target.value);
	};
	const onMuscleGroupAdd = (isAdd) => {
		if (!isAdd) {
			setIsAdd(!isAdd);
			setTimeout(() => {
				document.getElementById('add-type-input')?.focus();
				document.getElementById('add-type-input')?.select();
			}, [50]);
		} else {
			setIsAdd(!isAdd);
		}
	};

	const onMuscleGroupSave = (addGroup) => {
		setIsSave(true);

		server.saveMuscleGroup({ name: addGroup }).then(({ error, res }) => {
			dispatch(setError(error));
			// setTypeError(error);
			setIsAdd(false);
			setAddMuscleGroup('');
			setIsSave(false);
		});
		setTimeout(() => dispatch(resetError()), [3000]);
	};

	return (
		<div className={className}>
			<div className="types-container-header">
				<Heading size="large">Мышечная группа</Heading>
				<Icon
					name={isAdd ? ICON.CLOSE : ICON.ADD}
					margin="8px 0 0 0"
					height="30px"
					onClick={() => onMuscleGroupAdd(isAdd)}
				/>
			</div>
			<div className="types-container-main">
				<div className="title-types-table">
					<div className="title-types-table-role-id">
						<Heading size="xsmall">id</Heading>
					</div>
					<div className="title-types-table-role-name">
						<Heading size="xsmall">Наименование</Heading>
					</div>
				</div>
				{isLoading ? (
					<div
						style={{
							position: 'relative',
							width: '100%',
							top: '30%',
						}}
					>
						<Loader />
					</div>
				) : (
					<ScrollSlider className="types-cards">
						{isAdd && (
							<div className="add-type-container">
								<Input
									id="add-type-input"
									className="add-type-input"
									width="100%"
									placeholder="Новый тип..."
									onChange={({ target }) => onMuscleGroupChange(target)}
								/>
								<Icon
									height="30px"
									name={ICON.SAVE}
									margin="0 5px 0 20px"
									onClick={() => onMuscleGroupSave(addMuscleGroup)}
								/>
							</div>
						)}
						{muscleGroups.map(({ id, name }) => (
							<MuscleGroupCard
								key={id}
								id={id}
								name={name}
								isDelete={isDelete}
								setIsDelete={setIsDelete}
							/>
						))}
					</ScrollSlider>
				)}
			</div>
		</div>
	);
};

export const MuscleGroupsAdmin = styled(MuscleGroupsAdminContainer)`
	height: 100%;

	.types-container-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.add-new {
		display: flex;
		align-items: center;
	}

	.types-container-main {
		height: 100%;
		margin-top: 10px;
	}

	.roles-cards {
		// height: calc(100vh - 560px);
		height: 100%;
		overflow: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.roles-cards::-webkit-scrollbar {
		width: 6px; /* ширина scrollbar */
	}
	.roles-cards::-webkit-scrollbar-thumb {
		background-color: #a2a2a2; /* цвет плашки */
		border-radius: 30px; /* закругления плашки */
	}

	.title-types-table {
		padding: 10px 0px;
		display: flex;
		justify-content: flex-start;
		border-bottom: 3px solid #393939;
		border-top: 3px solid #393939;
	}
	.title-types-table-role-id {
		width: 20%;
		display: flex;
		justify-content: center;
	}
	.title-types-table-role-name {
		width: 60%;
		display: flex;
		justify-content: flex-start;
	}
	.add-type-container {
		display: flex;
		padding: 10px 0 10px 5px;
		border-bottom: 1px solid #393939;
	}
	.add-type-input {
		// filter: brightness(70%);
		opacity: 1;
	}
`;
