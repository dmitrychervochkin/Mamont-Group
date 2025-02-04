import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { ICON } from '../../../../../constants';

const CalendarMenuContainer = ({ className, functions, state }) => {
	return (
		<div className={className}>
			<Icon
				name={ICON.ARROWLEFT}
				height="30px"
				margin="0 10px 0 0"
				onClick={() => functions.onClickArrow('left')}
			/>
			{state.mode === 'days' && (
				<div
					aria-hidden
					className="calendar-menu-option"
					onClick={() => functions.setMode('monthes')}
				>
					{state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
				</div>
			)}
			{state.mode === 'monthes' && (
				<div aria-hidden className="calendar-menu-option" onClick={() => functions.setMode('years')}>
					{state.selectedYear}
				</div>
			)}
			{state.mode === 'years' && (
				<div className="calendar-menu-option">
					{state.selectedYearsInterval[0]} -{' '}
					{state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
				</div>
			)}
			<Icon
				name={ICON.ARROWRIGHT}
				height="30px"
				margin="0 0 0 10px"
				onClick={() => functions.onClickArrow('right')}
			/>
		</div>
	);
};

export const CalendarMenu = styled(CalendarMenuContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #a2a2a2;
	margin-bottom: 10px;
	text-transform: uppercase;

	.calendar-menu-option {
		font-size: 20px;
		transition: color 0.2s;
		width: 200px;
		text-align: center;

		&:hover {
			cursor: pointer;
			color: #ffffff90;
		}
	}
`;
