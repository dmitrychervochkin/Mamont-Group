import styled from 'styled-components';
import { getScreenWidth } from '../../../utils';
import { ICON, INTERFACE } from '../../../constants';
import { Heading, Icon } from '../../../components';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../reducers';

const MobileGuideContainer = ({ className }) => {
	const dispatch = useDispatch();
	const onMobileGuideClick = () => {
		dispatch(
			openModal({
				isMobileGuide: true,
				onCancel: () => {
					dispatch(closeModal());
				},
			}),
		);
	};

	return (
		<div
			className={className}
			style={{
				padding: getScreenWidth(INTERFACE.WIDTH) ? '30px 30px' : '25px',
			}}
		>
			<Heading size="small" color="#a2a2a2">
				Как установить приложение <span style={{ color: '#3eb942' }}>MAMONT Group</span> на ваше
				устройство?
			</Heading>
			<Icon name={ICON.INFOLIGHT} onClick={onMobileGuideClick} />
		</div>
	);
};
export const MobileGuide = styled(MobileGuideContainer)`
	background-color: #222222;
	border-radius: 20px;
	margin-bottom: 10px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;
