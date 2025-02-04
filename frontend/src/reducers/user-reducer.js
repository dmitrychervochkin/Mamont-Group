import { createSlice } from '@reduxjs/toolkit';
import { ROLE } from '../constants';

const initialState = {
	id: '',
	login: '',
	email: '',
	roleId: ROLE.GUEST,
	createdAt: '',
	icon: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return { ...state, ...action.payload };
		},
		userLogout: (state, action) => {
			return initialState;
		},
	},
	selectors: {
		selectUserLogin: (state) => state.login,
		selectUserId: (state) => state.id,
		selectRoleId: (state) => state.roleId,
	},
});

export const { setUser, userLogout } = userSlice.actions;
export const { selectUserLogin, selectUserId, selectRoleId } = userSlice.selectors;
export const userReducer = userSlice.reducer;
