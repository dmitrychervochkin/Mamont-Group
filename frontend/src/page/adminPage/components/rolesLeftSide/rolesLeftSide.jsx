import styled from 'styled-components';
import { Heading, Icon, Input, Search } from '../../../../components';
import { useEffect, useState } from 'react';
import { server } from '../../../../bff';
import { RoleCard } from './components/roleCard';

const RolesLeftSideContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		server.fetchRoles().then(({ error, res }) => setRoles(res));
	}, []);

	return (
		<div className={className}>
			<Heading size="large" className="roles-header">
				Роли
			</Heading>
			<div className="left-side-main">
				<div className="title-of-table">
					<div className="role-id">
						<Heading size="xsmall">id</Heading>
					</div>
					<div className="role-name">
						<Heading size="xsmall">Название роли</Heading>
					</div>
				</div>
				<div className="roles-cards">
					{roles.map(({ id, name }) => (
						<RoleCard key={id} id={id} name={name} />
					))}
					{roles[0] && (
						<Heading size="xsmall" style={{ margin: '20px 0' }}>
							Действия с ролями заблокированы
						</Heading>
					)}
				</div>
			</div>
		</div>
	);
};

export const RolesLeftSide = styled(RolesLeftSideContainer)`
	height: 100%;

	.left-side-main-header {
		display: flex;
	}
	.left-side-main {
		margin-top: 10px;
	}
	.roles-cards {
		height: calc(100vh - 560px);
		overflow: scroll;
		overflow-x: hidden;
		text-align: center;
	}

	.roles-cards::-webkit-scrollbar {
		width: 6px; /* ширина scrollbar */
	}
	.roles-cards::-webkit-scrollbar-thumb {
		background-color: #a2a2a2; /* цвет плашки */
		border-radius: 30px; /* закругления плашки */
	}

	.title-of-table {
		padding: 10px 0px;
		display: flex;
		justify-content: flex-start;
		border-bottom: 3px solid #393939;
		border-top: 3px solid #393939;
	}
	.role-id {
		width: 20%;
		display: flex;
		justify-content: center;
	}
	.role-name {
		width: 60%;
		display: flex;
		justify-content: flex-start;
	}
	.roles-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.add-role-container {
		display: flex;
		padding: 10px 0 10px 5px;
		border-bottom: 1px solid #393939;
	}
	.add-role-input {
		filter: brightness(70%);
	}
`;
