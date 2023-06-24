import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { useFormik } from 'formik';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import Input from './Input';
import joi from 'joi';
import { toast } from 'react-toastify';

const EditPassword = () => {
  const { activeUser, user, setActiveUser, authError, setAuthError } =
    useAuth();

  const { updatePass } = useApp();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      currPassword: '',
      newPassword: '',
    },
    validate: formikValidateUsingJoi({
      currPassword: joi
        .string()
        .min(6)
        .max(1024)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/)
        .required(),
      newPassword: joi
        .string()
        .min(6)
        .max(1024)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/)
        .required(),
    }),

    async onSubmit(values) {
      const { currPassword, newPassword } = values;
      try {
        const { data } = await updatePass(user._id, currPassword, newPassword);

        toast(`${activeUser.name}'s password has been updated`);
        navigate(`/chat-room/${user._id}`);
      } catch ({ response }) {
        setAuthError(response.data.error);
      }
    },
  });

  useEffect(() => {
    setAuthError('');
  }, []);
  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        {authError && <p className="alert alert-danger">{authError}</p>}

        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('currPassword')}
            label={'Current password'}
            type="password"
            id="password"
            value={form.currPassword}
            labelClass={'label'}
            inputClass={'input'}
            error={form.touched.currPassword && form.errors.currPassword}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('newPassword')}
            label={'New Password'}
            type="password"
            id="new-password"
            value={form.newPassword}
            labelClass={'label'}
            inputClass={'input'}
            error={form.touched.newPassword && form.errors.newPassword}
          />
          <button type="submit" className="sign-up-btn">
            Change password
          </button>
        </div>
      </form>
    </>
  );
};

export default EditPassword;
