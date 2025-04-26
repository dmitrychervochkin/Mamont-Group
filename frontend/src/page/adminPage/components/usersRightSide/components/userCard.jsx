import styled from 'styled-components';
import { Heading, Icon } from '../../../../../components';
import { ICON, ROLE } from '../../../../../constants';
import { useState } from 'react';
import { server } from '../../../../../bff';
import { useDispatch } from 'react-redux';
import { closeModal, openModal, resetError, setError } from '../../../../../reducers';

const UserCardContainer = ({
	className,
	id: userId,
	login,
	email,
	icon,
	roleId,
	createdAt,
	setIsDelete,
	setIsEditing,
	roles,
}) => {
	const [userRole, setUserRole] = useState(Object.keys(ROLE)[roleId]);
	const registerDate = new Date(createdAt);
	const dispatch = useDispatch();

	const onUserRemove = (id) => {
		dispatch(
			openModal({
				text: 'Вы уверены, что хотите удалить пользователя?',
				isConfirm: true,
				onConfirm: () => {
					server.removeUser(id).then(({ error, res }) => {
						setIsDelete(false);
					});
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
		setIsDelete(true);
	};

	const onUserSave = (userRole) => {
		setIsEditing(true);
		if (roleId !== ROLE[userRole]) {
			server
				.saveUser({ id: userId, userRole: ROLE[userRole] })
				.then(({ error, res }) => {
					setIsEditing(false);
				})
				.catch((err) => {
					dispatch(setError(err));
					setTimeout(() => {
						dispatch(resetError());
					}, [5000]);
				})
				.finally(() => {
					setIsEditing(false);
				});
		}
	};

	return (
		<div className={className}>
			<div className="id-container">{userId}</div>
			<div className="icon-container">
				<div className="user-icon">{icon}</div>
			</div>
			<div className="user-data-container">
				<Heading size="xsmall" weight="400" color="#3EB942">
					{login}
				</Heading>
				<div>{email}</div>
				<div>{`Зарегистрирован: ${registerDate.getDate()}.${
					registerDate.getMonth() + 1
				}.${registerDate.getFullYear()}г.`}</div>
			</div>
			<div className="role-container">
				<select
					value={userRole}
					className="role-container-selector"
					onChange={({ target }) => setUserRole(target.value)}
				>
					{roles.map(({ id, name }) => (
						<option key={id} id={id}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className="icons">
				{roleId !== ROLE[userRole] && (
					<Icon size="small" name={ICON.SAVE} onClick={() => onUserSave(userRole)} />
				)}
				<Icon size="small" name={ICON.DELETE} onClick={() => onUserRemove(userId)} />
			</div>
		</div>
	);
};

export const UserCard = styled(UserCardContainer)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-size: 12px;
	padding: 10px 0;
	border-bottom: 1px solid #393939;

	.icons {
		display: flex;
	}
	.id-container {
		// font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 10%;
	}
	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15%;
	}
	.user-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #393939;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 1px solid black;
	}

	.user-data-container {
		// font-size: 12px;
		line-height: 20px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		// text-align: center;
		width: 32%;
	}
	.role-container {
		// font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 18%;
	}
	.role-container-selector {
		// background-color: #393939;
		text-align: center;
		text-align-last: center;
		height: 25px;
		color: white;
		border: none;
		background-color: transparent;
		appearance: none;
		transition: 0.2s;
		outline: none;
	}
	.role-container-selector:hover {
		cursor: pointer;
		filter: brightness(80%);
		transition: 0.2s;
	}
	.icons {
		// font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15%;
	}
`;
