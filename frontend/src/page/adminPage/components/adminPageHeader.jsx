import styled from 'styled-components';
import { Heading, Icon } from '../../../components';
import { ICON } from '../../../constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetExercises } from '../../../reducers';

const AdminPageHeaderContainer = ({ className, leftSide, rightSide, setLeftSide, setRightSide }) => {
	const dispatch = useDispatch();
	const onRolesClick = () => {
		setLeftSide('roles');
	};
	const onTypesClick = () => {
		setLeftSide('types');
	};
	const onTariffsClick = () => {
		setRightSide('tariffs');
	};

	const onUsersClick = () => {
		setRightSide('users');
	};
	const onExercisesClick = () => {
		dispatch(resetExercises());
		setRightSide('exercises');
	};

	return (
		<div className={className}>
			<Heading>Админ панель</Heading>
			<div className="admin-page-header-icons">
				{leftSide !== 'roles' && (
					<Icon
						className="admin-page-header-icon"
						reverse="true"
						name={ICON.USERROLE}
						onClick={() => onRolesClick()}
					/>
				)}
				{leftSide !== 'types' && (
					<Icon
						className="admin-page-header-icon"
						reverse="true"
						name={ICON.TYPE}
						onClick={() => onTypesClick()}
					/>
				)}
				{rightSide !== 'users' && (
					<Icon
						className="admin-page-header-icon"
						reverse="true"
						name={ICON.USERS}
						onClick={() => onUsersClick()}
					/>
				)}
				{rightSide !== 'exercises' && (
					<Icon
						className="admin-page-header-icon"
						reverse="true"
						name={ICON.BICEPSGRAY}
						onClick={() => onExercisesClick()}
					/>
				)}
				{rightSide !== 'tariffs' && (
					<Icon
						className="admin-page-header-icon"
						reverse="true"
						name={ICON.TARIFF}
						onClick={() => onTariffsClick()}
					/>
				)}
			</div>
		</div>
	);
};

export const AdminPageHeader = styled(AdminPageHeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30px 40px;
	// width: 100%;
	background-color: #222222;
	border-radius: 20px;

	.admin-page-header-icons {
		// display: grid;
		display: flex;
		// justify-content: flex-start;
	}
	.admin-page-header-icon:hover {
		filter: brightness(130%);
	}
	.admin-page-header-icon {
		margin: 0 30px;
	}
`;
