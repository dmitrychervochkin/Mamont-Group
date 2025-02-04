import styled from 'styled-components';
import { formatDate } from '../../utils';
import { Button, Input, Loader, Select } from '../../../../../../components';
import { COMPLEXITY } from '../../../../../../constants';
import { useState } from 'react';
import { AddNewEvent } from './add-new-event';

const CurrentDateContainer = ({ className, selectedDate, isLoading, isAddEvent, patterns }) => {
	return (
		<div className={className}>
			<div className="current-day">{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
			{isAddEvent ? (
				<AddNewEvent patterns={patterns} selectedDate={selectedDate} />
			) : (
				<div className="current-day-events">
					{isLoading ? (
						<Loader />
					) : (
						<div className="no-events-message">На выбранную дату не найдено тренировок</div>
					)}
				</div>
			)}
		</div>
	);
};

export const CurrentDate = styled(CurrentDateContainer)`
	border-left: 3px solid #393939;
	border-right: 3px solid #393939;
	border-radius: 20px;
	margin-bottom: 10px;
	margin-right: 30px;
	width: 30%;

	.current-day {
		font-size: 20px;
		color: #a2a2a2;
		text-align: center;
		padding: 10px 0;
		border-bottom: 3px solid #393939;
	}
	.save-new-event {
		background-color: #393939;
		color: #3eb942;

		&:hover {
			background-color: #3eb942;
			color: #393939;
		}
	}

	.no-events-message {
		color: #646464;
		padding: 0 20px;
		text-align: center;
	}

	.current-day-events {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 400px;
		position: relative;
	}
	.new-event-property {
		margin-bottom: 20px;
		width: 100%;
		color: #646464;
	}
	.new-event-selector {
		width: 100%;
		font-size: 15px;
		height: 25px;
		color: #a2a2a2;
		border: none;
		background-color: transparent;
		appearance: none;
		transition: filter 0.2s;
		outline: none;

		&:hover {
			cursor: pointer;
			filter: brightness(80%);
		}
	}
`;
