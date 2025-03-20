import styled from 'styled-components';
import { AccessError, Heading, Icon, Loader, Search } from '../../components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ICON, ROLE, ROUTE } from '../../constants';
import { useEffect, useState } from 'react';
import { AdminPageHeader, UsersLeftSide, RolesLeftSide, MuscleGroupsAdmin } from './components';
import { useSelector } from 'react-redux';
import { selectRoleId, selectUserId } from '../../reducers';
import { server } from '../../bff';
import { ExercisesRightSide } from './components/exercisesAdmin/exercisesAdmin';
import { TariffsRightSide } from './components/tariffsRightSide/tariffsRightSide';
import { MuscleGroupCard } from './components/musqleGroupsAdmin/components/muscleGroupCard';

const AdminPageContainer = ({ className }) => {
	const [leftSide, setLeftSide] = useState('muscleGroups');
	const [rightSide, setRightSide] = useState('users');

	return (
		<div className={className}>
			<AdminPageHeader
				leftSide={leftSide}
				rightSide={rightSide}
				setLeftSide={setLeftSide}
				setRightSide={setRightSide}
			/>
			<div className="admin-page-container">
				<div className="left-side-admin-page">
					{leftSide === 'muscleGroups' && <MuscleGroupsAdmin />}
					{leftSide === 'roles' && <RolesLeftSide />}
				</div>
				<div className="right-side-admin-page">
					{rightSide === 'users' && <UsersLeftSide />}
					{rightSide === 'exercises' && <ExercisesRightSide />}
					{rightSide === 'tariffs' && <TariffsRightSide />}
				</div>
			</div>
		</div>
	);
};

export const AdminPage = styled(AdminPageContainer)`
	width: 1000px;
	// height: calc(100vh - 280px);
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	// border: 1px solid yellow;

	.admin-page-container {
		// height: calc(100vh - 260);
		height: 100%;
		margin-top: 10px;
		display: flex;
		// border: 1px solid yellow;
		// height: 100%;

		// width: 100%;
	}
	.left-side-admin-page {
		// height: calc(100vh - 375px);
		border-radius: 20px;
		padding: 30px 40px;
		// overflow: scroll;
		width: 35%;
		height: 100%;
		background-color: #222222;
		margin-right: 10px;
	}
	.right-side-admin-page {
		padding: 30px 40px;
		border-radius: 20px;
		width: 65%;
		height: 100%;
		background-color: #222222;
		// display: flex;
	}
`;
