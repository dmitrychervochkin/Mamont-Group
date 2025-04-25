import styled from 'styled-components';
import { ICON, ROLE, ROUTE } from '../../constants';
import { Icon } from '../icon/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectRoleId, selectUserId } from '../../reducers';
import { useSelector } from 'react-redux';

const FooterContainer = ({ className }) => {
	const roleId = useSelector(selectRoleId);
	const userId = useSelector(selectUserId);
	const navigate = useNavigate();
	const location = useLocation();

	const checkCurrentIcon = (path) => (path === location.pathname ? 'current' : 'menu');

	return (
		<footer className={className}>
			<Icon
				name={ICON.BICEPS}
				variant="menu"
				disabled="true"
				onClick={() => userId && navigate(ROUTE.HOMEPAGE)}
			/>
			<Icon
				name={ICON.DUMBBELL}
				disabled={!userId}
				variant={checkCurrentIcon(ROUTE.WORKOUT)}
				onClick={() => userId && navigate(ROUTE.WORKOUT)}
			/>
			<Icon
				name={ICON.HOME}
				variant={checkCurrentIcon(ROUTE.HOMEPAGE)}
				onClick={() => navigate(ROUTE.HOMEPAGE)}
			/>
			<Icon
				name={ICON.TELEGRAM}
				disabled="true"
				variant="menu"
				onClick={() => userId && navigate(ROUTE.HOMEPAGE)}
			/>
			{roleId === ROLE.ADMIN && (
				<Icon
					name={ICON.ADMINPANEL}
					disabled={!userId}
					variant={checkCurrentIcon(ROUTE.ADMIN)}
					onClick={() => userId && navigate(ROUTE.ADMIN)}
				/>
			)}
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	box-shadow: #141414 0px 3px 15px 10px;
	bottom: 0;
	position: fixed;
	z-index: 99;
	display: flex;
	justify-content: space-around;
	height: 100px;
	align-items: center;
	background-color: #222222;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	width: 100%;

	.current {
		opacity: 1;
	}
`;
