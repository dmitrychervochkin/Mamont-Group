import styled from 'styled-components';
import { Heading, Icon, Input } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { useState } from 'react';
import { server } from '../../../../../bff';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../../../reducers';

const MuscleGroupCardContainer = ({ className, id, name, isDelete, setIsDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingMuscleGroup, setEditingMuscleGroup] = useState(name);
	const dispatch = useDispatch();

	const onMuscleGroupChange = (target) => {
		setEditingMuscleGroup(target.value);
	};
	const onMuscleGroupRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить из списка мышечных групп?',
				isConfirm: true,
				onConfirm: () => {
					server.removeMuscleGroup(id).then(({ error, res }) => {
						setIsDelete(false);
					});
					dispatch(closeModal());
					setIsDelete(true);
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
		setIsDelete(false);
	};

	const onMuscleGroupSave = (editingType) => {
		if (name !== editingType) {
			server.saveMuscleGroup({ id, name: editingMuscleGroup }).then(({ error, res }) => {});
		}
		setIsEditing(false);
	};

	return (
		<>
			<div className={className}>
				<div className="type-id">
					<Heading size="15px">{id}</Heading>
				</div>
				<div className="type-name">
					<Heading size="18px">
						{isEditing ? (
							<Input
								id="edit-role-input"
								maxLength="12"
								padding="0 0 0 10px"
								width="100%"
								placeholder="Наименование..."
								value={editingMuscleGroup}
								onChange={({ target }) => onMuscleGroupChange(target)}
							/>
						) : (
							<span style={{ opacity: '0.7' }}>{editingMuscleGroup || name}</span>
						)}
					</Heading>
				</div>

				<div className="type-icons">
					{isEditing ? (
						<Icon
							size="small"
							name={ICON.SAVE}
							onClick={() => onMuscleGroupSave(editingMuscleGroup)}
						/>
					) : (
						<Icon
							size="small"
							margin="0 0 -2px 0"
							name={ICON.EDIT}
							onClick={() => {
								setIsEditing(!isEditing);
								setTimeout(() => {
									document.getElementById('edit-role-input').focus();
									document.getElementById('edit-role-input').select();
								}, [50]);
							}}
						/>
					)}
					<Icon size="small" name={ICON.DELETE} onClick={() => onMuscleGroupRemove(id)} />
				</div>
			</div>
		</>
	);
};

export const MuscleGroupCard = styled(MuscleGroupCardContainer)`
	display: flex;
	border-bottom: 1px solid #393939;
	padding: 20px 0px;
	height: 60px;
	width: 100%;

	.type-id {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.type-name {
		width: 60%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.type-icons {
		height: 100%;
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0;
		margin-right: 6px;
	}
`;
