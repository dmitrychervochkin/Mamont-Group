import styled from 'styled-components';
import { Heading } from '../../../../../components';

const RoleCardContainer = ({ className, id, name }) => {
	return (
		<div className={className}>
			<div className="role-id">
				<Heading size="15px">{id}</Heading>
			</div>
			<div className="role-name">
				<Heading size="18px">{name}</Heading>
			</div>
		</div>
	);
};

export const RoleCard = styled(RoleCardContainer)`
	display: flex;
	border-bottom: 1px solid #393939;
	padding: 20px 0px;
	height: 60px;

	.role-id {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.role-name {
		width: 60%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		filter: brightness(70%);
	}
	.role-icons {
		height: 100%;
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0;
		margin-right: 6px;
	}
`;
