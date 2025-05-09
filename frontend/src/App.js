import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetError,
	selectErrorMessage,
	selectIsAddPattern,
	selectStartWorkout,
	setError,
	setUser,
	userLogout,
} from './reducers';
import { DropdownError, Footer, Header, Modal, RoutesSection } from './components';
import styled from 'styled-components';
import { WorkoutHeader } from './page/workoutPage/components/workoutHeader/workoutHeader';
import { jwtDecode } from 'jwt-decode';
import { server } from './bff';
import { INTERFACE } from './constants';

const AppContainer = ({ className }) => {
	const start = useSelector(selectStartWorkout);
	const isAddPattern = useSelector(selectIsAddPattern);
	const errorMessage = useSelector(selectErrorMessage);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				await server.check();

				const currentUserDataJSON = localStorage.getItem('token');
				if (!currentUserDataJSON) {
					dispatch(userLogout());
					return;
				}
				const currentUserData = jwtDecode(JSON.parse(currentUserDataJSON));
				console.log(currentUserData);
				dispatch(setUser({ ...currentUserData }));
			} catch (err) {
				dispatch(setError('Ошибка при получении данных' || err.message));
				setTimeout(() => dispatch(resetError()), 10000);
			}
		};
		fetchUserData();
	}, [dispatch]);

	return (
		<div className={className}>
			<Header />
			{errorMessage && <DropdownError>{errorMessage}</DropdownError>}
			{start && <WorkoutHeader start={start} />}
			<RoutesSection />
			{window.innerWidth < INTERFACE.WIDTH && <Footer />}
			<Modal />
		</div>
	);
};

export const App = styled(AppContainer)`
	margin-top: 90px;
	flex-direction: column;
	align-items: center;
	display: flex;
`;

// 1600 пикселей — для компьютеров;
// 960 пикселей — для планшетов;
// 375 пикселей — для телефонов.
