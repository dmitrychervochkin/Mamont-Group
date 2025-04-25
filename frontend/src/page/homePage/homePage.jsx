import styled from 'styled-components';
import { Patterns, QuickStart } from './components';

const HomePageContainer = ({ className, isLoading }) => {
	return (
		<div className={className}>
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
