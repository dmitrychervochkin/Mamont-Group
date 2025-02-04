import styled from 'styled-components';
import { Button, Input, Select } from '../../../../../../components';
import { useState } from 'react';
import { COMPLEXITY } from '../../../../../../constants';

const AddNewEventContainer = ({ className, selectedDate, patterns }) => {
	const [newNameEvent, setNewNameEvent] = useState('');
	const [newPatternEvent, setNewPatternEvent] = useState(patterns[0]?.name);
	const [newComplexityEvent, setNewComplexityEvent] = useState(COMPLEXITY[0]?.ru);

	const onSaveNewEvent = () => {
		console.log(selectedDate);
		console.log(newNameEvent);
		console.log(newPatternEvent);
		console.log(newComplexityEvent);
	};

	return (
		<div className={className}>
			<div>
				<div className="new-event-property">
					<div style={{ marginBottom: '5px' }}>Название события:</div>
					<Input
						width="240px"
						value={newNameEvent}
						placeholder="Укажите название события..."
						onChange={(e) => setNewNameEvent(e.target.value)}
					/>
				</div>
				<div className="new-event-property">
					<div style={{ marginBottom: '5px' }}>Выберите шаблон:</div>
					<Select
						array={patterns}
						currentValue={patterns[0].name}
						value="name"
						state={newPatternEvent}
						setState={setNewPatternEvent}
					/>
				</div>
				<div className="new-event-property">
					<div style={{ marginBottom: '5px' }}>Укажите сложность тренировки:</div>
					<Select
						array={COMPLEXITY}
						currentValue={COMPLEXITY[0].ru}
						value="ru"
						state={newComplexityEvent}
						setState={setNewComplexityEvent}
					/>
				</div>
			</div>
			<Button className="save-new-event" onClick={onSaveNewEvent}>
				Сохранить
			</Button>
		</div>
	);
};

export const AddNewEvent = styled(AddNewEventContainer)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	padding: 10px 10px 55px 10px;
	height: 100%;
`;
