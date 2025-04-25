import styled from 'styled-components';
import { INTERFACE } from '../../../../../../../../../constants';
import { getScreenWidth } from '../../../../../../../../../utils';

const WorkoutTableTitleContainer = ({ className }) => {
	return (
		<div className={className}>
			<div style={{ width: '40px', textAlign: 'center' }}>#</div>
			<div style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '250px' : '', textAlign: 'center' }}>
				Предыдущий
			</div>
			<div style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '200px' : '', textAlign: 'center' }}>
				Вес
			</div>
			<div style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '200px' : '', textAlign: 'center' }}>
				Кол-во повторений
			</div>
			<div style={{ width: getScreenWidth(INTERFACE.WIDTH) ? '75px' : '', textAlign: 'center' }}></div>
		</div>
	);
};

export const WorkoutTableTitle = styled(WorkoutTableTitleContainer)`
	display: flex;
	padding: 10px 0 5px 0;
	justify-content: space-between;
	opacity: 0.6;
	width: 100%;
	background-color: #222222;
	height: 40px;
	position: relative;
`;
