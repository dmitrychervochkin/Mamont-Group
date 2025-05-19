import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectBreakTime, selectStartWorkout, stopBreak } from '../../../../../reducers';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Icon } from '../../../../../components';
import { ICON, INTERFACE } from '../../../../../constants';
import { WorkoutTime } from './workoutTime';
import { getScreenWidth } from '../../../../../utils';

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
				width: getScreenWidth(INTERFACE.WIDTH) ? '170px' : '125px',
				backgroundColor: breakTimeHidden ? 'transparent' : workoutPage ? '#222222' : '#393939',
				left: getScreenWidth(INTERFACE.WIDTH) ? '44%' : '',
				right: getScreenWidth(INTERFACE.WIDTH) ? '' : '0',
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
						size={getScreenWidth(INTERFACE.WIDTH) ? 'medium' : 'small'}
						margin="0 10px 0 0"
						name={breakTimeHidden ? ICON.EYEOFF : ICON.EYE}
						onClick={() => setBreakTimeHidden(!breakTimeHidden)}
					/>
					<Icon
						size={getScreenWidth(INTERFACE.WIDTH) ? 'medium' : 'small'}
						name={ICON.CROSS}
						onClick={() => dispatch(stopBreak())}
					/>
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
	justify-content: center;
	padding: 0 0 0 15px;
	position: absolute;
	border-radius: 20px;
	top: 0;
	z-index: 5;
	bottom: 0;
`;
