import { ROUTE } from './constants/routeConstants';
import {
	HomePage,
	AdminPage,
	MusicPage,
	CommunityPage,
	WorkoutPage,
	AuthForm,
	HistoryPage,
} from './page';

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
		component: <HistoryPage />,
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
