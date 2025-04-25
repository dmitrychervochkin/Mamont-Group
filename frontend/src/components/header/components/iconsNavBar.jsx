import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICON, INTERFACE, ROLE, ROUTE } from '../../../constants';
import { Icon } from '../../icon/icon';
import { selectRoleId } from '../../../reducers';
import { useSelector } from 'react-redux';
import { getScreenWidth } from '../../../utils';

const IconsNavBarContainer = ({ className, userId }) => {
	const roleId = useSelector(selectRoleId);
	const navigate = useNavigate();
	const location = useLocation();

	const checkCurrentIcon = (path) => (path === location.pathname ? 'current' : 'menu');

	return (
		<div className={className}>
			<div className="icons-header-container">
				<Icon
					variant={checkCurrentIcon(ROUTE.HOMEPAGE)}
					name={ICON.HOME}
					onClick={() => navigate(ROUTE.HOMEPAGE)}
				/>
				<Icon
					disabled={!userId}
					variant={checkCurrentIcon(ROUTE.WORKOUT)}
					name={ICON.DUMBBELL}
					onClick={() => userId && navigate(ROUTE.WORKOUT)}
				/>
				<Icon
					name={ICON.BICEPS}
					disabled={!userId}
					variant="menu"
					onClick={() => userId && navigate(ROUTE.HOMEPAGE)}
				/>

				<Icon
					disabled={!userId}
					variant="menu"
					name={ICON.TELEGRAM}
					onClick={() => navigate(ROUTE.HOMEPAGE)}
				/>

				{Boolean(roleId === ROLE.ADMIN) && (
					<Icon
						disabled={!userId}
						variant={checkCurrentIcon(ROUTE.ADMIN)}
						name={ICON.ADMINPANEL}
						onClick={() => navigate(ROUTE.ADMIN)}
					/>
				)}
			</div>
		</div>
	);
};

export const IconsNavBar = styled(IconsNavBarContainer)`
	width: 100%;
	display: flex;
	justify-content: center;

	.icons-header-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		max-width: 300px;
	}

	.current {
		opacity: 1;
	}
`;
