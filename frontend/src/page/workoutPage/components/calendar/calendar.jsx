import styled from 'styled-components';
import { Button, Heading, Icon, Loader } from '../../../../components';
import { CALENDAR, ICON } from '../../../../constants';
import { checkDateIsEqual, checkIsToday, createDate, formatDate, getWeekDaysNames } from './utils';
import { useCalendar } from './hooks/useCalendar';
import { useEffect, useState } from 'react';
import { CalendarDays, CalendarMenu, CalendarMonths, CalendarYears, CurrentDate } from './components';
import { server } from '../../../../bff';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectUserId, setError } from '../../../../reducers';

const CALENDAR_STATE = [
	{
		id: 1,
		date: 'Sat Feb 15 2025 00:00:00 GMT+0300 (Москва, стандартное время)',
		workout: 'Тренировка груди',
		complexity: 'HARD',
	},
	{
		id: 2,
		date: 'Sat Feb 15 2025 00:00:00 GMT+0300 (Москва, стандартное время)',
		workout: 'Тренировка груди',
		complexity: 'HARD',
	},
	{
		id: 3,
		date: 'Thu Feb 20 2025 00:00:00 GMT+0300 (Москва, стандартное время)',
		workout: 'Тренировка спины',
		complexity: 'HARD',
	},
];

/*
CALENDAR_EVENTS
id
name
date
patternId
complexity

CALENDAR_TYPE_EVENTS
id
typeId
calendarEventsId
*/

const CalendarContainer = ({ className, locale = 'default', firstWeekDayNumber = 2, patterns, workouts }) => {
	const [selectedDate, setSelectedDay] = useState(new Date());
	const [isSave, setIsSave] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isAddEvent, setIsAddEvent] = useState(false);
	const [calendarEvents, setCalendarEvents] = useState([]);
	const { functions, state } = useCalendar({
		locale,
		selectedDate,
		firstWeekDayNumber,
	});
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		server
			.fetchCalendarEvents(userId)
			.then(({ res }) => {
				setCalendarEvents(res);
				setTimeout(() => {
					setIsLoading(false);
					setIsSave(false);
					setIsAddEvent(false);
				}, [500]);
			})
			.catch((err) => {
				dispatch(setError(err));
				setTimeout(() => {
					dispatch(resetError());
				}, [5000]);
			});
	}, [selectedDate, isSave]);

	const onTodayBtnHander = () => {
		const today = createDate(new Date());
		functions.setSelectedDay(today);
		functions.setSelectedYear(today.year);
		functions.setSelectedMonthByIndex(today.monthIndex, today.year);
		functions.setMode('days');
		setSelectedDay(today.date);
	};

	return (
		<div className={className}>
			<div className="calendar-header">
				<Heading>Календарь</Heading>
				<div style={{ display: 'flex' }}>
					{!calendarEvents.find((item) => item.date === selectedDate.toString()) && (
						<Button
							width="200px"
							onClick={() => setIsAddEvent(true)}
							style={{ marginRight: '10px' }}
							disabled={isLoading}
						>
							Добавить событие
						</Button>
					)}
					<Button width="100px" onClick={onTodayBtnHander}>
						Сегодня
					</Button>
				</div>
			</div>
			<div className="workout-calendar">
				<CurrentDate
					calendarEvents={calendarEvents}
					isLoading={isLoading}
					selectedDate={selectedDate}
					isAddEvent={isAddEvent}
					patterns={patterns}
					setIsSave={setIsSave}
					setIsAddEvent={setIsAddEvent}
					workouts={workouts}
				/>
				<div className="calendar-body">
					<CalendarMenu functions={functions} state={state} />
					<div className="calendar-main" onClick={() => setIsAddEvent(false)}>
						{state.mode === 'days' && (
							<>
								<div className="calendar-weeks">
									{state.weekDaysNames.map((weekDaysName) => (
										<div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
									))}
								</div>
								<CalendarDays
									calendarEvents={calendarEvents}
									state={state}
									functions={functions}
									setSelectedDay={setSelectedDay}
									workouts={workouts}
								/>
							</>
						)}
						{state.mode === 'monthes' && (
							<CalendarMonths
								className="calendar-pick-items-container"
								state={state}
								functions={functions}
							/>
						)}
						{state.mode === 'years' && (
							<CalendarYears
								className="calendar-pick-items-container"
								state={state}
								functions={functions}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const Calendar = styled(CalendarContainer)`
	width: 100%;
	height: 100%;
	background-color: #222222;
	border-radius: 20px;
	margin-bottom: 10px;
	padding: 30px 40px;
	color: white;

	.calendar-weeks {
		font-size: 20px;
		text-align: center;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: 1fr;
		padding: 10px 0px;
		margin-bottom: 5px;
		color: #a2a2a2;
		border-bottom: 1px solid #393939;
		background-color: #393939;
		border-radius: 10px;
	}

	.workout-calendar {
		display: flex;
		height: 100%;
		justify-content: space-between;
		// height: 500px;
	}
	.calendar-body {
		width: 70%;
	}
	.calendar-main {
		height: 500px;
	}

	.calendar-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
	}

	.calendar-pick-items-container {
		color: #a2a2a2;
		text-align: center;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(4, 1fr);
	}
	.calendar-pick-item {
		font-size: 20px;
		border-radius: 10px;
		padding: 30px 0;
		margin: 5px;
		transition: background-color 0.2s;

		&:hover {
			background-color: #393939;
			cursor: pointer;
			box-shadow: 0 0 5px 1px #141414;
		}
	}
	.calendar-unchoosable-year {
		font-size: 20px;
		margin: 5px;
		padding: 30px 0;
		color: #646464;
	}
	.calendar-selected-item {
		color: white;
		background-color: #393939;
	}
	.calendar-additional-day {
		color: #646464;
	}
	.calendar-today-item {
		color: #3eb942;
		background-color: transparent;
		outline: 3px solid #3eb942;
		outline-offset: -3px;
	}
`;
