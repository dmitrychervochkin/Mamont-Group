import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	closeModal,
	openModal,
	selectRoleId,
	selectUserId,
	selectUserLogin,
	userLogout,
} from '../../../reducers';
import { Icon } from '../../icon/icon';
import { Button } from '../../button/button';
import { Link, Navigate, redirect, useMatch, useNavigate } from 'react-router-dom';
import { ICON, ROLE, ROUTE } from '../../../constants';
import { useCallback, useEffect, useState } from 'react';

const RightSideHeaderContainer = ({ className, userId }) => {
	const userLogin = useSelector(selectUserLogin);
	const roleId = useSelector(selectRoleId);
	const matchLogin = useMatch(ROUTE.LOGIN);
	const matchReset = useMatch(ROUTE.RESET);
	const matchRegistration = useMatch(ROUTE.REGISTRATION);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [dropdownDisplay, setDropdownDisplay] = useState(false);

	const onLogout = () => {
		localStorage.removeItem('token');
		dispatch(userLogout());
		setDropdownDisplay(false);
	};
	const onMusicHandler = () => {
		navigate('/music');
		setDropdownDisplay(false);
	};
	const onCommunityHandler = () => {
		navigate('/community');
		setDropdownDisplay(false);
	};
	const onHistoryHandler = () => {
		navigate(ROUTE.HISTORY);
		setDropdownDisplay(false);
	};

	const onLogoutClick = () => {
		dispatch(
			openModal({
				text: 'Уверены, что хотите выйти из аккаунта?',
				isConfirm: true,
				onConfirm: () => {
					onLogout();
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const windowClicker = (event) => {
		const accountDropdownWindow = document.querySelectorAll('#account-dropdown-window');
		const accountDropdown = document.querySelector('#account-dropdown');

		if (event.target === accountDropdown) {
			return;
		} else if (accountDropdownWindow[0] !== event.target.parentNode) {
			setDropdownDisplay(false);
			window.removeEventListener('click', windowClicker);
		}
	};

	const onDropdownHandler = () => {
		const accountDropdownWindow = document.querySelectorAll('#account-dropdown-window');
		setDropdownDisplay(!dropdownDisplay);

		if (accountDropdownWindow[0].style.opacity === '0') {
			window.addEventListener('click', windowClicker);
		} else {
			window.removeEventListener('click', windowClicker);
		}
	};

	return (
		<div className={className}>
			{userId ? (
				<div>
					<Button
						id="account-dropdown"
						width="250px"
						style={{
							backgroundColor: dropdownDisplay && '#424242',
							boxShadow: dropdownDisplay && '0 0 20px 5px #141414',
						}}
						onClick={onDropdownHandler}
					>
						Мой аккаунт
					</Button>
					<div
						id="account-dropdown-window"
						className="dropdown-user"
						style={{
							maxHeight: dropdownDisplay ? '500px' : '1px',
							opacity: dropdownDisplay ? '1' : '0',
							// display: !dropdownDisplay && 'none',
						}}
					>
						<div className="user-information">{userLogin}</div>
						<div className="dropdown-user-option">
							<Icon margin="0 15px 0 0" inactive={true} height="25px" name={ICON.TARIFF} />
							Моя подписка
						</div>
						<div className="dropdown-user-option" onClick={onHistoryHandler}>
							<Icon margin="0 15px 0 0" inactive={true} height="25px" name={ICON.CLOCK} />
							История тренировок
						</div>
						<div className="dropdown-user-option" onClick={onCommunityHandler}>
							<Icon
								margin="0 15px 0 0"
								inactive={true}
								height="25px"
								name={ICON.TELEGRAMGRAY}
							/>
							Сообщество
						</div>
						<div className="dropdown-user-option" onClick={onMusicHandler}>
							<Icon margin="0 15px 0 0" inactive={true} height="25px" name={ICON.MUSIC} />
							Плейлисты
						</div>
						<div className="dropdown-user-option" onClick={onLogoutClick}>
							<Icon name={ICON.LOGOUT} margin="0 15px 0 0" height="25px" /> Выйти
						</div>
					</div>
				</div>
			) : (
				<div className="header-right-side">
					{!matchLogin && !matchRegistration && !matchReset && (
						<Link to={ROUTE.LOGIN}>
							<Button width="250px">Войти в аккаунт</Button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export const RightSideHeader = styled(RightSideHeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 33%;

	.user-name {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px 40px 5px 20px;
		border-bottom-left-radius: 15px;
		border: 2px solid black;
		background-color: #393939;
		transform: skewX(-35deg);
		font-style: italic;
		font-weight: 400;
		font-size: 14px;
		width: 220px;
		height: 45px;
	}
	.logo-img {
		border: 2px solid black;
		border-radius: 50%;
		width: 60px;
	}
	.user-information {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #393939;
		justify-content: center;
	}

	.dropdown-user {
		z-index: 10;
		margin-top: 5px;
		position: absolute;
		background-color: #222222;
		border-radius: 20px;
		width: 250px;
		overflow: hidden;
		border: 2px solid #393939;
		display: flex;
		flex-direction: column;
		padding: 8px 0px;
		transition: opacity 0.5s, max-height 0.5s;
	}
	.dropdown-user-option {
		display: flex;
		padding: 0px 20px;
		align-items: center;
		width: 100%;
		height: 45px;
		cursor: pointer;
		font-size: 15px;
		transition: 0.3s;

		&:hover {
			transition: 0.3s;
			background-color: #393939;
		}
	}
`;
