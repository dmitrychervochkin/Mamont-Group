import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	closeModal,
	openModal,
	selectWorkout,
	selectWorkoutTime,
	setUserWorkoutTime,
	setWorkout,
	setWorkoutTime,
	setWorkoutTimeUser,
	stopBreak,
} from '../../../../../reducers';
import { useNavigate } from 'react-router-dom';

const WorkoutTimeCointainer = ({ className, start, reverse = false, initialTime }) => {
	const [isActive, setIsActive] = useState(false);
	const [time, setTime] = useState(initialTime);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (start) {
			handleStart();
		}
		if (initialTime !== 0) {
			if (time === 0) {
				navigate('/workout');
				dispatch(
					openModal({
						isEndOfBreak: true,
						onCancel: () => dispatch(closeModal()),
					}),
				);
				dispatch(stopBreak());
				handleReset();
			}
		}
		let interval = null;

		if (isActive) {
			!reverse && dispatch(setUserWorkoutTime(time));
			interval = setInterval(() => {
				if (reverse) {
					setTime((time) => time - 1);
				} else if (!reverse) {
					setTime((time) => time + 1);
				}
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, start, time]);

	const handleStart = () => {
		setIsActive(true);
	};

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
	};

	return (
		<div className={className} style={{ color: reverse && '#3eb942', fontSize: '35px' }}>
			{time >= 3600 && (
				<span className="digits">{('0' + Math.floor((time / 60 / 60) % 60)).slice(-2)}:</span>
			)}
			<span className="digits">{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
			<span className="digits">{('0' + Math.floor(time % 60)).slice(-2)}</span>
		</div>
	);
};
export const WorkoutTime = styled(WorkoutTimeCointainer)``;
