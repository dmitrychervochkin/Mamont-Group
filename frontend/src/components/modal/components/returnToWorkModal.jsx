import styled from 'styled-components';
import { Icon } from '../../icon/icon';
import { ICON } from '../../../constants';

const ReturnToWorkModalContainer = ({ className, onCancel }) => {
	return (
		<div className={className}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span style={{ fontSize: '32px' }}>Отдых завершён!</span>
				{/* <span style={{ fontSize: '32px' }}>Djpdhfofq!</span> */}
				<Icon name={ICON.CROSS} onClick={onCancel} />
			</div>
			{/* <Icon height="350px" name={ICON.CLOCK} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: '18px',
					margin: '10px 0 0 0',
				}}
			>
				<span style={{ opacity: '0.5' }}>Возвращайся к работе! - - - - - - - - -{'>'}</span>
				<Icon inactive="true" height="22px" margin="0 6px 0 0" name={ICON.BICEPS} />
			</div> */}
		</div>
	);
};

export const ReturnToWorkModal = styled(ReturnToWorkModalContainer)`
	// text-align: center;
	position: relative;
	width: 400px;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 20px 30px;
`;
