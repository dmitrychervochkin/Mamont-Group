import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectExercises,
	selectIsBreak,
	selectIsEditExerciseInfo,
	selectIsSuccessModal,
	selectIsWorkoutPreview,
	selectModalIsConfirm,
	selectModalIsExercises,
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
	selectIsEndOfBreak,
	selectStartWorkout,
	selectWorkout,
	selectWorkoutExercises,
	selectIsMobileGuide,
} from '../../reducers';

import { useMatch } from 'react-router-dom';
import {
	AddExercisesModalWindow,
	ConfirmModalWindow,
	EditExerciseInfoModal,
	MobileGuideModal,
	ReturnToWorkModal,
	SuccessModalWindow,
	WorkoutPreviewModal,
} from './components';

const ModalContainer = ({ className }) => {
	const workoutPage = useMatch('/workout');
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);
	const isConfirm = useSelector(selectModalIsConfirm);
	const isBreak = useSelector(selectIsBreak);
	const isSuccess = useSelector(selectIsSuccessModal);
	const isExercises = useSelector(selectModalIsExercises);
	const isEditExerciseInfo = useSelector(selectIsEditExerciseInfo);
	const isWorkoutPreview = useSelector(selectIsWorkoutPreview);
	const isEndOfBreak = useSelector(selectIsEndOfBreak);
	const isMobileGuide = useSelector(selectIsMobileGuide);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className + ' open-modal'}>
			<div className="overlay" onClick={onCancel}></div>
			{isEditExerciseInfo && <EditExerciseInfoModal onCancel={onCancel} onConfirm={onConfirm} />}
			{isEndOfBreak && <ReturnToWorkModal onCancel={onCancel} />}
			{isExercises && <AddExercisesModalWindow onCancel={onCancel} onConfirm={onConfirm} />}
			{isSuccess && <SuccessModalWindow text={text} onCancel={onCancel} />}
			{isConfirm && <ConfirmModalWindow onCancel={onCancel} text={text} onConfirm={onConfirm} />}
			{isWorkoutPreview && <WorkoutPreviewModal onCancel={onCancel} onConfirm={onConfirm} />}
			{isMobileGuide && <MobileGuideModal onCancel={onCancel} />}
		</div>
	);
};
export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 2000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}
`;
