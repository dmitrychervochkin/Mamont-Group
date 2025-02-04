import styled from 'styled-components';
import { Heading, Search } from '../../../../components';
import { Link } from 'react-router-dom';

const TariffsRightSideContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="right-side-header">
				<Heading>Подписки</Heading>
				<Link className="add-new">
					<Heading color="#3EB942">+</Heading>
					<Heading weight="400" size="20px" margin="7px 0 0 5px" color="#3EB942">
						NEW
					</Heading>
				</Link>
			</div>
			<div className="right-side-main">
				<div className="right-side-main-header">
					<Search />
				</div>
			</div>
		</div>
	);
};

export const TariffsRightSide = styled(TariffsRightSideContainer)`
	.right-side-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.add-new {
		display: flex;
		align-items: center;
	}

	.right-side-main {
		margin-top: 10px;
	}
`;