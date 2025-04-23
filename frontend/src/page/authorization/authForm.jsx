import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Heading, Loader } from '../../components';
import InputField from '../../components/input/inputField';
import ButtonField from '../../components/button/buttonField';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectUserId, setError, setUser } from '../../reducers';
import { server } from '../../bff';
import { jwtDecode } from 'jwt-decode';

const emailField = yup
	.string()
	.email('Неверный email')
	.required('Введите email!')
	.matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Пожалуйста, введите корректный email!')
	.min(3, 'Минимум 3 символов!')
	.max(30, 'Слишком длинный email!');

const registerSchema = yup.object({
	email: emailField,
	login: yup
		.string()
		.min(3, 'Минимум 3 символа')
		.required('Введите логин!')
		.matches(/^[a-z0-9_-]{3,16}$/, 'Пожалуйста, введите корректный логин!!')
		.min(3, 'Минимум 3 символов!')
		.max(18, 'Максимум 18 символов!'),
	password: yup
		.string()
		.required('Заполните пароль!')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль! Допускаются буквы и цифры и знаки "#", "%".')
		.min(6, 'Минимум 6 символов!')
		.max(30, 'Максимум 30 символов!'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Подтвердите пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль! Допускаются буквы и цифры и знаки "#", "%".')
		.min(6, 'Минимум 6 символов!')
		.max(30, 'Максимум 30 символов!'),
});

const loginSchema = yup.object({
	email: emailField,
	password: yup.string().required('Введите пароль'),
});

const resetSchema = yup.object({ email: emailField });

const AuthFormContainer = ({ className, type }) => {
	const schema = type === 'register' ? registerSchema : type === 'reset' ? resetSchema : loginSchema;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();

	useEffect(() => {
		clearErrors();
	}, [type]);

	const onSubmit = ({ email, login, password }) => {
		setIsLoading(true);

		const request =
			type === 'login'
				? server.authorize(email, password)
				: type === 'register'
				? server.register(email, login, password)
				: type === 'reset'
				? server.resetPassword(email, login, password)
				: null;

		if (!request) return;

		request.then(({ error, res }) => {
			if (error) {
				dispatch(setError(`Ошибка запроса: ${error}`));
				setTimeout(() => {
					dispatch(resetError());
				}, 3000); // Задержка для очистки ошибки
				return;
			}

			setTimeout(() => {
				setIsLoading(false);
				dispatch(setUser(jwtDecode(res)));
				reset(); // Сбрасываем форму только если запрос успешен
			}, 1000);
		});
	};

	const handleInputChange = useCallback(
		(name) => (e) => {
			setValue(name, e.target.value, { shouldValidate: true });
			clearErrors(name);
		},
		[setValue, clearErrors],
	);

	if (userId) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<Heading>
				{type === 'register' ? 'Регистрация' : type === 'reset' ? 'Сброс пароля' : 'Вход'}
			</Heading>
			<form onSubmit={handleSubmit(onSubmit)} className="auth-container">
				<InputField
					style={{ marginBottom: '20px' }}
					label="Email"
					placeholder="Введите email..."
					register={register('email')}
					error={errors?.email}
					onChange={handleInputChange('email')}
				/>

				{(type === 'register' || type === 'reset') && (
					<InputField
						style={{ marginBottom: '20px' }}
						label="Логин"
						placeholder="Введите логин..."
						register={register('login')}
						error={errors?.username}
						onChange={handleInputChange('login')}
					/>
				)}

				<InputField
					style={{ marginBottom: '20px' }}
					label="Пароль"
					placeholder="Введите пароль..."
					type="password"
					register={register('password')}
					error={errors?.password}
					onChange={handleInputChange('password')}
				/>

				{(type === 'register' || type === 'reset') && (
					<InputField
						style={{ marginBottom: '20px' }}
						label="Повторите пароль"
						placeholder="Повторите пароль..."
						type="password"
						register={register('confirmPassword')}
						error={errors?.confirmPassword}
						onChange={handleInputChange('confirmPassword')}
					/>
				)}

				<ButtonField variant="auth" type="submit">
					{type === 'register'
						? 'Зарегистрироваться'
						: type === 'reset'
						? 'Сбросить пароль'
						: 'Войти'}
				</ButtonField>
			</form>
			{isLoading ? (
				<div style={{ marginTop: '20px' }}>
					<Loader />
				</div>
			) : (
				<div
					style={{
						marginTop: '15px',
						display: 'flex',
						width: '350px',
						justifyContent: 'space-around',
						flexDirection: 'row-reverse',
					}}
				>
					{type === 'login' && (
						<Link to="/register" style={{ color: '#646464' }}>
							Регистрация
						</Link>
					)}
					{type === 'login' && (
						<Link to="/reset" style={{ color: '#646464' }}>
							Забыли пароль?
						</Link>
					)}
					{type === 'register' && (
						<Link to="/login" style={{ color: '#646464' }}>
							Уже есть аккаунт?
						</Link>
					)}
					{type === 'reset' && (
						<Link to="/login" style={{ color: '#646464' }}>
							Авторизоваться
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export const AuthForm = styled(AuthFormContainer)`
	max-width: 1000px;
	width: 100%;
	height: calc(100vh - 110px);
	background-color: #222222;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 35px;

	.auth-container {
		margin: 30px 0px 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 350px;
		width: 100%;
	}
`;
