// import './../styles/FormUser.css'
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import defaultValues from './../utils/defaultValuesForm'
// const FormUser = ({ createNewUser, updateInfo, setUpdateInfo, updateUserById, setShowForm, setShowEmptyInfo }) => {

// 	const [showPassword, setShowPassword] = useState(false);

// 	const { register, reset, handleSubmit } = useForm()

// 	const handleClose = (e) => {
// 		setUpdateInfo()
// 		setShowForm(false);
// 	};

// 	useEffect(() => {
// 		if (updateInfo) {
// 			reset(updateInfo)
// 		}
// 	}, [updateInfo])

// 	const submit = (data) => {
// 		if (!data.name || !data.role || !data.email || !data.password) {
// 			setShowEmptyInfo(true);
// 			setShowForm(false);
// 			return;
// 		}

// 		if (updateInfo) {
// 			updateUserById(updateInfo.id, data);
// 			reset(defaultValues);
// 		} else {
// 			createNewUser(data);
// 			handleClose();
// 		}

// 		setShowForm(false);
// 	};

// 	const handleKeyDown = (event) => {
// 		if (event.key === 'Enter') {
// 			event.preventDefault();

// 		}
// 	};

// 	return (
// 		<div className='card__container-users'>
// 			<div className='card_form'>
// 				<form className='form__users' onSubmit={handleSubmit(submit)} onKeyDown={handleKeyDown}>
// 					<div className='close__form'><button onClick={handleClose}>✖</button></div>
// 					<h2 className='form__tittle'>{updateInfo ? 'Edit User' : 'New User'}</h2>

// 					<div className='info__user'>
// 						<label htmlFor=" name">Name: </label>
// 						<input className='name__user' {...register("name")} type="text" id='firstName' placeholder='Enter your name' />

// 						<label htmlFor="Role">Role: </label>
// 						<select className='select__options' id="role" {...register('role')}>
// 							<option value="client">Client</option>
// 							<option value="employee">Employee</option>
// 						</select>

// 						<label htmlFor="email" >Email: </label>
// 						<input {...register('email')} type="email" id='email' placeholder='example@email.com' autoComplete="email" />

// 						<label htmlFor="password" >Password: </label>
// 						<div className='content__password'>
// 							<input {...register('password')}
// 								type={showPassword ? 'text' : 'password'}
// 								id='password'
// 								placeholder='***********'
// 								autoComplete="current-password"
// 							/>
// 							<button className='show__pasword' type="button" onClick={(event) => {
// 								event.preventDefault();
// 								setShowPassword(!showPassword);
// 							}}> <i className={showPassword ? 'bx bxs-low-vision' : 'bx bx-show'} />
// 							</button>
// 						</div>

// 					</div>
// 					<button className='buttton__addUser' >{updateInfo ? 'Save' : 'Add New User'}</button>
// 				</form>
// 			</div>
// 		</div>
// 	)
// }

// export default FormUser

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import defaultValues from '../utils/defaultValuesForm';
import './../styles/FormUser.css';

const FormUser = ({ createNewUser, updateInfo, setUpdateInfo, updateUserById, setShowForm, setShowEmptyInfo }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { register, reset, handleSubmit } = useForm();

	const handleClose = () => {
		setUpdateInfo();
		setShowForm(false);
	};

	useEffect(() => {
		if (updateInfo) {
			reset(updateInfo);
		}
	}, [updateInfo]);

	const submit = (data) => {
		if (!data.name || !data.role || !data.email || !data.password) {
			setShowEmptyInfo(true);
			setShowForm(false);
			return;
		}

		if (updateInfo) {
			updateUserById(updateInfo.id, data);
			reset(defaultValues);
		} else {
			createNewUser(data);
			handleClose();
		}

		setShowForm(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	return (
		<div className='card__container-users'>
			<div className='card_form'>
				<form className='form__users' onSubmit={handleSubmit(submit)} onKeyDown={handleKeyDown}>
					<div className='close__form'>
						<button onClick={handleClose}>✖</button>
					</div>
					<h2 className='form__tittle'>{updateInfo ? 'Edit User' : 'New User'}</h2>
					<div className='info__user'>
						<label htmlFor='name'>Name:</label>
						<input className='name__user' {...register('name')} type='text' id='firstName' placeholder='Enter your name' />

						<label htmlFor='role'>Role:</label>
						<select className='select__options' id='role' {...register('role')}>
							<option value='client'>Client</option>
							<option value='employee'>Employee</option>
						</select>

						<label htmlFor='email'>Email:</label>
						<input {...register('email')} type='email' id='email' placeholder='example@email.com' autoComplete='email' />

						<label htmlFor='password'>Password:</label>
						<div className='content__password'>
							<input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								id='password'
								placeholder='***********'
								autoComplete='current-password'
							/>
							<button className='show__pasword' type='button' onClick={() => setShowPassword(!showPassword)}>
								<i className={showPassword ? 'bx bxs-low-vision' : 'bx bx-show'} />
							</button>
						</div>
					</div>
					<button className='buttton__addUser'>{updateInfo ? 'Save' : 'Add New User'}</button>
				</form>
			</div>
		</div>
	);
};

export default FormUser;
