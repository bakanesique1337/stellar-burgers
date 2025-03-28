import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

type TResetPasswordState = {
  password: string;
  token: string;
  error: Error | null;
};

export const ResetPassword: FC = () => {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm<TResetPasswordState>({
    password: '',
    token: '',
    error: null
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      ...values,
      error: null
    });
    resetPasswordApi({ password: values.password, token: values.token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) =>
        setValues({
          ...values,
          error: err
        })
      );
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={values.error?.message}
      password={values.password}
      token={values.token}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
