import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi, TLoginData } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

type TForgotPasswordState = Pick<TLoginData, 'email'> & {
  error: Error | null;
};

export const ForgotPassword: FC = () => {
  const { values, handleChange, setValues } = useForm<TForgotPasswordState>({
    email: '',
    error: null
  });

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setValues({
      ...values,
      error: null
    });
    forgotPasswordApi({ email: values.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) =>
        setValues({
          ...values,
          error: err
        })
      );
  };

  return (
    <ForgotPasswordUI
      errorText={values.error?.message}
      email={values.email}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
