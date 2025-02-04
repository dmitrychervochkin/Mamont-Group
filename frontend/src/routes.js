import { ROUTE } from './constants/routeConstants';
import { Authorization, HomePage, AdminPage, MusicPage, CommunityPage, WorkoutPage } from './page';

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
		component: <Authorization />,
	},
	{
		path: ROUTE.REGISTRATION,
		component: <Authorization />,
	},
	{
		path: ROUTE.HOMEPAGE,
		component: <HomePage />,
	},
];
