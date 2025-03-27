import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectUserError } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const { values, handleChange } = useForm<TLoginData>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values)).then(() => {
      navigate('/');
    });
  };

  return (
    <LoginUI
      errorText={error}
      email={values.email}
      handleChange={handleChange}
      password={values.password}
      handleSubmit={handleSubmit}
    />
  );
};
