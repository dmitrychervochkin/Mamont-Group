import styled from 'styled-components';
import { checkDateIsEqual, formatDate } from '../../utils';
import { Button, Input, Loader, Select } from '../../../../../../components';
import { COMPLEXITY, INTERFACE } from '../../../../../../constants';
import { useEffect, useState } from 'react';
import { AddNewEvent } from './add-new-event';
import { findItem, getScreenWidth, timeConverter } from '../../../../../../utils';
import { server } from '../../../../../../bff';
import { useDispatch } from 'react-redux';
import {
	closeModal,
	finishWorkout,
	openModal,
	resetError,
	setError,
	setUserExercises,
	setUserWorkout,
	setUserWorkoutExercises,
	startWorkout,
} from '../../../../../../reducers';

const CurrentDateContainer = ({
	className,
	selectedDate,
	isLoading,
	isAddEvent,
	patterns,
	calendarEvents = [],
	setIsSave,
	setIsAddEvent,
	workouts,
}) => {
	const currentDateEvent = calendarEvents.find((item) => item.date.toString() === selectedDate.toString());
	const pastDateEvents = workouts.filter((item) => checkDateIsEqual(new Date(item.date), selectedDate));
	const [calendarTypeEvents, setCalendarTypeEvents] = useState([]);
	const [muscleGroups, setMuscleGroups] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentDateEvent !== undefined) {
			server
				.fetchCalendarTypeEvents(currentDateEvent?.id)
				.then(({ res }) => setCalendarTypeEvents(res))
				.catch((err) => {
					dispatch(setError(err));
					setTimeout(() => {
						dispatch(resetError());
					}, [5000]);
				});
		}
		server
			.fetchMuscleGroups()
			.then(({ res }) => setMuscleGroups(res))
			.catch((err) => {
				dispatch(setError(err));
				setTimeout(() => {
					dispatch(resetError());
				}, [5000]);
			});
	}, [currentDateEvent]);

	const onRemoveEventHandler = () => {
		dispatch(
			openModal({
				isConfirm: 'true',
				text: 'Действительно хотите удалить событие?',
				onConfirm: () => {
					setIsSave(true);
					server.removeCalendarEvent(currentDateEvent.id);
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const onStartWorkout = () => {
		server
			.fetchPattern(currentDateEvent?.patternId)
			.then(({ res }) => {
				dispatch(setUserWorkout(res));
			})
			.catch((err) => {
				dispatch(setError(err));
				setTimeout(() => {
					dispatch(resetError());
				}, [5000]);
			})
			.finally(() =>
				dispatch(
					openModal({
						workoutPreview: true,
						onConfirm: () => {
							dispatch(startWorkout());
							dispatch(closeModal());
						},
						onCancel: () => {
							dispatch(finishWorkout());
							dispatch(closeModal());
						},
					}),
				),
			);
	};

	return (
		<div className={className} style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '30%' : '100%' }}>
			<div className="current-day">{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
			{isAddEvent ? (
				<AddNewEvent
					patterns={patterns}
					selectedDate={selectedDate}
					setIsSave={setIsSave}
					setIsAddEvent={setIsAddEvent}
				/>
			) : (
				<div className="current-day-events">
					{isLoading ? (
						<Loader />
					) : (
						currentDateEvent === undefined &&
						pastDateEvents.length === 0 && (
							<div className="no-events-message">На выбранную дату не найдено тренировок</div>
						)
					)}
					{!isLoading && currentDateEvent !== undefined && (
						<>
							<div
								style={{
									height: '100%',
									width: '100%',
									padding: '0 10px',
								}}
							>
								<div className="current-day-event-column">
									<div>Название события:</div>
									<div
										style={{
											color: '#a2a2a2',
											padding: '10px 0',
											borderBottom: '2px solid #393939',
										}}
									>
										{currentDateEvent?.name}
									</div>
								</div>
								<div className="current-day-event-column">
									<div>Шаблон:</div>
									<div
										style={{
											color: '#a2a2a2',
											padding: '10px 0',
											borderBottom: '2px solid #393939',
										}}
									>
										{findItem(patterns, currentDateEvent?.patternId).name}
									</div>
								</div>
								<div className="current-day-event-column">
									<div>Сложность тренировки:</div>
									<div
										style={{
											color:
												currentDateEvent.complexity === 'hard'
													? '#EE3434'
													: currentDateEvent.complexity === 'medium'
													? 'yellow'
													: currentDateEvent.complexity === 'easy'
													? '#3eb942'
													: 'none',

											padding: '10px 0',
											borderBottom: '2px solid #393939',
										}}
									>
										{currentDateEvent?.complexity}
									</div>
								</div>
								<div className="current-day-event-column">
									<div>Мышечные группы:</div>
									<div
										style={{
											padding: '10px 0',
											borderBottom: '2px solid #393939',
											color: '#a2a2a2',
											display: 'flex',
											flexWrap: 'wrap',
										}}
									>
										{calendarTypeEvents.map((item, i) => (
											<div key={item.id} style={{ marginRight: '5px' }}>
												{findItem(muscleGroups, item.muscleGroupId)?.name}
												{i + 1 !== calendarTypeEvents.length &&
													calendarTypeEvents.length > 1 &&
													','}
											</div>
										))}
										{calendarTypeEvents.length === 0 && <div>Не добавлены</div>}
									</div>
								</div>
								<div style={{ position: 'absolute', bottom: '10px' }}>
									<Button
										width="240px"
										style={{ marginBottom: '10px' }}
										onClick={onStartWorkout}
									>
										Начать
									</Button>
									<Button
										className="delete-event-btn"
										width="240px"
										onClick={onRemoveEventHandler}
									>
										Удалить
									</Button>
								</div>
							</div>
						</>
					)}
					{!isLoading && pastDateEvents.length !== 0 && (
						<div className="past-calendar-events">
							{pastDateEvents.map((item) => (
								<div className="past-calendar-event">
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<div style={{ color: '#a2a2a2' }}>Название:</div>
										<div style={{ textAlign: 'end' }}>{item.name}</div>
									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<div style={{ color: '#a2a2a2' }}>Время:</div>
										<div>{timeConverter(item.time)}</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export const CurrentDate = styled(CurrentDateContainer)`
	border-left: 3px solid #393939;
	border-right: 3px solid #393939;
	border-radius: 20px;
	margin-bottom: 10px;
	margin-right: 30px;
	position: relative;
	height: 100%;

	.current-day {
		font-size: 20px;
		color: #3eb942;
		text-align: center;
		padding: 10px 0;
		border-bottom: 3px solid #393939;
	}

	.no-events-message {
		color: #646464;
		padding: 0 20px;
		text-align: center;
	}
	.past-calendar-events {
		height: 100%;
		width: 100%;
		padding: 0 10px;
	}
	.past-calendar-event {
		border-bottom: 2px solid #393939;
		padding: 10px 0;
	}

	.current-day-events {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 400px;
		height: 100%;
		// position: relative;
	}

	.new-event-selector {
		width: 100%;
		font-size: 15px;
		height: 25px;
		color: #a2a2a2;
		border: none;
		background-color: transparent;
		appearance: none;
		transition: filter 0.2s;
		outline: none;

		&:hover {
			cursor: pointer;
			filter: brightness(80%);
		}
	}
	.current-day-event-column {
		margin: 10px 0;
	}
	.delete-event-btn {
		background-color: #e74e4e;

		&:hover {
			background-color: #ee3434;
		}
	}
`;
