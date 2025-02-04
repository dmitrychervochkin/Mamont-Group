import styled from 'styled-components';
import { Heading, Icon, Loader, ScrollSlider, Search } from '../../../../components';
import { ICON, ROLE } from '../../../../constants';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { UserCard } from './components/userCard';
import { useDispatch, useSelector } from 'react-redux';
import { loading, selectIsLoading, stopLoading } from '../../../../reducers';

const UsersLeftSideContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [searchingUsers, setSearchingUsers] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		Promise.all([server.fetchUsers(), server.fetchRoles()]).then(([usersData, rolesData]) => {
			setUsers(usersData.res);
			setRoles(rolesData.res);
			setTimeout(() => {
				setIsLoading(false);
			}, [300]);
		});
	}, [isDelete, isEditing]);

	const onUserSearch = (userName) => {
		setIsSearch(true);
		if (userName === '') {
			setIsSearch(false);
		}

		let results = [];
		let usersArray = users;

		for (let i = 0; i < users.length; i++) {
			for (let key in users[i]) {
				if (key === 'login') {
					if (users[i][key].indexOf(userName) !== -1) {
						results.push(usersArray[i]);
					}
				}
			}
		}
		setSearchingUsers(results);
	};

	return (
		<div className={className}>
			<div className="users-header">
				<Heading>Пользователи</Heading>
				<div className="left-side-main">
					<div className="left-side-main-header">
						<Search margin="0 10px 0 0" onChange={(e) => onUserSearch(e.target.value)} />
						<Icon name={ICON.MENU} height="35px" />
					</div>
				</div>
			</div>
			<div className="title-of-table">
				<div className="user-id">
					<Heading size="15px">id</Heading>
				</div>
				<div className="user-icon-title">
					<Heading size="15px">Иконка</Heading>
				</div>
				<div className="user-data">
					<Heading size="15px">Данные о пользователе</Heading>
				</div>
				<div className="user-role">
					<Heading size="15px">Роль</Heading>
				</div>
				<div className="user-actions">
					<Heading size="15px">Действия</Heading>
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
				<ScrollSlider className="users-cards">
					{(isSearch ? searchingUsers : users).map(
						({ id, login, email, icon, roleId, createdAt }) => (
							<UserCard
								key={id}
								id={id}
								login={login}
								email={email}
								icon={icon}
								roleId={roleId}
								createdAt={createdAt}
								setIsDelete={setIsDelete}
								setIsEditing={setIsEditing}
								roles={roles}
							/>
						),
					)}
				</ScrollSlider>
			)}
		</div>
	);
};

export const UsersLeftSide = styled(UsersLeftSideContainer)`
	height: 100%;
	.left-side-main-header {
		display: flex;
		height: 100%;
		// overflow: scroll;
	}
	.left-side-main {
		margin-top: 7px;
	}
	.users-header {
		padding-bottom: 10px;
	}
	.title-of-table {
		padding: 10px 0;
		border-top: 3px solid #393939;
		border-bottom: 3px solid #393939;
		display: flex;
		justify-content: space-between;
	}
	.user-id {
		filter: brightness(70%);
		text-align: center;
		width: 10%;
	}
	.user-icon-title {
		filter: brightness(70%);
		text-align: center;
		width: 15%;
	}
	.user-data {
		filter: brightness(70%);
		// text-align: center;
		width: 32%;
	}
	.user-role {
		filter: brightness(70%);
		text-align: center;
		width: 18%;
	}
	.user-actions {
		filter: brightness(70%);
		text-align: center;
		width: 15%;
	}
`;
