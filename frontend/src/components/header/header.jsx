import styled from 'styled-components';
import { LOGO } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../reducers';
import { IconsNavBar, LogoImg, RightSideHeader } from './components';
import { useState } from 'react';
import { NewFeatures } from './components/new-features';

const HeaderContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const windowClicker = (event) => {
		const accountDropdownWindow = document.querySelectorAll('#new-features-dropdown-window');
		const accountDropdown = document.querySelector('#new-features-dropdown');

		if (event.target === accountDropdown) {
			return;
		} else if (accountDropdownWindow[0] !== event.target.parentNode) {
			setIsDropdownOpen(false);
			window.removeEventListener('click', windowClicker);
		}
	};

	const onDropdownHandler = () => {
		const accountDropdownWindow = document.querySelectorAll('#new-features-dropdown-window');
		setIsDropdownOpen(!isDropdownOpen);

		if (accountDropdownWindow[0].style.opacity === '0') {
			window.addEventListener('click', windowClicker);
		} else {
			window.removeEventListener('click', windowClicker);
		}
	};

	window.addEventListener('resize', function (event) {
		setWindowWidth(document.body.clientWidth);
	});

	return (
		<header className={className}>
			<div className="header-container">
				<LogoImg name={LOGO.HEADER} />
				<IconsNavBar userId={userId} />
				<RightSideHeader userId={userId} />
				{windowWidth > 1100 && (
					<div
						id="new-features-dropdown"
						className="new-features-btn"
						onClick={() => onDropdownHandler()}
					>
						Что нового?
					</div>
				)}
			</div>
			<NewFeatures isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen}/>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	background-color: #222222;
	height: 90px;
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 3;
	box-shadow: #141414 0px 3px 15px 3px;

	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		margin: 0 auto;
		width: 1000px;
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
