import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectUserError } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

type TRegisterState = Omit<TRegisterData, 'name'> & { userName: string };

export const Register: FC = () => {
  const { values, handleChange } = useForm<TRegisterState>({
    userName: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const error = useSelector(selectUserError);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    );
    navigate('/profile');
  };

  return (
    <RegisterUI
      errorText={error}
      email={values.email}
      userName={values.userName}
      password={values.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
