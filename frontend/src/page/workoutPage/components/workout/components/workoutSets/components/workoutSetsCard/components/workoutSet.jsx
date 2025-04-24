import styled from 'styled-components';
import { Checkbox, Icon, Input } from '../../../../../../../../../components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectBreakTime,
	selectIsBreak,
	selectWorkoutExercises,
	setUserWorkoutExercises,
	setWorkoutExercises,
	startBreak,
	stopBreak,
} from '../../../../../../../../../reducers';
import { ICON, INTERFACE } from '../../../../../../../../../constants';
import { COLOR } from '../../../../../../../../../constants/colorsConstants';

const WorkoutSetContainer = ({
	className,
	id,
	reps,
	set,
	weight,
	prev,
	userExerciseId,
	workoutExercises,
	setCalories,
	calories,
}) => {
	const [checked, setChecked] = useState(false);
	const [repsValue, setRepsValue] = useState(reps || '');
	const [weightValue, setWeightValue] = useState(weight || '');
	const [navMenu, setNavMenu] = useState(false);
	const isBreak = useSelector(selectIsBreak);
	const breakTime = useSelector(selectBreakTime);
	const dispatch = useDispatch();

	const onSaveSet = async () => {
		if (!isBreak && !checked) {
			setCalories(Math.round(calories + (repsValue * weightValue) / 3.5));
			dispatch(startBreak(breakTime));
		} else if (isBreak && !checked) {
			setCalories(Math.round(calories + (repsValue * weightValue) / 3.5));
			await dispatch(stopBreak());
			await dispatch(startBreak(breakTime));
		} else if (isBreak && checked) {
			setCalories(Math.round(calories - (repsValue * weightValue) / 3.5));
			dispatch(stopBreak());
		} else if (!isBreak && checked) {
			setCalories(Math.round(calories - (repsValue * weightValue) / 3.5));
		}

		let workoutExerciseCopy = [...workoutExercises];
		workoutExerciseCopy = workoutExerciseCopy.map((item) =>
			item.id === id ? { ...item, reps: repsValue, weight: weightValue, prev: prev } : item,
		);
		dispatch(setUserWorkoutExercises(workoutExerciseCopy));
	};
	const onSetDelete = () => {
		let userStringSet = [
			...workoutExercises
				.filter((item) => item.userExerciseId === userExerciseId)
				.filter((item) => item.set !== set),
		];
		let count = 0;
		userStringSet = userStringSet.map((item) => {
			count++;
			return { ...item, set: count };
		});

		dispatch(
			setUserWorkoutExercises([
				...workoutExercises.filter((item) => item.userExerciseId !== userExerciseId),
				...userStringSet,
			]),
		);
	};

	const onRepsChange = (target) => {
		if (target.value === '') {
			setRepsValue(target.value);
			let workoutExerciseCopy = [...workoutExercises];
			workoutExerciseCopy = workoutExerciseCopy.map((item) =>
				item.id === id ? { ...item, reps: target.value } : item,
			);
			dispatch(setUserWorkoutExercises(workoutExerciseCopy));
		}
		if (+target.value) {
			setRepsValue(target.value);
		}
	};

	const onWeightChange = (target) => {
		if (target.value === '') {
			setWeightValue(target.value);
			let workoutExerciseCopy = [...workoutExercises];
			workoutExerciseCopy = workoutExerciseCopy.map((item) =>
				item.id === id ? { ...item, weight: target.value } : item,
			);
			dispatch(setUserWorkoutExercises(workoutExerciseCopy));
		}
		if (+target.value) {
			setWeightValue(target.value);
		}
	};

	const onNavMenuHandler = (e) => {
		let workoutExerciseCopy = [...workoutExercises];
		workoutExerciseCopy = workoutExerciseCopy.map((item) =>
			item.id === id ? { ...item, set: e.target.id } : item,
		);

		dispatch(setUserWorkoutExercises(workoutExerciseCopy));
		setNavMenu(false);
	};

	const onRepNumberHandler = () => {
		if (typeof set === 'number') {
			setNavMenu(!navMenu);
		} else {
			let userStringSet = [
				...workoutExercises.filter((item) => item.userExerciseId === userExerciseId),
			];

			let count = 0;
			userStringSet = userStringSet.map((item) => {
				count++;
				return item.id === id ? { ...item, set: count } : item;
			});
			dispatch(
				setUserWorkoutExercises([
					...workoutExercises.filter((item) => item.userExerciseId !== userExerciseId),
					...userStringSet,
				]),
			);
		}
	};

	return (
		<div
			className={className}
			style={{
				// opacity: checked ? 0.3 : 1,
				backgroundColor: checked ? '#8CDC8C50' : '#222222',
				borderBottom: checked ? '2px solid #393939' : 'none',
			}}
		>
			<span
				id="rep-number-btn"
				className="rep-number"
				style={{
					color:
						set === 'Д'
							? COLOR.BLUE.BOLDER
							: set === 'Н'
							? COLOR.RED.BOLDER
							: set === 'Р'
							? COLOR.GREEN.BOLDER
							: 'white',
					backgroundColor:
						set === 'Д'
							? COLOR.BLUE.MAIN
							: set === 'Н'
							? COLOR.RED.LIGHT
							: set === 'Р'
							? COLOR.GREEN.LIGHT
							: '#393939',
				}}
				// onMouseEnter={() => setNavMenu(true)}
				// onMouseLeave={() => setNavMenu(false)}
				onClick={onRepNumberHandler}
			>
				{set}
			</span>
			{navMenu && (
				<div
					id="rep-number-nav-menu"
					className="rep-number-nav-menu"
					// onMouseEnter={() => setNavMenu(true)}
					onMouseLeave={() => setNavMenu(false)}
					style={{
						animation: navMenu ? 'showMenu 0.3s linear' : '0.3s linear showMenu reverse',
						opacity: navMenu ? 1 : 0,
						zIndex: navMenu ? 3 : -1,
					}}
				>
					<div id="Р" className="rep-number-menu-li" onClick={onNavMenuHandler}>
						<div id="Р" className="rep-number-menu-letter" style={{ color: COLOR.GREEN.LIGHT }}>
							P
						</div>
						Разминка
					</div>
					<div id="Д" className="rep-number-menu-li" onClick={onNavMenuHandler}>
						<div id="Д" className="rep-number-menu-letter" style={{ color: COLOR.BLUE.MAIN }}>
							Д
						</div>
						Дроп-сет
					</div>
					<div id="Н" className="rep-number-menu-li" onClick={onNavMenuHandler}>
						<div id="Н" className="rep-number-menu-letter" style={{ color: COLOR.RED.LIGHT }}>
							Н
						</div>
						Неудачный подход
					</div>
				</div>
			)}
			<div style={{ color: checked ? '#222222' : '#a2a2a2' }} className="rep-last-result">
				{prev ? prev : '-'}
			</div>
			<div className="current-rep">
				<Input
					style={{ textAlign: 'center', opacity: checked && '0.5' }}
					placeholder={weightValue !== '' ? weight + 'кг' : 'Укажите вес'}
					width={window.innerWidth > INTERFACE.WIDTH ? '200px' : '100%'}
					disabled={checked}
					value={checked && weightValue !== '' ? weightValue + 'кг' : weightValue}
					onChange={(e) => onWeightChange(e.target)}
				/>
			</div>
			<div className="current-rep">
				<Input
					style={{ textAlign: 'center', opacity: checked && '0.5' }}
					placeholder={repsValue ? reps : 'Укажите повторения'}
					width={window.innerWidth > INTERFACE.WIDTH ? '200px' : '100%'}
					disabled={checked}
					value={checked ? repsValue : repsValue}
					onChange={(e) => onRepsChange(e.target)}
				/>
			</div>
			<div className="exercise-set-icons">
				<Checkbox checked={checked} setChecked={setChecked} onClick={onSaveSet} />
				<Icon
					name={ICON.CROSS}
					height="30px"
					style={{ display: checked && 'none' }}
					margin="0 0 0 5px"
					onClick={onSetDelete}
				/>
			</div>
		</div>
	);
};

