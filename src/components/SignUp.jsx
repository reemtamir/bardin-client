import React, { useEffect } from 'react';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Joi from 'joi';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { signUp, authError, setAuthError } = useAuth();
  const { imageUrl, setImageUrl } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthError('');
  }, []);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      age: '',
      gender: '',
      image: '',
    },
    async onSubmit(values) {
      try {
        let { confirmedPassword, image, ...rest } = values;

        const { data } = await signUp({ ...rest, image: imageUrl });

        toast(` ${data.name} has just created 🙂`);
        navigate('/sign-in');
      } catch ({ response }) {
        setAuthError(response.data);
      }
    },
    validate: formikValidateUsingJoi({
      name: joi
        .string()
        .min(3)
        .max(255)
        .regex(/^[A-Za-z\u0590-\u05FF]+[0-9]*$/)

        .required(),
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi
        .string()
        .min(6)
        .max(1024)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/)
        .required()
        .label('password'),
      confirmedPassword: joi
        .any()
        .equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
      gender: joi.string(),
      age: joi.string(),
      image: Joi.string().allow(''),
    }),
  });

  const handleUploadChange = (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64EncodedFile = reader.result;

      setImageUrl(base64EncodedFile);
    };
  };

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        {authError && <div className="alert alert-danger">{authError}</div>}
        <div className="container">
          {' '}
          <Input
            label={'Name'}
            type="text"
            id="name"
            placeholder="Your user name"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('name')}
            error={form.touched.name && form.errors.name}
          />
        </div>
        <div className="container">
          <Input
            label={'Email'}
            type="email"
            id="email"
            value={form.email}
            placeholder="Enter email"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('email')}
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('password')}
            label={'Password'}
            type="password"
            id="password"
            value={form.password}
            placeholder="Choose Password"
            labelClass={'label'}
            inputClass={'input'}
            error={form.touched.password && form.errors.password}
          />
        </div>
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('confirmedPassword')}
            label={'Confirm Password'}
            type="password"
            id="confirm-password"
            value={form.confirmedPassword}
            placeholder="Confirm Password"
            labelClass={'label'}
            inputClass={'input'}
            error={
              form.touched.confirmedPassword && form.errors.confirmedPassword
            }
          />
        </div>

        <div className="flex-row">
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Male'}
              type="radio"
              value={'male'}
              labelClass={'label fs-5'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Female'}
              type="radio"
              value={'female'}
              labelClass={'label fs-5'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
          <div className="container">
            <Input
              {...form.getFieldProps('gender')}
              label={'Non Binary'}
              type="radio"
              value={'non-binary'}
              labelClass={'label fs-5'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
        </div>

        <div className="container">
          <Input
            {...form.getFieldProps('age')}
            label={'Date of birth'}
            type="date"
            id="age"
            labelClass={'label fs-4'}
            inputClass={'input w-25 fs-5'}
            error={form.touched.age && form.errors.age}
          />
        </div>

        <div className="container">
          <Input
            onChange={handleUploadChange}
            label={'Image'}
            type="file"
            id="image"
            labelClass={'label'}
            inputClass={'image-input'}
            accept="image/png, image/jpeg"
            error={form.touched.image && form.errors.image}
          />
        </div>
        <div className="container">
          <button type="submit" className="sign-up-btn">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
