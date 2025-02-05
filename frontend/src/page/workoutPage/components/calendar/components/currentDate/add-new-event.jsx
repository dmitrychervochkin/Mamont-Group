import styled from 'styled-components';
import { Button, Icon, Input, Select } from '../../../../../../components';
import { useEffect, useState } from 'react';
import { COMPLEXITY, ICON } from '../../../../../../constants';
import { server } from '../../../../../../bff';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectUserId, setError } from '../../../../../../reducers';

const AddNewEventContainer = ({ className, selectedDate, patterns, setIsSave, setIsAddEvent }) => {
	const [newNameEvent, setNewNameEvent] = useState('');
	const [types, setTypes] = useState([]);
	const [newPatternEvent, setNewPatternEvent] = useState(patterns[0]);
	const [newComplexityEvent, setNewComplexityEvent] = useState(COMPLEXITY[0]);
	const [newTypesEvent, setNewTypesEvent] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	useEffect(() => {
		server.fetchTypes().then(({ res }) => setTypes(res));
	}, []);

	const onSaveNewEvent = () => {
		if (newNameEvent === '') {
			dispatch(setError('Заполните название события!'));
			setTimeout(() => dispatch(resetError()), [3000]);
		} else {
			setIsSave(true);
			server.saveCalendarEvent(
				{
					date: selectedDate.toString(),
					complexity: newComplexityEvent.en,
					patternId: newPatternEvent.id,
					userId: userId,
					name: newNameEvent,
				},
				newTypesEvent,
			);
		}
	};

	const onAddTypeHandler = (item) => {
		if (newTypesEvent.find((type) => type.id === item.id)) {
			setNewTypesEvent([...newTypesEvent.filter((type) => type.id !== item.id)]);
		} else {
			setNewTypesEvent([...newTypesEvent, item]);
		}
	};
	const onAddedTypeClicked = (item) => {
		setNewTypesEvent([...newTypesEvent.filter((type) => type.id !== item.id)]);
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
				<div className="new-event-property">
					<div style={{ marginBottom: '5px' }}>Добавьте мышечные группы:</div>
					{isOpen && (
						<div className="types-dropdown">
							{types.map((item) => (
								<div
									style={{
										color: newTypesEvent.find((type) => type.id === item.id) && 'white',
									}}
									className="type-in-dropdown"
									onClick={() => onAddTypeHandler(item)}
								>
									{item.name}
								</div>
							))}
							<Icon
								height="25px"
								name={ICON.CROSS}
								style={{ position: 'absolute', top: '5px', right: '5px' }}
								onClick={() => setIsOpen(false)}
							/>
						</div>
					)}
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{newTypesEvent.map((item, i) => (
							<div className="added-event-type" onClick={() => onAddedTypeClicked(item)}>
								{item.name}
								{i + 1 !== types.length && newTypesEvent.length > 1 && ','}
							</div>
						))}
						{newTypesEvent.length === types.length ? (
							<div></div>
						) : (
							<div className="add-event-types-btn" onClick={() => setIsOpen(!isOpen)}>
								Добавить
							</div>
						)}
					</div>
				</div>
			</div>
			<div style={{ width: '100%' }}>
				<Button className="save-new-event" style={{ marginBottom: '10px' }} onClick={onSaveNewEvent}>
					Сохранить
				</Button>
				<Button onClick={() => setIsAddEvent(false)}>Отмена</Button>
			</div>
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

	.new-event-property {
		margin-bottom: 20px;
		width: 100%;
		color: #646464;
		position: relative;
	}
	.save-new-event {
		background-color: #393939;
		color: #3eb942;

		&:hover {
			background-color: #3eb942;
			color: #393939;
		}
	}
	.types-dropdown {
		background-color: #393939;
		width: 150px;
		padding: 5px;
		border-radius: 5px;
		position: absolute;
		box-shadow: 0 0 10px 2px #141414;
	}
	.type-in-dropdown {
		padding: 5px 10px;
		border-radius: 5px;
		color: #a2a2a2;
		transition: background-color: 0.2s, color 0.2s;

		&:hover {
			background-color: #646464;
			color: white;
			cursor: pointer;
		}
	}
	.add-event-types-btn{
		color: #a2a2a2;
		transition: color 0.2s;

		&:hover{
			color: white;
			cursor: pointer;
		}
	}
	.added-event-type{
		margin: 0 5px 0 0;
		color: #a2a2a2;
		transition: color 0.2s;

		&:hover{
			cursor: pointer;
			color: #E74E4E;
		}
	}
`;
