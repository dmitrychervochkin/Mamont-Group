import styled from 'styled-components';
import { Button, Heading } from '../../../components';
import { AuthInput } from './auth-input';
import { useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, setUser } from '../../../reducers';
import { AuthError } from './auth-error';
import { server } from '../../../bff';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните email!')
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Пожалуйста, введите корректный email!')
		.min(3, 'Email должен содержать минимум 3 символов!')
		.max(30, 'Слишком длинный email!'),
	password: yup
		.string()
		.required('Заполните пароль!')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль! Допускаются буквы и цифры и знаки "#", "%".')
		.min(6, 'Пароль должен содержать минимум 6 символов!')
		.max(30, 'Пароль должен содержать максимум 30 символов!'),
});

const AuthContainer = ({ className, setIsLoading }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [type, setType] = useState('password');
	const [serverError, setServerError] = useState(null);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	const onSubmit = ({ email, password }) => {
		setIsLoading(true);
		server.authorize(email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			setTimeout(() => {
				setIsLoading(false);
				dispatch(setUser(jwtDecode(res)));
			}, [1000]);
		});
		reset();
	};

	if (userId) {
		return <Navigate to="/" />;
	}

	const formError =
		errors?.email?.message ||
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<Heading>Авторизация</Heading>
			<form className="auth-container" onSubmit={handleSubmit(onSubmit)}>
				<AuthInput
					size="13px"
					margin="0 0 10px 0"
					type="email"
					placeholder="Введите email..."
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				>
					Email
				</AuthInput>
				<AuthInput
					size="13px"
					margin="0 0 10px 0"
					type={type}
					placeholder="Введите пароль..."
					setType={setType}
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				>
					Пароль
				</AuthInput>
				{errorMessage && <AuthError>{errorMessage}</AuthError>}
				<Button color="#3EB942" width="200px" disabled={!!formError}>
					Войти
				</Button>
			</form>
		</div>
	);
};

export const Auth = styled(AuthContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;

	.auth-container {
		margin: 30px 0px 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
