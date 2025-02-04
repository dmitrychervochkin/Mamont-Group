import styled from 'styled-components';
import { Button } from '../../button/button';

const ConfirmModalWindowContainer = ({ className, text, onConfirm, onCancel }) => {
	return (
		<div className={className}>
			<div style={{ fontSize: '20px', margin: '20px 0' }} >
				{text}
			</div>
			<div className="buttons">
				<Button className="modal-btn" width="50%" onClick={onConfirm}>
					Да
				</Button>
				<Button className="modal-btn" width="50%" onClick={onCancel}>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export const ConfirmModalWindow = styled(ConfirmModalWindowContainer)`
	text-align: center;
	position: relative;
	width: 400px;
	margin: 0 auto;
	border-radius: 20px;
	z-index: 30;
	top: 50%;
	transform: translate(0, -50%);
	background-color: #222222;
	padding: 5px 30px 20px 30px;

	& .buttons {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
