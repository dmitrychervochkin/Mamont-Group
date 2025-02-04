import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectBreakTime, selectStartWorkout, stopBreak } from '../../../../../reducers';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Icon } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { WorkoutTime } from './workoutTime';

const BreakTimeContainer = ({ className }) => {
	const [breakTimeHidden, setBreakTimeHidden] = useState(false);
	const breakTime = useSelector(selectBreakTime);
	const start = useSelector(selectStartWorkout);
	const dispatch = useDispatch();
	const workoutPage = useMatch('/workout');

	return (
		<div
			className={className}
			style={{
				backgroundColor: breakTimeHidden ? 'transparent' : workoutPage ? '#222222' : '#393939',
			}}
		>
			<div
				className="break-time-header"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span style={{ color: '#a2a2a2', opacity: breakTimeHidden ? 0 : 1 }}>Отдых:</span>
				<div style={{ display: 'flex' }}>
					<Icon
						height="20px"
						margin="0 10px 0 0"
						name={breakTimeHidden ? ICON.EYEOFF : ICON.EYE}
						onClick={() => setBreakTimeHidden(!breakTimeHidden)}
					/>
					<Icon height="20px" name={ICON.CROSS} onClick={() => dispatch(stopBreak())} />
				</div>
			</div>
			<div style={{ opacity: breakTimeHidden ? 0 : 1, transition: 'opacity 0.5s' }}>
				<WorkoutTime start={start} initialTime={breakTime} reverse={true} />
			</div>
		</div>
	);
};

export const BreakTime = styled(BreakTimeContainer)`
	transition: opacity 0.5s, background-color 0.5s;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 170px;
	padding: 20px 10px;
	position: absolute;
	left: 44%;
	top: 0;
	bottom: 0;
`;
