import styled from 'styled-components';
import { Heading, Search } from '../../../../components';
import { Link } from 'react-router-dom';
import { TariffCard } from './components/tariffCard';
import { useState } from 'react';
import { AddNewTariff } from './components/addNewTariff';

const initialState = [
	{
		id: 1,
		name: 'Mouse',
		discription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, delectus in. Adipisci quidem ea voluptates pariatur quisquam vero veritatis consectetur quod quae rem, neque nihil earum esse eius quo autem ipsum nostrum soluta magnam maiores voluptatum facilis dolore explicabo perferendis?',
		price: 200,
		sale: 20,
		img: '#',
	},
	{
		id: 2,
		name: 'Mouse',
		discription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, delectus in. Adipisci quidem ea voluptates pariatur quisquam vero veritatis consectetur quod quae rem, neque nihil earum esse eius quo autem ipsum nostrum soluta magnam maiores voluptatum facilis dolore explicabo perferendis?',
		price: 200,
		sale: 20,
		img: '#',
	},
];

const TariffsRightSideContainer = ({ className }) => {
	const [isSaveTariff, setIsSetTariff] = useState(false);
	const [isAdd, setIsAdd] = useState(false);

	return (
		<div className={className}>
			<div className="right-side-header">
				<Heading>Подписки</Heading>
				{!isAdd && <div className="add-new-tariff" onClick={() => setIsAdd(true)}>
					<Heading color="#3EB942">+</Heading>
					<Heading weight="400" size="20px" margin="7px 0 0 5px" color="#3EB942">
						NEW
					</Heading>
				</div>}
			</div>
			<div className="right-side-main">
				<div className="right-side-main-header">
					<Search />
				</div>
			</div>
			<div className="tariffs-main">
				{isAdd && <AddNewTariff setIsAdd={setIsAdd} />}
				{initialState.map((item) => (
					<TariffCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export const TariffsRightSide = styled(TariffsRightSideContainer)`
	.right-side-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.add-new-tariff {
		display: flex;
		align-items: center;
		transition: filter 0.2s;

		&:hover {
			cursor: pointer;
			filter: brightness(80%);
		}
	}

	.right-side-main {
		margin-top: 10px;
	}
`;
