import styled from 'styled-components';
import { Heading, Icon, Input } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { useState } from 'react';
import { server } from '../../../../../bff';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../../../reducers';

const TypeCardContainer = ({ className, id, name, isDelete, setIsDelete }) => {
	const [isEditing, setIsEditing] = useState(false);

	const [editingType, setEditingType] = useState(name);
	const dispatch = useDispatch();

	const onTypeChange = (target) => {
		setEditingType(target.value);
	};
	const onTypeRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить из списка мышечных групп?',
				isConfirm: true,
				onConfirm: () => {
					server.removeType(id).then(({ error, res }) => {
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

	const onTypeSave = (editingType) => {
		if (name !== editingType) {
			server.saveType({ id, name: editingType }).then(({ error, res }) => {});
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
								value={editingType}
								onChange={({ target }) => onTypeChange(target)}
							/>
						) : (
							<span style={{ opacity: '0.7' }}>{editingType || name}</span>
						)}
					</Heading>
				</div>

				<div className="type-icons">
					{isEditing ? (
						<Icon height="23px" name={ICON.SAVE} onClick={() => onTypeSave(editingType)} />
					) : (
						<Icon
							height="23px"
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
					<Icon height="23px" name={ICON.DELETE} onClick={() => onTypeRemove(id)} />
				</div>
			</div>
		</>
	);
};

export const TypeCard = styled(TypeCardContainer)`
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