export const WorkoutSet = styled(WorkoutSetContainer)`
	font-size: 20px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 5px 0px;
	animation: addSet 0.2s linear;
	// box-shadow: 0 5px 5px 2px #141414;
	position: relative;
	border-radius: 10px;
	transition: background-color 0.2s;

	@keyframes addSet {
		0% {
			margin-top: -50px;
			z-index: -1;
			// position: absolute;
		}
		50% {
			margin-top: -25px;
			z-index: -1;

			// position: absolute;
		}
		100% {
			margin-top: 0px;
			z-index: -1;
			// position: absolute;
		}
	}
	@keyframes showMenu {
		0% {
			display: none;
			opacity: 0;
		}
		10% {
			display: block;
			opacity: 0.1;
		}
		100% {
			display: block;
			opacity: 1;
		}
	}
	.rep-number-nav-menu {
		background-color: #393939;
		position: absolute;
		width: 200px;
		left: 50px;
		box-shadow: 0 0 5px 1px #646464;
		top: 5px;
		border-radius: 15px;

		flex-direction: column;
		align-items: flex-start;
		padding: 5px 0;
		transition: opacity 0.3s, max-height 1.5s;
		font-size: 15px;
		justify-content: center;
		overflow: hidden;
		display: flex;
	}
	.rep-number-menu-li {
		padding: 8px 0;
		display: flex;
		align-items: center;
		width: 100%;

		&:hover {
			cursor: pointer;
			background-color: #646464;
		}
	}
	.rep-number-menu-letter {
		width: 30px;
		font-weight: 700;
		font-size: 17px;
		text-align: center;
	}

	.rep-number {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		width: 40px;
		border-radius: 10px;
		transition: filter 0.3s;
		border: 3px solid #393939;

		&:hover {
			filter: brightness(120%);
			cursor: pointer;
		}
	}
	.rep-last-result {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #a2a2a2;
		width: 250px;
	}
	.current-rep {
		height: 40px;
		background-color: #393939;
		max-width: 200px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.exercise-set-icons {
		display: flex;
		align-items: center;
		width: 75px;
	}
`;
