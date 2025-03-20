import styled from 'styled-components';
import { Button, Icon, Input } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { useState } from 'react';

const AddNewTariffContainer = ({ className, setIsAdd }) => {
	const [tariffData, setTariffData] = useState({
		name: '',
		discription: '',
		price: '',
		sale: '',
	});

	const onDiscriptionChange = (e) => {
		setTariffData({ ...tariffData, discription: e.target.value });
	};
	const onNameChange = (e) => {
		setTariffData({ ...tariffData, name: e.target.value });
	};

	return (
		<div className={className}>
			<div className="tariff-img">img</div>
			<div className="tariff-card-main">
				<div className="tariff-card-header">
					<Input
						style={{ fontSize: '20px' }}
						defaultValue={tariffData.name}
						onChange={(e) => onNameChange(e)}
						placeholder="Название тарифа..."
					/>
					<div style={{ display: 'flex' }}>
						<Icon height="25px" name={ICON.CROSS} onClick={() => setIsAdd(false)} />
					</div>
				</div>
				<textarea
					placeholder="Сделайте описание для тарифа..."
					className="edit-tariff-discription"
					defaultValue={tariffData.discription}
					onChange={(e) => onDiscriptionChange(e)}
				/>
				<div className="tariff-card-footer">
					<div style={{ display: 'flex', alignItems: 'center' }}>
						Скидка:
						<input
							className="tariff-price-input"
							placeholder="Скидка..."
							defaultValue={tariffData.sale}
						/>
						%
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						Цена:
						<input
							className="tariff-price-input"
							placeholder="Цена..."
							defaultValue={tariffData.price}
						/>
						руб/мес
					</div>
				</div>
			</div>
		</div>
	);
};

export const AddNewTariff = styled(AddNewTariffContainer)`
	display: flex;
	// align-items: center;
	padding: 20px 0;
	border-bottom: 2px solid #393939;

	.tariff-img {
		text-align: center;
		padding: 50px 0;
		height: 120px;
		width: 120px;
		background-color: #646464;
		margin-right: 20px;
		border-radius: 10px;
	}

	.tariff-card-main {
		width: 425px;
	}

	.tariff-card-footer {
		display: flex;
		justify-content: space-between;
	}
	.tariff-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.edit-tariff-discription {
		color: white;
		width: 100%;
		height: 100px;
		outline: none;
		background: #222222;
		border: none;
		border-radius: 5px;
		margin: 5px 0 10px 0;
		font-size: 14px;
		resize: none;
	}
	.tariff-price-input {
		width: 80px;
		padding: 5px 10px;
		border-radius: 5px;
		outline: none;
		border: none;
		background-color: #393939;
		color: #a2a2a2;
		font-size: 15px;
		margin: 0 10px;
	}
`;
