import styled from 'styled-components';
import { Button, Heading, Icon } from '../../../components';
import { ICON } from '../../../constants/iconsContants';
import { useDispatch, useSelector } from 'react-redux';
import { addPattern, selectUserId, startWorkout } from '../../../reducers';
import { useNavigate } from 'react-router-dom';
import { INTERFACE } from '../../../constants';

const PatternsContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addPatternHandler = () => {
		dispatch(addPattern());
		navigate('/workout');
	};

	return (
		<div className={className}>
			{!userId && <div className="blocked-patterns"></div>}
			<div
				className="patterns-container"
				style={{ padding: window.innerWidth < INTERFACE.WIDTH ? '30px' : '30px 40px 40px' }}
			>
				<div
					className="patterns-header"
					style={{ display: window.innerWidth > INTERFACE.WIDTH ? 'flex' : 'block' }}
				>
					<div className="left-side">
						<Heading className="patterns-title">Шаблоны</Heading>
						<Icon
							height="31px"
							name={userId ? ICON.UNLOCK : ICON.LOCK}
							margin="5px 30px"
							inactive="true"
						/>
					</div>
					<div className="right-side">
						<Button
							width={window.innerWidth > INTERFACE.WIDTH ? '250px' : '100%'}
							onClick={addPatternHandler}
						>
							<span className="plus">+</span>Добавить шаблон
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export const Patterns = styled(PatternsContainer)`
	margin-top: 10px;
	background-color: #222222;
	width: 100%;
	height: 100%;
	border-radius: 20px;
	position: relative;

	.patterns-container {
		width: 100%;
		position: absolute;
		display: flex;
		justify-content: space-between;
	}
	.blocked-patterns {
		width: 100%;
		height: 100%;
		position: absolute;
		border: 3px solid #393939;
		border-radius: 20px;
		background-color: black;
		opacity: 0.4;
		z-index: 4;
	}
	.plus {
		font-size: 25px;
		margin-bottom: 3px;
		margin-right: 8px;
	}
	.left-side {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.patterns-header {
		width: 100%;
		display: flex;
		align-items: end;
		justify-content: space-between;
	}
`;
