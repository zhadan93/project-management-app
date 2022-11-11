import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './AuthForms.module.scss';
import { useAppDispatch } from '../../hooks/reduxTypedHooks';
import { logining, logout } from '../../store/authSlice';
import { User } from '../../types/types';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const dispatch = useAppDispatch();

  const loginInputParams = {
    ...register('login', {
      required: 'Login is required',
    }),
  };
  const passwordInputParams = {
    ...register('password', {
      required: 'Password is required',
    }),
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(logining(data as User));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Enter login:" reactHookFormProps={loginInputParams} />
      {errors.login && <p className={styles.error}>{errors.login.message as string}</p>}
      <Input label="Enter password:" type="password" reactHookFormProps={passwordInputParams} />
      {errors.password && <p className={styles.error}>{errors.password.message as string}</p>}
      <div className={styles.buttons}>
        <Button
          className={styles.back}
          type="button"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
        <Button className={styles.sign} type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
