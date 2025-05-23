import styled from 'styled-components';
import { MobileGuide, Patterns, QuickStart } from './components';
import { getScreenWidth } from '../../utils';
import { INTERFACE } from '../../constants';

const HomePageContainer = ({ className, isLoading }) => {
	return (
		<div className={className}>
			{!getScreenWidth(INTERFACE.WIDTH) && <MobileGuide />}
			{!isLoading && <QuickStart />}
			{!isLoading && <Patterns />}
		</div>
	);
};

export const HomePage = styled(HomePageContainer)`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	
`;
