import { ROUTE } from './constants/routeConstants';
import { Authorization, HomePage, AdminPage, MusicPage, CommunityPage, WorkoutPage, AuthForm } from './page';

export const authRoutes = [
	{
		path: ROUTE.ADMIN,
		component: <AdminPage />,
	},
	{
		path: ROUTE.WORKOUT,
		component: <WorkoutPage />,
	},
	{
		path: ROUTE.HISTORY,
		component: <WorkoutPage />,
	},
	{
		path: ROUTE.MUSIC,
		component: <MusicPage />,
	},
	{
		path: ROUTE.COMMUNITY,
		component: <CommunityPage />,
	},
];

export const publicRoutes = [
	{
		path: ROUTE.LOGIN,
		component: <AuthForm type="login" />,
	},
	{
		path: ROUTE.REGISTRATION,
		component: <AuthForm type="register" />,
	},
	{
		path: ROUTE.RESET,
		component: <AuthForm type="reset" />,
	},
	{
		path: ROUTE.HOMEPAGE,
		component: <HomePage />,
	},
];
