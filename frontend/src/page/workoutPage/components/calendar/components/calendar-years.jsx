import styled from 'styled-components';

const CalendarYearsContainer = ({ className, state, functions }) => {
	return (
		<div className={className}>
			<div className="calendar-unchoosable-year">{state.selectedYearsInterval[0] - 1}</div>
			{state.selectedYearsInterval.map((year) => {
				const isCurrentYear = new Date().getFullYear() === year;
				const isSelectedYear = year === state.selectedYear;

				return (
					<div
						key={year}
						aria-hidden
						onClick={() => {
							functions.setSelectedYear(year);
							functions.setMode('monthes');
						}}
						className={[
							'calendar-pick-item',
							isCurrentYear ? 'calendar-selected-item' : '',
							isSelectedYear ? 'calendar-today-item' : '',
						].join(' ')}
					>
						{year}
					</div>
				);
			})}
			<div className="calendar-unchoosable-year">
				{state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
			</div>
		</div>
	);
};

export const CalendarYears = styled(CalendarYearsContainer)``;
