import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeModal, openModal, setUserWorkoutTime, stopBreak } from '../../../../../reducers';
import { useNavigate } from 'react-router-dom';

const WorkoutTimeContainer = ({ className, start, reverse = false, initialTime }) => {
	const [isActive, setIsActive] = useState(false);
	const [time, setTime] = useState(initialTime);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const intervalRef = useRef(null); // Храним интервал

	// Запуск таймера при изменении isActive
	useEffect(() => {
		if (isActive) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => {
					const newTime = reverse ? prevTime - 1 : prevTime + 1;

					// Если таймер дошел до 0, останавливаем и вызываем модалку
					if (reverse && newTime <= 0) {
						clearInterval(intervalRef.current);
						navigate('/workout');
						dispatch(
							openModal({
								isEndOfBreak: true,
								onCancel: () => dispatch(closeModal()),
							}),
						);
						dispatch(stopBreak());
						return 0;
					}

					// Обновляем Redux-состояние только если не reverse
					if (!reverse) {
						dispatch(setUserWorkoutTime(newTime));
					}

					return newTime;
				});
			}, 1000);
		} else {
			clearInterval(intervalRef.current);
		}

		// Очистка интервала при размонтировании
		return () => clearInterval(intervalRef.current);
	}, [isActive]); // Зависим только от isActive, не вызываем каждый ререндер

	// Запускаем таймер, если проп `start === true`
	useEffect(() => {
		if (start) {
			setIsActive(true);
		}
	}, [start]);

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
		clearInterval(intervalRef.current);
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
export const WorkoutTime = styled(WorkoutTimeContainer)``;
