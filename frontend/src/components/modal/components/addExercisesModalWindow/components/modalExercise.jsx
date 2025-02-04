import styled from 'styled-components';
import { findItem } from '../../../../../utils';
import { Icon } from '../../../../icon/icon';
import { ICON } from '../../../../../constants';
import { useSelector } from 'react-redux';
import { selectTypes } from '../../../../../reducers';
import { TYPE } from '../../../../../constants/infoTypesConstants';
import { useEffect, useState } from 'react';
import { server } from '../../../../../bff';

const ModalExerciseContainer = ({
	className,
	id,
	name,
	type,
	userExercises,
	currentExercise,
	setCurrentExercise,
}) => {
	const types = useSelector(selectTypes);
	const [exerciseImg, setExerciseImg] = useState('');
	const [inactiveExercise, setInactiveExercise] = useState(false);

	const onExerciseClick = (id) => {
		// if (userExercises.length === 0) {
		// 	setCurrentExercise([...currentExercise, id]);
		// }
		if (currentExercise.includes(id)) {
			setCurrentExercise(currentExercise.filter((item) => item !== id));
		} else {
			// let obj = userExercises.find((item) => item.id === id);
			// if (obj === undefined) {
			setCurrentExercise([...currentExercise, id]);
			// setInactiveExercise(false);
			// } else {
			// 	setInactiveExercise(true);
			// }
		}
	};

	useEffect(() => {
		server.fetchExerciseInfo(id).then(({ res }) => {
			setExerciseImg(res.find((item) => item.type === TYPE.IMAGE)?.discription);
		});
	}, []);

	return (
		<div
			className={className}
			style={{ backgroundColor: (inactiveExercise || currentExercise?.includes(id)) && '#141414' }}
			onClick={() => onExerciseClick(id)}
		>
			<div style={{ display: 'flex' }}>
				<img
					style={{ height: '60px', width: '60px' }}
					src={exerciseImg && process.env.REACT_APP_API_URL + exerciseImg}
				/>
				<div
					style={{
						margin: '0 0 0 20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
						padding: '5px 0',
					}}
				>
					<div>{name}</div>
					<div style={{ opacity: '0.6' }}>{type?.name}</div>
				</div>
			</div>
			{currentExercise?.includes(id) && <Icon name={ICON.CHECK} />}
		</div>
	);
};

export const ModalExercise = styled(ModalExerciseContainer)`
	display: flex;
	padding: 10px 20px 10px 20px;
	justify-content: space-between;
	// margin: 10px 10px;
	border-bottom: 1px solid #393939;

	&:hover {
		background-color: #393939;
		cursor: pointer;
		transition: background-color 0.3s;
	}
`;
