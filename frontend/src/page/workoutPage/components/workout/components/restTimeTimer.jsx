import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { useState } from 'react';
import { selectIsTimerEditing, startBreak, stopBreak, timerEditing } from '../../../../../reducers';
import { useDispatch, useSelector } from 'react-redux';

const RestTimeTimerContainer = ({ className }) => {
	const [timerValue, setTimerValue] = useState('02:00');
	const isTimerEditing = useSelector(selectIsTimerEditing);
	const dispatch = useDispatch();

	const onTimerSave = () => {
		const minutes = timerValue.split(':')[0];
		const seconds = timerValue.split(':')[1];
		const sum = Number(minutes) * 60 + Number(seconds);
		dispatch(startBreak(sum));
		dispatch(timerEditing());
		dispatch(stopBreak());
	};

	return (
		<div
			className={className}
			style={{
				marginTop: isTimerEditing ? '0' : '-110px',
				opacity: isTimerEditing ? '1' : '0',
			}}
		>
			<label>Укажите время отдыха:</label>
			<div style={{ display: 'flex' }}>
				<input
					style={{
						border: 'none',
						color: 'white',
						transition: 'background-color 0.5s',
						backgroundColor: '#393939',
						fontSize: '35px',
						borderRadius: '15px',
					}}
					type="time"
					value={timerValue}
					onChange={(e) => setTimerValue(e.target.value)}
				/>
				<Icon height="30px" name={ICON.PLAY} onClick={onTimerSave} />
			</div>
		</div>
	);
};

export const RestTimeTimer = styled(RestTimeTimerContainer)`
	transition: margin 0.5s, opacity 0.5s;
	z-index: 4;
	position: absolute;
	width: 250px;
	height: 100px;
	background-color: #393939;
	box-shadow: 0 0 10px 1px #141414;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0 15px 0;
	color: #a2a2a2;
`;
