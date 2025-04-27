import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: {
		isSuccess: false,
		isMobileGuide: false,
		isExercises: false,
		isOpen: false,
		isConfirm: false,
		text: '',
		onConfirm: null,
		onCancel: null,
		isEditExerciseInfo: false,
		workoutPreview: false,
		isEndOfBreak: false,
	},
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			return { ...state, modal: { ...state.modal, ...action.payload, isOpen: true } };
		},
		closeModal: (state, action) => {
			return { ...state, modal: initialState.modal };
		},
	},
	selectors: {
		selectModal: (state) => state.modal,
		selectModalText: (state) => state.modal.text,
		selectModalOnConfirm: (state) => state.modal.onConfirm,
		selectModalOnCancel: (state) => state.modal.onCancel,
		selectModalIsOpen: (state) => state.modal.isOpen,
		selectModalIsExercises: (state) => state.modal.isExercises,
		selectModalIsConfirm: (state) => state.modal.isConfirm,
		selectIsSuccessModal: (state) => state.modal.isSuccess,
		selectIsEditExerciseInfo: (state) => state.modal.isEditExerciseInfo,
		selectIsWorkoutPreview: (state) => state.modal.workoutPreview,
		selectIsEndOfBreak: (state) => state.modal.isEndOfBreak,
		selectIsMobileGuide: (state) => state.modal.isMobileGuide,
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export const {
	selectModal,
	selectModalIsOpen,
	selectModalOnConfirm,
	selectModalOnCancel,
	selectModalText,
	selectModalIsExercises,
	selectModalIsConfirm,
	selectIsSuccessModal,
	selectIsEditExerciseInfo,
	selectIsWorkoutPreview,
	selectIsEndOfBreak,
	selectIsMobileGuide,
} = modalSlice.selectors;
export const modalReducer = modalSlice.reducer;
