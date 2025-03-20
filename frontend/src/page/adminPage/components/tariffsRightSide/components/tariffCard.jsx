import styled from 'styled-components';
import { Button, Icon } from '../../../../../components';
import { ICON } from '../../../../../constants';
import { useState } from 'react';
import { TariffEditCard } from './tariffEditCard';

const TariffCardContainer = ({ className, item }) => {
	const { id, name, discription, price, sale } = item;
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className={className}>
			{isEdit ? (
				<TariffEditCard item={item} setIsEdit={setIsEdit} />
			) : (
				<>
					<div className="tariff-img">img</div>
					<div className="tariff-card-main">
						<div className="tariff-card-header">
							<div style={{ fontSize: '20px' }}>{name}</div>
							<div style={{ display: 'flex' }}>
								<Icon height="25px" name={ICON.EDIT} onClick={() => setIsEdit(true)} />
								<Icon height="25px" name={ICON.CROSS} />
							</div>
						</div>
						<div style={{ color: '#a2a2a2', margin: '5px 0 10px 0' }}>{discription}</div>
						<div className="tariff-card-footer">
							<div>Скидка: {sale}%</div>
							<div>Цена: {price}руб/мес</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export const TariffCard = styled(TariffCardContainer)`
	display: flex;
	align-items: center;
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
`;
