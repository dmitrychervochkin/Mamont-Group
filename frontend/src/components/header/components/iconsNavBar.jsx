import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICON, ROLE, ROUTE } from '../../../constants';
import { Icon } from '../../icon/icon';
import { selectRoleId } from '../../../reducers';
import { useSelector } from 'react-redux';

const checkCurrentIcon = (path) => {
	if (path === window.location.pathname) {
		return 'current';
	}
};

const IconsNaмBarContainer = ({ className, userId }) => {
	const roleId = useSelector(selectRoleId);
	let navigate = useNavigate();

	return (
		<div className={className}>
			<Icon
				reverse="true"
				className={'nav-icon' + ' ' + checkCurrentIcon(ROUTE.HOMEPAGE)}
				name={ICON.HOME}
				onClick={() => navigate(ROUTE.HOMEPAGE)}
			/>
			<Icon
				reverse="true"
				disabled={!userId}
				className={'nav-icon' + ' ' + checkCurrentIcon(ROUTE.WORKOUT)}
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

			{roleId === ROLE.ADMIN && (
				<Icon
					reverse="true"
					className={'nav-icon' + ' ' + checkCurrentIcon(ROUTE.ADMIN)}
					name={ICON.ADMINPANEL}
					onClick={() => navigate(ROUTE.ADMIN)}
				/>
			)}
		</div>
	);
};

export const IconsNavBar = styled(IconsNaмBarContainer)`
	width: 45%;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.current {
		opacity: 1;
	}
`;
