import styled from 'styled-components';
import { checkDateIsEqual, checkIsToday } from '../utils';

const CalendarDaysContainer = ({ className, state, functions, setSelectedDay }) => {
	return (
		<div className={className}>
			{state.calendarDays.map((day) => {
				const isToday = checkIsToday(day.date);
				const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
				const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
				// const workoutEvent = CALENDAR_STATE.find(
				// 	(item) => item.date.toString() === day.date.toString(),
				// );

				return (
					<div
						key={`${day.dayNumber}-${day.monthIndex}`}
						aria-hidden
						onClick={() => {
							functions.setSelectedDay(day);
							setSelectedDay(day.date);
						}}
						className={[
							'calendar-day',
							isToday ? 'calendar-today-item' : '',
							isSelectedDay ? 'calendar-selected-item' : '',
							isAdditionalDay ? 'calendar-additional-day' : '',
						].join(' ')}
					>
						{day.dayNumber}
						{/* {!isAdditionalDay && workoutEvent && <div className="calendar-event-icon"></div>} */}
					</div>
				);
			})}
		</div>
	);
};

export const CalendarDays = styled(CalendarDaysContainer)`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: 1fr;
	text-align: center;

	.calendar-day {
		position: relative;
		font-size: 20px;
		margin: 5px 2px;
		padding: 20px 0;
		border-radius: 7px;
		transition: background-color 0.2s, box-shadow 0.2s;
		color: #a2a2a2;

		&:hover {
			background-color: #393939;
			cursor: pointer;
			box-shadow: 0 0 10px 1px #141414;
		}
	}

	.calendar-event-icon {
		width: 5px;
		height: 5px;
		background-color: yellow;
		border-radius: 50%;
		position: absolute;
		top: 10px;
		right: 10px;
	}
`;
