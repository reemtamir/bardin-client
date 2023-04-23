import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormik } from 'formik';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import Input from './Input';
import joi from 'joi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const YourProfile = () => {
  const {
    activeUser,
    user,
    updateUser,
    setActiveUser,
    error,
    setError,
    imageUrl,
    setImageUrl,
  } = useAuth();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    if (!activeUser) return;
    setActiveUser(activeUser);

    const { age, _id, vip, createdAt, __v, favorites, blockList, ...rest } =
      activeUser;
    form.setValues({
      ...rest,
    });
  }, [activeUser]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      image: '',
      gender: '',
      password: '',
      confirmedPassword: '',
    },
    validate: formikValidateUsingJoi({
      name: joi
        .string()
        .min(3)
        .max(255)
        .regex(
          /^[\u0590-\u05fe\u0621-\u064aA-Za-z]+(([',. -][\u0590-\u05fe\u0621-\u064aA-Za-z ])?[\u0590-\u05fe\u0621-\u064aA-Za-z]*)*$/
        )

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

        .label('password'),
      confirmedPassword: joi.any().equal(joi.ref('password')),

      gender: joi.string(),

      image: joi.string().allow(''),
    }),

    async onSubmit(values) {
      let { confirmedPassword, image, ...body } = values;

      try {
        const { data } = await updateUser(user._id, {
          ...body,
          image: imageUrl,
        });

        setActiveUser(data);

        toast(`${activeUser.name}'s profile has been updated`);
        navigate(`/chat-room/${user._id}`);
      } catch ({ response }) {
        setError(response.data);
        console.log(response.data);
      }
    },
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

  useEffect(() => {
    setError('');
  }, []);
  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        {error && <p className="alert alert-danger">{error}</p>}
        <div className="container">
          {' '}
          <Input
            label={'Name'}
            type="text"
            id="name"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('name')}
            error={form.touched.name && form.errors.name}
          />
        </div>
        <div className="container">
          <Input
            readOnly={true}
            label={'Email'}
            type="email"
            id="email"
            value={form.email}
            labelClass={'label'}
            inputClass={'input'}
            disabled
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
              labelClass={'label'}
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
              labelClass={'label'}
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
              labelClass={'label'}
              inputClass={'input'}
              error={form.touched.gender && form.errors.gender}
              name="gender"
            />
          </div>
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
          <button type="submit" className="sign-up-btn">
            Save changes
          </button>
        </div>
      </form>
      <div
        style={{ cursor: 'pointer' }}
        className="link text-danger fs-3 m-auto"
        onClick={() => setIsDelete(true)}
      >
        Delete your account
      </div>
      {isDelete && (
        <div className="delete-alert-box">
          <p className="delete-alert-box-p">Are you sure?</p>
          <div className="delete-alert-link-container">
            <Link
              className="delete-alert-link-delete"
              to={`/delete/${user._id}`}
            >
              <i className="bi bi-trash3-fill "></i> Delete your account
            </Link>
            <Link
              className="delete-alert-link-back"
              to={`/chat-room/${user._id}`}
            >
              <i className="bi bi-arrow-return-right "></i> Go back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default YourProfile;
