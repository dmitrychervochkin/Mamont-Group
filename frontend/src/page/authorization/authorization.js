import styled from 'styled-components';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTE } from '../../constants/routeConstants';
import { Auth, Register } from './components';
import { Loader } from '../../components';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../reducers';

const AuthorizationContainer = ({ className }) => {
	const [isRegister, setIsRegister] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const userId = useSelector(selectUserId);

	return (
		<div className={className}>
			{isRegister ? <Register setIsLoading={setIsLoading} /> : <Auth setIsLoading={setIsLoading} />}
			{isLoading ? (
				<div style={{marginTop: '20px'}}>
					<Loader />
				</div>
			) : (
				<div className="auth-footer">
					<p className="text">или</p>
					<Link
						to={isRegister ? ROUTE.LOGIN : ROUTE.REGISTRATION}
						className="auth-footer-text"
						onClick={() => setIsRegister(!isRegister)}
					>
						{isRegister ? 'Войти в аккаунт' : 'Зарегистрироваться'}
					</Link>
				</div>
			)}
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	// margin: 10px 0px;
	width: 1000px;
	// min-height: 620px;
	height: calc(100vh - 110px);
	background-color: #222222;
	border-radius: 20px;
	display: flex;
	flex-direction: column;

	.auth-footer {
		font-size: 13px;
		text-align: center;
		margin-bottom: 40px;
	}
	.text {
		filter: brightness(70%);
	}
`;
