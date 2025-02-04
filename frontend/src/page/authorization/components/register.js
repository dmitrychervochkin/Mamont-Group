import styled from 'styled-components';
import { Button, Heading, Input } from '../../../components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthInput } from './auth-input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from './auth-error';
import { server } from '../../../bff';
import { selectUserId, setUser } from '../../../reducers';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const regFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните email!')
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Пожалуйста, введите корректный email!')
		.min(3, 'Email должен содержать минимум 3 символов!')
		.max(30, 'Слишком длинный email!'),
	login: yup
		.string()
		.required('Заполните логин!')
		.matches(/^[a-z0-9_-]{3,16}$/, 'Пожалуйста, введите корректный логин!!')
		.min(3, 'Логин должен содержать минимум 3 символов!')
		.max(18, 'Логин должен содержать максимум 18 символов!'),
	password: yup
		.string()
		.required('Заполните пароль!')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль! Допускаются буквы и цифры и знаки "#", "%".')
		.min(6, 'Пароль должен содержать минимум 6 символов!')
		.max(30, 'Пароль должен содержать максимум 30 символов!'),
	passcheck: yup
		.string()
		.required('Повторите пароль!')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают!'),
});

const RegisterContainer = ({ className, setIsLoading }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const [type1, setType1] = useState('password');
	const [type2, setType2] = useState('password');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	const onSubmit = ({ email, login, password }) => {
		setIsLoading(true);
		server.register(email, login, password).then(({ error, res }) => {
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
	const errorMessage = serverError || formError;

	return (
		<div className={className}>
			<Heading>Регистрация</Heading>
			<form className="register-container" onSubmit={handleSubmit(onSubmit)}>
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
					type="login"
					placeholder="Введите логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				>
					Логин
				</AuthInput>
				<AuthInput
					size="13px"
					margin="0 0 10px 0"
					type={type1}
					placeholder="Введите пароль..."
					setType={setType1}
					{...register('password', { onChange: () => setServerError(null) })}
				>
					Пароль
				</AuthInput>
				<AuthInput
					size="13px"
					margin="0 0 10px 0"
					type={type2}
					placeholder="Повторите пароль..."
					setType={setType2}
					{...register('passcheck', { onChange: () => setServerError(null) })}
				>
					Повторите пароль
				</AuthInput>
				{errorMessage && <AuthError>{errorMessage}</AuthError>}
				<Button color="#3EB942" width="200px" disabled={!!formError}>
					Создать аккаунт
				</Button>
			</form>
		</div>
	);
};
export const Register = styled(RegisterContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 30px;

	.register-container {
		margin: 30px 0px 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
