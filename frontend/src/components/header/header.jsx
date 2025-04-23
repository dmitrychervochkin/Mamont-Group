import styled from 'styled-components';
import { INTERFACE, LOGO, ROUTE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectErrorMessage, selectUserId } from '../../reducers';
import { IconsNavBar, LogoImg, RightSideHeader } from './components';
import { useEffect, useRef, useState } from 'react';
import { NewFeatures } from './components/new-features';
import { DropdownError } from '../dropdownError/dropdownError';
import { useLocation } from 'react-router-dom';

const HeaderContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const errorMessage = useSelector(selectErrorMessage);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				buttonRef.current !== event.target
			) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			window.addEventListener('click', handleClickOutside);
		} else {
			window.removeEventListener('click', handleClickOutside);
		}

		return () => window.removeEventListener('click', handleClickOutside);
	}, [isDropdownOpen]);

	return (
		<header className={className}>
			<div className="header-container">
				{!userId || (windowWidth > INTERFACE.WIDTH && <LogoImg name={LOGO.HEADER} />)}
				{(location.pathname !== ROUTE.HOMEPAGE || userId) && <IconsNavBar userId={userId} />}
				<RightSideHeader userId={userId} />
				{windowWidth > 1100 && (
					<div
						ref={buttonRef}
						id="new-features-dropdown"
						className="new-features-btn"
						// onClick={() => onDropdownHandler()}
						onClick={() => setIsDropdownOpen((prev) => !prev)}
					>
						Что нового?
					</div>
				)}
			</div>
			{windowWidth > 1100 && (
				<div ref={dropdownRef}>
					<NewFeatures isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
				</div>
			)}
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	background-color: #222222;
	height: 90px;
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 100;
	box-shadow: #141414 0px 3px 15px 3px;
	display: flex;
	justify-content: center;

	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		margin: 0 10px;
		max-width: 1000px;
		width: 100%;
	}
	.new-features-btn {
		color: #a2a2a2;
		position: absolute;
		right: 0;
		margin: 0 20px;
		transition: color 0.3s;

		&:hover {
			transition: 0.3s;
			cursor: pointer;
			color: white;
		}
	}
`;
