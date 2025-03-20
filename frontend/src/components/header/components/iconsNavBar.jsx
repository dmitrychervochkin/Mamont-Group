import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICON, ROLE, ROUTE } from '../../../constants';
import { Icon } from '../../icon/icon';
import { selectRoleId } from '../../../reducers';
import { useSelector } from 'react-redux';

const IconsNavBarContainer = ({ className, userId }) => {
	const roleId = useSelector(selectRoleId);
	const navigate = useNavigate();
	const location = useLocation();

	const checkCurrentIcon = (path) => (path === location.pathname ? 'current' : '');

	return (
		<div className={className}>
			<Icon
				reverse="true"
				className={`nav-icon ${checkCurrentIcon(ROUTE.HOMEPAGE)}`}
				name={ICON.HOME}
				onClick={() => navigate(ROUTE.HOMEPAGE)}
			/>
			<Icon
				reverse="true"
				disabled={!userId}
				className={`nav-icon ${checkCurrentIcon(ROUTE.WORKOUT)}`}
				name={ICON.DUMBBELL}
				onClick={() => userId && navigate(ROUTE.WORKOUT)}
			/>
			<Icon
				reverse="true"
				className={'nav-icon'}
				name={ICON.BICEPS}
				disabled={!userId}
				onClick={() => userId && navigate(ROUTE.HOMEPAGE)}
			/>

			<Icon
				reverse="true"
				className={'nav-icon'}
				name={ICON.TELEGRAM}
				onClick={() => navigate(ROUTE.HOMEPAGE)}
			/>

			{Boolean(roleId === ROLE.ADMIN) && (
				<Icon
					reverse="true"
					className={`nav-icon ${checkCurrentIcon(ROUTE.ADMIN)}`}
					name={ICON.ADMINPANEL}
					onClick={() => navigate(ROUTE.ADMIN)}
				/>
			)}
		</div>
	);
};

export const IconsNavBar = styled(IconsNavBarContainer)`
	width: 45%;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.current {
		opacity: 1;
	}
`;
