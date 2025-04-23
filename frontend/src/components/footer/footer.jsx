import styled from 'styled-components';
import { ICON, ROLE, ROUTE } from '../../constants';
import { Icon } from '../icon/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectRoleId } from '../../reducers';
import { useSelector } from 'react-redux';

const FooterContainer = ({ className }) => {
	const roleId = useSelector(selectRoleId);
	const navigate = useNavigate();
	const location = useLocation();

	const checkCurrentIcon = (path) => (path === location.pathname ? 'current' : '');

	return (
		<footer className={className}>
			<Icon
				name={ICON.BICEPS}
				reverse="true"
				onClick={() => navigate(ROUTE.HOMEPAGE)}
				className={`nav-icon `}
			/>
			<Icon
				name={ICON.DUMBBELL}
				reverse="true"
				onClick={() => navigate(ROUTE.WORKOUT)}
				className={`nav-icon ${checkCurrentIcon(ROUTE.WORKOUT)}`}
			/>
			<Icon
				name={ICON.HOME}
				reverse="true"
				onClick={() => navigate(ROUTE.HOMEPAGE)}
				className={`nav-icon ${checkCurrentIcon(ROUTE.HOMEPAGE)}`}
			/>
			<Icon
				name={ICON.TELEGRAM}
				reverse="true"
				onClick={() => navigate(ROUTE.HOMEPAGE)}
				className={`nav-icon `}
			/>
			{roleId === ROLE.ADMIN && (
				<Icon
					name={ICON.ADMINPANEL}
					reverse="true"
					onClick={() => navigate(ROUTE.ADMIN)}
					className={`nav-icon ${checkCurrentIcon(ROUTE.ADMIN)}`}
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
	background-color: #222222;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	width: 100%;

	.current {
		opacity: 1;
	}
`;
