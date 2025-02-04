import { useSelector } from 'react-redux';
import { Navigate, redirect, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectIsLoading, selectRoleId, selectStartWorkout, selectUserId } from '../../reducers';
import { authRoutes, publicRoutes } from '../../routes';
import { AccessError } from '../accessError/accessError';
import { Loader } from '../loader/loader';
import { useEffect, useState } from 'react';
import { WorkoutHeader } from '../../page/workoutPage/components/workoutHeader/workoutHeader';

const RoutesSectionContainer = ({ className }) => {
	let navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const start = useSelector(selectStartWorkout);
	const workoutPage = useMatch('/workout');
	const loginPage = useMatch('/login');
	const isAuth = !!userId;

	return (
		//style={{ marginTop: !workoutPage && start && '110px' }}
		<section className={className}>
			<Routes>
				{isAuth &&
					authRoutes.map(({ path, component }) => (
						<Route key={path} path={path} element={component} exact />
					))}
				{publicRoutes.map(({ path, component }) => (
					<Route key={path} path={path} element={component} exact />
				))}
				<Route path="*" element={<Navigate to="/" />} exact />
			</Routes>
			{/* )} */}
		</section>
	);
};

export const RoutesSection = styled(RoutesSectionContainer)`
	margin-bottom: 10px;
	position: relative;
	height: calc(100vh - 110px);
	width: 1000px;
	transition: margin 0.5s, opacity 0.5s, max-height 1.5s;
`;
