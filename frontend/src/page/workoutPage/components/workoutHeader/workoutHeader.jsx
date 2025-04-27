import styled from 'styled-components';
import { Button, Heading, Icon, Input } from '../../../../components';
import { ICON, INTERFACE } from '../../../../constants';
import { WorkoutTime } from './components/workoutTime';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeModal,
	finishWorkout,
	openModal,
	resetError,
	selectBreakTime,
	selectIsAddPattern,
	selectIsBreak,
	selectIsError,
	selectUserExercises,
	selectUserId,
	selectUserWorkout,
	selectUserWorkoutExercises,
	setError,
	setUserWorkout,
	setUserWorkoutTime,
	startWorkout,
	stopBreak,
	stopWorkout,
	timerEditing,
} from '../../../../reducers';
import { useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { server } from '../../../../bff';
import { BreakTime, WorkoutTitle } from './components';
import { getScreenWidth, stringTimeConverter } from '../../../../utils';

const WorkoutHeaderContainer = ({ className, start, id, name, time }) => {
	const [hover, setHover] = useState(false);
	const [workoutTime, setWorkoutTime] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const workoutPage = useMatch('/workout');
	const userWorkoutExercises = useSelector(selectUserWorkoutExercises);
	const userWorkout = useSelector(selectUserWorkout);
	const isAddPattern = useSelector(selectIsAddPattern);
	const userExercises = useSelector(selectUserExercises);
	const isBreak = useSelector(selectIsBreak);
	const isError = useSelector(selectIsError);
	const userId = useSelector(selectUserId);
	const breakTime = useSelector(selectBreakTime);
	const workoutPath = useMatch('/workout');

	const handleMouseEnter = () => {
		if (workoutPage) {
			return;
		}
		setHover(true);
	};

	const handleMouseLeave = () => {
		if (workoutPage) {
			return;
		}
		setHover(false);
	};
	const onFinishWorkout = () => {
		const currentWorkoutTime = document.querySelector('.training-time')?.innerText;
		dispatch(setUserWorkoutTime(stringTimeConverter(currentWorkoutTime)));

		let zeroWeight = userWorkoutExercises.find((item) => item.weight === '');
		let zeroReps = userWorkoutExercises.find((item) => item.reps === '');

		if (zeroWeight || zeroReps) {
			dispatch(setError('Пожалуйста заполните все упражнения!'));
			setTimeout(() => {
				dispatch(resetError());
			}, [3000]);
		} else {
			dispatch(
				openModal({
					text: 'Вы хотите закончить трeнировку?',
					isConfirm: true,
					onConfirm: () => {
						server.saveWorkout(
							{
								name: userWorkout.name,
								time: userWorkout.time,
								userId: userId,
							},
							userExercises,
							userWorkoutExercises,
						);

						dispatch(stopWorkout());
						dispatch(closeModal());
						navigate('/');
						dispatch(
							openModal({
								isConfirm: false,
								isSuccess: true,
								text: 'Ваши результаты',
								onCancel: () => {
									dispatch(closeModal());
									dispatch(finishWorkout());
								},
							}),
						);
					},
					onCancel: () => dispatch(closeModal()),
				}),
			);
		}
	};

	const onPatterndescriptionChange = (e) => {
		dispatch(setUserWorkout({ ...userWorkout, description: e.target.value }));
	};

	const onTimerClicked = () => {
		dispatch(timerEditing());
	};

	const onTimeChange = (time) => {
		setWorkoutTime(time);
	};

	return (
		<div
			className={className}
			style={{
				padding: getScreenWidth(INTERFACE.WIDTH) ? '0 40px' : '0 20px',
				position: workoutPage ? 'relative' : 'absolute',
				backgroundColor: !workoutPage && '#393939',
				cursor: !workoutPage && hover && 'pointer',
				marginTop: !workoutPage ? (hover ? '0' : '-90px') : '0',
				boxShadow:
					!isAddPattern && isBreak && breakTime !== 0
						? '0 0 15px 1px #3eb942'
						: '0 0 20px 5px #141414',
			}}
			onClick={() => !workoutPage && navigate('/workout')}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{!isAddPattern && isBreak && breakTime !== 0 && <BreakTime />}
			<WorkoutTitle name={name} />
			{isAddPattern ? (
				<div style={{ height: '100%', padding: '20px 0' }}>
					<div style={{ opacity: '0.4', marginBottom: '5px' }}>Описание:</div>
					<Input
						style={{ backgroundColor: !workoutPage && '#222222' }}
						placeholder="Описание упражнения..."
						value={userWorkout?.description}
						onChange={onPatterndescriptionChange}
					/>
				</div>
			) : (
				<div
					style={{
						width: getScreenWidth(INTERFACE.WIDTH) ? '60%' : '',
						display: 'flex',
						width: '100%',
						justifyContent: getScreenWidth(INTERFACE.WIDTH) ? 'space-between' : 'flex-end',
					}}
				>
					<div className="training-time-container">
						<Icon size="large" name={ICON.CLOCK} onClick={() => start && onTimerClicked()} />
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								justifyContent: 'center',
							}}
						>
							<span style={{ color: '#a2a2a2' }}>Время:</span>
							<div
								className="training-time"
								style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '150px' : '' }}
							>
								<WorkoutTime start={start} initialTime={0} onTimeChange={onTimeChange} />
							</div>
						</div>
					</div>

					{getScreenWidth(770) && (
						<div
							style={{
								height: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Button
								disabled={!!isError}
								color={workoutPage ? '#393939' : '#222222'}
								className="finish-workout-btn"
								width="250px"
								onClick={onFinishWorkout}
							>
								Закончить тренировку
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export const WorkoutHeader = styled(WorkoutHeaderContainer)`
	background-color: #222222;
	height: 100px;
	border-radius: 20px;
	justify-content: space-between;
	max-width: 1000px;
	width: 100%;
	transition: margin 1s, height 1s, box-shadow 0.3s;
	margin-bottom: 10px;
	z-index: 2;
	display: flex;

	.training-time-container {
		display: flex;
		gap: 15px;
		// align-items: flex-end;
		// padding-left: 30px;
	}

	.training-time {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		font-size: 36px;
	}

	.finish-workout-btn {
		color: #3eb942;

		&:hover {
			background-color: #3eb942;
			color: black;
		}
	}
`;
