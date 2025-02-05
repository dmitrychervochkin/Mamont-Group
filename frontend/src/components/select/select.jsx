import { useState } from 'react';
import styled from 'styled-components';

const SelectContainer = ({
	className,
	array,
	currentValue,
	value,
	state: changeValue,
	setState: setChangeValue,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [changeValue, setChangeValue] = useState(currentValue);

	const windowClicker = (event) => {
		const accountDropdownWindow = document.querySelectorAll('#select-dropdown-window-' + currentValue);
		const accountDropdown = document.querySelector('#select-dropdown-btn-' + currentValue);

		if (event.target === accountDropdown) {
			return;
		} else if (accountDropdownWindow[0] !== event.target.parentNode) {
			setIsOpen(false);
			window.removeEventListener('click', windowClicker);
		}
	};

	const onDropdownHandler = () => {
		const accountDropdownWindow = document.querySelectorAll('#select-dropdown-window-' + currentValue);
		setIsOpen(!isOpen);

		if (accountDropdownWindow[0]?.style.display === 'none') {
			window.addEventListener('click', windowClicker);
		} else {
			window.removeEventListener('click', windowClicker);
		}
	};

	console.log(changeValue);

	return (
		<div className={className}>
			<div
				id={'select-dropdown-btn-' + currentValue}
				style={{ color: isOpen && 'white' }}
				className="custom-select-current-value"
				onClick={onDropdownHandler}
			>
				{changeValue[value]}
			</div>

			<div
				id={'select-dropdown-window-' + currentValue}
				className="custom-select"
				style={{ display: isOpen ? 'flex' : 'none' }}
			>
				{isOpen &&
					array.map((item) => (
						<div
							key={item.id}
							className="custom-select-option"
							style={{ color: changeValue[value] === item[value] && 'white' }}
							onClick={() => {
								setChangeValue(item);
								setIsOpen(false);
							}}
						>
							{item[value]}
						</div>
					))}
			</div>
		</div>
	);
};

export const Select = styled(SelectContainer)`
	position: relative;

	.custom-select {
		z-index: 5;
		position: absolute;
		background-color: #393939;
		display: flex;
		flex-direction: column;
		padding: 5px;
		border-radius: 5px;
		width: 150px;
		box-shadow: 0 0 10px 2px #141414;
	}
	.custom-select-option {
		color: #a2a2a2;
		transition: color 0.2s;
		padding: 5px 10px;
		border-radius: 5px;

		&:hover {
			color: white;
			cursor: pointer;
			background-color: #646464;
		}
	}
	.custom-select-current-value {
		color: #a2a2a2;
		transition: color 0.2s, background-color 0.2s;

		&:hover {
			color: white;
			cursor: pointer;
		}
	}
`;
