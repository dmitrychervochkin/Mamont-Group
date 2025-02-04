import styled from 'styled-components';

const CalendarMonthsContainer = ({ className, state, functions }) => {
	return (
		<div className={className}>
			{state.monthesNames.map((monthesName) => {
				const isCurrentMonth =
					new Date().getMonth() === monthesName.monthIndex &&
					state.selectedYear === new Date().getFullYear();
				const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

				return (
					<div
						key={monthesName.month}
						aria-hidden
						onClick={() => {
							functions.setSelectedMonthByIndex(monthesName.monthIndex);
							functions.setMode('days');
						}}
						className={[
							'calendar-pick-item',
							isSelectedMonth ? 'calendar-selected-item' : '',
							isCurrentMonth ? 'calendar-today-item' : '',
						].join(' ')}
					>
						{monthesName.monthShort}
					</div>
				);
			})}
		</div>
	);
};

export const CalendarMonths = styled(CalendarMonthsContainer)``;
