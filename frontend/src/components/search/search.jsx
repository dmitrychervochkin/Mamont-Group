import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { ICON } from '../../constants';

const SearchContainer = ({ className, onChange }) => {
	return (
		<div className={className}>
			<Icon name={ICON.SEARCH} size="verySmall" inactive="true" />
			<input type="search" className="search-input" placeholder={'Поиск...'} onChange={onChange} />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	width: ${({ width = '100%' }) => width};
	height: 35px;
	background-color: #393939;
	border-radius: 10px;
	display: flex;
	align-items: center;
	padding: 0 0 0 10px;
	margin: ${({ margin = '0' }) => margin};

	.search-input {
		color: white;
		border: none;
		font-size: 15px;
		font-weight: 300;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		// border-radius: 10px;
		height: 90%;
		width: 100%;
		// margin-left: -10px;
		padding: 0 0 0 5px;
		background-color: #393939;
		outline: none;
	}
`;
